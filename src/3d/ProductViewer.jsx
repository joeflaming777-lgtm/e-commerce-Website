import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import BatModel from './BatModel'
import BallModel from './BallModel'
import StudioLights from './StudioLights'

// Interactive, drag-to-rotate 3D view of a single product.
// `type`: 'bat' | 'ball'. For bats, opts map to Build-Studio materials.
export default function ProductViewer({
  type = 'bat',
  color = '#262626',
  wood = '#E4E4E4',
  grip = '#1F1F1F',
  sticker = '#0A0A0A',
  engraving = '',
}) {
  return (
    <>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <StudioLights />
        <Suspense fallback={null}>
          {type === 'bat' ? (
            <BatModel
              position={[0, -0.15, 0]}
              wood={wood}
              grip={grip}
              sticker={sticker}
              engraving={engraving}
              float={false}
            />
          ) : (
            <BallModel position={[0, 0, 0]} color={color} radius={1.15} float={false} />
          )}
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.08} minPolarAngle={0.6} maxPolarAngle={2.3} autoRotate autoRotateSpeed={0.9} />
        <ContactShadows position={[0, -1.7, 0]} opacity={0.35} scale={8} blur={2.5} far={3} color="#3a3a3a" />
      </Canvas>
    </>
  )
}