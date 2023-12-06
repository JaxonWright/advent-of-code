import * as fs from "fs";
import * as readline from 'readline';

/**
 * Advent of Code 2023 - Day 2, Puzzle 1
 * 
 * https://adventofcode.com/2023/day/2
 */

const PUZZLE_INPUT_PATH = '../inputs/2-1.txt';

// what games are possible with a bag consisting of these counts of cubes?
const VALIDATION = {
    red: 12,
    green: 13,
    blue: 14
}

let validGames: number[] = [];

const lineReader = readline.createInterface({
    input: fs.createReadStream(PUZZLE_INPUT_PATH),
    terminal: false,
});

lineReader.on('line', (line) => {
    // line example: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
    console.log(line);
    let gameIDRegEx = line.match(/Game (\d+)/);
    let gameID: number = Number(gameIDRegEx && gameIDRegEx[1] ? gameIDRegEx[1] : 0); // the game number
    let rounds = line.split(': ')[1].split('; '); // splits line into each round
    let colorMax = { red: 0, green: 0, blue: 0 }; // the maximum value of each color in round

    for (let round of rounds) {
        console.log('round: ' +  round);
        let redRegEx = round.match(/(\d+) red/);
        let greenRegEx = round.match(/(\d+) green/);
        let blueRegEx = round.match(/(\d+) blue/);
        let roundCounts = { 
                red: ((redRegEx && redRegEx[1]) ? Number(redRegEx[1]) : 0),
                green: ((greenRegEx && greenRegEx[1]) ? Number(greenRegEx[1]) : 0),
                blue:((blueRegEx && blueRegEx[1]) ? Number(blueRegEx[1]) : 0) 
            };

        colorMax = { 
            red: Math.max(roundCounts.red, colorMax.red),
            green: Math.max(roundCounts.green, colorMax.green),
            blue: Math.max(roundCounts.blue, colorMax.blue) 
        } 
    }

    console.log(colorMax);
    
    if (colorMax.red <= VALIDATION.red && colorMax.red <= VALIDATION.red && colorMax.blue <= VALIDATION.blue) {
        validGames.push(gameID);
        console.log('🟢 valid')
    } else {
        console.log('🔴 invalid')
    }

    console.log('');
});

lineReader.on('close',()=> {
    console.log('Possible Games: ' + validGames.join(', '));
    console.log('Sum of Game IDs: ' + validGames.reduce((a, b) => a + b, 0));
})