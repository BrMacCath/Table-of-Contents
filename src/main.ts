import {  Plugin } from "obsidian";
import { createToc } from "./markdownFunctions/createToc";
import { checkToc } from "./markdownFunctions/checkTOC";
import { splitMarkdownUp } from "./markdownFunctions/splitMarkdownUp";
import { arrowType } from "./markdownFunctions/arrowType";
import { contentToTOC } from "./markdownFunctions/contentToToc";
import { endTable, tableStart } from "./globalData/globalData";
import { oldToc } from "./markdownFunctions/oldToc";


// Maybe use app.process instead of app.read and app.modify

export default class AutoTOC extends Plugin {
	statusBarTextElement: HTMLSpanElement;
	
	async onload(): Promise<void> {
		this.addCommand({
			id: "create-table-of-contents",
			name: "Create table of contents",
			callback: async () => {
				const file = this.app.workspace.getActiveFile();
				if (file) {
					const fileName = file.basename;
					this.app.vault.process(file, (fileContent) => {
						return createToc(fileContent, fileName);
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
				const checkTOC = await checkToc(file);
				if (!checkTOC) {
					return;
				}
				const fileName = file.basename;
				const fileSplit = splitMarkdownUp(await this.app.vault.read(file));
				let arrowTypeTOC = arrowType(fileSplit[2]);
				const content = fileSplit[1] + fileSplit[3];
				const toc = contentToTOC(fileName, content,arrowTypeTOC);
				const oldTocMD = oldToc(await this.app.vault.cachedRead(file))
				if (toc == oldTocMD){
					return;
				}
				const Re = new RegExp(tableStart  + ".+" + endTable)
				this.app.vault.process(file, (fileContent) => {
					return fileContent.replace(Re,toc);
				});
				return;
			})
		);
		this.registerEvent(
			this.app.workspace.on("editor-change", async () => {
				const file = this.app.workspace.getActiveFile();
				if (!file) {
					return;
				}
				const checkTOC = await checkToc(file);
				if (!checkTOC) {
					return;
				}
				const fileName = file.basename;
				const fileSplit = splitMarkdownUp(await this.app.vault.read(file));
				let arrowTypeTOC = arrowType(fileSplit[2]);
				const content = fileSplit[1] + fileSplit[3];
				const toc = contentToTOC(fileName, content,arrowTypeTOC);
				const oldTocMD = oldToc(await this.app.vault.cachedRead(file))
				if (toc == oldTocMD){
					return;
				}
				const Re = new RegExp(tableStart  + ".+" + endTable)
				this.app.vault.process(file, (fileContent) => {
					return fileContent.replace(Re,toc);
				});
				return;
			})
		);
	}
}
