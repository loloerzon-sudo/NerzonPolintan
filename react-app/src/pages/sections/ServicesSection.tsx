import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RevealSection } from '@/components/RevealSection';
import { TiltCard } from '@/components/TiltCard';
import { SchematicFlow, MetricGauge } from '@/components/MetricGauge';
import { useAudio } from '@/hooks/useAudio';

const SERVICES = [
  {
    idx: 'S/01',
    status: 'UI/UX DESIGN',
    title: 'Webpage Design',
    amb: false,
    desc: 'High-impact, modern, and dark-themed interface designs tailored for maximum engagement and visual polish.',
    items: ['Custom UI/UX Wireframing & High-Fidelity Prototyping','Responsive Mobile & Desktop Layouts','Cyber-Console, Dark-Mode & Glassmorphism Aesthetics','Design Systems, Component Tokens & Style Guides'],
    tags: ['FIGMA','HTML5 / CSS3','UI/UX','PROTOTYPING'],
    subject: 'Inquiry: Webpage Design Project',
    blueprint: {
      metrics: [
        { label: 'LIGHTHOUSE TARGET', value: '100 / 100', pct: 100, subtext: 'Peak performance & SEO standard' },
        { label: 'DEVICE COMPLIANCE', value: '100% RESPONSIVE', pct: 100, subtext: 'Adaptive mobile to ultra-wide' },
      ],
      flow: ['Discovery & Tokens', 'Wireframe', 'High-Fi Prototype', 'Design System Review', 'Developer Handoff'],
      turnaround: '3–5 days per key milestone',
    },
  },
  {
    idx: 'S/02',
    status: 'FULL-STACK BUILD',
    title: 'Website Package',
    amb: false,
    desc: 'Turnkey, full-cycle website development from initial concept to live production. Blazing fast, zero-bloat static sites and SPAs.',
    items: ['Complete End-to-End Build, Styling & Logic','Custom Domain, DNS & Cloudflare / SSL Configuration','GitHub Pages / Netlify / Vercel Production Deployment','SEO Best Practices & 100/100 Lighthouse Performance Tuning'],
    tags: ['TURNKEY BUILD','FAST VANILLA STACK','DNS & HOSTING','SEO OPTIMIZED'],
    subject: 'Inquiry: Website Package Project',
    blueprint: {
      metrics: [
        { label: 'BUILD DEPLOY SPEED', value: '< 1 SECOND', pct: 98, subtext: 'Instant global CDN caching' },
        { label: 'BUNDLE FOOTPRINT', value: '< 150 KB', pct: 96, subtext: 'Zero-bloat optimized code' },
      ],
      flow: ['Architecture Setup', 'Component Engineering', 'Routing & Motion', 'DNS & SSL Config', 'Production Live'],
      turnaround: '1–2 weeks turnkey execution',
    },
  },
  {
    idx: 'S/03',
    status: 'ADVISORY & AUDIT',
    title: 'IT Consultation',
    amb: false,
    desc: 'Strategic operational advice and hands-on auditing drawn from 12+ years across enterprise IT, service desks, and iGaming.',
    items: ['IT Systems & Helpdesk Workflow Auditing','ServiceNow / Jira Service Desk Setup & Optimization','Technical Documentation, SOPs & Knowledge Base Architecture','Remote Support Infrastructure & Tooling Strategy'],
    tags: ['SERVICENOW','JIRA SERVICE DESK','SOP WRITING','ITSM / HELPDESK'],
    subject: 'Inquiry: IT Consultation',
    blueprint: {
      metrics: [
        { label: 'WORKFLOW GAIN', value: '3x PRODUCTIVITY', pct: 90, subtext: 'Targeted SOP optimization' },
        { label: 'TICKET TRIAGE ACCURACY', value: '99%', pct: 99, subtext: 'Structured queue routing' },
      ],
      flow: ['Current State Audit', 'Friction Identification', 'SOP Draft & Tooling', 'Team Training', 'Review'],
      turnaround: 'Flexible hourly / milestone advisory',
    },
  },
  {
    idx: 'S/04',
    status: 'TEAM COLLAB',
    title: 'App Development',
    amb: true,
    desc: 'Custom web and application development executed in coordination with a vetted partner engineering team.',
    items: ['Full-Stack Web App Engineering & MVP Delivery','Frontend & Backend Architecture via Dedicated Partner Team','Third-Party API, Webhook & Relational Database Pipelines','Sprint-Based Delivery, Milestones & Structured QA'],
    tags: ['TEAM COLLAB','API INTEGRATIONS','WEB APPS','RAPID MVP'],
    subject: 'Inquiry: App Development Project',
    blueprint: {
      metrics: [
        { label: 'API UPTIME TARGET', value: '99.9%', pct: 99, subtext: 'Resilient backend architecture' },
        { label: 'SPRINT VELOCITY', value: '2-WEEK CYCLES', pct: 94, subtext: 'Structured Agile milestones' },
      ],
      flow: ['Scope & Specs', 'Sprint Backlog', 'Partner Team Build', 'QA & Security Check', 'Launch MVP'],
      turnaround: 'Sprint-based roadmap delivery',
    },
  },
];

