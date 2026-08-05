import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react'
import Page from '../components/layout/Page'
import ProductGrid from '../components/shop/ProductGrid'
import Filters from '../components/shop/Filters'
import { PRODUCTS, brandSlug, formatINR } from '../data/products'

const MAX_PRICE = 26000
const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'low', label: 'Price: Low → High' },
  { key: 'high', label: 'Price: High → Low' },
  { key: 'rating', label: 'Top rated' },
  { key: 'discount', label: 'Biggest discount' },
]

export default function Shop() {
  const [params] = useSearchParams()
  const [cats, setCats] = useState(() => (params.get('category') ? [params.get('category')] : []))
  const [auds, setAuds] = useState(() => (params.get('audience') ? [params.get('audience')] : []))
  const [brands, setBrands] = useState([])
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState('featured')
  const [mobileFilters, setMobileFilters] = useState(false)

  const state = { cats, auds, brands, maxPrice, minRating }
  const set = {
    toggleCat: setCats,
    toggleAud: setAuds,
    toggleBrand: setBrands,
    maxPrice: setMaxPrice,
    minRating: setMinRating,
    reset: () => { setCats([]); setAuds([]); setBrands([]); setMaxPrice(MAX_PRICE); setMinRating(0) },
  }

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false
      if (auds.length && !auds.includes(p.audience)) return false
      if (brands.length && !brands.includes(brandSlug(p.brand))) return false
      if (p.price > maxPrice) return false
      if (minRating && p.rating < minRating) return false
      return true
    })
    switch (sort) {
      case 'low': list = [...list].sort((a, b) => a.price - b.price); break
      case 'high': list = [...list].sort((a, b) => b.price - a.price); break
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break
      case 'discount': list = [...list].sort((a, b) => (1 - a.price / a.mrp) - (1 - b.price / b.mrp)); break
      default: break
    }
    return list
  }, [cats, auds, brands, maxPrice, minRating, sort])

  const priceRange = useMemo(() => {
    const arr = results.map((p) => p.price)
    return arr.length ? [Math.min(...arr), Math.max(...arr)] : [0, 0]
  }, [results])

  const FiltersPanel = (
    <Filters
      state={state}
      set={set}
    />
  )

  return (
    <Page>
      <div className="container-site py-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-leather">The shop</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-espresso">All Cricket Kit</h1>
            <p className="mt-2 text-sm text-mist">
              {results.length} {results.length === 1 ? 'product' : 'products'} · from {formatINR(priceRange[0])} to {formatINR(priceRange[1])}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 rounded-full border border-espresso/15 bg-white px-4 py-2.5 text-sm">
              <ArrowUpDown size={14} className="text-leather" />
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent font-semibold text-espresso outline-none">
                {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </label>
            <button onClick={() => setMobileFilters(true)} className="flex items-center gap-2 rounded-full border border-espresso/15 bg-white px-4 py-2.5 text-sm font-semibold text-espresso lg:hidden">
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">{FiltersPanel}</aside>
          <ProductGrid products={results} />
        </div>
      </div>

      {/* mobile filter sheet */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[85] lg:hidden">
          <div className="absolute inset-0 bg-espresso/45" onClick={() => setMobileFilters(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[min(20rem,90vw)] flex-col bg-linen">
            <div className="flex items-center justify-between border-b border-espresso/10 px-5 py-4">
              <h3 className="font-display text-lg text-espresso">Filters</h3>
              <button onClick={() => setMobileFilters(false)} aria-label="Close filters" className="rounded-full bg-espresso/6 p-2"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{FiltersPanel}</div>
            <div className="border-t border-espresso/10 p-4">
              <button onClick={() => setMobileFilters(false)} className="w-full rounded-full bg-espresso py-3 text-sm font-bold text-ivory">Show {results.length} results</button>
            </div>
          </div>
        </div>
      )}
    </Page>
  )
}