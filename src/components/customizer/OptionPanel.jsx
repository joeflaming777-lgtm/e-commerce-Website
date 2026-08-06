import { Check } from 'lucide-react'

export default function OptionPanel({ groups, value, onChange }) {
  return (
    <div className="divide-y divide-espresso/8">
      {groups.map((group) => (
        <div key={group.label} className="py-4 first:pt-0 last:pb-0">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">{group.label}</p>
          <div className="flex flex-wrap gap-2">
            {group.values.map((v) => {
              const active = value === v.key
              return (
                <button
                  key={v.key}
                  onClick={() => onChange(v.key)}
                  aria-pressed={active}
                  className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                    active ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/15 bg-white text-espresso hover:bg-cream'
                  }`}
                >
                  <span className="relative grid h-4 w-4 place-items-center rounded-full ring-1 ring-black/10" style={{ background: v.color }}>
                    {active && <Check size={10} strokeWidth={3} className="text-white drop-shadow" />}
                  </span>
                  {v.name}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}