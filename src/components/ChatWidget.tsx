'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface Message {
  role: 'user' | 'model'
  text: string
  time: string
}

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function renderBotText(text: string) {
  const parts = text.split(/(\[([^\]]+)\]\(([^)]+)\))/g)
  const nodes: React.ReactNode[] = []
  let i = 0
  while (i < parts.length) {
    const part = parts[i]
    if (/^\[([^\]]+)\]\(([^)]+)\)$/.test(part)) {
      const label = parts[i + 1]
      const href = parts[i + 2]
      nodes.push(
        <a key={i} href={href} className="underline font-semibold" style={{ color: '#DB1B0C' }}>
          {label}
        </a>,
      )
      i += 3
    } else {
      if (part) nodes.push(part)
      i++
    }
  }
  return <>{nodes}</>
}

const INITIAL_MESSAGE = "Hi! I'm FIPL's virtual assistant. How can I help you today?"

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: INITIAL_MESSAGE, time: '' },
  ])

  useEffect(() => {
    setMessages([{ role: 'model', text: INITIAL_MESSAGE, time: now() }])
  }, [])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (open && !loading) inputRef.current?.focus()
  }, [open, loading])

  async function sendText(text: string) {
    if (!text.trim() || loading) return
    setInput('')
    const updated: Message[] = [...messages, { role: 'user', text: text.trim(), time: now() }]
    setMessages(updated)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: data.text ?? 'Sorry, something went wrong.', time: now() },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: "Sorry, I'm having trouble connecting. Please try again.",
          time: now(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function send() {
    sendText(input)
  }

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 right-3 sm:right-6 z-50 flex flex-col rounded-2xl overflow-hidden"
          style={{
            width: 340,
            maxWidth: 'calc(100vw - 24px)',
            height: minimized ? 'auto' : 480,
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            fontFamily: 'Arial, sans-serif',
            animation: 'chatSlideUp 0.25s ease forwards',
            transition: 'height 0.25s ease',
          }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ background: 'linear-gradient(135deg, #DB1B0C 0%, #D97300 100%)' }}
          >
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                src="/images/sustainability/logoimage.png"
                alt="FIPL"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold text-sm leading-tight">FIPL Assistant</div>
              <div className="text-white/70 text-xs">Powered by AI</div>
            </div>
            <button
              onClick={() => setMinimized((m) => !m)}
              className="text-white/80 hover:text-white transition-colors shrink-0"
              aria-label={minimized ? 'Restore chat' : 'Minimise chat'}
            >
              {minimized ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>

          {!minimized && (
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 chat-bolt-bg">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed"
                    style={
                      m.role === 'user'
                        ? { background: '#DB1B0C', color: 'white', borderBottomRightRadius: 4 }
                        : { background: '#f3f4f6', color: '#1f2937', borderBottomLeftRadius: 4 }
                    }
                  >
                    {m.role === 'model' ? renderBotText(m.text) : m.text}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-0.5 px-1">{m.time}</span>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div
                    className="bg-[#f3f4f6] px-4 py-2.5 rounded-2xl"
                    style={{ borderBottomLeftRadius: 4 }}
                  >
                    <span className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="block w-1.5 h-1.5 rounded-full bg-gray-400"
                          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}

          {!minimized && messages.length === 1 && !loading && (
            <div className="shrink-0 px-3 pb-2 pt-2 bg-white flex flex-wrap gap-1.5">
              {[
                'Where is your head office?',
                'How do I apply for a job?',
                'How do I register as a vendor?',
                'What power plants do you operate?',
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => sendText(q)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-[#DB1B0C] hover:text-white hover:border-[#DB1B0C]"
                  style={{ borderColor: '#DB1B0C', color: '#DB1B0C', background: 'white' }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {!minimized && (
            <div className="shrink-0 px-3 py-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-200 outline-none focus:border-[#DB1B0C] transition-colors"
                ref={inputRef}
                placeholder="Type a message…"
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 500))}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                disabled={loading}
                maxLength={500}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors disabled:opacity-40"
                style={{ background: '#DB1B0C' }}
                aria-label="Send"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => {
          if (open) {
            setOpen(false)
            setMinimized(false)
            setMessages([
              {
                role: 'model',
                text: "Hi! I'm FIPL's virtual assistant. How can I help you today?",
                time: now(),
              },
            ])
          } else {
            setOpen(true)
          }
        }}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-3 sm:right-6 w-14 h-14 rounded-full flex items-center justify-center z-50 transition-transform hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #DB1B0C 0%, #D97300 100%)',
          boxShadow: '0 4px 20px rgba(219,27,12,0.4)',
        }}
      >
        {open ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </>
  )
}
