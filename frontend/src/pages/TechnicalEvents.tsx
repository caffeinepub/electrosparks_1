import React from 'react';
import CircuitPattern from '../components/CircuitPattern';
import { Cpu, CircuitBoard, Grid3X3, Mic, HelpCircle } from 'lucide-react';

const events = [
  {
    icon: Cpu,
    number: '01',
    name: 'Paper Presentation',
    description: 'Students present research papers on emerging ECE trends like 5G/6G, VLSI, AI in Signal Processing, and Green Electronics.',
  },
  {
    icon: CircuitBoard,
    number: '02',
    name: 'PCB Design Layout',
    description: 'Designing a Printed Circuit Board (PCB) layout for a given schematic using software like Eagle, KiCad, or Altium.Designing a Printed Circuit Board (PCB) layout for a given schematic using software like Eagle, KiCad, or Altium.',
  },
  {
    icon: Grid3X3,
    number: '03',
    name: 'Technical Crosscode',
    description: 'A fun puzzle where all clues and answers are related to electronics, semiconductors, and physics.',
  },
  {
    icon: Mic,
    number: '04',
    name: 'Tech talk/Pic & Talk',
    description: 'Participants pick a technical topic on the spot and must deliver a 3-minute speech on it.',
  },
  {
    icon: HelpCircle,
    number: '05',
    name: 'Quiz Master',
    description: 'The Quiz Master is responsible for conducting the quiz event smoothly and engaging the audience. They ask questions, manage rounds, keep scores, and ensure the competition is fair and exciting.',
  },
];

export default function TechnicalEvents() {
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
            letterSpacing: '0.05em',
          }}>
            Technical Events
          </h1>
          <div style={{
            width: '200px', height: '3px',
            background: 'linear-gradient(90deg, transparent, #FF6A00, #FF2200, #FF6A00, transparent)',
            margin: '0 auto 20px',
            boxShadow: '0 0 12px #FF4500',
          }} />
          <p style={{ color: '#A08060', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            Showcase your technical prowess in these cutting-edge competitions
          </p>
        </div>

        {/* Events Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {events.map((event, i) => {
            const Icon = event.icon;
            return (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,106,0,0.25)',
                  borderRadius: '12px',
                  padding: '36px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = 'rgba(255,106,0,0.05)';
                  el.style.borderColor = 'rgba(255,106,0,0.5)';
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 12px 40px rgba(255,106,0,0.12)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = 'rgba(255,255,255,0.02)';
                  el.style.borderColor = 'rgba(255,106,0,0.25)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Event number */}
                <div style={{
                  position: 'absolute', top: '20px', right: '24px',
                  fontSize: '3rem', fontWeight: '900',
                  color: 'rgba(255,106,0,0.08)',
                  lineHeight: 1,
                }}>
                  {event.number}
                </div>

                {/* Icon */}
                <div style={{
                  width: '56px', height: '56px',
                  background: 'rgba(255,106,0,0.1)',
                  border: '1px solid rgba(255,106,0,0.3)',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <Icon size={28} color="#FF8C00" style={{ filter: 'drop-shadow(0 0 6px #FF6A00)' }} />
                </div>

                {/* Content */}
                <h3 style={{
                  color: '#FF8C00',
                  fontSize: '1.3rem',
                  fontWeight: '800',
                  marginBottom: '12px',
                  letterSpacing: '0.03em',
                  textShadow: '0 0 10px rgba(255,106,0,0.3)',
                }}>
                  {event.name}
                </h3>
                <p style={{
                  color: '#C8A870',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {event.description}
                </p>

                {/* Bottom accent */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.4), transparent)',
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
