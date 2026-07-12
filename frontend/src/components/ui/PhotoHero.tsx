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
  secondaryTitle?: string
  secondarySubtitle?: string
  secondaryCtaLabel?: string
  secondaryCtaTo?: string
  secondaryChildren?: ReactNode
  height?: string
  children?: ReactNode
}

export default function PhotoHero({ image, images, alt, eyebrow, title, subtitle, ctaLabel, ctaTo, secondaryTitle, secondarySubtitle, secondaryCtaLabel, secondaryCtaTo, secondaryChildren, height = 'h-[70vh] min-h-[420px] max-h-[640px]', children }: PhotoHeroProps) {
  const slides = images && images.length > 0 ? images : image ? [image] : []
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<number[]>([0])

  useEffect(() => {
    if (slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % slides.length
        setLoaded((prev) => (prev.includes(next) ? prev : [...prev, next]))
        return next
      })
    }, 5000)
    return () => clearInterval(id)
  }, [slides.length])

  return (
    <section className={`relative overflow-hidden ${height}`}>
      {slides.map((src, i) => loaded.includes(i) && (
        <img
          key={src}
          src={src}
          alt={i === active ? alt : ''}
          loading="eager"
          {...(i === 0 ? { fetchpriority: 'high' } : {})}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
      <div className="relative h-full flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 pb-12 md:pb-16">
          {secondaryTitle ? (
            <>
              <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
                <div>
                  {eyebrow && <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-3">{eyebrow}</p>}
                  <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-3">{title}</h1>
                  {subtitle && <p className="text-white/80 text-base md:text-lg mb-6">{subtitle}</p>}
                  {ctaLabel && ctaTo && <Button to={ctaTo} variant="primary">{ctaLabel}</Button>}
                </div>

                <div>
                  <div className="flex items-center gap-3 md:hidden">
                    <span className="flex-1 h-px bg-white/30" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Or</span>
                    <span className="flex-1 h-px bg-white/30" />
                  </div>
                  <div className="hidden md:flex flex-col items-center gap-3 h-full">
                    <span className="flex-1 w-px bg-white/30" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Or</span>
                    <span className="flex-1 w-px bg-white/30" />
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-3">{secondaryTitle}</h2>
                  {secondarySubtitle && <p className="text-white/80 text-base md:text-lg mb-6">{secondarySubtitle}</p>}
                  <div className="flex flex-wrap items-center gap-4">
                    {secondaryCtaLabel && secondaryCtaTo && <Button to={secondaryCtaTo} variant="outline">{secondaryCtaLabel}</Button>}
                    {secondaryChildren}
                  </div>
                </div>
              </div>
              {children && <div className="flex flex-wrap items-center gap-4 mt-8">{children}</div>}
            </>
          ) : (
            <div className="max-w-xl">
              {eyebrow && <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-3">{eyebrow}</p>}
              <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-3">{title}</h1>
              {subtitle && <p className="text-white/80 text-base md:text-lg mb-6">{subtitle}</p>}
              <div className="flex flex-wrap items-center gap-4">
                {ctaLabel && ctaTo && <Button to={ctaTo} variant="primary">{ctaLabel}</Button>}
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
