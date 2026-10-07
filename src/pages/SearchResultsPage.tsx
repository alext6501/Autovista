import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { VEHICLES_DATA } from '../data/vehicles';
import { VehicleCard } from '../components/common/VehicleCard';
import { IonIcon } from '../components/common/IonIcon';

export const SearchResultsPage: React.FC = () => {
  const { searchQuery, setSearchQuery } = useApp();
  const [localInput, setLocalInput] = useState(searchQuery);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Perform search matching
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return VEHICLES_DATA;

    return VEHICLES_DATA.filter((v) => {
      const matchText =
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.engine.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q) ||
        v.year.toString().includes(q);

      if (!matchText) return false;

      if (selectedBrand !== 'all' && v.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      if (selectedFuel !== 'all' && v.fuelType !== selectedFuel) return false;
      if (selectedType !== 'all' && v.type !== selectedType) return false;

      return true;
    });
  }, [searchQuery, selectedBrand, selectedFuel, selectedType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localInput);
  };

  const brandsInResults = useMemo(() => {
    const set = new Set(VEHICLES_DATA.map((v) => v.brand));
    return Array.from(set).sort();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex flex-col gap-8">
      
      {/* Search Header and Input */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Search Results
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Showing results for <span className="text-blue-400 font-semibold">"{searchQuery || 'All Models'}"</span> ({searchResults.length} vehicles found)
        </p>

        {/* Search Bar Input */}
        <form onSubmit={handleSearchSubmit} className="mt-6 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder="Search by car, motorcycle, brand, engine, or category..."
              className="w-full px-4 py-3 pl-11 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <IonIcon name="search-outline" size={18} />
            </div>
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Filters (3 cols) */}
        <div className="lg:col-span-3 bg-[#0f172a] border border-slate-800 rounded-md p-5 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Filter Results
            </h3>
            {(selectedBrand !== 'all' || selectedFuel !== 'all' || selectedType !== 'all') && (
              <button
                onClick={() => {
                  setSelectedBrand('all');
                  setSelectedFuel('all');
                  setSelectedType('all');
                }}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                Reset
              </button>
            )}
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Vehicle Type
            </label>
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'car', label: 'Cars Only' },
                { id: 'motorcycle', label: 'Motorcycles Only' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedType(opt.id)}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    selectedType === opt.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Brands</option>
              {brandsInResults.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Fuel Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Powertrain
            </label>
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">Any Fuel</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

        </div>

        {/* Results Grid (9 cols) */}
        <div className="lg:col-span-9">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="w-full py-16 px-4 text-center rounded-md bg-[#0f172a] border border-slate-800 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
                <IonIcon name="search-outline" size={28} />
              </div>
              <h3 className="text-lg font-bold text-white">No models found for "{searchQuery}"</h3>
              <p className="mt-2 text-sm text-slate-400 max-w-md">
                Try searching for popular keywords like "Toyota", "Corolla", "Mustang", "Yamaha", "Ducati", or "Electric".
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Toyota', 'Honda', 'Mustang', 'BMW', 'MT-07', 'Ninja', 'Ducati'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setLocalInput(term);
                      setSearchQuery(term);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
