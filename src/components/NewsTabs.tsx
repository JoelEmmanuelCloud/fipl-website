'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { NewsArticle } from '@/lib/news'

const CATEGORIES = [
  'All',
  'Operations',
  'Community',
  'Corporate',
  'Partnerships',
  'Updates',
] as const
const MK_TABS = ['Our Plants', 'People', 'Events', 'FIPL Foundation'] as const

export function NewsTabs({ articles }: { articles: NewsArticle[] }) {
  const [mainTab, setMainTab] = useState<'press' | 'media'>('press')
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [mkTab, setMkTab] = useState('Our Plants')
  const [page, setPage] = useState(1)
  const PER_PAGE = 3

  const pressArticles = articles.filter((a) => {
    const matchesCategory = filter === 'All' || a.category === filter
    const q = query.trim().toLowerCase()
    const matchesQuery =
      !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })
  const totalPages = Math.ceil(pressArticles.length / PER_PAGE)
  const paged = pressArticles.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const recent = [...articles]
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
    .slice(0, 7)

  return (
    <section className="py-16 bg-[var(--fipl-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-1 border-b-2 border-[var(--fipl-border)] mb-8">
          {(['press', 'media'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setMainTab(tab)
                setPage(1)
              }}
              className={`px-5 py-2.5 text-sm font-medium -mb-0.5 border-b-2 transition-colors ${
                mainTab === tab
                  ? 'text-primary border-primary font-semibold'
                  : 'text-[var(--fipl-body)] border-transparent hover:text-[var(--fipl-heading)]'
              }`}
            >
              {tab === 'press' ? '📰 Press Releases' : '📷 Media Kits'}
            </button>
          ))}
        </div>

        {mainTab === 'press' && (
          <>
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <select
                className="border border-[var(--fipl-border)] px-4 py-2 text-sm bg-[var(--fipl-bg)] text-[var(--fipl-heading)] focus:outline-none focus:border-[#DB1B0C]"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value)
                  setPage(1)
                }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c === 'All' ? `Sort By: Date (Newest)` : c}</option>
                ))}
              </select>
              <div className="relative flex-1 min-w-[200px]">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fipl-body)] w-4 h-4 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="search"
                  placeholder="Search News..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setPage(1)
                  }}
                  className="w-full border border-[var(--fipl-border)] pl-9 pr-4 py-2 text-sm bg-[var(--fipl-bg)] text-[var(--fipl-heading)] placeholder:text-[var(--fipl-body)] focus:outline-none focus:border-[#DB1B0C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
              <div>
                {paged.map((article) => (
                  <article
                    key={article.id}
                    className="bg-[var(--fipl-bg)] overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6"
                  >
                    <div className="relative h-48 sm:h-56 md:h-64 bg-gray-200 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 bg-[#DB1B0C] text-white text-xs font-bold px-3 py-2 leading-tight">
                        <div className="text-lg font-extrabold leading-none">
                          {new Date(article.dateISO).getDate()}
                        </div>
                        <div className="text-[10px] uppercase tracking-wide">
                          {new Date(article.dateISO).toLocaleString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 md:p-7">
                      <div className="text-[11px] font-bold text-[#DB1B0C] uppercase tracking-wider mb-2">
                        {article.category}
                      </div>
                      <h2 className="text-lg font-bold text-[var(--fipl-heading)] mb-3 leading-snug">
                        <Link
                          href={`/news/${article.slug}`}
                          className="hover:text-[#DB1B0C] transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h2>
                      <p className="text-sm text-[var(--fipl-body)] mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <Link
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#DB1B0C] hover:gap-3 transition-all"
                      >
                        Reading More ↗
                      </Link>
                    </div>
                  </article>
                ))}

                {totalPages > 1 && (
                  <div className="flex gap-2 justify-center mt-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-md text-sm font-medium border transition-colors ${
                          p === page
                            ? 'bg-primary text-white border-primary'
                            : 'bg-[var(--fipl-bg)] text-[var(--fipl-body)] border-[var(--fipl-border)] hover:border-primary hover:text-primary'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    {page < totalPages && (
                      <button
                        onClick={() => setPage(page + 1)}
                        className="w-9 h-9 rounded-md text-sm font-medium border bg-[var(--fipl-bg)] text-[var(--fipl-body)] border-[var(--fipl-border)] hover:border-primary hover:text-primary transition-colors"
                      >
                        ›
                      </button>
                    )}
                  </div>
                )}
              </div>

              <aside className="hidden lg:block">
                <div className="text-sm font-bold text-[var(--fipl-heading)] mb-4 pb-3 border-b-2 border-primary">
                  Recent Posts
                </div>
                {recent.map((a) => (
                  <div key={a.id} className="flex gap-3 py-3 border-b border-[var(--fipl-border-subtle)]">
                    <Image
                      src={a.image}
                      alt={a.title}
                      width={64}
                      height={64}
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
          </>
        )}

        {mainTab === 'media' && (
          <>
            <div className="flex flex-wrap gap-2 mb-7">
              {MK_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMkTab(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                    mkTab === tab
                      ? 'bg-primary text-white border-primary'
                      : 'bg-[var(--fipl-surface)] text-[var(--fipl-body)] border-[var(--fipl-border)] hover:border-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-[var(--fipl-surface)] rounded-xl overflow-hidden flex items-center justify-center text-[var(--fipl-body)] text-xs cursor-pointer hover:scale-[1.03] transition-transform"
                >
                  [ {mkTab} {i + 1} ]
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
