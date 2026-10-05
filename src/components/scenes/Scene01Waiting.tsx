import React, { useState } from 'react';
import { motion } from 'motion/react';
import { playPaperRustle, playStarSparkle } from '../../utils/soundEffects';
import { audioManager } from '../../utils/audioManager';

interface Scene01WaitingProps {
  onComplete: () => void;
}

export const Scene01Waiting: React.FC<Scene01WaitingProps> = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Start music on first interaction
    audioManager.startOnFirstInteraction();
    playPaperRustle();
    playStarSparkle();

    setTimeout(() => {
      onComplete();
    }, 1800);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#110F17] dark-paper-texture overflow-hidden select-none">
      {/* Background soft stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: '15%', left: '20%', delay: 0 },
          { top: '22%', right: '25%', delay: 1 },
          { top: '38%', left: '12%', delay: 2 },
          { top: '65%', right: '18%', delay: 0.5 },
          { top: '78%', left: '30%', delay: 1.5 },
          { top: '82%', right: '35%', delay: 2.5 },
        ].map((star, i) => (
          <div
            key={i}
            style={{ top: star.top, left: star.left, right: star.right }}
            className="absolute text-[#FDE68A]/60 text-xs animate-pulse"
          >
            ✦
          </div>
        ))}
      </div>

      {/* Main content container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center max-w-sm"
      >
        {/* Whispered handwritten intro */}
        <div className="mb-6 space-y-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-handwriting text-2xl md:text-3xl text-[#E8C5C8] tracking-wide"
          >
            psst...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="font-handwriting text-lg md:text-xl text-[#FAF6EE]/80"
          >
            there’s something here for you.
          </motion.p>
        </div>

        {/* The interactive envelope / keepsake box */}
        <div className="relative my-4">
          <motion.div
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="cursor-pointer group"
          >
            {/* Soft glow behind */}
            <div className={`absolute -inset-4 bg-[#E8C5C8]/20 rounded-full blur-xl transition-opacity duration-700 ${isOpening ? 'opacity-100 scale-125' : 'opacity-40 group-hover:opacity-75'}`} />

            {/* Hand-drawn Illustrated Envelope */}
            <div className="relative w-44 h-32 md:w-52 md:h-36 bg-[#FAF5ED] rounded-xl shadow-2xl border border-[#E5DECF] flex items-center justify-center p-3 overflow-hidden">
              {/* Envelope flap folds */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 140" fill="none">
                <path d="M0 0 L100 80 L200 0" stroke="#D8C7B5" strokeWidth="1.5" fill="#F4ECE1" />
                <path d="M0 140 L85 65" stroke="#E5DECF" strokeWidth="1.2" />
                <path d="M200 140 L115 65" stroke="#E5DECF" strokeWidth="1.2" />
              </svg>

              {/* Wax seal heart stamp */}
              <motion.div
                animate={isOpening ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : { scale: [1, 1.06, 1] }}
                transition={isOpening ? { duration: 0.6 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-11 h-11 rounded-full bg-[#8E3B46] shadow-md border border-[#A84B57] flex items-center justify-center text-white"
              >
                <span className="text-sm font-handwriting select-none">♡</span>
              </motion.div>

              {/* Floating petals & stars on open */}
              {isOpening && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  className="absolute inset-0 flex items-center justify-center text-[#E8C5C8] pointer-events-none"
                >
                  <span className="text-2xl animate-spin">✦</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Little hand-drawn arrow pointing to it */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: [0, -4, 0] }}
            transition={{ delay: 1.8, repeat: Infinity, duration: 1.8 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none text-[#FAF6EE]/60"
          >
            <span className="font-playful text-xs tracking-wider">tap to open</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Screen opening flash overlay */}
      {isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[#1A1622] pointer-events-none z-40"
        />
      )}
    </div>
  );
};
