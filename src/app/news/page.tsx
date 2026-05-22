import type { Metadata } from 'next'
import Link from 'next/link'
import { articles } from '@/lib/news'
import { NewsTabs } from '@/components/NewsTabs'
import { NewsHero } from '@/components/PageHeroes'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'News & Media' }

function BoltIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

const insights = articles.slice(0, 3)
const insightImages = [IMAGES.news.insight1, IMAGES.news.insight2, IMAGES.news.insight3]

export default function NewsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <NewsHero />

      {/* ── Tabs + Articles ───────────────────────────────────────── */}
      <NewsTabs articles={articles} />

      {/* ── Insights section ──────────────────────────────────────── */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#f8f8f8]">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                News &amp; Blog <BoltIcon />
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0E121D]">
                Insights, Updates &amp; Industry News
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((article, i) => (
              <Reveal key={article.id} variant="scale" delay={i * 0.12}>
                <div className="bg-white overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all fipl-card-hover">
                  <div className="relative h-44 bg-gray-200 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                      style={{ backgroundImage: `url('${insightImages[i]}')` }}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-3 left-3 text-white text-xs font-bold bg-black/50 px-2 py-1">
                      {article.date}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-[11px] font-bold text-[#DB1B0C] uppercase tracking-wider mb-2">
                      {article.category}
                    </div>
                    <h3 className="font-bold text-[#0E121D] text-[15px] leading-snug mb-3">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-[#797979]">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        {article.readTime}
                      </span>
                      <Link
                        href={`/news/${article.slug}`}
                        className="font-semibold text-[#DB1B0C] inline-flex items-center gap-1 hover:gap-2 transition-all text-xs"
                      >
                        Read More ↗
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
