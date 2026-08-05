import { create } from 'zustand'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ShoppingBag, Info } from 'lucide-react'

let seq = 0
const icons = {
  success: <Check size={16} />,
  cart: <ShoppingBag size={16} />,
  info: <Info size={16} />,
}

export const useToast = create((set) => ({
  toasts: [],
  push: (message, tone = 'success') => {
    const id = ++seq
    set((s) => ({ toasts: [...s.toasts, { id, message, tone }] }))
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 2800)
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

export const toast = (message, tone = 'success') => useToast.getState().push(message, tone)

export default function ToastContainer() {
  const toasts = useToast((s) => s.toasts)
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[120] flex -translate-x-1/2 flex-col items-center gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-espresso px-5 py-3 text-sm font-semibold text-ivory shadow-lift"
          >
            <span className="text-sand">{icons[t.tone] || icons.success}</span>
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}