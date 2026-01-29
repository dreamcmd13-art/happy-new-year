
import React, { useMemo } from 'react';
import './CyberTextEffect.css';

type EffectType = 
  | 'RGB_Split'      
  | 'Glitch_Slice'   
  | 'Data_Rain'      
  | 'Neon_Flicker'   
  | 'Pixel_Dissolve' 
  | 'Scanline_Sweep' 
  | 'Static_Noise'   
  | 'Digital_Tunnel' 
  | 'Binary_Ghost'   
  | 'Mirror_Warp';   

interface CyberTextEffectProps {
  text: string;
  effectIndex: number;
  forcedStatus?: 'appear' | 'stable' | 'disintegrate';
  visible?: boolean;
}

const EFFECT_MODES: EffectType[] = [
  'RGB_Split', 'Glitch_Slice', 'Data_Rain', 'Neon_Flicker', 'Pixel_Dissolve',
  'Scanline_Sweep', 'Static_Noise', 'Digital_Tunnel', 'Binary_Ghost', 'Mirror_Warp'
];

const CyberTextEffect: React.FC<CyberTextEffectProps> = ({ text, effectIndex, forcedStatus = 'stable', visible = true }) => {
  const effectType = EFFECT_MODES[effectIndex % EFFECT_MODES.length];
  const isEnglish = /^[a-zA-Z\s&!]+$/.test(text);

  const particles = useMemo(() => {
    const count = visible ? 60 : 180; 
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 1.0 + Math.random() * 2.0,
      tx: (Math.random() - 0.5) * (visible ? 1000 : 2000),
      ty: (Math.random() - 0.5) * (visible ? 1000 : 2000),
      color: i % 3 === 0 ? '#00f3ff' : i % 3 === 1 ? '#ff00ff' : '#fdee06',
      size: visible ? (2 + Math.random() * 3) : (1 + Math.random() * 6)
    }));
  }, [text, effectIndex, visible]);

  return (
    <div className={`cyber-container mode-${effectType} status-${forcedStatus} ${!visible ? 'text-hidden' : 'text-active'}`}>
      
      {/* 能量态专属层 (仅在无文字时显示) */}
      {!visible && (
        <div className="energy-field-container">
          {effectType === 'Binary_Ghost' && (
            <div className="energy-binary-storm">
              {Array.from({ length: 15 }).map((_, i) => (
                <span key={i} style={{ '--i': i, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` } as any}>
                  {Math.random().toString(2).substring(2, 10)}
                </span>
              ))}
            </div>
          )}
          {effectType === 'Scanline_Sweep' && <div className="energy-radar-pulse" />}
          {effectType === 'Glitch_Slice' && <div className="energy-grid-distortion" />}
          {effectType === 'Neon_Flicker' && <div className="energy-plasma-glow" />}
          {effectType === 'Mirror_Warp' && (
            <div className="energy-code-leak">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="code-line" style={{ '--i': i } as any}>
                  {`> FATAL_ERR: 0x${Math.floor(Math.random()*16777215).toString(16)}...`}
                </div>
              ))}
            </div>
          )}
          {effectType === 'Pixel_Dissolve' && (
            <div className="energy-geometric-shards">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="shard" style={{ '--i': i } as any} />
              ))}
            </div>
          )}
          {effectType === 'Static_Noise' && <div className="energy-glitch-noise" />}
          {effectType === 'Digital_Tunnel' && (
            <div className="energy-digital-tunnel">
              <div className="tunnel-ring" /><div className="tunnel-ring" /><div className="tunnel-ring" />
            </div>
          )}
          {effectType === 'Data_Rain' && <div className="energy-heavy-rain" />}
          {effectType === 'RGB_Split' && <div className="energy-chromatic-chaos" />}
        </div>
      )}

      <div className="cyber-text-wrapper">
        {/* 文字辉光层 */}
        {visible && <div className={`cyber-text-glow ${isEnglish ? 'is-en' : ''}`}>{text}</div>}
        
        {/* 主文字 */}
        <h1 className={`cyber-text-main ${isEnglish ? 'is-en' : ''}`} data-text={text}>
          {visible ? text : ''}
        </h1>

        {/* 粒子系统 */}
        <div className="effect-particles">
          {particles.map(p => (
            <div 
              key={p.id} 
              className="particle" 
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 10px ${p.color}`,
                '--delay': `${p.delay}s`,
                '--dur': `${p.duration}s`,
                '--tx': `${p.tx}px`,
                '--ty': `${p.ty}px`
              } as any}
            />
          ))}
        </div>

        {/* 像素切片 (Mode 05) */}
        {effectType === 'Pixel_Dissolve' && visible && (
          <div className="pixel-fragments">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`pixel-slice ${isEnglish ? 'is-en' : ''}`} style={{ '--i': i, '--delay': `${i * 0.05}s` } as any}>
                {text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberTextEffect;
