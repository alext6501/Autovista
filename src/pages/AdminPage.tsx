import React, { useState } from 'react';
import { Lock, LogOut, Plus, Trash2, ArrowRight, Upload } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POPULAR_BRANDS } from '../data/brands';
import { CAR_IMAGES } from '../data/carImages';
import { Vehicle } from '../types/vehicle';

const PRESET_IMAGES = [
  { label: 'White Sports Coupe', url: CAR_IMAGES.heroWhiteSupra },
  { label: 'White Land Cruiser SUV', url: CAR_IMAGES.landCruiser300 },
  { label: 'Black BMW 7 Series', url: CAR_IMAGES.bmw7Series },
  { label: 'Silver Mercedes S-Class', url: CAR_IMAGES.mercedesSClass },
  { label: 'Red Audi A8', url: CAR_IMAGES.audiA8 },
  { label: 'Blue Ford Mustang', url: CAR_IMAGES.fordMustang },
  { label: 'Blue BMW X5 SUV', url: CAR_IMAGES.bmwX52025 },
  { label: 'White Toyota Prius', url: CAR_IMAGES.toyotaPrius2025 },
  { label: 'Silver Mercedes EQS', url: CAR_IMAGES.mercedesEqs },
  { label: 'Chalk Porsche 911', url: CAR_IMAGES.porsche911 },
  { label: 'Grey Lamborghini Huracan', url: CAR_IMAGES.lamborghiniHuracan },
  { label: 'Red Ferrari 296 GTB', url: CAR_IMAGES.ferrari296 },
  { label: 'Gunmetal Nissan GT-R', url: CAR_IMAGES.nissanGtr },
  { label: 'Silver Hyundai Ioniq 6', url: CAR_IMAGES.hyundaiIoniq6 }
];

