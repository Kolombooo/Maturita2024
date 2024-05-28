function itemStartsWith(str, substrs) {
    return substrs.some(substr => str.startsWith(substr));
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const smeny = ["CZK-EUR", "CZK-USD", "EUR-NOK", "EUR-USD", "USD-JPY", "HRK-NOK"];

let deadends = [];


let pos = "CZK";
function move(from, to) {
    deadends.push(from);
    pos = to;
}
const goal = "NOK";

function mapWays(pos) {
    let ways = [];

    for (let i = 0; i < smeny.length; i++) {
        if (smeny[i].startsWith(pos + "-")) {
            if (deadends.includes(smeny[i])) {
                console.log("Ways already discovered.");
            } else {
                ways.push(smeny[i].split("-")[1]);
            }
        }
    }

    return ways;
}


while (true) {
    console.log("Currently located on " + pos);
    console.log("Deadend:");
    for (let i = 0; i < deadends.length; i++) {
        console.log(deadends[i]);
    }
    console.log("Possible moves are:");
    for (let i = 0; i < mapWays(pos).length; i++) {
        console.log(mapWays(pos)[i]);
    }
    if (mapWays(pos).length === 0) {
        console.log("No possible steps, retracing");
        move(pos, deadends[deadends.length-1]);
    }
    if (mapWays(pos).includes(goal)) {
        move(pos, goal)
        console.log("Reached the end");
        break;
    } else {
        for (let i = 0; i < mapWays(pos).length; i++) {
            if (!deadends.includes(mapWays(pos)[i])) {
                move(pos, mapWays(pos)[i]);
            }
        }
    }
}

for (let i = 0; i < deadends.length; i++) {
    console.log(deadends[i]);
}