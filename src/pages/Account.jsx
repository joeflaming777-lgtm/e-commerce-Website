import { Link, Navigate } from 'react-router-dom'
import Page from '../components/layout/Page'
import { useAuth } from '../store/useAuth'
import { formatINR } from '../data/products'
import { LogOut, Package, MessageCircle, Wand2, Scale, ChevronRight, MapPin } from 'lucide-react'

const STATUS_STYLE = {
  Delivered: 'bg-willow/15 text-willow',
  'In transit': 'bg-leather/15 text-willow',
  Processing: 'bg-sand/50 text-espresso',
}

export default function Account() {
  const { user, logout, orders } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  const initials = user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <Page>
      <div className="container-site py-10">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-gradient-to-br from-espresso to-black p-8 text-ivory sm:p-10">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ivory font-display text-2xl font-bold text-espresso">{initials}</span>
            <div>
              <h1 className="font-display text-3xl font-semibold">Hi, {user.name}</h1>
              <p className="mt-1 text-sm text-ivory/70">
                {user.email}
                <span className="ml-2 rounded-full bg-ivory/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Member
                </span>
              </p>
            </div>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-5 py-2.5 text-sm font-bold text-ivory transition hover:border-ivory/60 hover:bg-ivory/10">
            <LogOut size={15} /> Sign out
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          {/* side menu */}
          <div className="space-y-3">
            {[
              { icon: Package, t: 'My orders', d: `${orders.length} placed` },
              { icon: Scale, t: 'Compare Studio', d: 'Line up kit specs' },
              { icon: Wand2, t: 'Build Studio', d: 'Custom bat & jersey' },
              { icon: MapPin, t: 'Addresses', d: 'Saved delivery details' },
              { icon: MessageCircle, t: 'Support', d: 'Help, returns & tracking' },
            ].map(({ icon: Icon, t, d }, i) => {
              const links = ['/account', '/compare', '/customize', '/account', '/support']
              return (
                <Link key={t} to={links[i]} className="group flex items-center gap-3 rounded-2xl border border-espresso/8 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:shadow-card">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream text-espresso"><Icon size={17} /></span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-espresso">{t}</span>
                    <span className="block text-xs text-mist">{d}</span>
                  </span>
                  <ChevronRight size={16} className="text-leather transition group-hover:translate-x-1" />
                </Link>
              )
            })}
          </div>

          {/* orders */}
          <div>
            <h2 className="font-display text-2xl text-espresso">Order history</h2>
            {orders.length === 0 ? (
              <div className="mt-5 grid min-h-[16rem] place-items-center rounded-3xl border border-dashed border-espresso/15 bg-white/40 p-8 text-center">
                <div>
                  <Package size={28} className="mx-auto text-leather" />
                  <p className="mt-3 font-display text-lg text-espresso">No orders yet</p>
                  <p className="mx-auto mt-1 max-w-xs text-sm text-mist">Your placed orders will appear here with live status.</p>
                  <Link to="/shop" className="mt-5 inline-block rounded-full bg-espresso px-6 py-3 text-sm font-bold text-ivory transition hover:bg-black">Start shopping</Link>
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="rounded-3xl border border-espresso/8 bg-white/70 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-display text-lg text-espresso">#{o.id}</p>
                        <p className="text-xs text-mist">{o.date} · {o.payment}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${STATUS_STYLE[o.status] || 'bg-cream text-espresso'}`}>{o.status}</span>
                    </div>
                    <div className="mt-3 border-t border-espresso/8 pt-3">
                      {o.items.map((it, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-espresso/90">{it.name} <span className="text-mist">× {it.qty}</span></span>
                          <span className="font-semibold text-espresso">{formatINR(it.price * it.qty)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-espresso/8 pt-3">
                      <span className="text-sm text-mist">Total paid</span>
                      <span className="font-display text-lg font-semibold text-willow">{formatINR(o.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  )
}