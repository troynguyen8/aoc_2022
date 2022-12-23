// @ts-check
import { parseLinesToArraySync } from '../utilities/parseLinesToArray.js';

//#region Function Declarations
/**
 * @typedef {["R" | "D" | "L" | "U", number]} Instruction
 */

/**
 * Converts the raw input lines to instructions
 * @param {string[]} lines 
 * @returns {Instruction[]}
 */
function rawInputToInstructions(lines) {
    // @ts-expect-error
    return lines.map((line) => {
        const [directionKey, movementAmountAsString] = line.split(' ');
        return [directionKey.toUpperCase(), +movementAmountAsString];
    });
}

/**
 * Dtermines the next tail coordinate based upon the tail's current position with relation to the head
 * @param {[number, number]} tailCoord current Tail coordinate
 * @param {[number, number]} headCoord current Head coordinate
 * @returns {[number, number]} The next tail coordinate
 */
function getNextTailCoord([tailX, tailY], [headX, headY]) {
    const xDelta = tailX - headX; // -1
    const yDelta = tailY - headY; // -2

    const notAdjacentOnXAxis = Math.abs(xDelta) > 1;
    const notAdjacentOnYAxis = Math.abs(yDelta) > 1;

    // The tail is already adjacent to the head. No movement is needed to maintain adjacency
    if (!(notAdjacentOnXAxis || notAdjacentOnYAxis)) {
        return [tailX, tailY];
    }

    let newTailX = tailX;
    let newTailY = tailY;

    // Special case. Neither on the same X or Y, so move diagonally to optimally catch tail up to head
    if (xDelta !== 0 && yDelta !== 0) {
        if (xDelta < 0) {
            newTailX++;
        } else if (xDelta > 0) {
            newTailX--;
        }

        if (yDelta < 0) {
            newTailY++;
        } else if (yDelta > 0) {
            newTailY--;
        }

        return [newTailX, newTailY];
    }

    // Otherwise, just move in one dimension
    if (notAdjacentOnXAxis) {
        if (xDelta < 0) {
            newTailX++;
        } else {
            newTailX--
        }
    } else if (notAdjacentOnYAxis) {
        if (yDelta < 0) {
            newTailY++;
        } else {
            newTailY--;
        }
    }

    return [newTailX, newTailY];
}

/**
 * Gets the number
 * @param {Instruction[]} instructions 
 * @returns {number}
 */
function getNumberOfTailVisitedCoords(instructions) {
    /**
     * The set of visited coordinates in format of "x,y"
     * @type {Set<string>}
     */
    const tailVisitedCoordsSet = new Set(["0,0"]);

    /**
     * X, Y coordinate of the head
     * @type {[number, number]}
     */
    let currentHeadCoord = [0, 0];

    /**
     * X, Y coordinate of the tail
     * @type {[number, number]}
     */
    let currentTailCoord = [0, 0];

    instructions.forEach(([direction, numMoves]) => {
        for (let tick = 1; tick <= numMoves; tick++) {
            switch (direction) {
                case "U":
                    currentHeadCoord[1] = currentHeadCoord[1] + 1;
                    break;
                case "D":
                    currentHeadCoord[1] = currentHeadCoord[1] - 1;
                    break;
                case "L":
                    currentHeadCoord[0] = currentHeadCoord[0] - 1;
                    break;
                case "R":
                    currentHeadCoord[0] = currentHeadCoord[0] + 1;
                    break;
            }

            currentTailCoord = getNextTailCoord(currentTailCoord, currentHeadCoord);
            tailVisitedCoordsSet.add(`${currentTailCoord[0]},${currentTailCoord[1]}`);
        }
    });

    return tailVisitedCoordsSet.size;
}
//#endregion Function Declarations


const lines = parseLinesToArraySync('input.txt');

//#region Part 1
const part1Instructions = rawInputToInstructions(lines);
console.log(getNumberOfTailVisitedCoords(part1Instructions));
//#endregion Part 1

//#region Part 2
//#endregion Part 2
