import { Notice } from "obsidian";

export function canAddToList(str:string,list:string[]){
    let allowed = true;
    list.forEach((word)=>{
        if(word ===str.trim()){
            new Notice("This word is already excluded.")
            allowed= false;
            return false;
        }
    })
    return allowed

}