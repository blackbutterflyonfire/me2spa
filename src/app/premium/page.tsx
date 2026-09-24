'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Star, Lock, CheckCircle2, ArrowRight, Sparkles, User, Clock, Shield } from 'lucide-react';

interface Therapist {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  image: string;
  availability: string;
}

const premiumBenefits = [
  {
    icon: <Crown className="w-6 h-6" />,
    title: 'Priority Booking',
    description: 'Skip the queue and get instant appointment confirmations'
  },
  {
    icon: <User className="w-6 h-6" />,
    title: 'Choose Your Therapist',
    description: 'Hand-pick from our elite team of certified professionals'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Extended Sessions',
    description: 'Enjoy 30-minute longer sessions at no extra cost'
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Exclusive Treatments',
    description: 'Access to premium therapies not available to regular members'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Private Suites',
    description: 'Luxury private rooms with enhanced amenities'
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Loyalty Rewards',
    description: 'Earn points on every booking for free sessions'
  }
];

const therapists: Therapist[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    specialty: 'Aromatherapy Specialist',
    experience: '8 years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80',
    availability: 'Available Today'
  },
  {
    id: '2',
    name: 'Ananya Patel',
    specialty: 'Deep Tissue Expert',
    experience: '6 years',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    availability: 'Available Tomorrow'
  },
  {
    id: '3',
    name: 'Meera Nair',
    specialty: 'Thai Massage Master',
    experience: '10 years',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    availability: 'Available Today'
  },
  {
    id: '4',
    name: 'Kavitha Menon',
    specialty: 'Hot Stone Therapy',
    experience: '7 years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    availability: 'Available in 2 days'
  }
];

export default function PremiumPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would validate the token with your backend
    if (token.length > 0) {
      setIsAuthenticated(true);
      setShowAuthModal(false);
    }
  };

  const handleTherapistSelect = (therapistId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setSelectedTherapist(therapistId);
  };

  return (
    <div className="min-h-screen bg-[#0C0A0D] pt-24 pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <Crown className="w-8 h-8 text-[#D48FB1]" />
          <h1 className="font-serif text-5xl md:text-6xl rose-gold-gradient-text font-medium">Premium Membership</h1>
        </div>
        <p className="text-white/60 text-lg max-w-2xl">Unlock exclusive benefits and elevate your wellness journey with our premium experience.</p>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto px-6 mb-20"
      >
        <h2 className="font-serif text-3xl rose-gold-gradient-text mb-8">Premium Benefits</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="bg-[#1A1518]/50 border border-[#D48FB1]/20 rounded-2xl p-6 hover:border-[#D48FB1]/40 transition-all"
            >
              <div className="w-14 h-14 rose-gold-gradient-bg rounded-xl flex items-center justify-center mb-4 text-[#0C0A0D]">
                {benefit.icon}
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">{benefit.title}</h3>
              <p className="text-white/60">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pricing Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto px-6 mb-20"
      >
        <h2 className="font-serif text-3xl rose-gold-gradient-text mb-8">Membership Plans</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div className="bg-[#1A1518]/50 border border-[#D48FB1]/20 rounded-2xl p-8 hover:border-[#D48FB1]/40 transition-all">
            <h3 className="text-white font-semibold text-2xl mb-2">Monthly Premium</h3>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-bold rose-gold-gradient-text">₹2,999</span>
              <span className="text-white/60 mb-2">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {premiumBenefits.slice(0, 4).map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-[#D48FB1]" />
                  {benefit.title}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setShowAuthModal(true)}
              className="w-full rose-gold-gradient-bg text-[#0C0A0D] font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(212,143,176,0.5)] transition-all"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Annual Plan */}
          <div className="bg-[#1A1518]/50 border-2 border-[#D48FB1] rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#D48FB1] text-[#0C0A0D] text-xs font-bold px-3 py-1 rounded-full">
              SAVE 20%
            </div>
            <h3 className="text-white font-semibold text-2xl mb-2">Annual Premium</h3>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-bold rose-gold-gradient-text">₹24,999</span>
              <span className="text-white/60 mb-2">/year</span>
            </div>
            <ul className="space-y-3 mb-8">
              {premiumBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-[#D48FB1]" />
                  {benefit.title}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setShowAuthModal(true)}
              className="w-full rose-gold-gradient-bg text-[#0C0A0D] font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(212,143,176,0.5)] transition-all"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Therapist Selection Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl rose-gold-gradient-text">Choose Your Therapist</h2>
          {!isAuthenticated && (
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Lock className="w-4 h-4" />
              Premium only
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {therapists.map((therapist) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + parseInt(therapist.id) * 0.1 }}
              className={`bg-[#1A1518]/50 border rounded-2xl overflow-hidden transition-all cursor-pointer ${
                !isAuthenticated 
                  ? 'border-[#D48FB1]/20 opacity-60' 
                  : selectedTherapist === therapist.id 
                    ? 'border-[#D48FB1] shadow-[0_0_30px_rgba(212,143,176,0.3)]' 
                    : 'border-[#D48FB1]/20 hover:border-[#D48FB1]/40'
              }`}
              onClick={() => handleTherapistSelect(therapist.id)}
            >
              <div className="relative h-48">
                {isAuthenticated ? (
                  <>
                    <img 
                      src={therapist.image} 
                      alt={therapist.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#0C0A0D]/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#D48FB1] fill-[#D48FB1]" />
                      <span className="text-white text-sm font-medium">{therapist.rating}</span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-48 bg-[#0C0A0D] flex flex-col items-center justify-center border-b border-[#D48FB1]/20">
                    <Lock className="w-12 h-12 text-[#D48FB1] mb-3" />
                    <p className="text-white/60 text-sm">Photo hidden</p>
                    <p className="text-[#D48FB1]/60 text-xs mt-1">Unlock with premium token</p>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-1">{therapist.name}</h3>
                <p className="text-[#D48FB1] text-sm mb-2">{therapist.specialty}</p>
                <div className="flex items-center justify-between text-white/60 text-sm">
                  <span>{therapist.experience}</span>
                  <span className={therapist.availability === 'Available Today' ? 'text-green-400' : ''}>
                    {therapist.availability}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedTherapist && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-[#1A1518]/50 border border-[#D48FB1] rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-xl mb-1">Therapist Selected</h3>
                <p className="text-white/60">You can now proceed to booking with your preferred therapist</p>
              </div>
              <button className="rose-gold-gradient-bg text-[#0C0A0D] font-semibold px-8 py-3 rounded-xl flex items-center gap-2 hover:shadow-[0_0_30px_rgba(212,143,176,0.5)] transition-all">
                Book Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1518] border border-[#D48FB1]/20 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-[#D48FB1]" />
                <h2 className="text-white font-serif text-2xl">Premium Access</h2>
              </div>
              
              <p className="text-white/60 mb-6">Enter your premium access token to unlock exclusive features.</p>
              
              <form onSubmit={handleTokenSubmit} className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Access Token</label>
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter your premium token"
                    className="w-full bg-[#0C0A0D]/50 border border-[#D48FB1]/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#D48FB1]/50 transition-colors"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full rose-gold-gradient-bg text-[#0C0A0D] font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(212,143,176,0.5)] transition-all"
                >
                  Unlock Premium <Crown className="w-4 h-4" />
                </button>
              </form>

              <p className="text-white/40 text-sm mt-4 text-center">
                Don&apos;t have a token? <span className="text-[#D48FB1] cursor-pointer hover:underline">Subscribe now</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
