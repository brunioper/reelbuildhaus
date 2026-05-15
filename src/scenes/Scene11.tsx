// Scene 11 — Final Website Reveal (25.5–27s, dark)
// "El resultado." — polished final website mockup.

import { C, FONT, VIDEO_WIDTH, T } from '../constants';
import { BlueprintGrid, TechLabel, CornerBrackets, SceneBg, seg } from './shared';

const M = T.m;
const FX = 90, FY = 920, FW = VIDEO_WIDTH - 180, FH = 860;

export default function Scene11({ p }: { p: number }) {
  const grid   = seg(p, 0,    0.15);
  const eye    = seg(p, 0.05, 0.22);
  const hl1    = seg(p, 0.10, 0.35);
  const frame  = seg(p, 0.22, 0.50);
  const nav    = seg(p, 0.35, 0.55);
  const hero   = seg(p, 0.45, 0.65);
  const cards  = seg(p, 0.56, 0.74);
  const proof  = seg(p, 0.65, 0.82);
  const ctaSec = seg(p, 0.74, 0.90);
  const annot  = seg(p, 0.84, 0.98);

  return (
    <g>
      <SceneBg theme="dark" />
      <g opacity={grid}><BlueprintGrid theme="dark" /></g>

      <TechLabel x={M} y={160} theme="dark" opacity={eye}>RESULTADO / FINAL BUILD</TechLabel>
      <line x1={M} y1={172} x2={VIDEO_WIDTH - M} y2={172}
        stroke="rgba(255,255,255,0.07)" strokeWidth={1} />

      <text x={M} y={380} fill={C.white} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl1}>
        El resultado.
      </text>
      <text x={M} y={380 + T.type.headline * 1.08} fill={C.blue} fontFamily={FONT}
        fontSize={42} fontWeight={700} letterSpacing={-0.5}
        opacity={hl1}>
        Una web construida desde cero.
      </text>

      {/* Browser outer frame */}
      <g opacity={frame}>
        <rect x={FX} y={FY} width={FW} height={FH}
          rx={T.r.md} fill="rgba(247,250,255,0.03)"
          stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
        <CornerBrackets x={FX} y={FY} w={FW} h={FH} size={18} color={C.gray} opacity={0.28} />

        {/* Browser chrome */}
        <rect x={FX} y={FY} width={FW} height={44}
          rx={T.r.md} fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
        {[0, 1, 2].map(i => (
          <circle key={i} cx={FX + 18 + i * 18} cy={FY + 22} r={5}
            fill={['rgba(255,95,87,0.5)', 'rgba(254,188,46,0.5)', 'rgba(40,200,64,0.5)'][i]} />
        ))}
        <rect x={FX + 90} y={FY + 10} width={FW - 180} height={24}
          rx={4} fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        <text x={FX + FW / 2} y={FY + 26}
          fill="rgba(255,255,255,0.25)" fontFamily={FONT}
          fontSize={11} fontWeight={500} textAnchor="middle">
          buildhaus.studio
        </text>
      </g>

      {/* Navigation */}
      <g opacity={nav}>
        <rect x={FX + 1} y={FY + 44} width={FW - 2} height={50}
          fill="rgba(7,29,53,0.7)" />
        <text x={FX + 24} y={FY + 75} fill="rgba(255,255,255,0.9)" fontFamily={FONT}
          fontSize={16} fontWeight={800} letterSpacing={2}>
          BUILD HAUS
        </text>
        <text x={FX + 140} y={FY + 75} fill="rgba(255,255,255,0.3)" fontFamily={FONT}
          fontSize={10} fontWeight={500} letterSpacing={1} dominantBaseline="middle">
          STUDIO
        </text>
        {['Servicios', 'Trabajo', 'Proceso', 'Contacto'].map((t, j) => (
          <text key={j} x={FX + FW - 24 - j * 84} y={FY + 75}
            fill="rgba(255,255,255,0.55)" fontFamily={FONT}
            fontSize={12} textAnchor="end" fontWeight={500}>
            {t}
          </text>
        ))}
      </g>

      {/* Hero section */}
      <g opacity={hero}>
        <rect x={FX + 1} y={FY + 94} width={FW - 2} height={250}
          fill="rgba(36,107,255,0.04)" />
        {/* Headline */}
        <text x={FX + 32} y={FY + 154} fill="rgba(255,255,255,0.95)" fontFamily={FONT}
          fontSize={36} fontWeight={850} letterSpacing={-1.5}>
          Webs construidas
        </text>
        <text x={FX + 32} y={FY + 196} fill="rgba(255,255,255,0.95)" fontFamily={FONT}
          fontSize={36} fontWeight={850} letterSpacing={-1.5}>
          desde cero.
        </text>
        <text x={FX + 32} y={FY + 236} fill="rgba(255,255,255,0.4)" fontFamily={FONT}
          fontSize={16} fontWeight={400} letterSpacing={0}>
          Diseño y desarrollo web a medida para marcas que quieren convertir.
        </text>
        {/* CTA */}
        <rect x={FX + 32} y={FY + 262} width={180} height={48}
          rx={T.r.pill} fill={C.blue} />
        <text x={FX + 122} y={FY + 292} fill={C.white} fontFamily={FONT}
          fontSize={14} fontWeight={700} textAnchor="middle" letterSpacing={1.5}>
          AGENDÁ UN BRIEF →
        </text>
        {/* Hero visual placeholder */}
        <rect x={FX + FW / 2 + 20} y={FY + 104} width={FW / 2 - 40} height={230}
          rx={T.r.sm} fill="rgba(36,107,255,0.08)"
          stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        <line x1={FX + FW / 2 + 20} y1={FY + 104}
          x2={FX + FW - 20} y2={FY + 334}
          stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
        <line x1={FX + FW - 20} y1={FY + 104}
          x2={FX + FW / 2 + 20} y2={FY + 334}
          stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
      </g>

      {/* Service cards */}
      <g opacity={cards}>
        <line x1={FX + 1} y1={FY + 344} x2={FX + FW - 1} y2={FY + 344}
          stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        {[
          { title: 'Diseño web', sub: 'UI/UX · Brand · Sistema visual' },
          { title: 'Desarrollo', sub: 'React · Next.js · Performance' },
          { title: 'Conversión', sub: 'CRO · Analytics · Optimización' },
        ].map(({ title, sub }, j) => (
          <g key={j}>
            <rect x={FX + 20 + j * 268} y={FY + 360} width={240} height={150}
              rx={T.r.sm} fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
            <circle cx={FX + 42 + j * 268} cy={FY + 396} r={14}
              fill={C.blue} opacity={0.15} stroke={C.blue} strokeWidth={1} />
            <text x={FX + 20 + j * 268 + 20} y={FY + 430}
              fill="rgba(255,255,255,0.85)" fontFamily={FONT}
              fontSize={16} fontWeight={700} letterSpacing={-0.3}>
              {title}
            </text>
            <text x={FX + 20 + j * 268 + 20} y={FY + 452}
              fill={C.gray} fontFamily={FONT} fontSize={12} fontWeight={400}>
              {sub}
            </text>
          </g>
        ))}
      </g>

      {/* Proof section */}
      <g opacity={proof}>
        <line x1={FX + 1} y1={FY + 530} x2={FX + FW - 1} y2={FY + 530}
          stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        <rect x={FX + 20} y={FY + 548} width={FW - 40} height={100}
          rx={T.r.sm} fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        <text x={FX + 48} y={FY + 590} fill="rgba(255,255,255,0.7)" fontFamily={FONT}
          fontSize={14} fontWeight={600} fontStyle="italic">
          "Construyeron exactamente lo que necesitábamos."
        </text>
        <text x={FX + 48} y={FY + 614} fill={C.gray} fontFamily={FONT}
          fontSize={12} fontWeight={500} letterSpacing={0.5}>
          Cliente · Build Haus Studio
        </text>
        <circle cx={FX + FW - 56} cy={FY + 597} r={30}
          fill="rgba(36,107,255,0.1)" stroke="rgba(36,107,255,0.2)" strokeWidth={1} />
      </g>

      {/* Footer CTA strip */}
      <g opacity={ctaSec}>
        <rect x={FX + 1} y={FY + 668} width={FW - 2} height={72}
          fill="rgba(36,107,255,0.08)" />
        <line x1={FX + 1} y1={FY + 668} x2={FX + FW - 1} y2={FY + 668}
          stroke="rgba(36,107,255,0.2)" strokeWidth={1} />
        <text x={FX + FW / 2} y={FY + 703}
          fill="rgba(255,255,255,0.85)" fontFamily={FONT}
          fontSize={18} fontWeight={700} textAnchor="middle" letterSpacing={-0.3}>
          ¿Construimos tu web?
        </text>
        <text x={FX + FW / 2} y={FY + 723}
          fill={C.gray} fontFamily={FONT} fontSize={12} fontWeight={400}
          textAnchor="middle">
          buildhaus.studio
        </text>
      </g>

      <TechLabel x={M} y={1840} theme="dark" opacity={annot}>RESULTADO FINAL · CUSTOM BUILD</TechLabel>
      <TechLabel x={VIDEO_WIDTH - M} y={1840} theme="dark" anchor="end" opacity={annot}>buildhaus.studio</TechLabel>
    </g>
  );
}
