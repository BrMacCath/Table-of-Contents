import { endTable, tableStart } from "src/globalData/globalData";


export function updateFileToc(fileContent:string,toc:string):string{
    const tableStartIndex = fileContent.indexOf(tableStart);
    const tableEndIndex = fileContent.indexOf(endTable)+endTable.length;
    return fileContent.slice(0,tableStartIndex) + toc + fileContent.slice(tableEndIndex)
}
