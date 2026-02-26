import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useRegistration } from '../contexts/RegistrationContext';
import CircuitPattern from '../components/CircuitPattern';
import { Upload, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useActor } from '../hooks/useActor';
import { EventType } from '../backend';

export default function Payment() {
  const navigate = useNavigate();
  const { registration, clearRegistration } = useRegistration();
  const { actor } = useActor();

  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Amount loaded from localStorage (set by Register page on "Proceed to Payment")
  const [qrAmount, setQrAmount] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load the saved amount from localStorage on mount — no recalculation here
  useEffect(() => {
    const savedAmount = localStorage.getItem('vibecxAmount');
    if (savedAmount) {
      setQrAmount(savedAmount);
    }
  }, []);

  // Guard: redirect if no registration data
  useEffect(() => {
    if (!registration) {
      navigate({ to: '/register' });
    }
  }, [registration, navigate]);

  if (!registration) return null;

  // Displayed amount: prefer localStorage value (source of truth from Register page),
  // fall back to context value if localStorage is somehow empty
  const displayAmount = qrAmount || registration.totalAmount.toString();

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setError('Only JPG/PNG files are accepted.');
      return;
    }
    setError('');
    setScreenshot(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const mapEventType = (et: string): EventType => {
    if (et === 'technical') return EventType.workshop;
    if (et === 'non-technical') return EventType.seminar;
    return EventType.competition;
  };

  const handleSubmit = async () => {
    if (!screenshot || !registration || !actor) return;
    setSubmitting(true);
    setError('');
    try {
      await actor.submitRegistration(
        registration.name,
        registration.college,
        registration.department,
        BigInt(parseInt(registration.year)),
        registration.email,
        registration.phone,
        mapEventType(registration.eventType),
        BigInt(registration.numberOfMembers),
        BigInt(registration.totalAmount),
        screenshot.name,
      );
      // Clear the localStorage amount after successful submission
      localStorage.removeItem('vibecxAmount');
      clearRegistration();
      navigate({ to: '/success' });
    } catch (err: unknown) {
      console.error(err);
      setError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#000000', minHeight: '100vh', fontFamily: '"Times New Roman", Times, serif', padding: '60px 24px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px', position: 'relative' }}>
          <CircuitPattern opacity={0.05} />
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '900',
            margin: '0 0 12px 0',
            background: 'linear-gradient(135deg, #FFD700, #FF8C00, #FF4500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(255,106,0,0.4))',
          }}>
            Complete Payment
          </h1>
          <div style={{
            width: '150px', height: '3px',
            background: 'linear-gradient(90deg, transparent, #FF6A00, #FF2200, #FF6A00, transparent)',
            margin: '0 auto 16px',
            boxShadow: '0 0 12px #FF4500',
          }} />
        </div>

        {/* Amount Summary */}
        <div style={{
          background: 'rgba(255,106,0,0.06)',
          border: '1px solid rgba(255,106,0,0.3)',
          borderRadius: '12px',
          padding: '24px 28px',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <p style={{ color: '#A08060', fontSize: '0.9rem', margin: '0 0 4px 0' }}>Registrant</p>
            <p style={{ color: '#F0E0C0', fontSize: '1.1rem', fontWeight: '700', margin: '0 0 8px 0' }}>{registration.name}</p>
            <p style={{ color: '#A08060', fontSize: '0.9rem', margin: '0 0 2px 0' }}>
              Event: <span style={{ color: '#C8A870' }}>{registration.eventType === 'both' ? 'Technical + Non-Technical' : registration.eventType === 'technical' ? 'Technical' : 'Non-Technical'}</span>
            </p>
            <p style={{ color: '#A08060', fontSize: '0.9rem', margin: 0 }}>
              Members: <span style={{ color: '#C8A870' }}>{registration.numberOfMembers}</span>
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: '#A08060', fontSize: '0.9rem', margin: '0 0 4px 0' }}>Amount to Pay</p>
            <p style={{
              color: '#FFD700',
              fontSize: '2.5rem',
              fontWeight: '900',
              margin: 0,
              textShadow: '0 0 20px rgba(255,215,0,0.5)',
            }}>
              ₹{displayAmount}
            </p>
          </div>
        </div>

        {/* QR Code Section */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,106,0,0.25)',
          borderRadius: '12px',
          padding: '36px 28px',
          textAlign: 'center',
          marginBottom: '28px',
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,106,0,0.08)',
            border: '1px solid rgba(255,106,0,0.3)',
            borderRadius: '8px',
            padding: '6px 20px',
            marginBottom: '20px',
          }}>
            <span style={{ color: '#FF8C00', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '700' }}>
              PhonePe · Accepted Here
            </span>
          </div>

          <p style={{ color: '#C8A870', fontSize: '1.1rem', fontWeight: '600', marginBottom: '24px' }}>
            Scan &amp; Pay Using PhonePe App
          </p>

          {/* PhonePe QR Image */}
          <div style={{
            display: 'inline-block',
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 0 30px rgba(255,106,0,0.2)',
            border: '2px solid rgba(255,106,0,0.3)',
          }}>
            <img
              src="/assets/generated/phonepe-qr.dim_600x800.png"
              alt="PhonePe QR Code - Scan to Pay"
              style={{
                width: '260px',
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '6px',
              }}
              onError={e => {
                (e.target as HTMLImageElement).src = '/assets/generated/qr-placeholder.dim_300x300.png';
              }}
            />
          </div>

          {/* QR Amount Display — synced from Registration page via localStorage */}
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: '#A08060', fontSize: '0.85rem', margin: '0 0 6px 0', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Amount to Scan &amp; Pay
            </p>
            <span
              id="qrAmount"
              style={{
                display: 'inline-block',
                color: '#FFD700',
                fontSize: '2rem',
                fontWeight: '900',
                textShadow: '0 0 16px rgba(255,215,0,0.6), 0 0 32px rgba(255,106,0,0.3)',
                letterSpacing: '0.02em',
              }}
            >
              {displayAmount ? `₹${displayAmount}` : 'Amount not available'}
            </span>
            {/* Hidden input holding the raw numeric amount from localStorage */}
            <input
              type="hidden"
              id="paymentAmountInput"
              value={displayAmount}
              readOnly
            />
          </div>

          <p style={{ color: '#806040', fontSize: '0.85rem', marginTop: '12px' }}>
            Pay ₹{displayAmount} and upload the payment screenshot below
          </p>
        </div>

        {/* Screenshot Upload */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,106,0,0.25)',
          borderRadius: '12px',
          padding: '28px',
          marginBottom: '28px',
        }}>
          <h3 style={{ color: '#FF8C00', fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', letterSpacing: '0.05em' }}>
            Upload Payment Screenshot *
          </h3>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragOver ? '#FF6A00' : screenshot ? 'rgba(255,106,0,0.5)' : 'rgba(255,106,0,0.25)'}`,
              borderRadius: '10px',
              padding: '40px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragOver ? 'rgba(255,106,0,0.06)' : screenshot ? 'rgba(255,106,0,0.04)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              style={{ display: 'none' }}
              onChange={e => handleFileChange(e.target.files?.[0] || null)}
            />
            {screenshot ? (
              <div>
                <CheckCircle size={40} color="#FF8C00" style={{ marginBottom: '12px', filter: 'drop-shadow(0 0 8px #FF6A00)' }} />
                <p style={{ color: '#FF8C00', fontSize: '1rem', fontWeight: '700', margin: '0 0 4px 0' }}>
                  {screenshot.name}
                </p>
                <p style={{ color: '#A08060', fontSize: '0.85rem', margin: 0 }}>
                  {(screenshot.size / 1024).toFixed(1)} KB · Click to change
                </p>
              </div>
            ) : (
              <div>
                <Upload size={40} color="#FF6A00" style={{ marginBottom: '12px', opacity: 0.7 }} />
                <p style={{ color: '#C8A870', fontSize: '1rem', fontWeight: '600', margin: '0 0 6px 0' }}>
                  Click or drag & drop your screenshot here
                </p>
                <p style={{ color: '#806040', fontSize: '0.85rem', margin: 0 }}>
                  Accepted formats: JPG, PNG
                </p>
              </div>
            )}
          </div>

          {error && (
            <div style={{ color: '#FF4444', fontSize: '0.9rem', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!screenshot || submitting}
          style={{
            width: '100%',
            background: !screenshot || submitting
              ? 'rgba(255,106,0,0.2)'
              : 'linear-gradient(135deg, #FF6A00, #FF2200)',
            border: `1px solid ${!screenshot || submitting ? 'rgba(255,106,0,0.2)' : 'transparent'}`,
            borderRadius: '10px',
            color: !screenshot || submitting ? '#806040' : '#FFFFFF',
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: '1.15rem',
            fontWeight: '800',
            padding: '16px',
            cursor: !screenshot || submitting ? 'not-allowed' : 'pointer',
            boxShadow: !screenshot || submitting ? 'none' : '0 0 20px rgba(255,106,0,0.4)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            letterSpacing: '0.05em',
          }}
        >
          {submitting ? (
            <><Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> Submitting...</>
          ) : (
            'Confirm Registration'
          )}
        </button>

        <p style={{ color: '#806040', fontSize: '0.85rem', textAlign: 'center', marginTop: '16px' }}>
          * Screenshot upload is mandatory to complete registration
        </p>
      </div>
    </div>
  );
}
