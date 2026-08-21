import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { scrollToTop } from '../../lib/smoothScroll'

// Page transition wrapper — CSS fade-in on enter, framer exit for AnimatePresence.
export default function Page({ children }) {
  useEffect(() => {
    scrollToTop()
  }, [])
  return (
    <motion.main
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="page-enter"
    >
      {children}
    </motion.main>
  )
}