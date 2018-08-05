
/**
 * Perform a topological sort on the modules to figure out the drawing order of each module.
 * @param {Map} map key-value pair of modules containing all exports/imports
 */
const getTopologicalStack = (map) => {
    const result = {};
    const visitedMap = new Map();

    const iterator = map.values();
    let item = iterator.next();

    const dfs = (module, level) => {
        if(module && (!visitedMap.get(module._path) ||  visitedMap.get(module._path) < level)) {
            if(visitedMap.get(module._path)) {
                const index = result[visitedMap.get(module._path)].indexOf(module);
                result[visitedMap.get(module._path)].splice(index, 1);
            }

            visitedMap.set(module._path, level);

            const dependency = module._imports;
            dependency
                .map(a => map.get(a))
                .filter(a => a !== null && a !== undefined )
                .forEach(
                    a => dfs(a, level+1)
                );

            if(!result[level])
                result[level] = new Array(); 

            result[level].push(module);
        }
    };

    while(!item.done) {
        const module = item.value;
        dfs(module, 1);
        item = iterator.next();
    }

    return result;
};

module.exports = {
    getTopologicalStack
};