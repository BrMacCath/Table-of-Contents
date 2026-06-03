import { textAdjustProperties } from "src/textRemovingPermissions";
import { lineIsHeading } from "./lineIsHeading";
import { removeListOfCharactersFromString } from "./removeListOfCharactersFromString";
import { sanitizeHeadingText, sanitizeLinkTarget } from "./stripMarkdown";

export function createSubheadingNonIndex(
    fileName: string,
    content: string,
    arrowType:string,
    removeCharList: string[],
    textStyling: textAdjustProperties,
    shorterHeadingLinks: boolean
) {
    if (content == undefined) {
        return "";
    }
    let subheadingContent = "";
    const space=" ";
    let minDepth = content.indexOf(space);
    const tempcontent = content.split("\n").filter((t) =>{return lineIsHeading(t)})
    tempcontent.forEach((t)=>{
        const spaceIndex = t.indexOf(space)
        if (spaceIndex<minDepth){minDepth=spaceIndex}
    })
    console.log(shorterHeadingLinks)
    tempcontent.forEach((line)=>{
        const spaceIndex = line.indexOf(space);
        let heading = "";
        if( shorterHeadingLinks){
            heading = "#"
        }
        else{
            heading = line.slice(0,spaceIndex);
        }
        const headingTitle = line.slice(spaceIndex).trim();
        const tabIndent = "\t".repeat(spaceIndex-minDepth);
        
        const linkTarget = sanitizeLinkTarget(headingTitle);
        const displayText = sanitizeHeadingText(removeListOfCharactersFromString(headingTitle, removeCharList),textStyling);
        
        subheadingContent += `${tabIndent}${arrowType} [[${fileName}${heading}${linkTarget}|${displayText}]]\n`;
    })
    return subheadingContent;
}
