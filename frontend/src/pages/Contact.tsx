import React from 'react';
import { Phone, MapPin, User, Users, GraduationCap, MessageSquare, Zap } from 'lucide-react';
import CircuitPattern from '../components/CircuitPattern';

// ─── Data ────────────────────────────────────────────────────────────────────

const staffCoordinators = [
  {
    role: 'Convenor',
    name: 'Mr. Ananda Kumar.K M.E',
    position: 'Assistant Professor and HoD-ECE',
    phone: null,
    icon: GraduationCap,
  },
  {
    role: 'Faculty Co-ordinator',
    name: 'Mr. Idayavan.S M.E',
    position: 'Assistant Professor-ECE',
    phone: '9488846518',
    icon: User,
  },
];

const studentCoordinators = [
  { name: 'Sakthikrishnan.S', phone: '8838204730' },
  { name: 'Manosri.S.V', phone: '9449143918' },
  { name: 'Ayyanar.G', phone: '7397057124' },
];

// ─── Shared glass card style ──────────────────────────────────────────────────

const glassCard: React.CSSProperties = {
  background: 'rgba(10, 5, 0, 0.55)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 120, 0, 0.35)',
  boxShadow:
    '0 0 18px rgba(255, 100, 0, 0.25), 0 0 40px rgba(255, 60, 0, 0.10), inset 0 0 20px rgba(255, 80, 0, 0.04)',
  borderRadius: '16px',
};

const glassCardHoverIn = (el: HTMLElement) => {
  el.style.borderColor = 'rgba(255, 140, 0, 0.7)';
  el.style.boxShadow =
    '0 0 28px rgba(255, 120, 0, 0.45), 0 0 60px rgba(255, 60, 0, 0.20), inset 0 0 24px rgba(255, 80, 0, 0.07)';
};

