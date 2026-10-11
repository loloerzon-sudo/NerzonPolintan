import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

function useClock(tz: string) {
  const [time, setTime] = useState('--:--');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}

interface FooterProps { sfxEnabled: boolean; onToggleSfx: () => void; }

export function Footer({ sfxEnabled, onToggleSfx }: FooterProps) {
  const mnl = useClock('Asia/Manila');
  const mlt = useClock('Europe/Malta');
  const location = useLocation();
  const isNotHub = location.pathname !== '/';

  return (
    <footer>
      <div className="wrap ft">
        <Link to="/" className="footer-brand" aria-label="Nerzon Online home">
          <img src="/assets/branding/LightLandScapeLogo.png" alt="Nerzon Online" width={224} height={63} loading="lazy" />
        </Link>
        <span>© 2026 JOHN NERZON POLINTAN // NERZON.ONLINE</span>
        <span>MNL {mnl} • MLT {mlt}</span>
        <button className="top-link" onClick={onToggleSfx}>
          SOUND FX: {sfxEnabled ? 'ON' : 'OFF'}
        </button>
        <a
          href="https://ko-fi.com/nerzon"
          target="_blank"
          rel="noopener noreferrer"
          className="top-link"
          title="Buy me a coffee"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            color: 'var(--acc)',
            padding: '2px 8px',
            border: '1px solid rgba(184, 240, 74, 0.3)',
            borderRadius: 2,
            background: 'rgba(184, 240, 74, 0.05)',
            textDecoration: 'none',
          }}
        >
          ☕ BUY ME A COFFEE ↗
        </a>
        {isNotHub && (
          <Link to="/" className="top-link" style={{ color: 'var(--acc)' }}>
            ← RETURN TO DIGITAL HUB
          </Link>
        )}
        <Link to="/personality" className="top-link">THE ARCHITECT · INTJ-A ↗</Link>
        <a className="top-link" href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
