import * as fs from "fs";
import * as readline from 'readline';

/**
 * Advent of Code 2024 - Day 1, Puzzle 1
 * 
 * Pair up the smallest number in the left list with the smallest number in the right list, then the second-smallest left number with the second-smallest right number, and so on. 
 * 
 * EXAMPLE:
 * 3   4
 * 4   3
 * 2   5
 * 1   3
 * 3   9
 * 3   3
 * 
 * Within each pair, figure out how far apart the two numbers are; you'll need to add up all of those distances. 
 * For example, if you pair up a 3 from the left list with a 7 from the right list, the distance apart is 4; if you pair up a 9 with a 3, the distance apart is 6.
 * 
 * To find the total distance between the left list and the right list, add up the distances between all of the pairs you found.
 * In the example above, this is 2 + 1 + 0 + 1 + 2 + 5, a total distance of 11!
 * 
 * https://adventofcode.com/2024/day/1
 */

const PUZZLE_INPUT_PATH = '../inputs/1-1.txt';
let totalDistance = 0;
let left: number[] = [];
let right: number[] = [];
let totals: number[] = [];

const lineReader = readline.createInterface({
    input: fs.createReadStream(PUZZLE_INPUT_PATH),
    terminal: false,
});

lineReader.on('line', (line) => {
   // read lines
   let regex = line.match(/(\d+).*?(\d+)/);
   if (regex) {
      let leftNum = regex[1];
      let rightNum = regex[2];
      // console.log(leftNum, rightNum);
      addToArray(Number(leftNum), left);
      addToArray(Number(rightNum), right);
    }
});

lineReader.on('close',()=> {
    // print answer
    console.log(left.join(' '));
    console.log(right.join(' '));

    for (let i = 0; i < left.length; i++) {
      if (left[i] >= right[i])
        totals[i] = left[i] - right[i];
      else
        totals[i] = right[i] - left[i];
      totalDistance = totalDistance + totals[i];
    }

    console.log(totals.join(' '));
    console.log(totalDistance);
});

function addToArray(num: number, arr: number[]) {
  // console.log(num, arr);
  arr.push(num);
  arr.sort((a, b) => a - b);
}