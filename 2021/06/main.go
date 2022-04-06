package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"

	funk "github.com/thoas/go-funk"
)

func main() {

	// part1 := calcFish(80, getInput("test-input.txt"))
	part1 := calcFish(80, getInput("input.txt"))
	// part2 := betterCalcFish(80, betterInput)
	part2 := betterCalcFish(256, getBetterInput(getInput("input.txt")))
	fmt.Println("Part 1: ", part1)
	fmt.Println("Part 2: ", part2)
}

func getInput(filename string) []int {
	fileBytes, err := ioutil.ReadFile(filename)
	if err != nil {
		fmt.Println(err)
	}
	inputs := strings.Split(string(fileBytes), ",")
	ints, ok := funk.Map(inputs, func(x string) int {
		y, _ := strconv.Atoi(x)
		return y
	}).([]int)
	if !ok {
		fmt.Println("Interface couldn't be cast to []int")
	}
	return ints
}

func getBetterInput(input []int) map[int]int {
	betterInput := map[int]int{8: 0, 7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: 0}
	funk.ForEach(input, func(x int) {
		betterInput[x]++
	})
	return betterInput
}

func calcFish(days int, pop []int) int {
	for i := 0; i < days; i++ {
		var newFish []int
		for j, fish := range pop {
			if fish > 0 {
				pop[j] = fish - 1
			} else {
				newFish = append(newFish, 8)
				pop[j] = 6
			}
		}
		pop = append(pop, newFish...)
	}
	return len(pop)
}

func betterCalcFish(days int, pop map[int]int) int {
	fish := 0
	last := 0
	for i := 0; i < days; i++ {
		last = pop[0]
		pop[0] = pop[1]
		pop[1] = pop[2]
		pop[2] = pop[3]
		pop[3] = pop[4]
		pop[4] = pop[5]
		pop[5] = pop[6]
		pop[6] = pop[7] + last
		pop[7] = pop[8]
		pop[8] = last
	}
	for i := 0; i <= 8; i++ {
		fish += pop[i]
	}
	return fish
}
