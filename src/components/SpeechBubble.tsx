import React, { useState } from 'react';
import { Mic, MicOff, Loader2, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import LanguageSelector from './LanguageSelector'; // Updated import statement
import { toast } from './ui/use-toast'; // Adjust the import based on your file structure

interface SpeechBubbleProps {
    isListening: boolean;
    isProcessing: boolean;
    currentSpeech: string;
    onClose: () => void;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
    isListening,
    isProcessing,
    currentSpeech,
    onClose,
}) => {
    const [isTTSEnabled, setIsTTSEnabled] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const speechManagerRef = React.useRef<any>(null); // Adjust the type based on your SpeechManager reference
    const selectedLanguage = 'en'; // Replace with your actual language state

    const handleTTS = async (text: string) => {
        if (!speechManagerRef.current) return;
        
        try {
            setIsSpeaking(true);
            await speechManagerRef.current.playTTS(text, selectedLanguage);
        } catch (error) {
            console.error('TTS error:', error);
            toast({
                title: "TTS Error",
                description: "Failed to play audio",
                variant: "destructive",
            });
        } finally {
            setIsSpeaking(false);
        }
    };

    const handleMessageResponse = async (content: string) => {
        // Your existing message handling logic
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background rounded-lg p-6 shadow-lg max-w-md w-full mx-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Voice Conversation</h3>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        Close
                    </Button>
                </div>

                <div className={cn(
                    "p-4 rounded-lg transition-colors relative",
                    isListening ? "bg-primary/10" : "bg-muted"
                )}>
                    <div className="flex items-center justify-center mb-4">
                        {isProcessing ? (
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        ) : isListening ? (
                            <div className="relative">
                                <Mic className="h-12 w-12 text-primary animate-pulse" />
                                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500" />
                                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 animate-ping" />
                            </div>
                        ) : (
                            <MicOff className="h-12 w-12 text-muted-foreground" />
                        )}
                    </div>

                    <p className="text-center text-sm">
                        {isProcessing ? "Processing..." : 
                         isListening ? "Listening..." : 
                         "Click the microphone to speak"}
                    </p>

                    {isListening && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    )}
                </div>

                {currentSpeech && (
                    <div className="p-4 rounded-lg bg-muted">
                        <p className="text-sm">{currentSpeech}</p>
                    </div>
                )}

                <div className="flex items-center justify-between p-4 border-t">
                    <LanguageSelector
                        selectedLanguage={selectedLanguage}
                        onLanguageChange={() => {}}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsTTSEnabled(!isTTSEnabled)}
                        className={cn(
                            "transition-colors",
                            isTTSEnabled && "text-green-500 dark:text-green-400"
                        )}
                    >
                        {isSpeaking ? (
                            <Volume2 className="h-4 w-4 animate-pulse" />
                        ) : (
                            isTTSEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SpeechBubble;