import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  sceneOpacityFrame,
  sceneProgressFrame,
  sceneTransformFrame,
} from '../reel/remotionTimeline';
import {
  Scene01,
  Scene02,
  Scene03,
  Scene04,
  Scene05,
  Scene06,
  Scene07,
  Scene08,
  Scene09,
  Scene10,
  Scene11,
  Scene12,
} from '../reel/scenes';
import { SHARED } from '../reel/shared';
import { HEIGHT, SCENES, WIDTH } from '../reel/timeline';

const SCENE_COMPONENTS = [
  Scene01,
  Scene02,
  Scene03,
  Scene04,
  Scene05,
  Scene06,
  Scene07,
  Scene08,
  Scene09,
  Scene10,
  Scene11,
  Scene12,
] as const;

/**
 * Single SVG stack — avoids duplicate clipPath/def IDs during crossfades.
 * Opacity + transform envelopes use Remotion interpolate (frame-accurate).
 */
export const BuildHausReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{ display: 'block' }}
      >
        <SHARED.SVGDefs />
        {SCENES.map((scene, i) => {
          const op = sceneOpacityFrame(frame, fps, i);
          if (op <= 0.001) return null;
          const sp = sceneProgressFrame(frame, fps, i);
          const xf = sceneTransformFrame(frame, fps, i);
          const Comp = SCENE_COMPONENTS[i];
          return (
            <g key={scene.id} opacity={op} transform={xf}>
              <Comp p={sp} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
