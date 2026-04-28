import React, { useState } from "react";
import { Leaf, Mail, Lock, User as UserIcon, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthView = 'login' | 'register' | 'forgot_password' | 'reset_sent';

export function Auth() {
  const [view, setView] = useState<AuthView>('login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (view === 'forgot_password') {
      setView('reset_sent');
      return;
    }
    // In a real app, this would connect to Firebase or another auth provider
    alert(view === 'login' ? "Signing in..." : "Creating account...");
  };

  if (view === 'reset_sent') {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md bg-white border rounded-2xl shadow-xl overflow-hidden p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-500 mb-8">
            We've sent a password reset link to your email address. Please check your inbox and spam folder.
          </p>
          <Button onClick={() => setView('login')} className="w-full h-12 text-base bg-green-600 hover:bg-green-700">
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-4rem)] bg-transparent">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-500/20 p-3 rounded-full text-emerald-400 border border-emerald-500/30">
              <Leaf className="h-8 w-8" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            {view === 'login' && "Welcome back"}
            {view === 'register' && "Create an account"}
            {view === 'forgot_password' && "Reset your password"}
          </h2>
          <p className="text-center text-slate-400 mb-8">
            {view === 'login' && "Enter your details to access your account."}
            {view === 'register' && "Join CannaHub to discover and review strains."}
            {view === 'forgot_password' && "Enter your email and we'll send you a reset link."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {view === 'register' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-sm font-medium text-slate-300">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input required placeholder="John Doe" className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500" />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                <Input required type="email" placeholder="you@example.com" className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500" />
              </div>
            </div>

            {view !== 'forgot_password' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-300">Password</label>
                  {view === 'login' && (
                    <button 
                      type="button"
                      onClick={() => setView('forgot_password')} 
                      className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                  <Input required type="password" placeholder="••••••••" className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500" />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-base bg-emerald-600 hover:bg-emerald-700 text-white border-none mt-6">
              {view === 'login' && "Sign In"}
              {view === 'register' && "Create Account"}
              {view === 'forgot_password' && "Send Reset Link"}
              {view !== 'forgot_password' && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          {view === 'forgot_password' ? (
            <div className="mt-8 text-center">
              <button 
                onClick={() => setView('login')} 
                className="text-sm font-medium text-slate-400 hover:text-emerald-400 flex items-center justify-center gap-2 w-full transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Sign In
              </button>
            </div>
          ) : (
            <>
              <div className="mt-6 flex items-center justify-center space-x-2">
                <span className="h-px w-full bg-white/10"></span>
                <span className="text-xs text-slate-500 uppercase font-medium">Or continue with</span>
                <span className="h-px w-full bg-white/10"></span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 font-medium bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="h-12 font-medium bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.56.04 2.87.74 3.65 1.9-3.13 1.86-2.57 6.11.45 7.36-.71 1.71-1.62 3.2-2.77 4.67zm-3.21-14.1c-.13-1.69 1.14-3.32 2.88-3.56.29 1.83-1.26 3.56-2.88 3.56z" />
                  </svg>
                  Apple
                </Button>
              </div>
            </>
          )}
        </div>
        
        {view !== 'forgot_password' && (
          <div className="bg-white/5 backdrop-blur-md p-6 text-center border-t border-white/10">
            <p className="text-sm text-slate-400">
              {view === 'login' ? "Don't have an account?" : "Already have an account?"}{" "}
              <button 
                onClick={() => setView(view === 'login' ? 'register' : 'login')} 
                className="font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
              >
                {view === 'login' ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
