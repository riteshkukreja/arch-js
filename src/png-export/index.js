const fs = require("fs");
const path = require("path");

const Canvas = require("canvas");

const { drawVertice, drawModule, allocateModule } = require("./utils");
const { getTopologicalStack } = require("./helper");

const writeToImage = async (image, file) => {
    return new Promise((resolve, reject) => {
        const out = fs.createWriteStream(file);
        const stream = image.pngStream();
    
        stream.on('data', function(chunk){
            out.write(chunk);
        });
        
        stream.on('end', resolve);
        stream.on('error', (err) => reject(err));
    });
};

module.exports = async (generator, srcDir, outFilePath, width=500, height=500) => {
    try {
        const image = new Canvas(width, height);
        const context = image.getContext("2d");

        /** Get directory information */
        const map = await generator(srcDir);

        /** Get Topological sorted modules */
        const stack = getTopologicalStack(map);

        // console.log(stack);
        const sizeMap = new Map();
        const levels = Object.keys(stack).length;

        for(const level in stack) {
            for(let i = 0; i < stack[level].length; i++) {
                 /** Allocate positions and sizes to all modules */
                const size = allocateModule(context, stack[level][i], level, i, stack[level].length, width, height, levels);
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
                    drawVertice(context, size, sizeMap.get(path.join(dependency, "index")));
                else
                    drawVertice(context, size, sizeMap.get(dependency));
            }

            item = iterator.next();
        }

        // /** Output png image */
        await writeToImage(image, outFilePath);
    } catch(e) {
        throw e;
    }

};