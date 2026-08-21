import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { scrollToTop } from '../../lib/smoothScroll'

// Page transition wrapper — fade + rise on route change, and a scroll reset.
export default function Page({ children }) {
  useEffect(() => {
    scrollToTop()
  }, [])
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}