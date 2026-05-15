// ─── Shared primitives — architectural drafting language ──────────────────────
// All scenes use these. Their job is to make the SVG feel HAND-DRAFTED:
// construction lines → ink → dimensioned values, with a sheet metaphor.

const C = {
  navy:      '#071D35',
  white:     '#F7FAFF',
  paper:     '#F2EFE6',   // warm drafting-paper tint (light scenes)
  blue:      '#246BFF',
  cyan:      '#3FB5FF',   // construction-line cyan
  lightBlue: '#66A9FF',
  gray:      '#7C90A8',
  blueprint: '#EAF0F8',
  darkLine:  '#1D3554',
  amber:     '#E8B86A',
  red:       '#E25C5C',
};

const FONT      = 'Inter, ui-sans-serif, system-ui, sans-serif';
const FONT_MONO = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace';

const VW = 1080;
const VH = 1920;

// ─── Math helpers ────────────────────────────────────────────────────────────

const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
const lerp  = (a, b, t) => a + (b - a) * t;
const easeOut  = (t) => 1 - Math.pow(1 - t, 3);
const easeOut2 = (t) => 1 - Math.pow(1 - t, 2);
const easeIn   = (t) => Math.pow(clamp(t, 0, 1), 3);
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const seg = (t, start, end) => easeOut(clamp((t - start) / (end - start)));
const linseg = (t, start, end) => clamp((t - start) / (end - start));

// ─── Sheet background ────────────────────────────────────────────────────────

function SceneBg({ theme }) {
  if (theme === 'dark') {
    return (
      <g>
        <rect x={0} y={0} width={VW} height={VH} fill="url(#reel-bg-core)" />
        <rect x={0} y={0} width={VW} height={VH} fill="url(#reel-bg-glow-tr)" />
        <rect x={0} y={0} width={VW} height={VH} fill="url(#reel-bg-glow-bl)" />
        <rect x={0} y={0} width={VW} height={VH} fill="url(#vign)" />
      </g>
    );
  }
  return (
    <g>
      <rect x={0} y={0} width={VW} height={VH} fill="url(#reel-light-wash)" />
      <rect x={0} y={0} width={VW} height={VH} fill={C.paper} opacity={0.18} />
    </g>
  );
}

// ─── Drafting grid: cyan minor + slightly stronger every 5 ───────────────────

function DraftGrid({ theme, opacity = 1 }) {
  const fine  = theme === 'dark' ? 'rgba(63,181,255,0.06)'  : 'rgba(7,29,53,0.05)';
  const major = theme === 'dark' ? 'rgba(63,181,255,0.12)'  : 'rgba(7,29,53,0.10)';
  const lines = [];
  const STEP = 36;
  for (let x = 0; x <= VW; x += STEP) {
    const isMajor = (x / STEP) % 5 === 0;
    lines.push(<line key={`vx${x}`} x1={x} y1={0} x2={x} y2={VH}
      stroke={isMajor ? major : fine} strokeWidth={isMajor ? 0.6 : 0.4} />);
  }
  for (let y = 0; y <= VH; y += STEP) {
    const isMajor = (y / STEP) % 5 === 0;
    lines.push(<line key={`hy${y}`} x1={0} y1={y} x2={VW} y2={y}
      stroke={isMajor ? major : fine} strokeWidth={isMajor ? 0.6 : 0.4} />);
  }
  return <g opacity={opacity} aria-hidden="true">{lines}</g>;
}

// ─── Sheet frame: thin double border + corner registration marks ─────────────

function SheetFrame({ theme, opacity = 1 }) {
  const ink = theme === 'dark' ? 'rgba(247,250,255,0.45)' : 'rgba(7,29,53,0.55)';
  const sub = theme === 'dark' ? 'rgba(247,250,255,0.18)' : 'rgba(7,29,53,0.20)';
  const M = 80;
  return (
    <g opacity={opacity} aria-hidden="true">
      {/* Outer hairline */}
      <rect x={M - 12} y={M - 12} width={VW - (M - 12) * 2} height={VH - (M - 12) * 2}
        fill="none" stroke={sub} strokeWidth={0.6} />
      {/* Inner sheet border (heavier) */}
      <rect x={M} y={M} width={VW - M * 2} height={VH - M * 2}
        fill="none" stroke={ink} strokeWidth={1.2} />
      {/* Corner registration crosshairs */}
      {[[M, M], [VW - M, M], [M, VH - M], [VW - M, VH - M]].map(([x, y], i) => (
        <g key={i}>
          <line x1={x - 10} y1={y} x2={x + 10} y2={y} stroke={ink} strokeWidth={1} />
          <line x1={x} y1={y - 10} x2={x} y2={y + 10} stroke={ink} strokeWidth={1} />
          <circle cx={x} cy={y} r={3} fill="none" stroke={ink} strokeWidth={0.8} />
        </g>
      ))}
    </g>
  );
}

