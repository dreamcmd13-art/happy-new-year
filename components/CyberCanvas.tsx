
import React, { useRef, useEffect } from 'react';

interface Props {
  text: string;
  isTextMode: boolean;
  effectId: number;
}

const COLOR_PALETTES = [
  ['#00f3ff', '#ff00ff', '#fdee06'], // 经典赛博
  ['#ff0055', '#ffaa00', '#ffff00'], // 火焰/热力
  ['#00ff99', '#0099ff', '#00ffff'], // 极光/深海
  ['#bc13fe', '#7a04eb', '#120458'], // 虚空/深紫
  ['#f0f0f0', '#00f3ff', '#555555'], // 极简高科技
];

class Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  density: number;
  friction: number;
  ease: number;
  angle: number;

  constructor(x: number, y: number, color: string) {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.baseX = x;
    this.baseY = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.size = Math.random() * 2 + 1;
    this.color = color;
    this.density = (Math.random() * 30) + 2;
    this.friction = 0.94;
    this.ease = 0.08;
    this.angle = Math.random() * Math.PI * 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update(mouse: { x: number | null, y: number | null, radius: number }, isTextMode: boolean, effectId: number, time: number) {
    // 鼠标闪避
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const dirX = dx / distance;
        const dirY = dy / distance;
        this.x -= dirX * force * this.density;
        this.y -= dirY * force * this.density;
      }
    }

    if (isTextMode) {
      // 弹性回位
      const dx = this.baseX - this.x;
      const dy = this.baseY - this.y;
      this.x += dx * this.ease;
      this.y += dy * this.ease;
      this.size = this.size * 0.95 + (Math.random() * 2 + 1) * 0.05;
    } else {
      const mode = effectId % 12;
      const cX = window.innerWidth / 2;
      const cY = window.innerHeight / 2;

      switch (mode) {
        case 0: // 气泡：向上漂浮
          this.vy -= 0.08;
          if (this.y < 0) { this.y = window.innerHeight; this.x = Math.random() * window.innerWidth; }
          break;
        case 1: // 黑洞：向中心坍缩
          const bdx = cX - this.x;
          const bdy = cY - this.y;
          const bdist = Math.sqrt(bdx * bdx + bdy * bdy) + 1;
          this.vx += (bdx / bdist) * 0.3;
          this.vy += (bdy / bdist) * 0.3;
          break;
        case 2: // 正弦波：水平波动
          this.vx = Math.sin(this.y * 0.005 + time) * 5;
          this.vy = 1.2;
          if (this.y > window.innerHeight) this.y = 0;
          break;
        case 3: // 旋涡：绕中心旋转
          const vdx = this.x - cX;
          const vdy = this.y - cY;
          const vdist = Math.sqrt(vdx * vdx + vdy * vdy) + 1;
          const curAngle = Math.atan2(vdy, vdx) + 0.04;
          this.x = cX + Math.cos(curAngle) * vdist;
          this.y = cY + Math.sin(curAngle) * vdist;
          break;
        case 4: // 布朗运动：随机抖动
          this.vx += (Math.random() - 0.5) * 2;
          this.vy += (Math.random() - 0.5) * 2;
          break;
        case 5: // 爆炸：从中心爆发
          const edx = this.x - cX;
          const edy = this.y - cY;
          const edist = Math.sqrt(edx * edx + edy * edy) + 1;
          this.vx = (edx / edist) * 8;
          this.vy = (edy / edist) * 8;
          if (edist > window.innerWidth) { this.x = cX; this.y = cY; }
          break;
        case 6: // 数雨：垂直下落
          this.vy = 6 + this.density * 0.2;
          if (this.y > window.innerHeight) { this.y = 0; this.x = Math.random() * window.innerWidth; }
          break;
        case 7: // 脉冲：缩放抖动
          const p = Math.sin(time * 4) * 12;
          this.x += (Math.random() - 0.5) * p;
          this.y += (Math.random() - 0.5) * p;
          break;
        case 8: // 奔腾(Horse Theme)：极速水平流
          this.vx = 15 + this.density * 0.5;
          this.vy = (Math.random() - 0.5) * 2;
          if (this.x > window.innerWidth) { this.x = 0; this.y = Math.random() * window.innerHeight; }
          break;
        case 9: // 轨道：椭圆环绕
          this.angle += 0.02;
          this.x = cX + Math.cos(this.angle) * (this.density * 15);
          this.y = cY + Math.sin(this.angle * 0.5) * (this.density * 10);
          break;
        case 10: // 螺旋：向外扩散的螺旋
          const sdx = this.x - cX;
          const sdy = this.y - cY;
          const sdist = Math.sqrt(sdx * sdx + sdy * sdy) + 0.1;
          const sAngle = Math.atan2(sdy, sdx) + 0.1;
          this.x = cX + Math.cos(sAngle) * (sdist + 2);
          this.y = cY + Math.sin(sAngle) * (sdist + 2);
          if (sdist > window.innerWidth) { this.x = cX; this.y = cY; }
          break;
        case 11: // DNA：双螺旋上升
          this.vx = Math.cos(this.y * 0.02 + time) * 8;
          this.vy = -3;
          if (this.y < 0) this.y = window.innerHeight;
          break;
      }
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.x += this.vx;
      this.y += this.vy;
    }
  }
}

const CyberCanvas: React.FC<Props> = ({ text, isTextMode, effectId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: null as number | null, y: null as number | null, radius: 150 });
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const init = async () => {
      // 关键：等待字体加载完成，防止 getImageData 抓取空图像
      if (document.fonts) {
        await document.fonts.ready;
      }
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const offscreen = document.createElement('canvas');
      const octx = offscreen.getContext('2d')!;
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      
      const fontSize = Math.min(offscreen.width / text.length * 1.3, 160);
      octx.font = `900 ${fontSize}px "Orbitron", "ZCOOL KuaiLe", sans-serif`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillStyle = '#fff';
      octx.fillText(text, offscreen.width / 2, offscreen.height / 2);

      const pixels = octx.getImageData(0, 0, offscreen.width, offscreen.height).data;
      const newParticles = [];
      const gap = window.innerWidth < 768 ? 3 : 4;
      const palette = COLOR_PALETTES[effectId % COLOR_PALETTES.length];

      for (let y = 0; y < offscreen.height; y += gap) {
        for (let x = 0; x < offscreen.width; x += gap) {
          const index = (y * offscreen.width + x) * 4;
          if (pixels[index + 3] > 128) {
            const color = palette[Math.floor(Math.random() * palette.length)];
            newParticles.push(new Particle(x, y, color));
          }
        }
      }
      // 如果粒子太少（说明文字渲染失败或窗口太小），补一些随机粒子
      if (newParticles.length < 100) {
        for(let i=0; i<800; i++) {
            const color = palette[Math.floor(Math.random() * palette.length)];
            newParticles.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, color));
        }
      }
      particlesRef.current = newParticles;
    };

    const animate = (time: number) => {
      // 动态背景混合，根据模式调整尾迹
      ctx.fillStyle = isTextMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.shadowBlur = isTextMode ? 10 : 5;
      
      particlesRef.current.forEach(p => {
        ctx.shadowColor = p.color;
        p.update(mouseRef.current, isTextMode, effectId, time * 0.001);
        p.draw(ctx);
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };

    init();
    requestRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', init);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', init);
    };
  }, [text, isTextMode, effectId]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full bg-black z-10" />;
};

export default CyberCanvas;
