import { Suspense, lazy, useState } from 'react'
import { BALL_COLORS, useCustomizer } from '../../store/useCustomizer'
import { useCart } from '../../store/useCart'
import { toast } from '../ui/Toast'
import { formatINR } from '../../data/products'
import { ShoppingBag, Rotate3d } from 'lucide-react'

const ProductViewer = lazy(() => import('../../3d/ProductViewer'))

const PRICE = 1999

export default function BallBuilder() {
  const { ball, setBall } = useCustomizer()
  const add = useCart((s) => s.add)
  const ballColor = BALL_COLORS.find((b) => b.key === ball.color)
  const final = PRICE + (ball.seamText ? 199 : 0)

  const addToCart = () => {
    add({
      key: `custom-ball-${Date.now()}`,
      name: `Custom Ball · ${ballColor.name}`,
      price: final,
      mrp: final,
      art: 'ball',
      qty: 1,
      meta: ball.seamText ? `Seam print “${ball.seamText}”` : 'Plain seam',
    })
    toast('Your custom ball is in the bag', 'cart')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-espresso/8 bg-gradient-to-br from-linen to-cream">
        <Suspense fallback={<div className="grid h-full place-items-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-leather border-t-transparent" /></div>}>
          <ProductViewer type="ball" color={ballColor.color} />
        </Suspense>
        <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-mist backdrop-blur">
          <Rotate3d size={12} /> Drag to rotate
        </span>
        <span className="absolute bottom-4 left-4 rounded-full bg-espresso/85 px-3 py-1.5 text-xs font-bold text-ivory">{formatINR(final)}</span>
        {ball.seamText && (
          <span className="absolute bottom-4 right-4 rounded-full bg-white/85 px-3 py-1.5 text-xs font-bold italic text-espresso backdrop-blur">
            “{ball.seamText}” on the seam
          </span>
        )}
      </div>

      <div className="rounded-3xl border border-espresso/10 bg-white/70 p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Leather colour</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {BALL_COLORS.map((b) => {
            const active = ball.color === b.key
            return (
              <button key={b.key} onClick={() => setBall({ color: b.key })}
                className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${active ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/15 bg-white text-espresso hover:bg-cream'}`}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full shadow-inner" style={{ background: `radial-gradient(circle at 35% 30%, ${b.color}, #00000030), ${b.color}` }}>
                  <span className="h-3 w-3 rounded-full border-2 border-current opacity-70" />
                </span>
                <span>
                  <span className="block text-sm font-bold">{b.name}</span>
                  <span className="block text-[11px] opacity-70">Four-piece leather</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Seam print <span className="normal-case text-mist">(optional)</span></p>
          <input
            value={ball.seamText}
            onChange={(e) => setBall({ seamText: e.target.value.toUpperCase().slice(0, 12) })}
            placeholder="e.g. PAVILION 26"
            className="mt-2 w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm uppercase outline-none placeholder:text-mist focus:border-willow"
          />
        </div>

        <button onClick={addToCart} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-4 text-sm font-bold text-ivory transition hover:-translate-y-0.5 hover:bg-espresso-deep hover:shadow-warm">
          <ShoppingBag size={16} /> Add custom ball · {formatINR(final)}
        </button>
      </div>
    </div>
  )
}