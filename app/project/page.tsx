'use client';

import React from 'react';
import { useAppStore } from '@/hooks/useStore';
import { ProjectView } from '@/components/project/ProjectView';
import { PageContainer } from '@/components/common/DesignSystem';
import { EmptyState } from '@/components/common/StateViews';
import { generateDeterministicProject } from '@/lib/ai/fallback';

export default function ProjectPage() {
  const { currentProject, setProjectRecommendation } = useAppStore();

  const projectToDisplay =
    currentProject ||
    generateDeterministicProject(
      'Students wait 30 minutes in cafeteria queues during lunch break because the kitchen has no visibility into class schedules.',
      'Food'
    );

  return (
    <PageContainer>
      <ProjectView project={projectToDisplay} />
    </PageContainer>
  );
}
