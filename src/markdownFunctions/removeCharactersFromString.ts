export function removeCharactersFromString(str:string, removeStr:string):string{
    let re = new RegExp(removeStr,"g" )
    return str.replace(re,"")
}