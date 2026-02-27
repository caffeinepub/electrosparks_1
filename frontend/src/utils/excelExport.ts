import { Registration, EventType } from '../backend';

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

export async function exportRegistrationsToExcel(registrations: Registration[]): Promise<void> {
  // Dynamically import SheetJS from CDN
  const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.1/package/xlsx.mjs' as string) as any;

  const rows = registrations.map((reg) => ({
    Name: reg.fullName,
    College: reg.collegeName,
    Dept: reg.department,
    Year: Number(reg.year),
    Phone: reg.phone,
    Email: reg.email,
    Event: formatEventType(reg.eventType),
    Members: Number(reg.numberOfMembers),
    Amount: Number(reg.totalAmount),
    'Date & Time': formatTimestamp(reg.timestamp),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

  // Auto-size columns
  const colWidths = [
    { wch: 25 }, // Name
    { wch: 30 }, // College
    { wch: 20 }, // Dept
    { wch: 8 },  // Year
    { wch: 15 }, // Phone
    { wch: 30 }, // Email
    { wch: 15 }, // Event
    { wch: 10 }, // Members
    { wch: 12 }, // Amount
    { wch: 22 }, // Date & Time
  ];
  worksheet['!cols'] = colWidths;

  XLSX.writeFile(workbook, 'VibECX-2K26-Registrations.xlsx');
}
