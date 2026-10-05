import { CampusProblemMap } from '@/components/campus/CampusProblemMap';
import { PageContainer } from '@/components/common/DesignSystem';

export const metadata = {
  title: 'Campus AI Problem Map | AI Project Forge',
  description: 'Aggregated campus problem intelligence across engineering universities.',
};

export default function CampusPage() {
  return (
    <PageContainer>
      <CampusProblemMap />
    </PageContainer>
  );
}
