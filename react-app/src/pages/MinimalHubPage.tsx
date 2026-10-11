import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard } from '@/components/TiltCard';
import { AudioVisualizer } from '@/components/AudioVisualizer';
import { useScramble } from '@/hooks/useScramble';
import { useAudio } from '@/hooks/useAudio';
import profileImg from '@/assets/images/john-nerzon-polintan-profile.png';
import matrixImg from '@/assets/images/john-nerzon-matrix-operator.jpg';
import cyberImg from '@/assets/images/john-nerzon-cyber-warrior.jpg';
import quantumImg from '@/assets/images/john-nerzon-quantum-engineer.jpg';
import madImg from '@/assets/images/john-nerzon-mad-scientist.jpg';
import metalImg from '@/assets/images/john-nerzon-metalhead-ops.jpg';

const PERSONAS = [
  { id: 'core',  label: 'CORE',  idx: '01', title: 'REMOTE OPS // CORE', src: profileImg },
  { id: 'recon', label: 'RECON', idx: '02', title: 'MATRIX OPERATOR // RECON', src: matrixImg },
  { id: 'ops',   label: 'OPS',   idx: '03', title: 'BATTLE-TESTED // QA & OPS', src: cyberImg },
  { id: 'intj',  label: 'INTJ',  idx: '04', title: 'SYSTEMS ARCHITECT // INTJ', src: quantumImg },
  { id: 'lab',   label: 'LAB',   idx: '05', title: 'CHAOS ENG // LAB CIRCUIT', src: madImg },
  { id: 'metal', label: 'HEAVY', idx: '06', title: 'SERVER METAL // HEAVY OPS', src: metalImg },
];

const ROLES = [
  'GAMES & CONFIG SPECIALIST',
  'WEB DEVELOPER',
  'AI & VIBE CODING SPECIALIST',
  'GAME RELEASE OPERATIONS',
  'ENTERPRISE IT SUPPORT',
  'IT & OPERATIONS CONSULTANT',
  'OPEN TO SELECT PROJECTS',
];

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

