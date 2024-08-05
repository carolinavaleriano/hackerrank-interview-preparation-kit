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
 * Complete the 'makeAnagram' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function makeAnagram(a, b) {
    // Write your code here
    const countA = Array(26).fill(0);
    const countB = Array(26).fill(0);

    for (let i = 0; i < a.length; i++) {
        countA[a.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }

    for (let i = 0; i < b.length; i++) {
        countB[b.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }

    let deletions = 0;
    for (let i = 0; i < 26; i++) {
        deletions += Math.abs(countA[i] - countB[i]);
    }

    return deletions;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine();

    const b = readLine();

    const res = makeAnagram(a, b);

    ws.write(res + '\n');

    ws.end();
}
