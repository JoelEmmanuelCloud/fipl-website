import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

const UPLOADS_ROOT = path.join(process.cwd(), 'public', 'uploads')

export async function saveUpload(
  bucket: string,
  filename: string,
  data: ArrayBuffer | Buffer,
): Promise<string> {
  const dir = path.join(UPLOADS_ROOT, bucket)
  await mkdir(dir, { recursive: true })
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data)
  await writeFile(path.join(dir, filename), buffer)
  return `/uploads/${bucket}/${filename}`
}
