import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MetricGauge, SchematicFlow } from '@/components/MetricGauge';
import { useAudio } from '@/hooks/useAudio';

export interface ServiceDetail {
  no: string;
  title: string;
  status: string;
  tag: string;
  desc: string;
  items: string[];
  metrics: { label: string; value: string; pct: number; subtext: string }[];
  flow: string[];
  turnaround: string;
  subject: string;
}

export const HUB_SERVICES: ServiceDetail[] = [
  {
    no: '01',
    title: 'Webpage Design',
    status: 'UI/UX DESIGN',
    tag: 'FIGMA · CYBER AESTHETICS',
    desc: 'High-impact, modern, dark-themed and cyber-console interface designs tailored for maximum engagement, high conversion, and visual polish.',
    items: [
      'Custom UI/UX Wireframing & High-Fidelity Interactive Prototyping',
      'Adaptive Mobile, Tablet & Ultra-Wide Desktop Layouts',
      'Cyber-Console, Dark-Mode, Glassmorphism & Neon Accent Styling',
      'Complete Design Systems, Component Tokens & Style Guides',
    ],
    metrics: [
      { label: 'LIGHTHOUSE TARGET', value: '100 / 100', pct: 100, subtext: 'Peak performance & SEO standard' },
      { label: 'RESPONSIVENESS', value: '100% ADAPTIVE', pct: 100, subtext: 'Seamless on all screen sizes' },
    ],
    flow: ['Discovery & Tokens', 'Wireframe', 'High-Fi Prototype', 'Design System Review', 'Developer Handoff'],
    turnaround: '3–5 days per key milestone',
    subject: 'Inquiry: Webpage Design Project',
  },
  {
    no: '02',
    title: 'Website Package',
    status: 'FULL-STACK BUILD',
    tag: 'TURNKEY · ZERO-BLOAT',
    desc: 'Turnkey, full-cycle website development from initial concept to live production. Blazing fast, zero-bloat static sites and modern single-page applications.',
    items: [
      'Complete End-to-End Build, Styling, Animations & Logic',
      'Custom Domain, DNS & Cloudflare / SSL Security Configuration',
      'GitHub Pages / Netlify / Vercel Automated Production Deployment',
      'SEO Best Practices & 100/100 Lighthouse Performance Tuning',
    ],
    metrics: [
      { label: 'BUILD DEPLOY SPEED', value: '< 1 SECOND', pct: 98, subtext: 'Instant global CDN caching' },
      { label: 'BUNDLE FOOTPRINT', value: '< 150 KB', pct: 96, subtext: 'Zero-bloat optimized code' },
    ],
    flow: ['Architecture Setup', 'Component Engineering', 'Routing & Motion', 'DNS & SSL Config', 'Production Live'],
    turnaround: '1–2 weeks turnkey execution',
    subject: 'Inquiry: Website Package Project',
  },
  {
    no: '03',
    title: 'IT Consultation',
    status: 'ADVISORY & AUDIT',
    tag: 'ITSM · SERVICENOW · JIRA',
    desc: 'Strategic operational advice and hands-on auditing drawn from 12+ years across enterprise IT support, service desks, and iGaming operations.',
    items: [
      'IT Systems & Helpdesk Workflow Auditing & Triage Optimization',
      'ServiceNow / Jira Service Desk Setup, Routing & Optimization',
      'Technical Documentation, SOPs & Knowledge Base Architecture',
      'Remote Support Infrastructure, Access Management & Tooling Strategy',
    ],
    metrics: [
      { label: 'WORKFLOW GAIN', value: '3x PRODUCTIVITY', pct: 90, subtext: 'Targeted SOP optimization' },
      { label: 'TRIAGE ACCURACY', value: '99%', pct: 99, subtext: 'Structured queue routing' },
    ],
    flow: ['Current State Audit', 'Friction Identification', 'SOP Draft & Tooling', 'Team Training', 'Review'],
    turnaround: 'Flexible hourly / milestone advisory',
    subject: 'Inquiry: IT Consultation',
  },
  {
    no: '04',
    title: 'App Development',
    status: 'TEAM COLLABORATION',
    tag: 'FULL-STACK · MVP DELIVERY',
    desc: 'Custom web and application development executed in direct coordination with a vetted partner engineering team for end-to-end delivery.',
    items: [
      'Full-Stack Web App Engineering & Rapid MVP Delivery',
      'Frontend & Backend Architecture via Dedicated Partner Team',
      'Third-Party API, Webhook & Relational Database Pipelines',
      'Sprint-Based Delivery, Structured Milestones & Comprehensive QA',
    ],
    metrics: [
      { label: 'API UPTIME TARGET', value: '99.9%', pct: 99, subtext: 'Resilient backend architecture' },
      { label: 'SPRINT VELOCITY', value: '2-WEEK CYCLES', pct: 94, subtext: 'Structured Agile milestones' },
    ],
    flow: ['Scope & Specs', 'Sprint Backlog', 'Partner Team Build', 'QA & Security Check', 'Launch MVP'],
    turnaround: 'Sprint-based roadmap delivery',
    subject: 'Inquiry: App Development Project',
  },
];

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const { playClick, playHover } = useAudio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 12, 14, 0.88)',
            backdropFilter: 'blur(14px)',
            zIndex: 9995,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ scale: 0.95, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.2, 0.65, 0.2, 1] as const }}
            style={{
              width: 'min(680px, 94vw)',
              maxHeight: '90vh',
              background: 'var(--panel)',
              border: '1px solid var(--acc)',
              borderRadius: 6,
              boxShadow: '0 24px 70px rgba(0,0,0,0.85), 0 0 35px rgba(184,240,74,0.12)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 22px',
                background: 'linear-gradient(180deg, var(--panel2), var(--panel))',
                borderBottom: '1px solid var(--line)',
                position: 'sticky',
                top: 0,
                zIndex: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--acc)', letterSpacing: '.16em' }}>
                  {service.no} // {service.status}
                </span>
                <span className="tag now" style={{ fontSize: 9 }}>
                  {service.tag}
                </span>
              </div>

              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  border: '1px solid var(--line2)',
                  borderRadius: 2,
                  padding: '4px 8px',
                  color: 'var(--dim)',
                  cursor: 'pointer',
                  background: 'var(--bg)',
                }}
                aria-label="Close modal"
              >
                ESC ✕
              </button>
            </div>

            {/* Modal Body Content */}
            <div style={{ padding: '24px 22px' }}>
              <h2
                style={{
                  fontFamily: 'var(--disp)',
                  fontSize: 'clamp(24px, 3.2vw, 32px)',
                  fontWeight: 700,
                  color: 'var(--txt)',
                  margin: '0 0 12px',
                }}
              >
                {service.title}
              </h2>

              <p style={{ fontSize: 14.5, color: 'var(--mut)', lineHeight: 1.65, margin: '0 0 20px' }}>
                {service.desc}
              </p>

              {/* Deliverables Checklist */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', color: 'var(--acc)', marginBottom: 10 }}>
                  SCOPE &amp; KEY DELIVERABLES
                </div>
                <ul style={{ listStyle: 'none', display: 'grid', gap: 8, padding: 0, margin: 0 }}>
                  {service.items.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        position: 'relative',
                        paddingLeft: 20,
                        fontSize: 13.5,
                        color: 'var(--txt)',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: 'var(--acc)', fontSize: 11, top: 1 }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metric Radial Gauges */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', color: 'var(--acc)', marginBottom: 10 }}>
                  PERFORMANCE BENCHMARKS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                  {service.metrics.map((m) => (
                    <MetricGauge key={m.label} {...m} />
                  ))}
                </div>
              </div>

              {/* Schematic Workflow */}
              <SchematicFlow steps={service.flow} />

              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--dim)', margin: '10px 0 22px' }}>
                <b>ESTIMATED DELIVERY //</b> {service.turnaround}
              </div>

              {/* Inquiry Action Button */}
              <div style={{ borderTop: '1px solid var(--line2)', paddingTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <motion.a
                  href={`mailto:erzon22@gmail.com?subject=${encodeURIComponent(service.subject)}`}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn fill"
                  style={{ flex: 1, justifyContent: 'center', fontSize: 12, padding: '13px 20px', letterSpacing: '.14em' }}
                >
                  INQUIRE ABOUT THIS SERVICE ➔
                </motion.a>

                <button
                  onClick={() => {
                    playClick();
                    onClose();
                  }}
                  className="btn"
                  style={{ fontSize: 11, padding: '13px 18px' }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
