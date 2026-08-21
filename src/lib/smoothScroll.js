import Lenis from 'lenis'

let lenis = null
let rafId = null

export function initSmoothScroll() {
  if (lenis) return lenis
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1.0,
    smoothWheel: true,
  })
  const raf = (time) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  // Pause RAF when tab is hidden to save CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId)
    } else {
      rafId = requestAnimationFrame(raf)
    }
  })

  return lenis
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true })
  } else {
    window.scrollTo(0, 0)
  }
}

export function scrollTo(target, offset = 0) {
  if (lenis) lenis.scrollTo(target, { offset })
  else window.scrollTo(0, target)
}

export function getLenis() {
  return lenis
}

// safe-guarded side-effect init
if (typeof window !== 'undefined') {
  initSmoothScroll()
}