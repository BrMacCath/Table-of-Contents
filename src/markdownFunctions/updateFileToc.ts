import { endTable, tableStart } from "src/globalData/globalData";


export function updateFileToc(fileContent:string,toc:string):string{
    const tableStartIndex = fileContent.indexOf(tableStart);
    const tableEndIndex = fileContent.indexOf(endTable)+endTable.length;
    console.log(fileContent)
    console.log(fileContent.slice(tableEndIndex))
    return fileContent.slice(0,tableStartIndex) + toc + fileContent.slice(tableEndIndex)
}
