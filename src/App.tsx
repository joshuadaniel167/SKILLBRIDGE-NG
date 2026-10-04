import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { JobDiscoveryView } from './components/jobs/JobDiscoveryView';
import { CompanyHubView } from './components/companies/CompanyHubView';
import { MeetConnectView } from './components/insiders/MeetConnectView';
import { ApplicantTrackerView } from './components/ats/ApplicantTrackerView';
import { EmployerATSView } from './components/ats/EmployerATSView';
import { VideoInterviewRoom } from './components/interviews/VideoInterviewRoom';
import { MessagingView } from './components/messages/MessagingView';
import { ProfileBuilderView } from './components/profile/ProfileBuilderView';
import { SuperAdminView } from './components/admin/SuperAdminView';
import { PostJobModal } from './components/modals/PostJobModal';
import { 
  Briefcase, 
  Building2, 
  Coffee, 
  Kanban, 
  Video, 
  MessageSquare, 
  User 
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, currentRole, setActiveTab } = useApp();
  const [showPostJobModal, setShowPostJobModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Top Navbar */}
      <Navbar onOpenPostJob={() => setShowPostJobModal(true)} />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        
        {/* Left Sidebar */}
        <Sidebar />

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 pb-20 md:pb-8">
          {activeTab === 'jobs' && <JobDiscoveryView />}
          {activeTab === 'companies' && <CompanyHubView />}
          {activeTab === 'connect' && <MeetConnectView />}
          {activeTab === 'ats' && (
            currentRole === 'employer' ? <EmployerATSView /> : <ApplicantTrackerView />
          )}
          {activeTab === 'interviews' && <VideoInterviewRoom />}
          {activeTab === 'messages' && <MessagingView />}
          {activeTab === 'profile' && <ProfileBuilderView />}
          {activeTab === 'admin' && <SuperAdminView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 px-2 py-1.5 flex items-center justify-around text-[10px]">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex flex-col items-center p-1.5 rounded ${activeTab === 'jobs' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}
        >
          <Briefcase className="w-4 h-4 mb-0.5" />
          <span>Jobs</span>
        </button>
        <button
          onClick={() => setActiveTab('companies')}
          className={`flex flex-col items-center p-1.5 rounded ${activeTab === 'companies' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}
        >
          <Building2 className="w-4 h-4 mb-0.5" />
          <span>Hub</span>
        </button>
        <button
          onClick={() => setActiveTab('connect')}
          className={`flex flex-col items-center p-1.5 rounded ${activeTab === 'connect' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}
        >
          <Coffee className="w-4 h-4 mb-0.5" />
          <span>Insiders</span>
        </button>
        <button
          onClick={() => setActiveTab('ats')}
          className={`flex flex-col items-center p-1.5 rounded ${activeTab === 'ats' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}
        >
          <Kanban className="w-4 h-4 mb-0.5" />
          <span>ATS</span>
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex flex-col items-center p-1.5 rounded ${activeTab === 'messages' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span>Chat</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center p-1.5 rounded ${activeTab === 'profile' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}
        >
          <User className="w-4 h-4 mb-0.5" />
          <span>Profile</span>
        </button>
      </div>

      {/* Post Job Modal for employer */}
      {showPostJobModal && (
        <PostJobModal onClose={() => setShowPostJobModal(false)} />
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
