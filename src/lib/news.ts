import { query, queryOne } from '@/lib/db'
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
  const rows = await query<NewsArticleRow>('select * from news_articles order by date_iso desc')
  return rows.map(mapRow)
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  const row = await queryOne<NewsArticleRow>('select * from news_articles where slug = ?', [slug])
  return row ? mapRow(row) : undefined
}

export async function getRecentArticles(count = 7): Promise<NewsArticle[]> {
  const rows = await query<NewsArticleRow>(
    'select * from news_articles order by date_iso desc limit ?',
    [count],
  )
  return rows.map(mapRow)
}
