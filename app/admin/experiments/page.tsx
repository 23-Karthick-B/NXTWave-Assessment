import { ABTestCard } from '@/components/experiments/ABTestCard';
import { PageContainer } from '@/components/common/DesignSystem';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Growth Experiments & A/B Testing | AI Project Forge',
  description: 'A/B hypothesis testing Variant A vs Variant B with statistical confidence metrics.',
};

export default function AdminExperimentsPage() {
  return (
    <PageContainer>
      <div className="mb-4">
        <Link
          href="/admin"
          className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Growth Command Center
        </Link>
      </div>
      <ABTestCard />
    </PageContainer>
  );
}
