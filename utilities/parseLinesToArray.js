import fs from 'fs';

export function parseLinesToArraySync(path) {
    return fs.readFileSync(path)
        .toString()
        .split('\n');
}
