import React from 'react';

export const ShiftRouteLogo: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <img
    src="/shiftroute-logo-black.png"
    alt="ShiftRoute logo"
    referrerPolicy="no-referrer"
    className={`object-contain shrink-0 ${className}`}
  />
);

export const BrandLogo: React.FC<{ brandName: string; className?: string }> = ({
  brandName,
  className = 'w-11 h-8'
}) => {
  const key = brandName.toLowerCase();

  switch (key) {
    case 'toyota':
      return (
        <svg viewBox="0 0 64 42" fill="none" className={className} aria-hidden="true">
          <ellipse cx="32" cy="21" rx="22" ry="14" stroke="currentColor" strokeWidth="2.8" />
          <ellipse cx="32" cy="21" rx="6.5" ry="13.5" stroke="currentColor" strokeWidth="2.4" />
          <ellipse cx="32" cy="14.5" rx="14" ry="5" stroke="currentColor" strokeWidth="2.4" />
        </svg>
      );

    case 'bmw':
      return (
        <svg viewBox="0 0 44 44" fill="none" className={className} aria-hidden="true">
          <circle cx="22" cy="22" r="17" stroke="currentColor" strokeWidth="2.8" />
          <circle cx="22" cy="22" r="11" stroke="currentColor" strokeWidth="1.8" />
          <path d="M22 11V22H11A11 11 0 0 1 22 11Z" fill="currentColor" />
          <path d="M22 33V22H33A11 11 0 0 1 22 33Z" fill="currentColor" />
        </svg>
      );

    case 'mercedes-benz':
      return (
        <svg viewBox="0 0 44 44" fill="none" className={className} aria-hidden="true">
          <circle cx="22" cy="22" r="16.5" stroke="currentColor" strokeWidth="2.4" />
          <path
            d="M22 5.5L24.2 20.6L36.2 30.2L22 23.8L7.8 30.2L19.8 20.6L22 5.5Z"
            fill="currentColor"
          />
        </svg>
      );

    case 'audi':
      return (
        <svg viewBox="0 0 76 32" fill="none" className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="10.5" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="30.5" cy="16" r="10.5" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="45" cy="16" r="10.5" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="59.5" cy="16" r="10.5" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );

    case 'ford':
      return (
        <svg viewBox="0 0 72 34" fill="none" className={className} aria-hidden="true">
          <ellipse cx="36" cy="17" rx="31" ry="13" fill="currentColor" />
          <ellipse cx="36" cy="17" rx="28" ry="10.5" stroke="#ffffff" strokeWidth="1.2" />
          <text
            x="36"
            y="21.5"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="13.5"
            fontWeight="700"
            fontStyle="italic"
            fontFamily="Georgia, serif"
          >
            Ford
          </text>
        </svg>
      );

    case 'lamborghini':
      return (
        <svg viewBox="0 0 40 44" fill="none" className={className} aria-hidden="true">
          <path
            d="M7 8L20 4L33 8L31 28L20 40L9 28L7 8Z"
            fill="currentColor"
          />
          <path
            d="M10.5 11L20 7.5L29.5 11L28 26.5L20 36L12 26.5L10.5 11Z"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
          <path
            d="M14 25L18 20L24 19L26 24L22 25L20 29L17 25H14Z"
            fill="#ffffff"
          />
          <path d="M24 19L27 16M25 20L28 18" stroke="#ffffff" strokeWidth="1.4" />
        </svg>
      );

    case 'ferrari':
      return (
        <svg viewBox="0 0 38 44" fill="none" className={className} aria-hidden="true">
          <path
            d="M7 6H31V24C31 32 25.5 37.5 19 40C12.5 37.5 7 32 7 24V6Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path d="M10 10H28" stroke="currentColor" strokeWidth="2" />
          <path
            d="M19.5 33C19.5 33 17 28.5 18 25C16.5 24.5 14 27 14 27L13 24C13 24 16 21 18.5 21C19 18 16.5 15 16.5 15L19 13.5L21 15.5C22.5 14.5 24 16 24 16L22.5 18.5C23.5 20.5 22 23.5 22 23.5L25 26L23 28.5L20.5 26.5L21.5 33H19.5Z"
            fill="currentColor"
          />
        </svg>
      );

    case 'porsche':
      return (
        <svg viewBox="0 0 38 44" fill="none" className={className} aria-hidden="true">
          <path
            d="M7 7L19 5L31 7V24C31 32 25.5 37.5 19 40C12.5 37.5 7 32 7 24V7Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path d="M7 13H31" stroke="currentColor" strokeWidth="1.8" />
          <path d="M19 13V39" stroke="currentColor" strokeWidth="1.4" />
          <path d="M7 23H31" stroke="currentColor" strokeWidth="1.4" />
          <rect x="14.5" y="18" width="9" height="10" fill="currentColor" />
        </svg>
      );

    case 'nissan':
      return (
        <svg viewBox="0 0 48 40" fill="none" className={className} aria-hidden="true">
          <circle cx="24" cy="20" r="14.5" stroke="currentColor" strokeWidth="2.8" />
          <rect x="4" y="15.5" width="40" height="9" fill="#ffffff" stroke="currentColor" strokeWidth="1.8" />
          <text
            x="24"
            y="22"
            textAnchor="middle"
            fill="currentColor"
            fontSize="6.5"
            fontWeight="800"
            letterSpacing="0.8"
          >
            NISSAN
          </text>
        </svg>
      );

    case 'hyundai':
      return (
        <svg viewBox="0 0 60 36" fill="none" className={className} aria-hidden="true">
          <ellipse cx="30" cy="18" rx="24" ry="13" stroke="currentColor" strokeWidth="2.6" />
          <path
            d="M17 24L22.5 11.5M37.5 24L43 11.5M20 18.5C25 16.5 35 19.5 40 17.5"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return (
        <span className="text-sm font-bold tracking-tight text-black">
          {brandName.slice(0, 2).toUpperCase()}
        </span>
      );
  }
};
