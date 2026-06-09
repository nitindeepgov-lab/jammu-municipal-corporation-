import { useState, lazy, Suspense } from 'react'
import TopBar from '../landing-page/components/TopBar'
import Header from '../landing-page/components/Header'
import Navigation from '../landing-page/components/Navigation'
import BackToTop from '../landing-page/components/BackToTop'

// Dynamically import Footer since it's a heavy component rendered at the bottom of pages
const Footer = lazy(() => import('../landing-page/components/Footer'))

export default function PageLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main className="flex-1 bg-[#f5f5f5]">
        {children}
      </main>
      <Suspense fallback={<div className="h-40 bg-slate-900 animate-pulse" />}>
        <Footer />
      </Suspense>
      <BackToTop />
    </div>
  )
}
