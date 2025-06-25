interface ConfidenceScoreProps {
    score: number;
}

export const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({ score }) => {
    const getColor = () => {
        if (score >= 0.8) return 'text-green-500';
        if (score >= 0.6) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className={`text-sm ${getColor()}`}>
            Confidence: {Math.round(score * 100)}%
        </div>
    );
};