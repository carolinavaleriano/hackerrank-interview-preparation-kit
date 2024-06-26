'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {
    let swaps = 0;
    let visited = new Array(arr.length).fill(false);

    for (let i = 0; i < arr.length; i++) {
        if (visited[i] || arr[i] === i + 1) {
            continue;
        }

        let cycleLength = 0;
        let x = i;

        while (!visited[x]) {
            visited[x] = true;
            x = arr[x] - 1;
            cycleLength++;
        }

        if (cycleLength > 0) {
            swaps += cycleLength - 1;
        }
    }

    return swaps;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}
