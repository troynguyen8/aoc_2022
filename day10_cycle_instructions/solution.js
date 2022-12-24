// @ts-check
import { parseLinesToArraySync } from '../utilities/parseLinesToArray.js';

//#region Function Declarations
/**
 * @typedef {"addx" | "noop"} InstructionTypes
 * @typedef {{
 *  instructionType: InstructionTypes
 *  instructionInput: number | undefined
 * }} Instruction
 */

/**
 * @type {{[K in InstructionTypes]: number}}
 */
const INSTRUCTION_TYPES_TO_DURATION = {
    addx: 2,
    noop: 1
};

/**
 * @type {{[K in InstructionTypes]: (currentValue: number, instructionValue: number | undefined) => number}}
 */
const INSTRUCTION_TYPES_TO_OPERATION = {
    addx: (currentValue, instructionValue) => currentValue + instructionValue ?? 0,
    noop: (currentValue, _instructionValue) => currentValue
};

/**
 * 
 * @param {string[]} lines 
 * @returns {Instruction[]}
 */
function rawLinesToInstructions(lines) {
    return lines.map((line) => {
        const [instruction, instructionInputAsStr] = line.split(' ');
        return {
            instructionType: /** @type {InstructionTypes} */ (instruction.toLowerCase()),
            instructionInput: instructionInputAsStr ? +instructionInputAsStr : undefined
        };
    })
}

/**
 * Returns the value given a series of instructions after numCycles.
 * @param {Instruction[]} instructions The instructions to execute
 * @param {number} numCycles The number of cycles to execute before returning the value in the registry
 * @todo Memoize the result for reduced computation duplication between subsequent runs
 */
function getValueAfterNCycles(instructions, numCycles, initialValue = 1) {
    let value = initialValue;
    let elapsedCycles = 0;

    for (const instruction of instructions) {
        const numCyclesForInstruction = INSTRUCTION_TYPES_TO_DURATION[instruction.instructionType];
        const operation = INSTRUCTION_TYPES_TO_OPERATION[instruction.instructionType];

        for (let i = 1; i <= numCyclesForInstruction; i++) {
            elapsedCycles++;
            if (elapsedCycles === numCycles) {
                return value;
            }
        }

        value = operation(value, instruction.instructionInput);
    }

    return value;
}
//#endregion Function Declarations


const lines = parseLinesToArraySync('input.txt');
const instructions = rawLinesToInstructions(lines);

//#region Part 1
const twentySignalStr = getValueAfterNCycles(instructions, 20) * 20;
const sixtySignalStr = getValueAfterNCycles(instructions, 60) * 60;
const hundredSignalStr = getValueAfterNCycles(instructions, 100) * 100;
const oneFortySignalStr = getValueAfterNCycles(instructions, 140) * 140;
const oneEightySignalStr = getValueAfterNCycles(instructions, 180) * 180;
const twoTwentySignalStr = getValueAfterNCycles(instructions, 220) * 220;

console.log(twentySignalStr + sixtySignalStr + hundredSignalStr + oneFortySignalStr + oneEightySignalStr + twoTwentySignalStr);
//#endregion Part 1

//#region Part 2

//#endregion Part 2
