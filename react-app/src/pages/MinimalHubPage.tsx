import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard } from '@/components/TiltCard';
import { AudioVisualizer } from '@/components/AudioVisualizer';
import { RecentProjectsSection } from '@/pages/sections/RecentProjectsSection';
import { ServiceDetailModal, HUB_SERVICES, type ServiceDetail } from '@/components/ServiceDetailModal';
import { useScramble } from '@/hooks/useScramble';
import { useAudio } from '@/hooks/useAudio';
import profileImg from '@/assets/images/john-nerzon-polintan-profile.png';

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
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const { playHover, playClick, playSuccess, playUnfurl } = useAudio();

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

  const handleOpenService = (service: ServiceDetail) => {
    playUnfurl();
    setSelectedService(service);
  };

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
        {/* Top Hub Welcome Ticker */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--acc)' }}>
            <span className="dot" aria-hidden="true" />
            <span>OPERATIONAL HUB // DIGITAL GATEWAY</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--dim)' }}>
            <AudioVisualizer bars={8} height={12} />
            <span>REV 2026.08 · ACTIVE DEPLOYMENT</span>
          </div>
        </div>

        {/* 5-Bento Grid Layout */}
        <div className="hub-bento-grid">
          {/* Bento 1: Identity & Profile Header */}
          <TiltCard className="hub-bento-card bento-hero" intensity={2.5}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: 90, height: 90, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--acc)', flexShrink: 0 }}>
                <img
                  src={profileImg}
                  alt="John Nerzon Polintan"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                />
                <div className="portrait-scanline" style={{ animationDuration: '2s' }} aria-hidden="true" />
              </div>

              <div style={{ flex: 1, minWidth: 240 }}>
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
                <span className="ok" style={{ color: 'var(--acc)', fontWeight: 600 }}>● ONLINE</span> — Philippines (GMT+8) · Remote Worldwide
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
                <span style={{ fontSize: 10, background: 'var(--acc)', color: 'var(--acc-dk)', padding: '2px 6px', borderRadius: 2, fontWeight: 700 }}>
                  COPY
                </span>
              </motion.button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <motion.a
                  href="https://wa.me/639165271923"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    background: 'var(--panel)',
                    border: '1px solid var(--line2)',
                    borderRadius: 3,
                    padding: '10px',
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    letterSpacing: '.08em',
                    color: 'var(--txt)',
                    textDecoration: 'none',
                  }}
                >
                  <span>💬 WhatsApp</span>
                  <span style={{ fontSize: 10, color: 'var(--dim)' }}>↗</span>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/erzon22"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    background: 'var(--panel)',
                    border: '1px solid var(--line2)',
                    borderRadius: 3,
                    padding: '10px',
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    letterSpacing: '.08em',
                    color: 'var(--txt)',
                    textDecoration: 'none',
                  }}
                >
                  <span>🔗 LinkedIn</span>
                  <span style={{ fontSize: 10, color: 'var(--dim)' }}>↗</span>
                </motion.a>
              </div>

              <motion.a
                href="/assets/documents/John-Nerzon-Polintan-CV-2026.pdf"
                download
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                whileHover={{ scale: 1.02 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: 'var(--acc)',
                  border: '1px solid var(--acc)',
                  color: 'var(--acc-dk)',
                  fontWeight: 700,
                  borderRadius: 3,
                  padding: '11px',
                  fontFamily: 'var(--mono)',
                  fontSize: 11.5,
                  letterSpacing: '.12em',
                  textDecoration: 'none',
                }}
              >
                <span>DOWNLOAD CV (PDF) ↓</span>
              </motion.a>
            </div>
          </TiltCard>

          {/* Bento 3: Compact Core Services with Interactive Pop-up Modal */}
          <TiltCard className="hub-bento-card bento-services" intensity={2.5}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.16em', color: 'var(--acc)' }}>
                SERVICES &amp; ENGAGEMENTS
              </div>
              <span className="avail-tag" style={{ padding: '3px 8px', fontSize: 9 }}>
                <span className="dot" aria-hidden="true" style={{ width: 5, height: 5 }} />
                CLICK FOR SPECS
              </span>
            </div>

            {/* Compact 4-Row Clickable Service Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
              {HUB_SERVICES.map((s) => (
                <motion.div
                  key={s.no}
                  onClick={() => handleOpenService(s)}
                  onMouseEnter={() => playHover()}
                  whileHover={{ x: 3, backgroundColor: 'rgba(184,240,74,0.06)' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--line2)',
                    borderRadius: 3,
                    padding: '9px 14px',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, background-color 0.2s',
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${s.title}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--acc)', letterSpacing: '.14em' }}>
                      {s.no} //
                    </span>
                    <div>
                      <h4 style={{ fontFamily: 'var(--disp)', fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
                        {s.title}
                      </h4>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="tag" style={{ fontSize: 8.5, padding: '2px 6px' }}>
                      {s.status}
                    </span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--acc)' }}>
                      VIEW DETAILS ↗
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TiltCard>

          {/* Bento 4: Recent Projects Live Tracker */}
          <TiltCard className="hub-bento-card bento-projects" intensity={2.5}>
            <RecentProjectsSection />
          </TiltCard>

          {/* Bento 5: Deep Gateway Portals */}
          <div className="bento-gateways" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {/* Gateway A: Full Ops Console */}
            <TiltCard className="hub-bento-card" intensity={3}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--acc)', letterSpacing: '.16em' }}>
                  DEEP PORTFOLIO GATEWAY
                </span>
                <span className="cmd-k-badge">/console</span>
              </div>

              <h3 style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 700, margin: '4px 0 8px', color: 'var(--txt)' }}>
                Full Interactive Ops Console ↗
              </h3>

              <p style={{ fontSize: 13, color: 'var(--mut)', margin: '0 0 16px', lineHeight: 1.5 }}>
                Explore the complete 6-section console: 6-stage game release pipeline, 7 role histories, expandable metric blueprints, and skill matrix.
              </p>

              <Link
                to="/console"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="btn fill"
                style={{ width: '100%', justifyContent: 'center', fontSize: 11.5, padding: '12px 16px' }}
              >
                LAUNCH FULL OPS CONSOLE ➔
              </Link>
            </TiltCard>

            {/* Gateway B: INTJ-A Cognitive Profile */}
            <TiltCard className="hub-bento-card" intensity={3}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--acc)', letterSpacing: '.16em' }}>
                  PSYCHOMETRIC BLUEPRINT
                </span>
                <span className="cmd-k-badge">/personality</span>
              </div>

              <h3 style={{ fontFamily: 'var(--disp)', fontSize: 20, fontWeight: 700, margin: '4px 0 8px', color: 'var(--txt)' }}>
                INTJ-A Cognitive Blueprint ↗
              </h3>

              <p style={{ fontSize: 13, color: 'var(--mut)', margin: '0 0 16px', lineHeight: 1.5 }}>
                Strategic systems thinking, operational dynamics, energizers/drainers breakdown based on the 16Personalities NERIS assessment.
              </p>

              <Link
                to="/personality"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="btn"
                style={{ width: '100%', justifyContent: 'center', fontSize: 11.5, padding: '12px 16px', borderColor: 'var(--acc)', color: 'var(--acc)' }}
              >
                VIEW COGNITIVE REPORT ➔
              </Link>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Interactive Full Service Details Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

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
