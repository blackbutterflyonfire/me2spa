import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  FileText,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  Search,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Sparkles,
  LogOut,
  AlertCircle,
  Copy,
  Check,
  Trash2,
  ChevronRight,
  Filter,
  Users
} from 'lucide-react';
import GoogleSignInButton from './GoogleSignInButton';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from '../services/googleAuth';
import {
  GoogleForm,
  CustomerEnquiry,
  DriveFormFile,
  listGoogleForms,
  getGoogleForm,
  createCustomerEnquiryForm,
  getCustomerEnquiryResponses,
  parseCustomerEnquiries,
  deleteFormFile,
} from '../services/googleFormsService';

export default function CustomerEnquiryPortal() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [creatingForm, setCreatingForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forms list and active form
  const [availableForms, setAvailableForms] = useState<DriveFormFile[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string>(() => {
    return localStorage.getItem('spavibe_selected_form_id') || localStorage.getItem('me2spa_selected_form_id') || '';
  });
  const [currentForm, setCurrentForm] = useState<GoogleForm | null>(null);
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState('ALL');
  const [copiedLink, setCopiedLink] = useState(false);

  // Destructive Confirmation Dialog State (Mandatory per Workspace Skill)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        setError(null);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // When token is available, load forms and responses
  useEffect(() => {
    if (token) {
      loadForms(token);
    }
  }, [token]);

  // When selectedFormId changes, fetch form details & responses
  useEffect(() => {
    if (token && selectedFormId) {
      localStorage.setItem('spavibe_selected_form_id', selectedFormId);
      loadFormData(token, selectedFormId);
    }
  }, [token, selectedFormId]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
      }
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError(err?.message || 'Google sign-in failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setCurrentForm(null);
    setEnquiries([]);
  };

  const loadForms = async (authToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const files = await listGoogleForms(authToken);
      setAvailableForms(files);

      // Auto-select form if none selected or if preferred form exists
      if (!selectedFormId && files.length > 0) {
        const preferred = files.find((f) => f.name.toLowerCase().includes('spavibe') || f.name.toLowerCase().includes('me2spa') || f.name.toLowerCase().includes('enquiry')) || files[0];
        setSelectedFormId(preferred.id);
      } else if (selectedFormId) {
        // verify still exists
        const exists = files.some((f) => f.id === selectedFormId);
        if (!exists && files.length > 0) {
          setSelectedFormId(files[0].id);
        }
      }
    } catch (err: any) {
      console.error('Error listing forms:', err);
      setError('Could not load Google Forms. Ensure permission is granted.');
    } finally {
      setLoading(false);
    }
  };

  const loadFormData = async (authToken: string, formId: string) => {
    setLoading(true);
    setError(null);
    try {
      const form = await getGoogleForm(authToken, formId);
      setCurrentForm(form);

      const rawResponses = await getCustomerEnquiryResponses(authToken, formId);
      const parsed = parseCustomerEnquiries(form, rawResponses);
      setEnquiries(parsed);
    } catch (err: any) {
      console.error('Error fetching form data:', err);
      setError(err?.message || 'Failed to load form responses.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewForm = async () => {
    if (!token) return;
    setCreatingForm(true);
    setError(null);
    try {
      const newForm = await createCustomerEnquiryForm(token, 'SPAVIBE - Customer Enquiries & Concierge');
      setCurrentForm(newForm);
      setSelectedFormId(newForm.formId);
      localStorage.setItem('spavibe_selected_form_id', newForm.formId);
      await loadForms(token);
    } catch (err: any) {
      console.error('Error creating Google Form:', err);
      setError(err?.message || 'Failed to create Google Form.');
    } finally {
      setCreatingForm(false);
    }
  };

  const handleCopyLink = () => {
    if (!currentForm?.responderUri) return;
    navigator.clipboard.writeText(currentForm.responderUri);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Open destructive delete modal
  const promptDeleteForm = (id: string, name: string) => {
    setFormToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  // Execute confirmed delete (Strictly adhering to Workspace Skill destructive requirement)
  const confirmDeleteForm = async () => {
    if (!token || !formToDelete) return;
    setIsDeleting(true);
    try {
      await deleteFormFile(token, formToDelete.id);
      setDeleteModalOpen(false);
      setFormToDelete(null);
      if (selectedFormId === formToDelete.id) {
        setSelectedFormId('');
        setCurrentForm(null);
        setEnquiries([]);
      }
      await loadForms(token);
    } catch (err: any) {
      console.error('Failed to delete form:', err);
      setError(err?.message || 'Failed to delete form.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter inquiries
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesSearch =
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesService =
      serviceFilter === 'ALL' ||
      item.service.toLowerCase().includes(serviceFilter.toLowerCase());

    return matchesSearch && matchesService;
  });

  return (
    <div className="bg-[#141014]/90 border border-[#D48FB1]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D48FB1]/10 border border-[#D48FB1]/30 text-[#D48FB1] text-xs font-semibold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Google Forms Integration</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
            Customer Enquiries Management
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Store, collect, and manage all client inquiries directly through Google Forms.
          </p>
        </div>

        {/* Auth status / Sign in */}
        {user ? (
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-2xl p-2.5 self-start md:self-auto">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full border border-[#D48FB1]/40"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#D48FB1]/20 flex items-center justify-center text-xs font-bold text-[#D48FB1]">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="text-left pr-2">
              <div className="text-xs font-medium text-white max-w-[140px] truncate">
                {user.displayName || 'Concierge Admin'}
              </div>
              <div className="text-[10px] text-white/50 max-w-[140px] truncate">
                {user.email}
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 text-white/50 hover:text-rose-400 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="self-start md:self-auto">
            <GoogleSignInButton
              onClick={handleLogin}
              loading={isLoggingIn}
              text="Connect Google Forms"
            />
          </div>
        )}
      </div>

      {/* Error notification */}
      {error && (
        <div className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="flex-1">{error}</div>
        </div>
      )}

      {/* If not logged in */}
      {!user && (
        <div className="mt-8 text-center py-12 px-6 bg-black/30 rounded-2xl border border-white/5">
          <div className="w-16 h-16 rounded-2xl rose-gold-gradient-bg flex items-center justify-center mx-auto mb-4 text-[#0C0A0D] shadow-lg">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-2">
            Secure Google Forms Customer Enquiries
          </h3>
          <p className="text-white/60 text-xs sm:text-sm max-w-lg mx-auto mb-6 leading-relaxed">
            Connect your Google account with permission to automatically create and sync your
            dedicated <strong className="text-white">SPAVIBE Customer Enquiries Google Form</strong>.
            All client requests are securely saved and synced into your Google Forms.
          </p>
          <div className="flex justify-center">
            <GoogleSignInButton
              onClick={handleLogin}
              loading={isLoggingIn}
              text="Sign in with Google to Connect Forms"
            />
          </div>
        </div>
      )}

      {/* If logged in: Form Selector & Actions */}
      {user && (
        <div className="mt-6 space-y-6">
          {/* Form Selection & Controls Bar */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label className="text-xs uppercase tracking-wider text-white/60 whitespace-nowrap">
                Active Google Form:
              </label>
              <select
                value={selectedFormId}
                onChange={(e) => setSelectedFormId(e.target.value)}
                disabled={loading || availableForms.length === 0}
                className="bg-[#1A1518] border border-[#D48FB1]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D48FB1] transition-colors cursor-pointer flex-1"
              >
                {availableForms.length === 0 ? (
                  <option value="">No Google Forms found in Drive</option>
                ) : (
                  availableForms.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} {f.name.includes('SPAVIBE') ? '★ (Official SPAVIBE Form)' : ''}
                    </option>
                  ))
                )}
              </select>

              <button
                type="button"
                onClick={() => token && loadFormData(token, selectedFormId)}
                disabled={loading || !selectedFormId}
                className="px-3.5 py-2.5 rounded-xl border border-white/20 text-xs text-white/80 hover:bg-white/5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                title="Refresh Responses"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleCreateNewForm}
                disabled={creatingForm}
                className="px-4 py-2.5 rounded-xl rose-gold-gradient-bg text-[#0C0A0D] text-xs font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(212,143,176,0.4)] transition-all cursor-pointer disabled:opacity-50"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{creatingForm ? 'Creating Form...' : 'Create Official Form'}</span>
              </button>

              {currentForm && (
                <>
                  <a
                    href={`https://docs.google.com/forms/d/${currentForm.formId}/edit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl border border-white/20 text-xs text-white/80 hover:bg-white/5 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Edit Form</span>
                    <ExternalLink className="w-3 h-3 text-[#D48FB1]" />
                  </a>

                  {currentForm.responderUri && (
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-3.5 py-2.5 rounded-xl border border-white/20 text-xs text-white/80 hover:bg-white/5 flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Copy Public Responder Link"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied Link' : 'Share Form'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => promptDeleteForm(currentForm.formId, currentForm.info.title || 'SPAVIBE Form')}
                    className="p-2.5 rounded-xl border border-rose-500/20 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Delete Form from Drive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Current Form Overview Banner */}
          {currentForm && (
            <div className="bg-gradient-to-r from-[#1C1619] via-[#241C21] to-[#1C1619] border border-[#D48FB1]/30 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                      Connected &amp; Collecting
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-white font-medium mt-1">
                    {currentForm.info.title}
                  </h3>
                  <p className="text-white/50 text-xs mt-0.5 line-clamp-1">
                    {currentForm.info.description || 'Configured for SPAVIBE guest inquiries'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-white/50">
                      Total Inquiries
                    </div>
                    <div className="text-lg font-serif text-[#D48FB1] font-semibold">
                      {enquiries.length}
                    </div>
                  </div>

                  {currentForm.responderUri && (
                    <a
                      href={currentForm.responderUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl border border-[#D48FB1]/40 text-[#D48FB1] hover:bg-[#D48FB1]/10 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <span>Public Form</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search inquiries by customer name, phone, or request notes..."
                className="w-full bg-[#1A1518] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D48FB1]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-white/40" />
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="bg-[#1A1518] border border-white/10 rounded-xl px-3 py-2 text-xs text-white/80 focus:outline-none focus:border-[#D48FB1]"
              >
                <option value="ALL">All Therapies</option>
                <option value="Swedish">Swedish Deep Tissue</option>
                <option value="Ayurvedic">Kerala Ayurvedic</option>
                <option value="Aromatherapy">Aromatherapy</option>
                <option value="Thai">Thai Herbal</option>
                <option value="King">King Royal Suite</option>
                <option value="Membership">VIP Membership</option>
              </select>
            </div>
          </div>

          {/* Inquiries List */}
          {loading ? (
            <div className="text-center py-12 text-white/50 text-xs flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#D48FB1]" />
              <span>Syncing responses from Google Forms...</span>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="text-center py-12 px-6 bg-black/20 rounded-2xl border border-white/5">
              <Users className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <div className="text-sm text-white font-medium">No Customer Enquiries Found</div>
              <p className="text-xs text-white/50 mt-1 max-w-md mx-auto">
                {enquiries.length === 0
                  ? 'No responses have been recorded in this Google Form yet. Share your form link or submit an enquiry on the Contact Page to see it appear here.'
                  : 'No inquiries match your current search and filter criteria.'}
              </p>
              {currentForm?.responderUri && (
                <div className="mt-4">
                  <a
                    href={currentForm.responderUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
                  >
                    <span>Test Submit on Public Google Form</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEnquiries.map((enquiry) => {
                const dateObj = new Date(enquiry.submittedAt);
                const formattedDate = isNaN(dateObj.getTime())
                  ? 'Recently'
                  : dateObj.toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                const cleanPhone = enquiry.phone.replace(/[^0-9]/g, '');

                return (
                  <div
                    key={enquiry.responseId}
                    className="bg-[#1A1518]/70 border border-white/10 hover:border-[#D48FB1]/40 rounded-2xl p-5 transition-all shadow-md group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-white/5">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-lg text-white font-medium">
                            {enquiry.customerName}
                          </h4>
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D48FB1]/10 text-[#D48FB1] border border-[#D48FB1]/20 font-medium">
                            {enquiry.service}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-white/60 mt-1 flex-wrap">
                          {enquiry.phone && enquiry.phone !== 'Not provided' && (
                            <span className="flex items-center gap-1 text-amber-300 font-mono">
                              <Phone className="w-3 h-3 text-amber-400" />
                              {enquiry.phone}
                            </span>
                          )}
                          {enquiry.email && enquiry.email !== 'Not provided' && (
                            <span className="flex items-center gap-1 text-white/60">
                              <Mail className="w-3 h-3" />
                              {enquiry.email}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-[11px] text-white/40 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formattedDate}
                        </span>
                      </div>
                    </div>

                    {/* Enquiry Details Message */}
                    <div className="mt-3 text-xs text-white/80 leading-relaxed bg-black/30 rounded-xl p-3.5 border border-white/5">
                      <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                        Inquiry Request:
                      </span>
                      {enquiry.message || 'No additional message provided.'}
                    </div>

                    {/* Quick Response Actions for Concierge */}
                    <div className="mt-4 pt-3 flex items-center justify-between gap-2 flex-wrap">
                      <div className="text-[10px] text-white/40 font-mono">
                        Google Form Response ID: {enquiry.responseId.slice(0, 12)}...
                      </div>

                      <div className="flex items-center gap-2">
                        {cleanPhone && (
                          <>
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                `Hello ${enquiry.customerName}, this is SPAVIBE Luxury Wellness Sanctuary in Kozhikode. Thank you for your inquiry regarding "${enquiry.service}". We would be delighted to arrange your booking.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium flex items-center gap-1 hover:bg-emerald-500/30 transition-colors"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>

                            <a
                              href={`tel:${enquiry.phone}`}
                              className="px-3 py-1.5 rounded-lg border border-white/20 text-white/80 text-[11px] hover:bg-white/5 flex items-center gap-1 transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                              <span>Call</span>
                            </a>
                          </>
                        )}

                        {enquiry.email && enquiry.email !== 'Not provided' && (
                          <a
                            href={`mailto:${enquiry.email}?subject=${encodeURIComponent(
                              `SPAVIBE Wellness Concierge — Your Enquiry`
                            )}&body=${encodeURIComponent(
                              `Dear ${enquiry.customerName},\n\nThank you for contacting SPAVIBE Luxury Therapy & Wellness Sanctuary regarding ${enquiry.service}.\n\nOur concierge team is at your disposal.`
                            )}`}
                            className="px-3 py-1.5 rounded-lg border border-white/20 text-white/80 text-[11px] hover:bg-white/5 flex items-center gap-1 transition-colors"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Email</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Mandatory Destructive Action Modal (Per Workspace Integration Skill) */}
      {deleteModalOpen && formToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1C161A] border border-rose-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-white font-medium mb-2">
              Confirm Form Deletion
            </h3>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6">
              Are you sure you want to permanently delete{' '}
              <strong className="text-white font-semibold">"{formToDelete.name}"</strong> from your
              Google Drive? This action removes the form and its stored inquiries and cannot be
              undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setFormToDelete(null);
                }}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl border border-white/20 text-xs text-white/80 hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteForm}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>{isDeleting ? 'Deleting...' : 'Confirm Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
