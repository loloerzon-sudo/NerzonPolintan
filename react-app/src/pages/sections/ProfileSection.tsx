import { useRef, useEffect } from 'react';
import { useInView, animate } from 'motion/react';
import { Link } from 'react-router';
import { RevealSection } from '@/components/RevealSection';
import { TiltCard } from '@/components/TiltCard';

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.2, 0, 0, 1] as const,
      onUpdate(v) { el.textContent = Math.round(v) + suffix; },
      onComplete() {
        el.style.textShadow = '0 0 20px var(--acc)';
        setTimeout(() => { el.style.textShadow = ''; }, 600);
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return <div ref={ref} className="n">0{suffix}</div>;
}

export function ProfileSection() {
  return (
    <section className="sec" id="profile">
      <div className="wrap split">
        {/* Left sticky: heading + stats */}
        <RevealSection direction="left" className="sticky">
          <p className="s-no mono">01 — PROFILE</p>
          <h2 className="title">PRECISION RUNS<br />THE OPERATION</h2>
          <div className="stats">
            {[
              { n: 12, s: '+', lbl: 'YEARS IN IT & OPS' },
              { n: 7,  s: '',  lbl: 'ROLES ACROSS OPERATIONS' },
              { n: 5,  s: '',  lbl: 'INDUSTRIES SERVED' },
              { n: 3,  s: '+', lbl: 'YEARS IN GAME OPERATIONS' },
            ].map(({ n, s, lbl }) => (
              <div key={lbl} className="stat">
                <StatCounter value={n} suffix={s} />
                <div className="lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Right: bio text */}
        <div className="profile-text">
          <RevealSection delay={0}>
            <p>
              Results-driven <strong>IT, Gaming Operations & Operations Management</strong> professional
              with 12+ years of experience spanning enterprise IT support and iGaming game release
              operations. Currently managing the <span className="hl-word">full game lifecycle</span> — from
              provider intake to live deployment — for global clients at a European iGaming platform.
            </p>
          </RevealSection>
          <RevealSection delay={0.1}>
            <p style={{ marginTop: 22 }}>
              I combine deep technical expertise in <strong>Windows, Active Directory, and Office 365</strong>
              with a modern skillset in <span className="hl-word">AI-assisted workflow automation</span>, Jira, and
              Airtable — and I'm known for precision, cross-functional collaboration, and dependable
              client-facing game launches.
            </p>
          </RevealSection>
          <RevealSection delay={0.15}>
            <p className="profile-statement" style={{ marginTop: 22 }}>
              I'm most effective where technical accuracy, release coordination, and clear documentation meet.
            </p>
          </RevealSection>

          <RevealSection delay={0.2}>
            <div className="facts">
              {[
                { k: 'CURRENT',   v: <>Games & Config Specialist <i>(European iGaming · Remote)</i></> },
                { k: 'FOCUS',     v: 'Game release ops · IT systems · AI automation · Visual content' },
                { k: 'EXPLORING', v: 'Vibe Coding · Web Development · AI-assisted development' },
                { k: 'MODE',      v: <>Remote-first · Cross-timezone collaboration <i>(MNL ↔ MLT)</i></> },
                { k: 'EDGE',      v: 'Reliable release execution · Real-time incident response · Documentation culture' },
              ].map(({ k, v }) => (
                <div key={k} className="fact">
                  <span className="k">{k}</span><span className="v">{v}</span>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={0.25}>
            <TiltCard className="cognitive-card" intensity={3}>
              <div className="cog-head">
                <span className="cog-status"><span className="dot" aria-hidden="true" />COGNITIVE BLUEPRINT // DIAGNOSTICS</span>
                <span className="mono dim">TYPE: INTJ-A</span>
              </div>
              <h3 className="cog-title">NERZON: THE ARCHITECT</h3>
              <p className="cog-desc">Strategic systems thinker driven by continuous improvement, analytical precision, and autonomous execution.</p>
              <div className="cog-chips">
                {['SYSTEMS THINKING', 'STRATEGIC VISION', 'HIGH AUTONOMY', 'OPERATIONAL OPTIMIZATION'].map(c => (
                  <span key={c} className="cog-chip">{c}</span>
                ))}
              </div>
              <Link to="/personality" className="cog-btn">EXPLORE COGNITIVE PROFILE ↗</Link>
            </TiltCard>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
