import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import StudyAbroad from './pages/StudyAbroad';
import DestinationDetail from './pages/DestinationDetail';
import SuccessStories from './pages/SuccessStories';
import Contact from './pages/Contact';
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
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
