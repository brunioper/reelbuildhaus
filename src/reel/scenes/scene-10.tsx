// Scene 10 — Conversion (23–25.5s, light)
// "Optimizamos para convertir." — path with grade markers, leading to CTA reveal.

import { SHARED as SH } from '../shared';


export function Scene10({ p }: { p: number }) {
  const { C, FONT, FONT_MONO, VW,
    seg, lerp, easeOut, clamp,
    SheetChrome, BlueDot, DimLine } = SH;

  const hl1   = seg(p, 0.08, 0.28);
  const hl2   = seg(p, 0.16, 0.36);
  const sub   = seg(p, 0.26, 0.46);
  const pathP = seg(p, 0.32, 0.54);
  const nodesP = seg(p, 0.38, 0.58);
  const dotP  = clamp((p - 0.44) / 0.42, 0, 1);
  const ctaEx = seg(p, 0.80, 0.96);
  const stamp = seg(p, 0.86, 0.99);

  const NX = [150, 410, 670, 920];
  const NY = 1280;
  const NR = 56;

  const STEPS = [
    { label: 'VISITA',    sub: 'Tráfico' },
    { label: 'CLARIDAD',  sub: 'Mensaje' },
    { label: 'CONFIANZA', sub: 'Prueba' },
    { label: 'CONTACTO',  sub: 'Acción' },
  ];

  const dotX = lerp(NX[0], NX[3], easeOut(dotP));
  const nodeActive = (nx) => clamp((dotX - nx + NR) / (NR * 2), 0, 1);

  // CTA pill animation
  const ctaW = lerp(NR * 2, 360, easeOut(ctaEx));
  const ctaH = lerp(NR * 2, 72, easeOut(ctaEx));
  const ctaX = NX[3] - ctaW / 2;
  const ctaY = NY - ctaH / 2;

  return (
    <SheetChrome theme="light" p={p}
      sheet="10" title="CONVERSIÓN / GRADE" code="A.10"
      label="USER → LEAD · GRADE PROFILE" highlight={3}>

      <text x={90} y={340} fill={C.navy} fontFamily={FONT}
        fontSize={116} fontWeight={850} letterSpacing={-2.5}
        opacity={hl1}>
        Optimizamos
      </text>
      <text x={90} y={464} fill={C.navy} fontFamily={FONT}
        fontSize={116} fontWeight={850} letterSpacing={-2.5}
        opacity={hl2}>
        para convertir.
      </text>
      <text x={90} y={552} fill={C.gray} fontFamily={FONT}
        fontSize={36} fontWeight={500} letterSpacing={-0.4}
        opacity={sub}>
        Claridad, velocidad y llamados a la acción.
      </text>
      <text x={90} y={596} fill={C.blue} fontFamily={FONT_MONO}
        fontSize={18} fontWeight={700} letterSpacing={3}
        opacity={sub}>
        CONVERSION GRADE · 4 STATIONS
      </text>

      {/* Path baseline */}
      <g opacity={pathP}>
        <line x1={NX[0]} y1={NY} x2={NX[3]} y2={NY}
          stroke={C.navy} strokeWidth={1.4} />
        {/* Hatched terrain underneath */}
        {Array.from({ length: 18 }, (_, i) => (
          <line key={i}
            x1={NX[0] + i * 50} y1={NY + 12}
            x2={NX[0] + i * 50 - 10} y2={NY + 28}
            stroke="rgba(7,29,53,0.30)" strokeWidth={0.6} />
        ))}
        <line x1={NX[0]} y1={NY + 12} x2={NX[3]} y2={NY + 12}
          stroke={C.navy} strokeWidth={0.6} />
      </g>

      {/* Stations / chainage labels at intervals */}
      <g opacity={pathP * 0.75}>
        {[0, 1, 2, 3].map(i => (
          <g key={i}>
            <line x1={NX[i]} y1={NY + 32} x2={NX[i]} y2={NY + 50}
              stroke={C.gray} strokeWidth={0.8} />
            <text x={NX[i]} y={NY + 66} fill={C.gray}
              fontFamily={FONT_MONO} fontSize={9} fontWeight={700}
              textAnchor="middle" letterSpacing={1.5}>
              {`STA ${i}+00`}
            </text>
          </g>
        ))}
      </g>

      {/* First 3 nodes */}
      {STEPS.slice(0, 3).map((s, i) => {
        const active = nodeActive(NX[i]);
        return (
          <g key={i} opacity={nodesP}>
            <circle cx={NX[i]} cy={NY} r={NR}
              fill={active > 0.5 ? 'rgba(36,107,255,0.08)' : '#FFFFFF'}
              stroke={active > 0.5 ? C.blue : C.navy}
              strokeWidth={active > 0.5 ? 2 : 1.2} />
            <circle cx={NX[i]} cy={NY} r={NR - 8}
              fill="none"
              stroke={active > 0.5 ? 'rgba(36,107,255,0.30)' : 'rgba(7,29,53,0.15)'}
              strokeWidth={0.6} strokeDasharray="3 3" />
            <text x={NX[i]} y={NY - 4} fill={active > 0.5 ? C.blue : C.navy}
              fontFamily={FONT} fontSize={12} fontWeight={800}
              textAnchor="middle" letterSpacing={1.5}>
              {s.label}
            </text>
            <text x={NX[i]} y={NY + 12} fill={C.gray}
              fontFamily={FONT_MONO} fontSize={9} fontWeight={700}
              textAnchor="middle" letterSpacing={2}>
              {s.sub.toUpperCase()}
            </text>
            <text x={NX[i]} y={NY - NR - 14} fill={C.cyan}
              fontFamily={FONT_MONO} fontSize={10} fontWeight={800}
              textAnchor="middle" letterSpacing={2}>
              {`0${i + 1}`}
            </text>
          </g>
        );
      })}

      {/* CTA pill / last node */}
      <g opacity={nodesP}>
        {ctaEx < 0.3 ? (
          <g>
            <circle cx={NX[3]} cy={NY} r={NR}
              fill={nodeActive(NX[3]) > 0.5 ? C.blue : '#fff'}
              stroke={nodeActive(NX[3]) > 0.5 ? C.blue : C.navy}
              strokeWidth={nodeActive(NX[3]) > 0.5 ? 2.5 : 1.2} />
            <text x={NX[3]} y={NY - 4}
              fill={nodeActive(NX[3]) > 0.5 ? '#fff' : C.navy}
              fontFamily={FONT} fontSize={12} fontWeight={800}
              textAnchor="middle" letterSpacing={1.5}>
              {STEPS[3].label}
            </text>
            <text x={NX[3]} y={NY + 12}
              fill={nodeActive(NX[3]) > 0.5 ? 'rgba(255,255,255,0.7)' : C.gray}
              fontFamily={FONT_MONO} fontSize={9} fontWeight={700}
              textAnchor="middle" letterSpacing={2}>
              {STEPS[3].sub.toUpperCase()}
            </text>
          </g>
        ) : (
          <g>
            <rect x={ctaX} y={ctaY} width={ctaW} height={ctaH}
              rx={ctaH / 2} fill={C.blue} />
            <text x={NX[3]} y={NY + 6} fill={C.white}
              fontFamily={FONT} fontSize={16} fontWeight={700}
              textAnchor="middle" letterSpacing={2}
              opacity={easeOut(clamp((ctaEx - 0.3) / 0.5, 0, 1))}>
              AGENDÁ UN BRIEF →
            </text>
          </g>
        )}
        <text x={NX[3]} y={NY - NR - 14} fill={C.cyan}
          fontFamily={FONT_MONO} fontSize={10} fontWeight={800}
          textAnchor="middle" letterSpacing={2}>
          04 / LEAD
        </text>
      </g>

      {/* Grade arrow showing rise toward CTA */}
      <g opacity={pathP * 0.5}>
        <path d={`M${NX[0]} ${NY + 100} Q${(NX[0] + NX[3]) / 2} ${NY + 80}, ${NX[3]} ${NY + 50}`}
          fill="none" stroke={C.blue} strokeWidth={1} strokeDasharray="6 4" />
        <text x={(NX[0] + NX[3]) / 2} y={NY + 110} fill={C.blue}
          fontFamily={FONT_MONO} fontSize={10} fontWeight={700}
          textAnchor="middle" letterSpacing={2}>
          GRADE ↗ +3%
        </text>
      </g>

      {/* Total dim line */}
      <g opacity={pathP}>
        <DimLine x1={NX[0]} y1={NY + 150} x2={NX[3]} y2={NY + 150}
          value="REEL = 1 LEAD" theme="light" offset={0} />
      </g>

      {/* Blue dot traveling */}
      {dotP > 0 && dotP < 0.97 && (
        <BlueDot x={dotX} y={NY} r={9}
          opacity={clamp(dotP * 5, 0, 1)} glow />
      )}

      {/* Approved stamp on top of CTA when complete */}
      {stamp > 0 && (
        <g opacity={stamp} transform={`translate(${NX[3] + 220},${NY - 100}) rotate(12)`}>
          <rect x={-90} y={-28} width={180} height={56}
            fill="none" stroke="rgba(36,107,255,0.55)" strokeWidth={1.5} />
          <rect x={-84} y={-22} width={168} height={44}
            fill="none" stroke="rgba(36,107,255,0.30)" strokeWidth={0.6} />
          <text x={0} y={-2} fill={C.blue} fontFamily={FONT}
            fontSize={16} fontWeight={850} textAnchor="middle" letterSpacing={2}>
            CONVERSIÓN ACTIVA
          </text>
          <text x={0} y={18} fill={C.blue} fontFamily={FONT_MONO}
            fontSize={9} fontWeight={700} textAnchor="middle" letterSpacing={2}>
            STA 3+00 · 23·05·2026
          </text>
        </g>
      )}


    </SheetChrome>
  );
}

