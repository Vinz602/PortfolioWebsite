import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Vincent Christian Atmadjaya | ML Portfolio',
  description: 'Machine learning engineer showcasing AI and data science projects.',
  keywords: ['machine learning', 'AI', 'data science', 'portfolio', 'deep learning', 'NLP'],
  authors: [{ name: 'Vincent Christian Atmadjaya' }],
  openGraph: {
    title: 'Vincent Christian Atmadjaya | ML Portfolio',
    description: 'Showcasing machine learning and AI projects',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
