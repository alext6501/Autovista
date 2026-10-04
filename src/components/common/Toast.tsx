import React from 'react';
import { useApp } from '../../context/AppContext';
import { IonIcon } from './IonIcon';

export const Toast: React.FC = () => {
  const { activeToast } = useApp();

  if (!activeToast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-blue-500/40 text-slate-100 shadow-2xl shadow-blue-500/10 max-w-md">
        <IonIcon
          name={activeToast.type === 'success' ? 'checkmark-circle-outline' : 'information-circle-outline'}
          size={20}
          className="text-blue-400 shrink-0"
        />
        <span className="text-sm font-medium">{activeToast.message}</span>
      </div>
    </div>
  );
};
