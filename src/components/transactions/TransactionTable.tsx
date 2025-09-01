'use client';

import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTransactions } from '@/app/hooks/useTransactions';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TransactionRow } from './TransactionRow';
import { TransactionTableSkeleton } from './TransactionTableSkeleton';
import { TransactionTableEmpty } from './TransactionTableEmpty';
import { TransactionTableError } from './TransactionTableError';
import type { TransactionTableProps } from '@/app/types/transaction';
import { Button } from '@/components/ui/button';

export function TransactionTable({ className }: TransactionTableProps) {
  const {
    transactions,
    isLoading,
    error,
    pagination,
    fetchTransactions,
    refreshTransactions,
    clearError,
    hasTransactions,
  } = useTransactions();

  const handleRetry = () => {
    clearError();
    refreshTransactions();
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Transaction History
          </h2>
          <p className="text-sm text-muted-foreground">
            {pagination.total > 0
              ? `Showing ${transactions.length} of ${pagination.total} transactions`
              : 'Your recent transaction activity'}
          </p>
        </div>

        <Button onClick={refreshTransactions} disabled={isLoading}>
          <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
          <span>Refresh</span>
        </Button>
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Reference ID</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Transaction Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && !error && <TransactionTableSkeleton rows={5} />}

            {error && !isLoading && (
              <TransactionTableError
                error={error}
                onRetry={handleRetry}
                isRetrying={isLoading}
              />
            )}

            {!isLoading && !error && !hasTransactions && (
              <TransactionTableEmpty />
            )}

            {!isLoading &&
              !error &&
              hasTransactions &&
              transactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
          </TableBody>
        </Table>
      </div>

      {hasTransactions && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={() => fetchTransactions(pagination.page - 1)}
              disabled={isLoading || pagination.page === 1}
            >
              Previous
            </Button>

            <Button
              onClick={() => fetchTransactions(pagination.page + 1)}
              disabled={isLoading || pagination.page >= pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
