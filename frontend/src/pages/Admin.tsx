import React, { useState } from 'react';
import { useAdminLogin } from '../hooks/useQueries';
import AdminDashboard from '../components/AdminDashboard';
import { Loader2, Lock, Eye, EyeOff, ShieldAlert } from 'lucide-react';

export default function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const adminLogin = useAdminLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      await adminLogin.mutateAsync({ username, password });
      setIsLoggedIn(true);
    } catch {
      setLoginError('Invalid Username or Password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setLoginError('');
  };

  if (isLoggedIn) {
    return <AdminDashboard isAuthenticated={isLoggedIn} onLogout={handleLogout} />;
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,106,0,0.3)',
    borderRadius: '8px',
    color: '#F0E0C0',
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '1rem',
    padding: '13px 16px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      background: '#000000',
      minHeight: '100vh',
      fontFamily: '"Times New Roman", Times, serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo / Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '72px',
            height: '72px',
            background: 'rgba(255,106,0,0.1)',
            border: '1px solid rgba(255,106,0,0.35)',
            borderRadius: '50%',
            marginBottom: '20px',
            boxShadow: '0 0 24px rgba(255,106,0,0.15)',
          }}>
            <Lock size={30} color="#FF8C00" />
          </div>
          <h1 style={{
            fontSize: '1.9rem',
            fontWeight: '900',
            margin: '0 0 8px 0',
            background: 'linear-gradient(135deg, #FFD700, #FF8C00, #FF4500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 12px rgba(255,106,0,0.3))',
          }}>
            Admin Access
          </h1>
          <p style={{ color: '#604030', fontSize: '0.9rem', margin: 0, letterSpacing: '0.05em' }}>
            VibECX-2K26 · Restricted Area
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,106,0,0.2)',
          borderRadius: '16px',
          padding: '36px 32px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        }}>
          <form onSubmit={handleLogin}>
            {/* Username */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#FF8C00',
                fontSize: '0.9rem',
                fontWeight: '700',
                marginBottom: '8px',
                letterSpacing: '0.05em',
              }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                required
                style={inputStyle}
                onFocus={e => {
                  e.target.style.borderColor = '#FF6A00';
                  e.target.style.boxShadow = '0 0 0 2px rgba(255,106,0,0.15)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,106,0,0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block',
                color: '#FF8C00',
                fontSize: '0.9rem',
                fontWeight: '700',
                marginBottom: '8px',
                letterSpacing: '0.05em',
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  style={{ ...inputStyle, paddingRight: '48px' }}
                  onFocus={e => {
                    e.target.style.borderColor = '#FF6A00';
                    e.target.style.boxShadow = '0 0 0 2px rgba(255,106,0,0.15)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,106,0,0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0',
                    color: '#A08060',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div style={{
                background: 'rgba(255,50,50,0.1)',
                border: '1px solid rgba(255,50,50,0.3)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px',
                color: '#FF5555',
                fontSize: '0.9rem',
                textAlign: 'center',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                <ShieldAlert size={16} />
                {loginError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={adminLogin.isPending || !username || !password}
              style={{
                width: '100%',
                background: adminLogin.isPending || !username || !password
                  ? 'rgba(255,106,0,0.15)'
                  : 'linear-gradient(135deg, #FF6A00, #FF2200)',
                border: adminLogin.isPending || !username || !password
                  ? '1px solid rgba(255,106,0,0.2)'
                  : '1px solid transparent',
                borderRadius: '10px',
                color: adminLogin.isPending || !username || !password ? '#604030' : '#FFFFFF',
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '1.05rem',
                fontWeight: '800',
                padding: '14px',
                cursor: adminLogin.isPending || !username || !password ? 'not-allowed' : 'pointer',
                boxShadow: adminLogin.isPending || !username || !password
                  ? 'none'
                  : '0 0 20px rgba(255,69,0,0.35)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                letterSpacing: '0.05em',
              }}
            >
              {adminLogin.isPending ? (
                <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Authenticating...</>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>

        <p style={{ color: '#2A1508', fontSize: '0.75rem', textAlign: 'center', marginTop: '24px', letterSpacing: '0.05em' }}>
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
