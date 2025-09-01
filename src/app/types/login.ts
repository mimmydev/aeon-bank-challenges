export interface LoginState {
  username: string;
  secureWord: string;
  password: string;
  currentStep: LoginStep;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export enum LoginStep {
  USERNAME_INPUT = 1,
  SECURE_WORD_DISPLAY = 2,
  PASSWORD_INPUT = 3,
  LOGIN_SUCCESS = 4,
}

export interface SecureWordResponse {
  success: boolean;
  secureWord: string;
  message?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    username: string;
    loginTime: string;
  };
}
