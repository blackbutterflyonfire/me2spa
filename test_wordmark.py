import re

svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 280" width="100%" height="100%">
  <defs>
    <linearGradient id="goldTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5DC"/>
      <stop offset="20%" stop-color="#FCE4A6"/>
      <stop offset="45%" stop-color="#DEAA52"/>
      <stop offset="70%" stop-color="#BA7F27"/>
      <stop offset="90%" stop-color="#8E5513"/>
      <stop offset="100%" stop-color="#603507"/>
    </linearGradient>

    <linearGradient id="goldSpecular" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="15%" stop-color="#FFF6E0"/>
      <stop offset="45%" stop-color="#E5B767"/>
      <stop offset="80%" stop-color="#B77C26"/>
      <stop offset="100%" stop-color="#6D3D09"/>
    </linearGradient>

    <filter id="goldDrop" x="-5%" y="-5%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2.5" stdDeviation="3" flood-color="#3D2005" flood-opacity="0.38"/>
    </filter>
  </defs>

  <g id="spavibe-wordmark" filter="url(#goldDrop)">
    <!-- ==================== LETTER 'S' WITH ELEGANT SWASH ==================== -->
    <!-- Top ball terminal -->
    <circle cx="152" cy="74" r="10.5" fill="url(#goldTextGrad)" />
    
    <!-- Top curve of S -->
    <path d="M 152 74 C 168 55, 202 38, 230 52 C 255 64, 252 92, 232 110 C 205 135, 172 154, 164 180 C 156 208, 178 228, 210 226 C 235 224, 254 208, 266 192 L 270 198 C 255 220, 230 238, 200 238 C 154 238, 134 204, 142 168 C 150 138, 180 114, 208 92 C 230 74, 236 62, 224 54 C 208 44, 178 55, 160 78 Z"
          fill="url(#goldTextGrad)" />

    <!-- Big sweeping lower calligraphic flourish loop of S -->
    <path d="M 148 175 C 130 195, 95 218, 55 210 C 22 202, 10 168, 24 135 C 38 102, 74 85, 115 88 C 112 94, 76 96, 48 122 C 28 142, 28 170, 48 186 C 72 205, 110 195, 142 170 Z"
          fill="url(#goldTextGrad)" />

    <!-- ==================== LETTER 'p' ==================== -->
    <!-- Vertical stem -->
    <rect x="238" y="90" width="17" height="152" rx="1.5" fill="url(#goldTextGrad)" />
    <!-- Top bracketed serif -->
    <path d="M 230 94 L 255 90 L 255 102 Z" fill="url(#goldTextGrad)" />
    <!-- Bottom foot serif -->
    <path d="M 230 240 L 262 240 L 262 246 L 230 246 Z" fill="url(#goldTextGrad)" />
    <!-- Round plump bowl -->
    <path d="M 255 102 C 275 88, 312 86, 332 110 C 348 128, 348 160, 332 180 C 314 200, 276 202, 255 188 Z M 255 116 L 255 174 C 270 184, 300 184, 314 168 C 328 152, 328 128, 316 116 C 302 104, 272 104, 255 116 Z"
          fill="url(#goldTextGrad)" />

    <!-- ==================== LETTER 'a' ==================== -->
    <!-- Teardrop top hook -->
    <circle cx="370" cy="98" r="6.5" fill="url(#goldTextGrad)" />
    <!-- Body of 'a' -->
    <path d="M 370 98 C 378 92, 396 86, 415 86 C 440 86, 452 98, 458 114 L 458 190 L 446 190 L 446 178 C 436 190, 420 198, 400 198 C 372 198, 352 180, 352 156 C 352 132, 374 118, 406 116 L 446 114 L 446 110 C 446 96, 434 90, 418 90 C 402 90, 386 98, 378 110 Z M 446 128 L 410 130 C 386 132, 370 142, 370 156 C 370 172, 384 184, 404 184 C 428 184, 446 168, 446 146 Z"
          fill="url(#goldTextGrad)" />
    <!-- Baseline terminal of 'a' -->
    <path d="M 444 190 L 466 190 L 466 196 L 444 196 Z" fill="url(#goldTextGrad)" />

    <!-- ==================== LETTER 'V' WITH DRAMATIC WAVE SWASH ==================== -->
    <!-- Left diagonal wave crest (starts high, curves back and over) -->
    <path d="M 388 48 C 418 18, 465 6, 508 28 C 532 42, 545 68, 536 94 C 524 120, 496 132, 474 122 C 454 110, 456 86, 472 74 C 486 64, 506 66, 514 76 C 510 58, 495 44, 475 36 C 446 26, 412 38, 394 54 Z"
          fill="url(#goldSpecular)" />

    <!-- Left hairline diagonal swooping down to vertex -->
    <path d="M 508 30 C 522 60, 538 120, 552 216 L 544 216 C 518 140, 490 70, 458 35 Z"
          fill="url(#goldTextGrad)" />

    <!-- Right arm of 'V' (thick diagonal ascending to right) -->
    <path d="M 544 216 L 626 46 L 650 46 L 558 224 Z"
          fill="url(#goldSpecular)" />
    <!-- Top right serif on 'V' -->
    <path d="M 618 46 L 660 46 L 660 52 L 618 52 Z" fill="url(#goldTextGrad)" />

    <!-- ==================== LETTER 'i' ==================== -->
    <!-- Dot / tittle of 'i' (spherical glowing bead) -->
    <circle cx="642" cy="74" r="9" fill="url(#goldSpecular)" />
    <!-- Stem of 'i' -->
    <rect x="633" y="94" width="16" height="96" rx="1.5" fill="url(#goldTextGrad)" />
    <!-- Top serif -->
    <path d="M 625 98 L 649 94 L 649 104 Z" fill="url(#goldTextGrad)" />
    <!-- Bottom serif -->
    <path d="M 625 190 L 657 190 L 657 196 L 625 196 Z" fill="url(#goldTextGrad)" />

    <!-- ==================== LETTER 'b' ==================== -->
    <!-- Tall ascender stem -->
    <rect x="682" y="44" width="17" height="146" rx="1.5" fill="url(#goldTextGrad)" />
    <!-- Top ascender serif -->
    <path d="M 674 48 L 699 44 L 699 56 Z" fill="url(#goldTextGrad)" />
    <!-- Bottom serif -->
    <path d="M 674 190 L 706 190 L 706 196 L 674 196 Z" fill="url(#goldTextGrad)" />
    <!-- Round bowl of 'b' -->
    <path d="M 699 104 C 719 88, 756 86, 778 110 C 794 128, 792 160, 776 180 C 758 200, 720 202, 699 188 Z M 699 116 L 699 174 C 714 184, 744 184, 758 168 C 772 152, 772 128, 760 116 C 746 104, 716 104, 699 116 Z"
          fill="url(#goldTextGrad)" />

    <!-- ==================== LETTER 'e' ==================== -->
    <path d="M 874 156 L 800 156 C 802 174, 818 186, 842 186 C 858 186, 868 178, 874 168 L 884 174 C 874 190, 860 198, 840 198 C 808 198, 786 176, 786 142 C 786 108, 810 84, 840 84 C 870 84, 886 110, 884 144 Z M 800 142 L 870 142 C 868 120, 858 98, 838 98 C 818 98, 804 118, 800 142 Z"
          fill="url(#goldTextGrad)" />
    <!-- Refined flourish flick on 'e' terminal -->
    <path d="M 874 172 C 884 184, 898 192, 915 190"
          stroke="url(#goldTextGrad)" stroke-width="3.5" stroke-linecap="round" fill="none" />
  </g>
</svg>'''

with open("public/images/spavibe-wordmark.svg", "w") as f:
    f.write(svg)
print("Public wordmark SVG written! Length:", len(svg))
