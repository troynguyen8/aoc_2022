// @ts-check
import { parseLinesToArraySync } from '../utilities/parseLinesToArray.js';

//#region Function Declarations

/**
 * @param {string[]} rawLines
 * @returns {{
 *   matrix: number[][]
 *   startIndices: [number, number]
 *   endIndices: [number, number]
 * }}
 */
function rawLinesToMatrixAndEndpoints(rawLines) {
    const matrix = [];
    /**
     * @type [number, number]
     */
    let startIndices = [0, 0];
    /**
     * @type [number, number]
     */
    let endIndices = [0, 0];

    for (let i = 0; i < rawLines.length; i++) {
        matrix.push([]);
        for (let j = 0; j < rawLines[i].length; j++) {
            let char = rawLines[i].charAt(j);
            if (rawLines[i].charAt(j) === 'S') {
                startIndices = [i, j];
                char = 'a'; // The start resides at the lowest weight, 'a'
            } else if (rawLines[i].charAt(j) === 'E') {
                endIndices = [i, j];
                char = 'z' // The end resides at the highest weight, 'z'
            }

            const characterAsMatrixWeight = char.charCodeAt(0) - 'a'.charCodeAt(0)
            matrix[i].push(characterAsMatrixWeight);
        }
    }

    return {
        matrix,
        startIndices,
        endIndices
    }
};

/**
 * Breadth first search of matrix from startIndices to endIndices
 * @param {number[][]} matrix The matrix that represents the graph to traverse
 * @param {[number, number]} startIndices The indices for the starting point of the search
 * @param {[number, number]} endIndices The indices for the ending point of the search
 * @returns {number | undefined} The minimum number of steps needed to traverse from startIndices to endIndices
 */
function getMinStepsToDestinationViaBfs(matrix, startIndices, endIndices) {
    const indicesToKey = ([rowIndex, colIndex]) => `(${rowIndex}),(${colIndex})`;

    /**
     * @type {{
     *   rowIndex: number,
     *   colIndex: number,
     *   cost: number
     * }[]}
     */
    const queue = [];
    const visitedIndices = new Set([indicesToKey(startIndices)]);

    /**
     * Returns indices that haven't been visited yet and are traversible from the passed in indices
     * @param {[number, number]} indices 
     */
    const getEligibleNeighbors = ([rowIndex, colIndex]) => {
        const currentIndexWeight = matrix[rowIndex][colIndex];

        /**
         * @type {[number, number][]}
         */
        const searchIndices = [
            [rowIndex, colIndex + 1],
            [rowIndex, colIndex - 1],
            [rowIndex + 1, colIndex],
            [rowIndex - 1, colIndex]
        ];

        return searchIndices.filter(([neighborRowIndex, neighborColIndex]) => {
            const alreadyVisited = visitedIndices.has(indicesToKey([neighborRowIndex, neighborColIndex]));
            if (alreadyVisited) {
                return false;
            }

            if (
                matrix[neighborRowIndex]?.[neighborColIndex] !== undefined &&
                matrix[neighborRowIndex][neighborColIndex] - currentIndexWeight <= 1
            ) {
                return true;
            }

            return false;
        });
    };

    const eligibleNeighbors = getEligibleNeighbors(startIndices);
    eligibleNeighbors.forEach((indices) => {
        visitedIndices.add(indicesToKey(indices));
    });
    queue.push(...eligibleNeighbors.map((neighbors) => {
        return {
            rowIndex: neighbors[0],
            colIndex: neighbors[1],
            cost: 0
        }
    }));

    while (queue.length > 0) {
        const currentVisit = queue.shift();

        if (currentVisit.rowIndex === endIndices[0] && currentVisit.colIndex === endIndices[1]) {
            return currentVisit.cost + 1;
        }

        const eligibleNeighbors = getEligibleNeighbors([currentVisit.rowIndex, currentVisit.colIndex]);
        eligibleNeighbors.forEach((indices) => {
            visitedIndices.add(indicesToKey(indices));
        });

        queue.push(...eligibleNeighbors.map((neighbors) => {
            return {
                rowIndex: neighbors[0],
                colIndex: neighbors[1],
                cost: currentVisit.cost + 1
            }
        }));
    }

    return undefined;
}
//#endregion Function Declarations


const lines = parseLinesToArraySync('input.txt');
const { matrix, startIndices, endIndices } = rawLinesToMatrixAndEndpoints(lines);

//#region Part 1
console.log(getMinStepsToDestinationViaBfs(matrix, startIndices, endIndices));
//#endregion Part 1

//#region Part 2
/**
 * @type {[number, number][]}
 */
const lowElevationIndices = matrix.map((row, rowIndex) => {
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
        if (row[colIndex] === 0) {
            return [rowIndex, colIndex];
        }
    }
});
let minStepsFromAnyLowElevation = Number.MAX_SAFE_INTEGER;
lowElevationIndices.forEach((indices) => {
    minStepsFromAnyLowElevation = Math.min(minStepsFromAnyLowElevation, getMinStepsToDestinationViaBfs(matrix, indices, endIndices));
});
console.log(minStepsFromAnyLowElevation);
//#endregion Part 2
