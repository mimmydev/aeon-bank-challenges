import { FormEvent } from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UsernameStepProps {
  username: string;
  isLoading: boolean;
  canSubmit: boolean;
  onUsernameChange: (username: string) => void;
  onSubmit: () => void;
}

export function UsernameStep({
  username,
  isLoading,
  canSubmit,
  onUsernameChange,
  onSubmit,
}: UsernameStepProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (canSubmit && !isLoading) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <User className="mx-auto h-12 w-12 text-primary" />
      </div>

      <div onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              placeholder="Enter your username"
              disabled={isLoading}
              className={cn(
                'w-full px-3 py-2 border rounded-md text-sm',
                'border-Input bg-background text-foreground',
                'placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'transition-colors'
              )}
              autoComplete="username"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!canSubmit || isLoading}
            className="w-full py-2 px-4 rounded-md text-sm font-medium"
          >
            {isLoading ? 'Getting Secure Word...' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
