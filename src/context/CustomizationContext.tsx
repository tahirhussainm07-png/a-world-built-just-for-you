import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, ColorPalette, TypographyConfig, MemoryItem, ReasonItem } from '../types';

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'storybook-bedroom',
    name: 'Storybook Bedroom',
    canvas: '#131118',
    surface: '#1E1A26',
    card: '#292434',
    blush: '#E8C5C8',
    cream: '#FAF6EE',
    accent: '#D4A373',
    text: '#F5F2EB',
    muted: '#A59FA9',
  },
  {
    id: 'moonlit-garden',
    name: 'Moonlit Garden',
    canvas: '#0E1716',
    surface: '#152422',
    card: '#1F3330',
    blush: '#D0E3D8',
    cream: '#F4F8F5',
    accent: '#A8C9B8',
    text: '#EFF5F2',
    muted: '#8CA698',
  },
  {
    id: 'vintage-parchment',
    name: 'Vintage Keepsake',
    canvas: '#1C1613',
    surface: '#2B221E',
    card: '#3B302B',
    blush: '#E6C2B4',
    cream: '#F7EFE9',
    accent: '#D99B77',
    text: '#F8F3EE',
    muted: '#AA998E',
  },
  {
    id: 'twilight-lilies',
    name: 'Twilight Lilies',
    canvas: '#10121A',
    surface: '#181C28',
    card: '#222738',
    blush: '#C7D2FE',
    cream: '#F8FAFC',
    accent: '#E0E7FF',
    text: '#F1F5F9',
    muted: '#94A3B8',
  },
];

export const FONT_OPTIONS = {
  display: [
    { label: 'Playfair Display (Storybook & Elegant)', value: 'Playfair Display' },
    { label: 'Cormorant Garamond (Dreamy Vintage)', value: 'Cormorant Garamond' },
    { label: 'Marcellus (Quiet & Cinematic)', value: 'Marcellus' },
    { label: 'Gaegu (Cute & Handcrafted)', value: 'Gaegu' },
    { label: 'Outfit (Modern Soft)', value: 'Outfit' },
  ],
  handwriting: [
    { label: 'Caveat (Warm & Natural)', value: 'Caveat' },
    { label: 'Kalam (Tender & Personal)', value: 'Kalam' },
    { label: 'Shadows Into Light (Delicate Whisper)', value: 'Shadows Into Light' },
    { label: 'Dancing Script (Playful Ribbon)', value: 'Dancing Script' },
    { label: 'Indie Flower (Cute Casual)', value: 'Indie Flower' },
  ],
  playful: [
    { label: 'Patrick Hand (Hand-drawn Doodles)', value: 'Patrick Hand' },
    { label: 'Sniglet (Rounded & Childish)', value: 'Sniglet' },
    { label: 'Gaegu (Playful Storybook)', value: 'Gaegu' },
  ],
  body: [
    { label: 'Plus Jakarta Sans (Crisp & Clean)', value: 'Plus Jakarta Sans' },
    { label: 'Outfit (Gentle Sans)', value: 'Outfit' },
    { label: 'Cormorant Garamond (Editorial Serif)', value: 'Cormorant Garamond' },
  ],
};

