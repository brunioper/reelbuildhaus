// Reusable layout + text fitting for the SVG reel (safe areas, wrapping, collision helpers).

import React from 'react';
import { SHARED } from './shared';

const { C } = SHARED;

const REEL = {
  VW: 1080,
  VH: 1920,
  SAFE_X: 80,
  /** Top/bottom safe inset — copy & CTAs must stay inside */
  SAFE_Y: 140,
  /** Central column width inside safe horizontal padding */
  get CONTENT_W() {
    return this.VW - this.SAFE_X * 2;
  },
  MIN_HEADLINE_PX: 58,
  MAX_HEADLINE_PX: 122,
  MIN_SUB_PX: 32,
  MAX_SUB_PX: 44,
  MIN_BADGE_PX: 24,
  MIN_CTA_PX: 30,
  HEAD_SUB_GAP: 32,
  SUB_BADGE_GAP: 24,
  ILLUSTRATION_TOP_MIN: 660,
};

/** Eased opacity 0→1 after `start`, over `duration` (fractions of scene `p`). Holds at 1. */
function revealAfter(p, start = 0.06, duration = 0.18) {
  if (p <= start) return 0;
  const u = Math.min(1, (p - start) / duration);
  return 1 - Math.pow(1 - u, 3);
}

/** Scale-in helper (returns ~0..1) for restrained motion */
function scaleReveal(p, start = 0.05, duration = 0.2) {
  return revealAfter(p, start, duration);
}

let _canvas;
function _ctx() {
  if (!_canvas) _canvas = document.createElement('canvas');
  return _canvas.getContext('2d');
}

/** Approximate rendered width for a single line (Inter-weight heuristic). */
function measureLineWidth(text, fontSizePx, fontWeight, fontFamily) {
  if (!text) return 0;
  try {
    const ctx = _ctx();
    ctx.font = `${fontWeight} ${fontSizePx}px ${fontFamily}`;
    return ctx.measureText(text).width;
  } catch {
    return text.length * fontSizePx * 0.52;
  }
}

