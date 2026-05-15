export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const FPS = 30;
export const DURATION_SECONDS = 28;
export const TOTAL_FRAMES = FPS * DURATION_SECONDS; // 840

export const C = {
  navy:      '#071D35',
  white:     '#F7FAFF',
  blue:      '#246BFF',
  lightBlue: '#66A9FF',
  gray:      '#7C90A8',
  blueprint: '#EAF0F8',
  darkLine:  '#1D3554',
  surface:   '#FFFFFF',
} as const;

export const FONT = 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif';

export const T = {
  width:  VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
  m:      90,   // margin
  sm:     108,  // safe margin
  r: { xs: 6, sm: 10, md: 18, lg: 28, pill: 999 },
  stroke: { thin: 1, regular: 1.5, strong: 2.5 },
  type: {
    logo:     42,
    headline: 82,
    title:    64,
    sub:      30,
    label:    18,
    micro:    14,
  },
} as const;

export const SCENES = [
  { id:  1, start:  0,    duration:  4,   theme: 'dark'  as const, label: 'Meta Hook'       },
  { id:  2, start:  4,    duration:  2,   theme: 'light' as const, label: 'System Proof'    },
  { id:  3, start:  6,    duration:  2,   theme: 'dark'  as const, label: 'Problem Hook'    },
  { id:  4, start:  8,    duration:  2.5, theme: 'light' as const, label: 'Discovery'       },
  { id:  5, start: 10.5,  duration:  2.5, theme: 'dark'  as const, label: 'Offer Structure' },
  { id:  6, start: 13,    duration:  2.5, theme: 'light' as const, label: 'User Journey'    },
  { id:  7, start: 15.5,  duration:  2.5, theme: 'dark'  as const, label: 'Wireframe'       },
  { id:  8, start: 18,    duration:  2.5, theme: 'light' as const, label: 'Design System'   },
  { id:  9, start: 20.5,  duration:  2.5, theme: 'dark'  as const, label: 'Development'     },
  { id: 10, start: 23,    duration:  2.5, theme: 'light' as const, label: 'Conversion'      },
  { id: 11, start: 25.5,  duration:  1.5, theme: 'dark'  as const, label: 'Final Website'   },
  { id: 12, start: 27,    duration:  1,   theme: 'light' as const, label: 'Final CTA'       },
] as const;

export const MUSIC_OPTIONS = {
  music: { label: 'Minimal tech loop', src: '/audio/build-haus-music.mp3' },
  none:  { label: 'Sin música',        src: '' },
} as const;

export const VOICE_OPTIONS = {
  none:      { label: 'Sin voz',          src: '' },
  voiceover: { label: 'Voz IA — Español', src: '/audio/build-haus-voiceover-es.mp3' },
} as const;

export const STATUS_IDLE      = 'Listo para generar una pequeña demostración de obsesión por el detalle.';
export const STATUS_PLAYING   = 'Generando el reel desde código…';
export const STATUS_PAUSED    = 'Pausado. El reel quedó en modo maqueta técnica.';
export const STATUS_FINISHED  = 'Reel generado. Sí, todo salió de una web app.';
export const STATUS_EXPORTING = 'Exportando el video. El código está haciendo su magia, pero de forma seria.';

export const AUDIO_MISSING_MSG =
  'Agregá tus archivos de audio en /public/audio/ para activar sonido.';
