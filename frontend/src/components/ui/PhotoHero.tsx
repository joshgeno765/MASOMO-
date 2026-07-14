import { ReactNode } from 'react'
import Button from './Button'

interface PhotoHeroProps {
  image?: string
  alt: string
  eyebrow?: string
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaTo?: string
  quote?: string
  height?: string
  children?: ReactNode
}

export default function PhotoHero({ image, alt, eyebrow, title, subtitle, ctaLabel, ctaTo, quote, height = 'min-h-[420px]', children }: PhotoHeroProps) {
  return (
    <section className={`relative overflow-hidden ${height}`}>
      {image && (
        <img
          src={image}
          alt={alt}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover photo-grade"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
      <div className="relative py-14 md:py-20">
        <div className="max-w-6xl mx-auto w-full px-6">
          <div className="max-w-xl">
            {eyebrow && <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-3">{eyebrow}</p>}
            <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-3">{title}</h1>
            {subtitle && <p className="text-white/80 text-base md:text-lg mb-6">{subtitle}</p>}
            <div className="flex flex-wrap items-center gap-4">
              {ctaLabel && ctaTo && <Button to={ctaTo} variant="primary">{ctaLabel}</Button>}
              {children}
            </div>
          </div>
          {quote && (
            <div className="w-full mt-8 flex justify-center">
              <div className="bg-navy/70 backdrop-blur-sm rounded-xl px-6 py-4 max-w-2xl">
                <p className="font-serif text-lg md:text-2xl text-brand-gold-light italic leading-snug text-center">
                  "{quote}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
