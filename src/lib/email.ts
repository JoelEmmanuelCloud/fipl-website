import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendContactNotification(data: {
  firstName: string
  lastName: string
  email: string
  subject: string | null
  message: string
}) {
  if (!resend) return

  await resend.emails.send({
    from: 'FIPL Website <notifications@fipl-ng.com>',
    to: ['info@fipl-ng.com'],
    subject: `New contact: ${data.subject || 'General Enquiry'} — ${data.firstName} ${data.lastName}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#DB1B0C;padding:20px 24px">
          <h2 style="color:#fff;margin:0;font-size:16px;font-weight:600">New Contact Form Submission</h2>
        </div>
        <div style="padding:24px;border:1px solid #e5e7eb;border-top:none">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6b7280;width:100px">Name</td><td style="padding:8px 0;font-weight:500">${data.firstName} ${data.lastName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${data.email}" style="color:#DB1B0C">${data.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Subject</td><td style="padding:8px 0">${data.subject || '—'}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;font-size:14px;line-height:1.6;color:#374151;white-space:pre-wrap">${data.message}</div>
          <div style="margin-top:20px">
            <a href="mailto:${data.email}" style="background:#DB1B0C;color:#fff;padding:10px 20px;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600">Reply to ${data.firstName}</a>
          </div>
        </div>
        <div style="padding:16px 24px;font-size:12px;color:#9ca3af">Sent from fipl-ng.com contact form</div>
      </div>
    `,
  })
}
