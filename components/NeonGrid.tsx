
import React from 'react';

const NeonGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
      <div 
        className="absolute w-[200vw] h-[200vh] bottom-[-50%] animate-[grid-move_5s_linear_infinite]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00ffff 1px, transparent 1px),
            linear-gradient(to bottom, #00ffff 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
        }}
      />
      {/* Distant horizon light */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#00ffff55] to-transparent blur-3xl opacity-20" />
    </div>
  );
};

export default NeonGrid;
