import { useState } from 'react'
import { ChevronDown, Ruler, Weight, Scale, Gauge, Target, Diamond, Wind } from 'lucide-react'

const ROW_META = [
  { key: 'weight', label: 'Weight', icon: Weight },
  { key: 'height', label: 'Height / Balance', icon: Ruler },
  { key: 'swing', label: 'Swing profile', icon: Wind },
  { key: 'bladeWidth', label: 'Blade width', icon: Ruler },
  { key: 'edges', label: 'Edge thickness', icon: Scale },
  { key: 'sweetSpot', label: 'Sweet spot', icon: Target },
  { key: 'willowGrade', label: 'Willow grade', icon: Diamond },
  { key: 'grip', label: 'Grip', icon: Scale },
  { key: 'material', label: 'Material', icon: Diamond },
  { key: 'size', label: 'Size', icon: Ruler },
  { key: 'protection', label: 'Protection', icon: Gauge },
  { key: 'durability', label: 'Durability', icon: Gauge },
  { key: 'colorway', label: 'Colourway', icon: Scale },
]

export default function SpecTable({ specs }) {
  const [open, setOpen] = useState(true)
  if (!specs) return null
  const rows = ROW_META.filter((r) => specs[r.key])

  return (
    <div className="overflow-hidden rounded-2xl border border-espresso/10 bg-white/70">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-5 py-4 text-left">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-espresso">Spec sheet</span>
        <ChevronDown size={16} className={`text-leather transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <dl className="border-t border-espresso/8">
          {rows.map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex items-center justify-between gap-4 px-5 py-3 odd:bg-cream/40">
              <dt className="flex items-center gap-2 text-sm text-mist"><Icon size={14} className="text-leather" />{label}</dt>
              <dd className="text-right text-sm font-semibold text-espresso">{specs[key]}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}