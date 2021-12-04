var fs = require("fs");
const { report } = require("process");
var text = fs.readFileSync("./input.txt", "utf-8");
var testText = fs.readFileSync("./test-input.txt", "utf-8");
var sonarReadings = text.split("\n").map(x => parseInt(x));
var testSonarReadings = testText.split("\n").map(x => parseInt(x));

function sonarSweep1(report) {
  let counter = 0;
  report.reduce((prev, curr) => {
    if (curr > prev) counter++
    return curr;
  })
  return counter;
}

function sonarSweep2(report) {
  return report.reduce((acc, curr, i, arr) => {
    if (i === 0) return acc;
    if (curr > arr[i-1]) acc++
    return acc;
  }, 0);
}

function sonarSweep3(report) {
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

console.log("Part 1.1 test: ", sonarSweep1(testSonarReadings));
console.log("Part 1.2 test: ", sonarSweep2(testSonarReadings));
console.log("Part 2 test: ", sonarSweep3(testSonarReadings));

console.log("Part 1.1 answer: ", sonarSweep1(sonarReadings));
console.log("Part 1.2 answer: ", sonarSweep2(sonarReadings));
console.log("Part 2 answer: ", sonarSweep3(sonarReadings));