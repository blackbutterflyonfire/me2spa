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
  brandText = 'Spa Vibe',
  className = '',
}: SpaVibeLogoProps) {
  // Graceful fallback states in case user uploads PNG or SVG in /public or /public/images
  const [markSrc, setMarkSrc] = useState('/images/spavibe-swan.png');
  const [nameSrc, setNameSrc] = useState('/images/spavibe-wordmark.png');
  const [combinedSrc, setCombinedSrc] = useState('/images/spavibe-logo.png');

  // Size configurations preserving default natural aspect ratio
  const sizeConfig = {
    xs: {
      markH: 'h-6',
      nameH: 'h-4',
      textSize: 'text-xl',
      combinedH: 'h-6',
      taglineSize: 'text-[7px] tracking-[1.5px]',
      gap: 'gap-2',
    },
    sm: {
      markH: 'h-9 sm:h-10',
      nameH: 'h-7 sm:h-8',
      textSize: 'text-2xl sm:text-[27px]',
      combinedH: 'h-9 sm:h-10',
      taglineSize: 'text-[8px] tracking-[2px]',
      gap: 'gap-3',
    },
    md: {
      markH: 'h-12',
      nameH: 'h-9',
      textSize: 'text-3xl',
      combinedH: 'h-12',
      taglineSize: 'text-[9px] tracking-[2.5px]',
      gap: 'gap-3.5',
    },
    lg: {
      markH: 'h-16',
      nameH: 'h-11',
      textSize: 'text-4xl',
      combinedH: 'h-16',
      taglineSize: 'text-[10px] tracking-[3px]',
      gap: 'gap-4',
    },
    xl: {
      markH: 'h-24',
      nameH: 'h-16',
      textSize: 'text-5xl md:text-6xl',
      combinedH: 'h-24',
      taglineSize: 'text-xs tracking-[3.5px]',
      gap: 'gap-5',
    },
  }[size];

  // 1. Logo Mark (Swan Icon Image with default aspect ratio)
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
      className={`${sizeConfig.markH} w-auto aspect-auto object-contain flex-shrink-0 drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)] transition-transform duration-300 hover:scale-105 select-none ${customClass}`}
    />
  );

  // 2. Bodoni Moda Brand Name Typography
  const BodoniBrandName = ({ customClass = '' }: { customClass?: string }) => (
    <div className={`flex flex-col select-none justify-center leading-tight ${customClass}`}>
      <span
        className={`font-bodoni ${sizeConfig.textSize} font-normal tracking-[-0.015em] leading-none bg-gradient-to-r from-[#FFF5DA] via-[#ECC47A] to-[#C99039] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)]`}
        style={{ fontFamily: "'Bodoni Moda', Didot, 'Playfair Display', Georgia, serif" }}
      >
        {brandText}
      </span>
      {showTagline && (
        <span
          className={`${sizeConfig.taglineSize} text-[#E5B86B]/80 font-medium uppercase font-sans tracking-[2px] mt-1`}
        >
          {taglineText}
        </span>
      )}
    </div>
  );

  // 3. Image Brand Name (SpaVibe Typography Image with default aspect ratio)
  const ImageBrandName = ({ customClass = '' }: { customClass?: string }) => (
    <div className={`flex flex-col select-none justify-center ${customClass}`}>
      <img
        src={nameSrc}
        alt="SpaVibe Brand Name"
        referrerPolicy="no-referrer"
        onError={() => {
          if (nameSrc.endsWith('.png')) {
            setNameSrc('/images/spavibe-wordmark.svg');
          } else if (nameSrc.includes('/images/')) {
            setNameSrc('/logo-name.png');
          }
        }}
        className={`${sizeConfig.nameH} w-auto aspect-auto object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]`}
      />
      {showTagline && (
        <span
          className={`${sizeConfig.taglineSize} text-[#E5B86B]/80 font-medium uppercase font-sans tracking-[2px] mt-0.5`}
        >
          {taglineText}
        </span>
      )}
    </div>
  );

  // 4. Combined Single Image (If user uploads a single image containing both mark & name)
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
    return nameType === 'bodoni' ? <BodoniBrandName /> : <ImageBrandName />;
  }

  // Default 'full' variant: Mark Image + Brand Name
  return (
    <div className={`inline-flex items-center ${sizeConfig.gap} ${className}`}>
      <LogoMarkImage />
      {nameType === 'bodoni' ? <BodoniBrandName /> : <ImageBrandName />}
    </div>
  );
}
