// Scene 3 — Problem Hook (6–8s, dark)
// "La mayoría de las webs pierden clientes antes del primer mensaje."
// Broken conversion path: VISITA → DUDA → SILENCIO ✗

import { C, FONT, VIDEO_WIDTH, T } from '../constants';
import { BlueprintGrid, TechLabel, SceneBg, seg, lerp, easeOut } from './shared';

const M = T.m;

const PATH_NODES = [
  { x: 150, y: 1300, label: 'VISITA',   color: 'rgba(255,255,255,0.9)' },
  { x: 540, y: 1300, label: 'DUDA',     color: 'rgba(255,255,255,0.55)' },
  { x: 900, y: 1300, label: 'SILENCIO', color: 'rgba(255,255,255,0.25)' },
];

export default function Scene03({ p }: { p: number }) {
  const grid  = seg(p, 0,    0.15);
  const eye   = seg(p, 0.05, 0.22);
  const hl1   = seg(p, 0.10, 0.30);
  const hl2   = seg(p, 0.22, 0.42);
  const hl3   = seg(p, 0.32, 0.52);
  const path  = seg(p, 0.45, 0.68);
  const broken = seg(p, 0.62, 0.80);
  const annot  = seg(p, 0.72, 0.92);

  // Arrow progress 0→1 along path
  const arrow1 = lerp(0, 1, path);
  const arrow2 = lerp(0, 1, easeOut(Math.max(0, path - 0.4) / 0.6));

  return (
    <g>
      <SceneBg theme="dark" />
      <g opacity={grid}><BlueprintGrid theme="dark" /></g>

      {/* Eyebrow */}
      <TechLabel x={M} y={160} opacity={eye} theme="dark">CONVERSION LEAK / 01</TechLabel>
      <line x1={M} y1={172} x2={VIDEO_WIDTH - M} y2={172}
        stroke="rgba(255,255,255,0.07)" strokeWidth={1} />

      {/* Headline */}
      <text x={M} y={360} fill={C.white} fontFamily={FONT}
        fontSize={T.type.headline * 0.88} fontWeight={850} letterSpacing={-1.5}
        opacity={hl1}>
        La mayoría de
      </text>
      <text x={M} y={360 + T.type.headline * 0.88 * 1.1} fill={C.white} fontFamily={FONT}
        fontSize={T.type.headline * 0.88} fontWeight={850} letterSpacing={-1.5}
        opacity={hl1}>
        las webs
      </text>

      {/* "pierden clientes" in blue */}
      <text x={M} y={360 + T.type.headline * 0.88 * 2.2} fill={C.blue} fontFamily={FONT}
        fontSize={T.type.headline * 0.88} fontWeight={850} letterSpacing={-1.5}
        opacity={hl2}>
        pierden clientes
      </text>

      <text x={M} y={360 + T.type.headline * 0.88 * 3.3} fill="rgba(255,255,255,0.7)"
        fontFamily={FONT} fontSize={T.type.sub} fontWeight={600} letterSpacing={-0.3}
        opacity={hl3}>
        antes del primer mensaje.
      </text>

      {/* Path nodes */}
      {PATH_NODES.map((n, i) => (
        <g key={i} opacity={path}>
          <circle cx={n.x} cy={n.y} r={38}
            fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth={1.2} />
          <text x={n.x} y={n.y} fill={n.color} fontFamily={FONT}
            fontSize={13} fontWeight={700} textAnchor="middle"
            dominantBaseline="middle" letterSpacing={2}>
            {n.label}
          </text>
        </g>
      ))}

      {/* Path arrows */}
      <g opacity={path}>
        {/* Arrow 1: VISITA → DUDA */}
        <line x1={188} y1={1300} x2={lerp(188, 502, arrow1)} y2={1300}
          stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} />
        {/* Arrow 2: DUDA → SILENCIO (faded, nearly invisible) */}
        <line x1={578} y1={1300} x2={lerp(578, 860, arrow2)} y2={1300}
          stroke="rgba(255,255,255,0.12)" strokeWidth={1.5}
          strokeDasharray="6 5" />
      </g>

      {/* Broken marker at SILENCIO */}
      <g opacity={broken}>
        {/* X mark */}
        <line x1={870} y1={1270} x2={932} y2={1332}
          stroke="rgba(255,90,90,0.7)" strokeWidth={2} strokeLinecap="round" />
        <line x1={932} y1={1270} x2={870} y2={1332}
          stroke="rgba(255,90,90,0.7)" strokeWidth={2} strokeLinecap="round" />

        {/* Phantom path to CONTACTO */}
        <line x1={900} y1={1300} x2={1020} y2={1300}
          stroke="rgba(255,255,255,0.06)" strokeWidth={1}
          strokeDasharray="4 6" />
        <circle cx={1040} cy={1300} r={30}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1}
          strokeDasharray="4 6" />
        <text x={1040} y={1300} fill="rgba(255,255,255,0.1)" fontFamily={FONT}
          fontSize={11} fontWeight={700} textAnchor="middle"
          dominantBaseline="middle" letterSpacing={2}>
          CONTACTO
        </text>
      </g>

      {/* Drop-off annotation */}
      <g opacity={annot}>
        <line x1={900} y1={1350} x2={900} y2={1420}
          stroke="rgba(255,90,90,0.4)" strokeWidth={1}
          strokeDasharray="4 3" />
        <text x={900} y={1445} fill="rgba(255,90,90,0.7)" fontFamily={FONT}
          fontSize={12} fontWeight={700} textAnchor="middle" letterSpacing={2}>
          DROP-OFF
        </text>
      </g>

      {/* Footer annotation */}
      <TechLabel x={M} y={1840} theme="dark" opacity={annot}>
        LA MAYORÍA DE LAS WEBS NO TIENEN UN SISTEMA
      </TechLabel>
      <TechLabel x={VIDEO_WIDTH - M} y={1840} theme="dark" anchor="end" opacity={annot}>
        CONVERSION LEAK / 01
      </TechLabel>
    </g>
  );
}
