import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { playBowTwang, playHeartHit, playStarSparkle } from '../../utils/soundEffects';
import { useCustomization } from '../../context/CustomizationContext';

interface Scene02BowHeartProps {
  onComplete: () => void;
}

export const Scene02BowHeart: React.FC<Scene02BowHeartProps> = ({ onComplete }) => {
  const { config } = useCustomization();
  
  // Bow and Arrow interaction state
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0); // 0 to 75px
  const [arrowShot, setArrowShot] = useState(false);
  const [arrowProgress, setArrowProgress] = useState(0); // 0 to 1
  const [heartHit, setHeartHit] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const dragStartRef = useRef<{ y: number; x: number }>({ y: 0, x: 0 });

  // Touch and mouse handlers for pulling arrow backward
  const handleStart = (clientX: number, clientY: number) => {
    if (arrowShot || heartHit) return;
    setIsPulling(true);
    dragStartRef.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isPulling || arrowShot || heartHit) return;
    // Arrow is aimed upward toward the heart in mobile layout (or left to right)
    // Pulling down/back stretches the string
    const dy = clientY - dragStartRef.current.y;
    const dx = clientX - dragStartRef.current.x;
    const distance = Math.max(0, Math.min(85, dy + dx * 0.2));
    setPullDistance(distance);
  };

  const handleRelease = () => {
    if (!isPulling || arrowShot || heartHit) return;
    setIsPulling(false);

    // If pulled at least 25px, shoot!
    if (pullDistance > 20) {
      shootArrow();
    } else {
      // snap back
      setPullDistance(0);
    }
  };

  const shootArrow = () => {
    setArrowShot(true);
    playBowTwang();

    // Arrow flight animation
    const startTime = performance.now();
    const duration = 400; // ms

    const animateFlight = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      setArrowProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animateFlight);
      } else {
        // Arrow hits the heart!
        triggerHeartHit();
      }
    };

    requestAnimationFrame(animateFlight);
  };

  const triggerHeartHit = () => {
    setHeartHit(true);
    playHeartHit();
    playStarSparkle();

    // Trigger delicate pastel confetti shower
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.38 },
      colors: ['#E8C5C8', '#FAF6EE', '#D4A373', '#FDE68A', '#E0E7FF'],
      ticks: 200,
      gravity: 0.8,
      scalar: 0.9,
    });

    setTimeout(() => {
      setShowCelebration(true);
    }, 600);
  };

  // Keyboard or click fallback for accessibility
  const handleQuickShoot = () => {
    if (!arrowShot && !heartHit) {
      setPullDistance(60);
      setTimeout(() => {
        shootArrow();
      }, 150);
    }
  };

  return (
    <div
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleRelease}
      onTouchMove={(e) => {
        if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchEnd={handleRelease}
      className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 bg-[#16131F] dark-paper-texture overflow-hidden select-none"
    >
      {/* Background ambient glow when heart is hit */}
      <motion.div
        animate={heartHit ? { opacity: 0.6, scale: 1.2 } : { opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-[#E8C5C8]/40 to-transparent blur-3xl pointer-events-none"
      />

      {/* Top hint or celebratory banner */}
      <div className="relative z-10 w-full text-center pt-8">
        {!heartHit ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <span className="font-handwriting text-xl text-[#FAF6EE]/75">
              take aim at the heart...
            </span>
            <span className="font-playful text-xs text-[#A8A29E] mt-0.5">
              (pull the arrow down and release)
            </span>
          </motion.div>
        ) : (
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="space-y-1"
              >
                <div className="font-display text-2xl md:text-3xl tracking-widest text-[#E8C5C8] uppercase font-light">
                  Happy Birthday ♡
                </div>
                <div className="font-handwriting text-3xl md:text-5xl text-[#FAF6EE] font-medium tracking-wide">
                  {config.herName}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Center Target: The Large Illustrated Handcrafted Heart */}
      <div className="relative z-10 my-auto flex flex-col items-center">
        <motion.div
          animate={
            heartHit
              ? {
                  scale: [1, 1.25, 0.95, 1.08, 1],
                  rotate: [0, -3, 3, -1, 0],
                }
              : { scale: [1, 1.03, 1] }
          }
          transition={
            heartHit
              ? { duration: 0.8, ease: 'easeOut' }
              : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative cursor-pointer"
          onClick={handleQuickShoot}
        >
          {/* Subtle orbiting sparkles after hit */}
          {heartHit && (
            <div className="absolute inset-0 pointer-events-none">
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: [deg, deg + 360],
                  }}
                  transition={{ duration: 8 + i, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 flex items-start justify-center"
                >
                  <span className="text-[#FDE68A] text-xs -translate-y-6">✦</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Handcrafted Heart SVG */}
          <div className="relative w-44 h-40 md:w-56 md:h-52 filter drop-shadow-xl">
            <svg viewBox="0 0 100 90" className="w-full h-full">
              <defs>
                <radialGradient id="heartGradient" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#F29EAA" />
                  <stop offset="60%" stopColor="#D85C70" />
                  <stop offset="100%" stopColor="#A83248" />
                </radialGradient>
                <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Heart body */}
              <path
                d="M50 85 C50 85 10 58 10 32 C10 16 23 8 36 8 C43 8 47 12 50 16 C53 12 57 8 64 8 C77 8 90 16 90 32 C90 58 50 85 50 85 Z"
                fill="url(#heartGradient)"
                stroke="#FAF6EE"
                strokeWidth="1.5"
                filter={heartHit ? "url(#glowEffect)" : undefined}
              />

              {/* Light highlight crescent */}
              <path
                d="M24 18 C18 24 16 34 18 42"
                stroke="#FAF6EE"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />

              {/* Tiny hand-drawn decorative doodle marks */}
              <circle cx="34" cy="22" r="1.5" fill="#FAF6EE" opacity="0.6" />
              <circle cx="38" cy="26" r="1" fill="#FAF6EE" opacity="0.4" />
            </svg>

            {/* Embedded arrow when hit */}
            {heartHit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {/* Arrow embedded in heart angle */}
                <div className="w-1.5 h-16 bg-[#D4A373] rotate-12 relative -top-3 shadow-md rounded-full">
                  {/* Arrow feather fletching */}
                  <div className="absolute -bottom-2 -left-1.5 w-4 h-3 flex justify-between">
                    <span className="w-1.5 h-3 bg-[#FAF6EE] rounded-sm transform -rotate-12" />
                    <span className="w-1.5 h-3 bg-[#FAF6EE] rounded-sm transform rotate-12" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Area: The Interactive Bow & Arrow Rig */}
      <div className="relative z-20 w-full max-w-xs flex flex-col items-center pb-8">
        {!heartHit ? (
          <div className="relative flex flex-col items-center">
            {/* The Bow and Arrow Widget */}
            <div
              onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
              onTouchStart={(e) => {
                if (e.touches[0]) handleStart(e.touches[0].clientX, e.touches[0].clientY);
              }}
              className="relative w-40 h-36 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
              title="Drag the arrow down and let go to shoot!"
            >
              <svg viewBox="0 0 160 140" className="w-full h-full overflow-visible">
                {/* Bow wooden curve */}
                <path
                  d="M20 70 Q80 18 140 70"
                  fill="none"
                  stroke="#A26B43"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M20 70 Q80 20 140 70"
                  fill="none"
                  stroke="#D4A373"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Bowstring: dynamically bends back based on pullDistance */}
                <path
                  d={`M22 70 Q80 ${70 + pullDistance} 138 70`}
                  fill="none"
                  stroke="#FAF6EE"
                  strokeWidth="1.5"
                  strokeDasharray="none"
                  opacity="0.9"
                />

                {/* The Arrow (if not yet in flight) */}
                {!arrowShot && (
                  <g transform={`translate(80, ${50 + pullDistance})`}>
                    {/* Arrow Shaft */}
                    <line x1="0" y1="-45" x2="0" y2="25" stroke="#D4A373" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Arrowhead pointed UP */}
                    <polygon points="0,-52 -6,-42 6,-42" fill="#E8C5C8" stroke="#FAF6EE" strokeWidth="1" />
                    {/* Fletching / feathers */}
                    <path d="M-5 18 L0 25 L5 18" stroke="#FAF6EE" strokeWidth="1.5" fill="none" />
                    <path d="M-5 12 L0 19 L5 12" stroke="#FAF6EE" strokeWidth="1.5" fill="none" />
                  </g>
                )}
              </svg>

              {/* In-flight arrow flying up to the heart */}
              {arrowShot && !heartHit && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: `${50 + arrowProgress * 220}px`,
                    transform: 'scale(1)',
                    transition: 'none',
                  }}
                  className="pointer-events-none flex flex-col items-center"
                >
                  <div className="w-1 h-14 bg-[#D4A373] relative">
                    <div className="absolute -top-3 -left-1 w-3 h-3 bg-[#E8C5C8] rotate-45" />
                  </div>
                </div>
              )}
            </div>

            {/* Tap button alternative for convenience */}
            <button
              onClick={handleQuickShoot}
              className="mt-2 text-xs font-handwriting text-[#FAF6EE]/60 hover:text-[#FAF6EE] underline underline-offset-4 cursor-pointer"
            >
              (or tap here to release the arrow)
            </button>
          </div>
        ) : (
          /* Continue Button after celebration */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-full bg-[#FAF5ED] text-[#1E1A26] font-handwriting text-xl tracking-wide shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
            >
              <span>step inside the little world</span>
              <span className="text-sm font-sans group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
