import { AIAnalysis, ProjectRecommendation } from '@/types';
import { AIAnalysisSchema, ProjectRecommendationSchema } from '../validation';

export function validateAIAnalysis(data: unknown): AIAnalysis | null {
  try {
    const parsed = AIAnalysisSchema.safeParse(data);
    if (parsed.success) {
      return parsed.data as AIAnalysis;
    }
    console.warn('AIAnalysis validation failed:', parsed.error.issues);
    return null;
  } catch (err) {
    console.error('Validation error in AIAnalysis:', err);
    return null;
  }
}

export function validateProjectRecommendation(data: unknown): ProjectRecommendation | null {
  try {
    const parsed = ProjectRecommendationSchema.safeParse(data);
    if (parsed.success) {
      return parsed.data as ProjectRecommendation;
    }
    console.warn('ProjectRecommendation validation failed:', parsed.error.issues);
    return null;
  } catch (err) {
    console.error('Validation error in ProjectRecommendation:', err);
    return null;
  }
}
