import { useState } from 'react'
import TopBar from '../landing-page/components/TopBar'
import Header from '../landing-page/components/Header'
import Navigation from '../landing-page/components/Navigation'
import Footer from '../landing-page/components/Footer'
import BackToTop from '../landing-page/components/BackToTop'

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
      <Footer />
      <BackToTop />
    </div>
  )
}
