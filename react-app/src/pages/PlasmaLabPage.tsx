import { useState } from 'react';
import { Link } from 'react-router';
import { AudioVisualizer } from '@/components/AudioVisualizer';
import { TiltCard } from '@/components/TiltCard';
import { useAudio } from '@/hooks/useAudio';
import profileImg from '@/assets/images/john-nerzon-polintan-profile.png';

export function PlasmaLabPage() {
  const { playHover, playClick } = useAudio();
  const [activeTab, setActiveTab] = useState<'profile' | 'audio' | 'project'>('profile');

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: 60 }}>
      {/* Top Laboratory Control Header */}
      <header
        style={{
          borderBottom: '1px solid var(--line)',
          background: 'rgba(10, 12, 14, 0.75)',
          backdropFilter: 'blur(20px)',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link
            to="/"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '.14em',
              color: 'var(--acc)',
              textDecoration: 'none',
              padding: '6px 12px',
              border: '1px solid var(--acc)',
              borderRadius: 3,
              background: 'rgba(184, 240, 74, 0.05)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ← RETURN TO HUB
          </Link>

          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.2em', color: 'var(--acc)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="dot" aria-hidden="true" style={{ width: 6, height: 6 }} />
              KOS EXPERIMENTAL LAB // WEBGL2 LIQUID PLASMA
            </div>
            <h1 style={{ fontFamily: 'var(--disp)', fontSize: 18, margin: '2px 0 0', fontWeight: 700, letterSpacing: '.04em', color: 'var(--txt)' }}>
              Seamless Fluid Plasma Ambient Canvas
            </h1>
          </div>
        </div>

        {/* Permanent Cyber Lime Mode Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--dim)', letterSpacing: '.12em' }}>
            ENGINE PALETTE:
          </span>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '.12em',
              padding: '4px 10px',
              borderRadius: 2,
              border: '1px solid var(--acc)',
              backgroundColor: 'rgba(184, 240, 74, 0.08)',
              color: 'var(--acc)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--acc)', display: 'inline-block', boxShadow: '0 0 6px var(--acc)' }} />
            CYBER LIME [LOCKED]
          </span>
        </div>
      </header>

      {/* Hero Notice Banner */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderBottom: '1px solid var(--line)',
          padding: '12px 24px',
          fontFamily: 'var(--mono)',
          fontSize: 11,
          color: 'var(--mut)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <span style={{ color: 'var(--acc)', fontWeight: 700 }}>✓ ARCHITECTURE UPGRADE: </span>
          The liquid plasma shader is running directly as a global, non-blocking hardware-accelerated background (pointer-events: none).
          <b> All buttons, links, audio controls, and cards remain 100% responsive and clickable!</b>
        </div>
        <div style={{ opacity: 0.8, color: 'var(--acc)' }}>
          60 FPS WebGL · Organic Sine Interferences · GPU-Accelerated
        </div>
      </div>

      {/* Main Interactive Showcase Grid */}
      <main style={{ maxWidth: 1200, margin: '40px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {/* Card 1: Operator Identity */}
          <TiltCard
            intensity={2}
            style={{
              background: 'linear-gradient(180deg, var(--panel), var(--bg2))',
              border: '1px solid var(--line)',
              borderRadius: 4,
              padding: '24px 22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 280,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', color: 'var(--acc)' }}>
                  ● OPERATOR IDENTITY // CORE
                </span>
                <span className="mono dim" style={{ fontSize: 9 }}>FULLY CLICKABLE</span>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
                <div style={{ width: 72, height: 72, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--acc)', flexShrink: 0 }}>
                  <img src={profileImg} alt="Nerzon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--disp)', fontSize: 20, margin: '0 0 4px', fontWeight: 700, color: 'var(--txt)' }}>
                    John Nerzon Polintan
                  </h3>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--acc)', margin: '0 0 6px' }}>
                    &gt; Games &amp; Config Specialist
                  </p>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--dim)' }}>
                    12+ Years Enterprise IT &amp; iGaming Operations
                  </span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--line2)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--mut)' }}>
              <span>STATUS: <b style={{ color: 'var(--acc)' }}>ONLINE</b></span>
              <span>PHILIPPINES (GMT+8)</span>
            </div>
          </TiltCard>

          {/* Card 2: Audio Radar & Support HUD */}
          <TiltCard
            intensity={2}
            style={{
              background: 'linear-gradient(180deg, var(--panel), var(--bg2))',
              border: '1px solid var(--line)',
              borderRadius: 4,
              padding: '24px 22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 280,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', color: 'var(--acc)' }}>
                  AUDIO RADAR &amp; SUPPORT
                </span>
                <span className="mono dim" style={{ fontSize: 9 }}>INTERACTIVE</span>
              </div>

              <div style={{ padding: '12px 14px', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid var(--line2)', borderRadius: 3, marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mut)' }}>WEB AUDIO API SPECTRUM</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--acc)' }}>ACTIVE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
                  <AudioVisualizer bars={16} height={26} />
                </div>
              </div>

              {/* Ko-fi Support Link */}
              <a
                href="https://ko-fi.com/nerzon"
                target="_blank"
                rel="noopener noreferrer"
                title="Pang kape please ☕"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: 'rgba(184, 240, 74, 0.08)',
                  border: '1px solid var(--acc)',
                  color: 'var(--acc)',
                  borderRadius: 3,
                  padding: '11px 14px',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '.1em',
                  textDecoration: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                <span>☕ BUY ME A COFFEE ↗</span>
                <span style={{ fontSize: 9.5, opacity: 0.75 }}>(Pang kape please)</span>
              </a>
            </div>

            <div style={{ borderTop: '1px solid var(--line2)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--dim)' }}>
              <span>KO-FI DIRECT VERIFIED</span>
              <span>1-CLICK CHANNEL</span>
            </div>
          </TiltCard>

          {/* Card 3: Featured Cyber Project Showcase */}
          <TiltCard
            intensity={2}
            style={{
              background: 'linear-gradient(180deg, var(--panel), var(--bg2))',
              border: '1px solid var(--line)',
              borderRadius: 4,
              padding: '24px 22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 280,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', color: 'var(--acc)' }}>
                  FEATURED CYBER SHOWCASE
                </span>
                <span className="mono dim" style={{ fontSize: 9 }}>IN-PROGRESS</span>
              </div>

              <h4 style={{ fontFamily: 'var(--disp)', fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: 'var(--txt)' }}>
                AerzonWave: 3D Cyber Visualizer ↗
              </h4>
              <p style={{ fontSize: 12.5, color: 'var(--mut)', lineHeight: 1.45, margin: '0 0 14px' }}>
                High-fidelity 3D audio-reactive cyber visualizer built with Three.js, procedural GLSL shaders, and Web Audio API frequency analysis.
              </p>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                {['THREE.JS', 'AUDIO REACTIVE', 'WEBGL SHADERS'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 8.5,
                      letterSpacing: '.08em',
                      color: 'var(--dim)',
                      border: '1px solid var(--line)',
                      padding: '2px 6px',
                      borderRadius: 2,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--line2)', paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--acc)' }}>aerzonwave.nerzon.online</span>
              <a
                href="https://aerzonwave.nerzon.online/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  letterSpacing: '.12em',
                  padding: '4px 10px',
                  background: 'var(--acc)',
                  color: 'var(--acc-dk)',
                  borderRadius: 2,
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                VISIT ↗
              </a>
            </div>
          </TiltCard>
        </div>
      </main>
    </div>
  );
}
