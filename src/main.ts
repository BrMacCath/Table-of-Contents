import {  Plugin } from "obsidian";
import { createToc } from "./markdownFunctions/createToc";
import { checkToc } from "./markdownFunctions/checkTOC";
import { endTable, tableStart } from "./globalData/globalData";
import { shouldUpdateToc } from "./markdownFunctions/shouldUpdateToc";
import {updateFileToc } from "./markdownFunctions/updateFileToc";


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
				const [updateToc,toc] = await shouldUpdateToc(file)
				if(!updateToc){
					return;
				}
				const Re = new RegExp(tableStart  + ".*" + endTable)
				this.app.vault.process(file, (fileContent) => {
					return updateFileToc(fileContent,toc)
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
				const [updateToc,toc] = await shouldUpdateToc(file)
				if(!updateToc){
					return;
				}
				//const Re = new RegExp(tableStart  + ".+" + endTable)
				this.app.vault.process(file, (fileContent) => {
					return updateFileToc(fileContent,toc);
				});
				return;
			})
		);
	}
}
