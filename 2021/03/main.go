package main

import (
	"fmt"
	"io/ioutil"
	"math"
	"strconv"
	"strings"
)

var counter int = 0
var oxygenGeneratorRating string
var co2ScrubberRating string

func main() {
	testInput := getInput("test-input.txt")
	testGamma := gammaRate(testInput)
	testEpsilon := gammaToEpsilon(testGamma)
	testAnswer := powerConsumption(testGamma, testEpsilon)
	fmt.Println("Part 1 test: ", testAnswer)
	input := getInput("input.txt")
	gamma := gammaRate(input)
	epsilon := gammaToEpsilon(gamma)
	answer := powerConsumption(gamma, epsilon)
	fmt.Println("Part 1 answer: ", answer)
	oxygenGenerator(testInput)
	co2Scrubber(testInput)
	fmt.Println("Part 2 test: ", binToDec(oxygenGeneratorRating)*binToDec(co2ScrubberRating))
	oxygenGenerator(input)
	co2Scrubber(input)
	fmt.Println("Part 2 answer: ", binToDec(oxygenGeneratorRating)*binToDec(co2ScrubberRating))
}

func getInput(filename string) []string {
	fileBytes, err := ioutil.ReadFile(filename)
	if err != nil {
		fmt.Println(err)
	}
	return strings.Split(string(fileBytes), "\n")
}

func binToDec(bin string) int {
	binArr := strings.Split(bin, "")
	revCounter := len(binArr) - 1
	var dec = 0
	for _, val := range binArr {
		if val == "1" {
			dec = dec + int(math.Pow(2, float64(revCounter)))
		}
		revCounter--
	}
	return dec
}

func gammaToEpsilon(gamma string) string {
	var epsilon []string
	for _, val := range strings.Split(gamma, "") {
		if val == "1" {
			epsilon = append(epsilon, "0")
		} else if val == "0" {
			epsilon = append(epsilon, "1")
		} else {
			fmt.Println("Invalid gamma string")
		}
	}
	return strings.Join(epsilon, "")
}

func getPositionalSum(bins []string) []int {
	positionalSum := make([]int, len(bins[0]))
	for _, val := range bins {
		for j, item := range strings.Split(val, "") {
			x, err := strconv.Atoi(item)
			if err != nil {
				fmt.Println("String couldn't be parsed as int")
			}
			if x == 1 || x == 0 {
				positionalSum[j] = positionalSum[j] + x
			} else {
				fmt.Println("String is not a binary number")
			}
		}
	}
	return positionalSum
}

func gammaRate(bins []string) string {
	var gamma []string
	for _, val := range getPositionalSum(bins) {
		if val >= len(bins)/2 {
			gamma = append(gamma, "1")
		} else {
			gamma = append(gamma, "0")
		}
	}
	return strings.Join(gamma, "")
}

func powerConsumption(gamma string, epsilon string) int {
	return binToDec(gamma) * binToDec(epsilon)
}

func filterByBin(bin string, index int, bins []string) []string {
	var newBins []string
	for _, val := range bins {
		if strings.Split(val, "")[index] == bin {
			newBins = append(newBins, val)
		}
	}
	counter++
	return newBins
}

func oxygenGenerator(bins []string) {
	if len(bins) != 1 {
		posSum := float64(getPositionalSum(bins)[counter])
		binLen := float64(len(bins)) / 2
		if posSum >= binLen {
			oxygenGenerator(filterByBin("1", counter, bins))
		} else {
			oxygenGenerator(filterByBin("0", counter, bins))
		}
	} else {
		oxygenGeneratorRating = bins[0]
		counter = 0
	}
}

func co2Scrubber(bins []string) {
	if len(bins) != 1 {
		posSum := float64(getPositionalSum(bins)[counter])
		binLen := float64(len(bins)) / 2
		if posSum >= binLen {
			co2Scrubber(filterByBin("0", counter, bins))
		} else {
			co2Scrubber(filterByBin("1", counter, bins))
		}
	} else {
		co2ScrubberRating = bins[0]
		counter = 0
	}
}
