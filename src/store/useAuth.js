import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Accounts are stored in localStorage via the persist middleware. There is no
// demo / default account — a visitor must create an account first, then sign
// in with the email + password they chose. (Note: this is a self-contained
// front-end demo, so credentials live only in the browser — wire this to a
// real auth backend in production.)
export const useAuth = create(
  persist(
    (set, get) => ({
      user: null, // { name, email, method: 'email' }
      accounts: [], // { name, email, password, createdAt }
      orders: [],
      register({ name, email, password }) {
        const emailKey = email.trim().toLowerCase()
        if (!name.trim()) return { ok: false, error: 'Please enter your name.' }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailKey)) return { ok: false, error: 'Enter a valid email address.' }
        if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' }
        if (get().accounts.some((a) => a.email.toLowerCase() === emailKey)) {
          return { ok: false, error: 'An account with this email already exists. Sign in instead.' }
        }
        const account = { name: name.trim(), email: emailKey, password, createdAt: new Date().toISOString() }
        set((s) => ({
          accounts: [...(s.accounts || []), account],
          user: { name: account.name, email: account.email, method: 'email' },
        }))
        return { ok: true }
      },
      login({ email, password }) {
        const account = get().accounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase())
        if (!account) return { ok: false, error: 'No account found with this email. Create an account first.' }
        if (account.password !== password) return { ok: false, error: 'Incorrect password. Try again.' }
        set({ user: { name: account.name, email: account.email, method: 'email' } })
        return { ok: true }
      },
      logout() {
        set({ user: null })
      },
      placeOrder(order) {
        set((s) => ({ orders: [...(s.orders || []), order] }))
      },
    }),
    { name: 'thepavilionstore-auth' }
  )
)

export const isLoggedIn = (s) => Boolean(s.user)
