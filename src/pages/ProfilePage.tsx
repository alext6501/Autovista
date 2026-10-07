import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IonIcon } from '../components/common/IonIcon';

export const ProfilePage: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    favorites,
    compareList,
    viewedVehicles,
    navigateTo,
    showToast,
    theme,
    toggleTheme,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings'>('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [emailInput, setEmailInput] = useState(userProfile.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: nameInput,
      email: emailInput,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    showToast('Logged out of demo session');
    navigateTo('home');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex flex-col gap-8">
      
      {/* Page Title */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          My Account
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-400">
          Manage your personal vehicle research preferences and activity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar (Desktop) / Nav Tabs (Mobile) (4 cols) */}
        <div className="lg:col-span-4 bg-[#0f172a] border border-slate-800 rounded-md p-5 sm:p-6 flex flex-col gap-6">
          
          {/* User Mini Avatar Lockup */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-800 border-2 border-blue-500/40 shrink-0">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="truncate">
              <h2 className="text-base font-bold text-white truncate">
                {userProfile.name}
              </h2>
              <p className="text-xs text-slate-400 truncate">{userProfile.email}</p>
              <span className="inline-block mt-1 text-[11px] text-blue-400 font-medium">
                Member since {userProfile.joinedDate}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold transition-colors cursor-pointer text-left ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <IonIcon name="grid-outline" size={18} />
                <span>Dashboard</span>
              </div>
              <IonIcon name="chevron-forward-outline" size={14} className="opacity-60" />
            </button>

            <button
              onClick={() => navigateTo('favorites')}
              className="flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <IonIcon name="heart-outline" size={18} />
                <span>Favorites</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300">
                {favorites.length}
              </span>
            </button>

            <button
              onClick={() => navigateTo('compare')}
              className="flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <IonIcon name="git-compare-outline" size={18} />
                <span>Compare</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300">
                {compareList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold transition-colors cursor-pointer text-left ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <IonIcon name="settings-outline" size={18} />
                <span>Settings</span>
              </div>
              <IonIcon name="chevron-forward-outline" size={14} className="opacity-60" />
            </button>

            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <IonIcon name="speedometer-outline" size={18} />
                <span>Admin & Cost Manager</span>
              </div>
              <IonIcon name="chevron-forward-outline" size={14} className="opacity-60" />
            </button>

            <div className="pt-4 border-t border-slate-800 mt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer text-left"
              >
                <IonIcon name="log-out-outline" size={18} />
                <span>Logout Session</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Content Area (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {activeTab === 'dashboard' ? (
            <>
              {/* Profile Details Card */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-md p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    My Profile
                  </h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">
                        Full Name
                      </span>
                      <span className="mt-1 block text-base font-bold text-white">
                        {userProfile.name}
                      </span>
                    </div>

                    <div>
                      <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">
                        Email
                      </span>
                      <span className="mt-1 block text-base font-bold text-white">
                        {userProfile.email}
                      </span>
                    </div>

                    <div>
                      <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">
                        Joined
                      </span>
                      <span className="mt-1 block text-base font-bold text-white">
                        {userProfile.joinedDate}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Your Activity Statistics */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-md p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white tracking-tight mb-6">
                  Your Activity
                </h3>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-md bg-slate-900/80 border border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      Favorites
                    </span>
                    <span className="mt-2 text-2xl sm:text-3xl font-extrabold text-blue-400 tabular-nums block">
                      {favorites.length}
                    </span>
                  </div>

                  <div className="p-4 rounded-md bg-slate-900/80 border border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      Viewed
                    </span>
                    <span className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tabular-nums block">
                      {viewedVehicles.length}
                    </span>
                  </div>

                  <div className="p-4 rounded-md bg-slate-900/80 border border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      Compare
                    </span>
                    <span className="mt-2 text-2xl sm:text-3xl font-extrabold text-blue-400 tabular-nums block">
                      {compareList.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-md p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white tracking-tight mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => navigateTo('favorites')}
                    className="p-4 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all flex flex-col items-center text-center group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <IonIcon name="heart-outline" size={20} />
                    </div>
                    <span className="text-sm font-bold text-white">View Favorites</span>
                    <span className="text-xs text-slate-400 mt-1">{favorites.length} saved models</span>
                  </button>

                  <button
                    onClick={() => navigateTo('compare')}
                    className="p-4 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all flex flex-col items-center text-center group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <IonIcon name="git-compare-outline" size={20} />
                    </div>
                    <span className="text-sm font-bold text-white">Compare Vehicles</span>
                    <span className="text-xs text-slate-400 mt-1">Side by side analysis</span>
                  </button>

                  <button
                    onClick={() => navigateTo('brands')}
                    className="p-4 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all flex flex-col items-center text-center group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <IonIcon name="grid-outline" size={20} />
                    </div>
                    <span className="text-sm font-bold text-white">Browse Brands</span>
                    <span className="text-xs text-slate-400 mt-1">Explore all manufacturers</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Settings Tab */
            <div className="bg-[#0f172a] border border-slate-800 rounded-md p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight pb-4 border-b border-slate-800">
                Display & Unit Preferences
              </h3>

              <div className="space-y-6">
                {/* Theme Mode Toggle */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white">Theme Mode</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Switch between White Mode (bright light canvas) and Night Mode (dark automotive styling).
                    </p>
                  </div>
                  <div className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800">
                    <button
                      onClick={theme === 'dark' ? undefined : toggleTheme}
                      className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 ${
                        theme === 'dark' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <IonIcon name="moon-outline" size={14} />
                      <span>Night</span>
                    </button>
                    <button
                      onClick={theme === 'light' ? undefined : toggleTheme}
                      className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 ${
                        theme === 'light' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <IonIcon name="sunny-outline" size={14} />
                      <span>White</span>
                    </button>
                  </div>
                </div>

                {/* Measurement Units */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">System of Units</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Toggle between US Customary (HP, MPH, MPG, LBS) and Metric units.
                    </p>
                  </div>
                  <div className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800">
                    <button
                      onClick={() => updateUserProfile({ useMetric: false })}
                      className={`px-3 py-1.5 text-xs font-semibold rounded ${
                        !userProfile.useMetric ? 'bg-blue-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Imperial
                    </button>
                    <button
                      onClick={() => updateUserProfile({ useMetric: true })}
                      className={`px-3 py-1.5 text-xs font-semibold rounded ${
                        userProfile.useMetric ? 'bg-blue-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Metric
                    </button>
                  </div>
                </div>

                {/* Preferred Currency */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white">Reference Currency</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Select which currency symbol to display for reference manufacturer MSRPs.
                    </p>
                  </div>
                  <select
                    value={userProfile.currency}
                    onChange={(e) => updateUserProfile({ currency: e.target.value as any })}
                    className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold text-white focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
