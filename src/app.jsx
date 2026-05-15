// Main app shell — matches the existing Build Haus Studio frontend layout.
// Just the reel SVG inside it has been redesigned (see src/shared.jsx + scene-XX.jsx).

const { useRef, useState, useEffect, useCallback, useMemo } = React;
const SH = window.SHARED;

// Config — timeline derived from SCENE_SPECS (see below)
const FPS = 30;
const FADE = 0.55;

const smoothstep = (t) => {
  const x = SH.clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

/** Timeline — longer scenes so copy can be read on mobile (hook + cierre extendidos). */
const SCENE_SPECS = [
  { id:  1, duration: 9.0,  theme: 'dark',  label: 'Gancho — no editado, programado' },
  { id:  2, duration: 2.65, theme: 'light', label: 'Sistemas, no plantillas' },
  { id:  3, duration: 2.65, theme: 'dark',  label: 'Conversión primero' },
  { id:  4, duration: 2.65, theme: 'light', label: 'Discovery del negocio' },
  { id:  5, duration: 2.65, theme: 'dark',  label: 'Arquitectura de oferta' },
  { id:  6, duration: 2.65, theme: 'light', label: 'Recorrido diseñado' },
  { id:  7, duration: 3.1,  theme: 'dark',  label: 'Experiencia desarrollada' },
  { id:  8, duration: 2.55, theme: 'light', label: 'Sistema visual' },
  { id:  9, duration: 3.1,  theme: 'dark',  label: 'Código escalable' },
  { id: 10, duration: 2.65, theme: 'light', label: 'Optimización CRO' },
  { id: 11, duration: 2.65, theme: 'dark',  label: 'Resultado final' },
  { id: 12, duration: 9.0,  theme: 'light', label: 'CTA — comentá REEL' },
];

let _t = 0;
const SCENES = SCENE_SPECS.map((spec) => {
  const row = {
    id: spec.id,
    start: _t,
    duration: spec.duration,
    theme: spec.theme,
    label: spec.label,
  };
  _t += spec.duration;
  return row;
});

const DURATION_SECONDS = _t;
const TOTAL_FRAMES = Math.round(FPS * DURATION_SECONDS);

const STATUS = {
  IDLE:    'Listo para generar una pequeña demostración de obsesión por el detalle.',
  PLAY:    'Generando el reel desde código…',
  PAUSE:   'Pausado. El reel quedó en modo maqueta técnica.',
  DONE:    'Reel generado. Sí, todo salió de una web app.',
};

// ── Reel SVG component ──────────────────────────────────────────────────────

function sceneOpacity(progress, start, duration) {
  const t = progress * DURATION_SECONDS;
  const local = t - start;
  if (local < -FADE || local > duration + FADE) return 0;
  const fadeIn = smoothstep((local + FADE) / FADE);
  const fadeOut = smoothstep((duration - local + FADE) / FADE);
  return Math.min(fadeIn, fadeOut);
}

function sceneProgress(progress, start, duration) {
  const t = progress * DURATION_SECONDS;
  return SH.clamp((t - start) / duration, 0, 1);
}

function ReelSVG({ progress, svgRef }) {
  const SCENE_COMPS = [
    window.Scene01, window.Scene02, window.Scene03, window.Scene04,
    window.Scene05, window.Scene06, window.Scene07, window.Scene08,
    window.Scene09, window.Scene10, window.Scene11, window.Scene12,
  ];

  return (
    <svg
      ref={svgRef}
      className="reel-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${SH.VW} ${SH.VH}`}
      width={SH.VW}
      height={SH.VH}
      role="img"
      aria-label="Build Haus Studio — reel generado por código"
    >
      <SH.SVGDefs />

      {SCENES.map((scene, i) => {
        const op = sceneOpacity(progress, scene.start, scene.duration);
        if (op <= 0.001) return null;
        const Comp = SCENE_COMPS[i];
        const sp = sceneProgress(progress, scene.start, scene.duration);
        return (
          <g key={scene.id} opacity={op}>
            <Comp p={sp} />
          </g>
        );
      })}
    </svg>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────

function App() {
  const svgRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(0);
  const musicRef = useRef(null);
  const voiceRef = useRef(null);

  const [animProgress, setAnimProgress]   = useState(0);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [isPlaying, setIsPlaying]         = useState(false);
  const [status, setStatus]               = useState(STATUS.IDLE);

  // Audio state — only voice (kept since user provided the file)
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [voiceVol, setVoiceVol] = useState(90);

  const progress = isPlaying ? animProgress : scrubProgress;
  const currentSec = progress * DURATION_SECONDS;

  // Audio elements
  useEffect(() => {
    const v = new Audio();
    v.preload = 'auto';
    v.src = 'audio/voiceover-es.mp3';
    voiceRef.current = v;
    return () => { v.pause(); };
  }, []);

  useEffect(() => {
    if (voiceRef.current) voiceRef.current.volume = voiceVol / 100;
  }, [voiceVol]);

  const pauseAudio = useCallback(() => {
    voiceRef.current?.pause();
  }, []);

  const playAudioFrom = useCallback((sec) => {
    if (!audioEnabled || !voiceRef.current) return;
    try { voiceRef.current.currentTime = sec; } catch {}
    voiceRef.current.play().catch(() => {});
  }, [audioEnabled]);

  const stopPlayback = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    pauseAudio();
    setIsPlaying(false);
  }, [pauseAudio]);

  const startPlayback = useCallback((fromProgress, restart = false) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const init = restart ? 0 : fromProgress >= 1 ? 0 : fromProgress;
    const wallStart = performance.now() - init * DURATION_SECONDS * 1000;
    startRef.current = wallStart;

    setIsPlaying(true);
    setStatus(STATUS.PLAY);
    setAnimProgress(init);
    setScrubProgress(init);
    playAudioFrom(init * DURATION_SECONDS);

    const tick = (now) => {
      const elapsed = (now - wallStart) / 1000;
      const pNew = Math.min(elapsed / DURATION_SECONDS, 1);
      setAnimProgress(pNew);
      setScrubProgress(pNew);
      if (pNew >= 1) {
        setIsPlaying(false);
        setStatus(STATUS.DONE);
        pauseAudio();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [playAudioFrom, pauseAudio]);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) { stopPlayback(); setStatus(STATUS.PAUSE); }
    else { startPlayback(scrubProgress); }
  }, [isPlaying, scrubProgress, stopPlayback, startPlayback]);

  const handleRestart = useCallback(() => {
    stopPlayback();
    setScrubProgress(0);
    setAnimProgress(0);
    startPlayback(0, true);
  }, [stopPlayback, startPlayback]);

  const handleScrub = useCallback((val) => {
    setScrubProgress(val / DURATION_SECONDS);
    if (isPlaying && voiceRef.current) {
      try { voiceRef.current.currentTime = val; } catch {}
    }
  }, [isPlaying]);

  // Scene chip indicator
  const activeScene = SCENES.findIndex(s =>
    currentSec >= s.start && currentSec < s.start + s.duration);
  const activeIdx = activeScene === -1 ? SCENES.length - 1 : activeScene;

  const timecode = `${currentSec.toFixed(2)}s / ${DURATION_SECONDS.toFixed(2)}s · ${FPS} FPS · SVG motion system`;

  return (
    <React.Fragment>
      <main className="app-shell">
        {/* Control Panel */}
        <aside className="control-panel" aria-label="Reel controls">
          <div>
            <p className="eyebrow">BUILD HAUS STUDIO</p>
            <h1>No editamos reels.<br />Los programamos.</h1>
            <p className="panel-copy">
              La edición de video no es lo nuestro. El desarrollo sí. Entonces
              hicimos una app que genera este reel, porque si había una forma de
              mostrar cómo trabajamos, iba a ser construyéndola.
            </p>
            <p className="panel-small-line">Sí, todo esto también es parte del portfolio.</p>
            <p className="panel-tech-copy">
              {DURATION_SECONDS} segundos de diseño, código y un nivel poco sano
              de dedicación.
            </p>
          </div>

          <div className="button-row">
            <button type="button" onClick={handlePlayPause}>
              {isPlaying ? 'Pausar generación' : 'Ver cómo se genera'}
            </button>
            <button type="button" onClick={handleRestart}>
              Volver a correr
            </button>
            <button type="button" className="primary" disabled>
              Exportar reel
            </button>
          </div>

          {/* Audio panel — simplified */}
          <section className="audio-panel" aria-label="Audio del reel">
            <div className="audio-panel-head">
              <h2>Audio del reel</h2>
              <p>Voiceover en español incluido. La música queda para el WebM exportado.</p>
            </div>

            <div className="audio-toggle">
              <button
                type="button"
                className={audioEnabled ? '' : 'active'}
                onClick={() => setAudioEnabled(false)}>
                Sin audio
              </button>
              <button
                type="button"
                className={audioEnabled ? 'active' : ''}
                onClick={() => setAudioEnabled(true)}>
                Con voz
              </button>
            </div>

            <div className="volume-grid">
              <label>
                <span>Voz</span>
                <input
                  type="range" min={0} max={100} value={voiceVol}
                  onChange={e => setVoiceVol(Number(e.currentTarget.value))} />
                <em>{voiceVol}%</em>
              </label>
              <label>
                <span>Escena</span>
                <em style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5 }}>
                  {String(SCENES[activeIdx].id).padStart(2,'0')} · {SCENES[activeIdx].label}
                </em>
              </label>
            </div>

            <p className="audio-note">
              Porque si ya hicimos una app para el reel, mínimo tenía que sonar bien.
            </p>
          </section>

          {/* Progress meter */}
          <div className="meter" aria-label="Timeline progress">
            <span style={{ width: `${progress * 100}%` }} />
          </div>

          {/* Scrubber */}
          <input
            className="scrubber"
            type="range"
            min={0} max={DURATION_SECONDS} step={0.01}
            value={currentSec}
            onChange={e => handleScrub(Number(e.currentTarget.value))}
            aria-label="Scrub Reel timeline" />

          <p className="status">{status}</p>
          <p className="timecode">{timecode}</p>
        </aside>

        {/* Stage */}
        <section className="stage-wrap" aria-label="1080 by 1920 Reel preview">
          <div className="stage-frame">
            <ReelSVG progress={progress} svgRef={svgRef} />
          </div>
        </section>
      </main>

      {/* Explanation section — unchanged from user's original copy */}
      <section className="explain-section">
        <div className="explain-inner">
          <div className="explain-heading">
            <p className="eyebrow" style={{ marginBottom: 16 }}>CÓMO FUNCIONA</p>
            <h2>¿Cómo funciona?</h2>
            <p>
              Para los curiosos: esto no es un video editado en Premiere. Es una
              animación construida con código.
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
                  <span style={{ color: '#246BFF', marginRight: 8 }}>{n} /</span>
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
                rel="noopener noreferrer">
                Hablemos de tu proyecto →
              </a>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

window.App = App;
