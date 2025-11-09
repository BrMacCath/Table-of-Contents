
import { arrowTypeChoices } from "ArrowType/choices/arrowTypeChoices";
import { Notice } from "obsidian";
import { tableStart, endComment } from "src/globalData/globalData";
import AutoTOCPlugin from "src/main";

export function tocProperties(tocHeading:string,plugin:AutoTOCPlugin):string[]{
    const endCommentIndex = tocHeading.indexOf(endComment);
    if(endCommentIndex==-1){
        new Notice("The end comment the start of the table of contents was missing. Using default settings.")
        return [plugin.settings.arrowType, plugin.settings.title];
    }
    let styleText = tocHeading.slice(tableStart.length, endCommentIndex).trim();
    const tocProperties = styleText.split(" | ").flatMap((text)=>{
        const valueSeparator = text.indexOf(":")+1;
        const value = text.slice(valueSeparator).trim();
        return value
    })
    const valueSeparator = styleText.indexOf(":")+1;
    if( arrowTypeChoices.indexOf(tocProperties[0])>-1){
        return tocProperties;
    }
    console.log(tocProperties[0])
    new Notice("The arrow type you entered was not recognised. Using default setting arrow.")
    tocProperties[0] = plugin.settings.arrowType;
    return tocProperties;

}