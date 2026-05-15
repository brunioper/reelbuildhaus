/** Single source of truth for reel timing — used by Remotion + web preview. */

export const FPS = 30;

export const FADE_SECONDS = 0.55;

export type SceneTheme = 'dark' | 'light';

export type SceneTimelineRow = {
  id: number;
  durationSeconds: number;
  durationInFrames: number;
  theme: SceneTheme;
  label: string;
  /** Cumulative start in seconds (filled below). */
  startSeconds: number;
};

const SPEC: Omit<SceneTimelineRow, 'durationInFrames' | 'startSeconds'>[] = [
  { id: 1, durationSeconds: 9.0, theme: 'dark', label: 'Gancho — no editado, programado' },
  { id: 2, durationSeconds: 2.65, theme: 'light', label: 'Sistemas, no plantillas' },
  { id: 3, durationSeconds: 2.65, theme: 'dark', label: 'Conversión primero' },
  { id: 4, durationSeconds: 2.65, theme: 'light', label: 'Discovery del negocio' },
  { id: 5, durationSeconds: 2.65, theme: 'dark', label: 'Arquitectura de oferta' },
  { id: 6, durationSeconds: 2.65, theme: 'light', label: 'Recorrido diseñado' },
  { id: 7, durationSeconds: 3.1, theme: 'dark', label: 'Experiencia desarrollada' },
  { id: 8, durationSeconds: 2.55, theme: 'light', label: 'Sistema visual' },
  { id: 9, durationSeconds: 3.1, theme: 'dark', label: 'Código escalable' },
  { id: 10, durationSeconds: 2.65, theme: 'light', label: 'Optimización CRO' },
  { id: 11, durationSeconds: 2.65, theme: 'dark', label: 'Resultado final' },
  { id: 12, durationSeconds: 9.0, theme: 'light', label: 'CTA — comentá REEL' },
];

let acc = 0;
export const SCENES: SceneTimelineRow[] = SPEC.map((row) => {
  const startSeconds = acc;
  acc += row.durationSeconds;
  return {
    ...row,
    startSeconds,
    durationInFrames: Math.max(1, Math.round(row.durationSeconds * FPS)),
  };
});

export const TOTAL_DURATION_SECONDS = acc;

/** Sum of per-scene rounded frames — composition duration must match layer timeline. */
export const TOTAL_DURATION_IN_FRAMES = SCENES.reduce((sum, s) => sum + s.durationInFrames, 0);

export const WIDTH = 1080;
export const HEIGHT = 1920;
