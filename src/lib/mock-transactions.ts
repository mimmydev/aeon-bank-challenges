import type { Transaction } from '@/app/types/transaction';

/**
 * Mock Transaction Database
 * Responsibility: Provide sample transaction data for table display
 * Clean Code: Separated data from logic, realistic transaction scenarios
 */
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '2023-08-24T10:30:00Z',
    referenceId: '#834343434342',
    to: 'Bloom Enterprise Sdn Bhd',
    recipient: {
      name: 'Bloom Enterprise Sdn Bhd',
      type: 'company',
      description: 'Recipient references will go here',
    },
    transactionType: 'DuitNow payment',
    amount: 120000,
    currency: 'MYR',
    createdAt: '2023-08-24T10:30:00Z',
  },
  {
    id: '2',
    date: '2023-07-16T14:45:00Z',
    referenceId: '#834343434342',
    to: 'Muhammad Andy Asmawi',
    recipient: {
      name: 'Muhammad Andy Asmawi',
      type: 'individual',
      description: 'Recipient references will go here',
    },
    transactionType: 'DuitNow payment',
    amount: 5481016,
    currency: 'MYR',
    createdAt: '2023-07-16T14:45:00Z',
  },
  {
    id: '3',
    date: '2023-07-12T09:15:00Z',
    referenceId: '#834343434342',
    to: 'Utilities Company Sdn Bhd',
    recipient: {
      name: 'Utilities Company Sdn Bhd',
      type: 'utility',
      description: 'Recipient references will go here',
    },
    transactionType: 'DuitNow payment',
    amount: 10000,
    currency: 'MYR',
    createdAt: '2023-07-12T09:15:00Z',
  },
  {
    id: '4',
    date: '2023-07-05T16:20:00Z',
    referenceId: '#834343434355',
    to: 'Tech Solutions Sdn Bhd',
    recipient: {
      name: 'Tech Solutions Sdn Bhd',
      type: 'company',
      description: 'Monthly subscription payment',
    },
    transactionType: 'DuitNow payment',
    amount: 25000,
    currency: 'MYR',
    createdAt: '2023-07-05T16:20:00Z',
  },
  {
    id: '5',
    date: '2023-06-28T11:30:00Z',
    referenceId: '#834343434366',
    to: 'Sarah Ahmad',
    recipient: {
      name: 'Sarah Ahmad',
      type: 'individual',
      description: 'Personal transfer',
    },
    transactionType: 'DuitNow payment',
    amount: 50000,
    currency: 'MYR',
    createdAt: '2023-06-28T11:30:00Z',
  },
  {
    id: '6',
    date: '2023-06-20T08:45:00Z',
    referenceId: '#834343434377',
    to: 'Internet Provider Sdn Bhd',
    recipient: {
      name: 'Internet Provider Sdn Bhd',
      type: 'utility',
      description: 'Monthly internet bill',
    },
    transactionType: 'DuitNow payment',
    amount: 15900,
    currency: 'MYR',
    createdAt: '2023-06-20T08:45:00Z',
  },
];

/**
 * Get paginated transactions
 * Simulates database pagination for better UX
 */
export function getPaginatedTransactions(
  page: number = 1,
  limit: number = 10
): {
  transactions: Transaction[];
  total: number;
  totalPages: number;
} {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    transactions: MOCK_TRANSACTIONS.slice(startIndex, endIndex),
    total: MOCK_TRANSACTIONS.length,
    totalPages: Math.ceil(MOCK_TRANSACTIONS.length / limit),
  };
}

/**
 * Get transactions by date range
 */
export function getTransactionsByDateRange(
  startDate: Date,
  endDate: Date
): Transaction[] {
  return MOCK_TRANSACTIONS.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
}

/**
 * Format amount from cents to display format
 */
export function formatAmount(
  amountInCents: number,
  currency: string = 'MYR'
): string {
  const amount = amountInCents / 100;

  if (currency === 'MYR') {
    return `RM ${amount.toLocaleString('en-MY', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatTransactionDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
