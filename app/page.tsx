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
import { AccountPage } from '@/components/AccountPage';

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
      {currentPage === 'account' && <AccountPage />}
    </DashboardLayout>
  );
}
