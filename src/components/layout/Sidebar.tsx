import React from 'react';
import { useApp, NavigationTab } from '../../context/AppContext';
import { 
  Briefcase, 
  Building2, 
  Coffee, 
  Kanban, 
  Video, 
  MessageSquare, 
  User, 
  ShieldCheck, 
  Bookmark, 
  FileText,
  CalendarCheck,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    switchRole, 
    activeTab, 
    setActiveTab, 
    jobs, 
    savedJobIds, 
    applications, 
    connectors, 
    conversations, 
    interviews,
    offerLetters 
  } = useApp();

  const activeApplicationsCount = applications.filter(a => a.applicantId === currentUser.id).length;
  const employerCandidatesCount = applications.length;
  const pendingInterviewsCount = interviews.filter(i => i.status === 'scheduled').length;
  const pendingOffersCount = offerLetters.filter(o => o.status === 'sent').length;

  const navItems = [
    {
      id: 'jobs' as NavigationTab,
      label: 'Find Jobs',
      icon: Briefcase,
      badge: jobs.length.toString(),
      subtext: '30 live openings'
    },
    {
      id: 'companies' as NavigationTab,
      label: 'Company Hub',
      icon: Building2,
      badge: '10',
      subtext: 'Verified Tech & Fintech'
    },
    {
      id: 'connect' as NavigationTab,
      label: 'Meet & Connect',
      icon: Coffee,
      badge: 'Active',
      subtext: 'Employee chats & AMAs'
    },
    {
      id: 'ats' as NavigationTab,
      label: currentRole === 'employer' ? 'Recruiter ATS' : 'My Applications',
      icon: Kanban,
      badge: currentRole === 'employer' ? employerCandidatesCount.toString() : activeApplicationsCount.toString(),
      subtext: currentRole === 'employer' ? 'Kanban Candidate Pipeline' : `${pendingOffersCount > 0 ? '1 Offer Available!' : 'Full-cycle tracker'}`
    },
    {
      id: 'interviews' as NavigationTab,
      label: 'Interviews & Video',
      icon: Video,
      badge: pendingInterviewsCount > 0 ? `${pendingInterviewsCount} upcoming` : undefined,
      subtext: 'WebRTC Room & Scheduler'
    },
    {
      id: 'messages' as NavigationTab,
      label: 'Messages',
      icon: MessageSquare,
      badge: conversations.length.toString(),
      subtext: 'Direct recruiter & insider DMs'
    },
    {
      id: 'profile' as NavigationTab,
      label: 'Profile & Resume',
      icon: User,
      badge: `${currentUser.profileCompletionScore}%`,
      subtext: 'CV Parser & Video Intro'
    },
    {
      id: 'admin' as NavigationTab,
      label: 'Platform Admin',
      icon: ShieldCheck,
      badge: undefined,
      subtext: 'Ecosystem & Verifications'
    }
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div>
        {/* User Card */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg mb-5">
          <div className="flex items-center gap-3">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
              <p className="text-[11px] text-slate-500 capitalize">{currentRole}</p>
              {currentRole === 'applicant' && (
                <div className="mt-1 flex items-center gap-1.5">
                  <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full rounded-full" 
                      style={{ width: `${currentUser.profileCompletionScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-600 font-semibold font-mono">{currentUser.profileCompletionScore}%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Platform Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors group ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <div className="truncate">
                    <span className="text-xs block leading-tight truncate">{item.label}</span>
                    <span className="text-[10px] text-slate-400 block font-normal leading-tight truncate">{item.subtext}</span>
                  </div>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 ${
                    isActive 
                      ? 'bg-indigo-200/60 text-indigo-800' 
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Switcher Pill in Sidebar for instant switching */}
      <div className="pt-4 border-t border-slate-200">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Demo Role Switcher
        </p>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <button
            onClick={() => switchRole('applicant')}
            className={`px-2 py-1.5 rounded text-left transition-colors ${
              currentRole === 'applicant'
                ? 'bg-indigo-600 text-white font-medium'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Applicant
          </button>
          <button
            onClick={() => switchRole('employer')}
            className={`px-2 py-1.5 rounded text-left transition-colors ${
              currentRole === 'employer'
                ? 'bg-indigo-600 text-white font-medium'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Employer
          </button>
          <button
            onClick={() => switchRole('insider')}
            className={`px-2 py-1.5 rounded text-left transition-colors ${
              currentRole === 'insider'
                ? 'bg-indigo-600 text-white font-medium'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Insider
          </button>
          <button
            onClick={() => switchRole('admin')}
            className={`px-2 py-1.5 rounded text-left transition-colors ${
              currentRole === 'admin'
                ? 'bg-indigo-600 text-white font-medium'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Admin
          </button>
        </div>
      </div>
    </aside>
  );
};
