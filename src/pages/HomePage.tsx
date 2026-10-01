import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flower2, 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  Heart, 
  Star, 
  ArrowRight, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crown,
  Sparkles,
  Zap,
  Building2,
  Calendar,
  X,
  Eye,
  MessageSquare
} from 'lucide-react';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import SpaVibeLogo from '../components/SpaVibeLogo';

export type ServiceCategory = 'all' | 'therapeutic' | 'couples' | 'express';

interface Service {
  id: string;
  category: 'therapeutic' | 'couples' | 'express';
  categoryLabel: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  badge?: string;
  image: string;
  icon: React.ReactNode;
}

interface FormData {
  service: string;
  bodyTypes: string[];
  ethnicity: string;
  name: string;
  age: string;
  location: string;
  mobile: string;
}

const services: Service[] = [
  // Therapeutic Massage
  {
    id: 'full-body',
    category: 'therapeutic',
    categoryLabel: 'Therapeutic Massage',
    title: 'Full Body Massage',
    description: 'Deep tissue therapeutic massage with customized pressure to release stubborn tension and muscle soreness.',
    duration: '60 min',
    price: '₹1,000',
    badge: 'Classic',
    image: '/images/full-body-massage.jpg',
    icon: <Heart className="w-8 h-8" />,
  },
  {
    id: 'body-to-body',
    category: 'therapeutic',
    categoryLabel: 'Therapeutic Massage',
    title: 'Body-to-Body Therapy',
    description: 'Sensual full contact sensory experience with warm aromatic herbal oils for deep mental and physical tranquility.',
    duration: '90 min',
    price: '₹1,500',
    badge: 'Signature',
    image: '/images/body-to-body.jpg',
    icon: <Flower2 className="w-8 h-8" />,
  },
  {
    id: 'cross',
    category: 'therapeutic',
    categoryLabel: 'Therapeutic Massage',
    title: 'Cross Massage',
    description: 'Signature fusion therapy combining ancient Kerala marma balancing with modern acupressure strokes.',
    duration: '75 min',
    price: '₹1,299',
    badge: 'Popular',
    image: '/images/cross-massage.jpg',
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: 'annual-premium',
    category: 'therapeutic',
    categoryLabel: 'Therapeutic Massage',
    title: 'Annual VIP Membership',
    description: 'Exclusive yearly access including bi-monthly packages, complimentary add-ons, and dedicated concierge perks.',
    duration: 'Yearly',
    price: '₹49,999',
    badge: 'VIP Tier',
    image: '/images/suite-presidential.jpg',
    icon: <Star className="w-8 h-8" />,
  },

  // Couples Packages
  {
    id: 'couples-sanctuary',
    category: 'couples',
    categoryLabel: 'Couples Packages',
    title: 'Dual Sanctuary Ritual',
    description: 'Side-by-side full body therapeutic rejuvenation in an adjoining luxury suite with aromatic candlelight & soothing soundscapes.',
    duration: '90 min',
    price: '₹2,799',
    badge: 'Best for 2',
    image: '/images/couples-sanctuary.jpg',
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: 'couples-royal-escape',
    category: 'couples',
    categoryLabel: 'Couples Packages',
    title: 'Royal Couple Indulgence',
    description: 'Extended couple relaxation including deep tissue aromatherapy, private jacuzzi hydrotherapy, and signature herbal elixirs.',
    duration: '120 min',
    price: '₹3,999',
    badge: 'Luxury Suite',
    image: '/images/couples-royal-escape.jpg',
    icon: <Sparkles className="w-8 h-8" />,
  },

  // Express Wellness
  {
    id: 'express-head-shoulder',
    category: 'express',
    categoryLabel: 'Express Wellness',
    title: 'Executive Head & Shoulder Relief',
    description: 'Focused tension-relief therapy for desk strain, neck stiffness, and airport travel fatigue. Quick, intensive, and revitalizing.',
    duration: '30 min',
    price: '₹699',
    badge: 'Fast Refresh',
    image: '/images/head-shoulder-relief.jpg',
    icon: <Zap className="w-8 h-8" />,
  },
  {
    id: 'express-foot-reflexology',
    category: 'express',
    categoryLabel: 'Express Wellness',
    title: 'Foot & Calves Reflexology',
    description: 'Therapeutic pressure-point reflexology promoting enhanced circulation, stress drainage, and lightness in steps.',
    duration: '45 min',
    price: '₹849',
    badge: 'Travel Favorite',
    image: '/images/foot-reflexology.jpg',
    icon: <Clock className="w-8 h-8" />,
  },
];

const ultraPremiumServices = [
  {
    id: 'nfc-card-holder-black',
    title: 'NFC Card Holder - Obsidian Black',
    description: 'Ultra-premium contactless VIP membership card holder crafted in obsidian black metal. Includes lifetime priority access and elite concierge.',
    duration: 'Lifetime',
    price: '₹25,000',
    image: '/images/nfc-card-black.jpg',
    icon: <Crown className="w-8 h-8" />,
  },
  {
    id: 'nfc-card-holder-gold',
    title: 'NFC Card Holder - 24K Gold Edition',
    description: 'The pinnacle of luxury. 24K gold plated NFC membership card holder providing ultimate VIP status, unlimited add-ons, and global spa access.',
    duration: 'Lifetime',
    price: '₹50,000',
    image: '/images/nfc-card-gold.jpg',
    icon: <Star className="w-8 h-8" />,
  },
];

const bodyTypeOptions = [
  { value: 'lean', label: 'Lean', emoji: '🏋️' },
  { value: 'skinny', label: 'Skinny', emoji: '👤' },
  { value: 'chubby', label: 'Chubby', emoji: '🧘' },
];

const ethnicityOptions = [
  { 
    value: 'malayali', 
    label: 'Malayali / Kerala Tradition', 
    flag: '🇮🇳', 
    desc: 'Local authentic Kerala Marma & Ayurvedic herbal relaxation',
    image: '/images/body-to-body.jpg',
    badge: 'Kerala Authentic'
  },
  { 
    value: 'thai', 
    label: 'Thai / Oriental Modality', 
    flag: '🇹🇭', 
    desc: 'Traditional Wat Pho acupressure, passive stretching & soothing flow',
    image: '/images/cross-massage.jpg',
    badge: 'Traditional Thai'
  },
];

