export function headingUpdated(str:string){
    const headingStart = "#"
    if(str[0]!= headingStart){ return false}
    const space = " "
    const spaceIndex = str.indexOf(space)
    if(spaceIndex ==-1){return false}
    if(str.slice(0,spaceIndex) != headingStart.repeat(spaceIndex)){return false}
    return true
}