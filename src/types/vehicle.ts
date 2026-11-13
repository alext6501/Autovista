export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number; // Indicative reference price in USD
  category: 'Sedan' | 'SUV' | 'Coupe' | 'Supercar' | 'Hatchback';
  image: string;
  gallery: string[];
  engine: string;
  shortEngine: string;
  displacement: string;
  horsepower: number;
  torque: string;
  fuelType: 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: string;
  shortTransmission: 'Automatic' | 'Manual';
  drivetrain: string;
  shortDrivetrain: 'AWD' | 'RWD' | 'FWD' | '4WD';
  topSpeed: string;
  acceleration: string;
  fuelEconomy: string;
  weight: string;
  seatingCapacity: number;
  features: string[];
  description: string;
  isFeatured?: boolean;
  featuredOrder?: number;
}

export interface Brand {
  id: string;
  name: string;
  origin: string;
  founded: number;
  description: string;
  headquarters: string;
}

export interface AutomotiveUpdate {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  summary: string;
  content: string[];
  relatedVehicleId?: string;
}

export type PageRoute =
  | 'home'
  | 'all-cars'
  | 'brands'
  | 'compare'
  | 'about'
  | 'updates'
  | 'profile'
  | 'car-details';
