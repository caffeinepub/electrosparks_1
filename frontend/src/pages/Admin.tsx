import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Registration, EventType } from '../backend';
import { LogOut, Lock, User, Eye, EyeOff, RefreshCw, Shield } from 'lucide-react';

const ADMIN_USERNAME = 'VibECX-2K26';
const ADMIN_PASSWORD = 'VibECX@2K26';

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  const date = new Date(ms);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function formatEventType(et: EventType): string {
  switch (et) {
    case EventType.workshop: return 'Workshop';
    case EventType.competition: return 'Competition';
    case EventType.seminar: return 'Seminar';
    default: return String(et);
  }
}

// ─── Login Form ───────────────────────────────────────────────────────────────
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center circuit-bg"
      style={{ background: 'oklch(0.06 0.01 240)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.85 0.18 195 / 0.06) 0%, transparent 70%)',
        }}
      />

      <div
        className="relative w-full max-w-md mx-4 rounded-2xl p-8"
        style={{
          background: 'oklch(0.1 0.015 240 / 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid oklch(0.65 0.18 195 / 0.4)',
          boxShadow:
            '0 0 40px oklch(0.85 0.18 195 / 0.15), 0 0 80px oklch(0.85 0.18 195 / 0.05), inset 0 0 40px oklch(0.85 0.18 195 / 0.03)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{
              background: 'oklch(0.85 0.18 195 / 0.1)',
              border: '1px solid oklch(0.85 0.18 195 / 0.5)',
              boxShadow: '0 0 20px oklch(0.85 0.18 195 / 0.3)',
            }}
          >
            <Shield size={28} style={{ color: 'oklch(0.85 0.18 195)' }} />
          </div>
          <h1
            className="font-orbitron text-2xl font-bold tracking-widest mb-1"
            style={{
              color: 'oklch(0.92 0.22 195)',
              textShadow:
                '0 0 10px oklch(0.85 0.18 195 / 0.8), 0 0 20px oklch(0.85 0.18 195 / 0.5)',
            }}
          >
            ADMIN ACCESS
          </h1>
          <p className="font-rajdhani text-sm" style={{ color: 'oklch(0.55 0.05 220)' }}>
            VibECX-2K26 Control Panel
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label
              className="block font-mono-tech text-xs mb-2 tracking-widest"
              style={{ color: 'oklch(0.65 0.14 195)' }}
            >
              USERNAME
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'oklch(0.55 0.1 195)' }}
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                className="w-full pl-10 pr-4 py-3 rounded-lg font-mono-tech text-sm"
                style={{
                  background: 'oklch(0.08 0.01 240)',
                  border: '1px solid oklch(0.3 0.06 195 / 0.5)',
                  color: 'oklch(0.9 0.05 200)',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'oklch(0.85 0.18 195)';
                  e.target.style.boxShadow = '0 0 12px oklch(0.85 0.18 195 / 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'oklch(0.3 0.06 195 / 0.5)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="block font-mono-tech text-xs mb-2 tracking-widest"
              style={{ color: 'oklch(0.65 0.14 195)' }}
            >
              PASSWORD
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'oklch(0.55 0.1 195)' }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full pl-10 pr-12 py-3 rounded-lg font-mono-tech text-sm"
                style={{
                  background: 'oklch(0.08 0.01 240)',
                  border: '1px solid oklch(0.3 0.06 195 / 0.5)',
                  color: 'oklch(0.9 0.05 200)',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'oklch(0.85 0.18 195)';
                  e.target.style.boxShadow = '0 0 12px oklch(0.85 0.18 195 / 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'oklch(0.3 0.06 195 / 0.5)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                style={{ color: 'oklch(0.55 0.1 195)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="rounded-lg px-4 py-3 font-rajdhani text-sm"
              style={{
                background: 'oklch(0.577 0.245 27.325 / 0.15)',
                border: '1px solid oklch(0.577 0.245 27.325 / 0.5)',
                color: 'oklch(0.8 0.15 27)',
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-orbitron text-sm font-bold tracking-widest transition-all duration-300"
            style={{
              background: 'oklch(0.85 0.18 195 / 0.15)',
              border: '1px solid oklch(0.85 0.18 195)',
              color: 'oklch(0.92 0.22 195)',
              boxShadow: '0 0 15px oklch(0.85 0.18 195 / 0.3)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = 'oklch(0.85 0.18 195 / 0.25)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 0 25px oklch(0.85 0.18 195 / 0.6)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = 'oklch(0.85 0.18 195 / 0.15)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 0 15px oklch(0.85 0.18 195 / 0.3)';
            }}
          >
            AUTHENTICATE
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── II Login Step ─────────────────────────────────────────────────────────────
function IILoginStep({ onLogout }: { onLogout: () => void }) {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div
      className="min-h-screen flex items-center justify-center circuit-bg"
      style={{ background: 'oklch(0.06 0.01 240)' }}
    >
      <div
        className="relative w-full max-w-md mx-4 rounded-2xl p-8 text-center"
        style={{
          background: 'oklch(0.1 0.015 240 / 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid oklch(0.65 0.18 195 / 0.4)',
          boxShadow: '0 0 40px oklch(0.85 0.18 195 / 0.15)',
        }}
      >
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style={{
            background: 'oklch(0.85 0.18 195 / 0.1)',
            border: '1px solid oklch(0.85 0.18 195 / 0.5)',
            boxShadow: '0 0 20px oklch(0.85 0.18 195 / 0.3)',
          }}
        >
          <Shield size={28} style={{ color: 'oklch(0.85 0.18 195)' }} />
        </div>
        <h2
          className="font-orbitron text-xl font-bold tracking-widest mb-2"
          style={{ color: 'oklch(0.92 0.22 195)', textShadow: '0 0 10px oklch(0.85 0.18 195 / 0.8)' }}
        >
          IDENTITY REQUIRED
        </h2>
        <p className="font-rajdhani text-sm mb-6" style={{ color: 'oklch(0.55 0.05 220)' }}>
          Connect your identity to access the admin dashboard and fetch registration data.
        </p>
        <button
          onClick={() => login()}
          disabled={isLoggingIn}
          className="w-full py-3 rounded-lg font-orbitron text-sm font-bold tracking-widest transition-all duration-300 mb-3 disabled:opacity-50"
          style={{
            background: 'oklch(0.85 0.18 195 / 0.15)',
            border: '1px solid oklch(0.85 0.18 195)',
            color: 'oklch(0.92 0.22 195)',
            boxShadow: '0 0 15px oklch(0.85 0.18 195 / 0.3)',
            cursor: isLoggingIn ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoggingIn ? 'CONNECTING...' : 'CONNECT IDENTITY'}
        </button>
        <button
          onClick={onLogout}
          className="w-full py-2 rounded-lg font-rajdhani text-sm transition-all duration-200"
          style={{
            background: 'transparent',
            border: '1px solid oklch(0.3 0.04 220 / 0.5)',
            color: 'oklch(0.55 0.05 220)',
            cursor: 'pointer',
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function AdminDashboardView({ onLogout }: { onLogout: () => void }) {
  const { actor, isFetching: actorFetching } = useActor();

  const {
    data: registrations,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<Registration[]>({
    queryKey: ['admin-registrations'],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getOpenRegistrations();
      return [...result].sort((a, b) => {
        if (b.timestamp > a.timestamp) return 1;
        if (b.timestamp < a.timestamp) return -1;
        return 0;
      });
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  const totalRegistrations = registrations?.length ?? 0;
  const totalMembers = registrations?.reduce((sum, r) => sum + Number(r.numberOfMembers), 0) ?? 0;
  const totalRevenue = registrations?.reduce((sum, r) => sum + Number(r.totalAmount), 0) ?? 0;

  return (
    <div
      className="min-h-screen circuit-bg"
      style={{ background: 'oklch(0.06 0.01 240)' }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between"
        style={{
          background: 'oklch(0.08 0.01 240 / 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid oklch(0.65 0.18 195 / 0.3)',
          boxShadow: '0 0 20px oklch(0.85 0.18 195 / 0.1)',
        }}
      >
        <div>
          <h1
            className="font-orbitron text-xl font-bold tracking-widest"
            style={{
              color: 'oklch(0.92 0.22 195)',
              textShadow: '0 0 10px oklch(0.85 0.18 195 / 0.7)',
            }}
          >
            ADMIN DASHBOARD
          </h1>
          <p className="font-mono-tech text-xs mt-0.5" style={{ color: 'oklch(0.5 0.08 195)' }}>
            VibECX-2K26 · Registration Records
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isFetching || actorFetching}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-rajdhani text-sm font-semibold transition-all duration-200 disabled:opacity-50"
            style={{
              background: 'oklch(0.85 0.18 195 / 0.1)',
              border: '1px solid oklch(0.65 0.18 195 / 0.5)',
              color: 'oklch(0.85 0.18 195)',
              cursor: isFetching ? 'not-allowed' : 'pointer',
            }}
          >
            <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-rajdhani text-sm font-semibold transition-all duration-200"
            style={{
              background: 'oklch(0.577 0.245 27.325 / 0.1)',
              border: '1px solid oklch(0.577 0.245 27.325 / 0.5)',
              color: 'oklch(0.8 0.15 27)',
              cursor: 'pointer',
            }}
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <main className="px-4 md:px-6 py-6 max-w-screen-2xl mx-auto">
        {/* Stats */}
        {!isLoading && !isError && registrations && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Registrations', value: totalRegistrations },
              { label: 'Total Members', value: totalMembers },
              { label: 'Total Revenue (₹)', value: `₹${totalRevenue.toLocaleString('en-IN')}` },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-5"
                style={{
                  background: 'oklch(0.1 0.015 240)',
                  border: '1px solid oklch(0.65 0.18 195 / 0.3)',
                  boxShadow: '0 0 15px oklch(0.85 0.18 195 / 0.08)',
                }}
              >
                <p className="font-mono-tech text-xs tracking-widest mb-1" style={{ color: 'oklch(0.55 0.08 195)' }}>
                  {stat.label.toUpperCase()}
                </p>
                <p
                  className="font-orbitron text-2xl font-bold"
                  style={{ color: 'oklch(0.92 0.22 195)', textShadow: '0 0 8px oklch(0.85 0.18 195 / 0.5)' }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Loading */}
        {(isLoading || actorFetching) && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div
              className="w-12 h-12 rounded-full border-2 animate-spin"
              style={{
                borderColor: 'oklch(0.85 0.18 195 / 0.2)',
                borderTopColor: 'oklch(0.85 0.18 195)',
              }}
            />
            <p className="font-mono-tech text-sm" style={{ color: 'oklch(0.55 0.08 195)' }}>
              FETCHING RECORDS...
            </p>
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: 'oklch(0.577 0.245 27.325 / 0.1)',
              border: '1px solid oklch(0.577 0.245 27.325 / 0.4)',
            }}
          >
            <p className="font-orbitron text-sm font-bold mb-2" style={{ color: 'oklch(0.8 0.15 27)' }}>
              ACCESS DENIED
            </p>
            <p className="font-rajdhani text-sm" style={{ color: 'oklch(0.65 0.1 27)' }}>
              {(error as Error)?.message || 'Failed to fetch registrations. Ensure your identity has admin privileges.'}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-6 py-2 rounded-lg font-rajdhani text-sm font-semibold"
              style={{
                background: 'oklch(0.577 0.245 27.325 / 0.15)',
                border: '1px solid oklch(0.577 0.245 27.325 / 0.5)',
                color: 'oklch(0.8 0.15 27)',
                cursor: 'pointer',
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        {!isLoading && !actorFetching && !isError && registrations && (
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: '1px solid oklch(0.65 0.18 195 / 0.3)',
              boxShadow: '0 0 20px oklch(0.85 0.18 195 / 0.08)',
            }}
          >
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{
                background: 'oklch(0.1 0.015 240)',
                borderBottom: '1px solid oklch(0.65 0.18 195 / 0.2)',
              }}
            >
              <h2
                className="font-orbitron text-sm font-bold tracking-widest"
                style={{ color: 'oklch(0.85 0.18 195)' }}
              >
                ALL REGISTRATIONS
              </h2>
              <span
                className="font-mono-tech text-xs px-2 py-1 rounded"
                style={{
                  background: 'oklch(0.85 0.18 195 / 0.1)',
                  color: 'oklch(0.85 0.18 195)',
                  border: '1px solid oklch(0.85 0.18 195 / 0.3)',
                }}
              >
                {totalRegistrations} records
              </span>
            </div>

            {registrations.length === 0 ? (
              <div
                className="flex items-center justify-center py-16"
                style={{ background: 'oklch(0.08 0.01 240)' }}
              >
                <p className="font-rajdhani text-base" style={{ color: 'oklch(0.55 0.05 220)' }}>
                  No registrations yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      style={{
                        background: 'oklch(0.08 0.01 240)',
                        borderBottom: '1px solid oklch(0.65 0.18 195 / 0.2)',
                      }}
                    >
                      {['#', 'Name', 'College', 'Dept', 'Year', 'Phone', 'Email', 'Event', 'Members', 'Amount', 'Payment', 'Date & Time'].map(
                        (col) => (
                          <th
                            key={col}
                            className="px-4 py-3 text-left font-mono-tech text-xs tracking-widest whitespace-nowrap"
                            style={{ color: 'oklch(0.65 0.14 195)' }}
                          >
                            {col}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg, idx) => (
                      <tr
                        key={String(reg.id)}
                        style={{
                          borderBottom: '1px solid oklch(0.65 0.18 195 / 0.1)',
                          background: idx % 2 === 0 ? 'oklch(0.08 0.01 240)' : 'oklch(0.1 0.015 240)',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLTableRowElement).style.background =
                            'oklch(0.85 0.18 195 / 0.05)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLTableRowElement).style.background =
                            idx % 2 === 0 ? 'oklch(0.08 0.01 240)' : 'oklch(0.1 0.015 240)';
                        }}
                      >
                        <td className="px-4 py-3 font-mono-tech text-xs whitespace-nowrap" style={{ color: 'oklch(0.5 0.08 195)' }}>
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3 font-rajdhani text-sm font-semibold whitespace-nowrap" style={{ color: 'oklch(0.9 0.05 200)' }}>
                          {reg.fullName}
                        </td>
                        <td
                          className="px-4 py-3 font-rajdhani text-sm whitespace-nowrap max-w-[140px] truncate"
                          style={{ color: 'oklch(0.75 0.04 220)' }}
                          title={reg.collegeName}
                        >
                          {reg.collegeName}
                        </td>
                        <td className="px-4 py-3 font-rajdhani text-sm whitespace-nowrap" style={{ color: 'oklch(0.75 0.04 220)' }}>
                          {reg.department}
                        </td>
                        <td className="px-4 py-3 font-mono-tech text-xs whitespace-nowrap" style={{ color: 'oklch(0.75 0.04 220)' }}>
                          {String(reg.year)}
                        </td>
                        <td className="px-4 py-3 font-mono-tech text-xs whitespace-nowrap" style={{ color: 'oklch(0.75 0.04 220)' }}>
                          {reg.phone}
                        </td>
                        <td
                          className="px-4 py-3 font-mono-tech text-xs whitespace-nowrap max-w-[160px] truncate"
                          style={{ color: 'oklch(0.75 0.04 220)' }}
                          title={reg.email}
                        >
                          {reg.email}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className="font-rajdhani text-xs font-semibold px-2 py-1 rounded"
                            style={{
                              background:
                                reg.eventType === EventType.competition
                                  ? 'oklch(0.85 0.18 195 / 0.15)'
                                  : reg.eventType === EventType.workshop
                                  ? 'oklch(0.75 0.18 140 / 0.15)'
                                  : 'oklch(0.85 0.18 60 / 0.15)',
                              color:
                                reg.eventType === EventType.competition
                                  ? 'oklch(0.85 0.18 195)'
                                  : reg.eventType === EventType.workshop
                                  ? 'oklch(0.75 0.18 140)'
                                  : 'oklch(0.85 0.18 60)',
                              border: `1px solid ${
                                reg.eventType === EventType.competition
                                  ? 'oklch(0.85 0.18 195 / 0.4)'
                                  : reg.eventType === EventType.workshop
                                  ? 'oklch(0.75 0.18 140 / 0.4)'
                                  : 'oklch(0.85 0.18 60 / 0.4)'
                              }`,
                            }}
                          >
                            {formatEventType(reg.eventType)}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono-tech text-xs text-center whitespace-nowrap" style={{ color: 'oklch(0.75 0.04 220)' }}>
                          {String(reg.numberOfMembers)}
                        </td>
                        <td className="px-4 py-3 font-mono-tech text-xs whitespace-nowrap" style={{ color: 'oklch(0.85 0.18 140)' }}>
                          ₹{String(reg.totalAmount)}
                        </td>
                        <td
                          className="px-4 py-3 font-mono-tech text-xs whitespace-nowrap max-w-[120px] truncate"
                          style={{ color: 'oklch(0.65 0.1 195)' }}
                          title={reg.paymentScreenshotFileName}
                        >
                          {reg.paymentScreenshotFileName || '—'}
                        </td>
                        <td className="px-4 py-3 font-mono-tech text-xs whitespace-nowrap" style={{ color: 'oklch(0.6 0.06 220)' }}>
                          {formatTimestamp(reg.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Admin Page ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [passwordPassed, setPasswordPassed] = useState(false);
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    setPasswordPassed(false);
    queryClient.removeQueries({ queryKey: ['admin-registrations'] });
  };

  if (!passwordPassed) {
    return <LoginForm onSuccess={() => setPasswordPassed(true)} />;
  }

  if (!identity) {
    return <IILoginStep onLogout={handleLogout} />;
  }

  return <AdminDashboardView onLogout={handleLogout} />;
}
