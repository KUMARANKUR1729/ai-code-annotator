import * as vscode from 'vscode';

let lastEditTime = Date.now();

export function activate(context: vscode.ExtensionContext) {

    console.log("AI Code Annotator Extension Activated");

    vscode.workspace.onDidChangeTextDocument(event => {

        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const document = event.document;

        event.contentChanges.forEach(change => {

            const insertedText = change.text;
            if (!insertedText) return;

            const insertedLines = insertedText.split('\n').length;
            const replacedLines = change.range.end.line - change.range.start.line;

            const currentTime = Date.now();
            const timeDiff = currentTime - lastEditTime;
            lastEditTime = currentTime;

            const isLargeInsert = insertedLines >= 5;
            const isLargeReplace = replacedLines >= 3;
            const isFastEdit = timeDiff < 50;

            if (isLargeInsert || isLargeReplace || isFastEdit) {

                const position = change.range.start;
                const languageId = document.languageId;
                const commentSyntax = getCommentSyntax(languageId);

                const annotation = generateAnnotation(commentSyntax);

                editor.edit(editBuilder => {
                    editBuilder.insert(position, annotation);
                });
            }
        });

    });

}

function generateAnnotation(comment: string): string {

    const today = new Date().toISOString().split('T')[0];

    return `${comment} START_AI_GENERATED_CODE\n`
        + `${comment} TOOL: GitHub Copilot\n`
        + `${comment} DATE: ${today}\n`
        + `${comment} ACTION: GENERATED\n`
        + `${comment} END_AI_GENERATED_CODE\n`;
}

function getCommentSyntax(languageId: string): string {

    switch (languageId) {
        case 'python':
        case 'shellscript':
            return '#';
        case 'html':
        case 'xml':
            return '<!--';
        case 'css':
            return '/*';
        default:
            return '//';
    }
}

export function deactivate() {}
