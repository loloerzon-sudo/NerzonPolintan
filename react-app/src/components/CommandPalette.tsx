import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '@/hooks/useAudio';
import { useTheme } from '@/context/ThemeContext';

interface Cmd { id: string; cat: string; label: string; key: string; action: () => void; }

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyEmail: () => void;
  onMatrixRain: () => void;
  onOpenTerminal: () => void;
}

export function CommandPalette({ isOpen, onClose, onCopyEmail, onMatrixRain, onOpenTerminal }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { playHover, playSuccess, toggleSfx } = useAudio();
  const { setTheme } = useTheme();

  const COMMANDS: Cmd[] = [
    { id: 'nav-hub', cat: 'GATEWAY', label: 'Minimal Digital Hub (Home)', key: 'HUB', action: () => navigate('/') },
    { id: 'nav-console', cat: 'GATEWAY', label: 'Full Interactive Ops Console', key: 'OPS', action: () => navigate('/console') },
    { id: 'act-intj', cat: 'GATEWAY', label: 'INTJ-A Cognitive Blueprint', key: 'VIEW', action: () => navigate('/personality') },
    { id: 'sec-01', cat: 'SECTION', label: '01 — Profile (Console)', key: 'JUMP', action: () => { navigate('/console#profile'); } },
    { id: 'sec-02', cat: 'SECTION', label: '02 — Pipeline (Console)', key: 'JUMP', action: () => { navigate('/console#pipeline'); } },
    { id: 'sec-03', cat: 'SECTION', label: '03 — Experience (Console)', key: 'JUMP', action: () => { navigate('/console#experience'); } },
    { id: 'sec-04', cat: 'SECTION', label: '04 — Skills (Console)', key: 'JUMP', action: () => { navigate('/console#skills'); } },
    { id: 'sec-05', cat: 'SECTION', label: '05 — Credentials (Console)', key: 'JUMP', action: () => { navigate('/console#credentials'); } },
    { id: 'sec-06', cat: 'SECTION', label: '06 — Contact (Console)', key: 'JUMP', action: () => { navigate('/console#contact'); } },
    { id: 'proj-tumpak', cat: 'PROJECT', label: 'Tumpak! Tagalog Game [In-Progress]', key: 'LINK', action: () => window.open('https://tumpak-tagalog-game.vercel.app/', '_blank', 'noopener') },
    { id: 'proj-akhi', cat: 'PROJECT', label: 'Akhi Builders Corp. [Completed]', key: 'LINK', action: () => window.open('https://www.akhibuilderscorp.com/', '_blank', 'noopener') },
    { id: 'proj-icy', cat: 'PROJECT', label: 'Icy Brow Studio [Completed]', key: 'LINK', action: () => window.open('https://icybrowstudio.com/', '_blank', 'noopener') },
    { id: 'proj-jnp', cat: 'PROJECT', label: 'JNP Photography Portfolio [Completed]', key: 'LINK', action: () => window.open('https://jnp-blue.vercel.app/', '_blank', 'noopener') },
    { id: 'act-term', cat: 'SYSTEM', label: 'Launch Interactive CLI Terminal Sandbox', key: 'TERM', action: onOpenTerminal },
    { id: 'act-cv', cat: 'ACTION', label: 'Download CV / Resume (PDF)', key: 'FILE', action: () => {
      const a = document.createElement('a'); a.href = '/assets/documents/John-Nerzon-Polintan-CV-2026.pdf'; a.download = 'John-Nerzon-Polintan-CV-2026.pdf'; a.click();
    }},
    { id: 'act-mail', cat: 'ACTION', label: 'Copy Email Address', key: 'COPY', action: onCopyEmail },
    { id: 'act-sfx', cat: 'ACTION', label: 'Toggle Sound Effects', key: 'AUDIO', action: () => toggleSfx() },
    { id: 'act-wa', cat: 'ACTION', label: 'WhatsApp Quick Chat', key: 'CHAT', action: () => window.open('https://wa.me/639165271923', '_blank', 'noopener') },
    { id: 'act-ig', cat: 'ACTION', label: 'Instagram Profile (@erztagram)', key: 'INSTA', action: () => window.open('https://www.instagram.com/erztagram/', '_blank', 'noopener') },
    { id: 'thm-lime', cat: 'THEME', label: 'Theme: Cyber Lime (Signature Dark)', key: 'LIME', action: () => setTheme('cyber-lime') },
    { id: 'thm-cyan', cat: 'THEME', label: 'Theme: Neon Cyan (Sci-Fi Deep Navy)', key: 'CYAN', action: () => setTheme('neon-cyan') },
    { id: 'thm-amber', cat: 'THEME', label: 'Theme: Solar Amber (Industrial Gold)', key: 'AMBER', action: () => setTheme('solar-amber') },
    { id: 'thm-pink', cat: 'THEME', label: 'Theme: Cyber Magenta (Synthwave Neon Pink)', key: 'PINK', action: () => setTheme('neon-pink') },
    { id: 'thm-light', cat: 'THEME', label: 'Theme: Studio Light (High-Contrast Daylight)', key: 'LIGHT', action: () => setTheme('obsidian-light') },
    { id: 'act-matrix', cat: 'SYSTEM', label: 'matrix // Trigger Cyber Rain Burst', key: 'EXEC', action: onMatrixRain },
  ];

  const filtered = query.trim()
    ? COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || c.cat.toLowerCase().includes(query.toLowerCase()))
    : COMMANDS;

  const execute = useCallback((cmd: Cmd) => {
    onClose();
    playSuccess();
    setTimeout(() => cmd.action(), 80);
  }, [onClose, playSuccess]);

  useEffect(() => {
    if (isOpen) { setQuery(''); setActiveIdx(0); setTimeout(() => inputRef.current?.focus(), 40); }
  }, [isOpen]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => (i + 1) % filtered.length); playHover(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => (i - 1 + filtered.length) % filtered.length); playHover(); }
      if (e.key === 'Enter')     { e.preventDefault(); if (filtered[activeIdx]) execute(filtered[activeIdx]); }
      if (e.key === 'Escape')    { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, filtered, activeIdx, execute, onClose, playHover]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cmd-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
          aria-modal="true" role="dialog" aria-label="Command Palette"
        >
          <motion.div
            className="cmd-dialog"
            initial={{ y: -16, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.2, 0.65, 0.2, 1] as const }}
          >
            <div className="cmd-head">
              <div className="cmd-prompt mono">&gt;_</div>
              <input
                ref={inputRef}
                className="cmd-input"
                placeholder="Type a command, project, or section..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
              <button className="cmd-esc mono" onClick={onClose}>ESC</button>
            </div>
            <div className="cmd-body">
              <div className="cmd-group-label mono">COMMANDS &amp; SHORTCUTS</div>
              {filtered.length === 0 ? (
                <div style={{ padding: '16px 12px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--dim)' }}>
                  No matching commands found.
                </div>
              ) : filtered.map((cmd, i) => (
                <div
                  key={cmd.id}
                  className={`cmd-item${i === activeIdx ? ' active' : ''}`}
                  role="option"
                  aria-selected={i === activeIdx}
                  onClick={() => execute(cmd)}
                  onMouseEnter={() => { setActiveIdx(i); playHover(); }}
                >
                  <div className="cmd-item-left">
                    <i>[{cmd.cat}]</i>
                    <span>{cmd.label}</span>
                  </div>
                  <span className="cmd-item-key">{cmd.key}</span>
                </div>
              ))}
            </div>
            <div className="cmd-foot mono">
              <span><b>↑↓</b> NAVIGATE</span>
              <span><b>ENTER</b> EXECUTE</span>
              <span><b>ESC</b> CLOSE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
