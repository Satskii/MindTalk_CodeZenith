const HINDI_PATTERNS = [
    'namaste', 'kaise', 'hai', 'theek', 'nahi', 'haan', 'kya', 'main', 
    'mujhe', 'bohot', 'bahut', 'dukh', 'tension', 'pareshan'
];

const BENGALI_PATTERNS = [
    'kemon', 'acho', 'ami', 'bhalo', 'kharap', 'na', 'hya', 'ki', 
    'amar', 'onek', 'dukkho', 'chinta', 'tension'
];

export const detectLanguage = (text: string): 'en' | 'hi' | 'bn' => {
    // Check for Devanagari script (Hindi)
    if (/[\u0900-\u097F]/.test(text)) return 'hi';
    
    // Check for Bengali script
    if (/[\u0980-\u09FF]/.test(text)) return 'bn';
    
    // Check for Hindi words in Latin script
    if (HINDI_PATTERNS.some(word => text.toLowerCase().includes(word))) return 'hi';
    
    // Check for Bengali words in Latin script
    if (BENGALI_PATTERNS.some(word => text.toLowerCase().includes(word))) return 'bn';
    
    // Default to English
    return 'en';
};

// Add auto-language detection to ChatInput
export const autoDetectLanguage = (text: string, setLanguage: (lang: string) => void) => {
    const detectedLang = detectLanguage(text);
    setLanguage(detectedLang);
};