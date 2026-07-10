import { ReactNode } from 'react'
import Button from './Button'

interface PhotoHeroProps {
  image: string
  alt: string
  eyebrow?: string
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaTo?: string
  height?: string
  children?: ReactNode
}

export default function PhotoHero({ image, alt, eyebrow, title, subtitle, ctaLabel, ctaTo, height = 'h-[70vh] min-h-[420px] max-h-[640px]', children }: PhotoHeroProps) {
  return (
    <section className={`relative overflow-hidden ${height}`}>
      <img src={image} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
      <div className="relative h-full flex items-end">
        <div className="max-w-6xl mx-auto w-full px-6 pb-12 md:pb-16">
          <div className="max-w-xl">
            {eyebrow && <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-3">{eyebrow}</p>}
            <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-3">{title}</h1>
            {subtitle && <p className="text-white/80 text-base md:text-lg mb-6">{subtitle}</p>}
            <div className="flex flex-wrap items-center gap-4">
              {ctaLabel && ctaTo && <Button to={ctaTo} variant="primary">{ctaLabel}</Button>}
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
