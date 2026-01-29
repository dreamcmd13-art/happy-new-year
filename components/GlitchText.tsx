
import React from 'react';

interface GlitchTextProps {
  text: string;
  active: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, active }) => {
  return (
    <div className={`relative transition-all duration-150 ${active ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
      {/* 底部扩散辉光 */}
      <div className="absolute inset-0 blur-[60px] opacity-40 bg-gradient-to-r from-[#00f3ff] via-[#ff00ff] to-[#fdee06] scale-125 pointer-events-none" />

      {/* 主文字层 */}
      <h1 className="text-6xl md:text-9xl font-black text-white tracking-[0.1em] relative z-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
        {text}
      </h1>

      {/* 故障偏移层 - 青色 */}
      <div 
        className="absolute top-0 left-0 w-full h-full text-6xl md:text-9xl font-black text-[#00f3ff] tracking-[0.1em] opacity-70 pointer-events-none animate-[glitch_2s_infinite_linear_alternate-reverse]"
        style={{ clipPath: 'inset(40% 0 35% 0)', transform: 'translateX(-4px)', zIndex: 11 }}
      >
        {text}
      </div>

      {/* 故障偏移层 - 品红 */}
      <div 
        className="absolute top-0 left-0 w-full h-full text-6xl md:text-9xl font-black text-[#ff00ff] tracking-[0.1em] opacity-70 pointer-events-none animate-[glitch_3s_infinite_linear_alternate]"
        style={{ clipPath: 'inset(10% 0 85% 0)', transform: 'translateX(4px)', zIndex: 12 }}
      >
        {text}
      </div>

      {/* 装饰线条 */}
      <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent animate-pulse" />
    </div>
  );
};

export default GlitchText;
