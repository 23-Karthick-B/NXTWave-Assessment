import { GrowthCommandCenter } from '@/components/admin/GrowthCommandCenter';
import { PageContainer } from '@/components/common/DesignSystem';

export const metadata = {
  title: 'Admin Growth Command Center | AI Project Forge',
  description: 'Executive growth tracking, value-to-registration conversion, and campaign telemetry.',
};

export default function AdminPage() {
  return (
    <PageContainer>
      <GrowthCommandCenter />
    </PageContainer>
  );
}
