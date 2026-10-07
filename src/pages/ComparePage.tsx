import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VEHICLES_DATA } from '../data/vehicles';
import { IonIcon } from '../components/common/IonIcon';
import { Vehicle } from '../types/vehicle';

export const ComparePage: React.FC = () => {
  const { compareList, removeFromCompare, addToCompare, clearCompare, navigateTo } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Selected vehicles for comparison
  const vehiclesToCompare: Vehicle[] = compareList
    .map((id) => VEHICLES_DATA.find((v) => v.id === id))
    .filter((v): v is Vehicle => v !== undefined);

  // Available vehicles to add (not yet in compare list)
  const availableToAdd = VEHICLES_DATA.filter(
    (v) => !compareList.includes(v.id)
  );

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);

  const specsList = [
    { label: 'Reference Price', getValue: (v: Vehicle): string => formatCurrency(v.cost), isPrimary: true },
    { label: 'Model Year', getValue: (v: Vehicle): string => String(v.year) },
    { label: 'Category', getValue: (v: Vehicle): string => v.category },
    { label: 'Engine Type', getValue: (v: Vehicle): string => v.engine },
    { label: 'Horsepower', getValue: (v: Vehicle): string => `${v.horsepower} HP`, isPrimary: true },
    { label: 'Torque', getValue: (v: Vehicle): string => v.torque },
    { label: 'Fuel Type', getValue: (v: Vehicle): string => v.fuelType },
    { label: 'Transmission', getValue: (v: Vehicle): string => v.transmission },
    { label: 'Fuel Economy', getValue: (v: Vehicle): string => v.fuelEconomy },
    { label: 'Curb / Wet Weight', getValue: (v: Vehicle): string => v.weight },
    { label: 'Seating Capacity', getValue: (v: Vehicle): string => `${v.seatingCapacity} ${v.seatingCapacity === 1 ? 'Person' : 'People'}` },
    { label: 'Top Speed', getValue: (v: Vehicle): string => v.topSpeed },
    { label: '0-60 Acceleration', getValue: (v: Vehicle): string => v.acceleration || 'N/A' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex flex-col gap-8">
      
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Compare Vehicles
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-400">
            Side by side comparison of your favorite models.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {vehiclesToCompare.length > 1 && (
            <button
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                highlightDifferences
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <IonIcon name="swap-horizontal" size={14} />
              <span>{highlightDifferences ? 'Differences Highlighted' : 'Highlight Differences'}</span>
            </button>
          )}

          {vehiclesToCompare.length < 3 && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/20"
            >
              <IonIcon name="add-outline" size={16} />
              <span>Add Vehicle ({vehiclesToCompare.length}/3)</span>
            </button>
          )}

          {vehiclesToCompare.length > 0 && (
            <button
              onClick={clearCompare}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-colors"
              title="Clear all"
            >
              <IonIcon name="trash-outline" size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Comparison Container */}
      {vehiclesToCompare.length === 0 ? (
        <div className="w-full py-16 px-4 text-center rounded-md bg-[#0f172a] border border-slate-800 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center text-blue-400 mb-4">
            <IonIcon name="git-compare-outline" size={32} />
          </div>
          <h3 className="text-xl font-bold text-white">No vehicles selected for comparison</h3>
          <p className="mt-2 text-sm text-slate-400 max-w-md">
            Browse our cars and motorcycles and click the compare icon on any model to evaluate specifications side-by-side.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigateTo('cars')}
              className="px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Browse Cars
            </button>
            <button
              onClick={() => navigateTo('motorcycles')}
              className="px-5 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
            >
              Browse Motorcycles
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-[640px] lg:min-w-full bg-[#0f172a] border border-slate-800 rounded-md overflow-hidden shadow-2xl">
            
            {/* Vehicle Cards Header Row */}
            <div className={`grid grid-cols-${vehiclesToCompare.length + 1} border-b border-slate-800 bg-slate-900/60 p-4 sm:p-6 gap-4`}
              style={{
                gridTemplateColumns: `220px repeat(${vehiclesToCompare.length}, minmax(240px, 1fr))`
              }}
            >
              {/* First Column Header */}
              <div className="flex flex-col justify-end pb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Vehicle Models
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Comparing {vehiclesToCompare.length} models
                </span>
              </div>

              {/* Vehicle Columns */}
              {vehiclesToCompare.map((v) => (
                <div key={v.id} className="relative bg-slate-900 border border-slate-800 rounded-md p-4 flex flex-col justify-between">
                  <button
                    onClick={() => removeFromCompare(v.id)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <IonIcon name="close-outline" size={16} />
                  </button>

                  <div>
                    <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-slate-950 mb-3">
                      <img
                        src={v.image}
                        alt={`${v.brand} ${v.model}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                      {v.brand}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight line-clamp-1">
                      {v.model} ({v.year})
                    </h3>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      Change
                    </button>
                    <button
                      onClick={() => navigateTo(v.type === 'car' ? 'car-details' : 'motorcycle-details', v.id)}
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Specifications Comparison Rows */}
            <div className="divide-y divide-slate-800/80 text-sm">
              {specsList.map((spec, sIdx) => {
                const values = vehiclesToCompare.map(spec.getValue);
                const isDifferent = new Set(values).size > 1;

                return (
                  <div
                    key={spec.label}
                    className={`grid items-center p-3.5 sm:px-6 transition-colors ${
                      sIdx % 2 === 0 ? 'bg-slate-900/30' : 'bg-[#0f172a]'
                    } ${highlightDifferences && isDifferent ? 'bg-blue-950/20' : ''}`}
                    style={{
                      gridTemplateColumns: `220px repeat(${vehiclesToCompare.length}, minmax(240px, 1fr))`
                    }}
                  >
                    <div className="font-medium text-slate-400 text-xs sm:text-sm">
                      {spec.label}
                    </div>

                    {vehiclesToCompare.map((v) => (
                      <div
                        key={v.id}
                        className={`text-slate-200 text-xs sm:text-sm font-semibold truncate ${
                          spec.isPrimary ? 'text-blue-400 font-bold' : ''
                        }`}
                      >
                        {spec.getValue(v)}
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* Key Features Row */}
              <div
                className="grid p-4 sm:p-6 bg-slate-900/50"
                style={{
                  gridTemplateColumns: `220px repeat(${vehiclesToCompare.length}, minmax(240px, 1fr))`
                }}
              >
                <div className="font-bold text-white text-xs sm:text-sm">
                  Key Features
                </div>

                {vehiclesToCompare.map((v) => (
                  <div key={v.id} className="pr-4">
                    <ul className="space-y-2">
                      {v.features.slice(0, 5).map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <IonIcon
                            name="checkmark-circle-outline"
                            size={14}
                            className="text-blue-400 shrink-0 mt-0.5"
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add / Change Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-[#0f172a] border border-slate-700 rounded-md shadow-2xl p-6 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Select Vehicle to Compare</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <IonIcon name="close-outline" size={20} />
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto space-y-2 pr-1">
              {availableToAdd.map((v) => (
                <div
                  key={v.id}
                  onClick={() => {
                    addToCompare(v.id);
                    setShowAddModal(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-11 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                      <img
                        src={v.image}
                        alt={`${v.brand} ${v.model}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-blue-400 font-semibold block">{v.brand}</span>
                      <span className="text-sm font-bold text-white block">{v.model} ({v.year})</span>
                      <span className="text-xs text-slate-400">{v.category} · {v.engine.split(' ')[0]}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-white block">
                      {formatCurrency(v.cost)}
                    </span>
                    <span className="text-xs text-blue-400 font-medium">+ Add</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
