import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  FileSpreadsheet,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  Search,
  Phone,
  MessageSquare,
  Clock,
  Sparkles,
  LogOut,
  AlertCircle,
  Check,
  Trash2,
  Filter,
  CheckCircle2,
  Copy,
  Send,
  UploadCloud,
  CheckCheck,
  Edit3,
} from 'lucide-react';
import GoogleSignInButton from './GoogleSignInButton';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from '../services/googleAuth';
import {
  DriveSheetFile,
  WhatsAppSheetEnquiry,
  listGoogleSheets,
  createWhatsAppEnquiriesSheet,
  appendWhatsAppEnquiryToSheet,
  readWhatsAppEnquiriesFromSheet,
  updateEnquiryStatusInSheet,
  deleteSheetFile,
  getLocalEnquiries,
  markTimestampSynced,
  getSyncedTimestamps,
} from '../services/googleSheetsService';

export default function GoogleSheetsTracker() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [creatingSheet, setCreatingSheet] = useState(false);
  const [isSyncingLocal, setIsSyncingLocal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sheets selection
  const [availableSheets, setAvailableSheets] = useState<DriveSheetFile[]>([]);
  const [selectedSheetId, setSelectedSheetId] = useState<string>(() => {
    return localStorage.getItem('spavibe_selected_sheet_id') || localStorage.getItem('me2spa_selected_sheet_id') || '';
  });
  const [activeSheetTab, setActiveSheetTab] = useState<string>('WhatsApp Enquiries');
  const [enquiries, setEnquiries] = useState<WhatsAppSheetEnquiry[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Manual Add Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newEnquiry, setNewEnquiry] = useState({
    phone: '',
    name: '',
    enquiryType: 'Appointment Booking',
    content: '',
  });
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  // Mandatory Confirmation Dialog for Updating Status (Workspace Integration Skill requirement)
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusUpdateTarget, setStatusUpdateTarget] = useState<{
    rowIndex: number;
    phone: string;
    oldStatus: string;
    newStatus: string;
  } | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Mandatory Confirmation Dialog for Deleting Sheet (Workspace Integration Skill requirement)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sheetToDelete, setSheetToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeletingSheet, setIsDeletingSheet] = useState(false);

  // Track local un-synced items
  const [localItemsCount, setLocalItemsCount] = useState(0);

  // Initialize Auth
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

  // Update local unsynced count
  useEffect(() => {
    const local = getLocalEnquiries();
    const synced = getSyncedTimestamps();
    const pending = local.filter((item) => !synced.has(item.timestamp));
    setLocalItemsCount(pending.length);
  }, []);

  // When token changes, load available sheets
  useEffect(() => {
    if (token) {
      loadSheets(token);
    }
  }, [token]);

  // When selectedSheetId changes, load sheet rows
  useEffect(() => {
    if (token && selectedSheetId) {
      localStorage.setItem('spavibe_selected_sheet_id', selectedSheetId);
      loadSheetData(token, selectedSheetId);
    }
  }, [token, selectedSheetId]);

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
      setError(err?.message || 'Google sign-in failed. Please grant Google Sheets permission.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setEnquiries([]);
  };

  const loadSheets = async (authToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const files = await listGoogleSheets(authToken);
      setAvailableSheets(files);

      if (!selectedSheetId && files.length > 0) {
        const preferred =
          files.find((f) => f.name.toLowerCase().includes('spavibe') || f.name.toLowerCase().includes('me2spa') || f.name.toLowerCase().includes('whatsapp')) ||
          files[0];
        setSelectedSheetId(preferred.id);
      } else if (selectedSheetId) {
        const exists = files.some((f) => f.id === selectedSheetId);
        if (!exists && files.length > 0) {
          setSelectedSheetId(files[0].id);
        }
      }
    } catch (err: any) {
      console.error('Error listing Google Sheets:', err);
      setError('Could not list Google Sheets. Please ensure Google Sheets permission is authorized.');
    } finally {
      setLoading(false);
    }
  };

  const loadSheetData = async (authToken: string, sheetId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await readWhatsAppEnquiriesFromSheet(authToken, sheetId);
      setActiveSheetTab(result.sheetName);
      setEnquiries(result.enquiries);
    } catch (err: any) {
      console.error('Error reading sheet data:', err);
      setError(err?.message || 'Failed to read spreadsheet data. Check if sheet tab exists.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewSheet = async () => {
    if (!token) return;
    setCreatingSheet(true);
    setError(null);
    try {
      const created = await createWhatsAppEnquiriesSheet(
        token,
        'SPAVIBE - WhatsApp Customer Enquiries & Threads Tracker'
      );
      setSelectedSheetId(created.spreadsheetId);
      localStorage.setItem('spavibe_selected_sheet_id', created.spreadsheetId);
      setSuccessMessage('Successfully created new Google Sheet with formatted enquiry columns!');
      setTimeout(() => setSuccessMessage(null), 4000);
      await loadSheets(token);
    } catch (err: any) {
      console.error('Error creating Google Sheet:', err);
      setError(err?.message || 'Failed to create Google Sheet.');
    } finally {
      setCreatingSheet(false);
    }
  };

  const handleSyncPendingThreads = async () => {
    if (!token || !selectedSheetId) return;
    setIsSyncingLocal(true);
    setError(null);
    try {
      const local = getLocalEnquiries();
      const synced = getSyncedTimestamps();
      const pending = local.filter((item) => !synced.has(item.timestamp));

      if (pending.length === 0) {
        setSuccessMessage('All WhatsApp customer inquiries are already synced with Google Sheets!');
        setTimeout(() => setSuccessMessage(null), 3000);
        return;
      }

      for (const item of pending) {
        await appendWhatsAppEnquiryToSheet(
          token,
          selectedSheetId,
          {
            timestamp: item.timestamp,
            phone: item.customerPhone,
            name: item.customerName,
            enquiryType: item.enquiryType,
            content: item.content,
            status: item.threadStatus,
            source: item.source || 'WhatsApp Floating Button',
          },
          activeSheetTab
        );
        markTimestampSynced(item.timestamp);
      }

      setLocalItemsCount(0);
      setSuccessMessage(`Synced ${pending.length} customer thread(s) to Google Sheets successfully!`);
      setTimeout(() => setSuccessMessage(null), 4000);
      await loadSheetData(token, selectedSheetId);
    } catch (err: any) {
      console.error('Error syncing threads:', err);
      setError(err?.message || 'Failed to sync pending customer inquiries to Google Sheets.');
    } finally {
      setIsSyncingLocal(false);
    }
  };

  // Manual Add Form Submission
  const handleManualAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedSheetId) return;
    setIsSubmittingNew(true);
    setError(null);
    try {
      const now = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      await appendWhatsAppEnquiryToSheet(
        token,
        selectedSheetId,
        {
          timestamp: `${now} (IST)`,
          phone: newEnquiry.phone,
          name: newEnquiry.name || 'WhatsApp Guest',
          enquiryType: newEnquiry.enquiryType,
          content: newEnquiry.content,
          status: 'Thread Opened',
          source: 'Concierge Desk Manual Log',
        },
        activeSheetTab
      );

      setAddModalOpen(false);
      setNewEnquiry({
        phone: '',
        name: '',
        enquiryType: 'Appointment Booking',
        content: '',
      });
      setSuccessMessage('Customer thread logged directly to Google Sheets!');
      setTimeout(() => setSuccessMessage(null), 4000);
      await loadSheetData(token, selectedSheetId);
    } catch (err: any) {
      console.error('Failed to log thread:', err);
      setError(err?.message || 'Failed to append thread to Google Sheets.');
    } finally {
      setIsSubmittingNew(false);
    }
  };

  // Status Change Confirmation Dialog Flow (MANDATORY per Workspace Integration Skill)
  const promptStatusChange = (rowIndex: number, phone: string, oldStatus: string, newStatus: string) => {
    setStatusUpdateTarget({
      rowIndex,
      phone,
      oldStatus,
      newStatus,
    });
    setStatusModalOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!token || !selectedSheetId || !statusUpdateTarget) return;
    setIsUpdatingStatus(true);
    try {
      await updateEnquiryStatusInSheet(
        token,
        selectedSheetId,
        statusUpdateTarget.rowIndex,
        statusUpdateTarget.newStatus,
        activeSheetTab
      );
      setStatusModalOpen(false);
      setStatusUpdateTarget(null);
      setSuccessMessage(`Updated thread status to "${statusUpdateTarget.newStatus}" in Google Sheets!`);
      setTimeout(() => setSuccessMessage(null), 3000);
      await loadSheetData(token, selectedSheetId);
    } catch (err: any) {
      console.error('Failed to update status in Google Sheet:', err);
      setError(err?.message || 'Failed to update thread status in Google Sheet.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Delete Sheet Confirmation Flow (MANDATORY per Workspace Integration Skill)
  const promptDeleteSheet = (id: string, name: string) => {
    setSheetToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  const confirmDeleteSheet = async () => {
    if (!token || !sheetToDelete) return;
    setIsDeletingSheet(true);
    try {
      await deleteSheetFile(token, sheetToDelete.id);
      setDeleteModalOpen(false);
      setSheetToDelete(null);
      if (selectedSheetId === sheetToDelete.id) {
        setSelectedSheetId('');
        setEnquiries([]);
      }
      setSuccessMessage('Google Sheet removed.');
      setTimeout(() => setSuccessMessage(null), 3000);
      await loadSheets(token);
    } catch (err: any) {
      console.error('Failed to delete Google Sheet:', err);
      setError(err?.message || 'Failed to delete Google Sheet.');
    } finally {
      setIsDeletingSheet(false);
    }
  };

  // Fallback to local entries if user not signed in yet
  const displayedEnquiries = user ? enquiries : getLocalEnquiries();

  // Filtered entries
  const filteredEnquiries = displayedEnquiries.filter((item) => {
    const matchesQuery =
      item.customerPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.enquiryType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'ALL' || item.enquiryType.toLowerCase().includes(typeFilter.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || item.threadStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesQuery && matchesType && matchesStatus;
  });

  const activeSheetMeta = availableSheets.find((s) => s.id === selectedSheetId);
  const sheetViewUrl = activeSheetMeta?.webViewLink || (selectedSheetId ? `https://docs.google.com/spreadsheets/d/${selectedSheetId}/edit` : null);

  return (
    <div className="bg-[#141014]/90 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Google Sheets WhatsApp Tracker</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
            WhatsApp Customer Enquiries &amp; Thread Log
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Every customer number, inquiry type, and content shared from the floating WhatsApp button
            is logged to Google Sheets so every customer thread is handled seamlessly.
          </p>
        </div>

        {/* Auth / Account Profile */}
        {user ? (
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-2xl p-2.5 self-start md:self-auto">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full border border-emerald-400/40"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
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
              text="Connect Google Sheets"
            />
          </div>
        )}
      </div>

      {/* Notifications */}
      {error && (
        <div className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="flex-1">{error}</div>
        </div>
      )}

      {successMessage && (
        <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-300">
          <CheckCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
          <div className="flex-1">{successMessage}</div>
        </div>
      )}

      {/* Unauthenticated Prompt Banner */}
      {!user && (
        <div className="mt-8 text-center py-10 px-6 bg-black/40 rounded-2xl border border-white/5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-lg">
            <FileSpreadsheet className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-2">
            Real-Time Google Sheets Synchronization
          </h3>
          <p className="text-white/60 text-xs sm:text-sm max-w-lg mx-auto mb-6 leading-relaxed">
            Connect your Google account with permission to sync and record all WhatsApp floating inquiries
            directly into your own <strong className="text-white">SPAVIBE Google Spreadsheet</strong>.
            All inquiries made by visitors are safely tracked and can be backed up automatically.
          </p>
          <div className="flex justify-center">
            <GoogleSignInButton
              onClick={handleLogin}
              loading={isLoggingIn}
              text="Sign in with Google to Connect Sheets"
            />
          </div>
        </div>
      )}

      {/* Authenticated Controls Bar */}
      {user && (
        <div className="mt-6 space-y-6">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label className="text-xs uppercase tracking-wider text-white/60 whitespace-nowrap flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Active Google Sheet:</span>
              </label>
              <select
                value={selectedSheetId}
                onChange={(e) => setSelectedSheetId(e.target.value)}
                disabled={loading || availableSheets.length === 0}
                className="bg-[#1A1518] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors cursor-pointer flex-1"
              >
                {availableSheets.length === 0 ? (
                  <option value="">No Google Sheets found in Drive</option>
                ) : (
                  availableSheets.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} {s.name.includes('SPAVIBE') ? '★ (Official SPAVIBE Log)' : ''}
                    </option>
                  ))
                )}
              </select>

              <button
                type="button"
                onClick={() => token && loadSheetData(token, selectedSheetId)}
                disabled={loading || !selectedSheetId}
                className="px-3.5 py-2.5 rounded-xl border border-white/20 text-xs text-white/80 hover:bg-white/5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                title="Refresh Sheet Rows"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleCreateNewSheet}
                disabled={creatingSheet}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer disabled:opacity-50"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{creatingSheet ? 'Creating Sheet...' : 'Create Official Tracker Sheet'}</span>
              </button>

              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                disabled={!selectedSheetId}
                className="px-3.5 py-2.5 rounded-xl border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Log New Thread</span>
              </button>

              {localItemsCount > 0 && (
                <button
                  type="button"
                  onClick={handleSyncPendingThreads}
                  disabled={isSyncingLocal || !selectedSheetId}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium flex items-center gap-1.5 hover:bg-amber-500/30 transition-colors cursor-pointer disabled:opacity-50"
                  title="Sync local visitor inquiries to Google Sheets"
                >
                  <UploadCloud className={`w-3.5 h-3.5 ${isSyncingLocal ? 'animate-spin' : ''}`} />
                  <span>Sync {localItemsCount} Local Thread{localItemsCount > 1 ? 's' : ''}</span>
                </button>
              )}

              {sheetViewUrl && (
                <>
                  <a
                    href={sheetViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl border border-white/20 text-xs text-white/80 hover:bg-white/5 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Open in Google Sheets</span>
                    <ExternalLink className="w-3 h-3 text-emerald-400" />
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      promptDeleteSheet(
                        selectedSheetId,
                        activeSheetMeta?.name || 'SPAVIBE WhatsApp Tracker'
                      )
                    }
                    className="p-2.5 rounded-xl border border-rose-500/20 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Delete Sheet from Drive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Active Sheet Banner */}
      {selectedSheetId && (
        <div className="mt-6 bg-gradient-to-r from-[#121915] via-[#1A261F] to-[#121915] border border-emerald-500/30 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                  Google Sheet Connected &amp; Logging
                </span>
                <span className="text-white/30 text-xs">•</span>
                <span className="text-xs text-white/60 font-mono">Tab: {activeSheetTab}</span>
              </div>
              <h3 className="font-serif text-xl text-white font-medium mt-1">
                {activeSheetMeta?.name || 'SPAVIBE WhatsApp Customer Inquiries'}
              </h3>
              <p className="text-white/50 text-xs mt-0.5">
                Every enquiry submitted via the WhatsApp floating button is recorded with customer phone, service requested, timestamp, and message.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/50">
                  Total Threads
                </div>
                <div className="text-lg font-serif text-emerald-400 font-semibold">
                  {enquiries.length}
                </div>
              </div>

              {sheetViewUrl && (
                <a
                  href={sheetViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <span>Edit in Sheets</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer phone number, name, inquiry type, or message..."
            className="w-full bg-[#1A1518] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-white/40" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#1A1518] border border-white/10 rounded-xl px-3 py-2 text-xs text-white/80 focus:outline-none focus:border-emerald-400"
            >
              <option value="ALL">All Inquiry Types</option>
              <option value="Appointment">Appointment Booking</option>
              <option value="Swedish">Swedish Deep Tissue</option>
              <option value="Ayurvedic">Kerala Ayurvedic</option>
              <option value="Aromatherapy">Aromatherapy</option>
              <option value="Thai">Thai Herbal</option>
              <option value="King">King Royal Suite</option>
              <option value="Membership">VIP Membership</option>
              <option value="General">General Inquiries</option>
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1A1518] border border-white/10 rounded-xl px-3 py-2 text-xs text-white/80 focus:outline-none focus:border-emerald-400"
          >
            <option value="ALL">All Thread Statuses</option>
            <option value="Thread Opened">Thread Opened</option>
            <option value="Replied on WhatsApp">Replied on WhatsApp</option>
            <option value="Booking Confirmed">Booking Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Pending Review">Pending Review</option>
          </select>
        </div>
      </div>

      {/* Threads List */}
      <div className="mt-6">
        {loading ? (
          <div className="text-center py-12 text-white/50 text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Reading latest rows from Google Sheets...</span>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-center py-12 px-6 bg-black/20 rounded-2xl border border-white/5">
            <FileSpreadsheet className="w-10 h-10 text-white/20 mx-auto mb-3" />
            <div className="text-sm text-white font-medium">No Customer Threads Found</div>
            <p className="text-xs text-white/50 mt-1 max-w-md mx-auto">
              {displayedEnquiries.length === 0
                ? 'No customer inquiries have been logged to this Google Sheet yet. Any enquiry sent through the floating WhatsApp button on any page will automatically appear here.'
                : 'No customer threads match your current search and filter criteria.'}
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
              >
                Log Test Thread to Sheet
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEnquiries.map((thread, idx) => {
              const cleanPhone = thread.customerPhone.replace(/[^0-9]/g, '');
              const statusColors: Record<string, string> = {
                'Thread Opened': 'bg-amber-500/10 text-amber-300 border-amber-500/30',
                'Replied on WhatsApp': 'bg-sky-500/10 text-sky-300 border-sky-500/30',
                'Booking Confirmed': 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
                Completed: 'bg-neutral-500/20 text-neutral-300 border-neutral-500/30',
                'Pending Review': 'bg-purple-500/10 text-purple-300 border-purple-500/30',
              };
              const badgeClass = statusColors[thread.threadStatus] || statusColors['Thread Opened'];

              return (
                <div
                  key={`${thread.rowIndex}-${thread.timestamp}-${idx}`}
                  className="bg-[#1A1518]/70 border border-white/10 hover:border-emerald-500/40 rounded-2xl p-5 transition-all shadow-md group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-white font-mono text-base flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{thread.customerPhone}</span>
                        </span>
                        {thread.customerName && thread.customerName !== 'Guest' && (
                          <span className="text-xs text-white/70">({thread.customerName})</span>
                        )}
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D48FB1]/10 text-[#D48FB1] border border-[#D48FB1]/30 font-medium">
                          {thread.enquiryType}
                        </span>
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full border font-medium ${badgeClass}`}
                        >
                          {thread.threadStatus}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-white/50 mt-1.5 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-white/40" />
                          {thread.timestamp}
                        </span>
                        <span className="text-[11px] text-white/40">Source: {thread.source}</span>
                        {thread.rowIndex > 0 && (
                          <span className="text-[10px] text-emerald-400/70 font-mono">
                            Google Sheets Row #{thread.rowIndex}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status updater dropdown button */}
                    {user && thread.rowIndex > 0 && (
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <select
                          value={thread.threadStatus}
                          onChange={(e) =>
                            promptStatusChange(
                              thread.rowIndex,
                              thread.customerPhone,
                              thread.threadStatus,
                              e.target.value
                            )
                          }
                          className="bg-[#121013] border border-white/20 rounded-xl px-2.5 py-1.5 text-[11px] text-white/80 focus:outline-none focus:border-emerald-400 cursor-pointer"
                        >
                          <option value="Thread Opened">Thread Opened</option>
                          <option value="Replied on WhatsApp">Replied on WhatsApp</option>
                          <option value="Booking Confirmed">Booking Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Pending Review">Pending Review</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Message Content shared via WhatsApp */}
                  <div className="mt-3 text-xs text-white/80 leading-relaxed bg-black/40 rounded-xl p-3.5 border border-white/5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-wider text-emerald-400/80 font-semibold flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>Content Shared via WhatsApp Floating Button:</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(thread.content);
                          setCopiedId(thread.timestamp);
                          setTimeout(() => setCopiedId(null), 2000);
                        }}
                        className="text-[10px] text-white/40 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedId === thread.timestamp ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="whitespace-pre-line text-white/90">
                      {thread.content || 'Direct WhatsApp conversation link opened.'}
                    </p>
                  </div>

                  {/* Quick Action Buttons for Concierge Desk */}
                  <div className="mt-4 pt-3 flex items-center justify-between gap-3 flex-wrap">
                    <div className="text-[11px] text-white/40">
                      Keep thread active until booking confirmed.
                    </div>

                    <div className="flex items-center gap-2">
                      {cleanPhone && (
                        <>
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                              `Hello from SPAVIBE Concierge Desk! We received your inquiry regarding "${thread.enquiryType}". How may we assist your booking?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium flex items-center gap-1 hover:bg-emerald-500/30 transition-colors"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Reply on WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${cleanPhone}`}
                            className="px-3 py-1.5 rounded-lg border border-white/20 text-white/80 text-[11px] hover:bg-white/5 flex items-center gap-1 transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Guest</span>
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Manual Add Thread Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1518] border border-emerald-500/30 rounded-3xl p-6 max-w-lg w-full shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <h3 className="font-serif text-lg text-white font-medium">
                  Log Customer Thread to Google Sheet
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="text-white/40 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualAddSubmit} className="space-y-4">
              <div>
                <label className="block text-white/80 text-xs uppercase tracking-wider mb-1.5">
                  Customer Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 7306 364 454 or customer mobile"
                  value={newEnquiry.phone}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, phone: e.target.value })}
                  className="w-full bg-[#121013] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-white/80 text-xs uppercase tracking-wider mb-1.5">
                  Customer Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={newEnquiry.name}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, name: e.target.value })}
                  className="w-full bg-[#121013] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-white/80 text-xs uppercase tracking-wider mb-1.5">
                  Enquiry Type *
                </label>
                <select
                  value={newEnquiry.enquiryType}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, enquiryType: e.target.value })}
                  className="w-full bg-[#121013] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  <option value="Appointment Booking">Appointment Booking</option>
                  <option value="Swedish Deep Tissue Recovery">Swedish Deep Tissue Recovery (90 min)</option>
                  <option value="Kerala Ayurvedic Abhyanga Ritual">Kerala Ayurvedic Abhyanga Ritual (60 min)</option>
                  <option value="Aromatherapy & Herbal Steam Session">Aromatherapy &amp; Herbal Steam Session</option>
                  <option value="Thai Herbal Compress & Warm Oil">Thai Herbal Compress &amp; Warm Oil</option>
                  <option value="King Royal Suite Private Day Retreat">King Royal Suite Private Day Retreat</option>
                  <option value="VIP Membership & Corporate Pass">VIP Membership &amp; Corporate Pass</option>
                  <option value="Custom Sanctuary Enquiry">Custom Sanctuary Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-xs uppercase tracking-wider mb-1.5">
                  Content / WhatsApp Message Shared *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Message text or customer questions regarding booking slot..."
                  value={newEnquiry.content}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, content: e.target.value })}
                  className="w-full bg-[#121013] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-xs text-white/70 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingNew}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {isSubmittingNew ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{isSubmittingNew ? 'Appending to Sheet...' : 'Append to Google Sheet'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANDATORY Confirmation Dialog for Mutating Thread Status (Workspace Integration Skill) */}
      {statusModalOpen && statusUpdateTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1518] border border-emerald-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Edit3 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-white font-medium mb-2">
              Confirm Status Update in Google Sheets
            </h3>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6">
              Are you sure you want to update Google Sheets Row #{statusUpdateTarget.rowIndex} for{' '}
              <strong className="text-white">{statusUpdateTarget.phone}</strong> from{' '}
              <span className="text-amber-400 font-medium">"{statusUpdateTarget.oldStatus}"</span> to{' '}
              <span className="text-emerald-400 font-semibold">"{statusUpdateTarget.newStatus}"</span>?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setStatusModalOpen(false);
                  setStatusUpdateTarget(null);
                }}
                disabled={isUpdatingStatus}
                className="px-5 py-2.5 rounded-xl border border-white/20 text-xs text-white/80 hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmStatusChange}
                disabled={isUpdatingStatus}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isUpdatingStatus ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>{isUpdatingStatus ? 'Updating Sheet...' : 'Confirm Update'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANDATORY Confirmation Dialog for Deleting Sheet (Workspace Integration Skill) */}
      {deleteModalOpen && sheetToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1C161A] border border-rose-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-white font-medium mb-2">
              Confirm Google Sheet Deletion
            </h3>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6">
              Are you sure you want to permanently delete{' '}
              <strong className="text-white font-semibold">"{sheetToDelete.name}"</strong> from your
              Google Drive? All logged WhatsApp inquiry rows will be lost. This cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setSheetToDelete(null);
                }}
                disabled={isDeletingSheet}
                className="px-5 py-2.5 rounded-xl border border-white/20 text-xs text-white/80 hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteSheet}
                disabled={isDeletingSheet}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeletingSheet ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>{isDeletingSheet ? 'Deleting Sheet...' : 'Confirm Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