const glassCardHoverOut = (el: HTMLElement) => {
  el.style.borderColor = 'rgba(255, 120, 0, 0.35)';
  el.style.boxShadow =
    '0 0 18px rgba(255, 100, 0, 0.25), 0 0 40px rgba(255, 60, 0, 0.10), inset 0 0 20px rgba(255, 80, 0, 0.04)';
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#000000', fontFamily: '"Times New Roman", Times, serif', position: 'relative' }}
    >
      {/* Circuit background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <CircuitPattern opacity={0.07} />
      </div>

      {/* Ambient glow blobs */}
      <div
        style={{
          position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(255,80,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed', bottom: '20%', right: '10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(255,140,0,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <main className="flex-1 pt-10 pb-16 px-4" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* ── TOP SECTION ─────────────────────────────────────────────── */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            {/* Subtitle */}
            <p
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '0.78rem',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'rgba(255, 160, 60, 0.75)',
                marginBottom: '14px',
                fontWeight: '600',
              }}
            >
              ⚡ GET IN TOUCH
            </p>

            {/* Main Title */}
            <h1
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
                fontWeight: '900',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FF8C00',
                textShadow:
                  '0 0 10px rgba(255,140,0,0.9), 0 0 22px rgba(255,100,0,0.7), 0 0 50px rgba(255,60,0,0.5), 0 0 90px rgba(255,30,0,0.3)',
                margin: '0 0 10px 0',
                lineHeight: 1.1,
              }}
            >
              CONTACT US
            </h1>

            {/* Decorative divider */}
            <div
              style={{
                width: '120px', height: '2px', margin: '0 auto 18px',
                background: 'linear-gradient(90deg, transparent, #FF6A00, #FFD700, #FF6A00, transparent)',
                boxShadow: '0 0 10px rgba(255,106,0,0.6)',
              }}
            />

            {/* Tagline */}
            <p
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '1.05rem',
                color: 'rgba(220, 180, 120, 0.8)',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              Reach out to our event coordinators for any queries
            </p>
          </div>

          {/* ── COLLEGE INFO GLASS CARD ──────────────────────────────────── */}
          <div
            style={{
              ...glassCard,
              padding: '32px 40px',
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: '56px', height: '56px', borderRadius: '50%',
                border: '2px solid rgba(255, 140, 0, 0.6)',
                background: 'rgba(255, 100, 0, 0.1)',
                boxShadow: '0 0 16px rgba(255, 100, 0, 0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <MapPin size={26} color="#FF8C00" style={{ filter: 'drop-shadow(0 0 6px #FF6A00)' }} />
            </div>

            <h2
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '1.45rem',
                fontWeight: '800',
                color: '#FFD700',
                textShadow: '0 0 12px rgba(255,215,0,0.5)',
                margin: '0 0 10px 0',
                letterSpacing: '0.04em',
              }}
            >
              Suguna College of Engineering
            </h2>
            <p
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '1.05rem',
                color: 'rgba(255, 180, 80, 0.85)',
                margin: '0 0 8px 0',
              }}
            >
              Department of Electronics and Communication Engineering
            </p>
            <p
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '0.95rem',
                color: 'rgba(200, 150, 80, 0.7)',
                margin: 0,
                letterSpacing: '0.06em',
              }}
            >
              Coimbatore, Tamil Nadu, India
            </p>
          </div>

          {/* ── STAFF COORDINATORS ──────────────────────────────────────── */}
          <div style={{ marginBottom: '16px' }}>
            <h2
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '1rem',
                fontWeight: '700',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255, 160, 60, 0.7)',
                textAlign: 'center',
                marginBottom: '24px',
              }}
            >
              — Staff Co-ordinators —
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                marginBottom: '40px',
              }}
            >
              {staffCoordinators.map((coord, i) => {
                const Icon = coord.icon;
                return (
                  <div
                    key={i}
                    style={{ ...glassCard, padding: '32px 28px', textAlign: 'center', transition: 'all 0.3s ease' }}
                    onMouseEnter={e => glassCardHoverIn(e.currentTarget as HTMLElement)}
                    onMouseLeave={e => glassCardHoverOut(e.currentTarget as HTMLElement)}
                  >
                    {/* Icon circle */}
                    <div
                      style={{
                        width: '64px', height: '64px', borderRadius: '50%',
                        border: '2px solid rgba(255, 140, 0, 0.55)',
                        background: 'rgba(255, 90, 0, 0.12)',
                        boxShadow: '0 0 20px rgba(255, 100, 0, 0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 20px',
                      }}
                    >
                      <Icon size={28} color="#FF8C00" style={{ filter: 'drop-shadow(0 0 6px #FF6A00)' }} />
                    </div>

                    {/* Role badge */}
                    <span
                      style={{
                        display: 'inline-block',
                        fontFamily: '"Times New Roman", Times, serif',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: '#FF8C00',
                        background: 'rgba(255, 100, 0, 0.12)',
                        border: '1px solid rgba(255, 120, 0, 0.4)',
                        borderRadius: '20px',
                        padding: '4px 14px',
                        marginBottom: '14px',
                      }}
                    >
                      {coord.role}
                    </span>

                    <h3
                      style={{
                        fontFamily: '"Times New Roman", Times, serif',
                        fontSize: '1.15rem',
                        fontWeight: '800',
                        color: '#FFD700',
                        textShadow: '0 0 8px rgba(255,215,0,0.4)',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {coord.name}
                    </h3>

                    <p
                      style={{
                        fontFamily: '"Times New Roman", Times, serif',
                        fontSize: '0.92rem',
                        color: 'rgba(220, 170, 90, 0.8)',
                        margin: '0 0 14px 0',
                      }}
                    >
                      {coord.position}
                    </p>

                    {coord.phone && (
                      <div
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          marginTop: '8px',
                        }}
                      >
                        <Phone size={14} color="rgba(255,140,0,0.7)" />
                        <a
                          href={`tel:${coord.phone}`}
                          style={{
                            fontFamily: '"Times New Roman", Times, serif',
                            fontSize: '0.95rem',
                            color: 'rgba(255, 180, 80, 0.9)',
                            textDecoration: 'none',
                            letterSpacing: '0.05em',
                          }}
                          onMouseEnter={e => ((e.target as HTMLElement).style.color = '#FFD700')}
                          onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255, 180, 80, 0.9)')}
                        >
                          {coord.phone}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── STUDENT COORDINATORS ────────────────────────────────────── */}
          <div style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '1rem',
                fontWeight: '700',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255, 160, 60, 0.7)',
                textAlign: 'center',
                marginBottom: '24px',
              }}
            >
              — Student Co-ordinators —
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
              }}
            >
              {studentCoordinators.map((student, i) => (
                <div
                  key={i}
                  style={{ ...glassCard, padding: '28px 24px', textAlign: 'center', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => glassCardHoverIn(e.currentTarget as HTMLElement)}
                  onMouseLeave={e => glassCardHoverOut(e.currentTarget as HTMLElement)}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: '54px', height: '54px', borderRadius: '50%',
                      border: '2px solid rgba(255, 140, 0, 0.5)',
                      background: 'rgba(255, 90, 0, 0.1)',
                      boxShadow: '0 0 16px rgba(255, 100, 0, 0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <Users size={22} color="#FF8C00" style={{ filter: 'drop-shadow(0 0 5px #FF6A00)' }} />
                  </div>

                  <h3
                    style={{
                      fontFamily: '"Times New Roman", Times, serif',
                      fontSize: '1.1rem',
                      fontWeight: '800',
                      color: '#FFD700',
                      textShadow: '0 0 8px rgba(255,215,0,0.35)',
                      margin: '0 0 12px 0',
                    }}
                  >
                    {student.name}
                  </h3>

                  <div
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    }}
                  >
                    <Phone size={14} color="rgba(255,140,0,0.7)" />
                    <a
                      href={`tel:${student.phone}`}
                      style={{
                        fontFamily: '"Times New Roman", Times, serif',
                        fontSize: '0.95rem',
                        color: 'rgba(255, 180, 80, 0.9)',
                        textDecoration: 'none',
                        letterSpacing: '0.05em',
                      }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = '#FFD700')}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255, 180, 80, 0.9)')}
                    >
                      {student.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── GENERAL ENQUIRY GLASS PANEL ──────────────────────────────── */}
          <div
            style={{
              ...glassCard,
              padding: '40px 48px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '60px', height: '60px', borderRadius: '50%',
                border: '2px solid rgba(255, 140, 0, 0.55)',
                background: 'rgba(255, 90, 0, 0.1)',
                boxShadow: '0 0 20px rgba(255, 100, 0, 0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <MessageSquare size={26} color="#FF8C00" style={{ filter: 'drop-shadow(0 0 6px #FF6A00)' }} />
            </div>

            <h3
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#FFD700',
                textShadow: '0 0 12px rgba(255,215,0,0.5)',
                margin: '0 0 12px 0',
                letterSpacing: '0.06em',
              }}
            >
              General Enquiries
            </h3>

            <p
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '1rem',
                color: 'rgba(220, 170, 90, 0.8)',
                margin: '0 0 20px 0',
                fontStyle: 'italic',
              }}
            >
              For general event information and registration queries
            </p>

            {/* Decorative divider */}
            <div
              style={{
                width: '80px', height: '1px', margin: '0 auto 20px',
                background: 'linear-gradient(90deg, transparent, rgba(255,140,0,0.6), transparent)',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Zap size={16} color="#FF8C00" style={{ filter: 'drop-shadow(0 0 4px #FF6A00)' }} />
              <span
                style={{
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: '1rem',
                  color: 'rgba(255, 180, 80, 0.85)',
                  letterSpacing: '0.04em',
                }}
              >
                Contact the Faculty Co-ordinator: <strong style={{ color: '#FFD700' }}>9488846518</strong>
              </span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
