

export function generateAnnotation(commentStart: string, commentEnd?: string): string {

    const today = new Date().toISOString().split('T')[0];

    if (commentEnd) {
        return `${commentStart} START_AI_GENERATED_CODE ${commentEnd}\n`
            + `${commentStart} TOOL: GitHub Copilot ${commentEnd}\n`
            + `${commentStart} DATE: ${today} ${commentEnd}\n`
            + `${commentStart} ACTION: GENERATED ${commentEnd}\n`
            + `${commentStart} END_AI_GENERATED_CODE ${commentEnd}\n`;
    }

    return `${commentStart} START_AI_GENERATED_CODE\n`
        + `${commentStart} TOOL: GitHub Copilot\n`
        + `${commentStart} DATE: ${today}\n`
        + `${commentStart} ACTION: GENERATED\n`
        + `${commentStart} END_AI_GENERATED_CODE\n`;
}

