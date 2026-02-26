import React, { useEffect, useRef, useState } from 'react';

interface PhoenixIntroProps {
  onComplete: () => void;
}

export default function PhoenixIntro({ onComplete }: PhoenixIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [containerOpacity, setContainerOpacity] = useState(1);

  // Ember particle canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Ember = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      r: number;
      g: number;
      b: number;
    };

    const embers: Ember[] = [];

    const spawnEmber = () => {
      const spreadX = canvas.width * 0.35;
      const baseY = canvas.height * 0.75;
      // Ember colors: orange/amber/gold tones
      const palette = [
        [255, 106, 0],
        [255, 69, 0],
        [255, 140, 0],
        [255, 165, 0],
        [255, 215, 0],
        [255, 34, 0],
      ];
      const [r, g, b] = palette[Math.floor(Math.random() * palette.length)];
      embers.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * spreadX,
        y: baseY + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 1.8 + 0.4),
        life: 0,
        maxLife: 80 + Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        r,
        g,
        b,
      });
    };

    let animId: number;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (frame % 3 === 0) spawnEmber();
      frame++;

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.vx += (Math.random() - 0.5) * 0.05;
        e.life++;
        if (e.life > e.maxLife) {
          embers.splice(i, 1);
          continue;
        }
        const alpha = (1 - e.life / e.maxLife) * 0.75;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgb(${e.r},${e.g},${e.b})`;
        ctx.shadowColor = `rgb(${e.r},${e.g},${e.b})`;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Fade-out and complete after 7 seconds
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setContainerOpacity(0);
    }, 6500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 7200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="opening-intro"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000000',
        overflow: 'hidden',
        opacity: containerOpacity,
        transition: 'opacity 0.7s ease-in-out',
      }}
    >
      {/* Soft orange radial glow pulse behind phoenix */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(255,106,0,0.18) 0%, rgba(255,69,0,0.10) 40%, transparent 70%)',
          animation: 'glowPulse 3s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Phoenix image — full screen, centered, cinematic zoom */}
      <img
        src="/assets/generated/phoenix-intro.dim_1920x1080.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: 'center',
          animation: 'introZoom 7s ease-in-out forwards',
          zIndex: 2,
        }}
      />

      {/* Ember particle canvas overlay */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Inline keyframes */}
      <style>{`
        @keyframes introZoom {
          0% {
            opacity: 0;
            transform: scale(1);
          }
          17% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}
