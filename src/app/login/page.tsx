'use client';

import { LoginForm } from '@/components/login/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-[50%] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/20 via-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
