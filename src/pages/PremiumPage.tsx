import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Star, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  Building2,
  Calendar,
  X,
  Phone,
  Eye,
  Users,
  LogOut,
  Clock,
  ShieldAlert,
  ChevronRight,
  Info,
  KeyRound
} from 'lucide-react';
import Footer from '../components/Footer';
import SpaVibeLogo from '../components/SpaVibeLogo';

export interface Therapist {
  id: string;
  name: string;
  age: number;
  area: string;
  spaCenter: string;
  specialty: string;
  experience: string;
  rating: number;
  availability: string;
  image: string;
  bio?: string;
}

export interface SpaCentre {
  id: string;
  name: string;
  area: string;
  suiteType: string;
  features: string[];
  image: string;
}

export interface KingMember {
  id: string;
  name: string;
  email: string;
  vipSince: string;
  subscriptionTier: string;
  subscriptionMonths: number;
  remainingBookings: number;
  maxBookings: number;
  passStatus: 'ACTIVE' | 'EXPIRED';
  cardSerial: string;
}

export const spaCentres: SpaCentre[] = [
  {
    id: 'kozhikode-mavoor-suite',
    name: 'SPAVIBE Luxury Sanctuary',
    area: 'Mavoor Road, Kozhikode',
    suiteType: 'Presidential Royal Suite 02',
    features: ['Private Herbal Jacuzzi', 'Chromatherapy Suite', 'Dedicated VIP Valet', 'Private Dining Lounge'],
    image: '/images/suite-presidential.jpg'
  },
  {
    id: 'kozhikode-beach-retreat',
    name: 'SPAVIBE Grand Retreat',
    area: 'Beach Road, Kozhikode',
    suiteType: 'Executive Crown Suite 05',
    features: ['Steam & Vichy Hydrotherapy', 'Multi-Bed Synchronized Sanctuary', 'Acoustic Sound Bath'],
    image: '/images/hydrotherapy-steam.jpg'
  },
  {
    id: 'kozhikode-palayam-pavilion',
    name: 'SPAVIBE Royal Pavilion',
    area: 'Palayam Junction, Kozhikode',
    suiteType: 'Imperial Master Suite 07',
    features: ['Soundproof Transit Oasis', 'Hot Basalt Stone Suite', 'Herbal Oxygen Bar'],
    image: '/images/cross-massage.jpg'
  },
  {
    id: 'kozhikode-focus-haven',
    name: 'SPAVIBE Signature Haven',
    area: 'Focus Mall Junction, Kozhikode',
    suiteType: 'Zen Master Suite 01',
    features: ['Botanical Garden View', 'Ayurvedic Marma Station', 'Private Bath & Sauna'],
    image: '/images/body-to-body.jpg'
  },
  {
    id: 'kozhikode-villa-retreat',
    name: 'SPAVIBE Kozhikode Beachfront Villa',
    area: 'Beach Road, Kozhikode',
    suiteType: 'Seaside Sanctuary Estate',
    features: ['Panoramic Ocean View Deck', 'Dual Jacuzzi Pool', 'All-Day Private Chef & Dedicated Butler'],
    image: '/images/beachfront-villa.jpg'
  }
];

export const therapists: Therapist[] = [
  {
    id: '1',
    name: 'Ananya S.',
    age: 24,
    area: 'Mavoor Road, Kozhikode',
    spaCenter: 'SPAVIBE Luxury Sanctuary (Suite 02)',
    specialty: 'Swedish & Aroma Specialist',
    experience: '6+ Years Experience',
    rating: 4.9,
    availability: 'Available Today',
    image: '/images/therapist-1.jpg',
    bio: 'Specialized in soothing pressure-point Swedish relaxation and essential oil head-to-toe rejuvenation with delicate touch.',
  },
  {
    id: '2',
    name: 'Meera K.',
    age: 26,
    area: 'Beach Road, Kozhikode',
    spaCenter: 'SPAVIBE Grand Retreat (Suite 05)',
    specialty: 'Deep Tissue & Hot Stone',
    experience: '5+ Years Experience',
    rating: 5.0,
    availability: 'Available Today',
    image: '/images/therapist-2.jpg',
    bio: 'Expert in relieving chronic lumbar tension, shoulder knots, and combining heated basalt stones with warm herbal oils.',
  },
  {
    id: '3',
    name: 'Somsri P.',
    age: 28,
    area: 'Palayam Junction, Kozhikode',
    spaCenter: 'SPAVIBE Royal Pavilion (Suite 07)',
    specialty: 'Traditional Thai Massage',
    experience: '8+ Years Experience',
    rating: 4.95,
    availability: 'Next Slot 4:00 PM',
    image: '/images/therapist-3.jpg',
    bio: 'Certified master in authentic Wat Pho Thai passive stretching, acupressure energy line clearing, and joint flexibility.',
  },
  {
    id: '4',
    name: 'Kavya N.',
    age: 23,
    area: 'Focus Mall Junction, Kozhikode',
    spaCenter: 'SPAVIBE Signature Haven (Suite 01)',
    specialty: 'Body-to-Body & Signature Blend',
    experience: '4+ Years Experience',
    rating: 4.92,
    availability: 'Available Today',
    image: '/images/therapist-4.jpg',
    bio: 'Master of full sensory flow therapy, holistic cross technique, and personalized warm aromatic oil glide treatments.',
  },
  {
    id: '5',
    name: 'Priyamvada R.',
    age: 25,
    area: 'Beach Road, Kozhikode',
    spaCenter: 'SPAVIBE Grand Retreat (Suite 05)',
    specialty: 'Ayurvedic Abhyanga & Marma Therapy',
    experience: '5+ Years Experience',
    rating: 4.96,
    availability: 'Available Today',
    image: '/images/therapist-5.jpg',
    bio: 'Hereditary Kerala Ayurvedic specialist trained in warm medicated kizhies, rhythmic herbal strokes, and spiritual calming.',
  },
  {
    id: '6',
    name: 'Divya M.',
    age: 27,
    area: 'Beach Road, Kozhikode',
    spaCenter: 'SPAVIBE Kozhikode Beachfront Villa',
    specialty: 'Four-Hands Synchronized & Balinese Flow',
    experience: '7+ Years Experience',
    rating: 4.98,
    availability: 'Available for VIP Sessions',
    image: '/images/therapist-6.jpg',
    bio: 'Premier therapist specialized in dual and multi-therapist synchronized rituals, ocean acoustics, and reflexology.',
  }
];

