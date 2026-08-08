import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ProductArt from '../../assets/art/ProductArt'
import { useCompare } from '../../store/useCompare'
import { getProduct } from '../../data/products'
import { X, Scale, ArrowRight } from 'lucide-react'

export default function CompareBar() {
  const { pathname } = useLocation()
  const ids = useCompare((s) => s.ids)
  if (pathname === '/compare') return null
  const remove = useCompare((s) => s.remove)
  const clear = useCompare((s) => s.clear)
  const products = ids.map(getProduct).filter(Boolean)

  return (
    <AnimatePresence>
      {ids.length > 0 && (
        <motion.div
          initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-1/2 z-[60] w-full max-w-lg -translate-x-1/2 p-3"
        >
          <div className="rounded-2xl border border-espresso/10 bg-linen/95 p-3 shadow-lift backdrop-blur">
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-espresso">
                <Scale size={14} className="text-leather" /> Compare ({products.length}/4)
              </span>
              {products.length > 1 && (
                <button onClick={clear} className="text-xs font-semibold text-mist transition hover:text-espresso">
                  Clear all
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {products.map((p) => (
                <div key={p.id} className="relative flex-1">
                  <Link to={`/product/${p.id}`} className="flex items-center gap-2 rounded-xl bg-white p-1.5 pr-3 transition hover:bg-cream">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cream"><ProductArt art={p.image} className="h-6 w-6" /></span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-bold text-espresso">{p.name}</span>
                      <span className="block text-[10px] text-mist">{p.brand}</span>
                    </span>
                  </Link>
                  <button onClick={() => remove(p.id)} aria-label={`Remove ${p.name}`} className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-espresso text-ivory shadow hover:bg-espresso-deep">
                    <X size={10} />
                  </button>
                </div>
              ))}
              {products.length < 4 && (
                <Link to="/shop" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-dashed border-espresso/25 text-leather transition hover:border-leather hover:bg-cream">
                  +
                </Link>
              )}
            </div>
            <Link to="/compare" className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-espresso py-3 text-sm font-bold text-ivory transition hover:bg-espresso-deep">
              Compare dimensions <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}