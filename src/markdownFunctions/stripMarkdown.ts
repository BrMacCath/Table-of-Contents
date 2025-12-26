// File Created for text sanitization functionality.
// Removes html, bold and italic text, code, highlights, striketroughs, wikilinks.
// credit to u/spud80 for the majority of this code.

import { textAdjustProperties } from "src/textRemovingPermissions";

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

export function stripFootnotesForHeading(text: string){
    return text.replace(/\[\^(.+?)\]/g, '[ $1]');
}

// For link targets - keep more formatting but remove wikilinks and footnotes
export function sanitizeLinkTarget(text: string): string {
    let sanitized = text;
    sanitized = stripWikilinks(sanitized);
    sanitized = stripFootnotesForHeading(sanitized);
    return sanitized.trim();
}

// For display text - remove all formatting
export function sanitizeHeadingText(text: string, textStyling: textAdjustProperties): string {
    let sanitized = text;
    if(textStyling.removeTextStyling){
        sanitized = stripMarkdown(sanitized);
    }
    if(textStyling.removeHtml){
        sanitized = stripHtml(sanitized);
    }

    if(textStyling.removeWikilinks){
        sanitized = stripWikilinks(sanitized);
    }
    if(textStyling.removeFootnotes){
        sanitized = stripFootnotes(sanitized);
    }
    return sanitized.trim();
}
