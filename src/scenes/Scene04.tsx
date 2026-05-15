// Scene 4 — Discovery (8–10.5s, light)
// "Entendemos el negocio."
// 4-block discovery map with blueprint annotations.

import { C, FONT, VIDEO_WIDTH, T } from '../constants';
import { BlueprintGrid, TechLabel, CornerBrackets, BlueDot, SceneBg, seg, lerp } from './shared';

const M = T.m;
const GAP = 18;
const W = (VIDEO_WIDTH - M * 2 - GAP) / 2;   // block width  ~441
const H = 230;

const BLOCKS = [
  { col: 0, row: 0, label: 'Negocio',  sub: 'objetivos · métricas · contexto',  note: '01' },
  { col: 1, row: 0, label: 'Cliente',  sub: 'perfil · necesidades · objeciones', note: '02' },
  { col: 0, row: 1, label: 'Oferta',   sub: 'servicios · diferenciales · precio', note: '03' },
  { col: 1, row: 1, label: 'Objetivo', sub: 'conversión · CTA · next step',       note: '04' },
] as const;

const BX = (col: number) => M + col * (W + GAP);
const BY = (row: number) => 1060 + row * (H + GAP);

export default function Scene04({ p }: { p: number }) {
  const grid   = seg(p, 0,    0.15);
  const eye    = seg(p, 0.05, 0.22);
  const title  = seg(p, 0.10, 0.32);
  const sub    = seg(p, 0.22, 0.42);
  const blocks = seg(p, 0.32, 0.60);
  const dot    = seg(p, 0.55, 0.80);
  const annot  = seg(p, 0.65, 0.90);

  // Dot pulses at center of the 4 blocks
  const cx = M + W + GAP / 2;
  const cy = BY(0) + H + GAP / 2;

  return (
    <g>
      <SceneBg theme="light" />
      <g opacity={grid}><BlueprintGrid theme="light" /></g>

      <TechLabel x={M} y={160} opacity={eye}>DISCOVERY MAP · REV.A</TechLabel>
      <line x1={M} y1={172} x2={VIDEO_WIDTH - M} y2={172}
        stroke="rgba(7,29,53,0.06)" strokeWidth={1} />

      {/* Headline */}
      <text x={M} y={360} fill={C.navy} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={title}>
        Entendemos
      </text>
      <text x={M} y={360 + T.type.headline * 1.08} fill={C.navy} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={sub}>
        el negocio.
      </text>

      <text x={M} y={360 + T.type.headline * 2.1} fill={C.gray} fontFamily={FONT}
        fontSize={T.type.sub} fontWeight={500} opacity={sub}>
        Antes de diseñar, escuchamos.
      </text>

      {/* Connector cross lines from center */}
      <g opacity={lerp(0, 0.25, blocks)}>
        <line x1={cx} y1={BY(0)} x2={cx} y2={BY(1) + H}
          stroke={C.navy} strokeWidth={1} strokeDasharray="5 4" />
        <line x1={M} y1={cy} x2={M + W * 2 + GAP} y2={cy}
          stroke={C.navy} strokeWidth={1} strokeDasharray="5 4" />
      </g>

      {/* 4 Discovery blocks */}
      {BLOCKS.map(({ col, row, label, sub: bsub, note }, i) => (
        <g key={i} opacity={blocks}>
          <rect x={BX(col)} y={BY(row)} width={W} height={H}
            rx={T.r.md} fill={C.white}
            stroke={C.blueprint} strokeWidth={1.5} />
          <CornerBrackets x={BX(col)} y={BY(row)} w={W} h={H}
            size={14} color={C.navy} opacity={0.2} />

          {/* Number marker */}
          <text x={BX(col) + W - 14} y={BY(row) + 22}
            fill={C.blue} fontFamily={FONT} fontSize={11} fontWeight={700}
            textAnchor="end" letterSpacing={2} opacity={0.6}>
            {note}
          </text>

          {/* Label */}
          <text x={BX(col) + 24} y={BY(row) + 80}
            fill={C.navy} fontFamily={FONT} fontSize={28} fontWeight={800}
            letterSpacing={-0.5}>
            {label}
          </text>

          {/* Sub */}
          <text x={BX(col) + 24} y={BY(row) + 110}
            fill={C.gray} fontFamily={FONT} fontSize={13} fontWeight={500}
            letterSpacing={0.3}>
            {bsub}
          </text>

          {/* Thin bottom line */}
          <line x1={BX(col) + 24} y1={BY(row) + H - 28}
            x2={BX(col) + W - 24} y2={BY(row) + H - 28}
            stroke={C.blueprint} strokeWidth={1} />
        </g>
      ))}

      {/* Center dot */}
      <BlueDot x={cx} y={cy} r={6} opacity={dot} glow />

      {/* Side measurement line */}
      <g opacity={annot}>
        <line x1={M - 28} y1={BY(0)} x2={M - 28} y2={BY(1) + H}
          stroke={C.gray} strokeWidth={1} opacity={0.4} />
        <line x1={M - 36} y1={BY(0)} x2={M - 20} y2={BY(0)}
          stroke={C.gray} strokeWidth={1} opacity={0.4} />
        <line x1={M - 36} y1={BY(1) + H} x2={M - 20} y2={BY(1) + H}
          stroke={C.gray} strokeWidth={1} opacity={0.4} />
        <text x={M - 44} y={(BY(0) + BY(1) + H) / 2} fill={C.gray} fontFamily={FONT}
          fontSize={10} fontWeight={600} textAnchor="middle" letterSpacing={2}
          opacity={0.5} transform={`rotate(-90, ${M - 44}, ${(BY(0) + BY(1) + H) / 2})`}>
          DISCOVERY
        </text>
      </g>

      <TechLabel x={M} y={1840} opacity={annot}>DISCOVERY MAP · BUILD HAUS METHOD</TechLabel>
      <TechLabel x={VIDEO_WIDTH - M} y={1840} anchor="end" opacity={annot}>ANTES DE DISEÑAR</TechLabel>
    </g>
  );
}
