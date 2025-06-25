import React from 'react';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface SentimentBadgeProps {
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
}

export const SentimentBadge: React.FC<SentimentBadgeProps> = ({ sentiment, score }) => {
    const getSentimentDisplay = () => {
        switch (sentiment) {
            case 'positive':
                return {
                    icon: <ThumbsUp className="h-4 w-4" />,
                    text: 'Positive',
                    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                };
            case 'negative':
                return {
                    icon: <ThumbsDown className="h-4 w-4" />,
                    text: 'Negative',
                    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                };
            default:
                return {
                    icon: <Minus className="h-4 w-4" />,
                    text: 'Neutral',
                    color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                };
        }
    };

    const display = getSentimentDisplay();
    const percentage = Math.round(score * 100);

    return (
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${display.color}`}>
            {display.icon}
            <span>{display.text}</span>
            <span className="opacity-75">({percentage}%)</span>
        </div>
    );
};