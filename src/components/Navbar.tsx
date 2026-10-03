import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X, Crown, Bot } from 'lucide-react';
import SpaVibeLogo from './SpaVibeLogo';

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (hash: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const elPos = el.getBoundingClientRect().top;
        const offsetPos = elPos + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPos,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0C0A0D]/90 backdrop-blur-xl border-b border-[#D48FB1]/20 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <SpaVibeLogo size="sm" showTagline={true} nameType="image" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10 text-xs font-medium uppercase tracking-[2.5px]">
            <button 
              type="button"
              onClick={() => handleNavClick('#services')} 
              className="nav-link text-white/80 hover:text-[#D48FB1] transition-colors cursor-pointer"
            >
              Experiences
            </button>
            <button 
              type="button"
              onClick={() => handleNavClick('#about')} 
              className="nav-link text-white/80 hover:text-[#D48FB1] transition-colors cursor-pointer"
            >
              Our Sanctuary
            </button>
            <Link 
              to="/contact" 
              className={`nav-link transition-colors ${location.pathname === '/contact' ? 'text-[#D48FB1]' : 'text-white/80 hover:text-[#D48FB1]'}`}
            >
              Contact
            </Link>
            <Link 
              to="/premium" 
              className={`nav-link transition-colors ${location.pathname === '/premium' ? 'text-[#D48FB1]' : 'text-white/80 hover:text-[#D48FB1]'}`}
            >
              PREMIUM
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (window.Tawk_API?.toggle) {
                  window.Tawk_API.toggle();
                } else if (window.Tawk_API?.maximize) {
                  window.Tawk_API.maximize();
                } else {
                  window.dispatchEvent(new CustomEvent('spavibe:open-chat'));
                }
              }}
              className="px-4 py-2.5 rounded-full border border-[#E5B86B]/30 hover:border-[#E5B86B] text-[#E5B86B] font-medium text-xs tracking-wider flex items-center gap-1.5 transition-all hover:bg-[#E5B86B]/10 cursor-pointer"
              title="Open Chat Bot"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>CHAT BOT</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('#booking-wizard')}
              className="px-7 py-3 rose-gold-gradient-bg text-[#0C0A0D] font-semibold text-xs tracking-widest transition-all rounded-full flex items-center gap-2 hover:shadow-[0_0_30px_rgba(212,143,176,0.5)] hover:scale-[1.03] active:scale-[0.985] cursor-pointer"
            >
              RESERVE <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-[#D48FB1] p-2 rounded-lg border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0C0A0D]/95 border-b border-[#D48FB1]/20 px-6 py-6 space-y-4 text-sm font-medium tracking-wider uppercase backdrop-blur-xl">
            <button 
              type="button"
              onClick={() => handleNavClick('#services')} 
              className="block w-full text-left py-2 text-white/80 hover:text-[#D48FB1]"
            >
              Experiences
            </button>
            <button 
              type="button"
              onClick={() => handleNavClick('#about')} 
              className="block w-full text-left py-2 text-white/80 hover:text-[#D48FB1]"
            >
              Our Sanctuary
            </button>
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white/80 hover:text-[#D48FB1]"
            >
              Contact
            </Link>
            <Link 
              to="/premium" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white/80 hover:text-[#D48FB1]"
            >
              VIP Membership
            </Link>

            <button 
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (window.Tawk_API?.toggle) {
                  window.Tawk_API.toggle();
                } else if (window.Tawk_API?.maximize) {
                  window.Tawk_API.maximize();
                } else {
                  window.dispatchEvent(new CustomEvent('spavibe:open-chat'));
                }
              }} 
              className="w-full py-2.5 rounded-xl border border-[#E5B86B]/40 text-[#E5B86B] font-medium text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-[#E5B86B]/10 cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>LIVE CHAT / TAWK BOT</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#booking-wizard')}
              className="w-full mt-4 py-3 rose-gold-gradient-bg text-[#0C0A0D] font-semibold text-xs tracking-widest rounded-full flex items-center justify-center gap-2"
            >
              RESERVE <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
