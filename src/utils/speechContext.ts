import { createContext } from 'react';
import { SpeechContextType } from './speechContextType';

export const SpeechContext = createContext<SpeechContextType>({
  isSpeaking: false,
  speak: async () => {},
  stopSpeaking: () => {},
});
