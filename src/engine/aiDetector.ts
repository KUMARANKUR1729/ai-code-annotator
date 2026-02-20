

import { TypingTracker } from "./typingTracker";
import { ConfidenceEngine, DetectionMetrics } from "./confidenceEngine";

export class AIDetector {

    private typingTracker: TypingTracker;
    private confidenceEngine: ConfidenceEngine;

    constructor() {
        this.typingTracker = new TypingTracker();
        this.confidenceEngine = new ConfidenceEngine();
    }

    public recordManualTyping() {
        this.typingTracker.recordTyping();
    }

    public detect(insertedText: string, replacedLines: number): boolean {

        const insertedLines = insertedText.split('\n').length;
        const timeSinceLastTyping = this.typingTracker.getTimeSinceLastTyping();
        const typingCount = this.typingTracker.getTypingCount();

        const metrics: DetectionMetrics = {
            insertedLines,
            replacedLines,
            timeSinceLastTyping,
            typingCount
        };

        const score = this.confidenceEngine.calculateScore(metrics);

        // Reset typing count after detection
        this.typingTracker.resetTypingCount();

        return this.confidenceEngine.isAIGenerated(score);
    }
}

