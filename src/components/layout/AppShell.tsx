// src/components/layout/AppShell.tsx
import { Header } from './Header';
import { Footer } from './Footer';
import { ChatWidget } from './ChatWidget';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 fade-in">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
