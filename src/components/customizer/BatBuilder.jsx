import { Suspense, lazy, useState } from 'react'
import OptionPanel from './OptionPanel'
import { BAT_OPTIONS, useCustomizer } from '../../store/useCustomizer'
import { useCart } from '../../store/useCart'
import { toast } from '../ui/Toast'
import { formatINR } from '../../data/products'
import { ShoppingBag, Rotate3d } from 'lucide-react'

const ProductViewer = lazy(() => import('../../3d/ProductViewer'))

const PRICE = { english: 21999, kashmir: 9999, vintage: 18999, dark: 23999 }
const NAME = {
  english: 'English Willow · Pro', kashmir: 'Kashmir Willow', vintage: 'Vintage Dry Willow', dark: 'Premium Select',
}

export default function BatBuilder() {
  const { bat, setBat } = useCustomizer()
  const add = useCart((s) => s.add)
  const [engraving, setEngravingLocal] = useState(bat.engraving)
  const [wordmark, setWordmark] = useState('')

  const wood = BAT_OPTIONS.woodTone.values.find((v) => v.key === bat.woodTone)
  const grip = BAT_OPTIONS.gripColor.values.find((v) => v.key === bat.gripColor)
  const sticker = BAT_OPTIONS.sticker.values.find((v) => v.key === bat.sticker)
  const price = PRICE[bat.woodTone] + (bat.engraving ? 499 : 0)

  const addToCart = () => {
    add({
      key: `custom-bat-${Date.now()}`,
      name: `Custom Bat · ${NAME[bat.woodTone]}`,
      price,
      mrp: price,
      art: 'bat',
      qty: 1,
      meta: `Grip ${grip.name} · ${sticker.name} sticker${bat.engraving ? ` · Engraved “${bat.engraving}”` : ''}`,
    })
    toast('Your custom bat is in the bag', 'cart')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
      <div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-espresso/8 bg-gradient-to-br from-linen to-cream">
          <Suspense fallback={<div className="grid h-full place-items-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-leather border-t-transparent" /></div>}>
            <ProductViewer
              type="bat"
              wood={wood.color}
              grip={grip.color}
              sticker={sticker.color}
              engraving={bat.engraving}
            />
          </Suspense>
          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-mist backdrop-blur">
            <Rotate3d size={12} /> Drag to rotate · live preview
          </span>
          <span className="absolute bottom-4 left-4 rounded-full bg-espresso/85 px-3 py-1.5 text-xs font-bold text-ivory">{formatINR(price)}</span>
        </div>

        <div className="mt-4 rounded-2xl border border-espresso/10 bg-white/70 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Spine engraving</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              value={engraving}
              onChange={(e) => { setEngravingLocal(e.target.value); setBat({ engraving: e.target.value }) }}
              maxLength={14}
              placeholder="Your name here (up to 14 letters)"
              className="min-w-0 flex-1 rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm outline-none placeholder:text-mist focus:border-willow"
            />
            <span className="hidden items-center gap-1 rounded-xl bg-cream px-3 text-xs text-mist sm:flex">{engraving.length}/14</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-mist">
            <span>{bat.engraving ? '+ ₹499 engraving applied' : 'Engraving adds ₹499'}</span>
            {bat.engraving && <button onClick={() => { setEngravingLocal(''); setBat({ engraving: '' }) }} className="font-semibold text-espresso">Remove</button>}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-espresso/10 bg-white/70 p-6">
        <OptionPanel groups={[BAT_OPTIONS.woodTone, BAT_OPTIONS.gripColor, BAT_OPTIONS.sticker]} value={bat.woodTone} onChange={(k) => setBat({ woodTone: k })} />
        <button onClick={addToCart} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-4 text-sm font-bold text-ivory transition hover:-translate-y-0.5 hover:bg-espresso-deep hover:shadow-warm">
          <ShoppingBag size={16} /> Add custom bat · {formatINR(price)}
        </button>
        <p className="mt-3 text-center text-[11px] text-mist">Hand-built to your spec · dispatched in 5–7 days</p>
      </div>
    </div>
  )
}