import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStage } from '../../types';
import { 
  Kanban, 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  Video, 
  FileText, 
  Plus, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  X,
  Sparkles,
  ChevronRight,
  MoreVertical,
  ExternalLink,
  UserCheck
} from 'lucide-react';

export const EmployerATSView: React.FC = () => {
  const { 
    applications, 
    updateApplicationStage, 
    rateApplication, 
    addApplicationNote,
    scheduleInterview,
    createOfferLetter,
    currentUser,
    startOrOpenConversation,
    jobs
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobFilter, setSelectedJobFilter] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState<Application | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Interview Scheduler Modal
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [schedulingApp, setSchedulingApp] = useState<Application | null>(null);
  const [interviewDate, setInterviewDate] = useState('Oct 08, 2026');
  const [interviewTime, setInterviewTime] = useState('02:00 PM');
  const [interviewRound, setInterviewRound] = useState<'HR Screening' | 'Technical Round' | 'System Architecture' | 'Culture Fit'>('Technical Round');
  const [interviewerName, setInterviewerName] = useState(currentUser.name);

  // Offer Letter Generation Modal
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offeringApp, setOfferingApp] = useState<Application | null>(null);
  const [offerSalary, setOfferSalary] = useState(24000000);
  const [offerCurrency, setOfferCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [offerSigningBonus, setOfferSigningBonus] = useState(2000000);
  const [offerStockOptions, setOfferStockOptions] = useState('0.04% Equity Options');
  const [offerStartDate, setOfferStartDate] = useState('November 02, 2026');

  const stages: { id: ApplicationStage; title: string; color: string }[] = [
    { id: 'applied', title: 'New Applied', color: 'border-slate-300 text-slate-700' },
    { id: 'viewed', title: 'Reviewed', color: 'border-blue-400 text-blue-700' },
    { id: 'shortlisted', title: 'Shortlisted', color: 'border-indigo-400 text-indigo-700' },
    { id: 'interview', title: 'Interviewing', color: 'border-amber-400 text-amber-700' },
    { id: 'offer', title: 'Offer Extended', color: 'border-purple-400 text-purple-700' },
    { id: 'hired', title: 'Hired 🎉', color: 'border-emerald-500 text-emerald-800' }
  ];

  const filteredApplications = applications.filter(app => {
    if (selectedJobFilter !== 'All' && app.jobId !== selectedJobFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = app.applicantName.toLowerCase().includes(q);
      const matchJob = app.jobTitle.toLowerCase().includes(q);
      const matchSkills = app.applicantSkills.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchJob && !matchSkills) return false;
    }
    return true;
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate || !newNoteText.trim()) return;
    addApplicationNote(selectedCandidate.id, newNoteText);
    // update local selected candidate
    setSelectedCandidate(prev => prev ? {
      ...prev,
      notes: [...prev.notes, {
        id: `n-${Date.now()}`,
        authorName: currentUser.name,
        authorRole: 'Lead Recruiter',
        text: newNoteText,
        createdAt: 'Just now'
      }]
    } : null);
    setNewNoteText('');
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulingApp) return;

    scheduleInterview({
      applicationId: schedulingApp.id,
      jobId: schedulingApp.jobId,
      jobTitle: schedulingApp.jobTitle,
      companyId: schedulingApp.companyId,
      companyName: schedulingApp.companyName,
      companyLogo: schedulingApp.companyLogo,
      applicantId: schedulingApp.applicantId,
      applicantName: schedulingApp.applicantName,
      applicantEmail: schedulingApp.applicantEmail,
      applicantAvatar: schedulingApp.applicantAvatar,
      date: interviewDate,
      time: interviewTime,
      durationMinutes: 45,
      roundType: interviewRound,
      interviewerName: interviewerName || currentUser.name,
      interviewerRole: 'Hiring Committee',
      notes: `Virtual video interview room for ${schedulingApp.jobTitle} with ${schedulingApp.applicantName}.`
    });

    setShowScheduleModal(false);
    setSchedulingApp(null);
  };

  const handleCreateOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offeringApp) return;

    createOfferLetter({
      applicationId: offeringApp.id,
      jobId: offeringApp.jobId,
      jobTitle: offeringApp.jobTitle,
      companyId: offeringApp.companyId,
      companyName: offeringApp.companyName,
      companyLogo: offeringApp.companyLogo,
      applicantId: offeringApp.applicantId,
      applicantName: offeringApp.applicantName,
      baseSalary: offerSalary,
      currency: offerCurrency,
      signingBonus: offerSigningBonus,
      stockOptions: offerStockOptions,
      startDate: offerStartDate,
      reportingManager: 'Head of Engineering',
      location: offeringApp.applicantLocation || 'Lagos, Nigeria',
      benefitsSummary: [
        `Base Salary: ₦${(offerSalary/1000000).toFixed(1)}M gross per annum`,
        'Full HMO medical coverage for employee & dependents',
        'Unlimited PTO policy',
        '$3,000 USD Annual Learning & Conference Budget',
        'MacBook Pro hardware setup'
      ],
      expiryDate: 'Oct 24, 2026',
      letterContent: `Dear ${offeringApp.applicantName},\n\nWe are delighted to extend this formal offer of employment for the role of ${offeringApp.jobTitle} at ${offeringApp.companyName}.\n\nPlease review the terms and execute your signature to begin onboarding.`
    });

    setShowOfferModal(false);
    setOfferingApp(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top ATS Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Recruiter ATS Pipeline
              </h1>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded">
                Paystack Talent Ops
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage candidates across pipeline stages, rate technical fit, collaborate on interview notes, and schedule video loops.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-600 font-semibold">
              {filteredApplications.length} Candidates in Pipeline
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name, job title, or skill..."
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Filter by Role:</span>
            <select
              value={selectedJobFilter}
              onChange={(e) => setSelectedJobFilter(e.target.value)}
              className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
            >
              <option value="All">All Job Postings</option>
              {jobs.map(j => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1200px]">
          {stages.map(stage => {
            const stageApps = filteredApplications.filter(a => a.stage === stage.id);
            return (
              <div 
                key={stage.id} 
                className="w-72 shrink-0 bg-slate-100/70 border border-slate-200 rounded-xl p-3 flex flex-col min-h-[500px]"
              >
                {/* Column Title */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <h3 className={`text-xs font-bold ${stage.color}`}>
                    {stage.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">
                    {stageApps.length}
                  </span>
                </div>

                {/* Candidate Cards */}
                <div className="space-y-3 flex-1">
                  {stageApps.length === 0 ? (
                    <div className="py-12 text-center text-[11px] text-slate-400 italic">
                      No candidates in this stage
                    </div>
                  ) : (
                    stageApps.map(app => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedCandidate(app)}
                        className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-xs space-y-2 hover:border-indigo-400 hover:shadow-sm cursor-pointer transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5">
                            <img 
                              src={app.applicantAvatar} 
                              alt={app.applicantName} 
                              referrerPolicy="no-referrer"
                              className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" 
                            />
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                                {app.applicantName}
                              </h4>
                              <p className="text-[10px] text-slate-500 line-clamp-1">{app.applicantHeadline}</p>
                            </div>
                          </div>

                          {/* 1-5 Star rating */}
                          <div className="flex items-center text-amber-500 text-xs shrink-0">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  rateApplication(app.id, star);
                                }}
                                className={`text-[11px] ${star <= (app.rating || 0) ? 'text-amber-500' : 'text-slate-200'}`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-1 text-[11px] text-slate-600 font-medium">
                          Role: <span className="text-slate-900">{app.jobTitle}</span>
                        </div>

                        {/* Skills preview */}
                        <div className="flex flex-wrap gap-1">
                          {app.applicantSkills.slice(0, 3).map((sk, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                              {sk}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons inside card */}
                        <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-[11px]">
                          <select
                            value={app.stage}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => updateApplicationStage(app.id, e.target.value as ApplicationStage)}
                            className="text-[11px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded px-1.5 py-1"
                          >
                            <option value="applied">Applied</option>
                            <option value="viewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Rejected</option>
                          </select>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSchedulingApp(app);
                                setShowScheduleModal(true);
                              }}
                              className="p-1 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 rounded"
                              title="Schedule Interview"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOfferingApp(app);
                                setShowOfferModal(true);
                              }}
                              className="p-1 hover:bg-slate-100 text-slate-500 hover:text-emerald-600 rounded"
                              title="Create Offer Letter"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Candidate Detail Modal / Drawer */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedCandidate.applicantAvatar} 
                  alt={selectedCandidate.applicantName} 
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedCandidate.applicantName}</h3>
                  <p className="text-xs text-slate-500">{selectedCandidate.applicantHeadline}</p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedCandidate(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Candidate Content */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-xs text-slate-700">
              
              {/* Quick info row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Applying For</span>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{selectedCandidate.jobTitle}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Stage</span>
                  <p className="text-xs font-bold text-indigo-600 capitalize mt-0.5">{selectedCandidate.stage}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Contact Email</span>
                  <p className="text-xs font-medium text-slate-800 mt-0.5">{selectedCandidate.applicantEmail}</p>
                </div>
              </div>

              {/* Cover Pitch */}
              {selectedCandidate.coverNote && (
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Candidate Pitch / Cover Note
                  </h4>
                  <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs leading-relaxed italic text-slate-700">
                    "{selectedCandidate.coverNote}"
                  </p>
                </div>
              )}

              {/* Verified Technical Skills */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Applicant Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.applicantSkills.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-medium text-slate-800">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recruiter Evaluation Notes */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Internal Recruiter & Interview Notes
                </h4>
                
                <div className="space-y-2 mb-3">
                  {selectedCandidate.notes.length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic">No internal feedback added yet.</p>
                  ) : (
                    selectedCandidate.notes.map(note => (
                      <div key={note.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-800 mb-1">
                          <span>{note.authorName} ({note.authorRole})</span>
                          <span className="text-slate-400 font-normal">{note.createdAt}</span>
                        </div>
                        <p className="text-xs text-slate-700">{note.text}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add note input */}
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add interview feedback or notes..."
                    className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Add Note
                  </button>
                </form>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => {
                    startOrOpenConversation(
                      selectedCandidate.applicantId,
                      selectedCandidate.applicantName,
                      selectedCandidate.applicantAvatar,
                      selectedCandidate.applicantHeadline
                    );
                    setSelectedCandidate(null);
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Direct Message Candidate
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSchedulingApp(selectedCandidate);
                      setShowScheduleModal(true);
                      setSelectedCandidate(null);
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    Schedule Interview
                  </button>
                  <button
                    onClick={() => {
                      setOfferingApp(selectedCandidate);
                      setShowOfferModal(true);
                      setSelectedCandidate(null);
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Send Offer Letter
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {showScheduleModal && schedulingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                Schedule Interview — {schedulingApp.applicantName}
              </h3>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Interview Round Type
                </label>
                <select
                  value={interviewRound}
                  onChange={(e) => setInterviewRound(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                >
                  <option value="HR Screening">HR Screening (30 mins)</option>
                  <option value="Technical Round">Technical Coding Round (60 mins)</option>
                  <option value="System Architecture">System Architecture & Design (60 mins)</option>
                  <option value="Culture Fit">Culture & Leadership Fit (45 mins)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Interviewer / Panel Lead
                </label>
                <input
                  type="text"
                  value={interviewerName}
                  onChange={(e) => setInterviewerName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-900">
                <span className="font-semibold block">Automatic Video Link Generation</span>
                A secure WebRTC video room link will be automatically generated and synced with Google Calendar for the candidate.
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  Confirm & Send Invite
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Offer Letter Generator Modal */}
      {showOfferModal && offeringApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                Generate Offer Letter — {offeringApp.applicantName}
              </h3>
              <button 
                onClick={() => setShowOfferModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOfferSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Annual Gross Base Salary
                  </label>
                  <input
                    type="number"
                    value={offerSalary}
                    onChange={(e) => setOfferSalary(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Currency
                  </label>
                  <select
                    value={offerCurrency}
                    onChange={(e) => setOfferCurrency(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                  >
                    <option value="NGN">NGN (₦)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Signing Bonus
                </label>
                <input
                  type="number"
                  value={offerSigningBonus}
                  onChange={(e) => setOfferSigningBonus(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Equity Options
                </label>
                <input
                  type="text"
                  value={offerStockOptions}
                  onChange={(e) => setOfferStockOptions(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Anticipated Start Date
                </label>
                <input
                  type="text"
                  value={offerStartDate}
                  onChange={(e) => setOfferStartDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowOfferModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md"
                >
                  Generate & Send Offer
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
