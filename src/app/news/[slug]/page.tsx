import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articles, getArticleBySlug, getRecentArticles } from '@/lib/news'

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
        className="relative min-h-[320px] flex items-end bg-gray-800 bg-no-repeat bg-cover bg-center pb-12"
        style={{ backgroundImage: "url('https://picsum.photos/seed/fipl-n2/1920/700')" }}
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
            <span>📅 {article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            <article>
              <Link href="/news" className="inline-flex items-center gap-2 text-sm text-primary font-semibold mb-8 hover:-translate-x-1 transition-transform">
                ← Back to News
              </Link>

              <div className="h-[320px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 text-sm mb-10">
                [ {article.imagePlaceholder} ]
              </div>

              <div
                className="prose prose-gray max-w-none prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>

            <aside>
              <div className="text-sm font-bold text-gray-800 mb-4 pb-3 border-b-2 border-primary">
                Recent Posts
              </div>
              {recent.map((a) => (
                <div key={a.id} className="flex gap-3 py-3 border-b border-gray-100">
                  <div className="w-16 h-14 shrink-0 bg-gray-200 rounded-lg" />
                  <div>
                    <div className="text-[11px] text-gray-400 mb-1">{a.date}</div>
                    <Link
                      href={`/news/${a.slug}`}
                      className="text-[13px] font-semibold text-gray-800 leading-snug hover:text-primary transition-colors"
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
