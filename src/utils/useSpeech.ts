import { useContext } from 'react';
import { SpeechContext } from './speechContext';

export const useSpeech = () => {
  return useContext(SpeechContext);
};
