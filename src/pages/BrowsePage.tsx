import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { VEHICLES_DATA } from '../data/vehicles';
import { VehicleCard } from '../components/common/VehicleCard';
import { IonIcon } from '../components/common/IonIcon';
import { VehicleType } from '../types/vehicle';

interface BrowsePageProps {
  initialType?: VehicleType;
}

export const BrowsePage: React.FC<BrowsePageProps> = ({ initialType }) => {
  const { selectedBrand, selectedCategory, vehicles } = useApp();

  const [activeType, setActiveType] = useState<VehicleType | 'all'>(initialType || 'car');
  const [brandFilter, setBrandFilter] = useState<string>(selectedBrand || 'all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [fuelFilter, setFuelFilter] = useState<string>(selectedCategory === 'Electric' ? 'Electric' : 'all');
  const [categoryFilter, setCategoryFilter] = useState<string>(selectedCategory && selectedCategory !== 'Electric' ? selectedCategory : 'all');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [onlyReduced, setOnlyReduced] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  useEffect(() => {
    if (initialType) {
      setActiveType(initialType);
    }
  }, [initialType]);

  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === 'Electric') {
        setFuelFilter('Electric');
        setCategoryFilter('all');
      } else {
        setCategoryFilter(selectedCategory);
      }
      setCurrentPage(1);
    }
  }, [selectedCategory]);

  const itemsPerPage = 6;

  // Extract unique brands
  const availableBrands = useMemo(() => {
    const list = vehicles.filter((v) => (activeType === 'all' ? true : v.type === activeType)).map(
      (v) => v.brand
    );
    return Array.from(new Set(list)).sort();
  }, [vehicles, activeType]);

  // Extract unique categories
  const availableCategories = useMemo(() => {
    const list = vehicles.filter((v) => (activeType === 'all' ? true : v.type === activeType)).map(
      (v) => v.category
    );
    return Array.from(new Set(list)).sort();
  }, [vehicles, activeType]);

  // Filtered and sorted vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Type filter
      if (activeType !== 'all' && v.type !== activeType) return false;
      // Brand filter
      if (brandFilter !== 'all' && v.brand.toLowerCase() !== brandFilter.toLowerCase()) return false;
      // Year filter
      if (yearFilter !== 'all' && v.year.toString() !== yearFilter) return false;
      // Fuel filter
      if (fuelFilter !== 'all' && v.fuelType !== fuelFilter) return false;
      // Category filter
      if (categoryFilter !== 'all' && v.category !== categoryFilter) return false;
      // Reduced cost only filter
      if (onlyReduced && !(v.originalCost && v.originalCost > v.cost)) return false;
      // Price filter
      if (priceFilter === 'under-15k' && v.cost >= 15000) return false;
      if (priceFilter === '15k-30k' && (v.cost < 15000 || v.cost > 30000)) return false;
      if (priceFilter === '30k-50k' && (v.cost < 30000 || v.cost > 50000)) return false;
      if (priceFilter === '50k-plus' && v.cost <= 50000) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.cost - b.cost;
      if (sortOption === 'price-high') return b.cost - a.cost;
      if (sortOption === 'hp-high') return b.horsepower - a.horsepower;
      if (sortOption === 'year-new') return b.year - a.year;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [vehicles, activeType, brandFilter, priceFilter, yearFilter, fuelFilter, categoryFilter, onlyReduced, sortOption]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage) || 1;
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVehicles.slice(start, start + itemsPerPage);
  }, [filteredVehicles, currentPage]);

  const resetFilters = () => {
    setBrandFilter('all');
    setPriceFilter('all');
    setYearFilter('all');
    setFuelFilter('all');
    setCategoryFilter('all');
    setSortOption('featured');
    setOnlyReduced(false);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    brandFilter !== 'all' ||
    priceFilter !== 'all' ||
    yearFilter !== 'all' ||
    fuelFilter !== 'all' ||
    categoryFilter !== 'all' ||
    onlyReduced;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex flex-col gap-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Explore Vehicles
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-400">
            Find your perfect car or motorcycle.
          </p>
        </div>

        {/* Cars / Motorcycles Category Switch */}
        <div className="flex items-center p-1 rounded-md bg-slate-900 border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => {
              setActiveType('car');
              setBrandFilter('all');
              setCurrentPage(1);
            }}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeType === 'car'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <IonIcon name="car-sport-outline" size={16} />
            <span>Cars</span>
          </button>

          <button
            onClick={() => {
              setActiveType('motorcycle');
              setBrandFilter('all');
              setCurrentPage(1);
            }}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeType === 'motorcycle'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <IonIcon name="bicycle-outline" size={16} />
            <span>Motorcycles</span>
          </button>

          <button
            onClick={() => {
              setActiveType('all');
              setBrandFilter('all');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeType === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Responsive Filter Bar (Desktop & Mobile trigger) */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-md p-4 sm:p-5 shadow-lg">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 text-sm font-semibold hover:bg-slate-700 transition-colors"
          >
            <IonIcon name="filter-outline" size={18} />
            <span>{mobileFiltersOpen ? 'Hide Filters' : 'Filter Options'}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            )}
          </button>

          <span className="text-xs text-slate-400 font-medium tabular-nums">
            {filteredVehicles.length} vehicles found
          </span>
        </div>

        {/* Filter Controls (visible on desktop or when mobile drawer open) */}
        <div className={`mt-4 lg:mt-0 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            
            {/* Brand Filter */}
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Brand
              </label>
              <select
                value={brandFilter}
                onChange={(e) => {
                  setBrandFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Brands</option>
                {availableBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Price Range
              </label>
              <select
                value={priceFilter}
                onChange={(e) => {
                  setPriceFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">Any Price</option>
                <option value="under-15k">Under $15,000</option>
                <option value="15k-30k">$15,000 – $30,000</option>
                <option value="30k-50k">$30,000 – $50,000</option>
                <option value="50k-plus">$50,000+</option>
              </select>
            </div>

            {/* Year */}
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Year
              </label>
              <select
                value={yearFilter}
                onChange={(e) => {
                  setYearFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">Any Year</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Fuel Type
              </label>
              <select
                value={fuelFilter}
                onChange={(e) => {
                  setFuelFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">Any Fuel</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Category / Body Style */}
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {availableCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Sort By
              </label>
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="hp-high">Horsepower (High)</option>
                <option value="year-new">Newest Year</option>
              </select>
            </div>

          </div>

          {/* Quick Filter Tag for Reduced Costs */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
            <button
              onClick={() => {
                setOnlyReduced(!onlyReduced);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                onlyReduced
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-400 shadow-sm'
                  : 'bg-slate-900 border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              <IonIcon name="trending-down-outline" size={14} className={onlyReduced ? 'text-emerald-400' : 'text-slate-500'} />
              <span>Show Cost Reduced Models Only</span>
              {onlyReduced && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-blue-400 hover:text-blue-300 font-medium text-xs flex items-center gap-1 cursor-pointer"
              >
                <IonIcon name="close-outline" size={14} />
                <span>Reset all filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Vehicle Cards */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {paginatedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="w-full py-16 px-4 text-center rounded-md bg-[#0f172a] border border-slate-800 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 mb-4">
            <IonIcon name="search-outline" size={28} />
          </div>
          <h3 className="text-lg font-bold text-white">No vehicles match your criteria</h3>
          <p className="mt-1 text-sm text-slate-400 max-w-md">
            Try adjusting your brand, fuel type, or price filters to view available models in our catalog.
          </p>
          <button
            onClick={resetFilters}
            className="mt-5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Previous Page"
          >
            <IonIcon name="chevron-back-outline" size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === pageNum
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Next Page"
          >
            <IonIcon name="chevron-forward-outline" size={18} />
          </button>
        </div>
      )}

    </div>
  );
};
