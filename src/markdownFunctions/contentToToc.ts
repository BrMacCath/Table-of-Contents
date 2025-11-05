import { tableStart,endComment,tocTitle,endTable } from "src/globalData/globalData";
import { createSubheading } from "./createSubheading";

export function contentToTOC(fileName: string, content: string, arrowType?: string): string {
    // Create TOC
    let table_of_contents =
        tableStart +endComment + "\n" + tocTitle;
    const tabCheck = content.indexOf("# ");
    if (tabCheck != -1) {
        table_of_contents +=
            createSubheading(fileName, 1, content) + "\n";
    }
    table_of_contents += endTable + "\n";
    return table_of_contents;
}