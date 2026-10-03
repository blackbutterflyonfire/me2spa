import React, { useState } from 'react';
import {
  MessageSquare,
  Phone,
  X,
  Send,
  CheckCircle2,
  Bot,
} from 'lucide-react';
import { getAccessToken } from '../services/googleAuth';
import {
  appendWhatsAppEnquiryToSheet,
  saveLocalEnquiry,
  markTimestampSynced,
} from '../services/googleSheetsService';

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [enquiryType, setEnquiryType] = useState('Appointment Booking');
  const [message, setMessage] = useState(
    "Hi SPAVIBE Concierge, I'd like to book an appointment. Please let me know available slots."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const conciergePhone = '7306364454';

  // Update default message when enquiry type changes if user hasn't heavily customized
  const handleTypeChange = (newType: string) => {
    setEnquiryType(newType);
    setMessage(
      `Hi SPAVIBE Concierge, I would like to make an enquiry regarding "${newType}". Please share availability and booking details.`
    );
  };

  const handleSendAndLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const timestampStr = `${now} (IST)`;

    // Format final text for WhatsApp
    const customerPhoneText = phone.trim() ? phone.trim() : 'Guest Phone';
    const customerNameText = name.trim() ? name.trim() : 'Guest';
    const finalWhatsAppText = `${message}\n\n[Guest Details: ${customerNameText} | Mobile: ${customerPhoneText} | Category: ${enquiryType}]`;

    // 1. Save locally for persistence and queue
    saveLocalEnquiry({
      timestamp: timestampStr,
      phone: customerPhoneText,
      name: customerNameText,
      enquiryType,
      content: finalWhatsAppText,
      threadStatus: 'Thread Opened',
      source: 'WhatsApp Floating Button',
    });

    // 2. If token is active, directly log to connected Google Sheet
    try {
      const token = await getAccessToken();
      const activeSheetId = localStorage.getItem('spavibe_selected_sheet_id') || localStorage.getItem('me2spa_selected_sheet_id');
      if (token && activeSheetId) {
        await appendWhatsAppEnquiryToSheet(
          token,
          activeSheetId,
          {
            timestamp: timestampStr,
            phone: customerPhoneText,
            name: customerNameText,
            enquiryType,
            content: finalWhatsAppText,
            status: 'Thread Opened',
            source: 'WhatsApp Floating Button',
          }
        );
        markTimestampSynced(timestampStr);
      }
    } catch (err) {
      console.warn('Direct Google Sheet append queued for later sync:', err);
    }

    // 3. Open WhatsApp link
    const waUrl = `https://wa.me/91${conciergePhone}?text=${encodeURIComponent(finalWhatsAppText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsOpen(false);
    }, 2500);
  };

  // Direct fast WhatsApp fallback (also logs thread)
  const handleDirectQuickWhatsApp = () => {
    const now = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const timestampStr = `${now} (IST)`;
    const defaultText = "Hi SPAVIBE, I'd like to book an appointment.";

    saveLocalEnquiry({
      timestamp: timestampStr,
      phone: 'Direct Floating Click',
      name: 'Website Visitor',
      enquiryType: 'Direct WhatsApp Enquiry',
      content: defaultText,
      threadStatus: 'Thread Opened',
      source: 'WhatsApp Floating Button (Quick Click)',
    });

    window.open(
      `https://wa.me/91${conciergePhone}?text=${encodeURIComponent(defaultText)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <aside aria-label="Quick contact" className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {/* Interactive WhatsApp Enquiry & Google Sheet Logging Popup */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] bg-[#161215]/95 border border-emerald-500/40 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-left animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">WhatsApp Sanctuary Enquiry</h4>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {submitSuccess ? (
            <div className="py-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h5 className="text-sm font-medium text-white">Inquiry Sent</h5>
              <p className="text-xs text-white/60 max-w-[280px] mx-auto">
                Your customer inquiry has been opened on WhatsApp and recorded for our concierge team.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendAndLog} className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1">
                  Your Phone / Mobile Number <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 7306364454 or mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1">
                  Enquiry Category
                </label>
                <select
                  value={enquiryType}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  <option value="Appointment Booking">Appointment Booking</option>
                  <option value="Swedish Deep Tissue Recovery (90 min)">Swedish Deep Tissue Recovery (90 min)</option>
                  <option value="Kerala Ayurvedic Abhyanga Ritual (60 min)">Kerala Ayurvedic Abhyanga Ritual (60 min)</option>
                  <option value="Aromatherapy & Herbal Steam Session">Aromatherapy &amp; Herbal Steam Session</option>
                  <option value="Thai Herbal Compress Therapy">Thai Herbal Compress Therapy</option>
                  <option value="King Royal Suite Day Access">King Royal Suite Day Access</option>
                  <option value="VIP Membership & Corporate Pass">VIP Membership &amp; Corporate Pass</option>
                  <option value="Custom Treatment Enquiry">Custom Treatment Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1">
                  Inquiry Content / Message
                </label>
                <textarea
                  rows={2}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Inquiry message to send via WhatsApp..."
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via WhatsApp</span>
              </button>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
                <span>Direct Concierge: 7306364454</span>
                <button
                  type="button"
                  onClick={handleDirectQuickWhatsApp}
                  className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
                >
                  Instant 1-Click WhatsApp
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Floating Buttons Bar */}
      <div className="flex items-center gap-3">
        {/* Floating Tawk.to / Concierge Chatbot Button */}
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
          className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#DFAC56] to-[#BA812D] text-[#0C0A0D] rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-transform cursor-pointer relative group"
          title="Tawk.to Chat Bot / Concierge"
          aria-label="Open live chat bot"
        >
          <Bot className="w-5 h-5 text-[#0C0A0D]" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-[#0C0A0D] rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-[#0C0A0D] rounded-full" />
        </button>

        {/* Floating Call Button */}
        <a
          href={`tel:+91${conciergePhone}`}
          className="flex items-center justify-center w-12 h-12 bg-neutral-900 border border-amber-500/40 text-amber-400 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
          title="Call Now (+91 7306 364 454)"
          aria-label="Call SPAVIBE directly"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Floating WhatsApp Action Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm px-4 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer group"
          aria-label="Book appointment via WhatsApp"
        >
          <span className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse" />
          <MessageSquare className="w-4 h-4" />
          <span>Book on WhatsApp</span>
        </button>
      </div>
    </aside>
  );
}
