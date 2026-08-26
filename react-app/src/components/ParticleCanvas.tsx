import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
  x: number; y: number;
  vx: number; vy: number; baseVx: number; baseVy: number;
  size: number; alpha: number;
}

export interface ParticleCanvasRef {
  triggerMatrixRain: () => void;
}

export const ParticleCanvas = forwardRef<ParticleCanvasRef>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const animId = useRef<number>(0);
  const mouse = useRef({ x: -1000, y: -1000, active: false });
  const matrixMode = useRef(false);
  const matrixDrops = useRef<{ x: number; y: number; speed: number }[]>([]);
  const reduced = useReducedMotion();

  useImperativeHandle(ref, () => ({
    triggerMatrixRain() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      matrixMode.current = true;
      const cols = Math.floor(canvas.width / 16);
      matrixDrops.current = Array.from({ length: cols }, (_, i) => ({
        x: i * 16,
        y: Math.random() * -500,
        speed: Math.random() * 8 + 6,
      }));
      setTimeout(() => { matrixMode.current = false; }, 4200);
    }
  }));

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current!;
    ctxRef.current = canvas.getContext('2d');

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(48, Math.max(18, Math.floor(window.innerWidth / 30)));
      particles.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseVx: (Math.random() - 0.5) * 0.45,
        baseVy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.6 + 1.2,
        alpha: Math.random() * 0.4 + 0.15,
      }));
    };

    const draw = () => {
      const ctx = ctxRef.current;
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (matrixMode.current) {
        ctx.fillStyle = 'rgba(184, 240, 74, 0.85)';
        ctx.font = '12px "JetBrains Mono", monospace';
        const glyphs = '01アイウエオカキクケコ10_//<>*+';
        for (const d of matrixDrops.current) {
          ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], d.x, d.y);
          d.y += d.speed;
          if (d.y > canvas.height + 50) d.y = Math.random() * -100;
        }
      } else {
        const maxDist = 115;
        const ps = particles.current;
        for (let i = 0; i < ps.length; i++) {
          const p = ps[i];
          if (mouse.current.active) {
            const dx = p.x - mouse.current.x, dy = p.y - mouse.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120 && dist > 0) {
              const force = (120 - dist) / 120 * 0.8;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }
          p.vx += (p.baseVx - p.vx) * 0.05;
          p.vy += (p.baseVy - p.vy) * 0.05;
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
          ctx.fillStyle = `rgba(184,240,74,${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          for (let j = i + 1; j < ps.length; j++) {
            const p2 = ps[j];
            const cdx = p.x - p2.x, cdy = p.y - p2.y;
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
            if (cdist < maxDist) {
              ctx.strokeStyle = `rgba(184,240,74,${(1 - cdist / maxDist) * 0.16})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
      animId.current = requestAnimationFrame(draw);
    };

    const onPointerMove = (e: PointerEvent) => { mouse.current = { x: e.clientX, y: e.clientY, active: true }; };
    const onPointerLeave = () => { mouse.current.active = false; };
    const onResize = () => { init(); };
    const onVisibility = () => { if (document.hidden) cancelAnimationFrame(animId.current); else draw(); };

    init();
    draw();
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  if (reduced) return null;
  return <canvas ref={canvasRef} id="cyberCanvas" aria-hidden="true" />;
});

ParticleCanvas.displayName = 'ParticleCanvas';
