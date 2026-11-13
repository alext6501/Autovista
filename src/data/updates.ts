import { AutomotiveUpdate } from '../types/vehicle';
import { CAR_IMAGES } from './carImages';

export const AUTOMOTIVE_UPDATES: AutomotiveUpdate[] = [
  {
    id: 'bmw-x5-2025-launched',
    title: 'New BMW X5 2025 Launched',
    date: 'Oct 10, 2025',
    category: 'Model Launch',
    image: CAR_IMAGES.bmwX52025,
    relatedVehicleId: 'bmw-x5-2025',
    summary:
      'BMW introduces the 2025 X5 with revised 48-volt mild-hybrid inline-six powertrains, updated iDrive 8.5 hardware, and refined exterior lighting.',
    content: [
      'The 2025 BMW X5 arrives with meaningful powertrain efficiency gains across its inline-six and V8 lineups, integrating a 48-volt mild-hybrid electric motor inside the 8-speed Steptronic transmission for smoother stop-start transitions and sharper low-end throttle response.',
      'Inside the cabin, BMW’s expansive Curved Display combines a 12.3-inch instrument cluster and 14.9-inch central touchscreen running Operating System 8.5, paired with tactile climate shortcuts and streamlined voice commands.',
      'Chassis calibration receives updated adaptive damping software as standard, preserving the X5’s reputation for balancing long-distance comfort with composed cornering stability.'
    ]
  },
  {
    id: 'toyota-next-gen-prius',
    title: 'Toyota Unveils Next-Gen Prius',
    date: 'Oct 5, 2025',
    category: 'Hybrid Technology',
    image: CAR_IMAGES.toyotaPrius2025,
    relatedVehicleId: 'toyota-prius-2025',
    summary:
      'Toyota’s latest Prius pairs a sleek fastback silhouette with fifth-generation hybrid synergy engineering delivering up to 57 MPG combined.',
    content: [
      'Toyota’s newest Prius generation marks a decisive architectural shift, lowering the roofline by nearly two inches and widening the rear track for planted road manners.',
      'Powered by a 2.0-liter four-cylinder engine working in tandem with Toyota’s fifth-generation dual-motor hybrid transaxle, output reaches 196 horsepower with available electronic all-wheel drive.',
      'Despite significantly quicker acceleration, aerodynamic refinements keep the drag coefficient low enough to preserve class-benchmark fuel efficiency.'
    ]
  },
  {
    id: 'mercedes-eqs-upgrade',
    title: 'Mercedes-Benz EQS Gets an Upgrade',
    date: 'Sep 28, 2025',
    category: 'Electric Flagship',
    image: CAR_IMAGES.mercedesEqs,
    relatedVehicleId: 'mercedes-benz-eqs',
    summary:
      'Mercedes-Benz enhances the flagship EQS electric sedan with a larger 118 kWh battery pack, improved regenerative braking, and classic grille styling.',
    content: [
      'Mercedes-Benz has upgraded the flagship EQS sedan for the new model year with an enlarged 118 kWh usable battery pack, extending highway cruising range while retaining 200 kW DC fast-charging speeds.',
      'Visual updates include a new traditional chrome-slat front fascia paired with a standing three-pointed hood star, answering customer feedback for classic executive presence.',
      'Rear passengers also benefit from upgraded Executive Interior seating angles and thicker acoustic cushioning.'
    ]
  },
  {
    id: 'porsche-911-carrera-update',
    title: 'Porsche Refines 911 Carrera Chassis Calibration',
    date: 'Sep 18, 2025',
    category: 'Engineering',
    image: CAR_IMAGES.porsche911,
    relatedVehicleId: 'porsche-911-carrera',
    summary:
      'Subtle aerodynamics, upgraded twin-turbo boxer cooling, and a curved digital driver display headline the latest 911 Carrera specification.',
    content: [
      'Porsche continues its measured evolution of the 911 Carrera with larger front cooling intakes, updated Matrix LED headlamps, and refined 3.0-liter twin-turbocharged flat-six internals borrowed from higher trims.',
      'Output climbs to 388 horsepower, paired exclusively with an 8-speed PDK dual-clutch transmission tuned for instantaneous downshifts under braking.'
    ]
  },
  {
    id: 'ferrari-296-gtb-hybrid-benchmark',
    title: 'Ferrari 296 GTB Sets New V6 Hybrid Benchmark',
    date: 'Sep 09, 2025',
    category: 'Performance',
    image: CAR_IMAGES.ferrari296,
    relatedVehicleId: 'ferrari-296-gtb',
    summary:
      'Maranello’s 120-degree twin-turbo V6 plug-in hybrid platform delivers 819 horsepower with instantaneous electric torque fill.',
    content: [
      'The Ferrari 296 GTB showcases how compact electrification sharpens mid-engine responsiveness rather than adding compromises.',
      'Its axial-flux electric motor sits between the V6 and 8-speed dual-clutch gearbox, eliminating turbo lag completely and enabling silent zero-emission urban cruising up to 15 miles.'
    ]
  },
  {
    id: 'hyundai-ioniq-6-aerodynamic-efficiency',
    title: 'Hyundai Ioniq 6 Achieves 0.21 Cd Efficiency',
    date: 'Aug 27, 2025',
    category: 'Electric Mobility',
    image: CAR_IMAGES.hyundaiIoniq6,
    relatedVehicleId: 'hyundai-ioniq-6',
    summary:
      'Wind-tunnel-honed streamliner proportions allow Hyundai’s 800V sedan to maximize highway efficiency without oversized batteries.',
    content: [
      'Built on the E-GMP 800-volt platform, the Hyundai Ioniq 6 demonstrates how low-drag aerodynamics unlock real-world long-distance EV usability.',
      'Active air flaps, wheel-gap reducers, and a boat-tail rear taper work together to keep energy consumption minimal at highway speeds.'
    ]
  }
];
