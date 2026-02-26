import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useRegistration } from '../contexts/RegistrationContext';
import CircuitPattern from '../components/CircuitPattern';
import CountdownTimer from '../components/CountdownTimer';
import { AlertCircle } from 'lucide-react';

type EventType = 'technical' | 'non-technical' | 'both';

const BASE_PRICE = 149;
const EXTRA_PRICE = 25;

export default function Register() {
  const navigate = useNavigate();
  const { setRegistration } = useRegistration();

  const [form, setForm] = useState({
    name: '',
    college: '',
    department: '',
    year: '',
    email: '',
    phone: '',
    eventType: 'both' as EventType,
    numberOfMembers: 1,
  });
  const [additionalEventChecked, setAdditionalEventChecked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // MUTUALLY EXCLUSIVE fee logic:
  // Checkbox OFF → total = BASE_PRICE × members, additionalFee display = ₹0
  // Checkbox ON  → total = EXTRA_PRICE × members, additionalFee display = ₹(EXTRA_PRICE × members)
  const additionalFeeDisplay = additionalEventChecked ? EXTRA_PRICE * form.numberOfMembers : 0;
  const total = additionalEventChecked
    ? EXTRA_PRICE * form.numberOfMembers
    : BASE_PRICE * form.numberOfMembers;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.college.trim()) newErrors.college = 'College is required';
    if (!form.department.trim()) newErrors.department = 'Department is required';
    if (!form.year) newErrors.year = 'Year of study is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) newErrors.phone = 'Enter a valid 10-digit phone number';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Save total amount to localStorage before navigating to Payment page
    localStorage.setItem('vibecxAmount', total.toString());

    setRegistration({
      name: form.name,
      college: form.college,
      department: form.department,
      year: form.year,
      email: form.email,
      phone: form.phone,
      eventType: form.eventType,
      numberOfMembers: form.numberOfMembers,
      totalAmount: total,
    });
    navigate({ to: '/payment' });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,106,0,0.3)',
    borderRadius: '8px',
    color: '#F0E0C0',
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '1rem',
    padding: '12px 16px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#FF8C00',
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '0.95rem',
    fontWeight: '700',
    marginBottom: '8px',
    letterSpacing: '0.05em',
  };

  const errorStyle: React.CSSProperties = {
    color: '#FF4444',
    fontSize: '0.85rem',
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  return (
    <div style={{ background: '#000000', minHeight: '100vh', fontFamily: '"Times New Roman", Times, serif', padding: '60px 24px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px', position: 'relative' }}>
          <CircuitPattern opacity={0.05} />

          {/* Countdown Timer — above "Register Now" heading */}
          <CountdownTimer />

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
            Register Now
          </h1>
          <div style={{
            width: '150px', height: '3px',
            background: 'linear-gradient(90deg, transparent, #FF6A00, #FF2200, #FF6A00, transparent)',
            margin: '0 auto 16px',
            boxShadow: '0 0 12px #FF4500',
          }} />
          <p style={{ color: '#A08060', fontSize: '1rem' }}>
            VibECX-2K26 · Suguna College of Engineering
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,106,0,0.25)',
          borderRadius: '16px',
          padding: '40px 36px',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {/* Name */}
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your full name"
                style={{ ...inputStyle, borderColor: errors.name ? '#FF4444' : 'rgba(255,106,0,0.3)' }}
                onFocus={e => { e.target.style.borderColor = '#FF6A00'; e.target.style.boxShadow = '0 0 0 2px rgba(255,106,0,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = errors.name ? '#FF4444' : 'rgba(255,106,0,0.3)'; e.target.style.boxShadow = 'none'; }}
              />
              {errors.name && <div style={errorStyle}><AlertCircle size={14} />{errors.name}</div>}
            </div>

            {/* College */}
            <div>
              <label style={labelStyle}>College *</label>
              <input
                type="text"
                value={form.college}
                onChange={e => setForm({ ...form, college: e.target.value })}
                placeholder="Enter your college name"
                style={{ ...inputStyle, borderColor: errors.college ? '#FF4444' : 'rgba(255,106,0,0.3)' }}
                onFocus={e => { e.target.style.borderColor = '#FF6A00'; e.target.style.boxShadow = '0 0 0 2px rgba(255,106,0,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = errors.college ? '#FF4444' : 'rgba(255,106,0,0.3)'; e.target.style.boxShadow = 'none'; }}
              />
              {errors.college && <div style={errorStyle}><AlertCircle size={14} />{errors.college}</div>}
            </div>

            {/* Department */}
            <div>
              <label style={labelStyle}>Department *</label>
              <input
                type="text"
                value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })}
                placeholder="e.g. ECE, CSE, EEE"
                style={{ ...inputStyle, borderColor: errors.department ? '#FF4444' : 'rgba(255,106,0,0.3)' }}
                onFocus={e => { e.target.style.borderColor = '#FF6A00'; e.target.style.boxShadow = '0 0 0 2px rgba(255,106,0,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = errors.department ? '#FF4444' : 'rgba(255,106,0,0.3)'; e.target.style.boxShadow = 'none'; }}
              />
              {errors.department && <div style={errorStyle}><AlertCircle size={14} />{errors.department}</div>}
            </div>

            {/* Year */}
            <div>
              <label style={labelStyle}>Year of Study *</label>
              <select
                value={form.year}
                onChange={e => setForm({ ...form, year: e.target.value })}
                style={{ ...inputStyle, borderColor: errors.year ? '#FF4444' : 'rgba(255,106,0,0.3)', cursor: 'pointer' }}
                onFocus={e => { e.target.style.borderColor = '#FF6A00'; e.target.style.boxShadow = '0 0 0 2px rgba(255,106,0,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = errors.year ? '#FF4444' : 'rgba(255,106,0,0.3)'; e.target.style.boxShadow = 'none'; }}
              >
                <option value="" style={{ background: '#111' }}>Select Year</option>
                <option value="1" style={{ background: '#111' }}>1st Year</option>
                <option value="2" style={{ background: '#111' }}>2nd Year</option>
                <option value="3" style={{ background: '#111' }}>3rd Year</option>
                <option value="4" style={{ background: '#111' }}>4th Year</option>
              </select>
              {errors.year && <div style={errorStyle}><AlertCircle size={14} />{errors.year}</div>}
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>E-mail *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                style={{ ...inputStyle, borderColor: errors.email ? '#FF4444' : 'rgba(255,106,0,0.3)' }}
                onFocus={e => { e.target.style.borderColor = '#FF6A00'; e.target.style.boxShadow = '0 0 0 2px rgba(255,106,0,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = errors.email ? '#FF4444' : 'rgba(255,106,0,0.3)'; e.target.style.boxShadow = 'none'; }}
              />
              {errors.email && <div style={errorStyle}><AlertCircle size={14} />{errors.email}</div>}
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="10-digit mobile number"
                style={{ ...inputStyle, borderColor: errors.phone ? '#FF4444' : 'rgba(255,106,0,0.3)' }}
                onFocus={e => { e.target.style.borderColor = '#FF6A00'; e.target.style.boxShadow = '0 0 0 2px rgba(255,106,0,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = errors.phone ? '#FF4444' : 'rgba(255,106,0,0.3)'; e.target.style.boxShadow = 'none'; }}
              />
              {errors.phone && <div style={errorStyle}><AlertCircle size={14} />{errors.phone}</div>}
            </div>

            {/* Event Type */}
            <div>
              <label style={labelStyle}>Select Event Type *</label>
              <select
                value={form.eventType}
                onChange={e => setForm({ ...form, eventType: e.target.value as EventType })}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => { e.target.style.borderColor = '#FF6A00'; e.target.style.boxShadow = '0 0 0 2px rgba(255,106,0,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,106,0,0.3)'; e.target.style.boxShadow = 'none'; }}
              >
                <option value="technical" style={{ background: '#111' }}>Technical Events Only</option>
                <option value="non-technical" style={{ background: '#111' }}>Non-Technical Events Only</option>
                <option value="both" style={{ background: '#111' }}>Both (Technical + Non-Technical)</option>
              </select>
            </div>

            {/* Number of Members */}
            <div>
              <label style={labelStyle}>Number of Members *</label>
              <select
                value={form.numberOfMembers}
                onChange={e => setForm({ ...form, numberOfMembers: parseInt(e.target.value) })}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => { e.target.style.borderColor = '#FF6A00'; e.target.style.boxShadow = '0 0 0 2px rgba(255,106,0,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,106,0,0.3)'; e.target.style.boxShadow = 'none'; }}
              >
                {[1, 2, 3, 4].map(n => (
                  <option key={n} value={n} style={{ background: '#111' }}>{n} Member{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Event Fee Checkbox Section */}
          <div style={{
            marginTop: '28px',
            background: 'rgba(255,60,0,0.05)',
            border: '1px solid rgba(255,80,0,0.35)',
            borderRadius: '10px',
            padding: '18px 24px',
            boxShadow: additionalEventChecked ? '0 0 16px rgba(255,80,0,0.25)' : 'none',
            transition: 'box-shadow 0.3s ease',
          }}>
            <p style={{
              color: '#FF8C00',
              fontSize: '0.85rem',
              fontWeight: '700',
              margin: '0 0 14px 0',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: '"Times New Roman", Times, serif',
            }}>
              Additional Event Fee
            </p>

            {/* Checkbox Row */}
            <label
              htmlFor="additionalEventCheckbox"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {/* Custom styled checkbox */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <input
                  id="additionalEventCheckbox"
                  type="checkbox"
                  checked={additionalEventChecked}
                  onChange={e => setAdditionalEventChecked(e.target.checked)}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    width: '22px',
                    height: '22px',
                    border: additionalEventChecked
                      ? '2px solid #FF4500'
                      : '2px solid rgba(255,106,0,0.6)',
                    borderRadius: '5px',
                    background: additionalEventChecked
                      ? 'linear-gradient(135deg, #FF6A00, #FF2200)'
                      : 'rgba(255,255,255,0.04)',
                    cursor: 'pointer',
                    display: 'block',
                    boxShadow: additionalEventChecked
                      ? '0 0 10px rgba(255,69,0,0.7), 0 0 20px rgba(255,69,0,0.35)'
                      : '0 0 6px rgba(255,106,0,0.2)',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                  }}
                  onFocus={e => {
                    (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(255,80,0,0.4), 0 0 12px rgba(255,69,0,0.5)';
                  }}
                  onBlur={e => {
                    (e.target as HTMLInputElement).style.boxShadow = additionalEventChecked
                      ? '0 0 10px rgba(255,69,0,0.7), 0 0 20px rgba(255,69,0,0.35)'
                      : '0 0 6px rgba(255,106,0,0.2)';
                  }}
                />
                {/* Checkmark */}
                {additionalEventChecked && (
                  <svg
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                    }}
                    width="13"
                    height="10"
                    viewBox="0 0 13 10"
                    fill="none"
                  >
                    <path
                      d="M1.5 5L5 8.5L11.5 1.5"
                      stroke="#FFFFFF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              {/* Label text */}
              <span style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '1.05rem',
                fontWeight: '700',
                color: additionalEventChecked ? '#FF8C00' : '#C8A870',
                textShadow: additionalEventChecked ? '0 0 8px rgba(255,106,0,0.5)' : 'none',
                transition: 'color 0.2s ease, text-shadow 0.2s ease',
                letterSpacing: '0.02em',
              }}>
                Add Additional Event{' '}
                <span style={{
                  color: additionalEventChecked ? '#FFD700' : '#A08060',
                  fontStyle: 'italic',
                }}>
                  (+₹25 per member)
                </span>
              </span>
            </label>
          </div>

          {/* Pricing Info */}
          <div style={{
            marginTop: '20px',
            background: 'rgba(255,106,0,0.06)',
            border: '1px solid rgba(255,106,0,0.3)',
            borderRadius: '10px',
            padding: '20px 24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              {/* Left: Fee breakdown */}
              <div style={{ flex: '1', minWidth: '220px' }}>
                <p style={{
                  color: '#FF8C00',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  margin: '0 0 10px 0',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  Fee Breakdown
                </p>

                {/* Line 1: Base Registration Fee */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <div>
                    <span style={{ color: '#C8A870', fontSize: '0.92rem' }}>Base Registration</span>
                    <span style={{ color: '#7A6040', fontSize: '0.78rem', display: 'block', marginTop: '1px' }}>
                      ₹149 × {form.numberOfMembers} member{form.numberOfMembers > 1 ? 's' : ''}
                    </span>
                  </div>
                  <span style={{ color: additionalEventChecked ? '#4A3820' : '#C8A870', fontSize: '0.92rem', fontWeight: '600', marginLeft: '16px' }}>
                    {additionalEventChecked ? '—' : `₹${BASE_PRICE * form.numberOfMembers}`}
                  </span>
                </div>

                {/* Line 2: Additional Event Fee */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                  <div>
                    <span style={{ color: '#C8A870', fontSize: '0.92rem' }}>Additional Event</span>
                    <span style={{ color: '#7A6040', fontSize: '0.78rem', display: 'block', marginTop: '1px' }}>
                      ₹25 × {form.numberOfMembers} member{form.numberOfMembers > 1 ? 's' : ''}
                    </span>
                  </div>
                  <span style={{ color: additionalEventChecked ? '#FFD700' : '#4A3820', fontSize: '0.92rem', fontWeight: '600', marginLeft: '16px' }}>
                    {additionalEventChecked ? `₹${additionalFeeDisplay}` : '—'}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(255,106,0,0.2)', marginBottom: '10px' }} />

                {/* Total line */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#FF8C00', fontSize: '0.95rem', fontWeight: '700' }}>Total</span>
                  <span style={{ color: '#FFD700', fontSize: '1.1rem', fontWeight: '800' }}>₹{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              marginTop: '32px',
              width: '100%',
              background: 'linear-gradient(135deg, #FF6A00, #FF2200)',
              border: 'none',
              borderRadius: '10px',
              color: '#FFFFFF',
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: '1.15rem',
              fontWeight: '800',
              padding: '16px',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(255,106,0,0.4)',
              transition: 'all 0.3s ease',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(255,106,0,0.6)';
              (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(255,106,0,0.4)';
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            Proceed to Payment — ₹{total}
          </button>
        </form>
      </div>
    </div>
  );
}
