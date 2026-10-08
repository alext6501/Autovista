import React from 'react';
import { CAR_BRANDS } from '../../data/brands';
import { useApp } from '../../context/AppContext';
import { IonIcon } from './IonIcon';
import { BrandLogo } from './BrandLogo';

export const CarBrandsMarquee: React.FC = () => {
  const { navigateTo } = useApp();

  // Strictly CAR industry brands only
  const carBrandsOnly = CAR_BRANDS.filter((b) => b.type === 'car' || b.type === 'both');

  // Duplicate for seamless 100% infinite continuous uninterrupted flow
  const marqueeItems = [...carBrandsOnly, ...carBrandsOnly];

  return (
    <div className="w-full bg-[#05080f] border-t border-b border-slate-800/80 py-3.5 sm:py-4 overflow-hidden relative select-none">
      
      {/* Top Header Label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2.5 sm:mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
            Automotive Marque Logos ({carBrandsOnly.length} Manufacturers)
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
      <div className="absolute top-10 bottom-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#05080f] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-10 bottom-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#05080f] to-transparent z-10 pointer-events-none" />

      {/* Flowing Marquee Track - Strictly Car Brand Logos Without Container Boxes */}
      <div className="flex w-max animate-marquee gap-6 sm:gap-8 md:gap-12 py-1.5 items-center">
        {marqueeItems.map((brand, idx) => (
          <button
            key={`${brand.id}-${idx}`}
            onClick={() => navigateTo('brands', null, brand.name)}
            title={brand.name}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer group text-slate-400 hover:text-white transition-all px-2 py-1"
            aria-label={`${brand.name} logo`}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
              <BrandLogo
                brandName={brand.name}
                className="w-full h-full object-contain filter grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 text-slate-300 group-hover:text-white"
              />
            </div>
            <span className="text-xs font-semibold tracking-wider text-slate-400 group-hover:text-white transition-colors whitespace-nowrap uppercase font-mono">
              {brand.name}
            </span>
          </button>
        ))}
      </div>

    </div>
  );
};
