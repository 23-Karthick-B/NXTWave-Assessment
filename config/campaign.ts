import { Campaign } from '@/types';

export const CAMPAIGN_CONFIG: Campaign = {
  name: 'AI PROJECT FORGE',
  challengeTitle: 'THE 60-MINUTE AI CAMPUS CHALLENGE',
  targetRegistrations: 500,
  budgetInr: 2000,
  durationDays: 7,
  currentDay: 5,
  startDate: '2026-10-01',
  endDate: '2026-10-07',
};

export const WORKSHOP_DETAILS = {
  title: 'Build Your First AI Project in 60 Minutes',
  format: 'Live Hands-On Virtual Masterclass & Hackathon',
  durationMinutes: 60,
  fee: 'Free (Sponsored by Campus AI Initiative)',
  perks: [
    'Deploy a working AI prototype before the workshop ends',
    'Verified AI Builder Campus Credential',
    'Full source code template repository',
    'Direct peer matching for final year capstone teams',
  ],
  outcomes: [
    'Zero-to-one AI implementation without complex infrastructure',
    'Practical prompt engineering & fine-tuned API integration',
    'Lightweight browser-ready or local Python deployment',
    'Portfolio-ready GitHub repository with documentation',
  ],
};

export const SKILL_OPTIONS = [
  'Python',
  'JavaScript / TypeScript',
  'React / Next.js',
  'Backend (Node/FastAPI)',
  'AI / ML Fundamentals',
  'Prompt Engineering',
  'Data Analysis & Pandas',
  'UI / UX Design',
  'Cloud / DevOps Basics',
  'Testing & QA',
  'Product Management',
  'Database Design',
] as const;

export const CAMPUS_CATEGORIES = [
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
] as const;

export const ENGINEERING_BRANCHES = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Artificial Intelligence & Data Science (AI/DS)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering (MECH)',
  'Civil Engineering (CIVIL)',
  'Biotechnology / Biomedical',
  'Other Engineering Discipline',
] as const;
