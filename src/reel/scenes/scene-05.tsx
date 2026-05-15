// Scene 05 — Oferta en orden (bloques caóticos → torre clara)

import { SHARED as SH } from '../shared';
import { REEL_LAYOUT as RL } from '../layout-engine';


export function Scene05({ p }: { p: number }) {
  const { C, FONT, FONT_MONO, VW,
    clamp,
    SheetChrome, DimLine } = SH;

  const { revealAfter } = RL;

  const hl1 = revealAfter(p, 0.05, 0.13);
  const hl2 = revealAfter(p, 0.12, 0.13);
  const sub = revealAfter(p, 0.22, 0.16);
  const found = revealAfter(p, 0.32, 0.14);
  const chaosFade = clamp(1 - revealAfter(p, 0.28, 0.28) * 1.08, 0, 1);
  const floor1 = revealAfter(p, 0.42, 0.12);
  const floor2 = revealAfter(p, 0.48, 0.12);
  const floor3 = revealAfter(p, 0.54, 0.12);
  const roof = revealAfter(p, 0.6, 0.12);
  const cta = revealAfter(p, 0.68, 0.14);
  const dims = revealAfter(p, 0.76, 0.12);

  const CX = VW / 2;
  // Building sits 1000–1620
  const GROUND = 1620;
  // Floors from bottom up
  const FLOORS = [
    { y: GROUND - 90,  h: 90,  w: 740, label: 'Propuesta de valor',
      sub: 'POR QUÉ NOSOTROS · PARA QUIÉN',  no: '01 / GROUND',
      level: 'L00', opacity: () => found },
    { y: GROUND - 200, h: 110, w: 620, label: 'Servicios',
      sub: 'ALCANCE · ENTREGABLES',         no: '02',
      level: 'L01', opacity: () => floor1 },
    { y: GROUND - 320, h: 120, w: 520, label: 'Diferenciales',
      sub: 'CÓMO LO HACEMOS DISTINTO',      no: '03',
      level: 'L02', opacity: () => floor2 },
    { y: GROUND - 430, h: 110, w: 420, label: 'Prueba social',
      sub: 'CASOS · TESTIMONIOS',            no: '04',
      level: 'L03', opacity: () => floor3 },
  ];

  return (
    <SheetChrome theme="dark" p={p}
      sheet="05" title="OFERTA / ELEVATION" code="A.05"
      label="MESSAGE ARCHITECTURE — STACKED FLOORS" highlight={4}>

      <text x={90} y={340} fill={C.white} fontFamily={FONT}
        fontSize={120} fontWeight={850} letterSpacing={-3}
        opacity={hl1}>
        Ordenamos
      </text>
      <text x={90} y={464} fill={C.white} fontFamily={FONT}
        fontSize={120} fontWeight={850} letterSpacing={-3}
        opacity={hl2}>
        la oferta.
      </text>
      <text x={90} y={552} fill={C.gray} fontFamily={FONT}
        fontSize={36} fontWeight={500} letterSpacing={-0.4}
        opacity={sub}>
        Para que el usuario entienda rápido qué vendés.
      </text>
      <text x={90} y={596} fill={C.blue} fontFamily={FONT_MONO}
        fontSize={18} fontWeight={700} letterSpacing={3}
        opacity={sub}>
        CAOS → ARQUITECTURA · SECCIÓN A–A'
      </text>

      {/* Bloques desalineados que desaparecen al ordenar */}
      <g opacity={chaosFade * clamp(found * 1.4, 0, 1)} aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x={CX - 320 + (i % 3) * 110 + (i * 13) % 30}
            y={GROUND - 420 + Math.floor(i / 3) * 70}
            width={140 + i * 12}
            height={36}
            rx={10}
            fill="rgba(226,92,92,0.09)"
            stroke="rgba(247,250,255,0.22)"
            strokeWidth={1}
            transform={`rotate(${-8 + i * 5} ${CX - 120 + i * 20} ${GROUND - 380})`}
          />
        ))}
      </g>

      {/* Ground line — hatched */}
      <g opacity={found * 0.8}>
        <line x1={120} y1={GROUND + 10} x2={VW - 120} y2={GROUND + 10}
          stroke={C.white} strokeWidth={1.4} />
        {Array.from({ length: 18 }, (_, i) => (
          <line key={i}
            x1={130 + i * 48} y1={GROUND + 10}
            x2={130 + i * 48 - 14} y2={GROUND + 30}
            stroke="rgba(247,250,255,0.4)" strokeWidth={0.7} />
        ))}
        <text x={VW - 120} y={GROUND + 48} fill={C.gray}
          fontFamily={FONT_MONO} fontSize={9} fontWeight={700}
          textAnchor="end" letterSpacing={2}>
          GROUND / SUELO
        </text>
      </g>

      {/* Vertical center axis */}
      <g opacity={found * 0.4}>
        <line x1={CX} y1={GROUND - 470} x2={CX} y2={GROUND}
          stroke={C.cyan} strokeWidth={0.6} strokeDasharray="2 3" />
      </g>

      {/* Floors */}
      {FLOORS.map((f, i) => {
        const x = CX - f.w / 2;
        const o = f.opacity();
        return (
          <g key={i} opacity={o}>
            {/* Box */}
            <rect x={x} y={f.y} width={f.w} height={f.h}
              fill="rgba(247,250,255,0.04)"
              stroke="rgba(247,250,255,0.55)" strokeWidth={1.2} />
            {/* Floor line at top */}
            <rect x={x} y={f.y} width={f.w} height={18}
              fill="rgba(247,250,255,0.07)" />
            <line x1={x} y1={f.y + 18} x2={x + f.w} y2={f.y + 18}
              stroke="rgba(247,250,255,0.30)" strokeWidth={0.6} />

            {/* Level badge */}
            <text x={x + 12} y={f.y + 13} fill={C.cyan}
              fontFamily={FONT_MONO} fontSize={9} fontWeight={800} letterSpacing={2}>
              {f.no}
            </text>
            <text x={x + f.w - 12} y={f.y + 13} fill="rgba(247,250,255,0.5)"
              fontFamily={FONT_MONO} fontSize={9} fontWeight={700}
              textAnchor="end" letterSpacing={2}>
              {f.level}
            </text>

            {/* Label */}
            <text x={x + f.w / 2} y={f.y + f.h / 2 + 8} fill={C.white}
              fontFamily={FONT} fontSize={22} fontWeight={800}
              textAnchor="middle" letterSpacing={-0.3}>
              {f.label}
            </text>
            <text x={x + f.w / 2} y={f.y + f.h / 2 + 32} fill={C.gray}
              fontFamily={FONT_MONO} fontSize={10} fontWeight={700}
              textAnchor="middle" letterSpacing={2}>
              {f.sub}
            </text>

            {/* Outside level reference (right side) */}
            <line x1={x + f.w + 20} y1={f.y + 9}
              x2={x + f.w + 36} y2={f.y + 9}
              stroke={C.cyan} strokeWidth={0.8} />
            <text x={x + f.w + 44} y={f.y + 13} fill={C.cyan}
              fontFamily={FONT_MONO} fontSize={9} fontWeight={700} letterSpacing={1.5}>
              +{(FLOORS.length - i) * 2}.50m
            </text>
          </g>
        );
      })}

      {/* Roof / antenna — CTA pill on top */}
      {roof > 0 && (
        <g opacity={roof}>
          {/* Antenna mast */}
          <line x1={CX} y1={GROUND - 470} x2={CX} y2={GROUND - 540}
            stroke="rgba(247,250,255,0.55)" strokeWidth={1.2} />
          <line x1={CX - 8} y1={GROUND - 540} x2={CX + 8} y2={GROUND - 540}
            stroke="rgba(247,250,255,0.55)" strokeWidth={1.2} />
          <text x={CX} y={GROUND - 600} fill={C.cyan} fontFamily={FONT_MONO}
            fontSize={10} fontWeight={800} textAnchor="middle" letterSpacing={2}>
            TOPE · CONVERSIÓN
          </text>
        </g>
      )}
      {cta > 0 && (
        <g opacity={cta}>
          {/* CTA pill */}
          <rect x={CX - 180} y={GROUND - 578} width={360} height={52}
            rx={26} fill={C.blue} filter="url(#ctaGlow)" />
          <text x={CX} y={GROUND - 546} fill={C.white} fontFamily={FONT}
            fontSize={17} fontWeight={780} textAnchor="middle" letterSpacing={1.5}>
            Próximo paso → brief
          </text>
        </g>
      )}

      {/* Dimension line — total building height */}
      {dims > 0 && (
        <g opacity={dims}>
          <DimLine x1={CX - 460} y1={GROUND - 540} x2={CX - 460} y2={GROUND}
            value="10.0 m" theme="dark" offset={0} />
          {/* Level marks along height */}
          {[0, 90, 200, 320, 430].map((h, i) => (
            <g key={i}>
              <line x1={CX - 480} y1={GROUND - h} x2={CX - 466} y2={GROUND - h}
                stroke={C.gray} strokeWidth={0.6} />
              <text x={CX - 490} y={GROUND - h + 4} fill={C.gray}
                fontFamily={FONT_MONO} fontSize={9} fontWeight={600}
                textAnchor="end" letterSpacing={1}>
                {i === 0 ? '±0.00' : `+${(h / 100).toFixed(2)}m`}
              </text>
            </g>
          ))}
        </g>
      )}


    </SheetChrome>
  );
}

