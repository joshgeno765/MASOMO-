import { Resend } from 'resend'

const TO = 'info@masomonow.com'
const FROM = 'Masomo Now <notifications@masomonow.com>'

export async function sendNewLeadEmail(lead: {
  name: string
  email: string
  phone: string
  country?: string | null
  destinationInterest: string
  message?: string | null
}) {
  if (!process.env.RESEND_API_KEY) return

  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `New inquiry from ${lead.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <div style="background:#0B2545;padding:20px 24px;border-radius:8px 8px 0 0">
          <span style="color:#F5C842;font-weight:800;font-size:14px;letter-spacing:1px">MASOMO NOW</span>
          <p style="color:white;margin:6px 0 0;font-size:18px;font-weight:600">New Student Inquiry</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6b7280;width:130px">Name</td><td style="padding:8px 0;font-weight:600;color:#0B2545">${lead.name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Email</td><td style="padding:8px 0;border-top:1px solid #f3f4f6"><a href="mailto:${lead.email}" style="color:#2563eb">${lead.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Phone</td><td style="padding:8px 0;border-top:1px solid #f3f4f6">${lead.phone}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Country</td><td style="padding:8px 0;border-top:1px solid #f3f4f6">${lead.country || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Destination</td><td style="padding:8px 0;border-top:1px solid #f3f4f6;font-weight:600;color:#0B2545">${lead.destinationInterest}</td></tr>
            ${lead.message ? `<tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6;vertical-align:top">Message</td><td style="padding:8px 0;border-top:1px solid #f3f4f6;color:#374151">${lead.message}</td></tr>` : ''}
          </table>
          <div style="margin-top:20px">
            <a href="https://masomonow.com/admin/leads" style="background:#0B2545;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600">
              View in Dashboard →
            </a>
          </div>
        </div>
        <p style="color:#9ca3af;font-size:12px;margin-top:16px;text-align:center">Masomo Now · info@masomonow.com</p>
      </div>
    `,
  })
}

export async function sendNewPathwayResultEmail(lead: {
  name: string
  email: string
  phone: string
  country?: string | null
  destinationInterest: string
  quizAnswers: {
    homeCountry: string
    languagePreference: string
    studyGoal: string
    fieldOfInterest: string
    budget: string
    timeline: string
  }
}) {
  if (!process.env.RESEND_API_KEY) return

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { quizAnswers: q } = lead

  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `New Pathway Finder match — ${lead.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <div style="background:#0B2545;padding:20px 24px;border-radius:8px 8px 0 0">
          <span style="color:#F5C842;font-weight:800;font-size:14px;letter-spacing:1px">MASOMO NOW</span>
          <p style="color:white;margin:6px 0 0;font-size:18px;font-weight:600">New Pathway Finder Match</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6b7280;width:150px">Name</td><td style="padding:8px 0;font-weight:600;color:#0B2545">${lead.name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Email</td><td style="padding:8px 0;border-top:1px solid #f3f4f6"><a href="mailto:${lead.email}" style="color:#2563eb">${lead.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Phone</td><td style="padding:8px 0;border-top:1px solid #f3f4f6">${lead.phone}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Country</td><td style="padding:8px 0;border-top:1px solid #f3f4f6">${lead.country || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Matched Pathway</td><td style="padding:8px 0;border-top:1px solid #f3f4f6;font-weight:600;color:#0B2545">${lead.destinationInterest}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Home Country</td><td style="padding:8px 0;border-top:1px solid #f3f4f6">${q.homeCountry}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Language Preference</td><td style="padding:8px 0;border-top:1px solid #f3f4f6">${q.languagePreference}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Study Goal</td><td style="padding:8px 0;border-top:1px solid #f3f4f6">${q.studyGoal}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Field of Interest</td><td style="padding:8px 0;border-top:1px solid #f3f4f6">${q.fieldOfInterest}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Budget</td><td style="padding:8px 0;border-top:1px solid #f3f4f6">${q.budget}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Timeline</td><td style="padding:8px 0;border-top:1px solid #f3f4f6">${q.timeline}</td></tr>
          </table>
          <div style="margin-top:20px">
            <a href="https://masomonow.com/admin/leads" style="background:#0B2545;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600">
              View in Dashboard →
            </a>
          </div>
        </div>
        <p style="color:#9ca3af;font-size:12px;margin-top:16px;text-align:center">Masomo Now · info@masomonow.com</p>
      </div>
    `,
  })
}

export async function sendAppointmentConfirmationEmail(appointment: {
  name: string
  email: string
  destinationInterest: string
  scheduledAt: Date
}) {
  if (!process.env.RESEND_API_KEY) return

  const resend = new Resend(process.env.RESEND_API_KEY)
  const when = appointment.scheduledAt.toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Kigali',
  })

  await resend.emails.send({
    from: FROM,
    to: appointment.email,
    subject: 'Your Masomo Now consultation is booked',
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <div style="background:#0B2545;padding:20px 24px;border-radius:8px 8px 0 0">
          <span style="color:#F5C842;font-weight:800;font-size:14px;letter-spacing:1px">MASOMO NOW</span>
          <p style="color:white;margin:6px 0 0;font-size:18px;font-weight:600">Consultation Confirmed</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px">
          <p style="color:#374151;font-size:14px">Hi ${appointment.name},</p>
          <p style="color:#374151;font-size:14px">Thanks for booking a free consultation with Masomo Now. Here are your details:</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin:16px 0">
            <tr><td style="padding:8px 0;color:#6b7280;width:130px">When</td><td style="padding:8px 0;font-weight:600;color:#0B2545">${when} (Central Africa Time)</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Destination</td><td style="padding:8px 0;border-top:1px solid #f3f4f6;font-weight:600;color:#0B2545">${appointment.destinationInterest}</td></tr>
          </table>
          <p style="color:#374151;font-size:14px">One of our counselors will call you at the number you provided around this time. If anything comes up, just reply to this email or reach us on WhatsApp.</p>
          <p style="color:#374151;font-size:14px">Best regards,<br/>The Masomo Now team</p>
        </div>
        <p style="color:#9ca3af;font-size:12px;margin-top:16px;text-align:center">Masomo Now · info@masomonow.com</p>
      </div>
    `,
  })
}

