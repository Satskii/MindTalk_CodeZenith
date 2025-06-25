
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, MessageSquare, Home, Trash2 } from 'lucide-react';
import { useChats } from '@/hooks/useChats';
import DarkModeToggle from '@/components/DarkModeToggle';
import SettingsDialog from '@/components/SettingsDialog';

interface ChatSidebarProps {
  onClose?: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onClose }) => {
  const { chats, activeChat, addNewChat, deleteChat, selectChat } = useChats();

  const handleNewChat = () => {
    addNewChat();
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  return (
    <aside className="h-full flex flex-col bg-sidebar p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold">MindTalk</span>
        </Link>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      <Button 
        className="mb-4 justify-start"
        variant="default"
        onClick={handleNewChat}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        New Chat
      </Button>

      <div className="space-y-1 mb-4 flex-1 overflow-auto">
        <h3 className="text-xs font-medium text-muted-foreground px-2 py-1">
          Recent Conversations
        </h3>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`group relative ${
              activeChat === chat.id ? 'bg-sidebar-accent rounded-md' : ''
            }`}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal px-2 pr-8"
              onClick={() => selectChat(chat.id)}
            >
              <MessageSquare className="mr-2 h-4 w-4 shrink-0" />
              <span className="truncate flex-1">{chat.title}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {chat.timestamp}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => handleDeleteChat(chat.id, e)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-2">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
        <SettingsDialog />
      </div>
    </aside>
  );
};

export default ChatSidebar;
