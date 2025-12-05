"use client"

import React from 'react';
import { Home, Radio, Send, FileText, Key, User, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: Home },
    { id: 'channels', label: 'Channels', href: '/dashboard/channels', icon: Radio },
    { id: 'send', label: 'Send Notification', href: '/dashboard/send', icon: Send },
    { id: 'logs', label: 'Logs', href: '/dashboard/logs', icon: FileText },
    { id: 'api-keys', label: 'API Keys', href: '/dashboard/api-keys', icon: Key },
    { id: 'account', label: 'Account', href: '/dashboard/account', icon: User },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-zinc-900 dark:text-white">OmniBeam</span>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Check if current path matches the item href exactly or if it's a subpath (optional, for stricter matching use exact match)
            // For dashboard root, we want exact match mainly, but let's stick to simple logic first.
            const isActive = pathname === item.href;

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-4">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">Need help?</p>
          <a
            href="#"
            className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors font-medium inline-flex items-center gap-1"
          >
            View Documentation →
          </a>
        </div>
      </div>
    </aside>
  );
}