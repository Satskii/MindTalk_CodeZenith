# Empty speech utils file
# We are using browser-based speech synthesis and recognition
# This file exists to avoid import errors

class SpeechProcessor:
    def __init__(self):
        pass
        
    def speech_to_text(self, audio_bytes, language=None):
        # Not implemented - using browser-based recognition
        return {"text": "", "is_silence": False}
        
    def text_to_speech(self, text, language='en'):
        # Not implemented - using browser-based synthesis
        return b''

# Create dummy instance
speech_processor = SpeechProcessor()
