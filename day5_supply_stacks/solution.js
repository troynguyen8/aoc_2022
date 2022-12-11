import { parseLinesToArraySync } from '../utilities/parseLinesToArray.js';
import { Stack } from './Stack.js';

//#region Function Declarations
function splitRawInstructions(lines) {
    const splitIndicator = '';
    const splitIndicatorIndex = lines.indexOf(splitIndicator);

    return [lines.slice(0, splitIndicatorIndex), lines.slice(splitIndicatorIndex + 1, lines.length)];
}
function rawStackInitInstructionsToStacks(stackInitInstructions) {
    const STACK_INSTRUCTION_BLANK = ' ';
    const stackNumbersInput = stackInitInstructions.pop();
    const stackNumbersAsArr = stackNumbersInput.match(/\d+/g);

    const stacks = [];
    stackNumbersAsArr.forEach((stackNumber) => {
        const stack = new Stack(`${stackNumber}`);

        // Get the index in which we expect the stack's elements to reside in the instructions
        const stackMembersLookupIndex = stackNumbersInput.indexOf(stackNumber);

        // Iterate through the lines indicating stack members backwards, and populate the stack if there are members for the given stack number
        for (let i = stackInitInstructions.length - 1; i >= 0; i--) {
            const stackMembersInput = stackInitInstructions[i];
            const charAtStackPosition = stackMembersInput.charAt(stackMembersLookupIndex);
            if (charAtStackPosition !== STACK_INSTRUCTION_BLANK) {
                stack.push(charAtStackPosition);
            }
        }
        stacks.push(stack);
    });

    return stacks;
}
function processStackOp(stackOp, stacks, preserveBatchOrder = false) {
    const [moveAmount, fromStackNum, toStackNum] = stackOp.match(/\d+/g);
    const fromStack = stacks[(+fromStackNum) - 1];
    const toStack = stacks[(+toStackNum) - 1];

    if (preserveBatchOrder) {
        const batch = [];
        for (let i = 1; i <= moveAmount; i++) {
            batch.push(fromStack.pop());
        }
        toStack.pushBatch(batch);
    } else {
        for (let i = 1; i <= moveAmount; i++) {
            toStack.push(fromStack.pop());
        }
    }

    return stacks;
}
function getStacksAsStrings(stacks) {
    return stacks.map((stack) => stack.toString());
}
function getStackTops(stacks) {
    return stacks.map((stack) => stack.peek());
}
//#endregion Function Declarations

const lines = parseLinesToArraySync('./input.txt');

//#region Part 1
const [part1StackInitInstructions, part1StackOperationInstructions] = splitRawInstructions(lines);
const part1Stacks = rawStackInitInstructionsToStacks(part1StackInitInstructions);
part1StackOperationInstructions.forEach((stackOp) => {
    processStackOp(stackOp, part1Stacks);
});
console.log(getStackTops(part1Stacks).join(''));
//#endregion Part 1

//#region Part 2
const [part2StackInitInstructions, part2StackOperationInstructions] = splitRawInstructions(lines);
const part2Stacks = rawStackInitInstructionsToStacks(part2StackInitInstructions);
part2StackOperationInstructions.forEach((stackOp) => {
    processStackOp(stackOp, part2Stacks, true);
});
console.log(getStackTops(part2Stacks).join(''));
//#endregion Part 2
