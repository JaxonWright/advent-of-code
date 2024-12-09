import * as fs from "fs";
import * as readline from 'readline';

/**
 * Advent of Code 2024 - Day #, Puzzle #
 * 
 * Short description of problem
 * 
 * https://adventofcode.com/2023/day/#
 */

const PUZZLE_INPUT_PATH = '../inputs/#-#.txt';

const lineReader = readline.createInterface({
    input: fs.createReadStream(PUZZLE_INPUT_PATH),
    terminal: false,
});

lineReader.on('line', (line) => {
   // read lines
});

lineReader.on('close',()=> {
    // print answer
})