export interface TypographyConfig {
  displayFont: string;
  handwrittenFont: string;
  playfulFont: string;
  bodyFont: string;
  titleSize: number; // in rem
  bodySize: number; // in rem
  handwrittenSize: number; // in rem
  letterSpacing: number; // in em
  lineHeight: number;
}

export interface ColorPalette {
  id: string;
  name: string;
  canvas: string;
  surface: string;
  card: string;
  blush: string;
  cream: string;
  accent: string;
  text: string;
  muted: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  date?: string;
  caption: string;
  imageUrl: string;
  rotation: number;
}

export interface GardenLetterItem {
  id: string;
  number: string;
  locationLabel: string;
  heading: string;
  message: string;
  endSignoff?: string;
  detailType: 'lily' | 'smile' | 'stars' | 'jasmine' | 'film' | 'heart';
  rotation: number;
}

export interface ReasonItem {
  id: string;
  objectType: 'flower' | 'lantern' | 'envelope' | 'sign' | 'bloom' | 'dewdrop';
  iconLabel: string;
  title: string;
  text: string;
}

export interface SiteConfig {
  herName: string;
  myName: string;
  birthdayDate: string;
  palette: ColorPalette;
  typography: TypographyConfig;
  memories: MemoryItem[];
  reasons: ReasonItem[];
  gardenLetters: GardenLetterItem[];
  letter: {
    greeting: string;
    paragraphs: string[];
    closing: string;
    postscript: string;
  };
  finalScene: {
    line1: string;
    line2: string;
    line3: string;
  };
}

export type SceneId = 
  | 'waiting'        // 01: Something is waiting
  | 'bow-arrow'      // 02: Bow and arrow heart moment
  | 'birthday-room'  // 03: The little world opens + cake candles
  | 'memories'       // 04: Polaroid string memories
  | 'garden-lore'    // 05: The secret garden reasons
  | 'bouquet'        // 06: Lily + Jasmine bouquet presentation
  | 'final-letter'   // 07: Wooden desk letter
  | 'end-scene';     // 08: Rooftop night & final star
