// Scene 8 — Design System (18–20.5s, light)
// "Un sistema visual consistente."
// Typography, color chips, button states, component board.

import { C, FONT, VIDEO_WIDTH, T } from '../constants';
import { BlueprintGrid, TechLabel, CornerBrackets, SceneBg, seg } from './shared';

const M = T.m;

export default function Scene08({ p }: { p: number }) {
  const grid  = seg(p, 0,    0.15);
  const eye   = seg(p, 0.05, 0.22);
  const hl1   = seg(p, 0.10, 0.32);
  const hl2   = seg(p, 0.22, 0.42);
  const type  = seg(p, 0.32, 0.52);
  const color = seg(p, 0.44, 0.62);
  const comp  = seg(p, 0.55, 0.74);
  const grid2 = seg(p, 0.66, 0.84);
  const annot = seg(p, 0.76, 0.95);

  const PALETTE = [
    { name: 'NAVY',  hex: C.navy,      fill: C.navy      },
    { name: 'BLUE',  hex: '#246BFF',   fill: C.blue      },
    { name: 'GRAY',  hex: '#7C90A8',   fill: C.gray      },
    { name: 'WHITE', hex: C.white,     fill: C.blueprint },
  ];

  const BX = M;
  const BY = 1040;

  return (
    <g>
      <SceneBg theme="light" />
      <g opacity={grid}><BlueprintGrid theme="light" /></g>

      <TechLabel x={M} y={160} opacity={eye}>VISUAL SYSTEM / REV.A</TechLabel>
      <line x1={M} y1={172} x2={VIDEO_WIDTH - M} y2={172}
        stroke="rgba(7,29,53,0.06)" strokeWidth={1} />

      <text x={M} y={360} fill={C.navy} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl1}>
        Un sistema visual
      </text>
      <text x={M} y={360 + T.type.headline * 1.08} fill={C.navy} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl2}>
        consistente.
      </text>
      <text x={M} y={360 + T.type.headline * 2.1} fill={C.gray} fontFamily={FONT}
        fontSize={T.type.sub} fontWeight={500} opacity={hl2}>
        Todo coordinado. Nada al azar.
      </text>

      {/* ── Typography specimen ── */}
      <g opacity={type}>
        <rect x={BX} y={BY} width={420} height={180}
          rx={T.r.md} fill="rgba(7,29,53,0.03)" stroke={C.blueprint} strokeWidth={1.2} />
        <CornerBrackets x={BX} y={BY} w={420} h={180} size={12} color={C.navy} opacity={0.2} />
        <TechLabel x={BX + 20} y={BY + 24}>TIPOGRAFÍA</TechLabel>
        <text x={BX + 20} y={BY + 95} fill={C.navy} fontFamily={FONT}
          fontSize={72} fontWeight={850} letterSpacing={-3}>
          Aa
        </text>
        <text x={BX + 20} y={BY + 140} fill={C.gray} fontFamily={FONT}
          fontSize={13} fontWeight={500} letterSpacing={1}>
          Inter · 400 500 600 700 850
        </text>
        <text x={BX + 20} y={BY + 160} fill={C.gray} fontFamily={FONT}
          fontSize={11} fontWeight={500} letterSpacing={1}>
          DISEÑO · CÓDIGO · CONVERSIÓN
        </text>
      </g>

      {/* ── Color chips ── */}
      <g opacity={color}>
        <TechLabel x={BX} y={BY + 204}>COLOR PALETTE</TechLabel>
        {PALETTE.map(({ name, hex, fill }, i) => (
          <g key={i}>
            <rect x={BX + i * 120} y={BY + 220} width={100} height={60}
              rx={T.r.sm} fill={fill}
              stroke={name === 'WHITE' ? C.blueprint : 'transparent'} strokeWidth={1} />
            <text x={BX + i * 120 + 10} y={BY + 300}
              fill={C.gray} fontFamily={FONT} fontSize={10} fontWeight={700}
              letterSpacing={1.5}>
              {name}
            </text>
            <text x={BX + i * 120 + 10} y={BY + 316}
              fill={C.gray} fontFamily={FONT} fontSize={10} fontWeight={400}
              letterSpacing={0.5} opacity={0.7}>
              {hex}
            </text>
          </g>
        ))}
      </g>

      {/* ── Button states ── */}
      <g opacity={comp}>
        <TechLabel x={BX + 440} y={BY + 24}>BUTTON STATES</TechLabel>
        {/* Primary */}
        <rect x={BX + 440} y={BY + 40} width={200} height={50}
          rx={T.r.sm} fill={C.blue} />
        <text x={BX + 540} y={BY + 72} fill={C.white} fontFamily={FONT}
          fontSize={14} fontWeight={700} textAnchor="middle" letterSpacing={1.5}>
          PRIMARIO
        </text>
        {/* Secondary */}
        <rect x={BX + 440} y={BY + 102} width={200} height={50}
          rx={T.r.sm} fill="transparent"
          stroke={C.navy} strokeWidth={1.5} />
        <text x={BX + 540} y={BY + 134} fill={C.navy} fontFamily={FONT}
          fontSize={14} fontWeight={700} textAnchor="middle" letterSpacing={1.5}>
          SECUNDARIO
        </text>
        {/* Disabled */}
        <rect x={BX + 440} y={BY + 164} width={200} height={50}
          rx={T.r.sm} fill="rgba(7,29,53,0.04)"
          stroke={C.blueprint} strokeWidth={1.2} />
        <text x={BX + 540} y={BY + 196} fill={C.gray} fontFamily={FONT}
          fontSize={14} fontWeight={700} textAnchor="middle" letterSpacing={1.5}
          opacity={0.5}>
          DESACTIVADO
        </text>
      </g>

      {/* ── Component Card ── */}
      <g opacity={comp}>
        <TechLabel x={BX} y={BY + 348}>CARD COMPONENT</TechLabel>
        <rect x={BX} y={BY + 364} width={380} height={180}
          rx={T.r.md} fill={C.white}
          stroke={C.blueprint} strokeWidth={1.5} />
        <CornerBrackets x={BX} y={BY + 364} w={380} h={180}
          size={12} color={C.navy} opacity={0.2} />
        <circle cx={BX + 30} cy={BY + 398} r={18}
          fill={C.blue} opacity={0.12} stroke={C.blue} strokeWidth={1} />
        <text x={BX + 30} y={BY + 403} fill={C.blue} fontFamily={FONT}
          fontSize={12} fontWeight={700} textAnchor="middle" dominantBaseline="middle">
          01
        </text>
        <text x={BX + 64} y={BY + 398} fill={C.navy} fontFamily={FONT}
          fontSize={16} fontWeight={800} dominantBaseline="middle" letterSpacing={-0.3}>
          Título del componente
        </text>
        <rect x={BX + 20} y={BY + 424} width={200} height={10}
          rx={2} fill={C.blueprint} />
        <rect x={BX + 20} y={BY + 440} width={160} height={10}
          rx={2} fill={C.blueprint} opacity={0.7} />
        <rect x={BX + 20} y={BY + 456} width={120} height={10}
          rx={2} fill={C.blueprint} opacity={0.5} />
        <rect x={BX + 20} y={BY + 498} width={120} height={36}
          rx={T.r.sm} fill={C.blue} opacity={0.85} />
        <text x={BX + 80} y={BY + 521} fill={C.white} fontFamily={FONT}
          fontSize={11} fontWeight={700} textAnchor="middle" letterSpacing={1.5}>
          VER MÁS →
        </text>
      </g>

      {/* ── Spacing scale ── */}
      <g opacity={grid2}>
        <TechLabel x={BX + 440} y={BY + 264}>SPACING</TechLabel>
        {[4, 8, 16, 24, 32, 48].map((sp, i) => (
          <g key={i}>
            <rect x={BX + 440 + i * 64} y={BY + 280 + (48 - sp)}
              width={48} height={sp}
              rx={2} fill={C.blue} opacity={lerp(0.15, 0.6, i / 5)} />
            <text x={BX + 464 + i * 64} y={BY + 344}
              fill={C.gray} fontFamily={FONT} fontSize={10} fontWeight={600}
              textAnchor="middle" letterSpacing={0.5}>
              {sp}
            </text>
          </g>
        ))}
      </g>

      <TechLabel x={M} y={1840} opacity={annot}>VISUAL SYSTEM · DESIGN TOKENS · REV.A</TechLabel>
      <TechLabel x={VIDEO_WIDTH - M} y={1840} anchor="end" opacity={annot}>INTER · NAVY · BLUE</TechLabel>
    </g>
  );
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
