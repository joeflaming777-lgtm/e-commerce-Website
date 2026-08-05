import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ShoppingBag, Scale, User, Menu, X, ChevronDown } from 'lucide-react'
import Logo from './Logo'
import { useCart, cartCount } from '../../store/useCart'
import { useCompare } from '../../store/useCompare'
import { useAuth } from '../../store/useAuth'
import { PRODUCTS, CATEGORIES, AUDIENCES, formatINR } from '../../data/products'
import ProductArt from '../../assets/art/ProductArt'

const PRIMARY_NAV = [
  { label: 'Shop All', to: '/shop' },
  { label: 'Bats', to: '/category/bats' },
  { label: 'Balls', to: '/category/balls' },
  { label: 'Protection', to: '/category/protection' },
  { label: 'Apparel', to: '/category/apparel' },
]

export default function Header({ onOpenCart }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const count = useCart(cartCount)
  const compareCount = useCompare((s) => s.ids.length)
  const user = useAuth((s) => s.user)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-ivory/85 shadow-card backdrop-blur-xl' : 'bg-ivory/0'
        }`}
      >
        <div className="container-site flex items-center justify-between gap-4 py-3 transition-all duration-500" style={{ paddingTop: scrolled ? 10 : 16, paddingBottom: scrolled ? 10 : 16 }}>
          {/* Mobile / left */}
          <div className="flex items-center gap-1 lg:hidden">
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="rounded-full p-2 text-espresso hover:bg-espresso/8">
              <Menu size={20} />
            </button>
          </div>

          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            <CatDropdown />
            {[
              { label: 'Men', to: '/shop?audience=men' },
              { label: 'Women', to: '/shop?audience=women' },
              { label: 'Juniors', to: '/shop?audience=juniors' },
            ].map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className="link-underline text-[13px] font-bold tracking-wide text-espresso/90 hover:text-espresso"
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/customize"
              className="link-underline text-[13px] font-bold tracking-wide text-leather hover:text-espresso"
            >
              Build Studio
            </NavLink>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="rounded-full p-2 text-espresso transition hover:bg-espresso/8">
              <Search size={19} strokeWidth={2.2} />
            </button>
            <HeaderLink to="/compare" label="Compare" count={compareCount} icon={<Scale size={19} strokeWidth={2.2} />} showCount />
            <HeaderLink
              to={user ? '/account' : '/login'}
              label="Account"
              icon={<User size={19} strokeWidth={2.2} />}
            />
            <button onClick={onOpenCart} aria-label="Open cart" className="relative rounded-full p-2 text-espresso transition hover:bg-espresso/8">
              <ShoppingBag size={19} strokeWidth={2.2} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-leather px-1 text-[10px] font-bold text-ivory">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

function HeaderLink({ to, label, icon, count, showCount }) {
  return (
    <Link to={to} aria-label={label} className="relative rounded-full p-2 text-espresso transition hover:bg-espresso/8">
      {icon}
      {showCount && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-willow px-1 text-[10px] font-bold text-ivory">
          {count}
        </span>
      )}
    </Link>
  )
}

function CatDropdown() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 text-[13px] font-bold tracking-wide text-espresso/90 hover:text-espresso"
      >
        Shop <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''} text-leather`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full pt-3"
            onMouseEnter={() => setOpen(true)}
          >
            <div className="w-72 rounded-2xl border border-espresso/10 bg-linen p-3 shadow-lift">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.key}
                  to={`/category/${c.key}`}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-espresso transition hover:bg-cream"
                >
                  {c.name}
                  <ChevronDown size={14} className="rotate-[-90deg] text-leather" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const results = useMemo(() => {
    if (!q.trim()) return []
    const term = q.toLowerCase()
    return PRODUCTS.filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(term)).slice(0, 6)
  }, [q])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-x-0 top-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-espresso/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative mx-auto mt-10 max-w-xl rounded-2xl bg-linen p-2 shadow-lift"
            initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          >
            <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
              <Search size={18} className="text-leather" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && results[0]) {
                    navigate(`/product/${results[0].id}`)
                    onClose()
                    setQ('')
                  }
                }}
                placeholder="Search bats, balls, brands…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-mist"
              />
              <button onClick={onClose} aria-label="Close search" className="rounded-full bg-espresso/6 p-1 text-espresso/70"><X size={16} /></button>
            </div>
            {q.trim() && (
              <div className="mt-1 max-h-80 overflow-y-auto">
                {results.length ? results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { navigate(`/product/${p.id}`); onClose(); setQ('') }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-cream"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cream">
                      <ProductArt art={p.image} className="h-7 w-7" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-espresso">{p.name}</span>
                      <span className="block text-xs text-mist">{p.brand}</span>
                    </span>
                    <span className="text-sm font-bold text-willow">{formatINR(p.price)}</span>
                  </button>
                )) : (
                  <p className="px-3 py-4 text-center text-sm text-mist">No matches for “{q}”.</p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MobileMenu({ open, onClose }) {
  const user = useAuth((s) => s.user)
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[75] bg-espresso/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            className="fixed left-0 top-0 z-[76] flex h-full w-full max-w-xs flex-col bg-linen p-5 shadow-lift"
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button onClick={onClose} aria-label="Close menu" className="rounded-full bg-espresso/6 p-2"><X size={18} /></button>
            </div>
            <nav className="flex flex-col gap-1">
              {[
                { label: 'Shop All', to: '/shop' },
                ...CATEGORIES.map((c) => ({ label: c.name, to: `/category/${c.key}` })),
                ...AUDIENCES.map((a) => ({ label: `${a.name}`, to: `/shop?audience=${a.key}` })),
                { label: 'Build Studio', to: '/customize' },
                { label: 'Compare', to: '/compare' },
                { label: 'Support', to: '/support' },
              ].map((l) => (
                <Link key={l.to + l.label} to={l.to} onClick={onClose} className="rounded-xl px-3 py-2.5 text-sm font-bold text-espresso transition hover:bg-white">
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-espresso/10 pt-4">
              <Link to={user ? '/account' : '/login'} onClick={onClose} className="w-full rounded-full bg-espresso py-3 text-center text-sm font-bold text-ivory">
                {user ? 'My Account' : 'Sign in'}
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}