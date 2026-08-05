import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Page from '../components/layout/Page'
import ProductGrid from '../components/shop/ProductGrid'
import Reveal, { SectionHeading } from '../components/ui/Reveal'
import { PRODUCTS, CATEGORIES, AUDIENCES } from '../data/products'
import { ChevronRight } from 'lucide-react'

export default function Category() {
  const { key } = useParams()
  const cat = CATEGORIES.find((c) => c.key === key)
  const [aud, setAud] = useState('all')
  const [sorted, setSorted] = useState('featured')

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.category === key)
    if (aud !== 'all') list = list.filter((p) => p.audience === aud)
    if (sorted === 'low') list = [...list].sort((a, b) => a.price - b.price)
    if (sorted === 'high') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [key, aud, sorted])

  if (!cat) return null

  return (
    <Page>
      <div className="container-site py-10">
        <nav className="flex items-center gap-1.5 text-xs text-mist">
          <Link to="/" className="transition hover:text-espresso">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="transition hover:text-espresso">Shop</Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-espresso">{cat.name}</span>
        </nav>

        <div className="mt-6 rounded-3xl bg-gradient-to-br from-espresso to-black p-8 text-ivory sm:p-12">
          <Reveal>
            <p className="eyebrow text-sand/80">{cat.tagline}</p>
            <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">{cat.name}</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/75">
              From hand-pressed willow to hand-stitched leather — every piece here is inspected, measured and benchmarked before it reaches your bag.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[{ key: 'all', name: 'All' }, ...AUDIENCES].map((a) => (
              <button key={a.key} onClick={() => setAud(a.key)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${aud === a.key ? 'bg-espresso text-ivory' : 'border border-espresso/15 bg-white text-espresso hover:bg-cream'}`}>
                {a.name}
              </button>
            ))}
          </div>
          <select value={sorted} onChange={(e) => setSorted(e.target.value)} className="rounded-full border border-espresso/15 bg-white px-4 py-2 text-sm font-semibold text-espresso outline-none">
            <option value="featured">Featured</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>

        <div className="mt-8">
          <ProductGrid products={products} />
        </div>

        <SectionHeading
          className="mt-20 text-center"
          align="center"
          eyebrow="Not sure where to start?"
          title="Compare before you commit"
          sub="Pick up to four bats or balls and put them side-by-side on weight, swing, blade and sweet spot."
        />
        <div className="mt-8 text-center">
          <Link to="/compare" className="inline-flex items-center gap-2 rounded-full bg-espresso px-8 py-3.5 text-sm font-bold text-ivory transition hover:bg-black">
            Open the Compare Studio
          </Link>
        </div>
      </div>
    </Page>
  )
}