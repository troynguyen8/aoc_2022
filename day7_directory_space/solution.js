// @ts-check
import { parseLinesToArraySync } from '../utilities/parseLinesToArray.js';

//#region Function Declarations
/**
 * @typedef {Map<string, Node>} Graph
 * @typedef {{
 *   children: undefined | Array<string>
 *   value: undefined | number
 * }} Node
 */

/**
 * Converts Raw input into a flat graph-like data structure
 * @param {Array<string>} rawInput The raw input. Split into lines. Lines starting with $ are CLI commands, while other lines are command line output
 * @returns {Graph}
 */
function convertRawInputIntoGraph(rawInput) {
    /**
     * @type {Graph}
     */
    const graph = new Map();

    let currentDirectory = '/';
    rawInput.forEach((outputLine) => {
        if (outputLine.startsWith('$ cd')) {
            const [_dollarSign, _cdCommand, cdSpecifier] = outputLine.split(' ');
            if (cdSpecifier === '..') {
                const lastSlashIndex = currentDirectory.lastIndexOf('/');
                currentDirectory = currentDirectory.substring(0, lastSlashIndex);
            } else if (cdSpecifier !== '/') {
                currentDirectory = `${currentDirectory === '/' ? '' : currentDirectory}/${cdSpecifier}`;
            }
            return;
        }

        if (outputLine.startsWith('dir')) {
            const [_dirCommand, dirName] = outputLine.split(' ');
            const relativeDirName = `${currentDirectory === '/' ? '' : currentDirectory}/${dirName}`;
            if (graph.has(currentDirectory)) {
                const existingEntryForDirClone = { ...graph.get(currentDirectory) };
                if (existingEntryForDirClone.children) {
                    existingEntryForDirClone.children.push(relativeDirName);
                } else {
                    existingEntryForDirClone.children = [relativeDirName];
                }
                graph.set(currentDirectory, existingEntryForDirClone);
            } else {
                graph.set(currentDirectory, {
                    children: [relativeDirName],
                    value: undefined
                });
            }
        } else if (/\d+/.test(outputLine)) {
            const [fileSize, fileName] = outputLine.split(' ');
            const filenameUnique = `${currentDirectory === '/' ? '' : currentDirectory}/${fileName}`;
            graph.set(filenameUnique, {
                children: undefined,
                value: +fileSize
            });

            if (graph.has(currentDirectory)) {
                const existingEntryForDirClone = { ...graph.get(currentDirectory) };
                if (existingEntryForDirClone.children) {
                    existingEntryForDirClone.children.push(filenameUnique);
                } else {
                    existingEntryForDirClone.children = [filenameUnique];
                }

                graph.set(currentDirectory, existingEntryForDirClone);
            } else {
                graph.set(currentDirectory, {
                    children: [filenameUnique],
                    value: undefined
                });
            }
        }
    });

    populateGraphValues(graph);

    return graph;
}

/**
 * Recursively populates the values for each of the graph entries
 * @param {Graph} graph 
 * @returns {void}
 */
function populateGraphValues(graph, valueToPopulate = '/') {
    const node = graph.get(valueToPopulate);
    if (node.value) {
        return;
    }

    const nodeCopy = { ...node };
    nodeCopy.value = nodeCopy.children.reduce((prev, currentChild) => {
        populateGraphValues(graph, currentChild);
        return prev + graph.get(currentChild).value;
    }, 0);

    graph.set(valueToPopulate, nodeCopy);
}
//#endregion Function Declarations

//#region Part 1
const part1Lines = parseLinesToArraySync('input.txt');
const part1Graph = convertRawInputIntoGraph(part1Lines);
const MAX_VALUE_INCLUSIVE = 100000;
const graphEntriesLessThanMax = [];
for (const [, node] of part1Graph.entries()) {
    const isDirectory = node.children?.length > 0;
    if (isDirectory && node.value <= MAX_VALUE_INCLUSIVE) {
        graphEntriesLessThanMax.push(node);
    }
}
console.log(graphEntriesLessThanMax.reduce((prev, cur) => prev += cur.value, 0));
//#endregion Part 1

//#region Part 2
const part2Lines = parseLinesToArraySync('input.txt');
const part2Graph = convertRawInputIntoGraph(part2Lines);
const AVAILABLE_SIZE = 70000000;
const TARGET_FREE_SPACE = 30000000;
const requiredDeletionSize = TARGET_FREE_SPACE - (AVAILABLE_SIZE - part2Graph.get('/').value);
let minDirSizeThatSatisfiesRequiredDeleteSize = Number.MAX_SAFE_INTEGER;
for (const [, node] of part2Graph.entries()) {
    const isDirectory = node.children?.length > 0;
    if (isDirectory && node.value > requiredDeletionSize) {
        minDirSizeThatSatisfiesRequiredDeleteSize = Math.min(minDirSizeThatSatisfiesRequiredDeleteSize, node.value);
    }
}
console.log(minDirSizeThatSatisfiesRequiredDeleteSize);
//#endregion Part 2
