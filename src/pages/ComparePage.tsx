import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Vehicle } from '../types/vehicle';

export const ComparePage: React.FC = () => {
  const {
    vehicles,
    compareList,
    setCompareSlot,
    removeFromCompare,
    clearCompare,
    navigateTo
  } = useApp();

  const slots = [0, 1, 2];
  const selectedCars: (Vehicle | null)[] = slots.map((idx) => {
    const id = compareList[idx];
    return id ? vehicles.find((v) => v.id === id) ?? null : null;
  });

  const activeCars = selectedCars.filter((c): c is Vehicle => c !== null);

  const comparisonRows: { label: string; getValue: (car: Vehicle) => string }[] = [
    { label: 'Brand', getValue: (c) => c.brand },
    { label: 'Model Year', getValue: (c) => String(c.year) },
    { label: 'Body Category', getValue: (c) => c.category },
    { label: 'Indicative Price', getValue: (c) => `$${c.price.toLocaleString()}` },
    { label: 'Engine', getValue: (c) => c.engine },
    { label: 'Displacement / Battery', getValue: (c) => c.displacement },
    { label: 'Horsepower', getValue: (c) => `${c.horsepower} hp` },
    { label: 'Torque', getValue: (c) => c.torque },
    { label: 'Fuel Type', getValue: (c) => c.fuelType },
    { label: 'Transmission', getValue: (c) => c.transmission },
    { label: 'Drivetrain', getValue: (c) => c.drivetrain },
    { label: 'Maximum Speed', getValue: (c) => c.topSpeed },
    { label: '0–60 mph', getValue: (c) => c.acceleration },
    { label: 'Efficiency / Range', getValue: (c) => c.fuelEconomy },
    { label: 'Curb Weight', getValue: (c) => c.weight },
    { label: 'Seating Capacity', getValue: (c) => `${c.seatingCapacity} Passengers` }
  ];

  return (
    <div className="bg-white text-black py-8">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
              Compare Cars
            </h1>
            <p className="mt-1.5 text-sm text-neutral-600">
              Select up to three models to compare engines, drivetrains, performance, and indicative prices side by side.
            </p>
          </div>

          {activeCars.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="text-xs font-semibold border border-black px-3.5 py-2 hover:bg-black hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
            >
              Clear Comparison
            </button>
          )}
        </div>

        {/* Slot Selectors */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {slots.map((slotIndex) => {
            const car = selectedCars[slotIndex];
            return (
              <div key={slotIndex} className="border border-neutral-200 bg-white p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold text-neutral-500">
                    Vehicle {slotIndex + 1}
                  </span>
                  {car && (
                    <button
                      type="button"
                      onClick={() => removeFromCompare(car.id)}
                      aria-label={`Remove ${car.model}`}
                      className="text-neutral-500 hover:text-black cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <select
                  value={car?.id ?? ''}
                  onChange={(e) => setCompareSlot(slotIndex, e.target.value || null)}
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black cursor-pointer"
                >
                  <option value="">Select a car...</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.model} (${v.price.toLocaleString()})
                    </option>
                  ))}
                </select>

                {car ? (
                  <div className="mt-4">
                    <div
                      onClick={() => navigateTo('car-details', { vehicleId: car.id })}
                      className="aspect-[16/10] w-full bg-neutral-100 border border-neutral-200 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={car.image}
                        alt={car.model}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => navigateTo('car-details', { vehicleId: car.id })}
                        className="text-sm font-bold text-black hover:underline text-left cursor-pointer"
                      >
                        {car.model}
                      </button>
                      <span className="text-sm font-bold text-black tabular-nums">
                        ${car.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 aspect-[16/10] w-full border border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center text-xs text-neutral-500">
                    Choose a model above
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparison Specifications Table */}
        {activeCars.length > 0 ? (
          <div className="mt-8 overflow-x-auto border border-neutral-200">
            <table className="w-full border-collapse text-left min-w-[640px]">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="p-3.5 text-xs font-bold text-black w-48 border-r border-neutral-200">
                    Specification
                  </th>
                  {activeCars.map((car) => (
                    <th
                      key={car.id}
                      className="p-3.5 text-xs sm:text-sm font-bold text-black border-r last:border-r-0 border-neutral-200"
                    >
                      {car.model}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="hover:bg-neutral-50">
                    <td className="p-3.5 text-xs font-semibold text-neutral-600 border-r border-neutral-200">
                      {row.label}
                    </td>
                    {activeCars.map((car) => (
                      <td
                        key={`${car.id}-${row.label}`}
                        className="p-3.5 text-xs sm:text-sm text-black font-medium tabular-nums border-r last:border-r-0 border-neutral-200"
                      >
                        {row.getValue(car)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-8 p-10 border border-neutral-200 text-center">
            <h2 className="text-base font-bold text-black">Start a Side-by-Side Comparison</h2>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-600">
              Pick two or three cars from the dropdown selectors above or browse the catalog first.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setCompareSlot(0, 'toyota-land-cruiser-300');
                  setCompareSlot(1, 'bmw-7-series');
                }}
                className="bg-black text-white px-4 py-2.5 text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Compare Land Cruiser 300 vs BMW 7 Series
              </button>
              <button
                type="button"
                onClick={() => navigateTo('all-cars')}
                className="border border-black text-black px-4 py-2.5 text-xs font-semibold hover:bg-neutral-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Browse All Cars</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
