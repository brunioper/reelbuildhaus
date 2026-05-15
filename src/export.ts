import type { RefObject } from 'react';
import { VIDEO_WIDTH, VIDEO_HEIGHT, FPS, TOTAL_FRAMES, DURATION_SECONDS } from './constants';
import { setupExportAudio, type AudioConfig } from './audio';

async function rasterizeSVG(svg: SVGSVGElement, canvas: HTMLCanvasElement): Promise<void> {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('width', String(VIDEO_WIDTH));
  clone.setAttribute('height', String(VIDEO_HEIGHT));
  clone.setAttribute('viewBox', `0 0 ${VIDEO_WIDTH} ${VIDEO_HEIGHT}`);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const serialized = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = new Image();

  try {
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('SVG rasterization failed'));
      img.src = url;
    });
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');
    ctx.clearRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
    ctx.drawImage(img, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function chooseMimeType(): string {
  const candidates = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
  ];
  return candidates.find(m => MediaRecorder.isTypeSupported(m)) ?? 'video/webm';
}

export async function exportWebM(
  svgRef: RefObject<SVGSVGElement | null>,
  setProgress: (p: number) => void,
  setFrame: (f: (prev: number) => number) => void,
  audioCfg: AudioConfig,
  onWarning?: (msg: string) => void,
): Promise<void> {
  if (!svgRef.current) throw new Error('SVG ref not available');

  const canvas = document.createElement('canvas');
  canvas.width = VIDEO_WIDTH;
  canvas.height = VIDEO_HEIGHT;

  const canvasStream = canvas.captureStream(FPS);
  const mimeType = chooseMimeType();

  if (import.meta.env.DEV) {
    console.log('[export] mime type:', mimeType);
    console.log('[export] video tracks:', canvasStream.getVideoTracks().length);
  }

  const { stream, cleanup, warning } = await setupExportAudio(canvasStream, audioCfg);

  if (warning) onWarning?.(warning);

  if (import.meta.env.DEV) {
    console.log('[export] combined audio tracks:', stream.getAudioTracks().length);
    console.log('[export] total frames:', TOTAL_FRAMES, '· duration:', DURATION_SECONDS, 's');
  }

  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 12_000_000,
  });
  const chunks: BlobPart[] = [];
  recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };

  recorder.start();

  try {
    // Deterministic frame loop — exactly TOTAL_FRAMES frames, no wall-clock drift.
    for (let frame = 0; frame <= TOTAL_FRAMES; frame++) {
      const progress = frame / TOTAL_FRAMES;

      // Drive the SVG to this progress position by dispatching a custom event.
      // The SVG component listens for this and updates its render state.
      svgRef.current.dispatchEvent(
        new CustomEvent('reel-seek', { detail: { progress }, bubbles: true }),
      );

      // Wait one rAF so React can re-render the SVG at this progress.
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

      // Rasterize the SVG into the canvas (which feeds captureStream).
      await rasterizeSVG(svgRef.current!, canvas);

      setProgress(progress);
      setFrame(f => f + 1);
    }
  } finally {
    recorder.stop();

    await new Promise<void>(resolve => { recorder.onstop = () => resolve(); });
    cleanup();
    stream.getTracks().forEach(t => t.stop());
    canvasStream.getTracks().forEach(t => t.stop());
  }

  await new Promise<void>(resolve => setTimeout(resolve, 200));

  const blob = new Blob(chunks, { type: mimeType });

  if (import.meta.env.DEV) {
    console.log('[export] blob size:', (blob.size / 1024 / 1024).toFixed(2), 'MB');
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'build-haus-reel.webm';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export async function exportPNGFrames(
  svgRef: RefObject<SVGSVGElement | null>,
  setProgress: (p: number) => void,
): Promise<void> {
  if (!svgRef.current) throw new Error('SVG ref not available');

  const canvas = document.createElement('canvas');
  canvas.width = VIDEO_WIDTH;
  canvas.height = VIDEO_HEIGHT;

  // Export every 6th frame (~5 fps sample) as individual PNGs downloaded sequentially.
  const step = 6;

  for (let frame = 0; frame <= TOTAL_FRAMES; frame += step) {
    const progress = frame / TOTAL_FRAMES;
    svgRef.current.dispatchEvent(
      new CustomEvent('reel-seek', { detail: { progress }, bubbles: true }),
    );
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    await rasterizeSVG(svgRef.current!, canvas);

    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `frame-${String(frame).padStart(4, '0')}.png`;
    a.click();

    setProgress(frame / TOTAL_FRAMES);
    // Small delay to avoid flooding the browser download queue.
    await new Promise<void>(resolve => setTimeout(resolve, 80));
  }

  if (import.meta.env.DEV) {
    console.log('[export-png] done');
  }
}
