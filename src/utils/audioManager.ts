/**
 * Persistent Global Audio Manager
 * Strictly one song: "Matthew Ifield - I Think They Call This Love (Cover).mp3"
 * Does not restart across scene changes.
 * Preserves playback state.
 */

class AudioManager {
  private static instance: AudioManager;
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private hasInitialized: boolean = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private synthLoopId: number | null = null;
  private audioContext: AudioContext | null = null;
  private readonly audioSrc: string = encodeURI('/Matthew Ifield - I Think They Call This Love (Cover).mp3');

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement(this.audioSrc);
    }
  }

  private initAudioElement(src: string) {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }

    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.preload = 'auto';

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.stopSynthFallback();
      this.notifyListeners();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notifyListeners();
    });

    this.audio.addEventListener('error', () => {
      if (this.isPlaying) {
        this.startSynthFallback();
      }
    });
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public startOnFirstInteraction() {
    if (this.hasInitialized) return;
    this.hasInitialized = true;
    this.play();
  }

  public play() {
    this.isPlaying = true;
    if (this.audio) {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.stopSynthFallback();
            this.notifyListeners();
          })
          .catch(() => {
            this.startSynthFallback();
            this.notifyListeners();
          });
      }
    } else {
      this.startSynthFallback();
    }
    this.notifyListeners();
  }

  public pause() {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynthFallback();
    this.notifyListeners();
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.isPlaying));
  }

  /**
   * Warm, gentle electric piano chord progression of "I Think They Call This Love"
   * Key of C: Cmaj7 - Em7 - Fmaj7 - G7
   * Only active if the MP3 file is unable to be read directly.
   */
  private startSynthFallback() {
    if (this.synthLoopId !== null) return;
    
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioContext && AudioCtx) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    } catch {
      return;
    }

    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [329.63, 392.00, 493.88, 587.33], // Em7
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [392.00, 493.88, 587.33, 698.46], // G7
    ];

    let chordIndex = 0;
    const playNextChord = () => {
      if (!this.isPlaying || !this.audioContext) return;
      
      const ctx = this.audioContext;
      const now = ctx.currentTime;
      const chord = chords[chordIndex];
      chordIndex = (chordIndex + 1) % chords.length;

      chord.forEach((freq, noteIdx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + noteIdx * 0.08);

        gain.gain.setValueAtTime(0, now + noteIdx * 0.08);
        gain.gain.linearRampToValueAtTime(0.04, now + noteIdx * 0.08 + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + noteIdx * 0.08 + 2.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + noteIdx * 0.08);
        osc.stop(now + noteIdx * 0.08 + 2.5);
      });

      this.synthLoopId = window.setTimeout(playNextChord, 2400);
    };

    playNextChord();
  }

  private stopSynthFallback() {
    if (this.synthLoopId !== null) {
      clearTimeout(this.synthLoopId);
      this.synthLoopId = null;
    }
  }
}

export const audioManager = AudioManager.getInstance();
