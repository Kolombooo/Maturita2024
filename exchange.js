function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const smeny = ["CZK-EUR", "CZK-USD", "EUR-NOK", "EUR-USD", "USD-JPY", "HRK-NOK", "NOK-GBP", "EUR-NIG", "CZK-HCO"];

let deadends = new Set();
let track = [];
let metGoal = false;

let pos = "CZK";
track.push(pos);

function move(from, to) {
    pos = to;
    console.log("MOVING FROM " + from + " TO " + to);
    track.push(to);
}

const goal = "GBP";

function mapWays(pos) {
    let ways = [];
    for (let i = 0; i < smeny.length; i++) {
        if (smeny[i].startsWith(pos + "-")) {
            const destination = smeny[i].split("-")[1];
            if (!deadends.has(destination)) {
                ways.push(destination);
            }
        }
    }
    return ways;
}

function retrace() {
    while (track.length > 0) {
        const lastPos = track.pop();
        deadends.add(lastPos);
        if (track.length > 0) {
            const previousPos = track[track.length - 1];
            if (mapWays(previousPos).length > 0) {
                pos = previousPos;
                return;
            }
        }
    }
}

const queue = [[pos]];

while (!metGoal && queue.length > 0) {
    console.log("------( STEP START )------");

    if (track.length > 50) {
        console.log("Maximum steps reached. Cancelled.");
        break;
    }

    const path = queue.shift();
    pos = path[path.length - 1];

    if (pos === goal) {
        metGoal = true;
        track = path;
        console.log("Reached the end");
        break;
    }

    const possibleMoves = mapWays(pos);
    if (possibleMoves.length === 0) {
        deadends.add(pos);
        retrace();
    } else {
        possibleMoves.forEach(move => {
            queue.push([...path, move]);
        });
    }

    console.log("Currently located on " + pos);
    console.log("Deadend:");
    deadends.forEach(de => console.log(de));

    console.log("Possible moves are:");
    possibleMoves.forEach(move => console.log(move));

    console.log("------( STEP END )------");
}

console.log("TRACK");
track.forEach(step => console.log(step));
console.log("\n");
console.log("DEADENDS");
deadends.forEach(de => console.log(de));
