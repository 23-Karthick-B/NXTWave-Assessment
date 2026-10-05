import assert from 'node:assert';
import { calculateBuildabilityScore } from '../lib/scoring/buildability';
import { ProblemSubmissionSchema, StudentRegistrationSchema } from '../lib/validation';
import {
  generateDeterministicAIAnalysis,
  generateDeterministicProject,
} from '../lib/ai/fallback';
import { validateAIAnalysis, validateProjectRecommendation } from '../lib/ai/validator';
import { generateCampusChallenge } from '../lib/ai/challengeGenerator';
import { interpretGrowthMetrics } from '../lib/ai/growthInterpreter';
import { computeFunnelMetrics } from '../lib/growth/funnel';
import { evaluateExperimentStatus, INITIAL_CTA_EXPERIMENT } from '../lib/growth/abTesting';
import { runCampaignSimulation } from '../lib/simulation/campaignSimulator';
import {
  generateSyntheticSeedDataset,
  SEED_CAMPUSES,
  SEED_CAMPUS_CLUSTERS,
} from '../data/seedData';
import { saveToStorage, loadFromStorage, clearAllProjectStorage } from '../lib/storage';
import { trackEvent, getAllEvents, clearEvents } from '../lib/analytics/eventTracker';
import { ProblemSubmission, ProjectRecommendation, Student } from '../types';

let passedCount = 0;
let totalCount = 0;

function runTest(name: string, fn: () => void | Promise<void>) {
  totalCount++;
  try {
    const res = fn();
    if (res instanceof Promise) {
      throw new Error('Async test must be awaited');
    }
    console.log(`  ✓ ${name}`);
    passedCount++;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  ✗ ${name}:`, msg);
    throw err;
  }
}

async function runAsyncTest(name: string, fn: () => Promise<void>) {
  totalCount++;
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passedCount++;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  ✗ ${name}:`, msg);
    throw err;
  }
}

