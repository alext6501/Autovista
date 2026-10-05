import React from 'react';
import { CAR_BRANDS } from '../../data/brands';
import { useApp } from '../../context/AppContext';
import { IonIcon } from './IonIcon';

export const CarBrandsMarquee: React.FC = () => {
  const { navigateTo } = useApp();

  // Strictly CAR brands only
  const carBrandsOnly = CAR_BRANDS.filter((b) => b.type === 'car' || b.type === 'both');

  // Duplicate for seamless 100% infinite continuous uninterrupted flow
  const marqueeItems = [...carBrandsOnly, ...carBrandsOnly];

  return (
    <div className="w-full bg-[#05080f] border-t border-b border-slate-800/80 py-4 overflow-hidden relative select-none">
      
      {/* Top Header Label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Automotive Brands ({carBrandsOnly.length} Manufacturers)
          </span>
        </div>
        <button
          onClick={() => navigateTo('brands')}
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>All Brands</span>
          <IonIcon name="arrow-forward-outline" size={13} />
        </button>
      </div>

      {/* Gradient fade edge masks */}
      <div className="absolute top-10 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#05080f] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-10 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#05080f] to-transparent z-10 pointer-events-none" />

      {/* Flowing Marquee Track - Strictly Car Brand / Company Logos Only, Reduced Border Radius */}
      <div className="flex w-max animate-marquee gap-3 sm:gap-4 py-1">
        {marqueeItems.map((brand, idx) => (
          <button
            key={`${brand.id}-${idx}`}
            onClick={() => navigateTo('brands', null, brand.name)}
            title={brand.name}
            className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/60 transition-all shrink-0 cursor-pointer shadow-sm group p-2.5"
            aria-label={brand.name}
          >
            <div className="w-full h-full rounded-sm overflow-hidden flex items-center justify-center bg-slate-950/60 p-1">
              <img
                src={brand.logo}
                alt={brand.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain group-hover:scale-115 transition-transform duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </button>
        ))}
      </div>

    </div>
  );
};
