import * as fs from "fs";
import * as readline from 'readline';

/**
 * Advent of Code 2024 - Day 1, Puzzle 2
 * 
 * This time, you'll need to figure out exactly how often each number from the left list appears in the right list. 
 * Calculate a total similarity score by adding up each number in the left list after multiplying it by the number of times that number appears in the right list.
 * 
 * EXAMPLE:
 * 3   4
 * 4   3
 * 2   5
 * 1   3
 * 3   9
 * 3   3
 * 
 * The first number in the left list is 3. It appears in the right list three times, so the similarity score increases by 3 * 3 = 9.
 * The second number in the left list is 4. It appears in the right list once, so the similarity score increases by 4 * 1 = 4.
 * 
 * So, for these example lists, the similarity score at the end of this process is 31 (9 + 4 + 0 + 0 + 9 + 9).
 * 
 * https://adventofcode.com/2024/day/1#part2
 */

const PUZZLE_INPUT_PATH = '../inputs/1-1.txt';
let totalSimilarity = 0;
let left: number[] = [];
let right: number[] = [];
let similarities: number[] = [];

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
      similarities[i] = left[i] * right.reduce((p, v) => v == left[i] ? p + 1 : p, 0);
      totalSimilarity = totalSimilarity + similarities[i];
    }

    console.log(similarities.join(' '));
    console.log(totalSimilarity);
});

function addToArray(num: number, arr: number[]) {
  // console.log(num, arr);
  arr.push(num);
  arr.sort((a, b) => a - b);
}