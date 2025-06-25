interface VoiceConfig {
  language: string;
  requiresUserInteraction: boolean;
}

class VoiceHandler {
  private hasUserInteracted: boolean = false;
  private synthesis: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor(private config: VoiceConfig = {
    language: 'en-US',
    requiresUserInteraction: true
  }) {
    // Set up user interaction listener
    if (typeof window !== 'undefined') {
      window.addEventListener('click', () => {
        this.hasUserInteracted = true;
      }, { once: true });
    }
  }

  private async waitForUserInteraction(): Promise<void> {
    if (!this.hasUserInteracted && this.config.requiresUserInteraction) {
      return new Promise((resolve) => {
        const handler = () => {
          this.hasUserInteracted = true;
          window.removeEventListener('click', handler);
          resolve();
        };
        window.addEventListener('click', handler);
      });
    }
  }

  public async speak(text: string): Promise<void> {
    if (!window.speechSynthesis) {
      throw new Error('Speech synthesis not supported');
    }

    // Wait for user interaction if needed
    await this.waitForUserInteraction();

    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      this.synthesis = new SpeechSynthesisUtterance(text);
      this.synthesis.lang = this.config.language;

      // Set up event handlers
      this.synthesis.onend = () => {
        console.log('Speech completed successfully');
        resolve();
      };

      this.synthesis.onerror = (event) => {
        const errorMessage = `Speech synthesis error: ${event.error}`;
        console.warn(errorMessage);
        
        if (event.error === 'not-allowed') {
          reject(new Error('Speech synthesis requires user interaction first'));
        } else {
          reject(new Error(errorMessage));
        }
      };

      // Start speaking
      try {
        window.speechSynthesis.speak(this.synthesis);
      } catch (error) {
        reject(error);
      }
    });
  }

  public stopSpeaking(): void {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  public isSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}

export const voiceHandler = new VoiceHandler();