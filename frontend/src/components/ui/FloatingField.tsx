import { useState } from 'react'

export default function FloatingField({ label, name, value, onChange, type = 'text', required }: {
  label: string; name: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0
  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="peer w-full border border-gray-300 rounded-xl px-4 pt-5 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
      />
      <label
        className={`absolute left-4 transition-all pointer-events-none text-gray-400 ${
          floated ? 'top-1.5 text-[10px] font-semibold uppercase tracking-wide' : 'top-3.5 text-sm'
        }`}
      >
        {label}{required && ' *'}
      </label>
    </div>
  )
}
