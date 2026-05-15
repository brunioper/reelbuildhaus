// Scene 06 — Recorrido (hold extendido · journey muy legible)

import { SHARED as SH } from '../shared';
import { REEL_LAYOUT as RL } from '../layout-engine';


export function Scene06({ p }: { p: number }) {
  const { C, FONT, FONT_MONO, VW,
    lerp, easeOut, clamp,
    SheetChrome, BlueDot, DimLine } = SH;

  const { revealAfter } = RL;

  const hl1 = revealAfter(p, 0.04, 0.14);
  const hl2 = revealAfter(p, 0.12, 0.15);
  const sub = revealAfter(p, 0.22, 0.16);
  const journeyOp = revealAfter(p, 0.32, 0.18);
  const planP = revealAfter(p, 0.38, 0.18);
  const roomsP = revealAfter(p, 0.46, 0.16);
  const doorsP = revealAfter(p, 0.54, 0.14);
  const flowP = clamp((p - 0.52) / 0.38, 0, 1);
  const annot = revealAfter(p, 0.78, 0.14);

  const PX = 92;
  const PY = 1008;
  const PW = VW - 184;
  const PH = 540;
  const CX = VW / 2;
  const JY = 662;

  const ROOMS = [
    { x: 0, y: 0, w: 220, h: 260, label: 'Llega', sub: 'Impacto', door: { side: 'right', at: 132 } },
    { x: 220, y: 0, w: 220, h: 260, label: 'Entiende', sub: 'Claridad', door: { side: 'right', at: 132 } },
    { x: 440, y: 0, w: 220, h: 260, label: 'Confía', sub: 'Prueba', door: { side: 'right', at: 132 } },
    { x: 660, y: 0, w: 220, h: 260, label: 'Contacta', sub: 'Acción', door: null },
  ];

  const ANNEX = [
    { x: 220, y: 260, w: 220, h: 190, label: 'FAQ', sub: 'Objeciones' },
    { x: 440, y: 260, w: 220, h: 190, label: 'Casos', sub: 'Portfolio' },
  ];

  const Door = ({ x, y }) => (
    <g opacity={doorsP}>
      <line x1={x} y1={y - 14} x2={x} y2={y + 14} stroke="#F4F6FB" strokeWidth={2.5} />
      <path
        d={`M${x},${y - 14} A28,28 0 0 1 ${x + 28},${y + 14}`}
        fill="none"
        stroke={C.gray}
        strokeWidth={0.8}
        opacity={0.7}
      />
      <line x1={x} y1={y - 14} x2={x + 28} y2={y - 14} stroke={C.gray} strokeWidth={1} />
    </g>
  );

  const flow = easeOut(flowP);
  const totalW = 880;
  const startX = PX + 110;
  const dotX = startX + totalW * flow;
  const dotY = PY + 132;

  const jMid = JY + 21;
  const journeySnap = lerp(1.048, 1, easeOut(Math.min(journeyOp * 1.25, 1)));

  return (
    <SheetChrome
      theme="light"
      p={p}
      sheet="06"
      title="RECORRIDO"
      code="A.06"
      label="PLANO DE FLUJO · USUARIO"
      highlight={2}
    >
      <text x={92} y={334} fill={C.navy} fontFamily={FONT}
        fontSize={118} fontWeight={850} letterSpacing={-3}
        opacity={hl1}>
        Diseñamos
      </text>
      <text x={92} y={458} fill={C.navy} fontFamily={FONT}
        fontSize={118} fontWeight={850} letterSpacing={-3}
        opacity={hl2}>
        el recorrido.
      </text>
      <text x={92} y={548} fill={C.gray} fontFamily={FONT}
        fontSize={38} fontWeight={520} letterSpacing={-0.4}
        opacity={sub}>
        De la primera impresión al contacto.
      </text>

      {/* Journey hero — snap-in scale + muy legible */}
      <g
        opacity={journeyOp}
        transform={`translate(${CX}, ${jMid}) scale(${journeySnap}) translate(${-CX}, ${-jMid})`}
      >
        <text
          x={CX}
          y={JY}
          fill={C.navy}
          fontFamily={FONT}
          fontSize={46}
          fontWeight={850}
          textAnchor="middle"
          letterSpacing={-0.5}
        >
          Llega → Entiende → Confía → Contacta
        </text>
        <text x={CX} y={JY + 42} fill={C.blue} fontFamily={FONT_MONO}
          fontSize={17} fontWeight={700} letterSpacing={3}
          textAnchor="middle"
          opacity={0.95}>
          UNA SOLA LÍNEA · UN SOLO OBJETIVO
        </text>
      </g>

      <g opacity={planP}>
        <rect x={PX} y={PY} width={PW} height={PH}
          fill="#FFFFFF" stroke={C.navy} strokeWidth={2.5} rx={4} />
        <rect x={PX + 4} y={PY + 4} width={PW - 8} height={PH - 8}
          fill="none" stroke={C.navy} strokeWidth={0.6} opacity={0.28} />
      </g>

      {roomsP > 0 &&
        ROOMS.map((r, i) => (
          <g key={i} opacity={roomsP}>
            <rect x={PX + r.x} y={PY + r.y} width={r.w} height={r.h}
              fill="none" stroke={C.navy} strokeWidth={1.2} />
            <text x={PX + r.x + r.w / 2} y={PY + r.y + 52} fill={C.navy}
              fontFamily={FONT} fontSize={26} fontWeight={850}
              textAnchor="middle" letterSpacing={-0.2}>
              {r.label}
            </text>
            <text x={PX + r.x + r.w / 2} y={PY + r.y + 82} fill={C.gray}
              fontFamily={FONT_MONO} fontSize={13} fontWeight={700}
              textAnchor="middle" letterSpacing={2}>
              {r.sub}
            </text>
            <text x={PX + r.x + 14} y={PY + r.y + 22} fill={C.blue}
              fontFamily={FONT_MONO} fontSize={11} fontWeight={800} letterSpacing={2}>
              {`0${i + 1}`}
            </text>
          </g>
        ))}

      {roomsP > 0 &&
        ANNEX.map((r, i) => (
          <g key={i} opacity={roomsP * 0.62}>
            <rect x={PX + r.x} y={PY + r.y} width={r.w} height={r.h}
              fill="rgba(7,29,53,0.03)" stroke={C.navy} strokeWidth={0.8}
              strokeDasharray="4 3" />
            <text x={PX + r.x + r.w / 2} y={PY + r.y + 98} fill={C.gray}
              fontFamily={FONT} fontSize={17} fontWeight={750}
              textAnchor="middle">
              {r.label}
            </text>
          </g>
        ))}

      {ROOMS.slice(0, 3).map((r, i) => (
        <Door key={i} x={PX + r.x + r.w} y={PY + r.door.at} />
      ))}

      <g opacity={doorsP}>
        <path d={`M${PX - 40},${PY + 132} L${PX - 6},${PY + 132}`}
          stroke={C.blue} strokeWidth={1.6} />
        <path d={`M${PX - 6},${PY + 132} l-10,-6 l0,12 z`} fill={C.blue} />
        <text x={PX - 42} y={PY + 118} fill={C.blue} fontFamily={FONT_MONO}
          fontSize={11} fontWeight={700} letterSpacing={2}>
          ENTRADA
        </text>
      </g>

      {flowP > 0 && (
        <g>
          <path d={`M${startX},${PY + 132} L${PX + 880 - 20},${PY + 132}`}
            stroke={C.blue} strokeWidth={1.2} strokeDasharray="5 5" opacity={0.55} />
          {[0.25, 0.5, 0.75].map((t, i) => (
            <circle key={i} cx={lerp(startX, PX + 880 - 20, t)} cy={PY + 132}
              r={3} fill={C.blue} opacity={0.55} />
          ))}
        </g>
      )}

      {flowP > 0 && (
        <BlueDot x={dotX} y={dotY} r={9} opacity={clamp(flowP * 4.2, 0, 1)} glow />
      )}

      {flowP > 0.78 && (
        <g opacity={easeOut(clamp((flowP - 0.78) / 0.22, 0, 1))}>
          <rect x={PX + 698} y={PY + 102} width={164} height={58}
            rx={29} fill={C.blue} />
          <text x={PX + 780} y={PY + 138} fill={C.white}
            fontFamily={FONT} fontSize={15} fontWeight={780}
            textAnchor="middle" letterSpacing={1.2}>
            CONTACTO →
          </text>
        </g>
      )}

      <g opacity={annot}>
        <DimLine x1={PX} y1={PY - 28} x2={PX + PW} y2={PY - 28}
          value="FLUJO · 4 PASOS" theme="light" offset={0} />
      </g>
    </SheetChrome>
  );
}

