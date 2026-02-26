import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { Menu, X, Zap } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Technical', path: '/technical' },
    { label: 'Non-Technical', path: '/non-technical' },
    { label: 'Register', path: '/register' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNav = (path: string) => {
    navigate({ to: path });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: scrolled
        ? 'rgba(0,0,0,0.97)'
        : 'rgba(0,0,0,0.85)',
      borderBottom: '1px solid rgba(255,106,0,0.3)',
      boxShadow: scrolled ? '0 4px 30px rgba(255,106,0,0.15)' : 'none',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '70px',
      }}>
        {/* Brand */}
        <button
          onClick={() => handleNav('/')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}
        >
          <Zap size={24} color="#FF6A00" style={{ filter: 'drop-shadow(0 0 8px #FF4500)' }} />
          <span style={{
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: '1.5rem', fontWeight: '900',
            background: 'linear-gradient(135deg, #FFD700, #FF6A00, #FF2200)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 8px #FF4500)',
            letterSpacing: '0.05em',
          }}>
            VibECX-2K26
          </span>
        </button>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
          className="hidden md:flex">
          {navLinks.map(link => (
            <button
              key={link.path}
              onClick={() => handleNav(link.path)}
              style={{
                background: isActive(link.path)
                  ? 'linear-gradient(135deg, rgba(255,106,0,0.2), rgba(255,34,0,0.2))'
                  : 'none',
                border: isActive(link.path)
                  ? '1px solid rgba(255,106,0,0.6)'
                  : '1px solid transparent',
                borderRadius: '6px',
                color: isActive(link.path) ? '#FF8C00' : '#E8D5B0',
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '1rem',
                fontWeight: isActive(link.path) ? '700' : '500',
                padding: '8px 18px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.05em',
                textShadow: isActive(link.path) ? '0 0 10px #FF6A00' : 'none',
              }}
              onMouseEnter={e => {
                if (!isActive(link.path)) {
                  (e.target as HTMLButtonElement).style.color = '#FF8C00';
                  (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,106,0,0.4)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.path)) {
                  (e.target as HTMLButtonElement).style.color = '#E8D5B0';
                  (e.target as HTMLButtonElement).style.borderColor = 'transparent';
                }
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: 'none', border: '1px solid rgba(255,106,0,0.4)',
            borderRadius: '6px', padding: '8px', cursor: 'pointer',
            color: '#FF6A00',
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(0,0,0,0.98)',
          borderTop: '1px solid rgba(255,106,0,0.2)',
          padding: '16px 24px',
        }}
          className="md:hidden">
          {navLinks.map(link => (
            <button
              key={link.path}
              onClick={() => handleNav(link.path)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: isActive(link.path) ? 'rgba(255,106,0,0.1)' : 'none',
                border: 'none',
                borderLeft: isActive(link.path) ? '3px solid #FF6A00' : '3px solid transparent',
                color: isActive(link.path) ? '#FF8C00' : '#E8D5B0',
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '1.1rem',
                fontWeight: isActive(link.path) ? '700' : '500',
                padding: '12px 16px',
                cursor: 'pointer',
                marginBottom: '4px',
                borderRadius: '0 6px 6px 0',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