// ─── Grid letters A-H along top, numbers 1-12 down side ──────────────────────

function SheetGridLabels({ theme, opacity = 1, highlight = -1 }) {
  // Mobile-friendly: only A-D across top (bigger labels), no row numbers (too small).
  const ink = theme === 'dark' ? 'rgba(247,250,255,0.40)' : 'rgba(7,29,53,0.45)';
  const hi  = C.blue;
  const M = 80;
  const cols = ['A', 'B', 'C', 'D'];
  const colW = (VW - M * 2) / cols.length;
  return (
    <g opacity={opacity} aria-hidden="true">
      {cols.map((c, i) => {
        const x = M + colW * (i + 0.5);
        const active = i === highlight;
        return (
          <g key={c}>
            <line x1={M + colW * i} y1={M - 10} x2={M + colW * i} y2={M + 10}
              stroke={active ? hi : ink} strokeWidth={1} />
            <text x={x} y={M - 18} fill={active ? hi : ink}
              fontFamily={FONT_MONO} fontSize={16} fontWeight={700}
              textAnchor="middle" letterSpacing={2}>
              {c}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// ─── Title block — bottom right corner, every sheet ──────────────────────────

function TitleBlock({ theme, opacity = 1, sheet, title, scene }) {
  const ink   = theme === 'dark' ? C.white : C.navy;
  const sub   = theme === 'dark' ? 'rgba(247,250,255,0.55)' : 'rgba(7,29,53,0.55)';
  const line  = theme === 'dark' ? 'rgba(247,250,255,0.30)' : 'rgba(7,29,53,0.30)';
  const fill  = theme === 'dark' ? 'rgba(247,250,255,0.04)' : 'rgba(7,29,53,0.04)';
  // BIGGER for mobile legibility — content reads cleanly at 9:16 phone size.
  const W = 520, H = 148;
  const X = VW - 80 - W;
  const Y = VH - 140 - H;

  return (
    <g opacity={opacity}>
      <rect x={X} y={Y} width={W} height={H} fill={fill} stroke={line} strokeWidth={1.2} />
      {/* Internal divisions */}
      <line x1={X} y1={Y + 36} x2={X + W} y2={Y + 36} stroke={line} strokeWidth={0.8} />
      <line x1={X + W - 156} y1={Y + 36} x2={X + W - 156} y2={Y + H} stroke={line} strokeWidth={0.8} />

      {/* Header strip */}
      <text x={X + 16} y={Y + 24} fill={sub} fontFamily={FONT_MONO}
        fontSize={14} fontWeight={700} letterSpacing={2.5}>
        BUILD HAUS · SISTEMA · REV.A
      </text>

      {/* Title (sheet name) */}
      <text x={X + 16} y={Y + 76} fill={ink} fontFamily={FONT}
        fontSize={28} fontWeight={850} letterSpacing={-0.5}>
        {title}
      </text>
      <text x={X + 16} y={Y + 104} fill={sub} fontFamily={FONT_MONO}
        fontSize={13} fontWeight={600} letterSpacing={2}>
        ESCALA 1:1 · 1080 × 1920
      </text>
      <text x={X + 16} y={Y + 130} fill={sub} fontFamily={FONT_MONO}
        fontSize={13} fontWeight={600} letterSpacing={2}>
        BHS · 2026
      </text>

      {/* Sheet number badge (right column) — BIG */}
      <text x={X + W - 78} y={Y + 64} fill={sub} fontFamily={FONT_MONO}
        fontSize={13} fontWeight={700} textAnchor="middle" letterSpacing={2.5}>
        HOJA
      </text>
      <text x={X + W - 78} y={Y + 120} fill={ink} fontFamily={FONT}
        fontSize={62} fontWeight={850} textAnchor="middle" letterSpacing={-2}>
        {sheet}
      </text>
      <text x={X + W - 78} y={Y + 142} fill={sub} fontFamily={FONT_MONO}
        fontSize={13} fontWeight={700} textAnchor="middle" letterSpacing={2}>
        DE 12
      </text>
    </g>
  );
}

// ─── Top eyebrow with sheet code ─────────────────────────────────────────────

function SheetEyebrow({ theme, opacity = 1, code, label }) {
  const ink = theme === 'dark' ? 'rgba(247,250,255,0.75)' : 'rgba(7,29,53,0.65)';
  const sub = theme === 'dark' ? 'rgba(247,250,255,0.30)' : 'rgba(7,29,53,0.25)';
  const edge = 80;
  const y0 = 148;
  return (
    <g opacity={opacity}>
      <text x={edge} y={y0} fill={C.blue} fontFamily={FONT_MONO}
        fontSize={17} fontWeight={800} letterSpacing={3}>
        {code}
      </text>
      <text x={edge} y={y0 + 28} fill={ink} fontFamily={FONT_MONO}
        fontSize={16} fontWeight={700} letterSpacing={2.5}>
        {label}
      </text>
      <line x1={edge} y1={y0 + 46} x2={VW - edge} y2={y0 + 46}
        stroke={sub} strokeWidth={0.8} />
      <line x1={VW - edge - 96} y1={y0 + 46} x2={VW - edge} y2={y0 + 46}
        stroke={C.blue} strokeWidth={2} />
    </g>
  );
}

// ─── Architectural dimension line (horizontal or vertical) ───────────────────

function DimLine({ x1, y1, x2, y2, value, theme = 'light', opacity = 1, side = 'above', offset = 24 }) {
  const ink = theme === 'dark' ? 'rgba(247,250,255,0.55)' : 'rgba(7,29,53,0.55)';
  const bg  = theme === 'dark' ? '#071D35' : '#F4F6FB';
  const isH = Math.abs(y2 - y1) < 0.5;

  // shifted line offset perpendicular to drawing
  const dx = isH ? 0 : (side === 'above' ? -offset : offset);
  const dy = isH ? (side === 'above' ? -offset : offset) : 0;
  const lx1 = x1 + dx, ly1 = y1 + dy;
  const lx2 = x2 + dx, ly2 = y2 + dy;

  // 45° tick marks at endpoints (architectural style)
  const tick = 6;
  const tickPath = (cx, cy) => isH
    ? `M${cx - tick},${cy - tick} L${cx + tick},${cy + tick}`
    : `M${cx - tick},${cy - tick} L${cx + tick},${cy + tick}`;

  const mx = (lx1 + lx2) / 2;
  const my = (ly1 + ly2) / 2;
  const valW = Math.max(36, String(value).length * 7 + 14);

  return (
    <g opacity={opacity}>
      {/* extension lines */}
      <line x1={x1} y1={y1} x2={lx1} y2={ly1} stroke={ink} strokeWidth={0.5} />
      <line x1={x2} y1={y2} x2={lx2} y2={ly2} stroke={ink} strokeWidth={0.5} />
      {/* main dim line */}
      <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke={ink} strokeWidth={0.8} />
      {/* tick marks */}
      <path d={tickPath(lx1, ly1)} stroke={ink} strokeWidth={1} />
      <path d={tickPath(lx2, ly2)} stroke={ink} strokeWidth={1} />
      {/* value box */}
      <rect x={mx - valW / 2} y={my - 8} width={valW} height={16} fill={bg} />
      <text x={mx} y={my + 4} fill={ink}
        fontFamily={FONT_MONO} fontSize={10} fontWeight={700}
        textAnchor="middle" letterSpacing={1}>
        {value}
      </text>
    </g>
  );
}

// ─── Detail callout: circle bubble with leader line to a label ───────────────

function DetailBubble({ x, y, letter, leaderTo, theme = 'light', opacity = 1 }) {
  const ink = theme === 'dark' ? C.white : C.navy;
  const accent = C.blue;
  return (
    <g opacity={opacity}>
      {leaderTo && (
        <line x1={x} y1={y} x2={leaderTo[0]} y2={leaderTo[1]}
          stroke={ink} strokeWidth={0.6} strokeDasharray="3 3" opacity={0.5} />
      )}
      <circle cx={x} cy={y} r={16} fill={theme === 'dark' ? '#071D35' : '#F4F6FB'}
        stroke={accent} strokeWidth={1.5} />
      <text x={x} y={y + 4} fill={accent}
        fontFamily={FONT_MONO} fontSize={12} fontWeight={800}
        textAnchor="middle" letterSpacing={0.5}>
        {letter}
      </text>
    </g>
  );
}

// ─── Section cut marker (e.g. A───A') ────────────────────────────────────────

function SectionCut({ x1, y1, x2, y2, letter, theme = 'light', opacity = 1 }) {
  const ink = theme === 'dark' ? C.white : C.navy;
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={ink} strokeWidth={1.2} strokeDasharray="14 4 2 4" />
      {[[x1, y1, letter], [x2, y2, letter + "'"]].map(([cx, cy, lbl], i) => (
        <g key={i}>
          <rect x={cx - 14} y={cy - 14} width={28} height={28}
            fill={theme === 'dark' ? '#071D35' : '#F4F6FB'}
            stroke={ink} strokeWidth={1.2} />
          <text x={cx} y={cy + 4} fill={ink} fontFamily={FONT_MONO}
            fontSize={12} fontWeight={800} textAnchor="middle">
            {lbl}
          </text>
        </g>
      ))}
    </g>
  );
}

// ─── Hatching pattern (45° lines) for filled regions ─────────────────────────

function Hatch({ x, y, w, h, theme = 'light', opacity = 0.3, spacing = 8 }) {
  const ink = theme === 'dark' ? 'rgba(247,250,255,0.4)' : 'rgba(7,29,53,0.5)';
  const lines = [];
  // Diagonal lines from top edge across to right edge of bounding box
  const max = w + h;
  for (let d = -h; d < max; d += spacing) {
    const sx = clamp(d, 0, w);
    const sy = clamp(d, 0, h) - (d > w ? d - w : 0);
    const ex = clamp(d + h, 0, w);
    const ey = clamp(d + h, 0, h) - ((d + h) > w ? (d + h) - w : 0);
    lines.push(<line key={d}
      x1={x + (d < 0 ? 0 : Math.min(d, w))}
      y1={y + (d < 0 ? -d : 0)}
      x2={x + Math.min(d + h, w)}
      y2={y + (d + h > w ? h - (d + h - w) : h)}
      stroke={ink} strokeWidth={0.5} />);
  }
  return (
    <g opacity={opacity} clipPath={`inset(0 0 0 0)`}>
      <defs>
        <clipPath id={`hatch-clip-${x}-${y}`}>
          <rect x={x} y={y} width={w} height={h} />
        </clipPath>
      </defs>
      <g clipPath={`url(#hatch-clip-${x}-${y})`}>{lines}</g>
    </g>
  );
}

// Simpler diagonal stripe fill via pattern (defined globally in defs)
function HatchPattern({ x, y, w, h, patternId, opacity = 1 }) {
  return (
    <rect x={x} y={y} width={w} height={h}
      fill={`url(#${patternId})`} opacity={opacity} />
  );
}

// ─── Compass / North arrow ───────────────────────────────────────────────────

function NorthArrow({ x, y, theme = 'light', opacity = 1, rotation = 0 }) {
  const ink = theme === 'dark' ? 'rgba(247,250,255,0.55)' : 'rgba(7,29,53,0.55)';
  const accent = C.blue;
  return (
    <g opacity={opacity} transform={`translate(${x},${y}) rotate(${rotation})`}>
      <circle cx={0} cy={0} r={24} fill="none" stroke={ink} strokeWidth={0.8} />
      <circle cx={0} cy={0} r={18} fill="none" stroke={ink} strokeWidth={0.5} strokeDasharray="2 2" />
      <path d="M0,-22 L6,8 L0,3 L-6,8 Z" fill={accent} />
      <text x={0} y={-30} fill={ink} fontFamily={FONT_MONO}
        fontSize={10} fontWeight={800} textAnchor="middle" letterSpacing={1}>
        N
      </text>
    </g>
  );
}

// ─── Graphic scale bar ───────────────────────────────────────────────────────

function ScaleBar({ x, y, theme = 'light', opacity = 1 }) {
  const ink = theme === 'dark' ? 'rgba(247,250,255,0.55)' : 'rgba(7,29,53,0.55)';
  const segW = 24;
  return (
    <g opacity={opacity}>
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={x + i * segW} y={y} width={segW} height={6}
          fill={i % 2 === 0 ? ink : 'transparent'}
          stroke={ink} strokeWidth={0.6} />
      ))}
      <text x={x} y={y + 18} fill={ink} fontFamily={FONT_MONO}
        fontSize={8} fontWeight={700} letterSpacing={1}>0</text>
      <text x={x + segW * 2} y={y + 18} fill={ink} fontFamily={FONT_MONO}
        fontSize={8} fontWeight={700} textAnchor="middle" letterSpacing={1}>1m</text>
      <text x={x + segW * 4} y={y + 18} fill={ink} fontFamily={FONT_MONO}
        fontSize={8} fontWeight={700} textAnchor="middle" letterSpacing={1}>2m</text>
    </g>
  );
}

// ─── Draftable line: appears via construction-line first, then ink ───────────
//   draftP: 0..1 — when full, line is fully drawn

function DraftLine({ x1, y1, x2, y2, draftP, theme = 'light', strokeWidth = 1, dashed = false }) {
  const ink = theme === 'dark' ? C.white : C.navy;
  const construction = C.cyan;
  const len = Math.hypot(x2 - x1, y2 - y1);
  // Phase 1 (0–0.5): construction line draws in cyan, dashed
  // Phase 2 (0.4–1): ink overlays
  const cP = clamp(draftP / 0.5, 0, 1);
  const iP = clamp((draftP - 0.4) / 0.6, 0, 1);
  return (
    <g>
      {cP > 0 && cP < 1 && (
        <line x1={x1} y1={y1}
          x2={x1 + (x2 - x1) * cP} y2={y1 + (y2 - y1) * cP}
          stroke={construction} strokeWidth={0.6} strokeDasharray="3 3" opacity={0.7} />
      )}
      {iP > 0 && (
        <line x1={x1} y1={y1}
          x2={x1 + (x2 - x1) * iP} y2={y1 + (y2 - y1) * iP}
          stroke={ink} strokeWidth={strokeWidth}
          strokeDasharray={dashed ? "6 4" : undefined}
          strokeLinecap="square" />
      )}
    </g>
  );
}

// ─── Draftable rect: borders draw in clockwise ───────────────────────────────

function DraftRect({ x, y, w, h, draftP, theme = 'light', strokeWidth = 1, fill = 'none' }) {
  const ink = theme === 'dark' ? C.white : C.navy;
  // Total perimeter
  const perim = 2 * (w + h);
  const drawn = perim * draftP;

  // Sides: top, right, bottom, left
  const sides = [
    { len: w, ox: 0, oy: 0, dx: 1, dy: 0 },
    { len: h, ox: w, oy: 0, dx: 0, dy: 1 },
    { len: w, ox: w, oy: h, dx: -1, dy: 0 },
    { len: h, ox: 0, oy: h, dx: 0, dy: -1 },
  ];
  let remaining = drawn;
  const segs = [];
  for (let i = 0; i < 4; i++) {
    const s = sides[i];
    if (remaining <= 0) break;
    const drawHere = Math.min(remaining, s.len);
    segs.push(
      <line key={i}
        x1={x + s.ox} y1={y + s.oy}
        x2={x + s.ox + s.dx * drawHere} y2={y + s.oy + s.dy * drawHere}
        stroke={ink} strokeWidth={strokeWidth} strokeLinecap="square" />
    );
    remaining -= s.len;
  }

  return (
    <g>
      {fill !== 'none' && draftP > 0.6 && (
        <rect x={x} y={y} width={w} height={h} fill={fill}
          opacity={clamp((draftP - 0.6) / 0.4, 0, 1)} />
      )}
      {segs}
    </g>
  );
}

// ─── Draftable circle ────────────────────────────────────────────────────────

function DraftCircle({ cx, cy, r, draftP, theme = 'light', strokeWidth = 1, fill = 'none' }) {
  const ink = theme === 'dark' ? C.white : C.navy;
  const circ = 2 * Math.PI * r;
  return (
    <g>
      {fill !== 'none' && draftP > 0.7 && (
        <circle cx={cx} cy={cy} r={r} fill={fill}
          opacity={clamp((draftP - 0.7) / 0.3, 0, 1)} />
      )}
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke={ink} strokeWidth={strokeWidth}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - draftP)}
        transform={`rotate(-90 ${cx} ${cy})`} />
    </g>
  );
}

