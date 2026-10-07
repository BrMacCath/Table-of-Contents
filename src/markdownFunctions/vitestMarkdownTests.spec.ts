import { describe, it, expect } from 'vitest';
import { removeCodeBlocks } from './removeCodeBlocks';
import { removeListOfCharactersFromString } from './removeListOfCharactersFromString';


describe('Test that strings are removed', () => {
	it('Removes all strings if there is a groups ', () => {
        const stringGroups = ['~~', '==' ]
        expect(removeListOfCharactersFromString(stringGroups.join(""),stringGroups )).toBe("")
	});
    it('Does not remove substrings of the element ', () => {
        const stringGroups = ['~~', '==' ]
        const fakeRemove = removeListOfCharactersFromString("= 1g",stringGroups )
        expect(fakeRemove.indexOf('=')).greaterThan(-1);
	});
});

// Tests around removing code Blocks

describe('Code Blocks are removed', () => {
	it('Shows code blocks are removed ', () => {
        const codeBlocks = "```";
        const str = codeBlocks + "oayusdruhwer" + codeBlocks;
        expect(str.indexOf(codeBlocks)).greaterThan(-1);
        const testRemove = removeCodeBlocks(str);
		expect(testRemove.indexOf(codeBlocks)).toBe(-1);
	});
});

