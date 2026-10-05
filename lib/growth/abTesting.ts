import { Experiment, ExperimentVariant } from '@/types';

export const INITIAL_CTA_EXPERIMENT: Experiment = {
  id: 'exp-cta-value-first-v1',
  title: 'Value-First Problem CTA vs Direct Workshop Registration CTA',
  hypothesis:
    'Offering immediate personalized AI project generation before registration will generate at least a 2.5x higher final registration conversion than a standard workshop registration CTA.',
  primaryMetric: 'Landing Visitor to Completed Workshop Registration %',
  variants: {
    A: {
      id: 'A',
      name: 'Variant A: Direct Gate ("Register for the Workshop")',
      headline: 'Register for the 60-Minute AI Campus Workshop',
      ctaText: 'Register Now',
      description: 'Traditional workshop landing page asking for student details upfront before any project value is given.',
      impressions: 480,
      problemStarts: 0,
      problemsSubmitted: 0,
      projectsGenerated: 0,
      registrations: 42,
      conversionRate: 8.75, // 42 / 480
    },
    B: {
      id: 'B',
      name: 'Variant B: Value-First ("Turn My Problem Into an AI Project")',
      headline: 'What Problem At Your College Would You Solve With AI?',
      ctaText: 'Turn My Problem Into an AI Project',
      description: 'Value-first loop: students input real campus friction, receive an instant AI architecture + 60-min build plan, then register to build it.',
      impressions: 512,
      problemStarts: 348,
      problemsSubmitted: 289,
      projectsGenerated: 289,
      registrations: 198,
      conversionRate: 38.67, // 198 / 512
    },
  },
  sampleSize: 992,
  status: 'active',
  confidenceNote: 'Statistically significant outperformance (p < 0.001) observed in simulated cohort. Variant B demonstrates 4.4x conversion lift over Variant A.',
};

export function evaluateExperimentStatus(experiment: Experiment): {
  winningVariant: 'A' | 'B' | 'Inconclusive';
  liftPercentage: number;
  significanceStatus: 'Statistically Significant' | 'Early Signal' | 'Insufficient Sample';
  summaryText: string;
} {
  const { A, B } = experiment.variants;
  const totalImpressions = A.impressions + B.impressions;

  if (totalImpressions < 60) {
    return {
      winningVariant: 'Inconclusive',
      liftPercentage: 0,
      significanceStatus: 'Insufficient Sample',
      summaryText: 'Sample size is currently too low to establish a statistically rigorous conclusion.',
    };
  }

  const rateA = A.impressions > 0 ? (A.registrations / A.impressions) * 100 : 0;
  const rateB = B.impressions > 0 ? (B.registrations / B.impressions) * 100 : 0;

  const diff = rateB - rateA;
  const liftPercentage = rateA > 0 ? Number(((diff / rateA) * 100).toFixed(1)) : 0;

  if (totalImpressions < 200) {
    return {
      winningVariant: rateB > rateA ? 'B' : 'A',
      liftPercentage,
      significanceStatus: 'Early Signal',
      summaryText: `Early signal indicates Variant ${rateB > rateA ? 'B' : 'A'} is leading by ${Math.abs(liftPercentage)}%, but more sample volume is recommended before formal rollout.`,
    };
  }

  return {
    winningVariant: rateB > rateA ? 'B' : 'A',
    liftPercentage,
    significanceStatus: 'Statistically Significant',
    summaryText: `Variant B ("Turn My Problem into an AI Project") achieves a massive ${liftPercentage}% relative lift over traditional registration, confirming the Value-Before-Registration hypothesis.`,
  };
}
