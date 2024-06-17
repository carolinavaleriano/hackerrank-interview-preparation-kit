'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the countTriplets function below.
function countTriplets(arr, r) {
    let potential = {};
    let counters = {};
    let tripletCount = 0;

    for (let i = 0; i < arr.length; i++) {
        let a = arr[i];

        if (counters[a] !== undefined) {
            tripletCount += counters[a];
        }

        if (potential[a] !== undefined) {
            if (counters[a * r] === undefined) {
                counters[a * r] = 0;
            }
            counters[a * r] += potential[a];
        }

        if (potential[a * r] === undefined) {
            potential[a * r] = 0;
        }
        potential[a * r]++;
    }

    return tripletCount;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}
