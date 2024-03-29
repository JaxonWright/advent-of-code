import * as fs from "fs";
import * as readline from 'readline';

/**
 * Advent of Code 2023 - Day 1, Puzzle 1
 * 
 * On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
 * What is the sum of all of the calibration values?
 * 
 * https://adventofcode.com/2023/day/1
 */

const PUZZLE_INPUT_PATH = '../inputs/1-1.txt';
let totalSum = 0;

const lineReader = readline.createInterface({
    input: fs.createReadStream(PUZZLE_INPUT_PATH),
    terminal: false,
});

lineReader.on('line', (line) => {
    let regex = line.match(/(\d)\w*(\d)|(\d)/);
    if (regex && regex[3]) { // one number, so combine it with itself (ie. 7 = 77)
        totalSum += Number(regex[3]+regex[3]);
        console.log(`${line} => ${regex[3]} = ${Number(regex[3]+regex[3])}`);
    } else if (regex) { // two or more numbers. combine first and last digit (ie. 6 + 12 + 8 = 68)
        totalSum += Number(regex[1] + regex[2]);
        console.log(`${line} => ${regex[1]} + ${regex[2]} = ${Number(regex[1]+regex[2])}`);
    }
});

lineReader.on('close',()=> {
    console.log('TOTAL: ' + totalSum);
})
