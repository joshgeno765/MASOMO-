import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
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
            <a href="https://masomojoshua.netlify.app/admin/leads" style="background:#0B2545;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600">
              View in Dashboard →
            </a>
          </div>
        </div>
        <p style="color:#9ca3af;font-size:12px;margin-top:16px;text-align:center">Masomo Now · info@masomonow.com</p>
      </div>
    `,
  })
}
