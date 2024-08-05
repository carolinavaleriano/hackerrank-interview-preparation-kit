function processData(input) {
    //Enter your code here
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0], 10);
    const players = [];

    for (let i = 1; i <= n; i++) {
        const [name, scoreStr] = lines[i].split(' ');
        const score = parseInt(scoreStr, 10);

        players.push(new Player(name, score));
    }

    const checker = new Checker();
    players.sort(checker.compare);
    players.forEach(player => {
        console.log(`${player.name} ${player.score}`);
    });
}

class Player {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
}

class Checker {
    compare(a, b) {
        if (a.score > b.score) {
            return -1;
        } else if (a.score < b.score) {
            return 1;
        } else {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        }    
    }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
