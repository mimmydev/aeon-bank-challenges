import { LoginStep } from '../app/types/login';

export const LOGIN_CONFIG = {
  steps: {
    [LoginStep.USERNAME_INPUT]: {
      title: 'Enter Username',
      description: 'Please enter your username to continue',
    },
    [LoginStep.SECURE_WORD_DISPLAY]: {
      title: 'Secure Word Received',
      description: 'Your secure word has been generated',
    },
    [LoginStep.PASSWORD_INPUT]: {
      title: 'Enter Password',
      description: 'Please enter your password to complete login',
    },
    [LoginStep.LOGIN_SUCCESS]: {
      title: 'Login Successful',
      description: 'You have been successfully logged in',
    },
  },
  api: {
    getSecureWord: '/api/getSecureWord',
    login: '/api/login',
  },
  validation: {
    minUsernameLength: 3,
    minPasswordLength: 6,
  },
} as const;
