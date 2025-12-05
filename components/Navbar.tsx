import React, { useState } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export function Navbar({ theme, onThemeToggle }: NavbarProps) {
  const [showProjectMenu, setShowProjectMenu] = useState(false);

  return (
    <header className="h-16 bg-[#0a0a0a] border-b border-neutral-900 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowProjectMenu(!showProjectMenu)}
            className="flex items-center gap-2 px-3 py-2 bg-[#111111] border border-neutral-800 rounded-lg hover:border-neutral-700 transition-all text-sm font-medium"
          >
            <span className="text-neutral-300">Production</span>
            <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${showProjectMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showProjectMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowProjectMenu(false)}
              />
              <div className="absolute top-full mt-2 left-0 w-48 bg-[#111111] border border-neutral-800 rounded-lg shadow-xl py-1 z-20">
                <button className="w-full px-4 py-2 text-left text-sm font-medium text-neutral-300 hover:bg-neutral-900 transition-colors">
                  Production
                </button>
                <button className="w-full px-4 py-2 text-left text-sm font-medium text-neutral-300 hover:bg-neutral-900 transition-colors">
                  Development
                </button>
                <button className="w-full px-4 py-2 text-left text-sm font-medium text-neutral-300 hover:bg-neutral-900 transition-colors">
                  Staging
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onThemeToggle}
          className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 rounded-lg transition-all"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-9 h-9 bg-gradient-to-br from-[#4F46E5] to-[#6366f1] rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#4F46E5] hover:ring-offset-2 hover:ring-offset-[#0a0a0a] transition-all">
          <span className="text-white text-sm font-semibold">JD</span>
        </div>
      </div>
    </header>
  );
}