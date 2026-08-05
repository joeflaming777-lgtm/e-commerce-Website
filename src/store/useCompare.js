import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MAX = 4

export const useCompare = create(
  persist(
    (set, get) => ({
      ids: [],
      toggle(id) {
        const ids = get().ids
        if (ids.includes(id)) set({ ids: ids.filter((x) => x !== id) })
        else if (ids.length < MAX) set({ ids: [...ids, id] })
        else set({ ids: [...ids.slice(1), id] }) // replace oldest at cap
      },
      remove(id) {
        set({ ids: get().ids.filter((x) => x !== id) })
      },
      clear() {
        set({ ids: [] })
      },
    }),
    { name: 'maidan-compare' }
  )
)

export const compareCount = (s) => s.ids.length