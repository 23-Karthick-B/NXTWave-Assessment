import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  AIAnalysis,
  AnalyticsEvent,
  Campus,
  CampusCluster,
  Challenge,
  DailySimulationMetric,
  Experiment,
  GrowthInsight,
  ProblemSubmission,
  ProjectRecommendation,
  SimulationScenario,
  Student,
  TeamProfile,
} from '@/types';
import { CAMPAIGN_CONFIG } from '@/config/campaign';
import {
  SEED_CAMPUSES,
  SEED_CAMPUS_CLUSTERS,
  SEED_DAILY_SIMULATION,
  generateSyntheticSeedDataset,
} from '@/data/seedData';
import { INITIAL_CTA_EXPERIMENT } from '@/lib/growth/abTesting';
import { interpretGrowthMetrics } from '@/lib/ai/growthInterpreter';
import { computeFunnelMetrics, FunnelMetricsReport } from '@/lib/growth/funnel';
import { generateCampusChallenge } from '@/lib/ai/challengeGenerator';
import { trackEvent } from '@/lib/analytics/eventTracker';

interface AppStoreState {
  // Mode flag
  isDemoMode: boolean;
  setDemoMode: (isDemo: boolean) => void;

  // Current session working state
  currentProblem: ProblemSubmission | null;
  currentAnalysis: AIAnalysis | null;
  currentProject: ProjectRecommendation | null;
  currentStudent: Student | null;

  // Collections (Real user data + simulated when demo mode is active)
  problems: ProblemSubmission[];
  projects: ProjectRecommendation[];
  students: Student[];
  campuses: Campus[];
  clusters: CampusCluster[];
  challenges: Challenge[];
  events: AnalyticsEvent[];

  // Experiment State
  experiment: Experiment;

  // Simulation State
  selectedScenarioId: SimulationScenario['id'];
  selectedTargetScale: number;
  dailySimulationMetrics: DailySimulationMetric[];

  // Actions
  submitProblem: (problem: Omit<ProblemSubmission, 'id' | 'submittedAt'>) => ProblemSubmission;
  setAIAnalysis: (analysis: AIAnalysis) => void;
  setProjectRecommendation: (project: ProjectRecommendation) => void;
  registerStudent: (studentData: Omit<Student, 'id' | 'registeredAt'>) => Student;
  updateStudentSkills: (skills: string[]) => void;
  recordShare: (projectId: string, channel: string) => void;
  recordTeamInterest: (role: string) => void;
  recordExperimentExposure: (variant: 'A' | 'B') => void;
  loadDemoDataset: () => void;
  resetToInteractive: () => void;
  setSimulationParameters: (scenarioId: SimulationScenario['id'], targetScale: number) => void;

  // Computed Selectors
  getFunnelReport: () => FunnelMetricsReport;
  getGrowthInsights: () => GrowthInsight[];
  getTeamProfile: () => TeamProfile | null;
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      isDemoMode: false,
      setDemoMode: (isDemo) => set({ isDemoMode: isDemo }),

      currentProblem: null,
      currentAnalysis: null,
      currentProject: null,
      currentStudent: null,

      problems: [],
      projects: [],
      students: [],
      campuses: SEED_CAMPUSES,
      clusters: SEED_CAMPUS_CLUSTERS,
      challenges: SEED_CAMPUS_CLUSTERS.map((cl) => generateCampusChallenge(cl, true)),
      events: [],

      experiment: INITIAL_CTA_EXPERIMENT,

      selectedScenarioId: 'base',
      selectedTargetScale: 500,
      dailySimulationMetrics: SEED_DAILY_SIMULATION,

      submitProblem: (problemData) => {
        const id = `prob-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const newProblem: ProblemSubmission = {
          ...problemData,
          id,
          submittedAt: new Date().toISOString(),
          isSimulated: false,
        };

        trackEvent('problem_submitted', {
          metadata: {
            category: newProblem.category,
            statementLength: newProblem.problemStatement.length,
          },
        });

        set((state) => ({
          currentProblem: newProblem,
          problems: [newProblem, ...state.problems],
        }));

        return newProblem;
      },

      setAIAnalysis: (analysis) => {
        trackEvent('analysis_generated', { metadata: { domain: analysis.domain } });
        set({ currentAnalysis: analysis });
      },

      setProjectRecommendation: (project) => {
        trackEvent('project_generated', {
          projectId: project.id,
          metadata: {
            title: project.title,
            score: project.buildabilityScore.totalScore,
          },
        });

        set((state) => ({
          currentProject: project,
          projects: [project, ...state.projects.filter((p) => p.id !== project.id)],
        }));
      },

      registerStudent: (studentData) => {
        const id = `stud-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const state = get();
        const newStudent: Student = {
          ...studentData,
          id,
          primaryProjectId: state.currentProject?.id,
          registeredAt: new Date().toISOString(),
          isSimulated: false,
        };

        trackEvent('registration_completed', {
          studentId: id,
          projectId: state.currentProject?.id,
          metadata: { college: newStudent.college, branch: newStudent.branch },
        });

        // Also update campus count if matching
        const updatedCampuses = state.campuses.map((c) =>
          c.name.toLowerCase().includes(newStudent.college.toLowerCase())
            ? { ...c, registrationCount: c.registrationCount + 1 }
            : c
        );

        set({
          currentStudent: newStudent,
          students: [newStudent, ...state.students],
          campuses: updatedCampuses,
        });

        return newStudent;
      },

