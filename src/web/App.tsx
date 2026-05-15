// Main app shell — bundled via Vite (GitHub Pages friendly).

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Scene01,
  Scene02,
  Scene03,
  Scene04,
  Scene05,
  Scene06,
  Scene07,
  Scene08,
  Scene09,
  Scene10,
  Scene11,
  Scene12,
} from '../reel/scenes';
import { SHARED as SH } from '../reel/shared';
import {
  FPS,
  SCENES as TL_SCENES,
  TOTAL_DURATION_IN_FRAMES,
  TOTAL_DURATION_SECONDS,
} from '../reel/timeline';

const FADE = 0.55;

const SCENES = TL_SCENES.map((s) => ({
  id: s.id,
  start: s.startSeconds,
  duration: s.durationSeconds,
  theme: s.theme,
  label: s.label,
}));

const DURATION_SECONDS = TOTAL_DURATION_SECONDS;
const TOTAL_FRAMES = TOTAL_DURATION_IN_FRAMES;

const smoothstep = (t: number) => {
  const x = SH.clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

function sceneTransform(
  progress: number,
  start: number,
  duration: number,
  sceneIndex = 0,
) {
  const wallT = progress * DURATION_SECONDS;
  const s = wallT - start;
  const { VW: W, VH: H, lerp, easeOut, easeIn, clamp } = SH;
  const cx = W / 2;
  const cy = H / 2;
  const dir = sceneIndex % 2 === 0 ? 1 : -1;
  let scale = 1;
  let tx = 0;
  let ty = 0;
  let rot = 0;

  if (s >= -FADE && s < FADE) {
    const u = clamp((s + FADE) / FADE, 0, 1);
    const e = smoothstep(u);
    scale *= lerp(1.118, 1, easeOut(e));
    ty += lerp(64, 0, easeOut(e));
    tx += lerp(-26 * dir, 0, easeOut(e));
  }

  if (s > duration - FADE && s <= duration + FADE * 0.65) {
    const u = clamp((s - (duration - FADE)) / FADE, 0, 1);
    const e = smoothstep(u);
    scale *= lerp(1, 1.09, easeIn(e));
    ty += lerp(0, -92, easeIn(e));
    tx += lerp(0, 32 * dir, easeIn(e));
    rot += lerp(0, -0.65 * dir, easeIn(e));
  }

  return `translate(${cx}, ${cy}) rotate(${rot}) scale(${scale}) translate(${-cx + tx}, ${-cy + ty})`;
}

const STATUS = {
  IDLE:
    'Listo para generar una pequeña demostración de obsesión por el detalle.',
  PLAY: 'Generando el reel desde código…',
  PAUSE: 'Pausado. El reel quedó en modo maqueta técnica.',
  DONE: 'Reel generado. Sí, todo salió de una web app.',
};

function sceneOpacity(progress: number, start: number, duration: number) {
  const t = progress * DURATION_SECONDS;
  const local = t - start;
  if (local < -FADE || local > duration + FADE) return 0;
  const fadeIn = smoothstep((local + FADE) / FADE);
  const fadeOut = smoothstep((duration - local + FADE) / FADE);
  return Math.min(fadeIn, fadeOut);
}

function sceneProgress(progress: number, start: number, duration: number) {
  const t = progress * DURATION_SECONDS;
  return SH.clamp((t - start) / duration, 0, 1);
}

const SCENE_COMPS = [
  Scene01,
  Scene02,
  Scene03,
  Scene04,
  Scene05,
  Scene06,
  Scene07,
  Scene08,
  Scene09,
  Scene10,
  Scene11,
  Scene12,
];

function ReelSVG({
  progress,
  svgRef,
}: {
  progress: number;
  svgRef: React.RefObject<SVGSVGElement>;
}) {
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
        const xf = sceneTransform(progress, scene.start, scene.duration, i);
        return (
          <g key={scene.id} opacity={op} transform={xf}>
            <Comp p={sp} />
          </g>
        );
      })}
    </svg>
  );
}

