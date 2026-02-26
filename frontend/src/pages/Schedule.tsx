import React, { useState } from 'react';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CircuitPattern from '../components/CircuitPattern';

const scheduleData = [
  {
    time: '08:00 AM',
    duration: '1 hr',
    event: 'Registration & Check-in',
    venue: 'Main Entrance',
    type: 'general',
    description: 'Participant registration, ID verification, and kit distribution.',
  },
  {
    time: '09:00 AM',
    duration: '1 hr',
    event: 'Inaugural Ceremony',
    venue: 'Auditorium',
    type: 'general',
    description: 'Welcome address, chief guest speech, and lamp lighting ceremony.',
  },
  {
    time: '10:00 AM',
    duration: '2 hrs',
    event: 'Circuit Debugging — Round 1',
    venue: 'ECE Lab 1',
    type: 'technical',
    description: 'First round of circuit debugging competition.',
  },
  {
    time: '10:00 AM',
    duration: '2 hrs',
    event: 'Tech Quiz — Prelims',
    venue: 'Seminar Hall',
    type: 'non-technical',
    description: 'Preliminary rounds of the technology quiz competition.',
  },
  {
    time: '10:30 AM',
    duration: '1.5 hrs',
    event: 'Code Blitz — Round 1',
    venue: 'Computer Lab',
    type: 'technical',
    description: 'First round of the programming competition.',
  },
  {
    time: '12:00 PM',
    duration: '1 hr',
    event: 'Lunch Break',
    venue: 'Cafeteria',
    type: 'general',
    description: 'Refreshments and networking opportunity.',
  },
  {
    time: '01:00 PM',
    duration: '2 hrs',
    event: 'Signal Quest',
    venue: 'ECE Lab 2',
    type: 'technical',
    description: 'Communications systems design and analysis competition.',
  },
  {
    time: '01:00 PM',
    duration: '2 hrs',
    event: 'Treasure Hunt',
    venue: 'Campus-wide',
    type: 'non-technical',
    description: 'Tech-themed campus treasure hunt adventure.',
  },
  {
    time: '01:30 PM',
    duration: '1.5 hrs',
    event: 'Photography Contest',
    venue: 'Campus',
    type: 'non-technical',
    description: 'Technology and innovation photography competition.',
  },
  {
    time: '02:00 PM',
    duration: '2 hrs',
    event: 'Embedded Systems Challenge',
    venue: 'Project Lab',
    type: 'technical',
    description: 'Microcontroller-based prototype building competition.',
  },
  {
    time: '03:00 PM',
    duration: '1.5 hrs',
    event: 'PCB Design Sprint',
    venue: 'CAD Lab',
    type: 'technical',
    description: 'PCB layout design competition using EDA tools.',
  },
  {
    time: '03:30 PM',
    duration: '1 hr',
    event: 'Gaming Tournament — Finals',
    venue: 'Gaming Zone',
    type: 'non-technical',
    description: 'Final rounds of the gaming tournament.',
  },
  {
    time: '04:00 PM',
    duration: '1.5 hrs',
    event: 'Paper Presentation',
    venue: 'Conference Hall',
    type: 'technical',
    description: 'Research paper presentations on emerging ECE topics.',
  },
  {
    time: '04:30 PM',
    duration: '1 hr',
    event: 'JAM Session',
    venue: 'Seminar Hall',
    type: 'non-technical',
    description: 'Just a Minute speaking competition finals.',
  },
  {
    time: '05:30 PM',
    duration: '1 hr',
    event: 'Valedictory & Prize Distribution',
    venue: 'Auditorium',
    type: 'general',
    description: 'Closing ceremony, prize distribution, and vote of thanks.',
  },
];

type FilterType = 'all' | 'technical' | 'non-technical' | 'general';

const typeColors: Record<string, { color: string; bg: string; border: string }> = {
  technical: {
    color: 'rgba(0,230,255,0.9)',
    bg: 'rgba(0,220,240,0.08)',
    border: 'rgba(0,220,240,0.4)',
  },
  'non-technical': {
    color: 'rgba(180,220,255,0.9)',
    bg: 'rgba(100,180,255,0.06)',
    border: 'rgba(100,180,255,0.3)',
  },
  general: {
    color: 'rgba(200,200,255,0.8)',
    bg: 'rgba(150,150,255,0.05)',
    border: 'rgba(150,150,255,0.25)',
  },
};

