import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import ReelSVG from './scenes/ReelSVG';
import {
  DURATION_SECONDS, TOTAL_FRAMES, FPS,
  MUSIC_OPTIONS, VOICE_OPTIONS,
  STATUS_IDLE, STATUS_PLAYING, STATUS_PAUSED, STATUS_FINISHED, STATUS_EXPORTING,
  AUDIO_MISSING_MSG,
  C,
} from './constants';
import { checkAudioFile, previewAudio, type AudioConfig } from './audio';
import { exportWebM } from './export';

// ── Types ─────────────────────────────────────────────────────────────────────

type MusicKey  = keyof typeof MUSIC_OPTIONS;
type VoiceKey  = keyof typeof VOICE_OPTIONS;
type AudioStat = 'idle' | 'loading' | 'playing' | 'error';

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  const svgRef    = useRef<SVGSVGElement>(null);
  const rafRef    = useRef<number | null>(null);
  const startRef  = useRef<number>(0);   // wall-clock start offset
  const musicElRef = useRef<HTMLAudioElement | null>(null);
  const voiceElRef = useRef<HTMLAudioElement | null>(null);
  const previewCtxRef = useRef<AudioContext | null>(null);

  // Playback state
  const [animProgress, setAnimProgress] = useState(0); // 0-1 from raf
  const [scrubProgress, setScrubProgress] = useState(0); // 0-1 from scrubber
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [status, setStatus] = useState(STATUS_IDLE);

  // Audio state
  const [audioEnabled,  setAudioEnabled]  = useState(false);
  const [musicKey,      setMusicKey]      = useState<MusicKey>('music');
  const [voiceKey,      setVoiceKey]      = useState<VoiceKey>('none');
  const [musicVol,      setMusicVol]      = useState(25);
  const [voiceVol,      setVoiceVol]      = useState(90);
  const [audioStat,     setAudioStat]     = useState<AudioStat>('idle');
  const [audioMsg,      setAudioMsg]      = useState<string | null>(null);
  const [fileStatus,    setFileStatus]    = useState<Record<string, boolean>>({});
  const [exportWarning, setExportWarning] = useState<string | null>(null);

  // Derived
  const progress   = isPlaying ? animProgress : scrubProgress;
  const currentSec = progress * DURATION_SECONDS;
  const musicSrc   = MUSIC_OPTIONS[musicKey].src;
  const voiceSrc   = VOICE_OPTIONS[voiceKey].src;
  const musicEnabled = audioEnabled && musicKey !== 'none';
  const voiceEnabled = audioEnabled && voiceKey !== 'none';
  const musicExists  = !musicEnabled || fileStatus[musicKey];
  const voiceExists  = !voiceEnabled || fileStatus[voiceKey];
  const audioReady   = audioEnabled && (musicEnabled || voiceEnabled) && musicExists && voiceExists;

  const audioFeedback = useMemo(() => {
    if (audioMsg) return audioMsg;
    if (!audioEnabled) return 'Audio apagado. Minimalismo absoluto, también válido.';
    if (!musicEnabled && !voiceEnabled) return 'Audio encendido, pero sin música ni voz seleccionadas. Silencio premium.';
    if (!musicExists || !voiceExists) return AUDIO_MISSING_MSG;
    if (voiceEnabled) return 'Voz cargada. Prometemos que no suene a tutorial de Excel.';
    if (musicEnabled) return 'Loop minimal activado. Nada de EDM corporativo.';
    return 'Audio listo para probar.';
  }, [audioMsg, audioEnabled, musicEnabled, voiceEnabled, musicExists, voiceExists]);

  // ── Audio file check ──────────────────────────────────────────────────────

  useEffect(() => {
    const srcs: Record<string, string> = {
      music:     MUSIC_OPTIONS.music.src,
      voiceover: VOICE_OPTIONS.voiceover.src,
    };
    let active = true;
    Promise.all(
      Object.entries(srcs).map(async ([key, src]) => {
        const ok = await checkAudioFile(src);
        return [key, ok] as [string, boolean];
      }),
    ).then(results => {
      if (active) setFileStatus(Object.fromEntries(results));
    });
    return () => { active = false; };
  }, []);

  // ── HTML Audio elements setup ─────────────────────────────────────────────

  useEffect(() => {
    const music = new Audio();
    const voice = new Audio();
    music.preload = 'auto';
    music.loop    = true;
    voice.preload = 'auto';
    musicElRef.current = music;
    voiceElRef.current = voice;
    return () => {
      music.pause();
      voice.pause();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Sync volume on change
  useEffect(() => {
    if (musicElRef.current) musicElRef.current.volume = musicVol / 100;
    if (voiceElRef.current) voiceElRef.current.volume = voiceVol / 100;
  }, [musicVol, voiceVol]);

  // ── Playback ──────────────────────────────────────────────────────────────

  const pauseAudio = useCallback(() => {
    musicElRef.current?.pause();
    voiceElRef.current?.pause();
  }, []);

  const syncAudioTo = useCallback((sec: number) => {
    const m = musicElRef.current;
    const v = voiceElRef.current;
    if (m) { try { m.currentTime = sec % (m.duration || DURATION_SECONDS); } catch {} }
    if (v) { try { v.currentTime = sec; } catch {} }
  }, []);

  const playAudioFrom = useCallback(async (sec: number) => {
    if (!audioReady) return;
    const m = musicElRef.current;
    const v = voiceElRef.current;
    if (m && musicEnabled) {
      m.src = musicSrc;
      m.volume = musicVol / 100;
      try { m.currentTime = sec % (m.duration || DURATION_SECONDS); } catch {}
      m.play().catch(() => {});
    }
    if (v && voiceEnabled) {
      v.src = voiceSrc;
      v.volume = voiceVol / 100;
      try { v.currentTime = sec; } catch {}
      v.play().catch(() => {});
    }
  }, [audioReady, musicEnabled, voiceEnabled, musicSrc, voiceSrc, musicVol, voiceVol]);

  const stopPlayback = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    pauseAudio();
    setIsPlaying(false);
  }, [pauseAudio]);

  const startPlayback = useCallback((fromProgress: number, restart = false) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const initialProgress = restart ? 0 : fromProgress >= 1 ? 0 : fromProgress;
    const wallStart = performance.now() - initialProgress * DURATION_SECONDS * 1000;
    startRef.current = wallStart;

    setIsPlaying(true);
    setStatus(STATUS_PLAYING);
    setAnimProgress(initialProgress);
    setScrubProgress(initialProgress);
    playAudioFrom(initialProgress * DURATION_SECONDS);

    const tick = (now: number) => {
      const elapsed = (now - wallStart) / 1000;
      const p = Math.min(elapsed / DURATION_SECONDS, 1);
      setAnimProgress(p);
      setScrubProgress(p);

      if (p >= 1) {
        setIsPlaying(false);
        setStatus(STATUS_FINISHED);
        pauseAudio();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [playAudioFrom, pauseAudio]);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      stopPlayback();
      setStatus(STATUS_PAUSED);
    } else {
      startPlayback(scrubProgress);
    }
  }, [isPlaying, scrubProgress, stopPlayback, startPlayback]);

  const handleRestart = useCallback(() => {
    stopPlayback();
    setScrubProgress(0);
    setAnimProgress(0);
    startPlayback(0, true);
  }, [stopPlayback, startPlayback]);

  const handleScrub = useCallback((val: number) => {
    const p = val / DURATION_SECONDS;
    setScrubProgress(p);
    if (isPlaying) {
      syncAudioTo(val);
    }
  }, [isPlaying, syncAudioTo]);

  // ── Audio Preview ─────────────────────────────────────────────────────────

  const handleTestAudio = useCallback(async () => {
    // Stop any existing preview
    if (previewCtxRef.current) {
      previewCtxRef.current.close().catch(() => {});
      previewCtxRef.current = null;
      setAudioStat('idle');
      setAudioMsg('Audio listo para probar.');
      return;
    }

    const src = voiceEnabled && voiceSrc ? voiceSrc : musicEnabled && musicSrc ? musicSrc : '';
    const vol = voiceEnabled ? voiceVol : musicVol;

    if (!src) {
      setAudioMsg('Seleccioná música o voz para probar el audio.');
      return;
    }

    setAudioStat('loading');
    setAudioMsg('Cargando audio…');

    try {
      const ctx = await previewAudio(
        src, vol, 5,
        () => {
          previewCtxRef.current = null;
          setAudioStat('idle');
          setAudioMsg('Audio listo para probar.');
        },
      );
      previewCtxRef.current = ctx;
      setAudioStat('playing');
      setAudioMsg('Reproduciendo audio…');
    } catch {
      setAudioStat('error');
      setAudioMsg('No encontramos el archivo de audio. Revisá /public/audio/.');
    }
  }, [voiceEnabled, musicEnabled, voiceSrc, musicSrc, voiceVol, musicVol]);

  // ── Export ────────────────────────────────────────────────────────────────

  const handleExportWebM = useCallback(async () => {
    stopPlayback();
    setIsExporting(true);
    setExportProgress(0);
    setExportWarning(null);
    setStatus(STATUS_EXPORTING);

    const audioCfg: AudioConfig = {
      enabled:     audioEnabled,
      musicSrc:    musicEnabled ? musicSrc : '',
      voiceSrc:    voiceEnabled ? voiceSrc : '',
      musicVolume: musicVol,
      voiceVolume: voiceVol,
    };

    try {
      await exportWebM(
        svgRef,
        setExportProgress,
        () => {},
        audioCfg,
        setExportWarning,
      );
      setStatus(STATUS_FINISHED);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  }, [stopPlayback, audioEnabled, musicEnabled, voiceEnabled, musicSrc, voiceSrc, musicVol, voiceVol]);

  // ── Render ────────────────────────────────────────────────────────────────

  const timecode = `${currentSec.toFixed(2)}s / ${DURATION_SECONDS}.00s · ${FPS} FPS · SVG motion system`;

  return (
    <>
      <main className="app-shell">
        {/* ── Control Panel ── */}
        <aside className="control-panel" aria-label="Reel controls">
          {/* Hero copy */}
          <div>
            <p className="eyebrow">BUILD HAUS STUDIO</p>
            <h1>No editamos reels.<br />Los programamos.</h1>
            <p className="panel-copy">
              La edición de video no es lo nuestro. El desarrollo sí. Entonces hicimos una app que
              genera este reel, porque si había una forma de mostrar cómo trabajamos, iba a ser
              construyéndola.
            </p>
            <p className="panel-small-line">Sí, todo esto también es parte del portfolio.</p>
            <p className="panel-tech-copy">
              {DURATION_SECONDS} segundos de diseño, código y un nivel poco sano de dedicación.
            </p>
          </div>

          {/* Action buttons */}
          <div className="button-row">
            <button
              type="button"
              onClick={handlePlayPause}
              disabled={isExporting}
            >
              {isPlaying ? 'Pausar generación' : 'Ver cómo se genera'}
            </button>
            <button
              type="button"
              onClick={handleRestart}
              disabled={isExporting}
            >
              Volver a correr
            </button>
            <button
              type="button"
              className="primary"
              onClick={handleExportWebM}
              disabled={isExporting || isPlaying}
            >
              {isExporting
                ? `Exportando… ${Math.round(exportProgress * 100)}%`
                : 'Exportar reel'}
            </button>
          </div>

          {/* Audio panel */}
          <section className="audio-panel" aria-label="Audio del reel">
            <div className="audio-panel-head">
              <h2>Audio del reel</h2>
              <p>Si tu navegador lo permite, el audio se incluye en el WebM exportado.</p>
            </div>

            <div className="audio-toggle" aria-label="Activar o desactivar audio">
              <button
                type="button"
                className={audioEnabled ? '' : 'active'}
                onClick={() => { setAudioEnabled(false); setAudioMsg(null); }}
                disabled={isExporting}
              >
                Sin audio
              </button>
              <button
                type="button"
                className={audioEnabled ? 'active' : ''}
                onClick={() => setAudioEnabled(true)}
                disabled={isExporting}
              >
                Con audio
              </button>
            </div>

            <label className="audio-field">
              <span>Música</span>
              <select
                value={musicKey}
                onChange={e => { setAudioMsg(null); setMusicKey(e.currentTarget.value as MusicKey); }}
                disabled={isExporting || !audioEnabled}
              >
                {Object.entries(MUSIC_OPTIONS).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </label>

            <label className="audio-field">
              <span>Voz</span>
              <select
                value={voiceKey}
                onChange={e => { setAudioMsg(null); setVoiceKey(e.currentTarget.value as VoiceKey); }}
                disabled={isExporting || !audioEnabled}
              >
                {Object.entries(VOICE_OPTIONS).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </label>

            <div className="volume-grid">
              <label>
                <span>Música</span>
                <input
                  type="range" min={0} max={100} value={musicVol}
                  onChange={e => setMusicVol(Number(e.currentTarget.value))}
                  disabled={isExporting || musicKey === 'none' || !audioEnabled}
                />
                <em>{musicVol}%</em>
              </label>
              <label>
                <span>Voz</span>
                <input
                  type="range" min={0} max={100} value={voiceVol}
                  onChange={e => setVoiceVol(Number(e.currentTarget.value))}
                  disabled={isExporting || voiceKey === 'none' || !audioEnabled}
                />
                <em>{voiceVol}%</em>
              </label>
            </div>

            <button
              type="button"
              className={`audio-test${audioStat === 'playing' ? ' playing' : ''}`}
              onClick={handleTestAudio}
              disabled={isExporting || !audioEnabled}
            >
              {audioStat === 'loading'  ? 'Cargando audio…'      :
               audioStat === 'playing'  ? 'Detener preview'      :
               'Probar audio'}
            </button>

            <p className="audio-note">
              Porque si ya hicimos una app para el reel, mínimo tenía que sonar bien.
            </p>
            <p className={`audio-feedback${audioStat === 'error' ? ' error' : ''}`}>
              {audioFeedback}
            </p>

            {exportWarning && (
              <p className="audio-feedback error">{exportWarning}</p>
            )}
          </section>

          {/* Progress meter */}
          <div className="meter" aria-label="Timeline progress">
            <span style={{ width: `${progress * 100}%` }} />
          </div>

          {/* Scrubber */}
          <input
            className="scrubber"
            type="range"
            min={0}
            max={DURATION_SECONDS}
            step={0.01}
            value={currentSec}
            onChange={e => handleScrub(Number(e.currentTarget.value))}
            disabled={isExporting}
            aria-label="Scrub Reel timeline"
          />

          <p className="status">{status}</p>
          <p className="timecode">{timecode}</p>
        </aside>

        {/* ── Preview Stage ── */}
        <section className="stage-wrap" aria-label="1080 by 1920 Reel preview">
          <div className="stage-frame">
            <ReelSVG ref={svgRef} progress={progress} />
          </div>
        </section>
      </main>

      {/* ── Explanation section ── */}
      <section className="explain-section">
        <div className="explain-inner">
          <div className="explain-heading">
            <p className="eyebrow" style={{ marginBottom: 16 }}>CÓMO FUNCIONA</p>
            <h2>¿Cómo funciona?</h2>
            <p>
              Para los curiosos: esto no es un video editado en Premiere. Es una animación
              construida con código.
            </p>
          </div>

          <div className="explain-grid">
            {[
              {
                n: '01',
                title: 'Diseñamos el sistema',
                body: 'Primero definimos la estética: grilla, tipografía, colores, líneas, escenas y ritmo visual. Como si fuera una web, pero pensada para moverse.',
              },
              {
                n: '02',
                title: 'Lo convertimos en SVG',
                body: 'Cada elemento del reel —textos, líneas, botones, wireframes y puntos azules— está construido con HTML, SVG y CSS. No son imágenes pegadas.',
              },
              {
                n: '03',
                title: 'Animamos la experiencia',
                body: 'Las escenas no aparecen como slides. Los elementos se transforman: un botón se vuelve punto, un punto se vuelve recorrido, y el recorrido se vuelve interfaz.',
              },
              {
                n: '04',
                title: 'Lo exportamos como video',
                body: `La web renderiza la animación frame por frame (${TOTAL_FRAMES} frames · ${FPS} FPS · ${DURATION_SECONDS}s) y permite descargarla como reel. Una pequeña app creada solo para generar esta pieza.`,
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="explain-card">
                <span className="card-marker" />
                <h3>
                  <span style={{ color: C.blue, marginRight: 8 }}>{n} /</span>
                  {title}
                </h3>
                <p>{body}</p>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <p>
              <strong>¿Por qué hacerlo así?</strong>{' '}
              Porque construir soluciones a medida es exactamente lo que hacemos.
            </p>
            <div>
              <span>¿Querés una web igual de pensada?</span>
              <a
                href="https://buildhaus.studio"
                className="button primary section-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hablemos de tu proyecto →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
