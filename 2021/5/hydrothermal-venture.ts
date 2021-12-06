import { getMaxListeners } from "process";

var fs = require("fs");
var gridSize = 0;

class LineSegment {
  constructor(x1: number, y1: number, x2: number, y2: number) {
    ( x1 == x2 || y1 == y2 ? this.diagonal = false : this.diagonal = true);
    // This threw me for a loop for awhile... the traditional rise over run logic for calculating slope needed to be
    // transposed because we are in quadrant 4 but are using positive numbers for the y axis... very tricky
    ( this.diagonal && (y1 - y2)/(x1 - x2) >= 0 ? this.ascending = false : this.ascending = true);
    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
  x1: number
  x2: number
  y1: number
  y2: number
  diagonal: boolean
  ascending: boolean
}

function readFile(filename: string): LineSegment[] {
  let lines = fs.readFileSync(filename, "utf-8")
    .split("\n")
    .map((x: string) => {
      let coordinates: string[] = x.split("->")
      let point1: number[] = coordinates[0].split(",").map((x: string) => parseInt(x))
      let point2: number[] = coordinates[1].split(",").map((x: string) => parseInt(x))
      let max = Math.max(point1[0], point1[1], point2[0], point2[1]);
      if (max > gridSize) gridSize = max+1
      return new LineSegment(point1[0], point1[1], point2[0], point2[1])
    })
  return lines
}

function getLines(filename: string): LineSegment[] {
  const lineSegments = readFile(filename)
  return lineSegments
}

function getIntersectionTable(size: number): number[][] {
  let intersectionTable = new Array(size)
      .fill(0)
      .map(() => new Array(size).fill(0));
  return intersectionTable
}

function calculateIntersections(lines: LineSegment[], intersections: number[][], diagonals: boolean): number {
  for (const line of lines) {
    if (!line.diagonal) {
      if (line.x1 == line.x2) {
        let range = Math.abs(line.y1-line.y2)
        for(let i=0; i<=range; i++) {
          let x = line.x1
          let y = Math.min(line.y1, line.y2)+i
          intersections[y][x]++
        }
      }
      if (line.y1 == line.y2) {
        let range = Math.abs(line.x1-line.x2)
        for(let i=0; i<=range; i++) {
          let x = Math.min(line.x1, line.x2)+i
          let y = line.y1
          intersections[y][x]++
        }
      }
    }
    else if (diagonals) {
      let range = Math.abs(line.x1-line.x2)
      for (let i = 0; i <= range; i++) {
        if (line.ascending) {
          let x = Math.min(line.x1, line.x2) + i;
          let y = Math.max(line.y1, line.y2) - i;
          intersections[y][x]++;
        }
        else {
          let x = Math.min(line.x1, line.x2) + i;
          let y = Math.min(line.y1, line.y2) + i;
          intersections[y][x]++;
        }
      }
    }
  }
  let dangerousAreas = 0
  intersections.forEach(x => {
    x.forEach(y => {
      if (y >= 2) dangerousAreas++
    })
  })
  return dangerousAreas
}

// const lines = getLines("test-input.txt")
const lines = getLines("input.txt")
let part1Intersections = getIntersectionTable(gridSize)
const part1 = calculateIntersections(lines, part1Intersections, false)
console.log("Part 1: ", part1)
let part2Intersections = getIntersectionTable(gridSize)
const part2 = calculateIntersections(lines, part2Intersections, true)
console.log("Part 2: ", part2)
