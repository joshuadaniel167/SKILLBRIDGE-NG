import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Company, CompanyReview, CompanyQA } from '../../types';
import { 
  Building2, 
  MapPin, 
  Users, 
  Globe, 
  Star, 
  CheckCircle2, 
  Briefcase, 
  MessageSquare, 
  ThumbsUp, 
  Heart, 
  Share2, 
  Sparkles, 
  Plus, 
  X,
  Calendar,
  Send,
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const CompanyHubView: React.FC = () => {
  const { 
    companies, 
    selectedCompanyId, 
    setSelectedCompanyId, 
    followedCompanyIds, 
    toggleFollowCompany,
    jobs,
    currentUser,
    currentRole,
    addCompanyReview,
    addCompanyQAQuestion,
    addCompanyQAAnswer,
    setSelectedJobId,
    setActiveTab
  } = useApp();

  const [activeCompanyId, setActiveCompanyId] = useState<string>(
    selectedCompanyId || companies[0]?.id || ''
  );
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'jobs' | 'reviews' | 'qa'>('overview');
  
  // Review form modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [workLifeRating, setWorkLifeRating] = useState(4);
  const [cultureRating, setCultureRating] = useState(5);
  const [compRating, setCompRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewPros, setReviewPros] = useState('');
  const [reviewCons, setReviewCons] = useState('');
  const [reviewAdvice, setReviewAdvice] = useState('');
  const [interviewDiff, setInterviewDiff] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  // QA Question Form
  const [qaQuestion, setQaQuestion] = useState('');
  const [qaAnonymous, setQaAnonymous] = useState(false);
  const [answeringQaId, setAnsweringQaId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [answerAnonymous, setAnswerAnonymous] = useState(false);

  const selectedCompany = companies.find(c => c.id === activeCompanyId) || companies[0];
  const isFollowed = followedCompanyIds.includes(selectedCompany.id);

  // Open jobs for this company
  const companyJobs = useMemo(() => {
    return jobs.filter(j => j.companyId === selectedCompany.id);
  }, [jobs, selectedCompany.id]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewPros.trim() || !reviewCons.trim()) return;

    addCompanyReview({
      companyId: selectedCompany.id,
      companyName: selectedCompany.name,
      authorRole: currentUser.headline || 'Software Engineer',
      authorLocation: currentUser.location || 'Lagos',
      isCurrentEmployee: true,
      employmentDuration: '1+ years',
      rating: reviewRating,
      workLifeRating,
      cultureRating,
      compensationRating: compRating,
      reviewTitle,
      pros: reviewPros,
      cons: reviewCons,
      adviceToManagement: reviewAdvice,
      interviewDifficulty: interviewDiff
    });

    setShowReviewModal(false);
    setReviewTitle('');
    setReviewPros('');
    setReviewCons('');
    setReviewAdvice('');
    setActiveSubTab('reviews');
  };

  const handleQASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaQuestion.trim()) return;
    addCompanyQAQuestion(selectedCompany.id, qaQuestion, qaAnonymous);
    setQaQuestion('');
  };

  const handleAnswerSubmit = (qaId: string) => {
    if (!answerText.trim()) return;
    addCompanyQAAnswer(qaId, answerText, answerAnonymous);
    setAnswerText('');
    setAnsweringQaId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Companies Horizontal Bar / Selector */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Verified Company Directory
            </h1>
            <p className="text-xs text-slate-500">
              Explore culture, verified employee salaries, authentic reviews, and ask insider questions.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono font-medium">10 Verified Tech Companies</span>
        </div>

        {/* Company Quick Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {companies.map(comp => (
            <button
              key={comp.id}
              onClick={() => {
                setActiveCompanyId(comp.id);
                setSelectedCompanyId(comp.id);
              }}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all ${
                activeCompanyId === comp.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <img 
                src={comp.logo} 
                alt={comp.name} 
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-md object-cover bg-white" 
              />
              <span>{comp.name}</span>
              <span className={`text-[10px] font-normal ${activeCompanyId === comp.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                ★ {comp.overallRating}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Company Showcase Hero */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        
        {/* Banner */}
        <div className="h-44 sm:h-56 relative bg-slate-900 overflow-hidden">
          <img 
            src={selectedCompany.banner} 
            alt={selectedCompany.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <img 
                src={selectedCompany.logo} 
                alt={selectedCompany.name} 
                referrerPolicy="no-referrer"
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-white bg-white shadow-md shrink-0"
              />
              <div className="text-white">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold">{selectedCompany.name}</h2>
                  {selectedCompany.verified && (
                    <span className="flex items-center gap-1 text-[11px] bg-emerald-500/90 text-white px-2 py-0.5 rounded font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 mt-0.5 line-clamp-1">
                  {selectedCompany.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-end">
              <button
                onClick={() => toggleFollowCompany(selectedCompany.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors shadow-xs flex items-center gap-1.5 ${
                  isFollowed 
                    ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-600' 
                    : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFollowed ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
                {isFollowed ? 'Following' : 'Follow Company'}
              </button>
              <a
                href={selectedCompany.website}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/20 backdrop-blur-xs hover:bg-white/30 text-white rounded-lg text-xs"
                title="Visit website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Company Quick Stats Subheader */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-6 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              {selectedCompany.industry}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {selectedCompany.size}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {selectedCompany.locations.slice(0, 2).join(' · ')}
            </span>
            <span className="flex items-center gap-1.5 text-indigo-600 font-semibold font-mono">
              ★ {selectedCompany.overallRating} ({selectedCompany.reviewsCount} reviews)
            </span>
          </div>

          <div className="text-slate-500 text-[11px] font-mono">
            {selectedCompany.followersCount.toLocaleString()} followers
          </div>
        </div>

        {/* Nav Sub-Tabs */}
        <div className="px-6 border-b border-slate-200 flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeSubTab === 'overview' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview & Culture
          </button>
          <button
            onClick={() => setActiveSubTab('jobs')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'jobs' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Open Jobs ({companyJobs.length})
          </button>
          <button
            onClick={() => setActiveSubTab('reviews')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'reviews' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Employee Reviews ({selectedCompany.reviewsCount})
          </button>
          <button
            onClick={() => setActiveSubTab('qa')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'qa' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Community Q&A
          </button>
        </div>

        {/* Content body based on subTab */}
        <div className="p-6">
          
          {/* TAB 1: OVERVIEW & CULTURE */}
          {activeSubTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  About {selectedCompany.name}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedCompany.about}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Our Mission
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-lg border border-slate-200">
                  "{selectedCompany.mission}"
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Core Engineering Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.techStack.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs font-medium text-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Verified Company Perks & Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedCompany.benefits.map((b, i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Culture Photos */}
              {selectedCompany.culturePhotos.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                    Life & Culture at {selectedCompany.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedCompany.culturePhotos.map((photo, i) => (
                      <img
                        key={i}
                        src={photo}
                        alt="Culture"
                        referrerPolicy="no-referrer"
                        className="w-full h-48 object-cover rounded-xl border border-slate-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Office Locations */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Hub Locations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.locations.map((loc, i) => (
                    <span key={i} className="text-xs text-slate-600 flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: OPEN JOBS */}
          {activeSubTab === 'jobs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Current Openings at {selectedCompany.name}
                </h3>
                <span className="text-xs text-slate-500 font-mono">{companyJobs.length} active roles</span>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                {companyJobs.map(job => (
                  <div key={job.id} className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{job.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span>{job.department}</span>
                        <span>·</span>
                        <span>{job.location}</span>
                        <span>·</span>
                        <span className="capitalize">{job.workplaceType}</span>
                        <span>·</span>
                        <span className="font-mono text-slate-700 font-semibold">
                          {job.salaryCurrency === 'USD' 
                            ? `$${(job.salaryMin/1000).toFixed(0)}k - $${(job.salaryMax/1000).toFixed(0)}k` 
                            : `₦${(job.salaryMin/1000000).toFixed(1)}M - ₦${(job.salaryMax/1000000).toFixed(1)}M`}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setActiveTab('jobs');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors shrink-0 flex items-center gap-1"
                    >
                      View & Apply <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeSubTab === 'reviews' && (
            <div className="space-y-6">
              
              {/* Scoreboard */}
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="text-center sm:border-r sm:border-slate-200 sm:pr-4">
                  <div className="text-3xl font-extrabold text-slate-900 font-mono">
                    {selectedCompany.overallRating}
                  </div>
                  <div className="flex justify-center text-amber-500 my-1">
                    {'★★★★★'}
                  </div>
                  <p className="text-[11px] text-slate-500">Based on {selectedCompany.reviewsCount} employee ratings</p>
                </div>

                <div className="space-y-2 sm:col-span-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Work-Life Balance:</span>
                    <span className="font-bold text-slate-900 font-mono">{selectedCompany.workLifeRating} / 5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Culture & Values:</span>
                    <span className="font-bold text-slate-900 font-mono">{selectedCompany.cultureRating} / 5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Compensation & Perks:</span>
                    <span className="font-bold text-slate-900 font-mono">{selectedCompany.compensationRating} / 5.0</span>
                  </div>
                </div>

                <div className="flex items-center justify-center sm:border-l sm:border-slate-200 sm:pl-4">
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Write a Review
                  </button>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          Senior Software Engineer
                        </span>
                        <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                          Verified Current Employee
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Lagos, Nigeria · 2+ years</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      ★ 5.0
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">
                    "Exceptional engineering culture with immense trust and respect"
                  </h4>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                      <p className="font-bold text-emerald-900 mb-0.5">Pros:</p>
                      <p>Deeply thoughtful management, world-class tools, $3,000 learning budget that is actually encouraged to spend, high compensation, and offsites in wonderful African cities.</p>
                    </div>
                    <div className="p-3 bg-rose-50/50 rounded-lg border border-rose-100">
                      <p className="font-bold text-rose-900 mb-0.5">Cons:</p>
                      <p>High expectations for ownership and written documentation; not for people who prefer micro-management.</p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                    <span>Interview Difficulty: <strong>Medium</strong></span>
                    <button className="flex items-center gap-1 text-slate-600 hover:text-indigo-600">
                      <ThumbsUp className="w-3.5 h-3.5" /> Helpful (34)
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: COMMUNITY Q&A */}
          {activeSubTab === 'qa' && (
            <div className="space-y-6">
              
              {/* Ask Question Card */}
              <form onSubmit={handleQASubmit} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-bold text-slate-900">
                      Ask an Insider or HR at {selectedCompany.name}
                    </h4>
                  </div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qaAnonymous}
                      onChange={(e) => setQaAnonymous(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    Ask Anonymously
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={qaQuestion}
                    onChange={(e) => setQaQuestion(e.target.value)}
                    placeholder="e.g. What does the onboarding process look like for remote engineers? Is there relocation support?"
                    className="w-full text-xs p-3 pr-24 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                  >
                    Post Question
                  </button>
                </div>
              </form>

              {/* Questions List */}
              <div className="space-y-4">
                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        What does the technical interview loop look like for Senior Full Stack roles?
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Asked by Prospective Applicant · 3 days ago</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      ▲ 14
                    </span>
                  </div>

                  {/* Answers */}
                  <div className="pl-4 border-l-2 border-indigo-200 space-y-3">
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">Sarah Chen</span>
                          <span className="text-[10px] bg-indigo-100 text-indigo-800 font-semibold px-1.5 py-0.2 rounded">
                            Verified Recruiter
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">2 days ago</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        The loop has 4 steps: 1) 30-min recruiter chat on values and experience, 2) 90-min practical live coding session on realistic payment domain tasks (no leetcode tricks), 3) System Architecture & Design discussion with a Staff Engineer, and 4) Culture & Leadership conversation. We share preparation materials beforehand!
                      </p>
                    </div>
                  </div>

                  {/* Reply button */}
                  {answeringQaId === 'qa-1' ? (
                    <div className="pt-2 space-y-2">
                      <textarea
                        rows={2}
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder="Write your insider answer..."
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setAnsweringQaId(null)}
                          className="px-3 py-1 text-xs text-slate-500 hover:text-slate-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAnswerSubmit('qa-1')}
                          className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-md"
                        >
                          Submit Answer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAnsweringQaId('qa-1')}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Answer this question
                    </button>
                  )}

                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                Review {selectedCompany.name}
              </h3>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Overall Rating (1-5 Stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={`text-xl ${star <= reviewRating ? 'text-amber-500' : 'text-slate-300'}`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs text-slate-500 ml-2 font-mono">{reviewRating} / 5</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  required
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Great autonomy and compensation, high accountability"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 text-emerald-700">
                  Pros (What makes working here great?)
                </label>
                <textarea
                  rows={2}
                  required
                  value={reviewPros}
                  onChange={(e) => setReviewPros(e.target.value)}
                  placeholder="Mention benefits, mentorship, compensation, growth..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 text-rose-700">
                  Cons (What could be improved?)
                </label>
                <textarea
                  rows={2}
                  required
                  value={reviewCons}
                  onChange={(e) => setReviewCons(e.target.value)}
                  placeholder="Mention hours, sprint pace, tech debt..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Interview Difficulty
                </label>
                <div className="flex gap-2">
                  {(['Easy', 'Medium', 'Hard'] as const).map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setInterviewDiff(d)}
                      className={`px-3 py-1.5 text-xs rounded-md font-medium border ${
                        interviewDiff === d 
                          ? 'bg-indigo-600 text-white border-indigo-600' 
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-xs"
                >
                  Publish Review
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
