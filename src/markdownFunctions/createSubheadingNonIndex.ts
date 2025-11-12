import { lineIsHeading } from "./lineIsHeading";

export function createSubheadingNonIndex(
    fileName: string,
    content: string,
    arrowType:string
) {
    if (content == undefined) {
        return "";
    }
    let subheadingContent = "";
    const space=" ";
    let tempcontent = content.split("\n").filter((t) =>{return lineIsHeading(t)})

    tempcontent.forEach((line)=>{
        const spaceIndex = line.indexOf(space);
        const heading = line.slice(0,spaceIndex);
        const headingTitle = line.slice(spaceIndex).trim();
        const tabIndent = "\t".repeat(spaceIndex-1);
        subheadingContent += `${tabIndent}${arrowType} [[${fileName}${heading}${headingTitle}|${headingTitle}]]\n`;
    })
    return subheadingContent;
}
