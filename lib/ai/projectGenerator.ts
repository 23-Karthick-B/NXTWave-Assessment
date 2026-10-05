import { CampusCategory, ProjectRecommendation } from '@/types';
import { generateDeterministicProject } from './fallback';
import { validateProjectRecommendation } from './validator';

export interface ProjectGenerationInput {
  problemId: string;
  problemStatement: string;
  category: CampusCategory;
  affectedUsers?: string;
  severity?: 'Low' | 'Medium' | 'High' | 'Critical';
}

/**
 * Generates an end-to-end ProjectRecommendation from a campus problem.
 * Ensures the project includes 60-minute build plan, deterministic buildability score,
 * architecture, and skills.
 */
export async function generateProjectRecommendation(
  input: ProjectGenerationInput
): Promise<ProjectRecommendation> {
  try {
    const apiKey = typeof window === 'undefined' ? process.env.AI_API_KEY : undefined;
    if (apiKey) {
      // Future API connection
    }
  } catch (err) {
    console.warn('AI Project Generator: Using deterministic fallback due to:', err);
  }

  const fallback = generateDeterministicProject(
    input.problemStatement,
    input.category,
    input.affectedUsers,
    input.problemId
  );

  const validated = validateProjectRecommendation(fallback);
  return validated || fallback;
}
