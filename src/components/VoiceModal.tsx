import React from 'react';
import { Mic, MicOff, Loader2, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    isListening: boolean;
    isSpeaking: boolean;
    currentSpeech: string;
}

const VoiceModal: React.FC<VoiceModalProps> = ({
    isOpen,
    onClose,
    isListening,
    isSpeaking,
    currentSpeech
}) => {
    if (!isOpen) return null;

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
                        {isListening ? (
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
                        {isListening ? "Listening..." : "Click the microphone to speak"}
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

                <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                        {isSpeaking ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary animate-pulse"
                            >
                                <Volume2 className="h-4 w-4 mr-2" />
                                Speaking...
                            </Button>
                        ) : (
                            <Button variant="ghost" size="sm" disabled>
                                <VolumeX className="h-4 w-4 mr-2" />
                                Not Speaking
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceModal;