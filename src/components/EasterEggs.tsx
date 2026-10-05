import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playCatPurr, playStarSparkle, playPaperRustle } from '../utils/soundEffects';

// Sleeping/waking cat easter egg
export const SleepingCat: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isAwake, setIsAwake] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const handleTap = () => {
    playCatPurr();
    setIsAwake(true);
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 1800);
    setTimeout(() => {
      setIsAwake(false);
    }, 3200);
  };

  return (
    <div
      onClick={handleTap}
      className={`relative cursor-pointer select-none group inline-block ${className}`}
      title="A little sleeping cat... tap gently"
    >
      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-handwriting text-[#E8C5C8] pointer-events-none"
          >
            purr... ♡
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={isAwake ? { y: [-2, 0, -1, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <svg width="44" height="32" viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          {/* Cat body */}
          <path
            d="M8 28C8 18 18 12 32 12C44 12 48 18 48 28C48 34 42 36 30 36C18 36 8 34 8 28Z"
            fill="#FAF6EE"
            stroke="#D3C7B5"
            strokeWidth="1.5"
          />
          {/* Fluffy tail */}
          <motion.path
            d="M44 26C50 25 54 22 52 17C50 14 46 16 46 19"
            stroke="#D3C7B5"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={isAwake ? { rotate: [0, 8, -6, 0] } : { rotate: [0, 2, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ originX: '44px', originY: '26px' }}
          />
          {/* Cat head */}
          <circle cx="16" cy="18" r="10" fill="#FAF6EE" stroke="#D3C7B5" strokeWidth="1.5" />
          {/* Ears */}
          <polygon points="10,12 13,4 17,10" fill="#FAF6EE" stroke="#D3C7B5" strokeWidth="1.2" />
          <polygon points="11,10 13,6 15,9" fill="#E8C5C8" />
          <polygon points="17,10 21,4 24,12" fill="#FAF6EE" stroke="#D3C7B5" strokeWidth="1.2" />
          <polygon points="18,9 20,6 22,10" fill="#E8C5C8" />
          {/* Sleeping or open eyes */}
          {isAwake ? (
            <>
              {/* Curious blinking eyes */}
              <ellipse cx="13" cy="18" rx="1.5" ry="2" fill="#4A4453" />
              <ellipse cx="19" cy="18" rx="1.5" ry="2" fill="#4A4453" />
              <circle cx="13.5" cy="17.5" r="0.5" fill="#FFFFFF" />
              <circle cx="19.5" cy="17.5" r="0.5" fill="#FFFFFF" />
              {/* Pink blush */}
              <circle cx="10" cy="20" r="1.5" fill="#E8C5C8" opacity="0.8" />
              <circle cx="22" cy="20" r="1.5" fill="#E8C5C8" opacity="0.8" />
            </>
          ) : (
            <>
              {/* Soft sleeping curved lines */}
              <path d="M11 18C12 20 14 20 15 18" stroke="#78716C" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M17 18C18 20 20 20 21 18" stroke="#78716C" strokeWidth="1.2" strokeLinecap="round" />
              {/* Soft zzz indicator */}
              <text x="32" y="10" fill="#A8A29E" fontSize="9" className="font-handwriting animate-pulse">zzz</text>
            </>
          )}
          {/* Tiny nose */}
          <polygon points="15.5,21 16.5,21 16,22" fill="#E8C5C8" />
        </svg>
      </motion.div>
    </div>
  );
};

// Tiny twinkling star easter egg
export const WigglingStar: React.FC<{ x?: string; y?: string; className?: string }> = ({ className = '' }) => {
  const [sparkling, setSparkling] = useState(false);

  const handleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    playStarSparkle();
    setSparkling(true);
    setTimeout(() => setSparkling(false), 1200);
  };

  return (
    <motion.button
      onClick={handleTap}
      whileHover={{ scale: 1.3, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      animate={sparkling ? { rotate: [0, 45, -45, 0], scale: [1, 1.4, 1] } : {}}
      className={`inline-flex items-center justify-center p-1 text-[#FDE68A] hover:text-[#FEF08A] transition-colors cursor-pointer ${className}`}
      title="A little star... tap to make it sparkle"
      aria-label="Interactive twinkling star"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.4 8.6L21.5 9.2L16.2 13.9L17.8 21L12 17.3L6.2 21L7.8 13.9L2.5 9.2L9.6 8.6L12 2Z" />
      </svg>
      {sparkling && (
        <span className="absolute -top-3 text-[10px] font-handwriting text-[#FAF6EE] pointer-events-none animate-ping">
          ✦
        </span>
      )}
    </motion.button>
  );
};

// Peelable Washi Tape Sticker with handwritten secret note
export const SecretSticker: React.FC<{ label?: string; secretMessage: string; className?: string }> = ({
  label = "do not peel ♡",
  secretMessage,
  className = '',
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPaperRustle();
    setIsRevealed(!isRevealed);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        onClick={handleTap}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer select-none"
      >
        <div className="relative px-3 py-1.5 rounded-sm bg-[#FAF5ED] text-[#2D2A32] shadow-md border border-[#E5DECF] rotate-1 font-playful text-xs tracking-wide">
          {/* Washi tape topper */}
          <div className="absolute -top-2 left-3 right-3 h-3 bg-[#E8C5C8]/70 border-x border-[#FAF6EE]/50 -rotate-2 pointer-events-none shadow-sm" />
          <span className="opacity-90">{label}</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            onClick={() => setIsRevealed(false)}
            className="absolute z-50 top-full mt-2 left-1/2 -translate-x-1/2 w-52 p-3 bg-[#FAF6EE] text-[#332C39] rounded-lg shadow-2xl border border-[#D8C7B5] font-handwriting text-base leading-tight text-center cursor-pointer"
          >
            <div className="text-[10px] text-[#A8A29E] font-sans uppercase tracking-wider mb-1">pssst...</div>
            {secretMessage}
            <div className="text-[9px] text-[#A8A29E] mt-2 font-sans italic">(tap to hide)</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Floating balloon easter egg
export const FloatingBalloon: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [popped, setPopped] = useState(false);
  const [floatingAway, setFloatingAway] = useState(false);

  const handleTap = () => {
    playStarSparkle();
    setFloatingAway(true);
    setTimeout(() => {
      setPopped(true);
      setTimeout(() => {
        setFloatingAway(false);
        setPopped(false);
      }, 5000);
    }, 1500);
  };

  if (popped) return null;

  return (
    <motion.div
      onClick={handleTap}
      animate={
        floatingAway
          ? { y: -240, x: [0, 15, -15, 30], opacity: [1, 1, 0.7, 0], scale: [1, 0.9, 0.7] }
          : { y: [0, -8, 0], rotate: [-2, 2, -2] }
      }
      transition={
        floatingAway
          ? { duration: 1.6, ease: "easeIn" }
          : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
      }
      className={`cursor-pointer inline-block ${className}`}
      title="A little balloon... tap to release it into the sky"
    >
      <svg width="28" height="42" viewBox="0 0 32 48" fill="none">
        <ellipse cx="16" cy="18" rx="14" ry="16" fill="#E8C5C8" />
        <ellipse cx="11" cy="13" rx="4" ry="7" fill="#FFFFFF" opacity="0.35" transform="rotate(-20 11 13)" />
        <polygon points="14,34 18,34 16,36" fill="#D4A373" />
        <path d="M16 36 Q14 42 17 46" stroke="#D3C7B5" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </svg>
    </motion.div>
  );
};

// Subtle baby doodle / nursery touch ("I remembered")
export const BabyDoodle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      onClick={() => setShowTooltip(!showTooltip)}
      className={`relative inline-block cursor-pointer select-none group ${className}`}
      title="A tiny pair of baby booties doodle"
    >
      <svg width="34" height="24" viewBox="0 0 40 28" fill="none">
        {/* Left bootie */}
        <path
          d="M8 8 C8 4 14 4 14 8 L14 14 C14 18 18 18 18 22 C18 25 6 25 6 22 L6 14 C6 10 8 10 8 8Z"
          fill="#FAF6EE"
          stroke="#D8C7B5"
          strokeWidth="1.2"
        />
        {/* Soft bow */}
        <circle cx="12" cy="13" r="1.5" fill="#E8C5C8" />
        {/* Right bootie */}
        <path
          d="M22 8 C22 4 28 4 28 8 L28 14 C28 18 32 18 32 22 C32 25 20 25 20 22 L20 14 C20 10 22 10 22 8Z"
          fill="#FAF6EE"
          stroke="#D8C7B5"
          strokeWidth="1.2"
        />
        <circle cx="26" cy="13" r="1.5" fill="#E8C5C8" />
      </svg>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            className="absolute z-20 bottom-full mb-1 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#FAF6EE] text-[#4A4453] text-[11px] font-handwriting rounded shadow whitespace-nowrap border border-[#E5DECF]"
          >
            for someone with the gentlest heart ♡
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
