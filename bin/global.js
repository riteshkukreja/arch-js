#!/usr/bin/env node

const PNGExport = require("../src/png-export");
const JsGenerator = require("../src/js-generator");
const path = require("path");

const program = require("commander");

program
    .usage("[options]")
    .option("-O, --out <path>", "Output path of generated image", process.cwd())
    .option("-S, --src <path>", "Root path of source application", process.cwd())
    .option("-W, --width <n>", "Width of generated image", parseInt)
    .option("-H, --height <n>", "Height of generated image", parseInt)
    .option("--watermark [text]", "Add custom watermark")
    .option("--background <text>", "Add custom background (default: transparent)")
    .action(async () => {
        program.width = program.width || 3000;
        program.height = program.height || 3000;
        const watermarkText = "Made with ❤ and @arch/js";

        const config = {
            watermark: program.watermark === true ? watermarkText: program.watermark,
            background: program.background
        };

        PNGExport(
            JsGenerator,
            path.join(program.src),
            path.join(program.out, "out.png"),
            program.width,
            program.height,
            config
        )
        .then(() => console.log("Generated architecture at " + path.join(program.out, "out.png")))
        .catch(err => console.error("Failed: ", err));
    })
    .parse(process.argv);