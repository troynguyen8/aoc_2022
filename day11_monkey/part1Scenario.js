// @ts-check

/**
 * @typedef {{
 *   items: number[],
 *   nextValue: (prevValue: number) => number,
 *   getNextRecipient: (nextValue: number) => number
 * }} Agent
 */

/**
 * @returns {Agent[]}
 */
export function getPart1Scenario() {
    return [
        {
            items: [91, 58, 52, 69, 95, 54],
            nextValue: (prevValue) => Math.floor((prevValue * 13) / 3),
            getNextRecipient: (nextValue) => {
                return nextValue % 7 === 0 ? 1 : 5;
            }
        },
        {
            items: [80, 80, 97, 84],
            nextValue: (prevValue) => Math.floor((prevValue * prevValue) / 3),
            getNextRecipient: (nextValue) => {
                return nextValue % 3 === 0 ? 3 : 5;
            }
        },
        {
            items: [86, 92, 71],
            nextValue: (prevValue) => Math.floor((prevValue + 7) / 3),
            getNextRecipient: (nextValue) => {
                return nextValue % 2 === 0 ? 0 : 4;
            }
        },
        {
            items: [96, 90, 99, 76, 79, 85, 98, 61],
            nextValue: (prevValue) => Math.floor((prevValue + 4) / 3),
            getNextRecipient: (nextValue) => {
                return nextValue % 11 === 0 ? 7 : 6;
            }
        },
        {
            items: [60, 83, 68, 64, 73],
            nextValue: (prevValue) => Math.floor((prevValue + 19) / 3),
            getNextRecipient: (nextValue) => {
                return nextValue % 17 === 0 ? 1 : 0;
            }
        },
        {
            items: [96, 52, 52, 94, 76, 51, 57],
            nextValue: (prevValue) => Math.floor((prevValue + 3) / 3),
            getNextRecipient: (nextValue) => {
                return nextValue % 5 === 0 ? 7 : 3;
            }
        },
        {
            items: [75],
            nextValue: (prevValue) => Math.floor((prevValue + 5) / 3),
            getNextRecipient: (nextValue) => {
                return nextValue % 13 === 0 ? 4 : 2;
            }
        },
        {
            items: [83, 75],
            nextValue: (prevValue) => Math.floor((prevValue + 1) / 3),
            getNextRecipient: (nextValue) => {
                return nextValue % 19 === 0 ? 2 : 6;
            }
        }
    ]
}
