import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { AutomotiveUpdate, PageRoute, Vehicle } from '../types/vehicle';
import { VEHICLES_DATA } from '../data/vehicles';
import { AUTOMOTIVE_UPDATES } from '../data/updates';

interface NotificationToast {
  id: string;
  message: string;
}

export interface AddVehicleInput {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: Vehicle['category'];
  image: string;
  engine: string;
  shortEngine: string;
  displacement: string;
  horsepower: number;
  torque: string;
  fuelType: Vehicle['fuelType'];
  transmission: string;
  shortTransmission: Vehicle['shortTransmission'];
  drivetrain: string;
  shortDrivetrain: Vehicle['shortDrivetrain'];
  topSpeed: string;
  acceleration: string;
  fuelEconomy: string;
  weight: string;
  seatingCapacity: number;
  features: string[];
  description: string;
  postToLatest?: boolean;
  pinToFeatured?: boolean;
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
  updates: AutomotiveUpdate[];
  isAdminAuthenticated: boolean;

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
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  addVehicle: (input: AddVehicleInput) => string;
  deleteCustomVehicle: (vehicleId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const isUrlAdmin = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase();
  return path.endsWith('/admin') || hash === '#/admin' || hash === '#admin';
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    isUrlAdmin() ? 'admin' : 'home'
  );
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    'toyota-land-cruiser-300'
  );
  const [selectedUpdateId, setSelectedUpdateId] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
  const [activeToast, setActiveToast] = useState<NotificationToast | null>(null);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('shiftroute_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [customVehicles, setCustomVehicles] = useState<Vehicle[]>(() => {
    try {
      const stored = localStorage.getItem('shiftroute_custom_vehicles_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [customUpdates, setCustomUpdates] = useState<AutomotiveUpdate[]>(() => {
    try {
      const stored = localStorage.getItem('shiftroute_custom_updates_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const vehicles = useMemo(
    () => [...customVehicles, ...VEHICLES_DATA],
    [customVehicles]
  );

  const updates = useMemo(
    () => [...customUpdates, ...AUTOMOTIVE_UPDATES],
    [customUpdates]
  );

  const [savedVehicles, setSavedVehicles] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('shiftroute_saved_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
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
          return parsed.slice(0, 3);
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

  // Listen for browser URL navigation (typing /admin, back/forward buttons)
  useEffect(() => {
    const syncFromUrl = () => {
      if (isUrlAdmin()) {
        setCurrentRoute('admin');
      } else if (currentRoute === 'admin') {
        setCurrentRoute('home');
      }
    };
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, [currentRoute]);

  useEffect(() => {
    try {
      localStorage.setItem('shiftroute_custom_vehicles_v1', JSON.stringify(customVehicles));
    } catch {
      // ignore
    }
  }, [customVehicles]);

  useEffect(() => {
    try {
      localStorage.setItem('shiftroute_custom_updates_v1', JSON.stringify(customUpdates));
    } catch {
      // ignore
    }
  }, [customUpdates]);

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

    if (route === 'admin') {
      window.history.pushState(null, '', '/admin');
    } else if (window.location.pathname.toLowerCase().endsWith('/admin') || window.location.hash === '#/admin') {
      window.history.pushState(null, '', '/');
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

  const getVehicleById = (id: string) => vehicles.find((v) => v.id === id);

  const adminLogin = (email: string, password: string): boolean => {
    const validEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@shiftroute.com').toLowerCase();
    const validPass = import.meta.env.VITE_ADMIN_PASSWORD || 'shiftroute2025';
    if (email.trim().toLowerCase() === validEmail && password === validPass) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('shiftroute_admin_auth', 'true');
      } catch {
        // ignore
      }
      showToast('Signed in to ShiftRoute Admin');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('shiftroute_admin_auth');
    } catch {
      // ignore
    }
    showToast('Signed out of Admin');
  };

  const addVehicle = (input: AddVehicleInput): string => {
    const slugBase = `${input.brand}-${input.model}-${input.year}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const id = `${slugBase}-${Date.now().toString().slice(-4)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newVehicle: Vehicle = {
      id,
      brand: input.brand.trim(),
      model: input.model.trim(),
      year: input.year,
      price: input.price,
      category: input.category,
      image: input.image,
      gallery: [input.image],
      engine: input.engine.trim(),
      shortEngine: input.shortEngine.trim(),
      displacement: input.displacement.trim(),
      horsepower: input.horsepower,
      torque: input.torque.trim(),
      fuelType: input.fuelType,
      transmission: input.transmission.trim(),
      shortTransmission: input.shortTransmission,
      drivetrain: input.drivetrain.trim(),
      shortDrivetrain: input.shortDrivetrain,
      topSpeed: input.topSpeed.trim(),
      acceleration: input.acceleration.trim(),
      fuelEconomy: input.fuelEconomy.trim(),
      weight: input.weight.trim(),
      seatingCapacity: input.seatingCapacity,
      features: input.features,
      description: input.description.trim(),
      isFeatured: Boolean(input.pinToFeatured),
      featuredOrder: input.pinToFeatured ? 0 : undefined,
      isLatest: true,
      isCustom: true,
      addedAt: now.toISOString()
    };

    setCustomVehicles((prev) => [newVehicle, ...prev]);

    if (input.postToLatest !== false) {
      const newUpdate: AutomotiveUpdate = {
        id: `update-${id}`,
        title: `New ${newVehicle.model} ${newVehicle.year} Added`,
        date: formattedDate,
        category: 'Latest Cars',
        image: newVehicle.image,
        relatedVehicleId: newVehicle.id,
        isCustom: true,
        summary: `${newVehicle.model} (${newVehicle.year}) joins the ShiftRoute catalog with ${newVehicle.engine}, ${newVehicle.horsepower} hp, and an indicative price of $${newVehicle.price.toLocaleString()}.`,
        content: [
          newVehicle.description,
          `Equipped with a ${newVehicle.engine} paired with ${newVehicle.transmission} and ${newVehicle.drivetrain}, the ${newVehicle.year} ${newVehicle.model} delivers ${newVehicle.horsepower} hp and a maximum speed of ${newVehicle.topSpeed}.`,
          `Indicative manufacturer reference pricing starts at $${newVehicle.price.toLocaleString()} (informational estimate; may vary by market, location, condition, and model year).`
        ]
      };
      setCustomUpdates((prev) => [newUpdate, ...prev]);
    }

    showToast(`${newVehicle.model} published to Latest Cars`);
    return id;
  };

  const deleteCustomVehicle = (vehicleId: string) => {
    setCustomVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
    setCustomUpdates((prev) => prev.filter((u) => u.relatedVehicleId !== vehicleId));
    setSavedVehicles((prev) => prev.filter((id) => id !== vehicleId));
    setCompareList((prev) => prev.filter((id) => id !== vehicleId));
    showToast('Removed custom car from catalog');
  };

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
        vehicles,
        updates,
        isAdminAuthenticated,
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
        getVehicleById,
        adminLogin,
        adminLogout,
        addVehicle,
        deleteCustomVehicle
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
