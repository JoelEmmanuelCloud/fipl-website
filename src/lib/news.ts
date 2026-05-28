import { createServerClient } from '@/lib/supabase-server'
import type { NewsArticleRow } from '@/lib/database.types'

export interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  dateISO: string
  category: 'Operations' | 'Community' | 'Corporate' | 'Partnerships' | 'Updates'
  readTime: string
  image: string
}

function mapRow(row: NewsArticleRow): NewsArticle {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    date: row.date,
    dateISO: row.date_iso,
    category: row.category as NewsArticle['category'],
    readTime: row.read_time,
    image: row.image_url,
  }
}

export async function getAllArticles(): Promise<NewsArticle[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .order('date_iso', { ascending: false })
  if (error) throw error
  return (data as NewsArticleRow[]).map(mapRow)
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error || !data) return undefined
  return mapRow(data as NewsArticleRow)
}

export async function getRecentArticles(count = 7): Promise<NewsArticle[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .order('date_iso', { ascending: false })
    .limit(count)
  if (error) throw error
  return (data as NewsArticleRow[]).map(mapRow)
}
