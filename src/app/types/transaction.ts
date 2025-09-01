export interface Transaction {
  id: string;
  date: string;
  referenceId: string;
  to: string;
  recipient?: {
    name: string;
    type: 'company' | 'individual' | 'utility';
    description?: string;
  };
  transactionType: string;
  amount: number; //** in cents to avoid floating point issues
  currency: string;
  status?: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

export interface TransactionHistoryResponse {
  success: boolean;
  data: Transaction[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
}

export interface TransactionTableProps {
  className?: string;
}

export interface TransactionRowProps {
  transaction: Transaction;
}
