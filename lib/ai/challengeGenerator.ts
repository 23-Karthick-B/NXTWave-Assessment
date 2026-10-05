import { CampusCategory, CampusCluster, Challenge } from '@/types';

export function generateCampusChallenge(cluster: CampusCluster, isSimulated = true): Challenge {
  const stepTemplates = [
    {
      stepNumber: 1,
      title: 'Collective Dataset Synthesis',
      description: `Synthesize aggregated ${cluster.category.toLowerCase()} campus pain points into normalized CSV inputs with simulated time and traffic logs.`,
      estimatedMinutes: 12,
      outputArtifact: `datasets/campus_${cluster.category.toLowerCase()}_sample.csv`,
    },
    {
      stepNumber: 2,
      title: 'Core AI Model / Heuristic Pipeline',
      description: 'Implement scoring or prediction engine to address the primary friction identified across member colleges.',
      estimatedMinutes: 18,
      outputArtifact: 'engine/core_pipeline.py',
    },
    {
      stepNumber: 3,
      title: 'Actionable Student / Admin Dashboard',
      description: 'Create responsive web interface showing real-time status and recommendations for affected students.',
      estimatedMinutes: 18,
      outputArtifact: 'components/CampusInsightDashboard.tsx',
    },
    {
      stepNumber: 4,
      title: 'Deployment & Verification Walkthrough',
      description: 'Deploy live prototype to Vercel/Render and run simulated load test with 50 peer campus scenarios.',
      estimatedMinutes: 12,
      outputArtifact: 'docs/DEPLOYMENT_GUIDE.md',
    },
  ];

  const skillMapping: Record<CampusCategory, string[]> = {
    Food: ['Python', 'AI / ML Fundamentals', 'React / Next.js', 'Data Analysis & Pandas'],
    Transport: ['JavaScript / TypeScript', 'React / Next.js', 'AI / ML Fundamentals', 'UI / UX Design'],
    Placement: ['Prompt Engineering', 'React / Next.js', 'Backend (Node/FastAPI)', 'Product Management'],
    Education: ['TypeScript', 'UI / UX Design', 'AI / ML Fundamentals', 'Data Analysis & Pandas'],
    'Campus Life': ['JavaScript / TypeScript', 'Backend (Node/FastAPI)', 'Testing & QA'],
    Productivity: ['JavaScript / TypeScript', 'React / Next.js', 'UI / UX Design'],
    Healthcare: ['Python', 'AI / ML Fundamentals', 'Backend (Node/FastAPI)'],
    Events: ['React / Next.js', 'Backend (Node/FastAPI)', 'UI / UX Design'],
    Administration: ['Backend (Node/FastAPI)', 'Python', 'Testing & QA'],
    Finance: ['Data Analysis & Pandas', 'Python', 'Backend (Node/FastAPI)'],
    Security: ['Python', 'AI / ML Fundamentals', 'Cloud / DevOps Basics'],
    Other: ['Python', 'React / Next.js', 'Prompt Engineering'],
  };

  return {
    id: `challenge-${cluster.category.toLowerCase()}-${Date.now()}`,
    title: cluster.challengeTitle,
    category: cluster.category,
    problemDescription: `Across ${cluster.campusesInvolved.length} universities, over ${cluster.problemCount} student submissions point to acute friction: "${cluster.keyPainPointSummary}".`,
    whyItMatters:
      'Campus friction at this scale wastes hundreds of collective student hours each semester and lowers overall academic satisfaction.',
    whyAI:
      'Automated forecasting, semantic triage, and pattern recognition transform messy student feedback into actionable real-time allocation and advice.',
    aggregatedCampusCount: cluster.campusesInvolved.length,
    sampleProblems: cluster.sampleProblems.slice(0, 4),
    sixtyMinuteScope: stepTemplates,
    requiredSkills: skillMapping[cluster.category] || ['Python', 'React / Next.js', 'AI / ML Fundamentals'],
    expectedOutput: `A verified, browser-accessible micro-prototype resolving ${cluster.category} pain points in 60 minutes.`,
    futureExtensions: [
      'Multi-campus federated benchmarking',
      'Automated administrative escalation webhooks',
      'Real-time student mobile notification bridge',
    ],
    difficulty: cluster.averageBuildability >= 82 ? 'Beginner Friendly' : 'Intermediate',
    createdAt: new Date().toISOString(),
    isSimulated,
  };
}
