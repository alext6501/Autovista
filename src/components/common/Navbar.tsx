import React, { useState, useRef, useEffect } from 'react';
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
    isLoggedIn,
    userProfile,
    userLogout,
    setAuthModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [localSearchInput, setLocalSearchInput] = useState(searchQuery);

  // Dropdown states for Cars, Motorcycles, and User profile
  const [carsDropdownOpen, setCarsDropdownOpen] = useState(false);
  const [bikesDropdownOpen, setBikesDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Mobile drawer sub-accordions
  const [mobileCarsOpen, setMobileCarsOpen] = useState(false);
  const [mobileBikesOpen, setMobileBikesOpen] = useState(false);

  const carsDropdownRef = useRef<HTMLDivElement>(null);
  const bikesDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (carsDropdownRef.current && !carsDropdownRef.current.contains(e.target as Node)) {
        setCarsDropdownOpen(false);
      }
      if (bikesDropdownRef.current && !bikesDropdownRef.current.contains(e.target as Node)) {
        setBikesDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const carOptions = [
    { label: 'All Cars', category: null, icon: 'car-sport-outline' },
    { label: 'Sedans', category: 'Sedan', icon: 'car-outline' },
    { label: 'Sports & Coupes', category: 'Coupe', icon: 'flame-outline' },
    { label: 'SUVs & Crossovers', category: 'SUV', icon: 'compass-outline' },
    { label: 'Electric & Hybrids', category: 'Electric', icon: 'flash-outline' },
    { label: 'Trucks & Utility', category: 'Truck', icon: 'cube-outline' },
  ];

  const bikeOptions = [
    { label: 'All Motorcycles', category: null, icon: 'bicycle-outline' },
    { label: 'Sport & Superbikes', category: 'Sport', icon: 'speedometer-outline' },
    { label: 'Naked & Hyper Nakeds', category: 'Naked', icon: 'flash-outline' },
    { label: 'Cruisers & Heritage', category: 'Cruiser', icon: 'shield-outline' },
    { label: 'Adventure & Touring', category: 'Adventure', icon: 'map-outline' },
  ];

  const navLinks: { label: string; route: PageRoute; icon: string }[] = [
    { label: 'Home', route: 'home', icon: 'home-outline' },
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

  const handleNavClick = (route: PageRoute, category: string | null = null) => {
    navigateTo(route, null, null, category);
    setMobileMenuOpen(false);
    setCarsDropdownOpen(false);
    setBikesDropdownOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0a0e17]/95 backdrop-blur-md border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo Zone - Returned emblem logo, clean reduced border radius */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            aria-label="VeyroMotors Home"
          >
            <img
              src="/logo.jpg"
              alt="VeyroMotors Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-md group-hover:scale-105 transition-transform"
            />
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors font-display">
              Veyro<span className="text-blue-500">Motors</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {/* Home Link */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer relative ${
                currentRoute === 'home'
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
              {currentRoute === 'home' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>

            {/* Cars with Dropdown Options */}
            <div className="relative" ref={carsDropdownRef}>
              <button
                onClick={() => setCarsDropdownOpen(!carsDropdownOpen)}
                onMouseEnter={() => setCarsDropdownOpen(true)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  currentRoute === 'cars' || currentRoute === 'car-details'
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>Cars</span>
                <IonIcon
                  name="chevron-down-outline"
                  size={13}
                  className={`transition-transform duration-200 ${carsDropdownOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'}`}
                />
              </button>

              {carsDropdownOpen && (
                <div
                  onMouseLeave={() => setCarsDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-52 bg-[#0f172a] border border-slate-700/80 rounded-lg shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    Car Categories
                  </div>
                  {carOptions.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleNavClick('cars', opt.category)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md text-slate-200 hover:text-white hover:bg-blue-600/20 hover:text-blue-400 transition-colors text-left cursor-pointer"
                    >
                      <IonIcon name={opt.icon} size={15} className="text-blue-400" />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Motorcycles with Dropdown Options */}
            <div className="relative" ref={bikesDropdownRef}>
              <button
                onClick={() => setBikesDropdownOpen(!bikesDropdownOpen)}
                onMouseEnter={() => setBikesDropdownOpen(true)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  currentRoute === 'motorcycles' || currentRoute === 'motorcycle-details'
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>Motorcycles</span>
                <IonIcon
                  name="chevron-down-outline"
                  size={13}
                  className={`transition-transform duration-200 ${bikesDropdownOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'}`}
                />
              </button>

              {bikesDropdownOpen && (
                <div
                  onMouseLeave={() => setBikesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-56 bg-[#0f172a] border border-slate-700/80 rounded-lg shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    Motorcycle Classes
                  </div>
                  {bikeOptions.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleNavClick('motorcycles', opt.category)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md text-slate-200 hover:text-white hover:bg-blue-600/20 hover:text-blue-400 transition-colors text-left cursor-pointer"
                    >
                      <IonIcon name={opt.icon} size={15} className="text-blue-400" />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining standard links */}
            {navLinks.slice(1).map((link) => {
              const isActive = currentRoute === link.route;

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

          {/* Right Action Icons & Login/Logout State */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Icon Trigger */}
            <button
              onClick={() => {
                setLocalSearchInput(searchQuery);
                setShowSearchModal(true);
              }}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Search vehicles"
              aria-label="Search vehicles"
            >
              <IonIcon name="search-outline" size={19} />
            </button>

            {/* Favorites Icon */}
            <button
              onClick={() => handleNavClick('favorites')}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors relative cursor-pointer ${
                currentRoute === 'favorites'
                  ? 'text-blue-400 bg-blue-500/15'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
              title="Saved Favorites"
              aria-label="Saved Favorites"
            >
              <IonIcon
                name={favorites.length > 0 ? 'heart' : 'heart-outline'}
                size={19}
                className={favorites.length > 0 ? 'text-red-500' : ''}
              />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-[16px] px-1 text-[9px] font-bold rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Theme Toggle Button (White / Night Mode) */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to White Mode' : 'Switch to Night Mode'}
              aria-label={theme === 'dark' ? 'Switch to White Mode' : 'Switch to Night Mode'}
            >
              <IonIcon
                name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
                size={19}
                className={theme === 'dark' ? 'text-amber-400' : 'text-blue-400'}
              />
            </button>

            {/* LOGIN / LOGOUT USER CASE */}
            {isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold">
                    {userProfile.avatar ? (
                      <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
                    ) : (
                      userProfile.name.charAt(0)
                    )}
                  </div>
                  <span className="hidden sm:inline max-w-[80px] truncate">{userProfile.name.split(' ')[0]}</span>
                  <IonIcon name="chevron-down-outline" size={12} className="text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-[#0f172a] border border-slate-700 rounded-lg shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-800 mb-1">
                      <div className="text-xs font-bold text-white truncate">{userProfile.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{userProfile.email}</div>
                    </div>
                    <button
                      onClick={() => handleNavClick('profile')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 rounded-md transition-colors text-left cursor-pointer"
                    >
                      <IonIcon name="person-outline" size={15} className="text-blue-400" />
                      <span>User Profile</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('favorites')}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 rounded-md transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <IonIcon name="heart-outline" size={15} className="text-red-400" />
                        <span>Saved Favorites</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {favorites.length}
                      </span>
                    </button>
                    <button
                      onClick={() => handleNavClick('compare')}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 rounded-md transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <IonIcon name="git-compare-outline" size={15} className="text-blue-400" />
                        <span>Compare Garage</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {compareList.length}
                      </span>
                    </button>
                    <div className="my-1 border-t border-slate-800" />
                    <button
                      onClick={() => {
                        userLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors text-left cursor-pointer"
                    >
                      <IonIcon name="log-out-outline" size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
              >
                <IonIcon name="log-in-outline" size={15} />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer ml-0.5"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              <IonIcon name={mobileMenuOpen ? 'close-outline' : 'menu-outline'} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-[#0d1322] px-4 pt-3 pb-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              
              {/* Home */}
              <button
                onClick={() => handleNavClick('home')}
                className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                  currentRoute === 'home' ? 'text-blue-400 bg-blue-500/15' : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>Home</span>
              </button>

              {/* Cars with Mobile Sub-Accordion */}
              <div>
                <button
                  onClick={() => setMobileCarsOpen(!mobileCarsOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
                >
                  <span className={currentRoute === 'cars' ? 'text-blue-400' : ''}>Cars</span>
                  <IonIcon
                    name="chevron-down-outline"
                    size={16}
                    className={`transition-transform duration-200 ${mobileCarsOpen ? 'rotate-180 text-blue-400' : 'text-slate-500'}`}
                  />
                </button>
                {mobileCarsOpen && (
                  <div className="pl-6 pr-2 py-1 space-y-1 bg-slate-900/60 rounded-xl my-1">
                    {carOptions.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleNavClick('cars', opt.category)}
                        className="w-full flex items-center gap-2 py-2 px-3 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 text-left"
                      >
                        <IonIcon name={opt.icon} size={14} className="text-blue-400" />
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Motorcycles with Mobile Sub-Accordion */}
              <div>
                <button
                  onClick={() => setMobileBikesOpen(!mobileBikesOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
                >
                  <span className={currentRoute === 'motorcycles' ? 'text-blue-400' : ''}>Motorcycles</span>
                  <IonIcon
                    name="chevron-down-outline"
                    size={16}
                    className={`transition-transform duration-200 ${mobileBikesOpen ? 'rotate-180 text-blue-400' : 'text-slate-500'}`}
                  />
                </button>
                {mobileBikesOpen && (
                  <div className="pl-6 pr-2 py-1 space-y-1 bg-slate-900/60 rounded-xl my-1">
                    {bikeOptions.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleNavClick('motorcycles', opt.category)}
                        className="w-full flex items-center gap-2 py-2 px-3 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 text-left"
                      >
                        <IonIcon name={opt.icon} size={14} className="text-blue-400" />
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands, Compare, About, Contact, Admin */}
              {navLinks.slice(1).map((link) => {
                const isActive = currentRoute === link.route;

                return (
                  <button
                    key={link.route}
                    onClick={() => handleNavClick(link.route)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'text-blue-400 bg-blue-500/15'
                        : 'text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.route === 'compare' && compareList.length > 0 && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-600 text-white">
                        {compareList.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Auth Button */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              {isLoggedIn ? (
                <div className="w-full flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400">Signed in as </span>
                    <strong className="text-white">{userProfile.name}</strong>
                  </div>
                  <button
                    onClick={() => {
                      userLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold text-center shadow-md shadow-blue-600/30"
                >
                  Sign In to VeyroMotors
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-[#0f172a] border border-slate-700 rounded-lg shadow-2xl p-4 sm:p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
                <IonIcon name="search-outline" size={18} className="text-blue-400" />
                <span>Quick Search VeyroMotors</span>
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-slate-400 hover:text-white"
                aria-label="Close"
              >
                <IonIcon name="close-outline" size={20} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={localSearchInput}
                  onChange={(e) => setLocalSearchInput(e.target.value)}
                  placeholder="Search model, brand, or category (e.g. Mustang, BMW, Electric, Ninja)..."
                  autoFocus
                  className="w-full px-4 py-3 pl-11 bg-slate-900 border border-slate-700 rounded-md text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <IonIcon name="search-outline" size={18} />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span>Popular:</span>
                  {['Corolla', 'Mustang', 'BMW', 'MT-07', 'Ducati'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setLocalSearchInput(tag);
                        setSearchQuery(tag);
                        setShowSearchModal(false);
                        navigateTo('search');
                      }}
                      className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
