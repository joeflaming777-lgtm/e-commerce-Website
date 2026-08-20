import { memo } from 'react'

// Real product photography mapped to each art key.
// Images are served from /public/products/.
const IMAGE_MAP = {
  // Generic fallback bat
  bat:              '/products/bat.jpg',
  // Brand-specific bat images
  'bat-mrf':        '/products/bat-mrf.png',
  'bat-ton':        '/products/bat-ton.png',
  'bat-gray-nicolls': '/products/bat-gray-nicolls.png',
  'bat-kookaburra': '/products/bat-kookaburra.png',
  'bat-new-balance': '/products/bat-new-balance.png',
  'bat-gm':         '/products/bat-gm.png',
  // Other equipment
  ball:   '/products/ball.jpg',
  pads:   '/products/pads.jpg',
  helmet: '/products/helmet.jpg',
  gloves: '/products/gloves.jpg',
  jersey:            '/products/jersey.jpg',
  'jersey-nb':       '/products/jersey-nb.png',
  'jersey-spartan':  '/products/jersey-spartan.png',
  'jersey-academy':  '/products/jersey-academy.png',
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
export const JerseyArt        = (props) => <ProductImg art="jersey"          {...props} />
export const JerseyNBArt      = (props) => <ProductImg art="jersey-nb"       {...props} />
export const JerseySpartanArt = (props) => <ProductImg art="jersey-spartan"  {...props} />
export const JerseyAcademyArt = (props) => <ProductImg art="jersey-academy"  {...props} />
export const ShoesArt  = (props) => <ProductImg art="shoes"  {...props} />
export const StumpsArt = (props) => <ProductImg art="stumps" {...props} />

export const ProductArt = memo(function ProductArt({ art, color, className, ...props }) {
  return <ProductImg art={art} className={className} {...props} />
})

export default ProductArt
