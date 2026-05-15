// Scene 01 — Gancho (0–5.5s, dark)
// Copy-first hook + sistema visual claro. Badge legible (no micro-footer).

const _S1 = window.SHARED;
const RL = window.REEL_LAYOUT;

function Scene01({ p }) {
  const {
    C, FONT, FONT_MONO, VW, VH,
    seg, lerp, easeInOut, clamp,
    SheetChrome, DraftLine, BlueDot,
  } = _S1;

  const { REEL, MultilineText, BadgePill, wrapTextToLines, shrinkToFitLines } = RL;

  const hookBg = seg(p, 0.0, 0.14);
  const pulse = seg(p, 0.05, 0.22);
  const hlIn = seg(p, 0.12, 0.38);
  const hlHold = clamp((p - 0.38) / 0.12, 0, 1);
  const progIn = seg(p, 0.36, 0.56);
  const badgeIn = seg(p, 0.48, 0.72);
  const diagIn = seg(p, 0.62, 0.94);
  const drift = easeInOut(clamp((p - 0.2) / 0.8, 0, 1));

  const edge = REEL.SAFE_X;
  const colW = REEL.CONTENT_W;

  const headlineFit = shrinkToFitLines(
    wrapTextToLines('Este reel no lo editamos.', colW, 112, 850, FONT),
    colW,
    112,
    REEL.MIN_HEADLINE_PX,
    850,
    FONT,
    2,
  );
  const { size: headlineSize, lines: h1 } = headlineFit;
  const lh = headlineSize * 1.08;

  const firstBaseline = 340;
  const lastHeadBaseline = firstBaseline + (h1.length - 1) * lh;
  const progY = lastHeadBaseline + REEL.HEAD_SUB_GAP + 68;

  const illustrationTop = VH - 520;

  const CX = VW / 2;

  return (
    <SheetChrome
      theme="dark"
      p={p}
      sheet="01"
      title="GANCHO / ORIGEN"
      code="A.01"
      label="APERTURA · REEL GENERADO"
      highlight={0}
    >
      {/* Construction cursor — behind copy */}
      <g opacity={hookBg * (1 - drift * 0.35)} aria-hidden="true">
        <g transform={`translate(${lerp(CX, CX + 40 * drift, drift)}, ${lerp(VH * 0.42, VH * 0.46, drift)})`}>
          <line x1={-46} y1={0} x2={46} y2={0} stroke={C.cyan} strokeWidth={1.4} opacity={0.9} />
          <line x1={0} y1={-46} x2={0} y2={46} stroke={C.cyan} strokeWidth={1.4} opacity={0.9} />
          <circle cx={0} cy={0} r={52} fill="none" stroke={C.cyan} strokeWidth={0.75} strokeDasharray="5 5" />
          <circle cx={0} cy={0} r={5} fill={C.cyan} />
        </g>
      </g>

      {/* Primary headline */}
      <MultilineText
        x={edge}
        yStart={firstBaseline}
        lines={h1}
        fontSize={headlineSize}
        fontWeight={850}
        fill={C.white}
        fontFamily={FONT}
        lineHeight={1.08}
        letterSpacing={-1.2}
        opacity={hlIn}
      />

      {/* Secondary headline */}
      <text
        x={edge}
        y={progY}
        fill={C.blue}
        fontFamily={FONT}
        fontSize={72}
        fontWeight={800}
        letterSpacing={-1}
        opacity={progIn}
      >
        Lo programamos.
      </text>
      <line
        x1={edge}
        y1={progY + 18}
        x2={lerp(edge, edge + 560, progIn)}
        y2={progY + 18}
        stroke={C.blue}
        strokeWidth={3.5}
        opacity={progIn}
        strokeLinecap="round"
      />

      {/* Micro CTA — debe leerse como UI, no como footer */}
      <BadgePill
        cx={edge + colW / 2}
        cy={progY + 92}
        label="Link a la app en la descripción"
        theme="dark"
        font={FONT}
        opacity={badgeIn}
        fontSize={27}
      />

      {/* Claridad sin audio — etiqueta corta */}
      <text
        x={edge}
        y={progY + 158}
        fill="rgba(247,250,255,0.55)"
        fontFamily={FONT_MONO}
        fontSize={17}
        fontWeight={700}
        letterSpacing={2}
        opacity={hlHold}
      >
        SISTEMA DIGITAL · MOTION SVG · 9:16
      </text>

      {/* Lower diagram — nodos + líneas (detrás del texto principal por banda vertical) */}
      <g opacity={diagIn * 0.95} aria-hidden="true">
        <g transform={`translate(0, ${lerp(24, 0, drift)})`}>
          <DraftLine
            x1={edge + 80}
            y1={illustrationTop}
            x2={VW - edge - 80}
            y2={illustrationTop + 120}
            draftP={clamp(diagIn * 1.05, 0, 1)}
            theme="dark"
            strokeWidth={1}
          />
          <DraftLine
            x1={edge + 160}
            y1={illustrationTop + 140}
            x2={VW - edge - 160}
            y2={illustrationTop + 40}
            draftP={clamp(diagIn * 1.05 - 0.08, 0, 1)}
            theme="dark"
            strokeWidth={1}
            dashed
          />
          <BlueDot x={edge + 220} y={illustrationTop + 50} r={7} opacity={pulse} glow />
          <BlueDot x={CX - 60} y={illustrationTop + 130} r={7} opacity={pulse * 0.9} glow />
          <BlueDot x={VW - edge - 220} y={illustrationTop + 70} r={7} opacity={pulse * 0.85} glow />
          <rect
            x={edge + 120}
            y={illustrationTop + 190}
            width={colW - 240}
            height={132}
            rx={16}
            fill="rgba(247,250,255,0.04)"
            stroke="rgba(247,250,255,0.18)"
            strokeWidth={1}
            opacity={clamp(diagIn - 0.15, 0, 1)}
          />
          <text
            x={edge + 152}
            y={illustrationTop + 236}
            fill="rgba(63,181,255,0.88)"
            fontFamily={FONT_MONO}
            fontSize={15}
            fontWeight={600}
            opacity={clamp(diagIn - 0.1, 0, 1)}
          >
            {'>'} generarReel({'{'} formato: 'vertical', fuente: 'sistema' {'}'})
          </text>
          <text
            x={edge + 152}
            y={illustrationTop + 266}
            fill="rgba(247,250,255,0.45)"
            fontFamily={FONT_MONO}
            fontSize={14}
            fontWeight={500}
            opacity={clamp(diagIn - 0.12, 0, 1)}
          >
            // Intención en cada frame — sin timeline manual
          </text>
        </g>
      </g>
    </SheetChrome>
  );
}

window.Scene01 = Scene01;
