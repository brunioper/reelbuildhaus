import React from 'react';
import { Composition } from 'remotion';
import {
  FPS,
  HEIGHT,
  TOTAL_DURATION_IN_FRAMES,
  WIDTH,
} from '../reel/timeline';
import { BuildHausReel } from './BuildHausReel';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BuildHausReel"
        component={BuildHausReel}
        durationInFrames={TOTAL_DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
