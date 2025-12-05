"use client"

import React, { useState, useEffect } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { LoginPage } from '@/components/LoginPage';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DashboardHome } from '@/components/DashboardHome';
import { ChannelsPage } from '@/components/ChannelsPage';
import { SendNotificationPage } from '@/components/SendNotificationPage';
import { LogsPage } from '@/components/LogsPage';
import { APIKeysPage } from '@/components/APIKeysPage';

type AppView = 'landing' | 'login' | 'dashboard';
type DashboardPage = 'dashboard' | 'channels' | 'send' | 'logs' | 'api-keys' | 'account';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentPage, setCurrentPage] = useState<DashboardPage>('dashboard');

  const handleGetStarted = () => {
    setCurrentView('login');
  };

  const handleLogin = () => {
    setCurrentView('dashboard');
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as DashboardPage);
  };

  if (currentView === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
    >
      {currentPage === 'dashboard' && <DashboardHome />}
      {currentPage === 'channels' && <ChannelsPage />}
      {currentPage === 'send' && <SendNotificationPage />}
      {currentPage === 'logs' && <LogsPage />}
      {currentPage === 'api-keys' && <APIKeysPage />}
      {currentPage === 'account' && (
        <div className="p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-neutral-100">Account Settings</h1>
            <p className="text-neutral-400">Manage your account preferences</p>
          </div>
          <div className="max-w-2xl">
            <div className="bg-[#111111] border border-neutral-900 rounded-xl p-8 text-center">
              <p className="text-neutral-400">Account settings coming soon...</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