export const AdminPage: React.FC = () => {
  const {
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    addVehicle,
    deleteCustomVehicle,
    vehicles,
    navigateTo
  } = useApp();

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Add Car Form State
  const [brand, setBrand] = useState('BMW');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2026);
  const [price, setPrice] = useState(85000);
  const [category, setCategory] = useState<Vehicle['category']>('Sedan');
  const [image, setImage] = useState<string>(CAR_IMAGES.bmwX52025);
  const [engine, setEngine] = useState('3.0L Inline-6 TwinPower Turbo');
  const [shortEngine, setShortEngine] = useState('3.0L I6');
  const [displacement, setDisplacement] = useState('2,998 cc');
  const [horsepower, setHorsepower] = useState(375);
  const [torque, setTorque] = useState('398 lb-ft @ 1,850 RPM');
  const [fuelType, setFuelType] = useState<Vehicle['fuelType']>('Gasoline');
  const [transmission, setTransmission] = useState('8-Speed Automatic');
  const [shortTransmission, setShortTransmission] = useState<Vehicle['shortTransmission']>('Automatic');
  const [drivetrain, setDrivetrain] = useState('All-Wheel Drive (AWD)');
  const [shortDrivetrain, setShortDrivetrain] = useState<Vehicle['shortDrivetrain']>('AWD');
  const [topSpeed, setTopSpeed] = useState('155 mph');
  const [acceleration, setAcceleration] = useState('4.8 sec (0-60 mph)');
  const [fuelEconomy, setFuelEconomy] = useState('23 City / 29 Hwy MPG');
  const [weight, setWeight] = useState('4,450 lbs');
  const [seatingCapacity, setSeatingCapacity] = useState(5);
  const [featuresText, setFeaturesText] = useState(
    'Adaptive Air Suspension, Digital Cockpit Display, Driver Assistance Package, Matrix LED Headlights'
  );
  const [description, setDescription] = useState('');
  const [postToLatest, setPostToLatest] = useState(true);
  const [pinToFeatured, setPinToFeatured] = useState(false);
  const [formError, setFormError] = useState('');
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null);

  const customCars = vehicles.filter((v) => v.isCustom);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = adminLogin(email, password);
    if (!success) {
      setLoginError('Invalid administrator email or password.');
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePublishCar = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!model.trim()) {
      setFormError('Please enter a car model name.');
      return;
    }
    if (!description.trim()) {
      setFormError('Please enter a brief overview description for the car.');
      return;
    }

    const fullModelName = model.toLowerCase().startsWith(brand.toLowerCase())
      ? model.trim()
      : `${brand.trim()} ${model.trim()}`;

    const newId = addVehicle({
      brand,
      model: fullModelName,
      year: Number(year),
      price: Number(price),
      category,
      image,
      engine,
      shortEngine,
      displacement,
      horsepower: Number(horsepower),
      torque,
      fuelType,
      transmission,
      shortTransmission,
      drivetrain,
      shortDrivetrain,
      topSpeed,
      acceleration,
      fuelEconomy,
      weight,
      seatingCapacity: Number(seatingCapacity),
      features: featuresText
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
      description,
      postToLatest,
      pinToFeatured
    });

    setLastCreatedId(newId);
    setModel('');
    setDescription('');
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="bg-white text-black py-16">
        <div className="max-w-[440px] mx-auto px-4">
          <div className="border border-black p-7 bg-white">
            <div className="flex items-center gap-2.5 mb-2">
              <Lock className="w-5 h-5 text-black" aria-hidden="true" />
              <h1 className="text-xl font-bold tracking-tight text-black">
                ShiftRoute Admin Access
              </h1>
            </div>
            <p className="text-xs text-neutral-600 mb-6">
              Authorized staff portal for publishing new vehicles and posting updates to Latest Cars.
            </p>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-black mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@shiftroute.com"
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>

              {loginError && (
                <div className="p-2.5 border border-black bg-neutral-100 text-xs font-medium text-black">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full h-11 bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Sign In to Admin
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-neutral-200 text-[11px] text-neutral-500">
              Default Staff Credentials: <strong className="text-black">admin@shiftroute.com</strong>{' '}
              / <strong className="text-black">shiftroute2025</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black py-8">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Admin Header */}
        <div className="pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
              ShiftRoute Admin — Publish New Cars
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-neutral-600">
              Add new cars to the ShiftRoute catalog and automatically post them to Latest Cars & Updates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="border border-neutral-300 px-4 py-2 text-xs font-semibold text-black hover:border-black transition-colors cursor-pointer"
            >
              View Home
            </button>
            <button
              type="button"
              onClick={adminLogout}
              className="bg-black text-white px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {lastCreatedId && (
          <div className="mt-6 p-4 border border-black bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs sm:text-sm font-semibold text-black">
              Car published successfully to All Cars and posted under Latest Cars & Updates.
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('car-details', { vehicleId: lastCreatedId })}
                className="bg-black text-white px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-neutral-800 cursor-pointer"
              >
                <span>Inspect New Car</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => navigateTo('updates')}
                className="border border-black px-3.5 py-2 text-xs font-semibold text-black hover:bg-neutral-100 cursor-pointer"
              >
                View Latest Updates
              </button>
            </div>
          </div>
        )}

        {/* Main 2-Column Workspace */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Add New Car Form */}
          <form
            onSubmit={handlePublishCar}
            className="lg:col-span-8 border border-neutral-200 p-6 bg-white space-y-6"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
              <Plus className="w-4 h-4 text-black" aria-hidden="true" />
              <h2 className="text-lg font-bold text-black">Add New Car Specification</h2>
            </div>

            {/* Identity & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                >
                  {POPULAR_BRANDS.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">Model Name *</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. M5 Competition"
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">Model Year</label>
                <input
                  type="number"
                  min={1990}
                  max={2030}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black tabular-nums focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">
                  Indicative Price (USD)
                </label>
                <input
                  type="number"
                  min={5000}
                  step={500}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black tabular-nums focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Vehicle['category'])}
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Supercar">Supercar</option>
                  <option value="Hatchback">Hatchback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">Fuel Type</label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value as Vehicle['fuelType'])}
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                >
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
            </div>

            {/* Powertrain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 border-t border-neutral-200">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-black mb-1">Full Engine Name</label>
                <input
                  type="text"
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">
                  Card Engine Label
                </label>
                <input
                  type="text"
                  value={shortEngine}
                  onChange={(e) => setShortEngine(e.target.value)}
                  placeholder="e.g. 4.4L V8"
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">
                  Horsepower (hp)
                </label>
                <input
                  type="number"
                  min={50}
                  max={2500}
                  value={horsepower}
                  onChange={(e) => setHorsepower(Number(e.target.value))}
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black tabular-nums focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">Torque</label>
                <input
                  type="text"
                  value={torque}
                  onChange={(e) => setTorque(e.target.value)}
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">
                  Displacement / Battery
                </label>
                <input
                  type="text"
                  value={displacement}
                  onChange={(e) => setDisplacement(e.target.value)}
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Drivetrain & Performance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-neutral-200">
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Transmission</label>
                <select
                  value={shortTransmission}
                  onChange={(e) => {
                    const val = e.target.value as Vehicle['shortTransmission'];
                    setShortTransmission(val);
                    setTransmission(val === 'Manual' ? '6-Speed Manual' : '8-Speed Automatic');
                  }}
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">Drivetrain</label>
                <select
                  value={shortDrivetrain}
                  onChange={(e) => {
                    const val = e.target.value as Vehicle['shortDrivetrain'];
                    setShortDrivetrain(val);
                    setDrivetrain(val);
                  }}
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                >
                  <option value="AWD">AWD</option>
                  <option value="RWD">RWD</option>
                  <option value="FWD">FWD</option>
                  <option value="4WD">4WD</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">Top Speed</label>
                <input
                  type="text"
                  value={topSpeed}
                  onChange={(e) => setTopSpeed(e.target.value)}
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">0–60 mph</label>
                <input
                  type="text"
                  value={acceleration}
                  onChange={(e) => setAcceleration(e.target.value)}
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">
                  Efficiency / Range
                </label>
                <input
                  type="text"
                  value={fuelEconomy}
                  onChange={(e) => setFuelEconomy(e.target.value)}
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">Curb Weight</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">Seating</label>
                <input
                  type="number"
                  min={1}
                  max={9}
                  value={seatingCapacity}
                  onChange={(e) => setSeatingCapacity(Number(e.target.value))}
                  required
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black tabular-nums focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Image Selection or Upload */}
            <div className="pt-2 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-8 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-black mb-1">
                    Select Studio / Catalog Image
                  </label>
                  <select
                    value={PRESET_IMAGES.some((p) => p.url === image) ? image : ''}
                    onChange={(e) => {
                      if (e.target.value) setImage(e.target.value);
                    }}
                    className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                  >
                    <option value="">Custom Uploaded / URL Image</option>
                    {PRESET_IMAGES.map((preset) => (
                      <option key={preset.label} value={preset.url}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black mb-1">
                    Or Upload Car Photo from Device
                  </label>
                  <label className="h-10 px-3 border border-neutral-300 bg-white hover:border-black flex items-center gap-2 text-xs font-medium text-black cursor-pointer">
                    <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Choose Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="md:col-span-4">
                <div className="text-xs font-semibold text-black mb-1">Preview</div>
                <div className="aspect-[16/10] w-full border border-neutral-200 bg-neutral-100 overflow-hidden">
                  <img
                    src={image}
                    alt="Car preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Description & Features */}
            <div className="pt-2 border-t border-neutral-200 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-black mb-1">
                  Overview Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the vehicle's engineering highlights, powertrain character, and segment positioning..."
                  required
                  className="w-full p-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-1">
                  Standard Features (comma-separated)
                </label>
                <input
                  type="text"
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full h-10 px-3 text-sm border border-neutral-300 bg-white text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Posting Options */}
            <div className="pt-2 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center gap-5">
              <label className="inline-flex items-center gap-2 text-xs font-semibold text-black cursor-pointer">
                <input
                  type="checkbox"
                  checked={postToLatest}
                  onChange={(e) => setPostToLatest(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <span>Post to Latest Cars & Latest Updates (Home)</span>
              </label>

              <label className="inline-flex items-center gap-2 text-xs font-semibold text-black cursor-pointer">
                <input
                  type="checkbox"
                  checked={pinToFeatured}
                  onChange={(e) => setPinToFeatured(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <span>Also Pin to Featured Cars Row</span>
              </label>
            </div>

            {formError && (
              <div className="p-3 border border-black bg-neutral-100 text-xs font-medium text-black">
                {formError}
              </div>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto px-8 h-11 bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Publish Car to Latest Cars
            </button>
          </form>

          {/* Right: Published Custom Cars & Catalog Summary */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="border border-neutral-200 p-5 bg-white">
              <h2 className="text-base font-bold text-black pb-3 border-b border-neutral-200">
                Admin Published Cars ({customCars.length})
              </h2>

              {customCars.length > 0 ? (
                <div className="divide-y divide-neutral-200">
                  {customCars.map((car) => (
                    <div key={car.id} className="py-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={car.image}
                          alt={car.model}
                          referrerPolicy="no-referrer"
                          className="w-16 h-10 object-cover border border-neutral-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => navigateTo('car-details', { vehicleId: car.id })}
                            className="text-xs font-bold text-black hover:underline truncate block text-left cursor-pointer"
                          >
                            {car.model} ({car.year})
                          </button>
                          <div className="text-[11px] text-neutral-500 tabular-nums">
                            ${car.price.toLocaleString()} · Latest Cars
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteCustomVehicle(car.id)}
                        aria-label={`Delete ${car.model}`}
                        className="p-1.5 text-neutral-500 hover:text-black border border-neutral-200 hover:border-black transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="pt-4 text-xs text-neutral-600 leading-relaxed">
                  No custom cars published yet. Use the form to add a new car and it will immediately appear under Latest Cars and Latest Updates.
                </p>
              )}
            </div>

            <div className="border border-neutral-200 p-5 bg-neutral-50 text-xs text-neutral-700 leading-relaxed">
              <strong className="text-black block mb-1">Direct URL Access Only</strong>
              This administration portal is accessible only by typing{' '}
              <code className="font-mono text-black">/admin</code> in the browser URL bar and has no
              public navigation links.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
