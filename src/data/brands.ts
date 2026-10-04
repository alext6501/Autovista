import { Brand } from '../types/vehicle';

export const CAR_BRANDS: Brand[] = [
  {
    id: 'toyota',
    name: 'Toyota',
    type: 'car',
    origin: 'Japan',
    founded: 1937,
    logo: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=200&q=80',
    description: 'Global pioneer in dependable manufacturing, hybrid synergy powertrains, and versatile reliability.',
    modelCount: 2
  },
  {
    id: 'honda',
    name: 'Honda',
    type: 'both',
    origin: 'Japan',
    founded: 1948,
    logo: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=200&q=80',
    description: 'World-renowned engineering mastery across high-revving engines, compact cars, and championship motorcycles.',
    modelCount: 3
  },
  {
    id: 'ford',
    name: 'Ford',
    type: 'car',
    origin: 'United States',
    founded: 1903,
    logo: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=200&q=80',
    description: 'Pioneers of the American automotive dream, home to legendary muscle coupes and rugged trucks.',
    modelCount: 1
  },
  {
    id: 'bmw',
    name: 'BMW',
    type: 'car',
    origin: 'Germany',
    founded: 1916,
    logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=200&q=80',
    description: 'The Ultimate Driving Machine: supreme rear-wheel drive dynamics, luxury cabins, and M performance heritage.',
    modelCount: 1
  },
  {
    id: 'mercedes-benz',
    name: 'Mercedes-Benz',
    type: 'car',
    origin: 'Germany',
    founded: 1926,
    logo: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=200&q=80',
    description: 'The best or nothing. The pinnacle of executive styling, cutting-edge innovation, and opulent craftsmanship.',
    modelCount: 1
  },
  {
    id: 'audi',
    name: 'Audi',
    type: 'car',
    origin: 'Germany',
    founded: 1909,
    logo: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=200&q=80',
    description: 'Vorsprung durch Technik. Master of quattro all-wheel drive, progressive digital cockpits, and understated luxury.',
    modelCount: 1
  },
  {
    id: 'lexus',
    name: 'Lexus',
    type: 'car',
    origin: 'Japan',
    founded: 1989,
    logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=200&q=80',
    description: 'Relentless pursuit of perfection with peerless Takumi craftsmanship, hushed luxury, and longevity.',
    modelCount: 1
  },
  {
    id: 'porsche',
    name: 'Porsche',
    type: 'car',
    origin: 'Germany',
    founded: 1931,
    logo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=200&q=80',
    description: 'Pure motorsport pedigree transferred into everyday road perfection and iconic silhouette excellence.',
    modelCount: 1
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    type: 'car',
    origin: 'South Korea',
    founded: 1967,
    logo: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=200&q=80',
    description: 'Rapidly ascending innovator delivering striking modern aesthetics and Nürburgring-honed N performance cars.',
    modelCount: 1
  },
  {
    id: 'volkswagen',
    name: 'Volkswagen',
    type: 'car',
    origin: 'Germany',
    founded: 1937,
    logo: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=200&q=80',
    description: 'The people car brand that defined hot-hatches with the Golf GTI and brings solid European engineering.',
    modelCount: 1
  },
  {
    id: 'chevrolet',
    name: 'Chevrolet',
    type: 'car',
    origin: 'United States',
    founded: 1911,
    logo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=200&q=80',
    description: 'Deep American roots, bold V8 power, and world-beating mid-engine supercar engineering in the Corvette.',
    modelCount: 1
  },
  {
    id: 'tesla',
    name: 'Tesla',
    type: 'car',
    origin: 'United States',
    founded: 2003,
    logo: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=200&q=80',
    description: 'Leading the global transition to sustainable mobility with autonomous hardware and high-efficiency powertrains.',
    modelCount: 1
  }
];

export const MOTORCYCLE_BRANDS: Brand[] = [
  {
    id: 'yamaha',
    name: 'Yamaha',
    type: 'motorcycle',
    origin: 'Japan',
    founded: 1955,
    logo: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=200&q=80',
    description: 'Revs Your Heart. World championship-winning crossplane CP engines and cutting-edge MT hyper nakeds.',
    modelCount: 2
  },
  {
    id: 'kawasaki',
    name: 'Kawasaki',
    type: 'motorcycle',
    origin: 'Japan',
    founded: 1896,
    logo: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=200&q=80',
    description: 'Uncompromising green performance, aggressive Sugomi streetfighters, and legendary Ninja supersports.',
    modelCount: 2
  },
  {
    id: 'ducati',
    name: 'Ducati',
    type: 'motorcycle',
    origin: 'Italy',
    founded: 1926,
    logo: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=200&q=80',
    description: 'Bolognese passion and desmodromic valve supremacy. MotoGP and WorldSBK champions crafting exotic motorcycles.',
    modelCount: 2
  },
  {
    id: 'bmw-motorrad',
    name: 'BMW Motorrad',
    type: 'motorcycle',
    origin: 'Germany',
    founded: 1923,
    logo: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=200&q=80',
    description: 'Unstoppable GS globetrotters and ShiftCam superbike monsters built with German precision.',
    modelCount: 2
  },
  {
    id: 'harley-davidson',
    name: 'Harley-Davidson',
    type: 'motorcycle',
    origin: 'United States',
    founded: 1903,
    logo: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=200&q=80',
    description: 'The freedom of the open road. Thunderous American V-Twin rumble, custom culture, and modern performance cruisers.',
    modelCount: 1
  },
  {
    id: 'ktm',
    name: 'KTM',
    type: 'motorcycle',
    origin: 'Austria',
    founded: 1934,
    logo: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=200&q=80',
    description: 'READY TO RACE. Ultra-lightweight steel trellis chassis, radical Duke streetfighters, and rally dominance.',
    modelCount: 1
  },
  {
    id: 'suzuki',
    name: 'Suzuki',
    type: 'motorcycle',
    origin: 'Japan',
    founded: 1909,
    logo: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=200&q=80',
    description: 'Iconic GSX-R track lineage and legendary Hayabusa aerodynamic land-missile hyper sports.',
    modelCount: 2
  },
  {
    id: 'triumph',
    name: 'Triumph',
    type: 'motorcycle',
    origin: 'United Kingdom',
    founded: 1902,
    logo: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=200&q=80',
    description: 'British motorcycle royalty and Moto2 engine supplier. Celebrated triple-cylinder engines and modern classics.',
    modelCount: 1
  },
  {
    id: 'royal-enfield',
    name: 'Royal Enfield',
    type: 'motorcycle',
    origin: 'India / UK',
    founded: 1901,
    logo: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=200&q=80',
    description: 'Pure motorcycling simplicity with timeless retro charm, parallel twin character, and enduring adventure appeal.',
    modelCount: 1
  }
];
