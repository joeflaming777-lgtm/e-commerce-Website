import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Page from '../components/layout/Page'
import BatBuilder from '../components/customizer/BatBuilder'
import JerseyBuilder from '../components/customizer/JerseyBuilder'
import BallBuilder from '../components/customizer/BallBuilder'
import Reveal from '../components/ui/Reveal'
import { Sparkles, Shirt, CircleDot } from 'lucide-react'

const TABS = [
  { key: 'bat', label: 'Custom Bat', icon: Sparkles, sub: 'Willow, grip, engraving' },
  { key: 'jersey', label: 'Custom Jersey', icon: Shirt, sub: 'Colours, name, number' },
  { key: 'ball', label: 'Custom Ball', icon: CircleDot, sub: 'Leather, seam print' },
]

export default function Customize() {
  const [params] = useSearchParams()
  const [tab, setTab] = useState(params.get('tab') === 'jersey' ? 'jersey' : 'bat')

  return (
    <Page>
      <div className="container-site py-10">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow flex items-center justify-center gap-2 text-leather"><Sparkles size={14} /> Build Studio</p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-espresso sm:text-5xl">Make it yours</h1>
            <p className="mx-auto mt-3 max-w-xl text-[15px] text-mist">
              Design kit around your game — live preview as you build, then we hand-make it and ship to your door.
            </p>
          </Reveal>
        </div>

        <div className="mt-9 flex justify-center">
          <div className="grid w-full max-w-xl grid-cols-3 gap-1 rounded-full border border-espresso/10 bg-white/70 p-1">
            {TABS.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex flex-col items-center gap-0.5 rounded-full px-3 py-2.5 transition sm:flex-row sm:justify-center sm:gap-2 ${
                  tab === t.key ? 'bg-espresso text-ivory shadow-card' : 'text-espresso hover:bg-cream'
                }`}>
                <t.icon size={15} />
                <span className="text-xs font-bold sm:text-sm">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {tab === 'bat' && <BatBuilder />}
          {tab === 'jersey' && <JerseyBuilder />}
          {tab === 'ball' && <BallBuilder />}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[['Hand-made to spec', 'Each custom piece is built in our workshop to your exact choices.'], ['5–7 day turnaround', 'Custom kit is dispatched within a week of your order.'], ['Free re-print within 30 days', 'Jersey print or engraving fault? We re-do it at no cost.']].map(([t, s]) => (
            <div key={t} className="rounded-2xl border border-espresso/8 bg-white/60 p-5">
              <p className="text-sm font-bold text-espresso">{t}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-mist">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}