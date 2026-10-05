export type CampusCategory =
  | 'Placement'
  | 'Education'
  | 'Campus Life'
  | 'Transport'
  | 'Food'
  | 'Healthcare'
  | 'Productivity'
  | 'Events'
  | 'Administration'
  | 'Finance'
  | 'Security'
  | 'Other';

export interface ProblemSubmission {
  id: string;
  problemStatement: string;
  category: CampusCategory;
  campusName?: string;
  affectedUsers?: string;
  severity?: 'Low' | 'Medium' | 'High' | 'Critical';
  submittedAt: string;
  studentId?: string;
  isSimulated?: boolean;
}

export interface BuildabilityDimension {
  name: string;
  weight: number; // e.g. 0.15
  score: number;  // 0 - 100
  rationale: string;
}

export interface BuildabilityScore {
  totalScore: number; // 0 - 100
  dimensions: {
    problemClarity: BuildabilityDimension;
    aiSuitability: BuildabilityDimension;
    dataSimplicity: BuildabilityDimension;
    technicalComplexity: BuildabilityDimension;
    prototypeFeasibility: BuildabilityDimension;
    studentRelevance: BuildabilityDimension;
  };
  explanation: string;
  badgeLevel: 'Highly Feasible' | 'Good Feasibility' | 'Moderate Feasibility' | 'Ambitious';
}

export interface AIAnalysis {
  id: string;
  problemStatement: string;
  domain: string;
  affectedUsers: string;
  painPoint: string;
  possibleInputs: string[];
  possibleOutputs: string[];
  aiOpportunity: string;
  aiCapabilities: string[];
  dataRequirements: string[];
  projectPotential: string;
  risks: string[];
  createdAt: string;
}

export interface SixtyMinuteScopeStep {
  stepNumber: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  outputArtifact: string;
}

export interface ProjectRecommendation {
  id: string;
  problemId: string;
  title: string;
  tagline: string;
  description: string;
  problemSummary: string;
  targetUser: string;
  aiCapability: string;
  inputSpecification: string;
  outputSpecification: string;
  architectureDescription: string;
  architectureDiagram?: string;
  technologyStack: {
    frontend: string[];
    backend: string[];
    aiModelOrLibrary: string[];
    data: string[];
  };
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Advanced';
  sixtyMinuteScope: SixtyMinuteScopeStep[];
  futureExtensions: string[];
  requiredSkills: string[];
  buildabilityScore: BuildabilityScore;
  suggestedNextStep: string;
  risks?: string[];
  createdAt: string;
  isSimulated?: boolean;
}

export interface Student {
  id: string;
  name: string;
  email: string; // obfuscated in public views
  college: string;
  branch: string;
  isFinalYear: boolean;
  skills: string[];
  primaryProjectId?: string;
  registeredAt: string;
  workshopRoleId?: string;
  isSimulated?: boolean;
}

export interface Campus {
  id: string;
  name: string;
  shortCode: string;
  city: string;
  state: string;
  studentCountEstimate: number;
  problemCount: number;
  registrationCount: number;
  topCategory: CampusCategory;
  averageBuildability: number;
}

export interface TeamProfile {
  studentId: string;
  studentName: string;
  projectId: string;
  studentSkills: string[];
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  recommendedRoles: string[];
  collaborationReadinessScore: number;
}

export type EventType =
  | 'page_view'
  | 'problem_started'
  | 'problem_submitted'
  | 'analysis_generated'
  | 'project_generated'
  | 'project_viewed'
  | 'registration_started'
  | 'registration_completed'
  | 'project_shared'
  | 'team_interest'
  | 'campus_map_viewed'
  | 'challenge_generated'
  | 'experiment_exposed';

export interface AnalyticsEvent {
  id: string;
  eventName: EventType;
  timestamp: string;
  sessionId: string;
  studentId?: string;
  projectId?: string;
  campusId?: string;
  metadata?: Record<string, unknown>;
}

export interface Campaign {
  name: string;
  challengeTitle: string;
  targetRegistrations: number;
  budgetInr: number;
  durationDays: number;
  currentDay: number;
  startDate: string;
  endDate: string;
}

export interface ExperimentVariant {
  id: 'A' | 'B';
  name: string;
  headline: string;
  ctaText: string;
  description: string;
  impressions: number;
  problemStarts: number;
  problemsSubmitted: number;
  projectsGenerated: number;
  registrations: number;
  conversionRate: number; // percentage
}

export interface Experiment {
  id: string;
  title: string;
  hypothesis: string;
  primaryMetric: string;
  variants: {
    A: ExperimentVariant;
    B: ExperimentVariant;
  };
  sampleSize: number;
  status: 'active' | 'completed';
  confidenceNote: string;
}

export interface Challenge {
  id: string;
  title: string;
  category: CampusCategory;
  problemDescription: string;
  whyItMatters: string;
  whyAI: string;
  aggregatedCampusCount: number;
  sampleProblems: string[];
  sixtyMinuteScope: SixtyMinuteScopeStep[];
  requiredSkills: string[];
  expectedOutput: string;
  futureExtensions: string[];
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Advanced';
  createdAt: string;
  isSimulated?: boolean;
}

export interface GrowthInsight {
  id: string;
  observation: string;
  evidence: string;
  recommendation: string;
  rationale: string;
  confidence: 'High' | 'Medium' | 'Low';
  metricImpact: string;
  category: 'Funnel' | 'Acquisition' | 'Activation' | 'Sharing';
}

export interface CampusCluster {
  category: CampusCategory;
  problemCount: number;
  campusesInvolved: string[];
  recurringKeywords: string[];
  averageBuildability: number;
  keyPainPointSummary: string;
  sampleProblems: string[];
  challengeTitle: string;
}

export interface DailySimulationMetric {
  day: number;
  date: string;
  visitors: number;
  problemsStarted: number;
  problemsSubmitted: number;
  projectsGenerated: number;
  registrations: number;
  cumulativeRegistrations: number;
  shares: number;
  targetLine: number;
}

export interface SimulationScenario {
  id: 'conservative' | 'base' | 'high_engagement' | 'high_project_conv' | 'low_reg_conv' | 'campus_concentration';
  name: string;
  description: string;
  visitorScale: number;
  problemSubmitRate: number;
  projectGenerationRate: number;
  registrationRate: number;
  shareRate: number;
  finalProjectedRegistrations: number;
}
