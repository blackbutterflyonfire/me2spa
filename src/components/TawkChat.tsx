import React, { useEffect, useState, useRef } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Settings,
  CheckCircle2,
  ExternalLink,
  Bot,
  HelpCircle,
  Clock,
  MapPin,
  Calendar,
} from 'lucide-react';

declare global {
  interface Window {
    Tawk_API?: {
      toggle?: () => void;
      maximize?: () => void;
      minimize?: () => void;
      popup?: () => void;
      showWidget?: () => void;
      hideWidget?: () => void;
      getStatus?: () => string;
      isChatMaximized?: () => boolean;
      setAttributes?: (attributes: Record<string, unknown>, callback?: (error?: unknown) => void) => void;
      addEvent?: (event: string, metadata?: Record<string, unknown>, callback?: (error?: unknown) => void) => void;
      onLoad?: () => void;
      onChatMaximized?: () => void;
      onChatMinimized?: () => void;
      [key: string]: unknown;
    };
    Tawk_LoadStart?: Date;
  }
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickReplies?: string[];
}

export default function TawkChat() {
  const [propertyId, setPropertyId] = useState<string>(() => {
    return (
      import.meta.env.VITE_TAWK_PROPERTY_ID ||
      localStorage.getItem('spavibe_tawk_property_id') ||
      ''
    );
  });
  const [widgetId, setWidgetId] = useState<string>(() => {
    return (
      import.meta.env.VITE_TAWK_WIDGET_ID ||
      localStorage.getItem('spavibe_tawk_widget_id') ||
      '1k3vfu6cf'
    );
  });

  const [isTawkLoaded, setIsTawkLoaded] = useState(false);
  const [isFallbackOpen, setIsFallbackOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tempPropertyId, setTempPropertyId] = useState(propertyId);
  const [tempWidgetId, setTempWidgetId] = useState(widgetId);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Fallback interactive bot state
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Namaste! Welcome to SPAVIBE Luxury Wellness Sanctuary. I am your automated wellness concierge bot. How may I assist your relaxation journey today?',
      time: 'Just now',
      quickReplies: [
        'Explore Services & Pricing',
        'Book an Appointment',
        'Opening Hours & Location',
        'Ayurvedic Rituals',
      ],
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat messages
  useEffect(() => {
    if (isFallbackOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isFallbackOpen]);

  // Load Tawk.to Script when propertyId is present
  useEffect(() => {
    if (!propertyId || propertyId.trim() === '') {
      setIsTawkLoaded(false);
      return;
    }

    // Clean up existing script if any
    const existingScript = document.getElementById('tawk-script');
    if (existingScript) {
      existingScript.remove();
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    window.Tawk_API.onLoad = function () {
      setIsTawkLoaded(true);
      // Custom attributes for SpaVibe guest
      if (typeof window.Tawk_API?.setAttributes === 'function') {
        window.Tawk_API.setAttributes(
          {
            Sanctuary: 'SPAVIBE Kozhikode',
            Locale: 'Kerala, India',
          },
          function () {}
        );
      }
    };

    const s1 = document.createElement('script');
    s1.id = 'tawk-script';
    s1.async = true;
    s1.src = `https://embed.tawk.to/${propertyId.trim()}/${widgetId.trim() || 'default'}`;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    document.head.appendChild(s1);

    return () => {
      // Don't necessarily remove script on unmount to keep session active
    };
  }, [propertyId, widgetId]);

  // Listen to custom global open-chat triggers from Navbar or CTA
  useEffect(() => {
    const handleOpenChat = () => {
      if (isTawkLoaded && window.Tawk_API?.maximize) {
        window.Tawk_API.maximize();
      } else {
        setIsFallbackOpen(true);
      }
    };

    window.addEventListener('spavibe:open-chat', handleOpenChat);
    return () => {
      window.removeEventListener('spavibe:open-chat', handleOpenChat);
    };
  }, [isTawkLoaded]);

  // Save Settings handler
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    let cleanPropId = tempPropertyId.trim();
    let cleanWidId = tempWidgetId.trim() || '1k3vfu6cf';

    // If user pasted a full URL or script tag, extract property ID and widget ID
    const urlMatch = cleanPropId.match(/(?:embed\.tawk\.to|tawk\.to\/chat)\/([a-f0-9]{24})\/([a-zA-Z0-9]+)/i);
    if (urlMatch) {
      cleanPropId = urlMatch[1];
      cleanWidId = urlMatch[2];
    } else {
      const propMatch = cleanPropId.match(/[a-f0-9]{24}/i);
      if (propMatch) {
        cleanPropId = propMatch[0];
      }
    }

    localStorage.setItem('spavibe_tawk_property_id', cleanPropId);
    localStorage.setItem('spavibe_tawk_widget_id', cleanWidId);

    setPropertyId(cleanPropId);
    setWidgetId(cleanWidId);
    setTempPropertyId(cleanPropId);
    setTempWidgetId(cleanWidId);

    setSettingsSaved(true);
    setTimeout(() => {
      setSettingsSaved(false);
      setShowSettings(false);
      if (cleanPropId) {
        setIsFallbackOpen(false);
      }
    }, 1500);
  };

  // Bot response generator for Fallback Sanctuary Bot
  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Generate response based on wellness knowledge base
    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyText =
        "Thank you for reaching out! Our sanctuary hosts are ready to tailor your therapy. Would you like to reserve a slot directly or speak via WhatsApp (+91 7306 364 454)?";
      let quicks: string[] = ['Book an Appointment', 'Swedish Deep Tissue', 'Location & Hours'];

      if (lower.includes('service') || lower.includes('price') || lower.includes('cost') || lower.includes('menu')) {
        replyText =
          "SPAVIBE Signature Experiences:\n• Swedish Deep Tissue Recovery (90 min) — ₹4,500\n• Kerala Ayurvedic Abhyanga Ritual (60 min) — ₹3,800\n• Royal Couples Escape (120 min) — ₹8,500\n• Thai Herbal Compress & Steam (75 min) — ₹4,200\n• Balinese Aromatherapy & Hot Stone — ₹4,000";
        quicks = ['Book an Appointment', 'Ayurvedic Rituals', 'Royal Couples Escape'];
      } else if (lower.includes('hour') || lower.includes('time') || lower.includes('open') || lower.includes('close')) {
        replyText =
          "Sanctuary Hours:\nMonday to Sunday: 9:00 AM – 10:00 PM (IST).\nPrivate evening sessions can be reserved with prior notice for complete serenity.";
        quicks = ['Book an Appointment', 'Explore Services & Pricing'];
      } else if (lower.includes('location') || lower.includes('where') || lower.includes('address') || lower.includes('kozhikode') || lower.includes('calicut')) {
        replyText =
          "Our sanctuary is nestled in the heart of Kozhikode:\nSPAVIBE Luxury Wellness, Mavoor Road / Beach Road Junction, Kozhikode, Kerala 673001.\nPrivate valet parking and discrete reception are provided.";
        quicks = ['Book an Appointment', 'Opening Hours & Location'];
      } else if (lower.includes('ayurved') || lower.includes('abhyanga') || lower.includes('kerala')) {
        replyText =
          "Our Authentic Kerala Ayurvedic Abhyanga Ritual uses warm, medicinal botanical oils formulated with Dhanwantharam & Bala herbs to restore dosha equilibrium, soothe the nervous system, and revitalize tired tissues.";
        quicks = ['Book an Appointment', 'Explore Services & Pricing'];
      } else if (lower.includes('book') || lower.includes('reserv') || lower.includes('appointment')) {
        replyText =
          "You can reserve directly through our 3-step booking wizard on this page, or connect with our concierge immediately via WhatsApp (+91 7306 364 454) for instant slot confirmation.";
        quicks = ['Book on WhatsApp', 'Opening Hours & Location'];
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: quicks,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleQuickReply = (text: string) => {
    if (text === 'Book on WhatsApp') {
      window.open('https://wa.me/917306364454?text=Hi%20SPAVIBE%2C%20I%20would%20like%20to%20book%20an%20appointment.', '_blank');
      return;
    }
    handleSendMessage(text);
  };

  return (
    <>
      {/* Fallback Sanctuary Bot & Tawk Configuration Modal */}
      {isFallbackOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[350px] sm:w-[400px] h-[540px] max-h-[85vh] bg-[#120F13]/95 border border-[#E5B86B]/30 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#1C171E] to-[#141016] border-b border-[#E5B86B]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#E5B86B]/20 to-[#C99039]/10 border border-[#E5B86B]/40 flex items-center justify-center text-[#E5B86B]">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#120F13]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white tracking-wide uppercase font-serif">
                  SPAVIBE Concierge Bot
                </h4>
                <p className="text-[10px] text-[#E5B86B]/80 flex items-center gap-1">
                  <span>{propertyId ? 'Tawk.to Live Active' : 'Automated Sanctuary AI'}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className="p-1.5 rounded-xl text-white/60 hover:text-[#E5B86B] hover:bg-white/5 transition-colors cursor-pointer"
                title="Tawk.to Integration Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsFallbackOpen(false)}
                className="p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tawk.to Property Settings Panel */}
          {showSettings ? (
            <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs bg-[#0F0C11]">
              <div className="flex items-center gap-2 text-[#E5B86B]">
                <Settings className="w-4 h-4" />
                <h5 className="font-semibold tracking-wide uppercase text-[11px]">
                  Tawk.to Chatbot Configuration
                </h5>
              </div>

              <p className="text-white/70 leading-relaxed">
                Connect your official <strong>Tawk.to</strong> live chat &amp; chatbot property. Once entered, the official Tawk.to widget will automatically mount on your site.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/60 mb-1">
                    Tawk.to Property ID <span className="text-[#E5B86B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 64f123456789abcdef012345"
                    value={tempPropertyId}
                    onChange={(e) => setTempPropertyId(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E5B86B]"
                  />
                  <span className="text-[10px] text-white/40 block mt-1">
                    Found in Tawk.to Dashboard &gt; Administration &gt; Property Settings.
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/60 mb-1">
                    Widget ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="default"
                    value={tempWidgetId}
                    onChange={(e) => setTempWidgetId(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E5B86B]"
                  />
                  <span className="text-[10px] text-white/40 block mt-1">
                    Default is <code className="text-[#E5B86B]">default</code> or your custom widget identifier.
                  </span>
                </div>

                {settingsSaved && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Saved! Initializing Tawk.to chat widget...</span>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#DFAC56] to-[#BA812D] text-[#0C0A0D] font-semibold text-xs tracking-wider uppercase hover:brightness-110 transition-all cursor-pointer shadow-lg"
                  >
                    Save &amp; Connect Tawk
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/70 text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <div className="pt-3 border-t border-white/10 space-y-2 text-[11px] text-white/60">
                <p className="flex items-center gap-1.5 text-white/80 font-medium">
                  <HelpCircle className="w-3.5 h-3.5 text-[#E5B86B]" /> Don&apos;t have a Tawk account yet?
                </p>
                <p>
                  You can create a free account at{' '}
                  <a
                    href="https://www.tawk.to"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E5B86B] underline inline-flex items-center gap-0.5"
                  >
                    tawk.to <ExternalLink className="w-2.5 h-2.5" />
                  </a>{' '}
                  and enable their Apollo AI Bot or 24/7 live chat agent.
                </p>
              </div>
            </div>
          ) : (
            /* Interactive Chat Conversation */
            <>
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-[#DFAC56] to-[#BA812D] text-[#0C0A0D] font-medium rounded-br-none shadow-md'
                          : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>
                    <span className="text-[9px] text-white/40 mt-1 px-1">{m.time}</span>

                    {/* Quick Reply Pills */}
                    {m.quickReplies && m.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {m.quickReplies.map((qr) => (
                          <button
                            key={qr}
                            type="button"
                            onClick={() => handleQuickReply(qr)}
                            className="px-2.5 py-1 rounded-full bg-[#E5B86B]/10 hover:bg-[#E5B86B]/20 border border-[#E5B86B]/30 text-[#E5B86B] text-[10px] transition-colors cursor-pointer"
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 border-t border-white/10 bg-[#141016]/90 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask about treatments, pricing, timing..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E5B86B]"
                />
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  className="p-2 rounded-xl bg-gradient-to-r from-[#DFAC56] to-[#BA812D] text-[#0C0A0D] hover:brightness-110 transition-all cursor-pointer shadow-md"
                  title="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* Quick Footer info */}
          <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E5B86B]" /> Powered by Tawk.to &amp; SpaVibe
            </span>
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="text-[#E5B86B] hover:underline cursor-pointer"
            >
              {showSettings ? 'Back to Chat' : '⚙️ Tawk Settings'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
