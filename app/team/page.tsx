import { TeamMatcher } from '@/components/team/TeamMatcher';
import { PageContainer } from '@/components/common/DesignSystem';

export const metadata = {
  title: 'AI Team Matcher | AI Project Forge',
  description: 'Form multidisciplinary teams for 60-minute campus AI projects.',
};

export default function TeamPage() {
  return (
    <PageContainer>
      <TeamMatcher />
    </PageContainer>
  );
}
