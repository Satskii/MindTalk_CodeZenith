<<<<<<< HEAD
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, VolumeX, Volume2, Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { SpeechManager } from '@/utils/speechUtils';
import { isChromeOrEdge } from '@/utils/browserChecks';
=======

import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Paperclip, X, Mic, MicOff, Volume2, VolumeX, Phone, Languages } from 'lucide-react';
import { speechManager } from '@/utils/speechUtils';
import { useToast } from "@/hooks/use-toast";
import LiveVoiceChat from '@/components/LiveVoiceChat';
>>>>>>> 4bde7f1d7308e78fb1491a310690c6995e1ca8e9

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    selectedLanguage?: string;
    lastAssistantMessage?: string;
    isVoiceMode?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
    onSendMessage,
    selectedLanguage = 'en',
    lastAssistantMessage,
    isVoiceMode = false
}) => {
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isInitializingVoice, setIsInitializingVoice] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const speechManagerRef = useRef<SpeechManager | null>(null);
    const { toast } = useToast();

<<<<<<< HEAD
    // Handle text input
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };
=======
const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isSpeaking, onToggleSpeech }) => {
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [showLiveVoiceChat, setShowLiveVoiceChat] = useState(false);
  const [outputLanguage, setOutputLanguage] = useState('en');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
>>>>>>> 4bde7f1d7308e78fb1491a310690c6995e1ca8e9

    // Handle Enter key
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Disable input when in voice mode
    useEffect(() => {
        if (isVoiceMode) {
            setInput('');
        }
    }, [isVoiceMode]);

    const handleSendMessage = useCallback(() => {
        if (input.trim()) {
            onSendMessage(input.trim());
            setInput('');
            if (isListening) {
                speechManagerRef.current?.stopListening();
                setIsListening(false);
            }
        }
    }, [input, onSendMessage, isListening]);

    // Initialize speech recognition
    useEffect(() => {
        if (!isChromeOrEdge()) {
            toast({
                title: "Browser Not Supported",
                description: "Voice features work best in Chrome or Edge. Please switch browsers for the best experience.",
                variant: "destructive"
            });
            return;
        }

        speechManagerRef.current = new SpeechManager({
            onResult: (text: string) => {
                setInput(text);
            },
            onEnd: () => {
                setIsListening(false);
            },
            onError: (error: string) => {
                toast({
                    title: "Voice Input Error",
                    description: error,
                    variant: "destructive"
                });
                setIsListening(false);
                setIsInitializingVoice(false);
            },
            onPause: () => {
                if (input.trim()) {
                    handleSendMessage();
                }
            }
        });

        return () => {
            if (speechManagerRef.current) {
                speechManagerRef.current.stopListening();
                speechManagerRef.current.stopTTS();
            }
        };
    }, [toast, handleSendMessage, input]);

    // Toggle voice input
    const toggleVoiceInput = async () => {
        if (!speechManagerRef.current) return;

        try {
            setIsInitializingVoice(true);
            
            if (!isListening) {
                await speechManagerRef.current.startContinuousListening(
                    () => setIsListening(true),
                    selectedLanguage
                );
            } else {
                await speechManagerRef.current.stopListening();
                setIsListening(false);
            }
        } catch (error) {
            console.error('Voice input error:', error);
            toast({
                title: "Voice Input Error",
                description: error instanceof Error ? error.message : "Failed to start voice input",
                variant: "destructive"
            });
        } finally {
            setIsInitializingVoice(false);
        }
    };

    // Toggle TTS for assistant message
    const toggleTTS = async () => {
        if (!speechManagerRef.current || !lastAssistantMessage) return;

        try {
            if (isSpeaking) {
                speechManagerRef.current.stopTTS();
                setIsSpeaking(false);
            } else {
                setIsSpeaking(true);
                await speechManagerRef.current.playTTS(lastAssistantMessage, selectedLanguage);
                setIsSpeaking(false);
            }
        } catch (error) {
            console.error('TTS error:', error);
            toast({
                title: "TTS Error",
                description: "Failed to play audio response",
                variant: "destructive"
            });
            setIsSpeaking(false);
        }
    };

<<<<<<< HEAD
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder={isVoiceMode ? "Voice mode active..." : "Type your message..."}
                    disabled={isVoiceMode}
                    className="flex-1 min-h-[60px] max-h-[200px]"
                    rows={1}
                />
                <div className="flex flex-col space-y-2">
                    {!isVoiceMode && (
                        <Button
                            size="icon"
                            variant={isListening ? "default" : "outline"}
                            onClick={toggleVoiceInput}
                            disabled={isInitializingVoice}
                            className={cn(
                                "relative",
                                isInitializingVoice && "opacity-50 cursor-not-allowed"
                            )}
                            title={isListening ? "Stop listening" : "Start voice input"}
                        >
                            {isInitializingVoice ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                </div>
                            ) : isListening ? (
                                <Mic className="h-4 w-4 animate-pulse" />
                            ) : (
                                <MicOff className="h-4 w-4" />
                            )}
                        </Button>
                    )}
                    {lastAssistantMessage && !isVoiceMode && (
                        <Button
                            size="icon"
                            variant={isSpeaking ? "default" : "outline"}
                            onClick={toggleTTS}
                            className={isSpeaking ? "animate-pulse" : ""}
                            title={isSpeaking ? "Stop speaking" : "Read last message"}
                        >
                            {isSpeaking ? (
                                <VolumeX className="h-4 w-4" />
                            ) : (
                                <Volume2 className="h-4 w-4" />
                            )}
                        </Button>
                    )}
                    <Button
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isVoiceMode}
                        title="Send message"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
