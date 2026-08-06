import { useState } from 'react'
import Modal from '../ui/Modal'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const ACCOUNTS = [
  { name: 'Rahul Sharma', email: 'rahul.k.sharma@gmail.com' },
  { name: 'Ananya Rao', email: 'ananya.rao@gmail.com' },
  { name: 'Karan Singh', email: 'karan.singh@gmail.com' },
]

// Simulated Google account chooser for the self-contained demo. In a real
// build this is replaced by Google Identity Services (one `<script>` + config).
export default function GoogleMockModal({ open, onClose, onSelect }) {
  const [busy, setBusy] = useState(null)

  const choose = (acc) => {
    setBusy(acc.email)
    setTimeout(() => {
      onSelect(acc)
      setBusy(null)
      onClose()
    }, 1100)
  }

  return (
    <Modal open={open} onClose={onClose} className="max-w-sm">
      <div className="p-6">
        <div className="flex items-center justify-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white shadow">
            <svg viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#6b6b6b" d="M24 9.5a14.5 14.5 0 0 1 10.1 3.9l4.3-4.3A24 24 0 0 0 24 2C15.3 2 7.9 6.9 3.6 13.8l6.2 4.8A14.4 14.4 0 0 1 24 9.5z" />
              <path fill="#6b6b6b" d="M24 40.5c-4.2 0-8.1-1.7-10.9-4.5l-6.2 4.8A23.9 23.9 0 0 0 24 46c5.7 0 10.9-2 14.9-5.4l-5.9-4.6c-2.6 1.9-5.9 3-9 3z" />
              <path fill="#6b6b6b" d="M46.5 24c0-1.5-.2-3-.5-4.5H24v9h12.9a11 11 0 0 1-4.9 6.1l5.9 4.6c3.5-3.2 5.6-7.9 5.6-11.8z" />
              <path fill="#6b6b6b" d="M24 40.5a14.3 14.3 0 0 1-10.9-5L6.9 40.3A24 24 0 0 0 24 46c5.7 0 10.9-2 14.9-5.4l-5.9-4.6c-2.6 1.9-5.9 3-9 3z" />
            </svg>
          </span>
          <span className="text-sm font-bold text-espresso">Sign in with Google</span>
        </div>
        <p className="mt-4 text-center text-sm text-mist">Choose an account to continue to Maidan Cricket Co.</p>

        <div className="mt-5 space-y-2">
          {ACCOUNTS.map((acc) => (
            <button key={acc.email} onClick={() => choose(acc)} disabled={busy === acc.email}
              className="flex w-full items-center gap-3 rounded-2xl border border-espresso/10 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-leather hover:shadow-card disabled:opacity-60">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-espresso text-xs font-bold text-ivory">
                {acc.name.split(' ').map((n) => n[0]).join('')}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-espresso">{acc.name}</span>
                <span className="block truncate text-xs text-mist">{acc.email}</span>
              </span>
              {busy === acc.email && <Loader2 size={16} className="ml-auto animate-spin text-leather" />}
            </button>
          ))}
          <button onClick={() => choose({ name: 'Cricketer', email: 'you@gmail.com' })}
            className="w-full rounded-2xl border border-dashed border-espresso/20 p-3 text-center text-sm font-semibold text-espresso transition hover:border-leather hover:bg-cream/40">
            Use another account
          </button>
        </div>
        <p className="mt-4 text-center text-[11px] text-mist">This is a demo — acting as a stand-in for real Google sign-in.</p>
      </div>
    </Modal>
  )
}