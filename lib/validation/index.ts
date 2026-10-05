import { z } from 'zod';

export const ProblemSubmissionSchema = z.object({
  problemStatement: z
    .string()
    .min(10, { message: 'Please describe the problem in at least 10 characters.' })
    .max(1000, { message: 'Problem description must be under 1000 characters.' }),
  category: z.enum([
    'Placement',
    'Education',
    'Campus Life',
    'Transport',
    'Food',
    'Healthcare',
    'Productivity',
    'Events',
    'Administration',
    'Finance',
    'Security',
    'Other',
  ]),
  campusName: z.string().optional().default(''),
  affectedUsers: z.string().optional().default('Engineering Students'),
  severity: z.enum(['Low', 'Medium', 'High', 'Critical']).optional().default('High'),
});

export const StudentRegistrationSchema = z.object({
  name: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid college email address.' }),
  college: z.string().min(3, { message: 'Please specify your college or university name.' }),
  branch: z.string().min(2, { message: 'Please select or enter your engineering branch.' }),
  isFinalYear: z.boolean().refine((val) => val === true, {
    message: 'This campaign is targeted for final-year / pre-final engineering students.',
  }),
  skills: z.array(z.string()).default([]),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Consent is required to generate your workshop invitation credential.',
  }),
});

export const AIAnalysisSchema = z.object({
  id: z.string(),
  problemStatement: z.string(),
  domain: z.string(),
  affectedUsers: z.string(),
  painPoint: z.string(),
  possibleInputs: z.array(z.string()),
  possibleOutputs: z.array(z.string()),
  aiOpportunity: z.string(),
  aiCapabilities: z.array(z.string()),
  dataRequirements: z.array(z.string()),
  projectPotential: z.string(),
  risks: z.array(z.string()),
  createdAt: z.string(),
});

export const ProjectRecommendationSchema = z.object({
  id: z.string(),
  problemId: z.string(),
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  problemSummary: z.string(),
  targetUser: z.string(),
  aiCapability: z.string(),
  inputSpecification: z.string(),
  outputSpecification: z.string(),
  architectureDescription: z.string(),
  technologyStack: z.object({
    frontend: z.array(z.string()),
    backend: z.array(z.string()),
    aiModelOrLibrary: z.array(z.string()),
    data: z.array(z.string()),
  }),
  difficulty: z.enum(['Beginner Friendly', 'Intermediate', 'Advanced']),
  sixtyMinuteScope: z.array(
    z.object({
      stepNumber: z.number(),
      title: z.string(),
      description: z.string(),
      estimatedMinutes: z.number(),
      outputArtifact: z.string(),
    })
  ),
  futureExtensions: z.array(z.string()),
  requiredSkills: z.array(z.string()),
  buildabilityScore: z.object({
    totalScore: z.number().min(0).max(100),
    dimensions: z.record(
      z.string(),
      z.object({
        name: z.string(),
        weight: z.number(),
        score: z.number(),
        rationale: z.string(),
      })
    ),
    explanation: z.string(),
    badgeLevel: z.enum(['Highly Feasible', 'Good Feasibility', 'Moderate Feasibility', 'Ambitious']),
  }),
  suggestedNextStep: z.string(),
  createdAt: z.string(),
});

export type ProblemSubmissionInput = z.infer<typeof ProblemSubmissionSchema>;
export type StudentRegistrationInput = z.infer<typeof StudentRegistrationSchema>;
