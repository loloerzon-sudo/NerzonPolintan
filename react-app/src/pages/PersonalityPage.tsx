import { useRef } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { RevealSection } from '@/components/RevealSection';
import { TiltCard } from '@/components/TiltCard';
import { Ticker } from '@/components/Ticker';
import { useScramble } from '@/hooks/useScramble';
import { useAudio } from '@/hooks/useAudio';

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

// Trait bar with animated count-up
function TraitCard({ label, pct, desc, delay }: { label: string; pct: number; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const el = numRef.current;
    const ctrl = animate(0, pct, {
      duration: 1.4,
      delay,
      ease: [0.2, 0, 0, 1] as const,
      onUpdate(v) { el.textContent = Math.round(v) + '%'; },
      onComplete() {
        el.style.textShadow = '0 0 18px var(--acc)';
        setTimeout(() => { el.style.textShadow = ''; }, 600);
      },
    });
    return () => ctrl.stop();
  }, [inView, pct, delay]);

  return (
    <motion.div
      ref={ref}
      style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 4, padding: '24px 26px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="trait-top">
        <span className="k">{label}</span>
        <span ref={numRef} className="v" style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--acc)', fontWeight: 700 }}>0%</span>
      </div>
      <div className="s-bar">
        <motion.div
          style={{ position: 'absolute', inset: 0, background: 'var(--acc)', height: '100%' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.4, delay, ease: [0.2, 0.65, 0.2, 1] as const }}
        />
      </div>
      <p style={{ fontSize: 13.5, color: 'var(--mut)', marginTop: 10 }}>{desc}</p>
    </motion.div>
  );
}

const TRAITS = [
  { label: 'ENERGY', pct: 51, desc: 'Introverted (51%) — Prefers deep, focused work environments with minimal noise and distractions.' },
  { label: 'MIND', pct: 71, desc: 'Intuitive (71%) — Highly imaginative; naturally maps out underlying patterns and long-term horizons.' },
  { label: 'NATURE', pct: 63, desc: 'Thinking (63%) — Prioritizes objective rationality, data integrity, and operational effectiveness.' },
  { label: 'TACTICS', pct: 56, desc: 'Judging (56%) — Methodical, decisive, and organized; values structured execution over improvisation.' },
  { label: 'IDENTITY', pct: 65, desc: 'Assertive (65%) — Self-assured, calm under high-pressure launches, and resilient against unexpected blockers.' },
];

function SWGrid({ items }: { items: { title: string; note: string; noteColor?: string; dotColor?: string; points: { b: string; t: string }[] }[] }) {
  return (
    <div className="sw-grid">
      {items.map((card, i) => (
        <RevealSection key={card.title} delay={i * 0.1}>
          <article className="role">
            <h3 className="r-title">{card.title}</h3>
            <p className="r-note mono" style={card.noteColor ? { color: card.noteColor } : {}}>{card.note}</p>
            <ul className="r-points" style={card.dotColor ? { ['--dot-color' as any]: card.dotColor } : {}}>
              {card.points.map(p => <li key={p.b}><b>{p.b}</b> {p.t}</li>)}
            </ul>
          </article>
        </RevealSection>
      ))}
    </div>
  );
}

