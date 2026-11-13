import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POPULAR_BRANDS } from '../data/brands';
import { BrandLogo } from '../components/common/BrandLogo';

export const BrandsPage: React.FC = () => {
  const { vehicles, navigateTo } = useApp();

  return (
    <div className="bg-white text-black py-8">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-neutral-200">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
            Automotive Brands
          </h1>
          <p className="mt-1.5 text-sm text-neutral-600">
            Select a manufacturer to filter cars, inspect technical sheets, and compare models.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-neutral-200">
          {POPULAR_BRANDS.map((brand) => {
            const count = vehicles.filter(
              (v) => v.brand.toLowerCase() === brand.name.toLowerCase()
            ).length;

            return (
              <div
                key={brand.id}
                onClick={() => navigateTo('all-cars', { brand: brand.name, search: '' })}
                className="border-r border-b border-neutral-200 p-5 bg-white hover:bg-neutral-50 transition-colors flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="h-12 flex items-center justify-between mb-4">
                    <BrandLogo brandName={brand.name} className="w-12 h-8 text-black" />
                    <span className="text-[11px] font-medium text-neutral-500 tabular-nums">
                      Est. {brand.founded}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-black">{brand.name}</h2>
                  <div className="text-[11px] text-neutral-500 mt-0.5 mb-3">
                    {brand.origin} · {brand.headquarters}
                  </div>

                  <p className="text-xs text-neutral-700 leading-relaxed mb-4">
                    {brand.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-semibold text-black">
                  <span className="tabular-nums">
                    {count} {count === 1 ? 'Model' : 'Models'}
                  </span>
                  <span className="inline-flex items-center gap-1 group-hover:underline">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
