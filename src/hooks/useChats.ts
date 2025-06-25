
import { useState } from 'react';

export interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  files?: File[];
}

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([
    { 
      id: '1', 
      title: 'Stress management techniques', 
      timestamp: '2h ago',
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: 'Hello! I\'m here to provide support for your mental health concerns. How are you feeling today?',
          timestamp: new Date()
        }
      ]
    },
    { 
      id: '2', 
      title: 'Dealing with exam anxiety', 
      timestamp: '1d ago',
      messages: [
        {
          id: '2-1',
          role: 'assistant',
          content: 'Hello! I\'m here to provide support for your mental health concerns. How are you feeling today?',
          timestamp: new Date()
        }
      ]
    },
    { 
      id: '3', 
      title: 'Sleep improvement strategies', 
      timestamp: '3d ago',
      messages: [
        {
          id: '3-1',
          role: 'assistant',
          content: 'Hello! I\'m here to provide support for your mental health concerns. How are you feeling today?',
          timestamp: new Date()
        }
      ]
    }
  ]);

  const [activeChat, setActiveChat] = useState<string | null>('1');

  const addNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New conversation',
      timestamp: 'now',
      messages: [
        {
          id: `${Date.now()}-1`,
          role: 'assistant',
          content: 'Hello! I\'m here to provide support for your mental health concerns. How are you feeling today?',
          timestamp: new Date()
        }
      ]
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
    return newChat.id;
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => {
      const remainingChats = prev.filter(chat => chat.id !== chatId);
      if (activeChat === chatId) {
        setActiveChat(remainingChats.length > 0 ? remainingChats[0].id : null);
      }
      return remainingChats;
    });
  };

  const selectChat = (chatId: string) => {
    setActiveChat(chatId);
  };

  const addMessageToChat = (chatId: string, message: Message) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages: [...chat.messages, message] }
        : chat
    ));
  };

  const getCurrentChatMessages = () => {
    if (!activeChat) return [];
    const chat = chats.find(c => c.id === activeChat);
    return chat?.messages || [];
  };

  return {
    chats,
    activeChat,
    addNewChat,
    deleteChat,
    selectChat,
    addMessageToChat,
    getCurrentChatMessages
  };
};
