import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Page from '../components/layout/Page'
import { useAuth } from '../store/useAuth'
import { toast } from '../components/ui/Toast'
import ProductArt from '../assets/art/ProductArt'
import { Loader2, Mail, Lock, User as UserIcon, Eye, EyeOff, ShieldCheck, ChevronLeft } from 'lucide-react'

export default function Login() {
  const { user, login, register } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to="/account" replace />

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: '' }))
  }

  const field =
    'w-full rounded-xl border border-espresso/15 bg-white pl-11 pr-11 py-3 text-sm outline-none placeholder:text-mist focus:border-willow'
  const italic = 'text-sm text-mist'

  const submit = (e) => {
    e.preventDefault()
    setBusy(true)
    setTimeout(() => {
      const res = mode === 'login' ? login(form) : register(form)
      setBusy(false)
      if (!res.ok) {
        setErrors({ form: res.error })
        return
      }
      toast(mode === 'login' ? `Welcome back, ${form.email.split('@')[0]}! 🏏` : 'Account created — welcome to ThePavilionStore! 🏏', 'success')
      navigate('/account')
    }, 700)
  }

  return (
    <Page>
      <div className="container-site grid min-h-[calc(100vh-8rem)] items-stretch gap-0 overflow-hidden rounded-3xl border border-espresso/10 lg:grid-cols-2">
        {/* brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-espresso to-espresso-deep p-12 text-ivory lg:flex">
          <span className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-leather/20 blur-3xl" />
          <span className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-sand/10 blur-3xl" />
          <div className="relative">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-ivory/70 transition hover:text-ivory">
              <ChevronLeft size={15} /> Back to store
            </Link>
          </div>
          <div className="relative">
            <ProductArt art="bat" className="mx-auto h-72 w-72 drop-shadow-2xl" />
          </div>
          <div className="relative">
            <p className="eyebrow text-sand/80">Member perks</p>
            <ul className="mt-4 space-y-3 text-sm text-ivory/85">
              {['Faster checkout with saved details', 'Track every order in one place', 'Early access to willow-season drops', 'Members-only pricing on Build Studio'].map((li) => (
                <li key={li} className="flex items-center gap-2.5">
                  <ShieldCheck size={15} className="shrink-0 text-sand" /> {li}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* form panel */}
        <div className="flex items-center justify-center bg-linen p-6 sm:p-12">
          <div className="w-full max-w-sm">
            <div className="lg:hidden"><Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist transition hover:text-espresso"><ChevronLeft size={15} /> Back to store</Link></div>
            <h1 className="mt-4 font-display text-3xl font-semibold text-espresso lg:mt-0">
              {mode === 'register' ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="mt-2 text-sm text-mist">
              {mode === 'register' ? 'Join ThePavilionStore to unlock orders, Build Studio and compare.' : 'Sign in to track orders and build your kit.'}
            </p>

            {/* mode tabs */}
            <div className="mt-7 grid grid-cols-2 gap-1 rounded-full border border-espresso/10 bg-white/70 p-1">
              <button onClick={() => { setMode('login'); setErrors({}) }} className={`rounded-full py-2.5 text-sm font-bold transition ${mode === 'login' ? 'bg-espresso text-ivory' : 'text-espresso'}`}>Sign in</button>
              <button onClick={() => { setMode('register'); setErrors({}) }} className={`rounded-full py-2.5 text-sm font-bold transition ${mode === 'register' ? 'bg-espresso text-ivory' : 'text-espresso'}`}>Create account</button>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              {mode === 'register' && (
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Full name</span>
                  <div className="relative">
                    <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
                    <input value={form.name} onChange={set('name')} placeholder="e.g. Arjun Mehta" className={field} />
                  </div>
                </label>
              )}

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Email address</span>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={field} />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-espresso/70">Password</span>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
                  <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder={mode === 'register' ? 'At least 6 characters' : '••••••••'} className={field} />
                  <button type="button" onClick={() => setShowPw((v) => !v)} aria-label="Toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2 text-mist transition hover:text-espresso">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              {mode === 'register' && (
                <p className="text-xs leading-relaxed text-mist">
                  By creating an account you can track orders, save your Build Studio kit and manage your address book.
                </p>
              )}

              {errors.form && <p className="rounded-xl bg-leather/10 px-4 py-2.5 text-xs font-semibold text-espresso">{errors.form}</p>}

              <button type="submit" disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-3.5 text-sm font-bold text-ivory transition hover:bg-espresso-deep disabled:opacity-60">
                {busy && <Loader2 size={15} className="animate-spin" />}
                {mode === 'register' ? 'Create account' : 'Sign in'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-mist">
              {mode === 'register' ? 'Already a member? ' : 'New to ThePavilionStore? '}
              <button onClick={() => { setMode(mode === 'register' ? 'login' : 'register'); setErrors({}) }} className="font-bold text-leather transition hover:text-willow">
                {mode === 'register' ? 'Sign in' : 'Create an account'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </Page>
  )
}