import { removeCharactersFromString } from "./removeCharactersFromString"

export function removeListOfCharactersFromString(str:string,removeCharactersList:string[]):string{
    removeCharactersList.forEach((removeStr)=>{
        str = removeCharactersFromString(str,removeStr)
    }
    )
    return str;
}