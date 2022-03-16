var fs = require("fs");

let flashes = 0;

function readFile(filename) {
    return fs
        .readFileSync(filename, "utf-8")
        .split("\n")
        .map((x) => x.split("").map((x) => {
          return {flashed: false, energy: parseInt(x)}
        }));
}

function part1(steps) {
  // let grid = readFile("test-input2.txt");
    // let grid = readFile("test-input.txt");
    let grid = readFile("input.txt");
    while (steps) {
        grid = firstIteration(grid);
        grid = secondIteration(grid, flashes);
        steps--;
        resetFlashes(grid)
    }
    console.log("Part 1: ", flashes);
}

function part2() {
  // let grid = readFile("test-input2.txt");
    // let grid = readFile("test-input.txt");
    let grid = readFile("input.txt");
    let steps = 0
    while (true) {
        if(synchronized(grid)) break;
        grid = firstIteration(grid);
        grid = secondIteration(grid, flashes);
        steps++;
        resetFlashes(grid)
    }
    console.log("Part 2: ", steps);
}

function resetFlashes(grid) {
  grid.forEach(x => x.forEach(x => x.flashed=false))
}

function firstIteration(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          grid[i][j].energy++
        }
    }
    return grid;
}

function secondIteration(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            flash(grid, i, j)
        }
    }
  return grid
}

function synchronized(grid) {
  let synchronized = true
  grid.every(x => x.every(x => {
    if (x.energy != 0) {
      synchronized = false
    }
    return synchronized
  }))
  return synchronized
}

function flash(grid, i, j) {
  if (grid[i][j].flashed || grid[i][j].energy <= 9) return
  else {
    grid[i][j].flashed = true
    flashes++
    grid[i][j].energy = 0
    if(grid[i-1] && grid[i-1][j-1] && !grid[i-1][j-1].flashed) {
      if(grid[i-1][j-1].energy != 0 && grid[i-1][j-1].energy <= 9) grid[i-1][j-1].energy++
      if(grid[i-1][j-1].energy > 9) {
        flash(grid, i-1, j-1, flashes)
      }
    }
    if(grid[i][j-1] && !grid[i][j-1].flashed) {
      if(grid[i][j-1].energy != 0 && grid[i][j-1].energy <= 9) grid[i][j-1].energy++
      if(grid[i][j-1].energy > 9) {
        flash(grid, i, j-1, flashes)
      }
    }
    if(grid[i+1] && grid[i+1][j-1] && !grid[i+1][j-1].flashed) {
      if(grid[i+1][j-1].energy != 0 && grid[i+1][j-1].energy <= 9) grid[i+1][j-1].energy++
      if(grid[i+1][j-1].energy > 9) {
        flash(grid, i+1, j-1, flashes)
      }
    }
    if(grid[i-1] && !grid[i-1][j].flashed) {
      if(grid[i-1][j].energy != 0 && grid[i-1][j].energy <= 9) grid[i-1][j].energy++
      if(grid[i-1][j].energy > 9) {
        flash(grid, i-1, j, flashes)
      }
    }
    if(grid[i+1] && !grid[i+1][j].flashed) {
      if(grid[i+1][j].energy != 0 && grid[i+1][j].energy <= 9) grid[i+1][j].energy++
      if(grid[i+1][j].energy > 9) {
        flash(grid, i+1, j, flashes)
      }
    }
    if(grid[i-1] && grid[i-1][j+1] && !grid[i-1][j+1].flashed) {
      if(grid[i-1][j+1].energy != 0 && grid[i-1][j+1].energy <= 9) grid[i-1][j+1].energy++
      if(grid[i-1][j+1].energy > 9) {
        flash(grid, i-1, j+1, flashes)
      }
    }
    if(grid[i][j+1] && !grid[i][j+1].flashed) {
      if(grid[i][j+1].energy != 0 && grid[i][j+1].energy <= 9) grid[i][j+1].energy++
      if(grid[i][j+1].energy > 9) {
        flash(grid, i, j+1, flashes)
      }
    }
    if(grid[i+1] && grid[i+1][j+1] && !grid[i+1][j+1].flashed) {
      if(grid[i+1][j+1].energy != 0 && grid[i+1][j+1].energy <= 9) grid[i+1][j+1].energy++
      if(grid[i+1][j+1].energy > 9) {
        flash(grid, i+1, j+1, flashes)
      }
    }
  }
}

part1(100);
part2();
