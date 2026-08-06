import { Suspense, lazy, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import Page from '../components/layout/Page'
import ProductArt from '../assets/art/ProductArt'
import SpecTable from '../components/product/SpecTable'
import Quantity from '../components/ui/Quantity'
import ProductGrid from '../components/shop/ProductGrid'
import { getProduct, PRODUCTS, brandSlug, formatINR, SWATCH } from '../data/products'
import { useCart } from '../store/useCart'
import { useCompare } from '../store/useCompare'
import { toast } from '../components/ui/Toast'
import { ChevronRight, Star, ShoppingBag, Scale, Box, Rotate3d, Truck, ShieldCheck, BadgeCheck, Sparkles } from 'lucide-react'

const ProductViewer = lazy(() => import('../3d/ProductViewer'))

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  const add = useCart((s) => s.add)
  const { ids, toggle } = useCompare()
  const [qty, setQty] = useState(1)
  const [view, setView] = useState('3d')

  const related = useMemo(() => PRODUCTS.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4), [product])
  if (!product) return null

  const { name, brand, price, mrp, rating, reviews, stock, colors, shortDesc, description, specs, audience, image } = product
  const discount = Math.round((1 - price / mrp) * 100)
  const comparing = ids.includes(id)
  const is3d = product.category === 'bats' || product.category === 'balls'

  const addToCart = () => {
    add({ key: id, productId: id, name, brand, price, mrp, art: image, qty })
    toast(`${qty} × ${name} added to bag`, 'cart')
  }

  return (
    <Page>
      <div className="container-site py-8">
        <nav className="flex items-center gap-1.5 text-xs text-mist">
          <Link to="/" className="hover:text-espresso">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-espresso">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/category/${product.category}`} className="hover:text-espresso">{cap(product.category)}</Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-espresso">{name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {/* Visual */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-espresso/8 bg-gradient-to-br from-linen to-cream">
              {is3d ? (
                view === '3d' ? (
                  <div className="absolute inset-0" key={id}>
                    <Suspense fallback={<div className="grid h-full place-items-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-leather border-t-transparent" /></div>}>
                      <ProductViewer
                        type={product.category}
                        wood="#E4E4E4" grip="#1F1F1F" sticker="#0A0A0A"
                      />
                    </Suspense>
                  </div>
                ) : (
                  <div className="grid h-full place-items-center"><ProductArt art={image} className="h-[80%] w-[80%]" /></div>
                )
              ) : (
                <div className="grid h-full place-items-center"><ProductArt art={image} className="h-[82%] w-[82%]" /></div>
              )}

              <div className="absolute left-4 top-4 flex flex-col items-start gap-1.5">
                {discount >= 10 && <span className="rounded-full bg-espresso px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ivory">-{discount}%</span>}
              </div>

              {is3d && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/80 p-1 shadow-card backdrop-blur">
                  <button onClick={() => setView('3d')} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${view === '3d' ? 'bg-espresso text-ivory' : 'text-espresso'}`}>
                    <Rotate3d size={13} /> 3D
                  </button>
                  <button onClick={() => setView('photo')} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${view === 'photo' ? 'bg-espresso text-ivory' : 'text-espresso'}`}>
                    <Box size={13} /> Studio
                  </button>
                </div>
              )}
              {view === '3d' && (
                <span className="absolute left-4 top-3 hidden items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-mist sm:flex">
                  <Rotate3d size={12} /> Drag to rotate
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center justify-between">
              <Link to={`/brand/${brandSlug(brand)}`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-leather transition hover:text-espresso">
                <BadgeCheck size={14} /> {brand}
              </Link>
              <span className="flex items-center gap-1 text-sm text-espresso">
                <Star size={14} className="fill-leather text-leather" /> {rating}
                <span className="text-xs text-mist">({reviews} reviews)</span>
              </span>
            </div>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-espresso">{name}</h1>
            {audience !== 'men' && <span className="mt-2 inline-block rounded-full bg-sand/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-espresso">{audience}</span>}

            <p className="mt-4 text-[15px] leading-relaxed text-mist">{shortDesc}</p>

            <div className="mt-5 flex items-end gap-3">
              <span className="font-display text-4xl font-semibold text-espresso">{formatINR(price)}</span>
              <span className="pb-1 text-base text-mist line-through">{formatINR(mrp)}</span>
              <span className="pb-1 text-sm font-bold text-espresso">Save {formatINR(mrp - price)}</span>
            </div>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-mist">
              <ShieldCheck size={13} className="text-willow" /> Inclusive of all taxes · {stock > 0 ? `${stock} in stock` : 'Out of stock'}
            </p>

            {/* colors */}
            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Colourway</p>
              <div className="mt-2.5 flex gap-2">
                {(colors || []).map((c) => (
                  <button key={c} className="grid h-9 w-9 place-items-center rounded-full border border-espresso/15 bg-white transition hover:scale-105" aria-label={c} style={{ borderColor: SWATCH[c] }}>
                    <span className="h-5 w-5 rounded-full ring-1 ring-espresso/10" style={{ background: SWATCH[c] || c }} />
                  </button>
                ))}
              </div>
            </div>

            {/* qty + actions */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Quantity value={qty} onChange={setQty} />
              <button onClick={addToCart} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-espresso px-8 py-3.5 text-sm font-bold text-ivory transition hover:-translate-y-0.5 hover:bg-black hover:shadow-warm">
                <ShoppingBag size={16} /> Add to Bag
              </button>
              <button
                onClick={() => { toggle(id); toast(comparing ? 'Removed from compare' : 'Added to compare') }}
                className={`flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-bold transition ${comparing ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/20 text-espresso hover:bg-espresso/5'}`}
              >
                <Scale size={16} /> {comparing ? 'Comparing' : 'Compare'}
              </button>
            </div>

            {product.category === 'bats' && (
              <Link to="/customize?from=bat" className="group mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-leather/50 bg-sand/20 p-3.5 transition hover:bg-sand/40">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-espresso text-sand"><Sparkles size={17} /></span>
                <span className="flex-1">
                  <span className="block text-sm font-bold text-espresso">Make it yours in the Build Studio</span>
                  <span className="block text-xs text-mist">Pick your willow grade, grip colour and engraving.</span>
                </span>
                <ChevronRight size={16} className="text-leather transition group-hover:translate-x-1" />
              </Link>
            )}

            {/* trust */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[{ icon: Truck, t: 'Fast dispatch', s: '2–4 days' }, { icon: Rotate3d, t: '15-day returns', s: 'No questions' }, { icon: ShieldCheck, t: 'Warranty', s: bambooWarranty(product) }].map(({ icon: Icon, t, s }) => (
                <div key={t} className="rounded-2xl border border-espresso/8 bg-white/60 p-3">
                  <Icon size={16} className="mx-auto text-leather" />
                  <p className="mt-1.5 text-xs font-bold text-espresso">{t}</p>
                  <p className="text-[11px] text-mist">{s}</p>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <SpecTable specs={specs} />
            </div>
          </div>
        </div>

        {/* description */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-espresso/8 bg-white/60 p-8">
            <h2 className="font-display text-2xl text-espresso">About the {name}</h2>
            <p className="mt-4 leading-relaxed text-mist">{description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[['Benchmarked', 'Measured and play-tested before dispatch'], ['Genuine stock', 'Direct from the brand’s retail list'], ['Hand-checked', 'Every piece passes a 12-point QC']].map(([t, s]) => (
                <div key={t} className="rounded-2xl bg-cream/60 p-4">
                  <p className="text-sm font-bold text-espresso">{t}</p>
                  <p className="mt-1 text-xs leading-relaxed text-mist">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-espresso/8 bg-gradient-to-br from-espresso to-black p-8 text-ivory">
            <p className="eyebrow text-sand/80">Gear up like a pro</p>
            <h3 className="mt-2 font-display text-2xl">Not sure if it suits your game?</h3>
            <p className="mt-3 text-sm leading-relaxed text-ivory/80">Compare it against up to three other options on weight, height, swing and sweet spot — then pick the one that fits your style.</p>
            <button onClick={() => { toggle(id); toast('Added to compare — open the bar below') }} className="mt-6 w-full rounded-full bg-ivory py-3 text-sm font-bold text-espresso transition hover:bg-white">
              Compare this product
            </button>
          </div>
        </div>

        {/* related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl text-espresso">You might also like</h2>
            <div className="mt-6"><ProductGrid products={related} /></div>
          </div>
        )}
      </div>
    </Page>
  )
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const bambooWarranty = (p) => (p.category === 'bats' ? '30-day willow' : p.category === 'balls' ? 'Sewn & sealed' : '12-month')