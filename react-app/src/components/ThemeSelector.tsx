import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme, type ThemeId } from '@/context/ThemeContext';
import { useAudio } from '@/hooks/useAudio';

export function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover } = useAudio();

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (id: ThemeId) => {
    setTheme(id);
    playClick();
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className="hd-action"
        onClick={() => {
          playClick();
          setIsOpen((prev) => !prev);
        }}
        aria-label="Change Color Theme"
        title="Switch color theme"
        style={{ display: 'flex', alignItems: 'center', gap: 6 }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: currentTheme.accHex,
            boxShadow: `0 0 6px ${currentTheme.accHex}`,
            display: 'inline-block',
          }}
        />
        <span>THEME</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.2, 0.65, 0.2, 1] as const }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: 250,
              background: 'var(--panel)',
              border: '1px solid var(--line2)',
              borderRadius: 6,
              boxShadow: '0 16px 40px rgba(0,0,0,0.65), 0 0 20px rgba(0,0,0,0.4)',
              padding: '8px',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 9.5,
                letterSpacing: '.16em',
                color: 'var(--dim)',
                padding: '4px 8px 6px',
                borderBottom: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>SELECT COLOR PALETTE</span>
              <span>[5 MODES]</span>
            </div>

            {themes.map((t) => {
              const isActive = t.id === theme;
              return (
                <motion.button
                  key={t.id}
                  onClick={() => handleSelect(t.id)}
                  onMouseEnter={() => playHover()}
                  whileHover={{ x: 2, backgroundColor: 'rgba(255,255,255,0.04)' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 4,
                    border: isActive ? `1px solid ${t.accHex}` : '1px solid transparent',
                    background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* Dual swatch preview: background circle + accent center */}
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        backgroundColor: t.bgHex,
                        border: '1px solid var(--line2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: t.accHex,
                        }}
                      />
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--disp)',
                          fontSize: 13,
                          fontWeight: 700,
                          color: isActive ? t.accHex : 'var(--txt)',
                          lineHeight: 1.2,
                        }}
                      >
                        {t.name}
                      </div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--dim)' }}>
                        {t.tag}
                      </div>
                    </div>
                  </div>

                  {isActive && (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: t.accHex }}>
                      ✓
                    </span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
