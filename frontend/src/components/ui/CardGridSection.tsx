import Button from './Button'
import Reveal from './Reveal'

interface GridCard {
  image: string
  title: string
  subtitle?: string
  linkLabel: string
  linkTo: string
}

export default function CardGridSection({ eyebrow, title, cards, columns = 4 }: { eyebrow?: string; title?: string; cards: GridCard[]; columns?: 2 | 3 | 4 }) {
  const colClass = columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'
  return (
    <Reveal>
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {(eyebrow || title) && (
            <div className="text-center mb-12">
              {eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-2">{eyebrow}</p>}
              {title && <h2 className="font-serif text-3xl text-navy">{title}</h2>}
            </div>
          )}
          <div className={`grid sm:grid-cols-2 ${colClass} gap-6`}>
            {cards.map((c) => (
              <div key={c.title} className="text-center border border-gray-200 rounded-xl overflow-hidden">
                <img src={c.image} alt={c.title} loading="lazy" className="w-full h-40 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-navy mb-1">{c.title}</h3>
                  {c.subtitle && <p className="text-sm text-gray-500 mb-4">{c.subtitle}</p>}
                  <Button to={c.linkTo} variant="primary" className="!px-4 !py-2 text-xs">{c.linkLabel}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  )
}
