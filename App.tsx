
import React, { useState, useCallback } from 'react';
import CyberCanvas from './components/CyberCanvas.tsx';
import ScanlineOverlay from './components/ScanlineOverlay.tsx';

const BLESSINGS = [
  { cn: '2026 马到成功', en: '2026 SUCCESS' },
  { cn: '骁腾万里', en: 'GALLOPING FAR' },
  { cn: '龙马精神', en: 'VITALITY' },
  { cn: '马年大吉', en: 'YEAR OF THE HORSE' },
  { cn: '新年快乐', en: 'HAPPY NEW YEAR' },
  { cn: '万事大吉', en: 'PROSPERITY' }
];

const App: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [lang, setLang] = useState<'cn' | 'en'>('cn');
  const [effectId, setEffectId] = useState(0);
  const [isTextMode, setIsTextMode] = useState(true);

  const handleToggle = useCallback(() => {
    if (isTextMode) {
      // 切换到能量态：增加 effectId 确保动力学算法变化
      setIsTextMode(false);
      setEffectId(prev => prev + 1);
    } else {
      // 切换到文字态：切换内容
      const nextIndex = (index + 1) % BLESSINGS.length;
      const nextLang = Math.random() > 0.5 ? 'cn' : 'en';
      setLang(nextLang);
      setIndex(nextIndex);
      setIsTextMode(true);
    }
  }, [isTextMode, index]);

  const currentText = BLESSINGS[index][lang];

  return (
    <main 
      className="relative w-screen h-screen bg-black flex items-center justify-center overflow-hidden cursor-pointer select-none"
      onClick={handleToggle}
    >
      {/* 核心 Canvas 粒子引擎 */}
      <CyberCanvas 
        text={currentText} 
        isTextMode={isTextMode} 
        effectId={effectId} 
      />

      {/* 赛博朋克左侧 HUD */}
      <div className="fixed top-8 left-8 border-l-2 border-[#00f3ff] pl-4 opacity-40 z-50 pointer-events-none">
        <div className="text-[#00f3ff] font-mono text-[10px] tracking-[0.3em] font-bold">HORSE_CORE: 2026.V2</div>
        <div className="text-white font-mono text-[9px] opacity-60 uppercase">
          MODE: {isTextMode ? 'RECONSTRUCT_TEXT' : `ENERGY_FIELD_MOD_0x${(effectId % 12).toString(16)}`}
        </div>
      </div>

      {/* 交互提示 */}
      <div className="fixed bottom-12 text-white/20 font-mono text-[9px] tracking-[0.5em] z-50 pointer-events-none uppercase animate-pulse">
        Click to toggle reality
      </div>

      <ScanlineOverlay />
    </main>
  );
};

export default App;
