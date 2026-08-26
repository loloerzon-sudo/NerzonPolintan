import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '@/hooks/useAudio';
import { useTheme } from '@/context/ThemeContext';

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onMatrixRain: () => void;
}

interface LogEntry {
  type: 'input' | 'output' | 'error' | 'system';
  text: ReactNode;
}

export function TerminalDrawer({ isOpen, onClose, onMatrixRain }: TerminalDrawerProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'system', text: 'JNP // SECURE OPS TERMINAL v2.6.8 [READY]' },
    { type: 'system', text: 'Type "help" to view available diagnostic commands.' },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { playClick, playFanfare } = useAudio();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = useCallback((raw: string) => {
    const parts = raw.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts[1]?.toLowerCase();
    playClick();

    setHistory(prev => [...prev, { type: 'input', text: `$ ${raw}` }]);
    if (raw.trim()) {
      setCmdHistory(prev => [...prev, raw]);
      setHistoryIndex(-1);
    }

    switch (cmd) {
      case 'help':
        setHistory(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div>
                <div style={{ color: 'var(--acc)', fontWeight: 700 }}>AVAILABLE COMMANDS:</div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '4px 12px', marginTop: 6 }}>
                  <span className="mono dim">skills</span><span>List core technical capability matrix</span>
                  <span className="mono dim">pipeline</span><span>Display 6-stage game release workflow</span>
                  <span className="mono dim">status</span><span>System uptime &amp; current availability</span>
                  <span className="mono dim">theme &lt;name&gt;</span><span>Switch theme (lime, cyan, amber, green, light)</span>
                  <span className="mono dim">cat bio</span><span>View cognitive profile &amp; overview</span>
                  <span className="mono dim">matrix</span><span>Trigger full-screen cyber matrix burst</span>
                  <span className="mono dim">whoami</span><span>Display session identity</span>
                  <span className="mono dim">contact</span><span>Display direct communication channels</span>
                  <span className="mono dim">clear</span><span>Flush terminal buffer</span>
                  <span className="mono dim">exit</span><span>Close terminal session</span>
                </div>
              </div>
            ),
          },
        ]);
        break;

      case 'skills':
        setHistory(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div style={{ lineHeight: 1.6 }}>
                <div>✦ <b style={{ color: 'var(--acc)' }}>AI &amp; VIBE CODING:</b> Claude Code, Antigravity, Cursor, OpenAI Codex, Airtable</div>
                <div>✦ <b style={{ color: 'var(--acc)' }}>GAMING &amp; OPS:</b> Game Release Mgmt, Provider Intake, Jira, Content QA</div>
                <div>✦ <b style={{ color: 'var(--acc)' }}>ENTERPRISE IT:</b> Windows, macOS Expert, ServiceNow, Active Directory, O365</div>
              </div>
            ),
          },
        ]);
        break;

      case 'pipeline':
        setHistory(prev => [
          ...prev,
          {
            type: 'output',
            text: 'STG/01 Intake ➔ STG/02 Config ➔ STG/03 Integration ➔ STG/04 QA ➔ STG/05 Deploy ➔ STG/06 Live Support',
          },
        ]);
        break;

      case 'status':
        setHistory(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div style={{ color: 'var(--acc)' }}>
                [OK] REEVO IGAMING PLATFORM // ACTIVE<br />
                [OK] AVAILABILITY // OPEN TO SELECT PROJECTS &amp; CONTRACTS<br />
                [OK] BASE // PHILIPPINES (GMT+8) · REMOTE WORLDWIDE
              </div>
            ),
          },
        ]);
        break;

      case 'theme':
        if (arg === 'lime' || arg === 'cyber-lime') {
          setTheme('cyber-lime');
          setHistory(prev => [...prev, { type: 'system', text: 'Active theme switched to [Cyber Lime]' }]);
        } else if (arg === 'cyan' || arg === 'neon-cyan') {
          setTheme('neon-cyan');
          setHistory(prev => [...prev, { type: 'system', text: 'Active theme switched to [Neon Cyan]' }]);
        } else if (arg === 'amber' || arg === 'solar-amber') {
          setTheme('solar-amber');
          setHistory(prev => [...prev, { type: 'system', text: 'Active theme switched to [Solar Amber]' }]);
        } else if (arg === 'green' || arg === 'matrix' || arg === 'matrix-green') {
          setTheme('matrix-green');
          setHistory(prev => [...prev, { type: 'system', text: 'Active theme switched to [Matrix Green]' }]);
        } else if (arg === 'light' || arg === 'obsidian-light') {
          setTheme('obsidian-light');
          setHistory(prev => [...prev, { type: 'system', text: 'Active theme switched to [Obsidian Light]' }]);
        } else {
          setHistory(prev => [
            ...prev,
            {
              type: 'output',
              text: 'Usage: theme <lime | cyan | amber | green | light>',
            },
          ]);
        }
        break;

      case 'cat bio':
      case 'bio':
        setHistory(prev => [
          ...prev,
          {
            type: 'output',
            text: 'John Nerzon Polintan — 12+ years in IT Systems, Gaming Operations, and AI Workflow Automation. INTJ-A Architect Profile.',
          },
        ]);
        break;

      case 'whoami':
        setHistory(prev => [
          ...prev,
          { type: 'output', text: 'guest@nerzon.online (Recruiter / Client Session)' },
        ]);
        break;

      case 'contact':
        setHistory(prev => [
          ...prev,
          {
            type: 'output',
            text: (
              <div>
                Email: <a href="mailto:erzon22@gmail.com" style={{ color: 'var(--acc)', textDecoration: 'underline' }}>erzon22@gmail.com</a><br />
                WhatsApp: <a href="https://wa.me/639165271923" target="_blank" rel="noopener" style={{ color: 'var(--acc)', textDecoration: 'underline' }}>+63 916 527 1923</a><br />
                LinkedIn: <a href="https://linkedin.com/in/erzon22" target="_blank" rel="noopener" style={{ color: 'var(--acc)', textDecoration: 'underline' }}>linkedin.com/in/erzon22</a><br />
                Instagram: <a href="https://www.instagram.com/erztagram/" target="_blank" rel="noopener" style={{ color: 'var(--acc)', textDecoration: 'underline' }}>instagram.com/erztagram</a>
              </div>
            ),
          },
        ]);
        break;

      case 'matrix':
        playFanfare();
        onMatrixRain();
        setHistory(prev => [
          ...prev,
          { type: 'system', text: '[CASCADE] Cyber Matrix rain sequence initialized!' },
        ]);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'exit':
      case 'quit':
        onClose();
        break;

      case '':
        break;

      default:
        setHistory(prev => [
          ...prev,
          { type: 'error', text: `Command not recognized: "${raw}". Type "help" for a list of commands.` },
        ]);
        break;
    }
  }, [playClick, playFanfare, onMatrixRain, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIndex = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(10,12,14,0.85)', backdropFilter: 'blur(10px)', zIndex: 9990, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.2, 0.65, 0.2, 1] as const }}
            style={{ width: 'min(720px, 94vw)', height: 'min(500px, 80vh)', background: 'var(--panel)', border: '1px solid var(--acc)', borderRadius: 6, display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(184,240,74,0.15)', overflow: 'hidden' }}
          >
            {/* Terminal Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'var(--panel2)', borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.14em', color: 'var(--acc)' }}>
                <span className="dot-sm" />
                JNP // TERMINAL SANDBOX
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--dim)' }}>[HOTKEY: ~ / `]</span>
                <button
                  onClick={onClose}
                  style={{ fontFamily: 'var(--mono)', fontSize: 10, border: '1px solid var(--line2)', borderRadius: 2, padding: '2px 7px', color: 'var(--dim)', cursor: 'pointer' }}
                >
                  ESC
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              style={{ flex: 1, padding: 16, overflowY: 'auto', fontFamily: 'var(--mono)', fontSize: 12.5, lineHeight: 1.6, color: 'var(--txt)' }}
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((h, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: 8,
                    color: h.type === 'input'
                      ? 'var(--acc)'
                      : h.type === 'error'
                      ? 'var(--red)'
                      : h.type === 'system'
                      ? 'var(--dim)'
                      : 'var(--txt)',
                  }}
                >
                  {h.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'var(--bg2)', borderTop: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--acc)', fontWeight: 700 }}>$</span>
              <input
                ref={inputRef}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'skills', 'pipeline', 'matrix'..."
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--txt)', fontFamily: 'var(--mono)', fontSize: 13 }}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
