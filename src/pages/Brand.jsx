import { useParams, Link } from 'react-router-dom'
import Page from '../components/layout/Page'
import ProductGrid from '../components/shop/ProductGrid'
import Reveal from '../components/ui/Reveal'
import { BRANDS, productsByBrand, formatINR } from '../data/products'
import { ChevronRight } from 'lucide-react'

export default function Brand() {
  const { slug } = useParams()
  const brand = BRANDS.find((b) => b.slug === slug)
  const products = productsByBrand(slug)

  if (!brand) return null

  const others = BRANDS.filter((b) => b.slug !== slug)

  return (
    <Page>
      <div className="container-site py-10">
        <nav className="flex items-center gap-1.5 text-xs text-mist">
          <Link to="/" className="transition hover:text-espresso">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="transition hover:text-espresso">Shop</Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-espresso">{brand.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 rounded-3xl bg-gradient-to-br from-espresso to-espresso-deep p-8 text-ivory sm:p-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="inline-grid h-20 w-20 place-items-center rounded-2xl bg-ivory font-display text-2xl font-bold text-espresso">{brand.mark}</span>
            <h1 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">{brand.name}</h1>
            <p className="eyebrow mt-2 text-sand/80">{brand.tagline}</p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/80">{brand.blurb}</p>
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className="max-w-xs text-sm text-ivory/70">Every {brand.name} piece is sourced as genuine stock and verified against the brand’s retail list.</p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-end justify-between">
            <Reveal><h2 className="font-display text-2xl text-espresso">{brand.name} collection <span className="text-mist">· {products.length} items</span></h2></Reveal>
          </div>
          <div className="mt-6">
            <ProductGrid products={products} />
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-espresso/10 bg-cream/50 p-8">
          <h3 className="eyebrow text-espresso">Explore other makers</h3>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {others.map((b) => (
              <Link key={b.slug} to={`/brand/${b.slug}`} className="group rounded-2xl bg-white p-5 text-center transition hover:-translate-y-0.5 hover:shadow-card">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-cream font-display text-lg font-bold text-espresso transition group-hover:bg-espresso group-hover:text-ivory">{b.mark}</span>
                <p className="mt-3 text-sm font-bold text-espresso">{b.name}</p>
                <p className="mt-1 text-[11px] text-mist">{b.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Page>
  )
}