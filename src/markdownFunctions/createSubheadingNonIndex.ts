export function createSubheadingNonIndex(
    fileName: string,
    tabLength: number,
    content: string,
    arrowType:string
) {
    if (content == undefined) {
        return "";
    }
    let subheadingContent = "";
    const heading = "#".repeat(tabLength) + " ";
    const tabIndent = "\t".repeat(tabLength - 1);
    const splitText = "\n" + heading;
    const contentStartsWithHeading = content.trim()[0] =="#";
    let headings = content.trim().split(splitText).filter((t) => t.trim() != "");
    // If the content does not start with a heading it should not be counted.
    if(!contentStartsWithHeading){
        headings = headings.slice(1);
    }
    let headingNum = 1;
    headings.forEach((section) => {
        const lineCheck = section.indexOf("\n");
        const lineSplit = lineCheck == -1 ? section.length : lineCheck;
        let headingTitle = section.slice(0, lineSplit);
        if (headingTitle.slice(0, heading.length) == heading) {
            headingTitle = headingTitle.slice(heading.length);
        }
        subheadingContent += `${tabIndent}${arrowType} [[${fileName}${heading}${headingTitle}|${headingTitle}]]\n`;
        headingNum += 1;
        const subheading = heading.replace(" ", "#");
        const subheadingLocation = section.indexOf(subheading);
        if (subheadingLocation != -1) {
            subheadingContent += createSubheadingNonIndex(
                fileName,
                tabLength + 1,
                section.slice(subheadingLocation),
                arrowType
            );
        }
    });
    return subheadingContent;
}