=======
  const toggleSpeechOutput = () => {
    setSpeechEnabled(!speechEnabled);
    onToggleSpeech?.();
    
    if (speechEnabled) {
      speechManager.stopSpeaking();
    }
    
    toast({
      title: speechEnabled ? "Speech output disabled" : "Speech output enabled",
      description: speechEnabled ? 
        "AI responses will no longer be read aloud." : 
        "AI responses will be read aloud.",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getLanguageName = (code: string) => {
    switch (code) {
      case 'en': return 'English';
      case 'bn': return 'Bengali';
      case 'hi': return 'Hindi';
      default: return 'English';
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="chat-input-container">
        {/* Language Selection Toolbar */}
        <div className="flex items-center justify-between mb-3 p-2 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Languages className="h-4 w-4" />
            <span>Output Language:</span>
          </div>
          <Select value={outputLanguage} onValueChange={setOutputLanguage}>
            <SelectTrigger className="w-36 h-8 text-sm">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="bn">Bengali</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File previews */}
        {uploadedFiles.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {uploadedFiles.map((uploadedFile, index) => (
              <div key={index} className="relative bg-muted rounded-lg p-2 flex items-center gap-2 max-w-xs shadow-sm">
                {uploadedFile.preview ? (
                  <img 
                    src={uploadedFile.preview} 
                    alt={uploadedFile.file.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(uploadedFile.file.size)}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-end gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 flex-shrink-0 rounded-lg hover:bg-muted transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-10 w-10 flex-shrink-0 rounded-lg transition-colors ${
              isListening ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'hover:bg-muted'
            }`}
            onClick={handleMicrophoneClick}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-10 w-10 flex-shrink-0 rounded-lg transition-colors ${
              speechEnabled ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' : 'hover:bg-muted'
            }`}
            onClick={toggleSpeechOutput}
            title={speechEnabled ? "Disable speech output" : "Enable speech output"}
          >
            {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 flex-shrink-0 rounded-lg hover:bg-green-100 hover:text-green-600 transition-colors"
            onClick={() => setShowLiveVoiceChat(true)}
            title="Start live voice conversation"
          >
            <Phone className="h-4 w-4" />
          </Button>
          
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              placeholder="Type your message here or use voice input..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[40px] max-h-[160px] resize-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-0 px-0 py-2"
            />
          </div>
          
          <Button 
            type="submit" 
            size="icon" 
            className="h-10 w-10 bg-mental-primary hover:bg-mental-primary/90 rounded-lg flex-shrink-0 transition-colors"
            disabled={!message.trim() && uploadedFiles.length === 0}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt,.rtf"
          onChange={handleFileUpload}
          className="hidden"
        />
      </form>

      {showLiveVoiceChat && (
        <LiveVoiceChat onClose={() => setShowLiveVoiceChat(false)} />
      )}
    </>
  );
>>>>>>> 4bde7f1d7308e78fb1491a310690c6995e1ca8e9
};

export default ChatInput;
