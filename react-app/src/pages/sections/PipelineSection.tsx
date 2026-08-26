import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RevealSection } from '@/components/RevealSection';

const STAGES = [
  { id: 'STG/01', title: 'Provider Intake',  desc: 'Onboarding new titles from game providers — assets, metadata, and specs collected and validated.' },
  { id: 'STG/02', title: 'Configuration',    desc: 'Game configuration and content setup across internal systems, tuned per client requirements.' },
  { id: 'STG/03', title: 'Integration',      desc: 'Coordinating with the Integrations Team so every title connects cleanly to client platforms.' },
  { id: 'STG/04', title: 'Content QA',       desc: 'Auditing game metadata and content across the website and internal systems — accuracy guaranteed.' },
  { id: 'STG/05', title: 'Live Deployment',  desc: 'Deploying games live with careful checks, clear coordination, and dependable release execution.' },
  { id: 'STG/06', title: 'Live Support',     desc: 'Real-time incident lead post-launch — swift resolution keeping client operations uninterrupted.' },
];

export function PipelineSection() {
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState<number | null>(null);
  const lockTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-cycle unless locked
  useEffect(() => {
    const id = setInterval(() => {
      if (locked === null) setActive(i => (i + 1) % STAGES.length);
    }, 1200);
    return () => clearInterval(id);
  }, [locked]);

  const handleClick = (i: number) => {
    setActive(i);
    setLocked(i);
    if (lockTimeout.current) clearTimeout(lockTimeout.current);
    lockTimeout.current = setTimeout(() => setLocked(null), 6000);
  };

  const fillPct = ((active + 1) / STAGES.length * 96);

  return (
    <section className="sec" id="pipeline">
      <div className="wrap">
        <RevealSection className="s-head">
          <p className="s-no mono">02 — THE CRAFT</p>
          <h2 className="title">GAME RELEASE PIPELINE</h2>
          <p className="s-sub">The end-to-end lifecycle I manage for a European iGaming platform — every title travels this route before it goes live. Click a stage to lock it.</p>
        </RevealSection>

        <div className="pipe" id="pipeWrap">
          <div className="pipe-track" aria-hidden="true" />
          <motion.div
            className="pipe-fill-bar"
            animate={{ width: `${fillPct}%` }}
            transition={{ duration: 0.9, ease: [0.2, 0.65, 0.2, 1] }}
            aria-hidden="true"
          />
          {STAGES.map((s, i) => (
            <div
              key={s.id}
              className={`stage${i === active ? ' on' : ''}`}
              onClick={() => handleClick(i)}
              onMouseEnter={() => { if (locked === null) setActive(i); }}
              onMouseLeave={() => { if (locked === null) setActive(a => a); }}
            >
              {/* Pulse ring on active node */}
              {i === active && (
                <motion.span
                  style={{ position: 'absolute', top: 0, left: 0, width: 15, height: 15, borderRadius: '50%', border: '1px solid var(--acc)', pointerEvents: 'none' }}
                  animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <span className="st-no mono">{s.id}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <AnimatePresence>
                {locked === i && (
                  <motion.span
                    className="stage-lock-badge"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    LOCKED
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="pipe-note">
          <span>CHANNELS: <b>TICKETS · EMAIL · CHAT</b></span>
          <span>TRACKING: <b>JIRA SERVICE DESK · AIRTABLE</b></span>
          <span>STANDARD: <b>CAREFUL, RELIABLE RELEASES</b></span>
          <span>SCOPE: <b>GLOBAL CLIENTS</b></span>
        </div>
      </div>
    </section>
  );
}