export function App() {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);

  const [animProgress, setAnimProgress] = useState(0);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);

  const [audioEnabled, setAudioEnabled] = useState(false);
  const [voiceVol, setVoiceVol] = useState(90);

  const progress = isPlaying ? animProgress : scrubProgress;
  const currentSec = progress * DURATION_SECONDS;

  const voiceSrc = `${import.meta.env.BASE_URL}audio/voiceover-es.mp3`;

  useEffect(() => {
    const v = new Audio();
    v.preload = 'auto';
    v.src = voiceSrc;
    voiceRef.current = v;
    return () => {
      v.pause();
    };
  }, [voiceSrc]);

  useEffect(() => {
    if (voiceRef.current) voiceRef.current.volume = voiceVol / 100;
  }, [voiceVol]);

  const pauseAudio = useCallback(() => {
    voiceRef.current?.pause();
  }, []);

  const playAudioFrom = useCallback(
    (sec: number) => {
      if (!audioEnabled || !voiceRef.current) return;
      try {
        voiceRef.current.currentTime = sec;
      } catch {
        /* ignore */
      }
      voiceRef.current.play().catch(() => {});
    },
    [audioEnabled],
  );

  const stopPlayback = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    pauseAudio();
    setIsPlaying(false);
  }, [pauseAudio]);

  const startPlayback = useCallback(
    (fromProgress: number, restart = false) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const init = restart ? 0 : fromProgress >= 1 ? 0 : fromProgress;
      const wallStart = performance.now() - init * DURATION_SECONDS * 1000;

      setIsPlaying(true);
      setStatus(STATUS.PLAY);
      setAnimProgress(init);
      setScrubProgress(init);
      playAudioFrom(init * DURATION_SECONDS);

      const tick = (now: number) => {
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
    },
    [playAudioFrom, pauseAudio],
  );

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      stopPlayback();
      setStatus(STATUS.PAUSE);
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

  const handleScrub = useCallback(
    (val: number) => {
      setScrubProgress(val / DURATION_SECONDS);
      if (isPlaying && voiceRef.current) {
        try {
          voiceRef.current.currentTime = val;
        } catch {
          /* ignore */
        }
      }
    },
    [isPlaying],
  );

  const activeScene = SCENES.findIndex(
    (s) => currentSec >= s.start && currentSec < s.start + s.duration,
  );
  const activeIdx = activeScene === -1 ? SCENES.length - 1 : activeScene;

  const timecode = `${currentSec.toFixed(2)}s / ${DURATION_SECONDS.toFixed(2)}s · ${FPS} FPS · SVG motion system`;

  return (
    <>
      <main className="app-shell">
        <aside className="control-panel" aria-label="Reel controls">
          <div>
            <p className="eyebrow">BUILD HAUS STUDIO</p>
            <h1>
              No editamos reels.
              <br />
              Los programamos.
            </h1>
            <p className="panel-copy">
              La edición de video no es lo nuestro. El desarrollo sí. Entonces
              hicimos una app que genera este reel, porque si había una forma de
              mostrar cómo trabajamos, iba a ser construyéndola.
            </p>
            <p className="panel-small-line">
              Sí, todo esto también es parte del portfolio.
            </p>
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

          <section className="audio-panel" aria-label="Audio del reel">
            <div className="audio-panel-head">
              <h2>Audio del reel</h2>
              <p>
                Voiceover en español incluido. La música queda para el WebM
                exportado.
              </p>
            </div>

            <div className="audio-toggle">
              <button
                type="button"
                className={audioEnabled ? '' : 'active'}
                onClick={() => setAudioEnabled(false)}
              >
                Sin audio
              </button>
              <button
                type="button"
                className={audioEnabled ? 'active' : ''}
                onClick={() => setAudioEnabled(true)}
              >
                Con voz
              </button>
            </div>

            <div className="volume-grid">
              <label>
                <span>Voz</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={voiceVol}
                  onChange={(e) =>
                    setVoiceVol(Number(e.currentTarget.value))
                  }
                />
                <em>{voiceVol}%</em>
              </label>
              <label>
                <span>Escena</span>
                <em
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                  }}
                >
                  {String(SCENES[activeIdx].id).padStart(2, '0')} ·{' '}
                  {SCENES[activeIdx].label}
                </em>
              </label>
            </div>

            <p className="audio-note">
              Porque si ya hicimos una app para el reel, mínimo tenía que sonar
              bien.
            </p>
          </section>

          <div className="meter" aria-label="Timeline progress">
            <span style={{ width: `${progress * 100}%` }} />
          </div>

          <input
            className="scrubber"
            type="range"
            min={0}
            max={DURATION_SECONDS}
            step={0.01}
            value={currentSec}
            onChange={(e) => handleScrub(Number(e.currentTarget.value))}
            aria-label="Scrub Reel timeline"
          />

          <p className="status">{status}</p>
          <p className="timecode">{timecode}</p>
        </aside>

        <section className="stage-wrap" aria-label="1080 by 1920 Reel preview">
          <div className="stage-frame">
            <ReelSVG progress={progress} svgRef={svgRef} />
          </div>
        </section>
      </main>

      <section className="explain-section">
        <div className="explain-inner">
          <div className="explain-heading">
            <p className="eyebrow" style={{ marginBottom: 16 }}>
              CÓMO FUNCIONA
            </p>
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
              <strong>¿Por qué hacerlo así?</strong> Porque construir soluciones
              a medida es exactamente lo que hacemos.
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
