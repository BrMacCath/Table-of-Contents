import { TFile } from "obsidian";
import { splitMarkdownUp } from "./splitMarkdownUp";
import { arrowType } from "./arrowType";
import { oldToc } from "./oldToc";
import { contentToTOC } from "./contentToToc";

export async function shouldUpdateToc(file:TFile):Promise<[boolean,string]>{
    const fileName = file.basename;
    const fileSplit = splitMarkdownUp(await this.app.vault.read(file));
    let arrowTypeTOC = arrowType(fileSplit[2]);
    const content = fileSplit[1] + fileSplit[3];
    const toc = contentToTOC(fileName, content,arrowTypeTOC);
    const oldTocMD = oldToc(await this.app.vault.cachedRead(file));
    const updateToc:boolean = toc == oldTocMD;
    return [updateToc,toc];
}