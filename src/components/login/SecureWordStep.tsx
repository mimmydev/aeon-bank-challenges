import { Key } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SecureWordStepProps {
  username: string;
  secureWord: string;
  onNext: () => void;
}

export function SecureWordStep({
  username,
  secureWord,
  onNext,
}: SecureWordStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Key className="mx-auto h-12 w-12 text-green-600" />
      </div>

      <div className="text-center space-y-4">
        <div>
          <h3 className="text-lg font-medium text-foreground">
            Welcome, {username}!
          </h3>
        </div>

        <div className="bg-muted rounded-lg p-4 border">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Your Secure Word:
          </div>
          <div className="text-2xl font-mono font-bold text-primary bg-background rounded px-4 py-2 border">
            {secureWord}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Your secure word has been generated
        </p>
      </div>

      <Button
        onClick={onNext}
        className="w-full py-2 px-4 rounded-md text-sm font-medium"
      >
        Next
      </Button>
    </div>
  );
}
