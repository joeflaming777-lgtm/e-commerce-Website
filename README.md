# 🏏 ThePavilionStore

> A premium cricket e-commerce storefront built with React, Vite, and Three.js — featuring immersive 3D product visualisation, smooth animations, and a full shopping experience.

---

## ✨ Features

- **3D Hero & Product Viewer** — Interactive bat and ball models rendered with `@react-three/fiber` and `@react-three/drei`
- **Full Shopping Flow** — Browse → Product detail → Cart → Checkout → Order confirmation
- **Slide-out Cart Drawer** — Quick-access cart with quantity controls and live totals
- **Product Compare** — Side-by-side comparison of up to 3 products via a sticky compare bar
- **Bat Customiser** — Configure your own bat (wood, grip, weight) with a live 3D preview
- **Wishlist** — Save products per session with heart-toggle on product cards
- **Auth Pages** — Login & Account pages (client-side, Zustand-backed)
- **Live Chat Widget** — Floating support chat on every page
- **Toast Notifications** — Non-intrusive feedback for cart, compare, and wishlist actions
- **Announcement Bar** — Rotating promotional messages at the top of every page
- **Smooth Scroll** — Powered by [Lenis](https://github.com/darkroomengineering/lenis) for buttery-smooth page scrolling
- **Page Transitions** — Animated route changes via `framer-motion` `AnimatePresence`
- **Code-split Pages** — All pages are lazy-loaded for fast initial load
- **Fully Responsive** — Mobile-first layout using Tailwind CSS v4

---

## 🗂️ Project Structure

```
src/
├── 3d/                    # Three.js scene components
│   ├── BallModel.jsx
│   ├── BatModel.jsx
│   ├── HeroScene.jsx
│   ├── ProductViewer.jsx
│   └── StudioLights.jsx
├── assets/                # Static art & icons
├── components/
│   ├── auth/              # Auth-related UI
│   ├── cart/              # CartDrawer
│   ├── compare/           # CompareBar
│   ├── customizer/        # Bat customiser UI
│   ├── layout/            # Header, Footer, AnnouncementBar
│   ├── product/           # Product detail sections
│   ├── shop/              # ProductCard, filters, grid
│   ├── support/           # ChatWidget
│   └── ui/                # Badge, Toast, shared primitives
├── data/
│   ├── products.js        # Product catalogue & helpers
│   ├── faqs.js            # FAQ data
│   └── testimonials.js    # Review data
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── Category.jsx
│   ├── Product.jsx
│   ├── Brand.jsx
│   ├── Compare.jsx
│   ├── Customize.jsx
│   ├── Login.jsx
│   ├── Account.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── OrderConfirm.jsx
│   ├── Support.jsx
│   └── NotFound.jsx
├── store/
│   ├── useAuth.js         # Auth state (Zustand)
│   ├── useCart.js         # Cart state (Zustand)
│   ├── useCompare.js      # Compare state (Zustand)
│   └── useCustomizer.js   # Customiser state (Zustand)
├── App.jsx                # Root — routes, layout, global UI
├── main.jsx               # Entry point
└── index.css              # Global styles & design tokens
```

---

## 🛣️ Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/shop` | All Products |
| `/category/:key` | Category filter |
| `/product/:id` | Product Detail |
| `/brand/:slug` | Brand page |
| `/compare` | Product Comparison |
| `/customize` | Bat Customiser |
| `/login` | Login / Register |
| `/account` | Account Dashboard |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/order/:id` | Order Confirmation |
| `/support` | Support & FAQ |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| 3D rendering | [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| State management | [Zustand](https://zustand-demo.pmnd.rs/) |
| Routing | [React Router v6](https://reactrouter.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | Fraunces (display) · Manrope (body) via `@fontsource` |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/thepavilionstore.git
cd thepavilionstore

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173**

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build production bundle to `/dist` |
| `npm run preview` | Preview the production build locally |

---

## 🎨 Design System

The project uses a professional navy & gold e-commerce palette defined in `index.css`:

| Token | Role |
|---|---|
| `espresso` | Primary deep navy — buttons / headings / dark sections |
| `espresso-deep` | Darker navy — hover states & gradient ends |
| `willow` | Mid navy — prices, positive accents |
| `gold` | Brand accent — sale badges, star ratings, logo |
| `ivory` | Primary light / text on dark |
| `leather` | Muted slate — meta text / icons |
| `linen` / `cream` | Card backgrounds |
| `mist` | Secondary text / placeholders |
| `sand` | Subtle highlight |

Fonts — **Fraunces** for headings (`font-display`), **Manrope** for body text.

---

## 📦 State Management

All global state lives in lightweight **Zustand** stores under `src/store/`:

- **`useCart`** — items, add, remove, update quantity, clear
- **`useCompare`** — product IDs being compared (max 3)
- **`useAuth`** — current user session, login/logout
- **`useCustomizer`** — bat configuration selections

---

## 📄 License

This project is for educational and portfolio purposes. All brand names used within product data are fictional.

---

*let's make this a real e-commerce website for everything *

---
