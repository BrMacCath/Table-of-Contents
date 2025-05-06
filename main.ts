import { Command, Plugin, TFile } from "obsidian";

export default class AutoTOC extends Plugin {
	statusBarTextElement: HTMLSpanElement;
	tableStart = "<!-- Table of Contents ";
	endComment = "-->";
	endTable = "<!-- End of TOC -->";
	tocTitle = "# Table of Contents\n";
	public splitMarkdownUp(file: string): string[] {
		const frontMatterCheckLine = "---";
		const tocStart = file.indexOf(this.tableStart);
		if (file.slice(0, 3) != frontMatterCheckLine) {
			if (tocStart == -1) {
				return ["", "", "", file];
			}
			const tocEnd = file.indexOf(this.endTable) + this.endTable.length;
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
			const tocEnd = file.indexOf(this.endTable) + this.endTable.length;
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
		const tocEnd = file.indexOf(this.endTable) + this.endTable.length;
		const splitIndex = endFrontMatter + frontMatterEndString.length;
		return [
			file.slice(0, splitIndex),
			file.slice(splitIndex, tocStart),
			file.slice(tocStart, tocEnd),
			file.slice(tocEnd),
		];
	}
	public createSubheading(
		fileName: string,
		tabLength: number,
		content: string
	) {
		if (content == undefined) {
			return "";
		}
		let subheadingContent = "";
		const heading = "#".repeat(tabLength) + " ";
		const tabIndent = "\t".repeat(tabLength - 1);
		const splitText = "\n" + heading;
		const contentStartsWithHeading = content[0] =="#";
		
		let headings = content.split(splitText).filter((t) => t.trim() != "");
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
			subheadingContent += `${tabIndent}${headingNum}. [[${fileName}${heading}${headingTitle}|${headingTitle}]]\n`;
			headingNum += 1;
			const subheading = heading.replace(" ", "#");
			const subheadingLocation = section.indexOf(subheading);
			if (subheadingLocation != -1) {
				subheadingContent += this.createSubheading(
					fileName,
					tabLength + 1,
					section.slice(subheadingLocation)
				);
			}
		});
		return subheadingContent;
	}

	public contentToTOC(fileName: string, content: string, arrowType: string =""): string {
		// Create TOC
		let table_of_contents =
			this.tableStart + arrowType +this.endComment + "\n" + this.tocTitle;
		const tabCheck = content.indexOf("# ");
		if (tabCheck != -1) {
			table_of_contents +=
				this.createSubheading(fileName, 1, content) + "\n";
		}
		table_of_contents += this.endTable + "\n";
		return table_of_contents;
	}
	public arrowType(tocHeading:string):string{
		let styleText = tocHeading.slice(this.tableStart.length, -this.endTable.length).trim();
		let arrowType:string;
		switch (styleText){
			case "":
				arrowType = "default";
				break;
			default:
				arrowType = "default";
		}
		return arrowType;
	}

	public createToc(fileContent: string, fileName: string): string {
		const fileSplit = this.splitMarkdownUp(fileContent);
		const frontmatter = fileSplit[0];
		const preTOC = fileSplit[1];
		let arrowType = this.arrowType(fileSplit[2]);
		const postTOC = fileSplit[3];
		const content = preTOC + postTOC;
		const toc = this.contentToTOC(fileName, content,arrowType);
		const result = frontmatter + preTOC + toc + "\n" + postTOC.trim();
		return result;
	}
	public async checkToc(file: TFile): Promise<Boolean> {
		const fileContent = await this.app.vault.read(file);
		const tocStart = fileContent.indexOf(this.tableStart);
		if (tocStart == -1) {
			return false;
		}
		const tocEnd = fileContent.indexOf(this.endTable);
		if (tocEnd > tocStart) {
			return true;
		}
		return false;
	}
	onload(): Promise<void> | void {
		this.addCommand({
			id: "create-table-of-contents",
			name: "Create table of contents",
			callback: async () => {
				const file = this.app.workspace.getActiveFile();
				if (file) {
					const fileContent = await this.app.vault.read(file);
					const fileName = file.basename;
					this.app.vault.process(file, (fileContent) => {
						return this.createToc(fileContent, fileName);
					});
				}
			},
		});
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", async () => {
				const file = this.app.workspace.getActiveFile();
				if (!file) {
					return;
				}
				const checkTOC = await this.checkToc(file);
				if (checkTOC) {
					const fileContent = await this.app.vault.read(file);
					const fileName = file.basename;
					this.app.vault.process(file, (fileContent) => {
						return this.createToc(fileContent, fileName);
					});
				}
				return;
			})
		);
		this.registerEvent(
			this.app.workspace.on("editor-change", async () => {
				const file = this.app.workspace.getActiveFile();
				if (!file) {
					return;
				}
				const checkTOC = await this.checkToc(file);
				if (checkTOC) {
					const fileContent = await this.app.vault.read(file);
					const fileName = file.basename;
					this.app.vault.process(file, (fileContent) => {
						return this.createToc(fileContent, fileName);
					});
				}
				return;
			})
		);
	}
}
