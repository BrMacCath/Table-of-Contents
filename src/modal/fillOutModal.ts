import { Setting } from "obsidian";
import { canAddToList } from "src/functions/canAddToList";
import AutoTOCPlugin from "src/main";

export function fillOutModal(contentEl:HTMLElement,plugin:AutoTOCPlugin){
    contentEl.empty()
    new Setting(contentEl).setName("List of words excluded from title.").setHeading();
    
    plugin.settings.removeCharactersFromTitles.forEach((string)=>{
        // Here we will display the characters and then 
        new Setting(contentEl).setName(string).addButton((btn)=>{
            btn.setButtonText("Remove this from list");
            btn.onClick(async()=>{
                // Remove this string from the 
                plugin.settings.removeCharactersFromTitles = plugin.settings.removeCharactersFromTitles
                .filter((t)=>{return t!=string}) 
                await plugin.saveSettings()
                fillOutModal(contentEl,plugin)
                // Reload
            })
        })
    })
    let excludedCharacter = "";
    new Setting(contentEl).setName("Add New excluded characters")
    .addTextArea((cb)=>{
        cb.setValue(excludedCharacter);
        cb.onChange((value)=>{
            excludedCharacter = value;
        })
    })
    .addButton((btn)=>{
        btn.setButtonText("Add to list");
        btn.onClick(async()=>{
            if(canAddToList(excludedCharacter,plugin.settings.removeCharactersFromTitles)){
                plugin.settings.removeCharactersFromTitles.push(excludedCharacter)
                await plugin.saveSettings()
                fillOutModal(contentEl,plugin)
            }
        })
    })
    
}