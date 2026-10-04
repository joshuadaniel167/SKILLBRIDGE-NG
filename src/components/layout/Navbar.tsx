import React, { useState, useRef, useEffect } from 'react';
import { useApp, NavigationTab } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Bell, 
  ChevronDown, 
  Briefcase, 
  Building2, 
  Users, 
  Kanban, 
  Video, 
  MessageSquare, 
  User, 
  ShieldCheck, 
  Check, 
  ExternalLink,
  Plus
} from 'lucide-react';

interface NavbarProps {
  onOpenPostJob?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPostJob }) => {
  const { 
    currentUser, 
    currentRole, 
    switchRole, 
    activeTab, 
    setActiveTab, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead,
    unreadNotificationsCount 
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const roleMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleMenuRef.current && !roleMenuRef.current.contains(e.target as Node)) {
        setShowRoleMenu(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target as Node)) {
        setShowNotifMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesList: { id: UserRole; label: string; desc: string; demoUser: string }[] = [
    { 
      id: 'applicant', 
      label: 'Job Seeker / Applicant', 
      desc: 'Browse jobs, apply, coffee chats, track ATS',
      demoUser: 'Joshua Daniel'
    },
    { 
      id: 'employer', 
      label: 'Company HR / Employer', 
      desc: 'Post jobs, Kanban ATS, schedule interviews, send offers',
      demoUser: 'Sarah Chen (Paystack)'
    },
    { 
      id: 'insider', 
      label: 'Verified Employee Insider', 
      desc: 'Offer coffee chats, answer Q&A, earn reputation',
      demoUser: 'Tunde Adebayo (Flutterwave)'
    },
    { 
      id: 'admin', 
      label: 'Super Admin', 
      desc: 'Manage companies, verify employers, system overview',
      demoUser: 'System Admin'
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single Brand Wordmark */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('jobs')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:bg-indigo-700 transition-colors">
              SB
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                SKILLBRIDGE NG
              </span>
            </div>
          </button>

          {/* Role badge for quick context */}
          <div className="hidden sm:inline-flex items-center text-xs font-medium text-slate-500 border-l border-slate-200 pl-4">
            <span className="capitalize font-semibold text-slate-800 mr-1.5">{currentRole} Mode</span>
            <span className="text-slate-400">({currentUser.name.split(' ')[0]})</span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (single-line, subtle underlines) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 ${
              activeTab === 'jobs' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            Explore Jobs
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 ${
              activeTab === 'companies' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            Company Hub
          </button>
          <button
            onClick={() => setActiveTab('connect')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 ${
              activeTab === 'connect' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            Coffee Chats & Insiders
          </button>
          <button
            onClick={() => setActiveTab('ats')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 ${
              activeTab === 'ats' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            {currentRole === 'employer' ? 'Recruiter ATS' : 'My Applications'}
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 ${
              activeTab === 'interviews' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            Interviews
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Role Switcher, Notifications, User) */}
        <div className="flex items-center gap-3">
          
          {/* Post Job CTA for Employer */}
          {currentRole === 'employer' && onOpenPostJob && (
            <button
              onClick={onOpenPostJob}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              Post New Job
            </button>
          )}

          {/* Role Switcher Dropdown */}
          <div className="relative" ref={roleMenuRef}>
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors"
              title="Switch user perspective"
            >
              <span className="hidden md:inline text-slate-500 font-normal">View as:</span>
              <span className="font-semibold text-slate-900 capitalize">{currentRole}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">Switch Active Persona</p>
                  <p className="text-[11px] text-slate-500">Test all 4 roles across the hiring lifecycle</p>
                </div>
                <div className="py-1">
                  {rolesList.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        switchRole(item.id);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full px-3.5 py-2.5 text-left flex items-start justify-between hover:bg-slate-50 transition-colors ${
                        currentRole === item.id ? 'bg-indigo-50/70' : ''
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-semibold ${currentRole === item.id ? 'text-indigo-600' : 'text-slate-800'}`}>
                            {item.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                        <p className="text-[10px] text-indigo-700 font-medium mt-0.5">Demo user: {item.demoUser}</p>
                      </div>
                      {currentRole === item.id && (
                        <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifMenuRef}>
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">Notifications</span>
                    {unreadNotificationsCount > 0 && (
                      <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-medium">
                        {unreadNotificationsCount} new
                      </span>
                    )}
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-500">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.linkTab) setActiveTab(n.linkTab as NavigationTab);
                          setShowNotifMenu(false);
                        }}
                        className={`p-3.5 text-left hover:bg-slate-50 cursor-pointer transition-colors ${
                          !n.read ? 'bg-indigo-50/40' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.createdAt}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{n.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-slate-200 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900 truncate">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <p className="text-[10px] text-indigo-600 font-medium mt-0.5 truncate">{currentUser.headline}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Manage Profile & CV
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('messages');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    Direct Messages
                  </button>
                  {currentRole === 'admin' && (
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                      Super Admin Panel
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
