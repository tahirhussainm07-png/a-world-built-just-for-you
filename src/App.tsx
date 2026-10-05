import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CustomizationProvider } from './context/CustomizationContext';
import { AudioWidget } from './components/AudioWidget';
import { CreatorPanel } from './components/CreatorPanel';
import { Scene01Waiting } from './components/scenes/Scene01Waiting';
import { Scene02BowHeart } from './components/scenes/Scene02BowHeart';
import { Scene03BirthdayRoom } from './components/scenes/Scene03BirthdayRoom';
import { Scene04Memories } from './components/scenes/Scene04Memories';
import { Scene05GardenLore } from './components/scenes/Scene05GardenLore';
import { Scene06Bouquet } from './components/scenes/Scene06Bouquet';
import { Scene07Letter } from './components/scenes/Scene07Letter';
import { Scene08EndScene } from './components/scenes/Scene08EndScene';
import { SceneId } from './types';

const AppContent: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneId>('waiting');

  return (
    <div className="relative min-h-screen w-full bg-[#121016] text-[#FAF6EE] overflow-x-hidden font-body">
      {/* Subtle organic film grain overlay */}
      <div className="film-grain" />

      {/* Persistent Audio Control Widget (Discreet Play/Pause in corner) */}
      <AudioWidget />

      {/* Creator Keepsake Customizer (Subtle gear in bottom corner) */}
      <CreatorPanel
        currentScene={currentScene}
        onJumpToScene={(scene) => setCurrentScene(scene)}
      />

      {/* Main Single-Storyline Scene Flow */}
      <main className="relative w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentScene === 'waiting' && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full min-h-screen"
            >
              <Scene01Waiting onComplete={() => setCurrentScene('bow-arrow')} />
            </motion.div>
          )}

          {currentScene === 'bow-arrow' && (
            <motion.div
              key="bow-arrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full min-h-screen"
            >
              <Scene02BowHeart onComplete={() => setCurrentScene('birthday-room')} />
            </motion.div>
          )}

          {currentScene === 'birthday-room' && (
            <motion.div
              key="birthday-room"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full min-h-screen"
            >
              <Scene03BirthdayRoom onComplete={() => setCurrentScene('memories')} />
            </motion.div>
          )}

          {currentScene === 'memories' && (
            <motion.div
              key="memories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full min-h-screen"
            >
              <Scene04Memories onComplete={() => setCurrentScene('garden-lore')} />
            </motion.div>
          )}

          {currentScene === 'garden-lore' && (
            <motion.div
              key="garden-lore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full min-h-screen"
            >
              <Scene05GardenLore onComplete={() => setCurrentScene('bouquet')} />
            </motion.div>
          )}

          {currentScene === 'bouquet' && (
            <motion.div
              key="bouquet"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full min-h-screen"
            >
              <Scene06Bouquet onComplete={() => setCurrentScene('final-letter')} />
            </motion.div>
          )}

          {currentScene === 'final-letter' && (
            <motion.div
              key="final-letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full min-h-screen"
            >
              <Scene07Letter onComplete={() => setCurrentScene('end-scene')} />
            </motion.div>
          )}

          {currentScene === 'end-scene' && (
            <motion.div
              key="end-scene"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full min-h-screen"
            >
              <Scene08EndScene onRestart={() => setCurrentScene('waiting')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <CustomizationProvider>
      <AppContent />
    </CustomizationProvider>
  );
}
