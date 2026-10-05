import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { playStarSparkle, playPaperRustle } from '../../utils/soundEffects';

interface Scene06BouquetProps {
  onComplete: () => void;
}

export const Scene06Bouquet: React.FC<Scene06BouquetProps> = ({ onComplete }) => {
  const [accepted, setAccepted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleAcceptBouquet = () => {
    if (accepted) return;
    setAccepted(true);
    playStarSparkle();
    playPaperRustle();

    // Floating delicate white lily and red rose petal shower
    confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#FFFFFF', '#FAF6EE', '#E8C5C8', '#FDE68A', '#BE123C', '#E11D48'],
      shapes: ['circle'],
      ticks: 250,
      gravity: 0.5,
      scalar: 1.1,
    });

    // Start transition layer after emotional reaction
    setTimeout(() => {
      setTransitioning(true);
      setTimeout(() => {
        onComplete();
      }, 1600);
    }, 1800);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 bg-[#121017] dark-paper-texture overflow-hidden select-none">
      
      {/* Background soft moonlight clearing */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#E0E7FF]/10 blur-3xl pointer-events-none" />

      {/* Top spacing / subtle stars */}
      <div className="relative z-10 w-full pt-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="font-playful text-xs tracking-widest text-[#FAF6EE]/50 uppercase"
        >
          a quiet clearing under the stars
        </motion.div>
      </div>

      {/* Main Presentation Stage: Shy Character + Bouquet */}
      <div className="relative z-20 my-auto flex flex-col items-center max-w-sm w-full">
        
        {/* Exactly ONE written message in speech bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mb-6"
        >
          <div className="px-5 py-3 rounded-2xl bg-[#FAF5ED] text-[#2D2A32] shadow-xl border border-[#E5DECF] font-handwriting text-xl md:text-2xl text-center leading-snug">
            {accepted ? (
              <span className="text-[#8E3B46] font-medium">
                thank you for accepting... 🤍
              </span>
            ) : (
              <span>Will you accept this little bouquet, made with love? 🤍</span>
            )}
          </div>
          {/* Speech bubble tail pointing down to character */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#FAF5ED] rotate-45 border-r border-b border-[#E5DECF]" />
        </motion.div>

        {/* The Shy Hand-Drawn Character */}
        <div className="relative mb-2">
          <svg width="70" height="70" viewBox="0 0 80 80" fill="none">
            {/* Soft round body */}
            <circle cx="40" cy="45" r="28" fill="#FAF6EE" stroke="#D8C7B5" strokeWidth="2" />
            
            {/* Little ears or hair tufts */}
            <circle cx="26" cy="22" r="5" fill="#FAF6EE" stroke="#D8C7B5" strokeWidth="1.5" />
            <circle cx="54" cy="22" r="5" fill="#FAF6EE" stroke="#D8C7B5" strokeWidth="1.5" />

            {/* Eyes */}
            {accepted ? (
              <>
                {/* Happy curved eyes (^_^) */}
                <path d="M28 42 Q33 36 38 42" stroke="#332C39" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M42 42 Q47 36 52 42" stroke="#332C39" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                {/* Shy, timid big eyes looking up slightly */}
                <circle cx="32" cy="42" r="3.5" fill="#332C39" />
                <circle cx="33" cy="41" r="1.2" fill="#FFFFFF" />
                <circle cx="48" cy="42" r="3.5" fill="#332C39" />
                <circle cx="49" cy="41" r="1.2" fill="#FFFFFF" />
              </>
            )}

            {/* Deep blushing cheeks */}
            <ellipse
              cx="24"
              cy="48"
              rx="5"
              ry="3"
              fill="#F4A5AE"
              className={accepted ? "animate-pulse" : "opacity-80"}
            />
            <ellipse
              cx="56"
              cy="48"
              rx="5"
              ry="3"
              fill="#F4A5AE"
              className={accepted ? "animate-pulse" : "opacity-80"}
            />

            {/* Shy mouth */}
            {accepted ? (
              <path d="M36 52 Q40 56 44 52" stroke="#332C39" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            ) : (
              <ellipse cx="40" cy="51" rx="1.5" ry="1.2" fill="#332C39" />
            )}
          </svg>
        </div>

        {/* The Lily + Jasmine Bouquet (Interactive Element) */}
        <motion.div
          onClick={handleAcceptBouquet}
          animate={
            accepted
              ? { scale: [1, 1.2, 1.15], y: -20 }
              : { rotate: [-2, 2, -2], y: [0, -6, 0] }
          }
          transition={
            accepted
              ? { duration: 0.8, ease: 'easeOut' }
              : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative cursor-pointer group mt-2"
          title={!accepted ? "Tap the bouquet to accept" : "Bouquet accepted"}
        >
          {/* Gentle ambient halo */}
          <div className="absolute -inset-4 bg-[#FAF6EE]/20 rounded-full blur-xl group-hover:bg-[#E8C5C8]/30 transition-colors" />

          {/* Handcrafted Illustrated Lilies + Jasmine + Lush Red Roses Bouquet */}
          <div className="relative w-60 h-68 md:w-68 md:h-76 drop-shadow-2xl">
            <svg viewBox="0 0 200 240" className="w-full h-full">
              <defs>
                {/* Full Blooming Red Rose */}
                <g id="full-rose">
                  {/* Calyx leaves */}
                  <path d="M-10 6 Q-15 12 -5 12" stroke="#2E5A3C" strokeWidth="1.5" fill="none" />
                  <path d="M10 6 Q15 12 5 12" stroke="#2E5A3C" strokeWidth="1.5" fill="none" />
                  {/* Outer Crimson Petals */}
                  <ellipse cx="0" cy="0" rx="14" ry="12" fill="#7F1D1D" />
                  <path d="M-13 -3 C-15 -11 0 -15 13 -5 C17 3 9 13 -2 13 C-11 13 -15 5 -13 -3 Z" fill="#991B1B" stroke="#BE123C" strokeWidth="0.8" />
                  <path d="M-9 -6 C-7 -12 7 -12 9 -6 C11 1 7 7 0 7 C-7 7 -11 1 -9 -6 Z" fill="#BE123C" stroke="#E11D48" strokeWidth="0.8" />
                  {/* Inner Velvet Rose Swirl */}
                  <path d="M-5 -3 Q0 -9 5 -4 Q7 1 1 4 Q-4 4 -5 -1" fill="#E11D48" stroke="#FDA4AF" strokeWidth="0.7" />
                  <circle cx="0" cy="-2" r="1.8" fill="#FFE4E6" />
                </g>

                {/* Medium Blooming Red Rose */}
                <g id="med-rose">
                  <ellipse cx="0" cy="0" rx="11" ry="9.5" fill="#7F1D1D" />
                  <path d="M-10 -2 C-12 -8 0 -12 10 -3 C14 3 6 10 -2 10 C-8 10 -12 4 -10 -2 Z" fill="#991B1B" stroke="#BE123C" strokeWidth="0.7" />
                  <path d="M-7 -4 C-5 -9 5 -9 7 -4 C8 1 5 5 0 5 C-5 5 -8 1 -7 -4 Z" fill="#BE123C" stroke="#E11D48" strokeWidth="0.6" />
                  <path d="M-3 -2 Q0 -6 3 -3 Q4 0 1 2 Q-2 2 -3 0" fill="#E11D48" stroke="#FDA4AF" strokeWidth="0.6" />
                  <circle cx="0" cy="-1.5" r="1.3" fill="#FDA4AF" />
                </g>

                {/* Sweet Rosebud with Green Sepals */}
                <g id="rose-bud">
                  <path d="M-5 6 Q-9 12 -2 12" stroke="#2E5A3C" strokeWidth="1.4" fill="none" />
                  <path d="M5 6 Q9 12 2 12" stroke="#2E5A3C" strokeWidth="1.4" fill="none" />
                  <path d="M0 5 L0 13" stroke="#2E5A3C" strokeWidth="1.6" />
                  <ellipse cx="0" cy="0" rx="7" ry="9" fill="#991B1B" />
                  <path d="M-5 2 C-6 -4 0 -8 5 -3 C7 2 3 7 -1 7 Z" fill="#BE123C" stroke="#E11D48" strokeWidth="0.6" />
                  <path d="M-2 -2 Q0 -5 3 -2 Q2 2 -1 2 Z" fill="#E11D48" stroke="#FDA4AF" strokeWidth="0.5" />
                </g>
              </defs>

              {/* Wrapping kraft paper cone */}
              <polygon
                points="100,230 40,110 160,110"
                fill="#D8B589"
                stroke="#B89367"
                strokeWidth="2"
              />
              <polygon
                points="100,230 60,110 140,110"
                fill="#E2C59D"
              />

              {/* Silk ribbon bow */}
              <circle cx="100" cy="180" r="5" fill="#FAF6EE" />
              <path d="M100 180 Q80 160 85 185 Q95 185 100 180" fill="#FAF6EE" stroke="#D8C7B5" strokeWidth="1" />
              <path d="M100 180 Q120 160 115 185 Q105 185 100 180" fill="#FAF6EE" stroke="#D8C7B5" strokeWidth="1" />
              <path d="M96 182 Q88 215 82 225" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M104 182 Q112 215 118 225" stroke="#FAF6EE" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Stems & Leaves */}
              <path d="M85 110 Q70 80 50 65" stroke="#3A6346" strokeWidth="3" strokeLinecap="round" />
              <path d="M115 110 Q130 80 150 65" stroke="#3A6346" strokeWidth="3" strokeLinecap="round" />
              <path d="M100 110 L100 45" stroke="#3A6346" strokeWidth="3" strokeLinecap="round" />
              <path d="M70 100 Q45 85 35 75" stroke="#2E5A3C" strokeWidth="2" strokeLinecap="round" />
              <path d="M130 100 Q155 85 165 75" stroke="#2E5A3C" strokeWidth="2" strokeLinecap="round" />

              {/* === BACKGROUND LAYER OF RED ROSES === */}
              <use href="#med-rose" x="62" y="42" transform="rotate(-10 62 42)" />
              <use href="#full-rose" x="100" y="34" />
              <use href="#med-rose" x="138" y="42" transform="rotate(10 138 42)" />
              <use href="#rose-bud" x="38" y="62" transform="rotate(-25 38 62)" />
              <use href="#rose-bud" x="162" y="62" transform="rotate(25 162 62)" />

              {/* Jasmine sprigs (interspersed delicate fragrant stars) */}
              {[
                { x: 50, y: 55 },
                { x: 82, y: 44 },
                { x: 118, y: 44 },
                { x: 150, y: 55 },
                { x: 30, y: 78 },
                { x: 170, y: 78 },
                { x: 92, y: 24 },
                { x: 108, y: 24 },
              ].map((j, i) => (
                <g key={i} transform={`translate(${j.x}, ${j.y})`}>
                  {[0, 72, 144, 216, 288].map((rot, k) => (
                    <ellipse
                      key={k}
                      cx="0"
                      cy="-5"
                      rx="2"
                      ry="4"
                      fill="#FFFFFF"
                      stroke="#FAF6EE"
                      strokeWidth="0.5"
                      transform={`rotate(${rot})`}
                    />
                  ))}
                  <circle cx="0" cy="0" r="1.5" fill="#FDE68A" />
                </g>
              ))}

              {/* === MID LAYER OF ABUNDANT RED ROSES === */}
              <use href="#full-rose" x="80" y="55" transform="rotate(-6 80 55)" />
              <use href="#full-rose" x="120" y="55" transform="rotate(6 120 55)" />
              <use href="#med-rose" x="46" y="74" transform="rotate(-15 46 74)" />
              <use href="#med-rose" x="154" y="74" transform="rotate(15 154 74)" />

              {/* Large Elegant White Lilies nestled among the roses */}
              {/* Lily 1 (Center Left) */}
              <g transform="translate(76, 85)">
                {[0, 60, 120, 180, 240, 300].map((deg, idx) => (
                  <path
                    key={idx}
                    d="M0 0 Q-6 -20 0 -32 Q6 -20 0 0"
                    fill="#FAF6EE"
                    stroke="#E2D9CC"
                    strokeWidth="1"
                    transform={`rotate(${deg})`}
                  />
                ))}
                <line x1="0" y1="0" x2="-3" y2="-10" stroke="#D4A373" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="0" y1="0" x2="3" y2="-10" stroke="#D4A373" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="-3" cy="-11" r="1.3" fill="#D97706" />
                <circle cx="3" cy="-11" r="1.3" fill="#D97706" />
              </g>

              {/* Lily 2 (Center Right) */}
              <g transform="translate(124, 85)">
                {[0, 60, 120, 180, 240, 300].map((deg, idx) => (
                  <path
                    key={idx}
                    d="M0 0 Q-6 -20 0 -32 Q6 -20 0 0"
                    fill="#FFFFFF"
                    stroke="#E2D9CC"
                    strokeWidth="1"
                    transform={`rotate(${deg})`}
                  />
                ))}
                <circle cx="0" cy="-10" r="1.3" fill="#D97706" />
              </g>

              {/* === FOREGROUND & FRONT DENSE RED ROSES === */}
              {/* Center Heart Rose */}
              <use href="#full-rose" x="100" y="76" />
              {/* Flanking Roses */}
              <use href="#full-rose" x="52" y="96" transform="rotate(-8 52 96)" />
              <use href="#full-rose" x="148" y="96" transform="rotate(8 148 96)" />
              {/* Front Center Rose */}
              <use href="#full-rose" x="100" y="98" />
              {/* Sweet Side Rosebuds along the wrapper brim */}
              <use href="#rose-bud" x="32" y="92" transform="rotate(-30 32 92)" />
              <use href="#rose-bud" x="168" y="92" transform="rotate(30 168 92)" />
              <use href="#med-rose" x="76" y="112" transform="rotate(-4 76 112)" />
              <use href="#med-rose" x="124" y="112" transform="rotate(4 124 112)" />
            </svg>
          </div>

          {/* Tap hint below bouquet */}
          {!accepted && (
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-3 text-center"
            >
              <span className="font-playful text-xs text-[#FAF6EE]/80 bg-[#1E1A26]/80 px-3 py-1 rounded-full border border-white/10 shadow-xs">
                tap the bouquet to take it ♡
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom prompt if accepted */}
      <div className="relative z-20 w-full flex flex-col items-center pb-6">
        {accepted && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onComplete}
            className="font-handwriting text-lg text-[#FAF6EE]/80 hover:text-white transition-colors text-center cursor-pointer flex items-center gap-1 group"
          >
            <span>carrying you gently forward...</span>
            <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        )}
      </div>

      {/* Petal Curtain Transition Overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#1A1622] flex items-center justify-center pointer-events-none"
          >
            {/* Swirling flower petals in transit */}
            <div className="relative w-full h-full overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                    y: -50,
                    rotate: 0,
                    scale: 0.8 + Math.random() * 0.6,
                  }}
                  animate={{
                    y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                    rotate: 360 * (i % 2 === 0 ? 1 : -1),
                    x: `+=${(Math.random() - 0.5) * 200}`,
                  }}
                  transition={{ duration: 1.6 + Math.random() * 0.6, ease: 'easeIn' }}
                  className="absolute text-xl"
                >
                  {i % 3 === 0 ? '🌹' : i % 3 === 1 ? '🤍' : '🌸'}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
