import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  Company,
  Job,
  Application,
  ApplicationStage,
  EmployeeConnector,
  CoffeeChatRequest,
  CompanyReview,
  CompanyQA,
  NetworkingEvent,
  InterviewSchedule,
  OfferLetter,
  OnboardingTask,
  Assessment,
  NotificationItem,
  ChatMessage,
  Conversation
} from '../types';
import {
  INITIAL_COMPANIES,
  INITIAL_JOBS,
  INITIAL_USER_APPLICANT,
  INITIAL_USER_EMPLOYER,
  INITIAL_USER_INSIDER,
  INITIAL_USER_ADMIN,
  INITIAL_EMPLOYEE_CONNECTORS,
  INITIAL_REVIEWS,
  INITIAL_COMPANY_QAS,
  INITIAL_NETWORKING_EVENTS,
  INITIAL_APPLICATIONS,
  INITIAL_INTERVIEWS,
  INITIAL_OFFER,
  INITIAL_ONBOARDING_TASKS,
  INITIAL_ASSESSMENT,
  INITIAL_NOTIFICATIONS,
  APPLICANT_AVATAR
} from '../data/seedData';

export type NavigationTab = 
  | 'jobs' 
  | 'companies' 
  | 'connect' 
  | 'ats' 
  | 'interviews' 
  | 'messages' 
  | 'profile' 
  | 'admin';

interface AppContextType {
  currentUser: UserProfile;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  
  // Jobs
  jobs: Job[];
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  addJob: (job: Omit<Job, 'id' | 'postedDate' | 'applicantsCount' | 'status'>) => void;
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;

  // Companies
  companies: Company[];
  selectedCompanyId: string | null;
  setSelectedCompanyId: (id: string | null) => void;
  followedCompanyIds: string[];
  toggleFollowCompany: (companyId: string) => void;
  addCompanyReview: (review: Omit<CompanyReview, 'id' | 'helpfulVotes' | 'createdAt'>) => void;
  addCompanyQAQuestion: (companyId: string, question: string, isAnonymous: boolean) => void;
  addCompanyQAAnswer: (qaId: string, answerText: string, isAnonymous: boolean) => void;

  // Applications & ATS
  applications: Application[];
  applyToJob: (jobId: string, coverNote?: string, customCvName?: string) => boolean;
  updateApplicationStage: (applicationId: string, stage: ApplicationStage) => void;
  rateApplication: (applicationId: string, rating: number) => void;
  addApplicationNote: (applicationId: string, noteText: string) => void;
  
  // Insiders & Coffee Chats
  connectors: EmployeeConnector[];
  coffeeChatRequests: CoffeeChatRequest[];
  requestCoffeeChat: (insiderId: string, message: string, targetRole: string, preferredDate: string, preferredTime: string) => void;
  updateCoffeeChatStatus: (requestId: string, status: 'accepted' | 'declined' | 'completed') => void;

  // Events
  events: NetworkingEvent[];
  rsvpEvent: (eventId: string) => void;

  // Interviews & Video
  interviews: InterviewSchedule[];
  scheduleInterview: (data: Omit<InterviewSchedule, 'id' | 'meetLink' | 'status'>) => void;
  updateInterviewStatus: (interviewId: string, status: InterviewSchedule['status']) => void;
  activeVideoCallId: string | null;
  setActiveVideoCallId: (id: string | null) => void;

  // Offers & Onboarding
  offerLetters: OfferLetter[];
  signOfferLetter: (offerId: string, signatureDataUrl: string) => void;
  createOfferLetter: (offer: Omit<OfferLetter, 'id' | 'status'>) => void;
  onboardingTasks: OnboardingTask[];
  toggleOnboardingTask: (taskId: string) => void;
  uploadOnboardingDoc: (taskId: string, fileName: string) => void;

  // Assessments
  assessment: Assessment;
  submitAssessment: (score: number, passed: boolean) => void;

