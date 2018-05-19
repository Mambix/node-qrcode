/*jslint es6 node:true */
"use strict";

var Utils = require("./utils");

var SQUARE_CHAR = {
    x0: " ",
    x1: "Q",
    x2: "R",
    x3: "S",
    x4: "T",
    x5: "U",
    x6: "V",
    x7: "W",
    x8: "X",
    x9: "Y",
    xA: "Z",
    xB: "[",
    xC: "\\",
    xD: "]",
    xE: "^",
    xF: "_"
};

var CIRCLE_CHAR = {
    x0: " ",
    x1: "1",
    x2: "2",
    x3: "3",
    x4: "4",
    x5: "5",
    x6: "6",
    x7: "7",
    x8: "8",
    x9: "9",
    xA: "A",
    xB: "B",
    xC: "C",
    xD: "D",
    xE: "E",
    xF: "F"
};

var DONUT_CHAR = {
    x0: "@",
    x1: "a",
    x2: "b",
    x3: "c",
    x4: "d",
    x5: "e",
    x6: "f",
    x7: "g",
    x8: "h",
    x9: "i",
    xA: "j",
    xB: "k",
    xC: "l",
    xD: "m",
    xE: "n",
    xF: "o"
};

var HOLLOW_CHAR = {
    x0: "p",
    x1: "q",
    x2: "r",
    x3: "s",
    x4: "t",
    x5: "u",
    x6: "v",
    x7: "w",
    x8: "x",
    x9: "y",
    xA: "z",
    xB: "{",
    xC: "|",
    xD: "}",
    xE: "~",
    xF: "_"
};

function getBlockChar(c0, c1, c2, c3, t) {
    var c = 0;
    if (c0) {
        c += 8;
    }
    if (c1) {
        c += 4;
    }
    if (c2) {
        c += 2;
    }
    if (c3) {
        c += 1;
    }

    switch (c) {
    case 15:
        return t.xF;
    case 14:
        return t.xE;
    case 13:
        return t.xD;
    case 12:
        return t.xC;
    case 11:
        return t.xB;
    case 10:
        return t.xA;
    case 9:
        return t.x9;
    case 8:
        return t.x8;
    case 7:
        return t.x7;
    case 6:
        return t.x6;
    case 5:
        return t.x5;
    case 4:
        return t.x4;
    case 3:
        return t.x3;
    case 2:
        return t.x2;
    case 1:
        return t.x1;
    default:
        return t.x0;
    }
}

exports.render = function (qrData, options, cb) {
    var size = qrData.modules.size;
    var data = qrData.modules.data;

    var opts = Utils.getOptions(options);
    var ENCODE = SQUARE_CHAR;

    switch (opts.type) {
    case "circleTTF":
        ENCODE = CIRCLE_CHAR;
        break;
    case "hollowTTF":
        ENCODE = HOLLOW_CHAR;
        break;
    case "donutTTF":
        ENCODE = DONUT_CHAR;
        break;
    default:
        ENCODE = SQUARE_CHAR;
    }

    var output = "";
    var i = 0;
    var j = 0;
    var c0, c1, c2, c3;

    while (i < size) {
        j = 0;
        while (j < size) {
            // Encode 4 bits at a time
            // as TTF is 4bits per character
            c0 = data[i * size + j];
            c1 = data[(i + 1) * size + j];
            c2 = data[(i + 2) * size + j];
            c3 = data[(i + 3) * size + j];

            output += getBlockChar(c0, c1, c2, c3, ENCODE);
            j += 1;
        }
        output += "\n";
        i += 4;
    }

    if (typeof cb === "function") {
        cb(null, output);
    }

    return output;
};

exports.renderToFile = function renderToFile(path, qrData, options, cb) {
    if (cb === "undefined") {
        cb = options;
        options = undefined;
    }

    var fs = require("fs");
    var utf8 = exports.render(qrData, options);
    fs.writeFile(path, utf8, cb);
};
