import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playPaperRustle, playStarSparkle } from '../../utils/soundEffects';
import { GardenLetterItem } from '../../types';
import { useCustomization } from '../../context/CustomizationContext';
import { SleepingCat } from '../EasterEggs';

interface Scene05GardenLoreProps {
  onComplete: () => void;
}

export const Scene05GardenLore: React.FC<Scene05GardenLoreProps> = ({ onComplete }) => {
  const { config } = useCustomization();
  
  // Selected letter for close-up physical reading
  const [selectedLetter, setSelectedLetter] = useState<GardenLetterItem | null>(null);
  const [openedLetterIds, setOpenedLetterIds] = useState<Set<string>>(new Set());
  const [unfolded, setUnfolded] = useState(false);
  const [showIntroText, setShowIntroText] = useState(false);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);

  // Six letters from configuration
  const letters = config.gardenLetters && config.gardenLetters.length === 6
    ? config.gardenLetters
    : [
        {
          id: 'gl1',
          number: '01',
          locationLabel: 'beside a white lily',
          heading: '01 — You.',
          message: 'I like the way your presence can make an ordinary moment feel a little less ordinary.',
          endSignoff: '— just because.',
          detailType: 'lily' as const,
          rotation: -3.5,
        },
        {
          id: 'gl2',
          number: '02',
          locationLabel: 'under jasmine flowers',
          heading: '02 — That smile.',
          message: 'Somehow, your smile has a way of making everything around it feel a little lighter.',
          endSignoff: '✿',
          detailType: 'smile' as const,
          rotation: 2.2,
        },
        {
          id: 'gl3',
          number: '03',
          locationLabel: 'on the garden string',
          heading: '03 — The little things.',
          message: 'It’s the tiny things about you that stay in my mind the longest. The things you probably don\'t even notice.',
          endSignoff: '✦',
          detailType: 'stars' as const,
          rotation: -1.8,
        },
        {
          id: 'gl4',
          number: '04',
          locationLabel: 'resting on a stone',
          heading: '04 — Your heart.',
          message: 'I really admire the kindness you carry without making a big deal about it.',
          endSignoff: '🌿',
          detailType: 'jasmine' as const,
          rotation: 3.5,
        },
        {
          id: 'gl5',
          number: '05',
          locationLabel: 'against a flower pot',
          heading: '05 — The moments.',
          message: 'There are little moments with you that I wish I could put in a jar and keep forever.',
          endSignoff: '🎞️',
          detailType: 'film' as const,
          rotation: -2.5,
        },
        {
          id: 'gl6',
          number: '06',
          locationLabel: 'beneath the lantern',
          heading: '06 — One last thing.',
          message: 'Out of all the reasons I could write down, maybe the simplest one is this: you mean more to me than I usually know how to say.',
          endSignoff: 'That\'s all. For now. 🤍',
          detailType: 'heart' as const,
          rotation: 1.8,
        },
      ];

  // Reveal quiet intro text after garden settles
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntroText(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const allOpened = letters.every((l) => openedLetterIds.has(l.id));

  const handleOpenLetter = (letter: GardenLetterItem) => {
    playPaperRustle();
    setSelectedLetter(letter);
    setUnfolded(false);
    
    // Smooth physical unfolding sequence
    setTimeout(() => {
      setUnfolded(true);
      playStarSparkle();
    }, 450);

    setOpenedLetterIds((prev) => new Set(prev).add(letter.id));
  };

  const handleCloseLetter = () => {
    playPaperRustle();
    setUnfolded(false);
    setTimeout(() => {
      setSelectedLetter(null);
    }, 300);
  };

  const handleContinue = () => {
    setIsTransitioningOut(true);
    playStarSparkle();
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  // Render individual stationary detail icon/doodle
  const renderDetailMark = (detailType: string) => {
    switch (detailType) {
      case 'lily':
        return (
          <span className="text-[11px] text-[#A8C9B8]" title="pressed lily petal">
            🌱
          </span>
        );
      case 'smile':
        return (
          <span className="text-[11px] font-handwriting text-[#D4A373]">
            ☺
          </span>
        );
      case 'stars':
        return (
          <span className="text-[10px] text-[#FDE68A]">
            ✦
          </span>
        );
      case 'jasmine':
        return (
          <span className="text-[10px] text-[#FAF6EE]">
            ✿
          </span>
        );
      case 'film':
        return (
          <span className="text-[10px] text-[#8C7D70]">
            🎞
          </span>
        );
      case 'heart':
      default:
        return (
          <span className="text-[10px] text-[#E8C5C8]">
            ♡
          </span>
        );
    }
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col justify-between p-4 md:p-6 transition-all duration-1000 select-none overflow-hidden ${allOpened ? 'bg-[#101817]' : 'bg-[#0B1211]'} dark-paper-texture`}>
      
      {/* BACKGROUND ATMOSPHERE: Moonlit Garden, Subtle Mist, Fireflies */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <img
          src="/src/assets/images/birthday_garden_night_1791180757726.jpg"
          alt="Moonlit garden background"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
          className="w-full h-full object-cover filter blur-[3px]"
        />
        <div className="absolute inset-0 bg-[#0B1211]/80 mix-blend-multiply" />
      </div>

      {/* Floating Garden Mist */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#152321]/60 via-[#152321]/20 to-transparent pointer-events-none" />

      {/* Warm Drifting Fireflies */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { t: '18%', l: '12%', d: 4.2 },
          { t: '28%', r: '15%', d: 3.8 },
          { t: '48%', l: '22%', d: 4.6 },
          { t: '62%', r: '28%', d: 3.5 },
          { t: '75%', l: '40%', d: 4.8 },
          { t: '82%', r: '10%', d: 3.2 },
        ].map((f, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -14, 0],
              x: [0, (i % 2 === 0 ? 8 : -8), 0],
              opacity: [0.2, 0.85, 0.2],
            }}
            transition={{ duration: f.d, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top: f.t, left: f.l, right: f.r }}
            className="absolute w-2 h-2 rounded-full bg-[#FEF08A] shadow-[0_0_12px_#FEF08A]"
          />
        ))}
      </div>

      {/* Hanging Garden String Lights at Top */}
      <div className="relative z-10 w-full max-w-lg mx-auto pt-2">
        <div className="relative w-full h-6 flex justify-between items-center px-6">
          <div className="absolute inset-x-4 top-2 h-px bg-[#41534E]" />
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: allOpened ? [0.8, 1, 0.8] : [0.4, 0.75, 0.4] }}
              transition={{ duration: 2.2 + (i % 3) * 0.4, repeat: Infinity }}
              className="relative flex flex-col items-center"
            >
              <div className="w-px h-2 bg-[#2B3A36]" />
              <div
                className={`w-2 h-2 rounded-full shadow-sm transition-all duration-700 ${
                  allOpened
                    ? 'bg-[#FEF08A] shadow-[0_0_8px_#FEF08A]'
                    : 'bg-[#E8C5C8] shadow-[0_0_5px_#E8C5C8]'
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* INTRO: Subtle Handwritten Lines ("I left a few little things here for you...") */}
      <div className="relative z-10 w-full max-w-md mx-auto text-center pt-2 pb-1">
        <AnimatePresence>
          {showIntroText && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="space-y-0.5"
            >
              <p className="font-handwriting text-xl md:text-2xl text-[#FAF6EE]/90 tracking-wide">
                “I left a few little things here for you…”
              </p>
              <p className="font-playful text-xs text-[#A8C9B8] tracking-wider">
                Take your time.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* THE GARDEN WORLD: Six Physical Postcards/Letters Embedded in Environment */}
      <div className="relative z-10 my-auto w-full max-w-2xl mx-auto py-4 px-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 items-center justify-items-center">
          
          {/* LETTER 01: Beside a White Lily */}
          <div className="relative flex flex-col items-center group">
            {/* Illustrated White Lily beside letter */}
            <div className="absolute -top-6 -left-3 pointer-events-none">
              <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                <path d="M20 20 L20 38" stroke="#3A6346" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 28 Q10 26 12 20" stroke="#3A6346" strokeWidth="1.5" strokeLinecap="round" />
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <ellipse key={i} cx="20" cy="14" rx="3.5" ry="8" fill="#FFFFFF" stroke="#E2D9CC" strokeWidth="0.8" transform={`rotate(${deg} 20 14)`} />
                ))}
                <circle cx="20" cy="14" r="2.5" fill="#D97706" />
              </svg>
            </div>

            {/* Postcard Object */}
            <motion.div
              onClick={() => handleOpenLetter(letters[0])}
              whileHover={{ scale: 1.06, rotate: 0 }}
              whileTap={{ scale: 0.96 }}
              style={{ rotate: `${letters[0].rotation}deg` }}
              className={`relative w-28 h-20 md:w-32 md:h-22 bg-[#FAF5ED] rounded-xs shadow-md border cursor-pointer transition-all duration-300 p-2 flex flex-col justify-between ${
                openedLetterIds.has(letters[0].id)
                  ? 'border-[#A8C9B8] shadow-[0_0_12px_rgba(168,201,184,0.3)]'
                  : 'border-[#D8C7B5] hover:border-[#FAF6EE]'
              }`}
              title="Letter 01: beside a white lily"
            >
              {/* Pressed lily detail on corner */}
              <div className="flex justify-between items-start">
                <span className="font-handwriting text-sm text-[#4A4254] font-semibold">
                  01
                </span>
                <span className="text-[10px] text-[#3A6346]">🌱</span>
              </div>
              <div className="flex justify-between items-end border-t border-[#E5DECF] pt-1">
                <span className="font-playful text-[9px] text-[#8C7D70] truncate max-w-[65px]">
                  you
                </span>
                {openedLetterIds.has(letters[0].id) && (
                  <span className="text-[9px] text-[#A8C9B8]">✦</span>
                )}
              </div>
            </motion.div>
            <span className="font-playful text-[10px] text-[#A8A29E] mt-1.5 opacity-75">
              beside a lily
            </span>
          </div>

          {/* LETTER 02: Partially Tucked Beneath Jasmine Flowers */}
          <div className="relative flex flex-col items-center group">
            {/* Delicate Jasmine Flowers draping over */}
            <div className="absolute -top-4 -right-2 pointer-events-none z-10">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <path d="M10 8 Q24 16 30 26" stroke="#4A7A56" strokeWidth="1.5" strokeLinecap="round" />
                {[0, 72, 144, 216, 288].map((deg, i) => (
                  <ellipse key={i} cx="16" cy="14" rx="2" ry="4.5" fill="#FFFFFF" transform={`rotate(${deg} 16 14)`} />
                ))}
                <circle cx="16" cy="14" r="1.5" fill="#FDE68A" />
              </svg>
            </div>

            {/* Small Envelope Object */}
            <motion.div
              onClick={() => handleOpenLetter(letters[1])}
              whileHover={{ scale: 1.06, rotate: 0 }}
              whileTap={{ scale: 0.96 }}
              style={{ rotate: `${letters[1].rotation}deg` }}
              className={`relative w-28 h-20 md:w-32 md:h-22 bg-[#F4ECE1] rounded-xs shadow-md border cursor-pointer transition-all duration-300 p-2 flex flex-col justify-between ${
                openedLetterIds.has(letters[1].id)
                  ? 'border-[#A8C9B8] shadow-[0_0_12px_rgba(168,201,184,0.3)]'
                  : 'border-[#D8C7B5] hover:border-[#FAF6EE]'
              }`}
              title="Letter 02: under jasmine flowers"
            >
              {/* Envelope flap line illusion */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 70">
                <path d="M0 0 L50 35 L100 0" stroke="#D8C7B5" strokeWidth="1" fill="none" />
              </svg>
              <div className="flex justify-between items-start relative z-10">
                <span className="font-handwriting text-sm text-[#4A4254] font-semibold">
                  02
                </span>
                <span className="text-[10px] text-[#D4A373]">☺</span>
              </div>
              <div className="flex justify-between items-end border-t border-[#E5DECF] pt-1 relative z-10">
                <span className="font-playful text-[9px] text-[#8C7D70] truncate max-w-[65px]">
                  that smile
                </span>
                {openedLetterIds.has(letters[1].id) && (
                  <span className="text-[9px] text-[#A8C9B8]">✦</span>
                )}
              </div>
            </motion.div>
            <span className="font-playful text-[10px] text-[#A8A29E] mt-1.5 opacity-75">
              beneath jasmine
            </span>
          </div>

          {/* LETTER 03: Hanging from a Tiny Garden String */}
          <div className="relative flex flex-col items-center group">
            {/* Wooden clip & String */}
            <div className="relative z-10 -mb-2 flex flex-col items-center pointer-events-none">
              <div className="w-px h-4 bg-[#7A7165]" />
              <div className="w-2 h-4 bg-[#D4A373] rounded-xs shadow-xs border border-[#A87950]" />
            </div>

            {/* Postcard with star doodles */}
            <motion.div
              onClick={() => handleOpenLetter(letters[2])}
              whileHover={{ scale: 1.06, rotate: 0 }}
              whileTap={{ scale: 0.96 }}
              style={{ rotate: `${letters[2].rotation}deg` }}
              className={`relative w-28 h-20 md:w-32 md:h-22 bg-[#FAF5ED] rounded-xs shadow-md border cursor-pointer transition-all duration-300 p-2 flex flex-col justify-between ${
                openedLetterIds.has(letters[2].id)
                  ? 'border-[#A8C9B8] shadow-[0_0_12px_rgba(168,201,184,0.3)]'
                  : 'border-[#D8C7B5] hover:border-[#FAF6EE]'
              }`}
              title="Letter 03: hanging from garden string"
            >
              <div className="flex justify-between items-start">
                <span className="font-handwriting text-sm text-[#4A4254] font-semibold">
                  03
                </span>
                <span className="text-[9px] text-[#FDE68A]">✦</span>
              </div>
              <div className="flex justify-between items-end border-t border-[#E5DECF] pt-1">
                <span className="font-playful text-[9px] text-[#8C7D70] truncate max-w-[65px]">
                  little things
                </span>
                {openedLetterIds.has(letters[2].id) && (
                  <span className="text-[9px] text-[#A8C9B8]">✦</span>
                )}
              </div>
            </motion.div>
            <span className="font-playful text-[10px] text-[#A8A29E] mt-1.5 opacity-75">
              on the string
            </span>
          </div>

          {/* LETTER 04: Folded Letter Resting on a Smooth Stone */}
          <div className="relative flex flex-col items-center group">
            {/* Illustrated Garden Stone beneath letter */}
            <div className="absolute -bottom-2 inset-x-2 h-6 bg-[#384340] rounded-full shadow-inner pointer-events-none border border-[#2B3532]" />

            {/* Folded Paper Object */}
            <motion.div
              onClick={() => handleOpenLetter(letters[3])}
              whileHover={{ scale: 1.06, rotate: 0 }}
              whileTap={{ scale: 0.96 }}
              style={{ rotate: `${letters[3].rotation}deg` }}
              className={`relative z-10 w-28 h-20 md:w-32 md:h-22 bg-[#FAF6EE] rounded-xs shadow-md border cursor-pointer transition-all duration-300 p-2 flex flex-col justify-between ${
                openedLetterIds.has(letters[3].id)
                  ? 'border-[#A8C9B8] shadow-[0_0_12px_rgba(168,201,184,0.3)]'
                  : 'border-[#D8C7B5] hover:border-[#FAF6EE]'
              }`}
              title="Letter 04: resting on a stone"
            >
              <div className="flex justify-between items-start">
                <span className="font-handwriting text-sm text-[#4A4254] font-semibold">
                  04
                </span>
                <span className="text-[10px] text-[#4A7A56]">🌿</span>
              </div>
              <div className="flex justify-between items-end border-t border-[#E5DECF] pt-1">
                <span className="font-playful text-[9px] text-[#8C7D70] truncate max-w-[65px]">
                  your heart
                </span>
                {openedLetterIds.has(letters[3].id) && (
                  <span className="text-[9px] text-[#A8C9B8]">✦</span>
                )}
              </div>
            </motion.div>
            <span className="font-playful text-[10px] text-[#A8A29E] mt-2.5 opacity-75">
              resting on stone
            </span>
          </div>

          {/* LETTER 05: Leaning Against a Little Flower Pot */}
          <div className="relative flex flex-col items-center group">
            {/* Little Terracotta Flower Pot Illustration behind */}
            <div className="absolute -top-3 -right-2 pointer-events-none">
              <svg width="28" height="30" viewBox="0 0 32 34" fill="none">
                <polygon points="4,10 28,10 24,30 8,30" fill="#B36B4D" stroke="#87472D" strokeWidth="1.2" />
                <rect x="2" y="6" width="28" height="5" rx="1.5" fill="#C27A5C" stroke="#87472D" strokeWidth="1" />
                <path d="M16 6 Q12 0 8 4" stroke="#4A7A56" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 6 Q20 0 24 4" stroke="#4A7A56" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Postcard Object with film frame doodle */}
            <motion.div
              onClick={() => handleOpenLetter(letters[4])}
              whileHover={{ scale: 1.06, rotate: 0 }}
              whileTap={{ scale: 0.96 }}
              style={{ rotate: `${letters[4].rotation}deg` }}
              className={`relative z-10 w-28 h-20 md:w-32 md:h-22 bg-[#FAF5ED] rounded-xs shadow-md border cursor-pointer transition-all duration-300 p-2 flex flex-col justify-between ${
                openedLetterIds.has(letters[4].id)
                  ? 'border-[#A8C9B8] shadow-[0_0_12px_rgba(168,201,184,0.3)]'
                  : 'border-[#D8C7B5] hover:border-[#FAF6EE]'
              }`}
              title="Letter 05: against a flower pot"
            >
              <div className="flex justify-between items-start">
                <span className="font-handwriting text-sm text-[#4A4254] font-semibold">
                  05
                </span>
                <span className="text-[10px] text-[#6B5E52]">🎞️</span>
              </div>
              <div className="flex justify-between items-end border-t border-[#E5DECF] pt-1">
                <span className="font-playful text-[9px] text-[#8C7D70] truncate max-w-[65px]">
                  the moments
                </span>
                {openedLetterIds.has(letters[4].id) && (
                  <span className="text-[9px] text-[#A8C9B8]">✦</span>
                )}
              </div>
            </motion.div>
            <span className="font-playful text-[10px] text-[#A8A29E] mt-1.5 opacity-75">
              by flower pot
            </span>
          </div>

          {/* LETTER 06: Underneath a Glowing Garden Lantern */}
          <div className="relative flex flex-col items-center group">
            {/* Hanging Garden Lantern with Warm Glow */}
            <div className="absolute -top-7 pointer-events-none flex flex-col items-center">
              <svg width="28" height="34" viewBox="0 0 32 38" fill="none">
                <path d="M16 0 L16 8" stroke="#8A7A64" strokeWidth="1.2" />
                <rect x="8" y="10" width="16" height="20" rx="2" fill="#241E15" stroke="#D4A373" strokeWidth="1.2" />
                <circle cx="16" cy="20" r="5" fill="#F59E0B" className="animate-pulse" />
                <circle cx="16" cy="20" r="2" fill="#FEF08A" />
              </svg>
            </div>

            {/* Envelope with tiny heart */}
            <motion.div
              onClick={() => handleOpenLetter(letters[5])}
              whileHover={{ scale: 1.06, rotate: 0 }}
              whileTap={{ scale: 0.96 }}
              style={{ rotate: `${letters[5].rotation}deg` }}
              className={`relative z-10 w-28 h-20 md:w-32 md:h-22 bg-[#FAF5ED] rounded-xs shadow-md border cursor-pointer transition-all duration-300 p-2 flex flex-col justify-between ${
                openedLetterIds.has(letters[5].id)
                  ? 'border-[#E8C5C8] shadow-[0_0_12px_rgba(232,197,200,0.4)]'
                  : 'border-[#D8C7B5] hover:border-[#FAF6EE]'
              }`}
              title="Letter 06: beneath the lantern"
            >
              <div className="flex justify-between items-start">
                <span className="font-handwriting text-sm text-[#4A4254] font-semibold">
                  06
                </span>
                <span className="text-[10px] text-[#8E3B46]">♡</span>
              </div>
              <div className="flex justify-between items-end border-t border-[#E5DECF] pt-1">
                <span className="font-playful text-[9px] text-[#8C7D70] truncate max-w-[65px]">
                  last thing
                </span>
                {openedLetterIds.has(letters[5].id) && (
                  <span className="text-[9px] text-[#E8C5C8]">✦</span>
                )}
              </div>
            </motion.div>
            <span className="font-playful text-[10px] text-[#A8A29E] mt-1.5 opacity-75">
              beneath lantern
            </span>
          </div>

        </div>

        {/* Quiet Childish Discovery: Sleeping Cat Resting Near Bush */}
        <div className="mt-6 flex justify-center items-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#152321]/60 border border-white/5">
            <SleepingCat />
            <span className="font-playful text-[10px] text-[#A8C9B8]">
              sleeping among the jasmine
            </span>
          </div>
        </div>
      </div>

      {/* TACTILE PHYSICAL LETTER MODAL: Envelope lifts, unfolds, inner letter appears */}
      <AnimatePresence>
        {selectedLetter && (
          <div
            onClick={handleCloseLetter}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs cursor-pointer select-none"
          >
            {/* Postcard Container (Lifts toward center) */}
            <motion.div
              initial={{ scale: 0.65, y: 40, opacity: 0, rotate: selectedLetter.rotation }}
              animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.65, y: 30, opacity: 0, rotate: selectedLetter.rotation }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#FAF6EE] text-[#2B221E] p-6 rounded-lg shadow-2xl border border-[#D8C7B5] paper-texture cursor-default"
            >
              {/* Washi tape on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#E8C5C8]/75 shadow-xs border-x border-white/50 -rotate-1 pointer-events-none" />

              {/* Tiny postage stamp in corner */}
              <div className="absolute top-4 right-4 w-9 h-11 border border-dashed border-[#B8A89A] p-1 flex flex-col items-center justify-center bg-[#F4ECE1] rounded-xs shadow-xs">
                {renderDetailMark(selectedLetter.detailType)}
                <span className="text-[7px] font-sans uppercase tracking-widest text-[#8C7D70] mt-0.5">
                  POST
                </span>
              </div>

              {/* Header: Number and Title */}
              <div className="pr-12 mb-3">
                <div className="font-handwriting text-2xl md:text-3xl text-[#1E1A26] font-semibold leading-tight">
                  {selectedLetter.heading}
                </div>
                <div className="font-playful text-[10px] text-[#8C7D70] mt-0.5">
                  found {selectedLetter.locationLabel}
                </div>
              </div>

              {/* Delicate divider */}
              <div className="w-16 h-px bg-[#D8C7B5] my-3" />

              {/* Inner Letter Body (Unfolding with gentle delay) */}
              <div className="min-h-[90px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {unfolded ? (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-3"
                    >
                      <p className="font-handwriting text-xl md:text-2xl text-[#2E2822] leading-relaxed">
                        “{selectedLetter.message}”
                      </p>

                      {selectedLetter.endSignoff && (
                        <p className="font-handwriting text-lg text-[#6E6358] italic text-right">
                          {selectedLetter.endSignoff}
                        </p>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unfolding"
                      className="py-4 text-center font-playful text-xs text-[#8C7D70] italic animate-pulse"
                    >
                      unfolding paper...
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Close interaction (part of the paper) */}
              <div className="mt-5 pt-3 border-t border-[#E5DECF] flex items-center justify-between">
                <span className="font-playful text-[10px] text-[#8C7D70]">
                  letter {selectedLetter.number} of 06
                </span>
                <button
                  onClick={handleCloseLetter}
                  className="font-handwriting text-sm text-[#4A4254] hover:text-[#1E1A26] underline underline-offset-4 cursor-pointer"
                >
                  fold & put back
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* COMPLETION AREA: When all 6 letters opened */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center pb-4 min-h-[70px] justify-center">
        {allOpened ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-2"
          >
            <div className="space-y-0.5">
              <p className="font-handwriting text-xl text-[#E8C5C8]">
                Six little letters.
              </p>
              <p className="font-handwriting text-lg text-[#FAF6EE]/90">
                And somehow, still not enough.
              </p>
            </div>

            <motion.button
              onClick={handleContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-1 px-6 py-2 rounded-full bg-[#FAF5ED] text-[#131118] font-handwriting text-lg tracking-wide shadow-lg hover:bg-white transition-all cursor-pointer inline-flex items-center gap-2 group"
            >
              <span>continue</span>
              <span className="text-sm font-sans group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>
          </motion.div>
        ) : (
          <div className="text-center font-playful text-xs text-[#FAF6EE]/50">
            {openedLetterIds.size} of 6 letters discovered
          </div>
        )}
      </div>

      {/* Gentle transition overlay into bouquet */}
      {isTransitioningOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 bg-[#121017] pointer-events-none"
        />
      )}
    </div>
  );
};
