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

/*
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isValid(s) {
    // Write your code here
    const freqMap = {};

    for (const char of s) {
        freqMap[char] = (freqMap[char] || 0) + 1;
    }

    const freqCountMap = {};
    for (const key in freqMap) {
        const freq = freqMap[key];
        freqCountMap[freq] = (freqCountMap[freq] || 0) + 1;
    }

    const freqCounts = Object.keys(freqCountMap).map(Number);

    if (freqCounts.length === 1) {
        return 'YES';
    }

    if (freqCounts.length === 2) {
        const [f1, f2] = freqCounts;
        const [count1, count2] = [freqCountMap[f1], freqCountMap[f2]];

        if ((f1 === 1 && count1 === 1) || (f2 === 1 && count2 === 1)) {
            return 'YES';
        }

        if ((Math.abs(f1 - f2) === 1) && ((count1 === 1) || (count2 === 1))) {
            return 'YES';
        }
    }

    return 'NO';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = isValid(s);

    ws.write(result + '\n');

    ws.end();
}
