import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/news'
import { plants } from '@/lib/plants-data'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fipl-ng.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/sustainability`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/power-plants`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/register`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/careers`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${siteUrl}/news`, changeFrequency: 'daily', priority: 0.8 },
  ]

  const plantPages: MetadataRoute.Sitemap = plants.map((plant) => ({
    url: `${siteUrl}/power-plants/${plant.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  let articlePages: MetadataRoute.Sitemap = []
  try {
    const articles = await getAllArticles()
    articlePages = articles.map((article) => ({
      url: `${siteUrl}/news/${article.slug}`,
      lastModified: new Date(article.dateISO),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  } catch {
    articlePages = []
  }

  return [...staticPages, ...plantPages, ...articlePages]
}
