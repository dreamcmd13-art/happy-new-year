
import React, { useMemo } from 'react';

const DigitalRain: React.FC = () => {
  const columns = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20,
      opacity: 0.05 + Math.random() * 0.1,
      fontSize: 10 + Math.random() * 10
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {columns.map((col) => (
        <div 
          key={col.id}
          className="absolute top-[-50%] font-mono text-white mix-blend-screen whitespace-pre"
          style={{
            left: `${col.left}%`,
            fontSize: `${col.fontSize}px`,
            opacity: col.opacity,
            animation: `data-stream ${col.duration}s linear infinite`,
            animationDelay: `${col.delay}s`,
            writingMode: 'vertical-rl'
          }}
        >
          {Array.from({ length: 20 }).map(() => 
            Math.random() > 0.5 ? '10' : '01'
          ).join('')}
        </div>
      ))}
    </div>
  );
};

export default DigitalRain;
