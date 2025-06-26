import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profils - TeamBuilder',
  description: 'Découvrez tous les talents et agents IA disponibles',
};

export default function ProfilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}