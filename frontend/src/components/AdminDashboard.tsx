import React, { useState, useMemo } from 'react';
import { useAdminStats, useAllRegistrations } from '../hooks/useQueries';
import { exportToCSV, formatTimestamp, formatEventType } from '../utils/csvExport';
import { Registration } from '../backend';
import {
  Search, Download, Users, DollarSign, ClipboardList,
  ChevronUp, ChevronDown, RefreshCw, LogOut, Image, X,
} from 'lucide-react';

interface AdminDashboardProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

type SortDir = 'asc' | 'desc';

export default function AdminDashboard({ isAuthenticated, onLogout }: AdminDashboardProps) {
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useAdminStats(isAuthenticated);

  const {
    data: registrations,
    isLoading: regsLoading,
    error: regsError,
    refetch: refetchRegs,
  } = useAllRegistrations(isAuthenticated);

  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState<'all' | 'seminar' | 'workshop' | 'competition'>('all');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string>('');

  const isLoading = statsLoading || regsLoading;

  const filteredAndSorted = useMemo(() => {
    if (!registrations) return [];
    let list = [...registrations] as Registration[];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.fullName.toLowerCase().includes(q) ||
        r.collegeName.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q)
      );
    }

    if (eventFilter !== 'all') {
      list = list.filter(r => {
        const et = r.eventType as unknown as string;
        return et === eventFilter;
      });
    }

    list.sort((a, b) => {
      const diff = Number(a.timestamp) - Number(b.timestamp);
      return sortDir === 'desc' ? -diff : diff;
    });

    return list;
  }, [registrations, search, eventFilter, sortDir]);

  const handleExportCSV = () => {
    exportToCSV(filteredAndSorted);
  };

  const handleRefresh = () => {
    refetchStats();
    refetchRegs();
  };

  const handleScreenshotClick = (fileName: string) => {
    // Open the screenshot filename as a preview hint
    // Since screenshots are stored by filename only (not as blobs in this flow),
    // we show the filename in a modal with a note
    setPreviewName(fileName);
    setPreviewUrl(fileName);
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,106,0,0.25)',
    borderRadius: '12px',
    padding: '24px',
    flex: '1',
    minWidth: '200px',
  };

  const statValueStyle: React.CSSProperties = {
    fontSize: '2.2rem',
    fontWeight: '900',
    color: '#FF8C00',
    textShadow: '0 0 16px rgba(255,106,0,0.4)',
    fontFamily: '"Times New Roman", Times, serif',
    margin: '8px 0 4px',
  };

  const statLabelStyle: React.CSSProperties = {
    color: '#A08060',
    fontSize: '0.85rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontFamily: '"Times New Roman", Times, serif',
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,106,0,0.3)',
    borderRadius: '8px',
    color: '#F0E0C0',
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '0.95rem',
    padding: '10px 14px',
    outline: 'none',
  };

  const tableColumns = ['Name', 'College', 'Dept', 'Phone', 'Event', 'Members', 'Amount', 'Date', 'Screenshot'];

  return (
    <div style={{ background: '#000000', minHeight: '100vh', fontFamily: '"Times New Roman", Times, serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: '900',
              margin: '0 0 6px 0',
              background: 'linear-gradient(135deg, #FFD700, #FF8C00, #FF4500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              VibECX-2K26 Admin
            </h1>
            <p style={{ color: '#A08060', fontSize: '0.9rem', margin: 0 }}>Registration Management Dashboard</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              style={{
                background: 'rgba(255,106,0,0.1)',
                border: '1px solid rgba(255,106,0,0.3)',
                borderRadius: '8px',
                color: '#FF8C00',
                padding: '8px 16px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <RefreshCw size={15} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} />
              Refresh
            </button>
            <button
              onClick={onLogout}
              style={{
                background: 'rgba(255,50,50,0.1)',
                border: '1px solid rgba(255,50,50,0.3)',
                borderRadius: '8px',
                color: '#FF6060',
                padding: '8px 16px',
                cursor: 'pointer',
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #FF6A00, #FF2200, #FF6A00, transparent)',
          marginBottom: '32px',
          boxShadow: '0 0 10px rgba(255,69,0,0.4)',
        }} />

        {/* Error States */}
        {(statsError || regsError) && (
          <div style={{
            background: 'rgba(255,50,50,0.1)',
            border: '1px solid rgba(255,50,50,0.3)',
            borderRadius: '10px',
            padding: '16px 20px',
            marginBottom: '24px',
            color: '#FF6060',
            fontSize: '0.95rem',
          }}>
            ⚠ Error loading data. The backend may require admin privileges. Please ensure the canister admin is configured.
          </div>
        )}

        {/* Stats Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <ClipboardList size={20} color="#FF8C00" />
              <span style={statLabelStyle}>Total Registrations</span>
            </div>
            {statsLoading ? (
              <div style={{ ...statValueStyle, color: '#604030' }}>—</div>
            ) : (
              <div style={statValueStyle}>
                {stats ? Number(stats.totalRegistrations).toLocaleString() : '0'}
              </div>
            )}
            <p style={{ color: '#604030', fontSize: '0.8rem', margin: 0 }}>All time submissions</p>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <Users size={20} color="#FF8C00" />
              <span style={statLabelStyle}>Total Participants</span>
            </div>
            {statsLoading ? (
              <div style={{ ...statValueStyle, color: '#604030' }}>—</div>
            ) : (
              <div style={statValueStyle}>
                {stats ? Number(stats.totalMembers).toLocaleString() : '0'}
              </div>
            )}
            <p style={{ color: '#604030', fontSize: '0.8rem', margin: 0 }}>Sum of all members</p>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <DollarSign size={20} color="#FF8C00" />
              <span style={statLabelStyle}>Total Revenue</span>
            </div>
            {statsLoading ? (
              <div style={{ ...statValueStyle, color: '#604030' }}>—</div>
            ) : (
              <div style={statValueStyle}>
                ₹{stats ? Number(stats.totalRevenue).toLocaleString('en-IN') : '0'}
              </div>
            )}
            <p style={{ color: '#604030', fontSize: '0.8rem', margin: 0 }}>Total amount collected</p>
          </div>
        </div>

        {/* Filters Row */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,106,0,0.2)',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '20px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
            <Search size={16} color="#A08060" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by name, college, dept, phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '36px', width: '100%', boxSizing: 'border-box' }}
              onFocus={e => { e.target.style.borderColor = '#FF6A00'; e.target.style.boxShadow = '0 0 0 2px rgba(255,106,0,0.15)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,106,0,0.3)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Event Filter */}
          <select
            value={eventFilter}
            onChange={e => setEventFilter(e.target.value as typeof eventFilter)}
            style={{ ...inputStyle, cursor: 'pointer', minWidth: '180px' }}
            onFocus={e => { e.target.style.borderColor = '#FF6A00'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,106,0,0.3)'; }}
          >
            <option value="all" style={{ background: '#111' }}>All Event Types</option>
            <option value="workshop" style={{ background: '#111' }}>Workshop (Technical)</option>
            <option value="seminar" style={{ background: '#111' }}>Seminar (Non-Technical)</option>
            <option value="competition" style={{ background: '#111' }}>Competition (Both)</option>
          </select>

          {/* Sort Toggle */}
          <button
            onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
            style={{
              background: 'rgba(255,106,0,0.08)',
              border: '1px solid rgba(255,106,0,0.3)',
              borderRadius: '8px',
              color: '#FF8C00',
              padding: '10px 16px',
              cursor: 'pointer',
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            {sortDir === 'desc' ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
            {sortDir === 'desc' ? 'Latest First' : 'Oldest First'}
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            disabled={filteredAndSorted.length === 0}
            style={{
              background: filteredAndSorted.length === 0
                ? 'rgba(255,106,0,0.05)'
                : 'linear-gradient(135deg, #FF6A00, #FF2200)',
              border: filteredAndSorted.length === 0
                ? '1px solid rgba(255,106,0,0.2)'
                : '1px solid transparent',
              borderRadius: '8px',
              color: filteredAndSorted.length === 0 ? '#604030' : '#FFFFFF',
              padding: '10px 18px',
              cursor: filteredAndSorted.length === 0 ? 'not-allowed' : 'pointer',
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: '0.9rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              boxShadow: filteredAndSorted.length === 0 ? 'none' : '0 0 12px rgba(255,69,0,0.3)',
            }}
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>

        {/* Results count */}
        <p style={{ color: '#604030', fontSize: '0.85rem', marginBottom: '12px' }}>
          Showing {filteredAndSorted.length} of {registrations?.length ?? 0} registrations
        </p>

        {/* Table */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,106,0,0.2)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {regsLoading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#A08060' }}>
              <div style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Loading registrations...</div>
            </div>
          ) : filteredAndSorted.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#604030' }}>
              <ClipboardList size={40} color="#604030" style={{ marginBottom: '12px', opacity: 0.5 }} />
              <div style={{ fontSize: '1rem' }}>No registrations found</div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,106,0,0.08)', borderBottom: '1px solid rgba(255,106,0,0.2)' }}>
                    {tableColumns.map(col => (
                      <th key={col} style={{
                        padding: '14px 16px',
                        textAlign: 'left',
                        color: '#FF8C00',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontFamily: '"Times New Roman", Times, serif',
                        whiteSpace: 'nowrap',
                      }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSorted.map((reg, idx) => (
                    <tr
                      key={String(reg.id)}
                      style={{
                        borderBottom: '1px solid rgba(255,106,0,0.08)',
                        background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,106,0,0.05)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLTableRowElement).style.background =
                          idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)';
                      }}
                    >
                      {/* Name */}
                      <td style={{
                        padding: '14px 16px',
                        color: '#F0E0C0',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        maxWidth: '150px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {reg.fullName}
                      </td>

                      {/* College */}
                      <td style={{
                        padding: '14px 16px',
                        color: '#C8A870',
                        fontSize: '0.85rem',
                        maxWidth: '160px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {reg.collegeName}
                      </td>

                      {/* Department */}
                      <td style={{
                        padding: '14px 16px',
                        color: '#C8A870',
                        fontSize: '0.85rem',
                        maxWidth: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {reg.department}
                      </td>

                      {/* Phone */}
                      <td style={{
                        padding: '14px 16px',
                        color: '#C8A870',
                        fontSize: '0.85rem',
                        whiteSpace: 'nowrap',
                      }}>
                        {reg.phone}
                      </td>

                      {/* Event Type */}
                      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                        <span style={{
                          background: 'rgba(255,106,0,0.12)',
                          border: '1px solid rgba(255,106,0,0.25)',
                          borderRadius: '6px',
                          padding: '3px 10px',
                          color: '#FF8C00',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          letterSpacing: '0.04em',
                        }}>
                          {formatEventType(reg.eventType as unknown as string)}
                        </span>
                      </td>

                      {/* Members */}
                      <td style={{
                        padding: '14px 16px',
                        color: '#C8A870',
                        fontSize: '0.9rem',
                        textAlign: 'center',
                      }}>
                        {String(reg.numberOfMembers)}
                      </td>

                      {/* Amount */}
                      <td style={{
                        padding: '14px 16px',
                        color: '#FFD700',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        whiteSpace: 'nowrap',
                      }}>
                        ₹{Number(reg.totalAmount).toLocaleString('en-IN')}
                      </td>

                      {/* Timestamp */}
                      <td style={{
                        padding: '14px 16px',
                        color: '#A08060',
                        fontSize: '0.8rem',
                        whiteSpace: 'nowrap',
                      }}>
                        {formatTimestamp(reg.timestamp)}
                      </td>

                      {/* Screenshot */}
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        {reg.paymentScreenshotFileName ? (
                          <button
                            onClick={() => handleScreenshotClick(reg.paymentScreenshotFileName)}
                            title={`View: ${reg.paymentScreenshotFileName}`}
                            style={{
                              background: 'rgba(255,106,0,0.1)',
                              border: '1px solid rgba(255,106,0,0.3)',
                              borderRadius: '6px',
                              color: '#FF8C00',
                              padding: '5px 10px',
                              cursor: 'pointer',
                              fontFamily: '"Times New Roman", Times, serif',
                              fontSize: '0.8rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              transition: 'all 0.15s',
                              maxWidth: '130px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,106,0,0.2)';
                              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 8px rgba(255,106,0,0.2)';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,106,0,0.1)';
                              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                            }}
                          >
                            <Image size={13} />
                            {reg.paymentScreenshotFileName}
                          </button>
                        ) : (
                          <span style={{ color: '#604030', fontSize: '0.85rem' }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p style={{ color: '#2A1508', fontSize: '0.75rem', textAlign: 'center', marginTop: '32px' }}>
          VibECX-2K26 Admin Panel · All data is stored securely on-chain
        </p>
      </div>

      {/* Screenshot Preview Modal */}
      {previewUrl && (
        <div
          onClick={() => setPreviewUrl(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(10,5,0,0.98)',
              border: '1px solid rgba(255,106,0,0.3)',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '480px',
              width: '100%',
              position: 'relative',
              boxShadow: '0 0 60px rgba(255,106,0,0.15)',
            }}
          >
            <button
              onClick={() => setPreviewUrl(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255,50,50,0.1)',
                border: '1px solid rgba(255,50,50,0.3)',
                borderRadius: '6px',
                color: '#FF6060',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Image size={22} color="#FF8C00" />
              <h3 style={{
                color: '#FF8C00',
                fontSize: '1.1rem',
                fontWeight: '700',
                margin: 0,
                fontFamily: '"Times New Roman", Times, serif',
              }}>
                Payment Screenshot
              </h3>
            </div>

            <div style={{
              background: 'rgba(255,106,0,0.05)',
              border: '1px solid rgba(255,106,0,0.2)',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'rgba(255,106,0,0.1)',
                border: '1px solid rgba(255,106,0,0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <Image size={28} color="#FF8C00" />
              </div>
              <p style={{
                color: '#F0E0C0',
                fontSize: '0.95rem',
                fontWeight: '600',
                margin: '0 0 8px 0',
                fontFamily: '"Times New Roman", Times, serif',
                wordBreak: 'break-all',
              }}>
                {previewName}
              </p>
              <p style={{
                color: '#A08060',
                fontSize: '0.85rem',
                margin: 0,
                fontFamily: '"Times New Roman", Times, serif',
              }}>
                Screenshot filename recorded at registration time.
              </p>
            </div>

            <button
              onClick={() => setPreviewUrl(null)}
              style={{
                width: '100%',
                marginTop: '20px',
                background: 'rgba(255,106,0,0.1)',
                border: '1px solid rgba(255,106,0,0.3)',
                borderRadius: '8px',
                color: '#FF8C00',
                padding: '12px',
                cursor: 'pointer',
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '0.95rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