export function PersonalityPage() {
  const { display: nm1 } = useScramble('NERZON:');
  const { display: nm2 } = useScramble('THE ARCHITECT');
  const { playHover } = useAudio();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.2, 0.65, 0.2, 1] as const }}
    >
      {/* HERO */}
      <section className="hero" aria-label="INTJ-A Profile Introduction" id="top">
        <div className="wrap hero-grid">
          <div>
            <motion.p className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
              COGNITIVE PROFILE &amp; DIAGNOSTIC REPORT{' '}
              <a className="hd-action" style={{ marginLeft: 10 }} href="https://www.16personalities.com/intj-personality" target="_blank" rel="noopener">
                SOURCE: 16PERSONALITIES.COM ↗
              </a>
            </motion.p>
            <h1 className="name">
              <motion.span className="l1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>{nm1}</motion.span>
              <br />
              <motion.span className="l2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>{nm2}</motion.span>
            </h1>
            <motion.div className="role-line mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <span>&gt;_</span><b>INTJ-A · VISIONARY · SYSTEMS THINKER</b>
              <span className="caret" aria-hidden="true" />
            </motion.div>
            <motion.p className="hero-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
              As an <strong>INTJ-A (Architect)</strong>, Nerzon combines conceptual foresight with meticulous execution.
              His analytical mindset seeks to deconstruct complex systems, identify operational bottlenecks, and implement structured, high-autonomy solutions.
            </motion.p>
            <motion.div className="cta-row" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
              <Link to="/" className="btn fill" onMouseEnter={() => playHover()}>← RETURN TO PORTFOLIO</Link>
              <a className="btn" href="#framework" onMouseEnter={() => playHover()}>VIEW METRICS ↓</a>
              <a className="btn" href="https://www.16personalities.com/intj-personality" target="_blank" rel="noopener" onMouseEnter={() => playHover()}>OFFICIAL 16P REPORT ↗</a>
            </motion.div>
          </div>

          <motion.aside initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
            <TiltCard className="panel" intensity={2}>
              <div className="panel-head">
                <span>COGNITIVE DIAGNOSTIC</span>
                <span className="live"><span className="dot" />VERIFIED</span>
              </div>
              <div className="panel-rows">
                {[
                  { k: 'TYPE', v: 'INTJ-A (THE ARCHITECT)' },
                  { k: 'ENERGY', v: <><span className="ok">51%</span> INTROVERTED</> },
                  { k: 'MIND', v: <><span className="ok">71%</span> INTUITIVE</> },
                  { k: 'NATURE', v: <><span className="ok">63%</span> THINKING</> },
                  { k: 'TACTICS', v: <><span className="ok">56%</span> JUDGING</> },
                  { k: 'IDENTITY', v: <><span className="ok">65%</span> ASSERTIVE</> },
                ].map(r => <div key={r.k} className="prow"><span className="k">{r.k}</span><span className="v">{r.v}</span></div>)}
              </div>
              <div className="panel-foot"><span>&gt; logic + vision + autonomous execution</span><span className="caret" /></div>
            </TiltCard>
            <p className="personal-note"><b>OPS PRINCIPLE //</b> High autonomy yields peak throughput. Precision, documentation, and continuous optimization.</p>
          </motion.aside>
        </div>
        <div className="wrap hero-meta">
          <span>SCROLL TO EXPLORE <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>↓</motion.span></span>
          <span>ASSESSMENT FRAMEWORK: NERIS TYPE EXPLORER®</span>
        </div>
      </section>

      <Ticker />

      {/* 01 — COGNITIVE FRAMEWORK */}
      <section className="sec" id="framework">
        <div className="wrap">
          <RevealSection className="s-head">
            <p className="s-no mono">01 — IDENTITY</p>
            <h2 className="title">COGNITIVE FRAMEWORK</h2>
            <p className="s-sub">The statistical breakdown of Nerzon's psychological architecture, evaluated across five core personality dimensions.</p>
          </RevealSection>
          <RevealSection>
            <div style={{ border: '1px solid var(--line)', background: 'rgba(184,240,74,.03)', borderRadius: 4, padding: '24px 28px', marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.18em', color: 'var(--acc)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="dot" />ASSESSMENT BENCHMARK // 16PERSONALITIES.COM
                </span>
                <a className="hd-action" href="https://www.16personalities.com/intj-personality" target="_blank" rel="noopener">OFFICIAL INTJ-A DOCUMENTATION ↗</a>
              </div>
              <p style={{ fontSize: 14, color: 'var(--mut)', lineHeight: 1.65 }}>
                The psychological metrics and behavioral traits displayed on this page are derived from test results completed via{' '}
                <a href="https://www.16personalities.com" target="_blank" rel="noopener" style={{ textDecoration: 'underline', color: 'var(--acc)' }}>16Personalities.com</a>{' '}
                (based on the <strong>NERIS Type Explorer®</strong> framework). This data is provided as a transparent self-diagnostic tool to illustrate communication preferences, cognitive strengths, and operational baseline.
              </p>
            </div>
          </RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
            {TRAITS.map((t, i) => <TraitCard key={t.label} {...t} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* 02 — OPERATIONAL DEPLOYMENT */}
      <section className="sec" id="deployment" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <RevealSection className="s-head">
            <p className="s-no mono">02 — PROFESSIONAL</p>
            <h2 className="title">OPERATIONAL DEPLOYMENT</h2>
            <p className="s-sub">In professional operations, Nerzon thrives on intellectual rigor, systems optimization, and end-to-end process ownership.</p>
          </RevealSection>
          <div className="chips" style={{ marginBottom: 40 }}>
            {['PERFECTIONISM','AMBITION','MOTIVATION','DESIRE TO LEAD'].map(c => <span key={c} className="chip">{c}</span>)}
          </div>
          <SWGrid items={[
            { title: 'Operational Advantages', note: 'STRENGTHS', points: [
              { b: 'Innovative Mindset:', t: 'Sees opportunities where others see routine, streamlining manual pipeline bottlenecks.' },
              { b: 'Independent Worker:', t: 'Delivers complex deliverables reliably without requiring day-to-day oversight.' },
              { b: 'Conceptual Thinking:', t: 'Effortlessly connects granular IT infrastructure to macro-level release roadmaps.' },
              { b: 'Continuous Improvement:', t: 'Instinctively identifies workflow friction and drafts repeatable SOPs.' },
              { b: 'Objective Judgment:', t: 'Reaches decisions founded on evidence and verifiable metrics.' },
              { b: 'Reliable Execution:', t: 'Maintains stringent accuracy across client deployments and technical tickets.' },
            ]},
            { title: 'System Vulnerabilities', note: 'AREAS FOR GROWTH', noteColor: 'var(--red)', dotColor: 'var(--red)', points: [
              { b: 'Discomfort with Networking:', t: 'Natural inclination toward deep work over personal brand promotion.' },
              { b: 'Frustration with Bureaucracy:', t: 'Chafes at redundant procedures that do not add measurable value.' },
              { b: 'Underestimating Office Politics:', t: 'Prefers clear meritocracy over navigating informal interpersonal hierarchies.' },
              { b: 'Reluctance to Delegate:', t: 'Can take on excess workload when standards of precision are non-negotiable.' },
              { b: 'Direct Communication:', t: 'Prioritizes candor and brevity, which may occasionally register as blunt.' },
              { b: 'Impatience with Monotony:', t: 'Seeks continuous intellectual stimulation and automation of repetitive tasks.' },
            ]},
          ]} />
          <h3 className="r-title" style={{ marginTop: 60 }}>Optimal Operating Environments</h3>
          <div className="chips" style={{ marginTop: 16 }}>
            {['HIGH AUTONOMY','ANALYTICAL & DATA-FOCUSED','STRATEGIC PLANNING','LOGIC-DRIVEN COLLABORATION','RESULTS-ORIENTED','LOW SOCIAL DISTRACTION'].map(c => (
              <span key={c} className="chip">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — SYSTEM OPTIMIZATION */}
      <section className="sec" id="optimization">
        <div className="wrap">
          <RevealSection className="s-head">
            <p className="s-no mono">03 — DEVELOPMENT</p>
            <h2 className="title">SYSTEM OPTIMIZATION</h2>
            <p className="s-sub">Continuous personal and professional refinement through self-reflection, deliberate habit design, and calculated energy management.</p>
          </RevealSection>
          <div className="chips" style={{ marginBottom: 40 }}>
            {['RESILIENCE','CONFIDENCE','GRIT','SENSE OF CONTROL'].map(c => <span key={c} className="chip">{c}</span>)}
          </div>
          <SWGrid items={[
            { title: 'Internal Drivers', note: 'CORE ENGINES', points: [
              { b: 'Self-Directed Mastery:', t: 'Learns emerging toolsets (AI automation, web frameworks) autonomously.' },
              { b: 'Reflective Insight:', t: 'Analyzes operational post-mortems to upgrade protocols permanently.' },
              { b: 'Rational Flexibility:', t: 'Swiftly adopts new methods when presented with sound arguments or data.' },
              { b: 'Disciplined Routine:', t: 'Sustains high consistency in complex, recurring release schedules.' },
              { b: 'Clarity of Purpose:', t: 'Eliminates extraneous noise to concentrate on mission-critical priorities.' },
              { b: 'Tenacious Resolve:', t: 'Recovers rapidly from operational setbacks by recalibrating strategy.' },
            ]},
            { title: 'Blind Spots', note: 'MITIGATION TARGETS', noteColor: 'var(--red)', points: [
              { b: 'Rational Bias:', t: 'May overlook emotional signals by over-indexing purely on logical models.' },
              { b: 'Reluctance to Solicit Aid:', t: 'Tendency to resolve every blocker single-handedly before asking for support.' },
              { b: 'Demanding Standards:', t: 'High personal bar can lead to unnecessary self-criticism.' },
              { b: 'Forward Fixation:', t: 'Focus on the next horizon often postpones celebrating present victories.' },
              { b: 'Ambiguity Aversion:', t: 'Prefers well-defined parameters over open-ended speculation.' },
              { b: 'Rest Deprecation:', t: 'Intense focus on execution requires conscious enforcement of downtime.' },
            ]},
          ]} />
          <div className="ed-grid" style={{ marginTop: 40 }}>
            {[
              { cls: 'en', label: 'POWER SOURCES (ENERGIZERS)', color: 'var(--acc)', points: [
                { b: 'Deep Technical Dives:', t: 'Architecting automated workflows or mastering new platforms.' },
                { b: 'Complex Problem Solving:', t: 'Untangling root causes in multi-team integrations.' },
                { b: 'Strategic Roadmapping:', t: 'Converting chaotic processes into precise sequential SOPs.' },
                { b: 'High-Signal Collaboration:', t: 'Direct, intellect-driven discussions with domain experts.' },
                { b: 'Autonomous Focus:', t: 'Uninterrupted deep work sessions producing tangible outputs.' },
                { b: 'Flawless Launches:', t: 'Watching a configured pipeline deploy into production without a hitch.' },
              ]},
              { cls: 'dr', label: 'POWER DRAINS (DEPLETERS)', color: 'var(--red)', points: [
                { b: 'Superficial Small Talk:', t: 'Mandatory social rituals lacking substance or purpose.' },
                { b: 'Operational Inefficiency:', t: 'Tolerating preventable errors or sluggish workflows.' },
                { b: 'Office Politics:', t: 'Navigating hidden agendas rather than delivering tangible results.' },
                { b: 'Micromanagement:', t: 'Restrictive surveillance that throttles velocity and initiative.' },
                { b: 'Emotional Reactivity:', t: 'Navigating volatile, irrational arguments untethered from data.' },
                { b: 'Manual Repetition:', t: 'Performing repetitive tasks without mandate to automate.' },
              ]},
            ].map(card => (
              <RevealSection key={card.cls}>
                <div className={`ed-card ${card.cls}`} style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 4, padding: '26px 28px' }}>
                  <div className="ed-head" style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.16em', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8, color: card.color }}>
                    <span className="dot" style={{ background: card.color }} />
                    {card.label}
                  </div>
                  <ul className="r-points" style={{ ['--dot-color' as any]: card.color }}>
                    {card.points.map(p => <li key={p.b} style={{ ['--bullet-color' as any]: card.color }}><b>{p.b}</b> {p.t}</li>)}
                  </ul>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — NETWORK & PROTOCOLS */}
      <section className="sec" id="protocols" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <RevealSection className="s-head">
            <p className="s-no mono">04 — CONNECTIONS</p>
            <h2 className="title">NETWORK & PROTOCOLS</h2>
            <p className="s-sub">In team environments and relationships, Nerzon builds rapport on reliability, mutual intellectual respect, and clear boundaries.</p>
          </RevealSection>
          <div className="chips" style={{ marginBottom: 40 }}>
            {['AUTHENTICITY','LOYALTY','ALTRUISM','EMOTIONAL INTELLIGENCE'].map(c => <span key={c} className="chip">{c}</span>)}
          </div>
          <SWGrid items={[
            { title: 'Relational Assets', note: 'STRENGTHS', points: [
              { b: 'Unflinching Sincerity:', t: 'Establishes dependable rapport founded on transparency and truth.' },
              { b: 'Analytical Counsel:', t: 'Delivers objective, thoughtful guidance when teammates face difficult decisions.' },
              { b: 'Action-Oriented Support:', t: 'Expresses commitment through tangible problem resolution and assistance.' },
              { b: 'Unwavering Loyalty:', t: 'Once trust is cemented, provides steadfast, long-term operational backing.' },
              { b: 'Respect for Autonomy:', t: 'Actively champions teammates\' independence and individual ownership.' },
              { b: 'High-Signal Discourse:', t: 'Fosters intellectually stimulating and forward-looking discussions.' },
            ]},
            { title: 'Friction Points', note: 'CALIBRATION NOTES', noteColor: 'var(--red)', points: [
              { b: 'Emotional Reserve:', t: 'May overlook subtle emotional cues during intense operational sprints.' },
              { b: 'Disdain for Pleasantries:', t: 'Omits small talk in favor of immediate operational focus.' },
              { b: 'Stress Isolation:', t: 'Tends to retreat into independent problem-solving when overloaded.' },
              { b: 'Guarded Demeanor:', t: 'Takes significant time to open up personal perspectives to new teams.' },
              { b: 'Critical Candor:', t: 'High analytical standards can occasionally come across as demanding.' },
              { b: 'Strict Thresholds:', t: 'Maintains elevated standards for peer engagement and professional rigor.' },
            ]},
          ]} />
        </div>
      </section>

      {/* 05 — SYNTHESIS */}
      <section className="sec" id="synthesis">
        <div className="wrap">
          <RevealSection className="s-head">
            <p className="s-no mono">05 — SYNTHESIS</p>
            <h2 className="title">OVERALL SYNTHESIS</h2>
          </RevealSection>
          <RevealSection>
            <div className="summary-box">
              <p>
                Nerzon is a strategic, autonomous systems architect whose mind is naturally wired for structural clarity, operational efficiency, and continuous improvement.
                He operates at peak performance when entrusted with high autonomy to solve complex analytical hurdles, design automated pipelines, and execute visionary roadmaps with steadfast discipline.
              </p>
              <p style={{ marginTop: 18 }}>
                His lifelong growth trajectory involves harmonizing this formidable logical apparatus with empathetic communication, collaborative delegation, and deliberate rest.
                By pairing his natural INTJ-A strategic depth with proactive team alignment, Nerzon transforms intricate release operations into reliable, repeatable engines of success.
              </p>
            </div>
          </RevealSection>
          <RevealSection delay={0.2}>
            <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
              <Link to="/" className="btn fill" style={{ fontSize: 12, padding: '14px 28px', letterSpacing: '.16em' }}>← RETURN TO PORTFOLIO</Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </motion.div>
  );
}
