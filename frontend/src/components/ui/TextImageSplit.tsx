import { ReactNode } from 'react'
import Reveal from './Reveal'

interface TextImageSplitProps {
  image: string
  alt: string
  eyebrow?: string
  title: string
  children: ReactNode
  imageSide?: 'left' | 'right'
  cta?: ReactNode
}

export default function TextImageSplit({ image, alt, eyebrow, title, children, imageSide = 'left', cta }: TextImageSplitProps) {
  return (
    <Reveal>
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className={`md:col-span-7 ${imageSide === 'left' ? 'md:order-1' : 'md:order-2'}`}>
            <img src={image} alt={alt} loading="lazy" className="w-full h-72 md:h-[28rem] object-cover photo-grade rounded-2xl" />
          </div>
          <div className={`md:col-span-5 md:p-6 ${imageSide === 'left' ? 'md:order-2' : 'md:order-1'}`}>
            {eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark mb-3">{eyebrow}</p>}
            <h2 className="font-serif text-3xl text-navy mb-4">{title}</h2>
            <hr className="w-16 border-brand-gold border-t-2 mb-6" />
            <div className="text-gray-600 leading-relaxed text-lg space-y-4">{children}</div>
            {cta && <div className="mt-6">{cta}</div>}
          </div>
        </div>
      </section>
    </Reveal>
  )
}
