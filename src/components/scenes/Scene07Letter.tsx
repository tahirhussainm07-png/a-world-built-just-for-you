import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playPaperRustle, playStarSparkle } from '../../utils/soundEffects';
import { useCustomization } from '../../context/CustomizationContext';

interface Scene07LetterProps {
  onComplete: () => void;
}

export const Scene07Letter: React.FC<Scene07LetterProps> = ({ onComplete }) => {
  const { config } = useCustomization();
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState<number>(1);

  const handleOpenEnvelope = () => {
    if (envelopeOpened) return;
    playPaperRustle();
    playStarSparkle();
    setEnvelopeOpened(true);
  };

  const handleRevealNext = () => {
    if (revealedParagraphs < config.letter.paragraphs.length) {
      playPaperRustle();
      setRevealedParagraphs((prev) => prev + 1);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 bg-[#161210] dark-paper-texture overflow-y-auto select-none">
      
      {/* Warm Desk Lamp Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-[#F59E0B]/15 blur-3xl pointer-events-none" />

      {/* Header subtle indicator */}
      <div className="relative z-10 w-full pt-6 text-center">
        <span className="font-playful text-xs tracking-widest text-[#A89F91] uppercase">
          a letter on the desk
        </span>
      </div>

      {/* Main Wooden Desk Surface & Keepsake Object */}
      <div className="relative z-20 my-auto w-full max-w-lg flex flex-col items-center py-6">
        {!envelopeOpened ? (
          /* Sealed Envelope on the Desk */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div
              onClick={handleOpenEnvelope}
              className="relative w-64 h-44 md:w-80 md:h-52 bg-[#FAF5ED] rounded-xl shadow-2xl border border-[#D8C7B5] cursor-pointer group flex items-center justify-center p-4 transition-transform duration-300 hover:scale-102"
              title="Tap to break the wax seal and open the letter"
            >
              {/* Envelope flap diagonal folds */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" fill="none">
                <path d="M0 0 L150 110 L300 0" stroke="#D8C7B5" strokeWidth="1.5" fill="#F4ECE1" />
                <path d="M0 200 L120 95" stroke="#E5DECF" strokeWidth="1.2" />
                <path d="M300 200 L180 95" stroke="#E5DECF" strokeWidth="1.2" />
              </svg>

              {/* Tiny dried flower tucked under envelope fold */}
              <div className="absolute top-2 right-4 -rotate-12 pointer-events-none text-xs text-[#A8C9B8]">
                🌿
              </div>

              {/* Little cat sticker on the corner */}
              <div className="absolute bottom-3 left-4 p-1 rounded-full bg-white shadow-xs border border-[#E5DECF] -rotate-6">
                <span className="text-xs">🐾</span>
              </div>

              {/* Red Wax Seal */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="relative z-10 w-14 h-14 rounded-full bg-[#8E3B46] shadow-lg border-2 border-[#A84B57] flex flex-col items-center justify-center text-white"
              >
                <span className="text-base font-handwriting">♡</span>
                <span className="text-[8px] font-sans tracking-widest uppercase opacity-80">open</span>
              </motion.div>
            </div>

            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="mt-4 text-center"
            >
              <span className="font-handwriting text-lg text-[#FAF6EE]/80">
                tap the seal to unfold the letter
              </span>
            </motion.div>
          </motion.div>
        ) : (
          /* Unfolded Letter Sheet */
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-full bg-[#FAF6EE] text-[#2B231D] p-6 md:p-8 rounded-lg shadow-2xl border border-[#D8C7B5] paper-texture"
          >
            {/* Washi tape topper */}
            <div className="absolute -top-3 left-8 w-20 h-5 bg-[#E8C5C8]/75 shadow-xs border-x border-white/40 -rotate-2" />
            <div className="absolute -top-3 right-8 w-20 h-5 bg-[#D4A373]/60 shadow-xs border-x border-white/40 rotate-1" />

            {/* Letter Greeting */}
            <div className="font-handwriting text-2xl md:text-3xl text-[#1E1A26] font-semibold mb-4 border-b border-[#E5DECF] pb-2">
              {config.letter.greeting}
            </div>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 font-handwriting text-lg md:text-xl text-[#3A322C] leading-relaxed">
              {config.letter.paragraphs.slice(0, revealedParagraphs).map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Tap to reveal more paragraphs if not all visible */}
            {revealedParagraphs < config.letter.paragraphs.length && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleRevealNext}
                  className="px-4 py-1.5 rounded-full bg-[#E5DECF] text-[#2B231D] font-playful text-xs hover:bg-[#D8C7B5] cursor-pointer"
                >
                  read the next part... ↓
                </button>
              </div>
            )}

            {/* Closing & Signature */}
            {revealedParagraphs >= config.letter.paragraphs.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 pt-4 border-t border-[#E5DECF] space-y-2"
              >
                <div className="font-handwriting text-lg text-[#5C5248]">
                  {config.letter.closing}
                </div>
                <div className="font-handwriting text-2xl text-[#1E1A26] font-semibold">
                  {config.myName}
                </div>

                {config.letter.postscript && (
                  <div className="mt-4 font-handwriting text-base text-[#8C7D70] italic">
                    {config.letter.postscript}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom Step Forward Button */}
      <div className="relative z-20 w-full flex flex-col items-center pb-6">
        {envelopeOpened && revealedParagraphs >= config.letter.paragraphs.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-full bg-[#FAF5ED] text-[#1E1A26] font-handwriting text-xl tracking-wide shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
            >
              <span>go out to the quiet night sky</span>
              <span className="text-sm font-sans group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
