// File Created for text sanitization functionality.
// Removes html, bold and italic text, code, highlights, striketroughs, wikilinks.
export function stripMarkdown(text: string): string {
    return text
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/`/g, '')
        .replace(/==/g, '')
        .replace(/~~/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

export function stripHtml(text: string): string {
    return text.replace(/<[^>]+>/g, '');
}

export function stripWikilinks(text: string): string {
    return text
        .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
        .replace(/\[\[([^\]]+)\]\]/g, '$1')
        .replace(/\[\[/g, '')
        .replace(/\]\]/g, '');
}

export function stripFootnotes(text: string): string {
    return text.replace(/\[\^[^\]]+\]/g, '');
}

// For link targets - keep more formatting but remove wikilinks and footnotes
export function sanitizeLinkTarget(text: string): string {
    let sanitized = text;
    sanitized = stripWikilinks(sanitized);
    sanitized = stripFootnotes(sanitized);
    return sanitized.trim();
}

// For display text - remove all formatting
export function sanitizeHeadingText(text: string): string {
    let sanitized = text;
    sanitized = stripMarkdown(sanitized);
    sanitized = stripHtml(sanitized);
    sanitized = stripWikilinks(sanitized);
    sanitized = stripFootnotes(sanitized);
    return sanitized.trim();
}
