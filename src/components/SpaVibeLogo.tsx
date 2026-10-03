import React, { useState } from 'react';

interface SpaVibeLogoProps {
  variant?: 'full' | 'mark' | 'text' | 'combined-image';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  taglineText?: string;
  nameType?: 'bodoni' | 'image';
  brandText?: string;
  className?: string;
}

export default function SpaVibeLogo({
  variant = 'full',
  size = 'sm',
  showTagline = true,
  taglineText = 'LUXURY THERAPY & WELLNESS',
  nameType = 'bodoni',
  brandText = 'SpaVibe',
  className = '',
}: SpaVibeLogoProps) {
  // Image sources with robust fallbacks
  const [markSrc, setMarkSrc] = useState('/images/spavibe-swan.png');
  const [nameSrc, setNameSrc] = useState('/images/spavibe-wordmark.png');
  const [nameImageError, setNameImageError] = useState(false);
  const [combinedSrc, setCombinedSrc] = useState('/images/spavibe-logo.png');

  // Height configurations with natural aspect ratio preserved
  const sizeConfig = {
    xs: {
      markH: 'h-6 sm:h-7',
      nameH: 'h-5',
      textSize: 'text-lg sm:text-xl',
      combinedH: 'h-6',
      taglineSize: 'text-[7px] tracking-[1.5px]',
      gap: 'gap-2',
    },
    sm: {
      markH: 'h-9 sm:h-11',
      nameH: 'h-7 sm:h-8',
      textSize: 'text-2xl sm:text-[28px]',
      combinedH: 'h-9 sm:h-11',
      taglineSize: 'text-[8px] sm:text-[9px] tracking-[2.2px]',
      gap: 'gap-3',
    },
    md: {
      markH: 'h-12 sm:h-14',
      nameH: 'h-9 sm:h-10',
      textSize: 'text-3xl sm:text-4xl',
      combinedH: 'h-12 sm:h-14',
      taglineSize: 'text-[9px] sm:text-[10px] tracking-[2.8px]',
      gap: 'gap-3.5',
    },
    lg: {
      markH: 'h-16 sm:h-20',
      nameH: 'h-12 sm:h-14',
      textSize: 'text-4xl sm:text-5xl',
      combinedH: 'h-16 sm:h-20',
      taglineSize: 'text-[11px] sm:text-xs tracking-[3.2px]',
      gap: 'gap-4',
    },
    xl: {
      markH: 'h-24 sm:h-28',
      nameH: 'h-16 sm:h-20',
      textSize: 'text-5xl sm:text-6xl',
      combinedH: 'h-24 sm:h-28',
      taglineSize: 'text-xs sm:text-sm tracking-[3.8px]',
      gap: 'gap-5',
    },
  }[size];

  // 1. Logo Mark (Golden Swan Icon Image with preserved aspect ratio)
  const LogoMarkImage = ({ customClass = '' }: { customClass?: string }) => (
    <img
      src={markSrc}
      alt="SpaVibe Logo Mark"
      referrerPolicy="no-referrer"
      onError={() => {
        if (markSrc.endsWith('.png')) {
          setMarkSrc('/images/spavibe-swan.svg');
        } else if (markSrc.includes('/images/')) {
          setMarkSrc('/logo-mark.png');
        }
      }}
      className={`${sizeConfig.markH} w-auto aspect-auto object-contain shrink-0 drop-shadow-[0_2px_14px_rgba(212,175,55,0.45)] transition-transform duration-300 hover:scale-105 select-none ${customClass}`}
    />
  );

  // 2. High-Visibility Bodoni Moda Brand Name Typography
  const BodoniBrandName = ({ customClass = '' }: { customClass?: string }) => (
    <div className={`flex flex-col select-none justify-center leading-tight ${customClass}`}>
      <span
        className={`font-bodoni ${sizeConfig.textSize} font-medium tracking-tight leading-none bg-gradient-to-r from-[#FFFFFF] via-[#FCE4B3] to-[#DFAC56] bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(212,175,55,0.35)]`}
        style={{
          fontFamily: "'Bodoni Moda', 'Playfair Display', Didot, Georgia, serif",
          fontOpticalSizing: 'auto',
        }}
      >
        {brandText}
      </span>
      {showTagline && (
        <span
          className={`${sizeConfig.taglineSize} text-[#E5B86B]/90 font-medium uppercase font-sans tracking-[2px] mt-1 whitespace-nowrap`}
        >
          {taglineText}
        </span>
      )}
    </div>
  );

  // 3. Website Name Image (with fallback to BodoniBrandName if image fails)
  const ImageBrandName = ({ customClass = '' }: { customClass?: string }) => {
    if (nameImageError) {
      return <BodoniBrandName customClass={customClass} />;
    }

    return (
      <div className={`flex flex-col select-none justify-center ${customClass}`}>
        <img
          src={nameSrc}
          alt="SpaVibe Website Name"
          referrerPolicy="no-referrer"
          onError={() => {
            if (nameSrc.endsWith('.png')) {
              setNameSrc('/images/spavibe-wordmark.svg');
            } else if (nameSrc.includes('/images/')) {
              setNameSrc('/logo-name.png');
            } else {
              setNameImageError(true);
            }
          }}
          className={`${sizeConfig.nameH} w-auto aspect-auto object-contain drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)] transition-transform duration-200 hover:brightness-110`}
        />
        {showTagline && (
          <span
            className={`${sizeConfig.taglineSize} text-[#E5B86B]/90 font-medium uppercase font-sans tracking-[2px] mt-0.5 whitespace-nowrap`}
          >
            {taglineText}
          </span>
        )}
      </div>
    );
  };

  // 4. Combined Single Logo Image
  const CombinedLogoImage = () => (
    <img
      src={combinedSrc}
      alt="SpaVibe Logo"
      referrerPolicy="no-referrer"
      onError={() => {
        if (combinedSrc.endsWith('.png')) {
          setCombinedSrc('/images/spavibe-logo.svg');
        } else if (combinedSrc.includes('/images/')) {
          setCombinedSrc('/logo.png');
        }
      }}
      className={`${sizeConfig.combinedH} w-auto aspect-auto object-contain drop-shadow-[0_2px_14px_rgba(212,175,55,0.4)] transition-transform duration-300 hover:scale-105 select-none`}
    />
  );

  if (variant === 'combined-image') {
    return <CombinedLogoImage />;
  }

  if (variant === 'mark') {
    return <LogoMarkImage />;
  }

  if (variant === 'text') {
    return nameType === 'image' ? <ImageBrandName /> : <BodoniBrandName />;
  }

  // Default 'full' variant: Mark Image + Prominently Visible Brand Name
  return (
    <div className={`inline-flex items-center ${sizeConfig.gap} ${className}`}>
      <LogoMarkImage />
      {nameType === 'image' ? <ImageBrandName /> : <BodoniBrandName />}
    </div>
  );
}
