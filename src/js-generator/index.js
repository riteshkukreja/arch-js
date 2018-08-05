const fs = require("fs");
const path = require("path");

const regex = require("./regex");
const Graph = require("./graph");
const { RequiresGenerator, getExports } = require("./parser");

const map = new Map();

/**
 * Method to add target module to map. 
 * It extracts all imports and exports of a module and save it in map as a Graph object.
 * @param {String} root parent path of target module
 * @param {String} file name of target module file
 * @param {String} projectRoot root path of project
 */
const generateGraph = (root, file, projectRoot) => {
    /** Create a new graph node for this file */
    const info = path.parse(file);
    const moduleName = path.join(info.dir, info.name).replace(projectRoot + "/", "");
    const graph = new Graph(moduleName, path.join(info.dir, info.name), info.dir);

    /** Resolve all requires in file content */
    const content = fs.readFileSync(file).toString();
    const requiresGenerator = RequiresGenerator(root, content);

    let item = requiresGenerator.next();
    while(!item.done) {
        /** Set them as imports */
        graph.Import = item.value;
        item = requiresGenerator.next();
    }

    /** Extract exports */
    graph.Exports = getExports(file);

    /** Add to map */
    map.set(path.join(info.dir, info.name), graph);
};

/**
 * Method to recursively traverse all the files and directories in the projectRoot and parse all modules.
 * @param {String} root Parent path to traverse
 * @param {String} projectRoot root path of project
 */
const traverse = async (root, projectRoot) => {
    if(!projectRoot) projectRoot = root;

    return await new Promise(async (resolve, reject) => {
        fs.readdir(root, async (err, files) => {
    
            if(err) {
                reject(err);
                return;
            }
    
            for(const file of files) {
                const resolvedPath = path.join(root, file);

                if(fs.statSync(resolvedPath).isDirectory() && file != "node_modules" && !file.startsWith('.')) {
                    await traverse(resolvedPath, root);
                } else if(regex.js.test(file)) {
                    generateGraph(root, resolvedPath, projectRoot);
                }
            }
    
            resolve(map);
    
        });
    });

};

module.exports = traverse;