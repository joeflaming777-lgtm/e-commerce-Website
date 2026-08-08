import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Page from '../components/layout/Page'
import CompareTable from '../components/compare/CompareTable'
import ProductArt from '../assets/art/ProductArt'
import { useCompare } from '../store/useCompare'
import { getProduct, PRODUCTS, BRANDS, brandSlug, formatINR } from '../data/products'
import Reveal from '../components/ui/Reveal'
import { Scale, ArrowRight, Plus, RotateCcw, Check } from 'lucide-react'

const MAX_PRICE = 26000

export default function Compare() {
  const ids = useCompare((s) => s.ids)
  const toggle = useCompare((s) => s.toggle)
  const clear = useCompare((s) => s.clear)
  const products = ids.map(getProduct).filter(Boolean)

  // Brand + price filter for the picker below.
  const [pfBrands, setPfBrands] = useState([])
  const [pfMax, setPfMax] = useState(MAX_PRICE)

  const pickable = useMemo(
    () => PRODUCTS.filter((p) => (pfBrands.length ? pfBrands.includes(brandSlug(p.brand)) : true) && p.price <= pfMax),
    [pfBrands, pfMax]
  )

  const toggleBrand = (slug) => setPfBrands((b) => (b.includes(slug) ? b.filter((x) => x !== slug) : [...b, slug]))

  return (
    <Page>
      <div className="container-site py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-2 text-leather"><Scale size={14} /> Compare Studio</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-espresso">Side-by-side, spec by spec</h1>
            <p className="mt-2 max-w-xl text-sm text-mist">
              Line up the numbers that decide a bat’s feel — weight, balance, swing, sweet spot and willow grade. Pick your products below.
            </p>
          </div>
          {products.length > 1 && (
            <button onClick={clear} className="rounded-full border border-espresso/15 bg-white px-5 py-2.5 text-sm font-semibold text-espresso transition hover:bg-cream">
              Clear all
            </button>
          )}
        </div>

        {/* compare-table area */}
        {products.length > 0 && (
          <div className="mt-8">
            {products.length === 1 && (
              <p className="mb-4 rounded-2xl border border-espresso/10 bg-cream/60 px-4 py-3 text-sm text-mist">
                One in the lineup. Add up to three more below to see the full comparison.
              </p>
            )}
            <CompareTable products={products} />
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-to-br from-espresso to-espresso-deep p-6 text-ivory sm:p-8">
              <div>
                <p className="font-display text-xl">Picked a winner?</p>
                <p className="mt-1 text-sm text-ivory/75">Add it straight to your bag from the table, or open its full page for the build-studio option.</p>
              </div>
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 text-sm font-bold text-espresso transition hover:bg-white">
                Keep browsing <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {/* Product picker with filters */}
        <Reveal className="mt-12">
          <div className="rounded-3xl border border-espresso/10 bg-white/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow text-leather">Add to compare</p>
                <h2 className="mt-1 font-display text-2xl text-espresso">Choose your products</h2>
                <p className="mt-1 text-sm text-mist">Filter by brand and price, then tap to add up to four.</p>
              </div>
              <span className="rounded-full bg-espresso px-4 py-2 text-xs font-bold text-ivory">{ids.length}/4 added</span>
            </div>

            {/* filter bar */}
            <div className="mt-5 flex flex-wrap items-end gap-4 rounded-2xl bg-linen/70 p-4">
              <div className="flex-1 min-w-[12rem]">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Brand</p>
                <div className="flex max-h-28 flex-wrap gap-1.5 overflow-y-auto">
                  {BRANDS.map((b) => {
                    const on = pfBrands.includes(b.slug)
                    return (
                      <button key={b.slug} onClick={() => toggleBrand(b.slug)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${on ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/15 text-espresso hover:bg-cream'}`}>
                        {b.name}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="w-full sm:w-64">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Max price</p>
                <input type="range" min={400} max={MAX_PRICE} step={100} value={pfMax}
                  onChange={(e) => setPfMax(+e.target.value)} className="w-full accent-espresso" />
                <p className="mt-1 text-xs text-mist">Up to ₹{pfMax.toLocaleString('en-IN')}</p>
              </div>
              <button onClick={() => { setPfBrands([]); setPfMax(MAX_PRICE) }} className="inline-flex items-center gap-1.5 text-xs font-bold text-espresso transition hover:text-willow">
                <RotateCcw size={13} /> Reset
              </button>
            </div>

            {/* product list */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pickable.map((p) => {
                const added = ids.includes(p.id)
                return (
                  <div key={p.id} className={`flex items-center gap-3 rounded-2xl border p-3 transition ${added ? 'border-willow bg-willow/5' : 'border-espresso/8 bg-white hover:-translate-y-0.5 hover:shadow-card'}`}>
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-cream">
                      <ProductArt art={p.image} className="h-9 w-9" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-espresso">{p.name}</span>
                      <span className="block text-xs text-mist">{p.brand} · {formatINR(p.price)}</span>
                    </span>
                    <button onClick={() => toggle(p.id)} aria-label={added ? `Remove ${p.name}` : `Add ${p.name}`}
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold transition ${added ? 'bg-willow text-ivory' : 'border border-espresso/15 text-espresso hover:bg-cream'}`}>
                      {added ? <Check size={14} /> : <Plus size={14} />}
                    </button>
                  </div>
                )
              })}
              {pickable.length === 0 && (
                <p className="col-span-full rounded-2xl border border-dashed border-espresso/15 p-6 text-center text-sm text-mist">No products match those filters.</p>
              )}
            </div>
          </div>
        </Reveal>

        {products.length === 0 && (
          <Reveal className="mt-6">
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-full border border-espresso/15 bg-white px-6 py-3 text-sm font-bold text-espresso transition hover:bg-cream">
              <Plus size={15} /> Browse the full shop
            </Link>
          </Reveal>
        )}
      </div>
    </Page>
  )
}