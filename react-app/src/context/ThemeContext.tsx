import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { audioEngine } from '@/services/audioEngine';

export type ThemeId = 'cyber-lime';

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
    tag: 'SIGNATURE DARK',
    bgHex: '#0a0c0e',
    accHex: '#b8f04a',
    description: 'Signature dark ops console with neon lime accents',
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
