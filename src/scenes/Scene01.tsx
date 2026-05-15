// Scene 1 — Meta Hook (0–4s, dark)
// "Este reel no fue editado. Lo programamos."
// Shows a web-app interface generating the reel. The meta-reveal.

import { C, FONT, VIDEO_WIDTH, T } from '../constants';
import {
  BlueprintGrid, TechLabel, CornerBrackets, BlueDot, WaveformBar,
  SceneBg, seg, lerp, easeOut, clamp,
} from './shared';

const M = T.m;  // 90

export default function Scene01({ p }: { p: number }) {
  // segment helpers
  const grid   = seg(p, 0,    0.12);
  const eye    = seg(p, 0.05, 0.18);
  const line1  = seg(p, 0.10, 0.28);
  const line2  = seg(p, 0.22, 0.38);
  const line3  = seg(p, 0.32, 0.48);
  const sub    = seg(p, 0.42, 0.58);
  const iface  = seg(p, 0.52, 0.78);
  const dotP   = clamp((p - 0.72) / 0.20, 0, 1);

  // Blue dot travels from button → up into the stage preview
  const dotX = lerp(540, 540, dotP); // centered
  const dotY = lerp(1560, 1280, easeOut(dotP));

  // Headline characters reveal
  const headY = 560;
  const headSize = 100;

  return (
    <g>
      <SceneBg theme="dark" />
      <g opacity={grid}><BlueprintGrid theme="dark" /></g>

      {/* Eyebrow */}
      <g opacity={eye}>
        <TechLabel x={M} y={160} theme="dark">BUILD HAUS STUDIO / REEL GENERATOR</TechLabel>
        <line x1={M} y1={172} x2={VIDEO_WIDTH - M} y2={172}
          stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      </g>

      {/* Headline — each line fades in */}
      <text x={M} y={headY} fill={C.white} fontFamily={FONT}
        fontSize={headSize} fontWeight={850} letterSpacing={-2}
        opacity={line1}>
        Este reel
      </text>
      <text x={M} y={headY + headSize * 1.08} fill={C.white} fontFamily={FONT}
        fontSize={headSize} fontWeight={850} letterSpacing={-2}
        opacity={line2}>
        no fue
      </text>
      <text x={M} y={headY + headSize * 2.16} fill={C.white} fontFamily={FONT}
        fontSize={headSize} fontWeight={850} letterSpacing={-2}
        opacity={line3}>
        editado.
      </text>

      {/* Sub — blue reveal */}
      <text x={M} y={headY + headSize * 3.1} fill={C.blue} fontFamily={FONT}
        fontSize={42} fontWeight={700} letterSpacing={-0.5}
        opacity={sub}>
        Lo programamos.
      </text>

      {/* Thin divider */}
      <line x1={M} y1={headY + headSize * 3.6} x2={lerp(M, VIDEO_WIDTH - M, sub)}
        y2={headY + headSize * 3.6}
        stroke="rgba(255,255,255,0.15)" strokeWidth={1} />

      {/* Web App Interface */}
      <g opacity={iface}>
        {/* App frame */}
        <rect x={M} y={1080} width={VIDEO_WIDTH - M * 2} height={520}
          rx={T.r.lg} fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.10)" strokeWidth={1.2} />
        <CornerBrackets x={M} y={1080} w={VIDEO_WIDTH - M * 2} h={520}
          size={20} color={C.gray} opacity={0.3} />

        {/* Title bar */}
        <rect x={M} y={1080} width={VIDEO_WIDTH - M * 2} height={48}
          rx={T.r.lg} fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        {/* Traffic lights */}
        {[0, 1, 2].map(i => (
          <circle key={i} cx={M + 20 + i * 20} cy={1104} r={6}
            fill={['rgba(255,95,87,0.6)', 'rgba(254,188,46,0.6)', 'rgba(40,200,64,0.6)'][i]} />
        ))}
        <text x={540} y={1110} fill="rgba(255,255,255,0.4)" fontFamily={FONT}
          fontSize={13} fontWeight={600} textAnchor="middle" letterSpacing={2.5}>
          REEL GENERATOR · BUILD HAUS STUDIO
        </text>

        {/* Stage preview outline (9:16) */}
        <rect x={340} y={1148} width={180} height={320}
          rx={T.r.sm} fill="rgba(36,107,255,0.05)"
          stroke="rgba(36,107,255,0.25)" strokeWidth={1.2} />
        <CornerBrackets x={340} y={1148} w={180} h={320}
          size={12} color={C.blue} opacity={0.5} />
        <text x={430} y={1315} fill="rgba(255,255,255,0.2)" fontFamily={FONT}
          fontSize={11} fontWeight={600} textAnchor="middle" letterSpacing={2}>
          1080×1920
        </text>

        {/* Timeline track */}
        <rect x={M + 16} y={1500} width={VIDEO_WIDTH - M * 2 - 32} height={6}
          rx={3} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        {/* Frame ticks */}
        {Array.from({ length: 28 }, (_, i) => (
          <line key={i} x1={M + 16 + i * 31} y1={1496} x2={M + 16 + i * 31} y2={1510}
            stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
        ))}
        <text x={M + 16} y={1526} fill={C.gray} fontFamily={FONT}
          fontSize={11} fontWeight={600} letterSpacing={1.5}>
          00:00:00
        </text>
        <text x={VIDEO_WIDTH - M - 16} y={1526} fill={C.gray} fontFamily={FONT}
          fontSize={11} fontWeight={600} textAnchor="end" letterSpacing={1.5}>
          00:00:28
        </text>

        {/* Waveform */}
        <WaveformBar x={M + 16} y={1477} w={VIDEO_WIDTH - M * 2 - 32} theme="dark" />

        {/* Generate button */}
        <rect x={350} y={1548} width={280} height={48}
          rx={T.r.pill} fill={C.blue} />
        <text x={490} y={1578} fill={C.white} fontFamily={FONT}
          fontSize={15} fontWeight={700} textAnchor="middle" letterSpacing={2}>
          GENERAR REEL →
        </text>
      </g>

      {/* Traveling blue dot */}
      {dotP > 0 && <BlueDot x={dotX} y={dotY} r={7} opacity={easeOut(dotP)} />}

      {/* Technical footer */}
      <g opacity={eye}>
        <TechLabel x={M} y={1840} theme="dark">30 FPS · SVG MOTION SYSTEM · WEBM EXPORT</TechLabel>
        <TechLabel x={VIDEO_WIDTH - M} y={1840} theme="dark" anchor="end">REV.A / CODED</TechLabel>
      </g>
    </g>
  );
}
