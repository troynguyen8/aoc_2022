import { parseLinesToArraySync } from '../utilities/parseLinesToArray.js';

//#region Function Declarations
function partitionStringInTwo(string, numPartitions = 2) {
    const partitionIndex = string.length / 2;
    const firstHalf = string.slice(0, partitionIndex);
    const secondHalf = string.slice(partitionIndex, string.length);

    return [firstHalf, secondHalf];
}

function findIntersectionBetweenStrings(...strings) {
    const charMaps = [];
    strings.forEach((str) => {
        const strCharMap = {};
        for (let char of str) {
            strCharMap[char] = strCharMap[char] ? strCharMap[char] + 1 : 0;
        }
        charMaps.push(strCharMap);
    });

    const referenceCharMap = charMaps[0];
    const intersectingCharacters = [];
    Object.keys(referenceCharMap).forEach((char) => {
        let charIntersectsAllOtherStrings = true;
        for (let i = 1; i < charMaps.length; i++) {
            const comparingCharMap = charMaps[i];
            if (comparingCharMap[char] === undefined) {
                charIntersectsAllOtherStrings = false;
            }
        }

        if (charIntersectsAllOtherStrings) {
            intersectingCharacters.push(char);
        }
    });

    return intersectingCharacters;
}

// Heavy inspiration from ChatGPT
function characterToPriority(character) {
    // Check if the character is in the range 'a' through 'z'
    if (character >= 'a' && character <= 'z') {
        // If it is, return its priority as a number between 1 and 26
        return character.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }

    // Check if the character is in the range 'A' through 'Z'
    if (character >= 'A' && character <= 'Z') {
        // If it is, return its priority as a number between 27 and 52
        return character.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }

    // If the character is not in the range 'a' through 'z' or 'A' through 'Z', return 0
    return 0;
}

function linesToStringPartitionPrioritySum(lines) {
    return lines.map((line) => {
        const [strPart1, strPart2] = partitionStringInTwo(line);
        const [intersectingChar] = findIntersectionBetweenStrings(strPart1, strPart2);
        return characterToPriority(intersectingChar);
    });
}
//#endregion Function Declarations

const lines = parseLinesToArraySync('./input.txt');

//#region Part 1
const priorities = linesToStringPartitionPrioritySum(lines);
console.log(priorities.reduce((acc, ele) => acc + ele, 0));
//#endregion Part 1

//#region Part 2
const linesCopy = [...lines];
let batchOfThreeFullStringPrioritySum = 0;
while (linesCopy.length > 0) {
    const line1 = linesCopy.shift();
    const line2 = linesCopy.shift();
    const line3 = linesCopy.shift();

    const [intersectingCharacter] = findIntersectionBetweenStrings(line1, line2, line3);
    batchOfThreeFullStringPrioritySum += characterToPriority(intersectingCharacter);
}
console.log(batchOfThreeFullStringPrioritySum);
//#endregion Part 2
