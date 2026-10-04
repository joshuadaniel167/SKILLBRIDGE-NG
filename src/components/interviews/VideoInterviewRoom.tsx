import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { InterviewSchedule } from '../../types';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Monitor, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  Send, 
  Star,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

export const VideoInterviewRoom: React.FC = () => {
  const { 
    interviews, 
    activeVideoCallId, 
    setActiveVideoCallId, 
    updateInterviewStatus, 
    currentUser, 
    currentRole 
  } = useApp();

  const [activeInterview, setActiveInterview] = useState<InterviewSchedule | null>(
    activeVideoCallId 
      ? interviews.find(i => i.id === activeVideoCallId) || interviews[0] 
      : null
  );

  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [hasMediaPermission, setHasMediaPermission] = useState(false);
  const [callDurationSeconds, setCallDurationSeconds] = useState(384); // 6m 24s simulated elapsed
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'Interviewer', text: 'Hi! Let me know if you can hear me and see my screen clearly.', time: '02:01 PM' },
    { sender: 'Joshua Daniel', text: 'Loud and clear! Ready for the system design problem.', time: '02:02 PM' }
  ]);
  const [inCallInput, setInCallInput] = useState('');
  const [activeSideTab, setActiveSideTab] = useState<'rubric' | 'chat'>('rubric');

  // Evaluation rubric state
  const [technicalScore, setTechnicalScore] = useState(5);
  const [commScore, setCommScore] = useState(5);
  const [evalNotes, setEvalNotes] = useState('Candidate effectively explained database connection pooling and idempotency mechanisms.');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Request real media stream when entering interview call
  useEffect(() => {
    if (!activeInterview) return;

    let stream: MediaStream | null = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((s) => {
          stream = s;
          mediaStreamRef.current = s;
          setHasMediaPermission(true);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = s;
          }
        })
        .catch((err) => {
          console.warn('Webcam permission not granted or available in this sandbox, falling back to clean avatar stream:', err);
          setHasMediaPermission(false);
        });
    }

    const timer = setInterval(() => {
      setCallDurationSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeInterview]);

  const toggleCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    setIsMicOn(!isMicOn);
  };

  const handleEndCall = () => {
    if (activeInterview) {
      updateInterviewStatus(activeInterview.id, 'completed');
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    setActiveInterview(null);
    setActiveVideoCallId(null);
  };

  const handleSendInCallMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inCallInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      {
        sender: currentUser.name,
        text: inCallInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInCallInput('');
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      
      {/* If Inside a live call */}
      {activeInterview ? (
        <div className="bg-slate-950 text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Top In-Call Header */}
          <div className="px-6 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold leading-tight">
                    {activeInterview.jobTitle} — {activeInterview.roundType}
                  </h3>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-indigo-400 font-mono">
                    WebRTC Room
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {activeInterview.companyName} · Host: {activeInterview.interviewerName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-mono font-medium text-emerald-400">
                {formatTimer(callDurationSeconds)}
              </div>
            </div>
          </div>

          {/* Main Video Grid & Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[520px]">
            
            {/* Video Streams Canvas */}
            <div className="lg:col-span-8 p-4 bg-slate-950 flex flex-col justify-between">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                
                {/* Remote Participant Stream (Interviewer or Candidate) */}
                <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center min-h-[220px]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80"
                    alt="Remote Interviewer"
                    className="w-full h-full object-cover opacity-90"
                  />
                  
                  {/* Name badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-xs rounded-md text-[11px] font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{activeInterview.interviewerName} ({activeInterview.companyName})</span>
                  </div>

                  {/* Audio indicator */}
                  <div className="absolute top-3 right-3 p-1.5 bg-slate-950/70 rounded-full text-emerald-400">
                    <Mic className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Local Participant Stream (Self with real camera if permitted) */}
                <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center min-h-[220px]">
                  {hasMediaPermission && isCameraOn ? (
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover scale-x-[-1]"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <img
                        src={currentUser.avatar}
                        alt="Local User"
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 mx-auto mb-2"
                      />
                      <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-400">
                        {!isCameraOn ? 'Camera turned off' : 'Camera stream active'}
                      </p>
                    </div>
                  )}

                  {/* Name badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-xs rounded-md text-[11px] font-semibold text-white flex items-center gap-1.5">
                    <span>You ({currentUser.name})</span>
                    {!isMicOn && <span className="text-rose-400 text-[10px]">(Muted)</span>}
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <div className={`p-1.5 rounded-full ${isMicOn ? 'bg-slate-950/70 text-emerald-400' : 'bg-rose-900/80 text-rose-300'}`}>
                      {isMicOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>

              </div>

              {/* In-Call Controls Toolbar */}
              <div className="mt-4 pt-3 flex items-center justify-center gap-3">
                <button
                  onClick={toggleMic}
                  className={`p-3 rounded-full transition-colors ${
                    isMicOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                  title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={toggleCamera}
                  className={`p-3 rounded-full transition-colors ${
                    isCameraOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                  title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
                >
                  {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={`p-3 rounded-full transition-colors ${
                    isScreenSharing ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                  title="Share Screen"
                >
                  <Monitor className="w-5 h-5" />
                </button>

                <button
                  onClick={handleEndCall}
                  className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold text-xs flex items-center gap-2 transition-colors ml-4 shadow-lg shadow-rose-900/40"
                >
                  <PhoneOff className="w-4 h-4" />
                  Leave Room
                </button>
              </div>

            </div>

            {/* In-Call Side Panel (Evaluation Rubric & Live Chat) */}
            <div className="lg:col-span-4 bg-slate-900 border-l border-slate-800 flex flex-col justify-between">
              
              <div>
                {/* Tabs */}
                <div className="px-4 py-2.5 border-b border-slate-800 flex items-center gap-4 text-xs font-semibold">
                  <button
                    onClick={() => setActiveSideTab('rubric')}
                    className={`py-1 transition-colors ${activeSideTab === 'rubric' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-white'}`}
                  >
                    Evaluation Scorecard
                  </button>
                  <button
                    onClick={() => setActiveSideTab('chat')}
                    className={`py-1 transition-colors flex items-center gap-1.5 ${activeSideTab === 'chat' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-white'}`}
                  >
                    In-Call Chat ({chatMessages.length})
                  </button>
                </div>

                {/* Scorecard Tab */}
                {activeSideTab === 'rubric' && (
                  <div className="p-4 space-y-4 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                        Technical Architecture Depth (1-5)
                      </span>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <button
                            key={s}
                            onClick={() => setTechnicalScore(s)}
                            className={`flex-1 py-1 rounded text-xs font-mono font-bold ${
                              s <= technicalScore ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                        Communication & Articulation (1-5)
                      </span>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <button
                            key={s}
                            onClick={() => setCommScore(s)}
                            className={`flex-1 py-1 rounded text-xs font-mono font-bold ${
                              s <= commScore ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                        Live Interview Notes
                      </span>
                      <textarea
                        rows={4}
                        value={evalNotes}
                        onChange={(e) => setEvalNotes(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Type feedback, code snippets, trade-off notes..."
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                      <span className="text-white font-semibold block mb-0.5">Topic Focus:</span>
                      System idempotency, double-entry ledger, transaction outbox pattern with Kafka.
                    </div>
                  </div>
                )}

                {/* Chat Tab */}
                {activeSideTab === 'chat' && (
                  <div className="p-4 space-y-3 max-h-[360px] overflow-y-auto">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className="text-xs">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                          <span className="font-semibold text-slate-300">{msg.sender}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p className="p-2.5 bg-slate-800/80 rounded-lg text-slate-200 leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Chat Input if on chat tab */}
              {activeSideTab === 'chat' && (
                <form onSubmit={handleSendInCallMessage} className="p-3 border-t border-slate-800 flex gap-2">
                  <input
                    type="text"
                    value={inCallInput}
                    onChange={(e) => setInCallInput(e.target.value)}
                    placeholder="Share link or question in call..."
                    className="flex-1 text-xs p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      ) : (
        /* Overview of Scheduled Interviews */
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Video Interviews & Scheduler
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Built-in WebRTC video consultation rooms, calendar invites, and live technical evaluation rubrics.
                </p>
              </div>

              {interviews.some(i => i.status === 'scheduled') && (
                <button
                  onClick={() => setActiveInterview(interviews[0])}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  Launch Video Room Test
                </button>
              )}
            </div>
          </div>

          {/* List of interviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviews.map(item => (
              <div
                key={item.id}
                className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <img 
                        src={item.companyLogo} 
                        alt={item.companyName} 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200" 
                      />
                      <div>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                          {item.roundType}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight mt-0.5">
                          {item.jobTitle}
                        </h3>
                        <p className="text-xs text-slate-500">{item.companyName}</p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                      item.status === 'completed' ? 'bg-emerald-50 text-emerald-800' :
                      item.status === 'in_progress' ? 'bg-amber-50 text-amber-800 animate-pulse' :
                      'bg-indigo-50 text-indigo-700'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{item.date} at {item.time} ({item.durationMinutes} mins)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Interviewer: <strong>{item.interviewerName}</strong> ({item.interviewerRole})</span>
                    </div>
                  </div>

                  {item.notes && (
                    <p className="text-xs text-slate-500 italic mt-2">
                      "{item.notes}"
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={item.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-600 hover:text-slate-900 underline flex items-center gap-1"
                  >
                    Google Meet Backup <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => setActiveInterview(item)}
                    className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs flex items-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" />
                    Join Video Room
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
