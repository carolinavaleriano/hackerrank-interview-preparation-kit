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
 * Complete the 'activityNotifications' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY expenditure
 *  2. INTEGER d
 */

function activityNotifications(expenditure, d) {
    let notifications = 0;
    const count = new Array(201).fill(0);
    const n = expenditure.length;

    for (let i = 0; i < d; i++) {
        count[expenditure[i]]++;
    }

    for (let i = d; i < n; i++) {
        const median = getMedian(count, d);
        if (expenditure[i] >= 2 * median) {
            notifications++;
        }
        count[expenditure[i - d]]--;
        count[expenditure[i]]++;
    }

    return notifications;
}

function getMedian(count, d) {
    let sum = 0;
    let median = 0;

    if (d % 2 !== 0) {
        const middle = Math.floor(d / 2) + 1;
        for (let i = 0; i < count.length; i++) {
            sum += count[i];
            if (sum >= middle) {
                median = i;
                break;
            }
        }
    }
    else {
        const middle1 = Math.floor(d / 2);
        const middle2 = middle1 + 1;
        let m1 = -1;
        let m2 = -1;
        
        for (let i = 0; i < count.length; i++) {
            sum += count[i];
            if (sum >= middle1 && m1 === -1) {
                m1 = i;
            }
            if (sum >= middle2) {
                m2 = i;
                break;
            }
        }
        median = (m1 + m2) / 2;
    }
    return median;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const d = parseInt(firstMultipleInput[1], 10);

    const expenditure = readLine().replace(/\s+$/g, '').split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    const result = activityNotifications(expenditure, d);

    ws.write(result + '\n');

    ws.end();
}
