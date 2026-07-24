export interface BenefitItem {
  title: string
  desc: string
}

interface BenefitGridProps {
  title?: string
  items: BenefitItem[]
  columns?: 2 | 3 | 4
  variant?: 'numeral' | 'rule'
  wrapperBg?: 'white' | 'gray-50'
}

export default function BenefitGrid({ title, items, columns = 2, variant = 'rule', wrapperBg = 'white' }: BenefitGridProps) {
  const colClass = columns === 4 ? 'md:grid-cols-4' : columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'

  if (variant === 'numeral') {
    return (
      <section className="py-4">
        <div className={`grid ${colClass}`}>
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`relative overflow-hidden px-8 md:px-14 py-12 ${i % 2 === 0 ? 'bg-white' : 'bg-brand-gold-light/10'} border-b border-r border-gray-200`}
            >
              <span className="absolute -top-4 right-4 text-8xl font-black text-navy/5 leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-navy mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className={`py-16 px-6 border-y border-gray-200 ${wrapperBg === 'gray-50' ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        {title && <h2 className="font-serif text-3xl text-navy mb-10">{title}</h2>}
        <div className={`grid ${colClass} gap-x-14 gap-y-8`}>
          {items.map((item) => (
            <div key={item.title} className="border-t-2 border-brand-gold pt-5">
              <h3 className="font-bold text-navy mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
