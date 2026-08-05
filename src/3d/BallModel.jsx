import { useMemo } from 'react'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Stylised cricket ball — a leather sphere with a raised hand-stitched seam.
export default function BallModel({ color = '#B33A2B', float = true, radius = 0.5, ...props }) {
  const seamColor = useMemo(() => new THREE.Color(color).multiplyScalar(0.55).getStyle(), [color])

  const ball = (
    <group {...props}>
      <mesh castShadow>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial color={color} roughness={0.42} metalness={0.02} />
      </mesh>
      {/* equatorial seam */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 0.985, 0.018, 12, 64]} />
        <meshStandardMaterial color={seamColor} roughness={0.6} />
      </mesh>
      {/* leaf seam arcs */}
      {[0, Math.PI].map((rot) => (
        <mesh key={rot} rotation={[0, 0, rot]}>
          <torusGeometry args={[radius * 0.985, 0.013, 12, 64, Math.PI * 1.15]} />
          <meshStandardMaterial color={seamColor} roughness={0.6} />
        </mesh>
      ))}
    </group>
  )

  return float ? (
    <Float speed={1.8} rotationIntensity={0.18} floatIntensity={0.5}>{ball}</Float>
  ) : ball
}