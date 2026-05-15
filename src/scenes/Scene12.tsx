// Scene 12 — Final CTA (27–28s, light)
// "¿Construimos tu web?" — clean, memorable final frame.

import { C, FONT, VIDEO_WIDTH, VIDEO_HEIGHT, T } from '../constants';
import { BlueprintGrid, TechLabel, BlueDot, SceneBg, seg } from './shared';

const M = T.m;
const CX = VIDEO_WIDTH / 2;
const CY = VIDEO_HEIGHT / 2;

export default function Scene12({ p }: { p: number }) {
  const grid  = seg(p, 0,    0.20);
  const line1 = seg(p, 0.05, 0.40);
  const hl1   = seg(p, 0.12, 0.50);
  const hl2   = seg(p, 0.22, 0.58);
  const sub   = seg(p, 0.35, 0.68);
  const cta   = seg(p, 0.50, 0.80);
  const meta  = seg(p, 0.65, 0.90);
  const dot   = seg(p, 0.72, 0.95);
  const url   = seg(p, 0.80, 0.98);

  return (
    <g>
      <SceneBg theme="light" />
      <g opacity={grid}><BlueprintGrid theme="light" /></g>

      {/* Top eyebrow */}
      <TechLabel x={M} y={160} opacity={line1}>BUILD HAUS STUDIO / PROPUESTA</TechLabel>
      <line x1={M} y1={172} x2={VIDEO_WIDTH - M} y2={172}
        stroke="rgba(7,29,53,0.06)" strokeWidth={1} />

      {/* Main headline */}
      <text x={CX} y={680} fill={C.navy} fontFamily={FONT}
        fontSize={T.type.headline * 1.05} fontWeight={850} letterSpacing={-3}
        textAnchor="middle" opacity={hl1}>
        ¿Construimos
      </text>
      <text x={CX} y={680 + T.type.headline * 1.05 * 1.08} fill={C.navy} fontFamily={FONT}
        fontSize={T.type.headline * 1.05} fontWeight={850} letterSpacing={-3}
        textAnchor="middle" opacity={hl2}>
        tu web?
      </text>

      {/* Thin accent line under headline */}
      <line x1={CX - 60} y1={680 + T.type.headline * 1.05 * 1.08 + 28}
        x2={CX + 60} y2={680 + T.type.headline * 1.05 * 1.08 + 28}
        stroke={C.blue} strokeWidth={2.5} opacity={sub} strokeLinecap="round" />

      {/* Supporting copy */}
      <text x={CX} y={1010} fill={C.gray} fontFamily={FONT}
        fontSize={22} fontWeight={500} textAnchor="middle" opacity={sub}>
        Diseño y desarrollo web a medida
      </text>
      <text x={CX} y={1042} fill={C.gray} fontFamily={FONT}
        fontSize={22} fontWeight={500} textAnchor="middle" opacity={sub}>
        para marcas que quieren verse mejor,
      </text>
      <text x={CX} y={1074} fill={C.navy} fontFamily={FONT}
        fontSize={22} fontWeight={700} textAnchor="middle" opacity={sub}>
        comunicar claro y convertir más.
      </text>

      {/* CTA button */}
      <g opacity={cta}>
        <rect x={CX - 200} y={1130} width={400} height={70}
          rx={T.r.pill} fill={C.blue} />
        <text x={CX} y={1172} fill={C.white} fontFamily={FONT}
          fontSize={18} fontWeight={700} textAnchor="middle" letterSpacing={2}>
          AGENDÁ UN BRIEF →
        </text>
      </g>

      {/* Blue dot beside CTA */}
      <BlueDot x={CX - 220} y={1165} r={7} opacity={dot} glow />

      {/* Meta callback */}
      <g opacity={meta}>
        <line x1={CX - 120} y1={1240} x2={CX + 120} y2={1240}
          stroke="rgba(7,29,53,0.08)" strokeWidth={1} />
        <text x={CX} y={1278} fill={C.gray} fontFamily={FONT}
          fontSize={14} fontWeight={400} textAnchor="middle" opacity={0.7}>
          Este reel fue generado por una web app.
        </text>
        <text x={CX} y={1300} fill={C.gray} fontFamily={FONT}
          fontSize={14} fontWeight={400} textAnchor="middle" opacity={0.55}>
          Link en la descripción.
        </text>
      </g>

      {/* URL */}
      <g opacity={url}>
        <text x={CX} y={1840} fill={C.navy} fontFamily={FONT}
          fontSize={18} fontWeight={700} textAnchor="middle" letterSpacing={2}>
          buildhaus.studio
        </text>
        <line x1={CX - 80} y1={1848} x2={CX + 80} y2={1848}
          stroke={C.blue} strokeWidth={1.5} opacity={0.5} />
      </g>

      {/* Small blueprint annotations */}
      <g opacity={grid * 0.5}>
        {/* Corner cross-hair marks */}
        {[[M, 300], [VIDEO_WIDTH - M, 300], [M, 1700], [VIDEO_WIDTH - M, 1700]].map(
          ([x, y], i) => (
            <g key={i}>
              <line x1={x - 12} y1={y} x2={x + 12} y2={y}
                stroke={C.gray} strokeWidth={0.8} opacity={0.2} />
              <line x1={x} y1={y - 12} x2={x} y2={y + 12}
                stroke={C.gray} strokeWidth={0.8} opacity={0.2} />
            </g>
          ),
        )}
      </g>

      <TechLabel x={M} y={160} opacity={line1}>BUILD HAUS STUDIO / PROPUESTA</TechLabel>
      <TechLabel x={VIDEO_WIDTH - M} y={160} anchor="end" opacity={line1}>CUSTOM BUILD</TechLabel>
    </g>
  );
}
