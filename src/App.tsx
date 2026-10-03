import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import FloatingCTA from './components/FloatingCTA';
import TawkChat from './components/TawkChat';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import PremiumPage from './pages/PremiumPage';

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          const offset = 80;
          const elPos = el.getBoundingClientRect().top;
          const offsetPos = elPos + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPos,
            behavior: 'smooth'
          });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <div className="min-h-screen bg-[#0C0A0D] text-[#F8F0F4] relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <FloatingCTA />
        <TawkChat />
      </div>
    </BrowserRouter>
  );
}
