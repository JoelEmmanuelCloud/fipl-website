import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_NOTIFY = 'FIPL Website <notifications@fipl-ng.com>'
const FROM_NO_REPLY = 'First Independent Power Limited <noreply@fipl-ng.com>'
const ADMIN_EMAIL = 'info@fipl-ng.com'

export async function sendContactNotification(data: {
  firstName: string
  lastName: string
  email: string
  subject: string | null
  message: string
}) {
  if (!resend) return
  await resend.emails.send({
    from: FROM_NOTIFY,
    to: [ADMIN_EMAIL],
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

export async function sendSubscriberNotification(subscriberEmail: string) {
  if (!resend) return
  await Promise.all([
    resend.emails.send({
      from: FROM_NOTIFY,
      to: [ADMIN_EMAIL],
      subject: `New newsletter subscriber: ${subscriberEmail}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <div style="background:#DB1B0C;padding:20px 24px">
            <h2 style="color:#fff;margin:0;font-size:16px;font-weight:600">New Newsletter Subscriber</h2>
          </div>
          <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;font-size:14px;color:#374151">
            <p style="margin:0 0 12px"><strong>${subscriberEmail}</strong> has subscribed to the FIPL newsletter.</p>
            <a href="https://fjjwqfinfvjmsxbwrxsg.supabase.co" style="background:#DB1B0C;color:#fff;padding:10px 20px;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600">View all subscribers</a>
          </div>
          <div style="padding:16px 24px;font-size:12px;color:#9ca3af">Sent from fipl-ng.com</div>
        </div>
      `,
    }),
    resend.emails.send({
      from: FROM_NO_REPLY,
      to: [subscriberEmail],
      subject: 'Welcome to FIPL Updates',
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <div style="background:#DB1B0C;padding:20px 24px">
            <h2 style="color:#fff;margin:0;font-size:16px;font-weight:600">Thank you for subscribing</h2>
          </div>
          <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;font-size:14px;color:#374151;line-height:1.6">
            <p>You are now subscribed to updates from <strong>First Independent Power Limited (FIPL)</strong>.</p>
            <p>You will receive notifications about new press releases, industry news, and operational updates from our plants in Rivers State.</p>
            <p style="margin-top:20px">
              <a href="https://fipl-ng.com/news" style="background:#DB1B0C;color:#fff;padding:10px 20px;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600">Read our latest news</a>
            </p>
          </div>
          <div style="padding:16px 24px;font-size:12px;color:#9ca3af">
            First Independent Power Limited &mdash; 12 Circular Road, Presidential Estate, Port Harcourt, Rivers State, Nigeria.<br/>
            <a href="https://fipl-ng.com" style="color:#9ca3af">fipl-ng.com</a>
          </div>
        </div>
      `,
    }),
  ])
}
