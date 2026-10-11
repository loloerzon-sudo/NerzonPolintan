import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useAudio } from '@/hooks/useAudio';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const CONTACTS = [
  { label: 'Email', href: 'mailto:erzon22@gmail.com' },
  { label: 'Telegram', href: 'https://t.me/nerzon022' },
  { label: 'WhatsApp', href: 'https://wa.me/639165271923' },
  { label: 'Facebook', href: 'https://www.facebook.com/nerzon.online/' },
];

export function MinimalHubPage() {
  const { playHover, playClick } = useAudio();
  const reduced = useReducedMotion();

  return (
    <motion.div className="gateway-page" id="top" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="wrap gateway-hero" aria-label="Introduction">
        <div className="gateway-copy">
          <p className="gateway-eyebrow"><span className="dot" aria-hidden="true" /> JOHN NERZON POLINTAN</p>
          <h1>Curiosity.<br />Precision.<br /><span>Possibility.</span></h1>
          <p className="gateway-description">I connect operations, web development, and AI to turn ideas into things that work.</p>
          <Link to="/console" className="btn fill gateway-cta" onMouseEnter={() => playHover()} onClick={() => playClick()}>
            OPEN FULL CONSOLE <span aria-hidden="true">↗</span>
          </Link>
          <p className="gateway-hint">Projects, experiments, and the thinking behind the work.</p>
          <div className="gateway-meta"><span>12+ YEARS IN IT &amp; OPS</span><span>PHILIPPINES · REMOTE WORLDWIDE</span></div>
        </div>
        <div className="gateway-emblem" aria-hidden="true">
          <div className="gateway-orbit" />
          <img src="/assets/branding/Light.png" alt="" width={320} height={320} decoding="async" />
          <span className="gateway-emblem-label">OPERATIONS / CREATIVE TECH / AI</span>
        </div>
      </section>
      <section className="wrap gateway-bottom" aria-label="About and contact">
        <div className="gateway-about">
          <p className="gateway-eyebrow">THE HUMAN BEHIND THE SYSTEMS</p>
          <h2>Part-time coder.<br />Full-time curious human.</h2>
          <p>Dad of three boys, AI enthusiast, and an iGaming professional by day. Powered by curiosity, caffeine, and an unreasonable number of browser tabs.</p>
        </div>
        <div className="gateway-connect">
          <p className="gateway-eyebrow">LET’S CONNECT</p>
          <nav aria-label="Contact channels" className="gateway-contacts">
            {CONTACTS.map(({ label, href }) => (
              <a key={label} href={href} target={href.startsWith('https:') ? '_blank' : undefined} rel="noopener noreferrer" onMouseEnter={() => playHover()} onClick={() => playClick()}>{label} <span aria-hidden="true">↗</span></a>
            ))}
          </nav>
          <a className="gateway-cv" href="/assets/documents/John-Nerzon-Polintan-CV-2026.pdf" download>DOWNLOAD RESUME / CV ↓</a>
        </div>
      </section>
    </motion.div>
  );
}

export default MinimalHubPage;
