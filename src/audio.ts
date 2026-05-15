import { DURATION_SECONDS } from './constants';

export type AudioConfig = {
  enabled: boolean;
  musicSrc: string;
  voiceSrc: string;
  musicVolume: number; // 0-100
  voiceVolume: number; // 0-100
};

export type AudioFileStatus = Record<string, boolean>;

export async function checkAudioFile(src: string): Promise<boolean> {
  if (!src) return false;
  try {
    const res = await fetch(src, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

// Audio preview via AudioContext — reliable since it's called on a user gesture.
export async function previewAudio(
  src: string,
  volume: number,
  previewSeconds = 5,
  onEnd?: () => void,
): Promise<AudioContext> {
  const ctx = new AudioContext();
  await ctx.resume();

  const res = await fetch(src);
  if (!res.ok) throw new Error(`Audio not found: ${src}`);

  const buf = await ctx.decodeAudioData(await res.arrayBuffer());
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  source.buffer = buf;
  gain.gain.value = Math.max(0, Math.min(1, volume / 100));
  source.connect(gain).connect(ctx.destination);
  source.start(0);
  source.stop(ctx.currentTime + Math.min(previewSeconds, buf.duration));
  source.onended = () => {
    ctx.close().catch(() => {});
    onEnd?.();
  };
  return ctx;
}

// Audio setup for WebM export — merges audio into the canvas stream.
export async function setupExportAudio(
  canvasStream: MediaStream,
  cfg: AudioConfig,
): Promise<{ stream: MediaStream; cleanup: () => void; warning?: string }> {
  const noAudio = { stream: canvasStream, cleanup: () => {} };

  if (!cfg.enabled || (!cfg.musicSrc && !cfg.voiceSrc)) return noAudio;

  try {
    const ctx = new AudioContext();
    const destination = ctx.createMediaStreamDestination();
    const sources: AudioBufferSourceNode[] = [];

    const loadTrack = async (src: string, volume: number, loop: boolean) => {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`Missing audio: ${src}`);
      const buf = await ctx.decodeAudioData(await res.arrayBuffer());
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      source.buffer = buf;
      source.loop = loop;
      // If looped music is shorter than the reel, it loops automatically.
      gain.gain.value = Math.max(0, Math.min(1, volume / 100));
      source.connect(gain).connect(destination);
      source.start(0);
      // Stop voiceover after its natural duration (no loop).
      if (!loop) source.stop(ctx.currentTime + Math.min(buf.duration, DURATION_SECONDS));
      sources.push(source);
    };

    if (cfg.musicSrc) await loadTrack(cfg.musicSrc, cfg.musicVolume, true);
    if (cfg.voiceSrc) await loadTrack(cfg.voiceSrc, cfg.voiceVolume, false);

    const audioTracks = destination.stream.getAudioTracks();

    if (import.meta.env.DEV) {
      console.log('[audio-export] audio tracks in stream:', audioTracks.length);
      console.log('[audio-export] music src:', cfg.musicSrc || 'none');
      console.log('[audio-export] voice src:', cfg.voiceSrc || 'none');
    }

    if (audioTracks.length === 0) {
      await ctx.close();
      return { ...noAudio, warning: 'El audio está activado, pero no se pudo agregar al stream de exportación.' };
    }

    const combined = new MediaStream([
      ...canvasStream.getVideoTracks(),
      ...audioTracks,
    ]);

    return {
      stream: combined,
      cleanup: () => {
        sources.forEach(s => { try { s.stop(); } catch {} });
        ctx.close().catch(() => {});
      },
    };
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[audio-export] failed:', err);
    return {
      stream: canvasStream,
      cleanup: () => {},
      warning: 'No se pudo cargar el audio para la exportación.',
    };
  }
}
