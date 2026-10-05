import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioManager } from '../utils/audioManager';

export const AudioWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(audioManager.getIsPlaying());

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    audioManager.toggle();
  };

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-auto">
      <button
        onClick={handleToggle}
        className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C1924]/70 hover:bg-[#1C1924]/90 border border-white/10 backdrop-blur-md shadow-lg transition-all duration-300 text-xs text-[#FAF6EE]/80 hover:text-[#FAF6EE] active:scale-95"
        title={isPlaying ? "Pause music" : "Play music"}
        aria-label={isPlaying ? "Pause background song" : "Play background song"}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3 w-3">
              <span className="w-0.5 bg-[#E8C5C8] rounded-full animate-pulse h-full" />
              <span className="w-0.5 bg-[#FAF6EE] rounded-full animate-pulse h-2/3 delay-75" />
              <span className="w-0.5 bg-[#E8C5C8] rounded-full animate-pulse h-4/5 delay-150" />
            </div>
            <span className="font-serif italic text-[11px] tracking-wide hidden sm:inline opacity-80 group-hover:opacity-100">
              I Think They Call This Love
            </span>
            <Volume2 className="w-3.5 h-3.5 text-[#E8C5C8]" />
          </>
        ) : (
          <>
            <Music className="w-3 h-3 text-[#A8A29E]" />
            <span className="font-serif italic text-[11px] tracking-wide hidden sm:inline text-[#A8A29E]">
              Play Song
            </span>
            <VolumeX className="w-3.5 h-3.5 text-[#A8A29E]" />
          </>
        )}
      </button>
    </div>
  );
};
