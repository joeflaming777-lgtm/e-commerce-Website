import { CATEGORIES, AUDIENCES, BRANDS, PRODUCTS } from '../../data/products'
import { RotateCcw } from 'lucide-react'

function Group({ title, children }) {
  return (
    <div className="border-b border-espresso/8 py-5 last:border-0">
      <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">{title}</h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function Check({ checked, onChange, label, count }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-espresso/90 transition hover:bg-cream/60">
      <span className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition ${checked ? 'border-espresso bg-espresso' : 'border-espresso/25 bg-white'}`}>
        {checked && <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-none stroke-ivory" strokeWidth="2"><path d="M2 6l3 3 5-6" /></svg>}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-mist">{count}</span>}
    </label>
  )
}

export default function Filters({ state, set }) {
  const toggle = (list, fn) => (val) => fn(list.includes(val) ? list.filter((x) => x !== val) : [...list, val])
  const hasActive = state.cats.length || state.brands.length || state.auds.length || state.maxPrice < 26000 || state.minRating > 0

  return (
    <div className="rounded-3xl border border-espresso/10 bg-white/60 p-5">
      {hasActive && (
        <button onClick={() => set.reset()} className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold text-espresso transition hover:text-[#a33728]">
          <RotateCcw size={13} /> Clear filters
        </button>
      )}
      <Group title="Category">
        {CATEGORIES.map((c) => (
          <Check key={c.key} checked={state.cats.includes(c.key)} onChange={toggle(state.cats, set.toggleCat)} label={c.name} count={countOf(c.key, 'category')} />
        ))}
      </Group>
      <Group title="Player">
        {AUDIENCES.map((a) => (
          <Check key={a.key} checked={state.auds.includes(a.key)} onChange={toggle(state.auds, set.toggleAud)} label={a.name} count={countOf(a.key, 'audience')} />
        ))}
      </Group>
      <Group title="Brand">
        {BRANDS.map((b) => (
          <Check key={b.slug} checked={state.brands.includes(b.slug)} onChange={toggle(state.brands, set.toggleBrand)} label={b.name} count={countOf(b.name, 'brand')} />
        ))}
      </Group>
      <Group title="Max price">
        <input
          type="range" min={400} max={26000} step={100}
          value={state.maxPrice}
          onChange={(e) => set.maxPrice(+e.target.value)}
          className="w-full accent-espresso"
        />
        <p className="mt-1 text-xs text-mist">Up to ₹{state.maxPrice.toLocaleString('en-IN')}</p>
      </Group>
      <Group title="Minimum rating">
        <div className="flex flex-wrap gap-1.5">
          {[4.5, 4.0, 3.5].map((r) => (
            <button
              key={r} onClick={() => set.minRating(state.minRating === r ? 0 : r)}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${state.minRating === r ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/15 text-espresso hover:bg-cream'}`}
            >
              {r}★ +
            </button>
          ))}
        </div>
      </Group>
    </div>
  )
}

function countOf(val, field) {
  return PRODUCTS.filter((p) => (field === 'category' ? p.category : field === 'audience' ? p.audience : p.brand) === val).length
}