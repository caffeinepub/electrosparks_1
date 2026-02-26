import React, { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Signal...');

  const statusMessages = [
    'Initializing Signal...',
    'Loading Circuit Modules...',
    'Calibrating Frequency...',
    'Establishing Connection...',
    'System Ready.',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 80;

    let frame = 0;
    const totalFrames = 180; // ~3 seconds at 60fps

    const drawWaveform = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const amplitude = 20;
      const frequency = 0.05;
      const speed = frame * 0.08;

      // Draw multiple wave layers
      for (let layer = 0; layer < 3; layer++) {
        const layerAlpha = 1 - layer * 0.3;
        const layerAmplitude = amplitude * (1 - layer * 0.2);
        const layerFreq = frequency * (1 + layer * 0.3);

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 220, 240, ${layerAlpha * 0.8})`;
        ctx.lineWidth = 2 - layer * 0.5;
        ctx.shadowColor = 'rgba(0, 220, 240, 0.8)';
        ctx.shadowBlur = 8 - layer * 2;

        for (let x = 0; x < canvas.width; x++) {
          const y = centerY + Math.sin(x * layerFreq + speed + layer * 1.5) * layerAmplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw digital signal overlay
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 180, 220, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);

      let prevY = centerY;
      for (let x = 0; x < canvas.width; x += 20) {
        const newY = Math.random() > 0.5 ? centerY - 15 : centerY + 15;
        ctx.moveTo(x, prevY);
        ctx.lineTo(x, newY);
        ctx.lineTo(x + 20, newY);
        prevY = newY;
      }
      ctx.stroke();
      ctx.setLineDash([]);

      frame++;
    };

    const animate = () => {
      drawWaveform();
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 8 + 2;
        return Math.min(next, 100);
      });
    }, 80);

    // Status messages
    const msgTimers = statusMessages.map((msg, i) =>
      setTimeout(() => setStatusText(msg), i * 600)
    );

    // Complete after 3 seconds
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(onComplete, 300);
    }, 3000);

    return () => {
      clearInterval(interval);
      msgTimers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center"
      style={{ background: '#000008' }}
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,220,240,0.012) 2px, rgba(0,220,240,0.012) 4px)',
        }}
      />

      {/* Corner decorations */}
      {[
        'top-4 left-4',
        'top-4 right-4',
        'bottom-4 left-4',
        'bottom-4 right-4',
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-12 h-12 pointer-events-none`} style={{ opacity: 0.5 }}>
          <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-6 h-0.5`} style={{ background: 'rgba(0,220,240,0.8)' }} />
          <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-0.5 h-6`} style={{ background: 'rgba(0,220,240,0.8)' }} />
        </div>
      ))}

      <div className="relative flex flex-col items-center gap-8 px-4 w-full max-w-lg">

        {/* Microchip core */}
        <div className="relative flex items-center justify-center">
          {/* Outer rotating ring */}
          <div
            className="absolute w-40 h-40 rounded-full border border-cyan-400/30 animate-rotate-slow"
            style={{ boxShadow: '0 0 20px rgba(0,220,240,0.2)' }}
          />
          <div
            className="absolute w-32 h-32 rounded-full border border-cyan-400/20 animate-counter-rotate"
            style={{ boxShadow: '0 0 15px rgba(0,220,240,0.15)' }}
          />

          {/* Microchip image */}
          <div
            className="relative w-24 h-24 flex items-center justify-center animate-chip-pulse"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(0,220,240,0.8)) drop-shadow(0 0 30px rgba(0,200,240,0.4))',
            }}
          >
            <img
              src="/assets/generated/microchip-core.dim_256x256.png"
              alt="Microchip Core"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Pulse rings */}
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="absolute rounded-full border border-cyan-400/20"
              style={{
                width: `${100 + i * 30}px`,
                height: `${100 + i * 30}px`,
                animation: `glow-pulse-ring ${1.5 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div className="text-center">
          <h1
            className="font-orbitron font-black text-3xl md:text-4xl tracking-widest"
            style={{
              color: 'rgba(0, 230, 255, 1)',
              textShadow: '0 0 10px rgba(0,230,255,1), 0 0 20px rgba(0,230,255,0.7), 0 0 40px rgba(0,200,240,0.4)',
              animation: 'pulse-text 2s ease-in-out infinite',
            }}
          >
            ELECTROSPARKS
          </h1>
          <p
            className="font-mono-tech text-sm mt-2 tracking-widest"
            style={{
              color: 'rgba(0, 200, 230, 0.7)',
              textShadow: '0 0 8px rgba(0,200,230,0.5)',
            }}
          >
            {statusText}
            <span className="animate-blink">_</span>
          </p>
        </div>

        {/* Waveform canvas */}
        <div className="w-full overflow-hidden rounded" style={{ maxWidth: '500px' }}>
          <canvas
            ref={canvasRef}
            className="w-full"
            style={{ height: '60px', display: 'block' }}
          />
        </div>

        {/* Progress bar */}
        <div className="w-full" style={{ maxWidth: '400px' }}>
          <div
            className="w-full h-1 rounded-full overflow-hidden"
            style={{ background: 'rgba(0,220,240,0.1)', border: '1px solid rgba(0,220,240,0.2)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, rgba(0,180,220,0.8), rgba(0,230,255,1))',
                boxShadow: '0 0 10px rgba(0,220,240,0.8), 0 0 20px rgba(0,220,240,0.4)',
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-mono-tech text-xs" style={{ color: 'rgba(0,200,230,0.5)' }}>
              SYS_BOOT
            </span>
            <span className="font-mono-tech text-xs" style={{ color: 'rgba(0,200,230,0.7)' }}>
              {Math.floor(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
