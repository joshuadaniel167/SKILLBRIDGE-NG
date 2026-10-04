import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EmployeeConnector, NetworkingEvent, CoffeeChatRequest } from '../../types';
import { 
  Coffee, 
  Calendar, 
  Star, 
  Building2, 
  MessageSquare, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Video,
  X,
  ChevronRight,
  Award
} from 'lucide-react';

export const MeetConnectView: React.FC = () => {
  const { 
    connectors, 
    coffeeChatRequests, 
    requestCoffeeChat, 
    updateCoffeeChatStatus,
    events, 
    rsvpEvent, 
    currentUser, 
    currentRole,
    startOrOpenConversation,
    setActiveTab,
    companies
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'coffee_chats' | 'events' | 'my_requests'>('coffee_chats');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState('All');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState('All');
  
  // Booking modal
  const [bookingConnector, setBookingConnector] = useState<EmployeeConnector | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [targetRole, setTargetRole] = useState('Senior Full Stack Engineer');
  const [selectedDate, setSelectedDate] = useState('Oct 10, 2026');
  const [selectedTime, setSelectedTime] = useState('04:00 PM');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filter connectors
  const filteredConnectors = connectors.filter(c => {
    if (selectedCompanyFilter !== 'All' && c.companyId !== selectedCompanyFilter) return false;
    if (selectedTopicFilter !== 'All' && !c.topics.some(t => t.toLowerCase().includes(selectedTopicFilter.toLowerCase()))) return false;
    return true;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingConnector) return;

    requestCoffeeChat(
      bookingConnector.id,
      chatMessage || `Hi ${bookingConnector.name}, I would love 15 minutes of your time for career guidance and to learn about ${bookingConnector.companyName}!`,
      targetRole,
      selectedDate,
      selectedTime
    );

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingConnector(null);
      setActiveSubTab('my_requests');
    }, 1200);
  };

  const userRequests = coffeeChatRequests.filter(r => 
    currentRole === 'insider' ? r.insiderId === 'conn-1' : r.applicantId === currentUser.id
  );

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Meet & Connect
              </h1>
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                The Transparency Hub
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Don't apply into a black box. Connect with verified employee insiders for 1:1 coffee chats, ask for authentic referrals, and attend live virtual AMAs.
            </p>
          </div>

          {/* Sub tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveSubTab('coffee_chats')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                activeSubTab === 'coffee_chats' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Coffee className="w-3.5 h-3.5 text-amber-600" />
              Insider Directory ({connectors.length})
            </button>
            <button
              onClick={() => setActiveSubTab('events')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                activeSubTab === 'events' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              Live Events & AMAs ({events.length})
            </button>
            <button
              onClick={() => setActiveSubTab('my_requests')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                activeSubTab === 'my_requests' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              My Chats ({userRequests.length})
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: INSIDER DIRECTORY (COFFEE CHATS) */}
      {activeSubTab === 'coffee_chats' && (
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-slate-500 font-medium">Filter by Company:</span>
              <select
                value={selectedCompanyFilter}
                onChange={(e) => setSelectedCompanyFilter(e.target.value)}
                className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
              >
                <option value="All">All Companies</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <span className="text-slate-500 font-medium ml-2">Topic:</span>
              <select
                value={selectedTopicFilter}
                onChange={(e) => setSelectedTopicFilter(e.target.value)}
                className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
              >
                <option value="All">All Topics</option>
                <option value="Interview">Interview Prep</option>
                <option value="Culture">Culture & Perks</option>
                <option value="Referral">Referral Guidance</option>
                <option value="System Design">System Design</option>
              </select>
            </div>

            <div className="text-slate-500 font-mono text-[11px]">
              {filteredConnectors.length} Verified Insiders Available
            </div>
          </div>

          {/* Insiders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredConnectors.map(connector => (
              <div 
                key={connector.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-all"
              >
                <div>
                  
                  {/* Top card row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img 
                          src={connector.avatar} 
                          alt={connector.name} 
                          referrerPolicy="no-referrer"
                          className="w-13 h-13 rounded-xl object-cover border border-slate-200"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Verified employee & active" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-slate-900">{connector.name}</h3>
                          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                        </div>
                        <p className="text-xs text-slate-600 font-medium">{connector.role}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {connector.companyName} · {connector.yearsAtCompany} yrs tenure
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                        ★ {connector.rating}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">{connector.totalChatsConducted} chats</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {connector.bio}
                  </p>

                  {/* Topics Tags */}
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Topics I can help with:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {connector.topics.map((t, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Available time slots */}
                  <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Slots: {connector.availableDays.join(', ')}</span>
                  </div>

                </div>

                {/* Actions */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      startOrOpenConversation(
                        connector.userId,
                        connector.name,
                        connector.avatar,
                        `${connector.role} @ ${connector.companyName}`
                      );
                    }}
                    className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs"
                    title="Send direct message"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setBookingConnector(connector);
                      setChatMessage(`Hi ${connector.name}, I am preparing to apply for a Senior role at ${connector.companyName}. Would love 15 minutes to ask about team dynamics and get your advice!`);
                    }}
                    className="flex-1 py-2 px-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Coffee className="w-3.5 h-3.5" />
                    Request 15-Min Coffee Chat
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* SUB-TAB 2: NETWORKING EVENTS & AMAS */}
      {activeSubTab === 'events' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {events.map(ev => {
              const isRsvpd = ev.rsvpUserIds.includes(currentUser.id);
              return (
                <div key={ev.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <img 
                          src={ev.companyLogo} 
                          alt={ev.companyName} 
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-md object-cover border border-slate-200" 
                        />
                        <span className="text-xs font-bold text-slate-900">{ev.companyName}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded tracking-wider">
                        {ev.eventType.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {ev.description}
                    </p>

                    {/* Speaker */}
                    <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
                      <img 
                        src={ev.speakerAvatar} 
                        alt={ev.speakerName} 
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-slate-300"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{ev.speakerName}</p>
                        <p className="text-[10px] text-slate-500 truncate">{ev.speakerRole}</p>
                      </div>
                    </div>

                    {/* Event metadata */}
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{ev.date} · {ev.time}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {ev.rsvpsCount} attendees
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => rsvpEvent(ev.id)}
                      className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5 ${
                        isRsvpd
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {isRsvpd ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          RSVP Confirmed
                        </>
                      ) : (
                        'RSVP For Free'
                      )}
                    </button>

                    <a
                      href={ev.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg"
                      title="Join Meet Link"
                    >
                      <Video className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: MY REQUESTS */}
      {activeSubTab === 'my_requests' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Your Coffee Chat Engagements</h3>
              <p className="text-xs text-slate-500">Track pending invitations, acceptances, and scheduled video links.</p>
            </div>
          </div>

          {userRequests.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No coffee chats requested yet. Check the Insider Directory to connect with employees!
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {userRequests.map(req => (
                <div key={req.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <img 
                      src={currentRole === 'insider' ? req.applicantAvatar : req.insiderAvatar} 
                      alt="Avatar" 
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">
                          {currentRole === 'insider' ? req.applicantName : req.insiderName}
                        </h4>
                        <span className={`text-[10px] font-semibold px-2 py-0.2 rounded uppercase ${
                          req.status === 'accepted' ? 'bg-emerald-50 text-emerald-800' :
                          req.status === 'declined' ? 'bg-rose-50 text-rose-800' :
                          'bg-amber-50 text-amber-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {currentRole === 'insider' ? req.applicantHeadline : `${req.insiderRole} @ ${req.companyName}`}
                      </p>
                      <p className="text-xs text-slate-500 italic mt-1 bg-slate-50 p-2 rounded border border-slate-100">
                        "{req.message}"
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                        <span>Scheduled: {req.preferredDate} at {req.preferredTime}</span>
                        {req.meetLink && (
                          <a href={req.meetLink} target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold underline flex items-center gap-1">
                            Join Video Link <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {currentRole === 'insider' && req.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCoffeeChatStatus(req.id, 'accepted')}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                      >
                        Accept Chat
                      </button>
                      <button
                        onClick={() => updateCoffeeChatStatus(req.id, 'declined')}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Booking Modal */}
      {bookingConnector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Request 15-Minute Coffee Chat
                </h3>
              </div>
              <button 
                onClick={() => setBookingConnector(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-base font-bold text-slate-900">Coffee Chat Request Sent!</h4>
                <p className="text-xs text-slate-600 mt-1">
                  {bookingConnector.name} will receive your request and meeting link. You can track this under "My Chats".
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                
                {/* Host summary */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
                  <img 
                    src={bookingConnector.avatar} 
                    alt={bookingConnector.name} 
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{bookingConnector.name}</h4>
                    <p className="text-[11px] text-slate-600">{bookingConnector.role} @ {bookingConnector.companyName}</p>
                    <p className="text-[10px] text-indigo-600 font-medium">★ {bookingConnector.rating} · {bookingConnector.totalChatsConducted} chats conducted</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Role or Opportunity
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Senior Backend Engineer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="text"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Time Slot
                    </label>
                    <input
                      type="text"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Introduction & Questions for Host
                  </label>
                  <textarea
                    rows={3}
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Briefly state what you'd like guidance on..."
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setBookingConnector(null)}
                    className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-xs"
                  >
                    Confirm & Send Request
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
