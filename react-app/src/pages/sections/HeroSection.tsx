import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useScramble } from '@/hooks/useScramble';
import { useAudio } from '@/hooks/useAudio';
import { TiltCard } from '@/components/TiltCard';
import { AudioVisualizer } from '@/components/AudioVisualizer';

import profileImg from '@/assets/images/john-nerzon-polintan-profile.png';
import matrixImg from '@/assets/images/john-nerzon-matrix-operator.jpg';
import cyberImg from '@/assets/images/john-nerzon-cyber-warrior.jpg';
import quantumImg from '@/assets/images/john-nerzon-quantum-engineer.jpg';
import madImg from '@/assets/images/john-nerzon-mad-scientist.jpg';
import metalImg from '@/assets/images/john-nerzon-metalhead-ops.jpg';

const ROLES = [
  'GAMES & CONFIG SPECIALIST',
  'WEB DEVELOPER',
  'AI & VIBE CODING SPECIALIST',
  'GAME RELEASE OPERATIONS',
  'ENTERPRISE IT SUPPORT',
  'IT & OPERATIONS CONSULTANT',
  'OPEN TO SELECT PROJECTS',
];

const AVATARS = [
  { src: profileImg, title: 'REMOTE OPS // CORE', idx: '01' },
  { src: matrixImg,  title: 'MATRIX OPERATOR // RECON', idx: '02' },
  { src: cyberImg,   title: 'BATTLE-TESTED // QA & OPS', idx: '03' },
  { src: quantumImg, title: 'SYSTEMS ARCHITECT // INTJ', idx: '04' },
  { src: madImg,     title: 'CHAOS ENG // LAB CIRCUIT', idx: '05' },
  { src: metalImg,   title: 'SERVER METAL // HEAVY OPS', idx: '06' },
];