const DEFAULT_CONFIG: SiteConfig = {
  herName: 'Anya',
  myName: 'Tahir',
  birthdayDate: 'October 5',
  palette: COLOR_PALETTES[0],
  typography: {
    displayFont: 'Playfair Display',
    handwrittenFont: 'Caveat',
    playfulFont: 'Patrick Hand',
    bodyFont: 'Plus Jakarta Sans',
    titleSize: 2.8,
    bodySize: 1.0,
    handwrittenSize: 1.35,
    letterSpacing: 0.02,
    lineHeight: 1.6,
  },
  memories: [
    {
      id: 'm1',
      title: 'Golden Hour Walk',
      date: 'Late afternoon in November',
      caption: 'The way you pulled your sleeves over your knuckles and laughed before taking a sip of warm coffee.',
      imageUrl: '/src/assets/images/birthday_memory_stroll_1791180713837.jpg',
      rotation: -2.5,
    },
    {
      id: 'm2',
      title: 'Mochi Fast Asleep',
      date: 'Sunday morning quiet',
      caption: 'Curled up right on the notes I was trying to read, purring so softly we had to whisper.',
      imageUrl: '/src/assets/images/birthday_memory_cats_1791180727305.jpg',
      rotation: 3,
    },
    {
      id: 'm3',
      title: 'Shoreline Sunset',
      date: 'By the water',
      caption: 'Neither of us said a word for ten minutes. Just watched the sky turn from gold into lavender.',
      imageUrl: '/src/assets/images/birthday_memory_sunset_1791180737732.jpg',
      rotation: -1.8,
    },
    {
      id: 'm4',
      title: 'Lilies & Morning Jasmine',
      date: 'On the windowsill',
      caption: 'I remembered you said these are your favorites. The room smelled like fresh rain for three days.',
      imageUrl: '/src/assets/images/birthday_memory_flowers_1791180747540.jpg',
      rotation: 2.2,
    },
  ],
  reasons: [
    {
      id: 'r1',
      objectType: 'flower',
      iconLabel: 'Paper Flower',
      title: 'The quiet way you listen',
      text: 'You don’t just wait for your turn to talk. You look right at people and genuinely hold space for them.',
    },
  ],
  gardenLetters: [
    {
      id: 'gl1',
      number: '01',
      locationLabel: 'beside a white lily',
      heading: '01 — You.',
      message: 'I like the way your presence can make an ordinary moment feel a little less ordinary.',
      endSignoff: '— just because.',
      detailType: 'lily',
      rotation: -3,
    },
    {
      id: 'gl2',
      number: '02',
      locationLabel: 'under jasmine flowers',
      heading: '02 — That smile.',
      message: 'Somehow, your smile has a way of making everything around it feel a little lighter.',
      endSignoff: '✿',
      detailType: 'smile',
      rotation: 2.5,
    },
    {
      id: 'gl3',
      number: '03',
      locationLabel: 'on the garden string',
      heading: '03 — The little things.',
      message: 'It’s the tiny things about you that stay in my mind the longest. The things you probably don\'t even notice.',
      endSignoff: '✦',
      detailType: 'stars',
      rotation: -1.5,
    },
    {
      id: 'gl4',
      number: '04',
      locationLabel: 'resting on a stone',
      heading: '04 — Your heart.',
      message: 'I really admire the kindness you carry without making a big deal about it.',
      endSignoff: '🌿',
      detailType: 'jasmine',
      rotation: 3.8,
    },
    {
      id: 'gl5',
      number: '05',
      locationLabel: 'against a flower pot',
      heading: '05 — The moments.',
      message: 'There are little moments with you that I wish I could put in a jar and keep forever.',
      endSignoff: '🎞️',
      detailType: 'film',
      rotation: -2.2,
    },
    {
      id: 'gl6',
      number: '06',
      locationLabel: 'beneath the lantern',
      heading: '06 — One last thing.',
      message: 'Out of all the reasons I could write down, maybe the simplest one is this: you mean more to me than I usually know how to say.',
      endSignoff: 'That\'s all. For now. 🤍',
      detailType: 'heart',
      rotation: 1.5,
    },
  ],
  letter: {
    greeting: 'Dearest Anya,',
    paragraphs: [
      'I wanted to build something for you that felt slower than the rest of the internet. Something that feels like opening a little keepsake box that was tucked away in a quiet corner of the room.',
      'Thank you for being someone whose kindness is so natural and effortless. You notice things other people walk past. You love things with your whole heart—from little sleeping cats and tiny babies to the sweet scent of fresh lilies and jasmine after rain.',
      'Watching you navigate this world makes me want to be gentler, more patient, and more present. On your birthday, more than anything, I hope you feel how deeply cherished you are, and how much brightness you bring simply by existing.',
    ],
    closing: 'With all my love and warm wishes,',
    postscript: 'P.S. There is one more tiny star waiting for you in the corner...',
  },
  finalScene: {
    line1: 'And that’s it...',
    line2: 'I just wanted to give you a little world of your own today.',
    line3: 'Happy Birthday. 🤍',
  },
};

interface CustomizationContextType {
  config: SiteConfig;
  updateConfig: (updater: (prev: SiteConfig) => SiteConfig) => void;
  resetToDefault: () => void;
  isCreatorOpen: boolean;
  setIsCreatorOpen: (open: boolean) => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

const STORAGE_KEY = 'a_world_just_for_you_config_v1';

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...DEFAULT_CONFIG, ...parsed };
        }
      } catch {
        // use default
      }
    }
    return DEFAULT_CONFIG;
  });

  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // storage quota or error
    }

    // Apply CSS variables to root
    const root = document.documentElement;
    root.style.setProperty('--font-display', config.typography.displayFont);
    root.style.setProperty('--font-handwriting', config.typography.handwrittenFont);
    root.style.setProperty('--font-playful', config.typography.playfulFont);
    root.style.setProperty('--font-body', config.typography.bodyFont);

    root.style.setProperty('--title-size', `${config.typography.titleSize}rem`);
    root.style.setProperty('--body-size', `${config.typography.bodySize}rem`);
    root.style.setProperty('--handwritten-size', `${config.typography.handwrittenSize}rem`);
    root.style.setProperty('--letter-spacing', `${config.typography.letterSpacing}em`);
    root.style.setProperty('--line-height', `${config.typography.lineHeight}`);

    root.style.setProperty('--color-canvas', config.palette.canvas);
    root.style.setProperty('--color-surface', config.palette.surface);
    root.style.setProperty('--color-card', config.palette.card);
    root.style.setProperty('--color-blush', config.palette.blush);
    root.style.setProperty('--color-cream', config.palette.cream);
    root.style.setProperty('--color-accent', config.palette.accent);
    root.style.setProperty('--color-text', config.palette.text);
    root.style.setProperty('--color-muted', config.palette.muted);
  }, [config]);

  const updateConfig = (updater: (prev: SiteConfig) => SiteConfig) => {
    setConfig(prev => updater(prev));
  };

  const resetToDefault = () => {
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <CustomizationContext.Provider
      value={{
        config,
        updateConfig,
        resetToDefault,
        isCreatorOpen,
        setIsCreatorOpen,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export function useCustomization() {
  const ctx = useContext(CustomizationContext);
  if (!ctx) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return ctx;
}
