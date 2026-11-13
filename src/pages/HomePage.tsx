import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight, Car, BarChart2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POPULAR_BRANDS } from '../data/brands';
import { CAR_IMAGES } from '../data/carImages';
import { BrandLogo } from '../components/common/BrandLogo';
import { VehicleCard } from '../components/common/VehicleCard';

export const HomePage: React.FC = () => {
  const { vehicles, updates, navigateTo } = useApp();
  const [heroQuery, setHeroQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  // Featured 5 cars in exact reference order (with optional pinned custom featured cars)
  const featuredCars = vehicles
    .filter((v) => v.isFeatured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99))
    .slice(0, 5);

  // Latest 3 updates (includes newly posted admin cars automatically)
  const latestUpdates = updates.slice(0, 3);

  const matchingSuggestions = heroQuery.trim()
    ? vehicles
        .filter((v) => {
          const q = heroQuery.toLowerCase();
          return (
            v.model.toLowerCase().includes(q) ||
            v.brand.toLowerCase().includes(q) ||
            v.category.toLowerCase().includes(q) ||
            v.fuelType.toLowerCase().includes(q)
          );
        })
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    navigateTo('all-cars', { search: heroQuery.trim(), brand: null });
  };

  return (
    <div className="bg-white text-black">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= 1. HERO SECTION ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 pt-7 pb-5 lg:pt-9 lg:pb-6">
          {/* Left Column */}
          <div className="lg:col-span-5 z-10">
            <h1 className="text-4xl sm:text-[46px] lg:text-[52px] font-bold tracking-tight leading-[1.06] text-black">
              Explore the Finest Cars with ShiftRoute
            </h1>

            <p className="mt-4 text-[15px] sm:text-[17px] leading-[1.45] text-neutral-800 max-w-[440px]">
              Discover premium vehicles, their specifications and prices — all in one place.
            </p>

            {/* Search Input + Black Search Button */}
            <div ref={searchBoxRef} className="relative mt-6 max-w-[490px]">
              <form onSubmit={handleHeroSearch} className="flex items-stretch w-full">
                <div className="flex-1 flex items-center border border-neutral-300 border-r-0 bg-white px-3.5 h-11">
                  <Search className="w-4 h-4 text-neutral-700 mr-2.5 shrink-0" aria-hidden="true" />
                  <input
                    type="text"
                    value={heroQuery}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={(e) => {
                      setHeroQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    placeholder="Search for a car model..."
                    aria-label="Search for a car model"
                    className="w-full text-sm text-black placeholder-neutral-500 bg-transparent focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black text-white px-7 h-11 text-sm font-medium hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </form>

              {/* Live Search Suggestions */}
              {showSuggestions && matchingSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-30 bg-white border border-neutral-300 border-t-0 divide-y divide-neutral-200">
                  {matchingSuggestions.map((car) => (
                    <button
                      key={car.id}
                      type="button"
                      onClick={() => {
                        setShowSuggestions(false);
                        navigateTo('car-details', { vehicleId: car.id });
                      }}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={car.image}
                          alt={car.model}
                          referrerPolicy="no-referrer"
                          className="w-12 h-8 object-cover shrink-0 bg-neutral-100"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-black truncate">{car.model}</div>
                          <div className="text-[11px] text-neutral-500">
                            {car.shortEngine} · {car.fuelType} · {car.shortDrivetrain}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-black tabular-nums ml-2 shrink-0">
                        ${car.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Large Premium White Sports Car Photograph */}
          <div className="lg:col-span-7">
            <div
              onClick={() => navigateTo('car-details', { vehicleId: 'toyota-gr-supra' })}
              title="View Toyota GR Supra specifications"
              className="relative w-full aspect-[16/9] sm:aspect-[16/8.2] overflow-hidden bg-white cursor-pointer"
            >
              <img
                src={CAR_IMAGES.heroWhiteSupra}
                alt="White Toyota GR Supra sports car studio profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_72%] scale-[1.08] origin-bottom"
              />
              {/* Seamless pure white edge blend matching white page canvas */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent"
              />
            </div>
          </div>
        </section>

        {/* ================= 2. POPULAR BRANDS (CONTINUOUS SCROLLING MARQUEE) ================= */}
        <section className="mt-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[19px] sm:text-[21px] font-bold tracking-tight text-black">
              Popular Brands
            </h2>
            <button
              type="button"
              onClick={() => navigateTo('brands')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-black hover:underline cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="overflow-hidden border border-neutral-200 bg-white">
            <div className="animate-brands-marquee">
              {[...POPULAR_BRANDS, ...POPULAR_BRANDS].map((brand, idx) => (
                <button
                  key={`${brand.id}-${idx}`}
                  type="button"
                  onClick={() => navigateTo('all-cars', { brand: brand.name, search: '' })}
                  className="w-[126px] sm:w-[130px] shrink-0 border-r border-neutral-200 bg-white hover:bg-neutral-50 transition-colors py-3.5 px-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
                >
                  <div className="h-8 flex items-center justify-center text-black group-hover:scale-105 transition-transform">
                    <BrandLogo brandName={brand.name} className="w-11 h-7" />
                  </div>
                  <span className="text-xs font-medium text-black whitespace-nowrap">
                    {brand.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 3. FEATURED CARS ================= */}
        <section className="mt-7">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[19px] sm:text-[21px] font-bold tracking-tight text-black">
              Featured Cars
            </h2>
            <button
              type="button"
              onClick={() => navigateTo('all-cars', { brand: null, search: '' })}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-black hover:underline cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} />
            ))}
          </div>
        </section>

        {/* ================= 4. BOTTOM THREE-PART SECTION ================= */}
        <section className="mt-7 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Why Choose ShiftRoute? */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <h2 className="text-[19px] sm:text-[21px] font-bold tracking-tight text-black mb-4">
              Why Choose ShiftRoute?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 flex-1 items-start">
              <div className="sm:border-r border-neutral-200 pb-4 sm:pb-0 sm:pr-3 flex flex-col items-center text-center">
                <Car className="w-7 h-7 text-black mb-2.5" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="text-[13px] font-bold text-black mb-1">Premium Selection</h3>
                <p className="text-[11px] leading-snug text-neutral-600">
                  Explore the latest and most popular models.
                </p>
              </div>

              <div className="sm:border-r border-neutral-200 py-4 sm:py-0 sm:px-3 border-t sm:border-t-0 flex flex-col items-center text-center">
                <BarChart2
                  className="w-7 h-7 text-black mb-2.5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <h3 className="text-[13px] font-bold text-black mb-1">Detailed Info</h3>
                <p className="text-[11px] leading-snug text-neutral-600">
                  Get full specifications and pricing.
                </p>
              </div>

              <div className="pt-4 sm:pt-0 sm:pl-3 border-t sm:border-t-0 border-neutral-200 flex flex-col items-center text-center">
                <ShieldCheck
                  className="w-7 h-7 text-black mb-2.5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <h3 className="text-[13px] font-bold text-black mb-1">Trusted Platform</h3>
                <p className="text-[11px] leading-snug text-neutral-600">
                  A reliable source for car information.
                </p>
              </div>
            </div>
          </div>

          {/* Center: Drive Your Dream Black Banner */}
          <div className="lg:col-span-5 bg-black text-white relative overflow-hidden min-h-[210px] flex items-center">
            <img
              src={CAR_IMAGES.driveYourDreamMercedes}
              alt="Black and white luxury Mercedes-Benz sedan"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-right grayscale contrast-125"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"
            />
            <div className="relative z-10 p-6 sm:p-7 max-w-[300px]">
              <h2 className="text-2xl sm:text-[26px] font-bold tracking-tight text-white leading-tight mb-2">
                Drive Your Dream
              </h2>
              <p className="text-xs sm:text-[13px] text-neutral-200 leading-relaxed mb-5">
                Find the perfect car that matches your lifestyle and budget.
              </p>
              <button
                type="button"
                onClick={() => navigateTo('all-cars', { brand: null, search: '' })}
                className="bg-white text-black px-4 py-2.5 text-xs sm:text-[13px] font-semibold inline-flex items-center gap-2 hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <span>Browse All Cars</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right: Latest Updates (Dynamically reflects newly added admin cars) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[19px] sm:text-[21px] font-bold tracking-tight text-black">
                Latest Updates
              </h2>
              <button
                type="button"
                onClick={() => navigateTo('updates', { updateId: null })}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-black hover:underline cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="divide-y divide-neutral-200 flex-1 flex flex-col justify-between">
              {latestUpdates.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo('updates', { updateId: item.id })}
                  className="py-2.5 first:pt-0 last:pb-0 flex items-center gap-3 text-left group cursor-pointer"
                >
                  <div className="w-[78px] h-[48px] shrink-0 bg-neutral-100 overflow-hidden border border-neutral-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-bold text-black leading-snug group-hover:underline line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{item.date}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
