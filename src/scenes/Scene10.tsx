// Scene 10 — Conversion (23–25.5s, light)
// "Optimizamos para convertir."
// VISITA → CLARIDAD → CONFIANZA → CONTACTO. Blue dot lands, CTA expands.

import { C, FONT, VIDEO_WIDTH, T } from '../constants';
import {
  BlueprintGrid, TechLabel, BlueDot, SceneBg,
  seg, lerp, easeOut, clamp,
} from './shared';

const M = T.m;
const PATH_Y = 1280;
const NODE_R = 52;

const STEPS = [
  { label: 'VISITA',    sub: 'tráfico',   x: 150 },
  { label: 'CLARIDAD',  sub: 'mensaje',   x: 390 },
  { label: 'CONFIANZA', sub: 'prueba',    x: 650 },
  { label: 'CONTACTO',  sub: 'conversión', x: 920 },
];

export default function Scene10({ p }: { p: number }) {
  const grid  = seg(p, 0,    0.15);
  const eye   = seg(p, 0.05, 0.22);
  const hl1   = seg(p, 0.10, 0.32);
  const hl2   = seg(p, 0.22, 0.42);
  const nodes = seg(p, 0.32, 0.55);
  const dotP  = clamp((p - 0.45) / 0.40, 0, 1);
  const ctaEx = seg(p, 0.82, 0.98); // CTA pill expansion
  const annot = seg(p, 0.86, 0.98);

  const dotX = lerp(STEPS[0].x, STEPS[3].x, easeOut(dotP));
  const nodeActive = (nx: number) => clamp((dotX - nx + NODE_R) / (NODE_R * 2), 0, 1);
  const lastActive = nodeActive(STEPS[3].x);

  // CTA pill expands outward from CONTACTO node
  const ctaW = lerp(NODE_R * 2, 320, easeOut(ctaEx));
  const ctaH = lerp(NODE_R * 2, 64, easeOut(ctaEx));
  const ctaX = STEPS[3].x - ctaW / 2;
  const ctaY = PATH_Y - ctaH / 2;

  return (
    <g>
      <SceneBg theme="light" />
      <g opacity={grid}><BlueprintGrid theme="light" /></g>

      <TechLabel x={M} y={160} opacity={eye}>CONVERSION PATH / BUSINESS OUTCOME</TechLabel>
      <line x1={M} y1={172} x2={VIDEO_WIDTH - M} y2={172}
        stroke="rgba(7,29,53,0.06)" strokeWidth={1} />

      <text x={M} y={360} fill={C.navy} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl1}>
        Optimizamos
      </text>
      <text x={M} y={360 + T.type.headline * 1.08} fill={C.navy} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl2}>
        para convertir.
      </text>
      <text x={M} y={360 + T.type.headline * 2.1} fill={C.gray} fontFamily={FONT}
        fontSize={T.type.sub} fontWeight={500} opacity={hl2}>
        Diseñado para generar resultados.
      </text>

      {/* Connecting path line */}
      <g opacity={nodes}>
        <line x1={STEPS[0].x} y1={PATH_Y} x2={STEPS[2].x} y2={PATH_Y}
          stroke={C.blueprint} strokeWidth={2.5} />
        {/* Faint line to last node */}
        <line x1={STEPS[2].x} y1={PATH_Y} x2={STEPS[3].x} y2={PATH_Y}
          stroke={C.blueprint} strokeWidth={2.5} opacity={0.4} />
      </g>

      {/* Nodes (all except last) */}
      {STEPS.slice(0, 3).map((s, i) => {
        const active = nodeActive(s.x);
        return (
          <g key={i} opacity={nodes}>
            <circle cx={s.x} cy={PATH_Y} r={NODE_R}
              fill={active > 0.5 ? 'rgba(36,107,255,0.10)' : C.white}
              stroke={active > 0.5 ? C.blue : C.blueprint}
              strokeWidth={active > 0.5 ? 2 : 1.5} />
            <text x={s.x} y={PATH_Y} fill={active > 0.5 ? C.blue : C.navy}
              fontFamily={FONT} fontSize={11} fontWeight={800}
              textAnchor="middle" dominantBaseline="middle" letterSpacing={1.5}>
              {s.label}
            </text>
            <text x={s.x} y={PATH_Y + NODE_R + 18}
              fill={C.gray} fontFamily={FONT} fontSize={12} fontWeight={500}
              textAnchor="middle" letterSpacing={0.5}>
              {s.sub}
            </text>
          </g>
        );
      })}

      {/* Last node — morphs into CTA pill */}
      <g opacity={nodes}>
        {ctaEx < 0.3 ? (
          // Standard node
          <circle cx={STEPS[3].x} cy={PATH_Y} r={lerp(NODE_R, NODE_R * 1.1, lastActive)}
            fill={lastActive > 0.5 ? C.blue : C.white}
            stroke={lastActive > 0.5 ? C.blue : C.blueprint}
            strokeWidth={lastActive > 0.5 ? 2.5 : 1.5} />
        ) : (
          // Expanding CTA pill
          <rect x={ctaX} y={ctaY} width={ctaW} height={ctaH}
            rx={T.r.pill} fill={C.blue} />
        )}

        {ctaEx < 0.5 ? (
          <text x={STEPS[3].x} y={PATH_Y} fill={lastActive > 0.5 ? C.white : C.navy}
            fontFamily={FONT} fontSize={11} fontWeight={800}
            textAnchor="middle" dominantBaseline="middle" letterSpacing={1.5}>
            {STEPS[3].label}
          </text>
        ) : (
          <text x={STEPS[3].x} y={PATH_Y + 5}
            fill={C.white} fontFamily={FONT} fontSize={15} fontWeight={700}
            textAnchor="middle" dominantBaseline="middle" letterSpacing={2}
            opacity={easeOut((ctaEx - 0.5) / 0.5)}>
            AGENDÁ UN BRIEF →
          </text>
        )}

        <text x={STEPS[3].x} y={PATH_Y + NODE_R + 18}
          fill={C.gray} fontFamily={FONT} fontSize={12} fontWeight={500}
          textAnchor="middle" letterSpacing={0.5}>
          {STEPS[3].sub}
        </text>
      </g>

      {/* LEAD GENERATED marker */}
      <g opacity={easeOut(clamp((dotP - 0.85) / 0.15, 0, 1))}>
        <line x1={STEPS[3].x} y1={PATH_Y - NODE_R - 12} x2={STEPS[3].x} y2={PATH_Y - NODE_R - 40}
          stroke={C.blue} strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
        <text x={STEPS[3].x} y={PATH_Y - NODE_R - 48}
          fill={C.blue} fontFamily={FONT} fontSize={12} fontWeight={700}
          textAnchor="middle" letterSpacing={2} opacity={0.8}>
          LEAD GENERATED ↑
        </text>
      </g>

      {/* Blue dot */}
      {dotP > 0 && dotP < 0.98 && (
        <BlueDot x={dotX} y={PATH_Y} r={9}
          opacity={clamp(dotP * 5, 0, 1)} glow />
      )}

      <TechLabel x={M} y={1840} opacity={annot}>CONVERSION PATH · RESULTADO MEDIBLE</TechLabel>
      <TechLabel x={VIDEO_WIDTH - M} y={1840} anchor="end" opacity={annot}>LEAD GENERATED</TechLabel>
    </g>
  );
}
