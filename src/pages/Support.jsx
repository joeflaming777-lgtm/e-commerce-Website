import { useState } from 'react'
import Page from '../components/layout/Page'
import Accordion from '../components/ui/Accordion'
import Reveal, { SectionHeading } from '../components/ui/Reveal'
import { FAQS, SUPPORT_TOPICS } from '../data/faqs'
import { toast } from '../components/ui/Toast'
import { Truck, RefreshCcw, ShieldCheck, Headset, Search, Check, ArrowRight } from 'lucide-react'

const ICONS = { truck: Truck, refresh: RefreshCcw, wrench: ShieldCheck, ruler: Search, credit: Headset, shield: ShieldCheck }

export default function Support() {
  const [q, setQ] = useState('')
  const [sent, setSent] = useState(false)
  const [contact, setContact] = useState({ name: '', email: '', topic: 'Orders & delivery', message: '' })

  const setField = (k) => (e) => setContact((c) => ({ ...c, [k]: e.target.value }))

  // No backend on this static build — open the visitor's email client addressed
  // to the email address they typed, with the message pre-filled.
  const submitContact = (e) => {
    e.preventDefault()
    const { name, email, topic, message } = contact
    const subjectLine = encodeURIComponent(`Maidan support enquiry — ${topic}`)
    const body = encodeURIComponent(`Hi,\n\n${message}\n\n— ${name}\n(sent from maidan.co support)`)
    const href = `mailto:${email}?subject=${subjectLine}&body=${body}`
    window.location.href = href
    setSent(true)
    toast('Opening your email app with the message ready to send', 'success')
  }

  const topics = SUPPORT_TOPICS.filter((t) => t.title.toLowerCase().includes(q.toLowerCase()) || t.blurb.toLowerCase().includes(q.toLowerCase()))
  const faqs = FAQS.filter((f) => f.q.toLowerCase().includes(q.toLowerCase()))

  return (
    <Page>
      <div className="container-site py-10">
        <div className="rounded-3xl bg-gradient-to-br from-espresso to-black p-8 text-ivory sm:p-12">
          <Reveal>
            <p className="eyebrow flex items-center gap-2 text-sand/80"><Headset size={15} /> Support centre</p>
            <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">How can we help?</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/75">Track an order, check our return policy, or reach a real gear specialist — every answer you need, in one place.</p>
          </Reveal>
          <div className="mt-7 flex max-w-xl items-center gap-3 rounded-full bg-white/95 p-1.5">
            <Search size={18} className="ml-3 text-leather" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search delivery, returns, sizing, custom bats…"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-mist" />
          </div>
        </div>

        {/* topics */}
        <div className="mt-10">
          <h2 className="font-display text-2xl text-espresso">Browse by topic</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => {
              const Icon = ICONS[t.icon] || ShieldCheck
              return (
                <div key={t.key} className="rounded-3xl border border-espresso/8 bg-white/70 p-6 transition hover:-translate-y-0.5 hover:shadow-card">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream text-espresso"><Icon size={20} /></span>
                  <h3 className="mt-4 font-display text-lg text-espresso">{t.title}</h3>
                  <p className="mt-1.5 text-sm text-mist">{t.blurb}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Quick answers" title="Frequently asked" />
            <div className="mt-6">
              {faqs.length ? <Accordion items={faqs} /> : (
                <p className="rounded-2xl border border-dashed border-espresso/15 p-6 text-sm text-mist">No FAQ matches “{q}”. Ask us directly →</p>
              )}
            </div>
          </div>

          {/* contact form */}
          <div className="rounded-3xl border border-espresso/10 bg-white/70 p-6 sm:p-8">
            <h3 className="font-display text-xl text-espresso">Talk to a gear specialist</h3>
            <p className="mt-1.5 text-sm text-mist">We reply within a few hours on weekdays.</p>
            {sent ? (
              <div className="mt-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-willow text-ivory"><Check size={26} /></span>
                <h4 className="mt-4 font-display text-xl text-espresso">Message received!</h4>
                <p className="mt-2 text-sm text-mist">Your ticket #{Math.floor(Math.random() * 90000) + 10000}. We’ll email you back shortly.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-sm font-bold text-leather hover:text-willow">Send another</button>
              </div>
            ) : (
              <form onSubmit={submitContact} className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Your name" value={contact.name} onChange={setField('name')} className="w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm outline-none placeholder:text-mist focus:border-willow" />
                  <input required type="email" placeholder="Email address" value={contact.email} onChange={setField('email')} className="w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm outline-none placeholder:text-mist focus:border-willow" />
                </div>
                <select value={contact.topic} onChange={setField('topic')} className="w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm text-espresso outline-none focus:border-willow">
                  {['Orders & delivery', 'Returns & warranty', 'Build Studio / custom', 'Sizing help', 'Something else'].map((o) => <option key={o}>{o}</option>)}
                </select>
                <textarea required rows={4} placeholder="Tell us what you need…" value={contact.message} onChange={setField('message')} className="w-full resize-none rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm outline-none placeholder:text-mist focus:border-willow" />
                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-3.5 text-sm font-bold text-ivory transition hover:bg-black">
                  Send message <ArrowRight size={15} />
                </button>
                <p className="text-center text-[11px] text-mist">
                  Your message opens in your email app, addressed to <span className="font-semibold text-espresso">{contact.email || 'the email you enter'}</span>.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* policies */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Truck, t: 'Shipping', s: 'Metro 2–4 days, rest of India 4–7. Free above ₹1,499. Bat orders hand-inspected before dispatch.' },
            { icon: RefreshCcw, t: 'Returns', s: 'Unused items returnable within 15 days for a full refund. Size exchanges are free.' },
            { icon: ShieldCheck, t: 'Warranty', s: 'Bats carry a 30-day willow warranty; other kit 12 months. Fault photos → instant replacement.' },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="rounded-3xl border border-espresso/8 bg-white/60 p-6">
              <Icon size={20} className="text-leather" />
              <h4 className="mt-3 font-display text-lg text-espresso">{t}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-mist">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}