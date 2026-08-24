import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { query } from '@/lib/db'
import { saveUpload } from '@/lib/upload'
import { sendApplicationNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const firstName = (formData.get('firstName') as string)?.trim()
  const lastName = (formData.get('lastName') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()
  const coverLetter = (formData.get('coverLetter') as string)?.trim() || null
  const jobId = (formData.get('jobId') as string)?.trim() || null
  const jobTitle = (formData.get('jobTitle') as string)?.trim()
  const cvFile = formData.get('cv') as File | null

  if (!firstName || !lastName || !email || !phone || !jobTitle || !cvFile) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (cvFile.type !== 'application/pdf') {
    return NextResponse.json({ error: 'CV must be a PDF file' }, { status: 400 })
  }

  if (cvFile.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'CV must be under 5MB' }, { status: 400 })
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.pdf`
  const buffer = await cvFile.arrayBuffer()

  let cvUrl: string
  try {
    cvUrl = await saveUpload('job-applications', filename, buffer)
  } catch {
    return NextResponse.json({ error: 'Failed to upload CV' }, { status: 500 })
  }

  const id = randomUUID()

  try {
    await query(
      `insert into job_applications
        (id, job_id, job_title, first_name, last_name, email, phone, cover_letter, cv_url, status)
       values (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [id, jobId, jobTitle, firstName, lastName, email, phone, coverLetter, cvUrl],
    )
  } catch {
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }

  sendApplicationNotification({ firstName, lastName, email, phone, jobTitle, cvUrl }).catch(
    () => {},
  )

  return NextResponse.json({ ok: true })
}
