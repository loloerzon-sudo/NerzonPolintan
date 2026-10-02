import { useEffect, useRef } from 'react';
import { useTheme, type ThemeId } from '@/context/ThemeContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Authentic Plasma-UI color triplets [uA: deep base, uB: mid tone, uC: accent]
const THEME_PALETTES: Record<ThemeId, { a: [number, number, number]; b: [number, number, number]; c: [number, number, number] }> = {
  'cyber-lime': {
    a: [0.010, 0.022, 0.014], // deeper carbon black-green
    b: [0.035, 0.105, 0.050], // deep emerald mid
    c: [0.722, 0.941, 0.290], // #b8f04a signature neon lime
  },
};

const VERTEX_SHADER_SRC = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Authentic Plasma-UI background shader: FBM domain warping + topographic contour lines
const FRAGMENT_SHADER_SRC = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform float uLight;

// Hash function from Plasma-UI
float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// 2D Noise from Plasma-UI
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

// 4-octave Fractal Brownian Motion from Plasma-UI
float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for(int i = 0; i < 4; i++){
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 p = gl_FragCoord.xy;

  // Gentle mouse ripple displacement in fluid
  vec2 mDiff = p - uMouse;
  float mDist = length(mDiff);
  vec2 mDir = normalize(mDiff + 0.001);
  p -= mDir * 28.0 * exp(-mDist * mDist / 42000.0);

  // Plasma-UI FBM domain warping
  vec2 q = p / 520.0;
  float t = uTime * 0.035;
  vec2 w = vec2(fbm(q + t), fbm(q + vec2(5.2, 1.3) - t));
  float n = fbm(q * 1.4 + w * 1.8 + t * 0.6);

  // Liquid color blend across base, mid, and accent
  vec3 col = mix(uA, uB, smoothstep(0.25, 0.75, n));
  col = mix(col, uC, smoothstep(0.58, 0.92, w.x * n * 1.5) * 0.75);

  // Authentic topographic contour lines from Plasma-UI (softened slightly)
  float lines = abs(fract(n * 14.0) - 0.5);
  col += (1.0 - smoothstep(0.0, 0.06, lines)) * 0.055;

  // Radial vignette maintaining deep contrast
  vec2 v = (gl_FragCoord.xy / uRes) - 0.5;
  col *= 0.52 + 0.40 * smoothstep(1.15, 0.2, length(v));

  // Global subtle darkening factor for sleek contrast
  col *= 0.88;

  // Light theme handling
  if (uLight > 0.5) {
    col = mix(col, mix(vec3(0.92, 0.95, 0.98), col, 0.35), 0.82);
  }

  // Micro film-grain for silky 8-bit dark screen smoothness
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function LiquidPlasmaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const reduced = useReducedMotion();

  const targetPal = THEME_PALETTES[theme] || THEME_PALETTES['cyber-lime'];
  const curA = useRef<[number, number, number]>([...targetPal.a]);
  const curB = useRef<[number, number, number]>([...targetPal.b]);
  const curC = useRef<[number, number, number]>([...targetPal.c]);
  const mouse = useRef<{ x: number; y: number; tx: number; ty: number }>({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vert = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const frag = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vert || !frag) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uResLoc = gl.getUniformLocation(prog, 'uRes');
    const uTimeLoc = gl.getUniformLocation(prog, 'uTime');
    const uMouseLoc = gl.getUniformLocation(prog, 'uMouse');
    const uALoc = gl.getUniformLocation(prog, 'uA');
    const uBLoc = gl.getUniformLocation(prog, 'uB');
    const uCLoc = gl.getUniformLocation(prog, 'uC');
    const uLightLoc = gl.getUniformLocation(prog, 'uLight');

    let animId: number;
    let startTime = performance.now();

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      mouse.current.tx = e.clientX * dpr;
      mouse.current.ty = (window.innerHeight - e.clientY) * dpr;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Set initial mouse to screen center
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    mouse.current.x = mouse.current.tx = (window.innerWidth * 0.5) * dpr;
    mouse.current.y = mouse.current.ty = (window.innerHeight * 0.5) * dpr;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const render = (now: number) => {
      // Smooth mouse follow
      mouse.current.x = lerp(mouse.current.x, mouse.current.tx, 0.08);
      mouse.current.y = lerp(mouse.current.y, mouse.current.ty, 0.08);

      // Smooth theme color transition
      const target = THEME_PALETTES[theme] || THEME_PALETTES['cyber-lime'];
      for (let i = 0; i < 3; i++) {
        curA.current[i] = lerp(curA.current[i], target.a[i], 0.06);
        curB.current[i] = lerp(curB.current[i], target.b[i], 0.06);
        curC.current[i] = lerp(curC.current[i], target.c[i], 0.06);
      }

      const elapsed = reduced ? 0 : (now - startTime) * 0.001;

      gl.uniform2f(uResLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uMouseLoc, mouse.current.x, mouse.current.y);
      gl.uniform3f(uALoc, curA.current[0], curA.current[1], curA.current[2]);
      gl.uniform3f(uBLoc, curB.current[0], curB.current[1], curB.current[2]);
      gl.uniform3f(uCLoc, curC.current[0], curC.current[1], curC.current[2]);
      gl.uniform1f(uLightLoc, 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, [theme, reduced]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  );
}
