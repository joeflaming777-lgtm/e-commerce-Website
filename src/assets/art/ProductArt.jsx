import { memo } from 'react'

// Real product photography mapped to each art key.
// Images are served from /public/products/.
const IMAGE_MAP = {
  bat:    '/products/bat.jpg',
  ball:   '/products/ball.jpg',
  pads:   '/products/pads.jpg',
  helmet: '/products/helmet.jpg',
  gloves: '/products/gloves.jpg',
  jersey: '/products/jersey.jpg',
  shoes:  '/products/shoes.jpg',
  stumps: '/products/stumps.jpg',
}

function ProductImg({ art = 'bat', className, style, ...props }) {
  const src = IMAGE_MAP[art] || IMAGE_MAP.bat
  return (
    <img
      src={src}
      alt={art}
      style={{ objectFit: 'contain', ...style }}
      className={className}
      {...props}
    />
  )
}

// Named exports kept for backward compatibility with customizer previews.
export const BatArt    = (props) => <ProductImg art="bat"    {...props} />
export const BallArt   = (props) => <ProductImg art="ball"   {...props} />
export const PadsArt   = (props) => <ProductImg art="pads"   {...props} />
export const HelmetArt = (props) => <ProductImg art="helmet" {...props} />
export const GlovesArt = (props) => <ProductImg art="gloves" {...props} />
export const JerseyArt = (props) => <ProductImg art="jersey" {...props} />
export const ShoesArt  = (props) => <ProductImg art="shoes"  {...props} />
export const StumpsArt = (props) => <ProductImg art="stumps" {...props} />

export const ProductArt = memo(function ProductArt({ art, color, className, ...props }) {
  return <ProductImg art={art} className={className} {...props} />
})

export default ProductArt
