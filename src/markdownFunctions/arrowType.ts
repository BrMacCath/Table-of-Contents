
import { arrowTypeChoices } from "ArrowType/choices/arrowTypeChoices";
import { Notice } from "obsidian";
import { tableStart, endComment } from "src/globalData/globalData";
import AutoTOCPlugin from "src/main";

export function arrowType(tocHeading:string,plugin:AutoTOCPlugin):string{
    const endCommentIndex = tocHeading.indexOf(endComment);
    if(endCommentIndex==-1){
        new Notice("The end comment the start of the table of contents was missing. Using default setting arrow.")
        return plugin.settings.tocSettings.arrowType;
    }
    let styleText = tocHeading.slice(tableStart.length, endCommentIndex).trim();
    const valueSeparator = styleText.indexOf(":")+1;
    const arrowType = styleText.slice(valueSeparator).trim();
    if( arrowTypeChoices.indexOf(arrowType)>-1){
        return arrowType;
    }
    new Notice("The arrow type you entered was not recognised. Using default setting arrow.")
    return plugin.settings.tocSettings.arrowType;

}