// Scene 2 — System Proof (4–6s, light)
// "No usamos plantillas. Construimos sistemas."
// Three premium interconnected nodes — Diseño, Código, Conversión.

import { C, FONT, VIDEO_WIDTH, T } from '../constants';
import {
  BlueprintGrid, TechLabel, CornerBrackets, BlueDot, SceneBg,
  seg, lerp, easeOut, clamp,
} from './shared';

const M = T.m;
const NODES: Array<{ x: number; y: number; label: string; sub: string }> = [
  { x: 216,  y: 1100, label: 'Diseño',     sub: 'VISUAL SYSTEM' },
  { x: 864,  y: 1100, label: 'Código',     sub: 'CUSTOM BUILD'  },
  { x: 540,  y: 1280, label: 'Conversión', sub: 'UX FLOW'       },
];

export default function Scene02({ p }: { p: number }) {
  const grid  = seg(p, 0,    0.15);
  const title = seg(p, 0.05, 0.28);
  const sub   = seg(p, 0.18, 0.38);
  const nodes = seg(p, 0.28, 0.55);
  const lines = seg(p, 0.40, 0.65);
  const dotP  = clamp((p - 0.55) / 0.40, 0, 1);
  const label = seg(p, 0.60, 0.85);

  // Dot travels: node0 → node1 → node2 → back to node0
  const dotSegment = dotP * 3;
  const seg0 = clamp(dotSegment, 0, 1);
  const seg1 = clamp(dotSegment - 1, 0, 1);
  const seg2 = clamp(dotSegment - 2, 0, 1);
  const [nx0, ny0] = [NODES[0].x, NODES[0].y];
  const [nx1, ny1] = [NODES[1].x, NODES[1].y];
  const [nx2, ny2] = [NODES[2].x, NODES[2].y];

  let dotX: number, dotY: number;
  if (dotSegment <= 1) {
    dotX = lerp(nx0, nx1, easeOut(seg0));
    dotY = lerp(ny0, ny1, easeOut(seg0));
  } else if (dotSegment <= 2) {
    dotX = lerp(nx1, nx2, easeOut(seg1));
    dotY = lerp(ny1, ny2, easeOut(seg1));
  } else {
    dotX = lerp(nx2, nx0, easeOut(seg2));
    dotY = lerp(ny2, ny0, easeOut(seg2));
  }

  const NODE_W = 240;
  const NODE_H = 110;

  return (
    <g>
      <SceneBg theme="light" />
      <g opacity={grid}><BlueprintGrid theme="light" /></g>

      {/* Eyebrow */}
      <TechLabel x={M} y={160} opacity={title}>CUSTOM SYSTEM / NO TEMPLATE</TechLabel>
      <line x1={M} y1={172} x2={VIDEO_WIDTH - M} y2={172}
        stroke="rgba(7,29,53,0.06)" strokeWidth={1} />

      {/* Headline */}
      <text x={M} y={340} fill={C.navy} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={title}>
        No usamos
      </text>
      <text x={M} y={340 + T.type.headline * 1.08} fill={C.navy} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={sub}>
        plantillas.
      </text>
      <text x={M} y={340 + T.type.headline * 2.16} fill={C.blue} fontFamily={FONT}
        fontSize={56} fontWeight={700} letterSpacing={-1}
        opacity={sub}>
        Construimos sistemas.
      </text>

      {/* Connection lines between nodes */}
      <g opacity={lines}>
        {[
          [nx0, ny0, nx1, ny1],
          [nx1, ny1, nx2, ny2],
          [nx2, ny2, nx0, ny0],
        ].map(([x1, y1, x2, y2], i) => (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={C.blueprint} strokeWidth={1.5}
              strokeDasharray="6 4" />
            {/* Midpoint anchor dot */}
            <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2}
              r={3} fill={C.blue} opacity={0.4} />
          </g>
        ))}
      </g>

      {/* Nodes */}
      {NODES.map((n, i) => (
        <g key={i} opacity={nodes}>
          <rect x={n.x - NODE_W / 2} y={n.y - NODE_H / 2}
            width={NODE_W} height={NODE_H}
            rx={T.r.md}
            fill={C.white}
            stroke={C.blueprint}
            strokeWidth={1.5} />
          <CornerBrackets
            x={n.x - NODE_W / 2} y={n.y - NODE_H / 2}
            w={NODE_W} h={NODE_H}
            size={14} color={C.navy} opacity={0.2} />
          <text x={n.x} y={n.y - 8} fill={C.navy} fontFamily={FONT}
            fontSize={24} fontWeight={800} textAnchor="middle" letterSpacing={-0.5}>
            {n.label}
          </text>
          <text x={n.x} y={n.y + 16} fill={C.gray} fontFamily={FONT}
            fontSize={12} fontWeight={700} textAnchor="middle" letterSpacing={2.5}>
            {n.sub}
          </text>
        </g>
      ))}

      {/* Center origin dot */}
      <g opacity={nodes}>
        <circle cx={540} cy={1110} r={4} fill={C.blue} opacity={0.3} />
      </g>

      {/* Traveling blue dot */}
      {dotP > 0 && <BlueDot x={dotX} y={dotY} r={7} opacity={easeOut(clamp(dotP * 5, 0, 1))} />}

      {/* Measurement / annotation */}
      <g opacity={label}>
        <line x1={M} y1={1430} x2={VIDEO_WIDTH - M} y2={1430}
          stroke="rgba(7,29,53,0.08)" strokeWidth={1} strokeDasharray="5 4" />
        <TechLabel x={540} y={1460} anchor="middle">
          SISTEMA DE DISEÑO · ARQUITECTURA CUSTOM
        </TechLabel>
        <TechLabel x={M} y={1840}>CUSTOM SYSTEM / NO TEMPLATE</TechLabel>
        <TechLabel x={VIDEO_WIDTH - M} y={1840} anchor="end">DESIGN · CODE · CONVERSION</TechLabel>
      </g>
    </g>
  );
}
