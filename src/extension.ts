import * as vscode from 'vscode';
import { injectAnnotation } from './annotator/annotationInjector';

let ignoreNextChange = false;

export function activate(context: vscode.ExtensionContext) {

    console.log("AI Code Annotator Activated");

    // Override Paste Command (Ctrl+V and Right Click Paste)
    const pasteCommand = vscode.commands.registerCommand(
        'extension.handlePaste',
        async () => {
            ignoreNextChange = true;
            await vscode.commands.executeCommand('editor.action.clipboardPasteAction');
        }
    );

    context.subscriptions.push(pasteCommand);

    vscode.workspace.onDidChangeTextDocument(async (event) => {

        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        // If change triggered by paste → ignore
        if (ignoreNextChange) {
            ignoreNextChange = false;
            return;
        }

        for (const change of event.contentChanges) {

            const insertedText = change.text;
            const replacedLines = change.range.end.line - change.range.start.line;
            const insertedLines = insertedText.split('\n').length;

            const isLargeInsert = insertedLines >= 8;
            const isLargeReplace = replacedLines >= 5;

            if (isLargeInsert || isLargeReplace) {
                const position = change.range.start;
                await injectAnnotation(editor, position);
            }
        }
    });
}

export function deactivate() {}