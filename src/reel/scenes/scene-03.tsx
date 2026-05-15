// Scene 03 — Problema (9–12.5s, dark)
// Legible sin audio: problema claro + metáfora de abandono.

import { SHARED as SH } from '../shared';
import { REEL_LAYOUT as RL } from '../layout-engine';


export function Scene03({ p }: { p: number }) {
  const {
    C, FONT, FONT_MONO, VW, VH,
    lerp, easeOut, easeInOut, clamp,
    SheetChrome, BlueDot,
  } = SH;

  const { REEL, MultilineText, shrinkToFitLines, wrapTextToLines, revealAfter } = RL;

  const edge = REEL.SAFE_X;
  const colW = REEL.CONTENT_W;

  const diagIn = revealAfter(p, 0.05, 0.28);
  const hlFit = shrinkToFitLines(
    wrapTextToLines('Una web linda no alcanza.', colW, 108, 850, FONT),
    colW,
    108,
    REEL.MIN_HEADLINE_PX,
    850,
    FONT,
    2,
  );
  const subFit = shrinkToFitLines(
    wrapTextToLines(
      'Si no convierte, está perdiendo oportunidades.',
      colW,
      38,
      560,
      FONT,
    ),
    colW,
    38,
    REEL.MIN_SUB_PX,
    560,
    FONT,
    3,
  );

  const hl = revealAfter(p, 0.1, 0.18);
  const sub = revealAfter(p, 0.2, 0.18);
  const path = clamp((p - 0.42) / 0.48, 0, 1);
  const spark = easeOut(path);

  const CX = VW / 2;
  const routeY = VH - REEL.SAFE_Y - 320;

  const firstBaseline = REEL.SAFE_Y + 168;
  const lhH = hlFit.size * 1.07;
  const lastHB = firstBaseline + (hlFit.lines.length - 1) * lhH;
  const subBase = lastHB + REEL.HEAD_SUB_GAP + subFit.size;

  return (
    <SheetChrome
      theme="dark"
      p={p}
      sheet="03"
      title="DIAGNÓSTICO"
      code="A.03"
      label="CONVERSIÓN · FRICCIÓN"
      highlight={2}
    >
      <MultilineText
        x={edge}
        yStart={firstBaseline}
        lines={hlFit.lines}
        fontSize={hlFit.size}
        fontWeight={850}
        fill={C.white}
        fontFamily={FONT}
        lineHeight={1.07}
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

      {/* Journey diagram — usuario cae antes del contacto */}
      <g opacity={diagIn} aria-hidden="true">
        <rect
          x={edge}
          y={routeY - 170}
          width={colW}
          height={280}
          rx={22}
          fill="rgba(247,250,255,0.03)"
          stroke="rgba(247,250,255,0.14)"
          strokeWidth={1}
        />

        <text
          x={CX}
          y={routeY - 138}
          fill={C.cyan}
          fontFamily={FONT_MONO}
          fontSize={16}
          fontWeight={800}
          textAnchor="middle"
          letterSpacing={3}
        >
          RECORRIDO ESPERADO
        </text>

        {/* Baseline path */}
        <path
          d={`M ${edge + 70} ${routeY} C ${CX - 120} ${routeY - 70}, ${CX + 120} ${routeY + 40}, ${VW - edge - 70} ${routeY}`}
          fill="none"
          stroke="rgba(247,250,255,0.22)"
          strokeWidth={2}
          strokeDasharray="7 6"
        />

        {/* Active path — se corta */}
        <path
          d={`M ${edge + 70} ${routeY} Q ${CX - 40} ${routeY - 52}, ${CX} ${routeY + 6}`}
          fill="none"
          stroke={C.blue}
          strokeWidth={3.5}
          strokeLinecap="round"
          opacity={spark}
          strokeDasharray={`${420 * spark} 420`}
        />

        {/* “Break” mark */}
        <g opacity={clamp((path - 0.55) * 6, 0, 1)}>
          <circle cx={CX + 18} cy={routeY + 46} r={46} fill="rgba(226,92,92,0.08)" stroke={C.red} strokeWidth={2} />
          <text
            x={CX + 18}
            y={routeY + 54}
            fill={C.red}
            fontFamily={FONT}
            fontSize={22}
            fontWeight={850}
            textAnchor="middle"
          >
            OFF
          </text>
          <text
            x={CX + 18}
            y={routeY + 82}
            fill="rgba(247,250,255,0.55)"
            fontFamily={FONT_MONO}
            fontSize={13}
            fontWeight={700}
            textAnchor="middle"
            letterSpacing={2}
          >
            ABANDONO
          </text>
        </g>

        {/* Labels */}
        <text
          x={edge + 86}
          y={routeY + 74}
          fill={C.white}
          fontFamily={FONT_MONO}
          fontSize={15}
          fontWeight={700}
          letterSpacing={2}
        >
          VISITA
        </text>
        <text
          x={VW - edge - 86}
          y={routeY + 74}
          fill={C.gray}
          fontFamily={FONT_MONO}
          fontSize={15}
          fontWeight={700}
          textAnchor="end"
          letterSpacing={2}
        >
          CONTACTO
        </text>

        <BlueDot x={lerp(edge + 86, CX + 10, easeInOut(clamp(path * 1.35, 0, 1)))} y={routeY - 6} r={8} glow opacity={spark} />
      </g>

      <text
        x={edge}
        y={VH - REEL.SAFE_Y - 56}
        fill={C.cyan}
        fontFamily={FONT_MONO}
        fontSize={17}
        fontWeight={800}
        letterSpacing={2}
        opacity={revealAfter(p, 0.58, 0.14)}
      >
        ARREGLAMOS LA FUNCIÓN ANTES DEL FORMA
      </text>
    </SheetChrome>
  );
}

