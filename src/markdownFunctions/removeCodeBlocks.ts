export function removeCodeBlocks(str:string):string{
    const codeBlockIndicator = "```"
    const regString = `${codeBlockIndicator}((.|\n|\r)*?)${codeBlockIndicator}`;
    let re = new RegExp(regString,"g" )
    return str.replace(re,"")
}