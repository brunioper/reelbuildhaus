// Scene 08 — Design System (18–20.5s, light)
// "Un sistema visual consistente." — DETAIL SHEET with magnified callouts.

import { SHARED as SH } from '../shared';


export function Scene08({ p }: { p: number }) {
  const { C, FONT, FONT_MONO, VW,
    seg, lerp, easeOut, clamp,
    SheetChrome, DraftLine, DraftRect, DimLine, DetailBubble } = SH;

  const hl1     = seg(p, 0.06, 0.26);
  const hl2     = seg(p, 0.14, 0.34);
  const sub     = seg(p, 0.24, 0.44);
  const type    = seg(p, 0.32, 0.52);
  const color   = seg(p, 0.40, 0.60);
  const button  = seg(p, 0.50, 0.68);
  const spacing = seg(p, 0.58, 0.76);
  const tokens  = seg(p, 0.68, 0.84);
  const annot   = seg(p, 0.80, 0.96);

  const M = 90;
  const PALETTE = [
    { name: 'NAVY',  hex: '#071D35', fill: C.navy,      role: 'BG' },
    { name: 'BLUE',  hex: '#246BFF', fill: C.blue,      role: 'ACTION' },
    { name: 'CYAN',  hex: '#3FB5FF', fill: C.cyan,      role: 'CONSTRUCTION' },
    { name: 'GRAY',  hex: '#7C90A8', fill: C.gray,      role: 'TEXT/SUB' },
    { name: 'WHITE', hex: '#F7FAFF', fill: '#F7FAFF',   role: 'PAPER' },
  ];

  return (
    <SheetChrome theme="light" p={p}
      sheet="08" title="DETAIL SHEET / SISTEMA" code="A.08"
      label="DESIGN SYSTEM — TYPE · COLOR · COMPONENTS" highlight={1}>

      <text x={90} y={340} fill={C.navy} fontFamily={FONT}
        fontSize={112} fontWeight={850} letterSpacing={-2.5}
        opacity={hl1}>
        Un sistema visual
      </text>
      <text x={90} y={460} fill={C.navy} fontFamily={FONT}
        fontSize={112} fontWeight={850} letterSpacing={-2.5}
        opacity={hl2}>
        consistente.
      </text>
      <text x={90} y={548} fill={C.gray} fontFamily={FONT}
        fontSize={36} fontWeight={500} letterSpacing={-0.4}
        opacity={sub}>
        Tipografía, color, ritmo y jerarquía.
      </text>
      <text x={90} y={592} fill={C.blue} fontFamily={FONT_MONO}
        fontSize={18} fontWeight={700} letterSpacing={3}
        opacity={sub}>
        DETAIL SHEET · SCALE 2:1
      </text>

      {/* ─── Typography specimen (left top) ──────────────────────────────── */}
      {type > 0 && (
        <g opacity={type}>
          <DetailBubble x={M + 16} y={1040} letter="A" theme="light" />
          <text x={M + 40} y={1044} fill={C.gray}
            fontFamily={FONT_MONO} fontSize={10} fontWeight={800} letterSpacing={2}>
            A / TYPOGRAPHY · INTER
          </text>
          <rect x={M} y={1060} width={460} height={230}
            fill="#FFFFFF" stroke={C.navy} strokeWidth={1} />
          {/* Aa specimen */}
          <text x={M + 22} y={1180} fill={C.navy} fontFamily={FONT}
            fontSize={120} fontWeight={850} letterSpacing={-4}>
            Aa
          </text>
          {/* Type stack */}
          <text x={M + 200} y={1100} fill={C.navy}
            fontFamily={FONT} fontSize={20} fontWeight={850} letterSpacing={-0.5}>
            850 — Display
          </text>
          <text x={M + 200} y={1130} fill={C.navy}
            fontFamily={FONT} fontSize={16} fontWeight={700} letterSpacing={-0.3}>
            700 — Bold
          </text>
          <text x={M + 200} y={1156} fill={C.navy}
            fontFamily={FONT} fontSize={14} fontWeight={500}>
            500 — Body
          </text>
          <text x={M + 200} y={1180} fill={C.gray}
            fontFamily={FONT_MONO} fontSize={11} fontWeight={700} letterSpacing={2}>
            MONO — Tech
          </text>
          {/* Baseline grid hint */}
          {[1108, 1140, 1166].map((y, i) => (
            <line key={i} x1={M + 196} y1={y} x2={M + 440} y2={y}
              stroke={C.cyan} strokeWidth={0.4} strokeDasharray="2 3" opacity={0.5} />
          ))}
          {/* Dimensions */}
          <text x={M + 22} y={1240} fill={C.gray}
            fontFamily={FONT_MONO} fontSize={9} fontWeight={700} letterSpacing={1.5}>
            x-height · 0.52em
          </text>
          <text x={M + 22} y={1260} fill={C.gray}
            fontFamily={FONT_MONO} fontSize={9} fontWeight={700} letterSpacing={1.5}>
            tracking · -2.5 to +2.5
          </text>
        </g>
      )}

      {/* ─── Color palette (right top) ──────────────────────────────────── */}
      {color > 0 && (
        <g opacity={color}>
          <DetailBubble x={M + 480} y={1040} letter="B" theme="light" />
          <text x={M + 504} y={1044} fill={C.gray}
            fontFamily={FONT_MONO} fontSize={10} fontWeight={800} letterSpacing={2}>
            B / PALETTE · 5 TOKENS
          </text>
          {PALETTE.map((c, i) => {
            const cx = M + 480 + (i % 5) * 84;
            const cy = 1080;
            return (
              <g key={i}>
                <rect x={cx} y={cy} width={72} height={88}
                  fill={c.fill}
                  stroke={c.name === 'WHITE' ? C.navy : 'transparent'}
                  strokeWidth={c.name === 'WHITE' ? 1 : 0} />
                <text x={cx + 6} y={cy + 14}
                  fill={['NAVY', 'BLUE'].includes(c.name) ? '#fff' : C.navy}
                  fontFamily={FONT_MONO} fontSize={8} fontWeight={800} letterSpacing={1.5}>
                  {c.name}
                </text>
                <text x={cx + 6} y={cy + 82}
                  fill={['NAVY', 'BLUE'].includes(c.name) ? 'rgba(255,255,255,0.7)' : C.gray}
                  fontFamily={FONT_MONO} fontSize={7} fontWeight={700} letterSpacing={0.5}>
                  {c.hex}
                </text>
                <text x={cx + 36} y={cy + 102} fill={C.gray}
                  fontFamily={FONT_MONO} fontSize={8} fontWeight={700}
                  textAnchor="middle" letterSpacing={1.5}>
                  {c.role}
                </text>
              </g>
            );
          })}
          {/* Token bracket */}
          <line x1={M + 480} y1={1196} x2={M + 480 + 5 * 84 - 12} y2={1196}
            stroke={C.gray} strokeWidth={0.6} />
        </g>
      )}

      {/* ─── Button states (left middle) ─────────────────────────────────── */}
      {button > 0 && (
        <g opacity={button}>
          <DetailBubble x={M + 16} y={1330} letter="C" theme="light" />
          <text x={M + 40} y={1334} fill={C.gray}
            fontFamily={FONT_MONO} fontSize={10} fontWeight={800} letterSpacing={2}>
            C / BUTTON · STATES
          </text>
          {[
            { fill: C.blue, color: '#fff', label: 'PRIMARIO',     stroke: 'none' },
            { fill: '#fff', color: C.navy, label: 'SECUNDARIO',   stroke: C.navy },
            { fill: 'rgba(7,29,53,0.04)', color: C.gray, label: 'DESACTIVADO', stroke: C.gray, dashed: true },
          ].map((b, i) => (
            <g key={i}>
              <rect x={M} y={1350 + i * 64} width={220} height={50}
                rx={8} fill={b.fill}
                stroke={b.stroke === 'none' ? 'transparent' : b.stroke}
                strokeWidth={1.5}
                strokeDasharray={b.dashed ? '4 3' : undefined} />
              <text x={M + 110} y={1382 + i * 64} fill={b.color}
                fontFamily={FONT} fontSize={13} fontWeight={700}
                textAnchor="middle" letterSpacing={1.5}>
                {b.label}
              </text>
              <text x={M + 232} y={1382 + i * 64} fill={C.gray}
                fontFamily={FONT_MONO} fontSize={9} fontWeight={700} letterSpacing={1.5}>
                STATE 0{i + 1}
              </text>
            </g>
          ))}
        </g>
      )}

      {/* ─── Spacing scale (right middle) ────────────────────────────────── */}
      {spacing > 0 && (
        <g opacity={spacing}>
          <DetailBubble x={M + 480} y={1330} letter="D" theme="light" />
          <text x={M + 504} y={1334} fill={C.gray}
            fontFamily={FONT_MONO} fontSize={10} fontWeight={800} letterSpacing={2}>
            D / SPACING · 8PT GRID
          </text>
          {[4, 8, 16, 24, 32, 48].map((sp, i) => (
            <g key={i}>
              <rect x={M + 480 + i * 72} y={1390 + (48 - sp)}
                width={48} height={sp}
                fill={C.blue} opacity={lerp(0.20, 0.7, i / 5)} />
              {/* dim label */}
              <text x={M + 480 + i * 72 + 24} y={1456}
                fill={C.gray} fontFamily={FONT_MONO} fontSize={10} fontWeight={700}
                textAnchor="middle" letterSpacing={1}>
                {sp}
              </text>
              <text x={M + 480 + i * 72 + 24} y={1470}
                fill={C.gray} fontFamily={FONT_MONO} fontSize={8} fontWeight={600}
                textAnchor="middle" letterSpacing={1}>
                px
              </text>
            </g>
          ))}
          {/* Scale baseline */}
          <line x1={M + 480} y1={1438} x2={M + 480 + 6 * 72 - 24} y2={1438}
            stroke={C.gray} strokeWidth={0.5} strokeDasharray="3 3" />
        </g>
      )}

      {tokens > 0 && (
        <g opacity={tokens}>
          {/* Large modular blocks — menos micro-detalle */}
          {[0, 1].map((col) => (
            <g key={col}>
              <rect
                x={M + col * 440}
                y={1490}
                width={400}
                height={120}
                rx={18}
                fill="#FFFFFF"
                stroke={C.navy}
                strokeWidth={1.2}
              />
              <rect x={M + col * 440 + 22} y={1516} width={160} height={14} rx={6} fill="rgba(7,29,53,0.12)" />
              <rect x={M + col * 440 + 22} y={1542} width={240} height={10} rx={5} fill="rgba(7,29,53,0.08)" />
              <rect x={M + col * 440 + 22} y={1566} width={120} height={10} rx={5} fill="rgba(7,29,53,0.08)" />
              <rect x={M + col * 440 + 300} y={1556} width={72} height={36} rx={18} fill={C.blue} opacity={0.92} />
            </g>
          ))}
        </g>
      )}


    </SheetChrome>
  );
}

