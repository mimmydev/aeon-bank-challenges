'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from './Navbar';
import { AuthenticatedNavbar } from './AuthenticatedNavbar';

/**
 * Conditional Navbar Component
 * Responsibility: Show different navbar based on authentication status
 * Implements Challenge requirement: "Navbar should be cleared once login"
 */
export function ConditionalNavbar() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <AuthenticatedNavbar />;
  }

  return <Navbar />;
}