// ─── Drafted text — typewriter-style char reveal ─────────────────────────────

function DraftText({ x, y, children, p, ...props }) {
  const total = children.length;
  const visible = Math.floor(total * clamp(p, 0, 1));
  return (
    <text x={x} y={y} {...props}>
      {children.slice(0, visible)}
      {visible < total && (
        <tspan opacity={0.5}>▌</tspan>
      )}
    </text>
  );
}

// ─── Blue dot with subtle bloom ──────────────────────────────────────────────

function BlueDot({ x, y, r = 8, opacity = 1, glow = true }) {
  return (
    <g opacity={opacity}>
      {glow && <circle cx={x} cy={y} r={r * 3.2} fill={C.blue} opacity={0.07} />}
      {glow && <circle cx={x} cy={y} r={r * 2.0} fill={C.blue} opacity={0.13} />}
      <circle cx={x} cy={y} r={r} fill={C.blue} />
      <circle cx={x} cy={y} r={r * 0.4} fill="#FFFFFF" opacity={0.85} />
    </g>
  );
}

// ─── Stamp / seal ────────────────────────────────────────────────────────────

function Stamp({ x, y, p, text = 'APROBADO', sub = 'BUILD HAUS · REV.A' }) {
  // Stamp rotates in slightly + fades
  const op = clamp(p * 1.4, 0, 1);
  const rot = lerp(-18, -8, easeOut(clamp(p * 1.2, 0, 1)));
  const scale = lerp(0.6, 1, easeOut(clamp(p * 1.5, 0, 1)));
  return (
    <g opacity={op} transform={`translate(${x},${y}) rotate(${rot}) scale(${scale})`}>
      <circle cx={0} cy={0} r={92} fill="none" stroke={C.red} strokeWidth={2.5} opacity={0.85} />
      <circle cx={0} cy={0} r={78} fill="none" stroke={C.red} strokeWidth={1} opacity={0.65} />
      <text x={0} y={-12} fill={C.red} fontFamily={FONT}
        fontSize={22} fontWeight={850} textAnchor="middle" letterSpacing={2}>
        {text}
      </text>
      <line x1={-58} y1={4} x2={58} y2={4} stroke={C.red} strokeWidth={1} opacity={0.7} />
      <text x={0} y={26} fill={C.red} fontFamily={FONT_MONO}
        fontSize={9} fontWeight={700} textAnchor="middle" letterSpacing={2}>
        {sub}
      </text>
      <text x={0} y={48} fill={C.red} fontFamily={FONT_MONO}
        fontSize={8} fontWeight={700} textAnchor="middle" letterSpacing={3}>
        15·05·2026
      </text>
    </g>
  );
}

