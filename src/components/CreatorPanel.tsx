import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, RotateCcw, Plus, Trash2, Eye } from 'lucide-react';
import { useCustomization, COLOR_PALETTES, FONT_OPTIONS } from '../context/CustomizationContext';
import { SceneId } from '../types';

interface CreatorPanelProps {
  currentScene: SceneId;
  onJumpToScene: (scene: SceneId) => void;
}

export const CreatorPanel: React.FC<CreatorPanelProps> = ({ currentScene, onJumpToScene }) => {
  const { config, updateConfig, resetToDefault, isCreatorOpen, setIsCreatorOpen } = useCustomization();
  const [activeTab, setActiveTab] = useState<'details' | 'typography' | 'palette' | 'memories' | 'reasons' | 'letter' | 'scenes'>('details');

  return (
    <>
      {/* Discreet floating creator trigger in bottom-left */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsCreatorOpen(true)}
          className="p-2 rounded-full bg-[#1C1924]/70 hover:bg-[#1C1924]/90 border border-white/10 backdrop-blur-md text-[#FAF6EE]/60 hover:text-[#FAF6EE] shadow-lg transition-all duration-200 cursor-pointer"
          title="Creator Customization Panel"
          aria-label="Open Creator Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Creator Drawer Modal */}
      <AnimatePresence>
        {isCreatorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-[#1A1622] text-[#FAF6EE] flex flex-col shadow-2xl border-l border-white/10 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#15121D]">
                <div>
                  <h3 className="font-display text-lg font-medium text-[#FAF6EE]">
                    Creator Keepsake Editor
                  </h3>
                  <p className="text-[11px] text-[#A8A29E]">
                    Personalize her little universe in real time
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetToDefault}
                    className="p-1.5 rounded text-[#A8A29E] hover:text-[#FAF6EE] hover:bg-white/5 text-xs flex items-center gap-1 cursor-pointer"
                    title="Reset to defaults"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                  <button
                    onClick={() => setIsCreatorOpen(false)}
                    className="p-1.5 rounded text-[#A8A29E] hover:text-[#FAF6EE] hover:bg-white/5 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 p-2 bg-[#120F1A] border-b border-white/5 overflow-x-auto text-xs scrollbar-none">
                {[
                  { id: 'details', label: 'Details' },
                  { id: 'typography', label: 'Typography' },
                  { id: 'palette', label: 'Colors' },
                  { id: 'memories', label: 'Memories' },
                  { id: 'reasons', label: 'Six Letters' },
                  { id: 'letter', label: 'Letter' },
                  { id: 'scenes', label: 'Jump Scene' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#FAF6EE] text-[#1A1622] font-medium shadow-xs'
                        : 'text-[#A8A29E] hover:text-[#FAF6EE]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Body */}
              <div className="flex-1 p-5 overflow-y-auto space-y-6 text-sm">
                
                {/* 1. DETAILS TAB */}
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-[#A8A29E] mb-1">Her Name</label>
                      <input
                        type="text"
                        value={config.herName}
                        onChange={(e) => updateConfig((p) => ({ ...p, herName: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg bg-[#252030] border border-white/10 text-[#FAF6EE] focus:outline-none focus:border-[#E8C5C8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#A8A29E] mb-1">My Name (Creator)</label>
                      <input
                        type="text"
                        value={config.myName}
                        onChange={(e) => updateConfig((p) => ({ ...p, myName: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg bg-[#252030] border border-white/10 text-[#FAF6EE] focus:outline-none focus:border-[#E8C5C8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#A8A29E] mb-1">Birthday Date</label>
                      <input
                        type="text"
                        value={config.birthdayDate}
                        onChange={(e) => updateConfig((p) => ({ ...p, birthdayDate: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg bg-[#252030] border border-white/10 text-[#FAF6EE] focus:outline-none focus:border-[#E8C5C8]"
                      />
                    </div>
                    <div className="pt-2 text-xs text-[#A8A29E] italic">
                      💡 These details immediately update in the bow-and-arrow reveal, cake wishes, letters, and end scene.
                    </div>
                  </div>
                )}

                {/* 2. TYPOGRAPHY TAB */}
                {activeTab === 'typography' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs text-[#A8A29E] mb-1">Display Font (Titles & Moments)</label>
                      <select
                        value={config.typography.displayFont}
                        onChange={(e) =>
                          updateConfig((p) => ({
                            ...p,
                            typography: { ...p.typography, displayFont: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#252030] border border-white/10 text-[#FAF6EE] focus:outline-none"
                      >
                        {FONT_OPTIONS.display.map((f) => (
                          <option key={f.value} value={f.value}>{f.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#A8A29E] mb-1">Handwritten Font (Letters & Notes)</label>
                      <select
                        value={config.typography.handwrittenFont}
                        onChange={(e) =>
                          updateConfig((p) => ({
                            ...p,
                            typography: { ...p.typography, handwrittenFont: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#252030] border border-white/10 text-[#FAF6EE] focus:outline-none"
                      >
                        {FONT_OPTIONS.handwriting.map((f) => (
                          <option key={f.value} value={f.value}>{f.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#A8A29E] mb-1">Playful Font (Stickers & Childish Details)</label>
                      <select
                        value={config.typography.playfulFont}
                        onChange={(e) =>
                          updateConfig((p) => ({
                            ...p,
                            typography: { ...p.typography, playfulFont: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#252030] border border-white/10 text-[#FAF6EE] focus:outline-none"
                      >
                        {FONT_OPTIONS.playful.map((f) => (
                          <option key={f.value} value={f.value}>{f.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#A8A29E] mb-1">Body Font (Legible Prose)</label>
                      <select
                        value={config.typography.bodyFont}
                        onChange={(e) =>
                          updateConfig((p) => ({
                            ...p,
                            typography: { ...p.typography, bodyFont: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#252030] border border-white/10 text-[#FAF6EE] focus:outline-none"
                      >
                        {FONT_OPTIONS.body.map((f) => (
                          <option key={f.value} value={f.value}>{f.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Size and line height sliders */}
                    <div className="space-y-3 pt-2 border-t border-white/10">
                      <div>
                        <div className="flex justify-between text-xs text-[#A8A29E]">
                          <span>Title Scale</span>
                          <span>{config.typography.titleSize}rem</span>
                        </div>
                        <input
                          type="range"
                          min="2.0"
                          max="4.0"
                          step="0.1"
                          value={config.typography.titleSize}
                          onChange={(e) =>
                            updateConfig((p) => ({
                              ...p,
                              typography: { ...p.typography, titleSize: parseFloat(e.target.value) },
                            }))
                          }
                          className="w-full accent-[#E8C5C8]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-[#A8A29E]">
                          <span>Handwritten Scale</span>
                          <span>{config.typography.handwrittenSize}rem</span>
                        </div>
                        <input
                          type="range"
                          min="1.0"
                          max="2.0"
                          step="0.05"
                          value={config.typography.handwrittenSize}
                          onChange={(e) =>
                            updateConfig((p) => ({
                              ...p,
                              typography: { ...p.typography, handwrittenSize: parseFloat(e.target.value) },
                            }))
                          }
                          className="w-full accent-[#E8C5C8]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-[#A8A29E]">
                          <span>Line Spacing</span>
                          <span>{config.typography.lineHeight}</span>
                        </div>
                        <input
                          type="range"
                          min="1.3"
                          max="2.0"
                          step="0.05"
                          value={config.typography.lineHeight}
                          onChange={(e) =>
                            updateConfig((p) => ({
                              ...p,
                              typography: { ...p.typography, lineHeight: parseFloat(e.target.value) },
                            }))
                          }
                          className="w-full accent-[#E8C5C8]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. COLOR PALETTE TAB */}
                {activeTab === 'palette' && (
                  <div className="space-y-4">
                    <p className="text-xs text-[#A8A29E]">
                      Select a curated, tasteful palette tailored for a handmade digital world:
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      {COLOR_PALETTES.map((pal) => (
                        <div
                          key={pal.id}
                          onClick={() => updateConfig((p) => ({ ...p, palette: pal }))}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            config.palette.id === pal.id
                              ? 'border-[#E8C5C8] bg-white/10 shadow-md'
                              : 'border-white/10 hover:border-white/30 bg-[#252030]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-xs text-[#FAF6EE]">{pal.name}</span>
                            {config.palette.id === pal.id && (
                              <span className="text-[10px] text-[#E8C5C8] font-playful">Active</span>
                            )}
                          </div>
                          <div className="flex h-5 rounded overflow-hidden">
                            <div style={{ backgroundColor: pal.canvas }} className="flex-1" />
                            <div style={{ backgroundColor: pal.surface }} className="flex-1" />
                            <div style={{ backgroundColor: pal.blush }} className="flex-1" />
                            <div style={{ backgroundColor: pal.accent }} className="flex-1" />
                            <div style={{ backgroundColor: pal.cream }} className="flex-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. MEMORIES TAB */}
                {activeTab === 'memories' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#A8A29E]">Polaroid Keepsakes</span>
                      <button
                        onClick={() => {
                          const newMem = {
                            id: `m_${Date.now()}`,
                            title: 'New Memory',
                            caption: 'A gentle note about this moment...',
                            imageUrl: config.memories[0]?.imageUrl || '',
                            rotation: (Math.random() - 0.5) * 6,
                          };
                          updateConfig((p) => ({ ...p, memories: [...p.memories, newMem] }));
                        }}
                        className="px-2 py-1 rounded bg-white/10 text-xs text-[#FAF6EE] hover:bg-white/20 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Photo</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {config.memories.map((mem, i) => (
                        <div key={mem.id} className="p-3 rounded-lg bg-[#252030] border border-white/10 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-[#E8C5C8]">Photo #{i + 1}</span>
                            {config.memories.length > 1 && (
                              <button
                                onClick={() =>
                                  updateConfig((p) => ({
                                    ...p,
                                    memories: p.memories.filter((m) => m.id !== mem.id),
                                  }))
                                }
                                className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          <div>
                            <label className="text-[11px] text-[#A8A29E]">Title</label>
                            <input
                              type="text"
                              value={mem.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateConfig((p) => ({
                                  ...p,
                                  memories: p.memories.map((m) => (m.id === mem.id ? { ...m, title: val } : m)),
                                }));
                              }}
                              className="w-full px-2 py-1 rounded bg-[#181422] border border-white/10 text-xs text-[#FAF6EE]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-[#A8A29E]">Date / Note</label>
                            <input
                              type="text"
                              value={mem.date || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateConfig((p) => ({
                                  ...p,
                                  memories: p.memories.map((m) => (m.id === mem.id ? { ...m, date: val } : m)),
                                }));
                              }}
                              className="w-full px-2 py-1 rounded bg-[#181422] border border-white/10 text-xs text-[#FAF6EE]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-[#A8A29E]">Handwritten Caption</label>
                            <textarea
                              rows={2}
                              value={mem.caption}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateConfig((p) => ({
                                  ...p,
                                  memories: p.memories.map((m) => (m.id === mem.id ? { ...m, caption: val } : m)),
                                }));
                              }}
                              className="w-full px-2 py-1 rounded bg-[#181422] border border-white/10 text-xs text-[#FAF6EE]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. SIX LETTERS TAB */}
                {activeTab === 'reasons' && (
                  <div className="space-y-4">
                    <p className="text-xs text-[#A8A29E]">
                      Six little postcards & letters tucked into the dreamy garden:
                    </p>
                    <div className="space-y-3">
                      {(config.gardenLetters || []).map((letter, i) => (
                        <div key={letter.id} className="p-3 rounded-lg bg-[#252030] border border-white/10 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-[#A8C9B8]">
                              Letter {letter.number} ({letter.locationLabel})
                            </span>
                          </div>
                          <div>
                            <label className="text-[11px] text-[#A8A29E]">Heading</label>
                            <input
                              type="text"
                              value={letter.heading}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateConfig((p) => ({
                                  ...p,
                                  gardenLetters: p.gardenLetters.map((item) =>
                                    item.id === letter.id ? { ...item, heading: val } : item
                                  ),
                                }));
                              }}
                              className="w-full px-2 py-1 rounded bg-[#181422] border border-white/10 text-xs text-[#FAF6EE]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-[#A8A29E]">Short Message</label>
                            <textarea
                              rows={2}
                              value={letter.message}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateConfig((p) => ({
                                  ...p,
                                  gardenLetters: p.gardenLetters.map((item) =>
                                    item.id === letter.id ? { ...item, message: val } : item
                                  ),
                                }));
                              }}
                              className="w-full px-2 py-1 rounded bg-[#181422] border border-white/10 text-xs text-[#FAF6EE]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-[#A8A29E]">Sign-off / Detail</label>
                            <input
                              type="text"
                              value={letter.endSignoff || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateConfig((p) => ({
                                  ...p,
                                  gardenLetters: p.gardenLetters.map((item) =>
                                    item.id === letter.id ? { ...item, endSignoff: val } : item
                                  ),
                                }));
                              }}
                              className="w-full px-2 py-1 rounded bg-[#181422] border border-white/10 text-xs text-[#FAF6EE]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. LETTER & ENDING TAB */}
                {activeTab === 'letter' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-[#A8A29E]">Greeting</label>
                      <input
                        type="text"
                        value={config.letter.greeting}
                        onChange={(e) =>
                          updateConfig((p) => ({
                            ...p,
                            letter: { ...p.letter, greeting: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-1.5 rounded bg-[#252030] border border-white/10 text-xs text-[#FAF6EE]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-[#A8A29E]">Paragraphs</label>
                      {config.letter.paragraphs.map((para, idx) => (
                        <textarea
                          key={idx}
                          rows={3}
                          value={para}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateConfig((p) => {
                              const newParas = [...p.letter.paragraphs];
                              newParas[idx] = val;
                              return { ...p, letter: { ...p.letter, paragraphs: newParas } };
                            });
                          }}
                          className="w-full px-3 py-2 rounded bg-[#252030] border border-white/10 text-xs text-[#FAF6EE]"
                        />
                      ))}
                    </div>

                    <div>
                      <label className="text-xs text-[#A8A29E]">Closing</label>
                      <input
                        type="text"
                        value={config.letter.closing}
                        onChange={(e) =>
                          updateConfig((p) => ({
                            ...p,
                            letter: { ...p.letter, closing: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-1.5 rounded bg-[#252030] border border-white/10 text-xs text-[#FAF6EE]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#A8A29E]">Final Scene Note</label>
                      <input
                        type="text"
                        value={config.finalScene.line2}
                        onChange={(e) =>
                          updateConfig((p) => ({
                            ...p,
                            finalScene: { ...p.finalScene, line2: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-1.5 rounded bg-[#252030] border border-white/10 text-xs text-[#FAF6EE]"
                      />
                    </div>
                  </div>
                )}

                {/* 7. SCENE JUMP / PREVIEW TAB */}
                {activeTab === 'scenes' && (
                  <div className="space-y-2">
                    <p className="text-xs text-[#A8A29E] mb-2">
                      Preview or jump directly to any chapter in the journey:
                    </p>
                    {[
                      { id: 'waiting', num: '01', title: 'Something is Waiting (Opening)' },
                      { id: 'bow-arrow', num: '02', title: 'Bow & Arrow Heart Shoot' },
                      { id: 'birthday-room', num: '03', title: 'Birthday Room & Cake Candles' },
                      { id: 'memories', num: '04', title: 'Polaroid Memory Keepsakes' },
                      { id: 'garden-lore', num: '05', title: 'Six Garden Postcards & Letters' },
                      { id: 'bouquet', num: '06', title: 'Lily & Jasmine Bouquet Presentation' },
                      { id: 'final-letter', num: '07', title: 'Wooden Desk Handwritten Letter' },
                      { id: 'end-scene', num: '08', title: 'Night Rooftop & Paper Star' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          onJumpToScene(s.id as SceneId);
                          setIsCreatorOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-lg flex items-center justify-between text-left transition-colors cursor-pointer ${
                          currentScene === s.id
                            ? 'bg-[#E8C5C8] text-[#1A1622] font-semibold'
                            : 'bg-[#252030] text-[#FAF6EE] hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xs">
                          <span className="opacity-60 mr-2">{s.num}</span>
                          {s.title}
                        </span>
                        <Eye className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
