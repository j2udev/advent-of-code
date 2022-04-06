var fs = require("fs");

function readFile(filename) {
    return fs
        .readFileSync(filename, "utf-8")
        .split(",")
        .map((x) => parseInt(x));
}

function fuelCostByPositionPart1(positions, position) {
  let fuelCosts = [];
  for(x of positions){
    fuelCosts.push(Math.abs(position - x))
  }
  return fuelCosts.reduce((x, y) => x + y);
}

function calcFuelCostsPart1(positions) {
  let fuelCosts = [];
  for(x of positions){
    fuelCosts.push(fuelCostByPositionPart1(positions, x))
  }
  let bestFuel = Math.min(...fuelCosts)
  return bestFuel
}

function fuelCostByPositionPart2(positions, position) {
  let fuelCosts = [];
  for(x of positions){
    fuelCosts.push(crabEngineering(Math.abs(position - x)))
  }
  return fuelCosts.reduce((x, y) => x + y);
}

function crabEngineering(number){
  let fib = 0
  for(let x = 0; x <= number; x++){
    fib += x
  }
  return fib
}

function calcFuelCostsPart2(positions) {
  let fuelCosts = [];
  for (let x = 0; x < Math.max(...positions); x++) {
      fuelCosts.push(fuelCostByPositionPart2(positions, x));
  }
  let bestFuel = Math.min(...fuelCosts)
  return bestFuel
}

// const p1Positions = readFile("test-input.txt")
const p1Positions = readFile("input.txt")
let p1BestFuelCost = calcFuelCostsPart1(p1Positions)
console.log(p1BestFuelCost)

// const p2Positions = readFile("test-input.txt")
const p2Positions = readFile("input.txt")
let p2BestFuelCost = calcFuelCostsPart2(p2Positions)
console.log(p2BestFuelCost)