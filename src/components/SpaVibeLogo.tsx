import React from 'react';
import SpaVibeWordmark from './SpaVibeWordmark';

interface SpaVibeLogoProps {
  variant?: 'full' | 'mark' | 'text';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  taglineText?: string;
  className?: string;
}

export default function SpaVibeLogo({
  variant = 'full',
  size = 'md',
  showTagline = true,
  taglineText = 'LUXURY THERAPY & WELLNESS',
  className = '',
}: SpaVibeLogoProps) {
  // Size presets
  const sizeConfig = {
    xs: {
      markSize: 'w-7 h-7',
      textSize: 'text-lg',
      taglineSize: 'text-[7px] tracking-[1.5px]',
      gap: 'gap-2',
      svgHeight: 26,
    },
    sm: {
      markSize: 'w-10 h-10',
      textSize: 'text-2xl',
      taglineSize: 'text-[8px] tracking-[2px]',
      gap: 'gap-3',
      svgHeight: 34,
    },
    md: {
      markSize: 'w-12 h-12',
      textSize: 'text-3xl',
      taglineSize: 'text-[9px] tracking-[2.5px]',
      gap: 'gap-3.5',
      svgHeight: 44,
    },
    lg: {
      markSize: 'w-16 h-16',
      textSize: 'text-4xl',
      taglineSize: 'text-[11px] tracking-[3px]',
      gap: 'gap-4',
      svgHeight: 56,
    },
    xl: {
      markSize: 'w-24 h-24',
      textSize: 'text-5xl md:text-6xl',
      taglineSize: 'text-xs tracking-[3.5px]',
      gap: 'gap-5',
      svgHeight: 84,
    },
  }[size];

  // The Golden Swan Emblem (uses the exact public swan asset)
  const SwanEmblem = ({ className: c = sizeConfig.markSize }: { className?: string }) => (
    <img
      src="/images/spavibe-swan.svg"
      alt="SpaVibe Golden Swan"
      referrerPolicy="no-referrer"
      className={`${c} flex-shrink-0 object-contain drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)] transition-transform duration-300 hover:scale-105 select-none`}
    />
  );

  // Exact "SpaVibe" Stylized Typography Matching Reference Font
  const BrandTypography = () => (
    <div className="flex flex-col select-none justify-center">
      <SpaVibeWordmark height={sizeConfig.svgHeight} />
      {showTagline && (
        <span
          className={`${sizeConfig.taglineSize} text-[#E5B86B]/80 font-medium uppercase font-sans tracking-[2px] mt-0.5`}
        >
          {taglineText}
        </span>
      )}
    </div>
  );

  if (variant === 'mark') {
    return <SwanEmblem />;
  }

  if (variant === 'text') {
    return <BrandTypography />;
  }

  return (
    <div className={`inline-flex items-center ${sizeConfig.gap} ${className}`}>
      <SwanEmblem />
      <BrandTypography />
    </div>
  );
}
