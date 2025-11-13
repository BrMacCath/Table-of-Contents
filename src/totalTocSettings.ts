import { TOCSettings } from "./tocSettings";
import { DEFAULT_INLINE_TOCSETTINGS } from "./tocSettings";

export interface totalTOCSettings{
    tocSettings:TOCSettings;
    removeCharactersFromTitles: string[];
    hiddenLineIndicator:number;
}

export const DEFAULT_SETTINGS:totalTOCSettings={
    tocSettings:DEFAULT_INLINE_TOCSETTINGS,
    removeCharactersFromTitles:[],
    hiddenLineIndicator:-1
}