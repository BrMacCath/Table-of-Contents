import { App, Editor, MarkdownFileInfo, Notice, Plugin, PluginSettingTab, Setting } from "obsidian";
import { createToc } from "./markdownFunctions/createToc";
import { checkToc } from "./markdownFunctions/checkTOC";
import { shouldUpdateToc } from "./markdownFunctions/shouldUpdateToc";
import {updateFileToc } from "./markdownFunctions/updateFileToc";
import { contentToTOC } from "./markdownFunctions/contentToToc";
import { arrowTypeChoices } from "ArrowType/choices/arrowTypeChoices";
import { DEFAULT_SETTINGS, totalTOCSettings } from "./totalTocSettings";
import { RemoveCharactersFromTitles } from "./modal/RemoveCharactersModal";
import { headingUpdated } from "./markdownFunctions/headingUpdated";

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
            dropdown.setValue(this.plugin.settings.tocSettings.arrowType);
            dropdown.onChange(async (value) =>{
                this.plugin.settings.tocSettings.arrowType = value;
                await this.plugin.saveSettings();
            })
        })
		new Setting(containerEl).setName("Choose the title for the table of contents")
        .setDesc("How do you want the table of contents to start.")
        .addTextArea((cb)=>{
			cb.setValue(this.plugin.settings.tocSettings.title)
			cb.onChange(async(value) =>{
				this.plugin.settings.tocSettings.title = value;
				await this.plugin.saveSettings();
			})
		} )
        new Setting(containerEl).setName("Does your page contain code blocks")
        .setDesc("The plugin needs to know to avoid the comments in these code blocks.")
        .addDropdown((db)=>{
			db.addOption("y","y");
			db.addOption("n","n");
			db.setValue(this.plugin.settings.tocSettings.codeBlocks)
			db.onChange(async(value)=>{
				this.plugin.settings.tocSettings.codeBlocks = value;
				await this.plugin.saveSettings();
			})
		})
		new Setting(containerEl).setName("Adjust title display in table of contents").setHeading()

		new Setting(containerEl).setName("Remove text styling from titles in TOC.")
		.setDesc("Will remove bold fonts and strikethroughs in table of contents.")
		.addToggle((cb)=>{
			cb.setValue(this.plugin.settings.textStyling.removeTextStyling)
			cb.onChange(async(value) =>{
				this.plugin.settings.textStyling.removeTextStyling = value;
				await this.plugin.saveSettings();
			})
		});


		new Setting(containerEl).setName("Remove html from titles in TOC.")
		.setDesc("Removes and html elements you have in titles.")
		.addToggle((cb)=>{
			cb.setValue(this.plugin.settings.textStyling.removeHtml)
			cb.onChange(async(value) =>{
				this.plugin.settings.textStyling.removeHtml = value;
				await this.plugin.saveSettings();
			})
		});

		new Setting(containerEl).setName("Remove wikilinks from titles in TOC.")
		.setDesc("If you have links in titles, will remove the [[ and ]] in the table of contents.")
		.addToggle((cb)=>{
			cb.setValue(this.plugin.settings.textStyling.removeWikilinks)
			cb.onChange(async(value) =>{
				this.plugin.settings.textStyling.removeWikilinks = value;
				await this.plugin.saveSettings();
			})
		})
		new Setting(containerEl).setName("Remove footnotes from titles in TOC.")
		.setDesc("Removes footnotes from title in table of contents.")
		.addToggle((cb)=>{
			cb.setValue(this.plugin.settings.textStyling.removeFootnotes)
			cb.onChange(async(value) =>{
				this.plugin.settings.textStyling.removeFootnotes = value;
				await this.plugin.saveSettings();
			})
		});

		new Setting(containerEl).setName("Add New characters to remove from titles.")
		.setDesc("Individualise what you want in your TOC by removing what you don't want.")
		.addButton((btn)=>{
			btn.setButtonText("Open modal to organise this.");
			btn.onClick(()=>{
				new RemoveCharactersFromTitles(this.app,this.plugin).open()
			})
		})
        }
		
		
	}


export default class AutoTOCPlugin extends Plugin {
	statusBarTextElement: HTMLSpanElement;
	settings:totalTOCSettings;

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
				// raw file name includes the extension
				const rawFileName = ctx.file?.name;
				// This tells us where the extension begins
				const periodIndex = rawFileName?.indexOf(".")
				const cursorPosition = editor.getCursor()
				if( rawFileName === undefined){
					return;
				}
				const toc = contentToTOC(rawFileName?.slice(0,periodIndex),editor.getValue(),this)
				editor.replaceRange(toc,cursorPosition)
			} ,
		});
		this.addCommand({
			id: "Update-toc",
			name: "Update table of contents",
			callback: async () => {
				const file = this.app.workspace.getActiveFile();

				if(!file){
					return;
				}
				const checkTOC = await checkToc(file);
				if (!checkTOC) {return;}
				const [updateToc,toc] = await shouldUpdateToc(file,this)
				this.app.vault.process(file, (fileContent) => {
					return updateFileToc(fileContent,toc);
				});
				return;

				
			},
		});
		// Reset line order when we are on a new line.
		this.registerEvent(
			this.app.workspace.on("file-open", async()=>{
				// No line
				this.settings.hiddenLineIndicator = -1;
				await this.saveSettings()
			})
		)
		
		this.registerEvent(
			this.app.workspace.on("editor-change", async (editor:Editor,info:MarkdownFileInfo) => {
				const file = this.app.workspace.getActiveFile();
				if (!file) {
					return;
				}
				// Check if editor has changed.
				
				const currentLineIndex = editor.getCursor().line;
				const currentLine = editor.getLine(currentLineIndex)
				
				const headingChanged = headingUpdated(currentLine)
				const previousLineHadHeading = this.settings.hiddenLineIndicator !=-1;
				if(!headingChanged ){ 
					if(!previousLineHadHeading){return}
					
					this.settings.hiddenLineIndicator = -1;
					await this.saveSettings()
				}
				// This is saying a heading changed
				this.settings.hiddenLineIndicator = currentLineIndex;
				await this.saveSettings()



				const checkTOC = await checkToc(file);
				if (!checkTOC) {return;}
				

				const [updateToc,toc] = await shouldUpdateToc(file,this)
				if(!updateToc){	return;}
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
