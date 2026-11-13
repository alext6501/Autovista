import React from 'react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { activeToast } = useApp();

  if (!activeToast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-black text-white px-4 py-2.5 text-xs font-medium border border-black">
      {activeToast.message}
    </div>
  );
};