export async function sendDailyDigestEmail(data: {
  since: Date
  until: Date
  leads: Array<{ id: number; name: string; destinationInterest: string; status: string; createdAt: Date }>
  appointments: Array<{ id: number; scheduledAt: Date; destination: string | null; lead: { name: string } | null }>
}) {
  if (!process.env.RESEND_API_KEY) return

  const resend = new Resend(process.env.RESEND_API_KEY)
  const dateLabel = data.until.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'Africa/Kigali' })

  const leadsRows = data.leads.map((l) => `
    <tr>
      <td style="padding:8px 0;border-top:1px solid #f3f4f6;font-weight:600;color:#0B2545">${l.name}</td>
      <td style="padding:8px 0;border-top:1px solid #f3f4f6;color:#374151">${l.destinationInterest}</td>
      <td style="padding:8px 0;border-top:1px solid #f3f4f6;color:#374151">${l.status}</td>
      <td style="padding:8px 0;border-top:1px solid #f3f4f6;color:#6b7280">${l.createdAt.toLocaleDateString('en-US', { timeZone: 'Africa/Kigali' })}</td>
    </tr>`).join('')

  const appointmentsRows = data.appointments.map((a) => `
    <tr>
      <td style="padding:8px 0;border-top:1px solid #f3f4f6;font-weight:600;color:#0B2545">${a.lead?.name ?? 'Unknown'}</td>
      <td style="padding:8px 0;border-top:1px solid #f3f4f6;color:#374151">${a.destination ?? '—'}</td>
      <td style="padding:8px 0;border-top:1px solid #f3f4f6;color:#6b7280">${a.scheduledAt.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Kigali' })}</td>
    </tr>`).join('')

  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `Daily digest — ${data.leads.length} new lead${data.leads.length === 1 ? '' : 's'}, ${data.appointments.length} new booking${data.appointments.length === 1 ? '' : 's'} (${dateLabel})`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <div style="background:#0B2545;padding:20px 24px;border-radius:8px 8px 0 0">
          <span style="color:#F5C842;font-weight:800;font-size:14px;letter-spacing:1px">MASOMO NOW</span>
          <p style="color:white;margin:6px 0 0;font-size:18px;font-weight:600">Daily Digest — ${dateLabel}</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px">
          ${data.leads.length > 0 ? `
            <h3 style="color:#0B2545;font-size:14px;margin:0 0 8px">New Leads (${data.leads.length})</h3>
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
              <tr>
                <th style="text-align:left;padding:6px 0;color:#9ca3af;font-size:11px;text-transform:uppercase">Name</th>
                <th style="text-align:left;padding:6px 0;color:#9ca3af;font-size:11px;text-transform:uppercase">Destination</th>
                <th style="text-align:left;padding:6px 0;color:#9ca3af;font-size:11px;text-transform:uppercase">Status</th>
                <th style="text-align:left;padding:6px 0;color:#9ca3af;font-size:11px;text-transform:uppercase">Submitted</th>
              </tr>
              ${leadsRows}
            </table>
          ` : ''}
          ${data.appointments.length > 0 ? `
            <h3 style="color:#0B2545;font-size:14px;margin:0 0 8px">New Consultations (${data.appointments.length})</h3>
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
              <tr>
                <th style="text-align:left;padding:6px 0;color:#9ca3af;font-size:11px;text-transform:uppercase">Name</th>
                <th style="text-align:left;padding:6px 0;color:#9ca3af;font-size:11px;text-transform:uppercase">Destination</th>
                <th style="text-align:left;padding:6px 0;color:#9ca3af;font-size:11px;text-transform:uppercase">Scheduled For</th>
              </tr>
              ${appointmentsRows}
            </table>
          ` : ''}
          <div style="margin-top:8px">
            <a href="https://masomonow.com/admin/leads" style="background:#0B2545;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600">
              View in Dashboard →
            </a>
          </div>
        </div>
        <p style="color:#9ca3af;font-size:12px;margin-top:16px;text-align:center">Masomo Now · info@masomonow.com</p>
      </div>
    `,
  })
}

export async function sendNewAppointmentEmail(appointment: {
  name: string
  email: string
  phone: string
  country?: string | null
  destinationInterest: string
  scheduledAt: Date
  notes?: string | null
}) {
  if (!process.env.RESEND_API_KEY) return

  const resend = new Resend(process.env.RESEND_API_KEY)
  const when = appointment.scheduledAt.toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Kigali',
  })

  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `New consultation booked — ${appointment.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <div style="background:#0B2545;padding:20px 24px;border-radius:8px 8px 0 0">
          <span style="color:#F5C842;font-weight:800;font-size:14px;letter-spacing:1px">MASOMO NOW</span>
          <p style="color:white;margin:6px 0 0;font-size:18px;font-weight:600">New Consultation Booking</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6b7280;width:130px">Name</td><td style="padding:8px 0;font-weight:600;color:#0B2545">${appointment.name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Email</td><td style="padding:8px 0;border-top:1px solid #f3f4f6"><a href="mailto:${appointment.email}" style="color:#2563eb">${appointment.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Phone</td><td style="padding:8px 0;border-top:1px solid #f3f4f6">${appointment.phone}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Country</td><td style="padding:8px 0;border-top:1px solid #f3f4f6">${appointment.country || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Destination</td><td style="padding:8px 0;border-top:1px solid #f3f4f6;font-weight:600;color:#0B2545">${appointment.destinationInterest}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6">Requested time</td><td style="padding:8px 0;border-top:1px solid #f3f4f6;font-weight:600;color:#0B2545">${when} (CAT)</td></tr>
            ${appointment.notes ? `<tr><td style="padding:8px 0;color:#6b7280;border-top:1px solid #f3f4f6;vertical-align:top">Notes</td><td style="padding:8px 0;border-top:1px solid #f3f4f6;color:#374151">${appointment.notes}</td></tr>` : ''}
          </table>
          <div style="margin-top:20px">
            <a href="https://masomonow.com/admin/leads" style="background:#0B2545;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600">
              View in Dashboard →
            </a>
          </div>
        </div>
        <p style="color:#9ca3af;font-size:12px;margin-top:16px;text-align:center">Masomo Now · info@masomonow.com</p>
      </div>
    `,
  })
}
