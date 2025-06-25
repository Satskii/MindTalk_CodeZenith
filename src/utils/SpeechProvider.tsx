import React, { useState, useCallback } from 'react';
import { SpeechContext } from './speechContext';

export const SpeechProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const speak = useCallback(async (text: string, language = 'en-US') => {
    if (!synth) throw new Error('Speech synthesis not supported');
    
    return new Promise<void>((resolve, reject) => {
      synth.cancel(); // Stop any current speech
      setIsSpeaking(true);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };

      utterance.onerror = (event) => {
        setIsSpeaking(false);
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      synth.speak(utterance);
    });
  }, [synth]);

  const stopSpeaking = useCallback(() => {
    if (synth) {
      synth.cancel();
      setIsSpeaking(false);
    }
  }, [synth]);

  return (
    <SpeechContext.Provider value={{ isSpeaking, speak, stopSpeaking }}>
      {children}
    </SpeechContext.Provider>
  );
};
