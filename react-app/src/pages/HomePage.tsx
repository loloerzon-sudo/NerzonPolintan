import { motion } from 'motion/react';
import { HeroSection } from './sections/HeroSection';
import { ProfileSection } from './sections/ProfileSection';
import { PipelineSection } from './sections/PipelineSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { ServicesSection } from './sections/ServicesSection';
import { CredentialsSection } from './sections/CredentialsSection';
import { ContactSection } from './sections/ContactSection';
import { Ticker } from '@/components/Ticker';

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export function HomePage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.2, 0.65, 0.2, 1] }}
    >
      <HeroSection />
      <Ticker />
      <ProfileSection />
      <PipelineSection />
      <ExperienceSection />
      <SkillsSection />
      <ServicesSection />
      <CredentialsSection />
      <ContactSection />
    </motion.div>
  );
}
