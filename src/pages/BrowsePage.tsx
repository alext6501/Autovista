import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POPULAR_BRANDS } from '../data/brands';
import { VehicleCard } from '../components/common/VehicleCard';

export const BrowsePage: React.FC = () => {
  const {
    vehicles,
    selectedBrand,
    setSelectedBrand,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFuel, setSelectedFuel] = useState<string>('All');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(400000);
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = ['All', 'Sedan', 'SUV', 'Coupe', 'Supercar', 'Hatchback'];
  const fuelTypes = ['All', 'Gasoline', 'Diesel', 'Hybrid', 'Electric'];
  const transmissions = ['All', 'Automatic', 'Manual'];

  const filteredCars = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = vehicles.filter((car) => {
      if (selectedBrand && car.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }
      if (selectedCategory !== 'All' && car.category !== selectedCategory) {
        return false;
      }
      if (selectedFuel !== 'All' && car.fuelType !== selectedFuel) {
        return false;
      }
      if (selectedTransmission !== 'All' && car.shortTransmission !== selectedTransmission) {
        return false;
      }
      if (car.price > maxPrice) {
        return false;
      }
      if (q) {
        const matches =
          car.model.toLowerCase().includes(q) ||
          car.brand.toLowerCase().includes(q) ||
          car.engine.toLowerCase().includes(q) ||
          car.fuelType.toLowerCase().includes(q) ||
          car.category.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });

    switch (sortBy) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'hp-desc':
        return [...list].sort((a, b) => b.horsepower - a.horsepower);
      default:
        return [...list].sort(
          (a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99)
        );
    }
  }, [
    vehicles,
    selectedBrand,
    selectedCategory,
    selectedFuel,
    selectedTransmission,
    maxPrice,
    searchQuery,
    sortBy
  ]);

  const hasActiveFilters =
    Boolean(selectedBrand) ||
    selectedCategory !== 'All' ||
    selectedFuel !== 'All' ||
    selectedTransmission !== 'All' ||
    maxPrice < 400000 ||
    searchQuery.trim() !== '';

  const resetAllFilters = () => {
    setSelectedBrand(null);
    setSelectedCategory('All');
    setSelectedFuel('All');
    setSelectedTransmission('All');
    setMaxPrice(400000);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="bg-white text-black py-8">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pb-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
              {selectedBrand ? `${selectedBrand} Cars` : 'All Cars'}
            </h1>
            <p className="mt-1.5 text-sm text-neutral-600">
              Browse technical specifications, drivetrains, and indicative prices across our automotive catalog.
            </p>
          </div>

          <div className="text-xs font-medium text-neutral-600 tabular-nums">
            Showing {filteredCars.length} of {vehicles.length} models
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="py-5 border-b border-neutral-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
              Search Model
            </label>
            <div className="flex items-center border border-neutral-300 bg-white px-3 h-10">
              <Search className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Model, brand, engine..."
                className="w-full text-sm text-black placeholder-neutral-500 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="text-neutral-500 hover:text-black cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
              Brand
            </label>
            <select
              value={selectedBrand ?? 'All'}
              onChange={(e) =>
                setSelectedBrand(e.target.value === 'All' ? null : e.target.value)
              }
              className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="All">All Brands</option>
              {POPULAR_BRANDS.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Body Type */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
              Body Type
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Body Types' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
              Fuel Type
            </label>
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black cursor-pointer"
            >
              {fuelTypes.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {fuel === 'All' ? 'All Fuel Types' : fuel}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="hp-desc">Horsepower: High to Low</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Strip: Transmission, Max Price, Reset */}
        <div className="py-3.5 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-700">
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="font-semibold">Transmission:</span>
              <div className="flex items-center border border-neutral-300">
                {transmissions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTransmission(t)}
                    className={`px-3 py-1 text-xs font-medium cursor-pointer transition-colors ${
                      selectedTransmission === t
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-neutral-700">
              <span className="font-semibold">Max Indicative Price:</span>
              <input
                type="range"
                min={30000}
                max={400000}
                step={10000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32 accent-black cursor-pointer"
              />
              <span className="font-bold text-black tabular-nums">
                {maxPrice >= 400000 ? 'Any' : `$${maxPrice.toLocaleString()}`}
              </span>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs font-semibold text-black border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} showActions />
            ))}
          </div>
        ) : (
          <div className="my-14 py-14 border border-neutral-200 text-center px-4">
            <h2 className="text-lg font-bold text-black">No matching cars found</h2>
            <p className="mt-1.5 text-sm text-neutral-600">
              Try adjusting your brand, price ceiling, or search keywords.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="mt-5 bg-black text-white px-5 py-2.5 text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Informational Pricing Rule Notice */}
        <div className="mt-10 p-4 border border-neutral-200 bg-neutral-50 text-xs text-neutral-700 leading-relaxed">
          <strong className="text-black">Informational Catalog Notice:</strong> ShiftRoute is an
          informational automotive catalog and not a dealership. Displayed prices are indicative
          reference figures and may vary by market, location, condition, and model year.
        </div>
      </div>
    </div>
  );
};
