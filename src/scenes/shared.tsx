import { C, FONT, VIDEO_WIDTH, VIDEO_HEIGHT, T } from '../constants';

// ─── Easing ──────────────────────────────────────────────────────────────────

export const easeOut  = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeOut2 = (t: number) => 1 - Math.pow(1 - t, 2);
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
export const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;
export const seg   = (t: number, start: number, end: number) =>
  easeOut(clamp((t - start) / (end - start)));

// ─── Blueprint Grid ───────────────────────────────────────────────────────────

export function BlueprintGrid({ theme }: { theme: 'dark' | 'light' }) {
  const stroke = theme === 'dark' ? C.white : C.navy;
  const minor: React.ReactNode[] = [];
  const major: React.ReactNode[] = [];

  for (let x = 0; x <= VIDEO_WIDTH; x += 45) {
    const isMajor = x % 180 === 0;
    (isMajor ? major : minor).push(
      <line key={`vx${x}`} x1={x} y1={0} x2={x} y2={VIDEO_HEIGHT}
        stroke={stroke} strokeWidth={isMajor ? 0.7 : 0.35}
        opacity={isMajor ? 0.07 : 0.035} />,
    );
  }
  for (let y = 0; y <= VIDEO_HEIGHT; y += 45) {
    const isMajor = y % 180 === 0;
    (isMajor ? major : minor).push(
      <line key={`hy${y}`} x1={0} y1={y} x2={VIDEO_WIDTH} y2={y}
        stroke={stroke} strokeWidth={isMajor ? 0.7 : 0.35}
        opacity={isMajor ? 0.07 : 0.035} />,
    );
  }

  return <g aria-hidden="true">{minor}{major}</g>;
}

// ─── Corner Brackets ─────────────────────────────────────────────────────────

export function CornerBrackets({
  x, y, w, h, size = 20, color, opacity = 0.35, strokeWidth = 1.5,
}: {
  x: number; y: number; w: number; h: number;
  size?: number; color: string; opacity?: number; strokeWidth?: number;
}) {
  const corners = [
    `M${x + size},${y} L${x},${y} L${x},${y + size}`,
    `M${x + w - size},${y} L${x + w},${y} L${x + w},${y + size}`,
    `M${x},${y + h - size} L${x},${y + h} L${x + size},${y + h}`,
    `M${x + w - size},${y + h} L${x + w},${y + h} L${x + w},${y + h - size}`,
  ];
  return (
    <g aria-hidden="true">
      {corners.map((d, i) => (
        <path key={i} d={d} stroke={color} strokeWidth={strokeWidth}
          fill="none" opacity={opacity} strokeLinecap="square" />
      ))}
    </g>
  );
}

// ─── Technical Label ─────────────────────────────────────────────────────────

export function TechLabel({
  x, y, children, theme = 'light', opacity = 1, anchor = 'start',
}: {
  x: number; y: number; children: string;
  theme?: 'dark' | 'light'; opacity?: number;
  anchor?: 'start' | 'middle' | 'end';
}) {
  const fill = theme === 'dark' ? C.gray : '#7C90A8';
  return (
    <text
      x={x} y={y}
      fill={fill}
      fontFamily={FONT}
      fontSize={T.type.micro}
      fontWeight={700}
      letterSpacing={2.4}
      textAnchor={anchor}
      opacity={opacity}
    >
      {children}
    </text>
  );
}

// ─── Headline Text ────────────────────────────────────────────────────────────

