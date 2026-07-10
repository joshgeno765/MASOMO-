import { ReactNode, useEffect, useState } from 'react'
import Button from './Button'

interface PhotoHeroProps {
  image?: string
  images?: string[]
  alt: string
  eyebrow?: string
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaTo?: string
  height?: string
  children?: ReactNode
}

export default function PhotoHero({ image, images, alt, eyebrow, title, subtitle, ctaLabel, ctaTo, height = 'h-[70vh] min-h-[420px] max-h-[640px]', children }: PhotoHeroProps) {
  const slides = images && images.length > 0 ? images : image ? [image] : []
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [slides.length])

  return (
    <section className={`relative overflow-hidden ${height}`}>
      {slides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === active ? alt : ''}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
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
