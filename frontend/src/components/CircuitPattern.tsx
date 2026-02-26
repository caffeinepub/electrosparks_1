import React from 'react';

interface CircuitPatternProps {
  opacity?: number;
}

export default function CircuitPattern({ opacity = 0.06 }: CircuitPatternProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity,
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <pattern id="circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Horizontal lines */}
            <line x1="0" y1="30" x2="40" y2="30" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="80" y1="30" x2="120" y2="30" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="0" y1="90" x2="50" y2="90" stroke="#FF4500" strokeWidth="1"/>
            <line x1="70" y1="90" x2="120" y2="90" stroke="#FF4500" strokeWidth="1"/>
            {/* Vertical lines */}
            <line x1="30" y1="0" x2="30" y2="20" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="30" y1="40" x2="30" y2="80" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="30" y1="100" x2="30" y2="120" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="90" y1="0" x2="90" y2="60" stroke="#FF4500" strokeWidth="1"/>
            <line x1="90" y1="100" x2="90" y2="120" stroke="#FF4500" strokeWidth="1"/>
            {/* IC chip */}
            <rect x="40" y="20" width="40" height="20" fill="none" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="48" y1="20" x2="48" y2="15" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="56" y1="20" x2="56" y2="15" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="64" y1="20" x2="64" y2="15" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="72" y1="20" x2="72" y2="15" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="48" y1="40" x2="48" y2="45" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="56" y1="40" x2="56" y2="45" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="64" y1="40" x2="64" y2="45" stroke="#FF6A00" strokeWidth="1"/>
            <line x1="72" y1="40" x2="72" y2="45" stroke="#FF6A00" strokeWidth="1"/>
            {/* Dots */}
            <circle cx="30" cy="30" r="3" fill="#FF6A00"/>
            <circle cx="90" cy="90" r="3" fill="#FF4500"/>
            <circle cx="30" cy="90" r="2" fill="#FF6A00" fillOpacity="0.6"/>
            <circle cx="90" cy="30" r="2" fill="#FF4500" fillOpacity="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)"/>
      </svg>
    </div>
  );
}