export function Headline({
  x, y, lines, theme = 'light', size = T.type.headline, opacity = 1, leading = 1.05,
}: {
  x: number; y: number; lines: string[]; theme?: 'dark' | 'light';
  size?: number; opacity?: number; leading?: number;
}) {
  const fill = theme === 'dark' ? C.white : C.navy;
  return (
    <g opacity={opacity}>
      {lines.map((line, i) => (
        <text
          key={i}
          x={x} y={y + i * size * leading}
          fill={fill}
          fontFamily={FONT}
          fontSize={size}
          fontWeight={850}
          letterSpacing={-1.5}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

// ─── Highlight Text ───────────────────────────────────────────────────────────

export function BlueText({
  x, y, children, size = T.type.sub, weight = 700, opacity = 1,
}: {
  x: number; y: number; children: string; size?: number; weight?: number; opacity?: number;
}) {
  return (
    <text x={x} y={y} fill={C.blue} fontFamily={FONT} fontSize={size}
      fontWeight={weight} letterSpacing={-0.5} opacity={opacity}>
      {children}
    </text>
  );
}

// ─── Measurement Line ─────────────────────────────────────────────────────────

export function MeasureLine({
  x1, y1, x2, y2, color, label, opacity = 0.3,
}: {
  x1: number; y1: number; x2: number; y2: number;
  color: string; label?: string; opacity?: number;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const isH = y1 === y2;
  return (
    <g opacity={opacity} aria-hidden="true">
      {/* tick start */}
      <line x1={x1} y1={isH ? y1 - 6 : x1 - 6} x2={x1} y2={isH ? y1 + 6 : x1 + 6}
        stroke={color} strokeWidth={1} />
      {/* main line */}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={0.8}
        strokeDasharray="4 3" />
      {/* tick end */}
      <line x1={x2} y1={isH ? y2 - 6 : x2 - 6} x2={x2} y2={isH ? y2 + 6 : x2 + 6}
        stroke={color} strokeWidth={1} />
      {label && (
        <text x={mx} y={isH ? my - 10 : my} fill={color} fontFamily={FONT}
          fontSize={11} fontWeight={600} textAnchor="middle" letterSpacing={1.5}>
          {label}
        </text>
      )}
    </g>
  );
}

// ─── Blue Dot ─────────────────────────────────────────────────────────────────

export function BlueDot({ x, y, r = 8, opacity = 1, glow = true }: {
  x: number; y: number; r?: number; opacity?: number; glow?: boolean;
}) {
  return (
    <g opacity={opacity}>
      {glow && <circle cx={x} cy={y} r={r * 2.5} fill={C.blue} opacity={0.12} />}
      {glow && <circle cx={x} cy={y} r={r * 1.5} fill={C.blue} opacity={0.18} />}
      <circle cx={x} cy={y} r={r} fill={C.blue} />
    </g>
  );
}

// ─── Node ─────────────────────────────────────────────────────────────────────

export function Node({
  cx, cy, label, sublabel, theme = 'light', active = 0, size = 100,
}: {
  cx: number; cy: number; label: string; sublabel?: string;
  theme?: 'dark' | 'light'; active?: number; size?: number;
}) {
  const bg    = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(7,29,53,0.04)';
  const bgA   = theme === 'dark' ? 'rgba(36,107,255,0.18)' : 'rgba(36,107,255,0.10)';
  const fill  = theme === 'dark' ? C.white : C.navy;
  const half  = size / 2;
  const bgFill = lerp(0, 1, active) > 0.5 ? bgA : bg;
  const bdr    = theme === 'dark'
    ? lerp(0, 1, active) > 0.5 ? C.blue : C.darkLine
    : lerp(0, 1, active) > 0.5 ? C.blue : C.blueprint;

  return (
    <g>
      <rect x={cx - half} y={cy - half * 0.7} width={size} height={size * 0.7}
        rx={T.r.sm} fill={bgFill} stroke={bdr} strokeWidth={1.2} />
      <text x={cx} y={cy} fill={active > 0.5 ? C.blue : fill}
        fontFamily={FONT} fontSize={16} fontWeight={700}
        textAnchor="middle" dominantBaseline="middle" letterSpacing={0.5}>
        {label}
      </text>
      {sublabel && (
        <text x={cx} y={cy + 20} fill={C.gray}
          fontFamily={FONT} fontSize={11} fontWeight={500}
          textAnchor="middle" dominantBaseline="middle" letterSpacing={1.5}>
          {sublabel}
        </text>
      )}
    </g>
  );
}

// ─── Card Frame ───────────────────────────────────────────────────────────────

export function CardFrame({
  x, y, w, h, theme = 'light', opacity = 1, label,
}: {
  x: number; y: number; w: number; h: number;
  theme?: 'dark' | 'light'; opacity?: number; label?: string;
}) {
  const stroke = theme === 'dark' ? 'rgba(255,255,255,0.12)' : C.blueprint;
  const bg     = theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(7,29,53,0.02)';
  const color  = theme === 'dark' ? C.gray : '#7C90A8';
  return (
    <g opacity={opacity}>
      <rect x={x} y={y} width={w} height={h} rx={T.r.md}
        fill={bg} stroke={stroke} strokeWidth={1.2} />
      <CornerBrackets x={x} y={y} w={w} h={h} size={16}
        color={theme === 'dark' ? C.gray : C.navy} opacity={0.25} />
      {label && (
        <text x={x + 12} y={y + 22} fill={color} fontFamily={FONT}
          fontSize={11} fontWeight={700} letterSpacing={2}>
          {label}
        </text>
      )}
    </g>
  );
}

// ─── Waveform placeholder ─────────────────────────────────────────────────────

export function WaveformBar({ x, y, w, theme }: {
  x: number; y: number; w: number; theme: 'dark' | 'light';
}) {
  const bars = 20;
  const barW = w / bars * 0.55;
  const gap  = w / bars;
  const heights = [8,14,20,12,26,18,10,24,16,22,14,28,10,20,16,24,12,18,10,14];
  const fill = theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(7,29,53,0.12)';
  return (
    <g>
      {heights.map((h, i) => (
        <rect key={i}
          x={x + i * gap} y={y - h / 2}
          width={barW} height={h}
          rx={2} fill={fill} />
      ))}
    </g>
  );
}

// ─── Scene bg fill ────────────────────────────────────────────────────────────

export function SceneBg({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <rect x={0} y={0} width={VIDEO_WIDTH} height={VIDEO_HEIGHT}
      fill={theme === 'dark' ? C.navy : C.white} />
  );
}
