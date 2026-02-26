import React from 'react';
import CircuitPattern from '../components/CircuitPattern';
import { Megaphone, MessageSquare, Shuffle, Star, Gamepad2 } from 'lucide-react';

const events = [
  {
    icon: Megaphone,
    number: '01',
    name: 'AD-MAD',
    description: 'A marketing competition where teams create and perform a funny or creative advertisement for a product.',
  },
  {
    icon: MessageSquare,
    number: '02',
    name: 'Jam',
    description: 'Speaking on a random topic for one continuous minute without hesitation, repetition, or deviation.',
  },
  {
    icon: Shuffle,
    number: '03',
    name: 'Dump Charades',
    description: 'A classic game where one team member acts out a movie or technical term without speaking.',
  },
  {
    icon: Star,
    number: '04',
    name: 'Talent Sow',
    description: 'A platform for students to showcase non-technical skills like singing, dancing, or magic.',
  },
  {
    icon: Gamepad2,
    number: '05',
    name: 'E-Sports',
    description: '(FF,BGMI)',
  },
];

export default function NonTechnicalEvents() {
  return (
    <div style={{ background: '#000000', minHeight: '100vh', fontFamily: '"Times New Roman", Times, serif', padding: '60px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px', position: 'relative' }}>
          <CircuitPattern opacity={0.06} />
          <div style={{
            display: 'inline-block',
            border: '1px solid rgba(255,106,0,0.4)',
            borderRadius: '30px',
            padding: '6px 20px',
            marginBottom: '16px',
            background: 'rgba(255,106,0,0.05)',
          }}>
            <span style={{ color: '#FF8C00', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              VibECX-2K26
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            fontWeight: '900',
            margin: '0 0 16px 0',
            background: 'linear-gradient(135deg, #FFD700, #FF8C00, #FF4500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(255,106,0,0.4))',
          }}>
            Non-Technical Events
          </h1>
          <div style={{
            width: '200px', height: '3px',
            background: 'linear-gradient(90deg, transparent, #FF6A00, #FF2200, #FF6A00, transparent)',
            margin: '0 auto 20px',
            boxShadow: '0 0 12px #FF4500',
          }} />
          <p style={{ color: '#A08060', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
            Unleash your creativity and talent beyond the technical realm
          </p>
        </div>

        {/* Events Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px',
        }}>
          {events.map((event) => {
            const Icon = event.icon;
            return (
              <div
                key={event.number}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,106,0,0.2)',
                  borderRadius: '16px',
                  padding: '32px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,106,0,0.5)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 30px rgba(255,106,0,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,106,0,0.2)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                {/* Number watermark */}
                <span style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  fontSize: '3.5rem',
                  fontWeight: '900',
                  color: 'rgba(255,106,0,0.06)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}>
                  {event.number}
                </span>

                {/* Icon */}
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(255,106,0,0.1)',
                  border: '1px solid rgba(255,106,0,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <Icon size={26} color="#FF8C00" />
                </div>

                {/* Name */}
                <h3 style={{
                  color: '#FFD700',
                  fontSize: '1.35rem',
                  fontWeight: '800',
                  margin: '0 0 12px 0',
                  textShadow: '0 0 10px rgba(255,215,0,0.2)',
                }}>
                  {event.name}
                </h3>

                {/* Description */}
                <p style={{
                  color: '#A08060',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {event.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <a
            href="/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #FF6A00, #FF2200)',
              color: '#FFFFFF',
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: '1.1rem',
              fontWeight: '800',
              padding: '16px 40px',
              borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: '0 0 25px rgba(255,106,0,0.4)',
              transition: 'box-shadow 0.3s, transform 0.3s',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(255,106,0,0.7)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 25px rgba(255,106,0,0.4)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            Register for Events
          </a>
        </div>
      </div>
    </div>
  );
}
