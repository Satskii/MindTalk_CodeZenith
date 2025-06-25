from typing import Dict, List

class BasePromptManager:
    def __init__(self):
        self.SYSTEM_BASE = {
            'en': """You are a warm, friendly mental health companion designed for students.
                    You speak like a supportive friend but think like a wise mentor.
                    Your goal is to help students feel heard, supported, and motivated — especially when they're feeling stressed, anxious, overwhelmed, or unmotivated.
                    Never mention that you're an AI, assistant, or chatbot.""",

            'hi': """आप छात्रों के लिए एक सहृदय, मित्रवत मानसिक स्वास्थ्य साथी हैं।
                    आप एक सहायक मित्र की तरह बोलते हैं लेकिन एक बुद्धिमान सलाहकार की तरह सोचते हैं।
                    आपका लक्ष्य छात्रों को सुना, समर्थित और प्रेरित महसूस करवाना है।""",

            'bn': """আপনি ছাত্রদের জন্য একজন উষ্ণ, বন্ধুসুলভ মানসিক স্বাস্থ্য সঙ্গী。
                    আপনি একজন সহায়ক বন্ধুর মতো কথা বলেন কিন্তু একজন জ্ঞানী পরামর্শদাতার মতো চিন্তা করেন。
                    আপনার লক্ষ্য ছাত্রদের শোনা, সমর্থিত এবং অনুপ্রাণিত বোধ করানো।"""
        }

        self.CRISIS_KEYWORDS = {
            'en': ['suicide', 'kill myself', 'end it all', 'want to die'],
            'hi': ['आत्महत्या', 'खुद को मारना', 'सब खत्म करना', 'मरना चाहता हूं'],
            'bn': ['আত্মহত্যা', 'নিজেকে মেরে ফেলব', 'সব শেষ করে দিতে চাই', 'মরতে চাই']
        }

        self.CRISIS_MESSAGE = {
            'en': """I notice you're expressing thoughts of self-harm. Your life matters. 
                    Please contact these 24/7 support services:
                    - National Crisis Helpline: 988
                    - Crisis Text Line: Text HOME to 741741""",
                    
            'hi': """मैं देख रहा हूं कि आप आत्म-हानि के विचार व्यक्त कर रहे हैं। आपका जीवन महत्वपूर्ण है。
                    कृपया इन 24/7 सहायता सेवाओं से संपर्क करें:
                    - राष्ट्रीय संकट हेल्पलाइन: 988
                    - आईकॉल: 9152987821""",
                    
            'bn': """আমি লক্ষ্য করছি আপনি আত্মঘাতী চিন্তাভাবনা প্রকাশ করছেন। আপনার জীবন মূল্যবান。
                    অনুগ্রহ করে এই 24/7 সহায়তা পরিষেবাগুলির সাথে যোগাযোগ করুন:
                    - জাতীয় সংকট হেল্পলাইন: 988
                    - কথা হেল্পলাইন: 98313-41818"""
        }

    def build_chat_prompt(self, conversation_history, user_input, language='en'):
        """Base method for building chat prompts"""
        system_message = self.SYSTEM_BASE.get(language, self.SYSTEM_BASE['en'])
        
        return [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_input}
        ]

    def _build_multilingual_prompt(self, conversation_history, user_input, language):
        """Build prompts for non-English languages"""
        return self.build_chat_prompt(conversation_history, user_input, language)

    def detect_crisis(self, text, language='en'):
        """Check if the text contains crisis keywords"""
        keywords = self.CRISIS_KEYWORDS.get(language, self.CRISIS_KEYWORDS['en'])
        return any(keyword in text.lower() for keyword in keywords)

    def get_crisis_message(self, language='en'):
        """Get crisis response message in appropriate language"""
        return self.CRISIS_MESSAGE.get(language, self.CRISIS_MESSAGE['en'])