      updateStudentSkills: (skills) => {
        set((state) => {
          if (!state.currentStudent) return state;
          const updated = { ...state.currentStudent, skills };
          return {
            currentStudent: updated,
            students: state.students.map((s) => (s.id === updated.id ? updated : s)),
          };
        });
      },

      recordShare: (projectId, channel) => {
        trackEvent('project_shared', { projectId, metadata: { channel } });
      },

      recordTeamInterest: (role) => {
        trackEvent('team_interest', { metadata: { role } });
      },

      recordExperimentExposure: (variant) => {
        set((state) => {
          const exp = { ...state.experiment };
          const varObj = exp.variants[variant];
          varObj.impressions += 1;
          exp.sampleSize += 1;
          return { experiment: exp };
        });
        trackEvent('experiment_exposed', { metadata: { variant } });
      },

      loadDemoDataset: () => {
        const synthetic = generateSyntheticSeedDataset();
        set({
          isDemoMode: true,
          problems: synthetic.problems,
          projects: synthetic.projects,
          students: synthetic.students,
          campuses: SEED_CAMPUSES,
          dailySimulationMetrics: SEED_DAILY_SIMULATION,
          currentProject: synthetic.projects[0],
          currentProblem: synthetic.problems[0],
          currentStudent: synthetic.students[0],
        });
      },

      resetToInteractive: () => {
        set({
          isDemoMode: false,
          currentProblem: null,
          currentAnalysis: null,
          currentProject: null,
          currentStudent: null,
          problems: [],
          projects: [],
          students: [],
        });
      },

      setSimulationParameters: (scenarioId, targetScale) => {
        set({ selectedScenarioId: scenarioId, selectedTargetScale: targetScale });
      },

      getFunnelReport: () => {
        const s = get();
        return computeFunnelMetrics(s.events, s.problems, s.projects, s.students);
      },

      getGrowthInsights: () => {
        const s = get();
        const funnel = computeFunnelMetrics(s.events, s.problems, s.projects, s.students);
        return interpretGrowthMetrics({
          visitors: funnel.kpis.totalVisitors,
          problemsStarted: funnel.stages.find((st) => st.stage === 'problem_started')?.count || 0,
          problemsSubmitted: funnel.kpis.problemsSubmitted,
          projectsGenerated: funnel.kpis.projectsGenerated,
          projectsViewed: funnel.kpis.projectsGenerated,
          registrationsStarted: funnel.stages.find((st) => st.stage === 'registration_started')?.count || 0,
          registrationsCompleted: funnel.kpis.registrationsCompleted,
          projectsShared: funnel.kpis.projectsShared,
          teamInteractions: funnel.kpis.teamInterestCount,
          activeCampusesCount: s.campuses.length,
          averageBuildability: funnel.kpis.averageBuildability,
        });
      },

      getTeamProfile: () => {
        const s = get();
        const student = s.currentStudent;
        const project = s.currentProject;
        if (!student && !project) return null;

        const studentSkills = student?.skills || ['Python', 'React / Next.js'];
        const requiredSkills = project?.requiredSkills || [
          'Python',
          'AI / ML Fundamentals',
          'React / Next.js',
          'Data Analysis & Pandas',
        ];

        const matched = requiredSkills.filter((req) =>
          studentSkills.some((sk) => sk.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(sk.toLowerCase()))
        );

        const missing = requiredSkills.filter((req) => !matched.includes(req));

        const recommendedRoles: string[] = [];
        if (studentSkills.some((s) => s.toLowerCase().includes('python') || s.toLowerCase().includes('ai'))) {
          recommendedRoles.push('AI Core & Algorithm Engineer');
        }
        if (studentSkills.some((s) => s.toLowerCase().includes('react') || s.toLowerCase().includes('ux') || s.toLowerCase().includes('script'))) {
          recommendedRoles.push('Frontend & UX Architect');
        }
        if (studentSkills.some((s) => s.toLowerCase().includes('node') || s.toLowerCase().includes('fastapi') || s.toLowerCase().includes('backend'))) {
          recommendedRoles.push('API & Micro-Service Engineer');
        }
        if (recommendedRoles.length === 0) {
          recommendedRoles.push('AI Product Analyst & Prompt Specialist');
        }

        const readinessScore = Math.min(
          100,
          Math.max(40, Math.round((matched.length / (requiredSkills.length || 1)) * 100 + 20))
        );

        return {
          studentId: student?.id || 'guest',
          studentName: student?.name || 'Fellow Builder',
          projectId: project?.id || 'demo-project',
          studentSkills,
          requiredSkills,
          matchedSkills: matched,
          missingSkills: missing,
          recommendedRoles,
          collaborationReadinessScore: readinessScore,
        };
      },
    }),
    {
      name: 'ai-project-forge:v1',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return window.localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        isDemoMode: state.isDemoMode,
        currentProblem: state.currentProblem,
        currentAnalysis: state.currentAnalysis,
        currentProject: state.currentProject,
        currentStudent: state.currentStudent,
        problems: state.problems,
        projects: state.projects,
        students: state.students,
        experiment: state.experiment,
        selectedScenarioId: state.selectedScenarioId,
        selectedTargetScale: state.selectedTargetScale,
      }),
    }
  )
);
