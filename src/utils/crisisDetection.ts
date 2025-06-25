
// Basic suicide risk detection based on keywords
// This is a simplified implementation and should be enhanced with more sophisticated NLP in production

// Keywords that might indicate suicidal ideation or severe mental distress
const crisisKeywords = [
  "suicide", "kill myself", "end my life", "don't want to live", 
  "want to die", "better off dead", "no reason to live",
  "can't go on", "end it all", "take my own life", "hurt myself",
  "self harm", "cutting myself", "no hope", "goodbye forever",
  "final note", "final message", "kill me", "death", "dying"
];

/**
 * Detects potentially concerning language in user input
 * @param text The user's message text
 * @returns Boolean indicating if crisis language was detected
 */
export const detectCrisisLanguage = (text: string): boolean => {
  const lowercaseText = text.toLowerCase();
  
  // Check for direct matches with crisis keywords
  for (const keyword of crisisKeywords) {
    if (lowercaseText.includes(keyword)) {
      console.log(`Crisis keyword detected: ${keyword}`);
      return true;
    }
  }
  
  // More complex patterns could be added here
  // For example, combinations of words or phrases that together might indicate risk
  
  // Check for phrases indicating planning
  if (
    (lowercaseText.includes("plan") && 
      (lowercaseText.includes("suicide") || lowercaseText.includes("kill") || lowercaseText.includes("die"))) ||
    (lowercaseText.includes("method") && lowercaseText.includes("suicide")) ||
    (lowercaseText.includes("way") && lowercaseText.includes("end") && lowercaseText.includes("life"))
  ) {
    console.log("Crisis phrase pattern detected related to planning");
    return true;
  }
  
  // Check for goodbye-type messages with concerning context
  if (
    (lowercaseText.includes("goodbye") || lowercaseText.includes("bye") || lowercaseText.includes("farewell")) &&
    (lowercaseText.includes("forever") || lowercaseText.includes("final") || 
     lowercaseText.includes("last") || lowercaseText.includes("never again"))
  ) {
    console.log("Potential farewell message detected");
    return true;
  }
  
  return false;
};

// In a production environment, this utility should be enhanced with:
// 1. Machine learning models for better detection
// 2. Context-aware analysis (considering conversation history)
// 3. Sentiment analysis
// 4. Severity classification
// 5. False positive reduction strategies
