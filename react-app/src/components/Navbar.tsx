import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '@/hooks/useAudio';
import { ThemeSelector } from '@/components/ThemeSelector';

const consoleNavLinks = [
  { href: '#profile', label: 'PROFILE', num: '01' },
  { href: '#pipeline', label: 'PIPELINE', num: '02' },
  { href: '#experience', label: 'EXPERIENCE', num: '03' },
  { href: '#skills', label: 'SKILLS', num: '04' },
  { href: '#credentials', label: 'CREDENTIALS', num: '05' },
  { href: '#contact', label: 'CONTACT', num: '06' },
];

function useClock(tz: string) {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}

interface NavbarProps {
  onOpenCmd: () => void;
  onOpenTerminal?: () => void;
}

type MobileNavItem =
  | { label: string; icon: string; action: () => void; accent: boolean; href?: never; isRoute?: never; download?: never }
  | { label: string; icon: string; href: string; isRoute: true; accent: boolean; action?: never; download?: never }
  | { label: string; icon: string; href: string; download: true; accent: boolean; action?: never; isRoute?: never }
  | { label: string; icon: string; href: string; accent: boolean; action?: never; isRoute?: never; download?: never };

export function Navbar({ onOpenCmd, onOpenTerminal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const mnl = useClock('Asia/Manila');
  const mlt = useClock('Europe/Malta');
  const location = useLocation();
  const { sfxEnabled, toggleSfx, playClick, playHover, playCmd } = useAudio();

  const isHub = location.pathname === '/';
  const isConsole = location.pathname === '/console' || location.pathname === '/portfolio';
  const isPersonality = location.pathname === '/personality';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const el = document.documentElement;
      const max = el.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const mobileNavItems: MobileNavItem[] = [
    { label: 'Command Palette [⌘K]', icon: '⌘', action: () => { closeMenu(); onOpenCmd(); }, accent: true },
    ...(onOpenTerminal ? [{ label: 'CLI Terminal [~]', icon: '$_', action: () => { closeMenu(); onOpenTerminal(); }, accent: true }] : []),
    ...(isHub ? [
      { label: 'Full Ops Console ↗', icon: '🚀', href: '/console', isRoute: true as const, accent: true },
    ] : isConsole ? [
      { label: '← Back to Minimal Hub', icon: '◂', href: '/', isRoute: true as const, accent: true },
      ...consoleNavLinks.map(l => ({ label: l.label, icon: l.num, href: l.href, accent: false })),
      { label: 'INTJ-A Cognitive Profile ↗', icon: '★', href: '/personality', isRoute: true as const, accent: false },
    ] : [
      { label: '← Back to Minimal Hub', icon: '◂', href: '/', isRoute: true as const, accent: true },
      { label: 'Full Ops Console ↗', icon: '🚀', href: '/console', isRoute: true as const, accent: true },
    ]),
    { label: 'Download CV ↓', icon: '↓', href: '/assets/documents/John-Nerzon-Polintan-CV-2026.pdf', download: true, accent: false },
  ];

  return (
    <>
      <header id="hdr" className={scrolled ? 'sc' : ''}>
        <div className="hd">
          <Link to="/" className="brand" aria-label="Home">
            <span className="dot" aria-hidden="true" />
            {isHub ? 'JNP // DIGITAL HUB' : isPersonality ? 'NERZON // ARCHITECT' : 'JNP // OPS CONSOLE'}
          </Link>

          {/* Desktop Nav Links (Active on /console) */}
          {isConsole && (
            <nav className="main" aria-label="Primary">
              {consoleNavLinks.map(l => (
                <a key={l.href} href={l.href} onMouseEnter={() => playHover()} onClick={() => playClick()}>
                  <i>{l.num}</i>{l.label}
                </a>
              ))}
            </nav>
          )}

          <div className="clocks hd-clocks" aria-hidden="true" style={{ marginLeft: isConsole ? 0 : 'auto' }}>
            <div><b>MNL</b><span>{mnl}</span></div>
            <div><b>MLT</b><span>{mlt}</span></div>
          </div>

          <div className="hd-actions">
            {onOpenTerminal && (
              <button
                className="hd-action"
                onClick={() => { playCmd(); onOpenTerminal(); }}
                aria-label="Open CLI Terminal (~)"
                title="Launch CLI Sandbox (~)"
              >
                CLI <span className="cmd-k-badge">~</span>
              </button>
            )}
            <button className="hd-action" onClick={() => { playCmd(); onOpenCmd(); }} aria-label="Open Command Palette (Ctrl+K)">
              CMD <span className="cmd-k-badge">⌘K</span>
            </button>
            <button
              className="hd-action"
              onClick={async () => { await toggleSfx(); }}
              aria-label="Toggle Sound Effects"
            >
              SFX: {sfxEnabled ? 'ON' : 'OFF'}
              <span className={`vu-meter ${sfxEnabled ? 'active' : 'off'}`} aria-hidden="true">
                <i /><i /><i /><i />
              </span>
            </button>
            <ThemeSelector />

            {isHub ? (
              <Link to="/console" className="hd-action primary" onMouseEnter={() => playHover()} onClick={() => playClick()}>
                FULL CONSOLE ↗
              </Link>
            ) : isConsole ? (
              <>
                <Link to="/" className="hd-action" onMouseEnter={() => playHover()} onClick={() => playClick()}>
                  ← HUB
                </Link>
                <Link to="/personality" className="hd-action" onMouseEnter={() => playHover()} onClick={() => playClick()}>
                  INTJ-A ↗
                </Link>
                <a className="hd-action primary" href="/assets/documents/John-Nerzon-Polintan-CV-2026.pdf" download onClick={() => playClick()}>
                  CV ↓
                </a>
              </>
            ) : (
              <>
                <Link to="/" className="hd-action" onMouseEnter={() => playHover()} onClick={() => playClick()}>
                  ← HUB
                </Link>
                <Link to="/console" className="hd-action primary" onMouseEnter={() => playHover()} onClick={() => playClick()}>
                  FULL CONSOLE ↗
                </Link>
              </>
            )}
          </div>

          <button
            className="burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <i style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : '' }} />
            <i style={{ opacity: menuOpen ? 0 : 1 }} />
            <i style={{ transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : '' }} />
          </button>
        </div>
        <div className="pbar" style={{ width: `${progress}%` }} aria-hidden="true" />
      </header>

      {/* Mobile full-screen nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mnav"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] as const }}
            style={{ position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(10,12,14,.97)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8vw', gap: 6 }}
            aria-label="Mobile navigation"
          >
            {mobileNavItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ delay: i * 0.05, duration: 0.35, ease: [0.2, 0.65, 0.2, 1] as const }}
              >
                {item.action ? (
                  <button
                    onClick={item.action}
                    style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(24px,6vw,40px)', letterSpacing: '-.01em', color: 'var(--acc)', display: 'flex', alignItems: 'baseline', gap: 16, padding: '10px 0', borderBottom: '1px solid rgba(184,240,74,.3)', width: '100%', textAlign: 'left', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer' }}
                  >
                    <span style={{ fontFamily: 'var(--mono)', fontStyle: 'normal', fontSize: 12, color: 'var(--acc)' }}>{item.icon}</span>
                    {item.label}
                  </button>
                ) : item.isRoute ? (
                  <Link to={item.href} onClick={closeMenu} style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(24px,6vw,40px)', letterSpacing: '-.01em', color: item.accent ? 'var(--acc)' : 'var(--mut)', display: 'flex', alignItems: 'baseline', gap: 16, padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
                    <i style={{ fontFamily: 'var(--mono)', fontStyle: 'normal', fontSize: 12, color: 'var(--dim)' }}>{item.icon}</i>
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} onClick={closeMenu} download={item.download ? true : undefined} style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 'clamp(24px,6vw,40px)', letterSpacing: '-.01em', color: 'var(--mut)', display: 'flex', alignItems: 'baseline', gap: 16, padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
                    <i style={{ fontFamily: 'var(--mono)', fontStyle: 'normal', fontSize: 12, color: 'var(--dim)' }}>{item.icon}</i>
                    {item.label}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
