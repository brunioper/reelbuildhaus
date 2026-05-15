/**
 * Frame-accurate envelopes for Remotion — interpolate-based crossfades + camera transform.
 * Keeps one SVG root so defs / clipPaths stay unique across overlapping fades.
 */
import { Easing, interpolate } from 'remotion';
import { clamp, easeIn, easeOut, lerp, smoothstep } from './math';
import { FADE_SECONDS, HEIGHT, SCENES, WIDTH } from './timeline';

export function sceneOpacityFrame(
  frame: number,
  fps: number,
  sceneIndex: number,
): number {
  const scene = SCENES[sceneIndex];
  const startSec = scene.startSeconds;
  const durationSec = scene.durationSeconds;
  const t = frame / fps;
  const local = t - startSec;
  return interpolate(
    local,
    [-FADE_SECONDS, 0, durationSec, durationSec + FADE_SECONDS],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.33, 0.01, 0.24, 1),
    },
  );
}

export function sceneProgressFrame(frame: number, fps: number, sceneIndex: number): number {
  const scene = SCENES[sceneIndex];
  const t = frame / fps;
  return clamp((t - scene.startSeconds) / scene.durationSeconds);
}

export function sceneTransformFrame(
  frame: number,
  fps: number,
  sceneIndex: number,
): string {
  const scene = SCENES[sceneIndex];
  const duration = scene.durationSeconds;
  const start = scene.startSeconds;
  const wallT = frame / fps;
  const s = wallT - start;
  const cx = WIDTH / 2;
  const cy = HEIGHT / 2;
  const dir = sceneIndex % 2 === 0 ? 1 : -1;
  const fade = FADE_SECONDS;

  let scale = 1;
  let tx = 0;
  let ty = 0;
  let rot = 0;

  if (s >= -fade && s < fade) {
    const u = clamp((s + fade) / fade);
    const e = smoothstep(u);
    scale *= lerp(1.118, 1, easeOut(e));
    ty += lerp(64, 0, easeOut(e));
    tx += lerp(-26 * dir, 0, easeOut(e));
  }

  if (s > duration - fade && s <= duration + fade * 0.65) {
    const u = clamp((s - (duration - fade)) / fade);
    const e = smoothstep(u);
    scale *= lerp(1, 1.09, easeIn(e));
    ty += lerp(0, -92, easeIn(e));
    tx += lerp(0, 32 * dir, easeIn(e));
    rot += lerp(0, -0.65 * dir, easeIn(e));
  }

  return `translate(${cx}, ${cy}) rotate(${rot}) scale(${scale}) translate(${-cx + tx}, ${-cy + ty})`;
}
