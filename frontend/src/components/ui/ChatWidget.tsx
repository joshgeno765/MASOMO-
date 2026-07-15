import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sendChatMessage, ChatMessage } from '../../lib/api'

export default function ChatWidget() {
  const { t, i18n } = useTranslation('chatbot')
  const language = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en'
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const updated: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await sendChatMessage(text, updated.slice(-12), language)
      const reply = res.data?.reply ?? t('errorFallback')
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: t('errorFallback') }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="mb-3 w-[340px] max-w-[calc(100vw-2.5rem)] h-[480px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-navy px-4 py-3.5 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-white font-bold text-sm">{t('title')}</p>
              <p className="text-white/60 text-xs">{t('subtitle')}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label={t('close')} className="text-white/70 hover:text-white p-1">
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm text-gray-700 max-w-[85%]">
              {t('welcome')}
            </div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`px-3.5 py-2.5 rounded-2xl text-sm max-w-[85%] whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-navy text-white rounded-tr-sm ml-auto'
                    : 'bg-white border border-gray-200 text-gray-700 rounded-tl-sm'
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm text-gray-400 max-w-[85%]">
                …
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 px-3 py-3 flex-shrink-0 bg-white">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('placeholder')}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-brand-gold text-navy font-bold text-sm px-4 py-2 rounded-full disabled:opacity-50 flex-shrink-0"
              >
                {t('send')}
              </button>
            </form>
            <p className="text-[10px] text-gray-400 mt-2 leading-snug">
              {t('disclaimer')}{' '}
              <a href="https://wa.me/17788468953" className="text-[#25D366] font-semibold hover:underline">
                {t('whatsapp')}
              </a>
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t('openLabel')}
        className="w-14 h-14 rounded-full bg-navy text-white shadow-xl flex items-center justify-center text-2xl hover:bg-navy-mid transition-colors ml-auto"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
