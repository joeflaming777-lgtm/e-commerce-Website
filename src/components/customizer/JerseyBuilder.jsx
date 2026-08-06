import { useState } from 'react'
import OptionPanel from './OptionPanel'
import { JerseyArt } from '../../assets/art/ProductArt'
import { JERSEY_OPTIONS, useCustomizer } from '../../store/useCustomizer'
import { useCart } from '../../store/useCart'
import { toast } from '../ui/Toast'
import { formatINR } from '../../data/products'
import { ShoppingBag } from 'lucide-react'

const PRICE = 2499
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function JerseyBuilder() {
  const { jersey, setJersey } = useCustomizer()
  const add = useCart((s) => s.add)
  const [size, setSize] = useState('M')

  const base = JERSEY_OPTIONS.baseColor.values.find((v) => v.key === jersey.baseColor)
  const sleeve = JERSEY_OPTIONS.sleeveColor.values.find((v) => v.key === jersey.sleeveColor)
  const final = PRICE + (jersey.teamName ? 199 : 0) + (jersey.name ? 299 : 0) + (jersey.number ? 199 : 0)

  const addToCart = () => {
    add({
      key: `custom-jersey-${Date.now()}`,
      name: `Custom Jersey · ${base.name}`,
      price: final,
      mrp: final,
      art: 'jersey',
      qty: 1,
      meta: `${size} · ${sleeve.name} trim${jersey.teamName ? ` · ${jersey.teamName}` : ''}${jersey.name ? ` · ${jersey.name}` : ''}${jersey.number ? ` · #${jersey.number}` : ''}`,
    })
    toast('Your custom jersey is in the bag', 'cart')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
      <div className="rounded-3xl border border-espresso/8 bg-gradient-to-br from-linen to-cream p-8">
        <div className="relative mx-auto aspect-[4/5] max-w-xs">
          <JerseyArt base={base.color} sleeve={sleeve.color} className="h-full w-full drop-shadow-xl" />
          {jersey.teamName && (
            <span className="absolute left-1/2 top-[30%] w-full -translate-x-1/2 px-3 text-center font-display text-lg font-semibold uppercase tracking-[0.18em] text-white" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.45)' }}>
              {jersey.teamName}
            </span>
          )}
          {jersey.number && (
            <span className="absolute left-1/2 top-[44%] -translate-x-1/2 font-display text-6xl font-bold text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.35)' }}>
              {jersey.number}
            </span>
          )}
          {jersey.name && (
            <span className="absolute left-1/2 top-[62%] w-full -translate-x-1/2 px-4 text-center font-display text-2xl font-semibold uppercase tracking-wide text-white" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
              {jersey.name}
            </span>
          )}
        </div>
        <p className="mt-4 text-center text-xs text-mist">Live preview — body and trim update as you pick.</p>
      </div>

      <div className="rounded-3xl border border-espresso/10 bg-white/70 p-6">
        <OptionPanel groups={[JERSEY_OPTIONS.baseColor, JERSEY_OPTIONS.sleeveColor]} value={jersey.baseColor} onChange={(k) => setJersey({ baseColor: k })} />

        <div className="mt-5">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Print on the jersey</p>
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Team name (optional)</span>
            <input value={jersey.teamName} onChange={(e) => setJersey({ teamName: e.target.value.toUpperCase().slice(0, 16) })} placeholder="e.g. THUNDER XI"
              className="w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm uppercase outline-none placeholder:text-mist focus:border-willow" />
          </label>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Player name (optional)</span>
            <input value={jersey.name} onChange={(e) => setJersey({ name: e.target.value.toUpperCase().slice(0, 12) })} placeholder="e.g. MEHTA"
              className="w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm uppercase outline-none placeholder:text-mist focus:border-willow" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Number (optional)</span>
            <input value={jersey.number} onChange={(e) => setJersey({ number: e.target.value.replace(/[^0-9]/g, '').slice(0, 2) })} placeholder="07"
              className="w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm outline-none placeholder:text-mist focus:border-willow" />
          </label>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Size</p>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`h-10 w-10 rounded-xl text-sm font-bold transition ${size === s ? 'bg-espresso text-ivory' : 'border border-espresso/15 bg-white text-espresso hover:bg-cream'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-cream/60 p-4 text-sm">
          <div className="flex justify-between"><span className="text-mist">Base jersey</span><span className="font-semibold text-espresso">{formatINR(PRICE)}</span></div>
          {jersey.teamName && <div className="mt-1 flex justify-between"><span className="text-mist">Team name print</span><span className="font-semibold text-espresso">+₹199</span></div>}
          {jersey.name && <div className="mt-1 flex justify-between"><span className="text-mist">Name print</span><span className="font-semibold text-espresso">+₹299</span></div>}
          {jersey.number && <div className="mt-1 flex justify-between"><span className="text-mist">Number print</span><span className="font-semibold text-espresso">+₹199</span></div>}
          <div className="mt-2 flex justify-between border-t border-espresso/10 pt-2 font-display text-lg font-semibold"><span>Total</span><span>{formatINR(final)}</span></div>
        </div>

        <button onClick={addToCart} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-4 text-sm font-bold text-ivory transition hover:-translate-y-0.5 hover:bg-black hover:shadow-warm">
          <ShoppingBag size={16} /> Add custom jersey · {formatINR(final)}
        </button>
      </div>
    </div>
  )
}