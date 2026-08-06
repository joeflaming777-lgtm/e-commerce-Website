const tones = {
  sale: 'bg-espresso text-ivory',
  new: 'bg-willow text-ivory',
  brand: 'bg-espresso text-ivory',
  soft: 'bg-cream text-espresso',
  low: 'bg-sand/70 text-espresso',
}

export default function Badge({ children, tone = 'soft', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}