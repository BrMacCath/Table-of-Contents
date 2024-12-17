import { Command, Plugin, TFile } from "obsidian";

export default class AutoTOC extends Plugin {
	statusBarTextElement: HTMLSpanElement;
	tableStart = "<!-- Table of Contents ";
	endComment = "-->";
	endTable = "<!-- End of TOC -->";
	public splitMarkdownUp(file?: string): string[] | void {
		// Split file into two parts
		if (file == undefined) {
			return file;
		}
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
		fileName: String,
		tabLength: number,
		content: String
	) {
		if (content == undefined) {
			return "";
		}
		let subheadingContent = "";
		const heading = "#".repeat(tabLength) + " ";
		const tabIndent = "\t".repeat(tabLength - 1);
		const splitText = "\n" + heading;
		const headings = content.split(splitText).filter((t) => t.trim() != "");
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

	public contentToTOC(fileName: string, content?: String): string | void {
		// Create TOC
		if (content == undefined) {
			console.log(fileName + " was not defined");
			return content;
		}
		let table_of_contents = this.tableStart + this.endComment + "\n";
		const tabCheck = content.indexOf("# ");
		if (tabCheck != -1) {
			table_of_contents +=
				this.createSubheading(fileName, 1, content) + "\n";
		}

		table_of_contents += this.endTable + "\n";
		return table_of_contents;
	}

	public async createToc(file: TFile | null) {
		if (file) {
			const fileContent = await this.app.vault.read(file);
			const fileSplit = this.splitMarkdownUp(fileContent);
			if (fileSplit != undefined) {
				const frontmatter = fileSplit[0];
				const preTOC = fileSplit[1];
				const postTOC = fileSplit[3];
				const content = preTOC + postTOC;
				const toc = this.contentToTOC(file.basename, content);
				const result =
					frontmatter + preTOC + toc + "\n" + postTOC.trim();
				this.app.vault.modify(file, result);
			}
		}
	}
	public async checkToc(file: TFile | null): Promise<Boolean> {
		if (!file) {
			return false;
		}
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
			name: "Create Table Of Contents",
			callback: async () => {
				const file = this.app.workspace.getActiveFile();
				this.createToc(file);
			},
		});
		this.app.workspace.on("active-leaf-change", async () => {
			const file = this.app.workspace.getActiveFile();
			if (!file) {
				return;
			}
			if (file) {
				const checkTOC = await this.checkToc(file);
				if (checkTOC) {
					this.createToc(file);
					console.log("Reran TOC");
				}
				return;
			}
		});
	}

	//addCommand(command: Command): Command {}
}
