import { DailySimulationMetric, SimulationScenario } from '@/types';
import { SIMULATION_SCENARIOS } from './scenarios';

export interface SimulationResult {
  scenario: SimulationScenario;
  targetScale: number;
  totalVisitors: number;
  totalProblemsSubmitted: number;
  totalProjectsGenerated: number;
  totalRegistrations: number;
  totalShares: number;
  isTargetMet: boolean;
  budgetSpentInr: number;
  costPerRegistrationInr: number;
  dailyMetrics: DailySimulationMetric[];
}

export function runCampaignSimulation(
  scenarioId: SimulationScenario['id'] = 'base',
  targetScale: number = 500
): SimulationResult {
  const scenario = SIMULATION_SCENARIOS[scenarioId] || SIMULATION_SCENARIOS.base;

  // Scale multipliers relative to 500 base target
  const scaleRatio = targetScale / 500;
  const scaledVisitors = Math.round(scenario.visitorScale * scaleRatio);

  // Daily distribution curve across 7 days (weights summing to 1.0)
  // Day 1: 8%, Day 2: 12%, Day 3: 17%, Day 4: 22%, Day 5: 20%, Day 6: 12%, Day 7: 9%
  const dayWeights = [0.08, 0.12, 0.17, 0.22, 0.20, 0.12, 0.09];

  let cumulativeRegistrations = 0;
  let totalProblems = 0;
  let totalProjects = 0;
  let totalShares = 0;

  const dailyMetrics: DailySimulationMetric[] = dayWeights.map((w, index) => {
    const day = index + 1;
    const visitors = Math.max(15, Math.round(scaledVisitors * w));
    const problemsStarted = Math.round(visitors * 0.75);
    const problemsSubmitted = Math.round(visitors * scenario.problemSubmitRate);
    const projectsGenerated = Math.round(problemsSubmitted * scenario.projectGenerationRate);
    const registrations = Math.round(projectsGenerated * scenario.registrationRate);
    const shares = Math.round(registrations * scenario.shareRate);

    cumulativeRegistrations += registrations;
    totalProblems += problemsSubmitted;
    totalProjects += projectsGenerated;
    totalShares += shares;

    const targetLine = Math.round(((targetScale) / 7) * day);

    return {
      day,
      date: `Day ${day}${day === 5 ? ' (Current)' : day > 5 ? ' (Projected)' : ''}`,
      visitors,
      problemsStarted,
      problemsSubmitted,
      projectsGenerated,
      registrations,
      cumulativeRegistrations,
      shares,
      targetLine,
    };
  });

  const budgetSpentInr = 2000;
  const costPerRegistrationInr =
    cumulativeRegistrations > 0
      ? Number((budgetSpentInr / cumulativeRegistrations).toFixed(2))
      : 0;

  return {
    scenario,
    targetScale,
    totalVisitors: scaledVisitors,
    totalProblemsSubmitted: totalProblems,
    totalProjectsGenerated: totalProjects,
    totalRegistrations: cumulativeRegistrations,
    totalShares,
    isTargetMet: cumulativeRegistrations >= targetScale,
    budgetSpentInr,
    costPerRegistrationInr,
    dailyMetrics,
  };
}
