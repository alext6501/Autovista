import React from 'react';
import { useApp } from '../../context/AppContext';
import { IonIcon } from './IonIcon';
import { PageRoute } from '../../types/vehicle';
import { CarBrandsMarquee } from './CarBrandsMarquee';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  const quickLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Cars', route: 'cars' },
    { label: 'Motorcycles', route: 'motorcycles' },
    { label: 'Brands', route: 'brands' },
    { label: 'Compare', route: 'compare' },
    { label: 'About', route: 'about' },
    { label: 'Contact', route: 'contact' },
  ];

  return (
    <footer className="w-full bg-[#070b12] border-t border-slate-800/80 text-slate-400">
      {/* Non-stop Continuous Flowing Car Brands Marquee */}
      <CarBrandsMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.jpg"
                alt="VEYRO Logo"
                className="w-8 h-8 object-contain rounded-md border border-slate-800"
              />
              <span className="text-xl font-black tracking-wider text-white font-display">
                VEYRO<span className="text-blue-500 font-semibold text-xs tracking-widest ml-1 uppercase">Motors</span>
              </span>
            </div>
            
            <p className="mt-3 text-base font-medium text-slate-300">
              Explore. Compare. Discover.
            </p>
            
            <p className="mt-2 text-sm text-slate-400 max-w-md leading-relaxed">
              VeyroMotors is an independent automotive and motorcycle specification catalog. Discover comprehensive technical data, compare models side-by-side, and explore verified reference costs without sales friction.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-slate-700 transition-colors"
                aria-label="Facebook"
              >
                <IonIcon name="logo-facebook" size={17} />
              </a>
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-slate-700 transition-colors"
                aria-label="Twitter"
              >
                <IonIcon name="logo-twitter" size={17} />
              </a>
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-slate-700 transition-colors"
                aria-label="Instagram"
              >
                <IonIcon name="logo-instagram" size={17} />
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-slate-700 transition-colors"
                aria-label="YouTube"
              >
                <IonIcon name="logo-youtube" size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => navigateTo(link.route)}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog Transparency / Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Catalog Standard
            </h3>
            <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
              <p>
                VeyroMotors is purely an informational specification archive. We do not sell, broker, or transact vehicles.
              </p>
              <p>
                All prices shown represent manufacturer suggested retail prices (MSRP) or base reference costs at time of documentation.
              </p>
              <div className="pt-2 text-slate-400">
                <span>Headquarters: Munich & Tokyo</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and status bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 VeyroMotors. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Research & Specification Portal</span>
            <span>·</span>
            <span>Zero E-Commerce / No Sales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
