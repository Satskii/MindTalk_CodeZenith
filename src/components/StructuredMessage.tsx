import React from 'react';
import { cn } from '@/lib/utils';

interface StructuredMessageProps {
    content: string;
    isUser: boolean;
}

const StructuredMessage: React.FC<StructuredMessageProps> = ({ content, isUser }) => {
    return (
        <div className={cn(
            "flex w-full",
            isUser ? "justify-end" : "justify-start"
        )}>
            <div className={cn(
                "rounded-lg px-4 py-2 max-w-[80%]",
                isUser 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
            )}>
                <p className="whitespace-pre-wrap break-words text-sm">{content}</p>
            </div>
        </div>
    );
};

export default StructuredMessage;