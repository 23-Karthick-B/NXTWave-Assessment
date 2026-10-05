import { BuildabilityScore, CampusCategory } from '@/types';

interface ScoreInput {
  problemStatement: string;
  category: CampusCategory;
  affectedUsers?: string;
  severity?: 'Low' | 'Medium' | 'High' | 'Critical';
}

/**
 * Deterministic buildability scoring engine.
 * Computes scores purely from deterministic semantic and heuristic analysis.
 * Weights:
 * - Problem Clarity: 15%
 * - AI Suitability: 20%
 * - Data Simplicity: 15%
 * - Technical Complexity: 15%
 * - Prototype Feasibility: 20%
 * - Student Relevance: 15%
 */
export function calculateBuildabilityScore(input: ScoreInput): BuildabilityScore {
  const statement = input.problemStatement.trim();
  const lower = statement.toLowerCase();
  const wordCount = statement.split(/\s+/).filter(Boolean).length;

  // 1. Problem Clarity (15%)
  let clarityScore = 65;
  if (wordCount >= 8) clarityScore += 10;
  if (wordCount >= 18) clarityScore += 10;
  if (wordCount > 60) clarityScore -= 5; // overly verbose
  const specificTerms = ['because', 'when', 'delay', 'wait', 'manual', 'lack', 'unpredictable', 'miss', 'waste', 'confusing'];
  const termMatches = specificTerms.filter((term) => lower.includes(term)).length;
  clarityScore += Math.min(15, termMatches * 5);
  clarityScore = Math.min(98, Math.max(50, clarityScore));

  const clarityRationale =
    wordCount >= 12
      ? `Clear problem scope with specific pain indicators (${wordCount} words provided).`
      : `Concise statement; adding context on specific root causes improves clarity.`;

  // 2. AI Suitability (20%)
  // High suitability if problem involves prediction, matching, summarization, NLP, recommendation, or computer vision
  let aiScore = 70;
  const aiKeywords = [
    'predict', 'recommend', 'match', 'detect', 'schedule', 'queue', 'categorize',
    'summarize', 'search', 'prioritize', 'automate', 'forecast', 'recognize', 'chat', 'track'
  ];
  const aiMatches = aiKeywords.filter((k) => lower.includes(k)).length;
  aiScore += Math.min(25, aiMatches * 8 + (input.category === 'Food' || input.category === 'Placement' || input.category === 'Transport' ? 5 : 0));
  aiScore = Math.min(96, Math.max(55, aiScore));

  const aiRationale =
    aiMatches > 0
      ? `High pattern-recognition match for regression, classification, or LLM-based reasoning.`
      : `Suitable for heuristic AI transformation and automated rule/vector matching.`;

  // 3. Data Simplicity (15%)
  // Can mock data or synthetic tabular/text data be prepared in 10 minutes?
  let dataScore = 80;
  const hardDataIndicators = ['hardware', 'sensor', 'biometric', 'rfid', 'cctv', 'real-time video', 'satellite'];
  const hasHardData = hardDataIndicators.some((h) => lower.includes(h));
  if (hasHardData) {
    dataScore = 58;
  } else if (['Placement', 'Education', 'Productivity', 'Campus Life', 'Food'].includes(input.category)) {
    dataScore = 90;
  } else {
    dataScore = 78;
  }

  const dataRationale = hasHardData
    ? `Hardware or live feed dependencies can be simulated via JSON mocks for the 60-min build.`
    : `Input dataset can be easily represented via mock CSV/JSON structures in minutes.`;

  // 4. Technical Complexity (15%)
  // Inverse: higher score means more manageable complexity for a student
  let techScore = 75;
  if (['Productivity', 'Education', 'Campus Life'].includes(input.category)) {
    techScore = 88;
  } else if (['Placement', 'Food', 'Events'].includes(input.category)) {
    techScore = 84;
  } else if (hasHardData) {
    techScore = 62;
  } else {
    techScore = 76;
  }

  const techRationale =
    techScore >= 80
      ? `Fits cleanly into standard Next.js / Python API stack without complex devops overhead.`
      : `Modular architecture isolates complex pipelines into mockable micro-functions.`;

  // 5. Prototype Feasibility (20%)
  // Can a demo be completed in 60 minutes?
  let prototypeScore = 85;
  if (hasHardData) {
    prototypeScore = 65;
  } else if (wordCount >= 10) {
    prototypeScore = 88;
  }

  const prototypeRationale =
    prototypeScore >= 85
      ? `60-minute build path is well defined: Synthetic Data → Model/Prompt → Interactive UI.`
      : `Achievable within 60 minutes when using pre-structured templates and simulated endpoints.`;

  // 6. Student Relevance (15%)
  let relevanceScore = 80;
  if (['Placement', 'Transport', 'Food', 'Campus Life', 'Education'].includes(input.category)) {
    relevanceScore = 95;
  } else if (input.severity === 'Critical' || input.severity === 'High') {
    relevanceScore = 90;
  } else {
    relevanceScore = 82;
  }

  const relevanceRationale = `Directly impacts everyday engineering student campus workflow and resonates with capstone evaluators.`;

  // Weighted Total
  const weights = {
    problemClarity: 0.15,
    aiSuitability: 0.20,
    dataSimplicity: 0.15,
    technicalComplexity: 0.15,
    prototypeFeasibility: 0.20,
    studentRelevance: 0.15,
  };

  const weightedSum =
    clarityScore * weights.problemClarity +
    aiScore * weights.aiSuitability +
    dataScore * weights.dataSimplicity +
    techScore * weights.technicalComplexity +
    prototypeScore * weights.prototypeFeasibility +
    relevanceScore * weights.studentRelevance;

  const totalScore = Math.round(weightedSum);

  let badgeLevel: BuildabilityScore['badgeLevel'] = 'Good Feasibility';
  if (totalScore >= 85) {
    badgeLevel = 'Highly Feasible';
  } else if (totalScore >= 75) {
    badgeLevel = 'Good Feasibility';
  } else if (totalScore >= 65) {
    badgeLevel = 'Moderate Feasibility';
  } else {
    badgeLevel = 'Ambitious';
  }

  const explanation = `This problem demonstrates a buildability score of ${totalScore}/100. It exhibits strong AI suitability and high prototype feasibility, making it ideal for a rapid 60-minute scoped build with simulated or lightweight data feeds.`;

  return {
    totalScore,
    dimensions: {
      problemClarity: {
        name: 'Problem Clarity',
        weight: weights.problemClarity,
        score: clarityScore,
        rationale: clarityRationale,
      },
      aiSuitability: {
        name: 'AI Suitability',
        weight: weights.aiSuitability,
        score: aiScore,
        rationale: aiRationale,
      },
      dataSimplicity: {
        name: 'Data Simplicity',
        weight: weights.dataSimplicity,
        score: dataScore,
        rationale: dataRationale,
      },
      technicalComplexity: {
        name: 'Technical Manageability',
        weight: weights.technicalComplexity,
        score: techScore,
        rationale: techRationale,
      },
      prototypeFeasibility: {
        name: 'Prototype Feasibility (60-Min)',
        weight: weights.prototypeFeasibility,
        score: prototypeScore,
        rationale: prototypeRationale,
      },
      studentRelevance: {
        name: 'Campus Student Relevance',
        weight: weights.studentRelevance,
        score: relevanceScore,
        rationale: relevanceRationale,
      },
    },
    explanation,
    badgeLevel,
  };
}
