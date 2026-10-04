import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStage } from '../../types';
import { OfferLetterModal } from '../modals/OfferLetterModal';
import { AssessmentModal } from '../modals/AssessmentModal';
import { 
  Kanban, 
  Clock, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  Video, 
  FileText, 
  Sparkles, 
  ChevronRight, 
  Upload, 
  AlertCircle,
  ExternalLink,
  Award,
  CheckSquare,
  Square
} from 'lucide-react';

export const ApplicantTrackerView: React.FC = () => {
  const { 
    applications, 
    currentUser, 
    offerLetters, 
    signOfferLetter, 
    onboardingTasks, 
    toggleOnboardingTask,
    uploadOnboardingDoc,
    interviews,
    assessment,
    submitAssessment,
    setActiveVideoCallId,
    setActiveTab
  } = useApp();

  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showOnboardingDrawer, setShowOnboardingDrawer] = useState(false);

  // User's own applications
  const userApplications = applications.filter(a => a.applicantId === currentUser.id);

  // Group by stage
  const stages: { id: ApplicationStage; title: string; color: string; desc: string }[] = [
    { id: 'applied', title: 'Applied', color: 'border-slate-300 text-slate-700', desc: 'Submitted & awaiting review' },
    { id: 'viewed', title: 'Viewed', color: 'border-blue-400 text-blue-700', desc: 'Opened by hiring recruiter' },
    { id: 'shortlisted', title: 'Shortlisted', color: 'border-indigo-400 text-indigo-700', desc: 'Selected for evaluation' },
    { id: 'interview', title: 'Interview', color: 'border-amber-400 text-amber-700', desc: 'Live technical / cultural rounds' },
    { id: 'offer', title: 'Offer Extended', color: 'border-emerald-400 text-emerald-700', desc: 'Pending candidate signature' },
    { id: 'hired', title: 'Hired 🎉', color: 'border-emerald-600 text-emerald-800', desc: 'Offer signed & onboarding' }
  ];

  const activeOffer = offerLetters.find(o => o.id === selectedOfferId) || offerLetters[0];
  const completedTasksCount = onboardingTasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Application Tracking System (ATS)
              </h1>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded">
                Applicant Portal
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Full transparency on every application: track stages in real time, review offer contracts, attend video interviews, and complete your onboarding paperwork.
            </p>
          </div>

          {/* Quick Offer Alert if any */}
          {offerLetters.some(o => o.status === 'sent') && (
            <button
              onClick={() => setSelectedOfferId(offerLetters[0]?.id || null)}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs flex items-center gap-2 shrink-0 animate-pulse"
            >
              <Sparkles className="w-4 h-4" />
              1 Pending Offer Available!
            </button>
          )}
        </div>

        {/* Quick metrics bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-400 block font-medium">Total Applications</span>
            <span className="text-lg font-bold text-slate-900 font-mono mt-0.5 block">{userApplications.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-400 block font-medium">In Interview Loops</span>
            <span className="text-lg font-bold text-amber-700 font-mono mt-0.5 block">
              {userApplications.filter(a => a.stage === 'interview').length}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-400 block font-medium">Offers Received</span>
            <span className="text-lg font-bold text-emerald-700 font-mono mt-0.5 block">
              {offerLetters.length}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-400 block font-medium">Onboarding Tasks</span>
            <span className="text-lg font-bold text-indigo-700 font-mono mt-0.5 block">
              {completedTasksCount} / {onboardingTasks.length} Done
            </span>
          </div>
        </div>
      </div>

      {/* Kanban Board Horizontal Scroll */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1100px]">
          {stages.map(stage => {
            const stageApps = userApplications.filter(a => a.stage === stage.id);
            return (
              <div 
                key={stage.id} 
                className="w-72 shrink-0 bg-slate-100/70 border border-slate-200 rounded-xl p-3 flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <div>
                    <h3 className={`text-xs font-bold ${stage.color}`}>
                      {stage.title}
                    </h3>
                    <p className="text-[10px] text-slate-400">{stage.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">
                    {stageApps.length}
                  </span>
                </div>

                {/* Column Applications */}
                <div className="space-y-3 flex-1">
                  {stageApps.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-slate-400 italic">
                      No applications
                    </div>
                  ) : (
                    stageApps.map(app => {
                      const hasScheduledInterview = interviews.some(i => i.applicationId === app.id && i.status === 'scheduled');
                      const hasOffer = offerLetters.some(o => o.applicationId === app.id);
                      const isOfferSigned = offerLetters.some(o => o.applicationId === app.id && o.status === 'accepted');

                      return (
                        <div 
                          key={app.id}
                          className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-xs space-y-2.5 hover:border-slate-300 transition-colors"
                        >
                          <div className="flex items-start gap-2.5">
                            <img 
                              src={app.companyLogo} 
                              alt={app.companyName} 
                              referrerPolicy="no-referrer"
                              className="w-8 h-8 rounded-md object-cover border border-slate-200 shrink-0" 
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                                {app.jobTitle}
                              </h4>
                              <p className="text-[11px] text-slate-500">{app.companyName}</p>
                            </div>
                          </div>

                          {/* Applied metadata */}
                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                            <span>Applied: {app.appliedDate}</span>
                            <span className="text-slate-500 font-mono">Updated {app.updatedDate}</span>
                          </div>

                          {/* Stage-specific Interactive Action CTAs */}
                          {app.stage === 'offer' && hasOffer && (
                            <div className="pt-1">
                              <button
                                onClick={() => setSelectedOfferId(offerLetters.find(o => o.applicationId === app.id)?.id || null)}
                                className="w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                {isOfferSigned ? 'View Executed Offer' : 'Review & Sign Offer'}
                              </button>
                            </div>
                          )}

                          {app.stage === 'hired' && (
                            <div className="pt-1">
                              <button
                                onClick={() => setShowOnboardingDrawer(true)}
                                className="w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                              >
                                <CheckSquare className="w-3.5 h-3.5" />
                                Onboarding Checklist ({completedTasksCount}/{onboardingTasks.length})
                              </button>
                            </div>
                          )}

                          {app.stage === 'interview' && (
                            <div className="pt-1 space-y-1.5">
                              {hasScheduledInterview && (
                                <button
                                  onClick={() => {
                                    setActiveVideoCallId('int-1');
                                    setActiveTab('interviews');
                                  }}
                                  className="w-full py-1.5 px-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                                >
                                  <Video className="w-3.5 h-3.5" />
                                  Enter Video Interview Room
                                </button>
                              )}
                              
                              {!app.assessmentPassed && (
                                <button
                                  onClick={() => setShowAssessmentModal(true)}
                                  className="w-full py-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold flex items-center justify-center gap-1"
                                >
                                  <Award className="w-3 h-3 text-indigo-600" />
                                  Take Technical Quiz
                                </button>
                              )}
                            </div>
                          )}

                          {/* Recruiter Notes preview */}
                          {app.notes.length > 0 && (
                            <div className="p-2 bg-slate-50 rounded text-[10px] text-slate-600 border border-slate-100">
                              <span className="font-semibold text-slate-800">Recruiter Note:</span> {app.notes[app.notes.length - 1].text}
                            </div>
                          )}

                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Onboarding Checklist Modal / Section */}
      {showOnboardingDrawer && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  New Hire Onboarding Portal — Paystack
                </h3>
                <span className="text-[11px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                  Status: Active Onboarding
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Complete your compliance paperwork, equipment selection, and team orientation before Day 1.
              </p>
            </div>

            <button
              onClick={() => setShowOnboardingDrawer(false)}
              className="text-xs text-slate-500 hover:text-slate-800 underline"
            >
              Hide Checklist
            </button>
          </div>

          {/* Progress bar */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-800">Onboarding Completion Progress</span>
              <span className="font-mono text-indigo-600 font-bold">
                {Math.round((completedTasksCount / onboardingTasks.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(completedTasksCount / onboardingTasks.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Task list */}
          <div className="space-y-3">
            {onboardingTasks.map(task => (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-colors flex items-start justify-between gap-4 ${
                  task.completed ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleOnboardingTask(task.id)}
                    className="mt-0.5 text-slate-400 hover:text-indigo-600"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  <div>
                    <h4 className={`text-xs font-bold ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {task.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{task.description}</p>
                    
                    {task.uploadedFileName && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded font-mono mt-1.5">
                        <FileText className="w-3 h-3" /> {task.uploadedFileName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] text-slate-400 font-mono">Due: {task.dueDate}</span>
                  {task.requiredFile && !task.uploadedFileName && (
                    <label className="px-3 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 border border-indigo-200 rounded-md cursor-pointer">
                      Upload Doc
                      <input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            uploadOnboardingDoc(task.id, e.target.files[0].name);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Offer Letter Modal */}
      {selectedOfferId && activeOffer && (
        <OfferLetterModal
          offer={activeOffer}
          onClose={() => setSelectedOfferId(null)}
          onAccept={(sigUrl) => {
            signOfferLetter(activeOffer.id, sigUrl);
            setSelectedOfferId(null);
            setShowOnboardingDrawer(true);
          }}
        />
      )}

      {/* Assessment Modal */}
      {showAssessmentModal && (
        <AssessmentModal
          assessment={assessment}
          onClose={() => setShowAssessmentModal(false)}
          onSubmit={(score, passed) => {
            submitAssessment(score, passed);
          }}
        />
      )}

    </div>
  );
};
