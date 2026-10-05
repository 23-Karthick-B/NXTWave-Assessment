import { AIAnalysis, CampusCategory, ProjectRecommendation, SixtyMinuteScopeStep } from '@/types';
import { calculateBuildabilityScore } from '../scoring/buildability';

interface FallbackCatalogItem {
  category: CampusCategory;
  keywords: string[];
  title: string;
  tagline: string;
  domain: string;
  painPoint: string;
  aiOpportunity: string;
  aiCapabilities: string[];
  dataRequirements: string[];
  inputSpecification: string;
  outputSpecification: string;
  architectureDescription: string;
  frontendStack: string[];
  backendStack: string[];
  aiStack: string[];
  dataStack: string[];
  requiredSkills: string[];
  sixtyMinuteScope: SixtyMinuteScopeStep[];
  futureExtensions: string[];
  risks: string[];
}

export const FALLBACK_CATALOG: FallbackCatalogItem[] = [
  {
    category: 'Food',
    keywords: ['cafeteria', 'canteen', 'food', 'mess', 'lunch', 'wait', 'queue', 'waste', 'meal'],
    title: 'AI Cafeteria Demand & Queue Predictor',
    tagline: 'Predict lunch rush congestion and meal demand to eliminate 30-minute campus lines',
    domain: 'Campus Logistics & Resource Allocation',
    painPoint: 'Erratic dining crowds result in 30+ minute waiting times and massive daily food preparation waste.',
    aiOpportunity: 'Use historical class schedules, day of week, weather, and order patterns to forecast hourly demand.',
    aiCapabilities: ['Time-series Demand Forecasting', 'Peak Rush Anomaly Detection', 'Menu Popularity Prediction'],
    dataRequirements: ['Timetable data', 'Sample 30-day canteen footfall CSV', 'Daily menu categories'],
    inputSpecification: 'Current time, day, department timetable release status, and weather indicator.',
    outputSpecification: 'Hourly footfall forecast, wait-time estimate (in mins), and recommended batch prep volume.',
    architectureDescription: 'Client Web UI ↔ Lightweight Python/FastAPI micro-endpoint ↔ Scikit-Learn Random Forest Regressor ↔ In-memory cache.',
    frontendStack: ['Next.js', 'Tailwind CSS', 'Recharts'],
    backendStack: ['FastAPI (Python)', 'Uvicorn'],
    aiStack: ['Scikit-Learn', 'Pandas', 'NumPy'],
    dataStack: ['Synthetic CSV Timetable & Order Log'],
    requiredSkills: ['Python', 'Data Analysis & Pandas', 'AI / ML Fundamentals', 'React / Next.js'],
    sixtyMinuteScope: [
      { stepNumber: 1, title: 'Data Prep & Schema Setup', description: 'Generate a 500-row synthetic campus footfall dataset with time, day, exam week, and queue length.', estimatedMinutes: 12, outputArtifact: 'data/canteen_footfall.csv' },
      { stepNumber: 2, title: 'Model Training & Regression', description: 'Train a scikit-learn Ridge or Random Forest Regressor to predict wait minutes with >85% R² score.', estimatedMinutes: 18, outputArtifact: 'model/predictor.py' },
      { stepNumber: 3, title: 'API Micro-Service Endpoint', description: 'Expose a POST /predict-rush endpoint returning expected wait time and confidence bounds.', estimatedMinutes: 12, outputArtifact: 'api/main.py' },
      { stepNumber: 4, title: 'Interactive Rush Visualizer', description: 'Connect Next.js frontend with live slider controls and bar graph of hourly queue forecast.', estimatedMinutes: 18, outputArtifact: 'components/RushGauge.tsx' },
    ],
    futureExtensions: ['CCTV-based privacy-preserving crowd density counting', 'Pre-order priority queuing with digital tokens', 'Automated kitchen supplier inventory re-orders'],
    risks: ['Sudden festival schedule shifts causing distribution drift', 'Cold start on new semester timetables'],
  },
  {
    category: 'Transport',
    keywords: ['bus', 'transport', 'shuttle', 'route', 'commute', 'driver', 'late', 'traffic', 'timing'],
    title: 'Smart Campus Shuttle ETA & Seat Balancer',
    tagline: 'Real-time arrival estimation and passenger overflow forecast across campus transit routes',
    domain: 'Campus Transit & Mobility',
    painPoint: 'Students wait at bus stops with zero visibility into bus occupancy, missing lectures or packing overloaded shuttles.',
    aiOpportunity: 'Infer real-time transit delays using route stop historical intervals, class bell times, and traffic heuristics.',
    aiCapabilities: ['Transit Delay Regression', 'Capacity Overflow Early Warning', 'Dynamic Fleet Dispatch Recommendation'],
    dataRequirements: ['Route stop sequence', 'Historical transit trip durations', 'Student population shift timings'],
    inputSpecification: 'Stop ID, current time, target destination stop, active vehicle location estimate.',
    outputSpecification: 'Estimated arrival in minutes, occupancy status (Green/Amber/Full), alternative route recommendation.',
    architectureDescription: 'Next.js Mobile-First UI ↔ Serverless Next.js API Routes ↔ Heuristic ML Delay Matrix ↔ Local State.',
    frontendStack: ['React / Next.js', 'Tailwind CSS', 'Lucide Icons'],
    backendStack: ['Node.js API Routes', 'TypeScript'],
    aiStack: ['Regression Weights Heuristic', 'Vector Math / Haversine'],
    dataStack: ['Campus Route GeoJSON / JSON Mock'],
    requiredSkills: ['JavaScript / TypeScript', 'React / Next.js', 'AI / ML Fundamentals'],
    sixtyMinuteScope: [
      { stepNumber: 1, title: 'Route Interval Simulation', description: 'Define campus shuttle routes with 8 key stops and simulated delay variance patterns.', estimatedMinutes: 15, outputArtifact: 'data/bus_routes.json' },
      { stepNumber: 2, title: 'ETA & Capacity Calculation Engine', description: 'Implement dynamic ETA calculator factoring in student dismissal bells at 4:30 PM.', estimatedMinutes: 15, outputArtifact: 'lib/transitEngine.ts' },
      { stepNumber: 3, title: 'Route Overview Card & Live Countdown', description: 'Build interactive card component with animated pulse indicators and stop tracker.', estimatedMinutes: 15, outputArtifact: 'components/BusLiveTracker.tsx' },
      { stepNumber: 4, title: 'Overflow Warning Toast & Testing', description: 'Add threshold trigger alerting students when bus reaches 90% simulated capacity.', estimatedMinutes: 15, outputArtifact: 'tests/transit.test.ts' },
    ],
    futureExtensions: ['GPS OBD-II hardware tracking integration', 'Carpool matching algorithm for left-behind commuters', 'Carbon footprint reduction dashboard'],
    risks: ['Driver route deviation during monsoon detours', 'GPS signal blackout between campus perimeter trees'],
  },
  {
    category: 'Placement',
    keywords: ['placement', 'resume', 'interview', 'job', 'ats', 'internship', 'company', 'hiring', 'aptitude', 'dsa'],
    title: 'AI Resume Job-Fit & Mock Interview Assessor',
    tagline: 'Instant ATS gap analysis and role-specific technical question generator for campus placements',
    domain: 'Career & Talent Engineering',
    painPoint: 'Final-year students submit generic resumes with low ATS match rates and have no realistic technical interview practice.',
    aiOpportunity: 'Extract skills via NLP from student resumes, score semantic overlap with job descriptions, and generate tailored mock questions.',
    aiCapabilities: ['Semantic Skill Extraction', 'Resume-to-JD Match Scoring', 'Dynamic Interview Question Generation'],
    dataRequirements: ['Sample engineering job descriptions', 'Technical skill taxonomy taxonomy dictionary', 'Rubric criteria'],
    inputSpecification: 'Student resume text, target role (e.g. SDE-1, Data Analyst, Cloud Trainee), target company profile.',
    outputSpecification: 'Match percentage, missing critical keywords, 5 high-yield interview questions, suggested bullet edits.',
    architectureDescription: 'Next.js Interactive Portal ↔ Edge API Handler ↔ TF-IDF / Cosine Similarity & LLM Prompt Pipeline.',
    frontendStack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    backendStack: ['Next.js App Router API', 'Zod'],
    aiStack: ['NLP Cosine Similarity / Embeddings', 'Prompt Engineering Templates'],
    dataStack: ['Tech Skills Graph JSON', 'Role Rubric JSON'],
    requiredSkills: ['Prompt Engineering', 'JavaScript / TypeScript', 'React / Next.js', 'Product Management'],
    sixtyMinuteScope: [
      { stepNumber: 1, title: 'Skill Keyword Dictionary & Parser', description: 'Map 150+ technical competencies across CS, AI, Cloud, and Web into structured taxonomies.', estimatedMinutes: 12, outputArtifact: 'data/skillGraph.json' },
      { stepNumber: 2, title: 'Semantic Overlap & Scoring Heuristic', description: 'Build matching algorithm comparing candidate profile with Tier-1 engineering criteria.', estimatedMinutes: 16, outputArtifact: 'lib/placementScorer.ts' },
      { stepNumber: 3, title: 'Question Generator Prompt Flow', description: 'Assemble prompts producing personalized behavioral and coding conceptual prompts.', estimatedMinutes: 14, outputArtifact: 'lib/questionGenerator.ts' },
      { stepNumber: 4, title: 'Interactive Score Card & Action Plan', description: 'Create rich radar-chart style breakdown with actionable gap-closing recommendations.', estimatedMinutes: 18, outputArtifact: 'components/PlacementReport.tsx' },
    ],
    futureExtensions: ['Voice-based speech pace and filler-word detection during mock answers', 'Automated LinkedIn and GitHub project portfolio crawler', 'Placement cell bulk batch analytics portal'],
    risks: ['Over-optimizing for keywords while neglecting genuine conceptual depth', 'Proprietary company ATS criteria changes'],
  },
  {
    category: 'Education',
    keywords: ['elective', 'course', 'study', 'syllabus', 'notes', 'teacher', 'professor', 'gpa', 'exam', 'credit'],
    title: 'AI Elective Advisory & Curriculum Roadmap Forge',
    tagline: 'Personalized elective selection engine balancing career goals, difficulty ratings, and GPA preservation',
    domain: 'Academic Analytics & Student Advising',
    painPoint: 'Students blindly pick electives based on hearsay, leading to mismatched expectations, low grades, or missing graduation prerequisites.',
    aiOpportunity: 'Match student career ambition, past grades, and elective syllabi using knowledge graph reasoning.',
    aiCapabilities: ['Prerequisite Graph Analysis', 'Workload Feasibility Scoring', 'Personalized Learning Path Recommendation'],
    dataRequirements: ['Department elective syllabus JSON', 'Historical grade distribution stats', 'Career target pathways'],
    inputSpecification: 'Target career role, favorite subjects, target weekly study hours, risk tolerance (high grade vs high challenge).',
    outputSpecification: 'Top 3 ranked electives, compatibility match score, estimated weekly workload, semester study roadmap.',
    architectureDescription: 'Next.js App ↔ Graph Traversal Engine ↔ Deterministic Preference Matcher ↔ Recharts Roadmap.',
    frontendStack: ['Next.js', 'Tailwind CSS', 'Recharts'],
    backendStack: ['TypeScript Utility Layer'],
    aiStack: ['Multi-criteria Decision Analysis (MCDA)', 'Vector Preference Matcher'],
    dataStack: ['Elective Catalog JSON', 'Prerequisite Tree'],
    requiredSkills: ['TypeScript', 'UI / UX Design', 'AI / ML Fundamentals'],
    sixtyMinuteScope: [
      { stepNumber: 1, title: 'Elective Catalog & Prerequisite Map', description: 'Structure 12 department electives with difficulty weights and career tags.', estimatedMinutes: 12, outputArtifact: 'data/electives.json' },
      { stepNumber: 2, title: 'MCDA Scoring Engine', description: 'Implement utility function computing weighted recommendation rank from student inputs.', estimatedMinutes: 18, outputArtifact: 'lib/electiveAdvisor.ts' },
      { stepNumber: 3, title: 'Interactive Roadmap Builder', description: 'Render step-by-step semester sequence with milestone markers.', estimatedMinutes: 18, outputArtifact: 'components/RoadmapTimeline.tsx' },
      { stepNumber: 4, title: 'Workload Warning & Verification', description: 'Display cautionary alerts if student selects overlapping heavy lab courses.', estimatedMinutes: 12, outputArtifact: 'components/WorkloadAlert.tsx' },
    ],
    futureExtensions: ['Peer anonymous reviews with verified student sentiment analysis', 'Direct integration with college ERP registration portals', 'Auto-generated flashcards from chosen course syllabi'],
    risks: ['Outdated syllabus documentation from academic departments', 'Department seat quota limits overriding recommendations'],
  },
  {
    category: 'Campus Life',
    keywords: ['hostel', 'complaint', 'room', 'maintenance', 'water', 'wifi', 'electricity', 'roommate', 'warden', 'facility'],
    title: 'Hostel Issue Triager & SLA Auto-Escalator',
    tagline: 'Automated hostel ticket classification, urgency scoring, and maintenance dispatching using NLP',
    domain: 'Facility Management & Student Welfare',
    painPoint: 'Hostel maintenance requests sit in paper logbooks or messy WhatsApp groups for weeks without resolution tracking.',
    aiOpportunity: 'Categorize free-form text complaints into severity tiers, extract location metadata, and route to corresponding facility crew.',
    aiCapabilities: ['Zero-Shot Text Classification', 'Urgency Prioritization', 'Duplicate Issue Detection'],
    dataRequirements: ['Hostel complaint text examples', 'Facility crew category mapping', 'Standard SLA tier benchmarks'],
    inputSpecification: 'Hostel block, room number, description of issue, photo or symptom checklist.',
    outputSpecification: 'Auto-assigned category (Plumbing/Electrical/Network), priority rank (P1-P4), expected turnaround SLA, warden summary.',
    architectureDescription: 'Lightweight Mobile Web Form ↔ Rule & Embeddings Classifier ↔ SLA Escalation Engine ↔ Dashboard.',
    frontendStack: ['React / Next.js', 'Tailwind CSS'],
    backendStack: ['Next.js Server Actions / API'],
    aiStack: ['NLP Keyword & Urgency Classifier', 'Regex Entity Extractor'],
    dataStack: ['Hostel Maintenance Mock DB (JSON)'],
    requiredSkills: ['JavaScript / TypeScript', 'Backend (Node/FastAPI)', 'Product Management'],
    sixtyMinuteScope: [
      { stepNumber: 1, title: 'Complaint Corpus & Category Rules', description: 'Create 40 sample complaint cases spanning electrical, plumbing, sanitation, and WiFi.', estimatedMinutes: 12, outputArtifact: 'data/complaints.json' },
      { stepNumber: 2, title: 'Urgency & Entity Classification Engine', description: 'Parse severity indicators (e.g. "sparking", "flooding" = P1; "creaking door" = P4).', estimatedMinutes: 18, outputArtifact: 'lib/complaintClassifier.ts' },
      { stepNumber: 3, title: 'Student Submission & Tracking Card', description: 'Build responsive ticket creation UI with live SLA resolution timer.', estimatedMinutes: 18, outputArtifact: 'components/TicketTracker.tsx' },
      { stepNumber: 4, title: 'Warden Escalation View', description: 'Create a high-density triage board showing unresolved tickets grouped by urgency.', estimatedMinutes: 12, outputArtifact: 'components/WardenBoard.tsx' },
    ],
    futureExtensions: ['Computer vision analysis on leak or crack photos to confirm severity', 'Automated SMS alerts to local electricians and plumbers', 'Student satisfaction feedback and vendor performance rating'],
    risks: ['Vague descriptions like "not working" requiring follow-up clarification', 'Duplicate spam filings during campus-wide outages'],
  },
  {
    category: 'Productivity',
    keywords: ['attendance', 'bunk', 'study', 'time', 'exam', 'schedule', 'focus', 'deadline', 'assignment', 'calendar'],
    title: 'Smart Attendance Risk Predictor & Safe Bunk Planner',
    tagline: 'Calculate safe margin leaves, exam eligibility thresholds, and recovery study schedules with AI precision',
    domain: 'Student Academic Productivity',
    painPoint: 'Students miscalculate the 75% mandatory attendance rule and receive sudden debarment notices right before final exams.',
    aiOpportunity: 'Forecast future attendance percentages under varying absence scenarios and schedule recovery sessions.',
    aiCapabilities: ['Constraint-Satisfaction Forecasting', 'Debarment Risk Classifier', 'Recovery Study Planner'],
    dataRequirements: ['Course calendar & timetable', 'Current attended vs total class count', 'Medical leave allowance rules'],
    inputSpecification: 'Subject list with current attended/total classes, target minimum percentage (typically 75% or 80%).',
    outputSpecification: 'Current %, maximum safe bunks remaining, required consecutive attendances to recover, debarment danger level.',
    architectureDescription: 'Interactive Client Web App ↔ State Calculator ↔ Forecast Simulation Engine ↔ Visual Gauge.',
    frontendStack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    backendStack: ['TypeScript Logic Module'],
    aiStack: ['Statistical Projection Engine', 'Monte Carlo Attendance Sim'],
    dataStack: ['In-Memory State & LocalStorage'],
    requiredSkills: ['JavaScript / TypeScript', 'React / Next.js', 'UI / UX Design'],
    sixtyMinuteScope: [
      { stepNumber: 1, title: 'Attendance Mathematics & Boundary Engine', description: 'Implement core formulas for safe skips and required catch-up streaks.', estimatedMinutes: 15, outputArtifact: 'lib/attendanceMath.ts' },
      { stepNumber: 2, title: 'Interactive Subject Roster Component', description: 'Create cards with quick +1/-1 class counters and instant percentage recalculations.', estimatedMinutes: 15, outputArtifact: 'components/SubjectRoster.tsx' },
      { stepNumber: 3, title: 'Risk Badge & Projection Slider', description: 'Add what-if interactive slider allowing student to project their attendance through semester end.', estimatedMinutes: 15, outputArtifact: 'components/WhatIfSlider.tsx' },
      { stepNumber: 4, title: 'Exportable Timetable Alarm Generator', description: 'Render calendar reminder triggers for critical attendance recovery lectures.', estimatedMinutes: 15, outputArtifact: 'components/RecoveryPlan.tsx' },
    ],
    futureExtensions: ['Automatic OCR sync with university student portal screenshots', 'Peer lecture notes sharing when illness occurs', 'Personalized sleep and commute correlation tracker'],
    risks: ['College sudden cancellation of lectures skewing denominator count', 'Strict individual professor unrecorded attendance quirks'],
  },
];