async function main() {
  console.log('\n======================================================');
  console.log('   AI PROJECT FORGE — SUITE OF AUTOMATED TESTS');
  console.log('======================================================\n');

  // 1. Problem Submission & Validation
  console.log('[1/18] Testing Problem Validation:');
  runTest('Valid problem passes Zod schema', () => {
    const valid = ProblemSubmissionSchema.safeParse({
      problemStatement: 'Students wait 30 minutes in cafeteria queues during lunch break.',
      category: 'Food',
      campusName: 'PSG Tech',
    });
    assert.strictEqual(valid.success, true);
  });

  runTest('Overly short problem fails Zod schema (< 10 chars)', () => {
    const invalid = ProblemSubmissionSchema.safeParse({
      problemStatement: 'Too short',
      category: 'Food',
    });
    assert.strictEqual(invalid.success, false);
  });

  // 2. Student Registration Validation
  console.log('\n[2/18] Testing Registration Validation:');
  runTest('Valid student registration passes schema', () => {
    const valid = StudentRegistrationSchema.safeParse({
      name: 'Karthick S.',
      email: 'karthick@example.test',
      college: 'PSG College of Technology',
      branch: 'Computer Science & Engineering (CSE)',
      isFinalYear: true,
      skills: ['Python', 'React'],
      consent: true,
    });
    assert.strictEqual(valid.success, true);
  });

  runTest('Non-final-year student is rejected by campaign rule', () => {
    const invalid = StudentRegistrationSchema.safeParse({
      name: 'Aditi M.',
      email: 'aditi@example.test',
      college: 'VIT',
      branch: 'IT',
      isFinalYear: false,
      skills: ['Python'],
      consent: true,
    });
    assert.strictEqual(invalid.success, false);
  });

  // 3. Buildability Scoring Deterministic Heuristic
  console.log('\n[3/18] Testing Buildability Scoring Engine:');
  runTest('Buildability score computes weighted total and 6 dimensions', () => {
    const score = calculateBuildabilityScore({
      problemStatement: 'Students wait 30 minutes for cafeteria food because kitchen cannot forecast demand.',
      category: 'Food',
    });
    assert.ok(score.totalScore >= 50 && score.totalScore <= 100);
    assert.ok(score.dimensions.problemClarity);
    assert.ok(score.dimensions.aiSuitability);
    assert.ok(score.dimensions.dataSimplicity);
    assert.ok(score.dimensions.technicalComplexity);
    assert.ok(score.dimensions.prototypeFeasibility);
    assert.ok(score.dimensions.studentRelevance);
    assert.ok(score.badgeLevel);
  });

  runTest('Deterministic scoring produces identical output for identical input', () => {
    const s1 = calculateBuildabilityScore({
      problemStatement: 'Hostel WiFi gets congested every night at 9 PM before assignment deadlines.',
      category: 'Campus Life',
    });
    const s2 = calculateBuildabilityScore({
      problemStatement: 'Hostel WiFi gets congested every night at 9 PM before assignment deadlines.',
      category: 'Campus Life',
    });
    assert.strictEqual(s1.totalScore, s2.totalScore);
    assert.strictEqual(s1.badgeLevel, s2.badgeLevel);
  });

  // 4. AI Fallback & Deterministic Generation
  console.log('\n[4/18] Testing Deterministic AI Fallback:');
  runTest('Fallback generates structured AIAnalysis without external API', () => {
    const analysis = generateDeterministicAIAnalysis(
      'Shuttle buses are overcrowded at peak dismissal time.',
      'Transport'
    );
    assert.ok(analysis.id);
    assert.ok(analysis.domain);
    assert.ok(analysis.aiOpportunity);
    assert.ok(analysis.aiCapabilities.length > 0);
  });

  runTest('Fallback generates ProjectRecommendation with 60-min scope', () => {
    const project = generateDeterministicProject(
      'Shuttle buses are overcrowded at peak dismissal time.',
      'Transport'
    );
    assert.ok(project.title);
    assert.ok(project.technologyStack.frontend.length > 0);
    assert.strictEqual(project.sixtyMinuteScope.length, 4);
    assert.strictEqual(
      project.sixtyMinuteScope.reduce((a, b) => a + b.estimatedMinutes, 0),
      60
    );
  });

  // 5. Response Validation
  console.log('\n[5/18] Testing AI Response Validator:');
  runTest('Valid project passes validateProjectRecommendation', () => {
    const project = generateDeterministicProject('Placement preparation resume feedback', 'Placement');
    const validated = validateProjectRecommendation(project);
    assert.ok(validated !== null);
  });

  // 6. Campus Clustering
  console.log('\n[6/18] Testing Campus Clustering & Problem Themes:');
  runTest('Clusters aggregate campuses and recurring keywords correctly', () => {
    const cluster = SEED_CAMPUS_CLUSTERS[0];
    assert.ok(cluster.campusesInvolved.length > 0);
    assert.ok(cluster.recurringKeywords.length > 0);
    assert.ok(cluster.averageBuildability > 0);
  });

  // 7. Challenge Generation
  console.log('\n[7/18] Testing Campus Challenge Generator:');
  runTest('Synthesizes collective challenge from cluster', () => {
    const challenge = generateCampusChallenge(SEED_CAMPUS_CLUSTERS[0], true);
    assert.ok(challenge.title);
    assert.ok(challenge.whyItMatters);
    assert.ok(challenge.whyAI);
    assert.strictEqual(challenge.sixtyMinuteScope.length, 4);
    assert.strictEqual(challenge.isSimulated, true);
  });

  // 8. Central Analytics Event Tracking
  console.log('\n[8/18] Testing Analytics Event System:');
  runTest('Tracks events locally with unique IDs and session tags', () => {
    clearEvents();
    const ev = trackEvent('problem_submitted', { metadata: { category: 'Food' } });
    assert.strictEqual(ev.eventName, 'problem_submitted');
    const all = getAllEvents();
    assert.strictEqual(all.length, 1);
    assert.strictEqual(all[0].id, ev.id);
  });

  // 9. Growth Funnel Computations
  console.log('\n[9/18] Testing Growth Funnel Engine:');
  runTest('Computes Value-to-Registration conversion rate accurately', () => {
    const mockProblems: ProblemSubmission[] = [
      { id: 'p1', problemStatement: 'Bus late', category: 'Transport', submittedAt: '' },
      { id: 'p2', problemStatement: 'Food queue', category: 'Food', submittedAt: '' },
    ];
    const mockProjects: ProjectRecommendation[] = [
      generateDeterministicProject('Bus late', 'Transport', 'Students', 'p1'),
      generateDeterministicProject('Food queue', 'Food', 'Students', 'p2'),
    ];
    const mockStudents: Student[] = [
      {
        id: 's1',
        name: 'Karthick S.',
        email: 'k@example.test',
        college: 'PSG Tech',
        branch: 'CSE',
        isFinalYear: true,
        skills: ['Python'],
        registeredAt: '',
      },
    ];

    const report = computeFunnelMetrics([], mockProblems, mockProjects, mockStudents);
    assert.strictEqual(report.kpis.problemsSubmitted, 2);
    assert.strictEqual(report.kpis.projectsGenerated, 2);
    assert.strictEqual(report.kpis.registrationsCompleted, 1);
    // 1 / 2 = 50.0%
    assert.strictEqual(report.kpis.valueToRegistrationRate, 50.0);
  });

  // 10. AI Growth Intelligence Formulator
  console.log('\n[10/18] Testing AI Growth Intelligence Interpreter:');
  runTest('Formulates grounded insights with observation, evidence, recommendation, rationale, and confidence', () => {
    const insights = interpretGrowthMetrics({
      visitors: 500,
      problemsStarted: 350,
      problemsSubmitted: 280,
      projectsGenerated: 280,
      projectsViewed: 270,
      registrationsStarted: 220,
      registrationsCompleted: 200,
      projectsShared: 80,
      teamInteractions: 90,
      activeCampusesCount: 20,
      averageBuildability: 86,
    });
    assert.ok(insights.length >= 2);
    const first = insights[0];
    assert.ok(first.observation);
    assert.ok(first.evidence);
    assert.ok(first.recommendation);
    assert.ok(first.rationale);
    assert.ok(['High', 'Medium', 'Low'].includes(first.confidence));
  });

  // 11. A/B Testing Evaluation
  console.log('\n[11/18] Testing A/B Experimentation Engine:');
  runTest('Correctly evaluates statistical significance and conversion lift', () => {
    const evalResult = evaluateExperimentStatus(INITIAL_CTA_EXPERIMENT);
    assert.strictEqual(evalResult.winningVariant, 'B');
    assert.ok(evalResult.liftPercentage > 0);
    assert.strictEqual(evalResult.significanceStatus, 'Statistically Significant');
  });

  // 12. Campaign Simulator & Scenarios
  console.log('\n[12/18] Testing 7-Day Campaign Simulator:');
  runTest('Base scenario hits 500+ target registrations within 7 days', () => {
    const sim = runCampaignSimulation('base', 500);
    assert.strictEqual(sim.dailyMetrics.length, 7);
    assert.ok(sim.totalRegistrations >= 500);
    assert.strictEqual(sim.isTargetMet, true);
    assert.strictEqual(sim.budgetSpentInr, 2000);
    assert.ok(sim.costPerRegistrationInr <= 4.0);
  });

  runTest('Conservative scenario flags when target is not met', () => {
    const sim = runCampaignSimulation('conservative', 500);
    assert.strictEqual(sim.isTargetMet, false);
  });

  // 13. Synthetic Seed Dataset Verification
  console.log('\n[13/18] Testing Synthetic Seed Generator:');
  runTest('Generates 500 students, 500 problems, and 300 projects with privacy protection', () => {
    const data = generateSyntheticSeedDataset();
    assert.strictEqual(data.students.length, 500);
    assert.strictEqual(data.problems.length, 500);
    assert.strictEqual(data.projects.length, 300);
    // Verify privacy: no real emails, only @example.test with masking
    assert.ok(data.students.every((s) => s.email.includes('@example.test')));
    assert.ok(data.students.every((s) => s.email.includes('***')));
    // Verify simulated flag
    assert.ok(data.students.every((s) => s.isSimulated === true));
  });

  // 14. Versioned Local Storage & Fallback
  console.log('\n[14/18] Testing Storage Subsystem:');
  runTest('Saves and loads from memory fallback cleanly', () => {
    clearAllProjectStorage();
    saveToStorage('test_key', { foo: 'bar', count: 42 });
    const loaded = loadFromStorage('test_key', { foo: '', count: 0 });
    assert.strictEqual(loaded.foo, 'bar');
    assert.strictEqual(loaded.count, 42);
  });

  // 15. End-to-End User Journey Simulation
  console.log('\n[15/18] Testing Full End-to-End User Flow:');
  runTest('Landing → Problem → AI Analysis → Project → Score → Registration → Builder Profile → Share → Campus → Admin', () => {
    // Step 1: Student lands & submits problem
    const rawInput = {
      problemStatement: 'Placement preparation resume feedback is missing for core electronics engineering.',
      category: 'Placement' as const,
      campusName: 'PSG College of Technology',
      affectedUsers: 'Final Year ECE Students',
    };
    const valid = ProblemSubmissionSchema.parse(rawInput);

    // Step 2: AI Analyzes & Scores
    const analysis = generateDeterministicAIAnalysis(valid.problemStatement, valid.category, valid.affectedUsers);
    assert.ok(analysis.aiCapabilities.length > 0);

    const project = generateDeterministicProject(valid.problemStatement, valid.category, valid.affectedUsers, 'prob-e2e-1');
    assert.ok(project.buildabilityScore.totalScore >= 70);

    // Step 3: Registration happens AFTER value delivery
    const studentData = {
      name: 'Karthick S.',
      email: 'karthick@example.test',
      college: valid.campusName || 'PSG Tech',
      branch: 'ECE',
      isFinalYear: true,
      skills: ['Python', 'AI / ML Fundamentals'],
      consent: true,
    };
    const regValid = StudentRegistrationSchema.parse(studentData);

    const student: Student = {
      id: 'stud-e2e-1',
      ...studentData,
      primaryProjectId: project.id,
      registeredAt: new Date().toISOString(),
    };

    // Step 4: Share loop triggered
    const shareEvent = trackEvent('project_shared', {
      studentId: student.id,
      projectId: project.id,
      metadata: { channel: 'whatsapp' },
    });
    assert.strictEqual(shareEvent.eventName, 'project_shared');

    // Step 5: Campus aggregation
    const funnel = computeFunnelMetrics(getAllEvents(), [
      { id: 'p1', problemStatement: valid.problemStatement, category: valid.category, submittedAt: '' },
    ], [project], [student]);
    assert.strictEqual(funnel.kpis.registrationsCompleted, 1);
    assert.strictEqual(funnel.kpis.valueToRegistrationRate, 100);

    // Step 6: AI Growth Intelligence derived
    const insights = interpretGrowthMetrics({
      visitors: 100,
      problemsStarted: 60,
      problemsSubmitted: 50,
      projectsGenerated: 50,
      projectsViewed: 50,
      registrationsStarted: 45,
      registrationsCompleted: 40,
      projectsShared: 15,
      teamInteractions: 10,
      activeCampusesCount: 5,
      averageBuildability: project.buildabilityScore.totalScore,
    });
    assert.ok(insights.length > 0);
  });

  console.log('\n======================================================');
  console.log(`   ALL ${passedCount}/${totalCount} TESTS PASSED SUCCESSFULLY!`);
  console.log('======================================================\n');
}

main().catch((err) => {
  console.error('\nTest suite failed with error:', err);
  process.exit(1);
});
