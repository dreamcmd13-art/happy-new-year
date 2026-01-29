
import React, { useMemo } from 'react';

interface ParticleProps {
  count?: number;
  colorVariant: 'cyan' | 'magenta';
}

const ParticleSystem: React.FC<ParticleProps> = ({ count = 150, colorVariant }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      // 爆炸扩散逻辑
      const angle = Math.random() * Math.PI * 2;
      const distance = 200 + Math.random() * 800;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      const size = Math.random() * 4 + 1;
      const x = 50; // 从中心发射
      const y = 50; 
      const delay = Math.random() * 0.5;
      const duration = 1.0 + Math.random() * 1.5;
      
      // 赛博配色方案
      const color = Math.random() > 0.4 
        ? (colorVariant === 'cyan' ? '#00f3ff' : '#ff00ff')
        : '#fdee06';
      
      const isRect = Math.random() > 0.6;

      return { i, size, x, y, tx, ty, delay, duration, color, isRect };
    });
  }, [count, colorVariant]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.i}
          className="absolute animate-[float-particle_ease-out_forwards]"
          style={{
            width: p.isRect ? `${p.size * 4}px` : `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            borderRadius: p.isRect ? '0px' : '50%',
            boxShadow: `0 0 10px ${p.color}`,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0,
            zIndex: 5
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;
