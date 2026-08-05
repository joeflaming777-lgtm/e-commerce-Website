import { Link } from 'react-router-dom'
import Page from '../components/layout/Page'
import CompareTable from '../components/compare/CompareTable'
import { useCompare } from '../store/useCompare'
import { getProduct } from '../data/products'
import Reveal from '../components/ui/Reveal'
import { Scale, ArrowRight, Plus } from 'lucide-react'

export default function Compare() {
  const ids = useCompare((s) => s.ids)
  const clear = useCompare((s) => s.clear)
  const products = ids.map(getProduct).filter(Boolean)

  return (
    <Page>
      <div className="container-site py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-2 text-leather"><Scale size={14} /> Compare Studio</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-espresso">Side-by-side, spec by spec</h1>
            <p className="mt-2 max-w-xl text-sm text-mist">
              Line up the numbers that decide a bat’s feel — weight, balance, swing, sweet spot and willow grade.
            </p>
          </div>
          {products.length > 1 && (
            <button onClick={clear} className="rounded-full border border-espresso/15 bg-white px-5 py-2.5 text-sm font-semibold text-espresso transition hover:bg-cream">
              Clear all
            </button>
          )}
        </div>

        {products.length === 0 ? (
          <Reveal className="mt-10">
            <div className="grid min-h-[42vh] place-items-center rounded-3xl border border-dashed border-espresso/15 bg-white/40 p-10 text-center">
              <div>
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream text-leather"><Scale size={26} /></span>
                <h3 className="mt-4 font-display text-2xl text-espresso">Nothing to compare yet</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-mist">
                  Tap the <span className="font-semibold text-espresso">Scale icon</span> on any product card to add it here. Add up to four and we’ll line them up.
                </p>
                <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-bold text-ivory transition hover:bg-black">
                  <Plus size={15} /> Browse the shop
                </Link>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="mt-8">
            {products.length === 1 && (
              <p className="mb-4 rounded-2xl border border-espresso/10 bg-cream/60 px-4 py-3 text-sm text-mist">
                One more added. Add up to three more products to see the full comparison — or compare this one against the field in the shop.
              </p>
            )}
            <CompareTable products={products} />
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-to-br from-espresso to-black p-6 text-ivory sm:p-8">
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
      </div>
    </Page>
  )
}