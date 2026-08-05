import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import BatModel from './BatModel'
import BallModel from './BallModel'
import StudioLights from './StudioLights'

function Parallax({ children, speed = 0.35 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.pointer.x * speed
    ref.current.rotation.x = state.pointer.y * speed * 0.5
  })
  return <group ref={ref}>{children}</group>
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.3, 7.2], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
    >
      <StudioLights />
      <Parallax>
        <BatModel position={[-1.35, 0, 0]} rotation={[0.05, 0.38, 0]} scale={0.95} grip="#3F2A1A" sticker="#1F1A33" />
        <BallModel position={[1.6, 0.55, 0.5]} color="#B33A2B" />
        <BallModel position={[1.15, -0.85, -0.2]} color="#F5F1E6" radius={0.42} />
      </Parallax>
      <ContactShadows position={[0, -1.55, 0]} opacity={0.4} scale={9} blur={2.6} far={3.2} color="#3f2a1a" />
    </Canvas>
  )
}