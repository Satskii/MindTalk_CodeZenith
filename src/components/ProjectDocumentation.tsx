import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Code, Palette, MessageSquare, Brain, Mic, Phone, Languages, Shield, Zap, Database, Settings, Download, FileDown } from 'lucide-react';

const ProjectDocumentation: React.FC = () => {
  const downloadAsHTML = () => {
    const documentContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Mental Health Support Platform - Technical Documentation</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
    h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
    h2 { color: #1e40af; margin-top: 30px; }
    h3 { color: #1e3a8a; margin-top: 25px; }
    h4 { color: #1e293b; margin-top: 20px; }
    .section { margin: 25px 0; padding: 20px; border-left: 4px solid #e5e7eb; }
    .code-block { background: #f3f4f6; padding: 15px; border-radius: 8px; font-family: monospace; overflow-x: auto; }
    .feature-list { background: #f8fafc; padding: 15px; border-radius: 8px; }
    ul { margin: 10px 0; }
    li { margin: 5px 0; }
  </style>
</head>
<body>
  <h1>🧠 Mental Health Support Platform - Complete Technical Documentation</h1>
  
  <div class="section">
    <h2>🏗️ Project Architecture & Structure</h2>
    <div class="feature-list">
      <h4>Technology Stack:</h4>
      <p>React 18.3.1 + TypeScript + Vite + Tailwind CSS + shadcn/ui + React Router DOM</p>
      
      <h4>Project Structure:</h4>
      <div class="code-block">
src/
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── ChatInput.tsx (287 lines - needs refactoring)
│   ├── ChatInterface.tsx (213 lines - needs refactoring)
│   ├── ChatSidebar.tsx
│   ├── DarkModeToggle.tsx
│   ├── LandingHero.tsx
│   ├── LiveVoiceChat.tsx
│   ├── Navbar.tsx
│   ├── ProjectDocumentation.tsx
│   ├── ResizablePanel.tsx
│   ├── SettingsDialog.tsx
│   └── SuicidePreventionAlert.tsx
├── hooks/
│   ├── useChats.ts
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── pages/
│   ├── Index.tsx
│   ├── Chat.tsx
│   └── NotFound.tsx
├── utils/
│   ├── crisisDetection.ts
│   └── speechUtils.ts
└── lib/
    └── utils.ts
      </div>
    </div>
  </div>

  <div class="section">
    <h2>🧩 Complete Component Specifications</h2>
    
    <h3>📱 Pages Implementation</h3>
    <div class="feature-list">
      <h4>src/pages/Index.tsx:</h4>
      <ul>
        <li>Landing page with min-h-screen and landing-gradient background</li>
        <li>Contains Navbar and LandingHero components</li>
        <li>Container with responsive padding (px-4 pt-16 md:pt-24 pb-16)</li>
        <li>Uses React Router for navigation</li>
      </ul>

      <h4>src/pages/Chat.tsx:</h4>
      <ul>
        <li>Full-screen chat layout with ResizablePanelGroup</li>
        <li>Mobile sidebar toggle with fixed positioning</li>
        <li>Desktop: ResizablePanel with 25% sidebar, 75% chat (adjustable)</li>
        <li>Mobile: Overlay sidebar with backdrop blur</li>
        <li>Sidebar hide/show functionality for full-screen chat</li>
        <li>State management: isMobileSidebarOpen, isSidebarHidden</li>
      </ul>
    </div>

    <h3>🎨 Core UI Components</h3>
    <div class="feature-list">
      <h4>LandingHero.tsx:</h4>
      <ul>
        <li>Centered layout with animate-fade-in</li>
        <li>Hero title with gradient text (mental-primary to mental-secondary)</li>
        <li>CTA button with animate-bounce-subtle to /chat route</li>
        <li>ProjectDocumentation component integration</li>
        <li>3-column feature cards (Confidential, 24/7 Support, Resource Connection)</li>
        <li>Uses shadcn/ui Card components with CardContent pt-6</li>
      </ul>

      <h4>Navbar.tsx:</h4>
      <ul>
        <li>Fixed top navigation with backdrop blur</li>
        <li>Logo with Brain icon + "MindfulChat" text</li>
        <li>React Router Link components for navigation</li>
        <li>DarkModeToggle component integration</li>
        <li>Responsive design with mobile menu</li>
        <li>Mental health themed colors</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>💬 Chat System Implementation Details</h2>
    
    <h3>useChats.ts Hook (State Management):</h3>
    <div class="feature-list">
      <h4>Interfaces:</h4>
      <div class="code-block">
interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  files?: File[];
}
      </div>
      
      <h4>Functions:</h4>
      <ul>
        <li>addNewChat() - Creates new conversation with default assistant message</li>
        <li>deleteChat(chatId) - Removes chat and handles active chat switching</li>
        <li>selectChat(chatId) - Sets active chat</li>
        <li>addMessageToChat(chatId, message) - Appends message to specific chat</li>
        <li>getCurrentChatMessages() - Returns messages for active chat</li>
      </ul>
      
      <h4>Default Data:</h4>
      <p>3 sample conversations: "Stress management techniques", "Dealing with exam anxiety", "Sleep improvement strategies"</p>
    </div>

    <h3>ChatInput.tsx (287 lines - Advanced Input):</h3>
    <div class="feature-list">
      <h4>Key Features:</h4>
      <ul>
        <li>Language selection toolbar (English, Bengali, Hindi)</li>
        <li>File upload with image preview and document support</li>
        <li>Speech-to-text with microphone access handling</li>
        <li>Text-to-speech toggle functionality</li>
        <li>Live voice chat trigger button</li>
        <li>Auto-resizing textarea with keyboard shortcuts (Ctrl+Enter)</li>
        <li>Compact button layout with gap-1 spacing</li>
      </ul>
      
      <h4>State Management:</h4>
      <ul>
        <li>selectedLanguage: 'english' | 'bengali' | 'hindi'</li>
        <li>isListening: boolean for speech recognition</li>
        <li>isSpeaking: boolean for text-to-speech</li>
        <li>selectedFiles: File[] for attachments</li>
        <li>message: string for input content</li>
      </ul>
      
      <h4>UI Layout:</h4>
      <p>Language toolbar → File upload area → Main input with integrated controls → Send button</p>
    </div>

    <h3>ChatInterface.tsx (213 lines - Main Chat UI):</h3>
    <div class="feature-list">
      <h4>Layout Structure:</h4>
      <ul>
        <li>Header with chat title and sidebar toggle</li>
        <li>Messages area with auto-scroll to bottom</li>
        <li>Message rendering with role-based styling</li>
        <li>File attachment display (images with preview)</li>
        <li>ChatInput component integration</li>
        <li>LiveVoiceChat modal integration</li>
      </ul>
      
      <h4>Message Handling:</h4>
      <ul>
        <li>Real-time message appending to active chat</li>
        <li>Auto-scroll behavior on new messages</li>
        <li>File size formatting utilities</li>
        <li>Message timestamp display</li>
      </ul>
    </div>

    <h3>ChatSidebar.tsx (Conversation Management):</h3>
    <div class="feature-list">
      <h4>Features:</h4>
      <ul>
        <li>New chat creation button</li>
        <li>Chat list with active chat highlighting</li>
        <li>Chat deletion with confirmation</li>
        <li>Responsive mobile overlay functionality</li>
        <li>Chat title and timestamp display</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>🎙️ Voice Integration & Advanced Features</h2>
    
    <h3>speechUtils.ts - Web Speech API Integration:</h3>
    <div class="feature-list">
      <h4>Functions:</h4>
      <ul>
        <li>startSpeechRecognition(onResult, onError) - Continuous speech recognition</li>
        <li>stopSpeechRecognition() - Stops active recognition</li>
        <li>speakText(text, onEnd) - Text-to-speech synthesis</li>
        <li>stopSpeaking() - Interrupts current speech</li>
        <li>isSpeechRecognitionSupported() - Browser compatibility check</li>
      </ul>
      
      <h4>Configuration:</h4>
      <ul>
        <li>Language: 'en-US' for recognition</li>
        <li>Continuous: true for ongoing listening</li>
        <li>InterimResults: true for real-time feedback</li>
        <li>Error handling for permissions and browser support</li>
      </ul>
    </div>

    <h3>LiveVoiceChat.tsx - Custom Backend Integration:</h3>
    <div class="feature-list">
      <h4>Backend Endpoints:</h4>
      <ul>
        <li>GET /health - Connection health check</li>
        <li>POST /process-audio - Audio processing endpoint</li>
        <li>FormData with audio blob for real-time processing</li>
      </ul>
      
      <h4>Features:</h4>
      <ul>
        <li>WebSocket-style real-time communication</li>
        <li>Audio recording with MediaRecorder API</li>
        <li>Connection status monitoring</li>
        <li>Modal dialog interface with proper cleanup</li>
        <li>Error handling and user feedback</li>
      </ul>
      
      <h4>State Management:</h4>
      <ul>
        <li>isConnected: boolean for backend status</li>
        <li>isRecording: boolean for audio capture</li>
        <li>mediaRecorder: MediaRecorder instance</li>
        <li>connectionStatus: string for user feedback</li>
      </ul>
    </div>

    <h3>Crisis Detection & Safety Features:</h3>
    <div class="feature-list">
      <h4>crisisDetection.ts Implementation:</h4>
      <ul>
        <li>Keyword-based detection algorithm</li>
        <li>Crisis keywords array for monitoring</li>
        <li>detectCrisisKeywords(message) function</li>
        <li>Real-time message scanning</li>
      </ul>
      
      <h4>SuicidePreventionAlert.tsx:</h4>
      <ul>
        <li>Emergency alert dialog component</li>
        <li>Crisis hotline numbers display</li>
        <li>Professional resource connections</li>
        <li>Immediate intervention messaging</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>🎨 Design System & Styling Specifications</h2>
    
    <h3>Custom CSS Classes & Animations:</h3>
    <div class="feature-list">
      <h4>Custom Tailwind Classes:</h4>
      <ul>
        <li>.landing-gradient - Hero section background</li>
        <li>.hero-title - Large heading with responsive sizing</li>
        <li>.hero-subtitle - Subtitle with muted coloring</li>
        <li>.cta-button - Primary call-to-action styling</li>
        <li>.animate-fade-in - Smooth entrance animation</li>
        <li>.animate-bounce-subtle - Gentle bounce effect</li>
      </ul>
      
      <h4>Mental Health Color Palette:</h4>
      <ul>
        <li>mental-primary: Calming blue tones</li>
        <li>mental-secondary: Supporting accent colors</li>
        <li>Background gradients for welcoming atmosphere</li>
        <li>High contrast for accessibility</li>
      </ul>
    </div>

    <h3>shadcn/ui Integration:</h3>
    <div class="feature-list">
      <h4>Components Used:</h4>
      <ul>
        <li>Button (multiple variants: default, outline, ghost)</li>
        <li>Card, CardContent for feature sections</li>
        <li>Dialog, DialogContent, DialogHeader for modals</li>
        <li>ScrollArea for long content areas</li>
        <li>ResizablePanel, ResizablePanelGroup for layout</li>
        <li>Textarea with auto-resize functionality</li>
        <li>Toast/Sonner for notifications</li>
      </ul>
      
      <h4>Responsive Design:</h4>
      <ul>
        <li>Mobile-first approach with md: breakpoints</li>
        <li>Collapsible sidebar for mobile devices</li>
        <li>Touch-friendly button sizing</li>
        <li>Optimized chat interface for all screen sizes</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>📦 Dependencies & Configuration</h2>
    
    <div class="feature-list">
      <h4>Core Dependencies:</h4>
      <ul>
        <li>react: ^18.3.1 + react-dom: ^18.3.1</li>
        <li>@tanstack/react-query: ^5.56.2 (data fetching)</li>
        <li>react-router-dom: ^6.26.2 (routing)</li>
        <li>lucide-react: ^0.462.0 (icons)</li>
        <li>next-themes: ^0.3.0 (dark mode)</li>
        <li>sonner: ^1.5.0 (toast notifications)</li>
      </ul>
      
      <h4>UI Library Dependencies:</h4>
      <ul>
        <li>@radix-ui/* packages for accessible components</li>
        <li>class-variance-authority: ^0.7.1 (component variants)</li>
        <li>clsx: ^2.1.1 + tailwind-merge: ^2.5.2 (utility functions)</li>
        <li>react-resizable-panels: ^2.1.3 (resizable layout)</li>
      </ul>
      
      <h4>Build Tools:</h4>
      <ul>
        <li>Vite as build tool and dev server</li>
        <li>TypeScript for type safety</li>
        <li>Tailwind CSS for styling</li>
        <li>tailwindcss-animate for animations</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>⚙️ Implementation Notes & Best Practices</h2>
    
    <div class="feature-list">
      <h4>Code Organization:</h4>
      <ul>
        <li>Components are focused and single-responsibility</li>
        <li>Custom hooks for state management (useChats)</li>
        <li>Utility functions separated into utils/ directory</li>
        <li>TypeScript interfaces defined close to usage</li>
        <li>Consistent naming conventions throughout</li>
      </ul>

      <h4>Performance Considerations:</h4>
      <ul>
        <li>React.memo for preventing unnecessary re-renders</li>
        <li>Lazy loading for non-critical components</li>
        <li>Efficient state updates in useChats hook</li>
        <li>Proper cleanup in voice chat components</li>
        <li>File size validation for uploads</li>
      </ul>

      <h4>Accessibility Features:</h4>
      <ul>
        <li>Proper ARIA labels for interactive elements</li>
        <li>Keyboard navigation support</li>
        <li>High contrast color schemes</li>
        <li>Screen reader friendly structure</li>
        <li>Focus management in modals</li>
      </ul>

      <h4>Security & Privacy:</h4>
      <ul>
        <li>Client-side only implementation (no data persistence)</li>
        <li>Secure file upload handling</li>
        <li>Input validation and sanitization</li>
        <li>Crisis detection for user safety</li>
        <li>Microphone permission handling</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>🔧 Current Technical Debt & Refactoring Needs</h2>
    
    <div class="feature-list">
      <h4>Files Requiring Refactoring:</h4>
      <p><strong>ChatInput.tsx (287 lines):</strong></p>
      <ul>
        <li>Split into: InputField, LanguageSelector, FileUpload, VoiceControls</li>
        <li>Extract speech recognition logic to custom hook</li>
        <li>Separate file handling utilities</li>
      </ul>
      
      <p><strong>ChatInterface.tsx (213 lines):</strong></p>
      <ul>
        <li>Split into: ChatHeader, MessageList, MessageItem components</li>
        <li>Extract message rendering logic</li>
        <li>Create dedicated file preview component</li>
      </ul>
      
      <p><strong>ProjectDocumentation.tsx (305+ lines):</strong></p>
      <ul>
        <li>Break into smaller documentation sections</li>
        <li>Create reusable documentation components</li>
        <li>Implement collapsible sections for better UX</li>
      </ul>
    </div>
  </div>

</body>
</html>
    `;

    const blob = new Blob([documentContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mental_Health_Platform_Technical_Documentation.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsMarkdown = () => {
    const markdownContent = `# 🧠 Mental Health Support Platform - Complete Technical Documentation

## 🏗️ Project Architecture & Structure

### Technology Stack:
React 18.3.1 + TypeScript + Vite + Tailwind CSS + shadcn/ui + React Router DOM

### Project Structure:
\`\`\`
src/
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── ChatInput.tsx (287 lines - needs refactoring)
│   ├── ChatInterface.tsx (213 lines - needs refactoring)
│   ├── ChatSidebar.tsx
│   ├── DarkModeToggle.tsx
│   ├── LandingHero.tsx
│   ├── LiveVoiceChat.tsx
│   ├── Navbar.tsx
│   ├── ProjectDocumentation.tsx
│   ├── ResizablePanel.tsx
│   ├── SettingsDialog.tsx
│   └── SuicidePreventionAlert.tsx
├── hooks/
│   ├── useChats.ts
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── pages/
│   ├── Index.tsx
│   ├── Chat.tsx
│   └── NotFound.tsx
├── utils/
│   ├── crisisDetection.ts
│   └── speechUtils.ts
└── lib/
    └── utils.ts
\`\`\`

## 🧩 Complete Component Specifications

### 📱 Pages Implementation

#### src/pages/Index.tsx:
- Landing page with min-h-screen and landing-gradient background
- Contains Navbar and LandingHero components
- Container with responsive padding (px-4 pt-16 md:pt-24 pb-16)
- Uses React Router for navigation

#### src/pages/Chat.tsx:
- Full-screen chat layout with ResizablePanelGroup
- Mobile sidebar toggle with fixed positioning
- Desktop: ResizablePanel with 25% sidebar, 75% chat (adjustable)
- Mobile: Overlay sidebar with backdrop blur
- Sidebar hide/show functionality for full-screen chat
- State management: isMobileSidebarOpen, isSidebarHidden

### 🎨 Core UI Components

#### LandingHero.tsx:
- Centered layout with animate-fade-in
- Hero title with gradient text (mental-primary to mental-secondary)
- CTA button with animate-bounce-subtle to /chat route
- ProjectDocumentation component integration
- 3-column feature cards (Confidential, 24/7 Support, Resource Connection)
- Uses shadcn/ui Card components with CardContent pt-6

#### Navbar.tsx:
- Fixed top navigation with backdrop blur
- Logo with Brain icon + "MindfulChat" text
- React Router Link components for navigation
- DarkModeToggle component integration
- Responsive design with mobile menu
- Mental health themed colors

## 💬 Chat System Implementation Details

### useChats.ts Hook (State Management):

#### Interfaces:
\`\`\`typescript
interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  files?: File[];
}
\`\`\`

#### Functions:
- addNewChat() - Creates new conversation with default assistant message
- deleteChat(chatId) - Removes chat and handles active chat switching
- selectChat(chatId) - Sets active chat
- addMessageToChat(chatId, message) - Appends message to specific chat
- getCurrentChatMessages() - Returns messages for active chat

#### Default Data:
3 sample conversations: "Stress management techniques", "Dealing with exam anxiety", "Sleep improvement strategies"

### ChatInput.tsx (287 lines - Advanced Input):

#### Key Features:
- Language selection toolbar (English, Bengali, Hindi)
- File upload with image preview and document support
- Speech-to-text with microphone access handling
- Text-to-speech toggle functionality
- Live voice chat trigger button
- Auto-resizing textarea with keyboard shortcuts (Ctrl+Enter)
- Compact button layout with gap-1 spacing

#### State Management:
- selectedLanguage: 'english' | 'bengali' | 'hindi'
- isListening: boolean for speech recognition
- isSpeaking: boolean for text-to-speech
- selectedFiles: File[] for attachments
- message: string for input content

#### UI Layout:
Language toolbar → File upload area → Main input with integrated controls → Send button

### ChatInterface.tsx (213 lines - Main Chat UI):

#### Layout Structure:
- Header with chat title and sidebar toggle
- Messages area with auto-scroll to bottom
- Message rendering with role-based styling
- File attachment display (images with preview)
- ChatInput component integration
- LiveVoiceChat modal integration

#### Message Handling:
- Real-time message appending to active chat
- Auto-scroll behavior on new messages
- File size formatting utilities
- Message timestamp display

### ChatSidebar.tsx (Conversation Management):

#### Features:
- New chat creation button
- Chat list with active chat highlighting
- Chat deletion with confirmation
- Responsive mobile overlay functionality
- Chat title and timestamp display

## 🎙️ Voice Integration & Advanced Features

### speechUtils.ts - Web Speech API Integration:

#### Functions:
- startSpeechRecognition(onResult, onError) - Continuous speech recognition
- stopSpeechRecognition() - Stops active recognition
- speakText(text, onEnd) - Text-to-speech synthesis
- stopSpeaking() - Interrupts current speech
- isSpeechRecognitionSupported() - Browser compatibility check

#### Configuration:
- Language: 'en-US' for recognition
- Continuous: true for ongoing listening
- InterimResults: true for real-time feedback
- Error handling for permissions and browser support

### LiveVoiceChat.tsx - Custom Backend Integration:

#### Backend Endpoints:
- GET /health - Connection health check
- POST /process-audio - Audio processing endpoint
- FormData with audio blob for real-time processing

#### Features:
- WebSocket-style real-time communication
- Audio recording with MediaRecorder API
- Connection status monitoring
- Modal dialog interface with proper cleanup
- Error handling and user feedback

#### State Management:
- isConnected: boolean for backend status
- isRecording: boolean for audio capture
- mediaRecorder: MediaRecorder instance
- connectionStatus: string for user feedback

### Crisis Detection & Safety Features:

#### crisisDetection.ts Implementation:
- Keyword-based detection algorithm
- Crisis keywords array for monitoring
- detectCrisisKeywords(message) function
- Real-time message scanning

#### SuicidePreventionAlert.tsx:
- Emergency alert dialog component
- Crisis hotline numbers display
- Professional resource connections
- Immediate intervention messaging

## 🎨 Design System & Styling Specifications

### Custom CSS Classes & Animations:

#### Custom Tailwind Classes:
- .landing-gradient - Hero section background
- .hero-title - Large heading with responsive sizing
- .hero-subtitle - Subtitle with muted coloring
- .cta-button - Primary call-to-action styling
- .animate-fade-in - Smooth entrance animation
- .animate-bounce-subtle - Gentle bounce effect

#### Mental Health Color Palette:
- mental-primary: Calming blue tones
- mental-secondary: Supporting accent colors
- Background gradients for welcoming atmosphere
- High contrast for accessibility

### shadcn/ui Integration:

#### Components Used:
- Button (multiple variants: default, outline, ghost)
- Card, CardContent for feature sections
- Dialog, DialogContent, DialogHeader for modals
- ScrollArea for long content areas
- ResizablePanel, ResizablePanelGroup for layout
- Textarea with auto-resize functionality
- Toast/Sonner for notifications

#### Responsive Design:
- Mobile-first approach with md: breakpoints
- Collapsible sidebar for mobile devices
- Touch-friendly button sizing
- Optimized chat interface for all screen sizes

## 📦 Dependencies & Configuration

### Core Dependencies:
- react: ^18.3.1 + react-dom: ^18.3.1
- @tanstack/react-query: ^5.56.2 (data fetching)
- react-router-dom: ^6.26.2 (routing)
- lucide-react: ^0.462.0 (icons)
- next-themes: ^0.3.0 (dark mode)
- sonner: ^1.5.0 (toast notifications)

### UI Library Dependencies:
- @radix-ui/* packages for accessible components
- class-variance-authority: ^0.7.1 (component variants)
- clsx: ^2.1.1 + tailwind-merge: ^2.5.2 (utility functions)
- react-resizable-panels: ^2.1.3 (resizable layout)

### Build Tools:
- Vite as build tool and dev server
- TypeScript for type safety
- Tailwind CSS for styling
- tailwindcss-animate for animations

## ⚙️ Implementation Notes & Best Practices

### Code Organization:
- Components are focused and single-responsibility
- Custom hooks for state management (useChats)
- Utility functions separated into utils/ directory
- TypeScript interfaces defined close to usage
- Consistent naming conventions throughout

### Performance Considerations:
- React.memo for preventing unnecessary re-renders
- Lazy loading for non-critical components
- Efficient state updates in useChats hook
- Proper cleanup in voice chat components
- File size validation for uploads

### Accessibility Features:
- Proper ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color schemes
- Screen reader friendly structure
- Focus management in modals

### Security & Privacy:
- Client-side only implementation (no data persistence)
- Secure file upload handling
- Input validation and sanitization
- Crisis detection for user safety
- Microphone permission handling

## 🔧 Current Technical Debt & Refactoring Needs

### Files Requiring Refactoring:

**ChatInput.tsx (287 lines):**
- Split into: InputField, LanguageSelector, FileUpload, VoiceControls
- Extract speech recognition logic to custom hook
- Separate file handling utilities

**ChatInterface.tsx (213 lines):**
- Split into: ChatHeader, MessageList, MessageItem components
- Extract message rendering logic
- Create dedicated file preview component

**ProjectDocumentation.tsx (305+ lines):**
- Break into smaller documentation sections
- Create reusable documentation components
- Implement collapsible sections for better UX
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mental_Health_Platform_Technical_Documentation.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">
          <FileText className="h-4 w-4 mr-2" />
          View Complete Technical Documentation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Mental Health Support Platform - Complete Technical Specifications
          </DialogTitle>
          <div className="flex gap-2 mt-4">
            <Button onClick={downloadAsHTML} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download as HTML
            </Button>
            <Button onClick={downloadAsMarkdown} variant="outline" size="sm">
              <FileDown className="h-4 w-4 mr-2" />
              Download as Markdown
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            
            {/* Project Architecture */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                🏗️ Project Architecture & Structure
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <div>
                  <h4 className="font-semibold">Technology Stack:</h4>
                  <p>React 18.3.1 + TypeScript + Vite + Tailwind CSS + shadcn/ui + React Router DOM</p>
                </div>
                <div>
                  <h4 className="font-semibold">Project Structure:</h4>
                  <pre className="text-xs bg-white p-2 rounded mt-1 overflow-x-auto">
{`src/
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── ChatInput.tsx (287 lines - needs refactoring)
│   ├── ChatInterface.tsx (213 lines - needs refactoring)
│   ├── ChatSidebar.tsx
│   ├── DarkModeToggle.tsx
│   ├── LandingHero.tsx
│   ├── LiveVoiceChat.tsx
│   ├── Navbar.tsx
│   ├── ProjectDocumentation.tsx
│   ├── ResizablePanel.tsx
│   ├── SettingsDialog.tsx
│   └── SuicidePreventionAlert.tsx
├── hooks/
│   ├── useChats.ts
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── pages/
│   ├── Index.tsx
│   ├── Chat.tsx
│   └── NotFound.tsx
├── utils/
│   ├── crisisDetection.ts
│   └── speechUtils.ts
└── lib/
    └── utils.ts`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Detailed Component Specifications */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Code className="h-5 w-5 text-green-500" />
                🧩 Complete Component Specifications
              </h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">📱 Pages Implementation</h4>
                  
                  <div className="mt-2 space-y-2">
                    <div className="bg-gray-50 p-3 rounded">
                      <h5 className="font-medium">src/pages/Index.tsx:</h5>
                      <ul className="text-sm space-y-1 mt-1">
                        <li>• Landing page with min-h-screen and landing-gradient background</li>
                        <li>• Contains Navbar and LandingHero components</li>
                        <li>• Container with responsive padding (px-4 pt-16 md:pt-24 pb-16)</li>
                        <li>• Uses React Router for navigation</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <h5 className="font-medium">src/pages/Chat.tsx:</h5>
                      <ul className="text-sm space-y-1 mt-1">
                        <li>• Full-screen chat layout with ResizablePanelGroup</li>
                        <li>• Mobile sidebar toggle with fixed positioning</li>
                        <li>• Desktop: ResizablePanel with 25% sidebar, 75% chat (adjustable)</li>
                        <li>• Mobile: Overlay sidebar with backdrop blur</li>
                        <li>• Sidebar hide/show functionality for full-screen chat</li>
                        <li>• State management: isMobileSidebarOpen, isSidebarHidden</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold">🎨 Core UI Components</h4>
                  
                  <div className="mt-2 space-y-2">
                    <div className="bg-gray-50 p-3 rounded">
                      <h5 className="font-medium">LandingHero.tsx:</h5>
                      <ul className="text-sm space-y-1 mt-1">
                        <li>• Centered layout with animate-fade-in</li>
                        <li>• Hero title with gradient text (mental-primary to mental-secondary)</li>
                        <li>• CTA button with animate-bounce-subtle to /chat route</li>
                        <li>• ProjectDocumentation component integration</li>
                        <li>• 3-column feature cards (Confidential, 24/7 Support, Resource Connection)</li>
                        <li>• Uses shadcn/ui Card components with CardContent pt-6</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <h5 className="font-medium">Navbar.tsx:</h5>
                      <ul className="text-sm space-y-1 mt-1">
                        <li>• Fixed top navigation with backdrop blur</li>
                        <li>• Logo with Brain icon + "MindfulChat" text</li>
                        <li>• React Router Link components for navigation</li>
                        <li>• DarkModeToggle component integration</li>
                        <li>• Responsive design with mobile menu</li>
                        <li>• Mental health themed colors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Chat System Implementation */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                💬 Chat System Implementation Details
              </h3>
              
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">useChats.ts Hook (State Management):</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Interfaces:</strong>
                      <pre className="text-xs bg-white p-2 rounded mt-1">
{`interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  files?: File[];
}`}
                      </pre>
                    </div>
                    <div>
                      <strong>Functions:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• addNewChat() - Creates new conversation with default assistant message</li>
                        <li>• deleteChat(chatId) - Removes chat and handles active chat switching</li>
                        <li>• selectChat(chatId) - Sets active chat</li>
                        <li>• addMessageToChat(chatId, message) - Appends message to specific chat</li>
                        <li>• getCurrentChatMessages() - Returns messages for active chat</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Default Data:</strong>
                      <p>3 sample conversations: "Stress management techniques", "Dealing with exam anxiety", "Sleep improvement strategies"</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">ChatInput.tsx (287 lines - Advanced Input):</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Key Features:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Language selection toolbar (English, Bengali, Hindi)</li>
                        <li>• File upload with image preview and document support</li>
                        <li>• Speech-to-text with microphone access handling</li>
                        <li>• Text-to-speech toggle functionality</li>
                        <li>• Live voice chat trigger button</li>
                        <li>• Auto-resizing textarea with keyboard shortcuts (Ctrl+Enter)</li>
                        <li>• Compact button layout with gap-1 spacing</li>
                      </ul>
                    </div>
                    <div>
                      <strong>State Management:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• selectedLanguage: 'english' | 'bengali' | 'hindi'</li>
                        <li>• isListening: boolean for speech recognition</li>
                        <li>• isSpeaking: boolean for text-to-speech</li>
                        <li>• selectedFiles: File[] for attachments</li>
                        <li>• message: string for input content</li>
                      </ul>
                    </div>
                    <div>
                      <strong>UI Layout:</strong>
                      <p>Language toolbar → File upload area → Main input with integrated controls → Send button</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">ChatInterface.tsx (213 lines - Main Chat UI):</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Layout Structure:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Header with chat title and sidebar toggle</li>
                        <li>• Messages area with auto-scroll to bottom</li>
                        <li>• Message rendering with role-based styling</li>
                        <li>• File attachment display (images with preview)</li>
                        <li>• ChatInput component integration</li>
                        <li>• LiveVoiceChat modal integration</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Message Handling:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Real-time message appending to active chat</li>
                        <li>• Auto-scroll behavior on new messages</li>
                        <li>• File size formatting utilities</li>
                        <li>• Message timestamp display</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">ChatSidebar.tsx (Conversation Management):</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Features:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• New chat creation button</li>
                        <li>• Chat list with active chat highlighting</li>
                        <li>• Chat deletion with confirmation</li>
                        <li>• Responsive mobile overlay functionality</li>
                        <li>• Chat title and timestamp display</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Voice & Advanced Features */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Mic className="h-5 w-5 text-orange-500" />
                🎙️ Voice Integration & Advanced Features
              </h3>
              
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">speechUtils.ts - Web Speech API Integration:</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Functions:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• startSpeechRecognition(onResult, onError) - Continuous speech recognition</li>
                        <li>• stopSpeechRecognition() - Stops active recognition</li>
                        <li>• speakText(text, onEnd) - Text-to-speech synthesis</li>
                        <li>• stopSpeaking() - Interrupts current speech</li>
                        <li>• isSpeechRecognitionSupported() - Browser compatibility check</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Configuration:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Language: 'en-US' for recognition</li>
                        <li>• Continuous: true for ongoing listening</li>
                        <li>• InterimResults: true for real-time feedback</li>
                        <li>• Error handling for permissions and browser support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">LiveVoiceChat.tsx - Custom Backend Integration:</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Backend Endpoints:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• GET /health - Connection health check</li>
                        <li>• POST /process-audio - Audio processing endpoint</li>
                        <li>• FormData with audio blob for real-time processing</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Features:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• WebSocket-style real-time communication</li>
                        <li>• Audio recording with MediaRecorder API</li>
                        <li>• Connection status monitoring</li>
                        <li>• Modal dialog interface with proper cleanup</li>
                        <li>• Error handling and user feedback</li>
                      </ul>
                    </div>
                    <div>
                      <strong>State Management:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• isConnected: boolean for backend status</li>
                        <li>• isRecording: boolean for audio capture</li>
                        <li>• mediaRecorder: MediaRecorder instance</li>
                        <li>• connectionStatus: string for user feedback</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Crisis Detection & Safety Features:</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>crisisDetection.ts Implementation:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Keyword-based detection algorithm</li>
                        <li>• Crisis keywords array for monitoring</li>
                        <li>• detectCrisisKeywords(message) function</li>
                        <li>• Real-time message scanning</li>
                      </ul>
                    </div>
                    <div>
                      <strong>SuicidePreventionAlert.tsx:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Emergency alert dialog component</li>
                        <li>• Crisis hotline numbers display</li>
                        <li>• Professional resource connections</li>
                        <li>• Immediate intervention messaging</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Styling & Design System */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Palette className="h-5 w-5 text-indigo-500" />
                🎨 Design System & Styling Specifications
              </h3>
              
              <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Custom CSS Classes & Animations:</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Custom Tailwind Classes:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• .landing-gradient - Hero section background</li>
                        <li>• .hero-title - Large heading with responsive sizing</li>
                        <li>• .hero-subtitle - Subtitle with muted coloring</li>
                        <li>• .cta-button - Primary call-to-action styling</li>
                        <li>• .animate-fade-in - Smooth entrance animation</li>
                        <li>• .animate-bounce-subtle - Gentle bounce effect</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Mental Health Color Palette:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• mental-primary: Calming blue tones</li>
                        <li>• mental-secondary: Supporting accent colors</li>
                        <li>• Background gradients for welcoming atmosphere</li>
                        <li>• High contrast for accessibility</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">shadcn/ui Integration:</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Components Used:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Button (multiple variants: default, outline, ghost)</li>
                        <li>• Card, CardContent for feature sections</li>
                        <li>• Dialog, DialogContent, DialogHeader for modals</li>
                        <li>• ScrollArea for long content areas</li>
                        <li>• ResizablePanel, ResizablePanelGroup for layout</li>
                        <li>• Textarea with auto-resize functionality</li>
                        <li>• Toast/Sonner for notifications</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Responsive Design:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Mobile-first approach with md: breakpoints</li>
                        <li>• Collapsible sidebar for mobile devices</li>
                        <li>• Touch-friendly button sizing</li>
                        <li>• Optimized chat interface for all screen sizes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Dependencies */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Database className="h-5 w-5 text-teal-500" />
                📦 Dependencies & Configuration
              </h3>
              
              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="text-sm space-y-3">
                  <div>
                    <h4 className="font-semibold">Core Dependencies:</h4>
                    <ul className="ml-4 space-y-1">
                      <li>• react: ^18.3.1 + react-dom: ^18.3.1</li>
                      <li>• @tanstack/react-query: ^5.56.2 (data fetching)</li>
                      <li>• react-router-dom: ^6.26.2 (routing)</li>
                      <li>• lucide-react: ^0.462.0 (icons)</li>
                      <li>• next-themes: ^0.3.0 (dark mode)</li>
                      <li>• sonner: ^1.5.0 (toast notifications)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">UI Library Dependencies:</h4>
                    <ul className="ml-4 space-y-1">
                      <li>• @radix-ui/* packages for accessible components</li>
                      <li>• class-variance-authority: ^0.7.1 (component variants)</li>
                      <li>• clsx: ^2.1.1 + tailwind-merge: ^2.5.2 (utility functions)</li>
                      <li>• react-resizable-panels: ^2.1.3 (resizable layout)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">Build Tools:</h4>
                    <ul className="ml-4 space-y-1">
                      <li>• Vite as build tool and dev server</li>
                      <li>• TypeScript for type safety</li>
                      <li>• Tailwind CSS for styling</li>
                      <li>• tailwindcss-animate for animations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Implementation Notes */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-500" />
                ⚙️ Implementation Notes & Best Practices
              </h3>
              
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Code Organization:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Components are focused and single-responsibility</li>
                    <li>• Custom hooks for state management (useChats)</li>
                    <li>• Utility functions separated into utils/ directory</li>
                    <li>• TypeScript interfaces defined close to usage</li>
                    <li>• Consistent naming conventions throughout</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance Considerations:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• React.memo for preventing unnecessary re-renders</li>
                    <li>• Lazy loading for non-critical components</li>
                    <li>• Efficient state updates in useChats hook</li>
                    <li>• Proper cleanup in voice chat components</li>
                    <li>• File size validation for uploads</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Accessibility Features:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Proper ARIA labels for interactive elements</li>
                    <li>• Keyboard navigation support</li>
                    <li>• High contrast color schemes</li>
                    <li>• Screen reader friendly structure</li>
                    <li>• Focus management in modals</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Security & Privacy:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Client-side only implementation (no data persistence)</li>
                    <li>• Secure file upload handling</li>
                    <li>• Input validation and sanitization</li>
                    <li>• Crisis detection for user safety</li>
                    <li>• Microphone permission handling</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Refactoring Recommendations */}
            <section>
              <h3 className="text-lg font-semibold mb-3">🔧 Current Technical Debt & Refactoring Needs</h3>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Files Requiring Refactoring:</h4>
                <ul className="text-sm space-y-2 ml-4">
                  <li>
                    <strong>ChatInput.tsx (287 lines):</strong>
                    <div className="ml-4 mt-1">
                      • Split into: InputField, LanguageSelector, FileUpload, VoiceControls
                      • Extract speech recognition logic to custom hook
                      • Separate file handling utilities
                    </div>
                  </li>
                  <li>
                    <strong>ChatInterface.tsx (213 lines):</strong>
                    <div className="ml-4 mt-1">
                      • Split into: ChatHeader, MessageList, MessageItem components
                      • Extract message rendering logic
                      • Create dedicated file preview component
                    </div>
                  </li>
                  <li>
                    <strong>ProjectDocumentation.tsx (305+ lines):</strong>
                    <div className="ml-4 mt-1">
                      • Break into smaller documentation sections
                      • Create reusable documentation components
                      • Implement collapsible sections for better UX
                    </div>
                  </li>
                </ul>
              </div>
            </section>

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDocumentation;
