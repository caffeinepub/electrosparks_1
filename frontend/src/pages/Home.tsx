import React, { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import CircuitPattern from '../components/CircuitPattern';
import { Trophy, Building2, Users, Calendar, ChevronRight } from 'lucide-react';

const stats = [
  { icon: Trophy, label: 'Prize Pool', value: '₹30K', color: '#FFD700' },
  { icon: Building2, label: 'Colleges', value: '10+', color: '#FF8C00' },
  { icon: Users, label: 'Participants', value: '200+', color: '#FF6A00' },
  { icon: Calendar, label: 'Events', value: '10+', color: '#FF4500' },
];

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.opacity = '0';
      heroRef.current.style.transform = 'translateY(30px)';
      setTimeout(() => {
        if (heroRef.current) {
          heroRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          heroRef.current.style.opacity = '1';
          heroRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  return (
    <div style={{ background: '#000000', minHeight: '100vh', fontFamily: '"Times New Roman", Times, serif' }}>
      {/* Shine keyframe animation + hero-section responsive styles */}
      <style>{`
        @keyframes vibecx-shine {
          0% { background-position: -200px center; }
          100% { background-position: 200px center; }
        }
        .hero-title-section {
          transform: translateY(-40px);
          transform-origin: center top;
        }
        .vibecx-main-title {
          font-size: clamp(58px, 8.5vw, 120px);
          white-space: nowrap;
        }
        @media (max-width: 768px) {
          .hero-title-section {
            transform: translateY(-40px);
          }
          .vibecx-main-title {
            font-size: clamp(38px, 7vw, 70px);
            white-space: normal;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        padding: '80px 24px',
      }}>
        <CircuitPattern opacity={0.07} />

        {/* Radial glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,106,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Hero title section wrapper — shifted downward slightly */}
        <div className="hero-title-section" style={{ position: 'relative', zIndex: 2 }}>
          <div ref={heroRef} style={{ textAlign: 'center', maxWidth: '900px' }}>
            {/* College badge */}
            <div style={{
              display: 'inline-block',
              border: '1px solid rgba(255,106,0,0.4)',
              borderRadius: '30px',
              padding: '8px 24px',
              marginBottom: '24px',
              background: 'rgba(255,106,0,0.05)',
            }}>
              <span style={{ color: '#FF8C00', fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Suguna College of Engineering
              </span>
            </div>

            {/* Department */}
            <p style={{
              color: '#C8A870',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontWeight: '600',
            }}>
              Department of Electronics and Communication Engineering
            </p>

            {/* Main Title — 3D metallic racing-style */}
            <h1
              className="vibecx-main-title"
              style={{
                fontFamily: '"Times New Roman", serif',
                fontWeight: 900,
                letterSpacing: '3px',
                margin: '0 0 16px 0',
                lineHeight: 1,
                background: 'linear-gradient(to bottom, #fff6c7 0%, #ffb300 25%, #ff4d00 55%, #b30000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 0 #7a1a00, 0 4px 8px rgba(0,0,0,0.6), 0 0 25px rgba(255,80,0,0.7), 0 0 45px rgba(255,40,0,0.6)',
                transform: 'skewX(-5deg)',
                backgroundSize: '200% auto',
                animation: 'vibecx-shine 4s linear infinite',
                display: 'block',
              }}
            >
              VibECX-2K26
            </h1>

            {/* Subtitle line */}
            <div style={{
              width: '300px', height: '3px',
              background: 'linear-gradient(90deg, transparent, #FF6A00, #FF2200, #FF6A00, transparent)',
              margin: '0 auto 24px',
              boxShadow: '0 0 15px #FF4500',
            }} />

            <p style={{
              color: '#A08060',
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              marginBottom: '40px',
              lineHeight: 1.6,
            }}>
              The Ultimate ECE Symposium — Where Innovation Meets Excellence
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate({ to: '/register' })}
                style={{
                  background: 'linear-gradient(135deg, #FF6A00, #FF2200)',
                  border: 'none', borderRadius: '8px',
                  color: '#FFFFFF', fontFamily: '"Times New Roman", Times, serif',
                  fontSize: '1.1rem', fontWeight: '700',
                  padding: '14px 36px', cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(255,106,0,0.4)',
                  transition: 'all 0.3s ease',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 35px rgba(255,106,0,0.7)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(255,106,0,0.4)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                Register Now <ChevronRight size={18} />
              </button>
              <button
                onClick={() => navigate({ to: '/technical' })}
                style={{
                  background: 'transparent',
                  border: '2px solid rgba(255,106,0,0.6)',
                  borderRadius: '8px',
                  color: '#FF8C00', fontFamily: '"Times New Roman", Times, serif',
                  fontSize: '1.1rem', fontWeight: '600',
                  padding: '14px 36px', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,106,0,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#FF6A00';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,106,0,0.6)';
                }}
              >
                Explore Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '60px 24px',
        background: 'rgba(255,106,0,0.03)',
        borderTop: '1px solid rgba(255,106,0,0.15)',
        borderBottom: '1px solid rgba(255,106,0,0.15)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            color: '#FF8C00',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: '800',
            marginBottom: '48px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(255,106,0,0.4)',
          }}>
            Event Highlights
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid rgba(255,106,0,0.25)`,
                    borderRadius: '12px',
                    padding: '32px 24px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,106,0,0.06)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,106,0,0.5)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 30px rgba(255,106,0,0.15)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,106,0,0.25)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  <Icon size={36} color={stat.color} style={{ marginBottom: '16px', filter: `drop-shadow(0 0 8px ${stat.color})` }} />
                  <div style={{
                    fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                    fontWeight: '900',
                    color: stat.color,
                    textShadow: `0 0 20px ${stat.color}`,
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ color: '#C8A870', fontSize: '1rem', fontWeight: '600', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            color: '#FF8C00',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: '800',
            marginBottom: '16px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(255,106,0,0.4)',
          }}>
            What Awaits You
          </h2>
          <p style={{ color: '#A08060', fontSize: '1.1rem', marginBottom: '48px', lineHeight: 1.7 }}>
            Compete, innovate, and showcase your talent across 10+ exciting events
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Technical Events', desc: 'Paper Presentation, PCB Design, Quiz Master, and more cutting-edge competitions.', path: '/technical', icon: '⚡' },
              { title: 'Non-Technical Events', desc: 'AD-MAD, JAM, E-Sports, Talent Show, and more fun-filled competitions.', path: '/non-technical', icon: '🎭' },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => navigate({ to: item.path })}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,106,0,0.25)',
                  borderRadius: '12px',
                  padding: '40px 32px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,106,0,0.06)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#FF6A00';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,106,0,0.25)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ color: '#FF8C00', fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#A08060', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {item.desc}
                </p>
                <span style={{ color: '#FF6A00', fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  View Events <ChevronRight size={16} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
