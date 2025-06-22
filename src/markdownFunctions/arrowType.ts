
import { tableStart,endTable } from "src/globalData/globalData";

export function arrowType(tocHeading:string):string{
    let styleText = tocHeading.slice(tableStart.length, -endTable.length).trim();
    let arrowType:string;
    switch (styleText){
        case "":
            arrowType = "default";
            break;
        default:
            arrowType = "default";
    }
    return arrowType;
}