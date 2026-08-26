import { useState, useRef, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NoiseOverlay } from '@/components/NoiseOverlay';
import { ParticleCanvas, type ParticleCanvasRef } from '@/components/ParticleCanvas';
import { CommandPalette } from '@/components/CommandPalette';
import { CustomCursor } from '@/components/CustomCursor';
import { TerminalDrawer } from '@/components/TerminalDrawer';
import { MinimalHubPage } from '@/pages/MinimalHubPage';
import { HomePage } from '@/pages/HomePage';
import { PersonalityPage } from '@/pages/PersonalityPage';
import { useAudio } from '@/hooks/useAudio';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function App() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [termOpen, setTermOpen] = useState(false);
  const canvasRef = useRef<ParticleCanvasRef>(null);
  const konamiIndex = useRef(0);
  const location = useLocation();
  const { sfxEnabled, toggleSfx, playCmd, playFanfare } = useAudio();

  const handleMatrixRain = useCallback(() => {
    canvasRef.current?.triggerMatrixRain();
  }, []);

  // Global hotkeys (Ctrl+K, Cmd+K, /, ~, and Konami Code)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName);

      // Konami Code detector
      if (e.key.toLowerCase() === KONAMI_CODE[konamiIndex.current].toLowerCase()) {
        konamiIndex.current += 1;
        if (konamiIndex.current === KONAMI_CODE.length) {
          konamiIndex.current = 0;
          playFanfare();
          handleMatrixRain();
        }
      } else {
        konamiIndex.current = 0;
      }

      // Hotkey: Ctrl+K / Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playCmd();
        setCmdOpen(prev => !prev);
      }
      // Hotkey: /
      else if (e.key === '/' && !isInput) {
        e.preventDefault();
        playCmd();
        setCmdOpen(true);
      }
      // Hotkey: ` or ~ or Ctrl+\ (Terminal Toggle)
      else if ((e.key === '`' || e.key === '~' || (e.ctrlKey && e.key === '\\')) && !isInput) {
        e.preventDefault();
        playCmd();
        setTermOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playCmd, playFanfare, handleMatrixRain]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('erzon22@gmail.com');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = 'erzon22@gmail.com';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomCursor />
      <NoiseOverlay />
      <ParticleCanvas ref={canvasRef} />

      <Navbar
        onOpenCmd={() => setCmdOpen(true)}
        onOpenTerminal={() => setTermOpen(true)}
      />

      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MinimalHubPage />} />
            <Route path="/console" element={<HomePage />} />
            <Route path="/portfolio" element={<HomePage />} />
            <Route path="/personality" element={<PersonalityPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer sfxEnabled={sfxEnabled} onToggleSfx={toggleSfx} />

      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onCopyEmail={handleCopyEmail}
        onMatrixRain={handleMatrixRain}
        onOpenTerminal={() => setTermOpen(true)}
      />

      <TerminalDrawer
        isOpen={termOpen}
        onClose={() => setTermOpen(false)}
        onMatrixRain={handleMatrixRain}
      />
    </div>
  );
}

export default App;
