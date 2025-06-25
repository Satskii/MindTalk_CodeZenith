<<<<<<< HEAD
import { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SpeechManager } from '@/utils/speechUtils';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Mic, MicOff, PanelLeft, PanelLeftClose, Volume2, VolumeX } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import SpeechBubble from './SpeechBubble';
import StructuredMessage from './StructuredMessage';
import ChatInput from './ChatInput';
import { useSpeech } from '@/utils/useSpeech';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}
=======
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose, Paperclip } from 'lucide-react';
import ChatInput from '@/components/ChatInput';
import SuicidePreventionAlert from '@/components/SuicidePreventionAlert';
import { detectCrisisLanguage } from '@/utils/crisisDetection';
import { speechManager } from '@/utils/speechUtils';
import { useChats, Message } from '@/hooks/useChats';
>>>>>>> 4bde7f1d7308e78fb1491a310690c6995e1ca8e9

interface ChatInterfaceProps {
    onToggleSidebar?: () => void;
    sidebarHidden?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onToggleSidebar, sidebarHidden }) => {
<<<<<<< HEAD
    const [activeChat] = useState<string>('default-chat');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! I\'m here to provide support for your mental health concerns. How are you feeling today?',
            timestamp: new Date()
        }
    ]);
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentSpeech, setCurrentSpeech] = useState('');
    const [isSpeechMode, setIsSpeechMode] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
    const [isTTSEnabled, setIsTTSEnabled] = useState(false);
    const { speak, stopSpeaking, isSpeaking } = useSpeech();
    const { toast } = useToast();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const speechManagerRef = useRef<SpeechManager | null>(null);
    const accumulatedTextRef = useRef('');
    const isProcessingRef = useRef(false);
    const voiceModeRef = useRef(false);
=======
  const { activeChat, addMessageToChat, getCurrentChatMessages } = useChats();
  const messages = getCurrentChatMessages();
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
>>>>>>> 4bde7f1d7308e78fb1491a310690c6995e1ca8e9

    const handleVoiceModeError = useCallback(() => {
        setIsSpeechMode(false);
        voiceModeRef.current = false;
        setIsListening(false);
        setCurrentSpeech('');
        accumulatedTextRef.current = '';
    }, []);

    const handleSendMessage = useCallback(async (message: string) => {
        if (!message.trim() || isProcessingRef.current) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: message,
            timestamp: new Date()
        };

        // Add user message immediately
        setMessages(prev => [...prev, userMessage]);

        // Create a new message ID for assistant's response
        const assistantMessageId = (Date.now() + 1).toString();
        const assistantMessage: Message = {
            id: assistantMessageId,
            role: 'assistant',
            content: '',
            timestamp: new Date()
        };

<<<<<<< HEAD
        // Add empty assistant message
        setMessages(prev => [...prev, assistantMessage]);

        isProcessingRef.current = true;
        setIsProcessing(true);
        setIsListening(false);

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    chat_id: activeChat,
                    language: selectedLanguage
                })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const reader = response.body?.getReader();
            if (!reader) throw new Error('Response body is null');

            let accumulatedMessage = '';
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            if (data.chunk) {
                                accumulatedMessage += data.chunk;
                                // Update the assistant's message with accumulated content
                                setMessages(prev => prev.map(m =>
                                    m.id === assistantMessageId
                                        ? { ...m, content: accumulatedMessage }
                                        : m
                                ));
                            }
                        } catch (e) {
                            console.error('Error parsing SSE data:', e);
                        }
                    }
                }
            }

            if (isTTSEnabled) {
                await speak(accumulatedMessage, selectedLanguage);
            }

        } catch (error) {
            console.error('Failed to send message:', error);
            // Remove the assistant message if there was an error
            setMessages(prev => prev.filter(m => m.id !== assistantMessageId));
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to send message",
                variant: "destructive"
            });
        } finally {
            isProcessingRef.current = false;
            setIsProcessing(false);
        }
    }, [activeChat, selectedLanguage, toast, speak, isTTSEnabled]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
=======
  const handleSendMessage = (content: string, files?: File[]) => {
    if (!content.trim() && (!files || files.length === 0)) return;
    if (!activeChat) return;
    
    // Stop any ongoing speech
    if (isSpeaking) {
      speechManager.stopSpeaking();
      setIsSpeaking(false);
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      files
    };
    
    addMessageToChat(activeChat, userMessage);
    
    // Check for crisis language
    const hasCrisisLanguage = detectCrisisLanguage(content);
    if (hasCrisisLanguage) {
      setShowCrisisAlert(true);
      toast({
        title: "Support Resources Available",
        description: "We've detected concerning language. Help is available.",
        variant: "destructive",
      });
    }
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(content, hasCrisisLanguage, files),
        timestamp: new Date()
      };
      
      addMessageToChat(activeChat, assistantMessage);
    }, 1000);
  };
