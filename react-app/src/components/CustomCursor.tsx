import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'card' | 'click'>('default');
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the lagging halo ring
  const springConfig = { damping: 24, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const isTouchDevice = useRef(false);

  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) {
      isTouchDevice.current = true;
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, textarea, [role="button"], .hd-action, .chip');
      const card = target.closest('.role, .service-card, .portrait-card, .cognitive-card, .qr-card');

      if (interactive) {
        setCursorState('hover');
      } else if (card) {
        setCursorState('card');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseDown = () => setCursorState('click');
    const handleMouseUp = () => setCursorState('default');
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [reduced, visible, mouseX, mouseY]);

  if (reduced || isTouchDevice.current || !visible) return null;

  const isHovered = cursorState === 'hover';
  const isCard = cursorState === 'card';
  const isClick = cursorState === 'click';

  const ringSize = isHovered ? 44 : isCard ? 36 : isClick ? 22 : 28;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      {/* Precision Core Dot */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          width: 5,
          height: 5,
          backgroundColor: 'var(--acc)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px var(--acc)',
        }}
      />

      {/* Lagging Spring Glowing Halo Ring */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          x: smoothX,
          y: smoothY,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1px solid ${isHovered ? 'var(--acc)' : 'rgba(184, 240, 74, 0.4)'}`,
          backgroundColor: isHovered ? 'rgba(184, 240, 74, 0.08)' : 'transparent',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
          boxShadow: isHovered ? '0 0 16px rgba(184, 240, 74, 0.3)' : 'none',
        }}
      >
        {/* Subtle HUD targeting crosshairs when over cards */}
        {isCard && (
          <>
            <span style={{ position: 'absolute', top: -3, left: '50%', width: 1, height: 4, background: 'var(--acc)', transform: 'translateX(-50%)' }} />
            <span style={{ position: 'absolute', bottom: -3, left: '50%', width: 1, height: 4, background: 'var(--acc)', transform: 'translateX(-50%)' }} />
            <span style={{ position: 'absolute', left: -3, top: '50%', width: 4, height: 1, background: 'var(--acc)', transform: 'translateY(-50%)' }} />
            <span style={{ position: 'absolute', right: -3, top: '50%', width: 4, height: 1, background: 'var(--acc)', transform: 'translateY(-50%)' }} />
          </>
        )}
      </motion.div>
    </div>
  );
}
