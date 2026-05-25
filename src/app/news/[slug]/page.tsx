import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { articles, getArticleBySlug, getRecentArticles } from '@/lib/news'
import { IMAGES } from '@/lib/images'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const recent = getRecentArticles(5).filter((a) => a.slug !== params.slug)

  return (
    <div>
      <section
        className="relative min-h-[420px] flex items-end bg-gray-800 bg-no-repeat bg-cover bg-center pb-12"
        style={{ backgroundImage: `url('${article.image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-[11px] font-bold text-primary/90 uppercase tracking-wider mb-3 bg-white/10 backdrop-blur-sm inline-block px-3 py-1 rounded">
            {article.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white max-w-3xl leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/70 mt-4">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {article.date}
            </span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            <article>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm text-primary font-semibold mb-8 hover:-translate-x-1 transition-transform"
              >
                ← Back to News
              </Link>

              <div className="relative w-full h-[320px] mb-10">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>

              <div
                className="prose prose-gray dark:prose-invert max-w-none prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>

            <aside>
              <div className="text-sm font-bold text-[var(--fipl-heading)] mb-4 pb-3 border-b-2 border-primary">
                Recent Posts
              </div>
              {recent.map((a) => (
                <div key={a.id} className="flex gap-3 py-3 border-b border-[var(--fipl-border-subtle)]">
                  <Image
                    src={a.image}
                    alt={a.title}
                    width={64}
                    height={56}
                    className="shrink-0 rounded-lg object-cover"
                  />
                  <div>
                    <div className="text-[11px] text-[var(--fipl-body)] mb-1">{a.date}</div>
                    <Link
                      href={`/news/${a.slug}`}
                      className="text-[13px] font-semibold text-[var(--fipl-heading)] leading-snug hover:text-primary transition-colors"
                    >
                      {a.title}
                    </Link>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
