// Scene 11 — Final Website Reveal (25.5–27s, dark)
// "El resultado." — finished front elevation of the delivered site.

const S11 = window.SHARED;

function Scene11({ p }) {
  const { C, FONT, FONT_MONO, VW,
    seg, lerp, easeOut, clamp,
    SheetChrome, DraftRect } = S11;

  const hl1     = seg(p, 0.04, 0.28);
  const subT    = seg(p, 0.14, 0.38);
  const frame   = seg(p, 0.22, 0.48);
  const nav     = seg(p, 0.36, 0.56);
  const hero    = seg(p, 0.44, 0.62);
  const cards   = seg(p, 0.54, 0.72);
  const proof   = seg(p, 0.64, 0.80);
  const ctaSec  = seg(p, 0.72, 0.88);
  const stamp   = seg(p, 0.82, 0.98);

  // Big browser window — sized so bottom edge clears the bottom title block.
  const FX = 90, FY = 860, FW = VW - 180, FH = 820;

  return (
    <SheetChrome theme="dark" p={p}
      sheet="11" title="ENTREGA / FINAL" code="A.11"
      label="DELIVERED — FRONT ELEVATION" highlight={4}>

      <text x={90} y={340} fill={C.white} fontFamily={FONT}
        fontSize={138} fontWeight={850} letterSpacing={-3.5}
        opacity={hl1}>
        El resultado.
      </text>
      <text x={90} y={448} fill={C.blue} fontFamily={FONT}
        fontSize={54} fontWeight={750} letterSpacing={-1}
        opacity={subT}>
        Una web construida desde cero.
      </text>
      <text x={90} y={500} fill={C.cyan} fontFamily={FONT_MONO}
        fontSize={18} fontWeight={700} letterSpacing={3}
        opacity={subT}>
        AS-BUILT · BUILD HAUS · 2026
      </text>

      {/* ─── Browser frame ──────────────────────────────────────────────── */}
      <g opacity={frame}>
        {/* Outer shell */}
        <rect x={FX - 4} y={FY - 4} width={FW + 8} height={FH + 8}
          rx={6} fill="none" stroke="rgba(247,250,255,0.20)" strokeWidth={0.6} />
        <rect x={FX} y={FY} width={FW} height={FH}
          rx={4} fill="rgba(247,250,255,0.03)"
          stroke={C.white} strokeWidth={1.5} />

        {/* Chrome */}
        <rect x={FX} y={FY} width={FW} height={44}
          rx={4} fill="rgba(247,250,255,0.05)" />
        <line x1={FX} y1={FY + 44} x2={FX + FW} y2={FY + 44}
          stroke="rgba(247,250,255,0.20)" strokeWidth={0.6} />
        {[0, 1, 2].map(i => (
          <circle key={i} cx={FX + 18 + i * 18} cy={FY + 22} r={5}
            fill={['rgba(255,95,87,0.55)', 'rgba(254,188,46,0.55)', 'rgba(40,200,64,0.55)'][i]} />
        ))}
        <rect x={FX + 90} y={FY + 12} width={FW - 180} height={22}
          rx={4} fill="rgba(247,250,255,0.04)"
          stroke="rgba(247,250,255,0.10)" strokeWidth={0.6} />
        <text x={FX + FW / 2} y={FY + 27}
          fill="rgba(247,250,255,0.35)" fontFamily={FONT_MONO}
          fontSize={11} fontWeight={600} textAnchor="middle" letterSpacing={1}>
          https://buildhaus.studio
        </text>
      </g>

      {/* ─── Nav ───────────────────────────────────────────────────────── */}
      <g opacity={nav}>
        <rect x={FX + 1} y={FY + 44} width={FW - 2} height={52}
          fill="rgba(7,29,53,0.75)" />
        <text x={FX + 24} y={FY + 76} fill="rgba(247,250,255,0.95)"
          fontFamily={FONT} fontSize={16} fontWeight={800} letterSpacing={2}>
          BUILD HAUS
        </text>
        <text x={FX + 152} y={FY + 76} fill="rgba(247,250,255,0.35)"
          fontFamily={FONT_MONO} fontSize={10} fontWeight={600}
          dominantBaseline="middle" letterSpacing={1}>
          STUDIO · EST. 2025
        </text>
        {['Servicios', 'Trabajo', 'Proceso', 'Contacto'].map((t, j) => (
          <text key={j} x={FX + FW - 24 - j * 86} y={FY + 76}
            fill="rgba(247,250,255,0.6)" fontFamily={FONT}
            fontSize={12} textAnchor="end" fontWeight={500}>
            {t}
          </text>
        ))}
      </g>

      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <g opacity={hero}>
        <rect x={FX + 1} y={FY + 96} width={FW - 2} height={260}
          fill="rgba(36,107,255,0.05)" />
        {/* Headline */}
        <text x={FX + 32} y={FY + 154} fill="rgba(247,250,255,0.95)"
          fontFamily={FONT} fontSize={40} fontWeight={850} letterSpacing={-1.5}>
          Webs construidas
        </text>
        <text x={FX + 32} y={FY + 202} fill="rgba(247,250,255,0.95)"
          fontFamily={FONT} fontSize={40} fontWeight={850} letterSpacing={-1.5}>
          desde cero.
        </text>
        <text x={FX + 32} y={FY + 244} fill="rgba(247,250,255,0.45)"
          fontFamily={FONT} fontSize={15} fontWeight={400}>
          Diseño y desarrollo web a medida para marcas que quieren convertir.
        </text>
        {/* CTA */}
        <rect x={FX + 32} y={FY + 272} width={200} height={52}
          rx={26} fill={C.blue} />
        <text x={FX + 132} y={FY + 304} fill={C.white} fontFamily={FONT}
          fontSize={14} fontWeight={700} textAnchor="middle" letterSpacing={1.5}>
          AGENDÁ UN BRIEF →
        </text>
        {/* Hero visual */}
        <rect x={FX + FW / 2 + 20} y={FY + 116} width={FW / 2 - 40} height={222}
          fill="rgba(63,181,255,0.10)" stroke="rgba(247,250,255,0.10)" strokeWidth={0.8} />
        {/* Composition lines inside placeholder */}
        <line x1={FX + FW / 2 + 20} y1={FY + 116}
          x2={FX + FW - 20} y2={FY + 338}
          stroke="rgba(247,250,255,0.10)" strokeWidth={0.6} />
        <line x1={FX + FW - 20} y1={FY + 116}
          x2={FX + FW / 2 + 20} y2={FY + 338}
          stroke="rgba(247,250,255,0.10)" strokeWidth={0.6} />
        <text x={FX + FW * 0.75} y={FY + 234}
          fill="rgba(247,250,255,0.25)" fontFamily={FONT_MONO}
          fontSize={11} fontWeight={700} textAnchor="middle" letterSpacing={2}>
          STUDIO REEL
        </text>
      </g>

      {/* ─── Services ──────────────────────────────────────────────────── */}
      <g opacity={cards}>
        <line x1={FX + 1} y1={FY + 356} x2={FX + FW - 1} y2={FY + 356}
          stroke="rgba(247,250,255,0.10)" strokeWidth={0.8} />
        {[
          { title: 'Diseño web',   sub: 'UI/UX · Brand · Sistema visual' },
          { title: 'Desarrollo',   sub: 'React · Next.js · Performance' },
          { title: 'Conversión',   sub: 'CRO · Analytics · Optimización' },
        ].map(({ title, sub }, j) => {
          const cw = (FW - 60) / 3;
          const cx = FX + 20 + j * (cw + 10);
          return (
            <g key={j}>
              <rect x={cx} y={FY + 376} width={cw} height={154}
                fill="rgba(247,250,255,0.04)"
                stroke="rgba(247,250,255,0.10)" strokeWidth={0.8} />
              <circle cx={cx + 24} cy={FY + 408} r={14}
                fill="none" stroke={C.blue} strokeWidth={1.2} />
              <text x={cx + 24} y={FY + 412} fill={C.blue}
                fontFamily={FONT_MONO} fontSize={10} fontWeight={800}
                textAnchor="middle" letterSpacing={0.5}>
                0{j + 1}
              </text>
              <text x={cx + 20} y={FY + 452}
                fill="rgba(247,250,255,0.92)" fontFamily={FONT}
                fontSize={18} fontWeight={800} letterSpacing={-0.3}>
                {title}
              </text>
              <text x={cx + 20} y={FY + 476}
                fill={C.gray} fontFamily={FONT}
                fontSize={12} fontWeight={400}>
                {sub}
              </text>
              <line x1={cx + 20} y1={FY + 494} x2={cx + 60} y2={FY + 494}
                stroke={C.blue} strokeWidth={1.2} />
              <text x={cx + 20} y={FY + 514}
                fill={C.blue} fontFamily={FONT_MONO}
                fontSize={10} fontWeight={700} letterSpacing={1.5}>
                VER MÁS →
              </text>
            </g>
          );
        })}
      </g>

      {/* ─── Proof ─────────────────────────────────────────────────────── */}
      <g opacity={proof}>
        <line x1={FX + 1} y1={FY + 550} x2={FX + FW - 1} y2={FY + 550}
          stroke="rgba(247,250,255,0.10)" strokeWidth={0.8} />
        <rect x={FX + 20} y={FY + 570} width={FW - 40} height={110}
          fill="rgba(247,250,255,0.03)"
          stroke="rgba(247,250,255,0.10)" strokeWidth={0.8} />
        <text x={FX + 48} y={FY + 612} fill="rgba(247,250,255,0.75)"
          fontFamily={FONT} fontSize={16} fontWeight={500} fontStyle="italic">
          "Construyeron exactamente lo que necesitábamos."
        </text>
        <text x={FX + 48} y={FY + 644} fill={C.gray} fontFamily={FONT_MONO}
          fontSize={11} fontWeight={700} letterSpacing={1.5}>
          CLIENTE · TESTIMONIO 01
        </text>
        <circle cx={FX + FW - 64} cy={FY + 624} r={36}
          fill="rgba(63,181,255,0.10)" stroke="rgba(63,181,255,0.30)" strokeWidth={1} />
        <text x={FX + FW - 64} y={FY + 628} fill={C.cyan} fontFamily={FONT_MONO}
          fontSize={10} fontWeight={800} textAnchor="middle" letterSpacing={1}>
          BHS·01
        </text>
      </g>

      {/* ─── Footer CTA strip ──────────────────────────────────────────── */}
      <g opacity={ctaSec}>
        <rect x={FX + 1} y={FY + 698} width={FW - 2} height={88}
          fill="rgba(36,107,255,0.08)" />
        <line x1={FX + 1} y1={FY + 698} x2={FX + FW - 1} y2={FY + 698}
          stroke="rgba(36,107,255,0.30)" strokeWidth={0.8} />
        <text x={FX + FW / 2} y={FY + 738}
          fill="rgba(247,250,255,0.95)" fontFamily={FONT}
          fontSize={22} fontWeight={800} textAnchor="middle" letterSpacing={-0.3}>
          ¿Construimos tu web?
        </text>
        <text x={FX + FW / 2} y={FY + 762}
          fill={C.gray} fontFamily={FONT_MONO}
          fontSize={11} fontWeight={700} textAnchor="middle" letterSpacing={2}>
          BUILDHAUS.STUDIO · BRIEF →
        </text>
      </g>

      {/* AS-BUILT stamp */}
      {stamp > 0 && (
        <g opacity={stamp} transform={`translate(${FX + FW - 130},${FY + 110}) rotate(-14)`}>
          <circle cx={0} cy={0} r={72} fill="none"
            stroke="rgba(63,181,255,0.85)" strokeWidth={2.5} />
          <circle cx={0} cy={0} r={58} fill="none"
            stroke="rgba(63,181,255,0.4)" strokeWidth={1} />
          <text x={0} y={-8} fill={C.cyan} fontFamily={FONT}
            fontSize={16} fontWeight={850} textAnchor="middle" letterSpacing={2}>
            AS-BUILT
          </text>
          <line x1={-44} y1={4} x2={44} y2={4}
            stroke="rgba(63,181,255,0.5)" strokeWidth={1} />
          <text x={0} y={22} fill={C.cyan} fontFamily={FONT_MONO}
            fontSize={9} fontWeight={700} textAnchor="middle" letterSpacing={2}>
            REV.A · 2026
          </text>
        </g>
      )}
    </SheetChrome>
  );
}

window.Scene11 = Scene11;
