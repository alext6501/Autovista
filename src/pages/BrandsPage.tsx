import React, { useState } from 'react';
import { CAR_BRANDS, MOTORCYCLE_BRANDS } from '../data/brands';
import { VEHICLES_DATA } from '../data/vehicles';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/common/VehicleCard';
import { IonIcon } from '../components/common/IonIcon';
import { VehicleType } from '../types/vehicle';
import { BrandLogo } from '../components/common/BrandLogo';

export const BrandsPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeBrandFilter, setActiveBrandFilter] = useState<{
    brand: string;
    type: VehicleType;
  } | null>(null);

  const handleBrandClick = (brandName: string, type: VehicleType) => {
    setActiveBrandFilter({ brand: brandName, type });
  };

  const brandVehicles = activeBrandFilter
    ? VEHICLES_DATA.filter(
        (v) =>
          v.type === activeBrandFilter.type &&
          v.brand.toLowerCase() === activeBrandFilter.brand.toLowerCase()
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-10 sm:gap-14">
      {/* Page Header */}
      <div className="flex flex-col gap-2 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider w-fit">
          <IonIcon name="ribbon-outline" size={14} />
          <span>Manufacturer Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Global Vehicle <span className="text-blue-500">Brands</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Browse verified vehicle manufacturers, race constructors, and engineering giants. Select any brand emblem to explore their technical lineup.
        </p>
      </div>

      {/* Active Brand Models Section */}
      {activeBrandFilter && (
        <div className="p-6 sm:p-8 rounded-md bg-slate-900/90 border border-blue-500/40 flex flex-col gap-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-slate-950 border border-slate-800 flex items-center justify-center p-2 text-slate-200">
                <BrandLogo brandName={activeBrandFilter.brand} className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {activeBrandFilter.brand} Models in Catalog
                </h2>
                <p className="text-xs text-slate-400">
                  {brandVehicles.length} vehicle{brandVehicles.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveBrandFilter(null)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer px-2.5 py-1.5 rounded-sm hover:bg-slate-800 transition-colors"
            >
              <IonIcon name="close-outline" size={16} />
              <span>Close View</span>
            </button>
          </div>

          {brandVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              No vehicles currently listed under this specific brand in the catalog.
            </p>
          )}
        </div>
      )}

      {/* Car Brands Section */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Car Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Official industry logos of passenger, performance, and luxury car makers.
            </p>
          </div>
          <button
            onClick={() => navigateTo('cars')}
            className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Cars</span>
            <IonIcon name="chevron-forward-outline" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CAR_BRANDS.map((brand) => {
            const count = VEHICLES_DATA.filter(
              (v) => v.type === 'car' && v.brand.toLowerCase() === brand.name.toLowerCase()
            ).length;

            return (
              <div
                key={brand.id}
                className="p-5 rounded-md bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 flex items-center justify-center mb-4 text-slate-300 group-hover:text-blue-400 transition-colors">
                    <BrandLogo
                      brandName={brand.name}
                      className="w-full h-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all"
                    />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {brand.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    <span>{brand.origin}</span>
                    <span>·</span>
                    <span>Est. {brand.founded}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {brand.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    {count} {count === 1 ? 'Model' : 'Models'}
                  </span>
                  <button
                    onClick={() => handleBrandClick(brand.name, 'car')}
                    className="px-3 py-1.5 rounded-sm bg-slate-800/90 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Models</span>
                    <IonIcon name="chevron-forward-outline" size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Motorcycle Brands Section */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Motorcycle Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Championship race constructors and iconic motorcycle factories.
            </p>
          </div>
          <button
            onClick={() => navigateTo('motorcycles')}
            className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Motorcycles</span>
            <IonIcon name="chevron-forward-outline" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {MOTORCYCLE_BRANDS.map((brand) => {
            const count = VEHICLES_DATA.filter(
              (v) => v.type === 'motorcycle' && v.brand.toLowerCase() === brand.name.toLowerCase()
            ).length;

            return (
              <div
                key={brand.id}
                className="p-5 rounded-md bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 flex items-center justify-center mb-4 text-slate-300 group-hover:text-blue-400 transition-colors">
                    <BrandLogo
                      brandName={brand.name}
                      className="w-full h-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all"
                    />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {brand.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    <span>{brand.origin}</span>
                    <span>·</span>
                    <span>Est. {brand.founded}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {brand.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    {count} {count === 1 ? 'Model' : 'Models'}
                  </span>
                  <button
                    onClick={() => handleBrandClick(brand.name, 'motorcycle')}
                    className="px-3 py-1.5 rounded-sm bg-slate-800/90 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Models</span>
                    <IonIcon name="chevron-forward-outline" size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
