import { escapedCharacters } from "src/Data/escapedCharacters";

export function reformatStringForRegex(str:string):string{
    const escape ="\\"
    let reformatStr =""
    for( let i=0; i< str.length;i++){
        let escapeChar = false;
        for(let j=0;j<escapedCharacters.length;j++){
            if (str[i] == escapedCharacters[j]){
                reformatStr += escape + str[i];
                escapeChar = true;
                break;
            }
        }
        if(!escapeChar){
            reformatStr += str[i];
        }
    }
    return reformatStr
}