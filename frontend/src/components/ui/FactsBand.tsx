import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'

interface Fact {
  value: string
  label: string
}

function FactValue({ value, active }: { value: string; active: boolean }) {
  const trimmed = value.trim()
  const num = Number(trimmed)
  const isNumeric = trimmed !== '' && !isNaN(num) && Number.isInteger(num)
  const display = useCountUp(isNumeric ? num : 0, active && isNumeric)
  return <>{isNumeric ? display : value}</>
}

export default function FactsBand({ facts, dark = false }: { facts: Fact[]; dark?: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <section className={`py-14 px-6 ${dark ? 'bg-navy' : 'bg-white'}`}>
      <div
        ref={ref}
        className={`max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 transition-opacity duration-700 motion-reduce:transition-none ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {facts.map((f) => (
          <div key={f.label} className="text-center">
            <p className={`font-serif text-3xl md:text-4xl mb-2 ${dark ? 'text-brand-gold-light' : 'text-navy'}`}>
              <FactValue value={f.value} active={inView} />
            </p>
            <hr className={`w-10 mx-auto mb-3 border-t-2 ${dark ? 'border-white/20' : 'border-gray-200'}`} />
            <p className={`text-sm ${dark ? 'text-white/70' : 'text-gray-500'}`}>{f.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