const demoKingMembers: Record<string, KingMember> = {
  'KING-777': {
    id: 'KING-777',
    name: 'Rajesh Varma',
    email: 'rajesh.varma@vip.spavibe.in',
    vipSince: 'March 2025',
    subscriptionTier: '6-Month VIP Diamond (Verified)',
    subscriptionMonths: 6,
    remainingBookings: 4,
    maxBookings: 4,
    passStatus: 'ACTIVE',
    cardSerial: 'KP-2026-777-KRL',
  },
  'KING-888': {
    id: 'KING-888',
    name: 'Faizal K.',
    email: 'faizal.k@executive.spavibe.in',
    vipSince: 'January 2025',
    subscriptionTier: '6-Month Executive VIP (Verified)',
    subscriptionMonths: 6,
    remainingBookings: 3,
    maxBookings: 4,
    passStatus: 'ACTIVE',
    cardSerial: 'KP-2026-888-MAL',
  }
};

const premiumBenefits = [
  { title: 'Full Private Suite Selection', desc: 'Pre-select ambient lighting, essential aroma & music.' },
  { title: 'Certified Therapist Profile Pre-selection', desc: 'Browse bios, certifications, and reserve your preferred therapist.' },
  { title: 'Zero Waiting Time & Immediate Arrival Escort', desc: 'Private reserved parking and direct suite entry.' },
  { title: 'Complimentary Warm Herbal Jacuzzi Bath', desc: 'Post-session relaxation hydrotherapy.' },
  { title: '24/7 Dedicated WhatsApp VIP Concierge', desc: 'Discreet priority booking anytime with instant confirmation.' },
];

