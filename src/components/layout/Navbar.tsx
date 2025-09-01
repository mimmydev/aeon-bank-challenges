'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useNavbar } from '@/app/hooks/useNavbar';
import { SearchInput } from '@/components/common/SearchInput';
import { MobileMenu } from './MobileMenu';
import { NAVBAR_CONFIG } from '@/lib/constants';
import type { NavbarProps } from '@/app/types';
import { Button } from '@/components/ui/button';

export function Navbar({ className }: NavbarProps) {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useNavbar();

  return (
    <>
      <header
        className={cn(
          'border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          className
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="text-xl font-semibold text-primary transition-colors hover:text-primary/80"
            >
              {NAVBAR_CONFIG.brand}
            </Link>

            <nav className="hidden lg:flex lg:items-center lg:space-x-8">
              {NAVBAR_CONFIG.menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    'text-muted-foreground hover:text-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <SearchInput
                placeholder={NAVBAR_CONFIG.searchPlaceholder}
                className="w-64"
              />
              <Link
                href="/login"
                className={cn(
                  'rounded-md bg-primary px-4 py-2 text-sm font-medium',
                  'text-primary-foreground transition-colors',
                  'hover:bg-primary/90',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                )}
              >
                Login
              </Link>
            </div>

            <div className="lg:hidden">
              {!isMobileMenuOpen && (
                <Button
                  variant="ghost"
                  onClick={toggleMobileMenu}
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        menuItems={NAVBAR_CONFIG.menuItems}
      />
    </>
  );
}
