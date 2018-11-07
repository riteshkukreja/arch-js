#!/usr/bin/env node

const PNGExport = require("../src/png-export");
const HTMLExport = require("../src/html-export");
const JsGenerator = require("../src/js-generator");
const DFDGenerator = require("../src/dfd-generator");
const path = require("path");

const program = require("commander");

program
    .usage("[options]")
    .option("-O, --out <path>", "Output path of generated image", path.join(process.cwd(), "out.png"))
    .option("-S, --src <path>", "Root path of source application", process.cwd())
    .option("-W, --width <n>", "Width of generated image", parseInt)
    .option("-H, --height <n>", "Height of generated image", parseInt)
    .option("--dfd <n>", "DFD level", parseInt)
    .option("--watermark [text]", "Add custom watermark")
    .option("--html", "Export architecture as interactive HTML")
    .option("--background <text>", "Add custom background (default: transparent)")
    .action(async () => {
        program.width = program.width || 3000;
        program.height = program.height || 3000;
        program.dfd = program.dfd || -1;
        const watermarkText = "Made with ❤ and @arch/js";

        const config = {
            watermark: program.watermark === true ? watermarkText: program.watermark,
            background: program.background
        };

        const exporter = program.html ? HTMLExport : PNGExport;

        exporter(
            DFDGenerator(JsGenerator, program.dfd - 1),
            program.src,
            program.out,
            program.width,
            program.height,
            config
        )
        .then(() => console.log("Generated architecture at " + program.out))
        .catch(err => console.error("Failed: ", err));
    })
    .parse(process.argv);