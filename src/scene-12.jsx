// Scene 12 — CTA final social (hold extendido)
// Frase memorable + botones dominantes · comentá REEL

const S12 = window.SHARED;
const RL = window.REEL_LAYOUT;

function Scene12({ p }) {
  const { C, FONT, FONT_MONO, VW, clamp, SheetChrome, easeOut, lerp } = S12;

  const {
    REEL,
    shrinkToFitLines,
    wrapTextToLines,
    MultilineCenter,
    DualCTA,
    MemoRibbon,
    revealAfter,
  } = RL;

  const edge = REEL.SAFE_X;
  const colW = REEL.CONTENT_W;
  const CX = VW / 2;

  const backdrop = revealAfter(p, 0, 0.18);

  const hlFit = shrinkToFitLines(
    wrapTextToLines('¿Tu web vende o solo existe?', colW - 36, 118, 850, FONT),
    colW - 36,
    118,
    REEL.MIN_HEADLINE_PX,
    850,
    FONT,
    2,
  );
  const subFit = shrinkToFitLines(
    wrapTextToLines(
      'Diseñamos y desarrollamos webs que se ven premium y convierten.',
      colW - 36,
      38,
      580,
      FONT,
    ),
    colW - 36,
    38,
    REEL.MIN_SUB_PX,
    580,
    FONT,
    4,
  );

  const memoFit = shrinkToFitLines(
    wrapTextToLines(
      "Comentá 'REEL' y te mandamos más info.",
      colW - 48,
      40,
      800,
      FONT,
    ),
    colW - 48,
    40,
    REEL.MIN_SUB_PX + 6,
    800,
    FONT,
    3,
  );

  const hl = revealAfter(p, 0.04, 0.18);
  const sub = revealAfter(p, 0.14, 0.2);
  const memoOp = revealAfter(p, 0.28, 0.2);
  const cta = revealAfter(p, 0.44, 0.22);
  const foot = revealAfter(p, 0.62, 0.18);

  const firstBaseline = REEL.SAFE_Y + 148;
  const lhH = hlFit.size * 1.05;
  const lastHB = firstBaseline + (hlFit.lines.length - 1) * lhH;
  const hlMidY = firstBaseline + ((hlFit.lines.length - 1) * lhH) / 2;
  const hlScaleMot = lerp(1.064, 1, easeOut(hl));
  const memoScaleMot = lerp(1.038, 1, easeOut(memoOp));
  const subStart = lastHB + REEL.HEAD_SUB_GAP + subFit.size;

  const memoStart =
    subStart + subFit.lines.length * (subFit.size * 1.24) + REEL.HEAD_SUB_GAP;
  const memoH = memoFit.lines.length * (memoFit.size * 1.18);

  const ctaTop = memoStart + memoH + 36;

  const ctaEnter = lerp(1.046, 1, easeOut(Math.min(cta * 1.2, 1)));
  const pulseEnv = clamp((p - 0.5) / 0.22, 0, 1);
  const ctaPulse =
    1 + 0.024 * Math.sin(pulseEnv * Math.PI) * Math.exp(-pulseEnv * 1.35);
  const ctaMotion = ctaEnter * ctaPulse;

  return (
    <SheetChrome
      theme="light"
      p={p}
      sheet="12"
      title="CIERRE"
      code="A.12"
      label="CTA SOCIAL · BUILD HAUS STUDIO"
      highlight={1}
      showTitleBlock={false}
    >
      <rect
        x={0}
        y={260}
        width={VW}
        height={780}
        fill="url(#reel-light-wash)"
        opacity={backdrop * 0.32}
      />

      <g
        opacity={hl}
        transform={`translate(${CX}, ${hlMidY}) scale(${hlScaleMot}) translate(${-CX}, ${-hlMidY})`}
      >
        <MultilineCenter
          cx={CX}
          yStart={firstBaseline}
          lines={hlFit.lines}
          fontSize={hlFit.size}
          fontWeight={850}
          fill={C.navy}
          fontFamily={FONT}
          lineHeight={1.05}
          opacity={1}
        />
      </g>

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

      <g
        opacity={memoOp}
        transform={`translate(${CX}, ${memoStart + memoH / 2}) scale(${memoScaleMot}) translate(${-CX}, ${-(memoStart + memoH / 2)})`}
      >
        <MemoRibbon
          cx={CX}
          yStart={memoStart}
          lines={memoFit.lines}
          fontSize={memoFit.size}
          fill={C.navy}
          fontFamily={FONT}
          opacity={1}
          fontWeight={850}
        />
      </g>

      <DualCTA
        cx={CX}
        yPrimaryTop={ctaTop}
        primaryLabel={"Comentá 'REEL'"}
        secondaryLabel="Y te mandamos más info"
        theme="light"
        font={FONT}
        opacity={cta}
        dominant
        motionScale={ctaMotion}
      />

      <text
        x={CX}
        y={VH - REEL.SAFE_Y - 38}
        fill={C.navy}
        fontFamily={FONT}
        fontSize={28}
        fontWeight={750}
        textAnchor="middle"
        letterSpacing={2}
        opacity={foot}
      >
        Build Haus Studio
      </text>
      <text
        x={CX}
        y={VH - REEL.SAFE_Y - 8}
        fill={C.gray}
        fontFamily={FONT_MONO}
        fontSize={16}
        fontWeight={700}
        textAnchor="middle"
        letterSpacing={3}
        opacity={foot * 0.88}
      >
        BUILDHAUS.STUDIO
      </text>

      <line
        x1={CX - colW / 2}
        y1={ctaTop - 26}
        x2={CX + colW / 2}
        y2={ctaTop - 26}
        stroke={C.blue}
        strokeWidth={2.5}
        opacity={clamp(cta * 0.9, 0, 1)}
      />
    </SheetChrome>
  );
}

window.Scene12 = Scene12;
