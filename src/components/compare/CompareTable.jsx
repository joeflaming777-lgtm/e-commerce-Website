import { Link } from 'react-router-dom'
import ProductArt from '../../assets/art/ProductArt'
import { formatINR } from '../../data/products'
import { useCompare } from '../../store/useCompare'
import { X, Star, ShoppingBag } from 'lucide-react'
import { toast } from '../ui/Toast'
import { useCart } from '../../store/useCart'

const ROWS = [
  { key: 'price', label: 'Price', type: 'price' },
  { key: 'rating', label: 'Rating', type: 'rating' },
  { key: 'weight', label: 'Weight' },
  { key: 'height', label: 'Height / Balance' },
  { key: 'swing', label: 'Swing profile' },
  { key: 'bladeWidth', label: 'Blade width' },
  { key: 'edges', label: 'Edge thickness' },
  { key: 'sweetSpot', label: 'Sweet spot' },
  { key: 'willowGrade', label: 'Willow grade' },
  { key: 'grip', label: 'Grip' },
  { key: 'material', label: 'Material' },
  { key: 'size', label: 'Size' },
  { key: 'protection', label: 'Protection' },
  { key: 'durability', label: 'Durability' },
]

export default function CompareTable({ products }) {
  const remove = useCompare((s) => s.remove)
  const add = useCart((s) => s.add)

  const bestPrice = Math.min(...products.map((p) => p.price))
  const bestRating = Math.max(...products.map((p) => p.rating))

  return (
    <div className="overflow-x-auto rounded-3xl border border-espresso/10 bg-white/70">
      <div className="min-w-[720px]">
        {/* headers */}
        <div className="grid gap-px bg-espresso/8" style={{ gridTemplateColumns: `140px repeat(${products.length}, 1fr)` }}>
          <div className="bg-linen p-4" />
          {products.map((p) => (
            <div key={p.id} className="relative bg-linen p-4 text-center">
              <Link to={`/product/${p.id}`} className="group block">
                <span className="mx-auto grid aspect-square w-full max-w-[110px] place-items-center rounded-2xl bg-gradient-to-br from-linen to-cream">
                  <ProductArt art={p.image} className="h-4/5 w-4/5 transition-transform duration-500 group-hover:scale-105" />
                </span>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-leather">{p.brand}</p>
                <p className="mt-0.5 font-display text-base leading-tight text-espresso">{p.name}</p>
              </Link>
              <button onClick={() => remove(p.id)} aria-label={`Remove ${p.name}`} className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-espresso/8 text-espresso/60 transition hover:bg-espresso hover:text-ivory">
                <X size={12} />
              </button>
              <button
                onClick={() => { add({ key: p.id, productId: p.id, name: p.name, brand: p.brand, price: p.price, mrp: p.mrp, art: p.image, qty: 1 }); toast(`${p.name} added to bag`, 'cart') }}
                className="mt-3 inline-flex items-center gap-1 rounded-full bg-espresso px-3 py-1.5 text-[11px] font-bold text-ivory transition hover:bg-espresso-deep"
              >
                <ShoppingBag size={11} /> Add
              </button>
            </div>
          ))}
        </div>

        {/* body rows */}
        {ROWS.filter((r) => products.some((p) => p.specs?.[r.key] != null)).map((row) => {
          const isBest = (p) => (row.type === 'price' && p.price === bestPrice) || (row.type === 'rating' && p.rating === bestRating)
          return (
            <div key={row.key} className="grid gap-px bg-espresso/8" style={{ gridTemplateColumns: `140px repeat(${products.length}, 1fr)` }}>
              <div className="bg-linen px-4 py-4 text-xs font-bold uppercase tracking-wider text-espresso/70">{row.label}</div>
              {products.map((p) => {
                const best = isBest(p)
                const val = row.type === 'price' ? formatINR(p.price) : row.type === 'rating' ? `${p.rating}` : p.specs?.[row.key]
                return (
                  <div key={p.id} className={`relative bg-white px-4 py-4 text-center text-sm ${best ? 'font-bold text-willow' : 'text-espresso'}`}>
                    {val}
                    {best && row.type === 'price' && <span className="absolute -top-1 left-1/2 -translate-x-1/2 rounded-full bg-espresso px-2 py-0.5 text-[9px] font-bold uppercase text-ivory">Best price</span>}
                    {best && row.type === 'rating' && <span className="absolute -top-1 left-1/2 -translate-x-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-willow px-2 py-0.5 text-[9px] font-bold uppercase text-ivory"><Star size={8} className="fill-ivory" />Top</span>}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}