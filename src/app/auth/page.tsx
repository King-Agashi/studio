// src/app/auth/page.tsx
import { AuthTabs } from '@/components/auth/AuthTabs';

export default function AuthPage() {
  return (
    <div className="py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]"> {/* Adjust min-height as needed */}
      <AuthTabs />
    </div>
  );
}
