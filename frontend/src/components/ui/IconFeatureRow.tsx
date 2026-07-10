interface Feature {
  icon: string
  title: string
  description: string
}

export default function IconFeatureRow({ title, features, columns = 4 }: { title?: string; features: Feature[]; columns?: 3 | 4 }) {
  const colClass = columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'
  return (
    <section className="py-16 px-6 bg-gray-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto">
        {title && (
          <>
            <h2 className="font-serif text-3xl text-navy mb-2 text-center">{title}</h2>
            <hr className="w-16 border-brand-gold border-t-2 mx-auto mb-12" />
          </>
        )}
        <div className={`grid sm:grid-cols-2 ${colClass} gap-8`}>
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center text-3xl mx-auto mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-navy mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
