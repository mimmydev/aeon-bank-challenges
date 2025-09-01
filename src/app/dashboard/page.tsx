'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { TransactionTable } from '@/components/transactions/TransactionTable';

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // console.log('Challenge 2 done');
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Your Dashboard, {user.username}!
          </h1>
        </div>

        <TransactionTable />
      </div>
    </div>
  );
}
