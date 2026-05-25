'use client'

import { useState } from 'react'

interface Item {
  question: string
  answer: React.ReactNode
}

interface AccordionProps {
  items: Item[]
  variant?: 'default' | 'red'
  defaultOpen?: number | null
}

export function Accordion({ items, variant = 'default', defaultOpen = 0 }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen)

  if (variant === 'red') {
    return (
      <div className="rounded-xl overflow-hidden bg-primary">
        {items.map((item, i) => (
          <div key={i} className={i < items.length - 1 ? 'border-b border-white/20' : ''}>
            <button
              className="w-full text-left px-5 py-5 flex justify-between items-center gap-3 text-white font-semibold text-[13px]"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              {item.question}
              <span
                className={`shrink-0 text-white text-xs transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
              >
                ⌄
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-[600px]' : 'max-h-0'}`}
            >
              <div className="px-5 py-4 bg-white text-gray-600 text-[12px] leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            className={`w-full text-left px-5 py-4 flex justify-between items-center gap-3 transition-colors text-[15px] font-semibold ${
              open === i ? 'bg-primary text-white' : 'bg-white text-gray-800 hover:bg-gray-50'
            }`}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            {item.question}
            <span
              className={`shrink-0 text-sm transition-transform ${open === i ? 'rotate-180 text-white' : 'text-primary'}`}
            >
              ⌄
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-[600px]' : 'max-h-0'}`}
          >
            <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
