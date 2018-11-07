const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const DrawHelper = require("../common/drawHelper");
const CalcHelper = require("../common/calcHelper");
const NavHelper = require("./nagivationHelper");

const mapToJson = (map) => JSON.stringify([...map]);

const jsonToMap = (jsonStr) => new Map(JSON.parse(jsonStr));

const drawElements = async (context, map, width=500, height=500) => {
    /** Get Topological sorted modules */
    const stack = getTopologicalStack(map);

    const sizeMap = new Map();
    const levels = stack.length;

    for(let level = 0; level < stack.length; level++) {
        for(let i = 0; i < stack[level].length; i++) {
             /** Allocate positions and sizes to all modules */
            const size = allocateModule(context, stack[level][i], level+1, i, stack[level].length, width, height, levels);
            sizeMap.set(stack[level][i]._path, size);

            /** Display all modules */
            drawModule(context, size, stack[level][i]);
        }
    }

    iterator = map.values();
    item = iterator.next();
    while(!item.done) {
        const size = sizeMap.get(item.value._path);

        /** Draw all outbound relationships */
        for(const dependency of item.value._imports) {
            if(sizeMap.get(dependency) == undefined)
                drawVertice(context, size, sizeMap.get(dependency + "/index"));
            else
                drawVertice(context, size, sizeMap.get(dependency));
        }

        item = iterator.next();
    }

    return sizeMap;
};

const initialize = async (width, height, config={}, mapStr) => {
    try {
        const image = document.createElement("canvas");
        const context = image.getContext("2d");

        image.width = width;
        image.height = height;

        const map = jsonToMap(mapStr);

        /** Draw background */
        if(config && config.background) {
            /** Draw watermark */
            drawBackground(context, width, height, config.background);
        }

        /** Draw elements */
        const modulePositionMap = await drawElements(context, map, width, height);

        /** Attach click handler */
        attachModuleClickHandler(image, modulePositionMap, map);

        if(config && config.watermark) {
            /** Draw watermark */
            drawWaterMark(context, width, height, config.watermark);
        }

        /** Append to body */
        document.body.appendChild(image);
    } catch(e) {
        console.error(e);
        throw e;
    }
};

module.exports = async (generator, srcDir, outDir, width=500, height=500, config={}) => {
    try {
        /** Create output directory if not present */
        if(!fs.existsSync(outDir))
            await promisify(fs.mkdir)(outDir);

        /** Copy template/index.html to output directory */
        await promisify(fs.copyFile)(path.join(__dirname, "template", "index.html"), path.join(outDir, "index.html"));

        /** Create app.js in output directory */
        const stream = fs.createWriteStream(path.join(outDir, "app.js"));

        /** Copy helper methods to app.js */
        const methodsToCopy = [
            jsonToMap, 
            ...Object.values(CalcHelper), 
            ...Object.values(DrawHelper), 
            ...Object.values(NavHelper),
            drawElements, 
            initialize];

        methodsToCopy
            .map(a => `const ${a.name} = ${a.toString()}`)
            .forEach(a => stream.write(a + "\n\n"));

        /** Copy modules data to app.js */
        const map = await generator(srcDir);

        /** Start main method to draw on canvas to app.js */
        stream.write('window.onload = () => {');
        stream.write(`initialize (
            ${width},
            ${height},
            ${JSON.stringify(config)},
            '${mapToJson(map)}'
            )`);
        stream.write('}');
    } catch(e) {
        console.error(e);
        throw e;
    }
};