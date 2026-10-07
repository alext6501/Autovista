import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HERO_DUO_IMAGE } from '../data/vehicles';
import { VehicleCard } from '../components/common/VehicleCard';
import { IonIcon } from '../components/common/IonIcon';
import { VehicleType } from '../types/vehicle';
import { MovingCarHeroBackground } from '../components/home/MovingCarHeroBackground';
import { BrandLogo } from '../components/common/BrandLogo';

export const HomePage: React.FC = () => {
  const { navigateTo, vehicles } = useApp();
  const [featuredTab, setFeaturedTab] = useState<VehicleType>('car');
  const [heroImg, setHeroImg] = useState(HERO_DUO_IMAGE);

  // Featured vehicles filtered by tab
  const featuredVehicles = vehicles.filter(
    (v) => v.type === featuredTab && v.isFeatured
  ).slice(0, 3);

  // Popular cars (4 models)
  const popularCars = vehicles.filter(
    (v) => v.type === 'car' && v.isPopular
  ).slice(0, 4);

  // Popular motorcycles (4 models)
  const popularMotorcycles = vehicles.filter(
    (v) => v.type === 'motorcycle' && v.isPopular
  ).slice(0, 4);

  // Models with reduced reference costs
  const reducedCostVehicles = vehicles.filter(
    (v) => v.originalCost && v.originalCost > v.cost
  ).slice(0, 3);

  // Top industry brands for quick emblem selection
  const topBrands = [
    { name: 'Toyota', type: 'car' as const },
    { name: 'Honda', type: 'car' as const },
    { name: 'Ford', type: 'car' as const },
    { name: 'BMW', type: 'car' as const },
    { name: 'Mercedes-Benz', type: 'car' as const },
    { name: 'Porsche', type: 'car' as const },
    { name: 'Tesla', type: 'car' as const },
    { name: 'Audi', type: 'car' as const },
  ];

  return (
    <div className="w-full flex flex-col gap-10 sm:gap-16 pb-16">
      
      {/* 1. Large Hero Section with Real Car Moving On Highway Background */}
      <section className="relative w-full overflow-hidden pt-8 sm:pt-14 pb-16 border-b border-slate-800/60 bg-[#0a0e17]">
        {/* Real highway car moving background */}
        <MovingCarHeroBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-6 z-10 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                VeyroMotors Official Catalog
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
                Explore Every <span className="text-blue-500">Ride.</span>
              </h1>

              <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl leading-relaxed">
                Discover cars and motorcycles, compare their technical specifications, and explore manufacturer costs with authentic data on VeyroMotors.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => navigateTo('cars')}
                  className="px-5 sm:px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Vehicles</span>
                  <IonIcon name="arrow-forward-outline" size={18} />
                </button>

                <button
                  onClick={() => navigateTo('about')}
                  className="px-5 sm:px-6 py-3 rounded-md bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm sm:text-base transition-colors flex items-center gap-2 cursor-pointer backdrop-blur-md"
                >
                  <span>Learn More</span>
                </button>
              </div>

              {/* Sub-features count */}
              <div className="mt-8 pt-5 border-t border-slate-800/80 w-full grid grid-cols-3 gap-3 sm:gap-4 text-left">
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-white tabular-nums">32+</span>
                  <span className="text-[11px] sm:text-xs text-slate-400">Curated Models</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-white tabular-nums">30+</span>
                  <span className="text-[11px] sm:text-xs text-slate-400">Industry Brands</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-white tabular-nums">100%</span>
                  <span className="text-[11px] sm:text-xs text-slate-400">Neutral Showcase</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-6 relative">
              <div 
                onClick={() => navigateTo('cars')}
                className="relative rounded-md overflow-hidden border border-slate-700/80 shadow-2xl shadow-blue-900/20 group cursor-pointer"
              >
                <img
                  src={heroImg}
                  alt="VeyroMotors car and motorcycle showcase"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImg('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80')}
                  className="w-full h-auto aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17]/95 via-[#0a0e17]/25 to-transparent pointer-events-none" />
                
                {/* Floating Showcase Badges */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-sm bg-blue-600/90 backdrop-blur-md text-white font-bold text-xs shadow-lg flex items-center gap-1.5">
                    <IonIcon name="sparkles-outline" size={13} />
                    <span>2024–2026 Showcase</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-sm bg-slate-900/90 backdrop-blur-md text-slate-300 font-semibold text-xs border border-slate-700/60">
                    Cars & Bikes
                  </span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-slate-200 bg-slate-900/95 backdrop-blur-md px-3.5 py-2.5 rounded-sm border border-slate-700/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-sm bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <IonIcon name="car-sport-outline" size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs sm:text-sm">Explore High-Performance Showcase</div>
                      <div className="text-[11px] text-slate-400">Click to browse 32+ verified models & specs</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-blue-400 font-semibold text-xs group-hover:translate-x-0.5 transition-transform">
                    <span>View</span>
                    <IonIcon name="arrow-forward-outline" size={14} />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Featured Vehicles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Vehicles
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Hand-selected highlight models with outstanding engineering and design.
            </p>
          </div>

          {/* Segmented Cars / Motorcycles Switch */}
          <div className="flex items-center p-1 rounded-sm bg-slate-900 border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setFeaturedTab('car')}
              className={`px-3.5 py-1.5 text-sm font-semibold rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
                featuredTab === 'car'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <IonIcon name="car-sport-outline" size={16} />
              <span>Cars</span>
            </button>
            <button
              onClick={() => setFeaturedTab('motorcycle')}
              className={`px-3.5 py-1.5 text-sm font-semibold rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
                featuredTab === 'motorcycle'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <IonIcon name="bicycle-outline" size={16} />
              <span>Motorcycles</span>
            </button>
          </div>
        </div>

        {/* Featured Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* 3. Four Core Value Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <div className="p-4 sm:p-5 rounded-md bg-[#0f172a] border border-slate-800/80 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-sm bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2.5">
              <IonIcon name="car-sport-outline" size={22} />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">Wide Selection</h3>
            <p className="mt-1 text-xs text-slate-400">Cars & Motorcycles</p>
          </div>

          <div className="p-4 sm:p-5 rounded-md bg-[#0f172a] border border-slate-800/80 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-sm bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2.5">
              <IonIcon name="speedometer-outline" size={22} />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">Detailed Specs</h3>
            <p className="mt-1 text-xs text-slate-400">Full information</p>
          </div>

          <div className="p-4 sm:p-5 rounded-md bg-[#0f172a] border border-slate-800/80 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-sm bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2.5">
              <IonIcon name="flash-outline" size={22} />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">Latest Models</h3>
            <p className="mt-1 text-xs text-slate-400">Up to date</p>
          </div>

          <div className="p-4 sm:p-5 rounded-md bg-[#0f172a] border border-slate-800/80 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-sm bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2.5">
              <IonIcon name="search-outline" size={22} />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">Easy Search</h3>
            <p className="mt-1 text-xs text-slate-400">Find what you need</p>
          </div>
        </div>
      </section>

      {/* 3.5. Cost Reduced Models Showcase */}
      {reducedCostVehicles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <IonIcon name="trending-down-outline" size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Recent Cost Reductions
                  </h2>
                  <span className="px-2 py-0.5 rounded-sm text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                    Price Drops
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  Models with adjusted manufacturer reference costs and lower baseline MSRPs.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('cars')}
              className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All</span>
              <IonIcon name="chevron-forward-outline" size={16} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reducedCostVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Popular Cars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Popular Cars
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              The most researched passenger cars and performance coupes.
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

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularCars.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* 5. Popular Motorcycles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Popular Motorcycles
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Top naked roadsters, supersport legends, and cruisers.
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

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularMotorcycles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* 6. Popular Brands Showcase - Strictly Brand Logos Only */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Automotive Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Official industry manufacturer logos. Select any marque to view models.
            </p>
          </div>
          <button
            onClick={() => navigateTo('brands')}
            className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
          >
            <span>All Brands</span>
            <IonIcon name="chevron-forward-outline" size={16} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {topBrands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => {
                navigateTo(brand.type === 'car' ? 'cars' : 'motorcycles', null, brand.name);
              }}
              className="p-3.5 rounded-md bg-[#0f172a] border border-slate-800/80 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-sm bg-slate-950 border border-slate-800 flex items-center justify-center p-2.5 text-slate-300 group-hover:text-blue-400 transition-colors">
                <BrandLogo
                  brandName={brand.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-blue-400 transition-colors truncate max-w-full">
                {brand.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 7. Catalog Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-md bg-gradient-to-r from-blue-950/60 via-slate-900 to-blue-950/60 border border-blue-500/30 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Compare Any Ride Side-by-Side
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unpack performance differences, power-to-weight ratios, transmission gearing, and reference costs with our responsive comparison engine.
            </p>
          </div>
          <button
            onClick={() => navigateTo('compare')}
            className="px-5 py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-lg shadow-blue-600/30 whitespace-nowrap cursor-pointer flex items-center gap-2"
          >
            <IonIcon name="git-compare-outline" size={18} />
            <span>Launch Comparison</span>
          </button>
        </div>
      </section>

    </div>
  );
};
