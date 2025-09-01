'use client';

import { useState, useCallback } from 'react';
import bcrypt from 'bcryptjs';
import {
  LoginStep,
  type LoginState,
  type SecureWordResponse,
  type LoginResponse,
} from '@/app/types/login';
import { LOGIN_CONFIG } from '@/lib/login-constants';

/**
 * Custom hook for managing login flow state
 * Responsibility: Centralized login state management and API calls
 * Clean Code Principles: Single Responsibility, Dependency Inversion
 */
export function useLogin() {
  const [state, setState] = useState<LoginState>({
    username: '',
    secureWord: '',
    password: '',
    currentStep: LoginStep.USERNAME_INPUT,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  });

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const updateUsername = useCallback((username: string) => {
    setState((prev) => ({
      ...prev,
      username: username.trim(),
      error: null,
    }));
  }, []);

  const updatePassword = useCallback((password: string) => {
    setState((prev) => ({
      ...prev,
      password,
      error: null,
    }));
  }, []);

  //** Step 1: Submit username and get secure word
  const submitUsername = useCallback(async () => {
    if (state.username.length < LOGIN_CONFIG.validation.minUsernameLength) {
      setState((prev) => ({
        ...prev,
        error: `Username must be at least ${LOGIN_CONFIG.validation.minUsernameLength} characters long`,
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(LOGIN_CONFIG.api.getSecureWord, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: state.username }),
      });

      const data: SecureWordResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to get secure word');
      }

      setState((prev) => ({
        ...prev,
        secureWord: data.secureWord,
        currentStep: LoginStep.SECURE_WORD_DISPLAY,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : 'Failed to get secure word',
        isLoading: false,
      }));
    }
  }, [state.username]);

  //** Step 2: Proceed to password input
  const proceedToPassword = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: LoginStep.PASSWORD_INPUT,
      error: null,
    }));
  }, []);

  //** Step 3: Submit password with client-side hashing for security
  const submitPassword = useCallback(async () => {
    if (state.password.length < LOGIN_CONFIG.validation.minPasswordLength) {
      setState((prev) => ({
        ...prev,
        error: `Password must be at least ${LOGIN_CONFIG.validation.minPasswordLength} characters long`,
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      //** Hash password on client-side before transmission for security
      //** This prevents plaintext passwords from being visible in network requests
      const hashedPassword = await bcrypt.hash(state.password, 10);

      const response = await fetch(LOGIN_CONFIG.api.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: state.username,
          password: hashedPassword,
          isClientHashed: true, //** Flag to indicate password is already hashed
        }),
      });

      const data: LoginResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      setState((prev) => ({
        ...prev,
        currentStep: LoginStep.LOGIN_SUCCESS,
        isAuthenticated: true,
        isLoading: false,
        //** Clear password from memory for security
        password: '',
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      }));
    }
  }, [state.username, state.password]);

  const resetLogin = useCallback(() => {
    setState({
      username: '',
      secureWord: '',
      password: '',
      currentStep: LoginStep.USERNAME_INPUT,
      isLoading: false,
      error: null,
      isAuthenticated: false,
    });
  }, []);

  return {
    ...state,

    updateUsername,
    updatePassword,
    submitUsername,
    proceedToPassword,
    submitPassword,
    resetLogin,
    clearError,

    canSubmitUsername:
      state.username.length >= LOGIN_CONFIG.validation.minUsernameLength,
    canSubmitPassword:
      state.password.length >= LOGIN_CONFIG.validation.minPasswordLength,
    stepConfig: LOGIN_CONFIG.steps[state.currentStep],
  };
}
