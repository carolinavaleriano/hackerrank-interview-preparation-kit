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

// Complete the freqQuery function below.
function freqQuery(queries) {
    let valueFrequency = {};
    let frequencyCount = {};
    let result = [];

    for (let [action, value] of queries) {
        if (action === 1) {
            let oldFrequency = valueFrequency[value] || 0;
            let newFrequency = oldFrequency + 1;
            valueFrequency[value] = newFrequency;

            if (oldFrequency > 0) {
                frequencyCount[oldFrequency] = (frequencyCount[oldFrequency] || 0) - 1;
            }

            frequencyCount[newFrequency] = (frequencyCount[newFrequency] || 0) + 1;
        } else  if (action === 2){
            if (valueFrequency[value]) {
                let oldFrequency = valueFrequency[value];
                let newFrequency = oldFrequency - 1;
                valueFrequency[value] = newFrequency;

                frequencyCount[oldFrequency] = (frequencyCount[oldFrequency] || 0) - 1;

                if (newFrequency > 0) {
                    frequencyCount[newFrequency] = (frequencyCount[newFrequency] || 0) + 1;
                }
            }
        } else if (action === 3) {
            if (frequencyCount[value] > 0) {
                result.push(1);
            } else {
                result.push(0);
            }
        }
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = freqQuery(queries);

    ws.write(ans.join('\n') + '\n');

    ws.end();
}
