import { isChromeOrEdge } from './browserChecks';

interface SpeechManagerEvents {
    onResult: (text: string) => void;
    onEnd: () => void;
    onError: (error: string) => void;
    onPause?: () => void;
}

export class SpeechManager {
    private recognition: SpeechRecognition | null = null;
    private synthesis: SpeechSynthesis | null = null;
    private isListening: boolean = false;
    private events: SpeechManagerEvents;
    private lastSpeechTime: number = 0;
    private readonly PAUSE_THRESHOLD = 1500; // 1.5 seconds of silence to trigger pause
    private isStarting: boolean = false;
    private isStopping: boolean = false;
    private currentUtterance: SpeechSynthesisUtterance | null = null;
    private hasMicrophonePermission: boolean = false;

    constructor(events: SpeechManagerEvents) {
        this.events = events;
        this.checkMicrophonePermission();
        this.synthesis = window.speechSynthesis;
    }

    private async checkMicrophonePermission(): Promise<boolean> {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.hasMicrophonePermission = true;
            // Important: Stop the test stream after permission check
            stream.getTracks().forEach(track => track.stop());
            return true;
        } catch (error) {
            console.error('Microphone permission error:', error);
            this.hasMicrophonePermission = false;
            this.events.onError('Microphone access denied or not available');
            return false;
        }
    }

    private async ensureMicrophonePermission(): Promise<boolean> {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this.events.onError('Speech recognition is not supported in this browser');
            return false;
        }

        // Check if we already have permission
        if (this.hasMicrophonePermission) return true;

        try {
            const permissionResult = await navigator.permissions.query({ name: 'microphone' as PermissionName });
            
            switch (permissionResult.state) {
                case 'granted':
                    this.hasMicrophonePermission = true;
                    return true;
                case 'prompt':
                    return await this.checkMicrophonePermission();
                case 'denied':
                    this.events.onError('Microphone access is blocked. Please allow microphone access in your browser settings.');
                    return false;
                default:
                    return await this.checkMicrophonePermission();
            }
        } catch (error) {
            // Fallback to direct permission check if permissions API fails
            return await this.checkMicrophonePermission();
        }
    }

    private initializeSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window)) {
            this.events.onError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
            return;
        }

        const SpeechRecognition = window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        if (this.recognition) {
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.maxAlternatives = 1;

            this.recognition.onstart = () => {
                this.isListening = true;
                this.isStarting = false;
                this.lastSpeechTime = Date.now();
                console.log('Speech recognition started');
            };

            this.recognition.onresult = (event: SpeechRecognitionEvent) => {
                const result = event.results[event.results.length - 1];
                if (result) {
                    const text = result[0].transcript.trim();
                    this.lastSpeechTime = Date.now();
                    this.events.onResult(text);
                }
            };

            this.recognition.onend = () => {
                console.log('Speech recognition ended');
                const wasListening = this.isListening;
                this.isListening = false;
                this.isStopping = false;

                // Only check for pause if we're not explicitly stopping
                if (!this.isStopping && wasListening) {
                    const timeSinceLastSpeech = Date.now() - this.lastSpeechTime;
                    if (timeSinceLastSpeech > this.PAUSE_THRESHOLD) {
                        console.log('Pause detected');
                        this.events.onPause?.();
                    } else {
                        // Restart if we weren't explicitly stopped
                        this.restartRecognition();
                    }
                }

                this.events.onEnd();
            };

            this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error:', event.error);
                
                if (event.error === 'no-speech') {
                    // Handle no speech detected
                    this.restartRecognition();
                    return;
                }

                if (event.error === 'audio-capture') {
                    this.events.onError('No microphone was found or it is not working properly.');
                    this.hasMicrophonePermission = false;
                } else if (event.error === 'not-allowed') {
                    this.events.onError('Microphone access was not allowed. Please enable it in your browser settings.');
                    this.hasMicrophonePermission = false;
                } else {
                    this.events.onError(`Speech recognition error: ${event.error}`);
                }

                this.isListening = false;
                this.isStarting = false;
                this.isStopping = false;
            };
        }
    }

    private async restartRecognition() {
        if (!this.isStopping && this.recognition && !this.isStarting) {
            try {
                this.recognition.start();
            } catch (error) {
                console.error('Error restarting recognition:', error);
                // If we get an error, try re-initializing
                this.recognition = null;
                this.initializeSpeechRecognition();
            }
        }
    }

    private async ensureRecognitionStopped(): Promise<void> {
        if (this.isListening || this.isStarting) {
            console.log('Stopping recognition...');
            this.isStopping = true;
            
            try {
                this.recognition?.stop();
            } catch (error) {
                console.error('Error stopping recognition:', error);
            }

            await new Promise<void>(resolve => {
                const checkStopped = () => {
                    if (!this.isListening && !this.isStarting) {
                        resolve();
                    } else {
                        setTimeout(checkStopped, 50);
                    }
                };
                checkStopped();
            });
            
            this.isStopping = false;
            console.log('Recognition stopped');
        }
    }

    public async startContinuousListening(
        onSpeechStart: () => void,
        language: string = 'en'
    ): Promise<void> {
        if (this.isStarting) return;
        this.isStarting = true;

        try {
            const hasMicPermission = await this.ensureMicrophonePermission();
            if (!hasMicPermission) {
                this.isStarting = false;
                return;
            }

            if (!this.recognition) {
                this.initializeSpeechRecognition();
            }

            if (this.recognition) {
                this.recognition.lang = language;
                this.recognition.start();
                this.isListening = true;
                onSpeechStart();
            }
        } catch (error) {
            console.error('Error starting speech recognition:', error);
            this.events.onError('Failed to start speech recognition. Please check your microphone.');
        } finally {
            this.isStarting = false;
        }
    }

    public async stopListening() {
        console.log('Stopping listening...');
        if (!this.isListening && !this.isStarting) return;
        this.isStopping = true;
        await this.ensureRecognitionStopped();
    }

    public stopTTS(): void {
        if (this.synthesis) {
            console.log('Stopping TTS...');
            this.synthesis.cancel();
            if (this.currentUtterance) {
                this.currentUtterance = null;
            }
        }
    }

    public async playTTS(text: string, language: string = 'en'): Promise<void> {
        if (!this.synthesis) {
            throw new Error('Text-to-speech not supported in this browser');
        }

        return new Promise((resolve, reject) => {
            this.stopTTS(); // Cancel any ongoing speech

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            utterance.onend = () => {
                this.currentUtterance = null;
                resolve();
            };

            utterance.onerror = (event) => {
                this.currentUtterance = null;
                reject(new Error(`TTS error: ${event.error}`));
            };

            this.currentUtterance = utterance;
            if (this.synthesis) {
                this.synthesis.speak(utterance);
            }
        });
    }
}


