import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '@/hooks/useAudio';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ProjectItem {
  id: string;
  name: string;
  url: string;
  displayUrl: string;
  desc: string;
  status: 'COMPLETED' | 'IN-PROGRESS';
  tags: string[];
}

const RECENT_PROJECTS: ProjectItem[] = [
  {
    id: 'p-01',
    name: 'AerzonWave: 3D Cyber Visualizer',
    url: 'https://aerzonwave.nerzon.online/',
    displayUrl: 'aerzonwave.nerzon.online',
    desc: 'High-fidelity 3D audio-reactive cyber visualizer with real-time Web Audio API frequency analysis, procedural shaders, and kinetic typography.',
    status: 'IN-PROGRESS',
    tags: ['3D VISUALIZER', 'THREE.JS', 'AUDIO REACTIVE'],
  },
  {
    id: 'p-02',
    name: 'Tumpak! Tagalog Game',
    url: 'https://tumpak.nerzon.online/',
    displayUrl: 'tumpak.nerzon.online',
    desc: 'Interactive browser-based Tagalog word game featuring real-time gameplay mechanics.',
    status: 'IN-PROGRESS',
    tags: ['GAME DEV', 'INTERACTIVE', 'BROWSER GAME'],
  },
  {
    id: 'p-03',
    name: 'Konekto: Tagalog Word-Trace',
    url: 'https://konekto.nerzon.online/',
    displayUrl: 'konekto.nerzon.online',
    desc: 'Dense 4×4 Tagalog word-trace puzzle featuring interwoven pathing, cross-word letter sharing, and dynamic vanishing tiles.',
    status: 'IN-PROGRESS',
    tags: ['GAME DEV', 'TAGALOG PUZZLE', 'VANILLA JS'],
  },
  {
    id: 'p-04',
    name: 'Wedding Invitation Website',
    url: 'https://weddings.nerzon.online/',
    displayUrl: 'weddings.nerzon.online',
    desc: 'Interactive wedding event platform and digital RSVP experience for Nerzon & Keith.',
    status: 'IN-PROGRESS',
    tags: ['EVENT PLATFORM', 'REACT / VITE', 'RSVP & UI/UX'],
  },
  {
    id: 'p-05',
    name: 'INNI INK: Tattoo Studio & Flash Archive',
    url: 'https://inni-ink.vercel.app/',
    displayUrl: 'inni-ink.vercel.app',
    desc: 'Contemporary tattoo studio portfolio, digital flash archive, anime linework, darkwork gallery, and custom appointment booking experience.',
    status: 'IN-PROGRESS',
    tags: ['TATTOO STUDIO', 'REACT / VITE', 'FLASH ARCHIVE'],
  },
  {
    id: 'p-06',
    name: 'Akhi Builders Corp.',
    url: 'https://www.akhibuilderscorp.com/',
    displayUrl: 'akhibuilderscorp.com',
    desc: 'Official corporate website and digital platform for Akhi Builders Corp.',
    status: 'COMPLETED',
    tags: ['CORPORATE WEB', 'NEXT.JS / REACT', 'VIBE CODING'],
  },
  {
    id: 'p-07',
    name: 'Icy Brow Studio',
    url: 'https://icybrowstudio.com/',
    displayUrl: 'icybrowstudio.com',
    desc: 'Turnkey brand website, beauty service catalog, and client booking experience.',
    status: 'COMPLETED',
    tags: ['TURNKEY WEB', 'CLIENT BOOKING', 'UI/UX'],
  },
  {
    id: 'p-08',
    name: 'JNP Photography Portfolio',
    url: 'https://jnp.nerzon.online/',
    displayUrl: 'jnp.nerzon.online',
    desc: 'Visual photography showcase featuring Adobe Lightroom editing, portrait collections, and creative gallery exhibits.',
    status: 'COMPLETED',
    tags: ['PHOTOGRAPHY', 'LIGHTROOM', 'GALLERY SHOWCASE'],
  },
];

export function RecentProjectsSection() {
  const { playHover, playClick } = useAudio();
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'SHIPPED'>('ALL');
  const filteredProjects = RECENT_PROJECTS.filter(project => filter === 'ALL' || project.status === (filter === 'ACTIVE' ? 'IN-PROGRESS' : 'COMPLETED'));

  return (
    <div className="projects-container">
      <div className="project-toolbar">
        <div className="project-filters" role="group" aria-label="Filter projects">
          {(['ALL', 'ACTIVE', 'SHIPPED'] as const).map(value => (
            <button type="button" key={value} aria-pressed={filter === value} onMouseEnter={() => playHover()} onClick={() => { playClick(); setFilter(value); }}>
              {value} <span>{RECENT_PROJECTS.filter(project => value === 'ALL' || project.status === (value === 'ACTIVE' ? 'IN-PROGRESS' : 'COMPLETED')).length}</span>
            </button>
          ))}
        </div>
        <span className="project-count" role="status">{filteredProjects.length} OF {RECENT_PROJECTS.length} PROJECTS</span>
      </div>
      <div className="project-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(project => (
            <motion.a key={project.id} layout={!reduced} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.25 }}
              href={project.url} target="_blank" rel="noopener noreferrer" className="project-card" onMouseEnter={() => playHover()} onClick={() => playClick()}>
              <div className="project-thumbnail">
                <img src={`/assets/projects/${project.id}.svg`} alt={`${project.name} illustrated project cover`} width={800} height={500} loading="lazy" decoding="async" />
                <span className={`project-status ${project.status === 'COMPLETED' ? 'shipped' : ''}`}>{project.status === 'COMPLETED' ? 'SHIPPED' : 'IN PROGRESS'}</span>
                <span className="project-open" aria-hidden="true">↗</span>
              </div>
              <div className="project-card-body">
                <p className="project-category">{project.tags[0]}</p>
                <h3>{project.name}</h3>
                <p className="project-description">{project.desc}</p>
                <div className="project-tags">{project.tags.slice(1).map(tag => <span key={tag}>{tag}</span>)}</div>
                <div className="project-card-footer"><span>{project.displayUrl}</span><span>EXPLORE ↗</span></div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
