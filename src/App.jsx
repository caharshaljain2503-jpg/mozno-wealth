// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Layout from "./layout/Layout";
import GlobalPagePreloader from "./components/layout/GlobalPagePreloader";
import MoznoLogoPreloader from "./components/common/MoznoLogoPreloader";
import Calculators from "./pages/Calculators";
import TermAndCondition from "./pages/TermAndCondition";
import Career from "./pages/Career";
import useAnalytics from "./hooks/useAnalytics";
import LumpsumCalculator from "./pages/calculators/LumpsumCalculator";
import SWPCalculator from "./pages/calculators/SWPCalculator";
import STPCalculator from "./pages/calculators/STPCalculator";
import FinancialHealth from "./pages/FinancialHealth";
import RiskProfilingPage from "./pages/RiskProfile";
// import IPOPage from "./pages/IPOPage";
import MarketData from "./pages/MarketData";

/* ---------- Lazy Pages ---------- */
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blogs = lazy(() => import("./pages/Blogs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const BlogDetail = lazy(() => import("./components/blogs/BlogDetail"));
const NotFound = lazy(() => import("./pages/Notfound"));
const Tools = lazy(() => import("./pages/Tools"));

/* Services */
const Services = lazy(() => import("./pages/Services"));
const WealthManagement = lazy(() => import("./pages/service/WealthManagment"));
const FinancialPlanning = lazy(
  () => import("./pages/service/FinancialPlanning"),
);
const TaxPlanning = lazy(() => import("./pages/service/TaxPlanning"));
const BorrowingSolution = lazy(
  () => import("./pages/service/BorrowingSolution"),
);
const InsurancePlanning = lazy(
  () => import("./pages/service/InsurancePlanning"),
);
const SuccessionPlanning = lazy(
  () => import("./pages/service/SuccessionPlanning"),
);


/* Calculators */
const SIPCalculator = lazy(() => import("./pages/calculators/SIPCalculator"));
const EMICalculator = lazy(() => import("./pages/calculators/EMICalculator"));
const RetirementCalculator = lazy(
  () => import("./pages/calculators/RetirementCalculator"),
);
const GoalPlanningCalculator = lazy(
  () => import("./pages/calculators/GoalPlanningCalculator"),
);
const TaxCalculator = lazy(() => import("./pages/calculators/TaxCalculator"));

const DelayPlanningCalculator = lazy(() => import("./pages/calculators/DelayPlanning"))

const StepUpSIPCalculator = lazy(() => import("./pages/calculators/StepUpCalaculator"))


// ============ ANALYTICS TRACKER ============
// Separate component - calls hook inside Router context
const AnalyticsTracker = () => {
  useAnalytics(); // ← One line. Everything automatic.
  return null;
};

// ============ MAIN APP ============
const App = () => {
  return (
    <>
      {/* Analytics - tracks all route changes automatically */}
      <AnalyticsTracker />

      <GlobalPagePreloader />

      <Suspense fallback={<MoznoLogoPreloader active />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Main */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="term-conditions" element={<TermAndCondition />} />
            <Route path="career" element={<Career />} />
          {/* <Route path="insights/ipo" element={<IPOPage />} /> */}
           <Route path="insights/market-data" element={<MarketData />} />
            <Route path="tools" element={<Outlet />}>
              <Route index element={<Tools />} />
              <Route path="financial-health" element={<FinancialHealth />} />
              <Route path="risk-profile" element={<RiskProfilingPage />} />
            </Route>
            {/* Services — parent Outlet required so nested paths render under Layout (RR v7) */}
            <Route path="services" element={<Outlet />}>
              <Route index element={<Services />} />
              <Route path="wealth-management" element={<WealthManagement />} />
              <Route
                path="financial-planning"
                element={<FinancialPlanning />}
              />
              <Route path="tax-planning" element={<TaxPlanning />} />
              <Route
                path="insurance-planning"
                element={<InsurancePlanning />}
              />
              <Route
                path="borrowing-solutions"
                element={<BorrowingSolution />}
              />
              <Route
                path="succession-planning"
                element={<SuccessionPlanning />}
              />
            </Route>

            {/* Calculators */}
            <Route path="calculators" element={<Outlet />}>
              <Route index element={<Calculators />} />
              <Route path="sip" element={<SIPCalculator />} />
              <Route path="emi" element={<EMICalculator />} />
              <Route path="retirement" element={<RetirementCalculator />} />
              <Route
                path="goal-planning"
                element={<GoalPlanningCalculator />}
              />
              <Route path="tax" element={<TaxCalculator />} />
              <Route path="delay-planning" element={<DelayPlanningCalculator />} />
              <Route path="step-up-sip" element={<StepUpSIPCalculator />} />

              <Route path="lumpsum" element={<LumpsumCalculator />} />

              <Route path="swp" element={<SWPCalculator />} />
              <Route path="stp" element={<STPCalculator />} />


            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Outside Layout */}
          <Route path="blogs/:slug" element={<BlogDetail />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
