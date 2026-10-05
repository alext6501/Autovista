import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IonIcon } from './IonIcon';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setAuthModalOpen, userLogin } = useApp();
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('autovista2026');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email.trim()) {
      setAuthError('Please enter your email address.');
      return;
    }
    const success = userLogin(email, password);
    if (!success) {
      setAuthError('Authentication failed. Please check credentials.');
    }
  };

  const handleQuickDemoUser = () => {
    setEmail('alex@example.com');
    setPassword('autovista2026');
    userLogin('alex@example.com', 'autovista2026');
  };

  const handleQuickDemoAdmin = () => {
    setEmail('admin@autovista.com');
    setPassword('autovista2026');
    userLogin('admin@autovista.com', 'autovista2026');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0f172a] border border-slate-700/80 rounded-lg p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <IonIcon name="close-outline" size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-md bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-3 shadow-lg shadow-blue-500/10">
            <IonIcon name="person-outline" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight font-display">
            Welcome to VeyroMotors
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Sign in to synchronize saved favorites, comparison lists, and access catalog tools.
          </p>
        </div>

        {authError && (
          <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-medium">
            {authError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 pl-10 bg-slate-900 border border-slate-700 rounded-md text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <IonIcon name="mail-outline" size={16} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 pl-10 pr-10 bg-slate-900 border border-slate-700 rounded-md text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <IonIcon name="lock-closed-outline" size={16} />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <IonIcon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={16} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In</span>
            <IonIcon name="arrow-forward-outline" size={16} />
          </button>
        </form>

        {/* 1-Click Quick Demo Sign-in */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5 text-center">
            Or Sign In With 1-Click:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickDemoUser}
              className="py-2 px-3 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <IonIcon name="person-circle-outline" size={16} className="text-blue-400" />
              <span>User (Alex)</span>
            </button>
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="py-2 px-3 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <IonIcon name="shield-checkmark-outline" size={16} className="text-emerald-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
