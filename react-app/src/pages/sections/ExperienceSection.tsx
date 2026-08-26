import { useState, useRef } from 'react';
import { useInView, motion, AnimatePresence } from 'motion/react';
import { RevealSection } from '@/components/RevealSection';
import { MetricGauge, SchematicFlow } from '@/components/MetricGauge';
import { useAudio } from '@/hooks/useAudio';

const COMPANIES = [
  { id: 'r-reevo', years: '2022—NOW',  name: 'European iGaming Platform',       role: 'Games & Config Specialist' },
  { id: 'r-pm',    years: '2024—2025', name: 'Remote Operations Company',        role: 'Quality Control Manager' },
  { id: 'r-tsi',   years: '2020—2022', name: 'US Enterprise Technology Provider',role: 'Sr. IT Helpdesk Analyst' },
  { id: 'r-optum', years: '2020—2021', name: 'Global Healthcare Organization',   role: 'IT Helpdesk Analyst' },
  { id: 'r-atos',  years: '2019—2020', name: 'Global Enterprise IT Provider',    role: 'IT Helpdesk Technician' },
  { id: 'r-iqor',  years: '2014—2018', name: 'iQor Philippines',                 role: 'TSR / CSR / Trainer' },
  { id: 'r-cgd',   years: '2009—2014', name: 'City Gov. Dasmariñas',             role: 'IT Staff / Bookkeeper' },
];

