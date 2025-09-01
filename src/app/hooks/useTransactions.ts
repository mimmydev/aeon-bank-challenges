'use client';

import { useState, useCallback, useEffect } from 'react';
import type {
  Transaction,
  TransactionHistoryResponse,
} from '@/app/types/transaction';

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface UseTransactionsReturn extends TransactionState {
  fetchTransactions: (page?: number, limit?: number) => Promise<void>;
  refreshTransactions: () => Promise<void>;
  clearError: () => void;

  hasTransactions: boolean;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Custom hook for managing transaction data
 * Responsibility: Handle transaction fetching, pagination, and state management
 * Clean Code Principles: Single Responsibility, Dependency Inversion
 */
export function useTransactions(): UseTransactionsReturn {
  const [state, setState] = useState<TransactionState>({
    transactions: [],
    isLoading: true,
    error: null,
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
  });

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const fetchTransactions = useCallback(async (page = 1, limit = 10) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(
        `/api/transaction-history?page=${page}&limit=${limit}&sortBy=date&sortOrder=desc`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TransactionHistoryResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch transactions');
      }

      setState((prev) => ({
        ...prev,
        transactions: data.data,
        pagination: data.pagination || prev.pagination,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to load transaction history';

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        transactions: [],
      }));
    }
  }, []);

  const refreshTransactions = useCallback(async () => {
    await fetchTransactions(state.pagination.page, state.pagination.limit);
  }, [fetchTransactions, state.pagination.page, state.pagination.limit]);

  useEffect(() => {
    fetchTransactions(1, 10);
  }, [fetchTransactions]);

  const hasTransactions = state.transactions.length > 0;
  const hasNextPage = state.pagination.page < state.pagination.totalPages;
  const hasPrevPage = state.pagination.page > 1;

  return {
    transactions: state.transactions,
    isLoading: state.isLoading,
    error: state.error,
    pagination: state.pagination,

    fetchTransactions,
    refreshTransactions,
    clearError,

    hasTransactions,
    hasNextPage,
    hasPrevPage,
  };
}
