// Product catalog. `image` is the art key rendered by <ProductArt/>.
// `specs` fields feed both the spec table and the compare view.
// Prices are in INR (Indian market).

export const CATEGORIES = [
  { key: 'bats', name: 'Cricket Bats', tagline: 'Hand-selected willow, shaped for power and balance' },
  { key: 'balls', name: 'Cricket Balls', tagline: 'Leather, lacquer and a seam you can trust' },
  { key: 'protection', name: 'Protection', tagline: 'Pads, helmets and gloves that move with you' },
  { key: 'apparel', name: 'Apparel', tagline: 'Jerseys and kit built to breathe on the field' },
  { key: 'footwear', name: 'Footwear', tagline: 'Grip, comfort and speed from first to last over' },
  { key: 'accessories', name: 'Accessories', tagline: 'The small things that win big games' },
]

export const PRODUCTS = [
  // ———————————— BATS ————————————
  {
    id: 'legend-pro', name: 'Legend Pro', brand: 'Gray-Nicolls', category: 'bats', audience: 'men',
    price: 24999, mrp: 28999, stock: 14, rating: 4.9, reviews: 412, image: 'bat-gray-nicolls', colors: ['Espresso', 'Cream', 'Oxblood'],
    shortDesc: 'The flagship English willow blade trusted by top-order batters.',
    description:
      'Six-piece English willow, pressed to a mid profile with a long, pronounced spine. The Legend Pro balances a weight around 2.10 lb with a wide hitting arc — made for batters who like to come down the wicket. Supplied with an MRF-style grade band and classic G-N chevron decal.',
    specs: { weight: '2.10 lb', height: '86.4 cm', swing: 'Balanced', bladeWidth: '108 mm', edges: '40 mm', sweetSpot: '21 cm', willowGrade: 'English Willow 1', grip: 'Pro Grip (2.5mm)', material: 'English Willow' },
  },
  {
    id: 'genius-grand', name: 'Genius Grand Edition', brand: 'MRF', category: 'bats', audience: 'men',
    price: 21999, mrp: 25999, stock: 9, rating: 4.8, reviews: 356, image: 'bat-mrf', colors: ['Navy', 'Gold', 'Red'],
    shortDesc: 'The Genius series with extra-thick edges and a huge sweet spot.',
    description:
      'Blade-built on the famous Genius mould, the Grand Edition is for power hitters. The edges run 40 mm into a light shoulder, keeping swing speed high without giving away the strike zone. A genuine 2.12 lb blade with a low-profile splice that keeps the pick-up soft.',
    specs: { weight: '2.12 lb', height: '86.8 cm', swing: 'Mid-low', bladeWidth: '110 mm', edges: '40 mm', sweetSpot: '22 cm', willowGrade: 'English Willow 1', grip: 'MRF Super Grip', material: 'English Willow' },
  },
  {
    id: 'master-english', name: 'Master English Willow', brand: 'SS', category: 'bats', audience: 'men',
    price: 17999, mrp: 20999, stock: 21, rating: 4.7, reviews: 289, image: 'bat', colors: ['Espresso', 'Ivory'],
    shortDesc: 'SS craftsmanship — the go-to blade for club cricket match days.',
    description:
      'A mid-to-light swell from SS, engineered for batters who want control over belligerence. The soft, round handle promotes a bottom-hand pick-up, and the 108 mm face gives you room to drive through the covers. Grade 1 English willow, hand-knocked and oiled at our workshop.',
    specs: { weight: '2.09 lb', height: '85.7 cm', swing: 'Balanced', bladeWidth: '108 mm', edges: '38 mm', sweetSpot: '20 cm', willowGrade: 'English Willow 1', grip: 'SS V-Grip', material: 'English Willow' },
  },
  {
    id: 'test-spec', name: 'Test Spec', brand: 'SG', category: 'bats', audience: 'men',
    price: 19999, mrp: 23500, stock: 7, rating: 4.8, reviews: 198, image: 'bat', colors: ['Red', 'White'],
    shortDesc: 'SG’s Test-match blade — full blade, full commitment.',
    description:
      'The Test Spec is built the way international batters like it: a full-profile blade with a thick spine, rolled edges and a middle you cannot miss. The weight lands at 2.11 lb with a slightly back-balanced feel that rewards aggressive front-foot play.',
    specs: { weight: '2.11 lb', height: '86.2 cm', swing: 'Mid-high', bladeWidth: '109 mm', edges: '39 mm', sweetSpot: '21 cm', willowGrade: 'English Willow 1', grip: 'SG Gen-X Grip', material: 'English Willow' },
  },
  {
    id: 'kahuna-pro', name: 'Kahuna Pro', brand: 'Kookaburra', category: 'bats', audience: 'men',
    price: 20999, mrp: 24999, stock: 11, rating: 4.7, reviews: 264, image: 'bat-kookaburra', colors: ['Yellow', 'Black'],
    shortDesc: 'Kookaburra’s pro blade with a fast, low pick-up.',
    description:
      'Kahuna is Kookaburra’s famous bat line — the Pro sits at its head. A low-balanced blade with generous edges gives you whip through the ball without tiring the top hand. Ships with our kangaroo-grip and matching cover.',
    specs: { weight: '2.10 lb', height: '86.0 cm', swing: 'Low', bladeWidth: '108 mm', edges: '39 mm', sweetSpot: '21 cm', willowGrade: 'English Willow 1', grip: 'Kookaburra Kangaroo Grip', material: 'English Willow' },
  },
  {
    id: 'icon-808', name: 'Icon 808', brand: 'Gunn & Moore', category: 'bats', audience: 'men',
    price: 22999, mrp: 26999, stock: 6, rating: 4.8, reviews: 143, image: 'bat-gm', colors: ['Crimson', 'Cream'],
    shortDesc: 'G&M heritage — timeless English willow for stroke play.',
    description:
      'The Icon 808 carries the Gunn & Moore DNA: a traditional English willow blade with a high spine and soft face. Purists will love the delicate pick-up and the clean middle that drives off both front and back foot.',
    specs: { weight: '2.10 lb', height: '86.3 cm', swing: 'Balanced', bladeWidth: '109 mm', edges: '38 mm', sweetSpot: '21 cm', willowGrade: 'English Willow 1', grip: 'G&M Pro Grip', material: 'English Willow' },
  },
  {
    id: 'gladiator-pro', name: 'Gladiator', brand: 'TON', category: 'bats', audience: 'men',
    price: 23499, mrp: 27500, stock: 8, rating: 4.8, reviews: 211, image: 'bat-ton', colors: ['Espresso', 'Cream'],
    shortDesc: 'TON’s powerhouse blade — massive edges, supreme pick-up.',
    description:
      'The TON Gladiator is built for modern aggressive batting. Concave edge profile delivers exceptional power, while the Grade 1+ English willow ensures durability across long innings. A chrome embossed sticker finish and SS authenticity hologram complete the package.',
    specs: { weight: '2.11 lb', height: '86.5 cm', swing: 'Mid-low', bladeWidth: '110 mm', edges: '42 mm', sweetSpot: '22 cm', willowGrade: 'English Willow 1+', grip: 'TON Pro Grip', material: 'English Willow' },
  },
  {
    id: 'dc1080-nb', name: 'DC 1080', brand: 'New Balance', category: 'bats', audience: 'men',
    price: 22499, mrp: 26999, stock: 12, rating: 4.7, reviews: 178, image: 'bat-new-balance', colors: ['Blue', 'White'],
    shortDesc: 'New Balance’s elite blade with concave edges and balanced pick-up.',
    description:
      'The DC 1080 from New Balance represents the pinnacle of their cricket bat engineering. Featuring Grade 1 English willow, a concave edge profile for power, and NB’s signature blue sticker detailing that has become iconic on the international circuit.',
    specs: { weight: '2.10 lb', height: '86.2 cm', swing: 'Balanced', bladeWidth: '109 mm', edges: '40 mm', sweetSpot: '21 cm', willowGrade: 'English Willow 1', grip: 'NB Pro Grip', material: 'English Willow' },
  },
  {
    id: 'zen-junior', name: 'Zen Kashmir Willow', brand: 'SS', category: 'bats', audience: 'juniors',
    price: 4999, mrp: 6500, stock: 34, rating: 4.5, reviews: 187, image: 'bat', colors: ['Ivory', 'Green'],
    shortDesc: 'A forgiving Kashmir willow blade for growing batters.',
    description:
      'Light enough for a junior’s first season of hard-ball cricket, with a broad face and soft edges to protect against mistimed shots. Kashmir willow gives plenty of value without the English premium. Available in 0–6 sizes.',
    specs: { weight: '1.8 lb', height: '78.5 cm', swing: 'Light', bladeWidth: '102 mm', edges: '34 mm', sweetSpot: '18 cm', willowGrade: 'Kashmir Willow', grip: 'SS Junior Grip', material: 'Kashmir Willow' },
  },
  {
    id: 'scoop-junior', name: 'Scoop', brand: 'Gray-Nicolls', category: 'bats', audience: 'juniors',
    price: 3999, mrp: 5200, stock: 41, rating: 4.6, reviews: 121, image: 'bat-gray-nicolls', colors: ['Blue', 'Orange'],
    shortDesc: 'The perfect first hard-ball bat — sized, shaped and weighted for kids.',
    description:
      'The Scoop is Gray-Nicolls’ junior favourite. A compact blade with a low centre of gravity helps young batters swing naturally and find the middle early. Comes with a junior toe guard and grip fitted.',
    specs: { weight: '1.6 lb', height: '74.0 cm', swing: 'Light', bladeWidth: '98 mm', edges: '30 mm', sweetSpot: '16 cm', willowGrade: 'Kashmir Willow', grip: 'G-N Junior Grip', material: 'Kashmir Willow' },
  },

  // ———————————— BALLS ————————————
  {
    id: 'turf-pro-red', name: 'Turf Pro Red', brand: 'Kookaburra', category: 'balls', audience: 'men',
    price: 1850, mrp: 2200, stock: 120, rating: 4.7, reviews: 890, image: 'ball', colors: ['Red'],
    shortDesc: 'The match-day red ball with a seam that speaks.',
    description:
      'Four-piece leather with a hand-stitched seam, treated for consistent swing in the first hour and reliable reverse later. The Turf Pro is the red ball most club sides step on the ground with.',
    specs: { weight: '156 g', height: '22.8 cm', swing: 'High', seam: 'Hand-stitched', material: 'Four-piece leather', colorway: 'Red', durability: '40+ overs' },
  },
  {
    id: 'sg-test-red', name: 'SG Test Red', brand: 'SG', category: 'balls', audience: 'men',
    price: 1995, mrp: 2400, stock: 85, rating: 4.8, reviews: 654, image: 'ball', colors: ['Red'],
    shortDesc: 'The official Test-match ball — 156 g of classic SG bite.',
    description:
      'SG’s Test ball is legendary for how it scuffs and reverses. A tight four-piece construction with a raised seam gives seamers real bite off the pitch. Box-fresh lacquer, ready for your match weekend.',
    specs: { weight: '156 g', height: '22.8 cm', swing: 'High', seam: 'Machine-stitched', material: 'Four-piece leather', colorway: 'Red', durability: '50+ overs' },
  },
  {
    id: 'turbo-white', name: 'Kookaburra White', brand: 'Kookaburra', category: 'balls', audience: 'men',
    price: 1650, mrp: 1900, stock: 60, rating: 4.6, reviews: 422, image: 'ball', colors: ['White'],
    shortDesc: 'Limited-overs favourite with a bright, true seam.',
    description:
      'Purpose-built for white-ball cricket under lights. The clean white lacquer stays visible late into the innings while the seam holds up through 50 overs of pace and spin.',
    specs: { weight: '156 g', height: '22.8 cm', swing: 'Medium', seam: 'Machine-stitched', material: 'Four-piece leather', colorway: 'White', durability: '50 overs' },
  },
  {
    id: 'crown-pink', name: 'Crown Pink', brand: 'Gray-Nicolls', category: 'balls', audience: 'women',
    price: 1495, mrp: 1750, stock: 54, rating: 4.6, reviews: 231, image: 'ball', colors: ['Pink'],
    shortDesc: 'Day–night pink, made for twilight cricket.',
    description:
      'A four-piece pink ball engineered for high visibility under lights. Great carry, a visible seam and a lacquer that stands up to dew.',
    specs: { weight: '156 g', height: '22.8 cm', swing: 'Medium', seam: 'Hand-stitched', material: 'Four-piece leather', colorway: 'Pink', durability: '45 overs' },
  },
  {
    id: 'club-yellow', name: 'Club Yellow', brand: 'SG', category: 'balls', audience: 'juniors',
    price: 650, mrp: 800, stock: 200, rating: 4.4, reviews: 512, image: 'ball', colors: ['Yellow'],
    shortDesc: 'Training-session yellow that survives the nets.',
    description:
      'SG’s durable training ball — the same classic feel at a net-session price. Tough lacquer, consistent bounce and a seam that keeps its shape session after session.',
    specs: { weight: '156 g', height: '22.8 cm', swing: 'Low', seam: 'Machine-stitched', material: 'Four-piece leather', colorway: 'Yellow', durability: 'Nets & practice' },
  },

  // ———————————— PROTECTION ————————————
  {
    id: 'supreme-pads', name: 'Supreme Pads', brand: 'SG', category: 'protection', audience: 'men',
    price: 3299, mrp: 4200, stock: 45, rating: 4.7, reviews: 388, image: 'pads', colors: ['White', 'Red'],
    shortDesc: 'Low-profile thigh-highs with full shin coverage.',
    description:
      'Supreme pads use a single-piece high-impact shin shell with segmented knee rolls that follow your leg through every stride. Wide thigh guards, double-strap, and a ventilated rear.',
    specs: { weight: '1.9 kg', size: 'L (44–47 cm)', material: 'HDPE + EVA foam', protection: 'ISR / BSI compliant' },
  },
  {
    id: 'velocity-pads', name: 'Velocity Pads', brand: 'Gray-Nicolls', category: 'protection', audience: 'men',
    price: 3799, mrp: 4800, stock: 38, rating: 4.6, reviews: 264, image: 'pads', colors: ['White', 'Blue'],
    shortDesc: 'Feather-light pads that don’t drag you down the track.',
    description:
      'Velocity strips weight out of the shin and knee without cutting protection. A contoured shell plus strategic foam zones keep you quick between the wickets.',
    specs: { weight: '1.7 kg', size: 'L (44–47 cm)', material: 'Carbonite shell + EVA', protection: 'ISR / BSI compliant' },
  },
  {
    id: 'pace-guard-women', name: 'Pace Guard Women’s', brand: 'Kookaburra', category: 'protection', audience: 'women',
    price: 3499, mrp: 4300, stock: 26, rating: 4.8, reviews: 176, image: 'pads', colors: ['White', 'Pink'],
    shortDesc: 'Women’s-specific fit — shorter calf, tapered thigh guard.',
    description:
      'Cut on a women’s last, the Pace Guard narrows the calf and raises the thigh guard for a locked-in feel. The shell is still every bit as protective as the men’s pro range.',
    specs: { weight: '1.6 kg', size: 'M (40–43 cm)', material: 'HDPE + EVA foam', protection: 'ISR / BSI compliant' },
  },
  {
    id: 'elite-helmet', name: 'Elite Helmet', brand: 'MRF', category: 'protection', audience: 'men',
    price: 4599, mrp: 5600, stock: 31, rating: 4.8, reviews: 445, image: 'helmet', colors: ['Black', 'Gold'],
    shortDesc: 'Carbon-steel grille and a featherweight shell.',
    description:
      'MRF Elite pairs a high-impact ABS shell with a titanium bar grille and 360° foam liner. Adjustable rear dial and padded chin strap keep it planted at the crease.',
    specs: { weight: '1.1 kg', size: 'S/M/L adjustable', material: 'ABS + steel grille', protection: 'Grille: titanium bar' },
  },
  {
    id: 'warrior-junior', name: 'Warrior Junior Helmet', brand: 'SS', category: 'protection', audience: 'juniors',
    price: 1999, mrp: 2600, stock: 52, rating: 4.6, reviews: 198, image: 'helmet', colors: ['Blue', 'White'],
    shortDesc: 'Light protection for fearless young batters.',
    description:
      'A scaled-down shell and grille for junior sizes, with the same quality foam liner as the adult range. Rear fit dial grows with them.',
    specs: { weight: '0.85 kg', size: 'Youth (52–55 cm)', material: 'ABS + steel grille', protection: 'Youth grille' },
  },
  {
    id: 'pro-gloves', name: 'Pro Batting Gloves', brand: 'Kookaburra', category: 'protection', audience: 'men',
    price: 2899, mrp: 3600, stock: 58, rating: 4.7, reviews: 302, image: 'gloves', colors: ['Black', 'Yellow'],
    shortDesc: 'Flexible fibre side, tough shield, snug finger fit.',
    description:
      'Kookaburra’s Pro gloves balance flex and protection — a two-piece fibre side that follows the fingers and a sturdy shield that meets the top-grade balls. Kangaroo-touch palm for feel.',
    specs: { weight: '0.8 kg', size: 'M / L / XL', material: 'PU palm + fibre', protection: 'Two-piece side' },
  },
  {
    id: 'ghost-women', name: 'Ghost Women’s Gloves', brand: 'Gray-Nicolls', category: 'protection', audience: 'women',
    price: 2699, mrp: 3300, stock: 33, rating: 4.6, reviews: 143, image: 'gloves', colors: ['White', 'Pink'],
    shortDesc: 'Slimmer finger stalls with the same pro-grade shield.',
    description:
      'Ghost gloves are cut on a women’s last for a closer grip on the bat. The shield and fibre side carry full protection while the palm keeps its tacky feel.',
    specs: { weight: '0.7 kg', size: 'S / M / L', material: 'PU palm + fibre', protection: 'Two-piece side' },
  },
  {
    id: 'combo-junior', name: 'Combo Pads + Gloves', brand: 'SG', category: 'protection', audience: 'juniors',
    price: 2199, mrp: 2900, stock: 44, rating: 4.5, reviews: 212, image: 'pads', colors: ['White', 'Green'],
    shortDesc: 'Complete junior protection in one value bundle.',
    description:
      'The starter kit: pads and gloves sized for junior batters, with the same SG construction as the senior range. Easy-on straps for young players and parents alike.',
    specs: { weight: '1.9 kg', size: 'Youth (S/M)', material: 'HDPE + EVA foam', protection: 'ISR compliant' },
  },

  // ———————————— APPAREL ————————————
  {
    id: 'team-jersey', name: 'Team Jersey', brand: 'New Balance', category: 'apparel', audience: 'men',
    price: 1899, mrp: 2400, stock: 66, rating: 4.6, reviews: 289, image: 'jersey', colors: ['Navy', 'White'],
    shortDesc: 'Pro-cut match jersey with NB Dry moisture wicking.',
    description:
      'Cut for movement and airflow, the Team Jersey uses NB Dry fabric to pull sweat off the skin. Set-in sleeves and a dropped hem keep you covered through the dive.',
    specs: { weight: '210 g', fit: 'Athletic / Pro-cut', material: '100% recycled polyester', moisture: 'NB Dry wicking' },
  },
  {
    id: 'spartan-women', name: 'Spartan Pro Jersey', brand: 'Spartan', category: 'apparel', audience: 'women',
    price: 1699, mrp: 2100, stock: 58, rating: 4.7, reviews: 197, image: 'jersey', colors: ['Espresso', 'Cream'],
    shortDesc: 'Women’s-specific cut with a sporty, slimmer fit.',
    description:
      'The Spartan Pro is shaped for the women’s game — a closer torso cut, dropped shoulders and breathable mesh side panels. Machine-washable, quick-dry fabric.',
    specs: { weight: '190 g', fit: 'Slim / Women’s', material: 'Polyester mesh', moisture: 'Quick-dry' },
  },
  {
    id: 'academy-tee', name: 'Academy Tee', brand: 'Gray-Nicolls', category: 'apparel', audience: 'juniors',
    price: 899, mrp: 1200, stock: 110, rating: 4.5, reviews: 154, image: 'jersey', colors: ['Blue', 'White'],
    shortDesc: 'Training tee that survives the nets, wash after wash.',
    description:
      'A soft-touch training tee for young cricketers. Cotton-blend with reinforced shoulder seams so it holds up to the bag and the nets.',
    specs: { weight: '180 g', fit: 'Relaxed / Junior', material: '60% cotton, 40% poly', moisture: 'Soft-touch' },
  },

  // ———————————— FOOTWEAR ————————————
  {
    id: 'spike-pro', name: 'Spike Pro', brand: 'Kookaburra', category: 'footwear', audience: 'men',
    price: 4299, mrp: 5400, stock: 37, rating: 4.7, reviews: 321, image: 'shoes', colors: ['Black', 'Yellow'],
    shortDesc: 'Six-spike metal-stud shoe for bowlers and all-rounders.',
    description:
      'Built for the run-up and the crease: a reinforced toe, TPU spike plate with six metal studs, and a cushioned midsole that keeps you fresh through the second innings.',
    specs: { weight: '420 g', size: 'UK 7–12', studs: '6× metal spike', cushioning: 'EVA midsole' },
  },
  {
    id: 'nb-880-women', name: '880 Cricket Shoe', brand: 'New Balance', category: 'footwear', audience: 'women',
    price: 3999, mrp: 4999, stock: 29, rating: 4.6, reviews: 168, image: 'shoes', colors: ['White', 'Pink'],
    shortDesc: 'Women’s-lasted trainer with hybrid turf grip.',
    description:
      'The 880 adapts to every surface — rubber-studded outsole grips the turf while the NB ortholite insole cushions long days. Cut on a women’s last for a locked-in heel.',
    specs: { weight: '340 g', size: 'UK 4–8', studs: 'Rubber hybrid', cushioning: 'Ortholite insole' },
  },

  // ———————————— ACCESSORIES ————————————
  {
    id: 'training-bag', name: 'Tour Kit Bag', brand: 'SG', category: 'accessories', audience: 'men',
    price: 3499, mrp: 4300, stock: 23, rating: 4.6, reviews: 176, image: 'stumps', colors: ['Black', 'Red'],
    shortDesc: 'Wheeled 3-bat bag with shoe and helmet pockets.',
    description:
      'The Tour bag holds three bats, a full pad-and-glove set, and still has room for the water bottle. Smooth wheels, padded shoulder straps, and a ventilated shoe compartment.',
    specs: { weight: '2.6 kg', capacity: '3 bats + kit', material: '600D polyester', wheels: 'In-line skate' },
  },
  {
    id: 'grip-pack', name: 'Pro Grip Pack', brand: 'Gray-Nicolls', category: 'accessories', audience: 'men',
    price: 349, mrp: 450, stock: 300, rating: 4.5, reviews: 890, image: 'stumps', colors: ['Espresso', 'Cream'],
    shortDesc: 'Three replacement grips with cotton underwrap.',
    description:
      'Keep your bat’s feel consistent — three 2.5 mm pro grips with cotton underwrap and finishing tape. Fits any standard bat handle.',
    specs: { weight: '60 g', size: '2.5 mm', material: 'Rubber + cotton', pack: '3 grips + tape' },
  },
]

