import { Link } from 'react-router-dom'

interface DestinationAccentCardProps {
  flag: string
  name: string
  count: string
  exploreLabel: string
  to: string
}

export default function DestinationAccentCard({ flag, name, count, exploreLabel, to }: DestinationAccentCardProps) {
  return (
    <Link to={to} className="group bg-navy-mid rounded-lg p-6 h-72 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200">
      <p className="text-3xl">{flag}</p>
      <div>
        <hr className="w-10 border-t-2 border-brand-gold-light mb-3" />
        <p className="text-white font-bold text-base leading-tight">{name}</p>
        <p className="text-white/60 text-xs mt-1">{count}</p>
        <span className="inline-block mt-3 text-xs font-semibold text-white/90 border-b border-brand-gold-light">{exploreLabel}</span>
      </div>
    </Link>
  )
}
