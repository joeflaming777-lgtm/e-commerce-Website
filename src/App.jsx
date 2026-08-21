import { Suspense, lazy, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AnnouncementBar from './components/layout/AnnouncementBar'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import CompareBar from './components/compare/CompareBar'
import ChatWidget from './components/support/ChatWidget'
import ToastContainer from './components/ui/Toast'

const Home = lazy(() => import('./pages/Home'))
const ShopPage = lazy(() => import('./pages/Shop'))
const CategoryPage = lazy(() => import('./pages/Category'))
const ProductPage = lazy(() => import('./pages/Product'))
const BrandPage = lazy(() => import('./pages/Brand'))
const ComparePage = lazy(() => import('./pages/Compare'))
const CustomizePage = lazy(() => import('./pages/Customize'))
const LoginPage = lazy(() => import('./pages/Login'))
const AccountPage = lazy(() => import('./pages/Account'))
const CartPage = lazy(() => import('./pages/Cart'))
const CheckoutPage = lazy(() => import('./pages/Checkout'))
const OrderConfirmPage = lazy(() => import('./pages/OrderConfirm'))
const SupportPage = lazy(() => import('./pages/Support'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header onOpenCart={() => setCartOpen(true)} />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait" presenceAffectsLayout={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/category/:key" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/brand/:slug" element={<BrandPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/customize" element={<CustomizePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:id" element={<OrderConfirmPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <CompareBar />
      <ChatWidget />
      <ToastContainer />
    </div>
  )
}

function PageLoader() {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <div className="flex flex-col items-center gap-3">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-leather border-t-transparent" />
        <span className="text-sm font-semibold text-mist">Preparing the crease…</span>
      </div>
    </div>
  )
}

