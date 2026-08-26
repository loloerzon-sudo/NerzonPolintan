import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

function useClock(tz: string, short = true) {
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
        <span>© 2026 JOHN NERZON POLINTAN</span>
        <span>MNL {mnl} · MLT {mlt}</span>
        <button className="top-link" onClick={onToggleSfx}>
          SOUND FX: {sfxEnabled ? 'ON 🔊' : 'OFF ⊘'}
        </button>
        {isNotHub && (
          <Link to="/" className="top-link" style={{ color: 'var(--acc)' }}>
            ← RETURN TO DIGITAL HUB
          </Link>
        )}
        <span>DESIGNED AS AN OPS CONSOLE · REV 2026.08</span>
        <a className="top-link" href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
