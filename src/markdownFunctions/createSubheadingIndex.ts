export function createSubheadingIndex(
    fileName: string,
    content: string
) {
    if (content == undefined) {
        return "";
    }
    let subheadingContent = "";
    
    
    let maxDepth = 0;
    // minDepth is to push the table of contents back a bit
    // if we don't have any # headings but if every heading
    // has multiple hashtags.
    let minDepth = content.indexOf(" ")

    let tempContent:[number,string][] =[]
    content.split("\n").forEach((line) =>{
        const spaceIndex = line.indexOf(" ");
        if(spaceIndex>maxDepth){maxDepth = spaceIndex}
        if(spaceIndex<minDepth){minDepth = spaceIndex}
       tempContent.push([spaceIndex,line.slice(spaceIndex).trim()])
    } )
    let indexNumArray = new Array(maxDepth).fill(0);

    tempContent.forEach((headingContent)=>{
        const headingDepth= headingContent[0];
        const headingTitle = headingContent[1];
        const headingSignifier = "#".repeat(headingDepth);
        const tabIndent = "\t".repeat(headingDepth-minDepth);
        const headingNum = indexNumArray[headingDepth-1]+1;
        indexNumArray[headingDepth-1] += 1;
        for(let i=headingDepth;i<maxDepth;i++){
            indexNumArray[i] = 0;
        }
        subheadingContent += `${tabIndent}${headingNum}. [[${fileName}${headingSignifier}${headingTitle}|${headingTitle}]]\n`;
    } )
    return subheadingContent;
}
