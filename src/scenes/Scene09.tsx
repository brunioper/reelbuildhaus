// Scene 9 — Development (20.5–23s, dark)
// "Código limpio. Responsive."
// Desktop + mobile frames side by side, technical labels.

import { C, FONT, VIDEO_WIDTH, T } from '../constants';
import { BlueprintGrid, TechLabel, CornerBrackets, SceneBg, seg } from './shared';

const M = T.m;

export default function Scene09({ p }: { p: number }) {
  const grid    = seg(p, 0,    0.15);
  const eye     = seg(p, 0.05, 0.22);
  const hl1     = seg(p, 0.10, 0.32);
  const hl2     = seg(p, 0.22, 0.42);
  const desktop = seg(p, 0.32, 0.56);
  const mobile  = seg(p, 0.48, 0.68);
  const labels  = seg(p, 0.62, 0.82);
  const perf    = seg(p, 0.72, 0.92);
  const annot   = seg(p, 0.80, 0.97);

  // Desktop frame
  const DX = M, DY = 1000, DW = 560, DH = 360;
  // Mobile frame
  const MX = DX + DW + 40, MY = 1050, MW = 200, MH = 360;

  return (
    <g>
      <SceneBg theme="dark" />
      <g opacity={grid}><BlueprintGrid theme="dark" /></g>

      <TechLabel x={M} y={160} theme="dark" opacity={eye}>CODE · RESPONSIVE · MOBILE-FIRST</TechLabel>
      <line x1={M} y1={172} x2={VIDEO_WIDTH - M} y2={172}
        stroke="rgba(255,255,255,0.07)" strokeWidth={1} />

      <text x={M} y={360} fill={C.white} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl1}>
        Código limpio.
      </text>
      <text x={M} y={360 + T.type.headline * 1.08} fill={C.blue} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl2}>
        Responsive.
      </text>
      <text x={M} y={360 + T.type.headline * 2.1} fill={C.gray} fontFamily={FONT}
        fontSize={T.type.sub} fontWeight={500} opacity={hl2}>
        Funciona en todos los dispositivos.
      </text>

      {/* Desktop frame */}
      <g opacity={desktop}>
        <rect x={DX} y={DY} width={DW} height={DH}
          rx={T.r.md} fill="rgba(247,250,255,0.04)"
          stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
        <CornerBrackets x={DX} y={DY} w={DW} h={DH} size={16} color={C.gray} opacity={0.3} />

        {/* Browser bar */}
        <rect x={DX} y={DY} width={DW} height={36}
          rx={T.r.md} fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
        {[0, 1, 2].map(i => (
          <circle key={i} cx={DX + 14 + i * 14} cy={DY + 18} r={4}
            fill={['rgba(255,95,87,0.5)', 'rgba(254,188,46,0.5)', 'rgba(40,200,64,0.5)'][i]} />
        ))}

        {/* Nav */}
        <rect x={DX + 1} y={DY + 36} width={DW - 2} height={32}
          fill="rgba(7,29,53,0.5)" />
        <text x={DX + 16} y={DY + 58} fill="rgba(255,255,255,0.7)" fontFamily={FONT}
          fontSize={11} fontWeight={800} letterSpacing={2}>
          BUILD HAUS
        </text>
        {['Servicios', 'Trabajo', 'Contacto'].map((t, j) => (
          <text key={j} x={DX + DW - 16 - j * 70} y={DY + 58}
            fill="rgba(255,255,255,0.4)" fontFamily={FONT}
            fontSize={10} textAnchor="end" fontWeight={500}>
            {t}
          </text>
        ))}

        {/* Hero */}
        <rect x={DX + 1} y={DY + 68} width={DW - 2} height={100}
          fill="rgba(36,107,255,0.06)" />
        <rect x={DX + 16} y={DY + 80} width={220} height={14} rx={3}
          fill="rgba(255,255,255,0.2)" />
        <rect x={DX + 16} y={DY + 100} width={160} height={14} rx={3}
          fill="rgba(255,255,255,0.14)" />
        <rect x={DX + 16} y={DY + 126} width={90} height={28} rx={14}
          fill={C.blue} opacity={0.9} />
        <text x={DX + 61} y={DY + 145} fill={C.white} fontFamily={FONT}
          fontSize={9} fontWeight={700} textAnchor="middle" letterSpacing={1.5}>
          BRIEF →
        </text>

        {/* Service cards */}
        {[0, 1, 2].map(j => (
          <g key={j}>
            <rect x={DX + 16 + j * 174} y={DY + 186} width={156} height={80}
              rx={T.r.sm} fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
            <rect x={DX + 28 + j * 174} y={DY + 200} width={70} height={8} rx={2}
              fill="rgba(255,255,255,0.2)" />
            <rect x={DX + 28 + j * 174} y={DY + 214} width={110} height={6} rx={2}
              fill="rgba(255,255,255,0.1)" />
            <rect x={DX + 28 + j * 174} y={DY + 226} width={90} height={6} rx={2}
              fill="rgba(255,255,255,0.08)" />
          </g>
        ))}

        {/* Proof */}
        <rect x={DX + 16} y={DY + 282} width={DW - 32} height={54}
          rx={T.r.sm} fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        <rect x={DX + 30} y={DY + 298} width={140} height={8} rx={2}
          fill="rgba(255,255,255,0.12)" />
        <rect x={DX + 30} y={DY + 312} width={100} height={6} rx={2}
          fill="rgba(255,255,255,0.07)" />

        {/* DESKTOP label */}
        <text x={DX + DW / 2} y={DY + DH + 20}
          fill={C.gray} fontFamily={FONT} fontSize={11} fontWeight={600}
          textAnchor="middle" letterSpacing={2.5} opacity={0.6}>
          DESKTOP
        </text>
      </g>

      {/* Mobile frame */}
      <g opacity={mobile}>
        <rect x={MX} y={MY} width={MW} height={MH}
          rx={T.r.md} fill="rgba(247,250,255,0.04)"
          stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
        <CornerBrackets x={MX} y={MY} w={MW} h={MH} size={12} color={C.gray} opacity={0.3} />

        {/* Status bar */}
        <rect x={MX + 1} y={MY} width={MW - 2} height={20}
          rx={T.r.md} fill="rgba(7,29,53,0.4)" />
        {/* Notch */}
        <rect x={MX + MW / 2 - 20} y={MY} width={40} height={12}
          rx={6} fill="rgba(7,29,53,0.8)" />

        {/* Nav */}
        <rect x={MX + 1} y={MY + 20} width={MW - 2} height={28}
          fill="rgba(7,29,53,0.5)" />
        <text x={MX + 12} y={MY + 39} fill="rgba(255,255,255,0.6)" fontFamily={FONT}
          fontSize={9} fontWeight={800} letterSpacing={2}>
          BH
        </text>
        <rect x={MX + MW - 28} y={MY + 25} width={16} height={2} rx={1}
          fill="rgba(255,255,255,0.4)" />
        <rect x={MX + MW - 28} y={MY + 32} width={16} height={2} rx={1}
          fill="rgba(255,255,255,0.4)" />

        {/* Hero */}
        <rect x={MX + 1} y={MY + 48} width={MW - 2} height={80}
          fill="rgba(36,107,255,0.06)" />
        <rect x={MX + 12} y={MY + 58} width={120} height={10} rx={2}
          fill="rgba(255,255,255,0.2)" />
        <rect x={MX + 12} y={MY + 74} width={90} height={10} rx={2}
          fill="rgba(255,255,255,0.14)" />
        <rect x={MX + 12} y={MY + 96} width={70} height={22} rx={11}
          fill={C.blue} opacity={0.9} />
        <text x={MX + 47} y={MY + 112} fill={C.white} fontFamily={FONT}
          fontSize={7} fontWeight={700} textAnchor="middle" letterSpacing={1}>
          BRIEF →
        </text>

        {/* Cards */}
        {[0, 1].map(j => (
          <g key={j}>
            <rect x={MX + 10} y={MY + 148 + j * 72} width={MW - 20} height={60}
              rx={T.r.sm} fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
            <rect x={MX + 20} y={MY + 160 + j * 72} width={80} height={8} rx={2}
              fill="rgba(255,255,255,0.2)" />
            <rect x={MX + 20} y={MY + 174 + j * 72} width={120} height={6} rx={2}
              fill="rgba(255,255,255,0.1)" />
          </g>
        ))}

        <text x={MX + MW / 2} y={MY + MH + 20}
          fill={C.gray} fontFamily={FONT} fontSize={11} fontWeight={600}
          textAnchor="middle" letterSpacing={2.5} opacity={0.6}>
          MOBILE
        </text>
      </g>

      {/* Connection line between devices */}
      <g opacity={labels * 0.4}>
        <line x1={DX + DW} y1={DY + DH / 2} x2={MX} y2={MY + MH / 2}
          stroke={C.blue} strokeWidth={1} strokeDasharray="5 4" />
        <circle cx={(DX + DW + MX) / 2} cy={(DY + DH / 2 + MY + MH / 2) / 2}
          r={3} fill={C.blue} />
      </g>

      {/* Technical labels */}
      {[
        { text: 'CODE',          y: 980  },
        { text: 'RESPONSIVE',    y: 1020 },
        { text: 'MOBILE-FIRST',  y: 1060 },
        { text: 'PERFORMANCE',   y: 1100 },
      ].map(({ text, y }, i) => (
        <g key={i} opacity={labels}>
          <line x1={VIDEO_WIDTH - M - 10} y1={y} x2={VIDEO_WIDTH - M + 6} y2={y}
            stroke={C.blue} strokeWidth={1.5} opacity={0.5} />
          <text x={VIDEO_WIDTH - M - 14} y={y + 4}
            fill={C.gray} fontFamily={FONT} fontSize={11} fontWeight={700}
            textAnchor="end" letterSpacing={2} opacity={0.7}>
            {text}
          </text>
        </g>
      ))}

      {/* Performance bars */}
      <g opacity={perf}>
        {[
          { label: 'PERF',   w: 92 },
          { label: 'ACCESS', w: 96 },
          { label: 'SEO',    w: 100 },
        ].map(({ label, w }, i) => (
          <g key={i}>
            <text x={M} y={1420 + i * 40} fill={C.gray} fontFamily={FONT}
              fontSize={10} fontWeight={700} letterSpacing={2} opacity={0.6}>
              {label}
            </text>
            <rect x={M + 70} y={1406 + i * 40} width={200} height={10}
              rx={5} fill="rgba(255,255,255,0.06)" />
            <rect x={M + 70} y={1406 + i * 40} width={w * 2} height={10}
              rx={5} fill={C.blue} opacity={0.7} />
            <text x={M + 70 + w * 2 + 8} y={1418 + i * 40}
              fill={C.blue} fontFamily={FONT} fontSize={10} fontWeight={700}
              opacity={0.8}>
              {w}
            </text>
          </g>
        ))}
      </g>

      <TechLabel x={M} y={1840} theme="dark" opacity={annot}>CODE · RESPONSIVE · PERFORMANCE · SEO</TechLabel>
      <TechLabel x={VIDEO_WIDTH - M} y={1840} theme="dark" anchor="end" opacity={annot}>MOBILE-FIRST / CUSTOM</TechLabel>
    </g>
  );
}
