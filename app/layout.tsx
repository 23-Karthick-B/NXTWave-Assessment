import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'AI Project Forge | The 60-Minute AI Campus Challenge',
  description:
    'Transform real campus problems into buildable AI projects. Value-first growth engine for engineering students.',
  keywords: [
    'AI Project Forge',
    'Campus AI Challenge',
    '60-Minute AI Project',
    'Engineering Workshop',
    'AI Builder',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090a0f] text-slate-100 antialiased selection:bg-blue-600/30 selection:text-blue-200 flex flex-col justify-between">
        <div>
          <Navbar />
          <div className="flex-1">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
