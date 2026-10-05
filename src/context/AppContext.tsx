import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageRoute, Vehicle } from '../types/vehicle';
import { VEHICLES_DATA } from '../data/vehicles';

interface UserProfile {
  name: string;
  email: string;
  joinedDate: string;
  avatar: string;
  useMetric: boolean;
  currency: 'USD' | 'EUR' | 'GBP';
}

interface NotificationToast {
  id: string;
  message: string;
  type?: 'info' | 'success';
}

interface AppContextType {
  currentRoute: PageRoute;
  selectedVehicleId: string | null;
  selectedBrand: string | null;
  selectedCategory: string | null;
  searchQuery: string;
  favorites: string[];
  compareList: string[];
  viewedVehicles: string[];
  userProfile: UserProfile;
  activeToast: NotificationToast | null;
  vehicles: Vehicle[];
  theme: 'dark' | 'light';
  isAdminAuthenticated: boolean;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  
  // Actions
  navigateTo: (route: PageRoute, vehicleId?: string | null, brand?: string | null, category?: string | null) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleFavorite: (vehicleId: string) => void;
  addToCompare: (vehicleId: string) => void;
  removeFromCompare: (vehicleId: string) => void;
  clearCompare: () => void;
  isFavorite: (vehicleId: string) => boolean;
  isInCompare: (vehicleId: string) => boolean;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  showToast: (message: string, type?: 'info' | 'success') => void;
  getVehicleById: (id: string) => Vehicle | undefined;
  toggleTheme: () => void;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  userLogin: (email: string, password: string) => boolean;
  userLogout: () => void;
  setAuthModalOpen: (open: boolean) => void;

