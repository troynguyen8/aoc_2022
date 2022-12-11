import { parseLinesToArraySync } from '../utilities/parseLinesToArray.js';

//#region Function Declarations
function strHasNoDuplicateChars(string) {
    const characterSet = new Set();
    for (const char of string) {
        if (characterSet.has(char)) {
            return false;
        }
        characterSet.add(char);
    }

    return true;
}
function getSubstringOfLengthNIndicesThatSatisfy(string, substringLength, callback) {
    let startIndexInclusive = 0;
    let endIndexExclusive = substringLength;

    while (endIndexExclusive < string.length) {
        const subStr = string.slice(startIndexInclusive, endIndexExclusive);
        if (callback(subStr)) {
            return [startIndexInclusive, endIndexExclusive];
        }

        startIndexInclusive++;
        endIndexExclusive++;
    }

    return undefined;
}
//#endregion Function Declarations

const [dataStreamString] = parseLinesToArraySync('./input.txt');
//#region Part 1
const [, part1EndIndexExclusive] = getSubstringOfLengthNIndicesThatSatisfy(dataStreamString, 4, strHasNoDuplicateChars);
console.log(part1EndIndexExclusive);
//#endregion Part 1

//#region Part 2
const [, part2EndIndexExclusive] = getSubstringOfLengthNIndicesThatSatisfy(dataStreamString, 14, strHasNoDuplicateChars);
console.log(part2EndIndexExclusive);
//#endregion Part 2
