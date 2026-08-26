import { useEffect, useRef, useState, useCallback } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#01';

export function useScramble(target: string, speed = 1) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scramble = useCallback((text: string) => {
    if (reduced) { setDisplay(text); return; }
    if (frameRef.current) clearInterval(frameRef.current);
    let frame = 0;
    frameRef.current = setInterval(() => {
      let out = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { out += ' '; continue; }
        out += i < frame ? text[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      frame += speed;
      if (frame > text.length + 2) {
        setDisplay(text);
        clearInterval(frameRef.current!);
      }
    }, 26);
  }, [reduced, speed]);

  useEffect(() => {
    scramble(target);
    return () => { if (frameRef.current) clearInterval(frameRef.current); };
  }, [target, scramble]);

  return { display, scramble };
}
