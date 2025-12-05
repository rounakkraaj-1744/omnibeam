import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function DashboardLayout({
  children,
  currentPage,
  onNavigate,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-950">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-white dark:bg-zinc-950">
          {children}
        </main>
      </div>
    </div>
  );
}
