import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import StudyAbroad from './pages/StudyAbroad';
import DestinationDetail from './pages/DestinationDetail';
import SuccessStories from './pages/SuccessStories';
import ExamStrategies from './pages/ExamStrategies';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/study-abroad" element={<StudyAbroad />} />
      <Route path="/study-abroad/:slug" element={<DestinationDetail />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      <Route path="/exam-strategies" element={<ExamStrategies />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-conditions" element={<TermsConditions />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
