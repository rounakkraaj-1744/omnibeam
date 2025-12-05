"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Sparkles, ArrowRight } from "lucide-react"

type AuthMode = "login" | "signup"
type AuthMethod = "password" | "magiclink"

export function AuthForm() {
    const [mode, setMode] = useState<AuthMode>("login")
    const [method, setMethod] = useState<AuthMethod>("password")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        console.log({ mode, method, email, password, name })
        setIsLoading(false)
    }

    const handleGoogleAuth = () => {
        console.log("Google auth initiated")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 via-blue-50 to-indigo-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950 p-4">
            <div className="w-full max-w-md">
                {/* Card Container */}
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-zinc-700/50 overflow-hidden">
                    {/* Header with Toggle */}
                    <div className="p-8 pb-6">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg shadow-blue-500/30">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                                Welcome Back
                            </h1>
                            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                                {mode === "login"
                                    ? "Sign in to continue your journey"
                                    : "Create an account to get started"}
                            </p>
                        </div>

                        {/* Mode Toggle */}
                        <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-6">
                            <button
                                onClick={() => setMode("login")}
                                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${mode === "login"
                                        ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-md"
                                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                    }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setMode("signup")}
                                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${mode === "signup"
                                        ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-md"
                                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Google Auth Button */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-12 border-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 group"
                            onClick={handleGoogleAuth}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </Button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-200 dark:border-zinc-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white/80 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Method Toggle (Password / Magic Link) */}
                        <div className="flex gap-2 mb-6">
                            <button
                                onClick={() => setMethod("password")}
                                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${method === "password"
                                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                                    }`}
                            >
                                <Lock className="w-4 h-4 inline mr-1.5" />
                                Password
                            </button>
                            <button
                                onClick={() => setMethod("magiclink")}
                                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${method === "magiclink"
                                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                                    }`}
                            >
                                <Sparkles className="w-4 h-4 inline mr-1.5" />
                                Magic Link
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === "signup" && (
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-zinc-700 dark:text-zinc-300">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required={mode === "signup"}
                                        className="h-12 border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-300">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-12 pl-11 border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {method === "password" && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-zinc-700 dark:text-zinc-300">
                                            Password
                                        </Label>
                                        {mode === "login" && (
                                            <button
                                                type="button"
                                                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                                            >
                                                Forgot?
                                            </button>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required={method === "password"}
                                            className="h-12 pl-11 border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 group"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        {method === "magiclink"
                                            ? "Send Magic Link"
                                            : mode === "login"
                                                ? "Sign In"
                                                : "Create Account"}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-6 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-700">
                        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                            {mode === "login" ? (
                                <>
                                    Don&apos;t have an account?{" "}
                                    <button
                                        onClick={() => setMode("signup")}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
                                    >
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => setMode("login")}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
                                    >
                                        Sign in
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                </div>

                {/* Terms */}
                <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-6">
                    By continuing, you agree to our{" "}
                    <a href="#" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    )
}
