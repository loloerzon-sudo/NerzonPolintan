import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Direction = 'up' | 'left' | 'right' | 'scale';

interface RevealSectionProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const getInitial = (dir: Direction) => {
  switch (dir) {
    case 'left':  return { opacity: 0, x: -32 };
    case 'right': return { opacity: 0, x: 32 };
    case 'scale': return { opacity: 0, scale: 0.93 };
    default:      return { opacity: 0, y: 28 };
  }
};

export function RevealSection({
  children, direction = 'up', delay = 0, className, style,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={reduced ? false : getInitial(direction)}
      animate={inView || reduced ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.65, 0.2, 1] as const }}
    >
      {children}
    </motion.div>
  );
}
