import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IonIcon } from '../components/common/IonIcon';
import { Vehicle, VehicleType } from '../types/vehicle';

export const AdminPage: React.FC = () => {
  const {
    vehicles,
    addVehicle,
    updateVehicleCost,
    deleteVehicle,
    resetCatalog,
    navigateTo,
    showToast,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
  } = useApp();

  // Admin Login State
  const [loginEmail, setLoginEmail] = useState('admin@autovista.com');
  const [loginPassword, setLoginPassword] = useState('autovista2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'reductions'>('manage');
  const [filterType, setFilterType] = useState<VehicleType | 'all'>('all');
  const [filterReducedOnly, setFilterReducedOnly] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Editing cost modal / inline state
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [costInput, setCostInput] = useState<string>('');

  const handleAdminSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = adminLogin(loginEmail, loginPassword);
    if (!success) {
      setLoginError('Invalid administrator email or password. Please try again.');
    }
  };

  const handleAutoFillDemo = () => {
    setLoginEmail('admin@autovista.com');
    setLoginPassword('autovista2026');
    setLoginError('');
  };

  // Add Vehicle Form State
  const [newType, setNewType] = useState<VehicleType>('car');
  const [newBrand, setNewBrand] = useState('Toyota');
  const [newModel, setNewModel] = useState('');
  const [newYear, setNewYear] = useState('2024');
  const [newCost, setNewCost] = useState('');
  const [newCategory, setNewCategory] = useState('Sedan');
  const [newEngine, setNewEngine] = useState('');
  const [newDisplacement, setNewDisplacement] = useState('');
  const [newHorsepower, setNewHorsepower] = useState('');
  const [newTorque, setNewTorque] = useState('');
  const [newFuelType, setNewFuelType] = useState<'Gasoline' | 'Electric' | 'Hybrid' | 'Diesel'>('Gasoline');
  const [newTransmission, setNewTransmission] = useState('');
  const [newFuelEconomy, setNewFuelEconomy] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newSeating, setNewSeating] = useState('5');
  const [newTopSpeed, setNewTopSpeed] = useState('');
  const [newAcceleration, setNewAcceleration] = useState('');
  const [newDrivetrain, setNewDrivetrain] = useState('Rear-Wheel Drive (RWD)');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80');
  const [newDescription, setNewDescription] = useState('');
  const [newFeatures, setNewFeatures] = useState(
    'Touchscreen Infotainment System\nApple CarPlay & Android Auto\nAdvanced Driver Assist Suite\nDual-Zone Automatic Climate Control\nLED Performance Headlamps'
  );
  const [newIsFeatured, setNewIsFeatured] = useState(true);
  const [newIsPopular, setNewIsPopular] = useState(true);

  // Preset images for convenience
  const sampleCarImages = [
    { label: 'Sports Coupe (Red)', url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Executive Sedan (Silver)', url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Compact Sedan (White)', url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Modern SUV (Grey)', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Luxury Dark Sedan', url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Electric Modern Sedan', url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80' },
  ];

  const sampleBikeImages = [
    { label: 'Hyper Naked (Dark)', url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Sport Superbike (Red)', url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Classic Cruiser (Black)', url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80' },
  ];

  // Filtered vehicles for manage list
  const filteredVehicles = vehicles.filter((v) => {
    if (filterType !== 'all' && v.type !== filterType) return false;
    if (filterReducedOnly && !(v.originalCost && v.originalCost > v.cost)) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Reduced vehicles count
  const reducedVehicles = vehicles.filter((v) => v.originalCost && v.originalCost > v.cost);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  const handleOpenCostModal = (vehicle: Vehicle) => {
    setEditingVehicleId(vehicle.id);
    setCostInput(vehicle.cost.toString());
  };

  const handleSaveCost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicleId) return;

    const parsedCost = parseInt(costInput.replace(/[^0-9]/g, ''), 10);
    if (isNaN(parsedCost) || parsedCost <= 0) {
      showToast('Please enter a valid positive cost amount');
      return;
    }

    updateVehicleCost(editingVehicleId, parsedCost);
    setEditingVehicleId(null);
  };

  const handleResetVehicleCost = (vehicle: Vehicle) => {
    if (vehicle.originalCost) {
      updateVehicleCost(vehicle.id, vehicle.originalCost);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newBrand.trim() || !newModel.trim()) {
      showToast('Please enter brand and model');
      return;
    }

    const costNum = parseInt(newCost.replace(/[^0-9]/g, ''), 10);
    if (isNaN(costNum) || costNum <= 0) {
      showToast('Please enter a valid reference cost');
      return;
    }

    const hpNum = parseInt(newHorsepower.replace(/[^0-9]/g, ''), 10) || 150;
    const seatingNum = parseInt(newSeating.replace(/[^0-9]/g, ''), 10) || (newType === 'car' ? 5 : 2);

    const featureList = newFeatures
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const createdId = addVehicle({
      type: newType,
      brand: newBrand.trim(),
      model: newModel.trim(),
      year: parseInt(newYear, 10) || 2024,
      cost: costNum,
      category: newCategory.trim(),
      image: newImage.trim(),
      gallery: [newImage.trim()],
      engine: newEngine.trim() || (newType === 'car' ? '2.0L 4-Cylinder Turbocharged' : '650cc Parallel-Twin'),
      displacement: newDisplacement.trim() || '1,998 cc',
      horsepower: hpNum,
      torque: newTorque.trim() || '200 lb-ft @ 3,500 RPM',
      fuelType: newFuelType,
      transmission: newTransmission.trim() || (newType === 'car' ? '8-Speed Automatic' : '6-Speed Manual'),
      fuelEconomy: newFuelEconomy.trim() || (newType === 'car' ? '28 MPG Combined' : '50 MPG Combined'),
      weight: newWeight.trim() || (newType === 'car' ? '3,400 lbs' : '420 lbs'),
      seatingCapacity: seatingNum,
      topSpeed: newTopSpeed.trim() || '135 mph',
      acceleration: newAcceleration.trim() || '6.2 sec (0-60 mph)',
      drivetrain: newDrivetrain,
      features: featureList.length > 0 ? featureList : ['Factory Performance Tuning', 'LED Lights'],
      description: newDescription.trim() || `The ${newBrand} ${newModel} offers distinctive engineering, modern styling, and balanced vehicle performance in its class.`,
      isFeatured: newIsFeatured,
      isPopular: newIsPopular,
      isLatest: true,
    });

    // Reset some fields and switch to manage tab
    setNewModel('');
    setNewCost('');
    setNewEngine('');
    setNewDescription('');
    setActiveTab('manage');
    navigateTo(newType === 'car' ? 'car-details' : 'motorcycle-details', createdId);
  };

  // IF NOT AUTHENTICATED: Show Admin Login Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24 w-full flex flex-col items-center">
        <div className="w-full bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Top lock icon */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-500 flex items-center justify-center mb-3 shadow-md shadow-blue-500/10">
              <IonIcon name="lock-closed-outline" size={26} />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight font-display">
              Admin Portal
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Sign in with your administrator credentials to manage vehicles and adjust reference costs.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@autovista.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <IonIcon name="mail-outline" size={16} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 pr-10 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <IonIcon name="lock-closed-outline" size={16} />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  <IonIcon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={16} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Unlock Admin Dashboard</span>
              <IonIcon name="arrow-forward-outline" size={16} />
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-300">Demo Administrator Pass:</span>
              <button
                type="button"
                onClick={handleAutoFillDemo}
                className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer underline"
              >
                1-Click Autofill
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-[11px] text-slate-300 space-y-0.5">
              <div>Email: <strong className="text-white">admin@autovista.com</strong></div>
              <div>Password: <strong className="text-white">autovista2026</strong></div>
            </div>
          </div>

          <div className="mt-5 text-center">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Catalog Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex flex-col gap-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Catalog Control Panel
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <IonIcon name="checkmark-circle-outline" size={13} />
              <span>Admin Verified</span>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Catalog Management & Admin
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-400">
            Add new vehicle models, adjust manufacturer reference costs, and monitor price reductions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('add')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <IonIcon name="add-outline" size={18} />
            <span>Add New Vehicle</span>
          </button>

          <button
            onClick={resetCatalog}
            className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 text-xs font-medium transition-colors"
            title="Reset catalog to factory dataset"
          >
            Reset
          </button>

          <button
            onClick={adminLogout}
            className="px-3.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Lock admin session"
          >
            <IonIcon name="lock-closed-outline" size={14} />
            <span>Lock Admin</span>
          </button>
        </div>
      </div>

      {/* Quick Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
            Total Vehicles
          </span>
          <span className="text-2xl font-extrabold text-white mt-1 block tabular-nums">
            {vehicles.length}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
            Cars in Catalog
          </span>
          <span className="text-2xl font-extrabold text-blue-400 mt-1 block tabular-nums">
            {vehicles.filter((v) => v.type === 'car').length}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
            Motorcycles
          </span>
          <span className="text-2xl font-extrabold text-white mt-1 block tabular-nums">
            {vehicles.filter((v) => v.type === 'motorcycle').length}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block">
              Cost Reduced
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-400 mt-1 block tabular-nums">
            {reducedVehicles.length} Models
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'manage'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <IonIcon name="grid-outline" size={16} />
          <span>All Vehicles & Costs ({vehicles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'add'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <IonIcon name="add-circle-outline" size={16} />
          <span>+ Add New Vehicle</span>
        </button>

        <button
          onClick={() => setActiveTab('reductions')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'reductions'
              ? 'bg-emerald-600 text-white'
              : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-900'
          }`}
        >
          <IonIcon name="trending-down-outline" size={16} />
          <span>Cost Reductions Tracker ({reducedVehicles.length})</span>
        </button>
      </div>

      {/* TAB 1: MANAGE VEHICLES & COSTS */}
      {activeTab === 'manage' && (
        <div className="flex flex-col gap-6">
          {/* Filter and Search Bar */}
          <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  filterType === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                All ({vehicles.length})
              </button>
              <button
                onClick={() => setFilterType('car')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  filterType === 'car' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                Cars
              </button>
              <button
                onClick={() => setFilterType('motorcycle')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  filterType === 'motorcycle' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                Motorcycles
              </button>

              <button
                onClick={() => setFilterReducedOnly(!filterReducedOnly)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 ${
                  filterReducedOnly
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Reduced Costs Only</span>
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search model or brand..."
                className="w-full px-3.5 py-1.5 pl-9 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <IonIcon name="search-outline" size={14} />
              </div>
            </div>
          </div>

          {/* Table / List */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-4">Vehicle Model</th>
                    <th className="py-3.5 px-4">Type / Category</th>
                    <th className="py-3.5 px-4">Specifications</th>
                    <th className="py-3.5 px-4">Current MSRP</th>
                    <th className="py-3.5 px-4">Cost Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredVehicles.map((v) => {
                    const isReduced = Boolean(v.originalCost && v.originalCost > v.cost);
                    const diff = isReduced && v.originalCost ? v.originalCost - v.cost : 0;

                    return (
                      <tr key={v.id} className="hover:bg-slate-900/40 transition-colors">
                        {/* Vehicle Brand & Image */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                              <img
                                src={v.image}
                                alt={v.model}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <span className="text-[11px] text-blue-400 font-semibold block">{v.brand}</span>
                              <span className="font-bold text-white block truncate">{v.model}</span>
                              <span className="text-slate-500 text-[11px]">{v.year}</span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 text-slate-300">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs">
                            {v.category}
                          </span>
                        </td>

                        {/* Specs summary */}
                        <td className="py-3.5 px-4 text-slate-400 text-xs">
                          <div>{v.horsepower} HP · {v.transmission.split(' ')[0]}</div>
                          <div className="text-slate-500">{v.fuelEconomy}</div>
                        </td>

                        {/* Current Cost */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            {isReduced && v.originalCost && (
                              <span className="text-xs text-slate-500 line-through tabular-nums">
                                {formatCurrency(v.originalCost)}
                              </span>
                            )}
                            <span className={`text-base font-extrabold tabular-nums ${isReduced ? 'text-emerald-400' : 'text-white'}`}>
                              {formatCurrency(v.cost)}
                            </span>
                          </div>
                        </td>

                        {/* Cost Status Badge */}
                        <td className="py-3.5 px-4">
                          {isReduced ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                              <IonIcon name="trending-down-outline" size={14} />
                              <span>Reduced (-${diff.toLocaleString()})</span>
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500">Standard MSRP</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenCostModal(v)}
                              className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                              title="Update MSRP Reference Cost"
                            >
                              <IonIcon name="pricetag-outline" size={13} />
                              <span>Edit Cost</span>
                            </button>

                            <button
                              onClick={() =>
                                navigateTo(
                                  v.type === 'car' ? 'car-details' : 'motorcycle-details',
                                  v.id
                                )
                              }
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              title="View in Showcase"
                            >
                              <IonIcon name="eye-outline" size={15} />
                            </button>

                            <button
                              onClick={() => deleteVehicle(v.id)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                              title="Delete from Catalog"
                            >
                              <IonIcon name="trash-outline" size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADD NEW CAR / VEHICLE FORM */}
      {activeTab === 'add' && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="pb-4 border-b border-slate-800 mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Add New Vehicle Model
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Fill in the specifications, reference MSRP cost, and description to publish to AutoVista.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('manage')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Back to Catalog
            </button>
          </div>

          <form onSubmit={handleAddSubmit} className="space-y-6">
            
            {/* 1. Basic Identity */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                1. Vehicle Identity & Reference Cost
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Vehicle Type *
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => {
                      const t = e.target.value as VehicleType;
                      setNewType(t);
                      if (t === 'car') {
                        setNewCategory('Sedan');
                        setNewSeating('5');
                      } else {
                        setNewCategory('Naked');
                        setNewSeating('2');
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Brand / Manufacturer *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Toyota, BMW, Porsche"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Model */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Camry XSE, M4 GT, Panigale V4"
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Reference Cost */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Reference Cost (MSRP $) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    placeholder="e.g. 32500"
                    value={newCost}
                    onChange={(e) => setNewCost(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

              </div>
            </div>

            {/* 2. Classification & Dimensions */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                2. Classification & Dimensions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Model Year
                  </label>
                  <select
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Category / Body Style
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={newType === 'car' ? 'e.g. Sedan, Coupe, SUV' : 'e.g. Naked, Sport, Cruiser'}
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Fuel / Powertrain
                  </label>
                  <select
                    value={newFuelType}
                    onChange={(e) => setNewFuelType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Gasoline">Gasoline</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Seating Capacity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="9"
                    value={newSeating}
                    onChange={(e) => setNewSeating(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

              </div>
            </div>

            {/* 3. Powertrain & Performance */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                3. Powertrain & Technical Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Engine / Motor Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2.5L 4-Cylinder DOHC 16V"
                    value={newEngine}
                    onChange={(e) => setNewEngine(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Horsepower (HP) *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 203"
                    value={newHorsepower}
                    onChange={(e) => setNewHorsepower(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Torque
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 184 lb-ft @ 4,000 RPM"
                    value={newTorque}
                    onChange={(e) => setNewTorque(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Transmission
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 8-Speed Automatic, 6-Speed Manual"
                    value={newTransmission}
                    onChange={(e) => setNewTransmission(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Fuel Economy / Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 32 MPG Combined or 310 Miles Range"
                    value={newFuelEconomy}
                    onChange={(e) => setNewFuelEconomy(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Weight (lbs)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3,350 lbs"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

              </div>
            </div>

            {/* 4. Media & Description */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                4. Photography, Description & Features
              </h3>

              <div className="space-y-4">
                {/* Image URL with Presets */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Vehicle Showcase Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />

                  {/* Preset photo pickers */}
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-500">Suggested High-Res Photos:</span>
                    {(newType === 'car' ? sampleCarImages : sampleBikeImages).map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewImage(sample.url)}
                        className={`px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors ${
                          newImage === sample.url ? 'ring-1 ring-blue-500 text-white' : ''
                        }`}
                      >
                        {sample.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Model Overview Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide a comprehensive technical overview and character of this vehicle model..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                {/* Key Features */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Key Features Checklist (one item per line)
                  </label>
                  <textarea
                    rows={4}
                    value={newFeatures}
                    onChange={(e) => setNewFeatures(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Vehicle will be instantly added to the catalog, search index, and comparison engine.
              </span>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
              >
                <IonIcon name="checkmark-circle-outline" size={18} />
                <span>Publish to Catalog</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* TAB 3: COST REDUCTIONS TRACKER */}
      {activeTab === 'reductions' && (
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800">
            <h2 className="text-xl font-bold text-white tracking-tight mb-2">
              Reduced Cost Models Showcase
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
              These vehicles currently have active price adjustments where the current reference MSRP is lower than their baseline MSRP. They display the green <strong>Cost Reduced</strong> badge and strikethrough pricing across cards and detail pages.
            </p>
          </div>

          {reducedVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reducedVehicles.map((vehicle) => {
                const diff = (vehicle.originalCost || 0) - vehicle.cost;
                const percent = Math.round((diff / (vehicle.originalCost || 1)) * 100);

                return (
                  <div
                    key={vehicle.id}
                    className="bg-[#0f172a] border border-emerald-500/30 rounded-2xl overflow-hidden shadow-xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 mb-3 relative">
                        <img
                          src={vehicle.image}
                          alt={vehicle.model}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-bold text-xs shadow-md">
                          -${diff.toLocaleString()} ({percent}%)
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{vehicle.brand}</span>
                        <span>{vehicle.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mt-0.5">
                        {vehicle.model} ({vehicle.year})
                      </h3>

                      <div className="mt-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase text-slate-500 block">Baseline MSRP</span>
                          <span className="text-xs text-slate-400 line-through font-semibold tabular-nums">
                            {formatCurrency(vehicle.originalCost || 0)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase text-emerald-400 font-semibold block">Reduced MSRP</span>
                          <span className="text-lg font-extrabold text-emerald-400 tabular-nums">
                            {formatCurrency(vehicle.cost)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenCostModal(vehicle)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold transition-colors"
                      >
                        Adjust Cost
                      </button>

                      <button
                        onClick={() => handleResetVehicleCost(vehicle)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                        title="Revert to baseline MSRP"
                      >
                        Reset Reduction
                      </button>

                      <button
                        onClick={() =>
                          navigateTo(
                            vehicle.type === 'car' ? 'car-details' : 'motorcycle-details',
                            vehicle.id
                          )
                        }
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                      >
                        View Page
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center rounded-2xl bg-[#0f172a] border border-slate-800 p-8">
              <IonIcon name="trending-down-outline" size={32} className="text-slate-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No active cost reductions</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                Go to the "All Vehicles & Costs" tab, click "Edit Cost" on any model, and enter a lower MSRP to trigger a cost reduction.
              </p>
            </div>
          )}
        </div>
      )}

      {/* EDIT COST MODAL */}
      {editingVehicleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Update Reference Cost</h3>
              <button
                onClick={() => setEditingVehicleId(null)}
                className="text-slate-400 hover:text-white"
              >
                <IonIcon name="close-outline" size={20} />
              </button>
            </div>

            {(() => {
              const currentVeh = vehicles.find((v) => v.id === editingVehicleId);
              if (!currentVeh) return null;

              const enteredNum = parseInt(costInput.replace(/[^0-9]/g, ''), 10) || 0;
              const willBeReduced = enteredNum > 0 && enteredNum < currentVeh.cost;
              const reductionDiff = willBeReduced ? currentVeh.cost - enteredNum : 0;

              return (
                <form onSubmit={handleSaveCost} className="mt-4 space-y-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <img
                      src={currentVeh.image}
                      alt={currentVeh.model}
                      referrerPolicy="no-referrer"
                      className="w-12 h-9 rounded object-cover"
                    />
                    <div>
                      <span className="text-xs text-blue-400 font-semibold block">{currentVeh.brand}</span>
                      <span className="text-sm font-bold text-white block">{currentVeh.model}</span>
                      <span className="text-xs text-slate-400">Current Cost: {formatCurrency(currentVeh.cost)}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      New Reference Cost ($ USD)
                    </label>
                    <input
                      type="number"
                      required
                      min="500"
                      value={costInput}
                      onChange={(e) => setCostInput(e.target.value)}
                      autoFocus
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-base font-bold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {willBeReduced && (
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2 font-medium">
                      <IonIcon name="trending-down-outline" size={16} className="shrink-0" />
                      <span>
                        This is a <strong>${reductionDiff.toLocaleString()} reduction</strong>. A "Cost Reduced" badge will automatically appear on this model.
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingVehicleId(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                    >
                      Save New Cost
                    </button>
                  </div>
                </form>
              );
            })()}
          </div>
        </div>
      )}

    </div>
  );
};
