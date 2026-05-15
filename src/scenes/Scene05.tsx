// Scene 5 — Offer Structure (10.5–13s, dark)
// "Ordenamos la oferta."
// Content hierarchy diagram — Propuesta → Servicios/Diferenciales/Prueba → CTA.

import { C, FONT, VIDEO_WIDTH, T } from '../constants';
import { BlueprintGrid, TechLabel, CornerBrackets, SceneBg, seg } from './shared';

const M = T.m;
const CX = VIDEO_WIDTH / 2;

const LEVELS = [
  {
    y: 1050, h: 90, w: 820,
    label: 'Propuesta de valor',
    sub: 'Por qué nosotros · qué hacemos · para quién',
    level: 1,
  },
  {
    y: 1178, h: 80, w: 580,
    label: 'Servicios',
    sub: 'Qué incluye · alcance · entregables',
    level: 2,
  },
  {
    y: 1178, h: 80, w: 200,
    label: 'Proof',
    sub: 'Casos',
    level: 2,
    xOffset: 320,
  },
  {
    y: 1296, h: 80, w: 400,
    label: 'Diferenciales',
    sub: 'Cómo lo hacemos diferente',
    level: 3,
  },
  {
    y: 1424, h: 56, w: 280,
    label: 'AGENDÁ UN BRIEF →',
    sub: '',
    level: 4,
    cta: true,
  },
] as const;

export default function Scene05({ p }: { p: number }) {
  const grid  = seg(p, 0,    0.15);
  const eye   = seg(p, 0.05, 0.22);
  const hl1   = seg(p, 0.10, 0.32);
  const hl2   = seg(p, 0.22, 0.42);
  const l1    = seg(p, 0.30, 0.52);
  const l2    = seg(p, 0.42, 0.62);
  const l3    = seg(p, 0.54, 0.72);
  const cta   = seg(p, 0.66, 0.82);
  const annot = seg(p, 0.76, 0.95);

  const opacities = [l1, l2, l2, l3, cta];

  return (
    <g>
      <SceneBg theme="dark" />
      <g opacity={grid}><BlueprintGrid theme="dark" /></g>

      <TechLabel x={M} y={160} theme="dark" opacity={eye}>MESSAGE HIERARCHY / CONTENT ARCHITECTURE</TechLabel>
      <line x1={M} y1={172} x2={VIDEO_WIDTH - M} y2={172}
        stroke="rgba(255,255,255,0.07)" strokeWidth={1} />

      <text x={M} y={360} fill={C.white} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl1}>
        Ordenamos
      </text>
      <text x={M} y={360 + T.type.headline * 1.08} fill={C.white} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl2}>
        la oferta.
      </text>
      <text x={M} y={360 + T.type.headline * 2.1} fill={C.gray} fontFamily={FONT}
        fontSize={T.type.sub} fontWeight={500}
        opacity={hl2}>
        Todo en el lugar correcto.
      </text>

      {/* Hierarchy lines */}
      <g opacity={l2 * 0.5}>
        <line x1={CX} y1={1050 + 90} x2={CX} y2={1178}
          stroke="rgba(255,255,255,0.15)" strokeWidth={1.2} strokeDasharray="4 3" />
        <line x1={CX} y1={1178 + 80} x2={CX} y2={1296}
          stroke="rgba(255,255,255,0.12)" strokeWidth={1.2} strokeDasharray="4 3" />
        <line x1={CX} y1={1296 + 80} x2={CX} y2={1424}
          stroke="rgba(255,255,255,0.10)" strokeWidth={1.2} strokeDasharray="4 3" />
      </g>

      {/* Hierarchy blocks */}
      {LEVELS.map((lv, i) => {
        const bx = lv.level === 2 && 'xOffset' in lv
          ? CX + (lv.xOffset ?? 0)
          : CX - lv.w / 2;
        const isCta = 'cta' in lv && lv.cta;

        return (
          <g key={i} opacity={opacities[i]}>
            <rect x={bx} y={lv.y} width={lv.w} height={lv.h}
              rx={isCta ? T.r.pill : T.r.md}
              fill={isCta ? C.blue : 'rgba(255,255,255,0.04)'}
              stroke={isCta ? 'none' : 'rgba(255,255,255,0.10)'}
              strokeWidth={1.2} />
            {!isCta && (
              <CornerBrackets x={bx} y={lv.y} w={lv.w} h={lv.h}
                size={12} color={C.gray} opacity={0.2} />
            )}
            <text x={bx + lv.w / 2} y={lv.y + lv.h / 2 - 6}
              fill={isCta ? C.white : 'rgba(255,255,255,0.88)'}
              fontFamily={FONT}
              fontSize={isCta ? 16 : 18}
              fontWeight={isCta ? 700 : 700}
              textAnchor="middle"
              dominantBaseline="middle"
              letterSpacing={isCta ? 2 : 0}>
              {lv.label}
            </text>
            {lv.sub && (
              <text x={bx + lv.w / 2} y={lv.y + lv.h / 2 + 14}
                fill={C.gray} fontFamily={FONT} fontSize={11} fontWeight={500}
                textAnchor="middle" letterSpacing={0.3} opacity={0.7}>
                {lv.sub}
              </text>
            )}
          </g>
        );
      })}

      {/* Content weight markers on left */}
      <g opacity={annot}>
        {[1050, 1178, 1296, 1424].map((y, i) => (
          <g key={i}>
            <line x1={M - 20} y1={y} x2={M - 20 + (4 - i) * 12} y2={y}
              stroke={C.gray} strokeWidth={2} opacity={0.3} strokeLinecap="round" />
          </g>
        ))}
        <TechLabel x={M} y={1840} theme="dark">MESSAGE HIERARCHY · CONTENT STRATEGY</TechLabel>
        <TechLabel x={VIDEO_WIDTH - M} y={1840} theme="dark" anchor="end">ORDENADO PARA CONVERTIR</TechLabel>
      </g>
    </g>
  );
}
