
import React from 'react';

const ScanlineOverlay: React.FC = () => {
  return (
    <>
      {/* Moving Scanline */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="absolute w-full h-[4px] bg-[#ffffff0a] animate-[scanline_8s_linear_infinite]" />
      </div>
      
      {/* Static Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 3px 100%'
        }}
      />

      {/* Screen Vignette */}
      <div className="fixed inset-0 pointer-events-none z-30 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </>
  );
};

export default ScanlineOverlay;
