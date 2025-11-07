import { tableStart,endComment,tocTitle,endTable } from "src/globalData/globalData";
import { createSubheadingIndex } from "./createSubheadingIndex";
import AutoTOCPlugin from "src/main";
import { createSubheadingNonIndex } from "./createSubheadingNonIndex";

export function contentToTOC(fileName: string, content: string,plugin:AutoTOCPlugin, arrowType?: string): string {
    // Create TOC
    const numberArrow = "Index";

    if(!arrowType){
        arrowType = plugin.settings.arrowType
    }
    let table_of_contents =
        tableStart + "arrowType: "+ arrowType + " " +endComment + "\n" + tocTitle;
    const tabCheck = content.indexOf("# ");
    if (tabCheck == -1) {
        return table_of_contents + endTable + "\n";
    }
    if(arrowType == numberArrow){
        table_of_contents += createSubheadingIndex(fileName, 1, content) + "\n";
    }else{
        table_of_contents += createSubheadingNonIndex(fileName, 1, content,arrowType) +"\n";
    }
    table_of_contents += endTable + "\n";
    return table_of_contents;
}