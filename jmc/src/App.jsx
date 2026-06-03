import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { PROD_STRAPI_URL } from "./config/api";
import ErrorBoundary from "./components/ErrorBoundary";

// ── Scroll to top on navigation ───────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ── Admin redirect (not lazy — tiny component) ───────────
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

// ── Loading fallback ──────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-[3px] border-gray-100" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#003366] animate-spin" />
        </div>
        <p className="text-gray-500 text-sm font-medium">Loading…</p>
      </div>
    </div>
  );
}

// ── Lazy-loaded page imports ──────────────────────────────
// Each page is loaded on-demand, significantly reducing the initial bundle.
const LandingPage = lazy(() => import("./landing-page"));
const About = lazy(() => import("./pages/About"));
const Officials = lazy(() => import("./pages/Officials"));
const Commissioner = lazy(() => import("./pages/Commissioner"));
const GoverningBodies = lazy(() => import("./pages/GoverningBodies"));
const Notices = lazy(() => import("./pages/Notices"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Services = lazy(() => import("./pages/Services"));
const SmartCity = lazy(() => import("./pages/SmartCity"));
const DevelopmentWorks = lazy(() => import("./pages/DevelopmentWorks"));
const Feedback = lazy(() => import("./pages/Feedback"));
const RTI = lazy(() => import("./pages/RTI"));
const RTIDocumentViewer = lazy(() => import("./pages/RTIDocumentViewer"));
const RTISection4Part2 = lazy(() => import("./pages/RTISection4Part2"));
const SwachhMission = lazy(() => import("./pages/SwachhMission"));
const EGov = lazy(() => import("./pages/EGov"));
const News = lazy(() => import("./pages/News"));
const PayOnline = lazy(() => import("./pages/PayOnline"));
const PaymentStatus = lazy(() => import("./pages/PaymentStatus"));
const WebInfoManager = lazy(() => import("./pages/WebInfoManager"));
const Information = lazy(() => import("./pages/Information"));
const InformationDetail = lazy(() => import("./pages/InformationDetail"));
const QuickLinksPage = lazy(() => import("./pages/QuickLinksPage"));
const SmartCityTenders = lazy(() => import("./pages/SmartCityTenders"));
const SmartCityInitiatives = lazy(() => import("./pages/SmartCityInitiatives"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const CouncillorDetails = lazy(() => import("./pages/CouncillorDetails"));
const DepartmentsPage = lazy(() => import("./pages/DepartmentsPage"));
const EngineeringDepartment = lazy(() => import("./pages/EngineeringDepartment"));
const HealthDepartment = lazy(() => import("./pages/HealthDepartment"));
const RevenueTaxation = lazy(() => import("./pages/RevenueTaxation"));
const SanitationDepartment = lazy(() => import("./pages/SanitationDepartment"));
const UrbanPlanning = lazy(() => import("./pages/UrbanPlanning"));
const WaterSupplyDivision = lazy(() => import("./pages/WaterSupplyDivision"));
const HorticultureDepartment = lazy(() => import("./pages/HorticultureDepartment"));
const OfficerDirectory = lazy(() => import("./pages/OfficerDirectory"));
const NotFound = lazy(() => import("./pages/NotFound"));
const EmployeeCorner = lazy(() => import("./pages/EmployeeCorner"));
const SalaryCertificate = lazy(() => import("./pages/SalaryCertificate"));
const PaySlip = lazy(() => import("./pages/PaySlip"));
const PayStatement = lazy(() => import("./pages/PayStatement"));
const FileDropbox = lazy(() => import("./pages/FileDropbox"));
const KnowledgeBase = lazy(() => import("./pages/KnowledgeBase"));
const FileMonitoring = lazy(() => import("./pages/FileMonitoring"));

// Policy pages — loaded as a group
const PolicyPages = lazy(() => import("./pages/PolicyPages"));

// ChatBot — lazy loaded since it's 31KB and not needed for initial render
const ChatBot = lazy(() => import("./components/ChatBot"));

// Wrapper for policy pages (lazy-loaded as a single chunk)
function LazyPolicyRoute({ page }) {
  return (
    <Suspense fallback={<PageLoader />}>
      <PolicyPageResolver page={page} />
    </Suspense>
  );
}

// Resolves the specific policy page from the lazy-loaded module
function PolicyPageResolver({ page }) {
  // PolicyPages is already loaded by the time this renders (parent Suspense handles it)
  // We need to re-import to get the named exports
  const pages = {
    privacy: lazy(() => import("./pages/PolicyPages").then(m => ({ default: m.PrivacyPolicyPage }))),
    disclaimer: lazy(() => import("./pages/PolicyPages").then(m => ({ default: m.DisclaimerPage }))),
    hyperlink: lazy(() => import("./pages/PolicyPages").then(m => ({ default: m.HyperlinkPolicyPage }))),
    accessibility: lazy(() => import("./pages/PolicyPages").then(m => ({ default: m.AccessibilityPage }))),
    copyright: lazy(() => import("./pages/PolicyPages").then(m => ({ default: m.CopyrightPolicyPage }))),
    terms: lazy(() => import("./pages/PolicyPages").then(m => ({ default: m.TermsConditionsPage }))),
  };
  const Component = pages[page];
  return Component ? (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  ) : null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/officials" element={<Officials />} />
            <Route path="/commissioner" element={<Commissioner />} />
            <Route path="/governing-bodies" element={<GoverningBodies />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/notices/orders-circulars/:id" element={<Newsletter />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/smart-city" element={<SmartCity />} />
            <Route path="/smart-city-initiatives" element={<SmartCityInitiatives />} />
            <Route path="/development-works" element={<DevelopmentWorks />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/rti" element={<RTI />} />
            <Route path="/rti/disclosure-4-1-b-iv-vi" element={<RTISection4Part2 />} />
            <Route path="/rti/document/:slug" element={<RTIDocumentViewer />} />
            <Route path="/swachh-mission" element={<SwachhMission />} />
            <Route path="/egov" element={<EGov />} />
            <Route path="/news/:id" element={<News />} />
            <Route path="/pay-online" element={<PayOnline />} />
            <Route path="/employee-corner" element={<EmployeeCorner />} />
            <Route path="/employee-corner/salary-certificate" element={<SalaryCertificate />} />
            <Route path="/employee-corner/pay-slip" element={<PaySlip />} />
            <Route path="/employee-corner/pay-statement" element={<PayStatement />} />
            <Route path="/employee-corner/file-dropbox" element={<FileDropbox />} />
            <Route path="/employee-corner/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/employee-corner/file-monitoring" element={<FileMonitoring />} />
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="/payment-result" element={<PaymentStatus />} />
            <Route path="/web-info-manager" element={<WebInfoManager />} />
            <Route path="/information" element={<Information />} />
            <Route path="/information/:slug" element={<InformationDetail />} />
            <Route path="/quick-links" element={<QuickLinksPage />} />
            <Route path="/smart-city-tenders" element={<SmartCityTenders />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/councillor-details" element={<CouncillorDetails />} />
            <Route path="/privacy-policy" element={<LazyPolicyRoute page="privacy" />} />
            <Route path="/disclaimer" element={<LazyPolicyRoute page="disclaimer" />} />
            <Route path="/hyperlink-policy" element={<LazyPolicyRoute page="hyperlink" />} />
            <Route path="/accessibility" element={<LazyPolicyRoute page="accessibility" />} />
            <Route path="/copyright-policy" element={<LazyPolicyRoute page="copyright" />} />
            <Route path="/terms-conditions" element={<LazyPolicyRoute page="terms" />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/departments/engineering" element={<EngineeringDepartment />} />
            <Route path="/departments/health" element={<HealthDepartment />} />
            <Route path="/departments/revenue-taxation" element={<RevenueTaxation />} />
            <Route path="/departments/sanitation" element={<SanitationDepartment />} />
            <Route path="/departments/urban-planning" element={<UrbanPlanning />} />
            <Route path="/departments/water-supply" element={<WaterSupplyDivision />} />
            <Route path="/departments/horticulture" element={<HorticultureDepartment />} />
            <Route path="/officers-directory" element={<OfficerDirectory />} />
            <Route path="/admin" element={<AdminRedirect />} />
            <Route path="/Admin" element={<AdminRedirect />} />
            {/* 404 catch-all — must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        {/* ChatBot lazy-loaded — not needed for initial render */}
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
