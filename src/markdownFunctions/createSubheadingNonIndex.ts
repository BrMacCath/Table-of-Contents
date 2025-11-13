import { lineIsHeading } from "./lineIsHeading";
import { removeListOfCharactersFromString } from "./removeListOfCharactersFromString";

export function createSubheadingNonIndex(
    fileName: string,
    content: string,
    arrowType:string,
    removeCharList: string[]
) {
    if (content == undefined) {
        return "";
    }
    let subheadingContent = "";
    const space=" ";
    let minDepth = content.indexOf(space);
    let tempcontent = content.split("\n").filter((t) =>{return lineIsHeading(t)})
    tempcontent.forEach((t)=>{
        const spaceIndex = t.indexOf(space)
        if (spaceIndex<minDepth){minDepth=spaceIndex}
    })

    tempcontent.forEach((line)=>{
        const spaceIndex = line.indexOf(space);
        const heading = line.slice(0,spaceIndex);
        const headingTitle = line.slice(spaceIndex).trim();
        const tabIndent = "\t".repeat(spaceIndex-minDepth);
        subheadingContent += `${tabIndent}${arrowType} [[${fileName}${heading}${headingTitle}|${removeListOfCharactersFromString(headingTitle,removeCharList)}]]\n`;
    })
    return subheadingContent;
}
