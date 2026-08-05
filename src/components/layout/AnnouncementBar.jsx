import { Truck, ShieldCheck, RefreshCcw } from 'lucide-react'

const MESSAGES = [
  { icon: Truck, text: 'Free delivery on orders above ₹1,499' },
  { icon: ShieldCheck, text: 'Authentic willow & genuine leather, guaranteed' },
  { icon: RefreshCcw, text: '15-day returns · 30-day bat warranty' },
]

export default function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-espresso text-ivory">
      <div className="flex w-max animate-marquee items-center gap-12 py-2">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-12">
            {MESSAGES.map(({ icon: Icon, text }, i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap text-[11px] font-semibold tracking-wide">
                <Icon size={13} className="text-sand" />
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}