export const BRANDS = [
  { slug: 'gray-nicolls', name: 'Gray-Nicolls', tagline: 'Founded 1876 · Sussex, England', mark: 'GN', blurb: 'The oldest name in cricket, still hand-finishing bats from English willow in Robertsbridge.' },
  { slug: 'mrf', name: 'MRF', tagline: 'Indian willow, world stage', mark: 'MRF', blurb: 'The bat behind the 2003 World Cup — MRF hammers out power blades for the modern game.' },
  { slug: 'ss', name: 'SS', tagline: 'Sardar Sports · Meerut', mark: 'SS', blurb: 'Made in Meerut with tournament-level willow at a price club cricket can live with.' },
  { slug: 'sg', name: 'SG', tagline: 'The official Test ball', mark: 'SG', blurb: 'Sanspareils Greenlands — the ball that swings, scuffs and reverses for the red-ball game.' },
  { slug: 'kookaburra', name: 'Kookaburra', tagline: 'Aussie kit, trusted worldwide', mark: 'KB', blurb: 'From the Sydney grade comps to Test cricket, Kookaburra builds balls and bats made to be hit.' },
  { slug: 'gunn-moore', name: 'Gunn & Moore', tagline: 'Since 1858 · Nottingham', mark: 'G&M', blurb: 'Traditional English willow with a devoted following among the stroke-makers of the game.' },
  { slug: 'new-balance', name: 'New Balance', tagline: 'Performance on every pitch', mark: 'NB', blurb: 'From the DC bat range to on-field footwear, New Balance brings athletic precision to cricket.' },
  { slug: 'spartan', name: 'Spartan', tagline: 'Gear up, stand tall', mark: 'SP', blurb: 'Aggressive styling and accessible pricing — the kit of the schoolyard hero.' },
  { slug: 'ton', name: 'TON', tagline: 'SS Cricket · Meerut', mark: 'TON', blurb: 'TON by SS Cricket — powerhouse blades built for the modern aggressive game, trusted across formats.' },
]

