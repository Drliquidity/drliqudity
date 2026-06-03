import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PartnerDetailPage from './pages/PartnerDetailPage';
import OfferDetailPage from './pages/OfferDetailPage';
import FuturesPropFirmsPage from './pages/FuturesPropFirmsPage';
import CFDPropFirmsPage from './pages/CFDPropFirmsPage';
import PropFirmDirectoryPage from './pages/PropFirmDirectoryPage';
import PropFirmReviewPage from './pages/PropFirmReviewPage';
import PropFirmComparisonPage from './pages/PropFirmComparisonPage';
import EducationHubPage from './pages/EducationHubPage';
import GuideDetailPage from './pages/GuideDetailPage';
import ToolsPage from './pages/ToolsPage';

function App() {
  return (
    <Router>
      <div className="bg-[#0A0A0A] text-white overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/partner/:id" element={<PartnerDetailPage />} />
          <Route path="/offer/:id" element={<OfferDetailPage />} />
          <Route path="/futures-prop-firms" element={<FuturesPropFirmsPage />} />
          <Route path="/cfd-prop-firms" element={<CFDPropFirmsPage />} />
          <Route path="/prop-firms" element={<PropFirmDirectoryPage />} />
          <Route path="/prop-firm/:slug" element={<PropFirmReviewPage />} />
          <Route path="/compare" element={<PropFirmComparisonPage />} />
          <Route path="/education" element={<EducationHubPage />} />
          <Route path="/guide/:slug" element={<GuideDetailPage />} />
          <Route path="/tools" element={<ToolsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
