import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Headset } from 'lucide-react'
import { useAuth } from '../../store/useAuth'

const QUICK = [
  { label: 'Order tracking', reply: 'Head to Support → Track Order, or drop us your order ID here and we’ll fetch the live status for you. 📦' },
  { label: 'Return policy', reply: 'Unused items can be returned within 15 days for a full refund. Bats carry a 30-day structural warranty. Want me to start a return?' },
  { label: 'Bat weight guide', reply: 'Seniors: 2.09–2.14 lb · Women: 2.05–2.11 lb · Juniors: 1.4–1.9 lb. Every bat page lists its exact weight and balance.' },
  { label: 'Build Studio', reply: 'Build your own bat or jersey in the Build Studio — willow grade, grip colour, engraving and name/number. Custom kit ships in 5–7 days.' },
]

const BOT_OPEN = "Hi there! 👋 I'm Maddy from Maidan Cricket Co. Ask me about orders, sizing, returns, or custom bats."

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const user = useAuth((s) => s.user)
  const listRef = useRef(null)

  useEffect(() => {
    if (open && msgs.length === 0) setMsgs([{ role: 'bot', text: BOT_OPEN }])
  }, [open]) // eslint-disable-line

  useEffect(() => {
    listRef.current?.scrollTo({ top: 99999, behavior: 'smooth' })
  }, [msgs, typing, open])

  const botReply = (text) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { role: 'bot', text }])
    }, 900 + Math.random() * 700)
  }

  const send = (text) => {
    const value = text ?? input.trim()
    if (!value) return
    setMsgs((m) => [...m, { role: 'user', text: value }])
    setInput('')
    const lower = value.toLowerCase()
    if (lower.includes('order')) botReply('I can help with that. Could you share your 8-digit order ID? You’ll find it in your account or SMS. 📦')
    else if (lower.includes('return')) botReply('No problem. Returns are open for 15 days on unused items. I’ll connect you to an agent to start the process.')
    else if (lower.includes('bat') || lower.includes('weight')) botReply('Great question! The weight that suits you depends on your game. Most senior players choose 2.09–2.14 lb. Want me to recommend bats in that range?')
    else if (lower.includes('size') || lower.includes('shoe')) botReply('We ship shoes in UK sizes. Use the size-guide on any shoe page — or tell me your US/EU size and I’ll convert it for you. 👟')
    else if (lower.includes('custom') || lower.includes('studio')) botReply('The Build Studio lets you design your own bat (willow grade, grip, engraving) and jersey (colours, name, number). It ships in 5–7 days!')
    else botReply('Thanks for the message! One of our gear specialists will reply within a few minutes. You can also reach us at care@maidan.co. 🏏')
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open live support chat"
        className="fixed bottom-5 right-5 z-[65] flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-ivory shadow-lift transition hover:scale-105 hover:bg-black"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-pulse-dot rounded-full bg-leather" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-5 z-[65] flex h-[26rem] w-[min(21rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-espresso/10 bg-linen shadow-lift"
          >
            <div className="flex items-center gap-3 bg-espresso px-4 py-3.5 text-ivory">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-leather/30">
                <Headset size={17} />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-espresso" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold">Maidan Support</p>
                <p className="text-[11px] text-ivory/70">Online · replies in ~1 min</p>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.role === 'user' ? 'rounded-br-sm bg-espresso text-ivory' : 'rounded-bl-sm bg-white text-espresso'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-leather" style={{ animationDelay: `${i * 0.18}s` }} />
                    ))}
                  </div>
                </div>
              )}
              {msgs.length < 2 && (
                <div className="pt-1">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-mist">Quick help</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK.map((q) => (
                      <button key={q.label} onClick={() => send(q.reply)} className="rounded-full border border-espresso/15 bg-white px-3 py-1.5 text-xs font-semibold text-espresso transition hover:border-leather hover:bg-cream">
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send() }}
              className="flex items-center gap-2 border-t border-espresso/10 bg-white px-3 py-2.5"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={user ? `Ask anything, ${user.name.split(' ')[0]}…` : 'Type a message…'}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-mist"
              />
              <button aria-label="Send message" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-espresso text-ivory transition hover:bg-black">
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}