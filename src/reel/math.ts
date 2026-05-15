export const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeOut2 = (t: number) => 1 - Math.pow(1 - t, 2);
export const easeIn = (t: number) => Math.pow(clamp(t, 0, 1), 3);
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const seg = (t: number, start: number, end: number) =>
  easeOut(clamp((t - start) / (end - start)));
export const linseg = (t: number, start: number, end: number) =>
  clamp((t - start) / (end - start));

export const smoothstep = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};
