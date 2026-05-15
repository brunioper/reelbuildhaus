// Scene 09 — Development (20.5–23s, dark)
// "Código limpio. Responsive." — desktop + mobile elevations with dimensions.

const S9 = window.SHARED;

function Scene09({ p }) {
  const { C, FONT, FONT_MONO, VW,
    seg, lerp, easeOut, clamp,
    SheetChrome, DraftLine, DraftRect, DimLine, DetailBubble } = S9;

  const hl1     = seg(p, 0.08, 0.28);
  const hl2     = seg(p, 0.16, 0.36);
  const sub     = seg(p, 0.26, 0.46);
  const desktop = seg(p, 0.34, 0.56);
  const mobile  = seg(p, 0.48, 0.68);
  const link    = seg(p, 0.58, 0.74);
  const code    = seg(p, 0.64, 0.82);
  const perf    = seg(p, 0.72, 0.90);
  const annot   = seg(p, 0.82, 0.96);

  // Desktop frame
  const DX = 90, DY = 1000, DW = 580, DH = 380;
  // Mobile frame (positioned right of desktop)
  const MX = DX + DW + 50, MY = 1040, MW = 210, MH = 380;

  return (
    <SheetChrome theme="dark" p={p}
      sheet="09" title="DEVELOPMENT / ELEVATIONS" code="A.09"
      label="DESKTOP + MOBILE · RESPONSIVE BUILD" highlight={2}>

      <text x={90} y={340} fill={C.white} fontFamily={FONT}
        fontSize={116} fontWeight={850} letterSpacing={-2.5}
        opacity={hl1}>
        Código limpio.
      </text>
      <text x={90} y={464} fill={C.blue} fontFamily={FONT}
        fontSize={116} fontWeight={850} letterSpacing={-2.5}
        opacity={hl2}>
        Responsive.
      </text>
      <text x={90} y={552} fill={C.gray} fontFamily={FONT}
        fontSize={36} fontWeight={500} letterSpacing={-0.4}
        opacity={sub}>
        Una estructura pensada para escalar.
      </text>
      <text x={90} y={596} fill={C.blue} fontFamily={FONT_MONO}
        fontSize={18} fontWeight={700} letterSpacing={3}
        opacity={sub}>
        ELEVATION NORTH + EAST
      </text>

      {/* ─── DESKTOP ELEVATION ──────────────────────────────────────────── */}
      <g opacity={desktop}>
        {/* Window chrome / outer frame */}
        <rect x={DX} y={DY} width={DW} height={DH}
          fill="rgba(247,250,255,0.04)"
          stroke={C.white} strokeWidth={1.5} />
        {/* Browser bar */}
        <rect x={DX} y={DY} width={DW} height={36}
          fill="rgba(247,250,255,0.06)" />
        <line x1={DX} y1={DY + 36} x2={DX + DW} y2={DY + 36}
          stroke="rgba(247,250,255,0.30)" strokeWidth={0.8} />
        {[0, 1, 2].map(i => (
          <circle key={i} cx={DX + 14 + i * 14} cy={DY + 18} r={4}
            fill={['rgba(255,95,87,0.55)', 'rgba(254,188,46,0.55)', 'rgba(40,200,64,0.55)'][i]} />
        ))}
        {/* URL bar */}
        <rect x={DX + 70} y={DY + 10} width={DW - 140} height={16}
          fill="rgba(247,250,255,0.04)" stroke="rgba(247,250,255,0.10)" strokeWidth={0.6} />
        <text x={DX + DW / 2} y={DY + 22} fill="rgba(247,250,255,0.35)"
          fontFamily={FONT_MONO} fontSize={9} fontWeight={600}
          textAnchor="middle" letterSpacing={1}>
          buildhaus.studio
        </text>

        {/* Nav */}
        <rect x={DX + 1} y={DY + 36} width={DW - 2} height={32}
          fill="rgba(7,29,53,0.5)" />
        <text x={DX + 16} y={DY + 58} fill="rgba(247,250,255,0.75)"
          fontFamily={FONT} fontSize={11} fontWeight={800} letterSpacing={2}>
          BUILD HAUS
        </text>
        {['Servicios', 'Trabajo', 'Contacto'].map((t, j) => (
          <text key={j} x={DX + DW - 16 - j * 70} y={DY + 58}
            fill="rgba(247,250,255,0.45)" fontFamily={FONT}
            fontSize={10} textAnchor="end" fontWeight={500}>
            {t}
          </text>
        ))}

        {/* Hero */}
        <rect x={DX + 1} y={DY + 68} width={DW - 2} height={120}
          fill="rgba(36,107,255,0.06)" />
        <rect x={DX + 20} y={DY + 84} width={220} height={14}
          fill="rgba(247,250,255,0.30)" />
        <rect x={DX + 20} y={DY + 104} width={160} height={14}
          fill="rgba(247,250,255,0.18)" />
        <rect x={DX + 20} y={DY + 130} width={90} height={28}
          rx={14} fill={C.blue} opacity={0.9} />
        <text x={DX + 65} y={DY + 149} fill={C.white} fontFamily={FONT}
          fontSize={10} fontWeight={700} textAnchor="middle" letterSpacing={1.5}>
          BRIEF →
        </text>
        {/* Hero image placeholder */}
        <rect x={DX + DW - 200} y={DY + 80} width={180} height={100}
          fill="rgba(63,181,255,0.10)" stroke="rgba(247,250,255,0.15)" strokeWidth={0.8} />

        {/* Service cards */}
        {[0, 1, 2].map(j => {
          const cw = (DW - 60) / 3;
          const cx = DX + 20 + j * (cw + 8);
          return (
            <g key={j}>
              <rect x={cx} y={DY + 210} width={cw} height={90}
                fill="rgba(247,250,255,0.04)"
                stroke="rgba(247,250,255,0.12)" strokeWidth={0.8} />
              <circle cx={cx + 16} cy={DY + 224} r={6}
                fill="none" stroke={C.cyan} strokeWidth={1} />
              <rect x={cx + 12} y={DY + 240} width={70} height={8}
                fill="rgba(247,250,255,0.25)" />
              <rect x={cx + 12} y={DY + 254} width={cw - 24} height={6}
                fill="rgba(247,250,255,0.10)" />
              <rect x={cx + 12} y={DY + 266} width={cw - 36} height={6}
                fill="rgba(247,250,255,0.10)" />
            </g>
          );
        })}

        {/* Proof */}
        <rect x={DX + 20} y={DY + 314} width={DW - 40} height={50}
          fill="rgba(247,250,255,0.03)" stroke="rgba(247,250,255,0.10)" strokeWidth={0.8} />
        <rect x={DX + 34} y={DY + 332} width={140} height={8}
          fill="rgba(247,250,255,0.20)" />
        <rect x={DX + 34} y={DY + 346} width={100} height={6}
          fill="rgba(247,250,255,0.10)" />

        {/* Label below */}
        <text x={DX + DW / 2} y={DY + DH + 26} fill={C.cyan}
          fontFamily={FONT_MONO} fontSize={10} fontWeight={800}
          textAnchor="middle" letterSpacing={2.5}>
          DESKTOP · 1440px
        </text>
      </g>

      {/* Desktop dims */}
      {desktop > 0.8 && (
        <g opacity={desktop}>
          <DimLine x1={DX} y1={DY - 24} x2={DX + DW} y2={DY - 24}
            value="1440 px" theme="dark" offset={0} />
        </g>
      )}

      {/* ─── MOBILE ELEVATION ───────────────────────────────────────────── */}
      <g opacity={mobile}>
        {/* Phone outer body */}
        <rect x={MX - 4} y={MY - 8} width={MW + 8} height={MH + 16}
          rx={20} fill="none" stroke="rgba(247,250,255,0.25)" strokeWidth={0.8} />
        <rect x={MX} y={MY} width={MW} height={MH}
          rx={12} fill="rgba(247,250,255,0.04)"
          stroke={C.white} strokeWidth={1.5} />
        {/* Notch */}
        <rect x={MX + MW / 2 - 24} y={MY} width={48} height={12}
          rx={6} fill="rgba(7,29,53,0.7)" />

        {/* Nav */}
        <rect x={MX + 1} y={MY + 18} width={MW - 2} height={26}
          fill="rgba(7,29,53,0.5)" />
        <text x={MX + 12} y={MY + 36} fill="rgba(247,250,255,0.7)"
          fontFamily={FONT} fontSize={9} fontWeight={800} letterSpacing={2}>
          BH
        </text>
        <rect x={MX + MW - 28} y={MY + 25} width={16} height={1.5}
          fill="rgba(247,250,255,0.45)" />
        <rect x={MX + MW - 28} y={MY + 30} width={16} height={1.5}
          fill="rgba(247,250,255,0.45)" />

        {/* Hero (stacked vertically) */}
        <rect x={MX + 1} y={MY + 44} width={MW - 2} height={88}
          fill="rgba(36,107,255,0.08)" />
        <rect x={MX + 12} y={MY + 60} width={140} height={9}
          fill="rgba(247,250,255,0.28)" />
        <rect x={MX + 12} y={MY + 75} width={110} height={9}
          fill="rgba(247,250,255,0.18)" />
        <rect x={MX + 12} y={MY + 96} width={70} height={20}
          rx={10} fill={C.blue} opacity={0.9} />
        <text x={MX + 47} y={MY + 110} fill={C.white}
          fontFamily={FONT} fontSize={7} fontWeight={700}
          textAnchor="middle" letterSpacing={1}>
          BRIEF →
        </text>

        {/* Stacked cards */}
        {[0, 1, 2].map(j => (
          <g key={j}>
            <rect x={MX + 8} y={MY + 144 + j * 64} width={MW - 16} height={54}
              fill="rgba(247,250,255,0.04)"
              stroke="rgba(247,250,255,0.10)" strokeWidth={0.8} />
            <circle cx={MX + 22} cy={MY + 158 + j * 64} r={5}
              fill="none" stroke={C.cyan} strokeWidth={0.8} />
            <rect x={MX + 16} y={MY + 170 + j * 64} width={70} height={6}
              fill="rgba(247,250,255,0.22)" />
            <rect x={MX + 16} y={MY + 181 + j * 64} width={120} height={4}
              fill="rgba(247,250,255,0.10)" />
            <rect x={MX + 16} y={MY + 189 + j * 64} width={90} height={4}
              fill="rgba(247,250,255,0.10)" />
          </g>
        ))}

        <text x={MX + MW / 2} y={MY + MH + 26} fill={C.cyan}
          fontFamily={FONT_MONO} fontSize={10} fontWeight={800}
          textAnchor="middle" letterSpacing={2.5}>
          MOBILE · 390px
        </text>
      </g>

      {/* Mobile dims */}
      {mobile > 0.7 && (
        <g opacity={mobile}>
          <DimLine x1={MX} y1={MY - 24} x2={MX + MW} y2={MY - 24}
            value="390 px" theme="dark" offset={0} />
        </g>
      )}

      {/* Connection line between devices — "same structure" */}
      {link > 0 && (
        <g opacity={link * 0.55}>
          <line x1={DX + DW + 8} y1={DY + DH / 2}
            x2={MX - 8} y2={MY + MH / 2}
            stroke={C.blue} strokeWidth={1} strokeDasharray="4 4" />
          <circle cx={(DX + DW + MX) / 2} cy={(DY + DH / 2 + MY + MH / 2) / 2}
            r={4} fill={C.blue} />
          <text x={(DX + DW + MX) / 2} y={(DY + DH / 2 + MY + MH / 2) / 2 - 12}
            fill={C.cyan} fontFamily={FONT_MONO}
            fontSize={9} fontWeight={700} textAnchor="middle" letterSpacing={2}>
            MISMO CÓDIGO
          </text>
        </g>
      )}

      {/* Code panel (bottom) */}
      {code > 0 && (
        <g opacity={code}>
          <rect x={90} y={1450} width={VW - 180} height={150}
            fill="rgba(7,29,53,0.6)" stroke="rgba(247,250,255,0.18)" strokeWidth={0.8} />
          <rect x={90} y={1450} width={VW - 180} height={24}
            fill="rgba(247,250,255,0.05)" />
          <text x={106} y={1467} fill="rgba(247,250,255,0.45)"
            fontFamily={FONT_MONO} fontSize={10} fontWeight={700} letterSpacing={1.5}>
            ⌄  Hero.tsx
          </text>
          <text x={VW - 100} y={1467} fill="rgba(247,250,255,0.30)"
            fontFamily={FONT_MONO} fontSize={9} fontWeight={600}
            textAnchor="end" letterSpacing={1.5}>
            TypeScript · React
          </text>
          {[
            { c: 'rgba(63,181,255,0.85)', t: 'export', i: '#fff', extra: ' default function Hero() {' },
            { c: 'rgba(247,250,255,0.7)',  t: '  return (', i: '' },
            { c: 'rgba(247,250,255,0.6)',  t: '    <section className=\"hero\">', i: '' },
            { c: 'rgba(247,250,255,0.6)',  t: '      <Headline>Webs construidas desde cero.</Headline>', i: '' },
            { c: 'rgba(247,250,255,0.6)',  t: '    </section>', i: '' },
            { c: 'rgba(247,250,255,0.7)',  t: '  );', i: '' },
            { c: 'rgba(247,250,255,0.7)',  t: '}', i: '' },
          ].map(({ c, t }, i) => (
            <text key={i} x={106} y={1496 + i * 16} fill={c}
              fontFamily={FONT_MONO} fontSize={10} fontWeight={500} letterSpacing={0.3}>
              {t}
            </text>
          ))}
          {/* Line numbers */}
          {[1, 2, 3, 4, 5, 6, 7].map((n, i) => (
            <text key={n} x={98} y={1496 + i * 16} fill="rgba(247,250,255,0.20)"
              fontFamily={FONT_MONO} fontSize={9} fontWeight={500}
              textAnchor="end">
              {n}
            </text>
          ))}
        </g>
      )}

      {/* Perf bars (bottom strip) */}
      {perf > 0 && (
        <g opacity={perf}>
          {[
            { label: 'RENDIMIENTO', v: 96 },
            { label: 'ACCESIBILIDAD', v: 98 },
            { label: 'SEO', v: 100 },
            { label: 'BUENAS PRÁCT.', v: 95 },
          ].map((b, i) => {
            const x = 90 + i * 235;
            return (
              <g key={i}>
                <circle cx={x + 20} cy={1660} r={18}
                  fill="none" stroke={C.blue} strokeWidth={2.5}
                  strokeDasharray={`${b.v * 1.13} 200`}
                  transform={`rotate(-90 ${x + 20} 1660)`} />
                <text x={x + 20} y={1664} fill={C.blue}
                  fontFamily={FONT_MONO} fontSize={11} fontWeight={800}
                  textAnchor="middle">
                  {b.v}
                </text>
                <text x={x + 44} y={1656} fill={C.gray}
                  fontFamily={FONT_MONO} fontSize={9} fontWeight={800} letterSpacing={1.5}>
                  {b.label}
                </text>
                <text x={x + 44} y={1670} fill={C.cyan}
                  fontFamily={FONT_MONO} fontSize={8} fontWeight={700} letterSpacing={1.5}>
                  LIGHTHOUSE
                </text>
              </g>
            );
          })}
        </g>
      )}


    </SheetChrome>
  );
}

window.Scene09 = Scene09;
