'use client';

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
  User,
  ChevronLeft,
  ChevronRight,
  Crown
} from 'lucide-react';


interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
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
  {
    id: 'body-to-body',
    title: 'Body-to-Body Massage',
    description: 'Sensual full contact experience with aromatic oils for ultimate relaxation',
    duration: '90 min',
    price: '₹1500',
    icon: <Flower2 className="w-8 h-8" />,
  },
  {
    id: 'full-body',
    title: 'Full Body Massage',
    description: 'Deep tissue therapeutic massage to relieve stress and muscle tension',
    duration: '60 min',
    price: '₹1000',
    icon: <Heart className="w-8 h-8" />,
  },
  {
    id: 'cross',
    title: 'Cross Massage',
    description: 'Signature fusion therapy combining traditional and modern techniques',
    duration: '75 min',
    price: '₹1299',
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: 'annual-premium',
    title: 'Annual Premium',
    description: 'Exclusive yearly membership including take away service in alternative months and VIP perks',
    duration: 'Yearly',
    price: '₹15000',
    icon: <Star className="w-8 h-8" />,
  },
];

const ultraPremiumServices = [
  {
    id: 'nfc-card-holder-black',
    title: 'NFC Card Holder - Obsidian Black',
    description: 'Ultra-premium contactless VIP membership card holder crafted in obsidian black metal. Includes lifetime priority access and elite concierge.',
    duration: 'Lifetime',
    price: '₹25000',
    icon: <Crown className="w-8 h-8" />,
  },
  {
    id: 'nfc-card-holder-gold',
    title: 'NFC Card Holder - 24K Gold Edition',
    description: 'The pinnacle of luxury. 24K gold plated NFC membership card holder providing ultimate VIP status, unlimited add-ons, and global spa access.',
    duration: 'Lifetime',
    price: '₹50000',
    icon: <Star className="w-8 h-8" />,
  }
];

const bodyTypeOptions = [
  { value: 'lean', label: 'Lean', emoji: '🏋️' },
  { value: 'skinny', label: 'Skinny', emoji: '👤' },
  { value: 'chubby', label: 'Chubby', emoji: '🧘' },
];

const ethnicityOptions = [
  { value: 'malayali', label: 'Malayali', flag: '🇮🇳', desc: 'Local expertise' },
  { value: 'thai', label: 'Thai', flag: '🇹🇭', desc: 'Traditional techniques' },
];

const heroMassageImages = [
  {
    url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=80',
    title: 'Sensual Full Body Massage',
    tag: 'Female Therapist • Male Client Care',
    description: 'Deep therapeutic oil relaxation'
  },
  {
    url: 'https://images.unsplash.com/photo-1591343395082-e120571a5903?auto=format&fit=crop&w=2000&q=80',
    title: 'Unisex Spa Experience',
    tag: 'For Him & Her • Premium Wellness',
    description: 'Luxury treatments tailored for everyone in a serene atmosphere'
  },
  {
    url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=2000&q=80',
    title: 'Body-to-Body Therapy',
    tag: 'Signature Rejuvenation',
    description: 'Ultimate stress and muscle tension relief'
  },
  {
    url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=2000&q=80',
    title: 'Aromatic Essential Oil Massage',
    tag: 'Therapeutic Warm Oils',
    description: 'Revitalize your body and soothe your mind'
  },
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80',
    title: 'Deep Tissue & Hot Stone',
    tag: 'Professional Female Therapists',
    description: 'Restores vitality and inner tranquility'
  }
];


