import * as fs from "fs";
import * as readline from 'readline';

/**
 * Advent of Code 2023 - Day 1, Puzzle 2
 * 
 * On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
 * What is the sum of all of the calibration values?
 * 
 * NOTE: digits can be english words (i.e. eight)
 */

const PUZZLE_INPUT_PATH = '../inputs/1-1.txt';
const ENGLISH_DIGITS = ['zero','one','two','three','four','five','six','seven','eight','nine'];
let totalSum = 0;

const lineReader = readline.createInterface({
    input: fs.createReadStream(PUZZLE_INPUT_PATH),
    terminal: false,
});

lineReader.on('line', (line) => {
    let lineConverted = line;
    // convert english digits into actual digits
    for (let i = 0; i < ENGLISH_DIGITS.length; i++) {
        // replaces "one" with "one1one" because its possible that the matched english digit could be used to spell part of another english digit
        // see: "eightwothree". Without this, it incorrectly becomes eigh23 instead of 8wo3. this converts it to eight8eighttwo2twothree3three which
        // produces the same answer, despite being a different string
        lineConverted = lineConverted.replace(new RegExp(ENGLISH_DIGITS[i],'g'), ENGLISH_DIGITS[i] + i.toString() + ENGLISH_DIGITS[i]);
    }

    let regex = lineConverted.match(/(\d)\w*(\d)|(\d)/);
    if (regex && regex[3]) { // one number, so combine it with itself (ie. 7 = 77)
        totalSum += Number(regex[3]+regex[3]);
        console.log(`${line} => ${lineConverted} => ${regex[3]} = ${Number(regex[3]+regex[3])}`);
    } else if (regex) { // two or more numbers. combine first and last digit (ie. 6 + 12 + 8 = 68)
        totalSum += Number(regex[1] + regex[2]);
        console.log(`${line} => ${lineConverted} => ${regex[1]} + ${regex[2]} = ${Number(regex[1]+regex[2])}`);
    }
});

lineReader.on('close',()=> {
    console.log('TOTAL: ' + totalSum);
})