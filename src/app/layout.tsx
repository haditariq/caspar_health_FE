import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Patient Feed - Caspar Health',
  description: 'Patients details by Caspar Health',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div
          style={{ height: '100vh', display: 'flex', backgroundColor: '#fff' }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
