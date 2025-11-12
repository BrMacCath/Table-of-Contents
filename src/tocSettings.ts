import { arrowTypeChoices } from "ArrowType/choices/arrowTypeChoices";

export interface TOCSettings{
	arrowType:string;
	title: string;
	codeBlocks: string;
}

export const DEFAULT_SETTINGS: TOCSettings = {
    arrowType: arrowTypeChoices[0],
    title: "Table of contents",
    codeBlocks: "n"
}

