var fs = require("fs");

let p1SyntaxTable = {
    ")": { points: 3, occurences: 0, match: '(' },
    "]": { points: 57, occurences: 0, match: '[' },
    "}": { points: 1197, occurences: 0, match: '{' },
    ">": { points: 25137, occurences: 0, match: '<' },
};

let p2SyntaxTable = {
    "(": { points: 1, match: ')' },
    "[": { points: 2, match: ']' },
    "{": { points: 3, match: '}' },
    "<": { points: 4, match: '>' },
};

function readFile(filename) {
  let lines = fs.readFileSync(filename, "utf-8").split("\n")
  return lines
}

function part1(){
  // let lines = readFile('test-input.txt')
  let lines = readFile('input.txt')
  let stack = []
  let completions = []
  for (let line of lines) {
    let corrupted = false
    for (let char of line.split('')) {
      if (char === '(' || char === '[' || char === '{' || char === '<') stack.push(char)
      else if (p1SyntaxTable[char].match !== stack.pop()) {
        p1SyntaxTable[char].occurences++
        stack = []
        corrupted = true
        break
      }
    }
    // if (!corrupted) completions.push(stack)
    if (!corrupted) completions.push(scoreCompletion(stack))
    stack = []
  }
  let score = Object.entries(p1SyntaxTable).reduce((acc, curr) => {
    acc += curr[1].occurences * curr[1].points
    return acc
  }, 0)
  console.log("Part 1: ", score)
  console.log("Part 2: ", completions.sort((x, y) => x-y)[Math.floor(completions.length/2)])
  // console.log("Part 2: ", findMedian(completions))
  completions.sort((x, y) => x-y).forEach(x => console.log(x))
}

function scoreCompletion(comp) {
  return comp.reduceRight((acc, curr) => {
    return acc * 5 + p2SyntaxTable[curr].points
  }, 0)
}

function findMedian(comps) {
  let sortedComps = comps.sort((x, y) => x - y)
  return sortedComps[comps.length%2]
}



part1()