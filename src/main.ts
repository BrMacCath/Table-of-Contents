import {   App, Editor, MarkdownFileInfo, Plugin, PluginSettingTab, Setting } from "obsidian";
import { createToc } from "./markdownFunctions/createToc";
import { checkToc } from "./markdownFunctions/checkTOC";
import { endTable, tableStart, tocTitle } from "./globalData/globalData";
import { shouldUpdateToc } from "./markdownFunctions/shouldUpdateToc";
import {updateFileToc } from "./markdownFunctions/updateFileToc";
import { contentToTOC } from "./markdownFunctions/contentToToc";
import { arrowTypeChoices } from "ArrowType/choices/arrowTypeChoices";

interface TOCSetting{
	arrowType:string;
}
const DEFAULT_SETTINGS: TOCSetting = {
	arrowType: arrowTypeChoices[0]
}


class TOCTab extends PluginSettingTab{
	plugin: AutoTOCPlugin
	constructor(app:App,plugin:AutoTOCPlugin){
		super(app,plugin)
	}
	display(): void {
		const {containerEl} = this;;
		containerEl.empty();
		new Setting(containerEl).setName("Adjust table of contents conditions").setHeading()
		new Setting(containerEl).setName("Choose list style")
        .setDesc("Choose the arrow type for your table of contents")
        .addDropdown((dropdown) =>{
            for (let i=0; i< arrowTypeChoices.length;i++){
                dropdown.addOption(arrowTypeChoices[i],arrowTypeChoices[i])
            }
            dropdown.setValue(this.plugin.settings.arrowType);
            dropdown.onChange(async (value) =>{
                this.plugin.settings.arrowType = value;
                await this.plugin.saveSettings();
            })
        })

	}


}

export default class AutoTOCPlugin extends Plugin {
	statusBarTextElement: HTMLSpanElement;
	settings:TOCSetting;

	async onload(): Promise<void> {
		await this.loadSettings()
		this.addSettingTab(new TOCTab(this.app,this))
		this.addCommand({
			id: "create-table-of-contents",
			name: "Create table of contents",
			callback: async () => {
				const file = this.app.workspace.getActiveFile();
				if (file) {
					const fileName = file.basename;
					this.app.vault.process(file, (fileContent) => {
						return createToc(fileContent, fileName,this);
					});
				}
			},
		});
		this.addCommand({
			id: "create-table-of-contents-at-cursor",
			name: "Create table of contents at cursor",
			editorCallback: (editor:Editor,ctx:MarkdownFileInfo) =>{
				//
				const rawFileName = ctx.file?.name;
				const periodIndex = rawFileName?.indexOf(".")
				console.log(ctx.file?.name)
				const cursorPosition = editor.getCursor()
				if( rawFileName === undefined){
					return;
				}
				const toc = contentToTOC(rawFileName?.slice(0,periodIndex),editor.getValue(),this)
				editor.replaceRange(toc,cursorPosition)
			} ,
			
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
				const [updateToc,toc] = await shouldUpdateToc(file,this)
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
				const [updateToc,toc] = await shouldUpdateToc(file,this)
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
	onunload() {

	}
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
