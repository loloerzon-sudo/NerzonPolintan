import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface MetricGaugeProps {
  label: string;
  value: string;
  pct: number;
  subtext?: string;
  color?: string;
}

export function MetricGauge({ label, value, pct, subtext, color = 'var(--acc)' }: MetricGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(0,0,0,0.3)', border: '1px solid var(--line2)', borderRadius: 4, padding: '12px 14px' }}>
      <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="var(--line2)"
            strokeWidth="4"
            fill="transparent"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset } : {}}
            transition={{ duration: 1.2, ease: [0.2, 0.65, 0.2, 1] as const }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, color: 'var(--txt)' }}>
          {pct}%
        </div>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '.16em', color: 'var(--dim)' }}>{label}</div>
        <div style={{ fontFamily: 'var(--disp)', fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginTop: 2 }}>{value}</div>
        {subtext && <div style={{ fontSize: 11.5, color: 'var(--mut)', marginTop: 2 }}>{subtext}</div>}
      </div>
    </div>
  );
}

export function SchematicFlow({ steps }: { steps: string[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, margin: '14px 0', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', border: '1px dashed var(--line2)', borderRadius: 4 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '.18em', color: 'var(--acc)', marginRight: 4 }}>
        FLOW //
      </span>
      {steps.map((step, idx) => (
        <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--txt)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--line)', padding: '2px 8px', borderRadius: 2 }}>
            {step}
          </span>
          {idx < steps.length - 1 && (
            <span style={{ color: 'var(--acc)', fontSize: 11, opacity: 0.7 }}>→</span>
          )}
        </div>
      ))}
    </div>
  );
}
