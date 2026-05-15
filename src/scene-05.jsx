// Scene 05 — Offer Structure (10.5–13s, dark)
// "Ordenamos la oferta." — building elevation with floors stacked.

const S5 = window.SHARED;

function Scene05({ p }) {
  const { C, FONT, FONT_MONO, VW,
    seg, lerp, easeOut, clamp,
    SheetChrome, DraftLine, DraftRect, DimLine } = S5;

  const hl1   = seg(p, 0.08, 0.28);
  const hl2   = seg(p, 0.16, 0.36);
  const sub   = seg(p, 0.26, 0.46);
  const found = seg(p, 0.34, 0.52);
  const floor1 = seg(p, 0.42, 0.58);
  const floor2 = seg(p, 0.50, 0.66);
  const floor3 = seg(p, 0.56, 0.72);
  const roof  = seg(p, 0.64, 0.78);
  const cta   = seg(p, 0.70, 0.85);
  const dims  = seg(p, 0.78, 0.92);
  const annot = seg(p, 0.84, 0.96);

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
        ELEVATION SECTION · A–A'
      </text>

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
      {cta > 0 && (
        <g opacity={cta}>
          {/* Antenna mast */}
          <line x1={CX} y1={GROUND - 470} x2={CX} y2={GROUND - 540}
            stroke="rgba(247,250,255,0.55)" strokeWidth={1.2} />
          <line x1={CX - 8} y1={GROUND - 540} x2={CX + 8} y2={GROUND - 540}
            stroke="rgba(247,250,255,0.55)" strokeWidth={1.2} />
          {/* CTA pill */}
          <rect x={CX - 160} y={GROUND - 590} width={320} height={48}
            rx={24} fill={C.blue} />
          <text x={CX} y={GROUND - 562} fill={C.white} fontFamily={FONT}
            fontSize={15} fontWeight={700} textAnchor="middle" letterSpacing={2}>
            AGENDÁ UN BRIEF →
          </text>
          <text x={CX} y={GROUND - 600} fill={C.cyan} fontFamily={FONT_MONO}
            fontSize={10} fontWeight={800} textAnchor="middle" letterSpacing={2}>
            ROOF / CONVERSION
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

window.Scene05 = Scene05;
