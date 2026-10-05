import { SimulatorControls } from '@/components/demo/SimulatorControls';
import { PageContainer } from '@/components/common/DesignSystem';

export const metadata = {
  title: 'Campaign Simulator & 7-Day Scenarios | AI Project Forge',
  description: 'Mathematical growth simulator testing scale and student conversion dynamics across 7 days.',
};

export default function DemoPage() {
  return (
    <PageContainer>
      <SimulatorControls />
    </PageContainer>
  );
}
