import * as THREE from 'three'

// Draws text onto an offscreen canvas and returns a THREE.CanvasTexture —
// used for bat engraving / ball seam text without any external font files.
export function makeTextTexture(text, { color = '#2e2e2e', bg = 'rgba(0,0,0,0)', size = 96 } = {}) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 160
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = color
  ctx.font = `600 ${size}px Georgia, serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 4
  tex.needsUpdate = true
  return tex
}