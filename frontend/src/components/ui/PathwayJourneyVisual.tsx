interface PathwayJourneyVisualProps {
  homeCountry: string
  isFmcPathway: boolean
  destinationFlag: string
  destinationName: string
  schoolLabel: string
  outcome: string
  labels?: {
    you: string
    fmcPilot: string
    eligiblePathway: string
    destination: string
    matchedSchool: string
    outcome: string
  }
}

const DEFAULT_LABELS = {
  you: 'You',
  fmcPilot: 'FMC Pilot',
  eligiblePathway: 'Eligible pathway',
  destination: 'Destination',
  matchedSchool: 'Matched school',
  outcome: 'Outcome',
}

interface Node {
  icon: React.ReactNode
  label: string
  sublabel: string
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function OutcomeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

export default function PathwayJourneyVisual({ homeCountry, isFmcPathway, destinationFlag, destinationName, schoolLabel, outcome, labels = DEFAULT_LABELS }: PathwayJourneyVisualProps) {
  const nodes: Node[] = [
    { icon: <span className="text-lg">📍</span>, label: labels.you, sublabel: homeCountry },
    ...(isFmcPathway ? [{ icon: <CheckIcon />, label: labels.fmcPilot, sublabel: labels.eligiblePathway }] : []),
    { icon: <span className="text-lg">{destinationFlag}</span>, label: destinationName, sublabel: labels.destination },
    { icon: <span className="text-lg">🎓</span>, label: schoolLabel, sublabel: labels.matchedSchool },
    { icon: <OutcomeIcon />, label: outcome, sublabel: labels.outcome },
  ]

  return (
    <div className="bg-navy rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row">
        {nodes.map((node, i) => (
          <div key={i} className="contents">
            <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-2 md:text-center flex-shrink-0 md:max-w-[8rem]">
              <div className="w-11 h-11 flex-shrink-0 rounded-full bg-brand-gold text-navy flex items-center justify-center">
                {node.icon}
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">{node.label}</div>
                <div className="text-white/50 text-xs">{node.sublabel}</div>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <>
                <div className="hidden md:block flex-1 border-t-2 border-dashed border-brand-gold/40 mt-[22px] mx-2" />
                <div className="md:hidden w-0.5 h-6 bg-brand-gold/40 ml-[22px] my-1" />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
