// Scene 04 — Discovery (12.5–16s, light)
// Cuatro pilares claros: Oferta · Cliente · Objetivo · Recorrido

const S4 = window.SHARED;
const RL = window.REEL_LAYOUT;

function Scene04({ p }) {
  const { C, FONT, FONT_MONO, VW,
    clamp,
    SheetChrome, DraftRect, BlueDot,
    NorthArrow,
  } = S4;

  const { REEL, MultilineText, shrinkToFitLines, wrapTextToLines, revealAfter } = RL;

  const edge = REEL.SAFE_X;
  const colW = REEL.CONTENT_W;

  const hlFit = shrinkToFitLines(
    wrapTextToLines('Primero entendemos el negocio.', colW, 104, 850, FONT),
    colW,
    104,
    REEL.MIN_HEADLINE_PX,
    850,
    FONT,
    2,
  );
  const subFit = shrinkToFitLines(
    wrapTextToLines(
      'Oferta, cliente, objetivo y recorrido.',
      colW,
      36,
      560,
      FONT,
    ),
    colW,
    36,
    REEL.MIN_SUB_PX,
    560,
    FONT,
    3,
  );

  const hl = revealAfter(p, 0.05, 0.15);
  const sub = revealAfter(p, 0.14, 0.16);
  const plotP = revealAfter(p, 0.28, 0.14);
  const blocks = revealAfter(p, 0.38, 0.2);

  const firstBaseline = REEL.SAFE_Y + 154;
  const lhH = hlFit.size * 1.06;
  const lastHB = firstBaseline + (hlFit.lines.length - 1) * lhH;
  const subBase = lastHB + REEL.HEAD_SUB_GAP + subFit.size;

  const GAP = 14;
  const cardW = (colW - GAP) / 2;
  const cardH = 208;
  const gridTop = subBase + subFit.lines.length * (subFit.size * 1.22) + 44;
  const leftX = edge;

  const BLOCKS = [
    { col: 0, row: 0, label: 'Oferta', sub: 'QUÉ VENDÉS' },
    { col: 1, row: 0, label: 'Cliente', sub: 'A QUIÉN LE HABLÁS' },
    { col: 0, row: 1, label: 'Objetivo', sub: 'QUÉ QUERÉS LOGRAR' },
    { col: 1, row: 1, label: 'Recorrido', sub: 'CÓMO DECIDE' },
  ];

  const BX = (c) => leftX + c * (cardW + GAP);
  const BY = (r) => gridTop + r * (cardH + GAP);

  return (
    <SheetChrome theme="light" p={p}
      sheet="04" title="DISCOVERY" code="A.04"
      label="MAP · 4 PILARES" highlight={3}>

      <MultilineText
        x={edge}
        yStart={firstBaseline}
        lines={hlFit.lines}
        fontSize={hlFit.size}
        fontWeight={850}
        fill={C.navy}
        fontFamily={FONT}
        lineHeight={1.06}
        letterSpacing={-1}
        opacity={hl}
      />

      <MultilineText
        x={edge}
        yStart={subBase}
        lines={subFit.lines}
        fontSize={subFit.size}
        fontWeight={560}
        fill={C.gray}
        fontFamily={FONT}
        lineHeight={1.22}
        opacity={sub}
      />

      <text x={edge} y={gridTop - 26} fill={C.blue} fontFamily={FONT_MONO}
        fontSize={17} fontWeight={700} letterSpacing={3}
        opacity={plotP}>
        PRIORIZACIÓN · UNA HOJA
      </text>

      <g opacity={plotP * 0.65}>
        <DraftRect x={leftX - 12} y={gridTop - 14} width={colW + 24} height={cardH * 2 + GAP + 28}
          draftP={1} theme="light" strokeWidth={0.9} fill="none" />
      </g>

      {BLOCKS.map((b, i) => {
        const x = BX(b.col), y = BY(b.row);
        return (
          <g key={i} opacity={blocks}>
            <rect x={x} y={y} width={cardW} height={cardH}
              fill="#FFFFFF" stroke={C.navy} strokeWidth={1.2} rx={14} />
            <rect x={x} y={y} width={cardW} height={38} rx={14}
              fill="rgba(7,29,53,0.04)" />
            <text x={x + 16} y={y + 25} fill={C.blue}
              fontFamily={FONT_MONO} fontSize={11} fontWeight={800} letterSpacing={2}>
              {`0${i + 1}`}
            </text>
            <text x={x + cardW - 16} y={y + 25} fill={C.gray}
              fontFamily={FONT_MONO} fontSize={11} fontWeight={700}
              textAnchor="end" letterSpacing={2}>
              PILAR
            </text>
            <text x={x + cardW / 2} y={y + 118} fill={C.navy} fontFamily={FONT}
              fontSize={34} fontWeight={850} textAnchor="middle" letterSpacing={-0.6}>
              {b.label}
            </text>
            <text x={x + cardW / 2} y={y + 154} fill={C.gray}
              fontFamily={FONT_MONO} fontSize={13} fontWeight={700}
              textAnchor="middle" letterSpacing={2}>
              {b.sub}
            </text>
          </g>
        );
      })}

      <BlueDot x={leftX + colW / 2} y={BY(0) + cardH + GAP / 2} r={6} opacity={blocks * 0.85} glow />

      <g opacity={blocks * 0.75}>
        <NorthArrow x={VW - edge - 72} y={gridTop + cardH + 60} theme="light" />
      </g>
    </SheetChrome>
  );
}

window.Scene04 = Scene04;
