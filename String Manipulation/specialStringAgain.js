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

// Complete the substrCount function below.
function substrCount(n, s) {
    const consecutive = Array(n);
    consecutive[0] = 1;

    let acc = 0;
    for (let i = 1; i < n; i++) {
        if (s[i] !== s[i - 1]) {
            acc += count(s, consecutive, i - 1);
            consecutive[i] = 1;
        } else {
            consecutive[i] = consecutive[i - 1] + 1;
        }        
    }
    acc += count(s, consecutive, n - 1);
    return acc;
}

function count (s, consecutive, i) {
    const c = consecutive[i];
    const subTotal1 = c * (c + 1) / 2;

    const j = i - c - 1;
    if (j < 0 || s[i] !== s[j]) {
        return subTotal1;
    }
    const c2 = consecutive[j];
    const subTotal2 = Math.min(c, c2);
    return subTotal1 + subTotal2;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const result = substrCount(n, s);

    ws.write(result + '\n');

    ws.end();
}
