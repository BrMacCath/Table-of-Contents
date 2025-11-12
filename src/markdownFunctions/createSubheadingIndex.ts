export function createSubheadingIndex(
    fileName: string,
    content: string
) {
    if (content == undefined) {
        return "";
    }
    let subheadingContent = "";
    
    
    let maxDepth = 0;
    let tempContent:[number,string][] =[]
    content.split("\n").forEach((line) =>{
        const spaceIndex = line.indexOf(" ");
        if(spaceIndex>maxDepth){maxDepth = spaceIndex}
       tempContent.push([spaceIndex,line.slice(spaceIndex).trim()])
    } )
    let indexNumArray = new Array(maxDepth).fill(0);

    tempContent.forEach((headingContent)=>{
        const headingDepth= headingContent[0];
        const headingTitle = headingContent[1];
        const headingSignifier = "#".repeat(headingDepth);
        const tabIndent = "\t".repeat(headingDepth-1);
        const headingNum = indexNumArray[headingDepth-1]+1;
        indexNumArray[headingDepth-1] += 1;
        for(let i=headingDepth;i<maxDepth;i++){
            indexNumArray[i] = 0;
        }
        subheadingContent += `${tabIndent}${headingNum}. [[${fileName}${headingSignifier}${headingTitle}|${headingTitle}]]\n`;
    } )
    return subheadingContent;
}
