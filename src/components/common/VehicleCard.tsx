import React, { useState } from 'react';
import { Vehicle } from '../../types/vehicle';
import { useApp } from '../../context/AppContext';
import { IonIcon } from './IonIcon';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const { navigateTo, isFavorite, toggleFavorite, isInCompare, addToCompare, removeFromCompare } = useApp();
  const [imageError, setImageError] = useState(false);

  const favorite = isFavorite(vehicle.id);
  const inCompare = isInCompare(vehicle.id);

  const isCostReduced = Boolean(vehicle.originalCost && vehicle.originalCost > vehicle.cost);
  const savings = isCostReduced && vehicle.originalCost ? vehicle.originalCost - vehicle.cost : 0;

  const formattedCost = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(vehicle.cost);

  const formattedOriginalCost = vehicle.originalCost
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(vehicle.originalCost)
    : null;

  const handleCardClick = () => {
    navigateTo(vehicle.type === 'car' ? 'car-details' : 'motorcycle-details', vehicle.id);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(vehicle.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(vehicle.id);
    } else {
      addToCompare(vehicle.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#0f172a] border border-slate-800/80 rounded-md overflow-hidden hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
        {!imageError ? (
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 text-center">
            <IonIcon
              name={vehicle.type === 'car' ? 'car-sport-outline' : 'bicycle-outline'}
              size={36}
              className="text-blue-400 mb-2 opacity-80"
            />
            <span className="text-sm font-semibold text-slate-300">
              {vehicle.brand} {vehicle.model}
            </span>
            <span className="text-xs text-slate-500 mt-1">{vehicle.category}</span>
          </div>
        )}

        {/* Category Pill Tag & Cost Reduced Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 flex-wrap max-w-[85%]">
          <span className="px-2.5 py-1 rounded-sm bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-medium text-slate-200 shadow-sm">
            {vehicle.category}
          </span>
          {isCostReduced && (
            <span className="px-2 py-0.5 rounded-sm bg-emerald-500/90 text-slate-950 font-bold text-[11px] shadow-sm flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <span>Cost Reduced (-${savings.toLocaleString()})</span>
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-sm backdrop-blur-md border flex items-center justify-center transition-all cursor-pointer ${
            favorite
              ? 'bg-red-500/20 border-red-500/40 text-red-500'
              : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <IonIcon
            name={favorite ? 'heart' : 'heart-outline'}
            size={16}
            className={favorite ? 'text-red-500' : ''}
          />
        </button>

        {/* Quick Compare Indicator / Toggle */}
        <button
          onClick={handleCompareClick}
          title={inCompare ? 'Remove from compare' : 'Add to compare'}
          className={`absolute top-3 left-3 w-8 h-8 rounded-sm backdrop-blur-md border flex items-center justify-center transition-all cursor-pointer ${
            inCompare
              ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/30'
              : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800 opacity-0 group-hover:opacity-100'
          }`}
        >
          <IonIcon name="git-compare-outline" size={15} />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Year Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>{vehicle.brand}</span>
            <span>{vehicle.year}</span>
          </div>

          {/* Model Name */}
          <h3 className="mt-1 text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors line-clamp-1">
            {vehicle.model}
          </h3>

          {/* Quick Specifications Line */}
          <div className="mt-3 py-1.5 px-2.5 rounded-sm bg-slate-900/60 border border-slate-800/60 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-1.5 truncate max-w-[55%]">
              <IonIcon name="speedometer-outline" size={14} className="text-blue-400 shrink-0" />
              <span className="truncate">{vehicle.horsepower} HP</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 truncate max-w-[40%] text-slate-400">
              <span className="truncate">{vehicle.fuelEconomy}</span>
            </div>
          </div>
        </div>

        {/* Price & View Details Action */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                Reference MSRP
              </span>
              {isCostReduced && (
                <span className="text-[10px] font-bold text-emerald-400">
                  Reduced
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5">
              {isCostReduced && formattedOriginalCost && (
                <span className="text-xs text-slate-500 line-through font-semibold tabular-nums">
                  {formattedOriginalCost}
                </span>
              )}
              <span className={`text-lg font-extrabold tracking-tight tabular-nums ${isCostReduced ? 'text-emerald-400' : 'text-white'}`}>
                {formattedCost}
              </span>
            </div>
          </div>

          <button
            onClick={handleCardClick}
            className="px-3 py-1.5 rounded-sm bg-slate-800/80 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer group/btn"
          >
            <span>Details</span>
            <IonIcon
              name="chevron-forward-outline"
              size={14}
              className="group-hover/btn:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
