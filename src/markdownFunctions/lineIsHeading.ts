export function lineIsHeading(str:string):boolean{
    // Headings start with #
    if(str[0] != "#" ){
        return false;
    }
    const spaceIndex = str.indexOf(" ");
    // No heading title
    if(spaceIndex ==-1){
        return false;
    }
    // This is a tag. There is no space between the #'s and first text.
    if(str.slice(0,spaceIndex)!= "#".repeat(spaceIndex)){
        return false;
    }

    return true
}