const heroMassageImages = [
  {
    url: '/images/full-body-massage.jpg',
    title: 'Sensual Full Body Massage',
    tag: 'Female Therapist • Male Client Care',
    description: 'Deep therapeutic oil relaxation',
    area: 'Mavoor Road, Kozhikode',
    spaCenter: 'SPAVIBE Luxury Sanctuary (Suite 02)',
    specialty: 'Swedish & Aroma Specialist',
  },
  {
    url: '/images/couples-sanctuary.jpg',
    title: 'Unisex Spa Experience',
    tag: 'For Him & Her • Premium Wellness',
    description: 'Luxury treatments tailored for everyone in a serene atmosphere',
    area: 'Beach Road, Kozhikode',
    spaCenter: 'SPAVIBE Grand Retreat (Suite 05)',
    specialty: 'Deep Tissue & Hot Stone',
  },
  {
    url: '/images/body-to-body.jpg',
    title: 'Body-to-Body Therapy',
    tag: 'Signature Rejuvenation',
    description: 'Ultimate stress and muscle tension relief',
    area: 'Palayam, Kozhikode',
    spaCenter: 'SPAVIBE Signature Haven (Suite 01)',
    specialty: 'Body-to-Body & Signature Blend',
  },
  {
    url: '/images/cross-massage.jpg',
    title: 'Aromatic Essential Oil Massage',
    tag: 'Therapeutic Warm Oils',
    description: 'Revitalize your body and soothe your mind',
    area: 'Focus Mall Junction, Kozhikode',
    spaCenter: 'SPAVIBE Royal Pavilion (Suite 07)',
    specialty: 'Traditional Thai Massage',
  },
  {
    url: '/images/suite-presidential.jpg',
    title: 'Deep Tissue & Hot Stone',
    tag: 'Professional Female Therapists',
    description: 'Restores vitality and inner tranquility',
    area: 'Mavoor Road, Kozhikode',
    spaCenter: 'SPAVIBE Luxury Sanctuary (Suite 02)',
    specialty: 'Acupressure & Hot Stone',
  }
];

