'use client';

import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useLogin } from '@/app/hooks/useLogin';
import { useAuth } from '@/contexts/AuthContext';
import { LoginStep } from '@/app/types/login';
import { UsernameStep } from './UsernameStep';
import { SecureWordStep } from './SecureWordStep';
import { PasswordStep } from './PasswordStep';
import { SuccessStep } from './SuccessStep';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    username,
    password,
    secureWord,
    currentStep,
    isLoading,
    error,
    stepConfig,

    updateUsername,
    updatePassword,
    submitUsername,
    proceedToPassword,
    submitPassword,
    resetLogin,
    clearError,

    canSubmitUsername,
    canSubmitPassword,
  } = useLogin();

  const handleLoginSuccess = () => {
    login({
      username,
      loginTime: new Date().toISOString(),
    });

    router.push('/dashboard');
  };

  const handleGoBack = () => {
    if (currentStep === LoginStep.SECURE_WORD_DISPLAY) {
      resetLogin();
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case LoginStep.USERNAME_INPUT:
        return (
          <UsernameStep
            username={username}
            isLoading={isLoading}
            canSubmit={canSubmitUsername}
            onUsernameChange={updateUsername}
            onSubmit={submitUsername}
          />
        );

      case LoginStep.SECURE_WORD_DISPLAY:
        return (
          <SecureWordStep
            username={username}
            secureWord={secureWord}
            onNext={proceedToPassword}
          />
        );

      case LoginStep.PASSWORD_INPUT:
        return (
          <PasswordStep
            username={username}
            password={password}
            isLoading={isLoading}
            canSubmit={canSubmitPassword}
            onPasswordChange={updatePassword}
            onSubmit={submitPassword}
          />
        );

      case LoginStep.LOGIN_SUCCESS:
        return (
          <SuccessStep username={username} onContinue={handleLoginSuccess} />
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          {stepConfig.title}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          {stepConfig.description}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of 4
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round((currentStep / 4) * 100)}%
          </span>
        </div>
        <Progress value={(currentStep / 4) * 100} />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">Error</p>
              <p className="text-sm text-destructive/80 mt-1">{error}</p>
            </div>
            <Button onClick={clearError} aria-label="Close error">
              ×
            </Button>
          </div>
        </div>
      )}

      <div className="bg-card rounded-lg border p-6 shadow-sm">
        {currentStep === LoginStep.SECURE_WORD_DISPLAY && (
          <Button variant="secondary" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4" />
            <span>Back to username</span>
          </Button>
        )}

        {renderCurrentStep()}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          Your credentials are validated securely on the server
        </p>
      </div>
    </div>
  );
}
