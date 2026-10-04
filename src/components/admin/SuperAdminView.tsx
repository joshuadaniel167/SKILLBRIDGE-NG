import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Building2, 
  Briefcase, 
  Users, 
  Coffee, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Search,
  Sparkles
} from 'lucide-react';

export const SuperAdminView: React.FC = () => {
  const { companies, jobs, applications, connectors, coffeeChatRequests } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'companies' | 'audit'>('analytics');
  const [searchCompany, setSearchCompany] = useState('');

  const pendingVerificationRequests = [
    { id: 'req-c1', name: 'Brass Banking', industry: 'SME Banking', size: '50-100', website: 'https://trybrass.com', submittedAt: 'Yesterday' },
    { id: 'req-c2', name: 'Eden Life', industry: 'Home Concierge & Food', size: '100-250', website: 'https://ouredenlife.com', submittedAt: '2 days ago' }
  ];

  const [verificationQueue, setVerificationQueue] = useState(pendingVerificationRequests);

  const handleApproveCompany = (id: string) => {
    setVerificationQueue(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Super Admin Console
              </h1>
              <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                Platform Owner
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Oversee the SkillBridge NG ecosystem: company verifications, hiring liquidity, interview rooms, and compliance logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              System Status: All Services Healthy
            </span>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 border-b-2 transition-colors ${activeTab === 'analytics' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            Ecosystem Metrics
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 'companies' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            Company Verifications ({verificationQueue.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-2 border-b-2 transition-colors ${activeTab === 'audit' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            Security & Audit Logs
          </button>
        </div>
      </div>

      {/* TAB 1: ECOSYSTEM METRICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-xs text-slate-500 block">Verified Tech Companies</span>
              <span className="text-2xl font-bold text-slate-900 font-mono mt-1 block">{companies.length}</span>
              <span className="text-[11px] text-emerald-600 font-medium">100% verified</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-xs text-slate-500 block">Active Job Postings</span>
              <span className="text-2xl font-bold text-indigo-600 font-mono mt-1 block">{jobs.length}</span>
              <span className="text-[11px] text-slate-500">Across 8 tech disciplines</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-xs text-slate-500 block">Candidate Applications</span>
              <span className="text-2xl font-bold text-slate-900 font-mono mt-1 block">348</span>
              <span className="text-[11px] text-emerald-600 font-medium">96% response rate</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-xs text-slate-500 block">Insider Coffee Chats</span>
              <span className="text-2xl font-bold text-amber-600 font-mono mt-1 block">173</span>
              <span className="text-[11px] text-slate-500">4.9/5 satisfaction rate</span>
            </div>
          </div>

          {/* Breakdown Tables */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Live Company Pipeline & Hiring Velocity
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Company</th>
                    <th className="py-2.5 px-3">Industry</th>
                    <th className="py-2.5 px-3">Open Jobs</th>
                    <th className="py-2.5 px-3">Rating</th>
                    <th className="py-2.5 px-3">Followers</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {companies.map(c => {
                    const cJobs = jobs.filter(j => j.companyId === c.id);
                    return (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2">
                          <img src={c.logo} alt={c.name} referrerPolicy="no-referrer" className="w-6 h-6 rounded object-cover" />
                          <span>{c.name}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{c.industry}</td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-800">{cJobs.length}</td>
                        <td className="py-3 px-3 font-mono text-amber-600 font-bold">★ {c.overallRating}</td>
                        <td className="py-3 px-3 font-mono text-slate-600">{c.followersCount.toLocaleString()}</td>
                        <td className="py-3 px-3">
                          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                            Verified Active
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VERIFICATION QUEUE */}
      {activeTab === 'companies' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Pending Employer Verification Requests
          </h3>
          <p className="text-xs text-slate-500">
            Verify corporate identity, tax compliance, and authorized HR credentials before companies can post jobs.
          </p>

          {verificationQueue.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No pending verification requests at this time.
            </div>
          ) : (
            <div className="space-y-3">
              {verificationQueue.map(item => (
                <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                    <p className="text-slate-500 mt-0.5">{item.industry} · {item.size} employees</p>
                    <a href={item.website} target="_blank" rel="noreferrer" className="text-indigo-600 underline font-mono mt-1 block">
                      {item.website}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveCompany(item.id)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
                    >
                      Approve & Verify
                    </button>
                    <button
                      onClick={() => handleApproveCompany(item.id)}
                      className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900">Platform Security & Audit Trail</h3>
          <div className="space-y-2 font-mono">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
              <span>[AUDIT-0842] WebRTC Video Room int-1 peer connection encrypted via DTLS-SRTP</span>
              <span className="text-slate-400">14:04:12 UTC</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
              <span>[AUDIT-0841] Digital e-signature hash verified for Offer off-1 (Joshua Daniel)</span>
              <span className="text-slate-400">14:02:45 UTC</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
              <span>[AUDIT-0840] Resume Joshua_Daniel_Resume.pdf parsed via secure sandbox parser</span>
              <span className="text-slate-400">13:58:19 UTC</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
