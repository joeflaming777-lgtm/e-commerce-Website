import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Page from '../components/layout/Page'
import ProductArt from '../assets/art/ProductArt'
import { useAuth } from '../store/useAuth'
import { formatINR } from '../data/products'
import { Check, Package, MapPin, CreditCard, ChevronRight } from 'lucide-react'

export default function OrderConfirm() {
  const { id } = useParams()
  const orders = useAuth((s) => s.orders)
  const order = orders.find((o) => o.id === id)

  return (
    <Page>
      <div className="container-site py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-willow text-ivory shadow-warm"
        >
          <Check size={38} />
        </motion.div>
        <div className="mx-auto mt-6 max-w-2xl text-center">
          <h1 className="font-display text-4xl font-semibold text-espresso">Order confirmed!</h1>
          <p className="mt-3 text-[15px] text-mist">
            Thank you — your kit is being hand-checked and packed. Order <span className="font-bold text-espresso">#{id}</span>
          </p>
          <p className="mt-1 text-sm text-mist">A confirmation has been sent to your phone and email.</p>
        </div>

        {order && (
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="rounded-3xl border border-espresso/10 bg-white/70 p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-willow/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-willow">{order.status}</span>
                <span className="text-xs text-mist">{order.date}</span>
              </div>
              <div className="mt-4 space-y-2.5">
                {order.items.map((it, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-cream"><ProductArt art={it.art || 'bat'} className="h-7 w-7" /></span>
                    <span className="min-w-0 flex-1 truncate text-espresso/90">{it.name} <span className="text-mist">× {it.qty}</span></span>
                    <span className="font-semibold text-espresso">{formatINR(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-espresso/10 pt-4">
                <span className="text-mist">Total</span>
                <span className="font-display text-2xl font-semibold text-willow">{formatINR(order.total)}</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-cream/50 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-espresso/70"><MapPin size={13} /> Delivery to</p>
                  <p className="mt-2 text-sm text-espresso/90">{order.address.name}</p>
                  <p className="text-sm text-mist">{order.address.line}, {order.address.city}</p>
                  <p className="text-sm text-mist">{order.address.state} — {order.address.pin}</p>
                </div>
                <div className="rounded-2xl bg-cream/50 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-espresso/70"><CreditCard size={13} /> Paid via</p>
                  <p className="mt-2 text-sm text-espresso/90">{order.payment}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-mist"><Package size={12} /> Dispatching within 24 hrs</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-bold text-ivory transition hover:bg-black">Continue shopping <ChevronRight size={15} /></Link>
              <Link to="/account" className="rounded-full border border-espresso/15 bg-white px-7 py-3.5 text-sm font-bold text-espresso transition hover:bg-cream">View my orders</Link>
            </div>
          </div>
        )}

        {!order && (
          <p className="mx-auto mt-10 max-w-md text-center text-sm text-mist">
            We couldn’t find this order in this session — it may have been placed before your last visit.{" "}
            <Link to="/account" className="font-bold text-leather">Check your account</Link>.
          </p>
        )}
      </div>
    </Page>
  )
}