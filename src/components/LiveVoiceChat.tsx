
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface LiveVoiceChatProps {
  onClose: () => void;
}

const LiveVoiceChat: React.FC<LiveVoiceChatProps> = ({ onClose }) => {
  const [backendUrl, setBackendUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopRecording();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startConversation = async () => {
    if (!backendUrl) {
      toast({
        title: "Missing backend URL",
        description: "Please provide your backend URL.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Request microphone access with more specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        } 
      });
      
      streamRef.current = stream;
      
      // Test backend connection
      const response = await fetch(`${backendUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Backend connection failed');
      }

      setIsConnected(true);
      toast({
        title: "Voice conversation started",
        description: "You can now speak with the AI assistant.",
      });
    } catch (error) {
      toast({
        title: "Failed to start conversation",
        description: error instanceof Error ? error.message : "Please check your backend URL and microphone permissions.",
        variant: "destructive",
      });
    }
  };

  const startRecording = async () => {
    if (!streamRef.current) return;

    try {
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await sendAudioToBackend(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak now...",
      });
    } catch (error) {
      toast({
        title: "Recording failed",
        description: "Failed to start recording. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const sendAudioToBackend = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const response = await fetch(`${backendUrl}/process-audio`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process audio');
      }

      const result = await response.json();
      
      if (result.audioUrl) {
        // Play the response audio
        const audio = new Audio(result.audioUrl);
        audio.play();
      }

      toast({
        title: "Response received",
        description: result.transcript || "Audio processed successfully",
      });
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Failed to process your audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const endConversation = () => {
    setIsConnected(false);
    setIsRecording(false);
    setIsProcessing(false);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }
    
    toast({
      title: "Voice conversation ended",
      description: "The conversation has been disconnected.",
    });
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Live Voice Conversation</h2>
        
        {!isConnected ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Backend URL
              </label>
              <input
                type="text"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                placeholder="http://localhost:3001"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={startConversation}
                className="flex-1"
                disabled={!backendUrl}
              >
                <Phone className="h-4 w-4 mr-2" />
                Start Voice Chat
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${
                isRecording ? 'bg-red-100 text-red-600' : 
                isProcessing ? 'bg-yellow-100 text-yellow-600' : 
                'bg-blue-100 text-blue-600'
              }`}>
                {isRecording ? (
                  <Mic className="h-8 w-8" />
                ) : (
                  <MicOff className="h-8 w-8" />
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {isRecording ? 'Recording... Click to stop' : 
               isProcessing ? 'Processing your message...' : 
               'Click microphone to start recording'}
            </p>
            
            <div className="flex gap-2">
              <Button
                onClick={handleMicClick}
                disabled={isProcessing}
                className="flex-1"
                variant={isRecording ? "destructive" : "default"}
              >
                {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button
                onClick={endConversation}
                variant="destructive"
                className="flex-1"
              >
                <PhoneOff className="h-4 w-4 mr-2" />
                End Conversation
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-muted rounded-md text-xs text-muted-foreground">
          <p>Note: Make sure your backend has endpoints for /health and /process-audio</p>
        </div>
      </div>
    </div>
  );
};

export default LiveVoiceChat;
