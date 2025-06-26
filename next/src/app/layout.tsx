import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/app/components/layout/MainLayout";
import { Toaster } from "@/app/components/ui/sonner";
import React from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brief & craft",
  description: "La plateforme qui connecte vos projets avec les meilleurs talents et agents IA",
  keywords: ["équipe", "projet", "freelance", "IA", "recrutement", "développement"],
  authors: [{ name: "Brief & craft" }],
  creator: "Brief & craft",
  publisher: "Brief & craft",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Brief & craft",
    description: "La plateforme qui connecte vos projets avec les meilleurs talents et agents IA",
    siteName: "Brief & craft",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brief & craft",
    description: "La plateforme qui connecte vos projets avec les meilleurs talents et agents IA",
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
	  <Head>
        <link rel="icon" href="../../public/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <MainLayout>
          {children}
        </MainLayout>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
            },
          }}
        />
      </body>
    </html>
  );
}
