import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const DEADLINE = new Date('March 10, 2026 23:59:59').getTime();

function calculateTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const distance = DEADLINE - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerStyle: React.CSSProperties = {
    background: 'rgba(20, 8, 0, 0.72)',
    border: '1.5px solid rgba(255, 106, 0, 0.55)',
    borderRadius: '16px',
    padding: '28px 32px 24px',
    marginBottom: '36px',
    textAlign: 'center',
    boxShadow:
      '0 0 24px rgba(255, 80, 0, 0.35), 0 0 60px rgba(255, 60, 0, 0.15), inset 0 0 30px rgba(255, 60, 0, 0.06)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    position: 'relative',
    overflow: 'hidden',
  };

  const titleStyle: React.CSSProperties = {
    color: '#ff7a00',
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '20px',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '20px',
    letterSpacing: '0.04em',
    textShadow: '0 0 12px rgba(255, 122, 0, 0.5)',
  };

  const blocksWrapperStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  };

  const blockStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '72px',
  };

  const numberStyle: React.CSSProperties = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '42px',
    fontWeight: '900',
    color: '#ffae00',
    lineHeight: '1',
    textShadow:
      '0 0 15px rgba(255, 120, 0, 0.8), 0 0 30px rgba(255, 80, 0, 0.5), 0 0 50px rgba(255, 60, 0, 0.3)',
    letterSpacing: '0.02em',
  };

  const unitLabelStyle: React.CSSProperties = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '12px',
    fontWeight: '700',
    color: '#ff7a00',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginTop: '6px',
    textShadow: '0 0 8px rgba(255, 122, 0, 0.4)',
  };

  const separatorStyle: React.CSSProperties = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '32px',
    fontWeight: '900',
    color: '#ff5500',
    textShadow: '0 0 12px rgba(255, 80, 0, 0.7)',
    marginBottom: '18px',
    lineHeight: '1',
    alignSelf: 'flex-end',
    paddingBottom: '4px',
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div style={containerStyle}>
      {/* Subtle top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #FF6A00, #FF2200, #FF6A00, transparent)',
        boxShadow: '0 0 10px #FF4500',
        borderRadius: '2px',
      }} />

      <p style={titleStyle}>🔥 Registration Deadline: 10/03/2026</p>

      <div style={blocksWrapperStyle}>
        <div style={blockStyle}>
          <span style={numberStyle}>{pad(timeLeft.days)}</span>
          <span style={unitLabelStyle}>Days</span>
        </div>

        <span style={separatorStyle}>:</span>

        <div style={blockStyle}>
          <span style={numberStyle}>{pad(timeLeft.hours)}</span>
          <span style={unitLabelStyle}>Hours</span>
        </div>

        <span style={separatorStyle}>:</span>

        <div style={blockStyle}>
          <span style={numberStyle}>{pad(timeLeft.minutes)}</span>
          <span style={unitLabelStyle}>Minutes</span>
        </div>

        <span style={separatorStyle}>:</span>

        <div style={blockStyle}>
          <span style={numberStyle}>{pad(timeLeft.seconds)}</span>
          <span style={unitLabelStyle}>Seconds</span>
        </div>
      </div>
    </div>
  );
}