export default function Schedule() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all' ? scheduleData : scheduleData.filter(e => e.type === filter);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#000008' }}>
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4">
        <CircuitPattern opacity={0.08} />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 page-enter">
            <p
              className="font-mono-tech text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: 'rgba(0,200,230,0.6)' }}
            >
              Event Timeline
            </p>
            <h1
              className="font-orbitron font-black text-3xl sm:text-4xl md:text-5xl tracking-widest uppercase mb-4"
              style={{
                color: 'rgba(0,230,255,1)',
                textShadow: '0 0 10px rgba(0,230,255,0.8), 0 0 20px rgba(0,230,255,0.4)',
              }}
            >
              Schedule
            </h1>
            <div
              className="w-24 h-0.5 mx-auto mb-4"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0,220,240,0.8), transparent)',
                boxShadow: '0 0 8px rgba(0,220,240,0.5)',
              }}
            />
            <p className="font-rajdhani text-base" style={{ color: 'rgba(0,200,230,0.6)' }}>
              ELECTROSPARKS 2K26 — Full Day Event Schedule
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {(['all', 'technical', 'non-technical', 'general'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="font-mono-tech text-xs px-4 py-2 rounded uppercase tracking-wider transition-all duration-300"
                style={{
                  color: filter === f ? 'rgba(0,230,255,1)' : 'rgba(0,200,230,0.5)',
                  border: `1px solid ${filter === f ? 'rgba(0,220,240,0.7)' : 'rgba(0,220,240,0.2)'}`,
                  background: filter === f ? 'rgba(0,220,240,0.1)' : 'transparent',
                  boxShadow: filter === f ? '0 0 10px rgba(0,220,240,0.2)' : 'none',
                }}
              >
                {f === 'all' ? 'All Events' : f === 'non-technical' ? 'Non-Technical' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5"
              style={{
                background: 'linear-gradient(180deg, transparent, rgba(0,220,240,0.4) 10%, rgba(0,220,240,0.4) 90%, transparent)',
                boxShadow: '0 0 6px rgba(0,220,240,0.3)',
              }}
            />

            <div className="space-y-4">
              {filtered.map((item, i) => {
                const colors = typeColors[item.type];
                return (
                  <div
                    key={i}
                    className="relative flex gap-4 sm:gap-6 pl-14 sm:pl-16 group"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-4 sm:left-6 top-4 w-4 h-4 rounded-full -translate-x-1/2 transition-all duration-300 group-hover:scale-125"
                      style={{
                        background: colors.color,
                        boxShadow: `0 0 8px ${colors.color}, 0 0 16px ${colors.color}`,
                        border: '2px solid rgba(0,0,12,0.8)',
                      }}
                    />

                    {/* Card */}
                    <div
                      className="flex-1 p-4 rounded transition-all duration-300"
                      style={{
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${colors.color}30`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3
                          className="font-orbitron font-semibold text-sm tracking-wider"
                          style={{ color: colors.color }}
                        >
                          {item.event}
                        </h3>
                        <span
                          className="font-mono-tech text-xs px-2 py-0.5 rounded"
                          style={{
                            color: colors.color,
                            border: `1px solid ${colors.border}`,
                            background: 'rgba(0,0,12,0.4)',
                          }}
                        >
                          {item.type === 'non-technical' ? 'Non-Tech' : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>

                      <p className="font-rajdhani text-sm mb-3" style={{ color: 'rgba(0,200,230,0.5)' }}>
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" style={{ color: 'rgba(0,200,230,0.5)' }} />
                          <span className="font-mono-tech text-xs" style={{ color: 'rgba(0,200,230,0.6)' }}>
                            {item.time} ({item.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" style={{ color: 'rgba(0,200,230,0.5)' }} />
                          <span className="font-mono-tech text-xs" style={{ color: 'rgba(0,200,230,0.6)' }}>
                            {item.venue}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            {Object.entries(typeColors).map(([type, colors]) => (
              <div key={type} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: colors.color, boxShadow: `0 0 6px ${colors.color}` }}
                />
                <span className="font-mono-tech text-xs" style={{ color: 'rgba(0,200,230,0.5)' }}>
                  {type === 'non-technical' ? 'Non-Technical' : type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
