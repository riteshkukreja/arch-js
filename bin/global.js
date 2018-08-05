#!/usr/bin/env node

const PNGExport = require("../src/png-export");
const JsGenerator = require("../src/js-generator");
const path = require("path");

const program = require("commander");

program
    .usage("[options]")
    .option("-O, --out <path>", "Output path of generated image", process.cwd())
    .option("-S, --src <path>", "Root path of source application", process.cwd())
    .option("-W, --width <n>", "Root path of source application", parseInt)
    .option("-H, --height <n>", "Root path of source application", parseInt)
    .action(async () => {
        program.width = program.width || 3000;
        program.height = program.height || 3000;

        PNGExport(
            JsGenerator,
            path.join(program.src),
            path.join(program.out, "out.png"),
            program.width,
            program.height
        )
        .then(() => console.log("Generated architecture at " + path.join(program.out, "out.png")))
        .catch(err => console.error("Failed: ", err));
    })
    .parse(process.argv);