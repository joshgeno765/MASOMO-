import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Country, School, northAmerica, europe, comingSoon } from '../data/destinations'
import Button from '../components/ui/Button'
import VideoEmbed from '../components/ui/VideoEmbed'

interface ActiveVideo {
  videoId: string
  title: string
}

function SchoolCard({ s, onPlayVideo }: { s: School; onPlayVideo: (v: ActiveVideo) => void }) {
  return (
    <div className="relative h-40 rounded-lg overflow-hidden border border-gray-200">
      {s.photo ? (
        <>
          <img src={s.photo} alt={`${s.name}, ${s.city}`} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-navy" />
      )}
      <div className="relative h-full flex flex-col justify-end p-3">
        <div className="font-semibold text-white text-sm leading-tight">{s.name}</div>
        <div className="text-[11px] text-white/60 mb-1.5">{s.type} · {s.city}</div>
        <div className="flex items-center gap-3">
          <a
            href={s.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-brand-gold-light w-fit border-b border-brand-gold-light/50 hover:border-brand-gold-light"
          >
            Visit official website ↗
          </a>
          {s.videoId && (
            <button
              onClick={() => onPlayVideo({ videoId: s.videoId!, title: s.videoTitle ?? s.name })}
              className="text-[11px] font-bold text-white w-fit border-b border-white/50 hover:border-white"
            >
              ▶ Watch video
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function CountryBlock({ d, onPlayVideo }: { d: Country; onPlayVideo: (v: ActiveVideo) => void }) {
  return (
    <div className="py-12">
      {/* Header */}
      <div className="flex items-start gap-5 mb-8">
        <span className="text-4xl">{d.flag}</span>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="font-serif text-2xl text-navy">{d.name}</h2>
          </div>
          <p className="text-gray-500 text-sm mt-1">{d.tagline}</p>
        </div>
        <Link to={d.link} className="hidden md:inline-flex text-sm font-bold text-brand-blue hover:underline">
          {d.linkLabel}
        </Link>
      </div>

      {/* Partner school photo cards */}
      <div className={`grid gap-4 mb-10 ${d.schools.length >= 3 ? 'md:grid-cols-3' : d.schools.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-sm'}`}>
        {d.schools.map((s) => (<SchoolCard key={s.name} s={s} onPlayVideo={onPlayVideo} />))}
      </div>

      {/* Body */}
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Key Facts</h3>
          <div className="space-y-2.5">
            {d.facts.map((f) => (
              <div key={f.label} className="flex justify-between gap-4 border-b border-gray-100 pb-2.5">
                <span className="text-sm text-gray-500">{f.label}</span>
                <span className="text-sm font-semibold text-navy text-right">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Overview</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{d.desc}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Why {d.name}</h3>
          <ul className="space-y-2">
            {d.pros.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-brand-gold mt-0.5 flex-shrink-0 font-bold">—</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden mt-6">
        <Link to={d.link} className="text-sm font-bold text-brand-blue hover:underline">
          {d.linkLabel}
        </Link>
      </div>
    </div>
  )
}

export default function StudyDestinationsPage() {
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 max-w-xl">
            Where will you study abroad?
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            We work with students from Rwanda, DR Congo, and Djibouti to secure admission at top institutions across five countries.
          </p>
        </div>
      </section>

      {/* General "what awaits you abroad" video */}
      <section className="py-16 px-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">What awaits you abroad</p>
          <h2 className="font-serif text-3xl text-navy mb-6">See what studying in Canada is really like</h2>
          <VideoEmbed videoId="qfzYhUgz9cs" title="Study in Canada — A world of possibilities awaits (EduCanada)" />
          <p className="text-xs text-gray-400 mt-4">Official Government of Canada / EduCanada video.</p>
        </div>
      </section>

      {/* North America */}
      <section className="pt-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">Region</p>
          <h2 className="font-serif text-3xl text-navy">North America</h2>
        </div>
      </section>
      <section className="px-6">
        <div className="max-w-6xl mx-auto divide-y divide-gray-200">
          {northAmerica.map((d) => (<CountryBlock key={d.name} d={d} onPlayVideo={setActiveVideo} />))}
        </div>
      </section>

      {/* Europe */}
      <section className="pt-4 px-6">
        <div className="max-w-6xl mx-auto border-t border-gray-200 pt-12">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">Region</p>
          <h2 className="font-serif text-3xl text-navy">Europe</h2>
        </div>
      </section>
      <section className="px-6">
        <div className="max-w-6xl mx-auto divide-y divide-gray-200">
          {europe.map((d) => (<CountryBlock key={d.name} d={d} onPlayVideo={setActiveVideo} />))}
        </div>
      </section>

      {/* Coming soon regions */}
      <section className="py-16 px-6 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">Coming soon</p>
          <h2 className="font-serif text-3xl text-navy mb-8">Expanding to more regions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {comingSoon.map((c) => (
              <div key={c.region} className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <div className="text-4xl mb-3">{c.flags}</div>
                <div className="font-serif text-xl text-navy mb-1">{c.region}</div>
                <div className="text-sm text-gray-400">{c.note ?? 'Partner schools coming soon'}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400 text-center mt-10 max-w-6xl mx-auto">
          Campus photography courtesy of Wikimedia Commons contributors (CC BY-SA / public domain).
        </p>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-white mb-3">Not sure which country is right for you?</h2>
          <p className="text-white/70 mb-8">Answer 6 quick questions and we'll match you to a real pathway based on your goals, budget, and language preference.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button to="/pathway-finder" variant="primary">Find Your Pathway →</Button>
            <Button to="/consultation" variant="outline">Book Free Consultation</Button>
          </div>
        </div>
      </section>

      {/* Video lightbox */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setActiveVideo(null)}
        >
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <VideoEmbed videoId={activeVideo.videoId} title={activeVideo.title} />
            <button
              onClick={() => setActiveVideo(null)}
              className="mt-4 text-white text-sm font-semibold hover:underline"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
