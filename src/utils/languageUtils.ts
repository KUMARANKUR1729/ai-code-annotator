

export function getCommentSyntax(languageId: string): { start: string; end?: string } {

    switch (languageId) {

        case 'python':
        case 'shellscript':
            return { start: '#' };

        case 'html':
        case 'xml':
            return { start: '<!--', end: '-->' };

        case 'css':
            return { start: '/*', end: '*/' };

        case 'sql':
            return { start: '--' };

        default:
            return { start: '//' };
    }
}

