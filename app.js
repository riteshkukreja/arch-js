const PNGExport = require("./src/png-export");
const JsGenerator = require("./src/js-generator");
const path = require("path");

const program = require("commander");

program
    .version('1.0.0', "-v", "--version")
    .usage("command [options]")
    .option("-O, --out <path>", "Output path of generated image", path.join(__dirname, "dist"))
    .option("-S, --src <path>", "Root path of source application", path.join(__dirname, "src"))
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
        .then(() => console.log("Generated architecture"))
        .catch(err => console.error("Failed: ", err));
    })
    .parse(process.argv);