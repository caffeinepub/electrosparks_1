import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import CircuitPattern from '../components/CircuitPattern';
import { CheckCircle, Home, Mail } from 'lucide-react';

export default function Success() {
  const navigate = useNavigate();

  // No registration context needed here — just show success
  // Guard: if user navigates directly, they still see the success page
  // (registration was cleared after submit)

  return (
    <div style={{
      background: '#000000',
      minHeight: '100vh',
      fontFamily: '"Times New Roman", Times, serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 24px',
      position: 'relative',
    }}>
      <CircuitPattern opacity={0.06} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,106,0,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Success Icon */}
        <div style={{
          width: '100px', height: '100px',
          background: 'rgba(255,106,0,0.1)',
          border: '2px solid rgba(255,106,0,0.4)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 32px',
          boxShadow: '0 0 40px rgba(255,106,0,0.2)',
        }}>
          <CheckCircle size={52} color="#FF8C00" style={{ filter: 'drop-shadow(0 0 12px #FF6A00)' }} />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
          fontWeight: '900',
          margin: '0 0 16px 0',
          background: 'linear-gradient(135deg, #FFD700, #FF8C00, #FF4500)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 20px rgba(255,106,0,0.4))',
          lineHeight: 1.2,
        }}>
          Registration Successful!
        </h1>

        {/* Divider */}
        <div style={{
          width: '200px', height: '3px',
          background: 'linear-gradient(90deg, transparent, #FF6A00, #FF2200, #FF6A00, transparent)',
          margin: '0 auto 28px',
          boxShadow: '0 0 12px #FF4500',
        }} />

        {/* Message */}
        <div style={{
          background: 'rgba(255,106,0,0.05)',
          border: '1px solid rgba(255,106,0,0.25)',
          borderRadius: '12px',
          padding: '28px 32px',
          marginBottom: '36px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
            <Mail size={22} color="#FF8C00" />
            <p style={{ color: '#FF8C00', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>
              Confirmation will be sent via email.
            </p>
          </div>
          <p style={{ color: '#A08060', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>
            Thank you for registering for <strong style={{ color: '#FF8C00' }}>VibECX-2K26</strong>!
            Your registration has been received. Our team will verify your payment and send a confirmation to your registered email address.
          </p>
        </div>

        {/* Event Info */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,106,0,0.2)',
          borderRadius: '10px',
          padding: '20px 24px',
          marginBottom: '36px',
        }}>
          <p style={{ color: '#C8A870', fontSize: '1rem', margin: '0 0 6px 0', fontWeight: '600' }}>
            VibECX-2K26
          </p>
          <p style={{ color: '#A08060', fontSize: '0.9rem', margin: 0 }}>
            Department of Electronics and Communication Engineering
          </p>
          <p style={{ color: '#A08060', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
            Suguna College of Engineering
          </p>
        </div>

        {/* Home Button */}
        <button
          onClick={() => navigate({ to: '/' })}
          style={{
            background: 'linear-gradient(135deg, #FF6A00, #FF2200)',
            border: 'none',
            borderRadius: '10px',
            color: '#FFFFFF',
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: '1.1rem',
            fontWeight: '700',
            padding: '14px 40px',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(255,106,0,0.4)',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
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
          <Home size={18} /> Back to Home
        </button>
      </div>
    </div>
  );
}
