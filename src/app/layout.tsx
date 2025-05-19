import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Keep Inter for body text
import { Lora } from 'next/font/google'; // Add Lora for headings
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/useCart'; // Corrected path
import { AppShell } from '@/components/layout/AppShell'; // Import AppShell

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans', // Using Geist variable name as it's already in globals.css
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Bookstock Nook',
  description: 'A modern-vintage platform for buying and selling books.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} antialiased`}>
        <CartProvider>
          <AppShell>{children}</AppShell>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
