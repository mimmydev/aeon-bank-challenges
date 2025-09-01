import { TableRow, TableCell } from '@/components/ui/table';

interface TransactionTableSkeletonProps {
  rows?: number;
}

export function TransactionTableSkeleton({
  rows = 5,
}: TransactionTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="h-4 bg-muted rounded animate-pulse" />
          </TableCell>
          <TableCell>
            <div className="h-4 bg-muted rounded animate-pulse" />
          </TableCell>
          <TableCell>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
            </div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-muted rounded animate-pulse" />
          </TableCell>
          <TableCell className="text-right">
            <div className="h-4 bg-muted rounded animate-pulse ml-auto w-24" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
