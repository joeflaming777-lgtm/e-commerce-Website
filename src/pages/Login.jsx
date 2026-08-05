import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Page from '../components/layout/Page'
import GoogleMockModal from '../components/auth/GoogleMockModal'
import OTPInput from '../components/auth/OTPInput'
import Input from '../components/ui/Input'
import { useAuth } from '../store/useAuth'
import { toast } from '../components/ui/Toast'
import ProductArt from '../assets/art/ProductArt'
import { Loader2, Phone, ShieldCheck, ChevronLeft } from 'lucide-react'

const DEMO_OTP = '123456'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [method, setMethod] = useState('google')
  const [googleOpen, setGoogleOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [step, setStep] = useState(1) // 1 number, 2 otp
  const [otp, setOtp] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [errors, setErrors] = useState({})

  if (user) return <Navigate to="/account" replace />

  const startOtp = () => {
    if (!/^[0-9]{10}$/.test(phone)) {
      setErrors({ phone: 'Enter a valid 10-digit mobile number.' })
      return
    }
    setErrors({})
    setStep(2)
    setOtp('')
  }

  const verifyOtp = () => {
    if (otp.length !== 6) return
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      if (otp !== DEMO_OTP) {
        setErrors({ otp: 'That code doesn’t match. Try the demo code below.' })
        return
      }
      login({ name: 'Cricketer', phone, method: 'mobile' })
      toast('Welcome back, Cricketer! 🏏', 'success')
      navigate('/account')
    }, 1100)
  }

  const googleSelect = (acc) => {
    login({ name: acc.name, email: acc.email, method: 'google' })
    toast(`Signed in as ${acc.name}`, 'success')
    navigate('/account')
  }

  return (
    <Page>
      <div className="container-site grid min-h-[calc(100vh-8rem)] items-stretch gap-0 overflow-hidden rounded-3xl border border-espresso/10 lg:grid-cols-2">
        {/* brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-espresso to-black p-12 text-ivory lg:flex">
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
            <h1 className="mt-4 font-display text-3xl font-semibold text-espresso lg:mt-0">Welcome back</h1>
            <p className="mt-2 text-sm text-mist">Sign in to track orders and build your kit.</p>

            {/* method tabs */}
            <div className="mt-7 grid grid-cols-2 gap-1 rounded-full border border-espresso/10 bg-white/70 p-1">
              <button onClick={() => setMethod('google')} className={`rounded-full py-2.5 text-sm font-bold transition ${method === 'google' ? 'bg-espresso text-ivory' : 'text-espresso'}`}>Google</button>
              <button onClick={() => setMethod('mobile')} className={`rounded-full py-2.5 text-sm font-bold transition ${method === 'mobile' ? 'bg-espresso text-ivory' : 'text-espresso'}`}>Mobile number</button>
            </div>

            <div className="mt-7">
              {method === 'google' ? (
                <>
                  <button onClick={() => setGoogleOpen(true)}
                    className="flex w-full items-center justify-center gap-3 rounded-full border border-espresso/15 bg-white py-3.5 text-sm font-bold text-espresso transition hover:-translate-y-0.5 hover:shadow-card">
                    <svg viewBox="0 0 48 48" className="h-5 w-5">
                      <path fill="#EA4335" d="M24 9.5a14.5 14.5 0 0 1 10.1 3.9l4.3-4.3A24 24 0 0 0 24 2C15.3 2 7.9 6.9 3.6 13.8l6.2 4.8A14.4 14.4 0 0 1 24 9.5z" />
                      <path fill="#4285F4" d="M24 40.5c-4.2 0-8.1-1.7-10.9-4.5l-6.2 4.8A23.9 23.9 0 0 0 24 46c5.7 0 10.9-2 14.9-5.4l-5.9-4.6c-2.6 1.9-5.9 3-9 3z" />
                      <path fill="#FBBC05" d="M46.5 24c0-1.5-.2-3-.5-4.5H24v9h12.9a11 11 0 0 1-4.9 6.1l5.9 4.6c3.5-3.2 5.6-7.9 5.6-11.8z" />
                      <path fill="#34A853" d="M24 40.5a14.3 14.3 0 0 1-10.9-5L6.9 40.3A24 24 0 0 0 24 46c5.7 0 10.9-2 14.9-5.4l-5.9-4.6c-2.6 1.9-5.9 3-9 3z" />
                    </svg>
                    Continue with Google
                  </button>
                  <p className="mt-3 text-center text-[11px] leading-relaxed text-mist">
                    Demo build — a stand-in for real Google sign-in. Choose a mock account to continue.
                  </p>
                </>
              ) : step === 1 ? (
                <div className="space-y-4">
                  <Input
                    label="Mobile number"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit number"
                    value={phone}
                    error={errors.phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                  <button onClick={startOtp} className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-3.5 text-sm font-bold text-ivory transition hover:bg-black">
                    <Phone size={15} /> Get OTP
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between rounded-2xl border border-espresso/10 bg-white px-4 py-3">
                    <span className="text-sm text-mist">OTP sent to <span className="font-bold text-espresso">+91 {phone.slice(0, 5)} {phone.slice(5)}</span></span>
                    <button onClick={() => { setStep(1); setErrors({}) }} className="text-xs font-bold text-leather hover:text-willow">Edit</button>
                  </div>
                  <OTPInput value={otp} onChange={setOtp} />
                  <div className="rounded-xl bg-sand/30 px-4 py-2.5 text-center text-xs font-semibold text-espresso">
                    Demo code for this build: <span className="font-display text-sm tracking-[0.2em]">123456</span>
                  </div>
                  {errors.otp && <p className="text-center text-xs font-semibold text-[#b3261e]">{errors.otp}</p>}
                  <button onClick={verifyOtp} disabled={otp.length !== 6 || verifying}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-3.5 text-sm font-bold text-ivory transition hover:bg-black disabled:opacity-50">
                    {verifying && <Loader2 size={15} className="animate-spin" />} Verify & sign in
                  </button>
                </div>
              )}
            </div>

            <p className="mt-8 text-center text-[11px] leading-relaxed text-mist">
              By continuing you agree to our Terms &amp; Privacy Policy. We use your number only for order updates and OTP login.
            </p>
          </div>
        </div>
      </div>
      <GoogleMockModal open={googleOpen} onClose={() => setGoogleOpen(false)} onSelect={googleSelect} />
    </Page>
  )
}