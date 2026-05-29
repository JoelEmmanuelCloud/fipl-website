export type NewsArticleRow = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  date_iso: string
  category: string
  read_time: string
  image_url: string
  created_at: string
}

export type JobRow = {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string | null
  requirements: string | null
  posted_date: string
  is_active: boolean
  created_at: string
}

export type MediaKitRow = {
  id: string
  title: string
  category: string
  file_url: string
  thumbnail_url: string | null
  created_at: string
}

export type ContactSubmissionRow = {
  id: string
  first_name: string
  last_name: string
  email: string
  subject: string | null
  message: string
  created_at: string
}

export type NewsletterSubscriberRow = {
  id: string
  email: string
  subscribed_at: string
}
