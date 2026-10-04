export type UserRole = 'applicant' | 'employer' | 'insider' | 'admin';

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  graduationYear: string;
}

export interface SkillItem {
  id: string;
  name: string;
  endorsements: number;
  endorsedBy?: string[];
}

export interface UserPreferences {
  openToWork: boolean;
  preferredRole: string;
  workplaceType: 'remote' | 'hybrid' | 'on-site' | 'any';
  jobType: 'full-time' | 'contract' | 'internship' | 'any';
  preferredLocation: string;
  minSalaryExpectation: number;
  currency: 'NGN' | 'USD';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  headline: string;
  bio: string;
  location: string;
  phone?: string;
  companyId?: string; // For employer or insider
  companyName?: string;
  reputationPoints?: number;
  skills: SkillItem[];
  experiences: WorkExperience[];
  educations: Education[];
  portfolioLinks: { github?: string; linkedin?: string; twitter?: string; portfolio?: string };
  videoIntroUrl?: string;
  hasVideoIntro?: boolean;
  cvFileName?: string;
  cvParsedAt?: string;
  preferences: UserPreferences;
  profileCompletionScore: number;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  banner: string;
  tagline: string;
  about: string;
  mission: string;
  website: string;
  size: string;
  industry: string;
  foundedYear: number;
  locations: string[];
  techStack: string[];
  benefits: string[];
  culturePhotos: string[];
  verified: boolean;
  overallRating: number;
  workLifeRating: number;
  cultureRating: number;
  compensationRating: number;
  reviewsCount: number;
  followersCount: number;
  hrRecruiterId?: string;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  workplaceType: 'remote' | 'hybrid' | 'on-site';
  jobType: 'full-time' | 'contract' | 'internship';
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
  department: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: 'NGN' | 'USD';
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  applicantsCount: number;
  postedDate: string;
  status: 'active' | 'closed';
  featured?: boolean;
}

export type ApplicationStage = 'applied' | 'viewed' | 'shortlisted' | 'interview' | 'offer' | 'hired' | 'rejected';

export interface ApplicationNote {
  id: string;
  authorName: string;
  authorRole: string;
  text: string;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantAvatar: string;
  applicantHeadline: string;
  applicantSkills: string[];
  applicantLocation: string;
  appliedDate: string;
  updatedDate: string;
  stage: ApplicationStage;
  rating?: number; // 1-5
  assignedRecruiter?: string;
  coverNote?: string;
  cvFileName?: string;
  notes: ApplicationNote[];
  assessmentScore?: number;
  assessmentPassed?: boolean;
}

export interface EmployeeConnector {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  yearsAtCompany: number;
  bio: string;
  topics: string[];
  coffeeChatAvailable: boolean;
  totalChatsConducted: number;
  reputationPoints: number;
  rating: number;
  availableDays: string[];
}

export interface CoffeeChatRequest {
  id: string;
  insiderId: string;
  insiderName: string;
  insiderAvatar: string;
  insiderRole: string;
  companyName: string;
  applicantId: string;
  applicantName: string;
  applicantAvatar: string;
  applicantHeadline: string;
  message: string;
  targetRole: string;
  preferredDate: string;
  preferredTime: string;
  meetLink?: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
}

export interface CompanyReview {
  id: string;
  companyId: string;
  companyName: string;
  authorRole: string;
  authorLocation: string;
  isCurrentEmployee: boolean;
  employmentDuration: string;
  rating: number;
  workLifeRating: number;
  cultureRating: number;
  compensationRating: number;
  reviewTitle: string;
  pros: string;
  cons: string;
  adviceToManagement?: string;
  interviewDifficulty: 'Easy' | 'Medium' | 'Hard';
  helpfulVotes: number;
  createdAt: string;
}

export interface QAAnswer {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  isVerifiedEmployee: boolean;
  isAnonymous: boolean;
  text: string;
  createdAt: string;
  upvotes: number;
}

export interface CompanyQA {
  id: string;
  companyId: string;
  question: string;
  askedBy: string;
  askedByRole?: string;
  isAnonymous: boolean;
  createdAt: string;
  upvotes: number;
  answers: QAAnswer[];
}

export interface NetworkingEvent {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  description: string;
  eventType: 'career_fair' | 'ama' | 'webinar' | 'tech_talk';
  date: string;
  time: string;
  speakerName: string;
  speakerRole: string;
  speakerAvatar: string;
  rsvpsCount: number;
  rsvpUserIds: string[];
  isLive: boolean;
  meetLink: string;
}

export interface InterviewSchedule {
  id: string;
  applicationId: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantAvatar: string;
  date: string;
  time: string;
  durationMinutes: number;
  roundType: 'HR Screening' | 'Technical Round' | 'System Architecture' | 'Culture Fit' | 'Final Executive';
  interviewerName: string;
  interviewerRole: string;
  meetLink: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  scoreCard?: {
    technical: number;
    communication: number;
    cultural: number;
    feedback: string;
  };
}

export interface OfferLetter {
  id: string;
  applicationId: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  applicantId: string;
  applicantName: string;
  baseSalary: number;
  currency: 'NGN' | 'USD';
  signingBonus?: number;
  stockOptions?: string;
  startDate: string;
  reportingManager: string;
  location: string;
  benefitsSummary: string[];
  expiryDate: string;
  letterContent: string;
  status: 'sent' | 'accepted' | 'declined';
  signedAt?: string;
  signatureDataUrl?: string;
}

export interface OnboardingTask {
  id: string;
  applicationId: string;
  title: string;
  category: 'documents' | 'it_setup' | 'culture' | 'team_intro';
  description: string;
  dueDate: string;
  completed: boolean;
  requiredFile?: boolean;
  uploadedFileName?: string;
}

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface Assessment {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  durationMinutes: number;
  passingScore: number;
  questions: AssessmentQuestion[];
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participantNames: Record<string, string>;
  participantAvatars: Record<string, string>;
  participantRoles: Record<string, string>;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: Record<string, number>;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'application' | 'interview' | 'coffee_chat' | 'offer' | 'message' | 'system';
  read: boolean;
  linkTab?: string;
  createdAt: string;
}
