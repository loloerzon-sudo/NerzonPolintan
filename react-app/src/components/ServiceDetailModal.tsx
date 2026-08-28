import { useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    title: 'Landing Page Sprint',
    status: '48–72H LAUNCH',
    tag: 'RAPID · HIGH-CONVERTING',
    desc: 'High-conversion single-page website, portfolio, or event launch delivered at speed. Mobile-responsive, dark/light aesthetic, with custom domain and 1-click contact integration.',
    items: [
      'Single-Page High-Impact Wireframing & UI/UX Styling',
      'Mobile, Tablet & Desktop Pixel-Perfect Responsiveness',
      'Custom Domain, Cloudflare SSL & Fast CDN Global Hosting',
      '1-Click WhatsApp, Email, & Social Booking Actions',
    ],
    metrics: [
      { label: 'TURNAROUND TIME', value: '48–72 HOURS', pct: 100, subtext: 'Rapid sprint to live launch' },
      { label: 'MOBILE OPTIMIZATION', value: '100% RESPONSIVE', pct: 100, subtext: 'Flawless across all devices' },
    ],
    flow: ['Intake & Assets', 'Wireframe Draft', 'Build & Styling', 'DNS / Domain Live', 'Launch Review'],
    turnaround: '48 to 72 hours from intake',
    subject: 'Inquiry: Landing Page Sprint Project',
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
    title: 'No-Code & AI Automation',
    status: 'WORKFLOW ADVISORY',
    tag: 'AIRTABLE · ZAPIER · MAKE',
    desc: 'Automate manual business tasks and repetitive processes using no-code platforms, Airtable relational databases, webhooks, and custom AI agents to save hours weekly.',
    items: [
      'Business Process Audit & Manual Task Bottleneck Identification',
      'Airtable CRM / Project Tracking Database Setup & Schema Design',
      'Zapier / Make Multi-Step Webhook Automations & Alerts',
      'AI Agent Prompting & Autonomous Summary / Triage Bots',
    ],
    metrics: [
      { label: 'TIME SAVED / WEEK', value: '10+ HOURS', pct: 92, subtext: 'Automated manual task execution' },
      { label: 'INTEGRATION ACCURACY', value: '99.9%', pct: 99, subtext: 'Reliable webhook sync' },
    ],
    flow: ['Workflow Audit', 'Pipeline Blueprint', 'Airtable / Zapier Build', 'Test & Validate', 'Handoff'],
    turnaround: '3–7 days per automation pipeline',
    subject: 'Inquiry: No-Code & AI Automation Setup',
  },
  {
    no: '04',
    title: '1-on-1 Vibe Coding Coaching',
    status: 'LIVE TUTORIAL',
    tag: 'CURSOR · CLAUDE · AGENTS',
    desc: 'Interactive 1-on-1 screen-share tutorial teaching non-technical founders, operators, and creators how to build & deploy real web apps from scratch using Cursor, Claude Code, and AI prompting.',
    items: [
      'IDE & AI Toolkit Setup (Cursor, Claude Code, Antigravity, Git)',
      'Effective Prompt Engineering & Architectural Decomposition Techniques',
      'Iterative Feature Building, Live Debugging & Context Management',
      'Zero-Config Production Deployment on Vercel or GitHub Pages',
    ],
    metrics: [
      { label: 'PRACTICAL SKILL GAIN', value: '100% HANDS-ON', pct: 100, subtext: 'Build a working app on call' },
      { label: 'SESSION DURATION', value: '60–90 MIN', pct: 95, subtext: 'Focused live screen-share' },
    ],
    flow: ['Goal & Idea Scope', 'Tool Environment Setup', 'Live App Construction', 'Deploy & Publish', 'Q&A'],
    turnaround: 'Flexible booking (60–90 min session)',
    subject: 'Inquiry: 1-on-1 Vibe Coding Coaching Session',
  },
  {
    no: '05',
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
    no: '06',
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

  // Handle ESC and Body Scroll Lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(6, 8, 10, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 999999, // Above header, navbar, and everything
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'max(12px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(12px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left))',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 16 }}
            transition={{ duration: 0.24, ease: [0.2, 0.65, 0.2, 1] as const }}
            style={{
              width: 'min(680px, 100%)',
              maxHeight: 'calc(100dvh - 36px)',
              background: 'var(--panel)',
              border: '1px solid var(--acc)',
              borderRadius: 6,
              boxShadow: '0 24px 70px rgba(0,0,0,0.9), 0 0 35px rgba(184,240,74,0.15)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Modal Header: Sticky at Top */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: 'var(--panel2)',
                borderBottom: '1px solid var(--line)',
                position: 'sticky',
                top: 0,
                zIndex: 30,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--acc)', letterSpacing: '.16em', fontWeight: 600 }}>
                  {service.no} // {service.status}
                </span>
                <span className="tag now" style={{ fontSize: 9, padding: '2px 6px' }}>
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
                  fontSize: 12,
                  fontWeight: 700,
                  border: '1px solid var(--line2)',
                  borderRadius: 3,
                  padding: '6px 12px',
                  color: 'var(--txt)',
                  cursor: 'pointer',
                  background: 'var(--bg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  minHeight: 36,
                }}
                aria-label="Close modal"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Modal Body Content */}
            <div style={{ padding: '20px 18px' }}>
              <h2
                style={{
                  fontFamily: 'var(--disp)',
                  fontSize: 'clamp(22px, 3.2vw, 30px)',
                  fontWeight: 700,
                  color: 'var(--txt)',
                  margin: '0 0 10px',
                  lineHeight: 1.15,
                }}
              >
                {service.title}
              </h2>

              <p style={{ fontSize: 14, color: 'var(--mut)', lineHeight: 1.6, margin: '0 0 18px' }}>
                {service.desc}
              </p>

              {/* Deliverables Checklist */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', color: 'var(--acc)', marginBottom: 8 }}>
                  SCOPE &amp; KEY DELIVERABLES
                </div>
                <ul style={{ listStyle: 'none', display: 'grid', gap: 7, padding: 0, margin: 0 }}>
                  {service.items.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        position: 'relative',
                        paddingLeft: 18,
                        fontSize: 13,
                        color: 'var(--txt)',
                        lineHeight: 1.45,
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: 'var(--acc)', fontSize: 10, top: 2 }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metric Radial Gauges */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', color: 'var(--acc)', marginBottom: 8 }}>
                  PERFORMANCE BENCHMARKS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                  {service.metrics.map((m) => (
                    <MetricGauge key={m.label} {...m} />
                  ))}
                </div>
              </div>

              {/* Schematic Workflow */}
              <SchematicFlow steps={service.flow} />

              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--dim)', margin: '10px 0 20px' }}>
                <b>ESTIMATED DELIVERY //</b> {service.turnaround}
              </div>

              {/* Action Buttons: Stack nicely on Mobile */}
              <div
                style={{
                  borderTop: '1px solid var(--line2)',
                  paddingTop: 16,
                  display: 'flex',
                  gap: 10,
                  flexDirection: 'column',
                }}
              >
                <motion.a
                  href={`mailto:erzon22@gmail.com?subject=${encodeURIComponent(service.subject)}`}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn fill"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: 12,
                    padding: '13px 18px',
                    letterSpacing: '.12em',
                    textAlign: 'center',
                  }}
                >
                  INQUIRE ABOUT THIS SERVICE ➔
                </motion.a>

                <button
                  onClick={() => {
                    playClick();
                    onClose();
                  }}
                  className="btn"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: 12,
                    padding: '12px 18px',
                  }}
                >
                  CLOSE WINDOW
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
