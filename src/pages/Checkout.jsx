import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Page from '../components/layout/Page'
import Input from '../components/ui/Input'
import ProductArt from '../assets/art/ProductArt'
import { useCart, cartSubtotal } from '../store/useCart'
import { useAuth } from '../store/useAuth'
import { formatINR } from '../data/products'
import { toast } from '../components/ui/Toast'
import { ChevronLeft, ChevronRight, Loader2, Check, CreditCard, Smartphone, Landmark, Banknote } from 'lucide-react'

const PAY_METHODS = [
  { key: 'upi', label: 'UPI', icon: Smartphone, desc: 'GPay · PhonePe · Paytm' },
  { key: 'card', label: 'Card', icon: CreditCard, desc: 'Credit / Debit' },
  { key: 'net', label: 'Net Banking', icon: Landmark, desc: 'All major banks' },
  { key: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay at your door' },
]

export default function Checkout() {
  const { items, clear } = useCart()
  const subtotal = useCart(cartSubtotal)
  const placeOrder = useAuth((s) => s.placeOrder)
  const user = useAuth((s) => s.user)
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [placing, setPlacing] = useState(false)
  const [addr, setAddr] = useState({ name: user?.name || '', phone: user?.phone || '', line: '', city: '', state: '', pin: '' })
  const [pay, setPay] = useState('upi')
  const [payDetail, setPayDetail] = useState('')
  const [errors, setErrors] = useState({})

  const shipping = subtotal >= 1499 ? 0 : 79
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <Page>
        <div className="container-site grid min-h-[55vh] place-items-center py-10 text-center">
          <div>
            <h1 className="font-display text-3xl text-espresso">Nothing to check out</h1>
            <p className="mt-2 text-sm text-mist">Your bag is empty.</p>
            <Link to="/shop" className="mt-6 inline-block rounded-full bg-espresso px-7 py-3.5 text-sm font-bold text-ivory transition hover:bg-black">Go to shop</Link>
          </div>
        </div>
      </Page>
    )
  }

  const validateAddr = () => {
    const e = {}
    if (!addr.name.trim()) e.name = 'Required'
    if (!/^[0-9]{10}$/.test(addr.phone)) e.phone = '10-digit number required'
    if (!addr.line.trim()) e.line = 'Required'
    if (!addr.city.trim()) e.city = 'Required'
    if (!addr.state.trim()) e.state = 'Required'
    if (!/^[0-9]{6}$/.test(addr.pin)) e.pin = '6-digit PIN required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const placeOrderNow = () => {
    setPlacing(true)
    const id = 'MCC' + Math.random().toString(36).slice(2, 8).toUpperCase()
    setTimeout(() => {
      placeOrder({ id, date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), items, total, payment: PAY_METHODS.find((m) => m.key === pay).label, status: 'Processing', address: addr })
      clear()
      setPlacing(false)
      navigate(`/order/${id}`)
    }, 1400)
  }

  const steps = ['Delivery', 'Payment', 'Review']

  return (
    <Page>
      <div className="container-site py-10">
        <h1 className="font-display text-4xl font-semibold text-espresso">Checkout</h1>

        {/* stepper */}
        <div className="mt-6 flex max-w-lg items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition ${step > i + 1 ? 'bg-willow text-ivory' : step === i + 1 ? 'bg-espresso text-ivory' : 'bg-cream text-mist'}`}>
                {step > i + 1 ? <Check size={14} /> : i + 1}
              </span>
              <span className={`hidden text-xs font-bold sm:block ${step === i + 1 ? 'text-espresso' : 'text-mist'}`}>{s}</span>
              {i < steps.length - 1 && <span className={`h-px flex-1 ${step > i + 1 ? 'bg-willow' : 'bg-espresso/10'}`} />}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-espresso/10 bg-white/70 p-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl text-espresso">Delivery address</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Full name" value={addr.name} error={errors.name} onChange={(e) => setAddr({ ...addr, name: e.target.value })} placeholder="Rahul Sharma" />
                  <Input label="Mobile number" value={addr.phone} error={errors.phone} inputMode="numeric" maxLength={10} onChange={(e) => setAddr({ ...addr, phone: e.target.value.replace(/[^0-9]/g, '') })} placeholder="10-digit number" />
                </div>
                <Input label="Address" value={addr.line} error={errors.line} onChange={(e) => setAddr({ ...addr, line: e.target.value })} placeholder="Flat / street / landmark" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input label="City" value={addr.city} error={errors.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} placeholder="City" />
                  <Input label="State" value={addr.state} error={errors.state} onChange={(e) => setAddr({ ...addr, state: e.target.value })} placeholder="State" />
                  <Input label="PIN code" value={addr.pin} error={errors.pin} inputMode="numeric" maxLength={6} onChange={(e) => setAddr({ ...addr, pin: e.target.value.replace(/[^0-9]/g, '') })} placeholder="6-digit PIN" />
                </div>
                <button onClick={() => validateAddr() && setStep(2)} className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-3.5 text-sm font-bold text-ivory transition hover:bg-black">
                  Continue to payment <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl text-espresso">Payment method</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PAY_METHODS.map(({ key, label, icon: Icon, desc }) => (
                    <button key={key} onClick={() => setPay(key)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${pay === key ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/12 bg-white text-espresso hover:border-leather'}`}>
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${pay === key ? 'bg-ivory/15' : 'bg-cream text-espresso'}`}><Icon size={18} /></span>
                      <span>
                        <span className="block text-sm font-bold">{label}</span>
                        <span className={`block text-[11px] ${pay === key ? 'text-ivory/70' : 'text-mist'}`}>{desc}</span>
                      </span>
                      {pay === key && <Check size={16} className="ml-auto text-sand" />}
                    </button>
                  ))}
                </div>
                {pay === 'upi' && (
                  <Input label="UPI ID" value={payDetail} onChange={(e) => setPayDetail(e.target.value)} placeholder="yourname@okhdfc" hint="Mock payment — any valid UPI ID works in this demo." />
                )}
                {pay === 'card' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Card number" value={payDetail} onChange={(e) => setPayDetail(e.target.value)} placeholder="4111 1111 1111 1111" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Expiry" placeholder="MM/YY" />
                      <Input label="CVV" type="password" placeholder="•••" />
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 rounded-full border border-espresso/15 px-6 py-3.5 text-sm font-bold text-espresso transition hover:bg-cream"><ChevronLeft size={15} /> Back</button>
                  <button onClick={() => setStep(3)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-espresso py-3.5 text-sm font-bold text-ivory transition hover:bg-black">
                    Review order <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display text-xl text-espresso">Review & place order</h2>
                <div className="rounded-2xl border border-espresso/8 bg-cream/40 p-4">
                  <p className="flex items-center justify-between text-sm">
                    <span className="font-bold text-espresso">Deliver to</span>
                    <button onClick={() => setStep(1)} className="text-xs font-bold text-leather">Edit</button>
                  </p>
                  <p className="mt-1.5 text-sm text-espresso/90">{addr.name} · +91 {addr.phone}</p>
                  <p className="text-sm text-mist">{addr.line}, {addr.city}, {addr.state} — {addr.pin}</p>
                </div>
                <div className="space-y-2">
                  {items.map((it) => (
                    <div key={it.key} className="flex items-center gap-3 text-sm">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-cream"><ProductArt art={it.art || 'bat'} className="h-7 w-7" /></span>
                      <span className="min-w-0 flex-1 truncate text-espresso/90">{it.name} <span className="text-mist">× {it.qty}</span></span>
                      <span className="font-semibold text-espresso">{formatINR(it.price * it.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-espresso/8 bg-cream/40 p-4">
                  <p className="flex items-center justify-between text-sm"><span className="font-bold text-espresso">Pay via</span><span className="text-espresso/90">{PAY_METHODS.find((m) => m.key === pay).label}</span></p>
                  <p className="mt-1 text-xs text-mist">All mock — no real payment is processed in this demo.</p>
                </div>
                <button onClick={placeOrderNow} disabled={placing}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-4 text-sm font-bold text-ivory transition hover:bg-black disabled:opacity-60">
                  {placing ? <><Loader2 size={16} className="animate-spin" /> Placing your order…</> : <>Place order · {formatINR(total)}</>}
                </button>
              </div>
            )}
          </div>

          {/* summary */}
          <div className="h-fit rounded-3xl border border-espresso/10 bg-white/70 p-6 lg:sticky lg:top-28">
            <h3 className="font-display text-lg text-espresso">Order summary</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-mist">Items</span><span className="font-semibold text-espresso">{items.reduce((n, i) => n + i.qty, 0)}</span></div>
              <div className="flex justify-between"><span className="text-mist">Subtotal</span><span className="font-semibold text-espresso">{formatINR(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-mist">Shipping</span><span className="font-semibold text-espresso">{shipping === 0 ? 'FREE' : formatINR(shipping)}</span></div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-espresso/10 pt-4">
              <span className="text-mist">Total</span>
              <span className="font-display text-2xl font-semibold text-espresso">{formatINR(total)}</span>
            </div>
            {!user && (
              <p className="mt-4 rounded-xl bg-sand/30 px-3 py-2.5 text-xs text-espresso">
                <Link to="/login" className="font-bold underline decoration-leather underline-offset-2">Sign in</Link> to track this order in your account.
              </p>
            )}
          </div>
        </div>
      </div>
    </Page>
  )
}