import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Swedish Deep Tissue Recovery (90 min)',
    message: '',
  });

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello SpaVibe Sanctuary,\n\nName: ${formData.name}\nPhone: ${formData.phone || 'N/A'}\nPreferred Service: ${formData.service}\nSpecial Request: ${formData.message}`;

    const cleanPhone = '917306364454';
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0C0A0D] text-[#F8F0F4] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D48FB1]/10 border border-[#D48FB1]/30 text-[#D48FB1] text-xs uppercase tracking-widest font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONCIERGE &amp; RESERVATIONS</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl rose-gold-gradient-text font-medium mb-4">
            Connect with Our Sanctuary Concierge
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Direct appointments, tailored therapy consultations, and private suite bookings in Kozhikode, Kerala.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-[#1A1518]/60 border border-[#D48FB1]/20 rounded-3xl p-8 backdrop-blur-md">
              <h2 className="font-serif text-2xl rose-gold-gradient-text mb-6">Direct Sanctuary Desk</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rose-gold-gradient-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#0C0A0D]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Telephone &amp; WhatsApp</h3>
                    <a
                      href="tel:+917306364454"
                      className="text-amber-400 hover:text-amber-300 transition-colors block text-sm font-semibold"
                    >
                      +91 7306 364 454
                    </a>
                    <p className="text-white/50 text-xs mt-0.5">Instant WhatsApp concierge available 10:00 AM – 10:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rose-gold-gradient-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#0C0A0D]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Official Email</h3>
                    <a
                      href="mailto:contact@spavibe.in"
                      className="text-amber-400 hover:text-amber-300 transition-colors block text-sm"
                    >
                      contact@spavibe.in
                    </a>
                    <p className="text-white/50 text-xs mt-0.5">For corporate bookings &amp; VIP private day passes</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rose-gold-gradient-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#0C0A0D]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Sanctuary Location</h3>
                    <p className="text-white/70 text-sm">Mavoor Road / Beach Road Junction</p>
                    <p className="text-white/50 text-xs">Kozhikode (Calicut), Kerala - 673001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rose-gold-gradient-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#0C0A0D]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Operating Hours</h3>
                    <p className="text-white/70 text-sm">Mon — Thu: 10:00 AM – 09:00 PM</p>
                    <p className="text-white/70 text-sm">Fri — Sun: 09:00 AM – 10:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Discretion Guarantee */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-emerald-400">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">100% Confidentiality &amp; Privacy Guarantee</span>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed font-light">
                  Every guest inquiry is held in strictest discretion. Private dedicated parking and direct private suite access safeguard your complete tranquility.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact / Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-[#1A1518]/60 border border-[#D48FB1]/20 rounded-3xl p-8 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D48FB1] font-semibold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>DIRECT RESERVATION REQUEST</span>
              </div>
              <h2 className="font-serif text-2xl text-white font-medium mb-2">
                Book or Inquire with Concierge
              </h2>
              <p className="text-xs text-white/60 leading-relaxed mb-6 font-light">
                Fill in your details below. Our concierge will review your preferred session and confirm your appointment immediately via WhatsApp.
              </p>

              {formSubmitted ? (
                <div className="p-8 text-center bg-black/40 rounded-2xl border border-emerald-500/30">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-white mb-1">Inquiry Forwarded</h3>
                  <p className="text-xs text-white/60 mb-4">
                    Our concierge is opening your WhatsApp thread to confirm your session.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2 border border-white/20 rounded-xl text-xs text-white/80 hover:bg-white/5 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitWhatsApp} className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-xs uppercase tracking-wider mb-2 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0C0A0D]/70 border border-[#D48FB1]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D48FB1]/50 transition-colors"
                      placeholder="e.g. Rahul M."
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-xs uppercase tracking-wider mb-2 font-medium">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0C0A0D]/70 border border-[#D48FB1]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D48FB1]/50 transition-colors"
                      placeholder="+91 7306 364 454"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-xs uppercase tracking-wider mb-2 font-medium">
                      Preferred Therapy / Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#0C0A0D]/70 border border-[#D48FB1]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D48FB1]/50 transition-colors cursor-pointer"
                    >
                      <option value="Swedish Deep Tissue Recovery (90 min)">Swedish Deep Tissue Recovery (90 min)</option>
                      <option value="Kerala Ayurvedic Abhyanga Ritual (60 min)">Kerala Ayurvedic Abhyanga Ritual (60 min)</option>
                      <option value="Aromatherapy & Herbal Steam Session">Aromatherapy &amp; Herbal Steam Session</option>
                      <option value="Thai Herbal Compress & Warm Oil Therapy">Thai Herbal Compress &amp; Warm Oil Therapy</option>
                      <option value="King Royal Suite Private Day Retreat">King Royal Suite Private Day Retreat</option>
                      <option value="VIP Membership & Private Pass Inquiry">VIP Membership &amp; Private Pass Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-xs uppercase tracking-wider mb-2 font-medium">
                      Message or Special Requests
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#0C0A0D]/70 border border-[#D48FB1]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D48FB1]/50 transition-colors resize-none"
                      placeholder="Preferred time window, therapist preferences, or notes"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rose-gold-gradient-bg text-[#0C0A0D] font-semibold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(212,143,176,0.5)] transition-all cursor-pointer"
                  >
                    <span>Send to WhatsApp Concierge (+91 7306 364 454)</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* SANCTUARY FACILITY & ARRIVAL PICTURE CONFIRMATION */}
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-1">
                PREMISES VERIFICATION
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white font-light">
                Sanctuary Arrival &amp; Concierge Gallery
              </h2>
              <p className="text-white/60 text-xs sm:text-sm mt-1">
                Confirmed photo tour of our Kozhikode sanctuary reception lounge, discreet parking, and private suites.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold self-start md:self-auto">
              <CheckCircle2 className="w-4 h-4" />
              <span>Location &amp; Premises Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Facility Photo 1: Reception Lounge */}
            <div className="group rounded-3xl overflow-hidden border border-[#D48FB1]/20 bg-[#161215] shadow-xl flex flex-col justify-between">
              <div className="relative h-56 w-full bg-black overflow-hidden">
                <img
                  src="/images/reception-lounge.jpg"
                  alt="SpaVibe Sanctuary Reception & Concierge Lounge"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161215] via-black/25 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-wider text-[#D48FB1] font-semibold">
                  WELCOME LOUNGE
                </div>
                <h3 className="text-white font-medium text-base mt-1">
                  Kozhikode Reception &amp; Tea Bar
                </h3>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">
                  Teakwood interior, discreet seating, and soothing herbal aromas upon arrival.
                </p>
              </div>
            </div>

            {/* Facility Photo 2: Private Valet & Arrival Entry */}
            <div className="group rounded-3xl overflow-hidden border border-amber-500/30 bg-[#161215] shadow-xl flex flex-col justify-between">
              <div className="relative h-56 w-full bg-black overflow-hidden">
                <img
                  src="/images/private-parking.jpg"
                  alt="SpaVibe Private Valet & Arrival Entry"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/images/couples-sanctuary.jpg'; }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161215] via-black/25 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                  DISCREET PARKING &amp; VALET
                </div>
                <h3 className="text-white font-medium text-base mt-1">
                  Private Gated Sanctuary Arrival
                </h3>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">
                  No public street visibility; drive-in private covered bays with direct suite access.
                </p>
              </div>
            </div>

            {/* Facility Photo 3: Presidential Suite */}
            <div className="group rounded-3xl overflow-hidden border border-[#D48FB1]/20 bg-[#161215] shadow-xl flex flex-col justify-between">
              <div className="relative h-56 w-full bg-black overflow-hidden">
                <img
                  src="/images/suite-presidential.jpg"
                  alt="SpaVibe Presidential Therapy Suite"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/images/body-to-body.jpg'; }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161215] via-black/25 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-wider text-[#D48FB1] font-semibold">
                  TREATMENT SUITES
                </div>
                <h3 className="text-white font-medium text-base mt-1">
                  Soundproof Private Suite 02
                </h3>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">
                  Attached private rainfall shower, hot herbal oil bath, and personal dressing amenities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
