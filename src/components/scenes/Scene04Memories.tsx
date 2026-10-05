import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playPaperRustle } from '../../utils/soundEffects';
import { MemoryItem } from '../../types';
import { useCustomization } from '../../context/CustomizationContext';
import { WigglingStar, SecretSticker } from '../EasterEggs';

interface Scene04MemoriesProps {
  onComplete: () => void;
}

export const Scene04Memories: React.FC<Scene04MemoriesProps> = ({ onComplete }) => {
  const { config } = useCustomization();
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  const handleOpenMemory = (mem: MemoryItem) => {
    playPaperRustle();
    setSelectedMemory(mem);
  };

  const handleCloseMemory = () => {
    playPaperRustle();
    setSelectedMemory(null);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 bg-[#14111B] dark-paper-texture overflow-hidden select-none">
      
      {/* Fairy Lights wire at top */}
      <div className="relative z-10 w-full pt-4 max-w-xl mx-auto">
        {/* Sagging wire line */}
        <div className="relative w-full h-8">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 30">
            <path d="M0,5 Q200,25 400,5" fill="none" stroke="#685E75" strokeWidth="1.2" />
          </svg>
          {/* Fairy light bulbs on wire */}
          {[40, 120, 200, 280, 360].map((left, idx) => (
            <div
              key={idx}
              style={{ left: `${(left / 400) * 100}%` }}
              className="absolute top-2 -translate-x-1/2 flex flex-col items-center"
            >
              <div className="w-0.5 h-1.5 bg-[#4B4453]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FDE68A] shadow-[0_0_8px_#FDE68A] animate-pulse" />
            </div>
          ))}
        </div>

        {/* Section title */}
        <div className="text-center mt-2 space-y-1">
          <h2 className="font-display text-2xl md:text-3xl text-[#FAF6EE] font-light tracking-wide">
            Little Keepsakes
          </h2>
          <p className="font-handwriting text-lg text-[#E8C5C8]">
            memories i keep tucked inside my pocket
          </p>
        </div>
      </div>

      {/* Hanging Polaroid Gallery */}
      <div className="relative z-10 my-auto py-6 max-w-3xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-start justify-center">
          {config.memories.map((mem, index) => (
            <div key={mem.id} className="relative flex flex-col items-center group">
              {/* Wooden clothespin clip holding photo */}
              <div className="relative z-20 -mb-2 flex flex-col items-center">
                <div className="w-2.5 h-6 bg-[#D4A373] rounded-sm shadow-sm border border-[#B08359]" />
                <div className="w-1.5 h-1 bg-[#4A3B32]" />
              </div>

              {/* Polaroid card */}
              <motion.div
                onClick={() => handleOpenMemory(mem)}
                whileHover={{ scale: 1.05, rotate: 0 }}
                whileTap={{ scale: 0.98 }}
                style={{ rotate: `${mem.rotation}deg` }}
                className="relative bg-[#FAF5ED] p-3 pb-5 rounded-sm shadow-lg border border-[#E5DECF] cursor-pointer transition-transform duration-300 w-full max-w-[170px]"
              >
                {/* Washi tape on one corner */}
                {index % 2 === 0 ? (
                  <div className="absolute -top-2 left-2 w-8 h-3.5 bg-[#E8C5C8]/60 -rotate-12 pointer-events-none border-x border-white/40 shadow-xs" />
                ) : (
                  <div className="absolute -top-2 right-2 w-8 h-3.5 bg-[#D4A373]/50 rotate-12 pointer-events-none border-x border-white/40 shadow-xs" />
                )}

                {/* Photo frame */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#2D2A32] rounded-xs shadow-inner">
                  <img
                    src={mem.imageUrl}
                    alt={mem.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/src/assets/images/birthday_memory_stroll_1791180713837.jpg';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle film grain overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Handwritten title under photo */}
                <div className="mt-2.5 text-center">
                  <span className="font-handwriting text-sm md:text-base text-[#2D2A32] block truncate">
                    {mem.title}
                  </span>
                  {mem.date && (
                    <span className="font-playful text-[10px] text-[#78716C] block mt-0.5">
                      {mem.date}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Scattered playful stickers in between */}
        <div className="flex justify-between items-center px-4 mt-6 mb-8 max-w-sm mx-auto relative z-30">
          <WigglingStar />
          <SecretSticker
            label="another secret ♡"
            secretMessage="i still remember the exact outfit you wore the day we first talked for hours."
          />
          <WigglingStar />
        </div>
      </div>

      {/* Expanded Modal View for a Selected Memory */}
      <AnimatePresence>
        {selectedMemory && (
          <div
            onClick={handleCloseMemory}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#FAF5ED] p-5 pb-7 rounded-md shadow-2xl border border-[#D8C7B5] cursor-default"
            >
              {/* Washi tape topper */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#E8C5C8]/80 shadow-sm border-x border-white/50 -rotate-1" />

              {/* Large Image */}
              <div className="aspect-4/3 w-full overflow-hidden rounded bg-[#1C1924] shadow-inner mb-4">
                <img
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/src/assets/images/birthday_memory_stroll_1791180713837.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Memory details */}
              <div className="space-y-2 text-center px-2">
                <h3 className="font-display text-xl text-[#2D2A32] font-medium">
                  {selectedMemory.title}
                </h3>
                {selectedMemory.date && (
                  <p className="font-playful text-xs text-[#78716C]">
                    {selectedMemory.date}
                  </p>
                )}
                <div className="pt-2 border-t border-[#E5DECF]">
                  <p className="font-handwriting text-lg text-[#3E3846] leading-relaxed">
                    "{selectedMemory.caption}"
                  </p>
                </div>
              </div>

              {/* Tap to close hint */}
              <button
                onClick={handleCloseMemory}
                className="mt-5 w-full py-1 text-center font-playful text-xs text-[#8C827A] hover:text-[#2D2A32] cursor-pointer"
              >
                (tap anywhere to put it back)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Step Forward Button - Placed comfortably below with generous spacing */}
      <div className="relative z-10 w-full flex flex-col items-center pt-8 pb-10 mt-12 md:mt-16">
        <button
          onClick={onComplete}
          className="px-6 py-2.5 rounded-full bg-[#FAF5ED] text-[#1E1A26] font-handwriting text-xl tracking-wide shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
        >
          <span>wander into the secret garden</span>
          <span className="text-sm font-sans group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};
