import React, { useCallback, useRef, useState } from 'react';
import { Message } from '../../types';
import { useToast } from '@chakra-ui/react';

interface ChatWindowProps {
    activeChat: string;
    isTTSEnabled: boolean;
    selectedLanguage: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ activeChat, isTTSEnabled, selectedLanguage }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const isProcessingRef = useRef(false);
    const toast = useToast();

    const handleSendMessage = useCallback(async (message: string) => {
        if (!message.trim() || isProcessingRef.current) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: message,
            timestamp: new Date()
        };

        const assistantMessageId = (Date.now() + 1).toString();
        const assistantPlaceholder: Message = {
            id: assistantMessageId,
            role: 'assistant',
            content: '',
            timestamp: new Date()
        };

        // Insert assistant placeholder directly after the user message
        setMessages(prev => {
            const newMessages = [...prev, userMessage];
            // Find index of the user message just added
            const userIdx = newMessages.findIndex(m => m.id === userMessage.id);
            // Insert assistant placeholder right after user message
            newMessages.splice(userIdx + 1, 0, assistantPlaceholder);
            return newMessages;
        });

        isProcessingRef.current = true;
        setIsProcessing(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, chatId: activeChat }),
            });

            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';

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
                                assistantMessage += data.chunk;
                                setMessages(prev =>
                                    prev.map(m =>
                                        m.id === assistantMessageId
                                            ? { ...m, content: assistantMessage }
                                            : m
                                    )
                                );
                            }
                        } catch (e) {
                            console.error('Error parsing SSE data:', e);
                        }
                    }
                }
            }

            if (isTTSEnabled) {
                await speak(assistantMessage, selectedLanguage);
            }

        } catch (error) {
            setMessages(prev => prev.filter(m => m.id !== assistantMessageId));
            toast({
                title: 'Error',
                description: 'Failed to send message. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            isProcessingRef.current = false;
            setIsProcessing(false);
        }
    }, [activeChat, selectedLanguage, toast, speak, isTTSEnabled]);

    return (
        <div>
            {/* Chat window UI components go here */}
        </div>
    );
};

export default ChatWindow;