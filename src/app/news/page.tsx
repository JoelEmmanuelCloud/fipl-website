import type { Metadata } from 'next'
import Link from 'next/link'
import { articles } from '@/lib/news'
import { NewsTabs } from '@/components/NewsTabs'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'News & Media' }

const insights = articles.slice(0, 3)

export default function NewsPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative mt-[72px] min-h-[220px] md:min-h-[300px] lg:min-h-[360px] flex items-center bg-gray-800 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('${IMAGES.news.hero}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">
          <span className="inline-flex items-center gap-2 border border-white/30 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            Media Centre ⚡
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">News &amp; Media</h1>
          <p className="text-white/80 mt-4 max-w-lg leading-relaxed">
            Stay current with the latest updates, press releases, and stories from First Independent
            Power Limited.
          </p>
        </div>
      </section>

      {/* TABS — client component receives pre-fetched articles */}
      <NewsTabs articles={articles} />

      {/* INSIGHTS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">News &amp; Blog ⚡</span>
            <h2 className="text-3xl font-bold text-gray-800">Insights, Updates &amp; Industry News</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="h-44 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  [ {article.imagePlaceholder} ]
                </div>
                <div className="p-5">
                  <div className="text-[11px] font-bold text-primary uppercase tracking-wider mb-2">
                    {article.category}
                  </div>
                  <h3 className="font-bold text-gray-800 text-[15px] leading-snug mb-3">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>📅 {article.date}</span>
                    <Link
                      href={`/news/${article.slug}`}
                      className="font-semibold text-primary hover:gap-2 inline-flex items-center gap-1 transition-all"
                    >
                      Read More ↗
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
