import { forwardRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SearchInputProps } from '@/app/types';
import { Input } from '@/components/ui/input';

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = 'Search...', className, hideIcon = false }, ref) => {
    return (
      <div className={cn('relative', className)}>
        {!hideIcon && (
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        )}
        <Input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={cn(
            'w-[80vw] lg:w-full rounded-md border border-Input bg-background py-2 text-sm',
            'placeholder:text-muted-foreground',
            'focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring',
            'transition-colors duration-200',
            hideIcon ? 'px-3' : 'px-10'
          )}
          aria-label="Search"
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
