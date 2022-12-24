// @ts-check
import { getPart1Scenario } from './part1Scenario.js';
// import { getPart2Scenario } from './part2Scenario.js';
import { getPart2TestScenario } from './part2TestScenario.js';

//#region Function Declarations
/**
 * @typedef {{
 *   items: number[],
 *   nextValue: (prevValue: number) => number,
 *   getNextRecipient: (nextValue: number) => number
 * }} Agent
 */

/**
 * Returns the counts of items each agent processed in the given scenario
 * @param {Agent[]} scenario 
 * @param {number} numRounds 
 * @returns {number[]} The counts of items each agent processed
 */
function getAgentProcessCountAfterNRounds(scenario, numRounds) {
    const counts = new Array(scenario.length).fill(0);

    for (let i = 1; i <= numRounds; i++) {
        scenario.forEach((agent, index) => {
            while (agent.items.length > 0) {
                const item = agent.items.pop();

                // Increment the counts indicating the number of items processed by the agent
                counts[index]++;

                const newItemValue = agent.nextValue(item);
                const newRecipient = agent.getNextRecipient(newItemValue);
                scenario[newRecipient].items.push(newItemValue);
            }
        });
    }

    return counts;
}

/**
 * Returns the top N elements from the source array, numbers
 * @param {number[]} numbers 
 * @param {number} topN
 */
function getMaxNByNumericalValue(numbers, topN) {
    // Max stored at 0. Nth max is last in the array.
    const returnResult = new Array(topN, Number.MIN_SAFE_INTEGER);

    for (const number of numbers) {
        if (number >= returnResult[0]) {
            returnResult.pop();
            returnResult.unshift(number);
        }
    }

    return returnResult;
}

//#endregion Function Declarations

//#region Part 1
const part1Scenario = getPart1Scenario();
const NUM_ROUNDS_PART_1 = 20;

const part1ItemProcessingCounts = getAgentProcessCountAfterNRounds(part1Scenario, NUM_ROUNDS_PART_1);
const [maxCountPart1, secondToMaxCountPart1] = getMaxNByNumericalValue(part1ItemProcessingCounts, 2);

console.log(maxCountPart1 * secondToMaxCountPart1);
//#endregion Part 1

//#region Part 2
//#endregion Part 2
