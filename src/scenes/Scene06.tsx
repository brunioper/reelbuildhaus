// Scene 6 — User Journey (13–15.5s, light)
// "Diseñamos el recorrido."
// Horizontal journey: LLEGA → ENTIENDE → CONFÍA → CONTACTA with traveling blue dot.

import { C, FONT, VIDEO_WIDTH, T } from '../constants';
import {
  BlueprintGrid, TechLabel, BlueDot, SceneBg,
  seg, lerp, easeOut, clamp,
} from './shared';

const M = T.m;

const STEPS = [
  { label: 'LLEGA',    sub: 'primer impacto',  x: 162  },
  { label: 'ENTIENDE', sub: 'claridad',         x: 378  },
  { label: 'CONFÍA',   sub: 'prueba social',    x: 702  },
  { label: 'CONTACTA', sub: 'acción',           x: 918  },
];

const PATH_Y = 1280;
const NODE_R = 48;

export default function Scene06({ p }: { p: number }) {
  const grid  = seg(p, 0,    0.15);
  const eye   = seg(p, 0.05, 0.22);
  const hl1   = seg(p, 0.10, 0.32);
  const hl2   = seg(p, 0.22, 0.42);
  const nodes = seg(p, 0.32, 0.55);
  const dotP  = clamp((p - 0.45) / 0.50, 0, 1);
  const annot = seg(p, 0.78, 0.95);

  // Dot travels across the 4 nodes
  const totalPath = STEPS[STEPS.length - 1].x - STEPS[0].x;
  const dotX = lerp(STEPS[0].x, STEPS[STEPS.length - 1].x, easeOut(dotP));

  // Each node brightens as the dot passes
  const nodeActive = (nx: number) =>
    clamp((dotX - nx + NODE_R) / (NODE_R * 2), 0, 1);

  return (
    <g>
      <SceneBg theme="light" />
      <g opacity={grid}><BlueprintGrid theme="light" /></g>

      <TechLabel x={M} y={160} opacity={eye}>UX FLOW / USER JOURNEY</TechLabel>
      <line x1={M} y1={172} x2={VIDEO_WIDTH - M} y2={172}
        stroke="rgba(7,29,53,0.06)" strokeWidth={1} />

      <text x={M} y={360} fill={C.navy} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl1}>
        Diseñamos
      </text>
      <text x={M} y={360 + T.type.headline * 1.08} fill={C.navy} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl2}>
        el recorrido.
      </text>
      <text x={M} y={360 + T.type.headline * 2.1} fill={C.gray} fontFamily={FONT}
        fontSize={T.type.sub} fontWeight={500} opacity={hl2}>
        Cada paso con intención.
      </text>

      {/* Path line */}
      <g opacity={nodes}>
        <line x1={STEPS[0].x} y1={PATH_Y} x2={STEPS[STEPS.length - 1].x} y2={PATH_Y}
          stroke={C.blueprint} strokeWidth={2} />
        {/* Vertical guide lines from each node */}
        {STEPS.map((s, i) => (
          <line key={i} x1={s.x} y1={PATH_Y - NODE_R - 20} x2={s.x} y2={PATH_Y - NODE_R}
            stroke="rgba(7,29,53,0.08)" strokeWidth={1} strokeDasharray="3 3" />
        ))}
      </g>

      {/* Nodes */}
      {STEPS.map((s, i) => {
        const active = nodeActive(s.x);
        const isLast = i === STEPS.length - 1;
        return (
          <g key={i} opacity={nodes}>
            {/* Node circle */}
            <circle cx={s.x} cy={PATH_Y} r={NODE_R}
              fill={active > 0.5
                ? (isLast ? C.blue : 'rgba(36,107,255,0.12)')
                : (i === 0 ? 'rgba(7,29,53,0.04)' : C.white)}
              stroke={active > 0.5 ? C.blue : C.blueprint}
              strokeWidth={isLast && active > 0.5 ? 2.5 : 1.5} />

            {/* Label */}
            <text x={s.x} y={PATH_Y} fill={active > 0.5 ? (isLast ? C.white : C.blue) : C.navy}
              fontFamily={FONT} fontSize={12} fontWeight={800}
              textAnchor="middle" dominantBaseline="middle" letterSpacing={1.5}>
              {s.label}
            </text>

            {/* Sub-label below */}
            <text x={s.x} y={PATH_Y + NODE_R + 20}
              fill={C.gray} fontFamily={FONT} fontSize={13} fontWeight={500}
              textAnchor="middle" letterSpacing={0.5}>
              {s.sub}
            </text>

            {/* Connector arrow between nodes */}
            {i < STEPS.length - 1 && (
              <g opacity={0.3}>
                <line x1={s.x + NODE_R + 6} y1={PATH_Y}
                  x2={STEPS[i + 1].x - NODE_R - 6} y2={PATH_Y}
                  stroke={C.navy} strokeWidth={1} />
                <polygon
                  points={`${STEPS[i + 1].x - NODE_R - 3},${PATH_Y - 5} ${STEPS[i + 1].x - NODE_R - 3},${PATH_Y + 5} ${STEPS[i + 1].x - NODE_R + 4},${PATH_Y}`}
                  fill={C.navy} />
              </g>
            )}

            {/* "LEAD GENERATED" on last node */}
            {isLast && active > 0.7 && (
              <text x={s.x} y={PATH_Y - NODE_R - 18}
                fill={C.blue} fontFamily={FONT} fontSize={11} fontWeight={700}
                textAnchor="middle" letterSpacing={2} opacity={active}>
                LEAD GENERATED
              </text>
            )}
          </g>
        );
      })}

      {/* Traveling blue dot */}
      {dotP > 0 && (
        <BlueDot x={dotX} y={PATH_Y} r={8}
          opacity={clamp(dotP * 5, 0, 1)} glow />
      )}

      {/* Measurement between first and last node */}
      <g opacity={annot * 0.5}>
        <line x1={STEPS[0].x} y1={PATH_Y + 100} x2={STEPS[3].x} y2={PATH_Y + 100}
          stroke={C.gray} strokeWidth={0.8} strokeDasharray="4 3" />
        <line x1={STEPS[0].x} y1={PATH_Y + 92} x2={STEPS[0].x} y2={PATH_Y + 108}
          stroke={C.gray} strokeWidth={1} />
        <line x1={STEPS[3].x} y1={PATH_Y + 92} x2={STEPS[3].x} y2={PATH_Y + 108}
          stroke={C.gray} strokeWidth={1} />
        <text x={(STEPS[0].x + STEPS[3].x) / 2} y={PATH_Y + 92}
          fill={C.gray} fontFamily={FONT} fontSize={11} fontWeight={600}
          textAnchor="middle" letterSpacing={2} opacity={0.6}>
          FULL JOURNEY
        </text>
      </g>

      <TechLabel x={M} y={1840} opacity={annot}>UX FLOW · DISEÑADO PARA CONDUCIR</TechLabel>
      <TechLabel x={VIDEO_WIDTH - M} y={1840} anchor="end" opacity={annot}>CONTACTA = CONVERSIÓN</TechLabel>
    </g>
  );
}
