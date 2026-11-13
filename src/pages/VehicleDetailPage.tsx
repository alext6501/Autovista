import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/common/VehicleCard';

export const VehicleDetailPage: React.FC = () => {
  const {
    selectedVehicleId,
    vehicles,
    getVehicleById,
    navigateTo,
    toggleCompareVehicle,
    isInCompare,
    toggleSavedVehicle,
    isSavedVehicle
  } = useApp();

  const vehicle = getVehicleById(selectedVehicleId ?? '') ?? vehicles[0];
  const [activeImage, setActiveImage] = useState<string>(vehicle.image);

  useEffect(() => {
    setActiveImage(vehicle.image);
  }, [vehicle.id, vehicle.image]);

  const saved = isSavedVehicle(vehicle.id);
  const compared = isInCompare(vehicle.id);

  const relatedCars = vehicles
    .filter((v) => v.id !== vehicle.id && (v.brand === vehicle.brand || v.category === vehicle.category))
    .slice(0, 4);

  const specs = [
    { label: 'Brand', value: vehicle.brand },
    { label: 'Model', value: vehicle.model },
    { label: 'Model Year', value: String(vehicle.year) },
    { label: 'Body Category', value: vehicle.category },
    { label: 'Engine', value: vehicle.engine },
    { label: 'Displacement / Capacity', value: vehicle.displacement },
    { label: 'Horsepower', value: `${vehicle.horsepower} hp` },
    { label: 'Torque', value: vehicle.torque },
    { label: 'Fuel Type', value: vehicle.fuelType },
    { label: 'Transmission', value: vehicle.transmission },
    { label: 'Drivetrain', value: vehicle.drivetrain },
    { label: 'Maximum Speed', value: vehicle.topSpeed },
    { label: '0–60 mph Acceleration', value: vehicle.acceleration },
    { label: 'Efficiency / Range', value: vehicle.fuelEconomy },
    { label: 'Curb Weight', value: vehicle.weight },
    { label: 'Seating Capacity', value: `${vehicle.seatingCapacity} Passengers` }
  ];

  return (
    <div className="bg-white text-black py-8">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 pb-5 border-b border-neutral-200">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="hover:text-black cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => navigateTo('all-cars', { brand: null, search: '' })}
            className="hover:text-black cursor-pointer"
          >
            All Cars
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => navigateTo('all-cars', { brand: vehicle.brand, search: '' })}
            className="hover:text-black cursor-pointer"
          >
            {vehicle.brand}
          </button>
          <span>/</span>
          <span className="text-black font-semibold">{vehicle.model}</span>
        </div>

        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigateTo('all-cars')}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to All Cars</span>
        </button>

        {/* Main Gallery + Summary Split */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Vehicle Gallery */}
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] w-full border border-neutral-200 bg-neutral-100 overflow-hidden">
              <img
                src={activeImage}
                alt={vehicle.model}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {vehicle.gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {vehicle.gallery.map((imgUrl, idx) => (
                  <button
                    key={`${vehicle.id}-gal-${idx}`}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    className={`aspect-[16/10] border overflow-hidden cursor-pointer transition-colors ${
                      activeImage === imgUrl
                        ? 'border-black border-2'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${vehicle.model} gallery view ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Summary, Indicative Price & Actions */}
          <div className="lg:col-span-5 border border-neutral-200 p-6 bg-white">
            <div className="text-xs font-semibold text-neutral-500">
              {vehicle.brand} · {vehicle.year} · {vehicle.category}
            </div>

            <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-black">
              {vehicle.model}
            </h1>

            <div className="mt-4 pb-4 border-b border-neutral-200">
              <div className="text-[11px] font-medium text-neutral-500">Indicative Price</div>
              <div className="text-3xl font-bold text-black tabular-nums mt-0.5">
                ${vehicle.price.toLocaleString()}
              </div>
            </div>

            <p className="mt-4 text-sm text-neutral-700 leading-relaxed">{vehicle.description}</p>

            {/* Quick Key Highlights */}
            <div className="mt-5 grid grid-cols-2 border-t border-l border-neutral-200">
              <div className="p-3 border-r border-b border-neutral-200">
                <div className="text-[11px] text-neutral-500">Power</div>
                <div className="text-sm font-bold text-black tabular-nums">
                  {vehicle.horsepower} hp
                </div>
              </div>
              <div className="p-3 border-r border-b border-neutral-200">
                <div className="text-[11px] text-neutral-500">Max Speed</div>
                <div className="text-sm font-bold text-black tabular-nums">{vehicle.topSpeed}</div>
              </div>
              <div className="p-3 border-r border-b border-neutral-200">
                <div className="text-[11px] text-neutral-500">Drivetrain</div>
                <div className="text-sm font-bold text-black">{vehicle.shortDrivetrain}</div>
              </div>
              <div className="p-3 border-r border-b border-neutral-200">
                <div className="text-[11px] text-neutral-500">Transmission</div>
                <div className="text-sm font-bold text-black">{vehicle.shortTransmission}</div>
              </div>
            </div>

            {/* Catalog Actions (Compare & Save — NO Purchase / Cart / Buy Now) */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => toggleCompareVehicle(vehicle.id)}
                className={`h-11 px-4 text-xs font-semibold border transition-colors cursor-pointer ${
                  compared
                    ? 'bg-black text-white border-black'
                    : 'bg-black text-white border-black hover:bg-neutral-800'
                }`}
              >
                {compared ? 'Added to Compare' : 'Compare This Car'}
              </button>

              <button
                type="button"
                onClick={() => toggleSavedVehicle(vehicle.id)}
                className={`h-11 px-4 text-xs font-semibold border transition-colors cursor-pointer ${
                  saved
                    ? 'bg-neutral-100 text-black border-black'
                    : 'bg-white text-black border-neutral-300 hover:border-black'
                }`}
              >
                {saved ? 'Saved in Profile' : 'Save Vehicle'}
              </button>
            </div>

            {compared && (
              <button
                type="button"
                onClick={() => navigateTo('compare')}
                className="mt-3 w-full h-10 border border-black text-xs font-semibold text-black hover:bg-neutral-100 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Open Side-by-Side Comparison</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}

            {/* Informational Pricing Disclaimer */}
            <div className="mt-5 p-3.5 border border-neutral-200 bg-neutral-50 flex items-start gap-2.5 text-[11px] text-neutral-700 leading-relaxed">
              <Info className="w-4 h-4 text-black shrink-0 mt-0.5" aria-hidden="true" />
              <p>
                Displayed prices are informational reference estimates only and may vary by market,
                location, condition, trim, and model year. ShiftRoute does not sell vehicles.
              </p>
            </div>
          </div>
        </div>

        {/* Full Technical Specifications Table */}
        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-black mb-4">
            Technical Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-neutral-200">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="p-3.5 border-r border-b border-neutral-200 flex items-center justify-between gap-4"
              >
                <span className="text-xs font-medium text-neutral-600">{spec.label}</span>
                <span className="text-xs sm:text-sm font-bold text-black text-right tabular-nums">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-black mb-4">
            Standard Equipment & Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-200">
            {vehicle.features.map((feature, index) => (
              <div
                key={index}
                className="p-3.5 border-r border-b border-neutral-200 flex items-start gap-2.5"
              >
                <Check className="w-4 h-4 text-black shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-neutral-800">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Related Cars */}
        {relatedCars.length > 0 && (
          <section className="mt-12 pt-8 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight text-black">Similar Cars</h2>
              <button
                type="button"
                onClick={() => navigateTo('all-cars', { brand: null, search: '' })}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-black hover:underline cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedCars.map((car) => (
                <VehicleCard key={car.id} vehicle={car} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
