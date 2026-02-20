

import * as vscode from 'vscode';
import { getCommentSyntax } from '../utils/languageUtils';
import { generateAnnotation } from './annotationFormatter';

export async function injectAnnotation(
    editor: vscode.TextEditor,
    position: vscode.Position
) {

    const languageId = editor.document.languageId;
    const syntax = getCommentSyntax(languageId);

    const annotation = generateAnnotation(syntax.start, syntax.end);

    await editor.edit(editBuilder => {
        editBuilder.insert(position, annotation);
    });
}

