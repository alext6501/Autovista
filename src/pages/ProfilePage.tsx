import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/common/VehicleCard';

export const ProfilePage: React.FC = () => {
  const {
    vehicles,
    savedVehicles,
    clearSavedVehicles,
    compareList,
    clearCompare,
    navigateTo
  } = useApp();

  const savedCars = vehicles.filter((v) => savedVehicles.includes(v.id));
  const comparedCars = vehicles.filter((v) => compareList.includes(v.id));

  return (
    <div className="bg-white text-black py-8">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
              Saved Vehicles & Research List
            </h1>
            <p className="mt-1.5 text-sm text-neutral-600">
              Manage your saved models and active side-by-side comparison selections.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium text-neutral-600 tabular-nums">
            <span>Saved: {savedCars.length}</span>
            <span>Comparing: {comparedCars.length}</span>
          </div>
        </div>

        {/* Saved Vehicles */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black">Saved Cars</h2>
            {savedCars.length > 0 && (
              <button
                type="button"
                onClick={clearSavedVehicles}
                className="text-xs font-semibold border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                Clear All Saved
              </button>
            )}
          </div>

          {savedCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {savedCars.map((car) => (
                <VehicleCard key={car.id} vehicle={car} showActions />
              ))}
            </div>
          ) : (
            <div className="p-10 border border-neutral-200 text-center">
              <p className="text-sm font-medium text-neutral-700">
                You have not saved any cars yet.
              </p>
              <button
                type="button"
                onClick={() => navigateTo('all-cars')}
                className="mt-4 bg-black text-white px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <span>Browse All Cars</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>

        {/* Active Comparison */}
        <section className="mt-10 pt-8 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black">Active Comparison Queue</h2>
            <div className="flex items-center gap-3">
              {comparedCars.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={clearCompare}
                    className="text-xs font-semibold border border-neutral-300 px-3 py-1.5 hover:border-black transition-colors cursor-pointer"
                  >
                    Clear Queue
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('compare')}
                    className="text-xs font-semibold bg-black text-white px-3.5 py-1.5 hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Open Comparison Table
                  </button>
                </>
              )}
            </div>
          </div>

          {comparedCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {comparedCars.map((car) => (
                <VehicleCard key={car.id} vehicle={car} showActions />
              ))}
            </div>
          ) : (
            <div className="p-8 border border-neutral-200 text-center text-sm text-neutral-600">
              No cars queued for comparison. Select “Compare” on any vehicle to evaluate specs side by side.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
