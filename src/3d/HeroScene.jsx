// Hero display using real product photography instead of Three.js 3D models.
export default function HeroScene() {
  return (
    <div className="relative h-full w-full select-none overflow-hidden">
      {/* Cricket Bat — main focal piece, left-centre */}
      <div
        className="absolute bottom-0 left-[4%] top-[5%] w-[40%] transition-transform duration-700 hover:scale-[1.03]"
        style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.22))' }}
      >
        <img
          src="/products/bat.jpg"
          alt="Cricket bat"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Red Cricket Ball — upper right */}
      <div
        className="absolute right-[14%] top-[8%] w-[30%] transition-transform duration-700 hover:scale-[1.05]"
        style={{ filter: 'drop-shadow(0 18px 36px rgba(0,0,0,0.20))' }}
      >
        <img
          src="/products/ball.jpg"
          alt="Cricket ball"
          className="w-full rounded-full object-contain"
        />
      </div>

      {/* Cricket Kit Bag — lower right */}
      <div
        className="absolute bottom-[2%] right-[2%] w-[42%] transition-transform duration-700 hover:scale-[1.03]"
        style={{ filter: 'drop-shadow(0 18px 36px rgba(0,0,0,0.18))' }}
      >
        <img
          src="/products/kitbag.jpg"
          alt="Cricket kit bag"
          className="w-full object-contain"
        />
      </div>
    </div>
  )
}