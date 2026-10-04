import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WorkExperience, Education } from '../../types';
import { 
  User, 
  FileText, 
  Upload, 
  Video, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ThumbsUp, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  Github, 
  Linkedin, 
  DollarSign, 
  MapPin,
  Clock,
  Play
} from 'lucide-react';

export const ProfileBuilderView: React.FC = () => {
  const { 
    currentUser, 
    updateUserProfile, 
    endorseSkill, 
    simulateCvParse 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'cv_video' | 'preferences'>('profile');
  const [isParsingCv, setIsParsingCv] = useState(false);
  const [parseSuccess, setParseSuccess] = useState(false);

  // New Skill Input
  const [newSkillName, setNewSkillName] = useState('');

  // Experience form state
  const [showAddExp, setShowAddExp] = useState(false);
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expStartDate, setExpStartDate] = useState('');
  const [expEndDate, setExpEndDate] = useState('');
  const [expDesc, setExpDesc] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsParsingCv(true);
      setTimeout(() => {
        simulateCvParse(file.name);
        setIsParsingCv(false);
        setParseSuccess(true);
        setTimeout(() => setParseSuccess(false), 3000);
      }, 1200);
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    updateUserProfile({
      skills: [
        ...currentUser.skills,
        { id: `sk-${Date.now()}`, name: newSkillName.trim(), endorsements: 1 }
      ]
    });
    setNewSkillName('');
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRole.trim() || !expCompany.trim()) return;
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      role: expRole,
      company: expCompany,
      location: 'Lagos, Nigeria',
      startDate: expStartDate || '2024',
      endDate: expEndDate || 'Present',
      current: !expEndDate || expEndDate.toLowerCase() === 'present',
      description: expDesc
    };
    updateUserProfile({
      experiences: [newExp, ...currentUser.experiences]
    });
    setShowAddExp(false);
    setExpRole('');
    setExpCompany('');
    setExpStartDate('');
    setExpEndDate('');
    setExpDesc('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Card with Profile Score */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              referrerPolicy="no-referrer"
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-200 bg-slate-50"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
                {currentUser.preferences.openToWork && (
                  <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open to Work
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">{currentUser.headline}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {currentUser.location}
                </span>
                <span>·</span>
                <span>{currentUser.email}</span>
              </div>
            </div>
          </div>

          {/* Profile Completion Meter */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:w-64 shrink-0">
            <div className="flex items-center justify-between font-semibold mb-1.5">
              <span className="text-slate-700">Profile Strength</span>
              <span className="text-indigo-600 font-bold font-mono text-sm">{currentUser.profileCompletionScore}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${currentUser.profileCompletionScore}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">
              {currentUser.profileCompletionScore >= 90 ? 'All-star profile! Top visibility to recruiters.' : 'Add your CV and video intro to reach 100%'}
            </p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 border-b-2 transition-colors ${
              activeTab === 'profile' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Experience & Skills
          </button>
          <button
            onClick={() => setActiveTab('cv_video')}
            className={`py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'cv_video' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Resume Parser & Video Intro
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`py-2 border-b-2 transition-colors ${
              activeTab === 'preferences' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Job Search Preferences
          </button>
        </div>
      </div>

      {/* TAB 1: EXPERIENCE & SKILLS */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Work Experience */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">Work Experience</h3>
                </div>
                <button
                  onClick={() => setShowAddExp(!showAddExp)}
                  className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Position
                </button>
              </div>

              {/* Add form */}
              {showAddExp && (
                <form onSubmit={handleAddExperience} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Role Title</label>
                      <input
                        type="text"
                        required
                        value={expRole}
                        onChange={(e) => setExpRole(e.target.value)}
                        placeholder="e.g. Senior Frontend Engineer"
                        className="w-full p-2 bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Company</label>
                      <input
                        type="text"
                        required
                        value={expCompany}
                        onChange={(e) => setExpCompany(e.target.value)}
                        placeholder="e.g. Paystack"
                        className="w-full p-2 bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
                      <input
                        type="text"
                        value={expStartDate}
                        onChange={(e) => setExpStartDate(e.target.value)}
                        placeholder="e.g. Jan 2023"
                        className="w-full p-2 bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">End Date</label>
                      <input
                        type="text"
                        value={expEndDate}
                        onChange={(e) => setExpEndDate(e.target.value)}
                        placeholder="e.g. Present"
                        className="w-full p-2 bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Impact & Highlights</label>
                    <textarea
                      rows={3}
                      value={expDesc}
                      onChange={(e) => setExpDesc(e.target.value)}
                      placeholder="Describe what you built, metrics moved, or tech stack..."
                      className="w-full p-2 bg-white border border-slate-300 rounded-md"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddExp(false)}
                      className="px-3 py-1.5 text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-white bg-indigo-600 rounded-md font-semibold"
                    >
                      Save Position
                    </button>
                  </div>
                </form>
              )}

              {/* Experiences list */}
              <div className="divide-y divide-slate-100">
                {currentUser.experiences.map(exp => (
                  <div key={exp.id} className="py-4 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{exp.role}</h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-600 font-medium">{exp.company} · {exp.location}</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Education</h3>
              </div>

              <div className="space-y-3">
                {currentUser.educations.map(edu => (
                  <div key={edu.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                      <span className="text-slate-400 font-mono">{edu.graduationYear}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">{edu.field}</p>
                    <p className="text-slate-500">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Skills & Endorsements */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Technical Skills & Endorsements
              </h3>
              <p className="text-xs text-slate-500">
                Peers, colleagues, and verified insiders can endorse your skills to increase interview match rates.
              </p>

              {/* Add skill input */}
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Docker, Go, Kafka..."
                  className="flex-1 text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Add
                </button>
              </form>

              {/* Skills list */}
              <div className="space-y-2">
                {currentUser.skills.map(skill => (
                  <div
                    key={skill.id}
                    className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-slate-800">{skill.name}</span>
                    <button
                      onClick={() => endorseSkill(skill.id)}
                      className="flex items-center gap-1.5 px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
                      title="Endorse this skill"
                    >
                      <ThumbsUp className="w-3 h-3 text-indigo-600" />
                      <span className="font-mono font-semibold">{skill.endorsements}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Social / Portfolio Links */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3 text-xs">
              <h3 className="text-sm font-bold text-slate-900">Portfolio & Profiles</h3>
              <div className="space-y-2">
                <a
                  href={currentUser.portfolioLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200 text-slate-700 hover:text-indigo-600"
                >
                  <Github className="w-4 h-4 text-slate-700" />
                  <span className="truncate">{currentUser.portfolioLinks.github || 'github.com/profile'}</span>
                </a>
                <a
                  href={currentUser.portfolioLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200 text-slate-700 hover:text-indigo-600"
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span className="truncate">{currentUser.portfolioLinks.linkedin || 'linkedin.com/in/profile'}</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: CV PARSER & VIDEO INTRO */}
      {activeTab === 'cv_video' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CV / Resume Auto-Parser */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Resume / CV Auto-Parser</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Upload your resume (PDF or DOCX). Our parser automatically extracts skills, past job titles, and boosts your profile score.
              </p>
            </div>

            {currentUser.cvFileName && (
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{currentUser.cvFileName}</h4>
                    <p className="text-[10px] text-slate-500">Auto-parsed & ready for 1-Click Easy Apply</p>
                  </div>
                </div>
              </div>
            )}

            {parseSuccess && (
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Resume parsed! Skills and experience synced to your profile.</span>
              </div>
            )}

            {/* Upload dropzone */}
            <label className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 hover:bg-indigo-50/20">
              <Upload className="w-8 h-8 text-indigo-600 mb-2" />
              <span className="text-xs font-bold text-slate-800">
                {isParsingCv ? 'Parsing & Extracting Credentials...' : 'Upload New Resume (PDF / DOCX)'}
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                Drag and drop or click to browse
              </span>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                disabled={isParsingCv}
                className="hidden" 
              />
            </label>
          </div>

          {/* 30-Second Video Intro Preview */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">30-Second Video Intro Pitch</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Applicants with a 30s video introduction receive 3.5x more interview invitations from hiring managers.
              </p>
            </div>

            {/* Video preview player */}
            <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center border border-slate-800 shadow-inner">
              <video
                src={currentUser.videoIntroUrl}
                controls
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <div>
                <span className="font-semibold block text-slate-800">Status: Video Intro Recorded</span>
                <span className="text-[10px] text-slate-400">Length: 0:28s · Verified audio</span>
              </div>
              <button
                onClick={() => alert('Simulated video re-record launched.')}
                className="px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-white border border-slate-200 rounded-md"
              >
                Re-record
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: PREFERENCES */}
      {activeTab === 'preferences' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs max-w-2xl space-y-5 text-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Open-To-Work Preferences</h3>
            <p className="text-slate-500">Configure what recruiters see when matching you with new positions.</p>
          </div>

          <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={currentUser.preferences.openToWork}
              onChange={(e) => updateUserProfile({
                preferences: { ...currentUser.preferences, openToWork: e.target.checked }
              })}
              className="rounded text-indigo-600 w-4 h-4"
            />
            <div>
              <span className="font-bold text-slate-900 block">Open to New Job Opportunities</span>
              <span className="text-[11px] text-slate-500">Feature my profile in recruiter search algorithms and recommendations.</span>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Preferred Role Title</label>
              <input
                type="text"
                value={currentUser.preferences.preferredRole}
                onChange={(e) => updateUserProfile({
                  preferences: { ...currentUser.preferences, preferredRole: e.target.value }
                })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Workplace Preference</label>
              <select
                value={currentUser.preferences.workplaceType}
                onChange={(e) => updateUserProfile({
                  preferences: { ...currentUser.preferences, workplaceType: e.target.value as any }
                })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              >
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="on-site">On-Site</option>
                <option value="any">Flexible / Any</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Minimum Salary Expectation</label>
              <input
                type="number"
                value={currentUser.preferences.minSalaryExpectation}
                onChange={(e) => updateUserProfile({
                  preferences: { ...currentUser.preferences, minSalaryExpectation: Number(e.target.value) }
                })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Preferred Location</label>
              <input
                type="text"
                value={currentUser.preferences.preferredLocation}
                onChange={(e) => updateUserProfile({
                  preferences: { ...currentUser.preferences, preferredLocation: e.target.value }
                })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
