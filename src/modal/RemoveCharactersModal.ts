import { App, Modal, Setting } from "obsidian";
import AutoTOCPlugin from "src/main";
import { fillOutModal } from "./fillOutModal";


export class RemoveCharactersFromTitles extends Modal{
    plugin:AutoTOCPlugin;
    
    constructor(app:App,plugin:AutoTOCPlugin){
        super(app);
        this.plugin = plugin;
        
    }
    onOpen(): void {
        // For Each have the content reload each time. create the function for this.
        const {contentEl} = this;
        fillOutModal(contentEl,this.plugin)
    }
}