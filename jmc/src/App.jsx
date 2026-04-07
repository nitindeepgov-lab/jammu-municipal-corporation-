import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PROD_STRAPI_URL } from "./config/api";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AdminRedirect() {
  useEffect(() => {
    const strapiBaseUrl =
      import.meta.env.VITE_STRAPI_URL ||
      (import.meta.env.DEV ? "http://localhost:1338" : PROD_STRAPI_URL);

    const adminUrl =
      import.meta.env.VITE_STRAPI_ADMIN_URL || `${strapiBaseUrl}/admin`;

    window.location.href = adminUrl;
  }, []);
  return null;
}

import LandingPage from "./landing-page";
import About from "./pages/About";
import Officials from "./pages/Officials";
import Commissioner from "./pages/Commissioner";
import GoverningBodies from "./pages/GoverningBodies";
import Notices from "./pages/Notices";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import SmartCity from "./pages/SmartCity";
import DevelopmentWorks from "./pages/DevelopmentWorks";
import Feedback from "./pages/Feedback";
import RTI from "./pages/RTI";
import RTIDocumentViewer from "./pages/RTIDocumentViewer";
import RTISection4Part2 from "./pages/RTISection4Part2";
import SwachhMission from "./pages/SwachhMission";
import EGov from "./pages/EGov";
import News from "./pages/News";
import PayOnline from "./pages/PayOnline";
import PaymentStatus from "./pages/PaymentStatus";
import WebInfoManager from "./pages/WebInfoManager";
import Information from "./pages/Information";
import InformationDetail from "./pages/InformationDetail";
import QuickLinksPage from "./pages/QuickLinksPage";
import SmartCityTenders from "./pages/SmartCityTenders";
import Sitemap from "./pages/Sitemap";
import CouncillorDetails from "./pages/CouncillorDetails";
import {
  PrivacyPolicyPage,
  DisclaimerPage,
  HyperlinkPolicyPage,
  AccessibilityPage,
  CopyrightPolicyPage,
  TermsConditionsPage,
} from "./pages/PolicyPages";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/officials" element={<Officials />} />
        <Route path="/commissioner" element={<Commissioner />} />
        <Route path="/governing-bodies" element={<GoverningBodies />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/smart-city" element={<SmartCity />} />
        <Route path="/development-works" element={<DevelopmentWorks />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/rti" element={<RTI />} />
        <Route
          path="/rti/disclosure-4-1-b-iv-vi"
          element={<RTISection4Part2 />}
        />
        <Route path="/rti/document/:slug" element={<RTIDocumentViewer />} />
        <Route path="/swachh-mission" element={<SwachhMission />} />
        <Route path="/egov" element={<EGov />} />
        <Route path="/news/:id" element={<News />} />
        <Route path="/pay-online" element={<PayOnline />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="/web-info-manager" element={<WebInfoManager />} />
        <Route path="/information" element={<Information />} />
        <Route path="/information/:slug" element={<InformationDetail />} />
        <Route path="/quick-links" element={<QuickLinksPage />} />
        <Route path="/smart-city-tenders" element={<SmartCityTenders />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/councillor-details" element={<CouncillorDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/hyperlink-policy" element={<HyperlinkPolicyPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        <Route path="/copyright-policy" element={<CopyrightPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        <Route path="/admin" element={<AdminRedirect />} />
        <Route path="/Admin" element={<AdminRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
