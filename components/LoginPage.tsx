import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Zap } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#6366f1] rounded-2xl mb-6 shadow-lg shadow-[#4F46E5]/20">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-semibold mb-3 text-neutral-100">Welcome to SignalForge</h1>
          <p className="text-base text-neutral-400">Multi-channel notifications made simple</p>
        </div>

        <div className="bg-[#111111] border border-neutral-900 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-neutral-700 bg-[#0a0a0a] text-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-0"
                />
                <span className="text-neutral-400 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-[#4F46E5] hover:text-[#6366f1] transition-colors font-medium">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full mt-6">
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-[#111111] text-neutral-500 font-medium">Or continue with</span>
              </div>
            </div>

            <Button variant="ghost" className="w-full mt-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-[#4F46E5] hover:text-[#6366f1] transition-colors font-medium">
              Sign up
            </a>
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-neutral-600">
          By signing in, you agree to our{' '}
          <a href="#" className="text-neutral-500 hover:text-neutral-400 transition-colors underline underline-offset-2">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-neutral-500 hover:text-neutral-400 transition-colors underline underline-offset-2">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}