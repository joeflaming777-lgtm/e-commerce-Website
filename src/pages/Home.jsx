import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import Page from '../components/layout/Page'
import Reveal, { SectionHeading } from '../components/ui/Reveal'
import ProductGrid from '../components/shop/ProductGrid'
import ProductArt from '../assets/art/ProductArt'
import { PRODUCTS, CATEGORIES, AUDIENCES, BRANDS } from '../data/products'
import { TESTIMONIALS } from '../data/testimonials'
import { ArrowRight, Star, Scale, Sparkles, ChevronRight } from 'lucide-react'

const HeroScene = lazy(() => import('../3d/HeroScene'))

export default function Home() {
  const bestSellers = PRODUCTS.filter((p) => p.rating >= 4.7).slice(0, 8)

  return (
    <Page>
      <Hero />
      <BrandStrip />
      <CategoryTiles />
      <PlayerSections />
      <BestSellers products={bestSellers} />
      <CompareTeaser />
      <CustomizerTeaser />
      <Testimonials />
      <CtaBand />
    </Page>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-site grid items-center gap-8 py-12 lg:grid-cols-[1fr_1.05fr] lg:py-20">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-2 text-leather">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" /> Season 2026 range is live
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-5 font-display text-[2.7rem] font-semibold leading-[1.04] text-espresso sm:text-6xl lg:text-[4.2rem]">
              Cricket kit,
              <br />
              <span className="italic text-willow">built to your</span>
              <br />
              game.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist">
              Hand-selected English and Kashmir willow, genuine leather, and kit cut for how you actually play. Compare every spec, build your own bat, and get it to your door in days.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/shop" className="group inline-flex items-center gap-2 rounded-full bg-espresso px-8 py-4 text-sm font-bold text-ivory transition hover:-translate-y-0.5 hover:bg-espresso-deep hover:shadow-warm">
                Shop the range <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
              <Link to="/customize" className="group inline-flex items-center gap-2 rounded-full border border-espresso/20 bg-white/70 px-8 py-4 text-sm font-bold text-espresso transition hover:-translate-y-0.5 hover:bg-white hover:shadow-warm">
                <Sparkles size={16} className="text-leather" /> Build your bat
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-espresso/10 pt-6">
              {[['120+', 'bat options'], ['18', 'brands stocked'], ['4.8★', 'avg. rating']].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl font-semibold text-espresso">{n}</p>
                  <p className="text-xs text-mist">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative aspect-square lg:aspect-[4/3.2]">
          <Suspense fallback={<div className="grid h-full place-items-center"><ProductArt art="bat" className="h-72 w-72 opacity-80" /></div>}>
            <HeroScene />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

function BrandStrip() {
  return (
    <section className="border-y border-espresso/8 bg-cream/50">
      <div className="container-site flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-6">
        <span className="eyebrow text-mist">Makers we carry</span>
        <div className="flex flex-1 flex-wrap items-center justify-around gap-x-8 gap-y-3">
          {BRANDS.map((b) => (
            <Link key={b.slug} to={`/brand/${b.slug}`} className="group flex items-center gap-2 font-display text-lg font-semibold text-espresso/60 transition hover:text-espresso">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[10px] font-bold shadow-sm">{b.mark}</span>
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryTiles() {
  const art = { bats: 'bat', balls: 'ball', protection: 'pads', apparel: 'jersey', footwear: 'shoes', accessories: 'stumps' }
  return (
    <section className="container-site py-16 lg:py-20">
      <SectionHeading
        eyebrow="Shop by position"
        title="Everything the crease needs"
        sub="From the willow in your hands to the shoes under your feet — organised the way cricketers think."
      />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.key} delay={i * 0.05} className="h-full">
            <Link to={`/category/${c.key}`} className="group flex h-full flex-col rounded-3xl border border-espresso/8 bg-white/70 p-4 text-center transition hover:-translate-y-1 hover:shadow-card">
              <span className="mx-auto grid aspect-square w-full max-w-[8rem] place-items-center rounded-2xl bg-gradient-to-br from-linen to-cream">
                <ProductArt art={art[c.key]} className="h-4/5 w-4/5 transition-transform duration-500 group-hover:scale-110" />
              </span>
              <span className="mt-3 text-sm font-bold text-espresso">{c.name}</span>
              <span className="mt-1 text-[11px] text-mist">{PRODUCTS.filter((p) => p.category === c.key).length} items</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function PlayerSections() {
  const palette = {
    men: { from: 'from-espresso', to: 'to-espresso-deep', tint: 'text-sand' },
    women: { from: 'from-[#1d5ca3]', to: 'to-[#0f2d52]', tint: 'text-sand' },
    juniors: { from: 'from-[#236a9e]', to: 'to-[#123a6b]', tint: 'text-sand' },
  }
  const art = { men: 'bat', women: 'pads', juniors: 'ball' }
  return (
    <section className="container-site pb-16 lg:pb-20">
      <SectionHeading
        eyebrow="Shop by player"
        title="Cut, weighted and fitted for you"
        sub="Men, women and juniors each get kit that’s shaped for the way their game is played."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {AUDIENCES.map((a, i) => (
          <Reveal key={a.key} delay={i * 0.08}>
            <Link to={`/shop?audience=${a.key}`} className={`group relative flex h-72 flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br ${palette[a.key].from} ${palette[a.key].to} p-7 text-ivory transition hover:-translate-y-1 hover:shadow-lift`}>
              <span className={`absolute -right-4 -top-4 h-40 w-40 rounded-full bg-ivory/5 blur-xl transition group-hover:bg-ivory/10`} />
              <span className="absolute bottom-16 right-4 opacity-90 transition duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <ProductArt art={art[a.key]} className="h-32 w-32" />
              </span>
              <p className={`eyebrow ${palette[a.key].tint}`}>Player</p>
              <h3 className="mt-2 font-display text-3xl font-semibold">{a.name}</h3>
              <p className="mt-2 max-w-[16rem] text-sm text-ivory/75">{a.blurb}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                Shop {a.name.toLowerCase()} <ArrowRight size={14} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function BestSellers({ products }) {
  return (
    <section className="bg-cream/40 py-16 lg:py-20">
      <div className="container-site">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Best sellers" title="The bats that win weekends" sub="Rated and reviewed by real club cricketers." />
          <Link to="/shop" className="link-underline hidden shrink-0 text-sm font-bold text-espresso sm:inline-flex">View all →</Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  )
}

function CompareTeaser() {
  return (
    <section className="container-site py-16 lg:py-20">
      <div className="grid items-center gap-10 rounded-[2rem] border border-espresso/8 bg-white/60 p-8 sm:p-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow flex items-center gap-2 text-leather"><Scale size={15} /> Compare kit</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-espresso sm:text-4xl">
            Weight. Height. Swing. <br /> Put them side by side.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist">
            Add up to four bats or balls and we’ll line up the numbers that actually matter — blade width, sweet spot, willow grade, grip — so you buy the bat that fits your game, not the marketing.
          </p>
          <Link to="/compare" className="group mt-7 inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-bold text-ivory transition hover:bg-espresso-deep">
            Open the Compare Studio <ArrowRight size={15} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-espresso to-espresso-deep p-6 text-ivory">
          <div className="grid grid-cols-[1fr_repeat(3,1fr)] gap-px overflow-hidden rounded-2xl bg-white/15 text-center text-xs">
            {['Spec', 'A', 'B', 'C'].map((h, i) => (
              <div key={i} className={`px-2 py-3 font-bold ${i === 0 ? 'text-left text-sand/80' : 'text-sand'}`}>{h}</div>
            ))}
            {[
              ['Weight', '2.10 lb', '2.12 lb', '2.09 lb'],
              ['Swing', 'Balanced', 'Low', 'Mid-high'],
              ['Blade', '108 mm', '110 mm', '109 mm'],
              ['Sweet spot', '21 cm', '22 cm', '20 cm'],
              ['Price', '₹24,999', '₹21,999', '₹17,999'],
            ].map(([l, a, b, c]) => (
              <div key={l} className="contents">
                <div className="bg-white/5 px-2 py-3 text-left font-semibold text-ivory/80">{l}</div>
                <div className="bg-white/5 px-2 py-3 text-sand">{a}</div>
                <div className="bg-white/5 px-2 py-3 font-bold text-[#f5f5f5]">{b}</div>
                <div className="bg-white/5 px-2 py-3 text-sand">{c}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] text-ivory/60">B highlighted — our pick for power hitters.</p>
        </div>
      </div>
    </section>
  )
}

function CustomizerTeaser() {
  return (
    <section className="container-site pb-16 lg:pb-20">
      <div className="grid items-center gap-10 rounded-[2rem] bg-gradient-to-br from-espresso to-espresso-deep p-8 text-ivory sm:p-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="grid h-full min-h-[16rem] place-items-center">
            <ProductArt art="bat" className="h-72 w-72 drop-shadow-2xl" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="eyebrow flex items-center gap-2 text-sand/80"><Sparkles size={15} /> Build Studio</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            A bat that has <em className="italic text-sand">your name</em> on it — literally.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory/80">
            Choose your willow grade, grip colour and sticker style, then engrave your name on the spine. Watch it build live in 3D, then ship to your door.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/customize" className="inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-sm font-bold text-espresso transition hover:bg-white">Start building <ArrowRight size={15} /></Link>
            <Link to="/customize?tab=jersey" className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-7 py-3.5 text-sm font-bold text-ivory transition hover:border-ivory/60">Custom jersey</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="bg-cream/40 py-16 lg:py-20">
      <div className="container-site">
        <SectionHeading eyebrow="From the nets" title="Rated by people who play" align="center" className="text-center" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-3xl border border-espresso/8 bg-white/70 p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={13} className={j < t.rating ? 'fill-gold text-gold' : 'text-mist/40'} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-espresso/90">“{t.quote}”</blockquote>
                <figcaption className="mt-5">
                  <p className="text-sm font-bold text-espresso">{t.name}</p>
                  <p className="text-xs text-mist">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBand() {
  return (
    <section className="container-site py-16 lg:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-espresso/10 bg-ivory p-10 text-center sm:p-16">
          <span className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-sand/40 blur-2xl" />
          <span className="absolute -bottom-12 -right-10 h-56 w-56 rounded-full bg-leather/20 blur-2xl" />
          <h2 className="relative mx-auto max-w-xl font-display text-3xl font-semibold leading-tight text-espresso sm:text-4xl">
            Gear that matches your ambition
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-[15px] text-mist">
            Get 10% off your first order, plus early access to new-season willow drops.
          </p>
          <div className="relative mt-8 flex justify-center">
            <Link to="/shop" className="group inline-flex items-center gap-2 rounded-full bg-espresso px-8 py-4 text-sm font-bold text-ivory transition hover:-translate-y-0.5 hover:bg-espresso-deep hover:shadow-warm">
              Start shopping <ChevronRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}