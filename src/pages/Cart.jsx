import { Link } from 'react-router-dom'
import Page from '../components/layout/Page'
import Quantity from '../components/ui/Quantity'
import ProductArt from '../assets/art/ProductArt'
import { useCart, cartSubtotal } from '../store/useCart'
import { formatINR } from '../data/products'
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, RefreshCcw } from 'lucide-react'

const FREE_SHIP = 1499

export default function Cart() {
  const { items, remove, updateQty } = useCart()
  const subtotal = useCart(cartSubtotal)
  const shipping = subtotal >= FREE_SHIP ? 0 : 79
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <Page>
        <div className="container-site grid min-h-[55vh] place-items-center py-10 text-center">
          <div>
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-cream text-leather"><ShoppingBag size={32} /></span>
            <h1 className="mt-5 font-display text-3xl font-semibold text-espresso">Your bag is empty</h1>
            <p className="mx-auto mt-2 max-w-sm text-sm text-mist">Fill it with a bat that fits your game, or build your own in the Studio.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/shop" className="rounded-full bg-espresso px-7 py-3.5 text-sm font-bold text-ivory transition hover:bg-black">Browse the shop</Link>
              <Link to="/customize" className="rounded-full border border-espresso/15 bg-white px-7 py-3.5 text-sm font-bold text-espresso transition hover:bg-cream">Build Studio</Link>
            </div>
          </div>
        </div>
      </Page>
    )
  }

  return (
    <Page>
      <div className="container-site py-10">
        <h1 className="font-display text-4xl font-semibold text-espresso">Your bag <span className="text-mist">· {items.reduce((n, i) => n + i.qty, 0)} items</span></h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.key} className="flex gap-4 rounded-3xl border border-espresso/8 bg-white/70 p-4">
                <Link to={item.productId ? `/product/${item.productId}` : '/customize'} className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-linen to-cream">
                  <ProductArt art={item.art || 'bat'} className="h-16 w-16" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg leading-tight text-espresso">{item.name}</p>
                      {item.meta && <p className="mt-0.5 text-xs text-mist">{item.meta}</p>}
                    </div>
                    <button onClick={() => remove(item.key)} aria-label="Remove item" className="text-mist transition hover:text-espresso"><Trash2 size={17} /></button>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                    <Quantity value={item.qty} onChange={(q) => updateQty(item.key, q)} />
                    <span className="text-lg font-bold text-willow">{formatINR(item.price * item.qty)}</span>
                  </div>
                </div>
              </div>
            ))}
            <Link to="/shop" className="link-underline inline-flex items-center gap-1.5 pt-2 text-sm font-bold text-espresso">Continue shopping <ArrowRight size={14} /></Link>
          </div>

          <div className="h-fit rounded-3xl border border-espresso/10 bg-white/70 p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-xl text-espresso">Order summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-mist">Subtotal</span><span className="font-semibold text-espresso">{formatINR(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-mist">Shipping</span><span className="font-semibold text-espresso">{shipping === 0 ? 'FREE' : formatINR(shipping)}</span></div>
              {subtotal < FREE_SHIP && (
                <p className="rounded-xl bg-sand/30 px-3 py-2 text-xs text-espresso">Add {formatINR(FREE_SHIP - subtotal)} more for free delivery.</p>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-espresso/10 pt-4">
              <span className="text-mist">Total</span>
              <span className="font-display text-2xl font-semibold text-espresso">{formatINR(total)}</span>
            </div>
            <Link to="/checkout" className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-4 text-sm font-bold text-ivory transition hover:-translate-y-0.5 hover:bg-black hover:shadow-warm">
              Proceed to checkout <ArrowRight size={16} />
            </Link>
            <div className="mt-5 space-y-2.5 text-xs text-mist">
              <p className="flex items-center gap-2"><ShieldCheck size={14} className="text-willow" /> 15-day returns on unused items</p>
              <p className="flex items-center gap-2"><Truck size={14} className="text-willow" /> Dispatch within 24 hours</p>
              <p className="flex items-center gap-2"><RefreshCcw size={14} className="text-willow" /> 30-day bat warranty</p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}