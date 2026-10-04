import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IonIcon } from './IonIcon';
import { PageRoute } from '../../types/vehicle';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    favorites,
    compareList,
    searchQuery,
    setSearchQuery,
    theme,
    toggleTheme,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [localSearchInput, setLocalSearchInput] = useState(searchQuery);

  const navLinks: { label: string; route: PageRoute; icon: string }[] = [
    { label: 'Home', route: 'home', icon: 'home-outline' },
    { label: 'Cars', route: 'cars', icon: 'car-sport-outline' },
    { label: 'Motorcycles', route: 'motorcycles', icon: 'bicycle-outline' },
    { label: 'Brands', route: 'brands', icon: 'grid-outline' },
    { label: 'Compare', route: 'compare', icon: 'git-compare-outline' },
    { label: 'About', route: 'about', icon: 'information-circle-outline' },
    { label: 'Contact', route: 'contact', icon: 'mail-outline' },
    { label: 'Admin', route: 'admin', icon: 'settings-outline' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchInput.trim()) {
      setSearchQuery(localSearchInput.trim());
      setShowSearchModal(false);
      setMobileMenuOpen(false);
      navigateTo('search');
    }
  };

  const handleNavClick = (route: PageRoute) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0a0e17]/95 backdrop-blur-md border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo Zone */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            aria-label="AutoVista Home"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-blue-500/30 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 group-hover:border-blue-500/60 transition-all">
              <img
                src="/logo.jpg"
                alt="AutoVista Emblem"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if needed
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors font-display">
                Auto<span className="text-blue-500">Vista</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                currentRoute === link.route ||
                (link.route === 'cars' && currentRoute === 'car-details') ||
                (link.route === 'motorcycles' && currentRoute === 'motorcycle-details');

              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer relative ${
                    isActive
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                  {link.route === 'compare' && compareList.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-blue-500 text-white">
                      {compareList.length}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons (Search, Favorites, Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon Trigger */}
            <button
              onClick={() => {
                setLocalSearchInput(searchQuery);
                setShowSearchModal(true);
              }}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Search vehicles"
              aria-label="Search vehicles"
            >
              <IonIcon name="search-outline" size={20} />
            </button>

            {/* Favorites Icon */}
            <button
              onClick={() => handleNavClick('favorites')}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative cursor-pointer ${
                currentRoute === 'favorites'
                  ? 'text-blue-400 bg-blue-500/15'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
              title="Saved Favorites"
              aria-label="Saved Favorites"
            >
              <IonIcon
                name={favorites.length > 0 ? 'heart' : 'heart-outline'}
                size={20}
                className={favorites.length > 0 ? 'text-red-500' : ''}
              />
              {favorites.length > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[17px] h-[17px] px-1 text-[10px] font-bold rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* User Account / Profile */}
            <button
              onClick={() => handleNavClick('profile')}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                currentRoute === 'profile'
                  ? 'text-blue-400 bg-blue-500/15 ring-1 ring-blue-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
              title="User Account"
              aria-label="User Account"
            >
              <IonIcon name="person-outline" size={20} />
            </button>

            {/* Theme Toggle Button (White / Night Mode) */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to White Mode' : 'Switch to Night Mode'}
              aria-label={theme === 'dark' ? 'Switch to White Mode' : 'Switch to Night Mode'}
            >
              <IonIcon
                name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
                size={20}
                className={theme === 'dark' ? 'text-amber-400' : 'text-blue-400'}
              />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer ml-1"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              <IonIcon name={mobileMenuOpen ? 'close-outline' : 'menu-outline'} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-[#0d1322] px-4 pt-3 pb-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  currentRoute === link.route ||
                  (link.route === 'cars' && currentRoute === 'car-details') ||
                  (link.route === 'motorcycles' && currentRoute === 'motorcycle-details');

                return (
                  <button
                    key={link.route}
                    onClick={() => handleNavClick(link.route)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'text-blue-400 bg-blue-500/15 border-l-4 border-blue-500'
                        : 'text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{link.label}</span>
                    <div className="flex items-center gap-2">
                      {link.route === 'compare' && compareList.length > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-600 text-white">
                          {compareList.length} items
                        </span>
                      )}
                      {link.route === 'favorites' && favorites.length > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-slate-300">
                          {favorites.length}
                        </span>
                      )}
                      <IonIcon name="chevron-forward-outline" size={16} className="text-slate-500" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Action in Mobile Menu */}
            <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowSearchModal(true);
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <IonIcon name="search-outline" size={16} />
                <span>Search</span>
              </button>
              <button
                onClick={() => handleNavClick('profile')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <IonIcon name="person-outline" size={16} />
                <span>Profile</span>
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                title={theme === 'dark' ? 'Switch to White Mode' : 'Switch to Night Mode'}
              >
                <IonIcon
                  name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
                  size={16}
                  className={theme === 'dark' ? 'text-amber-400' : 'text-blue-400'}
                />
                <span>{theme === 'dark' ? 'White' : 'Night'}</span>
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors"
              >
                <IonIcon name="settings-outline" size={16} />
                <span>Admin</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl p-4 sm:p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
                <IonIcon name="search-outline" size={18} className="text-blue-400" />
                <span>Search Vehicle Catalog</span>
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <IonIcon name="close-outline" size={20} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Toyota, Mustang, MT-07, Ducati, Electric..."
                  value={localSearchInput}
                  onChange={(e) => setLocalSearchInput(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 pl-11 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <IonIcon name="search-outline" size={18} />
                </div>
                {localSearchInput && (
                  <button
                    type="button"
                    onClick={() => setLocalSearchInput('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    <IonIcon name="close-outline" size={16} />
                  </button>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="text-slate-500">Popular:</span>
                {['Corolla', 'Mustang', 'BMW 3 Series', 'MT-07', 'Ninja', 'Monster', 'Electric'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setLocalSearchInput(term);
                      setSearchQuery(term);
                      setShowSearchModal(false);
                      navigateTo('search');
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <span>Search</span>
                  <IonIcon name="arrow-forward-outline" size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
