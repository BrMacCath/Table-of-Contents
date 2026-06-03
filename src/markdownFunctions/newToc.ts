import { TFile } from "obsidian";
import { splitMarkdownUp } from "./splitMarkdownUp";

import { contentToTOC } from "./contentToToc";
import AutoTOCPlugin from "src/main";
import { tocProperties } from "./tocProperties";

export async function newToc(file:TFile,plugin:AutoTOCPlugin):Promise<string>{
    const fileName = file.basename;
    const fileSplit = splitMarkdownUp(await plugin.app.vault.read(file));
    const content = fileSplit[1] + fileSplit[3];
    const tocProp= tocProperties(fileSplit[2],plugin);    
    const toc = contentToTOC(fileName, content,plugin,tocProp.arrowType,tocProp.title,tocProp.codeBlocks).trim();
    return toc
}