  // Messaging
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startOrOpenConversation: (participantId: string, participantName: string, participantAvatar: string, participantRole: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;

  // Profile actions
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  endorseSkill: (skillId: string) => void;
  simulateCvParse: (fileName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user role
  const [currentRole, setCurrentRole] = useState<UserRole>('applicant');
  const [activeTab, setActiveTab] = useState<NavigationTab>('jobs');

  // User profiles by role
  const [applicantUser, setApplicantUser] = useState<UserProfile>(INITIAL_USER_APPLICANT);
  const [employerUser, setEmployerUser] = useState<UserProfile>(INITIAL_USER_EMPLOYER);
  const [insiderUser, setInsiderUser] = useState<UserProfile>(INITIAL_USER_INSIDER);
  const [adminUser, setAdminUser] = useState<UserProfile>(INITIAL_USER_ADMIN);

  // Entities
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-4']);
  const [selectedJobId, setSelectedJobId] = useState<string | null>('job-1');

  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [followedCompanyIds, setFollowedCompanyIds] = useState<string[]>(['comp-1', 'comp-2']);
  const [reviews, setReviews] = useState<CompanyReview[]>(INITIAL_REVIEWS);
  const [companyQAs, setCompanyQAs] = useState<CompanyQA[]>(INITIAL_COMPANY_QAS);

  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [connectors] = useState<EmployeeConnector[]>(INITIAL_EMPLOYEE_CONNECTORS);
  const [coffeeChatRequests, setCoffeeChatRequests] = useState<CoffeeChatRequest[]>([
    {
      id: 'req-1',
      insiderId: 'conn-1',
      insiderName: 'Tunde Adebayo',
      insiderAvatar: INITIAL_USER_INSIDER.avatar,
      insiderRole: 'Staff Backend Engineer',
      companyName: 'Flutterwave',
      applicantId: 'user-applicant-1',
      applicantName: 'Joshua Daniel',
      applicantAvatar: APPLICANT_AVATAR,
      applicantHeadline: 'Senior Full Stack Engineer',
      message: 'Hi Tunde, I’d love to ask a few questions about Flutterwave’s architecture and get your guidance before my interview loop!',
      targetRole: 'Senior Backend Engineer (Send)',
      preferredDate: 'Oct 08, 2026',
      preferredTime: '04:30 PM',
      meetLink: 'https://meet.skillbridge.ng/coffee-chat-flw-12',
      status: 'accepted',
      createdAt: 'Oct 02, 2026'
    }
  ]);

  const [events, setEvents] = useState<NetworkingEvent[]>(INITIAL_NETWORKING_EVENTS);
  const [interviews, setInterviews] = useState<InterviewSchedule[]>(INITIAL_INTERVIEWS);
  const [activeVideoCallId, setActiveVideoCallId] = useState<string | null>(null);

  const [offerLetters, setOfferLetters] = useState<OfferLetter[]>([INITIAL_OFFER]);
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>(INITIAL_ONBOARDING_TASKS);
  const [assessment] = useState<Assessment>(INITIAL_ASSESSMENT);

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Conversations
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      participantIds: ['user-applicant-1', 'user-recruiter-1'],
      participantNames: {
        'user-applicant-1': 'Joshua Daniel',
        'user-recruiter-1': 'Sarah Chen'
      },
      participantAvatars: {
        'user-applicant-1': APPLICANT_AVATAR,
        'user-recruiter-1': INITIAL_USER_EMPLOYER.avatar
      },
      participantRoles: {
        'user-applicant-1': 'Senior Full Stack Candidate',
        'user-recruiter-1': 'Lead Recruiter @ Paystack'
      },
      lastMessage: 'Congratulations again Joshua! Your offer letter is ready for review in your portal.',
      lastMessageTime: '10:45 AM',
      unreadCount: { 'user-applicant-1': 1, 'user-recruiter-1': 0 }
    },
    {
      id: 'conv-2',
      participantIds: ['user-applicant-1', 'user-insider-1'],
      participantNames: {
        'user-applicant-1': 'Joshua Daniel',
        'user-insider-1': 'Tunde Adebayo'
      },
      participantAvatars: {
        'user-applicant-1': APPLICANT_AVATAR,
        'user-insider-1': INITIAL_USER_INSIDER.avatar
      },
      participantRoles: {
        'user-applicant-1': 'Candidate',
        'user-insider-1': 'Staff Engineer @ Flutterwave'
      },
      lastMessage: 'Looking forward to our coffee chat on Tuesday! Be ready to discuss event outboxes.',
      lastMessageTime: 'Yesterday',
      unreadCount: { 'user-applicant-1': 0, 'user-insider-1': 0 }
    }
  ]);

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    'conv-1': [
      {
        id: 'm-1',
        conversationId: 'conv-1',
        senderId: 'user-recruiter-1',
        senderName: 'Sarah Chen',
        senderAvatar: INITIAL_USER_EMPLOYER.avatar,
        text: 'Hi Joshua, thank you for your patience while the interview panel deliberated on your system design interview.',
        timestamp: '10:30 AM'
      },
      {
        id: 'm-2',
        conversationId: 'conv-1',
        senderId: 'user-applicant-1',
        senderName: 'Joshua Daniel',
        senderAvatar: APPLICANT_AVATAR,
        text: 'Thank you Sarah! I really enjoyed diving into the distributed idempotency problem with the team.',
        timestamp: '10:35 AM'
      },
      {
        id: 'm-3',
        conversationId: 'conv-1',
        senderId: 'user-recruiter-1',
        senderName: 'Sarah Chen',
        senderAvatar: INITIAL_USER_EMPLOYER.avatar,
        text: 'Congratulations again Joshua! Your offer letter is ready for review in your portal.',
        timestamp: '10:45 AM'
      }
    ],
    'conv-2': [
      {
        id: 'm-4',
        conversationId: 'conv-2',
        senderId: 'user-applicant-1',
        senderName: 'Joshua Daniel',
        senderAvatar: APPLICANT_AVATAR,
        text: 'Hi Tunde, thanks for accepting my Coffee Chat request! Very excited to chat about Flutterwave tech.',
        timestamp: 'Yesterday 3:10 PM'
      },
      {
        id: 'm-5',
        conversationId: 'conv-2',
        senderId: 'user-insider-1',
        senderName: 'Tunde Adebayo',
        senderAvatar: INITIAL_USER_INSIDER.avatar,
        text: 'Looking forward to our coffee chat on Tuesday! Be ready to discuss event outboxes.',
        timestamp: 'Yesterday 4:00 PM'
      }
    ]
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-1');

  // Active current user based on currentRole
  const currentUser = 
    currentRole === 'applicant' ? applicantUser :
    currentRole === 'employer' ? employerUser :
    currentRole === 'insider' ? insiderUser :
    adminUser;

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    // Suggest intuitive default tab for role
    if (role === 'employer') {
      setActiveTab('ats');
    } else if (role === 'admin') {
      setActiveTab('admin');
    } else if (role === 'insider') {
      setActiveTab('connect');
    } else {
      setActiveTab('jobs');
    }
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const addJob = (newJobData: Omit<Job, 'id' | 'postedDate' | 'applicantsCount' | 'status'>) => {
    const newJob: Job = {
      ...newJobData,
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      applicantsCount: 0,
      status: 'active'
    };
    setJobs(prev => [newJob, ...prev]);

    // Send a system notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'New Job Published',
      description: `Your job posting "${newJob.title}" is now active and visible to all candidates!`,
      type: 'application',
      read: false,
      linkTab: 'jobs',
      createdAt: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const toggleFollowCompany = (companyId: string) => {
    setFollowedCompanyIds(prev => {
      const isFollowed = prev.includes(companyId);
      const updated = isFollowed ? prev.filter(id => id !== companyId) : [...prev, companyId];
      // Update company follower count
      setCompanies(all => all.map(c => c.id === companyId ? { ...c, followersCount: c.followersCount + (isFollowed ? -1 : 1) } : c));
      return updated;
    });
  };

  const addCompanyReview = (reviewData: Omit<CompanyReview, 'id' | 'helpfulVotes' | 'createdAt'>) => {
    const newRev: CompanyReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      helpfulVotes: 0,
      createdAt: 'Just now'
    };
    setReviews(prev => [newRev, ...prev]);

    // recalculate company rating
    setCompanies(all => all.map(c => {
      if (c.id === reviewData.companyId) {
        const newCount = c.reviewsCount + 1;
        const newRating = Number(((c.overallRating * c.reviewsCount + reviewData.rating) / newCount).toFixed(1));
        return {
          ...c,
          reviewsCount: newCount,
          overallRating: newRating
        };
      }
      return c;
    }));
  };

  const addCompanyQAQuestion = (companyId: string, question: string, isAnonymous: boolean) => {
    const newQA: CompanyQA = {
      id: `qa-${Date.now()}`,
      companyId,
      question,
      askedBy: isAnonymous ? 'Anonymous Candidate' : currentUser.name,
      askedByRole: isAnonymous ? undefined : currentUser.headline,
      isAnonymous,
      createdAt: 'Just now',
      upvotes: 1,
      answers: []
    };
    setCompanyQAs(prev => [newQA, ...prev]);
  };

  const addCompanyQAAnswer = (qaId: string, answerText: string, isAnonymous: boolean) => {
    const newAns = {
      id: `ans-${Date.now()}`,
      authorName: isAnonymous ? 'Anonymous Employee' : currentUser.name,
      authorRole: currentUser.headline,
      isVerifiedEmployee: currentRole === 'insider' || currentRole === 'employer',
      isAnonymous,
      text: answerText,
      createdAt: 'Just now',
      upvotes: 0
    };

    setCompanyQAs(prev => prev.map(qa => qa.id === qaId ? { ...qa, answers: [...qa.answers, newAns] } : qa));
  };

  const applyToJob = (jobId: string, coverNote?: string, customCvName?: string): boolean => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return false;

    // Check if already applied
    const alreadyApplied = applications.some(a => a.jobId === jobId && a.applicantId === currentUser.id);
    if (alreadyApplied) return false;

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: targetJob.title,
      companyId: targetJob.companyId,
      companyName: targetJob.companyName,
      companyLogo: targetJob.companyLogo,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      applicantEmail: currentUser.email,
      applicantAvatar: currentUser.avatar,
      applicantHeadline: currentUser.headline,
      applicantSkills: currentUser.skills.map(s => s.name),
      applicantLocation: currentUser.location,
      appliedDate: 'Just now',
      updatedDate: 'Just now',
      stage: 'applied',
      coverNote: coverNote || 'Excited to apply via SkillBridge NG Easy Apply.',
      cvFileName: customCvName || currentUser.cvFileName || 'Resume.pdf',
      notes: []
    };

    setApplications(prev => [newApplication, ...prev]);
    // increment applicant count on job
    setJobs(all => all.map(j => j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j));

    // notification for applicant
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Application Successfully Submitted',
      description: `Your application for "${targetJob.title}" at ${targetJob.companyName} was submitted. Track it on your ATS dashboard.`,
      type: 'application',
      read: false,
      linkTab: 'ats',
      createdAt: 'Just now'
    };
    setNotifications(prev => [notif, ...prev]);

    return true;
  };

  const updateApplicationStage = (applicationId: string, stage: ApplicationStage) => {
    setApplications(prev => prev.map(a => {
      if (a.id === applicationId) {
        return {
          ...a,
          stage,
          updatedDate: 'Just now'
        };
      }
      return a;
    }));

    // Trigger notification if applicant moved
    const app = applications.find(a => a.id === applicationId);
    if (app) {
      const stageNameMap: Record<ApplicationStage, string> = {
        applied: 'Received',
        viewed: 'Viewed by Recruiter',
        shortlisted: 'Shortlisted',
        interview: 'Invited to Interview',
        offer: 'Offer Extended',
        hired: 'Hired!',
        rejected: 'Application Closed'
      };

      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: app.applicantId,
        title: `Application Update: ${stageNameMap[stage]}`,
        description: `${app.companyName} moved your application for ${app.jobTitle} to "${stageNameMap[stage]}".`,
        type: stage === 'offer' ? 'offer' : stage === 'interview' ? 'interview' : 'application',
        read: false,
        linkTab: 'ats',
        createdAt: 'Just now'
      };
      setNotifications(p => [notif, ...p]);
    }
  };

  const rateApplication = (applicationId: string, rating: number) => {
    setApplications(prev => prev.map(a => a.id === applicationId ? { ...a, rating } : a));
  };

  const addApplicationNote = (applicationId: string, noteText: string) => {
    const note = {
      id: `n-${Date.now()}`,
      authorName: currentUser.name,
      authorRole: currentUser.headline || 'Recruiter',
      text: noteText,
      createdAt: 'Just now'
    };
    setApplications(prev => prev.map(a => a.id === applicationId ? { ...a, notes: [...a.notes, note] } : a));
  };

  const requestCoffeeChat = (insiderId: string, message: string, targetRole: string, preferredDate: string, preferredTime: string) => {
    const connector = connectors.find(c => c.id === insiderId);
    if (!connector) return;

    const newReq: CoffeeChatRequest = {
      id: `req-${Date.now()}`,
      insiderId,
      insiderName: connector.name,
      insiderAvatar: connector.avatar,
      insiderRole: connector.role,
      companyName: connector.companyName,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      applicantAvatar: currentUser.avatar,
      applicantHeadline: currentUser.headline,
      message,
      targetRole,
      preferredDate,
      preferredTime,
      meetLink: `https://meet.skillbridge.ng/chat-${Math.random().toString(36).substring(7)}`,
      status: 'pending',
      createdAt: 'Just now'
    };

    setCoffeeChatRequests(prev => [newReq, ...prev]);

    // Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Coffee Chat Request Sent',
      description: `Sent coffee chat request to ${connector.name} at ${connector.companyName}. You will be notified when accepted!`,
      type: 'coffee_chat',
      read: false,
      linkTab: 'connect',
      createdAt: 'Just now'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const updateCoffeeChatStatus = (requestId: string, status: 'accepted' | 'declined' | 'completed') => {
    setCoffeeChatRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r));
  };

  const rsvpEvent = (eventId: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const isRsvpd = ev.rsvpUserIds.includes(currentUser.id);
        const newIds = isRsvpd ? ev.rsvpUserIds.filter(id => id !== currentUser.id) : [...ev.rsvpUserIds, currentUser.id];
        return {
          ...ev,
          rsvpUserIds: newIds,
          rsvpsCount: ev.rsvpsCount + (isRsvpd ? -1 : 1)
        };
      }
      return ev;
    }));
  };

  const scheduleInterview = (data: Omit<InterviewSchedule, 'id' | 'meetLink' | 'status'>) => {
    const newInterview: InterviewSchedule = {
      ...data,
      id: `int-${Date.now()}`,
      meetLink: `https://meet.skillbridge.ng/room-${Math.random().toString(36).substring(7)}`,
      status: 'scheduled'
    };
    setInterviews(prev => [newInterview, ...prev]);

    // Also update application to interview stage
    updateApplicationStage(data.applicationId, 'interview');

    // Notify applicant
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: data.applicantId,
      title: `Interview Scheduled: ${data.roundType}`,
      description: `${data.companyName} scheduled your ${data.roundType} for ${data.date} at ${data.time}. Video room is ready.`,
      type: 'interview',
      read: false,
      linkTab: 'interviews',
      createdAt: 'Just now'
    };
    setNotifications(p => [notif, ...p]);
  };

  const updateInterviewStatus = (interviewId: string, status: InterviewSchedule['status']) => {
    setInterviews(prev => prev.map(i => i.id === interviewId ? { ...i, status } : i));
  };

  const signOfferLetter = (offerId: string, signatureDataUrl: string) => {
    setOfferLetters(prev => prev.map(o => {
      if (o.id === offerId) {
        return {
          ...o,
          status: 'accepted',
          signedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          signatureDataUrl
        };
      }
      return o;
    }));

    // Update application stage to hired
    const offer = offerLetters.find(o => o.id === offerId);
    if (offer) {
      updateApplicationStage(offer.applicationId, 'hired');
      // notification
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: currentUser.id,
        title: 'Offer Successfully Executed!',
        description: `You have officially accepted the offer for ${offer.jobTitle} at ${offer.companyName}! Welcome to the team! Check your onboarding checklist.`,
        type: 'offer',
        read: false,
        linkTab: 'ats',
        createdAt: 'Just now'
      };
      setNotifications(p => [notif, ...p]);
    }
  };

  const createOfferLetter = (offerData: Omit<OfferLetter, 'id' | 'status'>) => {
    const newOffer: OfferLetter = {
      ...offerData,
      id: `off-${Date.now()}`,
      status: 'sent'
    };
    setOfferLetters(prev => [newOffer, ...prev]);
    updateApplicationStage(offerData.applicationId, 'offer');
  };

  const toggleOnboardingTask = (taskId: string) => {
    setOnboardingTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const uploadOnboardingDoc = (taskId: string, fileName: string) => {
    setOnboardingTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true, uploadedFileName: fileName } : t));
  };

  const submitAssessment = (score: number, passed: boolean) => {
    // update current user's application
    setApplications(prev => prev.map(a => {
      if (a.jobId === assessment.jobId && a.applicantId === currentUser.id) {
        return {
          ...a,
          assessmentScore: score,
          assessmentPassed: passed,
          stage: passed ? 'interview' : a.stage
        };
      }
      return a;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: `Assessment Completed: ${score}% Score`,
      description: passed ? 'Congratulations! You passed the technical assessment and advanced to the interview stage.' : 'Assessment recorded. Recruiter will review your submission shortly.',
      type: 'application',
      read: false,
      linkTab: 'ats',
      createdAt: 'Just now'
    };
    setNotifications(p => [notif, ...p]);
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text,
          lastMessageTime: 'Just now'
        };
      }
      return c;
    }));

    // Simulate smart auto-reply after 1.5s if talking to recruiter or insider
    setTimeout(() => {
      const conv = conversations.find(c => c.id === conversationId);
      if (!conv) return;
      const otherId = conv.participantIds.find(id => id !== currentUser.id);
      if (!otherId) return;

      const replyName = conv.participantNames[otherId] || 'Partner';
      const replyAvatar = conv.participantAvatars[otherId] || '';

      const autoReplies = [
        "Thanks for following up! I'm reviewing the details right now and will get back to you shortly.",
        "Great point! Let's make sure we address this in our next discussion.",
        "Received loud and clear! I've noted this on your profile.",
        "Appreciate the prompt update! Everything looks on track."
      ];
      const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

      const autoMsg: ChatMessage = {
        id: `m-reply-${Date.now()}`,
        conversationId,
        senderId: otherId,
        senderName: replyName,
        senderAvatar: replyAvatar,
        text: randomReply,
        timestamp: 'Just now'
      };

      setMessages(p => ({
        ...p,
        [conversationId]: [...(p[conversationId] || []), autoMsg]
      }));

      setConversations(p => p.map(c => c.id === conversationId ? {
        ...c,
        lastMessage: randomReply,
        lastMessageTime: 'Just now',
        unreadCount: { ...c.unreadCount, [currentUser.id]: (c.unreadCount[currentUser.id] || 0) + 1 }
      } : c));
    }, 1400);
  };

  const startOrOpenConversation = (participantId: string, participantName: string, participantAvatar: string, participantRole: string) => {
    // Check if conversation already exists
    const existing = conversations.find(c => c.participantIds.includes(currentUser.id) && c.participantIds.includes(participantId));
    if (existing) {
      setActiveConversationId(existing.id);
      setActiveTab('messages');
      return;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      participantIds: [currentUser.id, participantId],
      participantNames: {
        [currentUser.id]: currentUser.name,
        [participantId]: participantName
      },
      participantAvatars: {
        [currentUser.id]: currentUser.avatar,
        [participantId]: participantAvatar
      },
      participantRoles: {
        [currentUser.id]: currentUser.headline,
        [participantId]: participantRole
      },
      lastMessage: 'Conversation started',
      lastMessageTime: 'Just now',
      unreadCount: { [currentUser.id]: 0, [participantId]: 0 }
    };

    setConversations(prev => [newConv, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newConvId]: [
        {
          id: `m-init-${Date.now()}`,
          conversationId: newConvId,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderAvatar: currentUser.avatar,
          text: `Hi ${participantName}, I'm reaching out through SkillBridge NG!`,
          timestamp: 'Just now'
        }
      ]
    }));
    setActiveConversationId(newConvId);
    setActiveTab('messages');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    if (currentRole === 'applicant') {
      setApplicantUser(prev => {
        const next = { ...prev, ...updated };
        // recalculate score
        let score = 50;
        if (next.skills.length >= 5) score += 15;
        if (next.experiences.length >= 2) score += 15;
        if (next.educations.length >= 1) score += 10;
        if (next.cvFileName) score += 5;
        if (next.hasVideoIntro) score += 5;
        next.profileCompletionScore = Math.min(100, score);
        return next;
      });
    } else if (currentRole === 'employer') {
      setEmployerUser(prev => ({ ...prev, ...updated }));
    } else if (currentRole === 'insider') {
      setInsiderUser(prev => ({ ...prev, ...updated }));
    }
  };

  const endorseSkill = (skillId: string) => {
    setApplicantUser(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === skillId ? { ...s, endorsements: s.endorsements + 1 } : s)
    }));
  };

  const simulateCvParse = (fileName: string) => {
    // Realistic parsing auto-fill simulation
    setApplicantUser(prev => ({
      ...prev,
      cvFileName: fileName,
      cvParsedAt: new Date().toISOString().split('T')[0],
      profileCompletionScore: Math.min(100, prev.profileCompletionScore + 8),
      skills: [
        ...prev.skills,
        { id: `sk-parse-${Date.now()}-1`, name: 'Cloud Architecture', endorsements: 4 },
        { id: `sk-parse-${Date.now()}-2`, name: 'REST & GraphQL APIs', endorsements: 6 }
      ]
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Resume Auto-Parsed Successfully',
      description: `Extracted skills and experience from ${fileName}. Profile score boosted to 96%!`,
      type: 'system',
      read: false,
      linkTab: 'profile',
      createdAt: 'Just now'
    };
    setNotifications(p => [notif, ...p]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        activeTab,
        setActiveTab,

        jobs,
        savedJobIds,
        toggleSaveJob,
        addJob,
        selectedJobId,
        setSelectedJobId,

        companies,
        selectedCompanyId,
        setSelectedCompanyId,
        followedCompanyIds,
        toggleFollowCompany,
        addCompanyReview,
        addCompanyQAQuestion,
        addCompanyQAAnswer,

        applications,
        applyToJob,
        updateApplicationStage,
        rateApplication,
        addApplicationNote,

        connectors,
        coffeeChatRequests,
        requestCoffeeChat,
        updateCoffeeChatStatus,

        events,
        rsvpEvent,

        interviews,
        scheduleInterview,
        updateInterviewStatus,
        activeVideoCallId,
        setActiveVideoCallId,

        offerLetters,
        signOfferLetter,
        createOfferLetter,
        onboardingTasks,
        toggleOnboardingTask,
        uploadOnboardingDoc,

        assessment,
        submitAssessment,

        conversations,
        messages,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        startOrOpenConversation,

        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationsCount,

        updateUserProfile,
        endorseSkill,
        simulateCvParse
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
