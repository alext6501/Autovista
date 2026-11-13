import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AUTOMOTIVE_UPDATES } from '../data/updates';

export const UpdatesPage: React.FC = () => {
  const { selectedUpdateId, navigateTo, getVehicleById } = useApp();

  const activeUpdate = selectedUpdateId
    ? AUTOMOTIVE_UPDATES.find((u) => u.id === selectedUpdateId) ?? null
    : null;

  if (activeUpdate) {
    const relatedVehicle = activeUpdate.relatedVehicleId
      ? getVehicleById(activeUpdate.relatedVehicleId)
      : undefined;

    return (
      <div className="bg-white text-black py-8">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigateTo('updates', { updateId: null })}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Latest Updates</span>
          </button>

          <article className="mt-5 border border-neutral-200 bg-white">
            <div className="aspect-[16/9] w-full bg-neutral-100 border-b border-neutral-200 overflow-hidden">
              <img
                src={activeUpdate.image}
                alt={activeUpdate.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="text-xs text-neutral-500">
                {activeUpdate.category} · {activeUpdate.date}
              </div>

              <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black">
                {activeUpdate.title}
              </h1>

              <p className="mt-4 text-base font-medium text-neutral-800 leading-relaxed">
                {activeUpdate.summary}
              </p>

              <div className="mt-5 space-y-4 text-sm text-neutral-700 leading-relaxed">
                {activeUpdate.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {relatedVehicle && (
                <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-semibold text-neutral-500">
                      Featured Vehicle in This Report
                    </div>
                    <div className="text-base font-bold text-black">
                      {relatedVehicle.model} —{' '}
                      <span className="tabular-nums">${relatedVehicle.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      navigateTo('car-details', { vehicleId: relatedVehicle.id })
                    }
                    className="bg-black text-white px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-neutral-800 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span>View Full Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black py-8">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-neutral-200">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
            Latest Automotive Updates
          </h1>
          <p className="mt-1.5 text-sm text-neutral-600">
            Model launches, technical updates, and engineering highlights curated by ShiftRoute.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUTOMOTIVE_UPDATES.map((item) => (
            <article
              key={item.id}
              onClick={() => navigateTo('updates', { updateId: item.id })}
              className="border border-neutral-200 bg-white flex flex-col cursor-pointer hover:border-black transition-colors group"
            >
              <div className="aspect-[16/10] w-full bg-neutral-100 border-b border-neutral-200 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-neutral-500">
                    {item.category} · {item.date}
                  </div>
                  <h2 className="mt-1.5 text-lg font-bold text-black leading-snug group-hover:underline">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-xs text-neutral-700 leading-relaxed">{item.summary}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-200 inline-flex items-center gap-1.5 text-xs font-semibold text-black">
                  <span>Read Update</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
