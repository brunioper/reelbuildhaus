// Scene 06 — User Journey (13–15.5s, light)
// "Diseñamos el recorrido." — floor plan with circulation flow.

const S6 = window.SHARED;

function Scene06({ p }) {
  const { C, FONT, FONT_MONO, VW,
    seg, lerp, easeOut, clamp,
    SheetChrome, DraftLine, BlueDot, DimLine } = S6;

  const hl1   = seg(p, 0.08, 0.28);
  const hl2   = seg(p, 0.16, 0.36);
  const sub   = seg(p, 0.26, 0.46);
  const planP = seg(p, 0.34, 0.54);
  const roomsP = seg(p, 0.42, 0.62);
  const doorsP = seg(p, 0.50, 0.66);
  const flowP = clamp((p - 0.54) / 0.40, 0, 1);
  const annot = seg(p, 0.84, 0.96);

  // Floor plan area
  const PX = 100, PY = 1050, PW = VW - 200, PH = 560;

  // Rooms (4 rooms left-to-right, with circulation arrow path)
  const ROOMS = [
    { x: 0,    y: 0,   w: 220, h: 280, label: 'Llega',    sub: 'Primera impresión', door: { side: 'right', at: 140 } },
    { x: 220,  y: 0,   w: 220, h: 280, label: 'Entiende', sub: 'Claridad', door: { side: 'right', at: 140 } },
    { x: 440,  y: 0,   w: 220, h: 280, label: 'Confía',   sub: 'Prueba social', door: { side: 'right', at: 140 } },
    { x: 660,  y: 0,   w: 220, h: 280, label: 'Contacta', sub: 'CTA final', door: null },
  ];

  // Lower rooms (annex: alternate paths)
  const ANNEX = [
    { x: 220, y: 280, w: 220, h: 200, label: 'FAQ',     sub: 'Objeciones' },
    { x: 440, y: 280, w: 220, h: 200, label: 'CASOS',   sub: 'Trabajo' },
  ];

  // Door symbol
  const Door = ({ x, y, side }) => {
    const a = side === 'right' ? `M${x},${y - 14} L${x},${y + 14}` : `M${x},${y - 14} L${x},${y + 14}`;
    return (
      <g opacity={doorsP}>
        {/* Gap in wall */}
        <line x1={x} y1={y - 14} x2={x} y2={y + 14}
          stroke="#F4F6FB" strokeWidth={2.5} />
        {/* Door arc */}
        <path d={`M${x},${y - 14} A28,28 0 0 1 ${x + 28},${y + 14}`}
          fill="none" stroke={C.gray} strokeWidth={0.8} opacity={0.7} />
        <line x1={x} y1={y - 14} x2={x + 28} y2={y - 14}
          stroke={C.gray} strokeWidth={1} />
      </g>
    );
  };

  // Flow dot position along path
  const flow = easeOut(flowP);
  // Path: traverses 4 rooms left-to-right at y = 140 (center of upper row)
  const totalW = 880;
  const startX = PX + 110;
  const dotX = startX + totalW * flow;
  const dotY = PY + 140;

  return (
    <SheetChrome theme="light" p={p}
      sheet="06" title="RECORRIDO / FLOOR PLAN" code="A.06"
      label="USER CIRCULATION — PLAN VIEW" highlight={5}>

      <text x={90} y={340} fill={C.navy} fontFamily={FONT}
        fontSize={120} fontWeight={850} letterSpacing={-3}
        opacity={hl1}>
        Diseñamos
      </text>
      <text x={90} y={468} fill={C.navy} fontFamily={FONT}
        fontSize={120} fontWeight={850} letterSpacing={-3}
        opacity={hl2}>
        el recorrido.
      </text>
      <text x={90} y={564} fill={C.gray} fontFamily={FONT}
        fontSize={36} fontWeight={500} letterSpacing={-0.4}
        opacity={sub}>
        De la primera impresión al contacto.
      </text>
      <text x={90} y={608} fill={C.blue} fontFamily={FONT_MONO}
        fontSize={18} fontWeight={700} letterSpacing={3}
        opacity={sub}>
        PLAN VIEW · CIRCULATION
      </text>

      {/* Plan outer wall (thicker stroke) */}
      <g opacity={planP}>
        <rect x={PX} y={PY} width={PW} height={PH}
          fill="#FFFFFF" stroke={C.navy} strokeWidth={2.5} />
        {/* Inner trim */}
        <rect x={PX + 4} y={PY + 4} width={PW - 8} height={PH - 8}
          fill="none" stroke={C.navy} strokeWidth={0.6} opacity={0.3} />
      </g>

      {/* Rooms — interior walls */}
      {roomsP > 0 && ROOMS.map((r, i) => (
        <g key={i} opacity={roomsP}>
          <rect x={PX + r.x} y={PY + r.y} width={r.w} height={r.h}
            fill="none" stroke={C.navy} strokeWidth={1.2} />
          {/* Room label */}
          <text x={PX + r.x + r.w / 2} y={PY + r.y + 50} fill={C.navy}
            fontFamily={FONT} fontSize={20} fontWeight={800}
            textAnchor="middle" letterSpacing={1.5}>
            {r.label}
          </text>
          <text x={PX + r.x + r.w / 2} y={PY + r.y + 70} fill={C.gray}
            fontFamily={FONT_MONO} fontSize={10} fontWeight={700}
            textAnchor="middle" letterSpacing={2}>
            {r.sub}
          </text>
          {/* Room number */}
          <text x={PX + r.x + 12} y={PY + r.y + 18} fill={C.blue}
            fontFamily={FONT_MONO} fontSize={9} fontWeight={800} letterSpacing={2}>
            R0{i + 1}
          </text>
          {/* Floor area marker (small) */}
          <text x={PX + r.x + r.w - 12} y={PY + r.y + 18} fill="rgba(7,29,53,0.4)"
            fontFamily={FONT_MONO} fontSize={9} fontWeight={600}
            textAnchor="end" letterSpacing={1}>
            12.5m²
          </text>
        </g>
      ))}

      {/* Annex rooms (lower) */}
      {roomsP > 0 && ANNEX.map((r, i) => (
        <g key={i} opacity={roomsP * 0.65}>
          <rect x={PX + r.x} y={PY + r.y} width={r.w} height={r.h}
            fill="rgba(7,29,53,0.03)" stroke={C.navy} strokeWidth={0.8}
            strokeDasharray="4 3" />
          <text x={PX + r.x + r.w / 2} y={PY + r.y + 100} fill={C.gray}
            fontFamily={FONT} fontSize={16} fontWeight={700}
            textAnchor="middle" letterSpacing={1.5}>
            {r.label}
          </text>
          <text x={PX + r.x + r.w / 2} y={PY + r.y + 120} fill={C.gray}
            fontFamily={FONT_MONO} fontSize={9} fontWeight={600}
            textAnchor="middle" letterSpacing={1.5}>
            {r.sub}
          </text>
        </g>
      ))}

      {/* Doors between rooms */}
      {ROOMS.slice(0, 3).map((r, i) => (
        <Door key={i} x={PX + r.x + r.w} y={PY + r.door.at} side="right" />
      ))}

      {/* Entry arrow (left of plan) */}
      <g opacity={doorsP}>
        <path d={`M${PX - 40},${PY + 140} L${PX - 6},${PY + 140}`}
          stroke={C.blue} strokeWidth={1.5} />
        <path d={`M${PX - 6},${PY + 140} l-10,-6 l0,12 z`} fill={C.blue} />
        <text x={PX - 40} y={PY + 124} fill={C.blue} fontFamily={FONT_MONO}
          fontSize={9} fontWeight={700} letterSpacing={2}>
          ENTRADA
        </text>
      </g>

      {/* Circulation path (dashed) */}
      {flowP > 0 && (
        <g>
          <path d={`M${startX},${PY + 140} L${PX + 880 - 20},${PY + 140}`}
            stroke={C.blue} strokeWidth={1} strokeDasharray="4 4" opacity={0.6} />
          {/* Step markers along path */}
          {[0.25, 0.50, 0.75].map((t, i) => (
            <circle key={i} cx={lerp(startX, PX + 880 - 20, t)} cy={PY + 140}
              r={2} fill={C.blue} opacity={0.6} />
          ))}
        </g>
      )}

      {/* Travelling user dot */}
      {flowP > 0 && <BlueDot x={dotX} y={dotY} r={8}
        opacity={clamp(flowP * 5, 0, 1)} glow />}

      {/* Exit pill at right (CONTACTA) */}
      {flowP > 0.8 && (
        <g opacity={easeOut(clamp((flowP - 0.8) / 0.2, 0, 1))}>
          <rect x={PX + 700} y={PY + 110} width={150} height={60}
            rx={30} fill={C.blue} />
          <text x={PX + 775} y={PY + 145} fill={C.white}
            fontFamily={FONT} fontSize={13} fontWeight={700}
            textAnchor="middle" letterSpacing={1.5}>
            BRIEF →
          </text>
        </g>
      )}

      {/* Dimensions */}
      <g opacity={annot}>
        <DimLine x1={PX} y1={PY - 30} x2={PX + PW} y2={PY - 30}
          value="44.0 m" theme="light" offset={0} />
      </g>


    </SheetChrome>
  );
}

window.Scene06 = Scene06;
