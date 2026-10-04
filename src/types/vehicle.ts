export type VehicleType = 'car' | 'motorcycle';

export interface Vehicle {
  id: string;
  type: VehicleType;
  brand: string;
  model: string;
  year: number;
  cost: number; // MSRP reference cost in USD
  originalCost?: number; // Pre-reduction MSRP if cost was reduced
  costReducedDate?: string;
  category: string; // e.g. Sedan, Coupe, SUV, Naked, Sport, Cruiser, Adventure
  image: string;
  gallery: string[];
  engine: string;
  displacement?: string;
  horsepower: number;
  torque: string;
  fuelType: 'Gasoline' | 'Electric' | 'Hybrid' | 'Diesel';
  transmission: string;
  fuelEconomy: string;
  weight: string;
  seatingCapacity: number;
  topSpeed: string;
  acceleration?: string; // 0-60 mph
  drivetrain?: string;
  features: string[];
  description: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  isLatest?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  type: VehicleType | 'both';
  origin: string;
  founded: number;
  logo: string;
  description: string;
  modelCount: number;
}

export type PageRoute = 
  | 'home'
  | 'cars'
  | 'motorcycles'
  | 'brands'
  | 'compare'
  | 'favorites'
  | 'profile'
  | 'about'
  | 'contact'
  | 'search'
  | 'admin'
  | 'car-details'
  | 'motorcycle-details';
