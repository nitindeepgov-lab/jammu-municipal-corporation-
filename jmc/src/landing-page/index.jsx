import { useState, lazy, Suspense } from 'react'

// Eager components (above-the-fold)
import TopBar from './components/TopBar'
import Header from './components/Header'
import Navigation from './components/Navigation'
import HeroSlider from './components/HeroSlider'
import AboutMinistersSection from './components/AboutMinistersSection'
import InfoCards from './components/InfoCards'
import BackToTop from './components/BackToTop'

// Lazy Loading Wrapper
import LazySection from '../components/LazySection'

// Below-the-fold components imported dynamically
const SlidingServices = lazy(() => import('./components/SlidingServices'))
const QuickInfoCards = lazy(() => import('./components/QuickInfoCards'))
const MyJammuApp = lazy(() => import('./components/MyJammuApp'))
const Destinations = lazy(() => import('./components/Destinations'))
const PartnerLogos = lazy(() => import('./components/PartnerLogos'))
const Footer = lazy(() => import('./components/Footer'))

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}>
      <TopBar />
      <Header />
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main id="main-content">
        <HeroSlider />
        <AboutMinistersSection />
        <InfoCards />

        <LazySection height="500px">
          <Suspense fallback={<div className="h-[500px] bg-slate-50 animate-pulse border-y border-slate-100" />}>
            <SlidingServices />
          </Suspense>
        </LazySection>

        <LazySection height="400px">
          <Suspense fallback={<div className="h-[400px] bg-white animate-pulse" />}>
            <QuickInfoCards />
          </Suspense>
        </LazySection>

        <LazySection height="550px">
          <Suspense fallback={<div className="h-[550px] bg-white animate-pulse" />}>
            <MyJammuApp />
          </Suspense>
        </LazySection>

        <LazySection height="600px">
          <Suspense fallback={<div className="h-[600px] bg-[#f0f4f8] animate-pulse" />}>
            <Destinations />
          </Suspense>
        </LazySection>

        <LazySection height="150px">
          <Suspense fallback={<div className="h-[150px] bg-white animate-pulse border-t border-slate-100" />}>
            <PartnerLogos />
          </Suspense>
        </LazySection>
      </main>

      <LazySection height="400px">
        <Suspense fallback={<div className="h-[400px] bg-slate-900 animate-pulse" />}>
          <Footer />
        </Suspense>
      </LazySection>
      <BackToTop />
    </div>
  )
}
