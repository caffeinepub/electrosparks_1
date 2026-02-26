import React, { useEffect, useRef, useState } from 'react';

interface PhoenixIntroProps {
  onComplete: () => void;
}

export default function PhoenixIntro({ onComplete }: PhoenixIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'phoenix' | 'dept' | 'title' | 'subtitle' | 'done'>('phoenix');
  const [phoenixY, setPhoenixY] = useState(0);
  const [phoenixOpacity, setPhoenixOpacity] = useState(0);
  const [deptOpacity, setDeptOpacity] = useState(0);
  const [deptY, setDeptY] = useState(40);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [titleScale, setTitleScale] = useState(0.7);
  const [subtitleOpacity, setSubtitleOpacity] = useState(0);
  const [containerOpacity, setContainerOpacity] = useState(1);

  // Canvas particle/ember effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number; color: string;
    };

    const particles: Particle[] = [];
    const colors = ['#FF6A00', '#FF4500', '#FF2200', '#FF8C00', '#FFA500', '#FFD700'];

    const spawnParticle = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.45;
      particles.push({
        x: cx + (Math.random() - 0.5) * 120,
        y: cy + (Math.random() - 0.5) * 120,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(Math.random() * 2 + 0.5),
        life: 0,
        maxLife: 60 + Math.random() * 80,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    let animId: number;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (frame % 2 === 0) spawnParticle();
      frame++;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.maxLife) { particles.splice(i, 1); continue; }
        const alpha = 1 - p.life / p.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha * 0.8;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation sequence
  useEffect(() => {
    // Phase 1: Phoenix appears (0-800ms)
    const t1 = setTimeout(() => {
      setPhoenixOpacity(1);
      setPhoenixY(-30);
    }, 100);

    // Phase 2: Phoenix flies up more (800-1600ms)
    const t2 = setTimeout(() => {
      setPhoenixY(-80);
      setPhoenixOpacity(0.9);
    }, 900);

    // Phase 3: Dept text rises (1600ms)
    const t3 = setTimeout(() => {
      setDeptOpacity(1);
      setDeptY(0);
    }, 1600);

    // Phase 4: Title appears (2400ms)
    const t4 = setTimeout(() => {
      setTitleOpacity(1);
      setTitleScale(1);
    }, 2400);

    // Phase 5: Subtitle appears (3200ms)
    const t5 = setTimeout(() => {
      setSubtitleOpacity(1);
    }, 3200);

    // Phase 6: Fade out and complete (4800ms)
    const t6 = setTimeout(() => {
      setContainerOpacity(0);
    }, 4800);

    const t7 = setTimeout(() => {
      onComplete();
    }, 5500);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); clearTimeout(t7);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#000000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        opacity: containerOpacity,
        transition: 'opacity 0.8s ease-in-out',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      {/* Circuit grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Phoenix Image */}
      <div style={{
        position: 'relative', zIndex: 10,
        opacity: phoenixOpacity,
        transform: `translateY(${phoenixY}px)`,
        transition: 'opacity 0.8s ease-out, transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        marginBottom: '20px',
      }}>
        <div style={{
          width: '220px', height: '220px',
          position: 'relative',
          filter: 'drop-shadow(0 0 40px #FF6A00) drop-shadow(0 0 80px #FF2200) drop-shadow(0 0 120px #FF4500)',
        }}>
          {/* Phoenix SVG - fiery orange/red solar plasma style */}
          <svg viewBox="0 0 200 200" width="220" height="220" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="phoenixCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="1"/>
                <stop offset="30%" stopColor="#FF8C00" stopOpacity="1"/>
                <stop offset="60%" stopColor="#FF4500" stopOpacity="1"/>
                <stop offset="100%" stopColor="#FF2200" stopOpacity="0.8"/>
              </radialGradient>
              <radialGradient id="wingGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF6A00" stopOpacity="1"/>
                <stop offset="100%" stopColor="#FF2200" stopOpacity="0.6"/>
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {/* Body */}
            <ellipse cx="100" cy="110" rx="18" ry="30" fill="url(#phoenixCore)" filter="url(#glow)"/>
            {/* Left wing */}
            <path d="M100 100 Q50 60 20 80 Q40 90 60 95 Q30 100 15 120 Q50 110 75 115 Q45 130 35 155 Q70 135 90 125" fill="url(#wingGrad)" filter="url(#glow)" opacity="0.95"/>
            {/* Right wing */}
            <path d="M100 100 Q150 60 180 80 Q160 90 140 95 Q170 100 185 120 Q150 110 125 115 Q155 130 165 155 Q130 135 110 125" fill="url(#wingGrad)" filter="url(#glow)" opacity="0.95"/>
            {/* Head */}
            <ellipse cx="100" cy="82" rx="12" ry="14" fill="url(#phoenixCore)" filter="url(#glow)"/>
            {/* Beak */}
            <path d="M100 76 L108 72 L100 78" fill="#FFD700" filter="url(#glow)"/>
            {/* Crest feathers */}
            <path d="M95 72 Q88 55 85 45 Q92 58 95 68" fill="#FF6A00" filter="url(#glow)"/>
            <path d="M100 70 Q100 50 100 38 Q103 52 102 68" fill="#FFD700" filter="url(#glow)"/>
            <path d="M105 72 Q112 55 115 45 Q108 58 105 68" fill="#FF4500" filter="url(#glow)"/>
            {/* Tail feathers */}
            <path d="M95 138 Q80 160 70 180 Q88 162 95 148" fill="#FF4500" filter="url(#glow)" opacity="0.9"/>
            <path d="M100 140 Q100 165 100 185 Q102 165 102 148" fill="#FF6A00" filter="url(#glow)" opacity="0.9"/>
            <path d="M105 138 Q120 160 130 180 Q112 162 105 148" fill="#FF2200" filter="url(#glow)" opacity="0.9"/>
            {/* Eye */}
            <circle cx="104" cy="80" r="3" fill="#FFD700" filter="url(#glow)"/>
            <circle cx="104" cy="80" r="1.5" fill="#FF2200"/>
            {/* Flame aura */}
            <ellipse cx="100" cy="110" rx="35" ry="50" fill="none" stroke="#FF6A00" strokeWidth="1" opacity="0.4" filter="url(#glow)"/>
            <ellipse cx="100" cy="110" rx="50" ry="65" fill="none" stroke="#FF4500" strokeWidth="0.5" opacity="0.25" filter="url(#glow)"/>
          </svg>
        </div>
      </div>

      {/* Department Text */}
      <div style={{
        position: 'relative', zIndex: 10,
        opacity: deptOpacity,
        transform: `translateY(${deptY}px)`,
        transition: 'opacity 0.9s ease-out, transform 0.9s ease-out',
        textAlign: 'center',
        marginBottom: '16px',
        padding: '0 20px',
      }}>
        <p style={{
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
          color: '#FF8C00',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          textShadow: '0 0 20px #FF6A00, 0 0 40px #FF4500',
          margin: 0,
          fontWeight: 'bold',
        }}>
          Department of Electronics and Communication Engineering
        </p>
        <p style={{
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: 'clamp(0.75rem, 1.8vw, 1rem)',
          color: '#FFA500',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          margin: '6px 0 0 0',
          opacity: 0.85,
        }}>
          Suguna College of Engineering
        </p>
      </div>

      {/* Main Title */}
      <div style={{
        position: 'relative', zIndex: 10,
        opacity: titleOpacity,
        transform: `scale(${titleScale})`,
        transition: 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        textAlign: 'center',
        marginBottom: '12px',
      }}>
        <h1 style={{
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          fontWeight: '900',
          margin: 0,
          background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 30%, #FF4500 60%, #FF2200 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          filter: 'drop-shadow(0 0 30px #FF6A00) drop-shadow(0 0 60px #FF2200)',
          letterSpacing: '0.05em',
          lineHeight: 1,
        }}>
          VibECX-2K26
        </h1>
      </div>

      {/* Subtitle */}
      <div style={{
        position: 'relative', zIndex: 10,
        opacity: subtitleOpacity,
        transition: 'opacity 0.8s ease-out',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: 'clamp(1rem, 3vw, 1.8rem)',
          color: '#FF6A00',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          margin: 0,
          textShadow: '0 0 20px #FF4500, 0 0 40px #FF2200',
          fontStyle: 'italic',
        }}>
          2K26
        </p>
        <div style={{
          width: '200px', height: '2px',
          background: 'linear-gradient(90deg, transparent, #FF6A00, #FF2200, #FF6A00, transparent)',
          margin: '12px auto 0',
          boxShadow: '0 0 10px #FF4500',
        }} />
      </div>

      {/* Bottom glow line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #FF6A00, #FF2200, #FF6A00, transparent)',
        boxShadow: '0 0 20px #FF4500',
      }} />
    </div>
  );
}
