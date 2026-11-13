import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShiftRouteLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="border-t border-neutral-200 bg-white text-black">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-200">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 text-black cursor-pointer self-start"
          >
            <ShiftRouteLogo className="w-5 h-5 text-black" />
            <span className="text-base font-bold tracking-tight">ShiftRoute</span>
          </button>

          <nav className="flex flex-wrap items-center gap-6 text-xs font-medium text-neutral-700">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="hover:text-black cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigateTo('all-cars')}
              className="hover:text-black cursor-pointer"
            >
              All Cars
            </button>
            <button
              type="button"
              onClick={() => navigateTo('brands')}
              className="hover:text-black cursor-pointer"
            >
              Brands
            </button>
            <button
              type="button"
              onClick={() => navigateTo('compare')}
              className="hover:text-black cursor-pointer"
            >
              Compare
            </button>
            <button
              type="button"
              onClick={() => navigateTo('updates')}
              className="hover:text-black cursor-pointer"
            >
              Latest Updates
            </button>
            <button
              type="button"
              onClick={() => navigateTo('about')}
              className="hover:text-black cursor-pointer"
            >
              About
            </button>
          </nav>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-neutral-500">
          <p>
            ShiftRoute is an informational automotive catalog. All prices shown are indicative
            manufacturer reference estimates and may vary by market, location, condition, and model
            year.
          </p>
          <p className="whitespace-nowrap shrink-0">© {new Date().getFullYear()} ShiftRoute</p>
        </div>
      </div>
    </footer>
  );
};
