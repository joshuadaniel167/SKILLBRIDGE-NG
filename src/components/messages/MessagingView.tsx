import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  Send, 
  Check, 
  CheckCheck, 
  Sparkles, 
  User, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  Search
} from 'lucide-react';

export const MessagingView: React.FC = () => {
  const { 
    conversations, 
    messages, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage, 
    currentUser,
    setActiveTab
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [searchContact, setSearchContact] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const currentMessages = activeConversationId ? (messages[activeConversationId] || []) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentConv) return;
    sendMessage(currentConv.id, inputText);
    setInputText('');
  };

  const getOtherParticipant = (conv: typeof currentConv) => {
    if (!conv) return { name: 'User', avatar: '', role: '' };
    const otherId = conv.participantIds.find(id => id !== currentUser.id) || conv.participantIds[0];
    return {
      id: otherId,
      name: conv.participantNames[otherId] || 'Partner',
      avatar: conv.participantAvatars[otherId] || '',
      role: conv.participantRoles[otherId] || 'Member'
    };
  };

  const quickPrompts = [
    "Could you share a bit more about the tech stack requirements for this role?",
    "When can I expect the next update on my interview rounds?",
    "Thank you for the detailed feedback! When would be best for our follow-up chat?",
    "I have reviewed the offer package and have a quick question regarding health insurance."
  ];

  const otherUser = currentConv ? getOtherParticipant(currentConv) : null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs h-[calc(100vh-8rem)] min-h-[580px] grid grid-cols-1 md:grid-cols-12">
      
      {/* Left Column: Conversations List */}
      <div className="md:col-span-4 border-r border-slate-200 flex flex-col justify-between bg-slate-50/50">
        <div>
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900">Direct Messages</h2>
            <p className="text-[11px] text-slate-500">Recruiters, verified insiders & applicants</p>

            <div className="mt-3 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchContact}
                onChange={(e) => setSearchContact(e.target.value)}
                placeholder="Search conversations..."
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="divide-y divide-slate-100 overflow-y-auto max-h-[calc(100vh-16rem)]">
            {conversations.map(conv => {
              const other = getOtherParticipant(conv);
              const isSelected = currentConv?.id === conv.id;
              const unread = conv.unreadCount[currentUser.id] || 0;

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-3.5 cursor-pointer transition-colors flex items-start gap-3 ${
                    isSelected ? 'bg-indigo-50/70 border-l-3 border-indigo-600' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <img 
                    src={other.avatar} 
                    alt={other.name} 
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" 
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{other.name}</h4>
                      <span className="text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                    </div>
                    <p className="text-[10px] text-indigo-600 font-medium truncate">{other.role}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                  {unread > 0 && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between bg-white">
          <span>Logged in as: <strong>{currentUser.name}</strong></span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
        </div>
      </div>

      {/* Right Column: Active Chat Thread */}
      {currentConv && otherUser ? (
        <div className="md:col-span-8 flex flex-col justify-between bg-white">
          
          {/* Thread Header */}
          <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <img 
                src={otherUser.avatar} 
                alt={otherUser.name} 
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-slate-200" 
              />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">{otherUser.name}</h3>
                <p className="text-[11px] text-slate-500">{otherUser.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('interviews')}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-lg text-xs flex items-center gap-1.5"
                title="Launch video meeting"
              >
                <Video className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline font-semibold">Start Video</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-slate-50/30">
            {currentMessages.map(msg => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <img 
                      src={msg.senderAvatar} 
                      alt={msg.senderName} 
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                  )}
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isMe 
                        ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {!isMe && (
                      <p className="text-[10px] font-bold text-slate-400 mb-1">{msg.senderName}</p>
                    )}
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block text-right mt-1 ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-6 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-500" /> Quick:
            </span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(prompt)}
                className="text-[11px] whitespace-nowrap bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded text-slate-600 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${otherUser.name}...`}
              className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-xs"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      ) : (
        <div className="md:col-span-8 flex items-center justify-center p-8 text-xs text-slate-500">
          Select a conversation from the left to start messaging.
        </div>
      )}

    </div>
  );
};
