import React from 'react';
import { useApp } from '../context/AppContext';
import { ABOUT_STUDIO_IMAGE } from '../data/vehicles';
import { IonIcon } from '../components/common/IonIcon';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  const corePillars = [
    {
      title: 'Large Database',
      desc: 'Extensive coverage across passenger cars, supercars, hyper naked roadsters, supersport bikes, cruisers, and electric powertrains.',
      icon: 'grid-outline',
    },
    {
      title: 'Accurate Information',
      desc: 'Factory verified engine specifications, displacement metrics, power outputs, torque curves, and official manufacturer MSRP reference costs.',
      icon: 'checkmark-circle-outline',
    },
    {
      title: 'Modern & Easy to Use',
      desc: 'An uncluttered, rapid responsive interface crafted specifically for side-by-side vehicle comparison and intuitive browsing without ad clutter.',
      icon: 'flash-outline',
    },
    {
      title: 'Always Up To Date',
      desc: 'Continually refreshed with latest 2024–2026 production releases, facelifts, generational shifts, and emerging zero-emission models.',
      icon: 'time-outline',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full flex flex-col gap-12 sm:gap-16">
      
      {/* Page Title */}
      <div className="pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
          Independent Vehicle Discovery
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
          About VeyroMotors
        </h1>
        <p className="mt-2 text-base sm:text-lg text-slate-400 max-w-2xl">
          Your trusted, unbiased source for automobile and motorcycle specifications, engineering data, and reference costs.
        </p>
      </div>

      {/* Hero Studio Photography & Mission Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Studio Image */}
        <div className="lg:col-span-6">
          <div className="rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative aspect-[16/10] group">
            <img
              src={ABOUT_STUDIO_IMAGE}
              alt="VeyroMotors automotive studio"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17]/80 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-md border border-slate-700/60 text-xs text-slate-300">
              <span className="font-semibold text-white block">VeyroMotors Engineering Archive</span>
              <span className="text-slate-400">Curating specifications from global test tracks and manufacturer labs.</span>
            </div>
          </div>
        </div>

        {/* Right Mission Prose */}
        <div className="lg:col-span-6 flex flex-col gap-5 text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Our Mission: Transparent Engineering Data
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            VeyroMotors was founded with a straightforward goal: create a refined, uncluttered digital haven for automotive and motorcycle enthusiasts to research, contrast, and discover vehicles without the high-pressure sales funnels of dealerships or marketplaces.
          </p>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Whether you are analyzing the compression ratio and dry weight of a middleweight naked motorcycle or comparing the fuel economy and passenger volume of a compact sedan, VeyroMotors brings clean, structured technical information directly to your screen.
          </p>

          <div className="p-4 rounded-md bg-blue-950/20 border border-blue-500/30 text-xs sm:text-sm text-slate-300 flex items-start gap-3">
            <IonIcon name="information-circle-outline" size={20} className="text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Showcase Only • Non-Commercial Guarantee</strong>
              We do not sell cars or motorcycles, take commissions, broker inventory, or process financial transactions. Our sole objective is neutral, premium informational presentation.
            </div>
          </div>
        </div>

      </div>

      {/* Four Pillars Grid */}
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            What VeyroMotors Delivers
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Built from the ground up for clarity, speed, and technical depth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-md bg-[#0f172a] border border-slate-800 hover:border-blue-500/30 transition-all flex flex-col"
            >
              <div className="w-12 h-12 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <IonIcon name={pillar.icon} size={22} />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {pillar.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed flex-1">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <div className="p-8 sm:p-12 rounded-md bg-[#0f172a] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Ready to explore the latest models?
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Dive into our cars and motorcycles directory now.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('cars')}
            className="px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Explore Cars
          </button>
          <button
            onClick={() => navigateTo('motorcycles')}
            className="px-5 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors cursor-pointer"
          >
            Explore Motorcycles
          </button>
        </div>
      </div>

    </div>
  );
};
