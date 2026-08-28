import { motion } from 'motion/react';
import { useAudio } from '@/hooks/useAudio';

export interface ProjectItem {
  id: string;
  name: string;
  url: string;
  displayUrl: string;
  desc: string;
  status: 'COMPLETED' | 'IN-PROGRESS';
  tags: string[];
}

export const RECENT_PROJECTS: ProjectItem[] = [
  {
    id: 'p-01',
    name: 'Icy Brow Studio',
    url: 'https://icybrowstudio.com/',
    displayUrl: 'icybrowstudio.com',
    desc: 'Turnkey brand website, beauty service catalog, and client booking experience.',
    status: 'COMPLETED',
    tags: ['TURNKEY WEB', 'CLIENT BOOKING', 'UI/UX'],
  },
  {
    id: 'p-02',
    name: 'Akhi Builders Corp.',
    url: 'https://www.akhibuilderscorp.com/',
    displayUrl: 'akhibuilderscorp.com',
    desc: 'Official corporate website and digital platform for Akhi Builders Corp.',
    status: 'IN-PROGRESS',
    tags: ['CORPORATE WEB', 'NEXT.JS / REACT', 'VIBE CODING'],
  },
  {
    id: 'p-03',
    name: 'Tumpak! Tagalog Game',
    url: 'https://tumpak-tagalog-game.vercel.app/',
    displayUrl: 'tumpak-tagalog-game.vercel.app',
    desc: 'Interactive browser-based Tagalog word game featuring real-time gameplay mechanics.',
    status: 'IN-PROGRESS',
    tags: ['GAME DEV', 'INTERACTIVE', 'BROWSER GAME'],
  },
];

export function RecentProjectsSection({ isBento = false }: { isBento?: boolean }) {
  const { playHover, playClick } = useAudio();

  return (
    <div className="projects-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.16em', color: 'var(--acc)' }}>
          <span className="dot-sm" />
          RECENT PROJECTS &amp; TRACK RECORD
        </div>
        <span className="mono dim" style={{ fontSize: 9.5 }}>3 ACTIVE</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {RECENT_PROJECTS.map((proj) => {
          const isComplete = proj.status === 'COMPLETED';

          return (
            <motion.a
              key={proj.id}
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
              style={{
                display: 'block',
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid var(--line2)',
                borderRadius: 3,
                padding: '12px 14px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h4 style={{ fontFamily: 'var(--disp)', fontSize: 15, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
                    {proj.name}
                  </h4>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--dim)' }}>
                    ↗
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 9,
                    letterSpacing: '.14em',
                    padding: '2px 8px',
                    borderRadius: 2,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    color: isComplete ? 'var(--acc)' : 'var(--amb)',
                    backgroundColor: isComplete ? 'rgba(184,240,74,0.08)' : 'rgba(255,180,84,0.08)',
                    border: `1px solid ${isComplete ? 'rgba(184,240,74,0.3)' : 'rgba(255,180,84,0.3)'}`,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      backgroundColor: isComplete ? 'var(--acc)' : 'var(--amb)',
                    }}
                  />
                  {proj.status}
                </span>
              </div>

              <p style={{ fontSize: 12.5, color: 'var(--mut)', margin: '6px 0 8px', lineHeight: 1.45 }}>
                {proj.desc}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 8.5,
                        letterSpacing: '.08em',
                        color: 'var(--dim)',
                        border: '1px solid var(--line)',
                        padding: '1px 5px',
                        borderRadius: 2,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--acc)', opacity: 0.85 }}>
                  {proj.displayUrl}
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
