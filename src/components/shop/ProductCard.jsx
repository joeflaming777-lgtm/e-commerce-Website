import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Scale, Heart, Star } from 'lucide-react'
import ProductArt from '../../assets/art/ProductArt'
import { formatINR, SWATCH } from '../../data/products'
import { useCart } from '../../store/useCart'
import { useCompare } from '../../store/useCompare'
import { toast } from '../ui/Toast'
import Badge from '../ui/Badge'

export default function ProductCard({ product, index = 0 }) {
  const { id, name, brand, price, mrp, rating, reviews, stock, image, shortDesc, audience, colors = [] } = product
  const add = useCart((s) => s.add)
  const { ids, toggle } = useCompare()
  const [wish, setWish] = useState(false)
  const discount = Math.round((1 - price / mrp) * 100)
  const comparing = ids.includes(id)

  const quickAdd = (e) => {
    e.preventDefault()
    add({ key: id, productId: id, name, brand, price, mrp, art: image, qty: 1 })
    toast(`${name} added to bag`, 'cart')
  }

  const lowStock = stock <= 10

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${id}`} className="group block overflow-hidden rounded-3xl border border-espresso/8 bg-white/70">
        {/* visual */}
        <div className="relative m-3 grid aspect-square place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-linen to-cream">
          <ProductArt art={image} className="h-4/5 w-4/5 drop-shadow transition-transform duration-500 ease-out group-hover:scale-105" />
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {discount >= 10 && <Badge tone="sale">-{discount}%</Badge>}
            {audience === 'junior' && <Badge tone="new">Junior</Badge>}
            {lowStock && <Badge tone="low">Only {stock} left</Badge>}
          </div>
          {/* hover actions */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <button
              onClick={quickAdd}
              aria-label="Quick add to bag"
              className="grid h-9 w-9 place-items-center rounded-full bg-espresso text-ivory shadow-card transition hover:scale-105 hover:bg-espresso-deep"
            >
              <ShoppingBag size={15} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); toggle(id); toast(comparing ? 'Removed from compare' : 'Added to compare') }}
              aria-label="Toggle compare"
              className={`grid h-9 w-9 place-items-center rounded-full shadow-card transition hover:scale-105 ${comparing ? 'bg-espresso text-sand' : 'bg-white text-espresso'}`}
            >
              <Scale size={15} />
            </button>
          </div>
        </div>

        {/* info */}
        <div className="p-4 pt-2">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-leather">
            <span>{brand}</span>
            <span className="flex items-center gap-1 normal-case tracking-normal text-mist">
              <Star size={11} className="fill-gold text-gold" /> {rating} <span className="text-mist/70">({reviews})</span>
            </span>
          </div>
          <h3 className="mt-1.5 font-display text-lg leading-snug text-espresso">{name}</h3>
          <p className="mt-1 line-clamp-1 text-[13px] text-mist">{shortDesc}</p>
          <div className="mt-3 flex items-center gap-2.5">
            <span className="text-[15px] font-bold text-willow">{formatINR(price)}</span>
            <span className="text-[13px] text-mist line-through">{formatINR(mrp)}</span>
            {discount > 0 && <span className="text-[12px] font-bold text-espresso">-{discount}%</span>}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex gap-1">
              {colors.slice(0, 3).map((c) => (
                <span key={c} className="h-2.5 w-2.5 rounded-full ring-1 ring-espresso/15" style={{ background: SWATCH[c] || c }} />
              ))}
            </span>
            <button
              onClick={() => { setWish((w) => !w); toast(wish ? 'Removed from wishlist' : 'Saved to wishlist') }}
              aria-label="Save to wishlist"
              className={`ml-auto grid h-8 w-8 place-items-center rounded-full transition ${wish ? 'bg-espresso/10 text-espresso' : 'text-mist hover:bg-cream hover:text-espresso'}`}
            >
              <Heart size={15} className={wish ? 'fill-espresso' : ''} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}