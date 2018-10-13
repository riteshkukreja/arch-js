const path = require("path");
const Graph = require("../common/graph");

const dfdN = async (map, maxLevel, currentLevel) => {
    const rootPath = "/home/app/";
    const res = new Map();

    for(const module of map.keys()) {
        const modPath = module.replace(rootPath, "").split("/");
        
        /** If it contains a directory name, then take upto level we have to go to */
        if(modPath.length > 1) {
            const dfdNModName = modPath.slice(0, maxLevel+1).join("/");
            const modKey = path.join(rootPath, dfdNModName);

            const imports = findImportsForDirectory(rootPath, maxLevel, map.get(module));
            /** Check if key already exists */
            if(res[modKey]) {
                /** if exists, then append imports */
                imports.forEach(a => res[modKey]._imports = a);
            } else {
                /** if doesnt exists, then create a new node */
                const node = new Graph(dfdNModName, modKey, dfdNModName);
                imports.forEach(a => node.Import = a);

                /** if this is a module rather than a directory, then show its exports */
                if(modKey == module)
                    node.Exports = map.get(module).Exports;

                res.set(modKey, node);
            }

        } else {
            /** its just file name, add it to map */
            res.set(module, map.get(module));
        }
    }

    return res;
};

const findImportsForDirectory = (rootPath, maxLevel, module) => {
    return module.Imports
        .filter(a => /\//.test(a))
        .map(a => a.replace(rootPath, ""))
        .map(a => a.split("/"))
        .map(a => a.slice(0, maxLevel+1))
        .map(a => a.join("/"))
        .map(a => path.join(rootPath, a));
};

/**
 * Normalize the graph by only showing results upto a given level
 * @param {Map<String, Graph>} map key-value pair of path and module node
 * @param {Number} level DFD diagram level
 */
module.exports = (generator, level = 1) => {
    /**
     * Steps:
     * 1. Find all paths with directory name attached to them
     * 2. If path is file name and current level is less than maxLevel then add it to result
     */

    if(level < 0) {
        /** Skip dfd checking */
        return generator;
    }

    return async (srcDir) => {
        const map = await generator(srcDir);
        return dfdN(map, level, 0);
    };
}