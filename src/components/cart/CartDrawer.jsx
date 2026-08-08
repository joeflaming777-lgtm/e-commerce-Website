import { useNavigate } from 'react-router-dom'
import Drawer from '../ui/Drawer'
import Quantity from '../ui/Quantity'
import Button from '../ui/Button'
import ProductArt from '../../assets/art/ProductArt'
import { useCart, cartSubtotal } from '../../store/useCart'
import { formatINR } from '../../data/products'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartDrawer({ open, onClose }) {
  const items = useCart((s) => s.items)
  const subtotal = useCart(cartSubtotal)
  const remove = useCart((s) => s.remove)
  const updateQty = useCart((s) => s.updateQty)
  const navigate = useNavigate()

  return (
    <Drawer open={open} onClose={onClose} title={`Your Bag (${items.reduce((n, i) => n + i.qty, 0)})`}>
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-cream text-leather"><ShoppingBag size={26} /></span>
          <h4 className="mt-4 font-display text-xl text-espresso">Your bag is empty</h4>
          <p className="mt-2 text-sm text-mist">Fill it with a bat that fits your game.</p>
          <button onClick={() => { onClose(); navigate('/shop') }} className="mt-6 rounded-full bg-espresso px-6 py-3 text-sm font-bold text-ivory transition hover:bg-espresso-deep">
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="px-6 py-4">
            {items.map((item) => (
              <div key={item.key} className="flex gap-4 border-b border-espresso/8 py-4 last:border-0">
                <span className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-cream">
                  <ProductArt art={item.art || item.image || 'bat'} className="h-14 w-14" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-espresso">{item.name}</p>
                      {item.meta && <p className="mt-0.5 truncate text-xs text-mist">{item.meta}</p>}
                    </div>
                    <button onClick={() => remove(item.key)} aria-label="Remove item" className="mt-0.5 text-mist transition hover:text-espresso">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <Quantity value={item.qty} onChange={(q) => updateQty(item.key, q)} />
                    <span className="text-sm font-bold text-willow">{formatINR(item.price * item.qty)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sticky bottom-0 border-t border-espresso/10 bg-linen/95 px-6 py-4 backdrop-blur">
            <div className="flex items-center justify-between text-sm">
              <span className="text-mist">Subtotal</span>
              <span className="font-display text-lg font-semibold text-espresso">{formatINR(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-mist">Delivery calculated at checkout.</p>
            <button
              onClick={() => { onClose(); navigate('/checkout') }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-3.5 text-sm font-bold text-ivory transition hover:bg-espresso-deep"
            >
              Checkout <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}
    </Drawer>
  )
}