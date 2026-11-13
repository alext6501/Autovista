import React, { useState } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ShiftRouteLogo } from './BrandLogo';
import { PageRoute } from '../../types/vehicle';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    compareList,
    isSearchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearchInput, setHeaderSearchInput] = useState(searchQuery);

  const navItems: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'All Cars', route: 'all-cars' },
    { label: 'Brands', route: 'brands' },
    { label: 'Compare', route: 'compare' },
    { label: 'About', route: 'about' }
  ];

  const isRouteActive = (route: PageRoute) => {
    if (route === 'all-cars' && currentRoute === 'car-details') return true;
    return currentRoute === route;
  };

  const handleHeaderSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(headerSearchInput.trim());
    navigateTo('all-cars', { search: headerSearchInput.trim(), brand: null });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-neutral-200">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Left: ShiftRoute Logo & Brand Name */}
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2.5 text-black cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-black"
        >
          <ShiftRouteLogo className="w-7 h-7 text-black" />
          <span className="text-[20px] font-bold tracking-tight text-black whitespace-nowrap">
            ShiftRoute
          </span>
        </button>

        {/* Center: Primary Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8"
        >
          {navItems.map((item) => {
            const active = isRouteActive(item.route);
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => navigateTo(item.route)}
                className={`relative py-5 text-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  active
                    ? 'font-semibold text-black'
                    : 'font-medium text-neutral-700 hover:text-black'
                }`}
              >
                {item.label}
                {item.route === 'compare' && compareList.length > 0 && (
                  <span className="ml-1 text-xs font-semibold tabular-nums text-neutral-500">
                    ({compareList.length})
                  </span>
                )}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-black"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Search Icon | Divider | User/Profile Icon */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => {
              setHeaderSearchInput(searchQuery);
              setSearchOpen(!isSearchOpen);
            }}
            aria-label="Search cars"
            className="p-1.5 text-black hover:text-neutral-600 transition-colors cursor-pointer"
          >
            <Search className="w-[18px] h-[18px]" strokeWidth={2} />
          </button>

          <span aria-hidden="true" className="h-5 w-px bg-neutral-300" />

          <button
            type="button"
            onClick={() => navigateTo('profile')}
            aria-label="Saved vehicles and profile"
            className={`p-1.5 transition-colors cursor-pointer ${
              currentRoute === 'profile' ? 'text-black' : 'text-black hover:text-neutral-600'
            }`}
          >
            <User className="w-[18px] h-[18px]" strokeWidth={2} fill="currentColor" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-1.5 text-black hover:text-neutral-600 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Header Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-neutral-200 bg-white">
          <form
            onSubmit={handleHeaderSearchSubmit}
            className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-0"
          >
            <div className="flex-1 flex items-center border border-neutral-300 bg-white px-3 h-10">
              <Search className="w-4 h-4 text-neutral-500 mr-2.5 shrink-0" />
              <input
                type="text"
                value={headerSearchInput}
                onChange={(e) => setHeaderSearchInput(e.target.value)}
                placeholder="Search by brand, car model, engine, or fuel type..."
                autoFocus
                className="w-full text-sm text-black placeholder-neutral-500 bg-transparent focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 h-10 text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="border border-l-0 border-neutral-300 h-10 px-3 text-black hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <nav className="px-4 py-3 flex flex-col divide-y divide-neutral-200">
            {navItems.map((item) => {
              const active = isRouteActive(item.route);
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => {
                    navigateTo(item.route);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-3 text-left text-sm flex items-center justify-between cursor-pointer ${
                    active ? 'font-bold text-black' : 'font-medium text-neutral-700'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.route === 'compare' && compareList.length > 0 && (
                    <span className="text-xs font-semibold tabular-nums text-neutral-500">
                      {compareList.length} selected
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
