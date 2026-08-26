import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { audioEngine } from '@/services/audioEngine';

export type ThemeId = 'cyber-lime' | 'neon-cyan' | 'solar-amber' | 'matrix-green' | 'obsidian-light';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tag: string;
  bgHex: string;
  accHex: string;
  description: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'cyber-lime',
    name: 'Cyber Lime',
    tag: 'DEFAULT',
    bgHex: '#0a0c0e',
    accHex: '#b8f04a',
    description: 'Signature dark ops console with neon lime accents',
  },
  {
    id: 'neon-cyan',
    name: 'Neon Cyan',
    tag: 'SCI-FI',
    bgHex: '#080d14',
    accHex: '#00f0ff',
    description: 'Deep navy cyberpunk interface with vibrant cyan',
  },
  {
    id: 'solar-amber',
    name: 'Solar Amber',
    tag: 'INDUSTRIAL',
    bgHex: '#0e0b08',
    accHex: '#ffb703',
    description: 'Heavy operations dark warm palette with gold amber',
  },
  {
    id: 'matrix-green',
    name: 'Matrix Green',
    tag: 'TERMINAL',
    bgHex: '#050905',
    accHex: '#39ff14',
    description: 'Phosphor green CRT terminal aesthetics',
  },
  {
    id: 'obsidian-light',
    name: 'Obsidian Light',
    tag: 'CLEAN LIGHT',
    bgHex: '#f4f6f8',
    accHex: '#0284c7',
    description: 'Crisp, high-contrast daylight studio mode',
  },
];

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  themes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = 'jnp-portfolio-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (saved && THEMES.some(t => t.id === saved)) {
      return saved;
    }
    return 'cyber-lime';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (id: ThemeId) => {
    if (THEMES.some(t => t.id === id)) {
      setThemeState(id);
      audioEngine.cmd();
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
