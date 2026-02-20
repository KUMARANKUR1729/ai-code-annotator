

export class TypingTracker {

    private lastTypingTime: number = 0;
    private manualTypingCount: number = 0;

    public recordTyping() {
        this.lastTypingTime = Date.now();
        this.manualTypingCount++;
    }

    public getTimeSinceLastTyping(): number {
        return Date.now() - this.lastTypingTime;
    }

    public resetTypingCount() {
        this.manualTypingCount = 0;
    }

    public getTypingCount(): number {
        return this.manualTypingCount;
    }

    public isLikelyManualTyping(): boolean {
        const timeDiff = this.getTimeSinceLastTyping();
        return timeDiff < 200; // if user typed within last 200ms
    }
}