function ServiceCardItem({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const [expanded, setExpanded] = useState(false);
  const { playHover, playClick, playUnfurl } = useAudio();

  const toggleBlueprint = () => {
    playUnfurl();
    setExpanded(prev => !prev);
  };

  return (
    <RevealSection delay={i * 0.08}>
      <TiltCard className="service-card" intensity={3}>
        <div className="svc-top">
          <span className="svc-idx mono">{s.idx}</span>
          <span className={`svc-status mono${s.amb ? ' amb' : ''}`}><span className="dot-sm" aria-hidden="true" />{s.status}</span>
        </div>
        <h3 className="svc-title">{s.title}</h3>
        <p className="svc-desc">{s.desc}</p>
        <ul className="svc-list">
          {s.items.map(item => <li key={item}>{item}</li>)}
        </ul>
        <div className="svc-tags">
          {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        {/* Blueprint Toggle Button */}
        <div style={{ margin: '10px 0 16px', display: 'flex', justifyContent: 'flex-start' }}>
          <motion.button
            onClick={toggleBlueprint}
            onMouseEnter={() => playHover()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '.14em',
              color: expanded ? 'var(--acc-dk)' : 'var(--acc)',
              backgroundColor: expanded ? 'var(--acc)' : 'rgba(184,240,74,0.06)',
              border: '1px solid var(--acc)',
              borderRadius: 2,
              padding: '4px 10px',
              cursor: 'pointer',
              transition: 'background-color 0.2s, color 0.2s',
            }}
          >
            {expanded ? '▲ HIDE SPECS' : '▼ VIEW EXECUTION BLUEPRINT'}
          </motion.button>
        </div>

        {/* Expandable Blueprint Drawer */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.65, 0.2, 1] as const }}
              style={{ overflow: 'hidden', borderTop: '1px dashed var(--line2)', paddingTop: 14, marginBottom: 16 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                {s.blueprint.metrics.map(m => (
                  <MetricGauge key={m.label} {...m} />
                ))}
              </div>
              <SchematicFlow steps={s.blueprint.flow} />
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--dim)', marginTop: 6 }}>
                <b>ESTIMATED DELIVERY //</b> {s.blueprint.turnaround}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="svc-foot">
          <motion.a
            className="btn fill svc-btn"
            href={`mailto:erzon22@gmail.com?subject=${encodeURIComponent(s.subject)}`}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
          >
            INQUIRE ↗
          </motion.a>
        </div>
      </TiltCard>
    </RevealSection>
  );
}

export function ServicesSection() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <RevealSection className="s-head">
          <p className="s-no mono">05 — OFFERINGS</p>
          <h2 className="title">SERVICES & ENGAGEMENTS</h2>
          <p className="s-sub">Accepting select freelance builds, technical consulting, and collaborative development.</p>
          <div className="avail-badge-wrap" style={{ marginTop: 18 }}>
            <span className="avail-tag"><span className="dot" aria-hidden="true" />AVAILABLE FOR PROJECTS</span>
          </div>
        </RevealSection>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCardItem key={s.idx} s={s} i={i} />
          ))}
        </div>

        <RevealSection delay={0.25}>
          <div className="service-note">
            <div><b>OPERATING NOTE //</b> Sprints and consultation sessions are scheduled primarily during weekend windows (GMT+8) with async communication throughout the week.</div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
