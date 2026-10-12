/**
 * Builds an iCalendar file from a day-by-day plan: one all-day event per day
 * with the day's items in the description. Pure, so it runs in the browser.
 */

export interface IcsDay {
  day: number;
  date?: string;
  title: string;
  summary: string;
  items: string[];
}

export interface IcsInput {
  uidBase: string;
  title: string;
  url?: string;
  days: IcsDay[];
}

const escapeText = (text: string) =>
  text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** RFC 5545 folds lines longer than 75 octets; 70 characters keeps multibyte text safe. */
function fold(line: string): string {
  const parts: string[] = [];
  let rest = line;
  while (rest.length > 70) {
    parts.push(rest.slice(0, 70));
    rest = ` ${rest.slice(70)}`;
  }
  parts.push(rest);
  return parts.join('\r\n');
}

const compact = (iso: string) => iso.replace(/-/g, '');

function nextDay(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

const stamp = () => new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

export function buildIcs(input: IcsInput): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Norge Travel//Trip planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(input.title)}`,
  ];
  const dtstamp = stamp();

  for (const day of input.days) {
    if (!day.date) continue;
    const description = [day.summary, ...day.items.map((item) => `- ${item}`), input.url ? `Plan: ${input.url}` : '']
      .filter(Boolean)
      .join('\n');
    lines.push(
      'BEGIN:VEVENT',
      `UID:${input.uidBase}-day${day.day}@norgetravel.com`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${compact(day.date)}`,
      `DTEND;VALUE=DATE:${compact(nextDay(day.date))}`,
      `SUMMARY:${escapeText(`Day ${day.day}: ${day.title}`)}`,
      `DESCRIPTION:${escapeText(description)}`,
      ...(input.url ? [`URL:${input.url}`] : []),
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');
  return lines.map(fold).join('\r\n') + '\r\n';
}