export function HeroSection() {
  const [avatarIdx, setAvatarIdx] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const { display: name1 } = useScramble('JOHN NERZON');
  const { display: name2 } = useScramble('POLINTAN');
  const { display: roleText, scramble: setRole } = useScramble(ROLES[0]);
  const { playHover, playCmd, playClick } = useAudio();

  // Role rotator
  useEffect(() => {
    let currentIdx = 0;
    const id = setInterval(() => {
      currentIdx = (currentIdx + 1) % ROLES.length;
      setRole(ROLES[currentIdx]);
    }, 3200);
    return () => clearInterval(id);
  }, [setRole]);

  // Avatar auto-cycle
  useEffect(() => {
    const id = setInterval(() => setAvatarIdx(i => (i + 1) % AVATARS.length), 4800);
    return () => clearInterval(id);
  }, []);

  const cycleAvatar = () => {
    playCmd();
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 350);
    setAvatarIdx(i => (i + 1) % AVATARS.length);
  };

  const cur = AVATARS[avatarIdx];

  return (
    <section className="hero" aria-label="Introduction" id="top">
      <div className="wrap hero-grid">
        {/* Left: Text */}
        <div style={{ position: 'relative' }}>
          {/* Ambient Backing Glow Halo */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '-10%',
              width: 380,
              height: 380,
              background: 'radial-gradient(circle, rgba(184,240,74,0.08) 0%, transparent 70%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Link
              to="/"
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="cmd-k-badge"
              style={{ padding: '4px 10px', fontSize: 10, letterSpacing: '.14em', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, borderColor: 'var(--acc)', color: 'var(--acc)' }}
            >
              <span>← RETURN TO DIGITAL HUB</span>
            </Link>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--dim)' }}>
              OPS CONSOLE // REV 2026.08
            </span>
          </motion.div>

          <h1 className="name" style={{ position: 'relative', zIndex: 1 }}>
            <motion.span
              className="l1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {name1}
            </motion.span>
            <br />
            <motion.span
              className="l2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              {name2}
            </motion.span>
          </h1>

          <motion.div
            className="role-line mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span>&gt;_</span>
            <b>{roleText}</b>
            <span className="caret" aria-hidden="true" />
          </motion.div>

          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            I run the <strong>end-to-end game release pipeline</strong> for a European iGaming platform — from provider intake
            to live deployment for global clients — backed by <strong>12+ years</strong> across
            enterprise IT support, operations management, web development, and AI-assisted workflow automation.
          </motion.p>

          <div className="cta-row">
            <Link
              to="/"
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="btn fill"
              style={{ backgroundColor: 'transparent', borderColor: 'var(--acc)', color: 'var(--acc)' }}
            >
              ← RETURN TO HUB
            </Link>
            <motion.a
              className="btn fill"
              href="#pipeline"
              whileHover={{ y: -3 }}
              onMouseEnter={() => playHover()}
            >
              VIEW PIPELINE ↓
            </motion.a>
            <motion.a
              className="btn"
              href="#experience"
              whileHover={{ y: -3 }}
              onMouseEnter={() => playHover()}
            >
              VIEW EXPERIENCE ↓
            </motion.a>
            <motion.a
              className="btn"
              href="/assets/documents/John-Nerzon-Polintan-CV-2026.pdf"
              download
              whileHover={{ y: -3 }}
              onMouseEnter={() => playHover()}
            >
              DOWNLOAD CV ↓
            </motion.a>
          </div>
        </div>

        {/* Right: Portrait + Status Panel */}
        <motion.aside
          className="hero-aside"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          aria-label="Portrait and current status"
        >
          {/* Portrait Card */}
          <TiltCard className="portrait-card" intensity={3}>
            <div
              className={`portrait-stage ${isGlitching ? 'glitch-active' : ''}`}
              onClick={cycleAvatar}
              onMouseEnter={() => playHover()}
              role="button"
              aria-label="Cycle avatar"
              tabIndex={0}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={cur.src}
                  className="portrait-img"
                  src={cur.src}
                  alt={`John Nerzon Polintan - ${cur.title}`}
                  initial={{ opacity: 0, scale: 1.04, filter: 'grayscale(0.85) contrast(1.1) brightness(0.85)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'grayscale(0.25) contrast(1.08) brightness(0.92)' }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.55, ease: 'easeInOut' }}
                />
              </AnimatePresence>

              <div className="portrait-scanline" aria-hidden="true" />
              <div className="portrait-corner tl" aria-hidden="true" />
              <div className="portrait-corner tr" aria-hidden="true" />
              <div className="portrait-corner bl" aria-hidden="true" />
              <div className="portrait-corner br" aria-hidden="true" />

              <div className="portrait-hud-top" aria-hidden="true">
                <span className="scan-live">
                  <span className="dot-sm" />
                  SCAN // ACTIVE
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AudioVisualizer bars={8} height={10} />
                  AVATAR [{cur.idx} / 06]
                </span>
              </div>

              <figcaption className="portrait-label">
                <span className="portrait-tag">{cur.title}</span>
                <div className="portrait-nav-dots" aria-hidden="true">
                  {AVATARS.map((_, i) => (
                    <span key={i} className={`portrait-dot${i === avatarIdx ? ' active' : ''}`} />
                  ))}
                </div>
              </figcaption>
            </div>
          </TiltCard>

          {/* Status Panel */}
          <div>
            <TiltCard className="panel" intensity={2}>
              <div className="panel-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>SYSTEM STATUS</span>
                  <AudioVisualizer bars={10} height={12} />
                </div>
                <span className="live"><span className="dot" aria-hidden="true" />LIVE</span>
              </div>
              <div className="panel-rows">
                {[
                  { k: 'STATUS',   v: <><span className="ok">ONLINE</span> — OPEN TO PROJECTS & REMOTE ROLES</> },
                  { k: 'PROJECTS', v: <><span className="ok">AVAILABLE</span> — ACCEPTING SELECT ENGAGEMENTS</> },
                  { k: 'ROLE',     v: 'GAMES & CONFIG SPECIALIST' },
                  { k: 'BASE',     v: 'PHILIPPINES · GMT+8' },
                  { k: 'BUILDING', v: <><span className="warn">VIBE CODING</span> · AI AGENTS · AIRTABLE DB</> },
                  { k: 'TOOLKIT',  v: 'CLAUDE CODE · CURSOR · ANTIGRAVITY · AIRTABLE · JIRA' },
                ].map(row => (
                  <div key={row.k} className="prow">
                    <span className="k">{row.k}</span>
                    <span className="v">{row.v}</span>
                  </div>
                ))}
              </div>
              <div className="panel-foot">
                <span>&gt; intake → configure → qa → deploy → live</span>
                <span className="caret" aria-hidden="true" />
              </div>
            </TiltCard>
            <p className="personal-note"><b>OFF-DUTY //</b> Photography · Adobe Lightroom · Online Gaming</p>
          </div>
        </motion.aside>
      </div>

      <div className="wrap hero-meta">
        <span>SCROLL TO EXPLORE <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>↓</motion.span></span>
        <span>PHILIPPINES — REMOTE WORLDWIDE</span>
      </div>
    </section>
  );
}
