import React from 'react';
import { CAR_BRANDS, MOTORCYCLE_BRANDS } from '../../data/brands';
import { Brand } from '../../types/vehicle';
import { useApp } from '../../context/AppContext';
import { IonIcon } from './IonIcon';
import { BrandLogo } from './BrandLogo';

interface BrandCarouselProps {
  type: 'car' | 'motorcycle';
  title?: string;
  subtitle?: string;
}

export const BrandCarousel: React.FC<BrandCarouselProps> = ({
  type,
  title,
  subtitle,
}) => {
  const { navigateTo } = useApp();

  const brands: Brand[] =
    type === 'car'
      ? CAR_BRANDS.filter((b) => b.type === 'car' || b.type === 'both')
      : MOTORCYCLE_BRANDS;

  // Duplicate list to create a seamless infinite loop moving RIGHT → LEFT
  const marqueeItems = [...brands, ...brands];

  const displayTitle =
    title || (type === 'car' ? 'Explore Car Brands' : 'Explore Motorcycle Brands');

  const displaySubtitle =
    subtitle ||
    (type === 'car'
      ? `${brands.length} Global Automotive Manufacturers`
      : `${brands.length} Renowned Motorcycle Marques`);

  return (
    <div className="w-full bg-[#070b13] border-t border-b border-slate-800/80 py-4 sm:py-5 overflow-hidden relative select-none">
      {/* Header Info Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 sm:mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span
            className={`w-2 h-2 rounded-full ${
              type === 'car' ? 'bg-blue-500' : 'bg-red-500'
            } animate-pulse`}
          />
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              {displayTitle}
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400">
              {displaySubtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('brands')}
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>View All</span>
          <IonIcon name="arrow-forward-outline" size={13} />
        </button>
      </div>

      {/* Gradient Vignette Masks on Left and Right */}
      <div className="absolute top-12 bottom-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#070b13] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-12 bottom-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#070b13] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track: Moving RIGHT to LEFT with Brand Logos (No container boxes!) */}
      <div className="flex w-max animate-marquee gap-6 sm:gap-8 md:gap-12 py-2 items-center hover:[animation-play-state:paused]">
        {marqueeItems.map((brand, idx) => (
          <button
            key={`${brand.id}-${idx}`}
            onClick={() => navigateTo('brands', null, brand.name)}
            title={`${brand.name} (${brand.origin})`}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer group text-slate-400 hover:text-white transition-all px-2 py-1"
            aria-label={`${brand.name} logo`}
          >
            {/* Clean brand logo without container box */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              <BrandLogo
                brandName={brand.name}
                className="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 text-slate-300 group-hover:text-blue-400"
              />
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-400 group-hover:text-white transition-colors whitespace-nowrap">
              {brand.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
