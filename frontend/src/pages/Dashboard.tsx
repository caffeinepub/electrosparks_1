import React, { useState, useEffect } from 'react';
import { useGetAllRegistrations, useDeleteRegistration, useGetStats } from '../hooks/useQueries';
import { exportRegistrationsToExcel } from '../utils/excelExport';
import { Registration, EventType } from '../backend';

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatTimestamp(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  const date = new Date(ms);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function formatEventType(eventType: EventType): string {
  switch (eventType) {
    case EventType.workshop:
      return 'Workshop';
    case EventType.competition:
      return 'Competition';
    case EventType.seminar:
      return 'Seminar';
    default:
      return String(eventType);
  }
}

// ─── Delete Confirmation Dialog ──────────────────────────────────────────────

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  isDeleting: boolean;
  deleteError: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirmationDialog({
  isOpen,
  isDeleting,
  deleteError,
  onConfirm,
  onCancel,
}: DeleteConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: '#1a1a2e',
          border: '1px solid #ff4444',
          borderRadius: '12px',
          padding: '32px',
          maxWidth: '420px',
          width: '90%',
          boxShadow: '0 0 30px rgba(255,68,68,0.3)',
        }}
      >
        <h3
          style={{
            color: '#ff4444',
            fontFamily: 'Times New Roman, serif',
            fontSize: '1.2rem',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          Confirm Delete
        </h3>
        <p
          style={{
            color: '#e0e0e0',
            fontFamily: 'Times New Roman, serif',
            fontSize: '1rem',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          Are you sure you want to delete this registration?
        </p>

        {deleteError && (
          <p
            style={{
              color: '#ff4444',
              fontFamily: 'Times New Roman, serif',
              fontSize: '0.9rem',
              textAlign: 'center',
              marginBottom: '16px',
              padding: '8px',
              background: 'rgba(255,68,68,0.1)',
              borderRadius: '6px',
              border: '1px solid rgba(255,68,68,0.3)',
            }}
          >
            Unable to delete record.
          </p>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            style={{
              padding: '10px 24px',
              background: 'transparent',
              border: '1px solid #666',
              borderRadius: '6px',
              color: '#ccc',
              fontFamily: 'Times New Roman, serif',
              fontSize: '0.95rem',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              opacity: isDeleting ? 0.6 : 1,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            style={{
              padding: '10px 24px',
              background: isDeleting ? '#aa2222' : '#cc0000',
              border: 'none',
              borderRadius: '6px',
              color: '#fff',
              fontFamily: 'Times New Roman, serif',
              fontSize: '0.95rem',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              opacity: isDeleting ? 0.7 : 1,
              minWidth: '100px',
            }}
          >
            {isDeleting ? 'Deleting...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Login Screen ────────────────────────────────────────────────────────────

interface LoginScreenProps {
  onLogin: (password: string) => void;
  error: string | null;
}

function LoginScreen({ onLogin, error }: LoginScreenProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Times New Roman, serif',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,140,0,0.4)',
          borderRadius: '16px',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 0 40px rgba(255,140,0,0.15)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1
            style={{
              color: '#ff8c00',
              fontSize: '2rem',
              fontWeight: 'bold',
              textShadow: '0 0 20px rgba(255,140,0,0.6)',
              marginBottom: '8px',
            }}
          >
            VibECX-2K26
          </h1>
          <p style={{ color: '#aaa', fontSize: '0.95rem' }}>Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                color: '#ccc',
                marginBottom: '8px',
                fontSize: '0.9rem',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,140,0,0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <p
              style={{
                color: '#ff4444',
                fontSize: '0.9rem',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #ff8c00, #ff4500)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '1rem',
              fontFamily: 'Times New Roman, serif',
              fontWeight: 'bold',
              cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Stats Cards ─────────────────────────────────────────────────────────────

interface StatsCardsProps {
  registrations: Registration[];
}

function StatsCards({ registrations }: StatsCardsProps) {
  const totalRegistrations = registrations.length;
  const totalMembers = registrations.reduce((sum, r) => sum + Number(r.numberOfMembers), 0);
  const totalRevenue = registrations.reduce((sum, r) => sum + Number(r.totalAmount), 0);

  const cards = [
    { label: 'Total Registrations', value: totalRegistrations, color: '#ff8c00' },
    { label: 'Total Members', value: totalMembers, color: '#00d4ff' },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, color: '#00ff88' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${card.color}44`,
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: `0 0 20px ${card.color}22`,
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: card.color,
              textShadow: `0 0 15px ${card.color}88`,
              marginBottom: '8px',
            }}
          >
            {card.value}
          </div>
          <div style={{ color: '#aaa', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'vibecx2k26admin';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Delete state
  const [deleteTargetId, setDeleteTargetId] = useState<bigint | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Export state
  const [isExporting, setIsExporting] = useState(false);

  // Check session on mount
  useEffect(() => {
    const session = sessionStorage.getItem('dashboard_auth');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const { data: registrations = [], isLoading, refetch } = useGetAllRegistrations();
  const deleteMutation = useDeleteRegistration();

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('dashboard_auth', 'true');
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dashboard_auth');
    setIsAuthenticated(false);
  };

  const handleDeleteClick = (id: bigint) => {
    setDeleteTargetId(id);
    setDeleteError(null);
  };

  const handleDeleteCancel = () => {
    setDeleteTargetId(null);
    setDeleteError(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId === null) return;
    setDeleteError(null);
    try {
      await deleteMutation.mutateAsync(deleteTargetId);
      setDeleteTargetId(null);
    } catch {
      setDeleteError('Unable to delete record.');
    }
  };

  const handleExportToExcel = async () => {
    setIsExporting(true);
    try {
      await exportRegistrationsToExcel(registrations);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a1a',
        color: '#e0e0e0',
        fontFamily: 'Times New Roman, serif',
        padding: '24px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1
            style={{
              color: '#ff8c00',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              textShadow: '0 0 20px rgba(255,140,0,0.6)',
              margin: 0,
            }}
          >
            VibECX-2K26
          </h1>
          <p style={{ color: '#aaa', margin: '4px 0 0', fontSize: '0.9rem' }}>
            Admin Dashboard
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 20px',
            background: 'transparent',
            border: '1px solid rgba(255,140,0,0.4)',
            borderRadius: '8px',
            color: '#ff8c00',
            fontFamily: 'Times New Roman, serif',
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <StatsCards registrations={registrations} />

      {/* Table Section */}
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,140,0,0.2)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* Table Header Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,140,0,0.2)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <h2
            style={{
              color: '#ff8c00',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              margin: 0,
            }}
          >
            Registrations
            {isLoading && (
              <span style={{ color: '#aaa', fontSize: '0.85rem', marginLeft: '12px' }}>
                Loading...
              </span>
            )}
          </h2>

          {/* Export to Excel Button */}
          <button
            onClick={handleExportToExcel}
            disabled={isExporting || registrations.length === 0}
            style={{
              padding: '8px 20px',
              background: isExporting ? '#1a5c2a' : 'linear-gradient(135deg, #1a7a2e, #22a83c)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontFamily: 'Times New Roman, serif',
              fontSize: '0.9rem',
              cursor: isExporting || registrations.length === 0 ? 'not-allowed' : 'pointer',
              opacity: registrations.length === 0 ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 12px rgba(34,168,60,0.3)',
            }}
          >
            {isExporting ? '⏳ Exporting...' : '📥 Export to Excel'}
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          {registrations.length === 0 && !isLoading ? (
            <div
              style={{
                padding: '48px',
                textAlign: 'center',
                color: '#666',
                fontSize: '1rem',
              }}
            >
              No registrations found.
            </div>
          ) : (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.85rem',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: 'rgba(255,140,0,0.1)',
                    borderBottom: '1px solid rgba(255,140,0,0.3)',
                  }}
                >
                  {[
                    '#',
                    'Name',
                    'College',
                    'Dept',
                    'Year',
                    'Phone',
                    'Email',
                    'Event',
                    'Members',
                    'Amount',
                    'Date & Time',
                    'Actions',
                  ].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        color: '#ff8c00',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, index) => (
                  <tr
                    key={String(reg.id)}
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      background:
                        index % 2 === 0
                          ? 'rgba(255,255,255,0.02)'
                          : 'transparent',
                    }}
                  >
                    <td style={{ padding: '12px 16px', color: '#888' }}>
                      {index + 1}
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        color: '#e0e0e0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {reg.fullName}
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        color: '#ccc',
                        maxWidth: '180px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {reg.collegeName}
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        color: '#ccc',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {reg.department}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#ccc' }}>
                      {String(reg.year)}
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        color: '#ccc',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {reg.phone}
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        color: '#ccc',
                        maxWidth: '180px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {reg.email}
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '0.78rem',
                          background:
                            reg.eventType === EventType.competition
                              ? 'rgba(255,140,0,0.2)'
                              : reg.eventType === EventType.workshop
                              ? 'rgba(0,212,255,0.2)'
                              : 'rgba(0,255,136,0.2)',
                          color:
                            reg.eventType === EventType.competition
                              ? '#ff8c00'
                              : reg.eventType === EventType.workshop
                              ? '#00d4ff'
                              : '#00ff88',
                          border: `1px solid ${
                            reg.eventType === EventType.competition
                              ? 'rgba(255,140,0,0.4)'
                              : reg.eventType === EventType.workshop
                              ? 'rgba(0,212,255,0.4)'
                              : 'rgba(0,255,136,0.4)'
                          }`,
                        }}
                      >
                        {formatEventType(reg.eventType)}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        color: '#ccc',
                        textAlign: 'center',
                      }}
                    >
                      {String(reg.numberOfMembers)}
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        color: '#00ff88',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      ₹{Number(reg.totalAmount).toLocaleString('en-IN')}
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        color: '#aaa',
                        whiteSpace: 'nowrap',
                        fontSize: '0.8rem',
                      }}
                    >
                      {formatTimestamp(reg.timestamp)}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        onClick={() => handleDeleteClick(reg.id)}
                        style={{
                          padding: '6px 14px',
                          background: '#cc0000',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#fff',
                          fontFamily: 'Times New Roman, serif',
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 0 8px rgba(204,0,0,0.4)',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLButtonElement).style.background = '#ff0000')
                        }
                        onMouseLeave={(e) =>
                          ((e.target as HTMLButtonElement).style.background = '#cc0000')
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '32px',
          textAlign: 'center',
          color: '#444',
          fontSize: '0.8rem',
        }}
      >
        © {new Date().getFullYear()} VibECX-2K26 · Built with ❤️ using{' '}
        <a
          href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== 'undefined' ? window.location.hostname : 'vibecx-2k26'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#ff8c00', textDecoration: 'none' }}
        >
          caffeine.ai
        </a>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteTargetId !== null}
        isDeleting={deleteMutation.isPending}
        deleteError={deleteError}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
