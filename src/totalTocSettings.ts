import { defaultTextAdjustProperties, textAdjustProperties } from "./textRemovingPermissions";
import { TOCSettings } from "./tocSettings";
import { DEFAULT_INLINE_TOCSETTINGS } from "./tocSettings";

export interface totalTOCSettings{
    tocSettings:TOCSettings;
    removeCharactersFromTitles: string[];
    hiddenLineIndicator:number;
    textStyling: textAdjustProperties;
}

export const DEFAULT_SETTINGS:totalTOCSettings={
    tocSettings:DEFAULT_INLINE_TOCSETTINGS,
    removeCharactersFromTitles:[],
    hiddenLineIndicator:-1,
    textStyling: defaultTextAdjustProperties
}