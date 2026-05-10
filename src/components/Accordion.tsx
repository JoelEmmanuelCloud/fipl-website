'use client'

import { useState } from 'react'

interface Item {
  question: string
  answer: React.ReactNode
}

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            className={`w-full text-left px-5 py-4 flex justify-between items-center gap-3 transition-colors text-[15px] font-semibold ${
              open === i
                ? 'bg-primary text-white'
                : 'bg-white text-gray-800 hover:bg-gray-50'
            }`}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            {item.question}
            <span className={`shrink-0 text-sm transition-transform ${open === i ? 'rotate-180 text-white' : 'text-primary'}`}>
              ⌄
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === i ? 'max-h-[600px]' : 'max-h-0'
            }`}
          >
            <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
