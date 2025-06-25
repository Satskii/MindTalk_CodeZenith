import React from 'react';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface SentimentIndicatorProps {
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
}

export const SentimentIndicator: React.FC<SentimentIndicatorProps> = ({ sentiment, score }) => {
    const getDisplay = () => {
        const confidence = Math.round(score * 100);
        
        switch (sentiment) {
            case 'positive':
                return {
                    icon: <ThumbsUp className="h-4 w-4" />,
                    text: `Positive (${confidence}%)`,
                    color: `text-green-500 bg-green-50`
                };
            case 'negative':
                return {
                    icon: <ThumbsDown className="h-4 w-4" />,
                    text: `Negative (${confidence}%)`,
                    color: `text-red-500 bg-red-50`
                };
            default:
                return {
                    icon: <Minus className="h-4 w-4" />,
                    text: `Neutral (${confidence}%)`,
                    color: 'text-yellow-500 bg-yellow-50'
                };
        }
    };

    const display = getDisplay();

    return (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${display.color} shadow-sm`}>
            {display.icon}
            <span>{display.text}</span>
        </div>
    );
};