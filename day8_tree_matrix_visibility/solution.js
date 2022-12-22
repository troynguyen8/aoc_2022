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
    return isElementGreaterThanLefterElements(matrix, rowIndex, colIndex) && isElementGreaterThanRighterElements(matrix, rowIndex, colIndex);
}

/**
 * Determines if the element located at the given row and column index is greater than all elements to the right of it in the matrix
 * @param {number[][]} matrix
 * @param {number} rowIndex 0-indexed index for the element row
 * @param {number} colIndex 0-indexed index for the element column
 */
function isElementGreaterThanRighterElements(matrix, rowIndex, colIndex) {
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

    return isGreaterThanAllRighterCols;
}

/**
 * Determines if the element located at the given row and column index is greater than all elements to the left of it in the matrix
 * @param {number[][]} matrix
 * @param {number} rowIndex 0-indexed index for the element row
 * @param {number} colIndex 0-indexed index for the element column
 */
function isElementGreaterThanLefterElements(matrix, rowIndex, colIndex) {
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

    return isGreaterThanAllLefterCols;
}

/**
 * Determines if the element located at the given row and column index is the maximum element in its column
 * @param {number[][]} matrix
 * @param {number} rowIndex 0-indexed index for the element row
 * @param {number} colIndex 0-indexed index for the element column
 */
function isElementMaxInCol(matrix, rowIndex, colIndex) {
    return isElementGreaterThanUpperElements(matrix, rowIndex, colIndex) && isElementGreaterThanLowerElements(matrix, rowIndex, colIndex);
}

/**
 * Determines if the element located at the given row and column index is greater than all elements to the top of it in the matrix
 * @param {number[][]} matrix
 * @param {number} rowIndex 0-indexed index for the element row
 * @param {number} colIndex 0-indexed index for the element column
 */
function isElementGreaterThanUpperElements(matrix, rowIndex, colIndex) {
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

    return isGreaterThanAllUpperRows;
}

/**
 * Determines if the element located at the given row and column index is greater than all elements to the bottom of it in the matrix
 * @param {number[][]} matrix
 * @param {number} rowIndex 0-indexed index for the element row
 * @param {number} colIndex 0-indexed index for the element column
 */
function isElementGreaterThanLowerElements(matrix, rowIndex, colIndex) {
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

    return isGreaterThanAllRighterCols;
}
//#endregion Function Declarations

//#region Part 1
const lines = parseLinesToArraySync('input.txt');
const linesAsMatrix = rawInputToMatrix(lines);
let visibilityCount = 0;
const visibilityMatrix = linesAsMatrix.map((row, i) => {
    return row.map((_, j) => {
        const isVisible =
            isElementGreaterThanLefterElements(linesAsMatrix, i, j) ||
            isElementGreaterThanRighterElements(linesAsMatrix, i, j) ||
            isElementGreaterThanUpperElements(linesAsMatrix, i, j) ||
            isElementGreaterThanLowerElements(linesAsMatrix, i, j);
        if (isVisible) {
            visibilityCount++;
        }
        return isVisible;
    });
});
console.log(visibilityCount);
//#endregion Part 1

//#region Part 2

//#endregion Part 2