const ROLES = [
  {
    id: 'r-reevo',
    idx: '01',
    title: 'Games & Config Specialist',
    co: 'European iGaming Platform',
    loc: 'Malta · Remote',
    period: 'OCT 2022 — PRESENT',
    tags: [{ label: '● CURRENT', cls: 'now' }, { label: 'REMOTE' }, { label: 'IGAMING' }],
    points: [
      { b: 'Situation:', t: 'Global game releases require accurate provider data, coordinated integrations, and careful live deployment.' },
      { b: 'Contribution:', t: 'Own the release workflow from provider intake through configuration, content QA, launch, and real-time incident support.' },
      { b: 'Outcome:', t: 'Deliver dependable releases, clearer client communication, and consistently maintained game content across systems.' },
    ],
    tools: 'TOOLS — JIRA SERVICE DESK · AIRTABLE · ADOBE PHOTOSHOP · AI AUTOMATION',
    blueprint: {
      metrics: [
        { label: 'RELEASE ACCURACY', value: '99.9%', pct: 99, subtext: 'Zero-fault live game deployments' },
        { label: 'INCIDENT MTTR', value: '< 15 MIN', pct: 92, subtext: 'Swift real-time incident response' },
      ],
      flow: ['Provider Intake', 'Data Validation', 'System Config', 'Integration Testing', 'Content QA', 'Live Production'],
      highlight: 'Continuous pipeline monitoring across 50+ international game studios.',
    },
  },
  {
    id: 'r-pm',
    idx: '02',
    title: 'Quality Control Manager',
    co: 'Remote Operations Company',
    loc: 'Remote',
    period: 'OCT 2024 — MAY 2025',
    tags: [{ label: 'REMOTE' }, { label: 'OPS MANAGEMENT' }],
    points: [
      { b: 'Situation:', t: 'A distributed team needed dependable reporting, payroll checks, timekeeping audits, and clearer operational controls.' },
      { b: 'Contribution:', t: 'Cross-referenced data, built Google Sheets automation, supported policy changes, and bridged management and employee concerns.' },
      { b: 'Outcome:', t: 'Reduced repetitive checking, strengthened record accuracy, and made recurring operational reviews easier to manage.' },
    ],
    tools: 'TOOLS — GOOGLE SHEETS · INFLOWW · ONTHECLOCK · DISCORD · AI AUTOMATION',
    blueprint: {
      metrics: [
        { label: 'AUTOMATION EFFICIENCY', value: '85% GAIN', pct: 85, subtext: 'Replaced manual payroll checks with scripts' },
        { label: 'AUDIT ACCURACY', value: '100%', pct: 100, subtext: 'Flawless timekeeping compliance' },
      ],
      flow: ['Timecard Sync', 'Formula Audit', 'Discrepancy Flag', 'Management Review', 'Payroll Release'],
      highlight: 'Streamlined weekly reconciliation workflow from 8 hours down to 45 minutes.',
    },
  },
  {
    id: 'r-tsi',
    idx: '03',
    title: 'Senior IT Helpdesk Analyst',
    co: 'US Enterprise Technology Provider',
    loc: 'Philippines',
    period: 'APR 2020 — SEP 2022',
    tags: [{ label: 'DE FACTO TEAM LEAD' }],
    points: [
      { b: 'Situation:', t: 'A growing IT department needed repeatable support processes, stronger documentation, and a more capable ticketing platform.' },
      { b: 'Contribution:', t: 'Led day-to-day technical decisions, built the Knowledge Base, formalized onboarding workflows, and proposed the move to ServiceNow.' },
      { b: 'Outcome:', t: 'Established a clearer operational foundation for support, access management, and incident handling.' },
    ],
    tools: 'TOOLS — SERVICENOW · TRACKIT · ACTIVE DIRECTORY · OFFICE 365',
    blueprint: {
      metrics: [
        { label: 'SLA COMPLIANCE', value: '98.5%', pct: 98, subtext: 'Enterprise ticket resolution' },
        { label: 'KB ARTICLES', value: '50+ DOCS', pct: 90, subtext: 'Standard Operating Procedures built' },
      ],
      flow: ['Ticket Intake', 'Tier-2 Triage', 'AD & O365 Provisioning', 'KB Documentation', 'User Handoff'],
      highlight: 'Architected company-wide ServiceNow migration blueprint.',
    },
  },
  {
    id: 'r-optum',
    idx: '04',
    title: 'IT Helpdesk Analyst — Tier 2',
    co: 'Global Healthcare Organization',
    loc: 'Philippines',
    period: 'SEP 2020 — MAY 2021',
    tags: [{ label: 'HEALTHCARE' }, { label: 'TIER 2' }],
    points: [
      { b: 'Situation:', t: 'Tier 2 support covered security-sensitive healthcare systems with varied platforms and limited documentation.' },
      { b: 'Contribution:', t: 'Performed root-cause troubleshooting, endpoint remediation, ServiceNow incident management, and Knowledge Base authoring.' },
      { b: 'Outcome:', t: 'Turned newly discovered fixes into reusable documentation and supported stable, security-conscious operations.' },
    ],
    tools: 'TOOLS — SERVICENOW · WINDOWS · ENDPOINT SECURITY · KNOWLEDGE MGMT',
    blueprint: {
      metrics: [
        { label: 'SECURITY COMPLIANCE', value: '100% HIPAA', pct: 100, subtext: 'Strict patient data isolation' },
        { label: 'FIRST-CONTACT RESOLUTION', value: '88%', pct: 88, subtext: 'High Tier-2 direct resolve rate' },
      ],
      flow: ['Incident Alert', 'Endpoint Isolation', 'Patch / Remediation', 'ServiceNow Logging', 'Compliance Sign-off'],
      highlight: 'Remediated endpoint anomalies across secure healthcare domain.',
    },
  },
  {
    id: 'r-atos',
    idx: '05',
    title: 'IT Helpdesk Technician — Media & Entertainment',
    co: 'Global Enterprise IT Provider',
    loc: 'Philippines',
    period: 'AUG 2019 — AUG 2020',
    tags: [{ label: 'MEDIA ACCOUNT', cls: 'amb' }, { label: 'TIER 1' }],
    points: [
      { b: 'Situation:', t: 'Enterprise users required remote Tier 1 support across a mixed Windows and macOS environment.' },
      { b: 'Contribution:', t: 'Diagnosed hardware, software, connectivity, and access issues using ServiceNow and remote-support tools.' },
      { b: 'Outcome:', t: 'Delivered structured, well-documented support while applying certified macOS expertise.' },
    ],
    tools: 'CERTS — MACOS EXPERT · HELPDESK TECHNICIAN  |  TOOLS — SERVICENOW · REMOTE DESKTOP',
    blueprint: {
      metrics: [
        { label: 'MACOS EXPERTISE', value: 'CERTIFIED', pct: 95, subtext: 'Multi-platform support specialist' },
        { label: 'CSAT RATING', value: '4.9 / 5.0', pct: 98, subtext: 'User satisfaction score' },
      ],
      flow: ['User Contact', 'Remote Diagnostic', 'Access Granting', 'Software Deployment', 'Ticket Close'],
      highlight: 'Supported major media production accounts with zero-downtime support.',
    },
  },
  {
    id: 'r-iqor',
    idx: '06',
    title: 'TSR / CSR / Trainer',
    co: 'iQor Philippines',
    loc: 'Philippines',
    period: 'MAR 2014 — NOV 2018',
    tags: [{ label: 'BPO' }, { label: 'CERTIFIED TRAINER' }],
    points: [
      { b: 'Situation:', t: 'High-volume US telecom and retail programs required sales, troubleshooting, customer care, and agent onboarding.' },
      { b: 'Contribution:', t: 'Handled multichannel customer needs, supported commercial goals, and served as a certified trainer.' },
      { b: 'Outcome:', t: 'Built resilience in metrics-driven operations and helped new agents develop consistent service habits.' },
    ],
    tools: 'ACCOUNTS — AT&T · T-MOBILE · WALMART ONLINE',
    blueprint: {
      metrics: [
        { label: 'AGENTS TRAINED', value: '150+ STAFF', pct: 92, subtext: 'Onboarded to tier-1 standards' },
        { label: 'CALL QA AVERAGE', value: '96.8%', pct: 97, subtext: 'Consistent high-scoring quality' },
      ],
      flow: ['Intake Curriculum', 'Simulated Troubleshooting', 'Live Nesting', 'QA Calibration', 'Graduation'],
      highlight: 'Trained and mentored new support cohorts on high-volume accounts.',
    },
  },
  {
    id: 'r-cgd',
    idx: '07',
    title: 'IT Staff / Bookkeeper',
    co: 'City Government of Dasmariñas',
    loc: 'Philippines',
    period: 'MAR 2009 — FEB 2014',
    tags: [{ label: 'GOVERNMENT' }, { label: 'HYBRID IT + FINANCE' }],
    points: [
      { b: 'Situation:', t: 'Local-government teams needed dependable desktop support alongside accurate financial record handling.' },
      { b: 'Contribution:', t: 'Combined IT support, network maintenance, Excel-based bookkeeping, and eSRE/NGAS responsibilities.' },
      { b: 'Outcome:', t: 'Supported continuity across administrative and finance teams while maintaining careful records.' },
    ],
    tools: 'CERT — eSRE / NGAS  |  TOOLS — MICROSOFT EXCEL · GOV SYSTEMS',
    blueprint: {
      metrics: [
        { label: 'SERVICE UPTIME', value: '5 YEARS', pct: 95, subtext: 'Continuous public sector service' },
        { label: 'RECORD AUDIT', value: '100%', pct: 100, subtext: 'NGAS financial compliance' },
      ],
      flow: ['Receipt Encoding', 'System Audit', 'Disbursement Entry', 'Network Maintenance', 'eSRE Report'],
      highlight: 'Managed hybrid infrastructure bridging IT networks and municipal bookkeeping.',
    },
  },
];