const testimonials = [
  {
    quote: "The privacy and attention to detail in Kozhikode are exceptional. Definitely the top relaxation therapy experience in Calicut.",
    author: "Rahul M.",
    city: "Calicut • Visited 5 times",
    rating: "★★★★★",
    avatar: "/images/avatar-1.jpg",
    sessionImage: "/images/suite-presidential.jpg",
    sessionRoom: "Presidential Suite 02 • Hot Stone Session"
  },
  {
    quote: "Professional therapists and spotless private suites. Completely refreshed after a long week of work.",
    author: "Shyam S.",
    city: "Malappuram • Regular Guest",
    rating: "★★★★★",
    avatar: "/images/avatar-2.jpg",
    sessionImage: "/images/apothecary-oils.jpg",
    sessionRoom: "Botanical Aroma Suite 05 • Full Body"
  },
  {
    quote: "Courteous staff, zero hassle with booking, and total discretion. Will definitely book another session soon.",
    author: "Dr. Arun K.",
    city: "Manjeri • Executive Client",
    rating: "★★★★★",
    avatar: "/images/avatar-3.jpg",
    sessionImage: "/images/suite-jacuzzi.jpg",
    sessionRoom: "Hydrotherapy Jacuzzi Suite • Executive Relax"
  }
];

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<ServiceCategory>('all');
  const [formData, setFormData] = useState<FormData>({
    service: '',
    bodyTypes: [],
    ethnicity: '',
    name: '',
    age: '',
    location: '',
    mobile: '',
  });
  const [, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [selectedTherapistPhoto, setSelectedTherapistPhoto] = useState<typeof heroMassageImages[0] | null>(null);

  // 5-second automatic slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % heroMassageImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const updateForm = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleBodyType = (type: string) => {
    setFormData(prev => {
      const current = prev.bodyTypes || [];
      const updated = current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type];
      return { ...prev, bodyTypes: updated };
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (step === 1 && !formData.service) {
      newErrors.service = 'Please select a service' as any;
      setErrors(newErrors);
      return false;
    }
    
    if (step === 2) {
      if (!formData.ethnicity) {
        newErrors.ethnicity = 'Please select therapist origin' as any;
        setErrors(newErrors);
        return false;
      }
      if (formData.bodyTypes.length === 0) {
        newErrors.bodyTypes = ['Please select at least one body type'] as any;
        setErrors(newErrors);
        return false;
      }
    }
    
    if (step === 3) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.age || parseInt(formData.age, 10) < 18) newErrors.age = 'Age must be 18+';
      if (!formData.location.trim()) newErrors.location = 'Location is required';
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return false;
      }
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      setErrors({});
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;

    const selectedService = services.find(s => s.id === formData.service);
    const bookingSummary = {
      ...formData,
      timestamp: new Date().toISOString(),
      serviceName: selectedService?.title,
      totalPrice: selectedService?.price,
      preferredTherapists: `${formData.bodyTypes.join(', ')} • ${formData.ethnicity}`,
    };
    
    console.log('🎉 BOOKING RECEIVED:', bookingSummary);
    
    setIsSubmitted(true);
    setShowModal(true);
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-wizard');
    if (bookingSection) {
      const offset = 80;
      const elementPosition = bookingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#121212] text-[#F8F9FA] overflow-x-hidden pt-16">

      {/* TOP TRUST & OPERATING DETAILS BAR (VISIBLE IMMEDIATELY ON LOAD - NO SCROLL NEEDED) */}
      <div className="bg-[#1A1518] border-b border-[#D48FB1]/20 py-3 relative z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center sm:justify-between items-center gap-x-8 gap-y-2 text-xs font-medium tracking-wider uppercase text-white/85">
          <div className="flex items-center gap-2.5 transition-colors cursor-default">
            <Clock className="w-4 h-4 text-[#D48FB1]" />
            <span>10:00 AM — 10:00 PM DAILY</span>
          </div>
          <div className="flex items-center gap-2.5 transition-colors cursor-default">
            <MapPin className="w-4 h-4 text-[#D48FB1]" />
            <span>KOZHIKODE, KERALA</span>
          </div>
          <a href="tel:+917306364454" className="flex items-center gap-2.5 hover:text-amber-300 transition-colors">
            <Phone className="w-4 h-4 text-[#D48FB1]" />
            <span>+91 7306 364 454</span>
          </a>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold cursor-default">
            <CheckCircle2 className="w-4 h-4" />
            <span>2000+ SATISFIED GUESTS</span>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative flex items-center pt-10 sm:pt-14 pb-16 lg:pb-20 bg-gradient-to-br from-[#151018] via-[#0C0A0D] to-[#1A101D] overflow-hidden">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D48FB1]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* LEFT SIDE: HERO WRITINGS & CALL TO ACTIONS */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 text-left"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <SpaVibeLogo size="xs" showTagline={false} />
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D48FB1]/10 border border-[#D48FB1]/30 text-[#D48FB1] text-xs tracking-[2.5px] uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#D48FB1] animate-ping" />
                KOZHIKODE, KERALA • LUXURY SANCTUARY
              </div>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6">
              Rejuvenate Body &amp; Soul in <br />
              <span className="italic font-normal rose-gold-gradient-text">Absolute Privacy</span>
            </h1>

            {/* Dynamic rotating slide details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <div className="text-amber-400 text-xs tracking-wider uppercase font-semibold mb-3">
                  ✦ {heroMassageImages[currentHeroIndex].title} ✦
                </div>
                <p className="text-base md:text-lg text-white/80 font-light leading-relaxed max-w-lg">
                  {heroMassageImages[currentHeroIndex].description}. Experience authentic full body therapy tailored for you by certified therapists.
                </p>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                type="button"
                onClick={scrollToBooking}
                className="group px-7 py-3.5 rose-gold-gradient-bg text-[#0C0A0D] rounded-xl font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.985] shadow-[0_0_30px_rgba(212,143,176,0.35)] cursor-pointer uppercase"
              >
                BOOK YOUR EXPERIENCE
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </button>
              
              <a 
                href="#services" 
                className="px-6 py-3.5 border border-[#D48FB1]/30 hover:border-[#D48FB1]/80 text-white rounded-xl text-xs font-medium tracking-wider flex items-center justify-center gap-1.5 transition-all hover:bg-[#D48FB1]/5 uppercase"
              >
                EXPLORE THERAPIES
              </a>
            </div>
            
            <div className="flex items-center gap-8 text-xs text-white/70 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#D48FB1] fill-[#D48FB1]" /> <span className="font-semibold text-white">4.98</span> (2000+ Reviews)
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="tracking-wider uppercase text-[11px] text-white/60">PRIVATE • LUXURY • DISCREET</div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: 5S ROTATING HERO MASSAGE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            <div 
              onClick={() => setSelectedTherapistPhoto(heroMassageImages[currentHeroIndex])}
              className="relative rounded-3xl overflow-hidden border border-[#D48FB1]/40 shadow-[0_0_50px_rgba(212,143,176,0.2)] bg-[#1A1A1A] group cursor-pointer"
              title="Click photo to view sanctuary suite & experience details"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="relative h-[380px] sm:h-[460px] md:h-[500px] w-full"
                >
                  <img
                    src={heroMassageImages[currentHeroIndex].url}
                    alt={heroMassageImages[currentHeroIndex].title}
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                    className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent rounded-3xl" />
                </motion.div>
              </AnimatePresence>

              {/* View Sanctuary Suite Details banner badge */}
              <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md border border-[#D48FB1]/40 text-[#D48FB1] text-[11px] font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg group-hover:bg-[#D48FB1] group-hover:text-black transition-all">
                <Eye className="w-3.5 h-3.5" />
                <span>Tap to view Sanctuary Suite &amp; Experience Details</span>
              </div>

              {/* Tag Overlay with Area & Spa Centre quick preview */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-10 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 max-w-[85%] shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#D48FB1] font-semibold tracking-wider uppercase">
                      {heroMassageImages[currentHeroIndex].tag}
                    </span>
                  </div>
                  <div className="text-base font-serif text-white font-medium mt-0.5">
                    {heroMassageImages[currentHeroIndex].title}
                  </div>
                  <div className="text-[11px] text-white/70 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{heroMassageImages[currentHeroIndex].area}</span>
                    <span className="text-white/30">•</span>
                    <span className="truncate text-amber-200/90">{heroMassageImages[currentHeroIndex].spaCenter.split('(')[0]}</span>
                  </div>
                </div>
                <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-xs text-white/80 font-mono">
                  0{currentHeroIndex + 1} / 0{heroMassageImages.length}
                </div>
              </div>

              {/* Prev/Next Buttons */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentHeroIndex((prev) => (prev === 0 ? heroMassageImages.length - 1 : prev - 1));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-[#D48FB1] text-white hover:text-black border border-white/20 transition-all backdrop-blur-md cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentHeroIndex((prev) => (prev + 1) % heroMassageImages.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-[#D48FB1] text-white hover:text-black border border-white/20 transition-all backdrop-blur-md cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="mt-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-2.5">
                {heroMassageImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentHeroIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                      currentHeroIndex === idx 
                        ? 'w-7 bg-[#D48FB1] shadow-[0_0_8px_#D48FB1]' 
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              
              <div className="text-[11px] text-white/50 tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Auto-rotates every 5s
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section id="services" className="py-24 bg-[#121212] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-10 justify-between items-end mb-12"
          >
            <div>
              <div className="rose-gold-gradient-text text-xs tracking-[3px] uppercase font-semibold">SIGNATURE EXPERIENCES</div>
              <h2 className="font-serif text-3xl md:text-5xl font-light mt-3 tracking-tight">Therapies crafted for <span className="italic rose-gold-gradient-text">pure bliss</span></h2>
            </div>
            <div className="max-w-sm text-sm text-white/60 font-light">
              Each experience is curated for privacy with the highest standards of hygiene, professionalism and discretion.
            </div>
          </motion.div>

          {/* INTERACTIVE CATEGORY FILTER BUTTONS */}
          <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2.5 sm:gap-3 mb-12">
            <button
              type="button"
              onClick={() => setSelectedServiceCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                selectedServiceCategory === 'all'
                  ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105'
                  : 'bg-[#1A1A1A] text-white/70 hover:text-white border border-white/10 hover:border-white/25 hover:bg-white/5'
              }`}
            >
              <span>All Therapies</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedServiceCategory === 'all' ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-white/60'
              }`}>
                {services.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedServiceCategory('therapeutic')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                selectedServiceCategory === 'therapeutic'
                  ? 'bg-[#D48FB1] text-black shadow-[0_0_20px_rgba(212,143,176,0.4)] scale-105'
                  : 'bg-[#1A1A1A] text-white/70 hover:text-white border border-white/10 hover:border-white/25 hover:bg-white/5'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Therapeutic Massage</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedServiceCategory === 'therapeutic' ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-white/60'
              }`}>
                {services.filter(s => s.category === 'therapeutic').length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedServiceCategory('couples')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                selectedServiceCategory === 'couples'
                  ? 'bg-[#D48FB1] text-black shadow-[0_0_20px_rgba(212,143,176,0.4)] scale-105'
                  : 'bg-[#1A1A1A] text-white/70 hover:text-white border border-white/10 hover:border-white/25 hover:bg-white/5'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Couples Packages</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedServiceCategory === 'couples' ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-white/60'
              }`}>
                {services.filter(s => s.category === 'couples').length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedServiceCategory('express')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                selectedServiceCategory === 'express'
                  ? 'bg-[#D48FB1] text-black shadow-[0_0_20px_rgba(212,143,176,0.4)] scale-105'
                  : 'bg-[#1A1A1A] text-white/70 hover:text-white border border-white/10 hover:border-white/25 hover:bg-white/5'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Express Wellness</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedServiceCategory === 'express' ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-white/60'
              }`}>
                {services.filter(s => s.category === 'express').length}
              </span>
            </button>
          </div>

          {/* DYNAMICALLY FILTERED SERVICE CARDS */}
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {services
                .filter(service => selectedServiceCategory === 'all' || service.category === selectedServiceCategory)
                .map((service, index) => (
                  <motion.div 
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="service-card group bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:border-[#D48FB1]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_25px_rgba(0,0,0,0.4)] relative overflow-hidden"
                  >
                    <div>
                      {/* PICTURE CONFIRMATION HEADER */}
                      <div className="relative h-44 -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-3xl bg-black">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-black/20 to-transparent" />
                        
                        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md p-2 rounded-xl text-[#D48FB1] border border-white/10">
                          {service.icon}
                        </div>

                        {service.badge && (
                          <span className="absolute top-3 right-3 text-[10px] tracking-wider uppercase bg-black/80 backdrop-blur-md text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded-full font-semibold shadow">
                            {service.badge}
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">
                        {service.categoryLabel}
                      </div>
                      
                      <h3 className="text-xl font-light mb-2.5 tracking-tight text-white group-hover:text-amber-200 transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-xs text-white/60 leading-relaxed mb-6 font-light">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-2">
                      <div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wider">DURATION: {service.duration}</div>
                        <div className="text-xs text-amber-400 uppercase font-semibold mt-1 tracking-wider">INVESTMENT: {service.price}</div>
                      </div>
                      
                      <button 
                        type="button"
                        onClick={() => {
                          updateForm('service', service.id);
                          scrollToBooking();
                        }}
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:border-[#D48FB1] group-hover:bg-[#D48FB1] group-hover:text-black group-hover:scale-110 transition-all cursor-pointer"
                        title={`Select ${service.title}`}
                        aria-label={`Select ${service.title}`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>

          {/* Pricing & Membership breakdown */}
          <div className="mt-16 bg-[#181417] border border-[#D48FB1]/20 rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-xs uppercase tracking-[3px] text-amber-400 font-semibold mb-2">MEMBERSHIP TIERS</div>
              <h3 className="font-serif text-2xl md:text-4xl font-light mb-4">Elevate Your Wellness Routine</h3>
              <p className="text-sm text-white/70 mb-8">Priority booking, exclusive therapist allocation, and bespoke concierge treatment.</p>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {/* Gold Membership Card with Picture Confirmation */}
                <div className="border border-white/10 bg-[#141014] rounded-3xl overflow-hidden group hover:border-[#D48FB1]/50 transition-all shadow-xl flex flex-col justify-between">
                  <div className="relative h-48 w-full bg-black overflow-hidden">
                    <img 
                      src="/images/full-body-massage.jpg" 
                      alt="Gold Membership Treatment Suite"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141014] via-black/30 to-transparent" />
                    <div className="absolute top-3 right-3 text-[10px] uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#D48FB1] border border-[#D48FB1]/40 px-2.5 py-1 rounded-full font-semibold">
                      MONTHLY PLAN
                    </div>
                    <div className="absolute bottom-2.5 left-3 text-[10px] text-white/90 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3 h-3 text-[#D48FB1]" />
                      <span>Gold Treatment Suite</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-2xl font-serif text-white mb-1">Gold Membership</div>
                    <div className="text-sm text-[#D48FB1] font-medium mb-3">₹4,999 / month</div>
                    <div className="text-sm text-white/70 leading-relaxed">Includes 4 Full Body Massages + 2 Cross Massages and all Premium benefits. Save 30%.</div>
                  </div>
                </div>

                {/* Annual VIP Membership Card */}
                <div className="border-2 border-amber-500/50 bg-[#161114] rounded-3xl overflow-hidden group hover:border-amber-400 transition-all shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col justify-between relative">
                  <div className="relative h-48 w-full bg-black overflow-hidden">
                    <img 
                      src="/images/suite-presidential.jpg" 
                      alt="Presidential VIP Sanctuary Suite"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161114] via-black/30 to-transparent" />
                    <div className="absolute top-3 right-3 text-[10px] tracking-wider uppercase bg-amber-400 text-black px-2.5 py-1 rounded-full font-bold shadow">
                      VIP TIER
                    </div>
                    <div className="absolute bottom-2.5 left-3 text-[10px] text-amber-300 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-400/40 flex items-center gap-1.5 font-semibold">
                      <Crown className="w-3 h-3 text-amber-400" />
                      <span>Presidential Sanctuary</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-2xl font-serif text-amber-400 mb-1">Annual VIP Membership</div>
                    <div className="text-sm text-amber-300 font-medium mb-3">₹49,999 / year</div>
                    <div className="text-sm text-white/70 leading-relaxed">Exclusive yearly access including bi-monthly packages and full concierge perks.</div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs text-white/50">
                      <span>DURATION: Yearly</span>
                      <span className="text-amber-400 font-semibold">INVESTMENT: ₹49,999</span>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="button"
                onClick={scrollToBooking} 
                className="mt-8 px-10 py-3.5 rose-gold-gradient-bg text-[#0C0A0D] font-semibold rounded-xl tracking-wider hover:scale-105 transition-transform cursor-pointer text-xs uppercase"
              >
                CLAIM VIP MEMBERSHIP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ULTRA PREMIUM CATEGORY */}
      <section id="ultra-premium" className="py-24 bg-[#0C0A0D] border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row gap-12 items-end mb-12"
          >
            <div className="flex-1">
              <div className="uppercase text-[#D48FB1] tracking-[3px] text-xs mb-2">ULTRA PREMIUM CATEGORY</div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-tight">NFC Card<br />Holders</h2>
            </div>
            <div className="flex-1 max-w-md text-sm text-white/70">
              The ultimate status symbol. Our exclusive NFC-enabled membership card holders grant you seamless tap-to-access entry, lifetime perks, and unparalleled VIP treatment.
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {ultraPremiumServices.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#D48FB1]/20 rounded-3xl p-8 flex flex-col hover:border-[#D48FB1]/60 transition-all duration-300 shadow-[0_0_20px_rgba(212,143,176,0.05)] hover:shadow-[0_0_40px_rgba(212,143,176,0.15)] overflow-hidden"
              >
                {/* Visual Picture Confirmation */}
                <div className="relative h-48 -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-3xl bg-black">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md p-2 rounded-xl text-[#D48FB1] border border-white/10">
                    {service.icon}
                  </div>
                  
                  <div className="absolute top-4 right-4 text-[10px] tracking-[2px] bg-black/80 backdrop-blur-md border border-[#D48FB1]/40 px-3 py-1 rounded-full uppercase text-[#D48FB1] font-semibold">
                    INVITE ONLY
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif mb-3 tracking-tight text-white">{service.title}</h3>
                
                <p className="text-sm text-white/60 flex-1 leading-relaxed mb-8">
                  {service.description}
                </p>
                
                <div className="flex justify-between items-end border-t border-white/10 pt-6 mb-8">
                  <div>
                    <div className="text-[10px] text-white/40 uppercase">VALIDITY</div>
                    <div className="text-xl font-light text-white mt-0.5">{service.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/40 uppercase">INVESTMENT</div>
                    <div className="text-2xl font-serif text-[#D48FB1] mt-0.5 tracking-tight">{service.price}</div>
                  </div>
                </div>
                
                <button 
                  type="button"
                  onClick={scrollToBooking}
                  className="w-full text-xs font-semibold bg-[#D48FB1] hover:bg-white text-black transition-colors py-4 rounded-xl flex items-center justify-center gap-2 tracking-widest uppercase cursor-pointer"
                >
                  REQUEST ACCESS
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE BOOKING WIZARD */}
      <section id="booking-wizard" className="bg-gradient-to-b from-[#1A1518] via-[#0C0A0D] to-[#0C0A0D] py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline text-[11px] font-semibold tracking-[3px] bg-[#D48FB1]/10 border border-[#D48FB1]/30 px-5 py-1.5 rounded-full rose-gold-gradient-text uppercase">EXCLUSIVE FOR YOU</div>
            <h2 className="font-serif text-3xl md:text-4xl font-light mt-4 tracking-tight">Begin your <span className="italic rose-gold-gradient-text">journey</span></h2>
            <p className="text-sm text-white/60 font-light max-w-xs mx-auto mt-2">Our expert team will match you with the perfect therapist based on your preferences</p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative max-w-md mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                onClick={() => {
                  if (step < currentStep || (step === currentStep + 1 && validateStep(currentStep))) {
                    setCurrentStep(step);
                  }
                }}
                className={`step-dot cursor-pointer flex flex-col items-center relative z-10 ${currentStep >= step ? 'text-[#D48FB1]' : 'text-white/30'}`}
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium border-2 transition-all ${currentStep >= step ? 'border-[#D48FB1] rose-gold-gradient-bg text-[#0C0A0D] shadow-[0_0_15px_rgba(212,143,176,0.3)]' : 'border-white/20 bg-[#0C0A0D]'}`}>
                  {step}
                </div>
                <div className="text-[10px] mt-2.5 font-semibold tracking-widest uppercase">STEP {step}</div>
              </div>
            ))}
            
            {/* Progress line */}
            <div className="absolute top-4.5 left-0 right-0 h-[2px] bg-white/10">
              <div 
                className="h-[2px] rose-gold-gradient-bg transition-all duration-700 shadow-[0_0_10px_#D48FB1]" 
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-14 shadow-2xl border border-[#D48FB1]/25">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* STEP 1: SERVICE SELECTION */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="uppercase text-xs tracking-widest text-[#D48FB1] mb-1">STEP 01 — SERVICE</div>
                      <h3 className="text-2xl font-light">Choose your therapy</h3>
                    </div>
                    
                    <div className="grid gap-4">
                      {services.map((service) => (
                        <div 
                          key={service.id}
                          onClick={() => updateForm('service', service.id)}
                          className={`service-card flex items-center gap-4 sm:gap-5 border-2 p-4 sm:p-5 rounded-2xl cursor-pointer group transition-all ${formData.service === service.id ? 'selected' : 'border-white/10 hover:border-white/30'}`}
                        >
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-white/15 bg-black">
                            <img 
                              src={service.image} 
                              alt={service.title}
                              referrerPolicy="no-referrer"
                              onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 truncate">
                                <span className="text-base sm:text-lg font-light truncate">{service.title}</span>
                                {service.badge && (
                                  <span className="text-[9px] uppercase tracking-wider bg-[#D48FB1]/10 text-[#D48FB1] border border-[#D48FB1]/30 px-2 py-0.5 rounded-full font-semibold shrink-0">
                                    {service.badge}
                                  </span>
                                )}
                              </div>
                              <div className="font-mono text-[#D48FB1] text-base shrink-0">{service.price}</div>
                            </div>
                            <div className="text-xs sm:text-sm text-white/50 mt-1 line-clamp-2">{service.description}</div>
                            <div className="flex items-center justify-between text-xs text-white/40 mt-2">
                              <span>Duration: {service.duration}</span>
                              <span className="text-white/30 uppercase text-[10px]">{service.categoryLabel}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {errors.service && (
                      <p className="text-red-400 text-xs mt-2">{errors.service}</p>
                    )}

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl text-xs font-semibold tracking-wider hover:bg-[#D48FB1] transition-colors cursor-pointer"
                      >
                        NEXT: THERAPIST PREFERENCES <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: THERAPIST PREFERENCES */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-8"
                  >
                    <div>
                      <div className="uppercase text-xs tracking-widest text-[#D48FB1] mb-1">STEP 02 — THERAPIST</div>
                      <h3 className="text-2xl font-light">Customise your preference</h3>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-4 text-white/70">Preferred Origin</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ethnicityOptions.map((opt) => (
                          <div 
                            key={opt.value}
                            onClick={() => updateForm('ethnicity', opt.value)}
                            className={`group rounded-2xl border-2 overflow-hidden cursor-pointer transition-all ${formData.ethnicity === opt.value ? 'selected border-amber-400 bg-amber-400/10' : 'border-white/10 hover:border-white/25 bg-black/40'}`}
                          >
                            <div className="relative h-32 w-full bg-black overflow-hidden">
                              <img 
                                src={opt.image} 
                                alt={opt.label}
                                referrerPolicy="no-referrer"
                                onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                              <div className="absolute top-2.5 left-2.5 text-xl bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10">
                                {opt.flag}
                              </div>
                              <div className="absolute top-2.5 right-2.5 text-[9px] uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-semibold">
                                {opt.badge}
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="font-medium text-white text-sm">{opt.label}</div>
                              <div className="text-xs text-white/50 mt-1 leading-relaxed">{opt.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.ethnicity && (
                        <p className="text-red-400 text-xs mt-2">{errors.ethnicity}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-4 text-white/70">Therapist Body Type (Select one or more)</label>
                      <div className="grid grid-cols-3 gap-4">
                        {bodyTypeOptions.map((opt) => {
                          const isSelected = formData.bodyTypes.includes(opt.value);
                          return (
                            <div 
                              key={opt.value}
                              onClick={() => toggleBodyType(opt.value)}
                              className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${isSelected ? 'selected' : 'border-white/10 hover:border-white/25'}`}
                            >
                              <div className="text-2xl mb-1">{opt.emoji}</div>
                              <div className="text-sm font-medium text-white">{opt.label}</div>
                            </div>
                          );
                        })}
                      </div>
                      {errors.bodyTypes && (
                        <p className="text-red-400 text-xs mt-2">{errors.bodyTypes}</p>
                      )}
                    </div>

                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-8 py-4 border border-white/20 text-white/80 rounded-xl text-xs tracking-wider hover:bg-white/5 cursor-pointer"
                      >
                        BACK
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl text-xs font-semibold tracking-wider hover:bg-[#D48FB1] transition-colors cursor-pointer"
                      >
                        NEXT: YOUR DETAILS <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PERSONAL INFORMATION */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="uppercase text-xs tracking-widest text-[#D48FB1] mb-1">STEP 03 — CONTACT</div>
                      <h3 className="text-2xl font-light">Enter Reservation Details</h3>
                      <p className="text-white/60 text-xs mt-1">Your identity and information are strictly private.</p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-2 text-white/60">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateForm('name', e.target.value)}
                          className="w-full bg-[#0C0A0D]/60 border border-white/20 focus:border-[#D48FB1] rounded-xl px-5 py-3.5 text-sm placeholder:text-white/30 outline-none transition-colors"
                          placeholder="e.g. Rahul Menon"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-white/60">Age (18+)</label>
                          <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => updateForm('age', e.target.value)}
                            min="18"
                            className="w-full bg-[#0C0A0D]/60 border border-white/20 focus:border-[#D48FB1] rounded-xl px-5 py-3.5 text-sm placeholder:text-white/30 outline-none transition-colors"
                            placeholder="28"
                          />
                          {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-white/60">City / Place</label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => updateForm('location', e.target.value)}
                            className="w-full bg-[#0C0A0D]/60 border border-white/20 focus:border-[#D48FB1] rounded-xl px-5 py-3.5 text-sm placeholder:text-white/30 outline-none transition-colors"
                            placeholder="e.g. Kozhikode / Mavoor Road"
                          />
                          {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-2 text-white/60">Mobile Number (For WhatsApp Confirmation)</label>
                        <div className="flex">
                          <div className="bg-white/10 border border-r-0 border-white/20 px-4 flex items-center text-sm rounded-l-xl text-white/80">+91</div>
                          <input
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => updateForm('mobile', e.target.value)}
                            className="flex-1 bg-[#0C0A0D]/60 border border-white/20 focus:border-[#D48FB1] rounded-r-xl px-5 py-3.5 text-sm placeholder:text-white/30 outline-none transition-colors"
                            placeholder="7306 364 454"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-8 py-4 border border-white/20 text-white/80 rounded-xl text-xs tracking-wider hover:bg-white/5 cursor-pointer"
                      >
                        BACK
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl text-xs font-semibold tracking-wider hover:bg-[#D48FB1] transition-colors cursor-pointer"
                      >
                        REVIEW SUMMARY <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: REVIEW & CONFIRM */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <div className="uppercase text-xs tracking-widest text-[#D48FB1] mb-1">STEP 04 — CONFIRMATION</div>
                      <h3 className="text-2xl font-light">Confirm Your Reservation</h3>
                    </div>

                    <div className="bg-[#151216] rounded-2xl p-6 border border-white/10 space-y-4 text-sm">
                      {/* PICTURE CONFIRMATION OF SELECTED THERAPY */}
                      {services.find(s => s.id === formData.service)?.image && (
                        <div className="relative h-36 rounded-xl overflow-hidden border border-white/15 mb-2 bg-black">
                          <img 
                            src={services.find(s => s.id === formData.service)?.image} 
                            alt="Selected Therapy Preview"
                            referrerPolicy="no-referrer"
                            onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                            <span className="font-semibold text-white flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>{services.find(s => s.id === formData.service)?.title}</span>
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="text-white/50">Selected Therapy</span>
                        <span className="font-medium text-amber-400">
                          {services.find(s => s.id === formData.service)?.title} ({services.find(s => s.id === formData.service)?.price})
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="text-white/50">Therapist Preference</span>
                        <span className="capitalize">{formData.bodyTypes.join(', ') || 'Any'} • {formData.ethnicity || 'Any'}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="text-white/50">Guest Name</span>
                        <span>{formData.name}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="text-white/50">Age &amp; Location</span>
                        <span>{formData.age} yrs • {formData.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/50">WhatsApp Mobile</span>
                        <span>{formData.mobile ? `+91 ${formData.mobile}` : 'Provided via WhatsApp'}</span>
                      </div>
                    </div>

                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-8 py-4 border border-white/20 text-white/80 rounded-xl text-xs tracking-wider hover:bg-white/5 cursor-pointer"
                      >
                        BACK
                      </button>
                      <button
                        type="submit"
                        className="rose-gold-gradient-bg text-[#0C0A0D] px-10 py-4 rounded-xl text-xs font-semibold tracking-wider hover:scale-[1.02] active:scale-[0.985] transition-all shadow-[0_0_30px_rgba(212,143,176,0.4)] cursor-pointer uppercase"
                      >
                        CONFIRM &amp; RESERVE SESSION
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>

      {/* SANCTUARY SECTION */}
      <section id="about" className="py-24 bg-[#0C0A0D] relative overflow-hidden border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
          >
            <div className="sticky top-28">
              <SpaVibeLogo size="sm" showTagline={true} className="mb-4" />
              <div className="uppercase tracking-[3px] text-[11px] font-semibold text-amber-400">OUR SANCTUARY IN KOZHIKODE</div>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight leading-snug mt-3">
                A private retreat designed for <span className="italic rose-gold-gradient-text">absolute comfort</span> &amp; rejuvenation.
              </h2>
              
              {/* BRAND COPY STANDARDIZED */}
              <div className="mt-6 max-w-md text-base text-white/75 font-light leading-relaxed">
                Located in a serene corner of Kozhikode, SPAVIBE offers a completely private and luxurious environment where you can unwind without any distractions.
              </div>
              
              <div className="flex gap-10 mt-12">
                <div className="transition-transform hover:-translate-y-1">
                  <div className="font-serif text-4xl md:text-5xl font-normal rose-gold-gradient-text">7</div>
                  <div className="text-[10px] tracking-[2px] mt-2 uppercase text-white/50 font-semibold">PRIVATE SUITES</div>
                </div>
                <div className="transition-transform hover:-translate-y-1">
                  <div className="font-serif text-4xl md:text-5xl font-normal rose-gold-gradient-text">14</div>
                  <div className="text-[10px] tracking-[2px] mt-2 uppercase text-white/50 font-semibold">CERTIFIED THERAPISTS</div>
                </div>
                <div className="transition-transform hover:-translate-y-1">
                  <div className="font-serif text-4xl md:text-5xl font-normal rose-gold-gradient-text">98%</div>
                  <div className="text-[10px] tracking-[2px] mt-2 uppercase text-white/50 font-semibold">REPEAT CLIENTS</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 space-y-8"
          >
            <div className="glass-card p-8 rounded-3xl border border-[#D48FB1]/20 relative overflow-hidden transition-all duration-300 hover:border-[#D48FB1]/40">
              <div className="text-[#D48FB1] mb-6">
                <Star className="w-8 h-8 fill-[#D48FB1]" />
              </div>
              <div className="font-serif italic text-lg leading-relaxed text-white/90">
                &quot;The most professional and relaxing experience I have had in Kerala. The therapists are highly skilled and respectful. I felt completely at ease.&quot;
              </div>
              <div className="flex gap-3 mt-10 text-sm">
                <div className="w-8 h-px bg-[#D48FB1]/50 self-center"></div>
                <div>
                  <div className="font-semibold text-xs tracking-wider text-white">SHYAM SUNDER</div>
                  <div className="text-[10px] text-white/40 uppercase">Calicut • Visited 4 times</div>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-white/70 font-light border-l-2 border-[#D48FB1] pl-6 py-1 leading-relaxed">
              Discretion and hygiene are our highest priorities. Every room is sanitized between sessions. All therapists are background checked and professionally trained.
            </div>
          </motion.div>
        </div>

        {/* SANCTUARY SUITES GALLERY */}
        <div className="max-w-6xl mx-auto px-6 mt-16 pt-12 border-t border-white/10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-1">PHOTO TOUR &amp; SUITES</div>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-light">Sanctuary Suites &amp; Facilities</h3>
              <p className="text-white/60 text-xs mt-1">Explore our private suites, hydrotherapy baths, and lounge in Kozhikode.</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium self-start md:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>6 Private Facility Suites</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Photo 1: Royal Suite 02 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-black h-64 shadow-xl">
              <img 
                src="/images/suite-presidential.jpg"
                alt="SPAVIBE Suite 02 Presidential Royal Suite"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase block">SUITE 02 SANCTUARY</span>
                <span className="text-sm font-medium text-white block">Presidential Treatment Bed</span>
                <span className="text-[10px] text-white/60 block mt-0.5">Teakwood • Rose Petals • Ambient Lighting</span>
              </div>
            </div>

            {/* Photo 2: Private Jacuzzi */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-black h-64 shadow-xl">
              <img 
                src="/images/suite-jacuzzi.jpg"
                alt="SPAVIBE Private Heated Herbal Jacuzzi"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase block">HYDROTHERAPY POOL</span>
                <span className="text-sm font-medium text-white block">Herbal Jacuzzi &amp; Bath</span>
                <span className="text-[10px] text-white/60 block mt-0.5">Warm Steam • Essential Salts • Candles</span>
              </div>
            </div>

            {/* Photo 3: Dual Couple Suite */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-black h-64 shadow-xl">
              <img 
                src="/images/suite-couples.jpg"
                alt="SPAVIBE Adjoining Couples Suite"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase block">EXECUTIVE RETREAT</span>
                <span className="text-sm font-medium text-white block">Dual Massage Pavilion</span>
                <span className="text-[10px] text-white/60 block mt-0.5">Adjoining Room • Acoustic Sound Bath</span>
              </div>
            </div>

            {/* Photo 4: Herbal Oil Dispensary */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-black h-64 shadow-xl">
              <img 
                src="/images/apothecary-oils.jpg"
                alt="SPAVIBE Aroma Essential Oil Dispensary"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase block">APOTHECARY &amp; OILS</span>
                <span className="text-sm font-medium text-white block">Warm Botanical Blends</span>
                <span className="text-[10px] text-white/60 block mt-0.5">Kerala Medicated Kizhies &amp; Aromas</span>
              </div>
            </div>

            {/* Photo 5: Welcome Concierge & Tea Lounge */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-black h-64 shadow-xl">
              <img 
                src="/images/reception-lounge.jpg"
                alt="SPAVIBE Reception & Concierge Welcome Lounge"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase block">RECEPTION &amp; CONCIERGE</span>
                <span className="text-sm font-medium text-white block">Welcome Tea Lounge</span>
                <span className="text-[10px] text-white/60 block mt-0.5">Teakwood Interior • Orchid Flowers</span>
              </div>
            </div>

            {/* Photo 6: Vichy Shower & Steam Sanctuary */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-black h-64 shadow-xl">
              <img 
                src="/images/hydrotherapy-steam.jpg"
                alt="SPAVIBE Vichy Shower & Private Steam Sanctuary"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase block">HYDROTHERAPY SUITE</span>
                <span className="text-sm font-medium text-white block">Private Steam &amp; Vichy Bath</span>
                <span className="text-[10px] text-white/60 block mt-0.5">Eucalyptus Mist • Detox Shower</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="bg-gradient-to-b from-[#151018] to-[#0C0A0D] py-24 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="rose-gold-gradient-text text-xs tracking-[3px] uppercase font-semibold">TESTIMONIALS</div>
            <div className="font-serif text-2xl md:text-4xl font-light mt-2">What our <span className="italic rose-gold-gradient-text">guests say</span></div>
            <p className="text-xs text-white/50 mt-2">Authentic reflections from guests who experienced relaxation at our Kozhikode sanctuary.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl border border-[#D48FB1]/20 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                {/* Header of Guest's Session Suite */}
                <div className="relative h-44 w-full bg-black overflow-hidden">
                  <img 
                    src={t.sessionImage} 
                    alt={t.sessionRoom}
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151018] via-black/20 to-transparent" />

                  <div className="absolute bottom-2.5 left-3 right-3 text-[10px] text-white/80 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 truncate font-mono">
                    {t.sessionRoom}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-3xl rose-gold-gradient-text font-serif leading-none mb-3">“</div>
                    <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">{t.quote}</p>
                  </div>
                  
                  <div>
                    <div className="h-px bg-white/10 my-5"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={t.avatar} 
                          alt={t.author} 
                          referrerPolicy="no-referrer"
                          onError={(e) => { e.currentTarget.src = '/images/avatar-1.jpg'; }}
                          className="w-9 h-9 rounded-full object-cover border border-[#D48FB1]/40"
                        />
                        <div>
                          <div className="text-xs font-semibold text-white">{t.author}</div>
                          <div className="text-[10px] text-white/50">{t.city}</div>
                        </div>
                      </div>
                      <div className="text-amber-400 text-xs tracking-wider">{t.rating}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <FAQ />

      {/* FINAL CTA */}
      <div className="bg-[#0C0A0D] py-20 text-center border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6">
          <div className="font-serif text-3xl md:text-5xl font-light mb-4 tracking-tight">Your peaceful escape awaits.</div>
          <p className="text-white/60 text-sm font-light mb-8">Direct booking with full confidentiality in Kozhikode, Kerala.</p>
          <button 
            type="button"
            onClick={scrollToBooking}
            className="px-10 py-4 rose-gold-gradient-bg text-[#0C0A0D] font-semibold text-xs tracking-widest rounded-full hover:scale-105 transition-all cursor-pointer uppercase shadow-[0_0_30px_rgba(212,143,176,0.3)]"
          >
            RESERVE NOW
          </button>
        </div>
      </div>

      {/* FOOTER (FIXED & STANDARDIZED) */}
      <Footer />

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="modal bg-[#121212] max-w-md w-full rounded-3xl p-8 border border-[#D48FB1]/30 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-[#D48FB1] flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-[#D48FB1]" />
              </div>
              
              <div className="text-2xl font-light tracking-tight mb-2">Thank you, {formData.name.split(' ')[0] || 'Guest'}!</div>
              <p className="text-white/70 text-sm">Your reservation request has been received.</p>
              
              <div className="my-6 text-left bg-black/40 rounded-2xl p-5 text-xs space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/50">Session</span>
                  <span className="font-medium text-white">{services.find(s => s.id === formData.service)?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Preferred</span>
                  <span className="capitalize text-white">{formData.bodyTypes.join(', ') || 'Any'} • {formData.ethnicity || 'Any'}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3">
                  <span className="text-white/50">Confirmation</span>
                  <span className="font-medium text-emerald-400">WhatsApp / Call (+91 7306 364 454)</span>
                </div>
              </div>
              
              <div className="text-xs text-white/40 mb-6">Our concierge team will contact you shortly to confirm session time. Expected response within 15 minutes.</div>
              
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/917306364454?text=Hello%20SPAVIBE,%20I%20just%20submitted%20a%20reservation%20for%20${encodeURIComponent(services.find(s => s.id === formData.service)?.title || 'Massage')}.%20Name:%20${encodeURIComponent(formData.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  Confirm on WhatsApp
                </a>
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-3 px-5 text-xs tracking-wider border border-white/30 rounded-xl hover:bg-white/5 text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* THERAPIST PHOTO DETAIL MODAL (AREA, SPA CENTRE, AGE) */}
      <AnimatePresence>
        {selectedTherapistPhoto && (
          <div 
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md"
            onClick={() => setSelectedTherapistPhoto(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#18131B] border border-amber-500/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedTherapistPhoto(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/75 border border-white/20 text-white hover:text-amber-400 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Header */}
              <div className="relative h-64 sm:h-72 w-full bg-black">
                <img 
                  src={selectedTherapistPhoto.url} 
                  alt={selectedTherapistPhoto.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/images/suite-presidential.jpg'; }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18131B] via-transparent to-black/40" />

                <div className="absolute bottom-4 left-6 right-6 z-10">
                  <span className="text-[11px] uppercase tracking-widest text-[#D48FB1] font-semibold">
                    SPAVIBE SANCTUARY &amp; THERAPY
                  </span>
                  <div className="flex items-center gap-2.5 mt-1">
                    <h3 className="font-serif text-3xl font-light text-white">
                      {selectedTherapistPhoto.title}
                    </h3>
                  </div>
                  <p className="text-white/75 text-xs font-light">{selectedTherapistPhoto.specialty}</p>
                </div>
              </div>

              {/* Body Metadata: Area, Spa Centre, Treatment */}
              <div className="p-6 sm:p-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-black/40 rounded-2xl p-4 border border-white/10">
                  {/* Category / Modality */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0 text-amber-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Therapy Modality</div>
                      <div className="text-sm font-semibold text-white mt-0.5">{selectedTherapistPhoto.tag.split('•')[0].trim()}</div>
                    </div>
                  </div>

                  {/* Area */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#D48FB1]/10 flex items-center justify-center shrink-0 text-[#D48FB1]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Operating Area</div>
                      <div className="text-sm font-semibold text-white mt-0.5">{selectedTherapistPhoto.area}</div>
                    </div>
                  </div>

                  {/* Spa Centre Belonging */}
                  <div className="sm:col-span-2 flex items-start gap-2.5 pt-2 border-t border-white/5">
                    <div className="w-8 h-8 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0 text-amber-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Spa Centre Branch</div>
                      <div className="text-sm font-semibold text-amber-200 mt-0.5">{selectedTherapistPhoto.spaCenter}</div>
                    </div>
                  </div>
                </div>

                {/* Session Focus */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Featured Therapy</div>
                  <div className="text-sm font-medium text-white">{selectedTherapistPhoto.title}</div>
                  <div className="text-xs text-white/60 font-light mt-1">{selectedTherapistPhoto.description}</div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/917306364454?text=Hello%20SPAVIBE,%20I%20would%20like%20to%20inquire%20about%20booking%20${encodeURIComponent(selectedTherapistPhoto.title)}%20at%20${encodeURIComponent(selectedTherapistPhoto.spaCenter)}%20(${encodeURIComponent(selectedTherapistPhoto.area)}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-black font-semibold text-xs tracking-wider rounded-xl uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    <Phone className="w-4 h-4" />
                    Inquire on WhatsApp
                  </a>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTherapistPhoto(null);
                      scrollToBooking();
                    }}
                    className="px-6 py-3.5 border border-white/20 hover:bg-white/5 text-white/80 rounded-xl text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                  >
                    Select in Wizard
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
