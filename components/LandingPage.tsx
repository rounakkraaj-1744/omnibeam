import React from 'react';
import { Mail, MessageSquare, Bell, Smartphone, Zap, BarChart3, Key, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-900 sticky top-0 bg-white dark:bg-zinc-950/80 backdrop-blur-lg z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[indigo-500] to-[indigo-400] rounded-lg flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">OmniBeam</span>
          </div>
          <nav className="flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:text-zinc-200 transition-colors">Features</a>
            <a href="#docs" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:text-zinc-200 transition-colors">Docs</a>
            <a href="#pricing" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:text-zinc-200 transition-colors">Pricing</a>
            <Button variant="ghost" size="sm" onClick={onGetStarted}>
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8">
            <Zap className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium text-indigo-500">Now in Public Beta</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent leading-tight">
            Send notifications across Email, Slack, Push & SMS with a single API
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            OmniBeam is a multi-channel notification platform that routes your messages through Email, Slack, Push Notifications, and SMS with programmable retries and real-time delivery tracking.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" onClick={onGetStarted}>
              Get Started
            </Button>
            <Button variant="ghost" size="lg">
              View Docs
            </Button>
          </div>

          {/* Illustration */}
          <div className="mt-20 relative">
            <div className="bg-gradient-to-b from-[#111111] to-[#0a0a0a] border border-zinc-900 rounded-2xl p-10 shadow-2xl">
              <div className="flex items-center justify-center gap-12 flex-wrap">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-10 h-10 text-indigo-500" />
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">API</span>
                </div>

                <div className="hidden md:block flex-1 max-w-xs h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="text-xs font-medium text-zinc-500">Email</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-purple-400" />
                    </div>
                    <span className="text-xs font-medium text-zinc-500">Slack</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center">
                      <Bell className="w-8 h-8 text-amber-400" />
                    </div>
                    <span className="text-xs font-medium text-zinc-500">Push</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-8 h-8 text-emerald-400" />
                    </div>
                    <span className="text-xs font-medium text-zinc-500">SMS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Built for developers</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">Everything you need to send notifications at scale</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-900 rounded-xl p-6 hover:border-zinc-200 dark:border-zinc-800 transition-all">
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
              <Radio className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="mb-2 text-zinc-900 dark:text-zinc-100">Multi-Channel Support</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Send notifications through Email, Slack, Push, and SMS from a single unified API endpoint.
            </p>
          </div>

          <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-900 rounded-xl p-6 hover:border-zinc-200 dark:border-zinc-800 transition-all">
            <div className="w-12 h-12 bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6 text-[#10B981]" />
            </div>
            <h3 className="mb-2 text-zinc-900 dark:text-zinc-100">Programmable Retries</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Automatic retry logic with exponential backoff ensures your critical notifications get delivered.
            </p>
          </div>

          <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-900 rounded-xl p-6 hover:border-zinc-200 dark:border-zinc-800 transition-all">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="mb-2 text-zinc-900 dark:text-zinc-100">Real-time Delivery Logs</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Track every notification with detailed logs, provider responses, and delivery status in real-time.
            </p>
          </div>

          <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-900 rounded-xl p-6 hover:border-zinc-200 dark:border-zinc-800 transition-all">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="mb-2 text-zinc-900 dark:text-zinc-100">Unified API Keys</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Manage all your notification channels with a single API key. Simple, secure, and developer-friendly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-br from-[indigo-500]/10 to-[#10B981]/10 border border-indigo-500/20 rounded-2xl p-12 text-center">
          <h2 className="mb-4 text-zinc-900 dark:text-zinc-100">Ready to get started?</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            Join thousands of developers using OmniBeam to power their notification infrastructure.
          </p>
          <Button size="lg" onClick={onGetStarted}>
            Start Building Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-[indigo-500] to-[indigo-400] rounded-md flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-zinc-600 dark:text-zinc-400">OmniBeam</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-300 transition-colors">Docs</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-300 transition-colors">GitHub</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-300 transition-colors">Privacy</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-300 transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-900 text-center">
            <p className="text-sm text-neutral-600">© 2025 OmniBeam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Radio(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M4.93 4.93a10 10 0 0 1 14.14 0" />
      <path d="M4.93 19.07a10 10 0 0 0 14.14 0" />
      <path d="M8.05 8.05a6 6 0 0 1 7.9 0" />
      <path d="M8.05 15.95a6 6 0 0 0 7.9 0" />
    </svg>
  );
}