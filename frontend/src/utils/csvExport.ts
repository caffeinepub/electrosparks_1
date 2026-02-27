import { Registration } from '../backend';

function formatTimestamp(ts: bigint): string {
  // Backend timestamp is in nanoseconds (IC Time.now())
  const ms = Number(ts) / 1_000_000;
  if (ms === 0) return 'N/A';
  const date = new Date(ms);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatEventType(et: { seminar?: null; workshop?: null; competition?: null } | string): string {
  if (typeof et === 'string') {
    if (et === 'seminar') return 'Seminar';
    if (et === 'workshop') return 'Workshop';
    if (et === 'competition') return 'Competition';
    return et;
  }
  if ('seminar' in et) return 'Seminar';
  if ('workshop' in et) return 'Workshop';
  if ('competition' in et) return 'Competition';
  return 'Unknown';
}

function escapeCsvField(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportToCSV(registrations: Registration[], filename = 'registrations-export.csv'): void {
  const headers = ['Name', 'College', 'Department', 'Year', 'Email', 'Phone', 'Event', 'Members', 'Amount (₹)', 'Date', 'Screenshot'];

  const rows = registrations.map(reg => [
    escapeCsvField(reg.fullName),
    escapeCsvField(reg.collegeName),
    escapeCsvField(reg.department),
    String(reg.year),
    escapeCsvField(reg.email),
    escapeCsvField(reg.phone),
    escapeCsvField(formatEventType(reg.eventType as unknown as string)),
    String(reg.numberOfMembers),
    String(reg.totalAmount),
    escapeCsvField(formatTimestamp(reg.timestamp)),
    escapeCsvField(reg.paymentScreenshotFileName || '—'),
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export { formatTimestamp, formatEventType };
