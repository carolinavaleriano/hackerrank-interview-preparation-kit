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
 * Complete the 'sherlockAndAnagrams' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function sherlockAndAnagrams(s) {
    // Write your code here
    let substringCount = {};

    for (let start = 0; start < s.length; start++) {
        for (let end = start + 1; end <= s.length; end++) {
            let substring = s.slice(start, end);
            let sortedSubstring = substring.split('').sort().join('');
            if (substringCount[sortedSubstring]) {
                substringCount[sortedSubstring]++;
            } else {
                substringCount[sortedSubstring] = 1;
            }
        }
        
    }

    let anagramPairs = 0;

    for (let key in substringCount) {
        let count = substringCount[key];
        if (count > 1) {
            anagramPairs += (count * (count - 1)) / 2;
        }
    }

    return anagramPairs;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = sherlockAndAnagrams(s);

        ws.write(result + '\n');
    }

    ws.end();
}
