// High-reliability Web Speech API helper designed for smooth, stutter-free Lithuanian TTS

type SpeechStateListener = (speaking: boolean, activeText: string | null) => void;

class SpeechNarrator {
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private keepAliveTimer: number | null = null;
  private listeners: Set<SpeechStateListener> = new Set();
  private availableVoices: SpeechSynthesisVoice[] = [];
  public enabled: boolean = false;
  private currentSpokenText: string | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.availableVoices = window.speechSynthesis.getVoices();
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (this.availableVoices.length === 0 && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.availableVoices = window.speechSynthesis.getVoices();
    }
    return this.availableVoices;
  }

  public getBestLithuanianVoice(): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. Look for exact Lithuanian language code
    const ltVoice = voices.find(
      (v) =>
        v.lang.toLowerCase() === 'lt-lt' ||
        v.lang.toLowerCase() === 'lt' ||
        v.lang.toLowerCase().startsWith('lt') ||
        v.name.toLowerCase().includes('lithuania') ||
        v.name.toLowerCase().includes('lietuvių')
    );
    if (ltVoice) return ltVoice;

    // 2. Look for natural/default system voice with good clear speech profile
    const defaultVoice = voices.find((v) => v.default);
    if (defaultVoice) return defaultVoice;

    return voices[0] || null;
  }

  /**
   * Sanitizes text for smooth speech:
   * Removes emojis, quotes, Markdown asterisks, bracketed metadata that cause TTS engine stutter.
   */
  public cleanTextForSpeech(rawText: string): string {
    if (!rawText) return '';
    return rawText
      // Remove URLs
      .replace(/https?:\/\/\S+/gi, '')
      // Remove Markdown bold/italics/backticks
      .replace(/[*_`#~]/g, '')
      // Remove typographic quotes
      .replace(/[„“”«»"]/g, '')
      // Remove emojis and unicode symbols
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/gu, '')
      // Clean up bracket notes like [Veiksmas: ...] or (1)
      .replace(/\[.*?\]/g, '')
      // Replace multiple spaces and trim
      .replace(/\s+/g, ' ')
      .trim();
  }

  public isSpeaking(): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    return window.speechSynthesis.speaking && !window.speechSynthesis.paused;
  }

  public getCurrentText(): string | null {
    return this.currentSpokenText;
  }

  public subscribe(listener: SpeechStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isSpeaking(), this.currentSpokenText);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const speaking = this.isSpeaking();
    const text = this.currentSpokenText;
    this.listeners.forEach((fn) => fn(speaking, text));
  }

  public stop() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.clearKeepAlive();
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore cancel errors
    }
    this.activeUtterance = null;
    this.currentSpokenText = null;
    this.notify();
  }

  public speak(
    rawText: string,
    options?: {
      rate?: number;
      pitch?: number;
      onEnd?: () => void;
      onError?: () => void;
    }
  ) {
    if (!this.enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const text = this.cleanTextForSpeech(rawText);
    if (!text) return;

    // If already speaking the exact same text, stop it (toggle action)
    if (this.isSpeaking() && this.currentSpokenText === rawText) {
      this.stop();
      return;
    }

    // Stop current speech cleanly
    this.stop();

    // Use a small 40ms timeout to avoid Chromium TTS queue race condition
    window.setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Voice matching
        const voice = this.getBestLithuanianVoice();
        if (voice) {
          utterance.voice = voice;
        }
        utterance.lang = 'lt-LT';
        // Calm, clear articulation speed for children
        utterance.rate = options?.rate ?? 0.93;
        utterance.pitch = options?.pitch ?? 1.0;

        // GC Protection: bind to instance and window
        this.activeUtterance = utterance;
        (window as unknown as { __activeSpeechUtterance: SpeechSynthesisUtterance }).__activeSpeechUtterance = utterance;
        this.currentSpokenText = rawText;

        utterance.onstart = () => {
          this.startKeepAlive();
          this.notify();
        };

        utterance.onend = () => {
          this.clearKeepAlive();
          this.activeUtterance = null;
          this.currentSpokenText = null;
          this.notify();
          options?.onEnd?.();
        };

        utterance.onerror = (e) => {
          this.clearKeepAlive();
          this.activeUtterance = null;
          this.currentSpokenText = null;
          this.notify();
          if (e.error !== 'canceled' && e.error !== 'interrupted') {
            options?.onError?.();
          }
        };

        window.speechSynthesis.speak(utterance);
        this.notify();
      } catch (err) {
        console.warn('Speech synthesis error:', err);
        this.stop();
      }
    }, 40);
  }

  /**
   * Chromium bug workaround: speech synthesis can pause/hang after 15 seconds.
   * A periodic pause/resume pulse keeps the audio buffer active.
   */
  private startKeepAlive() {
    this.clearKeepAlive();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.keepAliveTimer = window.setInterval(() => {
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
  }

  private clearKeepAlive() {
    if (this.keepAliveTimer !== null) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }
}

export const speech = new SpeechNarrator();
