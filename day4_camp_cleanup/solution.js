import { parseLinesToArraySync } from "../utilities/parseLinesToArray.js";

// Begin Region: Function Declarations
function getRangesFromLine(line) {
    const numbers = line.match(/\d+/g).map((numAsStr) => +numAsStr);
    const [range1Min, range1Max, range2Min, range2Max] = numbers;
    return [
        {
            min: range1Min,
            max: range1Max
        },
        {
            min: range2Min,
            max: range2Max
        }
    ];
}

function hasSupersetRange(range1, range2) {
    if (range1.min >= range2.min && range1.max <= range2.max) {
        return true;
    }
    if (range2.min >= range1.min && range2.max <= range1.max) {
        return true;
    }

    return false;
}

function hasOverlappingRange(range1, range2) {
    if (range1.max < range2.min || range2.max < range1.min) {
        return false;
    }

    return true;
}
// End Region: Function Declarations

const lines = parseLinesToArraySync('./input.txt');
// part 1
console.log(lines.filter((line) => {
    const [range1, range2] = getRangesFromLine(line);
    return hasSupersetRange(range1, range2);
}).length);
// part 2
console.log(lines.filter((line) => {
    const [range1, range2] = getRangesFromLine(line);
    return hasOverlappingRange(range1, range2);
}).length);
