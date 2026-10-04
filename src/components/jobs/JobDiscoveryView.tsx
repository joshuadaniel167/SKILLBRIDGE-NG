import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Job } from '../../types';
import { EasyApplyModal } from '../modals/EasyApplyModal';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  Check, 
  Sparkles, 
  Building2, 
  ChevronRight, 
  Coffee, 
  Users, 
  Share2, 
  Clock, 
  CheckCircle, 
  ExternalLink,
  SlidersHorizontal,
  X
} from 'lucide-react';

export const JobDiscoveryView: React.FC = () => {
  const { 
    jobs, 
    savedJobIds, 
    toggleSaveJob, 
    applications, 
    currentUser, 
    connectors, 
    startOrOpenConversation, 
    setActiveTab, 
    setSelectedCompanyId 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('All');
  const [selectedJobType, setSelectedJobType] = useState<string>('All');
  const [selectedExpLevel, setSelectedExpLevel] = useState<string>('All');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [feedTab, setFeedTab] = useState<'all' | 'recommended' | 'saved'>('all');
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // User skills set for recommendation matching
  const userSkillNames = useMemo(() => {
    return new Set(currentUser.skills.map(s => s.name.toLowerCase()));
  }, [currentUser.skills]);

  // Compute skill match score for a job
  const getJobMatchScore = (job: Job) => {
    if (!job.skills || job.skills.length === 0) return 70;
    const matches = job.skills.filter(sk => userSkillNames.has(sk.toLowerCase())).length;
    const ratio = matches / job.skills.length;
    return Math.min(98, Math.max(65, Math.round(ratio * 40 + 58)));
  };

  // Filtered and sorted jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Feed tab
      if (feedTab === 'saved' && !savedJobIds.includes(job.id)) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.companyName.toLowerCase().includes(q);
        const matchesSkills = job.skills.some(s => s.toLowerCase().includes(q));
        const matchesDesc = job.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesDesc) return false;
      }

      // Location
      if (selectedLocation !== 'All' && !job.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Workplace
      if (selectedWorkplace !== 'All' && job.workplaceType !== selectedWorkplace) {
        return false;
      }

      // Job Type
      if (selectedJobType !== 'All' && job.jobType !== selectedJobType) {
        return false;
      }

      // Experience Level
      if (selectedExpLevel !== 'All' && job.experienceLevel !== selectedExpLevel) {
        return false;
      }

      // Department
      if (selectedDepartment !== 'All' && job.department !== selectedDepartment) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (feedTab === 'recommended') {
        return getJobMatchScore(b) - getJobMatchScore(a);
      }
      return 0; // preserve order
    });
  }, [
    jobs, 
    feedTab, 
    savedJobIds, 
    searchQuery, 
    selectedLocation, 
    selectedWorkplace, 
    selectedJobType, 
    selectedExpLevel, 
    selectedDepartment,
    userSkillNames
  ]);

  const activeJob = jobs.find(j => j.id === selectedJobId) || filteredJobs[0] || jobs[0];

  // Insiders for the active job's company
  const companyInsiders = useMemo(() => {
    if (!activeJob) return [];
    return connectors.filter(c => c.companyId === activeJob.companyId);
  }, [activeJob, connectors]);

  // Check if current user already applied to activeJob
  const isAppliedToActiveJob = useMemo(() => {
    if (!activeJob) return false;
    return applications.some(a => a.jobId === activeJob.id && a.applicantId === currentUser.id);
  }, [activeJob, applications, currentUser.id]);

  const formatSalary = (min: number, max: number, currency: 'NGN' | 'USD') => {
    if (currency === 'USD') return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
    return `₦${(min / 1000000).toFixed(1)}M - ₦${(max / 1000000).toFixed(1)}M`;
  };

  const departments = ['All', 'Engineering', 'Product Management', 'Product Design', 'Infrastructure', 'Growth & Marketing', 'Finance & Risk', 'Cybersecurity'];
  const workplaces = ['All', 'remote', 'hybrid', 'on-site'];
  const jobTypes = ['All', 'full-time', 'contract', 'internship'];
  const expLevels = ['All', 'junior', 'mid', 'senior', 'lead'];

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Feed Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Explore Tech & High-Growth Careers
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Direct connection to hiring managers & verified employee insiders across top Nigerian & global tech companies.
            </p>
          </div>

          {/* Feed Segments */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 self-start md:self-auto">
            <button
              onClick={() => setFeedTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                feedTab === 'all' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Jobs ({jobs.length})
            </button>
            <button
              onClick={() => setFeedTab('recommended')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1 ${
                feedTab === 'recommended' 
                  ? 'bg-white text-indigo-700 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Recommended for You
            </button>
            <button
              onClick={() => setFeedTab('saved')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                feedTab === 'saved' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Saved ({savedJobIds.length})
            </button>
          </div>
        </div>

        {/* Search Bar & Quick Filters */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-2.5">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, skill (TypeScript, Python), or company..."
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full text-xs py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white cursor-pointer"
            >
              <option value="All">All Departments</option>
              {departments.filter(d => d !== 'All').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedWorkplace}
              onChange={(e) => setSelectedWorkplace(e.target.value)}
              className="w-full text-xs py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white cursor-pointer capitalize"
            >
              <option value="All">All Workplaces</option>
              <option value="remote">Remote Only</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-Site</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Tags */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px] font-medium mr-1">Experience:</span>
          {expLevels.map(exp => (
            <button
              key={exp}
              onClick={() => setSelectedExpLevel(exp)}
              className={`px-2.5 py-1 rounded text-xs transition-colors capitalize ${
                selectedExpLevel === exp
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {exp}
            </button>
          ))}

          <span className="text-slate-400 text-[11px] font-medium ml-3 mr-1">Type:</span>
          {jobTypes.map(t => (
            <button
              key={t}
              onClick={() => setSelectedJobType(t)}
              className={`px-2.5 py-1 rounded text-xs transition-colors capitalize ${
                selectedJobType === t
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}

          {(searchQuery || selectedDepartment !== 'All' || selectedWorkplace !== 'All' || selectedExpLevel !== 'All' || selectedJobType !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDepartment('All');
                setSelectedWorkplace('All');
                setSelectedExpLevel('All');
                setSelectedJobType('All');
              }}
              className="ml-auto text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Reset filters
            </button>
          )}
        </div>

      </div>

      {/* Main Two-Column Layout (Job List on Left, Sticky Deep Detail on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Job Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing <strong className="text-slate-900 font-mono">{filteredJobs.length}</strong> available roles</span>
            {feedTab === 'recommended' && (
              <span className="text-indigo-600 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Ranked by profile match
              </span>
            )}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-900">No jobs match your current filters</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting the department or search keyword to see all 30 jobs.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('All');
                  setSelectedWorkplace('All');
                  setSelectedExpLevel('All');
                  setSelectedJobType('All');
                }}
                className="mt-4 px-4 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredJobs.map(job => {
              const isSelected = activeJob?.id === job.id;
              const isSaved = savedJobIds.includes(job.id);
              const matchScore = getJobMatchScore(job);
              const alreadyApplied = applications.some(a => a.jobId === job.id && a.applicantId === currentUser.id);

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`p-4 bg-white rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-indigo-600 ring-1 ring-indigo-600 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <img 
                        src={job.companyLogo} 
                        alt={job.companyName} 
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-50"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-medium text-slate-600 truncate">{job.companyName}</p>
                          {job.featured && (
                            <span className="text-[10px] text-amber-700 bg-amber-50 font-semibold px-1.5 py-0.2 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1 mt-0.5">
                          {job.title}
                        </h3>
                        
                        {/* Unboxed metadata per frontend design skill */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 flex-wrap">
                          <span>{job.location}</span>
                          <span aria-hidden="true">·</span>
                          <span className="capitalize">{job.workplaceType}</span>
                          <span aria-hidden="true">·</span>
                          <span className="capitalize">{job.experienceLevel}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveJob(job.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                      title={isSaved ? 'Remove from saved' : 'Save job'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Skills & Match bar */}
                  <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1 text-[11px] text-slate-600 font-mono font-medium">
                      <span>{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {feedTab === 'recommended' && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {matchScore}% Match
                        </span>
                      )}
                      {alreadyApplied ? (
                        <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3" /> Applied
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          {job.postedDate}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Job Full Details Panel */}
        <div className="lg:col-span-7 sticky top-20">
          {activeJob ? (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
              
              {/* Job Header */}
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-start gap-4">
                  <img 
                    src={activeJob.companyLogo} 
                    alt={activeJob.companyName} 
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setSelectedCompanyId(activeJob.companyId);
                          setActiveTab('companies');
                        }}
                        className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        {activeJob.companyName}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500">{activeJob.department}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                      {activeJob.title}
                    </h2>

                    {/* Metadata line without pills */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {activeJob.location}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{activeJob.workplaceType}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{activeJob.jobType}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400 font-mono">{activeJob.applicantsCount} applicants</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleSaveJob(activeJob.id)}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"
                    title="Save job"
                  >
                    {savedJobIds.includes(activeJob.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Salary & Action Banner */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                    Transparent Compensation
                  </span>
                  <div className="text-base sm:text-lg font-bold text-slate-900 font-mono mt-0.5">
                    {formatSalary(activeJob.salaryMin, activeJob.salaryMax, activeJob.salaryCurrency)}
                    <span className="text-xs font-normal text-slate-500 font-sans ml-1">/ year base</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isAppliedToActiveJob ? (
                    <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Application Submitted
                    </div>
                  ) : (
                    <button
                      onClick={() => setApplyingJob(activeJob)}
                      className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-sm flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      1-Click Easy Apply
                    </button>
                  )}
                </div>
              </div>

              {/* Verified Company Insiders Box (The Differentiator!) */}
              {companyInsiders.length > 0 && (
                <div className="p-4 bg-indigo-50/50 border border-indigo-200/80 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-xs font-bold text-slate-900">
                        Talk to an Insider at {activeJob.companyName}
                      </h4>
                    </div>
                    <span className="text-[10px] text-indigo-700 font-medium bg-indigo-100/70 px-2 py-0.5 rounded">
                      Available for 15-min Coffee Chat
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    Get an honest perspective on team culture, interview expectations, and ask for a verified internal referral.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {companyInsiders.map(insider => (
                      <div key={insider.id} className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img 
                            src={insider.avatar} 
                            alt={insider.name} 
                            referrerPolicy="no-referrer"
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{insider.name}</p>
                            <p className="text-[10px] text-slate-500 truncate">{insider.role}</p>
                            <p className="text-[10px] text-indigo-600 font-medium">★ {insider.rating} · {insider.totalChatsConducted} chats</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setActiveTab('connect');
                          }}
                          className="px-2.5 py-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded transition-colors shrink-0"
                        >
                          Chat
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Required Skills */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Required Technical Stack & Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeJob.skills.map((skill, idx) => {
                    const isMatched = userSkillNames.has(skill.toLowerCase());
                    return (
                      <span
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-md border font-medium ${
                          isMatched 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {skill} {isMatched && '✓'}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Role Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeJob.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  What You Will Do
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {activeJob.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold shrink-0 mt-0.5">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  What We Expect
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {activeJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold shrink-0 mt-0.5">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Perks & Benefits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {activeJob.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer action */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => {
                    startOrOpenConversation(
                      'user-recruiter-1',
                      'Sarah Chen',
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
                      `Recruiter @ ${activeJob.companyName}`
                    );
                  }}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 underline"
                >
                  Message Recruiter Directly
                </button>

                {!isAppliedToActiveJob && (
                  <button
                    onClick={() => setApplyingJob(activeJob)}
                    className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-sm"
                  >
                    Apply Now
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="p-8 bg-white border border-slate-200 rounded-xl text-center text-slate-500 text-xs">
              Select a job to view complete details
            </div>
          )}
        </div>

      </div>

      {/* Easy Apply Modal */}
      {applyingJob && (
        <EasyApplyModal
          job={applyingJob}
          onClose={() => setApplyingJob(null)}
        />
      )}

    </div>
  );
};
