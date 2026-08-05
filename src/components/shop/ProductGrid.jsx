import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="grid min-h-[40vh] place-items-center rounded-3xl border border-dashed border-espresso/15 bg-white/40 p-10 text-center">
        <div>
          <p className="font-display text-xl text-espresso">No kit matches those filters</p>
          <p className="mt-2 text-sm text-mist">Try clearing a filter or browsing another category.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  )
}