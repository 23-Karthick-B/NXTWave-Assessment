import { ProblemInput } from '@/components/problem/ProblemInput';
import { PageContainer } from '@/components/common/DesignSystem';

export const metadata = {
  title: 'Submit Campus Problem | AI Project Forge',
  description: 'Turn your real engineering college friction into an AI project architecture blueprint.',
};

export default function ProblemPage() {
  return (
    <PageContainer>
      <ProblemInput />
    </PageContainer>
  );
}
