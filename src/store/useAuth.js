import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuth = create(
  persist(
    (set) => ({
      user: null, // { name, email?, phone?, method: 'google' | 'mobile' }
      orders: [],
      login(user) {
        set({ user })
      },
      logout() {
        set({ user: null })
      },
      placeOrder(order) {
        set((s) => ({ orders: [...(s.orders || []), order] }))
      },
    }),
    { name: 'maidan-auth' }
  )
)

export const isLoggedIn = (s) => Boolean(s.user)