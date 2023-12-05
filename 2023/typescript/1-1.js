"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
var PUZZLE_INPUT_PATH = '../inputs/1-1.txt';
var totalSum = 0;
var lineReader = readline.createInterface({
    input: fs.createReadStream(PUZZLE_INPUT_PATH),
    terminal: false,
});
lineReader.on('line', function (line) {
    var regex = line.match(/(\d)\w*(\d)|(\d)/);
    if (regex && regex[3]) { // one number, so combine it with itself (ie. 7 = 77)
        totalSum += Number(regex[3] + regex[3]);
        console.log("".concat(line, " => ").concat(regex[3], " = ").concat(Number(regex[3] + regex[3])));
    }
    else if (regex) { // two or more numbers. combine first and last digit (ie. 6 + 12 + 8 = 68)
        totalSum += Number(regex[1] + regex[2]);
        console.log("".concat(line, " => ").concat(regex[1], " + ").concat(regex[2], " = ").concat(Number(regex[1] + regex[2])));
    }
});
lineReader.on('close', function () {
    console.log('TOTAL: ' + totalSum);
});
