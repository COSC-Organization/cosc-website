'use client';
import { useEffect, useRef, useCallback } from 'react';
import { animate, createTimeline, stagger, svg, splitText } from 'animejs';

interface HeroLogoProps {
  onTransitionComplete?: () => void;
}

export default function HeroLogo({ onTransitionComplete }: HeroLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ready = useRef(false);

  useEffect(() => {
    ready.current = true;

    // ── Phase 1: Boot Sequence ────────────────────────────────
    const circuitEls =
      document.querySelectorAll<SVGGeometryElement>('.circuit-line');
    const drawables = Array.from(circuitEls).map((el) =>
      svg.createDrawable(el)
    );

    // ── Phase 1: Boot Sequence ────────────────────────────────

    const tl = createTimeline({
      defaults: {
        ease: 'inOut(4)',
        duration: 1200,
      },
    });

    // Draw circuit lines sequentially
    tl.add(drawables, {
      draw: '0 1',
      opacity: [0, 1],
      delay: stagger(100),
      duration: 1200,
    })
      // Pop terminal nodes as lines arrive
      .add(
        '.terminal-node',
        {
          scale: [0, 1],
          opacity: [0, 1],
          delay: stagger(80),
          ease: 'outElastic(1, .5)',
          duration: 800,
        },
        '-=800'
      )
      // Wipe the main C-frame in via drawable
      .add(
        svg.createDrawable(
          document.querySelector<SVGGeometryElement>('.cosc-frame')!
        ),
        {
          draw: '0 1',
          opacity: [0, 1],
          duration: 1500,
          ease: 'inOut(4)',
        },
        '-=1000'
      )
      // Scale-in the bronze core orb with elastic pop
      .add(
        '#core-orb',
        {
          scale: [0, 1],
          opacity: [0, 1],
          ease: 'outElastic(1, .5)',
          duration: 1000,
        },
        '-=800'
      );

    tl.add(
      '.cosc-frame, .circuit-line',
      {
        fillOpacity: [0, 1],
        duration: 1000,
        ease: 'inOutSine',
      },
      '-=600'
    );


    // ── Phase 2: Idle — "Living Logo" ─────────────────────────

    // Core orb breathing pulse
    animate('#core-orb', {
      scale: [0.98, 1.02],
      duration: 3000,
      alternate: true,
      loop: true,
      ease: 'inOutSine',
    });

    // Glow breathing via CSS variable
    animate('#core-orb', {
      filter: [
        'drop-shadow(0 0 6px rgba(205,127,50,0.4))',
        'drop-shadow(0 0 14px rgba(205,127,50,0.85))',
      ],
      duration: 3000,
      alternate: true,
      loop: true,
      ease: 'inOutSine',
    });

    // Orbital ring rotation
    animate('.orbital-ring', {
      rotate: 360,
      duration: 20000,
      loop: true,
      ease: 'linear',
    });

    // Data stream: random highlight running along circuit lines
    let hlTimeout: ReturnType<typeof setTimeout>;
    const highlightLoop = () => {
      if (drawables.length > 0) {
        const idx = Math.floor(Math.random() * drawables.length);
        animate(drawables[idx], {
          draw: ['0 0.1', '0.9 1'],
          duration: 1200,
          ease: 'inOutSine',
          alternate: true,
        });
        animate(circuitEls[idx], {
          opacity: [0.3, 1],
          duration: 1200,
          ease: 'inOutSine',
          alternate: true,
        });
      }
      hlTimeout = setTimeout(highlightLoop, Math.random() * 2500 + 800);
    };
    hlTimeout = setTimeout(highlightLoop, 2500);

    // ── Phase 3: Transition Out ─────────────────
    const transitionTimeout = setTimeout(() => {
      // Scale up the core orb massively to cover the whole screen
      animate('#core-orb', {
        scale: 150,
        duration: 1200,
        ease: 'inOutExpo',
        complete: () => {
          if (onTransitionComplete) onTransitionComplete();
        }
      });

      // Fade out all other specific elements so they disappear during explosion
      animate('.cosc-frame, .circuit-line, .terminal-node, .orbital-ring', {
        opacity: [1, 0],
        fillOpacity: [1, 0],
        duration: 800,
        ease: 'inOutSine'
      });
    }, 4000);

    return () => {
      clearTimeout(hlTimeout);
      clearTimeout(transitionTimeout);
      ready.current = false;
    };
  }, [onTransitionComplete]);

  // ── Phase 3: Interactive Micro-Animations ─────────────────

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !ready.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    animate(containerRef.current, {
      rotateX: -y / 12,
      rotateY: x / 12,
      duration: 100,
      ease: 'outQuad',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current || !ready.current) return;
    animate(containerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1200,
      ease: 'outElastic(1, .5)',
    });
  }, []);

  // ── Phase 3: Interactive Micro-Animations ─────────────────

  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-10">
      {/* SVG Container with 3D perspective tilt */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-72 h-72 sm:w-96 sm:h-96 cursor-crosshair"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        {/* Orbital ring (rotating dotted ring behind logo) */}
        <svg
          className="orbital-ring absolute inset-[-16px] w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none opacity-20"
          viewBox="0 0 240 240"
        >
          <circle
            cx="120"
            cy="120"
            r="110"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 6"
            className="text-zinc-400 "
          />
        </svg>

        {/* Main Logo SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-full h-full relative z-10"
          style={{ overflow: 'visible' }}
        >
          {/* The "C" Frame — drawn in via stroke */}
          <path
            className="cosc-frame opacity-0 fill-zinc-900 stroke-zinc-900" style={{ fillOpacity: 0 }}
            strokeWidth="0.8"
            d="M117.857 49.6098C130.018 49.7096 140.483 57.0075 144.489 68.4876C144.861 69.5554 145.219 70.62 145.566 71.6965C140.646 71.4249 132.711 71.6968 127.628 71.6925C125.002 66.974 118.821 65.2475 113.881 66.9495C111.191 67.8767 108.99 69.8519 107.778 72.4262C106.393 75.298 106.213 78.604 107.277 81.6092C110.479 90.5884 123.954 91.1947 127.53 83.5045L145.623 83.5234C143.257 91.0724 139.699 97.1354 132.77 101.43C126.437 105.342 118.815 106.592 111.565 104.909C103.94 103.082 97.8441 98.6966 93.7486 91.9954L85.9191 92.0045C81.0519 100.755 69.2539 95.1016 72.3963 86.4066C73.0481 84.5954 74.41 83.1282 76.1676 82.3436C80.5573 80.3557 84.2893 82.6725 86.1146 86.7057C89.7663 86.7253 93.418 86.724 97.0697 86.7019C98.4991 90.3763 100.678 92.5781 103.435 95.2457C103.801 95.549 104.181 95.8357 104.573 96.1049C116.383 104.156 130.03 100.492 137.781 88.9049C135.277 88.9425 132.67 88.8897 130.157 88.8707C129.864 89.216 129.557 89.5493 129.237 89.8698C120.799 98.2597 104.686 94.0036 101.821 82.3139C100.337 76.2599 101.755 69.9505 106.3 65.5453C109.509 62.4868 113.804 60.8321 118.236 60.9469C123.297 61.0443 126.737 62.7989 130.154 66.3267C132.556 66.2504 135.256 66.3151 137.682 66.3246C135.693 63.138 133.076 60.2378 129.852 58.2652C124.675 55.0952 118.446 54.1254 112.55 55.5718C106.574 57.0442 101.669 60.5122 98.4846 65.8032C94.3788 65.7563 90.1535 65.8103 86.0384 65.8151C82.2873 71.2008 77.3591 71.1604 72.8237 66.7627C68.4741 55.1465 82.6912 51.2606 86.1608 60.499C89.365 60.4848 92.5693 60.4918 95.7734 60.52C100.352 53.3478 109.688 49.935 117.857 49.6098Z"
          />

          {/* Terminal Nodes */}
          <path
            className="terminal-node opacity-0 fill-white"
            style={{ transformOrigin: '79px 62px' }}
            d="M78.3878 59.7091C80.0023 59.2535 81.6836 60.1785 82.1631 61.7861C82.6427 63.3937 81.7429 65.0885 80.1426 65.5919C79.086 65.9244 77.9323 65.6618 77.1236 64.9049C76.3149 64.148 75.9767 63.0141 76.2385 61.9379C76.5004 60.8616 77.3217 60.0099 78.3878 59.7091Z"
          />
          <path
            className="terminal-node opacity-0 fill-white"
            style={{ transformOrigin: '79px 89px' }}
            d="M78.7805 86.1153C80.439 85.8674 81.9878 87.0013 82.2524 88.6572C82.5171 90.313 81.399 91.8732 79.7459 92.1547C78.6615 92.3393 77.5615 91.9274 76.8651 91.0759C76.1688 90.2243 75.9834 89.0645 76.3796 88.0383C76.7758 87.0122 77.6926 86.2778 78.7805 86.1153Z"
          />
          <path
            className="terminal-node opacity-0 fill-white"
            style={{ transformOrigin: '62px 76px' }}
            d="M61.1016 72.8835C62.738 72.4752 64.3972 73.4636 64.8174 75.0969C65.2376 76.7302 64.2613 78.3966 62.6311 78.8287C60.984 79.2653 59.2965 78.2767 58.872 76.6265C58.4474 74.9762 59.4483 73.296 61.1016 72.8835Z"
          />
          <path
            className="terminal-node opacity-0 fill-white"
            style={{ transformOrigin: '92px 125px' }}
            d="M91.8202 116.923C93.7197 117.101 94.3242 117.11 94.3232 119.199C94.3212 123.298 94.5537 127.488 94.1603 131.564C94.1028 132.16 93.6376 132.313 93.1902 132.602C92.3637 132.538 92.0115 132.559 91.2989 132.15C90.3575 130.911 90.7082 119.655 91.1754 117.625C91.1755 117.625 91.7397 117.01 91.8202 116.923Z"
          />

          {/* Circuit Lines */}
          <path
            className="circuit-line opacity-0 fill-zinc-900 stroke-zinc-900" style={{ fillOpacity: 0 }}
            strokeWidth="0.6"
            d="M60.6587 68.5302C64.8814 68.3378 66.6967 69.5565 68.6766 73.2821C75.6493 73.1225 83.2249 73.2771 90.2464 73.2808L91.1454 69.2454L96.649 69.2355C95.0984 74.0435 94.9049 77.9912 95.743 82.9295C94.2034 82.7673 92.1415 82.865 90.5546 82.8958C90.1518 82.3167 90.0019 79.3782 89.9378 78.5639L68.6147 78.5439C68.5458 78.7365 68.4715 78.9271 68.3918 79.1154C64.6464 87.9705 51.0948 81.3627 55.2277 72.7464C56.2632 70.5875 58.4709 69.2523 60.6587 68.5302Z"
          />
          <path
            className="circuit-line opacity-0 fill-zinc-900 stroke-zinc-900" style={{ fillOpacity: 0 }}
            strokeWidth="0.6"
            d="M90.2192 113.306C98.6007 112.46 98.7171 116.472 98.544 123.555C98.4243 128.457 99.8735 133.978 94.6779 136.102C84.4896 137.76 86.9984 129.006 86.6892 122.214C86.5143 118.373 86.2645 115.138 90.2192 113.306Z"
          />
          <path
            className="circuit-line opacity-0 fill-zinc-900 stroke-zinc-900" style={{ fillOpacity: 0 }}
            strokeWidth="0.6"
            d="M105.608 113.274C107.898 113.082 111.018 112.936 112.286 115.193C114.019 118.279 114.303 122.555 109.416 121.181C108.983 120.496 109.124 118.828 108.792 117.615C108.305 117.198 108.128 117.009 107.385 117.016C106.933 117.021 106.5 117.203 106.18 117.522C105.512 118.203 105.76 120.72 105.785 121.798C109.757 123.343 113.793 123.785 113.502 129.26C113.312 132.831 112.809 135.168 109.069 136.231C102.517 136.544 101.275 134.142 101.766 128.012L105.649 128.016C105.653 129.744 105.386 132.175 107.53 132.675C109.474 132.003 109.064 129.097 109.01 127.491C105.156 125.987 101.167 125.261 101.497 120.164C101.707 116.906 102.066 114.329 105.608 113.274Z"
          />
          <path
            className="circuit-line opacity-0 fill-zinc-900 stroke-zinc-900" style={{ fillOpacity: 0 }}
            strokeWidth="0.6"
            d="M75.5413 113.283C83.1029 112.843 83.6311 115.131 83.4887 121.984L79.5057 122.024C79.49 120.431 79.809 118.24 78.5484 117.186C77.8124 116.894 77.7142 116.897 76.9326 117.038C75.4535 118.477 75.5797 129.838 76.1609 131.81C76.9751 132.744 78.1897 132.702 79.0704 131.901C79.5563 130.845 79.4668 129.178 79.4852 127.958C79.5087 127.844 79.6859 127.534 79.7503 127.411C80.6803 127.14 82.44 127.265 83.4899 127.294C83.5592 129.545 83.7951 132.071 82.5228 134.035C80.1853 137.643 76.0034 136.624 72.9741 134.798C71.2885 131.527 71.7197 127.23 71.6821 123.582C71.6426 119.742 71.178 114.777 75.5413 113.283Z"
          />
          <path
            className="circuit-line opacity-0 fill-zinc-900 stroke-zinc-900" style={{ fillOpacity: 0 }}
            strokeWidth="0.6"
            d="M120.251 113.289C127.641 112.609 128.376 115.493 128.22 121.961C126.952 122.011 125.516 121.987 124.234 121.994C124.175 120.701 124.197 118.674 123.709 117.551C123.197 117.049 123.072 117.047 122.377 116.936C121.814 117.114 121.387 117.224 121.066 117.813C120.003 119.767 120.414 130.045 120.813 131.827C121.742 132.728 122.819 132.751 123.761 131.884C124.25 130.827 124.162 129.385 124.187 128.187C124.224 127.727 124.223 127.857 124.521 127.425C125.575 127.096 127.101 127.279 128.243 127.339C128.276 129.231 128.432 131.307 127.82 133.123C127.44 134.248 126.732 135.162 125.646 135.677C124.037 136.439 121.35 136.576 119.689 135.964C118.479 135.518 117.589 134.598 117.079 133.424C116.084 131.136 116.067 118.422 117.01 116.161C117.71 114.482 118.658 113.928 120.251 113.289Z"
          />

          {/* Core Orb */}
          <path
            id="core-orb"
            className="opacity-0"
            fill="#C58C4F"
            style={{ transformOrigin: '118px 77px' }}
            d="M116.568 69.385C121.056 68.6542 125.293 71.6774 126.063 76.1585C126.833 80.6397 123.847 84.9037 119.373 85.7125C114.843 86.5312 110.514 83.5 109.735 78.9633C108.956 74.4267 112.025 70.1248 116.568 69.385Z"
          />
        </svg>
      </div>

      {/* Hero Text with Liquid Hover Expansion */}
     
    </div>
  );
}
