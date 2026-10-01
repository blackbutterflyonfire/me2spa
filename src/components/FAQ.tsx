import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MapPin, Calendar, ShieldCheck, Sparkles } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'services' | 'booking' | 'location';
  question: string;
  answer: string;
  badge?: string;
}

const faqData: FAQItem[] = [
  {
    id: 'services-1',
    category: 'services',
    question: 'What therapies and massage services are offered at SPAVIBE?',
    answer: 'We provide specialized relaxation and therapeutic body treatments including Body-to-Body Sensual Massage, Deep Tissue Full Body Therapy, Signature Cross Massage, and Swedish aromatherapy. We also offer VIP packages and tailored multi-session memberships.',
    badge: 'Popular'
  },
  {
    id: 'services-2',
    category: 'services',
    question: 'Are your therapists certified and background checked?',
    answer: 'Yes, 100%. Every therapist at SPAVIBE is professionally trained, certified in traditional and contemporary modalities (including Kerala local and Thai techniques), and vetted through strict background verification for your safety and comfort.',
  },
  {
    id: 'services-3',
    category: 'services',
    question: 'What hygiene and privacy protocols do you maintain?',
    answer: 'Complete discretion and spotless hygiene are our foundational pillars. Private individual suites are sanitized between every guest session. Fresh, single-use linens, sterile shower facilities, and premium natural oils are provided.',
  },
  {
    id: 'booking-1',
    category: 'booking',
    question: 'How do I book an appointment or check availability?',
    answer: 'You can use the instant interactive reservation wizard on this page, or reach us directly via WhatsApp at +91 7306 364 454. We confirm slots within 15 minutes during operating hours.',
    badge: 'Fast Booking'
  },
  {
    id: 'booking-2',
    category: 'booking',
    question: 'Is prior booking mandatory, or are walk-ins accepted?',
    answer: 'Because we operate fully private, dedicated suites with designated therapist preparation, prior booking is strongly advised. We recommend reserving at least 1–2 hours in advance to secure your preferred slot and therapist.',
  },
  {
    id: 'booking-3',
    category: 'booking',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment modes including UPI (Google Pay, PhonePe, Paytm), cash, debit/credit cards, and contactless NFC transfers. Payment is completed upon arrival or checkout.',
  },
  {
    id: 'location-1',
    category: 'location',
    question: 'Where is SPAVIBE located and how do I reach the sanctuary?',
    answer: 'We are situated conveniently in Kozhikode (Calicut), Kerala with prime locations accessible from Mavoor Road and Beach Road. We are centrally located for guests across Kozhikode and visiting travelers alike.',
    badge: 'CCJ Airport'
  },
  {
    id: 'location-2',
    category: 'location',
    question: 'Is discreet parking available at the sanctuary?',
    answer: 'Yes. We offer private, secure on-premise parking with dedicated discreet entrance access to safeguard your absolute privacy from arrival to departure.',
  },
  {
    id: 'location-3',
    category: 'location',
    question: 'What are your operating hours?',
    answer: 'We are open seven days a week: Monday to Thursday from 10:00 AM to 09:00 PM, and Friday to Sunday from 09:00 AM to 10:00 PM.',
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('services-1');
  const [activeCategory, setActiveCategory] = useState<'all' | 'services' | 'booking' | 'location'>('all');

  const filteredFaqs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-[#0C0A0D] via-[#120F14] to-[#0C0A0D] border-t border-white/5 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#D48FB1]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[3px] bg-[#D48FB1]/10 border border-[#D48FB1]/30 px-5 py-1.5 rounded-full rose-gold-gradient-text uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#D48FB1]" />
            COMMON INQUIRIES
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight mt-2 text-white">
            Frequently Asked <span className="italic rose-gold-gradient-text">Questions</span>
          </h2>
          <p className="text-sm text-white/60 font-light max-w-lg mx-auto mt-3">
            Everything you need to know about our therapeutic sessions, discreet booking process, and Kozhikode sanctuary.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] font-semibold'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              All Topics
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('services')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                activeCategory === 'services'
                  ? 'bg-[#D48FB1] text-black shadow-[0_0_15px_rgba(212,143,176,0.3)] font-semibold'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Services &amp; Therapies
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('booking')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                activeCategory === 'booking'
                  ? 'bg-[#D48FB1] text-black shadow-[0_0_15px_rgba(212,143,176,0.3)] font-semibold'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Booking &amp; Privacy
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('location')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                activeCategory === 'location'
                  ? 'bg-[#D48FB1] text-black shadow-[0_0_15px_rgba(212,143,176,0.3)] font-semibold'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Location &amp; CCJ Airport
            </button>
          </div>
        </motion.div>

        {/* Collapsible Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen 
                    ? 'bg-[#18131B] border-[#D48FB1]/40 shadow-[0_8px_30px_rgba(212,143,176,0.1)]' 
                    : 'bg-[#141016]/60 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full py-5 px-6 sm:px-7 flex items-center justify-between text-left gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-lg sm:text-xl text-white font-normal">
                      {faq.question}
                    </span>
                    {faq.badge && (
                      <span className="hidden sm:inline-block text-[10px] tracking-wider uppercase bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded-full font-semibold">
                        {faq.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen 
                      ? 'bg-[#D48FB1] text-black border-[#D48FB1] rotate-180' 
                      : 'bg-white/5 text-white/70 border-white/15'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 pt-1 text-sm text-white/75 font-light leading-relaxed border-t border-white/5">
                        <p>{faq.answer}</p>
                        
                        <div className="mt-4 pt-3 flex flex-wrap items-center gap-4 text-xs text-white/40 border-t border-white/5">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <ShieldCheck className="w-3.5 h-3.5" /> Confidential &amp; Verified
                          </span>
                          <span>•</span>
                          <span>Need more details? Ask our WhatsApp concierge directly</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1A141C] via-[#1F1722] to-[#1A141C] border border-amber-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-left">
            <h3 className="text-lg font-serif text-white">Have a specific question not covered here?</h3>
            <p className="text-xs text-white/60 mt-1">Our concierge is active on WhatsApp to assist with private bookings and custom requirements.</p>
          </div>
          
          <a
            href="https://wa.me/917306364454?text=Hello%20SPAVIBE,%20I%20have%20a%20question%20regarding%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold tracking-wider rounded-xl uppercase transition-colors"
          >
            Chat With Concierge
          </a>
        </motion.div>
      </div>
    </section>
  );
}
