import { Command, Plugin } from "obsidian";

export default class MyPlugin extends Plugin {
	statusBarTextElement: HTMLSpanElement;
	public splitMarkdownUp(file?: string): string[] | void {
		// Split file into two parts
		if (file == undefined) {
			return file;
		}
		const frontMatterCheckLine = "---";
		if (file.slice(0, 3) != frontMatterCheckLine) {
			return ["", file];
		}
		const frontMatterEndString = "\n---\n";
		const endFrontMatter = file.indexOf(frontMatterEndString);
		if (endFrontMatter == -1) {
			return ["", file];
		}
		const splitIndex = endFrontMatter + frontMatterEndString.length;
		return [file.slice(0, splitIndex), file.slice(splitIndex)];
	}

	public contentToTOC(fileName: string, content?: String): string | void {
		// Create TOC
		if (content != undefined) {
			const headings = content
				.split("\n# ")
				.filter((t) => t.trim() != "");
			let table_of_contents = "\n";

			let heading_1 = 1;

			headings.forEach((first) => {
				let heading_1_title = first.slice(0, first.indexOf("\n"));
				if (heading_1_title[0] == "#") {
					heading_1_title = heading_1_title.slice(2);
				}

				table_of_contents += `${heading_1}. [[${fileName}# ${heading_1_title}|${heading_1_title}]]\n`;
				heading_1 += 1;

				const test_heading_2 = first.indexOf("\n## ");
				console.log(test_heading_2);

				if (test_heading_2 != -1) {
					console.log("here");
					const heading_2_list = first.split("\n## ").slice(1);
					let heading_2 = 1;
					heading_2_list.forEach((second) => {
						const heading_2_title = second.slice(
							0,
							second.indexOf("\n")
						);
						table_of_contents += `\t${heading_2}. [[${fileName}## ${heading_2_title}|${heading_2_title}]]\n`;
						heading_2 += 1;
						const test_heading_3 = second.indexOf("### ");
						if (test_heading_3 == -1) {
							console.log("No third indent");
						}
						const heading_3_list = first.split("\n### ").slice(1);
						let heading_3 = 1;
						heading_3_list.forEach((third) => {
							const heading_3_title = third.slice(
								0,
								third.indexOf("\n")
							);
							table_of_contents += `\t\t${heading_3}. [[${fileName}### ${heading_3_title}|${heading_3_title}]]\n`;
							heading_3 += 1;
						});
					});
				}
			});
			return table_of_contents;
		}
		console.log(fileName + " was not defined");
		return content;
	}
	onload(): Promise<void> | void {
		this.addCommand({
			id: "print-greeting-to-console",
			name: "Print greeting to console",
			callback: () => {
				console.log("Hey, you!");
			},
		});
		this.addCommand({
			id: "create-table-of-contents",
			name: "Create Table Of Contents",
			callback: async () => {
				const file = this.app.workspace.getActiveFile();
				console.log(file);
				if (file) {
					const fileContent = await this.app.vault.read(file);
					const fileSplit = this.splitMarkdownUp(fileContent);
					if (fileSplit != undefined) {
						const frontmatter = fileSplit[0];
						const content = fileSplit[1];
						const toc = this.contentToTOC(file.basename, content);
						console.log(frontmatter);
						console.log(toc);
						console.log(content);
						const result = frontmatter + toc + content;
						this.app.vault.modify(file, result);
					}
				}
			},
		});
	}

	//addCommand(command: Command): Command {}
}
