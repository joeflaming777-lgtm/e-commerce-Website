export default function Input({ label, hint, error, className = '', id, ...props }) {
  const fieldId = id || (label ? label.toLowerCase().replace(/[^a-z]+/g, '-') : undefined)
  return (
    <label className={`block ${className}`} htmlFor={fieldId}>
      {label && (
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-espresso/70">
          {label}
        </span>
      )}
      <input
        id={fieldId}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-mist/70 ${
          error ? 'border-[#b3261e]/60 focus:border-[#b3261e]' : 'border-espresso/15 focus:border-willow'
        }`}
        {...props}
      />
      {hint && !error && <span className="mt-1.5 block text-xs text-mist">{hint}</span>}
      {error && <span className="mt-1.5 block text-xs font-semibold text-[#b3261e]">{error}</span>}
    </label>
  )
}