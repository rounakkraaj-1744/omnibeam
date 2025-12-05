"use client"

import React, { useState, useEffect } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Navbar() {
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="h-16 bg-white dark:bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 shrink-0">
        {/* Skeleton or simply empty header to avoid hydration mismatch if critical */}
        <div className="flex items-center gap-4">
          {/* ... content ... */}
        </div>
      </header>
    )
  }

  return (
    <header className="h-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowProjectMenu(!showProjectMenu)}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-sm font-medium"
          >
            <span className="text-zinc-700 dark:text-zinc-700 dark:text-zinc-300">Production</span>
            <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${showProjectMenu ? 'rotate-180' : ''}`} />
          </button>

          {showProjectMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowProjectMenu(false)}
              />
              <div className="absolute top-full mt-2 left-0 w-48 bg-white dark:bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl py-1 z-20">
                <button className="w-full px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  Production
                </button>
                <button className="w-full px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  Development
                </button>
                <button className="w-full px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
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
          className="p-2 text-zinc-500 dark:text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-100 dark:bg-zinc-900 rounded-lg transition-all"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-zinc-950 transition-all">
          <span className="text-white text-sm font-semibold">JD</span>
        </div>
      </div>
    </header>
  );
}