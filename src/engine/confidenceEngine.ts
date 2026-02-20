

export interface DetectionMetrics {
    insertedLines: number;
    replacedLines: number;
    timeSinceLastTyping: number;
    typingCount: number;
}

export class ConfidenceEngine {

    public calculateScore(metrics: DetectionMetrics): number {

        let score = 0;

        // Large insert
        if (metrics.insertedLines >= 5) {
            score += 40;
        }

        // Large replace
        if (metrics.replacedLines >= 3) {
            score += 30;
        }

        // Fast bulk insertion
        if (metrics.timeSinceLastTyping > 500) {
            score += 20;
        }

        // No manual typing before insert
        if (metrics.typingCount === 0) {
            score += 20;
        }

        return score;
    }

    public isAIGenerated(score: number): boolean {
        return score >= 60;
    }
}