>>>>>>> 4bde7f1d7308e78fb1491a310690c6995e1ca8e9

    const handleStartSpeechMode = useCallback(async () => {
        if (!speechManagerRef.current) return;

        try {
            voiceModeRef.current = true;
            setIsSpeechMode(true);
            setIsListening(true);

            await speechManagerRef.current.startContinuousListening(
                () => {
                    setCurrentSpeech('');
                    setIsProcessing(false);
                },
                selectedLanguage
            );
        } catch (error) {
            console.error('Voice interaction error:', error);
            toast({
                title: "Voice Input Error",
                description: "Failed to start voice recognition. Please try again.",
                variant: "destructive",
            });
            handleVoiceModeError();
        }
    }, [selectedLanguage, toast, handleVoiceModeError]);

    const handleStopSpeechMode = useCallback(() => {
        if (speechManagerRef.current) {
            speechManagerRef.current.stopListening();
            speechManagerRef.current.stopTTS();
        }
        voiceModeRef.current = false;
        setIsSpeechMode(false);
        setIsListening(false);
        setCurrentSpeech('');
        accumulatedTextRef.current = '';
    }, []);

    const restartListening = useCallback(async () => {
        if (voiceModeRef.current && speechManagerRef.current && !isProcessingRef.current) {
            try {
                await speechManagerRef.current.startContinuousListening(
                    () => {
                        setCurrentSpeech('');
                        setIsProcessing(false);
                    },
                    selectedLanguage
                );
                setIsListening(true);
            } catch (error) {
                console.error('Failed to restart listening:', error);
                handleVoiceModeError();
            }
        }
    }, [selectedLanguage, handleVoiceModeError]);

    // Initialize speech recognition with improved handlers
    useEffect(() => {
        speechManagerRef.current = new SpeechManager({
            onResult: (text: string) => {
                if (voiceModeRef.current) {
                    setCurrentSpeech(text);
                    accumulatedTextRef.current = text;
                }
            },
            onEnd: () => {
                setIsListening(false);
                if (voiceModeRef.current && !isProcessingRef.current && accumulatedTextRef.current.trim()) {
                    handleSendMessage(accumulatedTextRef.current.trim());
                    accumulatedTextRef.current = '';
                }
            },
            onError: (error: string) => {
                toast({
                    title: "Voice Input Error",
                    description: error,
                    variant: "destructive"
                });
                setIsListening(false);
                handleVoiceModeError();
            },
            onPause: () => {
                if (voiceModeRef.current && !isProcessingRef.current && accumulatedTextRef.current.trim()) {
                    handleSendMessage(accumulatedTextRef.current.trim());
                    accumulatedTextRef.current = '';
                    restartListening();
                }
            }
        });

        return () => {
            if (speechManagerRef.current) {
                speechManagerRef.current.stopListening();
                speechManagerRef.current.stopTTS();
            }
        };
    }, [handleSendMessage, handleVoiceModeError, toast, restartListening]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Add TTS handler    // All duplicated function declarations are removed since they are already defined above

    useEffect(() => {
        return () => {
            stopSpeaking();
        };
    }, [stopSpeaking]);

    return (
        <div className="h-full flex flex-col justify-between bg-background rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                    {onToggleSidebar && (
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={onToggleSidebar}
                        >
                            {sidebarHidden ? <PanelLeft /> : <PanelLeftClose />}
                        </Button>
                    )}
                    <LanguageSelector 
                        selectedLanguage={selectedLanguage} 
                        onLanguageChange={setSelectedLanguage}
                    />
                </div>
                
                <div className="flex items-center gap-2">
                    {/* TTS Toggle Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "rounded-full transition-colors",
                            isTTSEnabled && "bg-primary/10 text-primary",
                            isSpeaking && "animate-pulse"
                        )}
                        onClick={() => setIsTTSEnabled(!isTTSEnabled)}
                        title={isTTSEnabled ? "Disable Text-to-Speech" : "Enable Text-to-Speech"}
                    >
                        {isTTSEnabled ? (
                            <Volume2 className="h-5 w-5" />
                        ) : (
                            <VolumeX className="h-5 w-5" />
                        )}
                    </Button>

                    {/* Voice Input Button */}
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            "rounded-full h-10 w-10 transition-all duration-200",
                            isListening && "bg-red-500 text-white hover:bg-red-600"
                        )}
                        onClick={isSpeechMode ? handleStopSpeechMode : handleStartSpeechMode}
                    >
                        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                    <StructuredMessage
                        key={message.id}
                        content={message.content}
                        isUser={message.role === 'user'}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Add Chat Input */}
            <ChatInput 
                onSendMessage={handleSendMessage}
                selectedLanguage={selectedLanguage}
            />

            {isSpeechMode && (
                <SpeechBubble
                    isListening={isListening}
                    isProcessing={isProcessing}
                    currentSpeech={currentSpeech}
                    onClose={handleStopSpeechMode}
                />
            )}
        </div>
    );
};

export default ChatInterface;