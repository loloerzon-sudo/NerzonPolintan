import { useEffect, useState } from 'react';
import { audioEngine } from '@/services/audioEngine';

interface AudioVisualizerProps {
  bars?: number;
  height?: number;
  className?: string;
  activeColor?: string;
}

export function AudioVisualizer({
  bars = 16,
  height = 18,
  className = '',
  activeColor = 'var(--acc)',
}: AudioVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return audioEngine.subscribe((active) => {
      setIsPlaying(active);
    });
  }, []);

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        gap: 2,
        height,
        padding: '0 2px',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => {
        // Calculate random height variation when playing, or subtle idle wave
        const animDelay = (i * 0.07).toFixed(2);
        const animDuration = (0.35 + (i % 4) * 0.12).toFixed(2);

        return (
          <span
            key={i}
            style={{
              display: 'block',
              width: 2,
              height: isPlaying ? '100%' : `${Math.max(15, (Math.sin(i * 0.6) + 1) * 35)}%`,
              backgroundColor: isPlaying ? activeColor : 'var(--line2)',
              borderRadius: 1,
              transition: 'background-color 0.2s ease, height 0.15s ease',
              animation: isPlaying
                ? `cyberSpectrum ${animDuration}s ease-in-out infinite alternate ${animDelay}s`
                : 'none',
            }}
          />
        );
      })}
    </div>
  );
}
