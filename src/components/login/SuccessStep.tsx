import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessStepProps {
  username: string;
  onContinue: () => void;
}

export function SuccessStep({ username, onContinue }: SuccessStepProps) {
  return (
    <div className="space-y-6 text-center">
      <div>
        <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">
          Login Successful!
        </h3>
        <p className="text-sm text-muted-foreground">
          Welcome back, <span className="font-bold">{username}</span>!
          <br />
          You have been successfully logged in.
        </p>
      </div>

      <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-800 dark:text-green-200">
            Authentication completed securely
          </span>
        </div>
        <p className="text-xs text-green-700 dark:text-green-300 mt-1">
          Your credentials were validated securely on the server
        </p>
      </div>

      <Button onClick={onContinue}>Continue to Dashboard</Button>
    </div>
  );
}
