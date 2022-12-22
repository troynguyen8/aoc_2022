// @ts-check
import { parseLinesToArraySync } from '../utilities/parseLinesToArray.js';

//#region Function Declarations
/**
 * Converts the rectangle character input into a matrix
 * @param {string[]} input 
 */
function rawInputToMatrix(input) {
    const matrix = [];
    input.forEach((row) => {
        const rowAsArray = row.split('');
        matrix.push(rowAsArray);
    });

    return matrix;
}

/**
 * Determines if the element located at the given row and column index is the maximum element in its row
 * @param {number[][]} matrix
 * @param {number} rowIndex 0-indexed index for the element row
 * @param {number} colIndex 0-indexed index for the element column
 */
function isElementMaxInRow(matrix, rowIndex, colIndex) {
    return getIndexOfLargerElementLeftward(matrix, rowIndex, colIndex) === undefined && getIndexOfLargerElementRightward(matrix, rowIndex, colIndex) === undefined;
}

/**
 * Determines the righter column index of the element larger than the element at the specified indices, if such an element exists.
 * @param {number[][]} matrix
 * @param {number} rowIndex 0-indexed index for the element row
 * @param {number} colIndex 0-indexed index for the element column
 * @returns {undefined | number}
 */
function getIndexOfLargerElementRightward(matrix, rowIndex, colIndex) {
    const element = matrix[rowIndex][colIndex];

    let rightColumnRunner = colIndex + 1;
    let isGreaterThanAllRighterCols = true;
    while (rightColumnRunner < matrix[rowIndex].length) {
        const comparisonElement = matrix[rowIndex][rightColumnRunner];
        if (comparisonElement >= element) {
            isGreaterThanAllRighterCols = false;
            break;
        }
        rightColumnRunner++;
    }

    return isGreaterThanAllRighterCols ? undefined : rightColumnRunner;
}

/**
 * Determines the lefter column index of the element larger than the element at the specified indices, if such an element exists.
 * @param {number[][]} matrix
 * @param {number} rowIndex 0-indexed index for the element row
 * @param {number} colIndex 0-indexed index for the element column
 * @returns {undefined | number}
 */
function getIndexOfLargerElementLeftward(matrix, rowIndex, colIndex) {
    const element = matrix[rowIndex][colIndex];

    let leftColumnRunner = colIndex - 1;
    let isGreaterThanAllLefterCols = true;
    while (leftColumnRunner >= 0) {
        const comparisonElement = matrix[rowIndex][leftColumnRunner];
        if (comparisonElement >= element) {
            isGreaterThanAllLefterCols = false;
            break;
        }
        leftColumnRunner--;
    }

    return isGreaterThanAllLefterCols ? undefined : leftColumnRunner;
}

/**
 * Determines if the element located at the given row and column index is the maximum element in its column
 * @param {number[][]} matrix
 * @param {number} rowIndex 0-indexed index for the element row
 * @param {number} colIndex 0-indexed index for the element column
 */
function isElementMaxInCol(matrix, rowIndex, colIndex) {
    return getIndexOfLargerElementUpward(matrix, rowIndex, colIndex) === undefined && isElementGreaterThanLowerElements(matrix, rowIndex, colIndex) === undefined;
}

/**
 * Determines the upper row index of the element larger than the element at the specified indices, if such an element exists.
 * @param {number[][]} matrix
 * @param {number} rowIndex 0-indexed index for the element row
 * @param {number} colIndex 0-indexed index for the element column
 */
function getIndexOfLargerElementUpward(matrix, rowIndex, colIndex) {
    const element = matrix[rowIndex][colIndex];

    let upRowRunner = rowIndex - 1;
    let isGreaterThanAllUpperRows = true;
    while (upRowRunner >= 0) {
        const comparisonElement = matrix[upRowRunner][colIndex];
        if (comparisonElement >= element) {
            isGreaterThanAllUpperRows = false;
            break;
        }
        upRowRunner--;
    }

    return isGreaterThanAllUpperRows ? undefined : upRowRunner;
}

/**
 * Determines the lower row index of the element larger than the element at the specified indices, if such an element exists.
 * @param {number[][]} matrix
 * @param {number} rowIndex 0-indexed index for the element row
 * @param {number} colIndex 0-indexed index for the element column
 */
function getIndexOfLargerElementDownward(matrix, rowIndex, colIndex) {
    const element = matrix[rowIndex][colIndex];

    let downRowRunner = rowIndex + 1;
    let isGreaterThanAllRighterCols = true;
    while (downRowRunner < matrix[rowIndex].length) {
        const comparisonElement = matrix[downRowRunner][colIndex];
        if (comparisonElement >= element) {
            isGreaterThanAllRighterCols = false;
            break;
        }
        downRowRunner++;
    }

    return isGreaterThanAllRighterCols ? undefined : downRowRunner;
}
//#endregion Function Declarations


const lines = parseLinesToArraySync('input.txt');
const linesAsMatrix = rawInputToMatrix(lines);

//#region Part 1
let visibilityCount = 0;
const visibilityMatrix = linesAsMatrix.map((row, i) => {
    return row.map((_, j) => {
        const isVisible =
            getIndexOfLargerElementLeftward(linesAsMatrix, i, j) === undefined ||
            getIndexOfLargerElementRightward(linesAsMatrix, i, j) === undefined ||
            getIndexOfLargerElementUpward(linesAsMatrix, i, j) === undefined ||
            getIndexOfLargerElementDownward(linesAsMatrix, i, j) === undefined;
        if (isVisible) {
            visibilityCount++;
        }
        return isVisible;
    });
});
console.log(visibilityCount);
//#endregion Part 1

//#region Part 2
let maxVisibilityScore = 0;
const visibilityScoreMatrix = linesAsMatrix.map((row, i) => {
    return row.map((_, j) => {
        const numTreesVisibleLeft = j - (getIndexOfLargerElementLeftward(linesAsMatrix, i, j) ?? 0);
        const numTreesVisibleRight = ((getIndexOfLargerElementRightward(linesAsMatrix, i, j) ?? row.length - 1) - j);
        const numTreesVisibleUp = (i - (getIndexOfLargerElementUpward(linesAsMatrix, i, j) ?? 0));
        const numTreesVisibleDown = ((getIndexOfLargerElementDownward(linesAsMatrix, i, j) ?? linesAsMatrix.length - 1) - i);

        const visibilityScore = numTreesVisibleLeft * numTreesVisibleRight * numTreesVisibleUp * numTreesVisibleDown;
        maxVisibilityScore = Math.max(maxVisibilityScore, visibilityScore);

        return visibilityScore;
    });
});

console.log(maxVisibilityScore);
//#endregion Part 2
