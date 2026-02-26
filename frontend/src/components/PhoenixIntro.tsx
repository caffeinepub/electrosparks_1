import React, { useEffect, useRef, useState } from 'react';

interface PhoenixIntroProps {
  onComplete: () => void;
}

export default function PhoenixIntro({ onComplete }: PhoenixIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [videoOpacity, setVideoOpacity] = useState(0);
  const [deptOpacity, setDeptOpacity] = useState(0);
  const [deptY, setDeptY] = useState(60);
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
      const cy = canvas.height * 0.42;
      particles.push({
        x: cx + (Math.random() - 0.5) * 160,
        y: cy + (Math.random() - 0.5) * 160,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(Math.random() * 2.5 + 0.5),
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

  // Setup audio volume on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = false;
    }
  }, []);

  // Handle video play event → start audio + trigger text animations
  const handleVideoPlay = () => {
    // Fade in video
    setVideoOpacity(1);

    // Play audio (unmuted)
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked; silently ignore
      });
    }

    // Dept text rises with phoenix flight (~1.5s into video)
    const t1 = setTimeout(() => {
      setDeptOpacity(1);
      setDeptY(0);
    }, 1500);

    // Title appears (~3s into video)
    const t2 = setTimeout(() => {
      setTitleOpacity(1);
      setTitleScale(1);
    }, 3000);

    // Subtitle appears (~4.5s into video)
    const t3 = setTimeout(() => {
      setSubtitleOpacity(1);
    }, 4500);

    // Store timeouts for cleanup
    (window as any).__phoenixTextTimers = [t1, t2, t3];
  };

  // Handle video ended event → stop audio + fade out + navigate
  const handleVideoEnded = () => {
    // Stop and reset audio immediately
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Clear any pending text timers
    const timers = (window as any).__phoenixTextTimers || [];
    timers.forEach((t: ReturnType<typeof setTimeout>) => clearTimeout(t));

    // Fade out the entire intro
    setContainerOpacity(0);

    // Navigate to home after fade-out completes
    const navTimer = setTimeout(() => {
      onComplete();
    }, 900);

    (window as any).__phoenixNavTimer = navTimer;
  };

  // Fallback: if video fails to load/play, use timer-based sequence
  const handleVideoError = () => {
    // Fade in a fallback glow area
    setVideoOpacity(1);

    const t1 = setTimeout(() => { setDeptOpacity(1); setDeptY(0); }, 1500);
    const t2 = setTimeout(() => { setTitleOpacity(1); setTitleScale(1); }, 3000);
    const t3 = setTimeout(() => { setSubtitleOpacity(1); }, 4500);
    const t4 = setTimeout(() => { setContainerOpacity(0); }, 6500);
    const t5 = setTimeout(() => { onComplete(); }, 7400);

    (window as any).__phoenixTextTimers = [t1, t2, t3, t4, t5];
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const timers = (window as any).__phoenixTextTimers || [];
      timers.forEach((t: ReturnType<typeof setTimeout>) => clearTimeout(t));
      if ((window as any).__phoenixNavTimer) {
        clearTimeout((window as any).__phoenixNavTimer);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        opacity: containerOpacity,
        transition: 'opacity 0.85s ease-in-out',
        overflow: 'hidden',
      }}
    >
      {/* Ember particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
      />

      {/* Circuit grid background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Radial ambient glow behind video */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -60%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,106,0,0.18) 0%, rgba(255,45,0,0.10) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: videoOpacity,
        transition: 'opacity 1.2s ease-out',
      }} />

      {/* Phoenix Video */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        opacity: videoOpacity,
        transition: 'opacity 1.0s ease-out',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 0 60px rgba(255,106,0,0.6), 0 0 120px rgba(255,45,0,0.35), 0 0 200px rgba(255,69,0,0.2)',
          filter: 'drop-shadow(0 0 30px #FF6A00)',
        }}>
          <video
            ref={videoRef}
            src="/assets/phoenix.mp4"
            autoPlay
            muted
            playsInline
            onPlay={handleVideoPlay}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            style={{
              width: 'min(420px, 80vw)',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
          {/* Fiery overlay vignette on video */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(255,45,0,0.15) 100%)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/assets/phoenix-sound.mp3"
        preload="auto"
        loop={false}
        style={{ display: 'none' }}
      />

      {/* Department Text — rises with phoenix */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        opacity: deptOpacity,
        transform: `translateY(${deptY}px)`,
        transition: 'opacity 1.0s ease-out, transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        textAlign: 'center',
        marginBottom: '16px',
        padding: '0 20px',
      }}>
        <p style={{
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: 'clamp(0.85rem, 2.2vw, 1.25rem)',
          color: '#FF8C00',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          textShadow: '0 0 20px #FF6A00, 0 0 40px #FF4500, 0 0 60px #FF2200',
          margin: 0,
          fontWeight: 'bold',
        }}>
          Department of Electronics and Communication Engineering
        </p>
        <p style={{
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: 'clamp(0.7rem, 1.6vw, 0.95rem)',
          color: '#FFA500',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          margin: '6px 0 0 0',
          opacity: 0.85,
        }}>
          Suguna College of Engineering
        </p>
      </div>

      {/* Main Title — VibECX-2K26 */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        opacity: titleOpacity,
        transform: `scale(${titleScale})`,
        transition: 'opacity 0.9s ease-out, transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)',
        textAlign: 'center',
        marginBottom: '12px',
      }}>
        <h1 style={{
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
          fontWeight: '900',
          margin: 0,
          background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 30%, #FF4500 60%, #FF2200 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 30px #FF6A00) drop-shadow(0 0 60px #FF2200)',
          letterSpacing: '0.05em',
          lineHeight: 1,
        }}>
          VibECX-2K26
        </h1>
      </div>

      {/* Subtitle — 2K26 */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        opacity: subtitleOpacity,
        transition: 'opacity 0.9s ease-out',
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
          width: '200px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #FF6A00, #FF2200, #FF6A00, transparent)',
          margin: '12px auto 0',
          boxShadow: '0 0 10px #FF4500',
        }} />
      </div>

      {/* Bottom glow line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #FF6A00, #FF2200, #FF6A00, transparent)',
        boxShadow: '0 0 20px #FF4500',
        zIndex: 5,
      }} />
    </div>
  );
}