export function MinimalHubPage() {
  const { display: name1 } = useScramble('JOHN NERZON');
  const { display: name2 } = useScramble('POLINTAN');
  const { display: roleText, scramble: setRole } = useScramble(ROLES[0]);
  const [toastVisible, setToastVisible] = useState(false);
  const [personaIdx, setPersonaIdx] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const { playHover, playClick, playSuccess, playCmd } = useAudio();

  // Gentle auto-cycling of personas (paused permanently on user interaction)
  useEffect(() => {
    if (!isAutoCycling) return;
    const id = setInterval(() => {
      setPersonaIdx((i) => (i + 1) % PERSONAS.length);
    }, 6000);
    return () => clearInterval(id);
  }, [isAutoCycling]);

  const selectPersona = (idx: number, fromUser = true) => {
    if (fromUser) {
      setIsAutoCycling(false);
    }
    playCmd();
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 300);
    setPersonaIdx(idx);
  };

  const cyclePersona = () => {
    selectPersona((personaIdx + 1) % PERSONAS.length, true);
  };

  const curPersona = PERSONAS[personaIdx];

  // Active role rotator on Digital Hub
  useEffect(() => {
    let currentIdx = 0;
    const id = setInterval(() => {
      currentIdx = (currentIdx + 1) % ROLES.length;
      setRole(ROLES[currentIdx]);
    }, 3200);
    return () => clearInterval(id);
  }, [setRole]);

  const copyEmail = useCallback(async () => {
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
    playSuccess();
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  }, [playSuccess]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.2, 0.65, 0.2, 1] as const }}
      className="hub-page-wrap"
      style={{ minHeight: 'calc(100vh - var(--hdr))', paddingTop: 'calc(var(--hdr) + 24px)', paddingBottom: 48 }}
    >
      <div className="wrap">
        {/* Top Hub Status Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--acc)' }}>
            <span className="dot" aria-hidden="true" />
            <span>OPERATIONAL HUB // DIGITAL GATEWAY</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--dim)' }}>
            <AudioVisualizer bars={8} height={12} />
            <span>REV 2026.10 • ACTIVE DEPLOYMENT</span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="hub-bento-grid">
          {/* Bento 1: Identity & Profile Header */}
          <TiltCard className="hub-bento-card bento-hero" intensity={2.5}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
              {/* Interactive Cyber Persona Cluster */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <div
                  onClick={cyclePersona}
                  onMouseEnter={() => playHover()}
                  role="button"
                  tabIndex={0}
                  title="Click to cycle cyber persona"
                  style={{
                    position: 'relative',
                    width: 96,
                    height: 96,
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid var(--acc)',
                    cursor: 'pointer',
                    boxShadow: '0 0 16px rgba(184, 240, 74, 0.12)',
                    filter: isGlitching ? 'hue-rotate(90deg) contrast(1.4)' : 'none',
                    transition: 'filter 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={curPersona.src}
                      src={curPersona.src}
                      alt={`John Nerzon Polintan - ${curPersona.title}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                    />
                  </AnimatePresence>

                  <div className="portrait-scanline" style={{ animationDuration: '2s' }} aria-hidden="true" />

                  {/* Corner accents */}
                  <span style={{ position: 'absolute', top: 2, left: 2, width: 4, height: 4, borderTop: '1px solid var(--acc)', borderLeft: '1px solid var(--acc)' }} aria-hidden="true" />
                  <span style={{ position: 'absolute', top: 2, right: 2, width: 4, height: 4, borderTop: '1px solid var(--acc)', borderRight: '1px solid var(--acc)' }} aria-hidden="true" />
                  <span style={{ position: 'absolute', bottom: 2, left: 2, width: 4, height: 4, borderBottom: '1px solid var(--acc)', borderLeft: '1px solid var(--acc)' }} aria-hidden="true" />
                  <span style={{ position: 'absolute', bottom: 2, right: 2, width: 4, height: 4, borderBottom: '1px solid var(--acc)', borderRight: '1px solid var(--acc)' }} aria-hidden="true" />

                  {/* Mini click-to-cycle hint badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'rgba(10, 12, 14, 0.78)',
                      backdropFilter: 'blur(4px)',
                      fontFamily: 'var(--mono)',
                      fontSize: 8,
                      letterSpacing: '.12em',
                      color: 'var(--acc)',
                      textAlign: 'center',
                      padding: '2px 0',
                      borderTop: '1px solid rgba(184,240,74,0.3)',
                    }}
                  >
                    {curPersona.idx}/06 ↻ CYCLE
                  </div>
                </div>

                {/* Persona Title Badge */}
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 8.5,
                    letterSpacing: '.1em',
                    color: 'var(--acc)',
                    textAlign: 'center',
                    maxWidth: 110,
                    lineHeight: 1.25,
                  }}
                >
                  {curPersona.title}
                </div>

                {/* Mini Persona Selector Pills */}
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 120 }}>
                  {PERSONAS.map((p, idx) => {
                    const isSelected = idx === personaIdx;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onMouseEnter={() => playHover()}
                        onClick={() => selectPersona(idx, true)}
                        title={p.title}
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: 7.5,
                          letterSpacing: '.08em',
                          padding: '1px 4px',
                          borderRadius: 2,
                          border: `1px solid ${isSelected ? 'var(--acc)' : 'var(--line)'}`,
                          backgroundColor: isSelected ? 'rgba(184, 240, 74, 0.18)' : 'rgba(0, 0, 0, 0.3)',
                          color: isSelected ? 'var(--acc)' : 'var(--dim)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 220 }}>
                <p className="kicker" style={{ margin: '0 0 6px', fontSize: 10.5, letterSpacing: '.18em' }}>
                  OPERATIONS &amp; WEB SPECIALIST
                </p>
                <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(26px, 3.8vw, 42px)', fontWeight: 700, lineHeight: 1.05, textTransform: 'uppercase', margin: 0 }}>
                  <span>{name1}</span>{' '}
                  <span style={{ color: 'transparent', WebkitTextStroke: '1.2px var(--txt)' }}>{name2}</span>
                </h1>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--acc)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>&gt;_</span>
                  <b>{roleText}</b>
                  <span className="caret" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--line2)', marginTop: 18, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mut)' }}>
                <span className="ok" style={{ color: 'var(--acc)', fontWeight: 600 }}>● ONLINE</span> — Philippines (GMT+8) • Remote Worldwide
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--dim)' }}>
                12+ YEARS ENTERPRISE IT, IGAMING &amp; WEB
              </div>
            </div>
          </TiltCard>

          {/* Bento 2: Fast Contact & Action Channels */}
          <TiltCard className="hub-bento-card bento-contacts" intensity={3}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.16em', color: 'var(--acc)' }}>
                DIRECT CONTACT CHANNELS
              </div>
              <span className="mono dim" style={{ fontSize: 9.5 }}>1-CLICK</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
              <motion.button
                onClick={copyEmail}
                onMouseEnter={() => playHover()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(184,240,74,0.06)',
                  border: '1px solid var(--acc)',
                  color: 'var(--acc)',
                  borderRadius: 3,
                  padding: '10px 14px',
                  fontFamily: 'var(--mono)',
                  fontSize: 12,
                  letterSpacing: '.08em',
                  cursor: 'pointer',
                }}
              >
                <span>✉ erzon22@gmail.com</span>
                <span style={{ fontSize: 10, opacity: 0.8 }}>[COPY EMAIL]</span>
              </motion.button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <motion.a
                  href="https://t.me/nerzon"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    background: 'var(--panel2)',
                    border: '1px solid var(--line)',
                    color: 'var(--txt)',
                    borderRadius: 3,
                    padding: '8px 10px',
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    textDecoration: 'none',
                  }}
                >
                  <span>✈ TELEGRAM</span>
                  <span style={{ color: 'var(--dim)', fontSize: 9 }}>↗</span>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/johnnerzonpolintan"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    background: 'var(--panel2)',
                    border: '1px solid var(--line)',
                    color: 'var(--txt)',
                    borderRadius: 3,
                    padding: '8px 10px',
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    textDecoration: 'none',
                  }}
                >
                  <span>in LINKEDIN</span>
                  <span style={{ color: 'var(--dim)', fontSize: 9 }}>↗</span>
                </motion.a>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <motion.a
                  href="https://ko-fi.com/nerzon"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    background: 'rgba(184, 240, 74, 0.05)',
                    border: '1px solid rgba(184, 240, 74, 0.3)',
                    color: 'var(--acc)',
                    borderRadius: 3,
                    padding: '8px 10px',
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    textDecoration: 'none',
                  }}
                >
                  <span>☕ KO-FI</span>
                  <span style={{ color: 'var(--acc)', fontSize: 9 }}>↗</span>
                </motion.a>

                <motion.a
                  href="/assets/documents/John-Nerzon-Polintan-CV-2026.pdf"
                  download
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    background: 'var(--panel2)',
                    border: '1px solid var(--line)',
                    color: 'var(--txt)',
                    borderRadius: 3,
                    padding: '8px 10px',
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    textDecoration: 'none',
                  }}
                >
                  <span>📄 RESUME / CV</span>
                  <span style={{ color: 'var(--dim)', fontSize: 9 }}>↓</span>
                </motion.a>
              </div>
            </div>
          </TiltCard>

          {/* Bento 3: Brief Introduction (Personal Human Dossier) */}
          <div style={{ gridColumn: 'span 12' }}>
            <TiltCard className="hub-bento-card" intensity={2}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.18em', color: 'var(--acc)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="dot" aria-hidden="true" />
                  <span>BRIEF INTRODUCTION // HUMAN DOSSIER</span>
                </div>
                <span className="mono dim" style={{ fontSize: 9.5 }}>PHILOSOPHY &amp; ETHOS</span>
              </div>

              <h3 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, margin: '0 0 16px', color: 'var(--txt)', letterSpacing: '-.01em', lineHeight: 1.2 }}>
                Part-Time Coder.{' '}
                <span style={{ color: 'var(--acc)' }}>Full-Time Curious Human.</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 'clamp(14.5px, 1.8vw, 16px)', color: 'var(--mut)', lineHeight: 1.7, maxWidth: 960 }}>
                <p style={{ margin: 0 }}>
                  Dad of three boys, AI enthusiast, hobbyist vibe coder, and an iGaming professional by day.
                </p>
                <p style={{ margin: 0 }}>
                  I build websites, systems, automations, and designs. I know a little bit of everything and just enough to be dangerous (to my own free time).
                </p>
                <p style={{ margin: 0 }}>
                  Not exactly a master of one trade, but a fast learner who can research, adapt, and turn a random idea into something that actually works.
                </p>
              </div>

              <div
                style={{
                  marginTop: 18,
                  background: 'linear-gradient(135deg, rgba(184, 240, 74, 0.07) 0%, rgba(10, 12, 14, 0.5) 100%)',
                  border: '1px solid rgba(184, 240, 74, 0.35)',
                  borderRadius: 4,
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontFamily: 'var(--mono)',
                  fontSize: 'clamp(12px, 1.6vw, 13.5px)',
                  color: 'var(--acc)',
                  fontWeight: 600,
                  letterSpacing: '.03em',
                }}
              >
                <span style={{ fontSize: 18 }}>☕</span>
                <span>Powered by curiosity, caffeine, and an unreasonable number of browser tabs.</span>
              </div>
            </TiltCard>
          </div>

          {/* Bento 4: Deep Gateway Portal */}
          <div className="bento-gateways">
            <TiltCard className="hub-bento-card" intensity={2.5}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--acc)', letterSpacing: '.16em' }}>
                  DEEP PORTFOLIO GATEWAY // 8-SECTION OPS CONSOLE
                </span>
                <span className="cmd-k-badge">/console</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <h3 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, margin: '0 0 8px', color: 'var(--txt)' }}>
                    Launch Full Interactive Ops Console ↗
                  </h3>
                  <p style={{ fontSize: 13.5, color: 'var(--mut)', margin: 0, lineHeight: 1.55 }}>
                    Dive into the complete operations ecosystem: 6-stage live release pipeline, recent projects &amp; 3D visualizers, service blueprints &amp; SLAs, 12+ years experience blueprints, and verified certifications.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Link
                    to="/personality"
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                    className="btn"
                    style={{ fontSize: 12, padding: '14px 20px', letterSpacing: '.12em', whiteSpace: 'nowrap', border: '1px solid var(--line)' }}
                  >
                    INTJ-A PROFILE ↗
                  </Link>

                  <Link
                    to="/console"
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                    className="btn fill"
                    style={{ fontSize: 12, padding: '14px 24px', letterSpacing: '.14em', whiteSpace: 'nowrap' }}
                  >
                    EXPLORE FULL CONSOLE ↗
                  </Link>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Email Copy Toast Alert */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.2, 0.65, 0.2, 1] as const }}
          >
            ✓ EMAIL COPIED: erzon22@gmail.com
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MinimalHubPage;
