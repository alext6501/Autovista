import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/common/VehicleCard';
import { IonIcon } from '../components/common/IonIcon';
import { VehicleType } from '../types/vehicle';
import { MovingCarHeroBackground } from '../components/home/MovingCarHeroBackground';
import { BrandCarousel } from '../components/common/BrandCarousel';

export const HomePage: React.FC = () => {
  const { navigateTo, vehicles, setSearchQuery } = useApp();
  const [featuredTab, setFeaturedTab] = useState<VehicleType>('car');
  const [heroSearchInput, setHeroSearchInput] = useState('');

  // Featured vehicles filtered by tab
  const featuredVehicles = vehicles
    .filter((v) => v.type === featuredTab && v.isFeatured)
    .slice(0, 3);

  // Popular cars (4 models)
  const popularCars = vehicles
    .filter((v) => v.type === 'car' && v.isPopular)
    .slice(0, 4);

  // Popular motorcycles (4 models)
  const popularMotorcycles = vehicles
    .filter((v) => v.type === 'motorcycle' && v.isPopular)
    .slice(0, 4);

  // Models with reduced reference costs
  const reducedCostVehicles = vehicles
    .filter((v) => v.originalCost && v.originalCost > v.cost)
    .slice(0, 3);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      setSearchQuery(heroSearchInput.trim());
      navigateTo('search');
    } else {
      navigateTo('cars');
    }
  };

  return (
    <div className="w-full flex flex-col pb-16 overflow-x-hidden">
      
      {/* =========================================================================
          1. CINEMATIC MOVING HERO SECTION
             - Height: 75–85vh on mobile, 80–90vh on tablet, min 90vh on desktop
             - Background: Real car moving in highway video + dynamic particle streaks
             - Structure:
               [ VEYRO Navigation is sticky glass above ]
               Heading: Discover Your Next Ride
               Supporting text: Explore cars and motorcycles. Discover every model, specification, and cost.
               Buttons: [ Explore Cars ] [ Explore Motorcycles ]
               Search: Modern search bar with search icon
               Cinematic Moving Vehicle dominating lower screen
         ========================================================================= */}
      <section className="relative w-full min-h-[75vh] sm:min-h-[82vh] md:min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between items-center overflow-hidden bg-[#0a0e17] px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 border-b border-slate-800/80">
        
        {/* Real highway car moving background video & atmospheric overlay */}
        <MovingCarHeroBackground />

        {/* Top/Center Hero Content Wrapper */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center my-auto">
          
          {/* Main Heading: Discover */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight uppercase font-display leading-[1.08] drop-shadow-xl">
            Discover
          </h1>

          {/* Subheading: your perfect DRIVE */}
          <p className="mt-1.5 sm:mt-2 text-base sm:text-xl md:text-2xl text-slate-200 font-medium tracking-wide drop-shadow-md">
            your perfect DRIVE
          </p>

          {/* Supporting Text */}
          <p className="mt-2 text-xs sm:text-sm text-slate-300/90 max-w-xl font-normal drop-shadow">
            Explore cars and motorcycles. Discover every model, specification, and cost.
          </p>

          {/* Modern Search Bar Underneath Hero Text (matching reference) */}
          <form
            onSubmit={handleHeroSearch}
            className="mt-6 sm:mt-7 w-full max-w-xl relative"
          >
            <div className="relative flex items-center rounded-sm bg-white/95 text-slate-900 shadow-2xl focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden transition-all">
              <input
                type="text"
                value={heroSearchInput}
                onChange={(e) => setHeroSearchInput(e.target.value)}
                placeholder="Search model, or type"
                className="w-full py-3 sm:py-3.5 pl-4 sm:pl-5 pr-12 bg-transparent text-slate-900 placeholder:text-slate-500 text-xs sm:text-sm font-medium focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search vehicles"
                className="absolute right-3.5 text-slate-700 hover:text-black transition-colors cursor-pointer"
              >
                <IonIcon name="search-outline" size={19} />
              </button>
            </div>
          </form>

          {/* Action Buttons Below Search (matching reference layout & styled elements) */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full">
            <button
              onClick={() => navigateTo('cars')}
              className="px-5 sm:px-6 py-2.5 rounded-sm bg-white/90 hover:bg-white text-slate-900 font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <IonIcon name="car-sport-outline" size={16} className="text-slate-800" />
              <span>Explore Cars</span>
            </button>

            <button
              onClick={() => {
                navigateTo('motorcycles', null, null, null);
              }}
              className="px-5 sm:px-6 py-2.5 rounded-sm bg-white/90 hover:bg-white text-slate-900 font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <IonIcon name="bicycle-outline" size={16} className="text-slate-800" />
              <span>Explore Motorcycles</span>
            </button>

            <button
              onClick={() => {
                navigateTo('cars', null, null, 'Electric');
              }}
              className="px-5 sm:px-6 py-2.5 rounded-sm bg-white/90 hover:bg-white text-slate-900 font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <IonIcon name="flash-outline" size={16} className="text-slate-800" />
              <span>Explore Electric</span>
            </button>
          </div>

        </div>

        {/* Lower Visual Focus: Live Highway Status - Clean & subtle without blocking moving car */}
        <div className="relative z-10 w-full max-w-4xl mx-auto mt-4 sm:mt-6 flex items-center justify-between text-[11px] sm:text-xs text-slate-400 px-3 sm:px-6 py-2 border-t border-slate-800/40 backdrop-blur-xs">
          <div className="flex items-center gap-2 font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE HIGHWAY TRANSMISSION</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>SPEED: 110 KM/H</span>
            <span>LANE: EXPRESS</span>
            <span>1080P CINEMATIC</span>
          </div>
          <button
            onClick={() => navigateTo('cars')}
            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Explore All Fleet</span>
            <IonIcon name="chevron-forward-outline" size={13} />
          </button>
        </div>

      </section>

      {/* =========================================================================
          2. IMMEDIATELY BELOW THE HERO:
             - Step A: Explore Car Brands (RIGHT → LEFT carousel, Brand Logos ONLY)
             - Step B: Explore Motorcycle Brands (RIGHT → LEFT carousel, Brand Logos ONLY)
             - Step C: Featured Vehicles (Vehicle cards with reduced border radius)
         ========================================================================= */}
      
      {/* 2A. Explore Car Brands Carousel (Right -> Left, strictly brand logos) */}
      <BrandCarousel
        type="car"
        title="Explore Car Brands"
        subtitle="Global automotive manufacturers & marque emblems"
      />

      {/* 2B. Explore Motorcycle Brands Carousel (Right -> Left, strictly brand logos) */}
      <BrandCarousel
        type="motorcycle"
        title="Explore Motorcycle Brands"
        subtitle="Iconic superbike, cruiser & adventure manufacturers"
      />

      {/* 2C. Featured Vehicles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 sm:mt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
              <IonIcon name="sparkles-outline" size={14} />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Vehicles
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Hand-selected highlight models with outstanding engineering, performance, and design.
            </p>
          </div>

          {/* Segmented Cars / Motorcycles Switch */}
          <div className="flex items-center p-1 rounded-sm bg-slate-900 border border-slate-800 self-start sm:self-auto shadow-sm">
            <button
              onClick={() => setFeaturedTab('car')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
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
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
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

        {/* Featured Vehicles Grid with Reduced Border Radius */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* 3. Core Automotive Showcase Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 sm:mt-14">
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
            <p className="mt-1 text-xs text-slate-400">Full technical data</p>
          </div>

          <div className="p-4 sm:p-5 rounded-md bg-[#0f172a] border border-slate-800/80 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-sm bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2.5">
              <IonIcon name="flash-outline" size={22} />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">Latest Models</h3>
            <p className="mt-1 text-xs text-slate-400">2024–2026 fleet</p>
          </div>

          <div className="p-4 sm:p-5 rounded-md bg-[#0f172a] border border-slate-800/80 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-sm bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2.5">
              <IonIcon name="search-outline" size={22} />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">Easy Search</h3>
            <p className="mt-1 text-xs text-slate-400">Find by brand or model</p>
          </div>
        </div>
      </section>

      {/* 4. Cost Reduced Models Showcase */}
      {reducedCostVehicles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 sm:mt-16">
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
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>View All</span>
              <IonIcon name="arrow-forward-outline" size={14} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reducedCostVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </section>
      )}

      {/* 5. Popular Cars Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 sm:mt-16">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Popular Cars
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              The most researched cars by automotive enthusiasts worldwide.
            </p>
          </div>
          <button
            onClick={() => navigateTo('cars')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Browse All Cars</span>
            <IonIcon name="arrow-forward-outline" size={14} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularCars.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* 6. Popular Motorcycles Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 sm:mt-16">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Popular Motorcycles
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Top tracked streetfighters, superbikes, cruisers, and sport tourers.
            </p>
          </div>
          <button
            onClick={() => navigateTo('motorcycles')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Browse All Motorcycles</span>
            <IonIcon name="arrow-forward-outline" size={14} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularMotorcycles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* 7. Compare Garage Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 sm:mt-16">
        <div className="relative rounded-md overflow-hidden bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-950 border border-blue-500/30 p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-left">
            <span className="px-2.5 py-0.5 rounded-sm text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
              Comparison Engine
            </span>
            <h3 className="mt-2 text-xl sm:text-3xl font-black text-white font-display">
              Compare Any Ride Side-by-Side
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Line up horsepowers, torque curves, 0-60 acceleration times, fuel economy, and exact pricing side by side in our technical comparison tool.
            </p>
          </div>

          <button
            onClick={() => navigateTo('compare')}
            className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <IonIcon name="git-compare-outline" size={18} />
            <span>Open Compare Garage</span>
          </button>
        </div>
      </section>

    </div>
  );
};
