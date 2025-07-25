import { arrowType } from "./arrowType";
import { contentToTOC } from "./contentToToc";
import { splitMarkdownUp } from "./splitMarkdownUp";

export function createToc(fileContent: string, fileName: string): string {
    const fileSplit = splitMarkdownUp(fileContent);
    const frontmatter = fileSplit[0];
    const preTOC = fileSplit[1];
    let arrowTypeTOC = arrowType(fileSplit[2]);
    const postTOC = fileSplit[3];
    const content = preTOC + postTOC;
    const toc = contentToTOC(fileName, content,arrowTypeTOC);
    const result = frontmatter + preTOC + toc + "\n" + postTOC.trim();
    return result;
}