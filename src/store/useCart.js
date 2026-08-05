import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Cart items are snapshot objects so custom-builder items (not in the product
// catalog) can be stored too. `productId` is set when it maps to a catalog item.
export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      add(item) {
        const items = [...get().items]
        const existing = items.find(
          (i) => i.key === item.key && i.productId === item.productId
        )
        if (existing) existing.qty += item.qty
        else items.push({ ...item })
        set({ items })
      },
      remove(key) {
        set({ items: get().items.filter((i) => i.key !== key) })
      },
      updateQty(key, qty) {
        set({
          items: get().items
            .map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })
      },
      clear() {
        set({ items: [] })
      },
    }),
    { name: 'maidan-cart' }
  )
)

// Derived cart helpers used across many components.
export const cartCount = (s) => s.items.reduce((n, i) => n + i.qty, 0)
export const cartSubtotal = (s) =>
  s.items.reduce((sum, i) => sum + i.price * i.qty, 0)