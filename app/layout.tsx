import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adaptive CEFR Test',
  description: 'Adaptive CEFR placement MVP',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen w-full max-w-5xl p-4 md:p-6">{children}</main>
      </body>
    </html>
  );
}
