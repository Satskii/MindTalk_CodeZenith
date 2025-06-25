
import React, { useState } from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import ChatInterface from '@/components/ChatInterface';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const Chat: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleSidebarVisibility = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-hidden">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button 
            onClick={toggleMobileSidebar}
            className="p-2 bg-background border rounded-md shadow-sm"
          >
            {isMobileSidebarOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* Mobile sidebar */}
        <div className={`fixed inset-0 z-40 md:hidden ${isMobileSidebarOpen ? 'block' : 'hidden'}`}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-3/4 max-w-xs bg-background">
            <ChatSidebar onClose={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:block h-full">
          {isSidebarHidden ? (
            // Full screen chat interface
            <ChatInterface onToggleSidebar={toggleSidebarVisibility} sidebarHidden={true} />
          ) : (
            // Resizable layout with sidebar
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={25} minSize={15}>
                <ChatSidebar />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={75} minSize={30}>
                <ChatInterface onToggleSidebar={toggleSidebarVisibility} sidebarHidden={false} />
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </div>

        {/* Mobile chat interface (when sidebar is closed) */}
        <div className="md:hidden h-full">
          {!isMobileSidebarOpen && <ChatInterface />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
