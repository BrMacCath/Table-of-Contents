export function reformatStringForRegex(str:string):string{
    const astericks ="*";
    const escapedAstericks = "\\*";
    let reformatStr =""
    for( let i=0; i< str.length;i++){
        if(str[i] == astericks){
            reformatStr += escapedAstericks;
        }
        else{
            reformatStr += str[i];
        }
    }
    return reformatStr
}