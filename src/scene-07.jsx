// Scene 07 — Wireframe (15.5–18s, dark)
// "Desarrollamos la experiencia." — architectural SECTION (cutaway) of a website.
// Floors stacked vertically with dimension lines and hatching on the cut walls.

const S7 = window.SHARED;

function Scene07({ p }) {
  const { C, FONT, FONT_MONO, VW,
    seg, lerp, easeOut, clamp,
    SheetChrome, DraftLine, DraftRect, DimLine, DetailBubble } = S7;

  const hl1   = seg(p, 0.08, 0.28);
  const hl2   = seg(p, 0.16, 0.36);
  const sub   = seg(p, 0.26, 0.46);
  const frame = seg(p, 0.34, 0.54);
  const sA    = seg(p, 0.42, 0.58);
  const sB    = seg(p, 0.48, 0.64);
  const sC    = seg(p, 0.54, 0.70);
  const sD    = seg(p, 0.60, 0.74);
  const sE    = seg(p, 0.66, 0.80);
  const dims  = seg(p, 0.74, 0.90);
  const annot = seg(p, 0.84, 0.96);
  const polish = easeOut(clamp((p - 0.46) / 0.44, 0, 1));

  // Section frame — sized to clear the bottom title block.
  const FX = 130, FY = 920, FW = VW - 260, FH = 760;

  // Levels (sections within frame)
  const SECTIONS = [
    { y0: 0,   h: 80,  label: 'A',  name: 'NAV',      sub: 'identidad · navegación',           o: () => sA },
    { y0: 80,  h: 220, label: 'B',  name: 'HERO',     sub: 'propuesta · primer CTA',           o: () => sB },
    { y0: 300, h: 200, label: 'C',  name: 'SERVICES', sub: '3 cards · jerarquía',              o: () => sC },
    { y0: 500, h: 140, label: 'D',  name: 'PROOF',    sub: 'testimonios · casos',              o: () => sD },
    { y0: 640, h: 120, label: 'E',  name: 'CTA',      sub: 'cierre · brief',                   o: () => sE },
  ];

  return (
    <SheetChrome theme="dark" p={p}
      sheet="07" title="WIREFRAME / SECTION" code="A.07"
      label="WEB SECTION — A–A' · LAYER STACK" highlight={0}>

      <text x={90} y={340} fill={C.white} fontFamily={FONT}
        fontSize={116} fontWeight={850} letterSpacing={-2.5}
        opacity={hl1}>
        Desarrollamos
      </text>
      <text x={90} y={464} fill={C.white} fontFamily={FONT}
        fontSize={116} fontWeight={850} letterSpacing={-2.5}
        opacity={hl2}>
        la experiencia.
      </text>
      <text x={90} y={552} fill={C.gray} fontFamily={FONT}
        fontSize={36} fontWeight={500} letterSpacing={-0.4}
        opacity={sub}>
        Secciones, interacción y movimiento con propósito.
      </text>
      <text x={90} y={596} fill={C.blue} fontFamily={FONT_MONO}
        fontSize={18} fontWeight={700} letterSpacing={3}
        opacity={sub}>
        SECTION A–A' · 5 LAYERS
      </text>

      {/* Outer frame */}
      <g opacity={frame}>
        <rect x={FX} y={FY} width={FW} height={FH}
          fill="rgba(247,250,255,0.03)"
          stroke={C.white} strokeWidth={1.5} />
        {/* Inner trim */}
        <rect x={FX + 4} y={FY + 4} width={FW - 8} height={FH - 8}
          fill="none" stroke="rgba(247,250,255,0.20)" strokeWidth={0.6} />

        {/* Cut wall hatching on left edge */}
        <rect x={FX - 18} y={FY} width={18} height={FH} fill="url(#hatch-dark)" opacity={0.7} />
        <line x1={FX - 18} y1={FY} x2={FX - 18} y2={FY + FH}
          stroke="rgba(247,250,255,0.55)" strokeWidth={1} />
      </g>

      {/* Sections (floors of the website) */}
      {SECTIONS.map((s, i) => {
        const o = s.o();
        const y = FY + s.y0;
        return (
          <g key={i} opacity={o}>
            {/* Floor slab line */}
            {i > 0 && (
              <line x1={FX} y1={y} x2={FX + FW} y2={y}
                stroke="rgba(247,250,255,0.55)" strokeWidth={1} />
            )}

            {/* Section letter on cut wall */}
            <rect x={FX - 50} y={y + s.h / 2 - 14} width={28} height={28}
              fill={C.navy} stroke="rgba(247,250,255,0.55)" strokeWidth={0.8} />
            <text x={FX - 36} y={y + s.h / 2 + 4} fill={C.white}
              fontFamily={FONT_MONO} fontSize={13} fontWeight={800}
              textAnchor="middle">
              {s.label}
            </text>

            {/* Section name + sub */}
            <text x={FX + 16} y={y + 22} fill={C.cyan}
              fontFamily={FONT_MONO} fontSize={10} fontWeight={800} letterSpacing={2}>
              {`${s.label} / ${s.name}`}
            </text>
            <text x={FX + FW - 16} y={y + 22} fill="rgba(247,250,255,0.4)"
              fontFamily={FONT_MONO} fontSize={9} fontWeight={600}
              textAnchor="end" letterSpacing={1.5}>
              {s.sub}
            </text>

            {/* Section content sketch */}
            {i === 0 && /* NAV */ (
              <g>
                <g opacity={1 - polish * 0.92}>
                  <text x={FX + 16} y={y + 60} fill="rgba(247,250,255,0.85)"
                    fontFamily={FONT} fontSize={16} fontWeight={800} letterSpacing={2}>
                    BUILD HAUS
                  </text>
                  {['Servicios', 'Trabajo', 'Contacto'].map((t, j) => (
                    <text key={j} x={FX + FW - 16 - j * 90} y={y + 60}
                      fill="rgba(247,250,255,0.45)" fontFamily={FONT}
                      fontSize={12} textAnchor="end" fontWeight={500}>
                      {t}
                    </text>
                  ))}
                </g>
                <g opacity={polish}>
                  <rect x={FX + 12} y={y + 42} width={FW - 24} height={30}
                    rx={10} fill="rgba(36,107,255,0.12)" stroke="rgba(63,181,255,0.35)" strokeWidth={1} />
                  <text x={FX + 28} y={y + 62} fill={C.white}
                    fontFamily={FONT} fontSize={15} fontWeight={850} letterSpacing={2}>
                    BUILD HAUS
                  </text>
                  {['Servicios', 'Trabajo', 'Contacto'].map((t, j) => (
                    <text key={j} x={FX + FW - 20 - j * 92} y={y + 62}
                      fill="rgba(247,250,255,0.72)" fontFamily={FONT}
                      fontSize={12} textAnchor="end" fontWeight={600}>
                      {t}
                    </text>
                  ))}
                </g>
              </g>
            )}
            {i === 1 && /* HERO */ (
              <g>
                <g opacity={1 - polish * 0.9}>
                <rect x={FX + 16} y={y + 50} width={300} height={22}
                  fill="rgba(247,250,255,0.25)" />
                <rect x={FX + 16} y={y + 78} width={240} height={22}
                  fill="rgba(247,250,255,0.16)" />
                <rect x={FX + 16} y={y + 112} width={140} height={12}
                  fill="rgba(247,250,255,0.12)" />
                <rect x={FX + 16} y={y + 128} width={180} height={12}
                  fill="rgba(247,250,255,0.10)" />
                <rect x={FX + 16} y={y + 160} width={140} height={36}
                  rx={18} fill={C.blue} />
                <text x={FX + 86} y={y + 183} fill={C.white} fontFamily={FONT}
                  fontSize={11} fontWeight={700} textAnchor="middle" letterSpacing={1.5}>
                  BRIEF →
                </text>
                {/* image placeholder */}
                <rect x={FX + FW / 2 + 20} y={y + 40} width={FW / 2 - 36} height={160}
                  fill="rgba(63,181,255,0.06)" stroke="rgba(247,250,255,0.15)" strokeWidth={0.8} />
                <line x1={FX + FW / 2 + 20} y1={y + 40}
                  x2={FX + FW - 16} y2={y + 200}
                  stroke="rgba(247,250,255,0.10)" strokeWidth={0.6} />
                <line x1={FX + FW - 16} y1={y + 40}
                  x2={FX + FW / 2 + 20} y2={y + 200}
                  stroke="rgba(247,250,255,0.10)" strokeWidth={0.6} />
                <text x={FX + FW * 0.75} y={y + 120}
                  fill="rgba(247,250,255,0.20)" fontFamily={FONT_MONO}
                  fontSize={9} fontWeight={700} textAnchor="middle" letterSpacing={2}>
                  IMG / HERO
                </text>
                </g>
                <g opacity={polish}>
                  <rect x={FX + 18} y={y + 52} width={280} height={24} rx={10} fill="rgba(247,250,255,0.18)" />
                  <rect x={FX + 18} y={y + 82} width={220} height={20} rx={8} fill="rgba(247,250,255,0.12)" />
                  <rect x={FX + 18} y={y + 156} width={150} height={36} rx={18} fill={C.blue} opacity={0.92} />
                  <text x={FX + 93} y={y + 180} fill={C.white} fontFamily={FONT}
                    fontSize={12} fontWeight={750} textAnchor="middle" letterSpacing={1.4}>
                    Brief →
                  </text>
                  <rect x={FX + FW / 2 + 18} y={y + 48} width={FW / 2 - 36} height={176}
                    rx={14} fill="rgba(63,181,255,0.10)" stroke="rgba(247,250,255,0.16)" strokeWidth={1} />
                </g>
              </g>
            )}
            {i === 2 && /* SERVICES */ (
              <g>
                {[0, 1, 2].map(j => {
                  const cw = (FW - 32 - 24) / 3;
                  const cx = FX + 16 + j * (cw + 12);
                  return (
                    <g key={j}>
                      <rect x={cx} y={y + 50} width={cw} height={132}
                        fill="rgba(247,250,255,0.04)"
                        stroke="rgba(247,250,255,0.15)" strokeWidth={0.8} />
                      <circle cx={cx + 18} cy={y + 70} r={8}
                        fill="none" stroke={C.cyan} strokeWidth={1} />
                      <text x={cx + 14} y={y + 88} fill={C.cyan}
                        fontFamily={FONT_MONO} fontSize={9} fontWeight={800} letterSpacing={1.5}>
                        0{j + 1}
                      </text>
                      <rect x={cx + 12} y={y + 100} width={90} height={10}
                        fill="rgba(247,250,255,0.25)" />
                      <rect x={cx + 12} y={y + 116} width={cw - 24} height={6}
                        fill="rgba(247,250,255,0.12)" />
                      <rect x={cx + 12} y={y + 128} width={cw - 36} height={6}
                        fill="rgba(247,250,255,0.10)" />
                      <rect x={cx + 12} y={y + 140} width={cw - 50} height={6}
                        fill="rgba(247,250,255,0.10)" />
                    </g>
                  );
                })}
              </g>
            )}
            {i === 3 && /* PROOF */ (
              <g>
                <rect x={FX + 16} y={y + 40} width={FW - 32} height={84}
                  fill="rgba(247,250,255,0.03)"
                  stroke="rgba(247,250,255,0.15)" strokeWidth={0.8} />
                <text x={FX + 32} y={y + 70} fill="rgba(247,250,255,0.65)"
                  fontFamily={FONT} fontSize={14} fontWeight={600} fontStyle="italic">
                  "Construyeron exactamente lo que…"
                </text>
                <rect x={FX + 32} y={y + 88} width={200} height={8}
                  fill="rgba(247,250,255,0.20)" />
                <circle cx={FX + FW - 70} cy={y + 82} r={28}
                  fill="rgba(63,181,255,0.10)" stroke="rgba(63,181,255,0.30)" strokeWidth={1} />
              </g>
            )}
            {i === 4 && /* CTA */ (
              <g>
                <rect x={FX + FW / 2 - 120} y={y + 40} width={240} height={48}
                  rx={24} fill={C.blue} />
                <text x={FX + FW / 2} y={y + 70} fill={C.white}
                  fontFamily={FONT} fontSize={13} fontWeight={700}
                  textAnchor="middle" letterSpacing={2}>
                  AGENDÁ UN BRIEF →
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Dimensions on right side — height of each section */}
      {dims > 0 && (
        <g opacity={dims}>
          {SECTIONS.map((s, i) => (
            <DimLine key={i}
              x1={FX + FW + 24} y1={FY + s.y0}
              x2={FX + FW + 24} y2={FY + s.y0 + s.h}
              value={`${(s.h / 80).toFixed(1)} m`}
              theme="dark" offset={0} />
          ))}
        </g>
      )}

      {/* Total height */}
      {dims > 0 && (
        <g opacity={dims * 0.85}>
          <DimLine x1={FX + FW + 96} y1={FY} x2={FX + FW + 96} y2={FY + FH}
            value="9.50 m TOT" theme="dark" offset={0} />
        </g>
      )}


    </SheetChrome>
  );
}

window.Scene07 = Scene07;
