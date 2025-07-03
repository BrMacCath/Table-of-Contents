
import { splitMarkdownUp } from "./splitMarkdownUp";

export function oldToc(fileContent: string): string {
    const fileSplit = splitMarkdownUp(fileContent);
    return fileSplit[2];

}