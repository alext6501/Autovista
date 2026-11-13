import React from 'react';
import { Fuel, Gauge, Settings2, GitFork } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { useApp } from '../../context/AppContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  showActions?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, showActions = false }) => {
  const { navigateTo, toggleCompareVehicle, isInCompare, toggleSavedVehicle, isSavedVehicle } =
    useApp();

  const saved = isSavedVehicle(vehicle.id);
  const compared = isInCompare(vehicle.id);

  return (
    <article
      onClick={() => navigateTo('car-details', { vehicleId: vehicle.id })}
      className="border border-neutral-200 bg-white flex flex-col cursor-pointer hover:border-black transition-colors duration-150 group"
    >
      {/* Top Edge-to-Edge Car Photo */}
      <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-neutral-200">
        <img
          src={vehicle.image}
          alt={vehicle.model}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-200"
        />
      </div>

      {/* Card Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5">
        <div>
          <h3 className="text-[15px] font-bold text-black leading-snug tracking-tight mb-1.5 truncate">
            {vehicle.model}
          </h3>

          {/* Specs Line: Engine, Fuel, Drivetrain, Transmission */}
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-neutral-600 leading-tight">
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <Gauge className="w-3 h-3 text-neutral-500 shrink-0" aria-hidden="true" />
              <span>{vehicle.shortEngine}</span>
            </span>
            <span aria-hidden="true" className="text-neutral-300">|</span>
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <Fuel className="w-3 h-3 text-neutral-500 shrink-0" aria-hidden="true" />
              <span>{vehicle.fuelType}</span>
            </span>
            <span aria-hidden="true" className="text-neutral-300">|</span>
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <GitFork className="w-3 h-3 text-neutral-500 shrink-0" aria-hidden="true" />
              <span>{vehicle.shortDrivetrain}</span>
            </span>
            <span aria-hidden="true" className="text-neutral-300">|</span>
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <Settings2 className="w-3 h-3 text-neutral-500 shrink-0" aria-hidden="true" />
              <span>{vehicle.shortTransmission}</span>
            </span>
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between gap-2">
          <span className="text-[15px] font-bold text-black tabular-nums">
            ${vehicle.price.toLocaleString()}
          </span>

          {showActions && (
            <div
              className="flex items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => toggleCompareVehicle(vehicle.id)}
                className={`px-2 py-1 text-[11px] font-medium border transition-colors cursor-pointer ${
                  compared
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-neutral-300 hover:border-black'
                }`}
              >
                {compared ? 'Comparing' : 'Compare'}
              </button>
              <button
                type="button"
                onClick={() => toggleSavedVehicle(vehicle.id)}
                className={`px-2 py-1 text-[11px] font-medium border transition-colors cursor-pointer ${
                  saved
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-neutral-300 hover:border-black'
                }`}
              >
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
