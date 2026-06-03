import { TFile } from "obsidian";
import { tableStart,endTable } from "src/globalData/globalData";
import AutoTOCPlugin from "src/main";


export async function checkToc(file: TFile,plugin:AutoTOCPlugin): Promise<boolean> {
    const fileContent = await plugin.app.vault.read(file);
    const tocStart = fileContent.indexOf(tableStart);
    if (tocStart == -1) {
        return false;
    }
    const tocEnd = fileContent.indexOf(endTable);
    if (tocEnd > tocStart) {
        return true;
    }
    return false;
}
