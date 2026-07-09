export default function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-6 ${className || ''}`}>
      {children}
    </div>
  )
}
