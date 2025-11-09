import { TFile } from "obsidian";
import { splitMarkdownUp } from "./splitMarkdownUp";
import { arrowType } from "./arrowType";
import { oldToc } from "./oldToc";
import { contentToTOC } from "./contentToToc";
import AutoTOCPlugin from "src/main";
import { tocProperties } from "./tocProperties";

export async function shouldUpdateToc(file:TFile,plugin:AutoTOCPlugin):Promise<[boolean,string]>{
    const fileName = file.basename;
    const fileSplit = splitMarkdownUp(await this.app.vault.read(file));
    const content = fileSplit[1] + fileSplit[3];
    const tocProp= tocProperties(fileSplit[2],plugin);    
    const toc = contentToTOC(fileName, content,plugin,tocProp[0],tocProp[1]).trim();
    const oldTocMD = oldToc(await this.app.vault.cachedRead(file)).trim();
    const updateToc:boolean = !(toc === oldTocMD);
    return [updateToc,toc];
}