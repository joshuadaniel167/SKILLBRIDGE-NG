import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Job } from '../../types';
import { X, FileText, CheckCircle2, Upload, Sparkles, Building, MapPin, DollarSign } from 'lucide-react';

interface EasyApplyModalProps {
  job: Job;
  onClose: () => void;
  onSuccess?: () => void;
}

export const EasyApplyModal: React.FC<EasyApplyModalProps> = ({ job, onClose, onSuccess }) => {
  const { currentUser, applyToJob } = useApp();
  const [coverNote, setCoverNote] = useState(
    `Hello ${job.companyName} Team, I am eager to contribute to the ${job.title} role. With my background in ${currentUser.skills.slice(0, 3).map(s => s.name).join(', ')}, I can make an immediate positive impact.`
  );
  const [resumeName, setResumeName] = useState(currentUser.cvFileName || 'Joshua_Daniel_Senior_FullStack_Resume.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const ok = applyToJob(job.id, coverNote, resumeName);
      setIsSubmitting(false);
      if (ok) {
        setSubmitted(true);
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 1500);
      } else {
        alert('You have already submitted an application for this position.');
        onClose();
      }
    }, 600);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const formatSalary = (min: number, max: number, currency: 'NGN' | 'USD') => {
    if (currency === 'USD') return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k / year`;
    return `₦${(min / 1000000).toFixed(1)}M - ₦${(max / 1000000).toFixed(1)}M / year`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
              SkillBridge 1-Click Easy Apply
            </span>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              {job.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {job.companyName} · {job.location}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3 animate-bounce" />
            <h4 className="text-lg font-bold text-slate-900">Application Submitted!</h4>
            <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
              Your profile and verified credentials have been sent directly to {job.companyName}’s recruiting dashboard. You can track status updates in your ATS.
            </p>
          </div>
        ) : (
          <form onSubmit={handleApply} className="p-6 space-y-4">
            
            {/* Applicant summary card */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border border-slate-300"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser.headline}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                  <span>{currentUser.email}</span>
                  <span>·</span>
                  <span>{currentUser.location}</span>
                </div>
              </div>
            </div>

            {/* Resume Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Attached Resume / CV
              </label>
              <div className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-800 truncate">{resumeName}</p>
                    <p className="text-[10px] text-slate-500">Auto-synced from your profile</p>
                  </div>
                </div>

                <label className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer shrink-0 ml-3">
                  Replace
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileChange}
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            {/* Note / Pitch */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Cover Note / Pitch to Recruiter
                </label>
                <span className="text-[10px] text-slate-400">Optional</span>
              </div>
              <textarea
                rows={4}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Highlight your relevant experience or reasons for joining..."
              />
            </div>

            {/* Role quick stats */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Compensation:</span>
                <span className="font-semibold text-slate-900 font-mono">
                  {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Workplace:</span>
                <span className="capitalize font-medium text-slate-800">{job.workplaceType}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
