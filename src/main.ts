import {  Plugin } from "obsidian";
import { createToc } from "./markdownFunctions/createToc";
import { checkToc } from "./markdownFunctions/checkTOC";
import { waitTime } from "./waitMechanic/wait";

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
				if (checkTOC) {
					const fileName = file.basename;
					this.app.vault.process(file, (fileContent) => {
						return createToc(fileContent, fileName);
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
				const checkTOC = await checkToc(file);
				if (checkTOC) {
					const fileName = file.basename;
					this.app.vault.process(file, (fileContent) => {
						return createToc(fileContent, fileName);
					});
				}
				return;
			})
		);
	}
}
