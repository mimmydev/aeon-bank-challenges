'use client';

import { useEffect, useState, useRef } from 'react';
import { X, Search } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { MobileMenuProps } from '@/app/types';
import { NAVBAR_CONFIG } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/common/SearchInput';

export function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const collapseSearch = () => {
    setIsSearchExpanded(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isSearchExpanded) {
          collapseSearch();
        } else {
          onClose();
        }
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchExpanded &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        collapseSearch();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isSearchExpanded, onClose]);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-full bg-background shadow-lg',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div
          className="flex items-center justify-between border-b px-4 py-3"
          ref={searchContainerRef}
        >
          {!isSearchExpanded ? (
            <>
              <Link
                href="/"
                className="text-xl font-semibold text-primary"
                onClick={onClose}
              >
                {NAVBAR_CONFIG.brand}
              </Link>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={toggleSearch}
                  aria-label="Open search"
                >
                  <Search className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={onClose}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 mr-2">
                <SearchInput
                  ref={searchInputRef}
                  placeholder={NAVBAR_CONFIG.searchPlaceholder}
                  className="w-full"
                  hideIcon={true}
                />
              </div>
              <Button variant="ghost" onClick={onClose} aria-label="Close menu">
                <X className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        <nav className="px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-md px-3 py-2 text-base font-medium transition-colors',
                    'text-foreground hover:bg-accent hover:text-accent-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-ring'
                  )}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/login"
                className={cn(
                  'block rounded-md bg-primary px-3 py-2 text-center text-base font-medium',
                  'text-primary-foreground transition-colors',
                  'hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring'
                )}
                onClick={onClose}
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
