export interface SpeechContextType {
  isSpeaking: boolean;
  speak: (text: string, language?: string) => Promise<void>;
  stopSpeaking: () => void;
}
