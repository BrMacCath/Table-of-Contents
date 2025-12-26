import { tableStart,endComment,endTable } from "src/globalData/globalData";
import { createSubheadingIndex } from "./createSubheadingIndex";
import AutoTOCPlugin from "src/main";
import { createSubheadingNonIndex } from "./createSubheadingNonIndex";
import { removeCodeBlocks } from "./removeCodeBlocks";
import { lineIsHeading } from "./lineIsHeading";

export function contentToTOC(fileName: string, content: string,plugin:AutoTOCPlugin, arrowType?: string,title?:string,codeBlocks?:string): string {
    // Create TOC
    const numberArrow = "Index";
    const newLine = "\n";
    const heading ="# "
    const propertySeparator = " | ";
    const hasCodeBlocks = "y";
    if(!arrowType){
        arrowType = plugin.settings.tocSettings.arrowType
    }
    if(!title){
        title = plugin.settings.tocSettings.title
    }
    if(!codeBlocks){
        codeBlocks = plugin.settings.tocSettings.codeBlocks
    }

    let table_of_contents =
        tableStart + "arrowType: "+ arrowType + propertySeparator 
        + "title: "+ title+ " "+propertySeparator 
        + "codeBlocks: "+ codeBlocks+ " " +endComment
        + newLine  + heading + title + newLine;
    if(codeBlocks === hasCodeBlocks){
        content = removeCodeBlocks(content);
    }
    const tabCheck = content.indexOf("# ");
    if (tabCheck == -1) {
        return table_of_contents + endTable + "\n";
    }
    const headings = content.split(newLine).filter((t) =>{
        return lineIsHeading(t);
    }).join("\n")
    if(arrowType == numberArrow){
        table_of_contents += createSubheadingIndex(fileName, headings,plugin.settings.removeCharactersFromTitles,plugin.settings.textStyling) + "\n";
    }else{
        table_of_contents += createSubheadingNonIndex(fileName, headings,arrowType,plugin.settings.removeCharactersFromTitles,plugin.settings.textStyling) +"\n";
    }
    table_of_contents += endTable + "\n";
    return table_of_contents;
}