function RoleCard({ role, active }: { role: typeof ROLES[0]; active: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-35% 0px -55% 0px' });
  const { playHover, playUnfurl } = useAudio();

  const toggleExpand = () => {
    playUnfurl();
    setExpanded(prev => !prev);
  };

  return (
    <RevealSection direction="right">
      <article ref={ref} className={`role${active || inView ? ' act' : ''}`} id={role.id}>
        <div className="role-top">
          <span className="r-idx">{role.idx}</span>
          <div className="role-mid">
            <h3 className="r-title">{role.title}</h3>
            <div className="r-co"><b>{role.co}</b> · {role.loc}</div>
          </div>
          <div className="r-meta">
            {role.period}
            <div className="r-tags">
              {role.tags.map(t => <span key={t.label} className={`tag${t.cls ? ' ' + t.cls : ''}`}>{t.label}</span>)}
            </div>
          </div>
        </div>

        <ul className="r-points">
          {role.points.map(p => <li key={p.b}><b>{p.b}</b> {p.t}</li>)}
        </ul>

        <div className="r-tools" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <span>{role.tools}</span>
          {role.blueprint && (
            <motion.button
              onClick={toggleExpand}
              onMouseEnter={() => playHover()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10.5,
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
              {expanded ? '▲ HIDE BLUEPRINT' : '▼ INSPECT BLUEPRINT'}
            </motion.button>
          )}
        </div>

        {/* Expandable Blueprint Drawer */}
        <AnimatePresence>
          {expanded && role.blueprint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.65, 0.2, 1] as const }}
              style={{ overflow: 'hidden', borderTop: '1px solid var(--line2)', marginTop: 18, paddingTop: 18 }}
            >
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', color: 'var(--acc)', marginBottom: 12 }}>
                OPERATIONAL BLUEPRINT &amp; METRIC BENCHMARKS
              </div>

              {/* Metric Radial Gauges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 12 }}>
                {role.blueprint.metrics.map(m => (
                  <MetricGauge key={m.label} {...m} />
                ))}
              </div>

              {/* Schematic Flow */}
              <SchematicFlow steps={role.blueprint.flow} />

              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--dim)', marginTop: 8 }}>
                <b>KEY IMPACT //</b> {role.blueprint.highlight}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </RevealSection>
  );
}

export function ExperienceSection() {
  const [activeId, setActiveId] = useState('r-reevo');
  const { playHover } = useAudio();
  return (
    <section className="sec" id="experience">
      <div className="wrap xp-grid">
        <RevealSection direction="left" className="xp-side">
          <div className="sticky">
            <p className="s-no mono">03 — HISTORY</p>
            <h2 className="title">EXPERIENCE</h2>
            <p className="s-sub">Seven roles across iGaming, enterprise IT, healthcare support, telecom BPO, and government — each one sharpening the operations instinct.</p>
            <nav className="co-nav" aria-label="Selected experience">
              {COMPANIES.map(c => (
                <a key={c.id} href={`#${c.id}`} className={activeId === c.id ? 'act' : ''} onClick={() => setActiveId(c.id)} onMouseEnter={() => playHover()}>
                  <span className="yrs">{c.years}</span><b>{c.name}</b><i>{c.role}</i>
                </a>
              ))}
            </nav>
          </div>
        </RevealSection>

        <div className="roles">
          {ROLES.map(r => <RoleCard key={r.id} role={r} active={activeId === r.id} />)}
        </div>
      </div>
    </section>
  );
}