  // Admin Actions
  addVehicle: (vehicleData: Omit<Vehicle, 'id'>) => string;
  updateVehicleCost: (vehicleId: string, newCost: number) => void;
  deleteVehicle: (vehicleId: string) => void;
  resetCatalog: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>('toyota-corolla-2024');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeToast, setActiveToast] = useState<NotificationToast | null>(null);

  // Dynamic vehicles catalog (persisted in localStorage)
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const saved = localStorage.getItem('autovista_vehicles_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return VEHICLES_DATA;
  });

  // Theme State ('dark' | 'light')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const savedTheme = localStorage.getItem('autovista_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    } catch {
      // ignore
    }
    return 'dark';
  });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('autovista_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // User Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('autovista_user_logged_in') === 'true';
    } catch {
      return false;
    }
  });

  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const userLogin = (email: string, _pass: string): boolean => {
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      showToast('Please enter an email address');
      return false;
    }
    setIsLoggedIn(true);
    try {
      localStorage.setItem('autovista_user_logged_in', 'true');
    } catch {
      // ignore
    }

    const namePart = cleanEmail.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    updateUserProfile({ email: cleanEmail, name: formattedName || 'Alex Bonheur' });

    if (
      cleanEmail.toLowerCase() === 'admin@autovista.com' ||
      cleanEmail.toLowerCase() === 'admin@veyromotors.com' ||
      cleanEmail.toLowerCase() === 'admin'
    ) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('autovista_admin_auth', 'true');
      } catch {
        // ignore
      }
    }

    setAuthModalOpen(false);
    showToast(`Signed in as ${formattedName}`, 'success');
    return true;
  };

  const userLogout = () => {
    setIsLoggedIn(false);
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('autovista_user_logged_in');
      sessionStorage.removeItem('autovista_admin_auth');
    } catch {
      // ignore
    }
    showToast('Signed out successfully');
  };

  // Apply theme to document root
  useEffect(() => {
    try {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(theme);
      localStorage.setItem('autovista_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast(`Switched to ${next === 'light' ? 'White / Light' : 'Night / Dark'} mode`);
      return next;
    });
  };

  const adminLogin = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Standard demo credentials
    const isEmailValid =
      cleanEmail === 'admin@veyromotors.com' ||
      cleanEmail === 'admin@autovista.com' ||
      cleanEmail === 'admin';
    const isPassValid =
      cleanPass === 'veyromotors2026' ||
      cleanPass === 'autovista2026' ||
      cleanPass === 'admin123';

    if (isEmailValid && isPassValid) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('autovista_admin_auth', 'true');
      } catch {
        // ignore
      }
      showToast('Admin session verified. Welcome back!', 'success');
      return true;
    }

    showToast('Invalid admin email or password');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('autovista_admin_auth');
    } catch {
      // ignore
    }
    showToast('Admin logged out');
    navigateTo('home');
  };
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('autovista_favorites');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['toyota-corolla-2024', 'ford-mustang-gt-2024', 'yamaha-mt-07-2024', 'ducati-monster-2024'];
  });

  // Compare list initialized with 2 vehicles matching the screenshot
  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('autovista_compare');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['toyota-corolla-2024', 'honda-civic-2024'];
  });

  // Viewed vehicle history
  const [viewedVehicles, setViewedVehicles] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('autovista_viewed');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      'toyota-corolla-2024',
      'ford-mustang-gt-2024',
      'bmw-3-series-2024',
      'honda-civic-2024',
      'yamaha-mt-07-2024',
      'ducati-monster-2024',
      'kawasaki-ninja-zx6r-2024',
      'honda-cbr1000rr-2024',
      'mercedes-benz-c-class-2024',
      'toyota-rav4-2024',
      'bmw-s1000rr-2024',
      'harley-sportster-s-2024'
    ];
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('autovista_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      name: 'Alex Bonheur',
      email: 'alex@example.com',
      joinedDate: 'April 2025',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      useMetric: false,
      currency: 'USD'
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('autovista_vehicles_v1', JSON.stringify(vehicles));
    } catch {
      // ignore
    }
  }, [vehicles]);

  useEffect(() => {
    try {
      localStorage.setItem('autovista_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('autovista_compare', JSON.stringify(compareList));
    } catch {
      // ignore
    }
  }, [compareList]);

  useEffect(() => {
    try {
      localStorage.setItem('autovista_viewed', JSON.stringify(viewedVehicles));
    } catch {
      // ignore
    }
  }, [viewedVehicles]);

  useEffect(() => {
    try {
      localStorage.setItem('autovista_profile', JSON.stringify(userProfile));
    } catch {
      // ignore
    }
  }, [userProfile]);

  const showToast = (message: string, type: 'info' | 'success' = 'info') => {
    const id = Date.now().toString();
    setActiveToast({ id, message, type });
    setTimeout(() => {
      setActiveToast((current) => (current?.id === id ? null : current));
    }, 2800);
  };

  const navigateTo = (
    route: PageRoute,
    vehicleId: string | null = null,
    brand: string | null = null,
    category: string | null = null
  ) => {
    setCurrentRoute(route);
    if (vehicleId) {
      setSelectedVehicleId(vehicleId);
      // Track as viewed
      setViewedVehicles((prev) => (prev.includes(vehicleId) ? prev : [vehicleId, ...prev]));
    }
    if (brand !== undefined) {
      setSelectedBrand(brand);
    }
    if (category !== undefined) {
      setSelectedCategory(category);
    }
    // Scroll window smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (vehicleId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(vehicleId);
      const vehicle = vehicles.find((v) => v.id === vehicleId);
      const title = vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Vehicle';
      if (isFav) {
        showToast(`Removed ${title} from favorites`);
        return prev.filter((id) => id !== vehicleId);
      } else {
        showToast(`Saved ${title} to favorites`, 'success');
        return [...prev, vehicleId];
      }
    });
  };

  const addToCompare = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    const title = vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Vehicle';

    setCompareList((prev) => {
      if (prev.includes(vehicleId)) {
        showToast(`${title} is already in comparison list`);
        return prev;
      }
      if (prev.length >= 3) {
        showToast(`Comparison is limited to 3 vehicles at once.`);
        return prev;
      }
      showToast(`Added ${title} to comparison`, 'success');
      return [...prev, vehicleId];
    });
  };

  const removeFromCompare = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    const title = vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Vehicle';
    setCompareList((prev) => prev.filter((id) => id !== vehicleId));
    showToast(`Removed ${title} from comparison`);
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Comparison list cleared');
  };

  const isFavorite = (vehicleId: string) => favorites.includes(vehicleId);
  const isInCompare = (vehicleId: string) => compareList.includes(vehicleId);

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated', 'success');
  };

  const getVehicleById = (id: string): Vehicle | undefined => {
    return vehicles.find((v) => v.id === id);
  };

  // ADMIN ACTIONS
  const addVehicle = (vehicleData: Omit<Vehicle, 'id'>): string => {
    const slug = `${vehicleData.brand}-${vehicleData.model}-${vehicleData.year}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');
    const newId = `${slug}-${Date.now().toString().slice(-4)}`;

    const newVehicle: Vehicle = {
      ...vehicleData,
      id: newId,
      gallery: vehicleData.gallery && vehicleData.gallery.length > 0 
        ? vehicleData.gallery 
        : [vehicleData.image],
    };

    setVehicles((prev) => [newVehicle, ...prev]);
    showToast(`Added ${newVehicle.brand} ${newVehicle.model} to catalog`, 'success');
    return newId;
  };

  const updateVehicleCost = (vehicleId: string, newCost: number) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== vehicleId) return v;

        const currentCost = v.cost;
        const baseOriginalCost = v.originalCost || currentCost;

        if (newCost < currentCost) {
          const diff = currentCost - newCost;
          showToast(
            `Reduced cost for ${v.brand} ${v.model} by $${diff.toLocaleString()}`,
            'success'
          );
          return {
            ...v,
            cost: newCost,
            originalCost: baseOriginalCost,
            costReducedDate: 'Recently Reduced',
          };
        } else if (newCost > currentCost) {
          showToast(`Updated cost for ${v.brand} ${v.model} to $${newCost.toLocaleString()}`, 'info');
          return {
            ...v,
            cost: newCost,
            originalCost: newCost >= baseOriginalCost ? undefined : baseOriginalCost,
            costReducedDate: newCost >= baseOriginalCost ? undefined : v.costReducedDate,
          };
        }
        return v;
      })
    );
  };

  const deleteVehicle = (vehicleId: string) => {
    const v = vehicles.find((item) => item.id === vehicleId);
    const title = v ? `${v.brand} ${v.model}` : 'Vehicle';
    setVehicles((prev) => prev.filter((item) => item.id !== vehicleId));
    setFavorites((prev) => prev.filter((id) => id !== vehicleId));
    setCompareList((prev) => prev.filter((id) => id !== vehicleId));
    showToast(`Removed ${title} from catalog`);
  };

  const resetCatalog = () => {
    setVehicles(VEHICLES_DATA);
    localStorage.removeItem('autovista_vehicles_v1');
    showToast('Catalog reset to factory dataset', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        selectedVehicleId,
        selectedBrand,
        selectedCategory,
        searchQuery,
        favorites,
        compareList,
        viewedVehicles,
        userProfile,
        activeToast,
        vehicles,
        theme,
        isAdminAuthenticated,
        isLoggedIn,
        isAuthModalOpen,
        navigateTo,
        setSelectedCategory,
        setSearchQuery,
        toggleFavorite,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isFavorite,
        isInCompare,
        updateUserProfile,
        showToast,
        getVehicleById,
        toggleTheme,
        adminLogin,
        adminLogout,
        userLogin,
        userLogout,
        setAuthModalOpen,
        addVehicle,
        updateVehicleCost,
        deleteVehicle,
        resetCatalog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
