import { Link } from 'react-router-dom'
import Page from '../components/layout/Page'
import ProductArt from '../assets/art/ProductArt'

export default function NotFound() {
  return (
    <Page>
      <div className="container-site grid min-h-[60vh] place-items-center py-12 text-center">
        <div>
          <div className="mx-auto w-56 opacity-90">
            <ProductArt art="stumps" className="h-full w-full" />
          </div>
          <h1 className="mt-2 font-display text-6xl font-semibold text-espresso">Howzat!</h1>
          <p className="mt-2 text-lg font-semibold text-espresso">404 — that page was caught behind.</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-mist">The page you’re looking for doesn’t exist or has moved to the boundary.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/" className="rounded-full bg-espresso px-7 py-3.5 text-sm font-bold text-ivory transition hover:bg-espresso-deep">Back home</Link>
            <Link to="/shop" className="rounded-full border border-espresso/15 bg-white px-7 py-3.5 text-sm font-bold text-espresso transition hover:bg-cream">Browse the shop</Link>
          </div>
        </div>
      </div>
    </Page>
  )
}