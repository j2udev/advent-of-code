let fs = require("fs");

class Position {
  constructor(dir: string, val: number) {
    this.direction = dir as Direction
    this.value = val
  }
  direction: Direction
  value: number
}

enum Direction {
  Forward = 'forward',
  Down = 'down',
  Up = 'up'
}

function readFile(filename: string): Position[] {
  let plannedCourse = fs.readFileSync(filename, "utf-8")
    .split("\n")
    .map((x: string) => {
      let y = x.split(" ")
      return new Position(y[0], parseInt(y[1]))
    })
  return plannedCourse
}

function part1Position(positions: Position[]): number {
  let horizontal = 0
  let vertical = 0
  for (let pos of positions) {
      switch(pos.direction) {
        case 'forward': {
          horizontal += pos.value
          break;
        }
        case 'down': {
          vertical += pos.value
          break;
        }
        case 'up': {
          vertical -= pos.value
          break;
        }
        default: {
          console.log("Invalid direction")
          break;
        }
    }
  }
  return horizontal * vertical
}

function part2Position(positions: Position[]): number {
  let horizontal = 0
  let vertical = 0
  let aim = 0
  for (let pos of positions) {
      switch(pos.direction) {
        case 'forward': {
          horizontal += pos.value
          vertical += pos.value * aim
          break;
        }
        case 'down': {
          aim += pos.value
          break;
        }
        case 'up': {
          aim -= pos.value
          break;
        }
        default: {
          console.log("Invalid direction")
          break;
        }
    }
  }
  return horizontal * vertical
}

// const plannedCourse = readFile("test-input.txt")
const plannedCourse = readFile("input.txt")
let part1 = part1Position(plannedCourse)
let part2= part2Position(plannedCourse)
console.log("Part 1: ", part1)
console.log("Part 2: ", part2)