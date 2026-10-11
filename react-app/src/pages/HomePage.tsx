import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { HeroSection } from './sections/HeroSection';
import { ProfileSection } from './sections/ProfileSection';
import { PipelineSection } from './sections/PipelineSection';
import { RecentProjectsSection } from './sections/RecentProjectsSection';
import { ServicesSection } from './sections/ServicesSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { CredentialsSection } from './sections/CredentialsSection';
import { ContactSection } from './sections/ContactSection';
import { RevealSection } from '@/components/RevealSection';
import { Ticker } from '@/components/Ticker';

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export function HomePage() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.2, 0.65, 0.2, 1] as const }}
    >
      <HeroSection />
      <Ticker />
      <ProfileSection />
      <PipelineSection />

      {/* Recent Projects Section */}
      <section className="sec" id="projects">
        <div className="wrap">
          <RevealSection className="s-head">
            <p className="s-no mono">03 — RECENT WORK</p>
            <h2 className="title">RECENT PROJECTS &amp; EXPERIMENTS</h2>
            <p className="s-sub">Live platforms, interactive games, 3D audio-reactive engines, and client builds.</p>
          </RevealSection>
          <div style={{ marginTop: 24 }}>
            <RecentProjectsSection />
          </div>
        </div>
      </section>

      {/* Services & Engagements Section */}
      <ServicesSection />

      <ExperienceSection />
      <SkillsSection />
      <CredentialsSection />
      <ContactSection />
    </motion.div>
  );
}

export default HomePage;
