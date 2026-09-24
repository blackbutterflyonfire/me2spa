'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0C0A0D] pt-24 pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 mb-16"
      >
        <h1 className="font-serif text-5xl md:text-6xl rose-gold-gradient-text font-medium mb-4">Contact Us</h1>
        <p className="text-white/60 text-lg max-w-2xl">Get in touch with our wellness sanctuary. We&apos;re here to help you begin your journey to relaxation.</p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-[#1A1518]/50 border border-[#D48FB1]/20 rounded-2xl p-8">
            <h2 className="font-serif text-2xl rose-gold-gradient-text mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rose-gold-gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#0C0A0D]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Phone</h3>
                  <p className="text-white/60">+91 98765 43210</p>
                  <p className="text-white/60">+91 87654 32109</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rose-gold-gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#0C0A0D]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Location</h3>
                  <p className="text-white/60">Kondotty, Malappuram District</p>
                  <p className="text-white/60">Kerala, India - 676305</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rose-gold-gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#0C0A0D]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Hours</h3>
                  <p className="text-white/60">Monday - Sunday</p>
                  <p className="text-white/60">9:00 AM - 9:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rose-gold-gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#0C0A0D]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Email</h3>
                  <p className="text-white/60">me2spa@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-[#1A1518]/50 border border-[#D48FB1]/20 rounded-2xl p-8">
            <h2 className="font-serif text-2xl rose-gold-gradient-text mb-6">Send us a Message</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm mb-2">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0C0A0D]/50 border border-[#D48FB1]/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#D48FB1]/50 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full bg-[#0C0A0D]/50 border border-[#D48FB1]/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#D48FB1]/50 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-[#0C0A0D]/50 border border-[#D48FB1]/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#D48FB1]/50 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-[#0C0A0D]/50 border border-[#D48FB1]/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#D48FB1]/50 transition-colors resize-none"
                  placeholder="Tell us about your needs"
                />
              </div>

              <button 
                type="submit"
                className="w-full rose-gold-gradient-bg text-[#0C0A0D] font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(212,143,176,0.5)] transition-all"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
