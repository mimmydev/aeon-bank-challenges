import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface TransactionTableErrorProps {
  error: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

export function TransactionTableError({
  error,
  onRetry,
  isRetrying = false,
}: TransactionTableErrorProps) {
  return (
    <TableRow>
      <TableCell colSpan={5} className="py-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">
              Unable to load transactions
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">{error}</p>
          </div>
          <Button onClick={onRetry} disabled={isRetrying}>
            <RefreshCw
              className={cn('h-4 w-4', isRetrying && 'animate-spin')}
            />
            <span>{isRetrying ? 'Retrying...' : 'Try Again'}</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
