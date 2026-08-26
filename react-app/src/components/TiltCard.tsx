import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
}

export function TiltCard({ children, className = '', style, intensity = 4.5 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-1, 1], [intensity, -intensity]), spring);
  const rotateY = useSpring(useTransform(x, [-1, 1], [-intensity, intensity]), spring);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    y.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
    // spotlight
    cardRef.current!.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current!.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      style={{ ...style, rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
