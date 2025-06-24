import { tableStart,endTable } from "src/globalData/globalData";
// Splits up the markdown file up into its parts, namely
// [frontmatter, preTOC, TOC, postTOC]

export function splitMarkdownUp(file: string): string[] {
    const frontMatterCheckLine = "---";
    const tocStart = file.indexOf(tableStart);
    if (file.slice(0, 3) != frontMatterCheckLine) {
        if (tocStart == -1) {
            return ["", "", "", file];
        }
        const tocEnd = file.indexOf(endTable) + endTable.length;
        return [
            "",
            file.slice(0, tocStart),
            file.slice(tocStart, tocEnd),
            file.slice(tocEnd),
        ];
    }
    const frontMatterEndString = "\n---\n";
    const endFrontMatter = file.indexOf(frontMatterEndString);

    if (endFrontMatter == -1) {
        if (tocStart == -1) {
            return ["", "", "", file];
        }
        const tocEnd = file.indexOf(endTable) + endTable.length;
        return [
            "",
            file.slice(0, tocStart),
            file.slice(tocStart, tocEnd),
            file.slice(tocEnd),
        ];
    }

    if (tocStart == -1) {
        const splitIndex = endFrontMatter + frontMatterEndString.length;
        return [file.slice(0, splitIndex), "", "", file.slice(splitIndex)];
    }
    const tocEnd = file.indexOf(endTable) + endTable.length;
    const splitIndex = endFrontMatter + frontMatterEndString.length;
    return [
        file.slice(0, splitIndex),
        file.slice(splitIndex, tocStart),
        file.slice(tocStart, tocEnd),
        file.slice(tocEnd),
    ];
}
