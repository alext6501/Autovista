import React from 'react';
import { Car, BarChart2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { navigateTo, vehicles } = useApp();

  return (
    <div className="bg-white text-black py-8">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-neutral-200">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
            About ShiftRoute
          </h1>
          <p className="mt-2 text-base text-neutral-700 max-w-2xl">
            ShiftRoute is an independent informational automotive catalog built to help drivers
            research vehicles, compare technical specifications, and explore indicative pricing in one clean workspace.
          </p>
        </div>

        {/* Key Pillars */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 border-t border-l border-neutral-200">
          <div className="p-6 border-r border-b border-neutral-200">
            <Car className="w-7 h-7 text-black mb-3" strokeWidth={1.8} aria-hidden="true" />
            <h2 className="text-base font-bold text-black mb-1.5">Premium Selection</h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Curated coverage across leading global manufacturers—from rugged SUVs and executive
              sedans to high-efficiency hybrids and mid-engine sports cars.
            </p>
          </div>

          <div className="p-6 border-r border-b border-neutral-200">
            <BarChart2 className="w-7 h-7 text-black mb-3" strokeWidth={1.8} aria-hidden="true" />
            <h2 className="text-base font-bold text-black mb-1.5">Detailed Specifications</h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Standardized technical breakdowns including engine displacement, horsepower, torque,
              drivetrain layout, transmission type, maximum speed, and weight.
            </p>
          </div>

          <div className="p-6 border-r border-b border-neutral-200">
            <ShieldCheck className="w-7 h-7 text-black mb-3" strokeWidth={1.8} aria-hidden="true" />
            <h2 className="text-base font-bold text-black mb-1.5">Trusted Informational Platform</h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Objective specification records without sales pressure, dealer markups, checkout flows,
              or sponsored rankings.
            </p>
          </div>
        </div>

        {/* Informational Catalog Rule */}
        <div className="mt-8 border border-black p-6 sm:p-8 bg-white">
          <h2 className="text-xl font-bold text-black mb-2">
            Informational Catalog Policy
          </h2>
          <p className="text-sm text-neutral-700 leading-relaxed max-w-3xl">
            ShiftRoute is strictly an informational automotive catalog—not an online dealership or
            retailer. We do not process payments, accept orders, or facilitate online vehicle
            purchases. All displayed prices are indicative manufacturer reference values intended for
            comparison and research only, and actual pricing may vary by market, location,
            specification, condition, and model year.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('all-cars')}
              className="bg-black text-white px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-2 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <span>Browse {vehicles.length} Models</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => navigateTo('compare')}
              className="border border-black text-black px-5 py-2.5 text-xs font-semibold hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Compare Specifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
