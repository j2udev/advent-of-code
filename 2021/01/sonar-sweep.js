var fs = require("fs");

// var text = fs.readFileSync("test-input.txt", "utf-8");
var text = fs.readFileSync("input.txt", "utf-8");
var sonarReadings = text.split("\n").map((x) => parseInt(x));

function sonarSweep1(report) {
    return report.reduce((acc, curr, i, arr) => {
        if (i === 0) return acc;
        if (curr > arr[i - 1]) acc++;
        return acc;
    }, 0);
}

function sonarSweep2(report) {
    let curr;
    let prev;
    let counter = 0;
    for (let i = 0; i < report.length; i++) {
        prev = report[i - 1] + report[i - 2] + report[i - 3];
        curr = report[i] + report[i - 1] + report[i - 2];
        if (curr > prev) counter++;
    }
    return counter;
}

console.log("Part 1: ", sonarSweep1(sonarReadings));
console.log("Part 2: ", sonarSweep2(sonarReadings));
