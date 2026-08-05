import { useMemo } from 'react'
import { RoundedBox, Float } from '@react-three/drei'
import { makeTextTexture } from '../lib/makeTextTexture'

// Procedural, stylised cricket bat built from primitives. Not photoreal — a
// clean premium silhouette whose materials respond to the Build Studio.
export default function BatModel({
  wood = '#E7D7B6',
  grip = '#3F2A1A',
  sticker = '#1F1A33',
  engraving = '',
  float = true,
  ...props
}) {
  const engravingTex = useMemo(
    () => (engraving ? makeTextTexture(engraving.toUpperCase(), { color: '#4a3320' }) : null),
    [engraving]
  )

  const body = (
    <group {...props}>
      {/* Blade */}
      <RoundedBox args={[0.52, 1.62, 0.11]} radius={0.035} smoothness={4} position={[0, -0.5, 0]} castShadow>
        <meshStandardMaterial color={wood} roughness={0.42} metalness={0} />
      </RoundedBox>
      {/* Face sheen hint */}
      <RoundedBox args={[0.4, 1.3, 0.045]} radius={0.03} smoothness={4} position={[0, -0.42, 0.052]}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.05} roughness={0.9} />
      </RoundedBox>
      {/* Splice */}
      <mesh position={[0, 0.34, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.15, 0.18, 20]} />
        <meshStandardMaterial color={wood} roughness={0.5} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0.92, 0]} castShadow>
        <cylinderGeometry args={[0.085, 0.1, 0.95, 16]} />
        <meshStandardMaterial color={wood} roughness={0.55} />
      </mesh>
      {/* Grip over handle + ridges */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.1, 0.115, 0.88, 20]} />
        <meshStandardMaterial color={grip} roughness={0.85} />
      </mesh>
      {[0.62, 0.74, 0.86, 0.98, 1.1].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.108, 0.011, 10, 32]} />
          <meshStandardMaterial color="#000000" roughness={0.9} />
        </mesh>
      ))}
      {/* Handle knob */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial color={wood} roughness={0.5} />
      </mesh>
      {/* Brand sticker near splice */}
      <mesh position={[0, 0.02, 0.0565]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial color={sticker} roughness={0.6} />
      </mesh>
      {/* Engraving on the blade face */}
      {engravingTex && (
        <mesh position={[0, -0.3, 0.058]}>
          <planeGeometry args={[0.44, 0.14]} />
          <meshBasicMaterial map={engravingTex} transparent />
        </mesh>
      )}
    </group>
  )

  return float ? <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.6}>{body}</Float> : body
}