export default function PremiumPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [token, setToken] = useState('');
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const [activeTherapistModal, setActiveTherapistModal] = useState<Therapist | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // KING PASS STATE
  const [showKingRestrictedModal, setShowKingRestrictedModal] = useState(false);
  const [showKingLoginForm, setShowKingLoginForm] = useState(false);
  const [kingIdInput, setKingIdInput] = useState('');
  const [kingPinInput, setKingPinInput] = useState('');
  const [kingLoginError, setKingLoginError] = useState('');
  const [kingMember, setKingMember] = useState<KingMember | null>(null);

  // Authenticated King Booking wizard
  const [selectedKingCentre, setSelectedKingCentre] = useState<string>('kozhikode-mavoor-suite');
  const [selectedKingTherapists, setSelectedKingTherapists] = useState<string[]>(['1', '2']);
  const [selectedKingDate, setSelectedKingDate] = useState<string>('Tomorrow');
  const [selectedKingPackage, setSelectedKingPackage] = useState<string>('All-Day Royal Sanctuary (10:00 AM – 8:00 PM)');
  const [kingTherapistLimitNotice, setKingTherapistLimitNotice] = useState<string>('');
  const [confirmedKingBooking, setConfirmedKingBooking] = useState<{
    bookingId: string;
    centreName: string;
    therapists: Therapist[];
    date: string;
    packageType: string;
    dayBasisRate: string;
    bookingsRemaining: number;
  } | null>(null);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim().length > 0) {
      setIsAuthenticated(true);
      setShowAuthModal(false);
      setErrorMsg('');
    } else {
      setErrorMsg('Please enter a valid membership code or token');
    }
  };

  const handleTherapistSelect = (therapist: Therapist) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setSelectedTherapist(therapist.id);
      setActiveTherapistModal(therapist);
    }
  };

  // Click on King section handler
  const handleKingCardClick = () => {
    if (kingMember) {
      // Already logged in as King Member
      const el = document.getElementById('king-dashboard');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // "If anyone click on the KING only show available only for VIP customers or Premium Customers"
      setShowKingRestrictedModal(true);
    }
  };

  // King Login Submit
  const handleKingLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = kingIdInput.trim().toUpperCase();

    if (!cleanId) {
      setKingLoginError('Please enter your KING Pass ID');
      return;
    }

    if (demoKingMembers[cleanId]) {
      setKingMember({ ...demoKingMembers[cleanId] });
      setIsAuthenticated(true);
      setKingLoginError('');
      setShowKingRestrictedModal(false);
    } else if (cleanId.startsWith('KING')) {
      setKingMember({
        id: cleanId,
        name: 'VIP King Member',
        email: 'member@vip.spavibe.in',
        vipSince: 'March 2025',
        subscriptionTier: '6-Month VIP Diamond (Verified)',
        subscriptionMonths: 6,
        remainingBookings: 4,
        maxBookings: 4,
        passStatus: 'ACTIVE',
        cardSerial: `KP-2026-${cleanId}`,
      });
      setIsAuthenticated(true);
      setKingLoginError('');
      setShowKingRestrictedModal(false);
    } else {
      setKingLoginError('Access denied. Available only for VIP customers or Premium Customers with active 6-Month subscription. Demo ID: KING-777');
    }
  };

  const handleQuickKingLogin = (id: string) => {
    setKingIdInput(id);
    setKingPinInput('7777');
    const member = demoKingMembers[id];
    if (member) {
      setKingMember({ ...member });
      setIsAuthenticated(true);
      setKingLoginError('');
      setShowKingRestrictedModal(false);
    }
  };

  const handleKingLogout = () => {
    setKingMember(null);
    setConfirmedKingBooking(null);
  };

  const toggleKingTherapist = (therapistId: string) => {
    if (selectedKingTherapists.includes(therapistId)) {
      if (selectedKingTherapists.length === 1) {
        setKingTherapistLimitNotice('Please keep at least 1 therapist selected for your session.');
        setTimeout(() => setKingTherapistLimitNotice(''), 3000);
        return;
      }
      setSelectedKingTherapists(prev => prev.filter(id => id !== therapistId));
      setKingTherapistLimitNotice('');
    } else {
      if (selectedKingTherapists.length >= 3) {
        setKingTherapistLimitNotice('KING Pass allows selecting up to a maximum of 3 therapists for 1 booking session.');
        setTimeout(() => setKingTherapistLimitNotice(''), 4000);
        return;
      }
      setSelectedKingTherapists(prev => [...prev, therapistId]);
      setKingTherapistLimitNotice('');
    }
  };

  const handleConfirmKingBooking = () => {
    if (!kingMember) return;
    if (kingMember.remainingBookings <= 0) {
      alert('You have utilized all 4 King Pass bookings for this calendar year.');
      return;
    }

    const centre = spaCentres.find(c => c.id === selectedKingCentre) || spaCentres[0];
    const chosenTherapists = therapists.filter(t => selectedKingTherapists.includes(t.id));
    const newRemaining = kingMember.remainingBookings - 1;

    setKingMember({
      ...kingMember,
      remainingBookings: newRemaining,
    });

    const bookingResult = {
      bookingId: `KING-${Math.floor(100000 + Math.random() * 900000)}`,
      centreName: centre.name,
      therapists: chosenTherapists,
      date: selectedKingDate,
      packageType: selectedKingPackage,
      dayBasisRate: 'Flat Day-Pass Included (4/Yr Quota)',
      bookingsRemaining: newRemaining,
    };

    setConfirmedKingBooking(bookingResult);
  };

  return (
    <div className="min-h-screen bg-[#0C0A0D] pt-28 flex flex-col justify-between text-[#F8F0F4]">
      <div className="flex-1 pb-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 mb-16 text-center"
        >
          <div className="flex justify-center mb-6">
            <SpaVibeLogo size="md" showTagline={false} />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D48FB1]/10 border border-[#D48FB1]/30 text-[#D48FB1] text-xs uppercase tracking-widest font-semibold mb-4">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>EXCLUSIVE PRIVILEGES</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl rose-gold-gradient-text font-medium mb-4">
            VIP &amp; Premium Privileges
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Experience therapeutic wellness on your own terms. Priority scheduling, certified therapist choice, and utmost discretion in Kozhikode.
          </p>

          {!isAuthenticated ? (
            <div className="mt-6 max-w-xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-black/40 to-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-2 text-left">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Confidential therapist bios, private suites &amp; full perks are reserved for active members.</span>
              </div>
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-[11px] uppercase tracking-wider rounded-xl shrink-0 transition-transform active:scale-95 cursor-pointer shadow-md"
              >
                Unlock VIP Access
              </button>
            </div>
          ) : (
            <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" /> VIP ACCESS ACTIVATED • FULL DETAILS UNLOCKED
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {!isAuthenticated ? (
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-black transition-all text-xs font-bold tracking-wider uppercase cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:scale-105"
              >
                ENTER VIP TOKEN / LOGIN
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/5 text-white/70 text-xs transition-colors cursor-pointer"
              >
                Lock Member View
              </button>
            )}

            <a
              href="#therapists"
              className="px-6 py-2.5 rounded-full border border-white/20 hover:border-[#D48FB1] text-white hover:text-[#D48FB1] transition-all text-xs font-semibold tracking-wider"
            >
              Browse Therapist Roster
            </a>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ===================== 2. PREMIUM PLAN DETAILS =========================== */}
        {/* ========================================================================= */}
        <section id="plans" className="max-w-6xl mx-auto px-6 mb-20 scroll-mt-28">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* 1. Monthly Plan */}
            <div className="bg-[#1A1518]/50 border border-[#D48FB1]/30 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#D48FB1]/60 transition-all shadow-xl group">
              {/* Picture Confirmation Header */}
              <div className="relative h-44 w-full bg-black overflow-hidden">
                <img 
                  src="/images/full-body-massage.jpg" 
                  alt="Gold Monthly Treatment Suite"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1518] via-black/25 to-transparent" />
                <div className="absolute bottom-2 left-3 text-[10px] text-white/80 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                  Gold Aromatherapy Suite
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-xl">Gold Monthly</h3>
                      <p className="text-xs text-white/50 mt-1">Flexible monthly wellness rejuvenation</p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-[#D48FB1]/10 flex items-center justify-center text-[#D48FB1]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold rose-gold-gradient-text">₹4,999</span>
                    <span className="text-white/60 text-xs">/ month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 text-xs">
                    <li className="flex items-center gap-2.5 text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#D48FB1] shrink-0" />
                      4 Full Body Massages (60 min each)
                    </li>
                    <li className="flex items-center gap-2.5 text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#D48FB1] shrink-0" />
                      2 Cross Massage sessions (75 min each)
                    </li>
                    {isAuthenticated ? (
                      <>
                        <li className="flex items-center gap-2.5 text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-[#D48FB1] shrink-0" />
                          Save 30% on standard single session pricing
                        </li>
                        <li className="flex items-center gap-2.5 text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-[#D48FB1] shrink-0" />
                          WhatsApp Concierge priority booking
                        </li>
                      </>
                    ) : (
                      <>
                        <li 
                          onClick={() => setShowAuthModal(true)}
                          className="flex items-center gap-2.5 text-white/40 hover:text-amber-300 cursor-pointer transition-colors"
                          title="Click to unlock details"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                          <span className="blur-[1.5px] select-none">Save 30% on single sessions</span>
                          <span className="text-[10px] text-amber-400 font-medium ml-auto">VIP Only</span>
                        </li>
                        <li 
                          onClick={() => setShowAuthModal(true)}
                          className="flex items-center gap-2.5 text-white/40 hover:text-amber-300 cursor-pointer transition-colors"
                          title="Click to unlock details"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                          <span className="blur-[1.5px] select-none">WhatsApp Concierge priority</span>
                          <span className="text-[10px] text-amber-400 font-medium ml-auto">VIP Only</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <a
                  href="https://wa.me/917306364454?text=Hi%20SPAVIBE,%20I%20would%20like%20to%20enroll%20in%20the%20Gold%20Monthly%20Membership%20(%E2%82%B94,999)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 border border-[#D48FB1]/40 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#D48FB1]/10 transition-colors text-xs font-semibold tracking-wider uppercase"
                >
                  ENROLL IN GOLD <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 2. 6-Month VIP Diamond */}
            <div className="bg-gradient-to-b from-[#241A1E] to-[#161014] border-2 border-amber-400/80 rounded-3xl overflow-hidden flex flex-col justify-between relative shadow-[0_0_35px_rgba(212,175,55,0.2)] hover:scale-[1.02] transition-transform group">
              {/* Picture Confirmation Header */}
              <div className="relative h-44 w-full bg-black overflow-hidden">
                <img 
                  src="/images/suite-jacuzzi.jpg" 
                  alt="VIP Jacuzzi & Hydrotherapy Suite"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241A1E] via-black/25 to-transparent" />
                <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-300 text-black text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  VIP TIER
                </div>
                <div className="absolute bottom-2 left-3 text-[10px] text-amber-200 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-amber-400/30">
                  VIP Jacuzzi Hydrotherapy Suite
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-xl font-serif">6-Month VIP Diamond</h3>
                      <p className="text-xs text-white/60 mt-0.5">Premier bi-annual sanctuary package</p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-amber-400">₹24,999</span>
                    <span className="text-white/60 text-xs">/ 6 months</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs">
                    <li className="flex items-center gap-2.5 text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      24 Therapeutic Massages (60 min)
                    </li>
                    <li className="flex items-center gap-2.5 text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      12 Signature Cross &amp; Body-to-Body sessions
                    </li>
                    {isAuthenticated ? (
                      <>
                        <li className="flex items-center gap-2.5 text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                          Private Herbal Jacuzzi with each visit
                        </li>
                        <li className="flex items-center gap-2.5 text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                          Complimentary VIP Airport Escort
                        </li>
                        <li className="flex items-center gap-2.5 text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                          Dedicated 24/7 VIP Concierge
                        </li>
                      </>
                    ) : (
                      <>
                        <li 
                          onClick={() => setShowAuthModal(true)}
                          className="flex items-center gap-2.5 text-white/40 hover:text-amber-300 cursor-pointer transition-colors"
                          title="Click to unlock details"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                          <span className="blur-[2px] select-none">Private Herbal Jacuzzi bath</span>
                          <span className="text-[10px] text-amber-400 font-medium ml-auto">VIP Only</span>
                        </li>
                        <li 
                          onClick={() => setShowAuthModal(true)}
                          className="flex items-center gap-2.5 text-white/40 hover:text-amber-300 cursor-pointer transition-colors"
                          title="Click to unlock details"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                          <span className="blur-[2px] select-none">VIP Airport Escort Service</span>
                          <span className="text-[10px] text-amber-400 font-medium ml-auto">VIP Only</span>
                        </li>
                        <li 
                          onClick={() => setShowAuthModal(true)}
                          className="flex items-center gap-2.5 text-white/40 hover:text-amber-300 cursor-pointer transition-colors"
                          title="Click to unlock details"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                          <span className="blur-[2px] select-none">Dedicated 24/7 VIP Concierge</span>
                          <span className="text-[10px] text-amber-400 font-medium ml-auto">VIP Only</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <a
                  href="https://wa.me/917306364454?text=Hi%20SPAVIBE,%20I%20want%20to%20enroll%20in%20the%206-Month%20VIP%20Diamond%20Subscription%20(%E2%82%B924,999)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 text-black rounded-xl flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-300 transition-colors text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  ENROLL IN 6-MONTH VIP <Crown className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 3. Annual VIP Plan */}
            <div className="bg-[#1A1518]/70 border-2 border-amber-500/50 rounded-3xl overflow-hidden flex flex-col justify-between relative shadow-[0_0_40px_rgba(212,175,55,0.15)] group">
              {/* Picture Confirmation Header */}
              <div className="relative h-44 w-full bg-black overflow-hidden">
                <img 
                  src="/images/suite-presidential.jpg" 
                  alt="Presidential Royal Sanctuary Suite"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1518] via-black/25 to-transparent" />
                <div className="absolute top-3 right-3 bg-amber-400 text-black text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  FULL YEAR VIP
                </div>
                <div className="absolute bottom-2 left-3 text-[10px] text-amber-200 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-amber-400/30">
                  Presidential Royal Sanctuary Suite
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-amber-400 font-semibold text-xl font-serif">Annual VIP Membership</h3>
                      <p className="text-xs text-white/60 mt-1">Exclusive yearly access with concierge</p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-amber-400">₹49,999</span>
                    <span className="text-white/60 text-xs">/ year</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs">
                    {isAuthenticated ? (
                      premiumBenefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-white/90">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-white">{b.title}</span>
                            <p className="text-white/50 text-[11px]">{b.desc}</p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2.5 text-white/90">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-white">Full Private Suite Selection</span>
                            <p className="text-white/50 text-[11px]">Pre-select ambient lighting, essential aroma &amp; music.</p>
                          </div>
                        </li>
                        <li 
                          onClick={() => setShowAuthModal(true)}
                          className="flex items-center gap-2.5 text-white/40 hover:text-amber-300 cursor-pointer transition-colors"
                          title="Click to unlock details"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                          <span className="blur-[2px] select-none">Certified Therapist Profile Pre-selection</span>
                          <span className="text-[10px] text-amber-400 font-medium ml-auto">VIP Only</span>
                        </li>
                        <li 
                          onClick={() => setShowAuthModal(true)}
                          className="flex items-center gap-2.5 text-white/40 hover:text-amber-300 cursor-pointer transition-colors"
                          title="Click to unlock details"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                          <span className="blur-[2px] select-none">Zero Waiting Time &amp; Immediate Arrival Escort</span>
                          <span className="text-[10px] text-amber-400 font-medium ml-auto">VIP Only</span>
                        </li>
                        <li 
                          onClick={() => setShowAuthModal(true)}
                          className="flex items-center gap-2.5 text-white/40 hover:text-amber-300 cursor-pointer transition-colors"
                          title="Click to unlock details"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                          <span className="blur-[2px] select-none">Complimentary Warm Herbal Jacuzzi Bath</span>
                          <span className="text-[10px] text-amber-400 font-medium ml-auto">VIP Only</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <a
                  href="https://wa.me/917306364454?text=Hi%20SPAVIBE,%20I%20would%20like%20to%20inquire%20about%20the%20Annual%20VIP%20Membership%20(%E2%82%B949,999)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 text-black rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform text-xs font-semibold tracking-wider uppercase shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  CLAIM ANNUAL VIP <Crown className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ======================= 3. THERAPIST ROSTER ============================= */}
        {/* ========================================================================= */}
        <div id="therapists" className="max-w-7xl mx-auto px-6 mb-24 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-1">CERTIFIED ROSTER</div>
              <h2 className="font-serif text-3xl sm:text-4xl rose-gold-gradient-text">Choose Your Preferred Therapist</h2>
              <p className="text-xs text-white/60 mt-1">
                Tap on any photo to inspect age, operating area, and designated spa centre branch.
              </p>
            </div>
            {!isAuthenticated && (
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 text-amber-400 text-xs border border-amber-500/30 px-4 py-2.5 rounded-xl hover:bg-amber-500/10 cursor-pointer self-start md:self-auto transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                Unlock Therapist Photos (VIP Token)
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapists.map((therapist) => (
              <div
                key={therapist.id}
                onClick={() => handleTherapistSelect(therapist)}
                className={`bg-[#1A1518]/50 border rounded-2xl overflow-hidden transition-all cursor-pointer group hover:-translate-y-1 ${
                  selectedTherapist === therapist.id
                    ? 'border-amber-400 shadow-[0_0_30px_rgba(212,175,55,0.35)]'
                    : 'border-[#D48FB1]/20 hover:border-[#D48FB1]/60'
                }`}
              >
                <div className="relative h-64 bg-[#121013] overflow-hidden">
                  {isAuthenticated ? (
                    <>
                      <img 
                        src={therapist.image} 
                        alt={therapist.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.currentTarget.src = '/images/therapist-1.jpg'; }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-[#0C0A0D]/85 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 border border-white/10 z-10">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-white text-xs font-semibold">{therapist.rating}</span>
                      </div>
                      
                      {/* Age pill badge on image */}
                      <div className="absolute bottom-3 left-3 bg-[#0C0A0D]/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/40 text-[11px] font-semibold text-amber-300 flex items-center gap-1.5 shadow-lg z-10">
                        <Calendar className="w-3 h-3 text-amber-400" />
                        <span>{therapist.age} Years Old</span>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-3">
                        <Lock className="w-5 h-5 text-amber-400" />
                      </div>
                      <p className="text-white/80 text-xs font-medium">Portrait Discreetly Protected</p>
                      <p className="text-amber-400/80 text-[10px] mt-1">Tap to enter VIP token / view details</p>
                      <div className="mt-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">
                        Age: {therapist.age} yrs
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold text-lg group-hover:text-amber-300 transition-colors">
                      {therapist.name}
                    </h3>
                    <span className="text-[11px] font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/30">
                      {therapist.age} yrs
                    </span>
                  </div>
                  
                  <p className="text-[#D48FB1] text-xs font-medium">{therapist.specialty}</p>

                  {/* Area Information */}
                  <div className="flex items-center gap-1.5 text-xs text-white/80 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    {isAuthenticated ? (
                      <span className="truncate">{therapist.area}</span>
                    ) : (
                      <span className="truncate text-white/40 blur-[1px]">Mavoor Road, Kozhikode (VIP Only)</span>
                    )}
                  </div>

                  {/* Spa Centre Belonging */}
                  <div className="flex items-center gap-1.5 text-xs text-white/70">
                    <Building2 className="w-3.5 h-3.5 text-[#D48FB1] shrink-0" />
                    {isAuthenticated ? (
                      <span className="truncate text-white/75">{therapist.spaCenter}</span>
                    ) : (
                      <span className="truncate text-white/40 blur-[1px]">Private Suite (VIP Members Only)</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-white/50 border-t border-white/10 pt-3 mt-1">
                    <span>{therapist.experience}</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {therapist.availability}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedTherapist && (
            <div className="mt-8 bg-black/70 border border-amber-500/40 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-amber-400 font-semibold text-xl font-serif">
                    {therapists.find(t => t.id === selectedTherapist)?.name}
                  </h3>
                  <span className="bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                    Age: {therapists.find(t => t.id === selectedTherapist)?.age}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/75 pt-1">
                  <span className="flex items-center gap-1 text-[#D48FB1]">
                    <Sparkles className="w-3.5 h-3.5" />
                    {therapists.find(t => t.id === selectedTherapist)?.specialty}
                  </span>
                  <span className="flex items-center gap-1 text-white/70">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Area: <strong className="text-white font-medium">{therapists.find(t => t.id === selectedTherapist)?.area}</strong>
                  </span>
                  <span className="flex items-center gap-1 text-white/70">
                    <Building2 className="w-3.5 h-3.5 text-[#D48FB1]" />
                    Spa Centre: <strong className="text-white font-medium">{therapists.find(t => t.id === selectedTherapist)?.spaCenter}</strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    const found = therapists.find(t => t.id === selectedTherapist);
                    if (found) setActiveTherapistModal(found);
                  }}
                  className="px-5 py-3 border border-white/20 hover:border-amber-400 text-white rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  View Full Profile
                </button>
                <a
                  href={`https://wa.me/917306364454?text=Hello%20SPAVIBE,%20I'd%20like%20to%20reserve%20a%20VIP%20session%20with%20therapist%20${encodeURIComponent(therapists.find(t => t.id === selectedTherapist)?.name || '')}%20(Age:%20${therapists.find(t => t.id === selectedTherapist)?.age},%20Centre:%20${encodeURIComponent(therapists.find(t => t.id === selectedTherapist)?.spaCenter || '')}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs rounded-xl tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Reserve on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* ================== 4. KING LOGIN SECTION (DISCREET) ===================== */}
        {/* ========================================================================= */}
        {/* As requested: Located below the premium plan details and therapist roster.
            The details DO NOT show anything about KING feature.
            If anyone clicks on KING, it displays: "Available only for VIP customers or Premium Customers" */}
        <section id="king-section" className="max-w-4xl mx-auto px-6 mb-20 scroll-mt-28">
          <div 
            onClick={handleKingCardClick}
            className="group relative rounded-3xl overflow-hidden border border-amber-500/40 bg-[#140F13] p-8 sm:p-10 cursor-pointer shadow-[0_0_40px_rgba(212,175,55,0.08)] hover:border-amber-400/80 hover:shadow-[0_0_50px_rgba(212,175,55,0.25)] transition-all"
          >
            {/* Background Picture with Dark Vignette */}
            <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity">
              <img 
                src="/images/beachfront-villa.jpg" 
                alt="KING Pass Sanctuary Retreat"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                className="w-full h-full object-cover filter brightness-75 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#140F13] via-[#140F13]/90 to-[#140F13]/80" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:bg-amber-400 group-hover:text-black transition-all shrink-0">
                  <Crown className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-400 font-semibold mb-1">
                    <KeyRound className="w-3 h-3" />
                    <span>RESTRICTED PASS PORTAL</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium group-hover:text-amber-300 transition-colors">
                    KING Level Login
                  </h3>
                  <p className="text-white/50 text-xs sm:text-sm mt-1 max-w-md font-light">
                    Confidential member sign-in for registered KING Pass cardholders.
                  </p>
                </div>
              </div>

              <div className="sm:self-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleKingCardClick();
                  }}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs tracking-wider uppercase rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-all cursor-pointer"
                >
                  <Crown className="w-4 h-4" />
                  <span>Access KING Portal</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ================ AUTHENTICATED KING MEMBER DASHBOARD ==================== */}
        {/* ========================================================================= */}
        {/* Only rendered when a verified KING passholder is logged in */}
        {kingMember && (
          <div id="king-dashboard" className="max-w-6xl mx-auto px-6 mb-24 scroll-mt-28">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/60 bg-[#140F13] p-6 sm:p-10 shadow-[0_0_60px_rgba(212,175,55,0.2)]">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-400 text-black flex items-center justify-center font-serif text-2xl font-bold shadow-lg">
                    👑
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 text-xs uppercase tracking-widest font-bold">
                        {kingMember.subscriptionTier}
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                        {kingMember.passStatus}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                      Welcome, {kingMember.name}
                    </h3>
                    <div className="text-xs text-white/50 font-mono mt-0.5">
                      KING ID: <strong className="text-amber-300">{kingMember.id}</strong> • Serial: {kingMember.cardSerial}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#191316] border border-amber-400/40 rounded-2xl p-4 text-center min-w-[170px]">
                    <div className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold">ANNUAL ALLOCATION</div>
                    <div className="text-2xl font-bold text-white font-serif mt-0.5">
                      <span className="text-amber-400">{kingMember.remainingBookings}</span> / {kingMember.maxBookings}
                    </div>
                    <div className="text-[10px] text-white/60">Day Bookings Remaining</div>
                  </div>

                  <button
                    type="button"
                    onClick={handleKingLogout}
                    className="px-4 py-3 rounded-xl border border-white/20 hover:bg-red-500/10 hover:border-red-400/40 text-white/70 hover:text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Confirmed Notice */}
              {confirmedKingBooking && (
                <div className="my-6 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 to-[#121E15] border-2 border-emerald-500/60 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>KING PASS BOOKING CONFIRMED</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40">
                      Ref: {confirmedKingBooking.bookingId}
                    </span>
                  </div>
                  <div className="text-xs text-white/80 space-y-1">
                    <div>Sanctuary: <strong className="text-white">{confirmedKingBooking.centreName}</strong></div>
                    <div>Therapists: <strong className="text-amber-300">{confirmedKingBooking.therapists.map(t => `${t.name} (${t.age} yrs)`).join(', ')}</strong></div>
                    <div>Schedule: <strong className="text-white">{confirmedKingBooking.date}</strong> • Quota Left: <strong className="text-emerald-300">{confirmedKingBooking.bookingsRemaining}</strong></div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-emerald-500/20">
                    <a
                      href={`https://wa.me/917306364454?text=Hello%20SPAVIBE%20VIP%20Concierge,%20I%20am%20KING%20Pass%20holder%20${encodeURIComponent(kingMember.name)}%20(ID:%20${kingMember.id}).%20Booking%20confirmed%20at%20${encodeURIComponent(confirmedKingBooking.centreName)}%20with%20therapists:%20${encodeURIComponent(confirmedKingBooking.therapists.map(t => `${t.name} (Age ${t.age})`).join(', '))}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Dispatch to WhatsApp Concierge</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Booking Console */}
              <div className="mt-8 space-y-8">
                {/* Step 1: Venue */}
                <div>
                  <h4 className="font-serif text-xl text-white mb-2">1. Select Sanctuary Centre</h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {spaCentres.map((centre) => (
                      <div
                        key={centre.id}
                        onClick={() => setSelectedKingCentre(centre.id)}
                        className={`rounded-2xl border overflow-hidden transition-all cursor-pointer group ${
                          selectedKingCentre === centre.id
                            ? 'bg-amber-400/15 border-amber-400 text-white shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                            : 'bg-black/40 border-white/10 hover:border-white/20 text-white/70'
                        }`}
                      >
                        <div className="relative h-28 w-full bg-black overflow-hidden">
                          <img 
                            src={centre.image} 
                            alt={centre.name}
                            referrerPolicy="no-referrer"
                            onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                          <div className="absolute bottom-1.5 left-2 text-[9px] text-white/70 uppercase tracking-widest font-mono">
                            {centre.area}
                          </div>
                        </div>

                        <div className="p-3.5">
                          <div className="text-sm font-semibold text-white truncate">{centre.name}</div>
                          <div className="text-xs text-[#D48FB1] mt-0.5 truncate">{centre.suiteType}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Therapists (up to 3) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-serif text-xl text-white">
                      2. Choose Therapists (Selected: {selectedKingTherapists.length} / 3)
                    </h4>
                  </div>
                  {kingTherapistLimitNotice && (
                    <div className="mb-3 text-xs text-amber-300 bg-amber-500/20 border border-amber-500/40 p-2.5 rounded-xl">
                      {kingTherapistLimitNotice}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {therapists.map((t) => {
                      const isSelected = selectedKingTherapists.includes(t.id);
                      return (
                        <div
                          key={t.id}
                          onClick={() => toggleKingTherapist(t.id)}
                          className={`rounded-2xl border p-2.5 cursor-pointer transition-all text-center ${
                            isSelected
                              ? 'bg-amber-400/20 border-amber-400 shadow-md'
                              : 'bg-black/40 border-white/10 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img 
                            src={t.image} 
                            alt={t.name} 
                            referrerPolicy="no-referrer"
                            onError={(e) => { e.currentTarget.src = '/images/therapist-1.jpg'; }}
                            className="w-full h-24 object-cover rounded-xl mb-2" 
                          />
                          <div className="text-xs font-semibold text-white">{t.name}</div>
                          <div className="text-[10px] text-amber-300">Age: {t.age} yrs</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Confirm */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-white/60">
                    Billed on flat <strong>Per-Day Luxury Basis</strong> • {kingMember.remainingBookings} bookings remaining this year.
                  </div>
                  <button
                    type="button"
                    onClick={handleConfirmKingBooking}
                    className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] cursor-pointer"
                  >
                    Confirm Day Sanctuary Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* ===== MODAL: "AVAILABLE ONLY FOR VIP OR PREMIUM CUSTOMERS" ============== */}
      {/* ========================================================================= */}
      {/* As requested: If anyone clicks on the KING, only show:
          "Available only for VIP customers or Premium Customers" */}
      <AnimatePresence>
        {showKingRestrictedModal && (
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[130] p-4 sm:p-6"
            onClick={() => {
              setShowKingRestrictedModal(false);
              setShowKingLoginForm(false);
              setKingLoginError('');
            }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-[#181317] border-2 border-amber-500/50 rounded-3xl max-w-lg w-full p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setShowKingRestrictedModal(false);
                  setShowKingLoginForm(false);
                  setKingLoginError('');
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Royal Lock Icon */}
              <div className="w-16 h-16 rounded-3xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <Crown className="w-8 h-8 text-amber-400" />
              </div>

              {/* STRICT RESTRICTION NOTICE */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[10px] uppercase font-bold tracking-widest mb-3">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>RESTRICTED SANCTUARY ACCESS</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-3 leading-snug">
                Available only for VIP customers or Premium Customers
              </h3>

              <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed mb-6">
                The <strong className="text-amber-300 font-medium">KING Level Pass</strong> is an unlisted private sanctuary privilege strictly reserved for verified members holding an active <strong>6-Month VIP</strong> or <strong>Annual Premium</strong> subscription.
              </p>

              {!showKingLoginForm ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-left text-xs text-white/75 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>How to qualify for KING Level Access:</span>
                    </div>
                    <p className="text-white/60 text-[11px] pl-6">
                      Enroll in our <strong>6-Month VIP Diamond</strong> or <strong>Annual Premium Membership</strong> to receive your private KING card and credentials from the concierge.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setShowKingRestrictedModal(false);
                        const el = document.getElementById('plans');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>View Premium &amp; VIP Plans</span>
                    </button>

                    <a
                      href="https://wa.me/917306364454?text=Hello%20SPAVIBE,%20I'm%20inquiring%20about%20the%20VIP%20Premium%20Membership%20to%20qualify%20for%20the%20KING%20Pass."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 border border-amber-500/40 hover:bg-amber-400/10 text-amber-300 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Contact VIP Concierge on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setShowKingLoginForm(true)}
                      className="text-white/50 hover:text-white text-xs pt-2 underline underline-offset-4 cursor-pointer"
                    >
                      Already an active KING cardholder? Sign In here
                    </button>
                  </div>
                </div>
              ) : (
                /* Member Sign-in subform */
                <form onSubmit={handleKingLoginSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-white/80 text-[11px] uppercase tracking-wider mb-1 font-medium">
                      KING Member ID
                    </label>
                    <input
                      type="text"
                      value={kingIdInput}
                      onChange={(e) => setKingIdInput(e.target.value)}
                      placeholder="e.g. KING-777"
                      className="w-full bg-black/60 border border-amber-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-[11px] uppercase tracking-wider mb-1 font-medium">
                      Security Passcode / PIN
                    </label>
                    <input
                      type="password"
                      value={kingPinInput}
                      onChange={(e) => setKingPinInput(e.target.value)}
                      placeholder="Enter 4-digit PIN (e.g. 7777)"
                      className="w-full bg-black/60 border border-amber-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  {kingLoginError && (
                    <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs">
                      {kingLoginError}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Crown className="w-4 h-4" />
                      <span>Authenticate KING Pass</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowKingLoginForm(false)}
                      className="text-white/50 hover:text-white text-xs py-1 text-center cursor-pointer"
                    >
                      Back to Criteria Information
                    </button>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-center">
                    <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Verified Demo Cardholders:</div>
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickKingLogin('KING-777')}
                        className="px-3 py-1 bg-white/5 hover:bg-amber-400/20 border border-white/15 rounded-lg text-[11px] text-amber-300 font-mono"
                      >
                        KING-777
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickKingLogin('KING-888')}
                        className="px-3 py-1 bg-white/5 hover:bg-amber-400/20 border border-white/15 rounded-lg text-[11px] text-amber-300 font-mono"
                      >
                        KING-888
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* ==================== THERAPIST PROFILE POPUP MODAL ====================== */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeTherapistModal && (
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[120] p-4 sm:p-6"
            onClick={() => setActiveTherapistModal(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#18131B] border border-amber-500/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveTherapistModal(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Therapist Photo Header */}
              <div className="relative h-64 sm:h-72 w-full bg-[#121013]">
                <img 
                  src={activeTherapistModal.image} 
                  alt={activeTherapistModal.name} 
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/images/therapist-1.jpg'; }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18131B] via-transparent to-black/30" />
                
                {/* Age & Rating Badge overlay */}
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between z-10">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#D48FB1] font-semibold">
                      CERTIFIED THERAPIST
                    </span>
                    <h3 className="font-serif text-3xl font-light text-white flex items-center gap-2">
                      <span>{activeTherapistModal.name}</span>
                      <span className="text-amber-400 font-sans font-semibold text-sm bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
                        {activeTherapistModal.age} Years Old
                      </span>
                    </h3>
                  </div>

                  <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-white text-xs font-bold">{activeTherapistModal.rating}</span>
                  </div>
                </div>
              </div>

              {/* Therapist Detailed Specifications */}
              <div className="p-6 sm:p-7 space-y-5">
                {/* Highlighted Meta Grid: Area, Spa Centre, Age */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-black/40 rounded-2xl p-4 border border-white/10">
                  {/* Age */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0 text-amber-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Therapist Age</div>
                      <div className="text-sm font-semibold text-white mt-0.5">{activeTherapistModal.age} Years</div>
                    </div>
                  </div>

                  {/* Area */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#D48FB1]/10 flex items-center justify-center shrink-0 text-[#D48FB1]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Assigned Area</div>
                      <div className="text-sm font-semibold text-white mt-0.5">{activeTherapistModal.area}</div>
                    </div>
                  </div>

                  {/* Spa Centre Belonging */}
                  <div className="sm:col-span-2 flex items-start gap-2.5 pt-2 border-t border-white/5">
                    <div className="w-8 h-8 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0 text-amber-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Spa Centre Branch</div>
                      <div className="text-sm font-semibold text-amber-200 mt-0.5">{activeTherapistModal.spaCenter}</div>
                    </div>
                  </div>
                </div>

                {/* Specialty & Bio */}
                <div>
                  <div className="flex items-center justify-between text-xs text-white/60 mb-1.5">
                    <span className="uppercase tracking-wider">Expertise &amp; Techniques</span>
                    <span className="text-emerald-400 font-medium">{activeTherapistModal.availability}</span>
                  </div>
                  <div className="text-sm font-serif text-[#D48FB1] text-base">
                    {activeTherapistModal.specialty}
                  </div>
                  {activeTherapistModal.bio && (
                    <p className="text-xs text-white/70 font-light leading-relaxed mt-2">
                      {activeTherapistModal.bio}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/917306364454?text=Hello%20SPAVIBE,%20I%20would%20like%20to%20reserve%20a%20private%20session%20with%20therapist%20${encodeURIComponent(activeTherapistModal.name)}%20(Age:%20${activeTherapistModal.age},%20Centre:%20${encodeURIComponent(activeTherapistModal.spaCenter)},%20Area:%20${encodeURIComponent(activeTherapistModal.area)}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-semibold text-xs tracking-wider rounded-xl uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    <Phone className="w-4 h-4" />
                    Reserve with {activeTherapistModal.name.split(' ')[0]}
                  </a>
                  
                  <button
                    type="button"
                    onClick={() => setActiveTherapistModal(null)}
                    className="px-6 py-3.5 border border-white/20 hover:bg-white/5 text-white/80 rounded-xl text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* ======================== STANDARD VIP AUTH MODAL ======================== */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showAuthModal && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setShowAuthModal(false)}
          >
            <div 
              className="bg-[#1A1518] border border-amber-500/30 rounded-3xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-white font-serif text-2xl">VIP Access</h2>
                  <p className="text-xs text-white/50">Enter token or demo passcode (e.g. VIP2026)</p>
                </div>
              </div>

              <form onSubmit={handleTokenSubmit} className="space-y-4 mt-6">
                <div>
                  <label className="block text-white/80 text-xs uppercase tracking-wider mb-2">Access Token / Member Code</label>
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter token (e.g. VIP2026)"
                    className="w-full bg-[#0C0A0D]/70 border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400"
                  />
                  {errorMsg && <p className="text-red-400 text-xs mt-1.5">{errorMsg}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold py-3.5 rounded-xl text-xs uppercase tracking-wider hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Unlock VIP Roster
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-xs text-white/40 mb-3">Don't have a token?</p>
                <a
                  href="https://wa.me/917306364454?text=Hello%20SPAVIBE,%20I%20would%20like%20to%20request%20a%20VIP%20Access%20Token."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#D48FB1] hover:underline"
                >
                  Request VIP Token via WhatsApp Concierge
                </a>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
