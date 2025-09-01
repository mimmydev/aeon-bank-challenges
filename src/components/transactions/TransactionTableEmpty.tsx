import { Receipt } from 'lucide-react';
import { TableRow, TableCell } from '@/components/ui/table';

export function TransactionTableEmpty() {
  return (
    <TableRow>
      <TableCell colSpan={5} className="py-12 text-center">
        <div className="flex flex-col items-center space-y-3">
          <Receipt className="h-12 w-12 text-muted-foreground" />
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-foreground">
              No transactions found
            </h3>
            <p className="text-sm text-muted-foreground">
              Your transaction history will appear here once you make payments.
            </p>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
