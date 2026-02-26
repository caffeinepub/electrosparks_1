import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Zap, Phone } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Technical', path: '/technical' },
    { label: 'Non-Technical', path: '/non-technical' },
    { label: 'Register', path: '/register' },
    { label: 'Contact', path: '/contact' },
  ];

  const labelStyle: React.CSSProperties = {
    fontFamily: '"Times New Roman", Times, serif',
    color: '#FFD700',
    fontSize: '0.95rem',
    fontWeight: '700',
    margin: '0 0 4px 0',
    letterSpacing: '0.04em',
  };

  const nameStyle: React.CSSProperties = {
    fontFamily: '"Times New Roman", Times, serif',
    color: '#C8A870',
    fontSize: '0.92rem',
    margin: '0 0 2px 0',
  };

  const roleStyle: React.CSSProperties = {
    fontFamily: '"Times New Roman", Times, serif',
    color: '#A08060',
    fontSize: '0.88rem',
    margin: '0 0 2px 0',
  };

  return (
    <footer
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(255, 106, 0, 0.35)',
        boxShadow: '0 -4px 40px rgba(255, 80, 0, 0.08)',
        padding: '52px 24px 28px',
        fontFamily: '"Times New Roman", Times, serif',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,140,0,0.6), rgba(255,215,0,0.4), rgba(255,140,0,0.6), transparent)',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Three-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '44px',
          }}
        >
          {/* ── LEFT: Brand ─────────────────────────────────────────── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Zap
                size={22}
                color="#FF6A00"
                style={{ filter: 'drop-shadow(0 0 8px #FF4500)' }}
              />
              <span
                style={{
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: '1.45rem',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #FFD700, #FF6A00, #FF2200)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '0.04em',
                }}
              >
                VibECX-2K26
              </span>
            </div>
            <p
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                color: '#C8A870',
                fontSize: '0.95rem',
                lineHeight: 1.65,
                margin: '0 0 6px 0',
              }}
            >
              Department of Electronics and Communication
            </p>
            <p
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                color: '#A08060',
                fontSize: '0.88rem',
                margin: 0,
              }}
            >
              Suguna College of Engineering
            </p>
          </div>

          {/* ── MIDDLE: Quick Links ──────────────────────────────────── */}
          <div>
            <h4
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                color: '#FF8C00',
                fontSize: '1.05rem',
                fontWeight: '800',
                marginBottom: '18px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textShadow: '0 0 8px rgba(255,140,0,0.4)',
              }}
            >
              Quick Links
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {quickLinks.map(link => (
                <button
                  key={link.path}
                  onClick={() => navigate({ to: link.path })}
                  style={{
                    display: 'block',
                    background: 'none',
                    border: 'none',
                    color: '#C8A870',
                    fontFamily: '"Times New Roman", Times, serif',
                    fontSize: '0.97rem',
                    cursor: 'pointer',
                    padding: '5px 0',
                    textAlign: 'left',
                    transition: 'color 0.2s, text-shadow 0.2s',
                    letterSpacing: '0.03em',
                  }}
                  onMouseEnter={e => {
                    const el = e.target as HTMLElement;
                    el.style.color = '#FF8C00';
                    el.style.textShadow = '0 0 8px rgba(255,140,0,0.5)';
                  }}
                  onMouseLeave={e => {
                    const el = e.target as HTMLElement;
                    el.style.color = '#C8A870';
                    el.style.textShadow = 'none';
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* ── RIGHT: Contact ───────────────────────────────────────── */}
          <div>
            <h4
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                color: '#FF8C00',
                fontSize: '1.05rem',
                fontWeight: '800',
                marginBottom: '18px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textShadow: '0 0 8px rgba(255,140,0,0.4)',
              }}
            >
              Contact
            </h4>

            {/* Convenor */}
            <div style={{ marginBottom: '14px' }}>
              <p style={labelStyle}>Convenor</p>
              <p style={nameStyle}>Mr. Ananda Kumar K M.E</p>
              <p style={roleStyle}>Assistant Professor &amp; HoD - ECE</p>
            </div>

            {/* Faculty Co-ordinator */}
            <div style={{ marginBottom: '14px' }}>
              <p style={labelStyle}>Faculty Co-ordinator</p>
              <p style={nameStyle}>Mr. Idayavan S M.E</p>
              <p style={roleStyle}>Assistant Professor - ECE</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <Phone size={13} color="rgba(255,140,0,0.7)" />
                <a
                  href="tel:9488846518"
                  style={{
                    fontFamily: '"Times New Roman", Times, serif',
                    color: 'rgba(255, 180, 80, 0.9)',
                    fontSize: '0.92rem',
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                  }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = '#FFD700')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255, 180, 80, 0.9)')}
                >
                  9488846518
                </a>
              </div>
            </div>

            {/* Student Co-ordinators */}
            <div>
              <p style={labelStyle}>Student Co-ordinators</p>
              {[
                { name: 'Sakthikrishnan S', phone: '8838204730' },
                { name: 'Manosri S V', phone: '9449143918' },
                { name: 'Ayyanar', phone: '7397057124' },
              ].map(({ name, phone }) => (
                <div
                  key={phone}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}
                >
                  <span style={nameStyle}>{name} –</span>
                  <a
                    href={`tel:${phone}`}
                    style={{
                      fontFamily: '"Times New Roman", Times, serif',
                      color: 'rgba(255, 180, 80, 0.9)',
                      fontSize: '0.92rem',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                    }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = '#FFD700')}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255, 180, 80, 0.9)')}
                  >
                    {phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.45), rgba(255,215,0,0.2), rgba(255,106,0,0.45), transparent)',
            marginBottom: '24px',
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              color: '#806040',
              fontSize: '0.84rem',
              margin: 0,
            }}
          >
            © {year} VibECX-2K26 · Suguna College of Engineering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
