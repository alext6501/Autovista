import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAR_BRANDS, MOTORCYCLE_BRANDS } from '../data/brands';
import { VEHICLES_DATA } from '../data/vehicles';
import { IonIcon } from '../components/common/IonIcon';
import { VehicleCard } from '../components/common/VehicleCard';

export const BrandsPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeBrandFilter, setActiveBrandFilter] = useState<string | null>(null);

  // If a brand is clicked to inspect in-page
  const brandVehicles = activeBrandFilter
    ? VEHICLES_DATA.filter(
        (v) => v.brand.toLowerCase() === activeBrandFilter.toLowerCase()
      )
    : [];

  const handleBrandClick = (brandName: string, vehicleType: 'car' | 'motorcycle' | 'both') => {
    setActiveBrandFilter(brandName);
    // Smooth scroll to the results section
    const elem = document.getElementById('brand-results');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex flex-col gap-10 sm:gap-14">
      
      {/* Page Header */}
      <div className="flex flex-col gap-2 pb-6 border-b border-slate-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Our Brands
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Explore vehicles from the world's top automotive and motorcycle manufacturers.
        </p>
      </div>

      {/* Top Brand Circles Quick Selector */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2">
        {[...CAR_BRANDS.slice(0, 5), ...MOTORCYCLE_BRANDS.slice(0, 4)].map((brand) => (
          <button
            key={brand.id}
            onClick={() => handleBrandClick(brand.name, brand.type)}
            className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-slate-900 border-2 transition-all duration-200 overflow-hidden flex items-center justify-center ${
              activeBrandFilter === brand.name
                ? 'border-blue-500 scale-105 shadow-lg shadow-blue-500/20'
                : 'border-slate-800 group-hover:border-slate-700'
            }`}>
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="text-xs font-semibold text-slate-300 group-hover:text-blue-400 transition-colors">
              {brand.name}
            </span>
          </button>
        ))}
      </div>

      {/* In-page Brand Results (when brand selected) */}
      {activeBrandFilter && (
        <div id="brand-results" className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#0a0e17] border border-blue-500/30">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
                Brand Models
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {activeBrandFilter} Catalog ({brandVehicles.length} Models)
              </h2>
            </div>
            <button
              onClick={() => setActiveBrandFilter(null)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
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
              Leading passenger, performance, and luxury car makers.
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
                className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center p-1 mb-4">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover rounded-full"
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
                    className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
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
                className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center p-1 mb-4">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover rounded-full"
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
                    className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
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
