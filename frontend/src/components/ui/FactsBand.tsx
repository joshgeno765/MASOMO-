interface Fact {
  value: string
  label: string
}

export default function FactsBand({ facts, dark = false }: { facts: Fact[]; dark?: boolean }) {
  return (
    <section className={`py-14 px-6 ${dark ? 'bg-navy' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {facts.map((f) => (
          <div key={f.label} className="text-center">
            <p className={`font-serif text-3xl md:text-4xl mb-2 ${dark ? 'text-brand-gold-light' : 'text-navy'}`}>{f.value}</p>
            <hr className={`w-10 mx-auto mb-3 border-t-2 ${dark ? 'border-white/20' : 'border-gray-200'}`} />
            <p className={`text-sm ${dark ? 'text-white/70' : 'text-gray-500'}`}>{f.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
