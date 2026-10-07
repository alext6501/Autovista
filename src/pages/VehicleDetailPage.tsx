import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VEHICLES_DATA } from '../data/vehicles';
import { VehicleCard } from '../components/common/VehicleCard';
import { IonIcon } from '../components/common/IonIcon';

export const VehicleDetailPage: React.FC = () => {
  const {
    selectedVehicleId,
    navigateTo,
    isFavorite,
    toggleFavorite,
    isInCompare,
    addToCompare,
    removeFromCompare,
    vehicles,
  } = useApp();

  const vehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'specifications' | 'features' | 'gallery'>('overview');
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

  // Similar vehicles of same type
  const similarVehicles = vehicles.filter(
    (v) => v.type === vehicle.type && v.id !== vehicle.id
  ).slice(0, 3);

  const currentImage = vehicle.gallery[selectedImageIndex] || vehicle.image;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full flex flex-col gap-8 sm:gap-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-blue-400 transition-colors cursor-pointer"
        >
          Home
        </button>
        <IonIcon name="chevron-forward-outline" size={12} className="text-slate-600" />
        <button
          onClick={() => navigateTo(vehicle.type === 'car' ? 'cars' : 'motorcycles')}
          className="hover:text-blue-400 transition-colors cursor-pointer capitalize"
        >
          {vehicle.type === 'car' ? 'Cars' : 'Motorcycles'}
        </button>
        <IonIcon name="chevron-forward-outline" size={12} className="text-slate-600" />
        <span className="text-slate-200 font-medium truncate">
          {vehicle.brand} {vehicle.model}
        </span>
      </nav>

      {/* Main Showcase Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Gallery Thumbnails + Main Viewport (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          
          {/* Main Large Image */}
          <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            {!imageError ? (
              <img
                src={currentImage}
                alt={`${vehicle.brand} ${vehicle.model}`}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 p-6 text-center">
                <IonIcon
                  name={vehicle.type === 'car' ? 'car-sport-outline' : 'bicycle-outline'}
                  size={48}
                  className="text-blue-500 mb-2 opacity-80"
                />
                <span className="text-base font-semibold text-slate-200">
                  {vehicle.brand} {vehicle.model}
                </span>
                <span className="text-xs text-slate-500 mt-1">{vehicle.category}</span>
              </div>
            )}

            <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-semibold text-blue-400">
              {vehicle.year} · {vehicle.category}
            </div>
          </div>

          {/* Interactive Thumbnails Gallery */}
          {vehicle.gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
              {vehicle.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setImageError(false);
                  }}
                  className={`relative w-20 sm:w-24 aspect-[16/10] rounded-md overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-blue-500 scale-102 shadow-md shadow-blue-500/20'
                      : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Vehicle Header & Quick Specs (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#0f172a] border border-slate-800 rounded-md p-6 sm:p-8">
          <div>
            {/* Brand & Reference Price */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  {vehicle.brand}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mt-0.5">
                  {vehicle.model}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {vehicle.year} · {vehicle.category}
                </p>
              </div>

              <div className="text-right">
                <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                  Reference Cost
                </span>
                <div className="flex flex-col items-end">
                  {isCostReduced && formattedOriginalCost && (
                    <span className="text-sm font-semibold text-slate-500 line-through tabular-nums">
                      {formattedOriginalCost}
                    </span>
                  )}
                  <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums ${isCostReduced ? 'text-emerald-400' : 'text-white'}`}>
                    {formattedCost}
                  </span>
                </div>
                <span className="block text-[10px] text-slate-400 mt-0.5">
                  {isCostReduced ? `MSRP (Reduced -$${savings.toLocaleString()})` : 'MSRP Base'}
                </span>
              </div>
            </div>

            {/* Cost Reduction Notice Banner */}
            {isCostReduced && (
              <div className="mt-4 p-3 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <IonIcon name="checkmark-circle-outline" size={16} />
                  <span>Cost Reduced for {vehicle.brand} {vehicle.model}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-extrabold text-[11px]">
                  -${savings.toLocaleString()} Reduction
                </span>
              </div>
            )}

            {/* Quick Spec Highlights Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-3.5 rounded-md bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <IonIcon name="speedometer-outline" size={16} className="text-blue-400" />
                  <span>Engine</span>
                </div>
                <span className="mt-1 block text-sm font-bold text-white truncate" title={vehicle.engine}>
                  {vehicle.displacement || vehicle.engine.split(' ')[0]}
                </span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-md bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <IonIcon name="flash-outline" size={16} className="text-blue-400" />
                  <span>Horsepower</span>
                </div>
                <span className="mt-1 block text-sm font-bold text-white tabular-nums">
                  {vehicle.horsepower} HP
                </span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-md bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <IonIcon name="swap-horizontal" size={16} className="text-blue-400" />
                  <span>Transmission</span>
                </div>
                <span className="mt-1 block text-sm font-bold text-white truncate" title={vehicle.transmission}>
                  {vehicle.transmission.split(' ')[0]}
                </span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-md bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <IonIcon name="speedometer-outline" size={16} className="text-blue-400" />
                  <span>Fuel Economy</span>
                </div>
                <span className="mt-1 block text-sm font-bold text-white truncate">
                  {vehicle.fuelEconomy}
                </span>
              </div>
            </div>

            {/* Additional Specs Row */}
            <div className="mt-4 py-3 px-4 rounded-md bg-slate-900/50 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div>
                <span className="text-slate-400">Weight: </span>
                <strong className="text-white">{vehicle.weight}</strong>
              </div>
              <span className="text-slate-600">·</span>
              <div>
                <span className="text-slate-400">Seating: </span>
                <strong className="text-white">{vehicle.seatingCapacity} {vehicle.seatingCapacity === 1 ? 'Seat' : 'Seats'}</strong>
              </div>
              <span className="text-slate-600">·</span>
              <div>
                <span className="text-slate-400">Top Speed: </span>
                <strong className="text-white">{vehicle.topSpeed}</strong>
              </div>
            </div>

          </div>

          {/* Action Buttons: Add to Favorites & Compare */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => toggleFavorite(vehicle.id)}
              className={`w-full sm:flex-1 py-3 px-4 rounded-md font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                favorite
                  ? 'bg-red-500/15 border border-red-500/40 text-red-400 hover:bg-red-500/25'
                  : 'bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200'
              }`}
            >
              <IonIcon
                name={favorite ? 'heart' : 'heart-outline'}
                size={18}
                className={favorite ? 'text-red-500' : ''}
              />
              <span>{favorite ? 'Saved to Favorites' : 'Add to Favorites'}</span>
            </button>

            <button
              onClick={() => {
                if (!inCompare) {
                  addToCompare(vehicle.id);
                }
                navigateTo('compare');
              }}
              className={`w-full sm:flex-1 py-3 px-4 rounded-md font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                inCompare
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
              }`}
            >
              <IonIcon name="git-compare-outline" size={18} />
              <span>{inCompare ? 'Open in Compare' : 'Compare Model'}</span>
            </button>
          </div>

          {/* Informational Disclaimer Badge */}
          <div className="mt-4 text-center">
            <p className="text-[11px] text-slate-400">
              Reference specification showcase • Not an e-commerce dealership
            </p>
          </div>

        </div>

      </div>

      {/* Tabs Section: Overview, Specifications, Features, Gallery */}
      <div className="w-full">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: 'information-circle-outline' },
            { id: 'specifications', label: 'Specifications', icon: 'speedometer-outline' },
            { id: 'features', label: 'Key Features', icon: 'checkmark-circle-outline' },
            { id: 'gallery', label: 'Gallery', icon: 'image-outline' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Panes */}
        <div className="mt-6">
          {/* TAB 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* About text + Key Features */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="p-6 rounded-md bg-[#0f172a] border border-slate-800">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    About This Model
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {vehicle.description}
                  </p>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    The {vehicle.year} {vehicle.brand} {vehicle.model} represents modern engineering excellence in the {vehicle.category.toLowerCase()} class, offering a balanced combination of responsive powertrain performance, refined aerodynamics, and passenger ergonomics.
                  </p>
                </div>

                <div className="p-6 rounded-md bg-[#0f172a] border border-slate-800">
                  <h3 className="text-lg font-bold text-white tracking-tight mb-4">
                    Key Features Checklist
                  </h3>
                  <ul className="space-y-3">
                    {vehicle.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                        <IonIcon
                          name="checkmark-circle-outline"
                          size={18}
                          className="text-blue-400 shrink-0 mt-0.5"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Box: Engine & Performance */}
              <div className="lg:col-span-5 p-6 rounded-md bg-[#0f172a] border border-slate-800 flex flex-col gap-4">
                <h3 className="text-lg font-bold text-white tracking-tight pb-3 border-b border-slate-800">
                  Engine & Performance
                </h3>

                <div className="space-y-3.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Powertrain</span>
                    <span className="font-semibold text-white text-right max-w-[65%] truncate">
                      {vehicle.engine}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Displacement</span>
                    <span className="font-semibold text-white">
                      {vehicle.displacement || 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Horsepower</span>
                    <span className="font-semibold text-blue-400 tabular-nums">
                      {vehicle.horsepower} HP
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Torque</span>
                    <span className="font-semibold text-white">
                      {vehicle.torque}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Transmission</span>
                    <span className="font-semibold text-white text-right max-w-[60%] truncate">
                      {vehicle.transmission}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Fuel Type</span>
                    <span className="font-semibold text-white">
                      {vehicle.fuelType}
                    </span>
                  </div>

                  {vehicle.acceleration && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Acceleration (0-60)</span>
                      <span className="font-semibold text-white">
                        {vehicle.acceleration}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Top Speed</span>
                    <span className="font-semibold text-white">
                      {vehicle.topSpeed}
                    </span>
                  </div>

                  {vehicle.drivetrain && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Drivetrain</span>
                      <span className="font-semibold text-white text-right max-w-[60%] truncate">
                        {vehicle.drivetrain}
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Specifications Table */}
          {activeTab === 'specifications' && (
            <div className="p-6 rounded-md bg-[#0f172a] border border-slate-800 overflow-x-auto">
              <h3 className="text-lg font-bold text-white tracking-tight mb-4">
                Full Technical Specifications
              </h3>
              <table className="w-full text-left text-sm border-collapse">
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-400 w-1/3">Brand & Model</td>
                    <td className="py-3 px-4 font-semibold text-white">{vehicle.brand} {vehicle.model}</td>
                  </tr>
                  <tr className="border-b border-slate-800 bg-slate-900/40">
                    <td className="py-3 px-4 font-medium text-slate-400">Model Year</td>
                    <td className="py-3 px-4 font-semibold text-white">{vehicle.year}</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-400">Vehicle Category</td>
                    <td className="py-3 px-4 font-semibold text-white">{vehicle.category}</td>
                  </tr>
                  <tr className="border-b border-slate-800 bg-slate-900/40">
                    <td className="py-3 px-4 font-medium text-slate-400">Manufacturer MSRP</td>
                    <td className="py-3 px-4 font-bold text-blue-400 tabular-nums">{formattedCost}</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-400">Engine Configuration</td>
                    <td className="py-3 px-4 font-semibold text-white">{vehicle.engine}</td>
                  </tr>
                  <tr className="border-b border-slate-800 bg-slate-900/40">
                    <td className="py-3 px-4 font-medium text-slate-400">Maximum Power</td>
                    <td className="py-3 px-4 font-semibold text-white tabular-nums">{vehicle.horsepower} Horsepower</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-400">Peak Torque</td>
                    <td className="py-3 px-4 font-semibold text-white">{vehicle.torque}</td>
                  </tr>
                  <tr className="border-b border-slate-800 bg-slate-900/40">
                    <td className="py-3 px-4 font-medium text-slate-400">Transmission</td>
                    <td className="py-3 px-4 font-semibold text-white">{vehicle.transmission}</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-400">Fuel Economy / Range</td>
                    <td className="py-3 px-4 font-semibold text-white">{vehicle.fuelEconomy}</td>
                  </tr>
                  <tr className="border-b border-slate-800 bg-slate-900/40">
                    <td className="py-3 px-4 font-medium text-slate-400">Curb / Wet Weight</td>
                    <td className="py-3 px-4 font-semibold text-white">{vehicle.weight}</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-400">Seating Capacity</td>
                    <td className="py-3 px-4 font-semibold text-white">{vehicle.seatingCapacity} Occupants</td>
                  </tr>
                  <tr className="bg-slate-900/40">
                    <td className="py-3 px-4 font-medium text-slate-400">Top Speed</td>
                    <td className="py-3 px-4 font-semibold text-white">{vehicle.topSpeed}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: Features */}
          {activeTab === 'features' && (
            <div className="p-6 sm:p-8 rounded-md bg-[#0f172a] border border-slate-800">
              <h3 className="text-lg font-bold text-white tracking-tight mb-6">
                Standard & Available Equipment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicle.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-md bg-slate-900/70 border border-slate-800 flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                      <IonIcon name="checkmark-circle-outline" size={18} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block">{feat}</span>
                      <span className="text-xs text-slate-400 mt-0.5 block">Standard factory specification for {vehicle.model}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Gallery */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicle.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="rounded-md overflow-hidden bg-slate-900 border border-slate-800 aspect-[16/10] group"
                >
                  <img
                    src={imgUrl}
                    alt={`${vehicle.brand} ${vehicle.model} gallery ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Similar / Related Vehicles Section */}
      <div className="w-full pt-8 border-t border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Similar {vehicle.type === 'car' ? 'Cars' : 'Motorcycles'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore alternative models in the same vehicle class.
            </p>
          </div>
          <button
            onClick={() => navigateTo(vehicle.type === 'car' ? 'cars' : 'motorcycles')}
            className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View Catalog</span>
            <IonIcon name="chevron-forward-outline" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarVehicles.map((item) => (
            <VehicleCard key={item.id} vehicle={item} />
          ))}
        </div>
      </div>

    </div>
  );
};
