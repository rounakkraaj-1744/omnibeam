"use client"

import React, { useState, useEffect } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 shrink-0">
        {/* Skeleton or simply empty header to avoid hydration mismatch if critical */}
        <div className="flex items-center gap-4">
          {/* ... content ... */}
        </div>
      </header>
    )
  }

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowProjectMenu(!showProjectMenu)}
            className="flex items-center gap-2 px-3 py-2 bg-secondary border border-border rounded-lg hover:border-input transition-all text-sm font-medium"
          >
            <span className="text-foreground">Production</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showProjectMenu ? 'rotate-180' : ''}`} />
          </button>

          {showProjectMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowProjectMenu(false)}
              />
              <div className="absolute top-full mt-2 left-0 w-48 bg-popover border border-border rounded-lg shadow-xl py-1 z-20">
                <button className="w-full px-4 py-2 text-left text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  Production
                </button>
                <button className="w-full px-4 py-2 text-left text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  Development
                </button>
                <button className="w-full px-4 py-2 text-left text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  Staging
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Profile Icon with dropdown */}
        <ProfileMenu />
      </div>
    </header>
  );
}

// New component for profile handling
function ProfileMenu() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  const user = session?.user;
  const name = user?.name || '';
  const image = user?.image;

  const initials = name
    ? name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
    : 'U';

  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 focus:outline-none"
      >
        {image ? (
          <img src={image} alt="profile" className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {initials}
          </div>
        )}
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showMenu ? 'rotate-180' : ''}`} />
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-xl py-1 z-20">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}