// Scene 12 — CTA final (39–42s, light)
// Botones dominantes + jerarquía imposible de ignorar.

const S12 = window.SHARED;
const RL = window.REEL_LAYOUT;

function Scene12({ p }) {
  const { C, FONT, FONT_MONO, VW,
    seg, clamp,
    SheetChrome,
  } = S12;

  const { REEL, shrinkToFitLines, wrapTextToLines, MultilineCenter, DualCTA } = RL;

  const edge = REEL.SAFE_X;
  const colW = REEL.CONTENT_W;
  const CX = VW / 2;

  const backdrop = seg(p, 0.0, 0.22);
  const hlFit = shrinkToFitLines(
    wrapTextToLines('¿Tu web vende o solo existe?', colW - 40, 112, 850, FONT),
    colW - 40,
    112,
    REEL.MIN_HEADLINE_PX,
    850,
    FONT,
    2,
  );
  const subFit = shrinkToFitLines(
    wrapTextToLines(
      'Diseñamos y desarrollamos webs que se entienden, se ven premium y convierten.',
      colW - 40,
      34,
      580,
      FONT,
    ),
    colW - 40,
    34,
    REEL.MIN_SUB_PX,
    580,
    FONT,
    4,
  );

  const hl = seg(p, 0.06, 0.42);
  const sub = seg(p, 0.14, 0.52);
  const cta = seg(p, 0.44, 0.82);
  const foot = seg(p, 0.72, 0.96);

  const firstBaseline = 320;
  const lhH = hlFit.size * 1.05;
  const lastHB = firstBaseline + (hlFit.lines.length - 1) * lhH;
  const subStart = lastHB + REEL.HEAD_SUB_GAP + subFit.size;

  const ctaTop = subStart + subFit.lines.length * (subFit.size * 1.22) + 52;

  return (
    <SheetChrome
      theme="light"
      p={p}
      sheet="12"
      title="CIERRE"
      code="A.12"
      label="CTA · BUILD HAUS STUDIO"
      highlight={1}
      showTitleBlock={false}
    >
      {/* Carril luminoso — contraste premium */}
      <rect
        x={0}
        y={260}
        width={VW}
        height={720}
        fill="url(#reel-light-wash)"
        opacity={backdrop * 0.35}
      />

      <MultilineCenter
        cx={CX}
        yStart={firstBaseline}
        lines={hlFit.lines}
        fontSize={hlFit.size}
        fontWeight={850}
        fill={C.navy}
        fontFamily={FONT}
        lineHeight={1.05}
        opacity={hl}
      />

      <MultilineCenter
        cx={CX}
        yStart={subStart}
        lines={subFit.lines}
        fontSize={subFit.size}
        fontWeight={560}
        fill={C.gray}
        fontFamily={FONT}
        lineHeight={1.24}
        opacity={sub}
      />

      <DualCTA
        cx={CX}
        yPrimaryTop={ctaTop}
        primaryLabel="Agendá un brief"
        secondaryLabel={'Escribinos "WEB"'}
        theme="light"
        font={FONT}
        opacity={cta}
      />

      <text
        x={CX}
        y={VH - REEL.SAFE_Y - 36}
        fill={C.navy}
        fontFamily={FONT}
        fontSize={26}
        fontWeight={750}
        textAnchor="middle"
        letterSpacing={2}
        opacity={foot}
      >
        Build Haus Studio
      </text>
      <text
        x={CX}
        y={VH - REEL.SAFE_Y - 10}
        fill={C.gray}
        fontFamily={FONT_MONO}
        fontSize={15}
        fontWeight={700}
        textAnchor="middle"
        letterSpacing={3}
        opacity={foot * 0.85}
      >
        BUILDHAUS.STUDIO
      </text>

      <line
        x1={CX - colW / 2}
        y1={ctaTop - 28}
        x2={CX + colW / 2}
        y2={ctaTop - 28}
        stroke={C.blue}
        strokeWidth={2}
        opacity={clamp(cta * 0.85, 0, 1)}
      />
    </SheetChrome>
  );
}

window.Scene12 = Scene12;
