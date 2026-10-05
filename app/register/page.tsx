import { RegistrationForm } from '@/components/registration/RegistrationForm';
import { PageContainer } from '@/components/common/DesignSystem';

export const metadata = {
  title: 'Register for 60-Minute Workshop | AI Project Forge',
  description: 'Free registration for final-year engineering students to build and deploy their campus AI prototype.',
};

export default function RegisterPage() {
  return (
    <PageContainer>
      <RegistrationForm />
    </PageContainer>
  );
}
