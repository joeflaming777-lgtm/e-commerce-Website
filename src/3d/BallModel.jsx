import { useMemo } from 'react'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Stylised cricket ball — a leather sphere with a raised hand-stitched seam.
// The main seam runs around the equator with stitch bumps; two curved leaf
// seams cross the hemispheres so it reads as a proper red/white ball.
export default function BallModel({ color = '#262626', float = true, radius = 0.5, ...props }) {
  const seamColor = useMemo(() => new THREE.Color(color).multiplyScalar(0.55).getStyle(), [color])
  const stitchColor = useMemo(() => new THREE.Color(color).multiplyScalar(0.35).getStyle(), [color])

  // Stitch bumps along the equator ring so the seam looks hand-sewn.
  const stitches = useMemo(() => {
    const arr = []
    const n = 34
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2
      arr.push([
        Math.cos(a) * radius * 0.995,
        0,
        Math.sin(a) * radius * 0.995,
      ])
    }
    return arr
  }, [radius])

  const ball = (
    <group {...props}>
      {/* Leather body */}
      <mesh castShadow>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.02} />
      </mesh>

      {/* Equatorial seam (raised) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 0.992, 0.024, 12, 72]} />
        <meshStandardMaterial color={seamColor} roughness={0.55} />
      </mesh>

      {/* Stitch bumps along the seam */}
      {stitches.map((p, i) => (
        <mesh key={i} position={[p[0], p[1], p[2]]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color={stitchColor} roughness={0.6} />
        </mesh>
      ))}

      {/* Curved leaf seams across each hemisphere */}
      {[-0.5, 0.5].map((dir, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, dir * Math.PI]}>
          <torusGeometry args={[radius * 0.992, 0.017, 10, 64, Math.PI * 1.15]} />
          <meshStandardMaterial color={seamColor} roughness={0.6} />
        </mesh>
      ))}
    </group>
  )

  return float ? (
    <Float speed={1.8} rotationIntensity={0.18} floatIntensity={0.5}>{ball}</Float>
  ) : ball
}
