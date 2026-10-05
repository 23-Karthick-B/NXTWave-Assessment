import { BuilderProfile } from '@/components/student/BuilderProfile';
import { PageContainer } from '@/components/common/DesignSystem';

export const metadata = {
  title: 'AI Builder Profile | AI Project Forge',
  description: 'Your verified campus AI builder profile and shareable project card.',
};

export default function StudentPage() {
  return (
    <PageContainer>
      <BuilderProfile />
    </PageContainer>
  );
}
