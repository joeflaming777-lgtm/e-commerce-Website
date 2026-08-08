import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Instagram, Youtube, Facebook, Mail, MapPin } from 'lucide-react'
import Logo from './Logo'
import { BRANDS } from '../../data/products'
import { toast } from '../ui/Toast'

const COLS = [
  {
    title: 'Shop',
    links: [
      { label: 'Bats', to: '/category/bats' },
      { label: 'Balls', to: '/category/balls' },
      { label: 'Protection', to: '/category/protection' },
      { label: 'Apparel', to: '/category/apparel' },
      { label: 'Footwear', to: '/category/footwear' },
      { label: 'Accessories', to: '/category/accessories' },
    ],
  },
  {
    title: 'Play',
    links: [
      { label: 'Men', to: '/shop?audience=men' },
      { label: 'Women', to: '/shop?audience=women' },
      { label: 'Juniors', to: '/shop?audience=juniors' },
      { label: 'Build Studio', to: '/customize' },
      { label: 'Compare Kit', to: '/compare' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Centre', to: '/support' },
      { label: 'Track Order', to: '/support' },
      { label: 'Returns & Warranty', to: '/support' },
      { label: 'Size Guides', to: '/support' },
      { label: 'Contact Us', to: '/support' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-cream/50">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
            Hand-selected willow, genuine leather and kit built to move with the game. Serving cricketers since our first net session.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); toast('Subscribed — welcome to the club!', 'success'); e.target.reset(); }}
            className="mt-6 flex max-w-sm overflow-hidden rounded-full border border-espresso/15 bg-white"
          >
            <input type="email" required placeholder="Your email for deals & drops" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-mist" />
            <button className="shrink-0 bg-espresso px-5 text-xs font-bold uppercase tracking-wider text-ivory transition hover:bg-espresso-deep">Subscribe</button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow text-espresso">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="link-underline text-sm text-mist transition hover:text-espresso">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-espresso/10">
        <div className="container-site flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
          <Link to="/shop" className="hidden text-[11px] font-bold uppercase tracking-[0.2em] text-espresso/50 sm:block">Brands:</Link>
          {BRANDS.map((b) => (
            <Link key={b.slug} to={`/brand/${b.slug}`} className="text-xs font-bold tracking-wider text-espresso/60 transition hover:text-willow">
              {b.name}
            </Link>
          ))}
          <span className="ml-auto flex items-center gap-1 text-xs text-mist"><MapPin size={13} /> Pan-India delivery</span>
        </div>
      </div>

      <div className="border-t border-espresso/10">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-mist">© {new Date().getFullYear()} ThePavilionStore. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-mist"><Mail size={13} /> care@thepavilionstore.com</span>
            <span className="h-4 w-px bg-espresso/15" />
            <a href="#/" aria-label="Instagram" className="rounded-full bg-espresso/5 p-2 text-espresso/70 transition hover:bg-espresso/10"><Instagram size={15} /></a>
            <a href="#/" aria-label="YouTube" className="rounded-full bg-espresso/5 p-2 text-espresso/70 transition hover:bg-espresso/10"><Youtube size={15} /></a>
            <a href="#/" aria-label="Facebook" className="rounded-full bg-espresso/5 p-2 text-espresso/70 transition hover:bg-espresso/10"><Facebook size={15} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}