export default function SpaLanding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    service: '',
    bodyTypes: [],
    ethnicity: '',
    name: '',
    age: '',
    location: '',
    mobile: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);


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
      if (!formData.age || parseInt(formData.age) < 18) newErrors.age = 'Age must be 18+';
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

    // Log booking summary (ready for backend / WhatsApp integration)
    const bookingSummary = {
      ...formData,
      timestamp: new Date().toISOString(),
      serviceName: services.find(s => s.id === formData.service)?.title,
      totalPrice: services.find(s => s.id === formData.service)?.price,
      preferredTherapists: `${formData.bodyTypes.join(', ')} ${formData.ethnicity}`,
    };
    
    console.log('🎉 BOOKING RECEIVED:', bookingSummary);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setShowModal(true);
      
      // Reset form after 4 seconds
      setTimeout(() => {
        setShowModal(false);
        setCurrentStep(1);
        setFormData({
          service: '',
          bodyTypes: [],
          ethnicity: '',
          name: '',
          age: '',
          location: '',
          mobile: '',
        });
        setIsSubmitted(false);
      }, 4200);
    }, 800);
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
    <div className="bg-[#121212] text-[#F8F9FA] overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080B09]/85 backdrop-blur-xl border-b border-[#D4AF37]/20 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="2.5" fill="currentColor" stroke="none" />
              <path d="M12 9c-3.5 0-5 3.5-5 6 0 2.5 1.5 4 1.5 6 0 1-1 2-1 2" />
              <path d="M12 9c3.5 0 5 3.5 5 6 0 2.5-1.5 4-1.5 6 0 1 1 2 1 2" />
              <path d="M7 14c-1.5 0-3-1.5-3-3" />
              <path d="M17 14c1.5 0 3-1.5 3-3" />
            </svg>
            <div className="font-serif text-xl tracking-widest font-semibold text-white">ME2SPA</div>
          </div>
          <div className="flex items-center gap-6 sm:gap-8 text-[10px] sm:text-xs font-semibold tracking-wider">
            <a href="#services" className="text-white/70 hover:text-[#D4AF37] transition-colors hidden sm:block">SERVICES</a>
            <a href="#premium" className="text-[#D4AF37] hover:text-white transition-colors">PREMIUM</a>
            <button onClick={scrollToBooking} className="gold-gradient-bg text-[#080B09] px-4 sm:px-5 py-2 rounded-xl transition-transform hover:scale-105 cursor-pointer">BOOK NOW</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION WITH WRITINGS ON LEFT & PROMINENT 5S ROTATING MASSAGE IMAGE ON RIGHT */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-28 pb-20 bg-gradient-to-br from-[#091510] via-[#080B09] to-[#0A1D16] overflow-hidden">
        {/* Ambient luxury light glows */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#0A261C]/50 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          {/* LEFT SIDE: WRITINGS & BUTTONS */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 text-left"
          >
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs tracking-[2px] mb-6 border border-[#D4AF37]/30 text-[#D4AF37]">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#10B981]"></div>
              ME2SPA • PREMIUM
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight mb-5">
              <span className="text-white">REJUVENATE</span><br />
              <span className="gold-gradient-text font-normal italic">YOUR BODY &amp; MIND</span>
            </h1>
            
            {/* Dynamic Slide Title Tag & Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs tracking-[2px] uppercase font-semibold mb-3">
                  ✦ {heroMassageImages[currentHeroIndex].title} ✦
                </div>
                <p className="text-base md:text-lg text-white/80 font-light leading-relaxed max-w-lg">
                  {heroMassageImages[currentHeroIndex].description}. Experience authentic full body therapy tailored for you by certified therapists.
                </p>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={scrollToBooking}
                className="group px-4 py-2 gold-gradient-bg text-[#080B09] rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.985] shadow-[0_0_30px_rgba(212,175,55,0.35)] cursor-pointer"
              >
                BOOK YOUR EXPERIENCE
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
              </button>
              
              <a 
                href="#services" 
                className="px-4 py-2 border border-[#D4AF37]/30 hover:border-[#D4AF37]/80 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all hover:bg-[#D4AF37]/5"
              >
                EXPLORE THERAPIES
              </a>
            </div>
            
            <div className="flex items-center gap-8 text-xs text-white/70 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" /> <span className="font-semibold text-white">4.98</span> (2000+ Reviews)
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="tracking-wider uppercase text-[11px] text-white/60">PRIVATE • LUXURY • DISCREET</div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: HIGHLY VISIBLE 5S ROTATING HERO MASSAGE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            {/* Framed Image Showcase */}
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_50px_rgba(212,175,55,0.2)] bg-[#1A1A1A] group">
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
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  {/* Subtle luxury gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl" />
                </motion.div>
              </AnimatePresence>

              {/* Image Info Tag Overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-10 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
                  <div className="text-xs text-[#D4AF37] font-semibold tracking-wider">
                    {heroMassageImages[currentHeroIndex].tag}
                  </div>
                  <div className="text-sm text-white font-light mt-0.5">
                    {heroMassageImages[currentHeroIndex].title}
                  </div>
                </div>

                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-xs text-white/80 font-mono">
                  0{currentHeroIndex + 1} / 0{heroMassageImages.length}
                </div>
              </div>

              {/* Prev/Next Arrow Buttons on Image */}
              <button
                onClick={() => setCurrentHeroIndex((prev) => (prev === 0 ? heroMassageImages.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-[#D4AF37] text-white hover:text-black border border-white/20 transition-all backdrop-blur-md cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentHeroIndex((prev) => (prev + 1) % heroMassageImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-[#D4AF37] text-white hover:text-black border border-white/20 transition-all backdrop-blur-md cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* 5s Interval Indicators Below Image */}
            <div className="mt-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-2.5">
                {heroMassageImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentHeroIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                      currentHeroIndex === idx 
                        ? 'w-7 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]' 
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

      {/* TRUST BAR */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#0B1A13] py-5 border-y border-[#D4AF37]/20"
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-xs font-medium tracking-wider uppercase opacity-90 text-white/80">
          <motion.div 
            whileHover={{ scale: 1.05, color: "#D4AF37" }}
            className="flex items-center gap-3 transition-colors cursor-default"
          >
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <div>10:00 AM — 10:00 PM DAILY</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, color: "#D4AF37" }}
            className="flex items-center gap-3 transition-colors cursor-default"
          >
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <div>Kondotty, Malappuram</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, color: "#D4AF37" }}
            className="flex items-center gap-3 transition-colors cursor-default"
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <div>+91 8086 777 555</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-emerald-400 font-semibold cursor-default"
          >
            <CheckCircle2 className="w-4 h-4" /> 2000+ Satisfied Guests
          </motion.div>
        </div>
      </motion.div>

      {/* SERVICES TEASER */}
      <section id="services" className="py-24 bg-[#121212]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row gap-12 items-end mb-12"
          >
            <div className="flex-1">
              <div className="uppercase text-[#D4AF37] tracking-[3px] text-xs mb-2">SIGNATURE EXPERIENCES</div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-tight">Indulge in<br />our therapies</h2>
            </div>
            <div className="flex-1 max-w-md text-sm text-white/70">
              Each session is conducted in complete privacy with the highest standards of hygiene, professionalism and discretion.
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="service-card group bg-[#1A1A1A] border border-white/10 rounded-3xl p-7 flex flex-col hover:border-[#D4AF37]/30"
              >
                <div className="text-[#D4AF37] mb-6">{service.icon}</div>
                
                <h3 className="text-xl font-light mb-3 tracking-tight">{service.title}</h3>
                
                <p className="text-sm text-white/60 flex-1 leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <div className="flex justify-between items-end border-t border-white/10 pt-6">
                  <div>
                    <div className="text-[10px] text-white/40 uppercase">DURATION</div>
                    <div className="text-xl font-light text-white mt-0.5">{service.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/40 uppercase">FROM</div>
                    <div className="text-2xl font-light text-[#D4AF37] mt-0.5 tracking-tight">{service.price}</div>
                  </div>
                </div>

                
                <button 
                  onClick={scrollToBooking}
                  className="mt-8 text-xs border border-white/30 hover:border-[#D4AF37] text-white/70 hover:text-white transition-colors py-4 rounded-2xl flex items-center justify-center gap-2 tracking-wider"
                >
                  SELECT THIS EXPERIENCE
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM BENEFITS & OFFERS SECTION */}
      <section id="premium" className="py-24 bg-[#0A1A12] border-y border-[#D4AF37]/20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline text-[11px] font-semibold tracking-[3px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-5 py-1.5 rounded-full gold-gradient-text uppercase">ME2SPA EXCLUSIVE</div>
            <h2 className="font-serif text-3xl md:text-5xl font-light mt-6 tracking-tight mb-4">The <span className="italic gold-gradient-text">Premium</span> Package</h2>
            <p className="text-white/70 max-w-lg mx-auto leading-relaxed">Elevate your wellness journey with our highly sought-after premium memberships. Experience unparalleled luxury and bespoke treatments.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Benefits */}
            <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-[#D4AF37]/40 transition-colors">
              <h3 className="text-xl font-medium text-white mb-6 uppercase tracking-widest text-[#D4AF37]">Key Benefits</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">✦</div>
                  <div>
                    <strong className="block text-white mb-1">Priority Therapist Selection</strong>
                    <span className="text-sm text-white/60">Choose your preferred therapist and secure guaranteed priority bookings, even during peak hours.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">✦</div>
                  <div>
                    <strong className="block text-white mb-1">Complimentary Enhancements</strong>
                    <span className="text-sm text-white/60">Free hot stone add-ons, premium aromatic oils, and extended 15-minute relaxation periods.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">✦</div>
                  <div>
                    <strong className="block text-white mb-1">Exclusive Private Suites</strong>
                    <span className="text-sm text-white/60">Access to our VIP suites featuring private showers and ultimate soundproofing.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Offers */}
            <div className="bg-gradient-to-br from-[#151515] to-[#0A0A0A] rounded-3xl p-8 border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.1)] relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-full blur-[30px]" />
              <h3 className="text-xl font-medium text-white mb-6 uppercase tracking-widest text-[#D4AF37]">Current Offers</h3>
              
              <div className="space-y-6">
                <div className="border border-white/5 bg-white/5 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                  <div className="text-2xl font-serif text-white mb-1">Gold Membership</div>
                  <div className="text-sm text-[#D4AF37] font-medium mb-3">₹4,999 / month</div>
                  <div className="text-sm text-white/60">Includes 4 Full Body Massages + 2 Cross Massages and all Premium benefits. Save 30%.</div>
                </div>

                <div className="border border-white/5 bg-white/5 rounded-2xl p-5">
                  <div className="text-2xl font-serif text-white mb-1">Annual Premium</div>
                  <div className="text-sm text-[#D4AF37] font-medium mb-3">₹49,999 / year</div>
                  <div className="text-sm text-white/60">Unlimited access to all facilities, complimentary add-ons, and personal concierge service.</div>
                </div>
              </div>

              <button onClick={scrollToBooking} className="w-full mt-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-xl tracking-wider hover:bg-white transition-colors cursor-pointer text-sm">
                CLAIM PREMIUM OFFER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ULTRA PREMIUM CATEGORY */}
      <section id="ultra-premium" className="py-24 bg-[#080B09] border-y border-white/5 relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#080B09]/0 to-[#080B09]/0 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row gap-12 items-end mb-12"
          >
            <div className="flex-1">
              <div className="uppercase text-[#D4AF37] tracking-[3px] text-xs mb-2">ULTRA PREMIUM CATEGORY</div>
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
                className="group bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#D4AF37]/20 rounded-3xl p-8 flex flex-col hover:border-[#D4AF37]/60 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.05)] hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
              >
                <div className="text-[#D4AF37] mb-6 flex items-center justify-between">
                  {service.icon}
                  <div className="text-[10px] tracking-[2px] border border-[#D4AF37]/30 px-3 py-1 rounded-full uppercase text-[#D4AF37]">INVITE ONLY</div>
                </div>
                
                <h3 className="text-2xl font-serif mb-4 tracking-tight text-white">{service.title}</h3>
                
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
                    <div className="text-2xl font-serif text-[#D4AF37] mt-0.5 tracking-tight">{service.price}</div>
                  </div>
                </div>

                <button 
                  onClick={scrollToBooking}
                  className="w-full text-xs font-semibold bg-[#D4AF37] hover:bg-white text-black transition-colors py-4 rounded-xl flex items-center justify-center gap-2 tracking-widest uppercase"
                >
                  REQUEST ACCESS
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE BOOKING WIZARD */}
      <section id="booking-wizard" className="bg-gradient-to-b from-[#0B1A13] via-[#080B09] to-[#080B09] py-24 relative overflow-hidden">
        {/* Subtle background animations */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px]"
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline text-[11px] font-semibold tracking-[3px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-5 py-1.5 rounded-full gold-gradient-text uppercase">EXCLUSIVE FOR YOU</div>
            <h2 className="font-serif text-3xl md:text-4xl font-light mt-4 tracking-tight">Begin your <span className="italic gold-gradient-text">journey</span></h2>
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
                className={`step-dot cursor-pointer flex flex-col items-center relative z-10 ${currentStep >= step ? 'text-[#D4AF37]' : 'text-white/30'}`}
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium border-2 transition-all ${currentStep >= step ? 'border-[#D4AF37] gold-gradient-bg text-[#080B09] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-white/20 bg-[#080B09]'}`}>
                  {step}
                </div>
                <div className="text-[10px] mt-2.5 font-semibold tracking-widest uppercase">STEP {step}</div>
              </div>
            ))}
            
            {/* Progress line */}
            <div className="absolute top-4.5 left-0 right-0 h-[2px] bg-white/10">
              <div 
                className="h-[2px] gold-gradient-bg transition-all duration-700 shadow-[0_0_10px_#D4AF37]" 
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-14 shadow-2xl border border-[#D4AF37]/25">
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
                      <div className="uppercase text-xs tracking-widest text-[#D4AF37] mb-1">STEP 01 — SERVICE</div>
                      <h3 className="text-2xl font-light">Choose your therapy</h3>
                    </div>
                    
                    <div className="grid gap-4">
                      {services.map((service) => (
                        <div 
                          key={service.id}
                          onClick={() => updateForm('service', service.id)}
                          className={`service-card flex gap-5 border-2 p-5 rounded-2xl cursor-pointer group ${formData.service === service.id ? 'selected' : 'border-white/10 hover:border-white/30'}`}
                        >
                          <div className="text-[#D4AF37] mt-1 transition-transform group-hover:scale-110">
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-light">{service.title}</div>
                              <div className="font-mono text-[#D4AF37] text-base">{service.price}</div>
                            </div>
                            <div className="text-sm text-white/60 mt-1 pr-8">{service.description}</div>
                            <div className="text-xs text-white/50 mt-4 flex items-center gap-3">
                              <span>{service.duration}</span>
                              <span className="w-px h-3 bg-white/30"></span>
                              <span>Private room</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {errors.service && <div className="text-red-400 text-sm mt-3">{errors.service}</div>}
                    
                    <div className="pt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 bg-white text-black px-10 py-3.5 rounded-xl font-medium text-sm hover:bg-[#D4AF37] transition-all active:scale-95"
                      >
                        CONTINUE <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: THERAPIST PREFERENCE */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-8"
                  >
                    <div>
                      <div className="uppercase text-xs tracking-widest text-[#D4AF37] mb-1">STEP 02 — PREFERENCES</div>
                      <h3 className="text-2xl font-light tracking-tight">Tell us who you prefer</h3>
                    </div>

                    {/* Body Type */}
                    <div>
                      <div className="text-xs uppercase text-white/60 tracking-widest mb-3 flex items-center gap-2">
                        BODY TYPE PREFERENCE <span className="text-[10px] px-2 py-0.5 bg-white/10 rounded">MULTIPLE OK</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {bodyTypeOptions.map((option) => (
                          <div 
                            key={option.value}
                            onClick={() => toggleBodyType(option.value)}
                            className={`border-2 rounded-2xl py-6 text-center cursor-pointer transition-all hover:border-[#D4AF37]/60 ${formData.bodyTypes.includes(option.value) ? 'border-[#D4AF37] bg-[#1F2A26]' : 'border-white/10'}`}
                          >
                            <div className="text-3xl mb-2">{option.emoji}</div>
                            <div className="font-medium text-sm">{option.label}</div>
                            <div className="text-[10px] text-white/40 mt-1">PREFERENCE</div>
                          </div>
                        ))}
                      </div>
                      {errors.bodyTypes && <p className="mt-2 text-red-400 text-xs">{errors.bodyTypes}</p>}
                    </div>

                    {/* Ethnicity / Origin */}
                    <div>
                      <div className="text-xs uppercase text-white/60 tracking-widest mb-3">THERAPIST ORIGIN</div>
                      <div className="grid grid-cols-2 gap-4">
                        {ethnicityOptions.map((option) => (
                          <div 
                            key={option.value}
                            onClick={() => updateForm('ethnicity', option.value)}
                            className={`p-6 border-2 rounded-2xl flex flex-col items-center cursor-pointer transition-all ${formData.ethnicity === option.value ? 'selected border-[#D4AF37]' : 'border-white/10 hover:border-white/30'}`}
                          >
                            <div className="text-4xl mb-3">{option.flag}</div>
                            <div className="text-lg font-light mb-1">{option.label}</div>
                            <div className="text-xs text-white/50">{option.desc}</div>
                          </div>
                        ))}
                      </div>
                      {errors.ethnicity && <p className="mt-2 text-red-400 text-xs">{errors.ethnicity}</p>}
                    </div>


                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-10 py-5 border border-white/30 text-white/70 hover:text-white rounded-2xl text-sm tracking-wider transition-colors"
                      >
                        BACK
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-3 bg-white text-black px-14 py-5 rounded-2xl font-medium hover:bg-[#D4AF37] transition-all active:scale-95"
                      >
                        NEXT: YOUR DETAILS <ArrowRight />
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
                    className="space-y-8"
                  >
                    <div>
                      <div className="uppercase text-xs tracking-widest text-[#D4AF37] mb-3">STEP 03 — CONTACT</div>
                      <h3 className="text-4xl font-light">Almost there...</h3>
                      <p className="text-white/60 mt-3">Your information is kept completely private and secure.</p>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-2 text-white/60">FULL NAME</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateForm('name', e.target.value)}
                          className="w-full bg-transparent border border-white/30 focus:border-[#D4AF37] rounded-2xl px-7 py-5 text-lg placeholder:text-white/30 outline-none transition-colors"
                          placeholder="Aarav Menon"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-white/60">AGE</label>
                          <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => updateForm('age', e.target.value)}
                            min="18"
                            className="w-full bg-transparent border border-white/30 focus:border-[#D4AF37] rounded-2xl px-7 py-5 text-lg placeholder:text-white/30 outline-none transition-colors"
                            placeholder="28"
                          />
                          {errors.age && <p className="text-red-400 text-xs mt-2">{errors.age}</p>}
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-white/60">YOUR CITY / PLACE</label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => updateForm('location', e.target.value)}
                            className="w-full bg-transparent border border-white/30 focus:border-[#D4AF37] rounded-2xl px-7 py-5 text-lg placeholder:text-white/30 outline-none transition-colors"
                            placeholder="Your city"
                          />
                          {errors.location && <p className="text-red-400 text-xs mt-2">{errors.location}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-2 text-white/60">MOBILE NUMBER (OPTIONAL)</label>
                        <div className="flex">
                          <div className="bg-white/10 border border-r-0 border-white/30 px-6 flex items-center text-sm rounded-l-2xl">+91</div>
                          <input
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => updateForm('mobile', e.target.value)}
                            className="flex-1 bg-transparent border border-white/30 focus:border-[#D4AF37] rounded-r-2xl px-7 py-5 text-lg placeholder:text-white/30 outline-none transition-colors"
                            placeholder="8086 777 555"
                          />
                        </div>
                        <p className="text-[10px] text-white/40 mt-3">We will only use this to send your booking confirmation via WhatsApp</p>
                      </div>
                    </div>

                    <div className="flex justify-between pt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-10 py-5 border border-white/30 text-white/70 hover:text-white rounded-2xl text-sm tracking-wider transition-colors"
                      >
                        BACK
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#E8C670] text-black px-16 py-6 rounded-3xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/40 transition-all active:scale-[0.985]"
                      >
                        CONFIRM &amp; RESERVE SESSION
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: REVIEW (Confirmation preview) */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-8 text-center"
                  >
                    <CheckCircle2 className="mx-auto text-[#D4AF37] w-20 h-20" />
                    <div>
                      <div className="text-4xl font-light mb-1">Review your request</div>
                      <p className="text-white/60">Please confirm all details before submitting.</p>
                    </div>

                    <div className="bg-[#1A1A1A] rounded-3xl p-8 text-left space-y-8">
                      <div className="flex justify-between border-b border-white/10 pb-8">
                        <div className="text-white/50 text-sm">SELECTED THERAPY</div>
                        <div className="text-right">
                          <div className="font-medium text-lg">{services.find(s => s.id === formData.service)?.title}</div>
                          <div className="text-[#D4AF37]">{services.find(s => s.id === formData.service)?.price}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-8 text-sm">
                        <div>
                          <div className="text-white/50">THERAPIST PREFERENCE</div>
                          <div className="mt-1.5 capitalize">{formData.bodyTypes.join(" • ")}</div>
                        </div>
                        <div>
                          <div className="text-white/50">ORIGIN</div>
                          <div className="mt-1.5 capitalize text-lg">{formData.ethnicity}</div>
                        </div>
                        <div>
                          <div className="text-white/50">GUEST NAME</div>
                          <div className="mt-1">{formData.name || '—'}</div>
                        </div>
                        <div>
                          <div className="text-white/50">AGE &amp; PLACE</div>
                          <div className="mt-1">{formData.age} • {formData.location}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-4 justify-center">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-12 py-5 border border-white/40 hover:bg-white/5 text-white rounded-3xl"
                      >
                        EDIT DETAILS
                      </button>
                      <button
                        type="submit"
                        className="bg-[#D4AF37] text-black px-16 py-5 rounded-3xl font-medium flex items-center gap-3 hover:bg-white transition-colors"
                      >
                        YES, SUBMIT MY REQUEST
                      </button>
                    </div>
                    
                    <div className="text-[10px] text-white/40 max-w-[260px] mx-auto">
                      Your request will be reviewed within 30 minutes. We respect your privacy.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>

      {/* ABOUT / TRUST SECTION */}
      <section id="about" className="py-24 bg-[#080B09] border-t border-white/5 relative overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -left-20 w-80 h-80 bg-emerald-900/10 rounded-full blur-[120px]"
        />
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
          >
            <div className="sticky top-28">
              <div className="uppercase tracking-[3px] text-xs font-semibold gold-gradient-text">OUR SANCTUARY IN KONDOTTY</div>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight leading-snug mt-4">A private retreat designed for <span className="italic gold-gradient-text">absolute comfort</span> &amp; rejuvenation.</h2>
              
              <div className="mt-6 max-w-md text-base text-white/75 font-light leading-relaxed">
                Located in a serene corner of Kondotty, Wellness Spa offers a completely private and luxurious environment where you can unwind without any distractions.
              </div>
              
              <div className="flex gap-10 mt-12">
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="font-serif text-4xl md:text-5xl font-normal gold-gradient-text">7</div>
                  <div className="text-[10px] tracking-[2px] mt-2 uppercase text-white/50 font-semibold">PRIVATE SUITES</div>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}>
                  <div className="font-serif text-4xl md:text-5xl font-normal gold-gradient-text">14</div>
                  <div className="text-[10px] tracking-[2px] mt-2 uppercase text-white/50 font-semibold">CERTIFIED THERAPISTS</div>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, delay: 0.2 }}>
                  <div className="font-serif text-4xl md:text-5xl font-normal gold-gradient-text">98%</div>
                  <div className="text-[10px] tracking-[2px] mt-2 uppercase text-white/50 font-semibold">REPEAT CLIENTS</div>
                </motion.div>
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
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-card p-8 rounded-3xl border border-[#D4AF37]/20 relative overflow-hidden transition-all duration-300"
            >
              <div className="text-[#D4AF37] mb-6">
                <Star className="w-8 h-8 fill-[#D4AF37]" />
              </div>
              <div className="font-serif italic text-lg leading-relaxed text-white/90">"The most professional and relaxing experience I have had in Kerala. The therapists are highly skilled and respectful. I felt completely at ease."</div>
              <div className="flex gap-3 mt-10 text-sm">
                <div className="w-8 h-px bg-[#D4AF37]/50 self-center"></div>
                <div>
                  <div className="font-semibold text-xs tracking-wider text-white">SHYAM SUNDER</div>
                  <div className="text-[10px] text-white/40 uppercase">Calicut • Visited 4 times</div>
                </div>
              </div>
            </motion.div>
            
            <div className="text-xs text-white/70 font-light border-l-2 border-[#D4AF37] pl-6 py-1 leading-relaxed">
              Discretion and hygiene are our highest priorities. Every room is sanitized between sessions. All therapists are background checked and professionally trained.
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="bg-gradient-to-b from-[#0A1A14] to-[#080B09] py-24 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="gold-gradient-text text-xs tracking-[3px] uppercase font-semibold">TESTIMONIALS</div>
            <div className="font-serif text-2xl md:text-4xl font-light mt-2">What our <span className="italic gold-gradient-text">guests say</span></div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "I have visited many spas in India and abroad. This is by far the most luxurious and relaxing experience. 10/10 would recommend.",
              "The attention to detail is incredible. From the moment you walk in, you feel like royalty. The therapists are truly gifted.",
              "Very clean, private and professional. I felt safe and comfortable the entire time. Will definitely be back next month."
            ].map((quote, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="glass-card p-8 rounded-3xl border border-[#D4AF37]/15 transition-all duration-300"
              >
                <div className="text-4xl gold-gradient-text font-serif leading-none -mt-2 mb-4">“</div>
                <p className="text-white/80 text-sm font-light leading-relaxed">{quote}</p>
                <div className="h-px bg-white/10 my-6"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-xs text-[#D4AF37]">✦</div>
                  <div>
                    <div className="text-xs font-semibold text-white">Guest from Kozhikode</div>
                    <div className="text-[#D4AF37] text-[10px]">★★★★★</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="bg-[#080B09] py-20 text-center border-t border-[#D4AF37]/20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto px-6"
        >
          <div className="gold-gradient-text text-xs mb-3 tracking-[2px] uppercase font-semibold">DON&apos;T WAIT. YOUR WELLNESS AWAITS.</div>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight leading-tight mb-8">Ready to feel <span className="italic gold-gradient-text">renewed?</span></h2>
          
          <button 
            onClick={scrollToBooking}
            className="w-full md:w-auto mx-auto gold-gradient-bg text-[#080B09] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all px-10 py-4 text-base rounded-2xl flex items-center justify-center gap-3 group cursor-pointer font-semibold"
          >
            START YOUR BOOKING
            <motion.div 
              animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="group-hover:rotate-45 transition"
            >
              ↗
            </motion.div>
          </button>
          
          <p className="mt-8 text-xs text-white/40 font-light">Limited appointments available daily. Early reservations recommended.</p>
        </motion.div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0A2E23] pt-20 pb-12 text-white/60 text-sm">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-12 gap-y-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-[#D4AF37]">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="2.5" fill="currentColor" stroke="none" />
                  <path d="M12 9c-3.5 0-5 3.5-5 6 0 2.5 1.5 4 1.5 6 0 1-1 2-1 2" />
                  <path d="M12 9c3.5 0 5 3.5 5 6 0 2.5-1.5 4-1.5 6 0 1 1 2 1 2" />
                  <path d="M7 14c-1.5 0-3-1.5-3-3" />
                  <path d="M17 14c1.5 0 3-1.5 3-3" />
                </svg>
              </div>
              <div className="font-serif text-xl text-white tracking-tight font-semibold">ME2SPA</div>
            </div>
            
            <div className="max-w-xs">A luxury wellness destination offering personalized therapeutic massage services in Kerala.</div>
            
            <div className="mt-12 text-xs leading-loose opacity-60">
              © 2026 ME2SPA<br />
              All Rights Reserved.<br />
              Privacy • Terms • Responsible Service
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="uppercase text-xs tracking-widest mb-6 text-white">CONTACT</div>
            <div className="space-y-4">
              <a href="tel:+918086777555" className="block hover:text-white transition">+91 8086 777 555</a>
              <a href="#" className="block hover:text-white transition">hello@serenovaspa.in</a>
              <div className="pt-4">
                Near Calicut Airport Road,<br />
                Malappuram, Kerala
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4">
            <div className="uppercase text-xs tracking-widest mb-6 text-white">HOURS</div>
            
            <div className="grid grid-cols-2 gap-y-6 text-xs">
              <div>Monday — Thursday</div>
              <div className="text-right">10:00 AM – 09:00 PM</div>
              
              <div>Friday — Sunday</div>
              <div className="text-right">09:00 AM – 10:00 PM</div>
            </div>
            
            <div className="mt-16 text-xs border-t border-white/10 pt-6">
              We are a completely private establishment. All bookings are handled with the utmost confidentiality.
            </div>
            
            <div className="flex items-center gap-4 mt-8">
              {/* Instagram Icon */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all hover:scale-110 shadow-[0_0_15px_rgba(212,175,55,0.15)] group"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* WhatsApp Icon */}
              <a 
                href="https://wa.me/918086777555" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all hover:scale-110 shadow-[0_0_15px_rgba(212,175,55,0.15)] group"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.007 3.676 3.75-1.009zm10.742-6.516c.284.143.475.237.569.395.095.158.095.918-.237 1.849-.332.931-1.47 1.803-2.42 1.849-.95.047-1.898-.284-3.56-1.043-2.56-1.171-4.17-3.791-4.296-3.963-.126-.172-1.043-1.385-1.043-2.643 0-1.258.65-1.877.882-2.13.232-.253.506-.316.674-.316.168 0 .337.003.484.009.158.007.37.007.545.427.185.443.626 1.533.682 1.644.056.111.095.242.02.395-.075.153-.114.248-.227.381-.114.133-.242.298-.346.4-.114.114-.233.238-.101.465.133.227.591.974 1.267 1.576.87.775 1.604 1.015 1.831 1.129.227.114.36.095.492-.057.133-.152.569-.664.721-.892.152-.227.304-.189.513-.114z"/>
                </svg>
              </a>

              {/* Facebook Icon */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all hover:scale-110 shadow-[0_0_15px_rgba(212,175,55,0.15)] group"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center text-[10px] mt-24 opacity-30">Crafted with passion for wellness • Not affiliated with any other brand</div>
      </footer>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="modal bg-[#121212] max-w-md w-full rounded-3xl p-10 border border-[#D4AF37]/30 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-8 rounded-full border-4 border-[#D4AF37] flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-[#D4AF37]" />
              </div>
              
              <div className="text-3xl font-light tracking-tight mb-3">Thank you, {formData.name.split(' ')[0]}!</div>
              <p className="text-white/70">Your reservation request has been received.</p>
              
              <div className="my-10 text-left bg-black/40 rounded-2xl p-6 text-sm space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/50">Session</span>
                  <span>{services.find(s => s.id === formData.service)?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Preferred</span>
                  <span className="capitalize">{formData.bodyTypes.join(', ')} • {formData.ethnicity}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-4">
                  <span className="text-white/50">Confirmation sent to</span>
                  <span className="font-medium">WhatsApp</span>
                </div>
              </div>
              
              <div className="text-xs text-white/40">Our team will contact you shortly to confirm availability. Expected response within 15 minutes.</div>
              
              <button 
                onClick={() => setShowModal(false)}
                className="mt-10 w-full py-4 text-xs tracking-widest border border-white/30 rounded-2xl hover:bg-white/5"
              >
                CLOSE WINDOW
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
