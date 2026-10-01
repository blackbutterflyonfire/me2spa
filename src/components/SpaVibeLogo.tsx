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
      svgHeight: 28,
    },
    sm: {
      markSize: 'w-10 h-10',
      textSize: 'text-2xl',
      taglineSize: 'text-[8px] tracking-[2px]',
      gap: 'gap-3',
      svgHeight: 38,
    },
    md: {
      markSize: 'w-12 h-12',
      textSize: 'text-3xl',
      taglineSize: 'text-[9px] tracking-[2.5px]',
      gap: 'gap-3.5',
      svgHeight: 48,
    },
    lg: {
      markSize: 'w-16 h-16',
      textSize: 'text-4xl',
      taglineSize: 'text-[11px] tracking-[3px]',
      gap: 'gap-4',
      svgHeight: 64,
    },
    xl: {
      markSize: 'w-24 h-24',
      textSize: 'text-5xl md:text-6xl',
      taglineSize: 'text-xs tracking-[3.5px]',
      gap: 'gap-5',
      svgHeight: 96,
    },
  }[size];

  // The Golden Swan Emblem SVG (Scalable, vectorized from user reference)
  const SwanEmblem = ({ className: c = sizeConfig.markSize }: { className?: string }) => (
    <svg
      viewBox="170 50 640 680"
      className={`${c} flex-shrink-0 drop-shadow-[0_2px_12px_rgba(212,175,55,0.35)] transition-transform duration-300 hover:scale-105`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="svGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9EB" />
          <stop offset="25%" stopColor="#FDE3A7" />
          <stop offset="50%" stopColor="#E5B86B" />
          <stop offset="75%" stopColor="#C48933" />
          <stop offset="100%" stopColor="#875314" />
        </linearGradient>

        <linearGradient id="svGoldGleam" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#FFF0CB" />
          <stop offset="50%" stopColor="#E2AE5B" />
          <stop offset="85%" stopColor="#B67926" />
          <stop offset="100%" stopColor="#6E3F0D" />
        </linearGradient>

        <linearGradient id="svGoldRich" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7B4912" />
          <stop offset="35%" stopColor="#BA7E2A" />
          <stop offset="70%" stopColor="#EFC981" />
          <stop offset="90%" stopColor="#FEF2D5" />
          <stop offset="100%" stopColor="#CE953C" />
        </linearGradient>

        <linearGradient id="svGoldFeather1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBF2DB" />
          <stop offset="30%" stopColor="#E7BC6F" />
          <stop offset="70%" stopColor="#BD832F" />
          <stop offset="100%" stopColor="#7C4C14" />
        </linearGradient>

        <linearGradient id="svGoldFeather2" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#FAF1D8" />
          <stop offset="40%" stopColor="#DFAC56" />
          <stop offset="75%" stopColor="#B47829" />
          <stop offset="100%" stopColor="#6A3C0B" />
        </linearGradient>

        <linearGradient id="svGoldFeather3" x1="0%" y1="10%" x2="100%" y2="90%">
          <stop offset="0%" stopColor="#FCF3DC" />
          <stop offset="35%" stopColor="#DCA64E" />
          <stop offset="75%" stopColor="#AE7224" />
          <stop offset="100%" stopColor="#663A0B" />
        </linearGradient>

        <linearGradient id="svGoldBreast" x1="10%" y1="20%" x2="90%" y2="80%">
          <stop offset="0%" stopColor="#FFF7E3" />
          <stop offset="30%" stopColor="#F3CB7E" />
          <stop offset="65%" stopColor="#CD933C" />
          <stop offset="100%" stopColor="#804D13" />
        </linearGradient>

        <linearGradient id="svGoldNeck" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="25%" stopColor="#F9E2B0" />
          <stop offset="60%" stopColor="#DAA34E" />
          <stop offset="85%" stopColor="#B27425" />
          <stop offset="100%" stopColor="#7A4711" />
        </linearGradient>

        <linearGradient id="svCreamBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="50%" stopColor="#F8EEDC" />
          <stop offset="80%" stopColor="#EFE1C9" />
          <stop offset="100%" stopColor="#DEC9A7" />
        </linearGradient>

        <filter id="svLayerShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="3" dy="5" stdDeviation="4.5" floodColor="#3B1E03" floodOpacity="0.32" />
        </filter>
      </defs>

      {/* SWAN WING FEATHER 1 (Tallest Upper Primary Arc) */}
      <path
        d="M 276 226 C 300 240, 360 290, 410 345 C 500 440, 560 520, 610 570 C 565 545, 480 475, 400 395 C 340 330, 290 270, 276 226 Z"
        fill="url(#svGoldFeather1)"
        filter="url(#svLayerShadow)"
      />
      <path
        d="M 292 245 C 340 300, 420 380, 500 460 C 560 520, 595 555, 600 560 C 560 535, 475 460, 405 385 C 355 330, 310 275, 292 245 Z"
        fill="url(#svCreamBody)"
        opacity="0.92"
      />

      {/* SWAN WING FEATHER 2 (Upper Middle Arc) */}
      <path
        d="M 204 406 C 235 410, 310 445, 385 480 C 475 520, 550 550, 605 558 C 550 550, 460 510, 370 465 C 290 425, 225 410, 204 406 Z"
        fill="url(#svGoldFeather2)"
        filter="url(#svLayerShadow)"
      />
      <path
        d="M 225 415 C 285 435, 365 470, 450 510 C 530 545, 580 553, 595 555 C 540 543, 455 502, 370 458 C 300 425, 245 416, 225 415 Z"
        fill="url(#svCreamBody)"
        opacity="0.9"
      />

      {/* SWAN WING FEATHER 3 (Lower Middle Arc) */}
      <path
        d="M 226 544 C 265 540, 350 560, 430 580 C 520 600, 590 608, 650 602 C 585 605, 500 590, 415 565 C 330 545, 260 540, 226 544 Z"
        fill="url(#svGoldFeather3)"
        filter="url(#svLayerShadow)"
      />
      <path
        d="M 250 550 C 320 560, 405 580, 495 595 C 570 603, 625 601, 640 600 C 580 600, 500 585, 420 565 C 345 550, 280 548, 250 550 Z"
        fill="url(#svCreamBody)"
        opacity="0.9"
      />

      {/* SWAN LOWER BODY & CRADLE RIBBON */}
      <path
        d="M 276 658 C 340 685, 430 705, 530 700 C 630 690, 715 650, 774 582 C 750 635, 680 675, 590 695 C 490 710, 380 698, 290 665 C 280 660, 275 658, 276 658 Z"
        fill="url(#svGoldGleam)"
        filter="url(#svLayerShadow)"
      />
      <path
        d="M 310 660 C 400 685, 490 695, 580 680 C 670 660, 740 615, 765 585 C 720 625, 650 660, 560 675 C 470 685, 385 675, 310 660 Z"
        fill="url(#svCreamBody)"
        opacity="0.95"
      />

      {/* FRONT BREAST & LOWER THROAT */}
      <path
        d="M 645 280 C 640 330, 600 410, 560 480 C 535 525, 530 560, 555 600 C 580 635, 630 655, 680 650 C 730 640, 770 605, 775 580 C 765 615, 720 645, 665 650 C 610 650, 565 620, 550 580 C 535 540, 550 495, 585 435 C 625 365, 650 315, 645 280 Z"
        fill="url(#svGoldBreast)"
        filter="url(#svLayerShadow)"
      />

      {/* SWAN NECK S-CURVE */}
      <path
        d="M 618 152 C 555 170, 508 220, 508 285 C 508 355, 545 425, 590 495 C 635 565, 675 615, 730 638 C 760 620, 768 595, 770 580 C 720 610, 665 570, 620 500 C 575 430, 540 365, 540 300 C 540 245, 575 195, 628 178 C 650 170, 672 178, 688 198 C 695 208, 698 220, 695 235 C 685 242, 675 240, 665 235 C 655 220, 640 200, 618 152 Z"
        fill="url(#svGoldNeck)"
        filter="url(#svLayerShadow)"
      />

      {/* SWAN HEAD */}
      <path
        d="M 618 152 C 640 152, 670 170, 690 200 C 702 218, 705 240, 695 262 C 675 275, 652 278, 638 270 C 620 258, 608 235, 608 208 C 608 178, 612 160, 618 152 Z"
        fill="url(#svGoldGleam)"
      />

      {/* 3-LEAF CROWN / CREST ON HEAD */}
      <path
        d="M 632 152 C 622 120, 635 95, 655 82 C 662 108, 655 135, 632 152 Z"
        fill="url(#svGoldLight)"
        filter="url(#svLayerShadow)"
      />
      <path
        d="M 612 158 C 592 135, 602 112, 620 102 C 625 125, 622 145, 612 158 Z"
        fill="url(#svGoldRich)"
      />
      <path
        d="M 648 158 C 668 138, 688 132, 700 128 C 692 150, 675 168, 648 158 Z"
        fill="url(#svGoldFeather1)"
      />

      {/* CLOSED TRANQUIL EYE & EYELASH */}
      <path
        d="M 630 196 C 644 212, 660 228, 678 240"
        stroke="#683907"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 672 235 C 678 232, 684 228, 690 222"
        stroke="#683907"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* GOLDEN BEAK */}
      <path
        d="M 670 262 C 685 278, 705 300, 730 334 C 712 324, 688 300, 664 278 Z"
        fill="url(#svGoldRich)"
        filter="url(#svLayerShadow)"
      />
    </svg>
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
