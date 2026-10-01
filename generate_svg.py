import re

svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="100%" height="100%">
  <defs>
    <!-- Luxurious Gold Gradients -->
    <linearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF8E7"/>
      <stop offset="25%" stop-color="#FCE1A2"/>
      <stop offset="50%" stop-color="#E2B465"/>
      <stop offset="75%" stop-color="#C28731"/>
      <stop offset="100%" stop-color="#8F5A17"/>
    </linearGradient>

    <linearGradient id="goldGleam" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="20%" stop-color="#FEEBC2"/>
      <stop offset="55%" stop-color="#DEAB59"/>
      <stop offset="85%" stop-color="#B27424"/>
      <stop offset="100%" stop-color="#6F410F"/>
    </linearGradient>

    <linearGradient id="goldRich" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7B4912"/>
      <stop offset="35%" stop-color="#B77B28"/>
      <stop offset="70%" stop-color="#ECC67E"/>
      <stop offset="90%" stop-color="#FDF0D0"/>
      <stop offset="100%" stop-color="#CE953C"/>
    </linearGradient>

    <linearGradient id="goldFeather1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBF2DB"/>
      <stop offset="30%" stop-color="#E7BC6F"/>
      <stop offset="70%" stop-color="#BD832F"/>
      <stop offset="100%" stop-color="#7C4C14"/>
    </linearGradient>

    <linearGradient id="goldFeather2" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#FAF1D8"/>
      <stop offset="40%" stop-color="#DFAC56"/>
      <stop offset="75%" stop-color="#B47829"/>
      <stop offset="100%" stop-color="#6A3C0B"/>
    </linearGradient>

    <linearGradient id="goldFeather3" x1="0%" y1="10%" x2="100%" y2="90%">
      <stop offset="0%" stop-color="#FCF3DC"/>
      <stop offset="35%" stop-color="#DCA64E"/>
      <stop offset="75%" stop-color="#AE7224"/>
      <stop offset="100%" stop-color="#663A0B"/>
    </linearGradient>

    <linearGradient id="goldBreast" x1="10%" y1="20%" x2="90%" y2="80%">
      <stop offset="0%" stop-color="#FFF7E3"/>
      <stop offset="30%" stop-color="#F3CB7E"/>
      <stop offset="65%" stop-color="#CD933C"/>
      <stop offset="100%" stop-color="#804D13"/>
    </linearGradient>

    <linearGradient id="goldNeck" x1="30%" y1="0%" x2="70%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF5"/>
      <stop offset="25%" stop-color="#F9E2B0"/>
      <stop offset="60%" stop-color="#DAA34E"/>
      <stop offset="85%" stop-color="#B27425"/>
      <stop offset="100%" stop-color="#7A4711"/>
    </linearGradient>

    <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E3B261"/>
      <stop offset="25%" stop-color="#FFF0CD"/>
      <stop offset="50%" stop-color="#D59F48"/>
      <stop offset="75%" stop-color="#A76C20"/>
      <stop offset="100%" stop-color="#6E400E"/>
    </linearGradient>

    <linearGradient id="creamBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF7"/>
      <stop offset="50%" stop-color="#F7EEDC"/>
      <stop offset="80%" stop-color="#EFE0C7"/>
      <stop offset="100%" stop-color="#DCC7A4"/>
    </linearGradient>

    <!-- Subtle Drop Shadow for Feather Layers -->
    <filter id="layerShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#472605" flood-opacity="0.35"/>
    </filter>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- ==================== SWAN EMBLEM ==================== -->
  <g id="swan-emblem" transform="translate(0, -10)">
    
    <!-- Feather 1 (Top Primary Feather - Tallest Wing Arc) -->
    <path d="M 276 226 C 300 240, 360 290, 410 345 C 500 440, 560 520, 610 570 C 565 545, 480 475, 400 395 C 340 330, 290 270, 276 226 Z"
          fill="url(#goldFeather1)" filter="url(#layerShadow)" />
    <!-- Feather 1 Inner Cream Body Fill -->
    <path d="M 292 245 C 340 300, 420 380, 500 460 C 560 520, 595 555, 600 560 C 560 535, 475 460, 405 385 C 355 330, 310 275, 292 245 Z"
          fill="url(#creamBody)" opacity="0.9" />

    <!-- Feather 2 (Upper Middle Sweeping Wing Feather) -->
    <path d="M 204 406 C 235 410, 310 445, 385 480 C 475 520, 550 550, 605 558 C 550 550, 460 510, 370 465 C 290 425, 225 410, 204 406 Z"
          fill="url(#goldFeather2)" filter="url(#layerShadow)" />
    <!-- Feather 2 Cream Center -->
    <path d="M 225 415 C 285 435, 365 470, 450 510 C 530 545, 580 553, 595 555 C 540 543, 455 502, 370 458 C 300 425, 245 416, 225 415 Z"
          fill="url(#creamBody)" opacity="0.88" />

    <!-- Feather 3 (Lower Middle Wing Feather) -->
    <path d="M 226 544 C 265 540, 350 560, 430 580 C 520 600, 590 608, 650 602 C 585 605, 500 590, 415 565 C 330 545, 260 540, 226 544 Z"
          fill="url(#goldFeather3)" filter="url(#layerShadow)" />
    <!-- Feather 3 Cream Center -->
    <path d="M 250 550 C 320 560, 405 580, 495 595 C 570 603, 625 601, 640 600 C 580 600, 500 585, 420 565 C 345 550, 280 548, 250 550 Z"
          fill="url(#creamBody)" opacity="0.88" />

    <!-- Base Ribbon & Tail Flow (Sweeps gracefully from bottom left around under body) -->
    <path d="M 276 658 C 340 685, 430 705, 530 700 C 630 690, 715 650, 774 582 C 750 635, 680 675, 590 695 C 490 710, 380 698, 290 665 C 280 660, 275 658, 276 658 Z"
          fill="url(#goldGleam)" filter="url(#layerShadow)" />
    
    <!-- Lower Belly Curve (Cream & Gold Satin Blend) -->
    <path d="M 310 660 C 400 685, 490 695, 580 680 C 670 660, 740 615, 765 585 C 720 625, 650 660, 560 675 C 470 685, 385 675, 310 660 Z"
          fill="url(#creamBody)" opacity="0.95" />

    <!-- Front Breast & Neck Curve (Flows downwards from head into chest) -->
    <path d="M 645 280 C 640 330, 600 410, 560 480 C 535 525, 530 560, 555 600 C 580 635, 630 655, 680 650 C 730 640, 770 605, 775 580 C 765 615, 720 645, 665 650 C 610 650, 565 620, 550 580 C 535 540, 550 495, 585 435 C 625 365, 650 315, 645 280 Z"
          fill="url(#goldBreast)" filter="url(#layerShadow)" />

    <!-- Swan Neck Main Graceful S-Curve -->
    <path d="M 618 152 C 555 170, 508 220, 508 285 C 508 355, 545 425, 590 495 C 635 565, 675 615, 730 638 C 760 620, 768 595, 770 580 C 720 610, 665 570, 620 500 C 575 430, 540 365, 540 300 C 540 245, 575 195, 628 178 C 650 170, 672 178, 688 198 C 695 208, 698 220, 695 235 C 685 242, 675 240, 665 235 C 655 220, 640 200, 618 152 Z"
          fill="url(#goldNeck)" filter="url(#layerShadow)" />

    <!-- Swan Head & Crown -->
    <path d="M 618 152 C 640 152, 670 170, 690 200 C 702 218, 705 240, 695 262 C 675 275, 652 278, 638 270 C 620 258, 608 235, 608 208 C 608 178, 612 160, 618 152 Z"
          fill="url(#goldGleam)" />

    <!-- Swan Crown / 3 Golden Leaves on Head -->
    <!-- Middle Leaf (Tallest) -->
    <path d="M 632 152 C 622 120, 635 95, 655 82 C 662 108, 655 135, 632 152 Z"
          fill="url(#goldLight)" filter="url(#layerShadow)" />
    <!-- Back Leaf (Left) -->
    <path d="M 612 158 C 592 135, 602 112, 620 102 C 625 125, 622 145, 612 158 Z"
          fill="url(#goldRich)" />
    <!-- Front Leaf (Right) -->
    <path d="M 648 158 C 668 138, 688 132, 700 128 C 692 150, 675 168, 648 158 Z"
          fill="url(#goldFeather1)" />

    <!-- Elegant Closed Eye / Serene Eyelid & Eyelashes -->
    <path d="M 630 196 C 644 212, 660 228, 678 240"
          stroke="#683907" stroke-width="5.5" stroke-linecap="round" fill="none" />
    <path d="M 672 235 C 678 232, 684 228, 690 222"
          stroke="#683907" stroke-width="3.5" stroke-linecap="round" fill="none" />
    <path d="M 662 225 C 667 220, 672 215, 676 208"
          stroke="#683907" stroke-width="2.5" stroke-linecap="round" fill="none" />

    <!-- Graceful Golden Beak -->
    <path d="M 670 262 C 685 278, 705 300, 730 334 C 712 324, 688 300, 664 278 Z"
          fill="url(#goldRich)" filter="url(#layerShadow)" />
    
    <!-- Swan Body Main Shading Accent Lines (Ribbon Edges) -->
    <path d="M 276 226 C 360 300, 480 430, 560 520 C 610 570, 670 600, 720 595"
          stroke="url(#goldGleam)" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.85" />
    <path d="M 204 406 C 290 435, 420 500, 520 550 C 570 575, 630 585, 680 575"
          stroke="url(#goldLight)" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8" />
  </g>

  <!-- ==================== "SpaVibe" LUXURY TYPOGRAPHY ==================== -->
  <g id="spavibe-text" transform="translate(0, 30)">
    
    <!-- Capital 'S' with sweeping calligraphic swash -->
    <g id="letter-S">
      <!-- Upper terminal drop/bead -->
      <circle cx="206" cy="728" r="8" fill="url(#goldText)" />
      <!-- Main flourishing S body -->
      <path d="M 206 728 C 220 710, 252 696, 276 712 C 298 728, 290 754, 268 774 C 240 800, 206 824, 200 852 C 194 880, 218 898, 250 896 C 274 894, 292 878, 302 864 L 306 870 C 292 890, 268 906, 240 906 C 196 906, 172 874, 182 838 C 190 810, 220 782, 248 760 C 270 742, 276 728, 264 718 C 248 706, 226 718, 212 734 Z"
            fill="url(#goldText)" />
      <!-- Extended baseline flourish -->
      <path d="M 188 842 C 170 854, 140 872, 116 876 C 132 896, 175 906, 230 905"
            stroke="url(#goldText)" stroke-width="4.5" stroke-linecap="round" fill="none" />
      <circle cx="116" cy="876" r="4.5" fill="url(#goldText)" />
    </g>

    <!-- Lowercase 'p' with high-contrast serif -->
    <g id="letter-p">
      <!-- Vertical descender stem -->
      <path d="M 292 762 L 310 762 L 310 920 L 292 920 Z" fill="url(#goldText)" />
      <!-- Top serif -->
      <path d="M 284 766 L 310 762 L 310 774 Z" fill="url(#goldText)" />
      <!-- Bottom descender serif -->
      <path d="M 286 918 L 316 918 L 316 924 L 286 924 Z" fill="url(#goldText)" />
      <!-- Rounded bowl -->
      <path d="M 310 776 C 330 760, 368 758, 388 782 C 404 802, 402 836, 386 856 C 368 876, 332 878, 310 864 Z M 310 790 L 310 850 C 324 860, 354 860, 368 844 C 382 828, 382 804, 370 792 C 356 778, 326 778, 310 790 Z"
            fill="url(#goldText)" />
    </g>

    <!-- Lowercase 'a' with refined hook -->
    <g id="letter-a">
      <path d="M 424 812 C 424 782, 452 764, 482 764 C 504 764, 518 776, 524 792 L 524 870 L 512 870 L 512 856 C 502 868, 486 876, 468 876 C 440 876, 420 858, 420 834 C 420 810, 442 796, 474 794 L 512 792 L 512 788 C 512 774, 500 768, 484 768 C 468 768, 452 776, 444 788 Z M 512 806 L 476 808 C 452 810, 436 820, 436 834 C 436 850, 450 862, 470 862 C 494 862, 512 846, 512 824 Z"
            fill="url(#goldText)" />
      <!-- Little teardrop hook at top -->
      <path d="M 444 788 C 436 784, 430 774, 436 766 C 442 758, 454 762, 458 770 Z" fill="url(#goldText)" />
    </g>

    <!-- Capital 'V' with sweeping flourishing wave crest -->
    <g id="letter-V">
      <!-- Flourishing wave left arm starting high and swooping -->
      <path d="M 446 724 C 470 702, 510 695, 544 715 C 564 728, 574 750, 566 772 C 556 795, 532 806, 514 796 C 496 786, 498 764, 512 754 C 524 745, 540 748, 546 756 C 542 742, 530 728, 514 722 C 490 714, 464 725, 452 736 Z"
            fill="url(#goldText)" />
      <!-- Left diagonal tapering to sharp point -->
      <path d="M 544 724 C 555 750, 568 800, 582 888 L 576 888 C 550 820, 524 760, 496 730 Z"
            fill="url(#goldText)" />
      <!-- Right diagonal with crisp thick stroke -->
      <path d="M 576 888 L 658 718 L 678 718 L 588 894 Z"
            fill="url(#goldText)" />
      <!-- Right arm serif -->
      <path d="M 646 718 L 688 718 L 688 724 L 646 724 Z" fill="url(#goldText)" />
    </g>

    <!-- Lowercase 'i' with glowing dot -->
    <g id="letter-i">
      <circle cx="664" cy="744" r="7.5" fill="url(#goldText)" />
      <path d="M 656 766 L 674 766 L 674 870 L 656 870 Z" fill="url(#goldText)" />
      <path d="M 650 768 L 674 766 L 674 774 Z" fill="url(#goldText)" />
      <path d="M 650 868 L 680 868 L 680 874 L 650 874 Z" fill="url(#goldText)" />
    </g>

    <!-- Lowercase 'b' with tall ascender -->
    <g id="letter-b">
      <!-- Tall ascender -->
      <path d="M 698 716 L 716 716 L 716 870 L 698 870 Z" fill="url(#goldText)" />
      <path d="M 690 720 L 716 716 L 716 726 Z" fill="url(#goldText)" />
      <path d="M 692 868 L 722 868 L 722 874 L 692 874 Z" fill="url(#goldText)" />
      <!-- Rounded bowl -->
      <path d="M 716 776 C 736 760, 772 758, 794 782 C 810 802, 808 836, 792 856 C 774 876, 738 878, 716 864 Z M 716 790 L 716 850 C 730 860, 760 860, 774 844 C 788 828, 788 804, 776 792 C 762 778, 732 778, 716 790 Z"
            fill="url(#goldText)" />
    </g>

    <!-- Lowercase 'e' with classic terminal -->
    <g id="letter-e">
      <path d="M 888 836 L 814 836 C 816 854, 832 866, 856 866 C 872 866, 882 858, 888 848 L 898 854 C 888 870, 874 878, 854 878 C 822 878, 800 856, 800 822 C 800 788, 824 764, 854 764 C 884 764, 900 790, 898 824 Z M 814 822 L 884 822 C 882 800, 872 778, 852 778 C 832 778, 818 798, 814 822 Z"
            fill="url(#goldText)" />
      <!-- Elegant sweep on e terminal -->
      <path d="M 888 852 C 896 864, 908 870, 922 868"
            stroke="url(#goldText)" stroke-width="3" stroke-linecap="round" fill="none" />
    </g>
  </g>
</svg>'''

with open("spavibe-logo.svg", "w") as f:
    f.write(svg_content)

print("SVG written successfully! Size:", len(svg_content))
