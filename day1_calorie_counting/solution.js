import { parseLinesToArraySync } from '../utilities/parseLinesToArray.js';

//#region Function Declarations
function linesToGroups(rawLines) {
    const elvesArray = [[]];
    for (let i = 0; i < rawLines.length; i++) {
        const element = rawLines[i];
        if (element === '') {
            elvesArray.push([]);
        } else {
            const lastArray = elvesArray.at(-1);
            lastArray.push(+element);
        }
    }
    return elvesArray;
}

function groupsToSums(arrOfGroups) {
    return arrOfGroups.map((group) => group.reduce((accumulator, ele) => accumulator + ele), 0);
}

function getMaxSumOfGroup(arrOfGroups) {
    const sums = groupsToSums(arrOfGroups);

    let maxSum = -1;
    let maxSumIndex = 0;
    for (let i = 0; i < sums.length; i++) {
        const sum = sums[i];
        if (sum > maxSum) {
            maxSum = sum;
            maxSumIndex = i;
        }
    }

    return [maxSum, maxSumIndex];
}

function getSumOfGroupsSortedDescending(arrOfGroups) {
    const sums = groupsToSums(arrOfGroups);
    sums.sort((a, b) => b - a); // In place
    return sums;
}
//#endregion Function Declarations

const lines = parseLinesToArraySync('./input.txt');
const elves = linesToGroups(lines);

//#region Part 1
const [maxSum, maxSumIndex] = getMaxSumOfGroup(elves);
console.log(maxSum);
//#endregion Part 1

//#region Part 2
const [calorieMax, calorieSecondToMax, calorieThirdToMax] = getSumOfGroupsSortedDescending(elves);
console.log(calorieMax + calorieSecondToMax + calorieThirdToMax);
//#endregion Part 2
