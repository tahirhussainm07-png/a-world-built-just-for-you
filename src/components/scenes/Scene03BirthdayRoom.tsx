import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playCandleBlow, playStarSparkle } from '../../utils/soundEffects';
import { SleepingCat, WigglingStar, SecretSticker, BabyDoodle, FloatingBalloon } from '../EasterEggs';
import { useCustomization } from '../../context/CustomizationContext';

interface Scene03BirthdayRoomProps {
  onComplete: () => void;
}

export const Scene03BirthdayRoom: React.FC<Scene03BirthdayRoomProps> = ({ onComplete }) => {
  const { config } = useCustomization();
  
  // Candle state: array of 3 candles
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [wished, setWished] = useState(false);
  const [smokePuffs, setSmokePuffs] = useState(false);

  // Extinguish a candle
  const blowCandle = (index: number) => {
    if (!candlesLit[index]) return;
    playCandleBlow();

    setCandlesLit((prev) => {
      const next = [...prev];
      next[index] = false;

      // If all candles are now extinguished
      if (next.every((c) => !c)) {
        setSmokePuffs(true);
        setTimeout(() => {
          setWished(true);
          playStarSparkle();
        }, 1000);
      }
      return next;
    });
  };

  const blowAllCandles = () => {
    playCandleBlow();
    setCandlesLit([false, false, false]);
    setSmokePuffs(true);
    setTimeout(() => {
      setWished(true);
      playStarSparkle();
    }, 1000);
  };

  const allBlownOut = candlesLit.every((c) => !c);

  return (
    <div className={`relative min-h-screen w-full flex flex-col justify-between p-6 transition-colors duration-1000 select-none overflow-hidden ${allBlownOut ? 'bg-[#0E0C13]' : 'bg-[#181422]'} dark-paper-texture`}>
      
      {/* BACKGROUND LAYER: Night Sky Window & Distant Moon */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-72 md:w-96 h-48 rounded-t-full border-4 border-[#2D2638] bg-[#0A0812] shadow-inner overflow-hidden pointer-events-none opacity-90">
        {/* Crescent Moon */}
        <div className="absolute top-6 right-10 w-10 h-10 rounded-full bg-[#FAF6EE] shadow-[0_0_20px_rgba(250,246,238,0.5)]">
          <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-[#0A0812]" />
        </div>

        {/* Night clouds drifting */}
        <motion.div
          animate={{ x: [-40, 160] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute top-16 left-0 w-32 h-6 bg-white/5 rounded-full blur-sm"
        />

        {/* Twinkling stars outside window */}
        <div className="absolute inset-0">
          {[
            { t: '20%', l: '25%' },
            { t: '35%', l: '60%' },
            { t: '60%', l: '30%' },
            { t: '45%', l: '80%' },
          ].map((s, idx) => (
            <span
              key={idx}
              style={{ top: s.t, left: s.l }}
              className={`absolute text-[#FDE68A] text-xs transition-opacity duration-700 ${allBlownOut ? 'opacity-90' : 'opacity-40'} animate-pulse`}
            >
              ✦
            </span>
          ))}
        </div>
      </div>

      {/* MIDGROUND LAYER: Fairy Lights String & Shelves with Little Details */}
      <div className="relative z-10 w-full pt-2">
        {/* Fairy lights string across top */}
        <div className="relative flex justify-between items-center px-4 max-w-lg mx-auto">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: allBlownOut ? [0.8, 1, 0.8] : [0.5, 0.8, 0.5],
                scale: allBlownOut ? [1, 1.15, 1] : [1, 1, 1],
              }}
              transition={{ duration: 1.8 + (i % 3) * 0.4, repeat: Infinity }}
              className="relative flex flex-col items-center"
            >
              {/* Wire hook */}
              <div className="w-px h-3 bg-[#5C5368]" />
              {/* Bulb */}
              <div
                className={`w-2.5 h-3.5 rounded-full transition-all duration-700 shadow-sm ${
                  allBlownOut
                    ? 'bg-[#FDE68A] shadow-[0_0_12px_#FDE68A]'
                    : i % 2 === 0
                    ? 'bg-[#E8C5C8] shadow-[0_0_6px_#E8C5C8]'
                    : 'bg-[#FAF6EE] shadow-[0_0_6px_#FAF6EE]'
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Cozy Wall Shelf with Easter Eggs (Sleeping Cat, Baby Booties Doodle, Secret Sticker) */}
        <div className="mt-8 max-w-md mx-auto flex items-end justify-between px-6">
          {/* Baby doodle on tiny note */}
          <div className="flex flex-col items-center">
            <BabyDoodle />
            <span className="font-playful text-[10px] text-[#A8A29E] mt-0.5">tiny reminder</span>
          </div>

          {/* Balloon floating near window */}
          <FloatingBalloon className="relative -top-4" />

          {/* Sleeping Cat resting on the right ledge */}
          <div className="flex flex-col items-end">
            <SleepingCat />
            <span className="font-playful text-[10px] text-[#A8A29E] mt-0.5">curled up sleeping</span>
          </div>
        </div>
      </div>

      {/* FOREGROUND LAYER: The Birthday Table & Handcrafted Cake */}
      <div className="relative z-20 my-auto flex flex-col items-center max-w-sm mx-auto text-center px-4">
        {/* Birthday banner or instruction */}
        <div className="mb-4">
          <AnimatePresence mode="wait">
            {!allBlownOut ? (
              <motion.div
                key="make-wish"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-1"
              >
                <p className="font-handwriting text-2xl md:text-3xl text-[#E8C5C8]">
                  make a wish, {config.herName}...
                </p>
                <p className="font-playful text-xs text-[#FAF6EE]/60">
                  (tap each candle to blow it out)
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="wish-made"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                <p className="font-handwriting text-2xl md:text-3xl text-[#FAF6EE]">
                  your wish is floating among the stars ✨
                </p>
                <p className="font-playful text-xs text-[#A8A29E]">
                  the fairy lights burned brighter just for you
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* The Illustrated Birthday Cake */}
        <div
          onClick={!allBlownOut ? blowAllCandles : undefined}
          className="relative cursor-pointer group my-2 select-none"
          title={!allBlownOut ? "Tap candles to blow them out" : "Wish made"}
        >
          {/* Ambient warm cake glow */}
          <div
            className={`absolute -inset-6 rounded-full transition-opacity duration-700 blur-2xl pointer-events-none ${
              allBlownOut ? 'opacity-10 bg-transparent' : 'opacity-60 bg-[#F59E0B]/30'
            }`}
          />

          {/* Cake Candles */}
          <div className="relative z-10 flex justify-center gap-7 -mb-2">
            {[0, 1, 2].map((idx) => {
              const isLit = candlesLit[idx];
              return (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    blowCandle(idx);
                  }}
                  className="flex flex-col items-center cursor-pointer group/candle"
                  title="Tap to blow out candle"
                >
                  {/* Candle Flame or Smoke */}
                  <div className="h-7 w-4 flex items-center justify-center relative">
                    {isLit ? (
                      <motion.div
                        animate={{
                          scaleY: [1, 1.15, 0.95, 1],
                          scaleX: [1, 0.9, 1.05, 1],
                        }}
                        transition={{ duration: 0.9 + idx * 0.2, repeat: Infinity }}
                        className="w-3.5 h-5 rounded-full bg-gradient-to-t from-[#F59E0B] via-[#FBBF24] to-[#FEF08A] shadow-[0_0_12px_#F59E0B] animate-candle"
                      />
                    ) : (
                      /* Rising smoke wisps */
                      smokePuffs && (
                        <motion.div
                          initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                          animate={{ opacity: 0, y: -24, scale: 1.4 }}
                          transition={{ duration: 1.6, ease: 'easeOut' }}
                          className="w-1.5 h-4 bg-white/40 rounded-full blur-[1px]"
                        />
                      )
                    )}
                  </div>

                  {/* Candle Wick */}
                  <div className="w-0.5 h-1.5 bg-[#4B4453]" />

                  {/* Candle Body */}
                  <div
                    className={`w-3 h-10 rounded-sm border border-[#E5DECF] shadow-inner ${
                      idx === 1 ? 'bg-[#E8C5C8]' : 'bg-[#FAF5ED]'
                    }`}
                  >
                    {/* Candle spiral ribbon stripes */}
                    <div className="w-full h-1 bg-[#D4A373]/30 my-2" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cake Layers SVG */}
          <div className="relative w-52 md:w-60 h-28">
            <svg viewBox="0 0 200 110" className="w-full h-full drop-shadow-lg">
              {/* Cake Top Tier Frosting */}
              <ellipse cx="100" cy="20" rx="70" ry="14" fill="#FAF6EE" stroke="#E5DECF" strokeWidth="1.5" />
              {/* Dripping cream scallops */}
              <path
                d="M30 20 Q40 32 50 20 Q60 34 70 20 Q80 32 90 20 Q100 36 110 20 Q120 32 130 20 Q140 34 150 20 Q160 30 170 20 L170 45 Q100 70 30 45 Z"
                fill="#FAF6EE"
                stroke="#E5DECF"
                strokeWidth="1.2"
              />
              {/* Cake middle sponge layer */}
              <path
                d="M30 42 Q100 68 170 42 L170 82 Q100 108 30 82 Z"
                fill="#E8C5C8"
                stroke="#D8A4AB"
                strokeWidth="1.2"
              />
              {/* Bottom decorative plate */}
              <ellipse cx="100" cy="85" rx="88" ry="16" fill="#FFFFFF" opacity="0.2" />
              <ellipse cx="100" cy="86" rx="84" ry="14" fill="#EAE5DA" stroke="#D1C8B8" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Small secret sticker on table */}
        <div className="mt-3">
          <SecretSticker
            label="a tiny secret ♡"
            secretMessage="i spent weeks planning this little world because you deserve something that belongs only to you."
          />
        </div>
      </div>

      {/* BOTTOM ACTION: Step forward to memories */}
      <div className="relative z-20 w-full flex flex-col items-center pb-6">
        <AnimatePresence>
          {wished ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <button
                onClick={onComplete}
                className="px-6 py-2.5 rounded-full bg-[#FAF5ED] text-[#1E1A26] font-handwriting text-xl tracking-wide shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
              >
                <span>look at our memories</span>
                <span className="text-sm font-sans group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          ) : (
            <button
              onClick={blowAllCandles}
              className="text-xs font-handwriting text-[#FAF6EE]/50 hover:text-[#FAF6EE] underline underline-offset-4 cursor-pointer"
            >
              (or tap here to blow out all candles)
            </button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
