import React from 'react';
import { Home, Radio, Send, FileText, Key, User, Zap } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'channels', label: 'Channels', icon: Radio },
    { id: 'send', label: 'Send Notification', icon: Send },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-neutral-900 flex flex-col shrink-0">
      <div className="p-6 border-b border-neutral-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#6366f1] rounded-lg flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">SignalForge</span>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-[#4F46E5] text-white shadow-sm' 
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-neutral-900">
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <p className="text-xs font-medium text-neutral-400 mb-2">Need help?</p>
          <a 
            href="#" 
            className="text-xs text-[#4F46E5] hover:text-[#6366f1] transition-colors font-medium inline-flex items-center gap-1"
          >
            View Documentation →
          </a>
        </div>
      </div>
    </aside>
  );
}