import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Zap, Heart, Phone } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'vibecx-2k26');

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Technical', path: '/technical' },
    { label: 'Non-Technical', path: '/non-technical' },
    { label: 'Register', path: '/register' },
    { label: 'Contact', path: '/contact' },
  ];

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
            <p
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                color: '#FFD700',
                fontSize: '0.95rem',
                fontWeight: '700',
                margin: '0 0 8px 0',
                letterSpacing: '0.04em',
              }}
            >
              Faculty Co-ordinator
            </p>
            <p
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                color: '#C8A870',
                fontSize: '0.92rem',
                margin: '0 0 6px 0',
              }}
            >
              Mr. Idayavan.S M.E
            </p>
            <p
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                color: '#A08060',
                fontSize: '0.88rem',
                margin: '0 0 4px 0',
              }}
            >
              Assistant Professor-ECE
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
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
          <p
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              color: '#806040',
              fontSize: '0.84rem',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Built with{' '}
            <Heart size={13} color="#FF4500" fill="#FF4500" />
            {' '}using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#FF8C00', textDecoration: 'none' }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#FFD700')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = '#FF8C00')}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