/** Greedy word wrap to max pixel width. */
function wrapTextToLines(text, maxWidthPx, fontSizePx, fontWeight, fontFamily) {
  const words = String(text).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const lines = [];
  let line = '';
  for (const w of words) {
    const trial = line ? `${line} ${w}` : w;
    if (measureLineWidth(trial, fontSizePx, fontWeight, fontFamily) <= maxWidthPx) {
      line = trial;
    } else {
      if (line) lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Reduce font size until lines fit width or hit minimum. */
function shrinkToFitLines(lines, maxWidthPx, maxSize, minSize, fontWeight, fontFamily, step = 2) {
  let size = maxSize;
  while (size >= minSize) {
    const ok = lines.every(
      (ln) => measureLineWidth(ln, size, fontWeight, fontFamily) <= maxWidthPx,
    );
    if (ok) return { size, lines };
    size -= step;
  }
  const wrapped = [];
  for (const ln of lines) {
    wrapped.push(...wrapTextToLines(ln, maxWidthPx, minSize, fontWeight, fontFamily));
  }
  return { size: minSize, lines: wrapped };
}

function rectsOverlap(a, b, pad = 0) {
  return !(
    a.x + a.w + pad < b.x ||
    b.x + b.w + pad < a.x ||
    a.y + a.h + pad < b.y ||
    b.y + b.h + pad < a.y
  );
}

/** Stack rectangles vertically; nudge `graphic` down if it hits `copy`. */
function resolveGraphicBelowCopy(copyBBox, graphicBBox, gap = 36) {
  let gy = graphicBBox.y;
  const g = { ...graphicBBox, y: gy };
  if (rectsOverlap(copyBBox, g, 8)) {
    gy = copyBBox.y + copyBBox.h + gap;
  }
  return { ...graphicBBox, y: gy };
}

/** Multi-line left-aligned copy block */
function MultilineText({
  x,
  yStart,
  lines,
  fontSize,
  fontWeight,
  fill,
  fontFamily,
  lineHeight = 1.12,
  opacity = 1,
  letterSpacing = 0,
}) {
  const lh = fontSize * lineHeight;
  return (
    <g opacity={opacity}>
      {lines.map((ln, i) => (
        <text
          key={i}
          x={x}
          y={yStart + i * lh}
          fill={fill}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing}
        >
          {ln}
        </text>
      ))}
    </g>
  );
}

/** Centered multiline block — returns total height via implicit layout */
function MultilineCenter({
  cx,
  yStart,
  lines,
  fontSize,
  fontWeight,
  fill,
  fontFamily,
  lineHeight = 1.12,
  opacity = 1,
}) {
  const lh = fontSize * lineHeight;
  return (
    <g opacity={opacity}>
      {lines.map((ln, i) => (
        <text
          key={i}
          x={cx}
          y={yStart + i * lh}
          fill={fill}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textAnchor="middle"
        >
          {ln}
        </text>
      ))}
    </g>
  );
}

/** Readable badge — never micro-sized */
function BadgePill({
  cx,
  cy,
  label,
  theme,
  font,
  opacity = 1,
  fontSize = 26,
  padX = 28,
  padY = 14,
}) {
  const border = theme === 'dark' ? 'rgba(247,250,255,0.35)' : 'rgba(7,29,53,0.22)';
  const bg =
    theme === 'dark' ? 'rgba(36,107,255,0.14)' : 'rgba(36,107,255,0.10)';
  const ink = theme === 'dark' ? C.white : C.navy;
  const tw = measureLineWidth(label, fontSize, 700, font);
  const w = tw + padX * 2;
  const hBox = fontSize + padY * 2;
  const x = cx - w / 2;
  const y = cy - hBox / 2;
  return (
    <g opacity={opacity}>
      <rect x={x} y={y} width={w} height={hBox} rx={hBox / 2} fill={bg} stroke={border} strokeWidth={1.5} />
      <text
        x={cx}
        y={cy + fontSize * 0.35}
        fill={ink}
        fontFamily={font}
        fontSize={fontSize}
        fontWeight={700}
        textAnchor="middle"
        letterSpacing={0.2}
      >
        {label}
      </text>
    </g>
  );
}

/** Dominant CTA pair — optional `dominant` boosts size for closing scene */
function DualCTA({
  cx,
  yPrimaryTop,
  primaryLabel,
  secondaryLabel,
  theme,
  font,
  opacity = 1,
  dominant = false,
  /** Extra uniform scale (e.g. confident push-in + one-shot pulse), anchored on stack center */
  motionScale = 1,
}) {
  const pad = dominant ? 16 : 40;
  const primaryW = Math.min(dominant ? 760 : 680, REEL.CONTENT_W - pad);
  const primaryH = dominant ? 112 : 96;
  const secW = Math.min(dominant ? 680 : 520, REEL.CONTENT_W - (dominant ? 32 : 80));
  const secH = dominant ? 92 : 76;
  const fsPri = (dominant ? REEL.MIN_CTA_PX + 10 : REEL.MIN_CTA_PX + 6);
  const fsSec = (dominant ? REEL.MIN_CTA_PX + 6 : REEL.MIN_CTA_PX + 2);
  const inkBtn = C.white;
  const inkSecondary = theme === 'dark' ? C.white : C.navy;
  const gap = dominant ? 22 : 28;
  const stackH = primaryH + gap + secH;
  const pcx = cx;
  const pcy = yPrimaryTop + stackH / 2;

  return (
    <g opacity={opacity}>
      <g transform={`translate(${pcx}, ${pcy}) scale(${motionScale}) translate(${-pcx}, ${-pcy})`}>
      <rect
        x={cx - primaryW / 2}
        y={yPrimaryTop}
        width={primaryW}
        height={primaryH}
        rx={primaryH / 2}
        fill={C.blue}
        filter="url(#ctaGlow)"
      />
      <text
        x={cx}
        y={yPrimaryTop + primaryH / 2 + fsPri * 0.35}
        fill={inkBtn}
        fontFamily={font}
        fontSize={fsPri}
        fontWeight={800}
        textAnchor="middle"
        letterSpacing={0.5}
      >
        {primaryLabel}
      </text>

      <rect
        x={cx - secW / 2}
        y={yPrimaryTop + primaryH + gap}
        width={secW}
        height={secH}
        rx={secH / 2}
        fill={theme === 'dark' ? 'rgba(247,250,255,0.06)' : '#FFFFFF'}
        stroke={C.blue}
        strokeWidth={dominant ? 2.5 : 2}
      />
      <text
        x={cx}
        y={
          yPrimaryTop +
          primaryH +
          gap +
          secH / 2 +
          fsSec * 0.28
        }
        fill={inkSecondary}
        fontFamily={font}
        fontSize={fsSec}
        fontWeight={750}
        textAnchor="middle"
        letterSpacing={0.4}
      >
        {secondaryLabel}
      </text>
      </g>
    </g>
  );
}

/** Large centered memo lines (social CTA sentence) */
function MemoRibbon({
  cx,
  yStart,
  lines,
  fontSize,
  fill,
  fontFamily,
  opacity = 1,
  fontWeight = 800,
}) {
  const lh = fontSize * 1.18;
  return (
    <g opacity={opacity}>
      {lines.map((ln, i) => (
        <text
          key={i}
          x={cx}
          y={yStart + i * lh}
          fill={fill}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textAnchor="middle"
          letterSpacing={-0.3}
        >
          {ln}
        </text>
      ))}
    </g>
  );
}

export const REEL_LAYOUT = {
  REEL,
  measureLineWidth,
  wrapTextToLines,
  shrinkToFitLines,
  rectsOverlap,
  resolveGraphicBelowCopy,
  revealAfter,
  scaleReveal,
  MultilineText,
  MultilineCenter,
  BadgePill,
  DualCTA,
  MemoRibbon,
};
