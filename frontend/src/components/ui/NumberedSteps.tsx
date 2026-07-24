export interface StepItem {
  title: string
  description: string
}

interface NumberedStepsProps {
  title?: string
  subtitle?: string
  steps: StepItem[]
  columns?: 3 | 4 | 5
  dark?: boolean
}

export default function NumberedSteps({ title, subtitle, steps, columns = 4, dark = false }: NumberedStepsProps) {
  const colClass =
    columns === 5
      ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
      : columns === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : 'sm:grid-cols-2 lg:grid-cols-4'

  return (
    <section className={`py-16 px-6 ${dark ? 'bg-navy' : 'bg-gray-50 border-y border-gray-200'}`}>
      <div className="max-w-6xl mx-auto">
        {title && <h2 className={`font-serif text-3xl mb-3 ${dark ? 'text-white' : 'text-navy'}`}>{title}</h2>}
        {subtitle && <p className={`mb-12 max-w-xl ${dark ? 'text-white/60' : 'text-gray-500'}`}>{subtitle}</p>}
        <div className={`grid grid-cols-2 ${colClass} gap-6 ${!subtitle ? 'mt-10' : ''}`}>
          {steps.map((s, i) => (
            <div key={s.title} className="flex flex-col items-start">
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-3 ${
                  dark ? 'bg-brand-gold text-navy' : 'bg-brand-gold-dark text-white'
                }`}
              >
                {i + 1}
              </span>
              <h3 className={`font-bold text-sm mb-1.5 ${dark ? 'text-white' : 'text-navy'}`}>{s.title}</h3>
              <p className={`text-xs leading-relaxed ${dark ? 'text-white/50' : 'text-gray-500'}`}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
