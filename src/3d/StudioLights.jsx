// Neutral, hand-placed studio lighting (no network HDR, no presets).
// Key + rim + fill with a soft cool-gray fog to blend the scene into the page.

export default function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.55} color="#ffffff" />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.6}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.7} color="#9a9a9a" />
      <spotLight position={[0, 6, 2]} angle={0.5} penumbra={0.8} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, -3, 3]} intensity={0.4} color="#b0b0b0" />
      <fog attach="fog" args={['#f7f7f7', 8, 16]} />
    </>
  )
}