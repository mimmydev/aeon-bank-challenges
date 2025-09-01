import { formatAmount, formatTransactionDate } from '@/lib/mock-transactions';
import { TableRow, TableCell } from '@/components/ui/table';
import type { TransactionRowProps } from '@/app/types/transaction';

export function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {formatTransactionDate(transaction.date)}
      </TableCell>

      <TableCell className="font-mono text-primary">
        {transaction.referenceId}
      </TableCell>

      <TableCell>
        <div className="space-y-1">
          <div className="font-medium">{transaction.to}</div>
          {transaction.recipient?.description && (
            <div className="text-xs text-muted-foreground">
              {transaction.recipient.description}
            </div>
          )}
        </div>
      </TableCell>

      <TableCell className="text-muted-foreground">
        {transaction.transactionType}
      </TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end space-x-2">
          <span className="text-black tex-bold">
            {formatAmount(transaction.amount, transaction.currency)}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}
