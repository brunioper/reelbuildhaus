import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { VIDEO_WIDTH, VIDEO_HEIGHT, DURATION_SECONDS, SCENES, C, FONT } from '../constants';
import { clamp, easeOut } from './shared';

import Scene01 from './Scene01';
import Scene02 from './Scene02';
import Scene03 from './Scene03';
import Scene04 from './Scene04';
import Scene05 from './Scene05';
import Scene06 from './Scene06';
import Scene07 from './Scene07';
import Scene08 from './Scene08';
import Scene09 from './Scene09';
import Scene10 from './Scene10';
import Scene11 from './Scene11';
import Scene12 from './Scene12';

const SCENE_COMPONENTS = [
  Scene01, Scene02, Scene03, Scene04,
  Scene05, Scene06, Scene07, Scene08,
  Scene09, Scene10, Scene11, Scene12,
] as const;

const FADE = 0.3; // fade duration in seconds

function sceneOpacity(progress: number, start: number, duration: number): number {
  const t = progress * DURATION_SECONDS;
  const local = t - start;
  if (local < -FADE || local > duration + FADE) return 0;
  const fadeIn  = clamp(local / FADE, 0, 1);
  const fadeOut = clamp((duration - local) / FADE, 0, 1);
  return Math.min(fadeIn, fadeOut);
}

function sceneProgress(progress: number, start: number, duration: number): number {
  const t = progress * DURATION_SECONDS;
  return clamp((t - start) / duration, 0, 1);
}

interface ReelSVGProps {
  progress: number;
}

const ReelSVG = forwardRef<SVGSVGElement, ReelSVGProps>(({ progress }, ref) => {
  const internalRef = useRef<SVGSVGElement>(null);

  useImperativeHandle(ref, () => internalRef.current!);

  // Listen for seek events from the export loop
  useEffect(() => {
    const el = internalRef.current;
    if (!el) return;
    // Export loop dispatches 'reel-seek' events — we don't need to handle them here
    // because the parent drives `progress` as a React prop.
    return () => {};
  }, []);

  return (
    <svg
      ref={internalRef}
      className="reel-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIDEO_WIDTH} ${VIDEO_HEIGHT}`}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
      role="img"
      aria-label="Build Haus Studio animated Instagram Reel"
    >
      <defs>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {SCENES.map((scene, i) => {
        const op = sceneOpacity(progress, scene.start, scene.duration);
        if (op <= 0.001) return null;
        const SceneComp = SCENE_COMPONENTS[i];
        const sp = sceneProgress(progress, scene.start, scene.duration);
        return (
          <g key={scene.id} opacity={op}>
            <SceneComp p={sp} />
          </g>
        );
      })}

      {/* Persistent frame indicator — very subtle, always visible */}
      <text
        x={VIDEO_WIDTH / 2}
        y={VIDEO_HEIGHT - 24}
        fill="rgba(124,144,168,0.2)"
        fontFamily={FONT}
        fontSize={11}
        fontWeight={600}
        textAnchor="middle"
        letterSpacing={2}
      >
        BUILD HAUS STUDIO
      </text>
    </svg>
  );
});

ReelSVG.displayName = 'ReelSVG';

export default ReelSVG;
