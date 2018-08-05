
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

/**
 * Finds a smallest line from Array of starting and ending positions.
 * @param {Array} points1 Array of starting positions for possible lines
 * @param {Array} points2 Array of ending positions for possible lines
 */
const findClosestPointPair = (points1, points2) => {
    let minSoFar = Number.MAX_VALUE;
    let pointSelected = {};

    for(let i = 0; i < points1.length; i++) {
        for(let j = 0; j < points2.length; j++) {
            const p1 = points1[i];
            const p2 = points2[j];

            const a = p2.x - p1.x;
            const b = p2.y - p1.y;

            // const dist = Math.sqrt( a*a + b*b );
            const dist = Math.hypot(a, b);

            if(dist <= minSoFar) {
                minSoFar = dist;
                pointSelected = {start: p1, end: p2};
            }
        }
    }

    return pointSelected;
}

module.exports = {
    getTopologicalStack,
    findClosestPointPair
};