export function generateDeterministicAIAnalysis(
  problemStatement: string,
  category: CampusCategory,
  affectedUsers = 'Engineering Students'
): AIAnalysis {
  const lower = problemStatement.toLowerCase();
  const matchedItem =
    FALLBACK_CATALOG.find((item) => item.category === category) ||
    FALLBACK_CATALOG.find((item) => item.keywords.some((k) => lower.includes(k))) ||
    FALLBACK_CATALOG[0];

  const id = `analysis-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  return {
    id,
    problemStatement: problemStatement.trim(),
    domain: matchedItem.domain,
    affectedUsers: affectedUsers || 'Final-year and undergraduate engineering students',
    painPoint: matchedItem.painPoint,
    possibleInputs: [
      'Raw student input / sensor logs / schedule data',
      'Timetable and academic semester calendar metadata',
      'User preference, constraint thresholds, and urgency signals',
    ],
    possibleOutputs: [
      'Actionable prediction metric / structured recommendation',
      'Real-time confidence score and risk warning flag',
      'Interactive visual dashboard and workflow trigger',
    ],
    aiOpportunity: matchedItem.aiOpportunity,
    aiCapabilities: matchedItem.aiCapabilities,
    dataRequirements: matchedItem.dataRequirements,
    projectPotential: `High campus impact potential with clear zero-to-one prototype capability. Solves a persistent friction point recognized by students and faculty alike.`,
    risks: matchedItem.risks,
    createdAt: new Date().toISOString(),
  };
}

export function generateDeterministicProject(
  problemStatement: string,
  category: CampusCategory,
  affectedUsers = 'Engineering Students',
  problemId = `prob-${Date.now()}`
): ProjectRecommendation {
  const lower = problemStatement.toLowerCase();
  const matchedItem =
    FALLBACK_CATALOG.find((item) => item.category === category) ||
    FALLBACK_CATALOG.find((item) => item.keywords.some((k) => lower.includes(k))) ||
    FALLBACK_CATALOG[0];

  const buildability = calculateBuildabilityScore({
    problemStatement,
    category,
    affectedUsers,
  });

  const id = `project-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  return {
    id,
    problemId,
    title: matchedItem.title,
    tagline: matchedItem.tagline,
    description: `A scoped AI-driven application designed to tackle: "${problemStatement}". By leveraging ${matchedItem.aiCapabilities[0]}, it turns previously manual or unpredictable college friction into an automated, transparent solution.`,
    problemSummary: matchedItem.painPoint,
    targetUser: affectedUsers || 'Campus Students & Administrative Stakeholders',
    aiCapability: matchedItem.aiCapabilities.join(', '),
    inputSpecification: matchedItem.inputSpecification,
    outputSpecification: matchedItem.outputSpecification,
    architectureDescription: matchedItem.architectureDescription,
    technologyStack: {
      frontend: matchedItem.frontendStack,
      backend: matchedItem.backendStack,
      aiModelOrLibrary: matchedItem.aiStack,
      data: matchedItem.dataStack,
    },
    difficulty: buildability.totalScore >= 85 ? 'Beginner Friendly' : 'Intermediate',
    sixtyMinuteScope: matchedItem.sixtyMinuteScope,
    futureExtensions: matchedItem.futureExtensions,
    requiredSkills: matchedItem.requiredSkills,
    buildabilityScore: buildability,
    suggestedNextStep:
      'Enroll in the 60-Minute Workshop to build and deploy this exact prototype live alongside mentors.',
    risks: matchedItem.risks,
    createdAt: new Date().toISOString(),
  };
}
