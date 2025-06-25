import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MainLayout } from '@/components/layout/MainLayout';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TeamBuilder - Créez votre équipe parfaite',
  description: 'La plateforme qui connecte vos projets avec les meilleurs talents et agents IA',
  keywords: ['équipe', 'projet', 'freelance', 'IA', 'recrutement', 'développement'],
  authors: [{ name: 'TeamBuilder' }],
  creator: 'TeamBuilder',
  publisher: 'TeamBuilder',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'TeamBuilder - Créez votre équipe parfaite',
    description: 'La plateforme qui connecte vos projets avec les meilleurs talents et agents IA',
    siteName: 'TeamBuilder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeamBuilder - Créez votre équipe parfaite',
    description: 'La plateforme qui connecte vos projets avec les meilleurs talents et agents IA',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <MainLayout>
          {children}
        </MainLayout>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </body>
    </html>
  );
}