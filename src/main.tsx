import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import App from './App';
import SmoothScroll from './components/SmoothScroll';
import { LanguageProvider } from './i18n';
import { initAnalytics } from './lib/analytics';
import './index.css';

initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* reducedMotion="user" turns transform animations off for visitors who ask for less motion */}
      <MotionConfig reducedMotion="user">
        <LanguageProvider>
          <SmoothScroll>
            <App />
          </SmoothScroll>
        </LanguageProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>
);
