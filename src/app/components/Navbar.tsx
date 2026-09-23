'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flower2, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080B09]/85 backdrop-blur-xl border-b border-[#D4AF37]/20 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 gold-gradient-bg rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <Flower2 className="w-5 h-5 text-[#080B09]" />
            </div>
            <div>
              <div className="font-serif text-2xl tracking-wide gold-gradient-text font-medium">ME2SPA</div>
              <div className="text-[9px] text-[#D4AF37]/80 tracking-[2px] -mt-1 uppercase">LUXURY THERAPY & WELLNESS</div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-xs font-medium uppercase tracking-[2.5px]">
            <Link href="/#services" className="nav-link text-white/80 hover:text-[#D4AF37] transition-colors">Experiences</Link>
            <Link href="/#about" className="nav-link text-white/80 hover:text-[#D4AF37] transition-colors">Our Sanctuary</Link>
            <Link href="/contact" className="nav-link text-white/80 hover:text-[#D4AF37] transition-colors">Contact</Link>
            <Link href="/premium" className="nav-link text-white/80 hover:text-[#D4AF37] transition-colors">Premium</Link>
          </div>
          
          <Link 
            href="/#booking-wizard" 
            className="px-7 py-3 gold-gradient-bg text-[#080B09] font-semibold text-xs tracking-widest transition-all rounded-full flex items-center gap-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-[1.03] active:scale-[0.985]"
          >
            RESERVE <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>
    </>
  );
}
