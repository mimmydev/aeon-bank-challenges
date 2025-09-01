'use client';

import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import type { NavbarProps } from '@/app/types';
import { Button } from '@/components/ui/button';

export function AuthenticatedNavbar({ className }: NavbarProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header
      className={cn(
        'border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/dashboard"
            className="text-xl font-semibold text-primary transition-colors hover:text-primary/80"
          >
            AEON Dashboard
          </Link>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">Welcome, {user?.username}</span>
            </div>

            <Button onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
