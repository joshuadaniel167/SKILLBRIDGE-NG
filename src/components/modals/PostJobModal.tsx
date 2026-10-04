import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Sparkles, Building2, DollarSign } from 'lucide-react';

interface PostJobModalProps {
  onClose: () => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ onClose }) => {
  const { addJob, currentUser, companies } = useApp();

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [workplaceType, setWorkplaceType] = useState<'remote' | 'hybrid' | 'on-site'>('hybrid');
  const [jobType, setJobType] = useState<'full-time' | 'contract' | 'internship'>('full-time');
  const [experienceLevel, setExperienceLevel] = useState<'junior' | 'mid' | 'senior' | 'lead'>('senior');
  const [location, setLocation] = useState('Lagos, Nigeria (Hybrid)');
  const [salaryMin, setSalaryMin] = useState(18000000);
  const [salaryMax, setSalaryMax] = useState(26000000);
  const [salaryCurrency, setSalaryCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [description, setDescription] = useState('');
  const [skillsInput, setSkillsInput] = useState('TypeScript, React, Node.js, PostgreSQL');

  const currentCompany = companies.find(c => c.id === currentUser.companyId) || companies[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);

    addJob({
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      companyId: currentCompany.id,
      companyName: currentCompany.name,
      companyLogo: currentCompany.logo,
      location,
      workplaceType,
      jobType,
      experienceLevel,
      department,
      salaryMin,
      salaryMax,
      salaryCurrency,
      description,
      responsibilities: [
        'Architect, implement, and maintain high-scale software modules',
        'Collaborate with product and design to craft seamless developer experiences',
        'Participate in code reviews and distributed systems design planning'
      ],
      requirements: [
        'Proven commercial track record in production software engineering',
        'Strong problem-solving, clean code principles, and written communication'
      ],
      skills,
      benefits: currentCompany.benefits || ['Comprehensive HMO', 'Learning budget', 'Flexible leave'],
      featured: true
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-6">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">Post a New Job Opening</h3>
            <p className="text-xs text-slate-500">Posting on behalf of {currentCompany.name}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Job Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lead Distributed Systems Engineer"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product Management">Product Management</option>
                <option value="Product Design">Product Design</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Growth & Marketing">Growth & Marketing</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Workplace Type</label>
              <select
                value={workplaceType}
                onChange={(e) => setWorkplaceType(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              >
                <option value="hybrid">Hybrid</option>
                <option value="remote">Remote</option>
                <option value="on-site">On-Site</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Employment Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              >
                <option value="full-time">Full-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              >
                <option value="junior">Junior</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead / Staff</option>
              </select>
            </div>
          </div>

          {/* Salary Transparency */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-800 block">Transparent Salary Band</span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 block">Min Salary</label>
                <input
                  type="number"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-300 rounded font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block">Max Salary</label>
                <input
                  type="number"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-300 rounded font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block">Currency</label>
                <select
                  value={salaryCurrency}
                  onChange={(e) => setSalaryCurrency(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                >
                  <option value="NGN">NGN (₦)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Skills (comma separated)</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              placeholder="e.g. TypeScript, React, Go, Docker"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Role Description</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the mission, technical challenges, and team expectations..."
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Publish Job Listing
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