// ─── Match-line indicator (connects sheets) ──────────────────────────────────

function MatchLine({ x1, y1, x2, y2, label, theme = 'light', opacity = 1 }) {
  const ink = theme === 'dark' ? 'rgba(247,250,255,0.4)' : 'rgba(7,29,53,0.4)';
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={ink} strokeWidth={1} strokeDasharray="10 3 2 3" />
      {label && (
        <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6}
          fill={ink} fontFamily={FONT_MONO}
          fontSize={9} fontWeight={700} textAnchor="middle" letterSpacing={2}>
          {label}
        </text>
      )}
    </g>
  );
}

// ─── Common defs (patterns, filters) — included once per SVG ─────────────────

function SVGDefs() {
  return (
    <defs>
      {/* Scene backgrounds — defined once (avoid duplicate IDs across layered scenes) */}
      <radialGradient id="reel-bg-core" cx="50%" cy="38%" r="68%">
        <stop offset="0%" stopColor="#0B2747" stopOpacity="1" />
        <stop offset="55%" stopColor="#071D35" stopOpacity="1" />
        <stop offset="100%" stopColor="#040F1E" stopOpacity="1" />
      </radialGradient>
      <radialGradient id="reel-bg-glow-tr" cx="88%" cy="12%" r="35%">
        <stop offset="0%" stopColor="#246BFF" stopOpacity="0.35" />
        <stop offset="70%" stopColor="#246BFF" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="reel-bg-glow-bl" cx="8%" cy="92%" r="40%">
        <stop offset="0%" stopColor="#3FB5FF" stopOpacity="0.22" />
        <stop offset="65%" stopColor="#3FB5FF" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="vign" cx="50%" cy="50%" r="75%">
        <stop offset="55%" stopColor="#071D35" stopOpacity="0" />
        <stop offset="100%" stopColor="#000814" stopOpacity="0.62" />
      </radialGradient>
      <linearGradient id="reel-light-wash" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="100%" stopColor="#EEF3FB" stopOpacity="1" />
      </linearGradient>
      {/* Diagonal hatch (light) */}
      <pattern id="hatch-light" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(7,29,53,0.35)" strokeWidth="0.6" />
      </pattern>
      <pattern id="hatch-dark" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(247,250,255,0.30)" strokeWidth="0.6" />
      </pattern>
      <pattern id="hatch-blue" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(36,107,255,0.45)" strokeWidth="0.7" />
      </pattern>
      {/* Dot grid for "fill" textures */}
      <pattern id="dots-dark" patternUnits="userSpaceOnUse" width="14" height="14">
        <circle cx="2" cy="2" r="0.8" fill="rgba(247,250,255,0.18)" />
      </pattern>
      <pattern id="dots-light" patternUnits="userSpaceOnUse" width="14" height="14">
        <circle cx="2" cy="2" r="0.8" fill="rgba(7,29,53,0.18)" />
      </pattern>
      {/* Paper noise filter */}
      <filter id="paper" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" />
        <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.04 0" />
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
      {/* Soft blur glow */}
      <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      {/* CTA premium glow — subtle, GPU-friendly */}
      <filter id="ctaGlow" x="-35%" y="-35%" width="170%" height="170%">
        <feGaussianBlur stdDeviation="14" result="g" />
        <feColorMatrix
          in="g"
          type="matrix"
          values="0 0 0 0 0.14  0 0 0 0 0.42  0 0 0 0 1  0 0 0 0.45 0"
          result="gc"
        />
        <feMerge>
          <feMergeNode in="gc" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Soft reveal blur — kept subtle for premium entrances */}
      <filter id="softRevealBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.2" in="SourceGraphic" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

// ─── Default scene chrome wrapper — sheet that all scenes can use ────────────

function SheetChrome({ theme, p, sheet, title, code, label, highlight, children, showTitleBlock = true }) {
  const gridP    = seg(p, 0,    0.14);
  const frameP   = seg(p, 0.02, 0.18);
  const eyebrowP = seg(p, 0.05, 0.22);
  const blockP   = seg(p, 0.08, 0.26);

  // Layered parallax: grid + bg drift vs foreground copy (subtle, keeps type crisp).
  const breath = Math.sin(p * Math.PI * 2 * 1.22) * 4.5 + (p - 0.5) * 11;
  const bx = breath * 0.82;
  const by = breath * 0.52;

  return (
    <g>
      <SceneBg theme={theme} />
      <g transform={`translate(${bx * 0.92}, ${by * 0.92})`}>
        <DraftGrid theme={theme} opacity={gridP * 0.85} />
      </g>
      <g transform={`translate(${bx * 0.36}, ${by * 0.36})`}>
        <SheetFrame theme={theme} opacity={frameP} />
        <SheetGridLabels theme={theme} opacity={frameP * 0.92} highlight={highlight} />
        <SheetEyebrow theme={theme} opacity={eyebrowP} code={code} label={label} />
      </g>
      <g transform={`translate(${-bx * 0.44}, ${-by * 0.44})`}>
        {children}
      </g>
      {showTitleBlock && (
        <g transform={`translate(${bx * 0.2}, ${by * 0.2})`}>
          <TitleBlock theme={theme} opacity={blockP} sheet={sheet} title={title} />
        </g>
      )}
    </g>
  );
}

// Export everything to window so other scene files can use them
window.SHARED = {
  C, FONT, FONT_MONO, VW, VH,
  clamp, lerp, easeOut, easeOut2, easeIn, easeInOut, seg, linseg,
  SceneBg, DraftGrid, SheetFrame, SheetGridLabels, TitleBlock,
  SheetEyebrow, DimLine, DetailBubble, SectionCut, Hatch, HatchPattern,
  NorthArrow, ScaleBar, DraftLine, DraftRect, DraftCircle, DraftText,
  BlueDot, Stamp, MatchLine, SVGDefs, SheetChrome,
};
