export interface CalendarEventInput {
  id: number | string
  title: string
  description?: string
  location?: string
  start: Date
  durationMinutes: number
}

function formatUtc(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

function escapeIcsText(v: string): string {
  return v.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n')
}

function endDate(event: CalendarEventInput): Date {
  return new Date(event.start.getTime() + event.durationMinutes * 60_000)
}

export function buildIcs(event: CalendarEventInput): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Masomo Now//Consultation Booking//EN',
    'BEGIN:VEVENT',
    `UID:appointment-${event.id}@masomonow.com`,
    `DTSTAMP:${formatUtc(new Date())}`,
    `DTSTART:${formatUtc(event.start)}`,
    `DTEND:${formatUtc(endDate(event))}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    ...(event.description ? [`DESCRIPTION:${escapeIcsText(event.description)}`] : []),
    ...(event.location ? [`LOCATION:${escapeIcsText(event.location)}`] : []),
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

export function downloadIcs(event: CalendarEventInput, filename = 'masomo-now-consultation.ics'): void {
  const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function googleCalendarUrl(event: CalendarEventInput): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatUtc(event.start)}/${formatUtc(endDate(event))}`,
    ...(event.description && { details: event.description }),
    ...(event.location && { location: event.location }),
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function outlookWebUrl(event: CalendarEventInput): string {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    startdt: event.start.toISOString(),
    enddt: endDate(event).toISOString(),
    ...(event.description && { body: event.description }),
    ...(event.location && { location: event.location }),
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}
