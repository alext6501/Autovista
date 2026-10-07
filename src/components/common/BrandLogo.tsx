import React from 'react';

interface BrandLogoProps {
  brandName: string;
  className?: string;
  size?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  brandName,
  className = 'w-7 h-7',
  size,
}) => {
  const norm = (brandName || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');

  const style = size ? { width: size, height: size } : undefined;

  switch (norm) {
    case 'toyota':
      return (
        <svg viewBox="0 0 100 80" className={className} style={style} fill="none" aria-label="Toyota">
          {/* Toyota triple interlocking ellipses */}
          <ellipse cx="50" cy="40" rx="46" ry="34" stroke="currentColor" strokeWidth="6" />
          <ellipse cx="50" cy="28" rx="26" ry="14" stroke="currentColor" strokeWidth="6" />
          <ellipse cx="50" cy="48" rx="14" ry="24" stroke="currentColor" strokeWidth="6" />
        </svg>
      );

    case 'honda':
      return (
        <svg viewBox="0 0 100 90" className={className} style={style} fill="currentColor" aria-label="Honda">
          {/* Honda stylized boxed H */}
          <path d="M12 12 C12 7 16 5 22 5 L78 5 C84 5 88 7 88 12 L84 76 C84 81 80 84 74 84 L26 84 C20 84 16 81 16 76 Z" fill="none" stroke="currentColor" strokeWidth="6" />
          <path d="M26 20 L35 72 L42 72 L42 50 L58 50 L58 72 L65 72 L74 20 L62 20 L60 41 L40 41 L38 20 Z" />
        </svg>
      );

    case 'ford':
      return (
        <svg viewBox="0 0 120 70" className={className} style={style} aria-label="Ford">
          {/* Ford Blue Oval & Script */}
          <ellipse cx="60" cy="35" rx="56" ry="30" fill="#003478" stroke="#ffffff" strokeWidth="2.5" />
          <ellipse cx="60" cy="35" rx="51" ry="25" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
          <text x="60" y="44" textAnchor="middle" fill="#ffffff" fontFamily="cursive, 'Brush Script MT', sans-serif" fontStyle="italic" fontWeight="bold" fontSize="30" letterSpacing="1">
            Ford
          </text>
        </svg>
      );

    case 'bmw':
    case 'bmwmotorrad':
      return (
        <svg viewBox="0 0 100 100" className={className} style={style} aria-label="BMW">
          {/* BMW Roundel */}
          <circle cx="50" cy="50" r="48" fill="#111827" stroke="currentColor" strokeWidth="3" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="50" y="21" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="13" letterSpacing="2">B M W</text>
          <g transform="translate(50, 50)">
            <circle cx="0" cy="0" r="28" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M0 0 L0 -28 A28 28 0 0 1 28 0 Z" fill="#3b82f6" />
            <path d="M0 0 L28 0 A28 28 0 0 1 0 28 Z" fill="#ffffff" />
            <path d="M0 0 L0 28 A28 28 0 0 1 -28 0 Z" fill="#3b82f6" />
            <path d="M0 0 L-28 0 A28 28 0 0 1 0 -28 Z" fill="#ffffff" />
          </g>
        </svg>
      );

    case 'mercedesbenz':
    case 'mercedes':
      return (
        <svg viewBox="0 0 100 100" className={className} style={style} fill="currentColor" aria-label="Mercedes-Benz">
          {/* Mercedes 3-pointed star in ring */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5.5" />
          {/* Center Star */}
          <path d="M50 8 L55 46 L88 68 L50 54 L12 68 L45 46 Z" fill="currentColor" />
          <path d="M50 8 L50 54 L88 68 Z" fill="rgba(255,255,255,0.3)" />
        </svg>
      );

    case 'audi':
      return (
        <svg viewBox="0 0 140 60" className={className} style={style} fill="none" aria-label="Audi">
          {/* Audi 4 Interlocking Rings */}
          <circle cx="28" cy="30" r="21" stroke="currentColor" strokeWidth="5" />
          <circle cx="56" cy="30" r="21" stroke="currentColor" strokeWidth="5" />
          <circle cx="84" cy="30" r="21" stroke="currentColor" strokeWidth="5" />
          <circle cx="112" cy="30" r="21" stroke="currentColor" strokeWidth="5" />
        </svg>
      );

    case 'lexus':
      return (
        <svg viewBox="0 0 100 70" className={className} style={style} fill="none" aria-label="Lexus">
          {/* Lexus Oval with Stylized L */}
          <ellipse cx="50" cy="35" rx="45" ry="30" stroke="currentColor" strokeWidth="6" />
          <path d="M30 20 L40 50 L75 50" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 50 L68 24" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'porsche':
      return (
        <svg viewBox="0 0 80 100" className={className} style={style} aria-label="Porsche">
          {/* Porsche Crest Shield */}
          <path d="M10 10 L70 10 L66 60 C64 80 40 94 40 94 C40 94 16 80 14 60 Z" fill="#d97706" stroke="#b45309" strokeWidth="2" />
          <path d="M14 14 L66 14 L62 58 C60 76 40 88 40 88 C40 88 20 76 18 58 Z" fill="#f59e0b" />
          {/* Red and black stripes */}
          <rect x="22" y="24" width="8" height="28" fill="#dc2626" />
          <rect x="30" y="24" width="6" height="28" fill="#000000" />
          <rect x="44" y="24" width="6" height="28" fill="#000000" />
          <rect x="50" y="24" width="8" height="28" fill="#dc2626" />
          {/* Stuttgart inner shield & prancing horse silhouette */}
          <rect x="32" y="32" width="16" height="22" rx="2" fill="#fbbf24" stroke="#000000" strokeWidth="1" />
          <path d="M40 35 C38 35 36 38 38 43 C36 45 35 48 37 51 L43 51 C45 47 43 42 43 40 C44 38 42 35 40 35 Z" fill="#000000" />
          <text x="40" y="20" textAnchor="middle" fill="#000000" fontSize="7" fontWeight="bold" letterSpacing="1">PORSCHE</text>
        </svg>
      );

    case 'hyundai':
      return (
        <svg viewBox="0 0 100 70" className={className} style={style} fill="none" aria-label="Hyundai">
          {/* Hyundai slanted oval and stylized H */}
          <ellipse cx="50" cy="35" rx="44" ry="28" stroke="currentColor" strokeWidth="6" transform="rotate(-10 50 35)" />
          <path d="M34 22 L38 48 C42 42 58 42 62 48 L66 22" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" transform="rotate(-10 50 35)" />
        </svg>
      );

    case 'volkswagen':
    case 'vw':
      return (
        <svg viewBox="0 0 100 100" className={className} style={style} fill="currentColor" aria-label="Volkswagen">
          {/* VW Circle and inner V & W */}
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="6" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* V */}
          <path d="M28 24 L46 54 L54 54 L72 24 L62 24 L50 46 L38 24 Z" />
          {/* W */}
          <path d="M22 48 L38 82 L46 82 L50 72 L54 82 L62 82 L78 48 L68 48 L58 72 L50 54 L42 72 L32 48 Z" />
        </svg>
      );

    case 'chevrolet':
      return (
        <svg viewBox="0 0 120 60" className={className} style={style} aria-label="Chevrolet">
          {/* Chevy Bowtie */}
          <polygon points="10,38 110,38 106,22 6,22" fill="#d97706" stroke="#b45309" strokeWidth="2" />
          <polygon points="46,10 74,10 70,50 42,50" fill="#d97706" stroke="#b45309" strokeWidth="2" />
          <polygon points="12,36 108,36 104,24 8,24" fill="#fbbf24" />
          <polygon points="48,12 72,12 68,48 44,48" fill="#fbbf24" />
        </svg>
      );

    case 'tesla':
      return (
        <svg viewBox="0 0 100 100" className={className} style={style} fill="currentColor" aria-label="Tesla">
          {/* Tesla T Emblem */}
          <path d="M12 20 C24 14 76 14 88 20 L84 28 C74 24 26 24 16 28 Z" />
          <path d="M22 34 C36 29 64 29 78 34 L74 40 C62 36 38 36 26 40 Z" />
          <path d="M46 44 L54 44 L54 86 L46 86 Z" />
          <path d="M38 44 C42 41 58 41 62 44 L50 56 Z" />
        </svg>
      );

    case 'ferrari':
      return (
        <svg viewBox="0 0 70 100" className={className} style={style} aria-label="Ferrari">
          {/* Ferrari Canary Yellow Shield & Cavallino Rampante */}
          <path d="M8 8 L62 8 L58 65 C56 82 35 94 35 94 C35 94 14 82 12 65 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
          {/* Italian Tricolor Top */}
          <rect x="10" y="8" width="16.6" height="6" fill="#16a34a" />
          <rect x="26.6" y="8" width="16.6" height="6" fill="#ffffff" />
          <rect x="43.2" y="8" width="16.6" height="6" fill="#dc2626" />
          {/* Prancing Horse Silhouette */}
          <path d="M36 24 C34 26 31 31 32 37 C29 39 27 44 28 49 C30 52 35 52 36 50 C34 54 33 60 36 67 L34 76 L39 76 L40 68 C43 65 44 58 43 54 C46 54 49 50 48 45 C47 40 43 38 41 33 C41 29 39 25 36 24 Z" fill="#000000" />
          <text x="35" y="86" textAnchor="middle" fill="#000000" fontWeight="900" fontSize="9" letterSpacing="1">S F</text>
        </svg>
      );

    case 'lamborghini':
      return (
        <svg viewBox="0 0 80 100" className={className} style={style} aria-label="Lamborghini">
          {/* Lamborghini Gold Bull Shield */}
          <path d="M10 8 L70 8 L66 68 C64 84 40 96 40 96 C40 96 16 84 14 68 Z" fill="#0f172a" stroke="#eab308" strokeWidth="4" />
          <text x="40" y="21" textAnchor="middle" fill="#eab308" fontWeight="bold" fontSize="7" letterSpacing="1.5">LAMBORGHINI</text>
          {/* Charging Bull silhouette */}
          <path d="M26 44 C26 38 32 35 38 38 C44 38 48 44 54 44 C58 44 60 49 57 53 C52 56 46 54 42 58 C38 62 34 65 30 63 C26 61 24 50 26 44 Z" fill="#eab308" />
          <circle cx="56" cy="46" r="1.5" fill="#ffffff" />
        </svg>
      );

    case 'astonmartin':
      return (
        <svg viewBox="0 0 140 50" className={className} style={style} fill="none" stroke="currentColor" aria-label="Aston Martin">
          {/* Aston Martin Wings */}
          <path d="M10 32 C30 18 50 18 70 24 C90 18 110 18 130 32" strokeWidth="3" />
          <path d="M20 38 C35 24 55 24 70 28 C85 24 105 24 120 38" strokeWidth="2.5" />
          <rect x="45" y="20" width="50" height="15" rx="2" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
          <text x="70" y="31" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="bold" stroke="none">ASTON MARTIN</text>
        </svg>
      );

    case 'nissan':
      return (
        <svg viewBox="0 0 100 80" className={className} style={style} fill="none" aria-label="Nissan">
          {/* Nissan Chrome Circle with Bar */}
          <circle cx="50" cy="40" r="34" stroke="currentColor" strokeWidth="6" />
          <rect x="14" y="31" width="72" height="18" rx="2" fill="#0f172a" stroke="currentColor" strokeWidth="4" />
          <text x="50" y="44" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="10" letterSpacing="1">NISSAN</text>
        </svg>
      );

    case 'mazda':
      return (
        <svg viewBox="0 0 100 70" className={className} style={style} fill="none" aria-label="Mazda">
          {/* Mazda Winged M in Oval */}
          <ellipse cx="50" cy="35" rx="44" ry="30" stroke="currentColor" strokeWidth="5.5" />
          <path d="M28 46 C36 28 45 28 50 36 C55 28 64 28 72 46" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M38 32 C45 38 55 38 62 32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'subaru':
      return (
        <svg viewBox="0 0 110 70" className={className} style={style} aria-label="Subaru">
          {/* Subaru 6-Star Pleiades Oval */}
          <ellipse cx="55" cy="35" rx="50" ry="30" fill="#1e3a8a" stroke="currentColor" strokeWidth="4" />
          {/* Big Star */}
          <polygon points="40,24 43,33 52,33 45,38 48,47 40,41 32,47 35,38 28,33 37,33" fill="#ffffff" />
          {/* Smaller Stars */}
          <circle cx="58" cy="24" r="3" fill="#ffffff" />
          <circle cx="68" cy="30" r="3.5" fill="#ffffff" />
          <circle cx="64" cy="42" r="3" fill="#ffffff" />
          <circle cx="76" cy="40" r="2.5" fill="#ffffff" />
          <circle cx="52" cy="46" r="2.5" fill="#ffffff" />
        </svg>
      );

    case 'mclaren':
      return (
        <svg viewBox="0 0 100 60" className={className} style={style} fill="currentColor" aria-label="McLaren">
          {/* McLaren Speedmark Kiwi Swoosh */}
          <path d="M20 40 C35 40 70 36 84 18 C78 28 58 35 34 35 C24 35 16 38 20 40 Z" fill="#ef4444" />
          <text x="46" y="24" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="12" letterSpacing="1">McLaren</text>
        </svg>
      );

    case 'bugatti':
      return (
        <svg viewBox="0 0 100 60" className={className} style={style} aria-label="Bugatti">
          {/* Bugatti Red Oval */}
          <ellipse cx="50" cy="30" rx="46" ry="26" fill="#dc2626" stroke="#ffffff" strokeWidth="2.5" />
          <text x="50" y="32" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="14" letterSpacing="1.5">BUGATTI</text>
          <text x="50" y="44" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="9">EB</text>
        </svg>
      );

    case 'rollsroyce':
      return (
        <svg viewBox="0 0 70 90" className={className} style={style} fill="currentColor" aria-label="Rolls-Royce">
          {/* Rolls-Royce Interlocking RR in rectangle */}
          <rect x="8" y="8" width="54" height="74" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
          <text x="31" y="52" textAnchor="middle" fontSize="34" fontWeight="bold" fontFamily="serif">R</text>
          <text x="39" y="58" textAnchor="middle" fontSize="34" fontWeight="bold" fontFamily="serif">R</text>
        </svg>
      );

    case 'bentley':
      return (
        <svg viewBox="0 0 120 60" className={className} style={style} fill="currentColor" aria-label="Bentley">
          {/* Bentley Winged B */}
          <path d="M10 32 C28 20 48 24 54 34 C48 38 26 40 10 32 Z" fill="#94a3b8" />
          <path d="M110 32 C92 20 72 24 66 34 C72 38 94 40 110 32 Z" fill="#94a3b8" />
          <circle cx="60" cy="32" r="14" fill="#0f172a" stroke="currentColor" strokeWidth="3" />
          <text x="60" y="38" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="16" fontFamily="serif">B</text>
        </svg>
      );

    case 'volvo':
      return (
        <svg viewBox="0 0 90 90" className={className} style={style} aria-label="Volvo">
          {/* Volvo Iron Mark circle with top-right arrow */}
          <circle cx="42" cy="48" r="32" fill="none" stroke="currentColor" strokeWidth="6" />
          <line x1="64" y1="26" x2="76" y2="14" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <polyline points="62,14 76,14 76,28" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <rect x="12" y="42" width="60" height="14" rx="1" fill="#1e3a8a" />
          <text x="42" y="53" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="8" letterSpacing="1.5">VOLVO</text>
        </svg>
      );

    case 'jaguar':
      return (
        <svg viewBox="0 0 120 50" className={className} style={style} fill="currentColor" aria-label="Jaguar">
          {/* Leaping Cat Silhouette */}
          <path d="M12 28 C24 22 42 20 54 24 C68 22 84 14 104 16 C96 22 86 24 74 27 C64 34 50 36 38 34 C28 36 16 34 12 28 Z" />
          <text x="60" y="44" textAnchor="middle" fill="currentColor" fontWeight="bold" fontSize="9" letterSpacing="3">JAGUAR</text>
        </svg>
      );

    case 'landrover':
      return (
        <svg viewBox="0 0 110 60" className={className} style={style} aria-label="Land Rover">
          {/* Land Rover Green Oval */}
          <ellipse cx="55" cy="30" rx="50" ry="24" fill="#064e3b" stroke="#ffffff" strokeWidth="2" />
          <text x="55" y="27" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="8" letterSpacing="1">LAND</text>
          <text x="55" y="39" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="8" letterSpacing="1">ROVER</text>
        </svg>
      );

    case 'maserati':
      return (
        <svg viewBox="0 0 70 90" className={className} style={style} fill="currentColor" aria-label="Maserati">
          {/* Neptune Trident */}
          <path d="M35 12 L35 70" stroke="currentColor" strokeWidth="4" />
          <path d="M22 24 C22 42 35 48 35 48 C35 48 48 42 48 24" fill="none" stroke="currentColor" strokeWidth="4" />
          <polygon points="35,8 31,16 39,16" />
          <polygon points="22,20 18,28 26,28" />
          <polygon points="48,20 44,28 52,28" />
          <rect x="25" y="68" width="20" height="8" rx="1" />
        </svg>
      );

    case 'alfaromeo':
      return (
        <svg viewBox="0 0 90 90" className={className} style={style} aria-label="Alfa Romeo">
          <circle cx="45" cy="45" r="40" fill="#0f172a" stroke="#dc2626" strokeWidth="4" />
          <line x1="26" y1="45" x2="44" y2="45" stroke="#dc2626" strokeWidth="5" />
          <line x1="35" y1="36" x2="35" y2="54" stroke="#dc2626" strokeWidth="5" />
          {/* Snake motif */}
          <path d="M52 34 C58 34 62 40 56 46 C50 52 56 58 60 56" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'dodge':
      return (
        <svg viewBox="0 0 100 50" className={className} style={style} fill="currentColor" aria-label="Dodge">
          <text x="42" y="32" textAnchor="middle" fontSize="16" fontWeight="900" letterSpacing="2">DODGE</text>
          {/* Double Red Slashes */}
          <polygon points="76,14 82,14 74,38 68,38" fill="#dc2626" />
          <polygon points="86,14 92,14 84,38 78,38" fill="#dc2626" />
        </svg>
      );

    case 'jeep':
      return (
        <svg viewBox="0 0 90 50" className={className} style={style} fill="currentColor" aria-label="Jeep">
          <text x="45" y="34" textAnchor="middle" fontSize="22" fontWeight="900" letterSpacing="1.5">Jeep</text>
        </svg>
      );

    case 'cadillac':
      return (
        <svg viewBox="0 0 100 70" className={className} style={style} fill="currentColor" aria-label="Cadillac">
          {/* Cadillac geometric crest shield */}
          <path d="M20 18 L80 18 L74 52 C70 62 50 66 50 66 C50 66 30 62 26 52 Z" fill="#0f172a" stroke="#d97706" strokeWidth="3" />
          <rect x="30" y="24" width="18" height="12" fill="#dc2626" />
          <rect x="52" y="24" width="18" height="12" fill="#2563eb" />
          <rect x="30" y="40" width="18" height="10" fill="#facc15" />
          <rect x="52" y="40" width="18" height="10" fill="#ffffff" />
        </svg>
      );

    case 'yamaha':
      return (
        <svg viewBox="0 0 90 90" className={className} style={style} aria-label="Yamaha">
          {/* Crossed Tuning Forks in Red Circle */}
          <circle cx="45" cy="45" r="40" fill="#dc2626" />
          <circle cx="45" cy="45" r="37" fill="none" stroke="#ffffff" strokeWidth="2.5" />
          <g stroke="#ffffff" strokeWidth="4" strokeLinecap="round">
            <line x1="45" y1="18" x2="45" y2="72" />
            <line x1="22" y1="32" x2="68" y2="58" />
            <line x1="22" y1="58" x2="68" y2="32" />
          </g>
          <circle cx="45" cy="45" r="5" fill="#ffffff" />
        </svg>
      );

    case 'kawasaki':
      return (
        <svg viewBox="0 0 90 60" className={className} style={style} fill="currentColor" aria-label="Kawasaki">
          <text x="45" y="38" textAnchor="middle" fill="#22c55e" fontSize="26" fontWeight="900" fontFamily="sans-serif">K</text>
        </svg>
      );

    case 'ducati':
      return (
        <svg viewBox="0 0 80 90" className={className} style={style} aria-label="Ducati">
          {/* Ducati Red Shield */}
          <path d="M12 12 L68 12 L62 68 C58 78 40 86 40 86 C40 86 22 78 18 68 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
          <path d="M22 28 C34 24 50 32 58 46" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <text x="40" y="24" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="8" letterSpacing="1">DUCATI</text>
        </svg>
      );

    case 'harleydavidson':
    case 'harley':
      return (
        <svg viewBox="0 0 100 80" className={className} style={style} aria-label="Harley-Davidson">
          {/* Bar and Shield */}
          <path d="M10 32 L90 32 L90 48 L10 48 Z" fill="#f97316" stroke="#000000" strokeWidth="2" />
          <path d="M20 32 L50 14 L80 32 L75 62 L50 74 L25 62 Z" fill="#0f172a" stroke="#f97316" strokeWidth="3" />
          <text x="50" y="42" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="8">HARLEY-DAVIDSON</text>
        </svg>
      );

    case 'suzuki':
      return (
        <svg viewBox="0 0 80 80" className={className} style={style} fill="currentColor" aria-label="Suzuki">
          {/* Faceted Suzuki S */}
          <path d="M64 16 L28 16 L16 34 L48 34 L24 64 L60 64 L72 46 L40 46 Z" fill="#dc2626" />
        </svg>
      );

    case 'ktm':
      return (
        <svg viewBox="0 0 90 50" className={className} style={style} fill="#f97316" aria-label="KTM">
          <text x="45" y="36" textAnchor="middle" fontSize="24" fontWeight="900" fontStyle="italic" letterSpacing="1">KTM</text>
        </svg>
      );

    case 'triumph':
      return (
        <svg viewBox="0 0 80 70" className={className} style={style} fill="currentColor" aria-label="Triumph">
          <polygon points="40,12 70,60 10,60" fill="none" stroke="currentColor" strokeWidth="4" />
          <text x="40" y="48" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily="serif">T</text>
        </svg>
      );

    case 'royalenfield':
      return (
        <svg viewBox="0 0 90 70" className={className} style={style} aria-label="Royal Enfield">
          <ellipse cx="45" cy="35" rx="40" ry="26" fill="#1e293b" stroke="#eab308" strokeWidth="3" />
          <text x="45" y="32" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">ROYAL</text>
          <text x="45" y="44" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">ENFIELD</text>
        </svg>
      );

    default:
      return (
        <div className={`flex items-center justify-center font-bold text-xs uppercase tracking-wider text-slate-300 ${className}`} style={style}>
          {brandName.slice(0, 3)}
        </div>
      );
  }
};
