import { useState, useCallback } from 'react';
import type { UseNavbarReturn } from '@/app/types';

/**
 * Custom hook for managing navbar state
 * Follows SRP: Single responsibility of managing navbar UI state
 */
export function useNavbar(): UseNavbarReturn {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  };
}
