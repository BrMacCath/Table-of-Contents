

export interface textAdjustProperties{
    removeWikilinks:boolean;
    removeFootnotes:boolean;
    removeHtml:boolean;
    removeTextStyling:boolean;
}

export const defaultTextAdjustProperties: textAdjustProperties ={
    removeWikilinks: true,
    removeFootnotes: true,
    removeHtml: false,
    removeTextStyling: true
}