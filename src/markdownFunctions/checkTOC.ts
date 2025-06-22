import { TFile } from "obsidian";
import { tableStart,endTable } from "src/globalData/globalData";


export async function checkToc(file: TFile): Promise<Boolean> {
    const fileContent = await this.app.vault.read(file);
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