export const AUDIENCES = [
  { key: 'men', name: 'Men', blurb: 'Full-size kit for the senior game' },
  { key: 'women', name: 'Women', blurb: 'Cut, weighted and fitted for the women’s game' },
  { key: 'juniors', name: 'Juniors', blurb: 'Sized and balanced for young cricketers' },
]

// colorway name → hex swatch for card dots
export const SWATCH = {
  Espresso: '#2E2E2E', Cream: '#EFEFEF', Oxblood: '#5C5C5C', Navy: '#1F1F1F',
  Gold: '#C9C9C9', Red: '#333333', Ivory: '#F2F2F2', White: '#FFFFFF',
  Yellow: '#B4B4B4', Green: '#4A4A4A', Crimson: '#3A3A3A', Blue: '#6B6B6B',
  Orange: '#B4B4B4', Pink: '#A8A8A8', Black: '#1A1A1A',
}

export const formatINR = (n) => '₹' + n.toLocaleString('en-IN')

const BRAND_SLUG_MAP = {
  'Gray-Nicolls': 'gray-nicolls',
  MRF: 'mrf',
  SS: 'ss',
  SG: 'sg',
  Kookaburra: 'kookaburra',
  'Gunn & Moore': 'gunn-moore',
  'New Balance': 'new-balance',
  Spartan: 'spartan',
  TON: 'ton',
}

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id)
export const brandSlug = (name) => BRAND_SLUG_MAP[name] || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
export const productsByBrand = (slug) => PRODUCTS.filter((p) => brandSlug(p.brand) === slug)
export const brandByName = (name) => BRANDS.find((b) => b.name === name)