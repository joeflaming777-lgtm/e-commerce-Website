import { useMemo } from 'react'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { makeTextTexture } from '../lib/makeTextTexture'

// Procedural, stylised cricket bat. The blade is an extruded silhouette so the
// face reads like a real bat — wide in the middle, shoulders where it meets
// the splice, a rounded toe and a flat hitting face. Materials respond to the
// Build Studio.
export default function BatModel({
  wood = '#E4E4E4',
  grip = '#1F1F1F',
  sticker = '#0A0A0A',
  engraving = '',
  float = true,
  ...props
}) {
  const engravingTex = useMemo(
    () => (engraving ? makeTextTexture(engraving.toUpperCase(), { color: '#3a3a3a' }) : null),
    [engraving]
  )

  const bladeGeo = useMemo(() => {
    // Outline of the blade — tracing right side down to the toe, mirrored up
    // the left. y up, x is blade half-width.
    const pts = [
      [0, 1.12],
      [0.1, 1.12],
      [0.24, 1.04],
      [0.3, 0.9],
      [0.31, 0.55],
      [0.31, 0.15],
      [0.28, -0.45],
      [0.22, -0.8],
      [0.14, -0.98],
      [0, -1.06],
      [-0.14, -0.98],
      [-0.22, -0.8],
      [-0.28, -0.45],
      [-0.31, 0.15],
      [-0.31, 0.55],
      [-0.3, 0.9],
      [-0.24, 1.04],
      [-0.1, 1.12],
    ].map(([x, y]) => new THREE.Vector2(x, y))

    const shape = new THREE.Shape(pts)
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.13,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 4,
      curveSegments: 12,
    })
    geo.translate(0, 0, -0.065)
    return geo
  }, [])

  const body = (
    <group {...props}>
      {/* Blade — the extruded silhouette */}
      <mesh geometry={bladeGeo} castShadow>
        <meshStandardMaterial color={wood} roughness={0.45} metalness={0} />
      </mesh>

      {/* Flat hitting face sheen (front) */}
      <mesh position={[0, -0.15, 0.045]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.5, 1.5]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.06} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Splice — the collar joining blade to handle */}
      <mesh position={[0, 1.18, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.155, 0.24, 18]} />
        <meshStandardMaterial color={wood} roughness={0.5} />
      </mesh>
      {/* Splice collar rings */}
      {[1.07, 1.13, 1.19].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.075 + i * 0.028, 0.008, 8, 24]} />
          <meshStandardMaterial color="#9a9a9a" roughness={0.6} />
        </mesh>
      ))}

      {/* Handle */}
      <mesh position={[0, 1.73, 0]} castShadow>
        <cylinderGeometry args={[0.082, 0.1, 1.05, 18]} />
        <meshStandardMaterial color={wood} roughness={0.55} />
      </mesh>

      {/* Grip over the handle + ribbed ridges */}
      <mesh position={[0, 1.72, 0]}>
        <cylinderGeometry args={[0.1, 0.115, 0.92, 22]} />
        <meshStandardMaterial color={grip} roughness={0.85} />
      </mesh>
      {[1.3, 1.45, 1.6, 1.75, 1.9, 2.05].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.107, 0.012, 10, 32]} />
          <meshStandardMaterial color="#000000" roughness={0.9} />
        </mesh>
      ))}

      {/* Handle knob */}
      <mesh position={[0, 2.32, 0]} castShadow>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color={wood} roughness={0.5} />
      </mesh>

      {/* Brand sticker near the splice */}
      <mesh position={[0, 0.78, 0.043]}>
        <planeGeometry args={[0.32, 0.2]} />
        <meshStandardMaterial color={sticker} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Engraving on the blade face */}
      {engravingTex && (
        <mesh position={[0, 0.05, 0.05]}>
          <planeGeometry args={[0.42, 0.14]} />
          <meshBasicMaterial map={engravingTex} transparent />
        </mesh>
      )}
    </group>
  )

  return float ? <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.6}>{body}</Float> : body
}
