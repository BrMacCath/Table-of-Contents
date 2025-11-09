import AutoTOCPlugin from "src/main";
import { contentToTOC } from "./contentToToc";
import { splitMarkdownUp } from "./splitMarkdownUp";

export function createToc(fileContent: string, fileName: string,plugin:AutoTOCPlugin,arrowTypeTOC?:string,title?:string): string {
    const fileSplit = splitMarkdownUp(fileContent);
    const frontmatter = fileSplit[0];
    const preTOC = fileSplit[1];
    if(!arrowTypeTOC){
        arrowTypeTOC = plugin.settings.arrowType;
    }
    if(!title){
        title = plugin.settings.title;
    }
    const postTOC = fileSplit[3];
    const content = preTOC + postTOC;
    const toc = contentToTOC(fileName, content,plugin,arrowTypeTOC);
    const result = frontmatter + preTOC + toc + "\n" + postTOC.trim();
    return result;
}