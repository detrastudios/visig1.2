
export enum LanguageStyle {
  PERSUASIVE = 'Persuasif',
  STORYTELLING = 'Storytelling',
  PROFESSIONAL = 'Profesional',
  EDUCATIVE = 'Edukatif',
  CASUAL = 'Santai',
  FUN = 'Fun/Menghibur'
}

export enum ContentLength {
  SHORT = 'Pendek (< 30 Detik)',
  MEDIUM = 'Sedang (30 - 60 Detik)',
  LONG = 'Panjang (> 60 Detik)'
}

export enum HookType {
  NONE = 'Tidak Ada',
  CONTROVERSIAL = 'Kontroversial',
  RHETORICAL = 'Pertanyaan Retoris',
  QUOTES = 'Kutipan Releatable',
  FACTS = 'Fakta Mengejutkan',
  SOLUTIONS = 'Masalah & Solusi',
  BEFORE_AFTER = 'Before & After',
  COMPARISON = 'X dibanding Y',
  TESTIMONIAL = 'Testimoni/Review',
  UNBOXING = 'First Impression/Unboxing'
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface GeneratedScript {
  id: string;
  title: string;
  content: string;
  hashtags: string[];
  sources?: GroundingSource[];
}

export interface SocialMediaBundle {
  reels: string;
  feed: {
    title: string;
    visual: string;
    caption: string;
  };
  carousel: {
    slides: { title: string; content: string }[];
  };
  threads: string[];
}

export interface ScriptFormValues {
  productUrl: string;
  style: LanguageStyle;
  length: ContentLength;
  hook: HookType;
  scriptCount: number;
}
