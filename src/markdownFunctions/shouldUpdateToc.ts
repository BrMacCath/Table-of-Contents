import { TFile } from "obsidian";
import { oldToc } from "./oldToc";
import AutoTOCPlugin from "src/main";
import { newToc } from "./newToc";

export async function shouldUpdateToc(file:TFile,plugin:AutoTOCPlugin):Promise<[boolean,string]>{
    const toc = await newToc(file,plugin)
    const oldTocMD = oldToc(await plugin.app.vault.cachedRead(file)).trim();
    const updateToc = !(toc === oldTocMD);
    return [updateToc,toc];
}