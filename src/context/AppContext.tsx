import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageRoute, Vehicle } from '../types/vehicle';
import { VEHICLES_DATA } from '../data/vehicles';

interface NotificationToast {
  id: string;
  message: string;
}

interface AppContextType {
  currentRoute: PageRoute;
  selectedVehicleId: string | null;
  selectedUpdateId: string | null;
  selectedBrand: string | null;
  searchQuery: string;
  savedVehicles: string[];
  compareList: string[];
  useMetric: boolean;
  isSearchOpen: boolean;
  activeToast: NotificationToast | null;
  vehicles: Vehicle[];

  navigateTo: (
    route: PageRoute,
    options?: {
      vehicleId?: string | null;
      brand?: string | null;
      updateId?: string | null;
      search?: string;
    }
  ) => void;
  setSelectedBrand: (brand: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSearchOpen: (open: boolean) => void;
  toggleSavedVehicle: (vehicleId: string) => void;
  clearSavedVehicles: () => void;
  isSavedVehicle: (vehicleId: string) => boolean;
  toggleCompareVehicle: (vehicleId: string) => void;
  removeFromCompare: (vehicleId: string) => void;
  clearCompare: () => void;
  isInCompare: (vehicleId: string) => boolean;
  setCompareSlot: (index: number, vehicleId: string | null) => void;
  setUseMetric: (metric: boolean) => void;
  showToast: (message: string) => void;
  getVehicleById: (id: string) => Vehicle | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    'toyota-land-cruiser-300'
  );
  const [selectedUpdateId, setSelectedUpdateId] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
  const [activeToast, setActiveToast] = useState<NotificationToast | null>(null);

  const [savedVehicles, setSavedVehicles] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('shiftroute_saved_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter((id) => VEHICLES_DATA.some((v) => v.id === id));
        }
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('shiftroute_compare_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter((id) => VEHICLES_DATA.some((v) => v.id === id)).slice(0, 3);
        }
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [useMetric, setUseMetric] = useState<boolean>(() => {
    try {
      return localStorage.getItem('shiftroute_metric_v1') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shiftroute_saved_v1', JSON.stringify(savedVehicles));
    } catch {
      // ignore
    }
  }, [savedVehicles]);

  useEffect(() => {
    try {
      localStorage.setItem('shiftroute_compare_v1', JSON.stringify(compareList));
    } catch {
      // ignore
    }
  }, [compareList]);

  useEffect(() => {
    try {
      localStorage.setItem('shiftroute_metric_v1', String(useMetric));
    } catch {
      // ignore
    }
  }, [useMetric]);

  const showToast = (message: string) => {
    const id = Date.now().toString();
    setActiveToast({ id, message });
    setTimeout(() => {
      setActiveToast((prev) => (prev?.id === id ? null : prev));
    }, 3000);
  };

  const navigateTo: AppContextType['navigateTo'] = (route, options) => {
    if (options?.vehicleId !== undefined) {
      setSelectedVehicleId(options.vehicleId);
    }
    if (options?.brand !== undefined) {
      setSelectedBrand(options.brand);
    } else if (route !== 'all-cars') {
      setSelectedBrand(null);
    }
    if (options?.updateId !== undefined) {
      setSelectedUpdateId(options.updateId);
    }
    if (options?.search !== undefined) {
      setSearchQuery(options.search);
    }
    setCurrentRoute(route);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSavedVehicle = (vehicleId: string) => {
    setSavedVehicles((prev) => {
      if (prev.includes(vehicleId)) {
        showToast('Removed from saved vehicles');
        return prev.filter((id) => id !== vehicleId);
      }
      showToast('Saved to your vehicle list');
      return [...prev, vehicleId];
    });
  };

  const clearSavedVehicles = () => {
    setSavedVehicles([]);
    showToast('Cleared all saved vehicles');
  };

  const isSavedVehicle = (vehicleId: string) => savedVehicles.includes(vehicleId);

  const toggleCompareVehicle = (vehicleId: string) => {
    if (compareList.includes(vehicleId)) {
      setCompareList((prev) => prev.filter((id) => id !== vehicleId));
      showToast('Removed from comparison');
      return;
    }
    if (compareList.length >= 3) {
      showToast('Compare up to 3 cars at once. Remove one to add another.');
      return;
    }
    setCompareList((prev) => [...prev, vehicleId]);
    showToast('Added to comparison');
  };

  const removeFromCompare = (vehicleId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== vehicleId));
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Comparison cleared');
  };

  const isInCompare = (vehicleId: string) => compareList.includes(vehicleId);

  const setCompareSlot = (index: number, vehicleId: string | null) => {
    setCompareList((prev) => {
      const next = [...prev];
      if (!vehicleId) {
        next.splice(index, 1);
        return next;
      }
      const existingIndex = next.indexOf(vehicleId);
      if (existingIndex !== -1 && existingIndex !== index) {
        next.splice(existingIndex, 1);
      }
      if (index < next.length) {
        next[index] = vehicleId;
      } else {
        next.push(vehicleId);
      }
      return next.slice(0, 3);
    });
  };

  const getVehicleById = (id: string) => VEHICLES_DATA.find((v) => v.id === id);

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        selectedVehicleId,
        selectedUpdateId,
        selectedBrand,
        searchQuery,
        savedVehicles,
        compareList,
        useMetric,
        isSearchOpen,
        activeToast,
        vehicles: VEHICLES_DATA,
        navigateTo,
        setSelectedBrand,
        setSearchQuery,
        setSearchOpen,
        toggleSavedVehicle,
        clearSavedVehicles,
        isSavedVehicle,
        toggleCompareVehicle,
        removeFromCompare,
        clearCompare,
        isInCompare,
        setCompareSlot,
        setUseMetric,
        showToast,
        getVehicleById
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return ctx;
};
