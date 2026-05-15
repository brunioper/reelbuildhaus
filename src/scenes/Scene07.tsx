// Scene 7 — Wireframe (15.5–18s, dark)
// "Desarrollamos la experiencia."
// Premium browser wireframe — the biggest design showcase.

import { C, FONT, VIDEO_WIDTH, T } from '../constants';
import { BlueprintGrid, TechLabel, CornerBrackets, SceneBg, seg, lerp } from './shared';

const M = T.m;
const FX = 108;           // frame x
const FY = 980;           // frame y
const FW = VIDEO_WIDTH - FX * 2;  // frame width  864
const FH = 820;           // frame height

// Section definitions [y-offset within frame, height, label]
const SECTIONS: Array<{ dy: number; dh: number; label: string; id: string }> = [
  { dy: 48,  dh: 52,  label: 'A / NAV',      id: 'nav'      },
  { dy: 100, dh: 200, label: 'B / HERO',     id: 'hero'     },
  { dy: 300, dh: 180, label: 'C / SERVICES', id: 'services' },
  { dy: 480, dh: 120, label: 'D / PROOF',    id: 'proof'    },
  { dy: 600, dh: 80,  label: 'E / CTA',      id: 'cta'      },
];

export default function Scene07({ p }: { p: number }) {
  const grid   = seg(p, 0,    0.15);
  const eye    = seg(p, 0.05, 0.22);
  const hl1    = seg(p, 0.10, 0.32);
  const hl2    = seg(p, 0.22, 0.42);
  const chrome = seg(p, 0.30, 0.50);
  const sA     = seg(p, 0.38, 0.55);
  const sB     = seg(p, 0.45, 0.60);
  const sC     = seg(p, 0.52, 0.67);
  const sD     = seg(p, 0.58, 0.73);
  const sE     = seg(p, 0.64, 0.80);
  const annot  = seg(p, 0.75, 0.95);

  const sectionOps = [sA, sB, sC, sD, sE];

  return (
    <g>
      <SceneBg theme="dark" />
      <g opacity={grid}><BlueprintGrid theme="dark" /></g>

      <TechLabel x={M} y={160} theme="dark" opacity={eye}>WIREFRAME / WEBSITE BLUEPRINT</TechLabel>
      <line x1={M} y1={172} x2={VIDEO_WIDTH - M} y2={172}
        stroke="rgba(255,255,255,0.07)" strokeWidth={1} />

      <text x={M} y={360} fill={C.white} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl1}>
        Desarrollamos
      </text>
      <text x={M} y={360 + T.type.headline * 1.08} fill={C.white} fontFamily={FONT}
        fontSize={T.type.headline} fontWeight={850} letterSpacing={-2}
        opacity={hl2}>
        la experiencia.
      </text>
      <text x={M} y={360 + T.type.headline * 2.1} fill={C.gray} fontFamily={FONT}
        fontSize={T.type.sub} fontWeight={500} opacity={hl2}>
        Cada sección con propósito.
      </text>

      {/* Browser outer frame */}
      <g opacity={chrome}>
        <rect x={FX} y={FY} width={FW} height={FH}
          rx={T.r.md} fill="rgba(247,250,255,0.04)"
          stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
        <CornerBrackets x={FX} y={FY} w={FW} h={FH}
          size={18} color={C.gray} opacity={0.3} />

        {/* Browser top bar */}
        <rect x={FX} y={FY} width={FW} height={48}
          rx={T.r.md} fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        {/* Traffic lights */}
        {[0, 1, 2].map(i => (
          <circle key={i} cx={FX + 20 + i * 18} cy={FY + 24} r={5}
            fill={['rgba(255,95,87,0.5)', 'rgba(254,188,46,0.5)', 'rgba(40,200,64,0.5)'][i]} />
        ))}
        {/* URL bar */}
        <rect x={FX + 100} y={FY + 12} width={FW - 200} height={24}
          rx={4} fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <text x={FX + FW / 2} y={FY + 28}
          fill="rgba(255,255,255,0.25)" fontFamily={FONT}
          fontSize={11} fontWeight={500} textAnchor="middle">
          buildhaus.studio
        </text>
      </g>

      {/* Sections */}
      {SECTIONS.map(({ dy, dh, label, id }, i) => (
        <g key={id} opacity={sectionOps[i]}>
          <rect x={FX + 1} y={FY + dy} width={FW - 2} height={dh}
            fill="rgba(255,255,255,0.02)" />
          <line x1={FX + 1} y1={FY + dy + dh} x2={FX + FW - 1} y2={FY + dy + dh}
            stroke="rgba(255,255,255,0.06)" strokeWidth={1} />

          {/* Section label on left gutter */}
          <text x={FX - 12} y={FY + dy + dh / 2}
            fill={C.gray} fontFamily={FONT} fontSize={10} fontWeight={700}
            textAnchor="end" dominantBaseline="middle" letterSpacing={1.5}
            opacity={0.5}>
            {label}
          </text>

          {/* Section content sketches */}
          {id === 'nav' && (
            <g>
              <text x={FX + 24} y={FY + dy + 32} fill="rgba(255,255,255,0.5)"
                fontFamily={FONT} fontSize={13} fontWeight={800} letterSpacing={2}>
                BUILD HAUS
              </text>
              {['Servicios', 'Trabajo', 'Contacto'].map((t, j) => (
                <text key={j} x={FX + FW - 24 - j * 90} y={FY + dy + 32}
                  fill="rgba(255,255,255,0.3)" fontFamily={FONT}
                  fontSize={11} textAnchor="end" fontWeight={500}>
                  {t}
                </text>
              ))}
            </g>
          )}
          {id === 'hero' && (
            <g>
              {/* Hero headline skeleton */}
              <rect x={FX + 24} y={FY + dy + 28} width={340} height={18}
                rx={3} fill="rgba(255,255,255,0.15)" />
              <rect x={FX + 24} y={FY + dy + 54} width={260} height={18}
                rx={3} fill="rgba(255,255,255,0.10)" />
              <rect x={FX + 24} y={FY + dy + 86} width={200} height={12}
                rx={2} fill="rgba(255,255,255,0.08)" />
              <rect x={FX + 24} y={FY + dy + 106} width={160} height={12}
                rx={2} fill="rgba(255,255,255,0.07)" />
              {/* CTA pill */}
              <rect x={FX + 24} y={FY + dy + 134} width={130} height={34}
                rx={17} fill={C.blue} opacity={0.8} />
              <text x={FX + 89} y={FY + dy + 156} fill={C.white} fontFamily={FONT}
                fontSize={10} fontWeight={700} textAnchor="middle" letterSpacing={1.5}>
                BRIEF →
              </text>
              {/* Image placeholder */}
              <rect x={FX + FW / 2} y={FY + dy + 20} width={FW / 2 - 24} height={160}
                rx={T.r.sm} fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
              <line x1={FX + FW / 2} y1={FY + dy + 20}
                x2={FX + FW - 24} y2={FY + dy + 180}
                stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
              <line x1={FX + FW - 24} y1={FY + dy + 20}
                x2={FX + FW / 2} y2={FY + dy + 180}
                stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
            </g>
          )}
          {id === 'services' && (
            <g>
              {[0, 1, 2].map(j => (
                <g key={j}>
                  <rect x={FX + 24 + j * (FW / 3 - 8)} y={FY + dy + 20}
                    width={FW / 3 - 24} height={130}
                    rx={T.r.sm} fill="rgba(255,255,255,0.04)"
                    stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
                  <rect x={FX + 36 + j * (FW / 3 - 8)} y={FY + dy + 36}
                    width={80} height={10} rx={2} fill="rgba(255,255,255,0.15)" />
                  <rect x={FX + 36 + j * (FW / 3 - 8)} y={FY + dy + 54}
                    width={120} height={8} rx={2} fill="rgba(255,255,255,0.08)" />
                  <rect x={FX + 36 + j * (FW / 3 - 8)} y={FY + dy + 68}
                    width={100} height={8} rx={2} fill="rgba(255,255,255,0.07)" />
                </g>
              ))}
            </g>
          )}
          {id === 'proof' && (
            <g>
              <rect x={FX + 24} y={FY + dy + 18} width={FW - 48} height={80}
                rx={T.r.sm} fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
              <rect x={FX + 48} y={FY + dy + 32} width={240} height={10}
                rx={2} fill="rgba(255,255,255,0.12)" />
              <rect x={FX + 48} y={FY + dy + 50} width={180} height={8}
                rx={2} fill="rgba(255,255,255,0.07)" />
              <circle cx={FX + FW - 60} cy={FY + dy + 56} r={24}
                fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            </g>
          )}
          {id === 'cta' && (
            <g>
              <rect x={FX + FW / 2 - 100} y={FY + dy + 18} width={200} height={42}
                rx={T.r.pill} fill={C.blue} opacity={0.85} />
              <text x={FX + FW / 2} y={FY + dy + 44} fill={C.white}
                fontFamily={FONT} fontSize={12} fontWeight={700}
                textAnchor="middle" letterSpacing={1.5}>
                AGENDÁ UN BRIEF →
              </text>
            </g>
          )}
        </g>
      ))}

      {/* Responsive label */}
      <g opacity={annot}>
        <text x={FX + FW - 12} y={FY + 16}
          fill={C.blue} fontFamily={FONT} fontSize={10} fontWeight={700}
          textAnchor="end" letterSpacing={2} opacity={0.6}>
          RESPONSIVE
        </text>
      </g>

      <TechLabel x={M} y={1840} theme="dark" opacity={annot}>WIREFRAME · WEBSITE BLUEPRINT</TechLabel>
      <TechLabel x={VIDEO_WIDTH - M} y={1840} theme="dark" anchor="end" opacity={annot}>RESPONSIVE / CUSTOM</TechLabel>
    </g>
  );
}
