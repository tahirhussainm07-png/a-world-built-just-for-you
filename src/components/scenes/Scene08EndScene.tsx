import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playStarSparkle } from '../../utils/soundEffects';
import { SleepingCat } from '../EasterEggs';
import { useCustomization } from '../../context/CustomizationContext';

interface Scene08EndSceneProps {
  onRestart: () => void;
}

export const Scene08EndScene: React.FC<Scene08EndSceneProps> = ({ onRestart }) => {
  const { config } = useCustomization();
  const [paperStarTapped, setPaperStarTapped] = useState(false);
  const [extraStars, setExtraStars] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleTapPaperStar = () => {
    if (paperStarTapped) return;
    playStarSparkle();
    setPaperStarTapped(true);

    // Spawn constellation of delicate glowing stars in the night sky
    const newStars = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 45,
    }));
    setExtraStars(newStars);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 bg-[#0B0912] dark-paper-texture overflow-hidden select-none">
      
      {/* Soft Moon and Sky Atmosphere */}
      <div className="absolute top-8 right-12 w-14 h-14 rounded-full bg-[#FAF6EE] shadow-[0_0_28px_rgba(250,246,238,0.45)]">
        <div className="absolute -top-1 -right-1 w-13 h-13 rounded-full bg-[#0B0912]" />
      </div>

      {/* Gentle Distant City Lights on Rooftop Horizon */}
      <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none opacity-25">
        <div className="w-full h-full bg-gradient-to-t from-[#251D33] to-transparent" />
        <div className="absolute bottom-8 inset-x-0 flex justify-around">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-[#FDE68A] rounded-full animate-pulse"
              style={{ animationDelay: `${(i % 5) * 0.4}s` }}
            />
          ))}
        </div>
      </div>

      {/* Twinkling Permanent Sky Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { t: '15%', l: '18%' },
          { t: '22%', l: '45%' },
          { t: '12%', l: '70%' },
          { t: '32%', l: '25%' },
          { t: '28%', l: '85%' },
          { t: '40%', l: '60%' },
        ].map((s, idx) => (
          <span
            key={idx}
            style={{ top: s.t, left: s.l }}
            className="absolute text-[#FDE68A] text-xs opacity-70 animate-pulse"
          >
            ✦
          </span>
        ))}

        {/* Extra shooting stars constellation released when paper star is tapped */}
        {extraStars.map((st) => (
          <motion.div
            key={st.id}
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.8 + Math.random() * 0.5, ease: 'easeOut' }}
            style={{ top: `${st.y}%`, left: `${st.x}%` }}
            className="absolute text-[#FDE68A] text-sm animate-pulse"
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Fairy Lights wire at top */}
      <div className="relative z-10 w-full pt-2 flex justify-center">
        <div className="flex gap-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px h-2 bg-[#4A4254]" />
              <div className="w-2 h-2 rounded-full bg-[#FAF6EE] shadow-[0_0_6px_#FAF6EE] opacity-80" />
            </div>
          ))}
        </div>
      </div>

      {/* Center Peaceful Note Content */}
      <div className="relative z-20 my-auto text-center max-w-md mx-auto px-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="space-y-4"
        >
          <p className="font-handwriting text-2xl md:text-3xl text-[#E8C5C8] font-light">
            {config.finalScene.line1}
          </p>

          <p className="font-handwriting text-xl md:text-2xl text-[#FAF6EE]/90 leading-relaxed font-light">
            "{config.finalScene.line2}"
          </p>

          <div className="pt-2">
            <h1 className="font-display text-3xl md:text-5xl text-[#FAF6EE] tracking-wide font-light">
              {config.finalScene.line3}
            </h1>
            <p className="font-handwriting text-xl text-[#D4A373] mt-2">
              with love, {config.myName}
            </p>
          </div>
        </motion.div>

        {/* The peaceful resting cat */}
        <div className="pt-4 flex justify-center">
          <SleepingCat />
        </div>
      </div>

      {/* Bottom Area: Final Childish Paper Star & Restart option */}
      <div className="relative z-20 w-full flex items-end justify-between max-w-lg mx-auto pb-4">
        {/* Replay journey link */}
        <button
          onClick={onRestart}
          className="font-playful text-xs text-[#FAF6EE]/40 hover:text-[#FAF6EE] transition-colors cursor-pointer"
        >
          ↺ wander through again
        </button>

        {/* The Last Little Childish Paper Star in the corner */}
        <div className="relative flex flex-col items-center">
          <AnimatePresence>
            {!paperStarTapped ? (
              <motion.div
                onClick={handleTapPaperStar}
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer group flex flex-col items-center select-none"
                title="A folded paper star... tap me"
              >
                {/* Handwritten label */}
                <span className="font-handwriting text-sm text-[#FDE68A] group-hover:scale-105 transition-transform">
                  tap me ✦
                </span>
                
                {/* Folded paper star graphic */}
                <div className="w-8 h-8 flex items-center justify-center text-[#FDE68A] drop-shadow-md">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M12 2L14.5 8.5L21.5 9.2L16.2 14L17.8 21L12 17.3L6.2 21L7.8 14L2.5 9.2L9.5 8.5L12 2Z" />
                  </svg>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-handwriting text-xs text-[#E8C5C8]"
              >
                forever in the sky ♡
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
