import { FormEvent, useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PasswordStepProps {
  username: string;
  password: string;
  isLoading: boolean;
  canSubmit: boolean;
  onPasswordChange: (password: string) => void;
  onSubmit: () => void;
}

export function PasswordStep({
  username,
  password,
  isLoading,
  canSubmit,
  onPasswordChange,
  onSubmit,
}: PasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (canSubmit && !isLoading) {
      onSubmit();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Lock className="mx-auto h-12 w-12 text-primary" />
      </div>

      <div className="text-center">
        <h3 className="text-lg font-medium text-foreground">Enter Password</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Hi {username}, please enter your password to complete login
        </p>
      </div>

      <div onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
                autoFocus
              />
              <Button
                type="button"
                onClick={togglePasswordVisibility}
                variant="link"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-black"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Password is transmitted securely over HTTPS
            </p>
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!canSubmit || isLoading}
            className="w-full py-2 px-4 rounded-md text-sm font-medium"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </div>
    </div>
  );
}
