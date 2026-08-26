import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { RevealSection } from '@/components/RevealSection';
import { useAudio } from '@/hooks/useAudio';

const SKILLS = [
  { idx: 'A/', title: 'AI Engineering & Vibe Coding', note: 'MODERN BUILDER — AI AGENTS · WEB DEV · AIRTABLE INTEGRATIONS', pct: 88, level: 'ACTIVE BUILDER',
    chips: ['VIBE CODING','WEB DEVELOPMENT','AI KNOWLEDGE AGENTS','AIRTABLE DB INTEGRATION','CLAUDE CODE','ANTIGRAVITY IDE','CURSOR','OPENAI CODEX','PROMPT ARCHITECTURE','RAPID PROTOTYPING','API & WEBHOOK PIPELINES'] },
  { idx: 'B/', title: 'Gaming & Ops', note: 'DAILY DRIVER — EUROPEAN IGAMING', pct: 94, level: 'PRIMARY',
    chips: ['GAME RELEASE MGMT','GAME CONFIGURATION','PROVIDER INTEGRATION','AIRTABLE','JIRA SERVICE DESK','CONTENT QA'] },
  { idx: 'C/', title: 'IT Systems', note: 'ENTERPRISE-GRADE FOUNDATION', pct: 86, level: 'CORE',
    chips: ['WINDOWS OS','MACOS — CERTIFIED EXPERT','ACTIVE DIRECTORY','GROUP POLICY','OFFICE 365 & EXCHANGE','SERVICENOW','REMOTE DESKTOP SUPPORT'] },
  { idx: 'D/', title: 'Support & Tools', note: 'TIER 1–2 · SLA-DRIVEN · DOCUMENTATION-FIRST', pct: 80, level: 'STRONG',
    chips: ['TIER 1 & 2 HELPDESK','HW / SW TROUBLESHOOTING','NETWORK DIAGNOSTICS','USER ACCESS MGMT','TECHNICAL DOCUMENTATION','TICKETING SYSTEMS','SLA MANAGEMENT'] },
  { idx: 'E/', title: 'Creative & Design', note: 'INTERNAL BRAND & NEWSLETTER PRODUCTION', pct: 62, level: 'ACTIVE',
    chips: ['ADOBE PHOTOSHOP','ADOBE LIGHTROOM','GRAPHIC DESIGN','NEWSLETTER DESIGN','VISUAL CONTENT PRODUCTION'] },
  { idx: 'F/', title: 'Productivity & Workflow', note: 'TEAM-WIDE CHAMPION — AUTOMATE THE REPETITIVE', pct: 78, level: 'STRONG',
    chips: ['AI WORKFLOW AUTOMATION','PROCESS STREAMLINING','GOOGLE SHEETS AUTOMATION','TICKETING SYSTEMS','SLA MANAGEMENT'] },
];

function SkillBar({ pct, delay }: { pct: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} className="s-bar">
      <motion.div
        style={{ position: 'absolute', inset: 0, background: 'var(--acc)', height: '100%' }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.2, delay, ease: [0.2, 0.65, 0.2, 1] }}
      />
    </div>
  );
}

export function SkillsSection() {
  const { playHover } = useAudio();
  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <RevealSection className="s-head">
          <p className="s-no mono">04 — CAPABILITIES</p>
          <h2 className="title">SKILL MATRIX</h2>
          <p className="s-sub">Six disciplines, one operating mindset: keep the system accurate, the launch clean, and the team faster than yesterday.</p>
        </RevealSection>

        {SKILLS.map((s, i) => (
          <RevealSection key={s.idx} delay={i * 0.06}>
            <div className="skill">
              <span className="s-idx">{s.idx}</span>
              <div className="s-main">
                <h3>{s.title}</h3>
                <p className="s-note mono">{s.note}</p>
                <div className="chips">
                  {s.chips.map(c => (
                    <motion.span
                      key={c}
                      className="chip"
                      whileHover={{ letterSpacing: '0.14em', y: -2, borderColor: 'var(--acc)', color: 'var(--acc)', transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                      onMouseEnter={() => playHover()}
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="s-meter">
                <div className="lbl"><span>FOCUS</span><span>{s.level}</span></div>
                <SkillBar pct={s.pct} delay={i * 0.1} />
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
