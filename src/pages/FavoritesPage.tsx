import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VEHICLES_DATA } from '../data/vehicles';
import { IonIcon } from '../components/common/IonIcon';
import { VehicleType, Vehicle } from '../types/vehicle';

export const FavoritesPage: React.FC = () => {
  const { favorites, toggleFavorite, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<VehicleType | 'all'>('all');

  const favoriteVehicles: Vehicle[] = favorites
    .map((id) => VEHICLES_DATA.find((v) => v.id === id))
    .filter((v): v is Vehicle => v !== undefined)
    .filter((v) => (activeTab === 'all' ? true : v.type === activeTab));

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex flex-col gap-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            My Favorites
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-400">
            Your saved cars and motorcycles.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab('car')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'car'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <IonIcon name="car-sport-outline" size={16} />
            <span>Cars</span>
          </button>
          <button
            onClick={() => setActiveTab('motorcycle')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'motorcycle'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <IonIcon name="bicycle-outline" size={16} />
            <span>Motorcycles</span>
          </button>
        </div>
      </div>

      {/* Favorites Grid */}
      {favoriteVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {favoriteVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                
                {/* Remove button */}
                <button
                  onClick={() => toggleFavorite(vehicle.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-red-400 hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                  title="Remove from favorites"
                >
                  <IonIcon name="trash-outline" size={16} />
                </button>

                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-semibold text-slate-200">
                  {vehicle.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{vehicle.brand}</span>
                    <span>{vehicle.year}</span>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white tracking-tight">
                    {vehicle.model}
                  </h3>
                  <div className="mt-3 text-xs text-slate-400 flex items-center gap-2">
                    <span>{vehicle.horsepower} HP</span>
                    <span>·</span>
                    <span>{vehicle.fuelEconomy}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase text-slate-500 font-semibold">
                      Reference MSRP
                    </span>
                    <span className="text-lg font-bold text-white tabular-nums">
                      {formatCurrency(vehicle.cost)}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      navigateTo(
                        vehicle.type === 'car' ? 'car-details' : 'motorcycle-details',
                        vehicle.id
                      )
                    }
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Details</span>
                    <IonIcon name="chevron-forward-outline" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-16 px-4 text-center rounded-2xl bg-[#0f172a] border border-slate-800 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 mb-4">
            <IonIcon name="heart-outline" size={32} />
          </div>
          <h3 className="text-xl font-bold text-white">No saved favorites in this category</h3>
          <p className="mt-2 text-sm text-slate-400 max-w-md">
            Click the heart icon on any car or motorcycle card to save it to your personal favorites collection.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigateTo('cars')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Explore Cars
            </button>
            <button
              onClick={() => navigateTo('motorcycles')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
            >
              Explore Motorcycles
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
