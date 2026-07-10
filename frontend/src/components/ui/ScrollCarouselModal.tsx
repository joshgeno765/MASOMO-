import { useState } from 'react'

interface CarouselItem {
  image: string
  title: string
  body: string
}

export default function ScrollCarouselModal({ eyebrow, title, items }: { eyebrow?: string; title?: string; items: CarouselItem[] }) {
  const [active, setActive] = useState<CarouselItem | null>(null)

  return (
    <section className="py-16 px-6 bg-navy">
      <div className="max-w-6xl mx-auto">
        {(eyebrow || title) && (
          <div className="text-center mb-10">
            {eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">{eyebrow}</p>}
            {title && <h2 className="font-serif text-3xl text-white">{title}</h2>}
          </div>
        )}
        <div className="flex gap-5 overflow-x-auto pb-2">
          {items.map((item) => (
            <button
              key={item.title}
              onClick={() => setActive(item)}
              className="flex-shrink-0 w-56 text-left rounded-xl overflow-hidden border border-white/10 hover:border-brand-gold/50 transition-colors"
            >
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4 bg-white/5">
                <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                <span className="text-brand-gold-light text-xs font-bold">Read more →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => setActive(null)}>
          <div className="w-full max-w-md bg-white rounded-2xl p-8" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-2xl text-navy mb-4">{active.title}</h3>
            <p className="text-gray-600 leading-relaxed">{active.body}</p>
            <button onClick={() => setActive(null)} className="mt-6 text-sm font-semibold text-gray-400 hover:text-navy">
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
