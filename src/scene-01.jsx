// Scene 01 — Gancho (extended hold)
// Mensaje principal + badge grande + sistema que se arma con calma.

const _S1 = window.SHARED;
const RL = window.REEL_LAYOUT;

function Scene01({ p }) {
  const {
    C, FONT, FONT_MONO, VW, VH,
    lerp, easeInOut, clamp,
    SheetChrome, DraftLine, BlueDot,
  } = _S1;

  const {
    REEL,
    MultilineText,
    BadgePill,
    wrapTextToLines,
    shrinkToFitLines,
    revealAfter,
  } = RL;

  const hookBg = revealAfter(p, 0, 0.12);
  const pulse = revealAfter(p, 0.04, 0.2);
  const hlIn = revealAfter(p, 0.03, 0.16);
  const progIn = revealAfter(p, 0.22, 0.14);
  const badgeIn = revealAfter(p, 0.34, 0.14);
  const diagIn = revealAfter(p, 0.08, 0.32);
  const drift = easeInOut(clamp((p - 0.15) / 0.85, 0, 1));

  const edge = REEL.SAFE_X;
  const colW = REEL.CONTENT_W;

  const headlineFit = shrinkToFitLines(
    wrapTextToLines('Este reel no lo editamos.', colW, 118, 850, FONT),
    colW,
    118,
    REEL.MIN_HEADLINE_PX,
    850,
    FONT,
    2,
  );
  const { size: headlineSize, lines: h1 } = headlineFit;
  const lh = headlineSize * 1.08;

  const firstBaseline = REEL.SAFE_Y + 176;
  const lastHeadBaseline = firstBaseline + (h1.length - 1) * lh;
  const progY = lastHeadBaseline + REEL.HEAD_SUB_GAP + 72;

  const illustrationTop = VH - REEL.SAFE_Y - 400;

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
      {/* Cursor / retícula — capa decorativa */}
      <g opacity={hookBg * (1 - drift * 0.45)} aria-hidden="true">
        <g
          transform={`translate(${lerp(CX, CX + 36 * drift, drift)}, ${lerp(
            VH * 0.38,
            VH * 0.43,
            drift,
          )})`}
        >
          <line x1={-52} y1={0} x2={52} y2={0} stroke={C.cyan} strokeWidth={1.35} opacity={0.95} />
          <line x1={0} y1={-52} x2={0} y2={52} stroke={C.cyan} strokeWidth={1.35} opacity={0.95} />
          <circle cx={0} cy={0} r={58} fill="none" stroke={C.cyan} strokeWidth={0.7} strokeDasharray="6 6" />
          <circle cx={0} cy={0} r={6} fill={C.cyan} />
        </g>
      </g>

      {/* Bloques UI fantasma — ensamblaje */}
      <g opacity={diagIn * 0.55} aria-hidden="true">
        {[0, 1, 2].map((i) => {
          const ox = edge + 48 + i * 118;
          const oy = illustrationTop - 120 + i * 22;
          const w = 140 + i * 18;
          const h = 36 + i * 6;
          const pr = revealAfter(p, 0.05 + i * 0.06, 0.12);
          return (
            <rect
              key={i}
              x={ox}
              y={oy}
              width={w}
              height={h}
              rx={10}
              fill="rgba(36,107,255,0.08)"
              stroke="rgba(63,181,255,0.35)"
              strokeWidth={1}
              opacity={pr}
              transform={`translate(${lerp(-16, 0, pr)}, 0)`}
            />
          );
        })}
      </g>

      <g opacity={hlIn} filter="url(#softRevealBlur)">
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
          opacity={1}
        />
      </g>

      <text
        x={edge}
        y={progY}
        fill={C.blue}
        fontFamily={FONT}
        fontSize={76}
        fontWeight={800}
        letterSpacing={-1}
        opacity={progIn}
      >
        Lo programamos.
      </text>
      <line
        x1={edge}
        y1={progY + 20}
        x2={lerp(edge, edge + 580, progIn)}
        y2={progY + 20}
        stroke={C.blue}
        strokeWidth={4}
        opacity={progIn}
        strokeLinecap="round"
      />

      <BadgePill
        cx={edge + colW / 2}
        cy={progY + 96}
        label="Link a la app en la descripción"
        theme="dark"
        font={FONT}
        opacity={badgeIn}
        fontSize={29}
        padX={32}
        padY={16}
      />

      <text
        x={edge}
        y={progY + 168}
        fill="rgba(247,250,255,0.52)"
        fontFamily={FONT_MONO}
        fontSize={18}
        fontWeight={700}
        letterSpacing={2}
        opacity={revealAfter(p, 0.42, 0.12)}
      >
        GENERADO CON CÓDIGO · SIN TIMELINE MANUAL
      </text>

      <g opacity={diagIn * 0.97} aria-hidden="true">
        <g transform={`translate(0, ${lerp(20, 0, drift)})`}>
          <DraftLine
            x1={edge + 72}
            y1={illustrationTop}
            x2={VW - edge - 72}
            y2={illustrationTop + 118}
            draftP={clamp(diagIn * 1.05, 0, 1)}
            theme="dark"
            strokeWidth={1.1}
          />
          <DraftLine
            x1={edge + 150}
            y1={illustrationTop + 138}
            x2={VW - edge - 150}
            y2={illustrationTop + 36}
            draftP={clamp(diagIn * 1.05 - 0.07, 0, 1)}
            theme="dark"
            strokeWidth={1}
            dashed
          />
          <BlueDot x={edge + 230} y={illustrationTop + 48} r={8} opacity={pulse} glow />
          <BlueDot x={CX - 48} y={illustrationTop + 128} r={8} opacity={pulse * 0.92} glow />
          <BlueDot x={VW - edge - 230} y={illustrationTop + 72} r={8} opacity={pulse * 0.88} glow />
          <rect
            x={edge + 100}
            y={illustrationTop + 182}
            width={colW - 200}
            height={138}
            rx={18}
            fill="rgba(247,250,255,0.045)"
            stroke="rgba(247,250,255,0.2)"
            strokeWidth={1}
            opacity={clamp(diagIn - 0.12, 0, 1)}
          />
          <text
            x={edge + 136}
            y={illustrationTop + 236}
            fill="rgba(63,181,255,0.92)"
            fontFamily={FONT_MONO}
            fontSize={16}
            fontWeight={600}
            opacity={clamp(diagIn - 0.08, 0, 1)}
          >
            {'>'} reel.compose({'{'} modo: 'svg', ritmo: 'sistema' {'}'})
          </text>
          <text
            x={edge + 136}
            y={illustrationTop + 268}
            fill="rgba(247,250,255,0.48)"
            fontFamily={FONT_MONO}
            fontSize={15}
            fontWeight={500}
            opacity={clamp(diagIn - 0.1, 0, 1)}
          >
            // Cada escena = módulo · tipografía medida · sin solapes
          </text>
        </g>
      </g>
    </SheetChrome>
  );
}

window.Scene01 = Scene01;
