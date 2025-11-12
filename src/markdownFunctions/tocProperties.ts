
import { arrowTypeChoices } from "ArrowType/choices/arrowTypeChoices";
import { Notice } from "obsidian";
import { tableStart, endComment } from "src/globalData/globalData";
import AutoTOCPlugin from "src/main";
import { DEFAULT_SETTINGS, TOCSettings } from "src/tocSettings";

export function tocProperties(tocHeading:string,plugin:AutoTOCPlugin):TOCSettings{
    const propertySeparator = " | "
    const endCommentIndex = tocHeading.indexOf(endComment);
    if(endCommentIndex==-1){
        new Notice("The end comment the start of the table of contents was missing. Using default settings.")
        return plugin.settings;
    }
    let styleText = tocHeading.slice(tableStart.length, endCommentIndex).trim();
    const tocProperties = styleText.split(propertySeparator).flatMap((text)=>{
        const valueSeparator = text.indexOf(":")+1;
        const value = text.slice(valueSeparator).trim();
        return value
    })
    if(tocProperties.length < Object.keys(DEFAULT_SETTINGS).length){
        new Notice("Your toc was missing a property. Using default properties")
        return plugin.settings
    }
    const title = tocProperties[1]
    const codeBlocks = tocProperties[2]
    
    if( arrowTypeChoices.indexOf(tocProperties[0])>-1){
        const arrowType = tocProperties[0]
        const tocSettings:TOCSettings ={arrowType:arrowType, title:title,codeBlocks:codeBlocks }
        return tocSettings;
    }
    
    new Notice("The arrow type you entered was not recognised. Using default setting arrow.")
    const arrowType = plugin.settings.arrowType;
    const tocSettings:TOCSettings ={arrowType:arrowType, title:title,codeBlocks:codeBlocks }
    return tocSettings;

}