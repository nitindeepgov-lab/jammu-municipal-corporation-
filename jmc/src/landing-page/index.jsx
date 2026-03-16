import { useState } from 'react'

// Components
import TopBar from './components/TopBar'
import Header from './components/Header'
import Navigation from './components/Navigation'
import HeroSlider from './components/HeroSlider'
import AboutMinistersSection from './components/AboutMinistersSection'
import InfoCards from './components/InfoCards'
import QuickInfoCards from './components/QuickInfoCards'
import MyJammuApp from './components/MyJammuApp'
import Destinations from './components/Destinations'
import SlidingServices from './components/SlidingServices'
import PartnerLogos from './components/PartnerLogos'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

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
        <SlidingServices />
        <QuickInfoCards />
        <MyJammuApp />
        <Destinations />
        <PartnerLogos />
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}
