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
export function getPart2TestScenario() {
    return [
        {
            items: [79, 98],
            nextValue: (prevValue) => prevValue * 19,
            getNextRecipient: (nextValue) => {
                return nextValue % 23 === 0 ? 2 : 3;
            }
        },
        {
            items: [54, 65, 75, 74],
            nextValue: (prevValue) => prevValue + 6,
            getNextRecipient: (nextValue) => {
                return nextValue % 19 === 0 ? 2 : 0;
            }
        },
        {
            items: [79, 60, 97],
            nextValue: (prevValue) => prevValue * prevValue,
            getNextRecipient: (nextValue) => {
                return nextValue % 13 === 0 ? 1 : 3;
            }
        },
        {
            items: [74],
            nextValue: (prevValue) => prevValue + 3,
            getNextRecipient: (nextValue) => {
                return nextValue % 17 === 0 ? 0 : 1;
            }
        }
    ]
}
