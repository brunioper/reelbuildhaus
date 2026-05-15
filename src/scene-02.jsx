// Scene 02 — System Proof (4–6s, light)
// "No usamos plantillas. Construimos sistemas."
// Structural truss diagram: 3 nodes with load vectors + dimensioned.

const S2 = window.SHARED;
const C2 = S2.C;

function Scene02({ p }) {
  const { seg, linseg, lerp, easeOut, clamp,
    SheetChrome, DraftLine, DraftRect, DraftCircle, BlueDot,
    DimLine, FONT, FONT_MONO, VW } = S2;

  const hl1   = seg(p, 0.08, 0.28);
  const hl2   = seg(p, 0.16, 0.36);
  const blue  = seg(p, 0.26, 0.48);
  const nodes = seg(p, 0.34, 0.58);
  const trussLines = seg(p, 0.42, 0.68);
  const loads = seg(p, 0.58, 0.80);
  const dims  = seg(p, 0.68, 0.88);
  const dotP  = clamp((p - 0.55) / 0.42, 0, 1);

  const trussSnap = lerp(0.925, 1, easeOut(nodes));

  // Truss apex + base nodes
  const APEX = [540, 1040];
  const BL   = [220, 1300];
  const BR   = [860, 1300];

  // Dot travels around the truss
  const dotSeg = dotP * 3;
  let [dx, dy] = APEX;
  if (dotSeg <= 1) {
    dx = lerp(APEX[0], BL[0], easeOut(dotSeg));
    dy = lerp(APEX[1], BL[1], easeOut(dotSeg));
  } else if (dotSeg <= 2) {
    dx = lerp(BL[0], BR[0], easeOut(dotSeg - 1));
    dy = lerp(BL[1], BR[1], easeOut(dotSeg - 1));
  } else {
    dx = lerp(BR[0], APEX[0], easeOut(dotSeg - 2));
    dy = lerp(BR[1], APEX[1], easeOut(dotSeg - 2));
  }

  // Node card geometry
  const NW = 220, NH = 92;
  const NodeCard = ({ cx, cy, label, sub, code, opacity }) => (
    <g opacity={opacity}>
      <rect x={cx - NW / 2} y={cy - NH / 2} width={NW} height={NH}
        fill="#FFFFFF" stroke={C2.navy} strokeWidth={1.2} />
      <line x1={cx - NW / 2} y1={cy - NH / 2 + 22}
        x2={cx + NW / 2} y2={cy - NH / 2 + 22}
        stroke={C2.navy} strokeWidth={0.8} opacity={0.4} />
      <text x={cx - NW / 2 + 10} y={cy - NH / 2 + 15}
        fill={C2.blue} fontFamily={FONT_MONO}
        fontSize={9} fontWeight={700} letterSpacing={2}>
        {code}
      </text>
      <text x={cx - NW / 2 + NW - 10} y={cy - NH / 2 + 15}
        fill="rgba(7,29,53,0.4)" fontFamily={FONT_MONO}
        fontSize={9} fontWeight={700} textAnchor="end" letterSpacing={2}>
        NODO
      </text>
      <text x={cx} y={cy + 4} fill={C2.navy} fontFamily={FONT}
        fontSize={22} fontWeight={800} textAnchor="middle" letterSpacing={-0.3}>
        {label}
      </text>
      <text x={cx} y={cy + 26} fill={C2.gray} fontFamily={FONT_MONO}
        fontSize={9} fontWeight={700} textAnchor="middle" letterSpacing={2}>
        {sub}
      </text>
    </g>
  );

  return (
    <SheetChrome theme="light" p={p}
      sheet="02" title="ESTRUCTURA / SISTEMA" code="A.02"
      label="DIAGRAMA · DISEÑO / CÓDIGO / CONVERSIÓN" highlight={1}>

      <text x={90} y={340} fill={C2.navy} fontFamily={FONT}
        fontSize={126} fontWeight={850} letterSpacing={-3}
        opacity={hl1}>
        No usamos
      </text>
      <text x={90} y={476} fill={C2.navy} fontFamily={FONT}
        fontSize={126} fontWeight={850} letterSpacing={-3}
        opacity={hl2}>
        plantillas.
      </text>
      <text x={90} y={584} fill={C2.blue} fontFamily={FONT}
        fontSize={72} fontWeight={750} letterSpacing={-1.5}
        opacity={blue}>
        Construimos sistemas.
      </text>

      <text x={90} y={648} fill={C2.gray} fontFamily={FONT_MONO}
        fontSize={18} fontWeight={700} letterSpacing={3}
        opacity={blue}>
        CADA NODO CARGA PESO
      </text>

      {/* ── TRUSS DIAGRAM — snap-in + cursor ──────────────────────────────── */}
      <g
        transform={`translate(${540}, ${1186}) scale(${trussSnap}) translate(${-540}, ${-1186})`}
      >
      {/* Ground line under truss */}
      <g opacity={nodes * 0.7}>
        <line x1={120} y1={1340} x2={VW - 120} y2={1340}
          stroke={C2.navy} strokeWidth={1} />
        {/* Hatched ground */}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i}
            x1={120 + i * 70} y1={1340}
            x2={120 + i * 70 - 12} y2={1360}
            stroke={C2.navy} strokeWidth={0.6} />
        ))}
      </g>

      {/* Truss support triangles */}
      <g opacity={nodes}>
        {[BL, BR].map(([nx, ny], i) => (
          <g key={i}>
            <path d={`M${nx - 16},${ny + NH / 2 + 14} L${nx + 16},${ny + NH / 2 + 14} L${nx},${ny + NH / 2 - 2} Z`}
              fill="none" stroke={C2.navy} strokeWidth={1} />
          </g>
        ))}
      </g>

      {/* Truss members (cyan construction → ink) */}
      <g>
        <DraftLine x1={APEX[0]} y1={APEX[1] + 4} x2={BL[0]} y2={BL[1] - NH / 2}
          draftP={trussLines} theme="light" strokeWidth={1.4} />
        <DraftLine x1={APEX[0]} y1={APEX[1] + 4} x2={BR[0]} y2={BR[1] - NH / 2}
          draftP={trussLines} theme="light" strokeWidth={1.4} />
        <DraftLine x1={BL[0] + NW / 2} y1={BL[1]} x2={BR[0] - NW / 2} y2={BR[1]}
          draftP={trussLines} theme="light" strokeWidth={1.4} />
        {/* Inner web members for "truss" feel */}
        <DraftLine x1={APEX[0]} y1={APEX[1] + NH / 2} x2={540} y2={1300}
          draftP={trussLines} theme="light" strokeWidth={0.8} dashed />
      </g>

      {/* Nodes */}
      <NodeCard cx={APEX[0]} cy={APEX[1]} label="Diseño"
        sub="VISUAL SYSTEM" code="A" opacity={nodes} />
      <NodeCard cx={BL[0]} cy={BL[1]} label="Código"
        sub="CUSTOM BUILD" code="B" opacity={nodes} />
      <NodeCard cx={BR[0]} cy={BR[1]} label="Conversión"
        sub="UX FLOW" code="C" opacity={nodes} />

      {/* Load vectors at apex */}
      {loads > 0 && (
        <g opacity={loads}>
          {[-1, 0, 1].map((dx2, i) => {
            const xLine = APEX[0] + dx2 * 40;
            return (
              <g key={i}>
                <line x1={xLine} y1={920} x2={xLine} y2={990}
                  stroke={C2.blue} strokeWidth={1.2} />
                <path d={`M${xLine},${990} L${xLine - 5},${982} L${xLine + 5},${982} Z`}
                  fill={C2.blue} />
              </g>
            );
          })}
          <text x={APEX[0]} y={905} fill={C2.blue} fontFamily={FONT_MONO}
            fontSize={10} fontWeight={700} textAnchor="middle" letterSpacing={2}>
            CARGA = USUARIO
          </text>
        </g>
      )}

      {/* Dimensions */}
      {dims > 0 && (
        <g opacity={dims}>
          <DimLine x1={BL[0]} y1={BL[1] + NH / 2 + 18}
            x2={BR[0]} y2={BR[1] + NH / 2 + 18}
            value="640 mm" theme="light" offset={32} side="below" />
          <DimLine x1={BR[0] + NW / 2 + 30} y1={APEX[1] - 4}
            x2={BR[0] + NW / 2 + 30} y2={BR[1] - 4}
            value="260 mm" theme="light" offset={0} />
        </g>
      )}

      {/* Traveling dot */}
      {dotP > 0 && <BlueDot x={dx} y={dy} r={7}
        opacity={easeOut(clamp(dotP * 5, 0, 1))} />}
      </g>

      {/* Bottom annotation */}
      <g opacity={dims}>
        <text x={90} y={1500} fill={C2.gray} fontFamily={FONT_MONO}
          fontSize={18} fontWeight={700} letterSpacing={3}>
          SI FALTA UN NODO, LA ESTRUCTURA SE CAE
        </text>
      </g>
    </SheetChrome>
  );
}

window.Scene02 = Scene02;
